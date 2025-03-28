import {
  Controller,
  Get,
  Response,
  Header,
  Query,
  NotFoundException,
} from '@nestjs/common';
import * as ExcelJS from 'exceljs';
import { FormdataService } from '../formdata/formdata.service';
import { TemplateService } from '../template/template.service';

@Controller('download')
export class DownloadController {
  constructor(
    private readonly formdataService: FormdataService,
    private readonly templateService: TemplateService,
  ) {}
  @Get()
  @Header('Content-Type', 'application/vnd.openxmlformats;charset=utf-8')
  @Header(
    'Content-Disposition',
    'attachment; filename=' + encodeURIComponent('数据详情') + '.xlsx',
  )
  async downloadExcel(@Response({ passthrough: true }) res, @Query() query) {
    const workbookData = [];
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Debtors');

    // columns
    const columns = [
      { header: 'question_id', key: 'question_id' },
      { header: 'workcode', key: 'workcode' },
      { header: '用户名', key: 'username' },
      { header: '部门', key: 'department' },
    ];
    // 这是获取问卷模版的内容
    const currentTemplate = await this.templateService.findOne(
      query.question_id,
    );
    if (!currentTemplate) {
      throw new NotFoundException(`${query.question_id}问卷不存在`);
    }
    const templateConfig = JSON.parse(JSON.stringify(currentTemplate));
    // 这里要判断是否存在
    const config = JSON.parse(templateConfig.config);
    if (config.components) {
      config.components.forEach((item) => {
        const res = {
          header: item.formItemProps.label,
          key: item.key,
        };
        columns.push(res);
      });
    }

    // workbookData
    const builder = await this.formdataService.queryBuilderForExcel({
      question_id: query.question_id,
    });
    const [total] = await builder.getManyAndCount();
    const ResultTotal = JSON.parse(JSON.stringify(total));
    if (ResultTotal.length > 0) {
      ResultTotal.forEach((totalItem, i) => {
        const res = {};
        // 这里要判断是否存在
        const formDataFromSql = totalItem.form_data;
        columns.forEach((columnsItem) => {
          res[columnsItem.key] = totalItem[columnsItem.key];
          if (formDataFromSql && formDataFromSql.trim() !== '') {
            const formDataFromSqlObj = JSON.parse(formDataFromSql);
            Object.keys(formDataFromSqlObj).forEach((formDataItem) => {
              res[formDataItem] = formDataFromSqlObj[formDataItem];
            });
          }
        });
        workbookData.push(res);
      });
    }

    worksheet.columns = columns;
    worksheet.addRows(workbookData);

    return workbook.xlsx.write(res).then(function () {
      res.end();
    });
  }
}
