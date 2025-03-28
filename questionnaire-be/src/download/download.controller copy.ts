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
  // downloadExcel(@Response({ passthrough: true }) res) {
  async downloadExcel(@Response({ passthrough: true }) res, @Query() query) {
    const workbookData = [
      // {
      //   firstName: 'John',
      //   lastName: 'Bailey',
      //   purchasePrice: 1000,
      //   paymentsMade: 10,
      // },
      // {
      //   firstName: 'Leonard',
      //   lastName: 'Clark',
      //   purchasePrice: 1000,
      //   paymentsMade: 20,
      // },
      // {
      //   firstName: 'Phil',
      //   lastName: 'Knox',
      //   purchasePrice: 1000,
      //   paymentsMade: 30,
      // },
    ];
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Debtors');
    // 定义表头名称和字段名
    // worksheet.columns = [
    //   { header: 'First Name', key: 'firstName' },
    //   { header: 'Last Name', key: 'lastName' },
    //   { header: 'Purchase Price', key: 'purchasePrice' },
    //   { header: 'Payments Made', key: 'paymentsMade' },
    // ];
    const columns = [
      // { header: 'id', key: 'id' },
      { header: 'question_id', key: 'question_id' },
      { header: 'workcode', key: 'workcode' },
      { header: '用户名', key: 'username' },
      { header: '部门', key: 'department' },
    ];

    // TODO: 这个数据从数据库里面读取
    // const config = {
    //   components: [
    //     {
    //       tag: 'input',
    //       key: 'input1',
    //       formItemProps: {
    //         label: '单行输入框的label',
    //         required: true,
    //       },
    //       nodeProps: {
    //         defaultValue: '默认内容',
    //         maxlength: 50,
    //         minlength: 10,
    //         showCount: true,
    //       },
    //       error: [
    //         {
    //           type: 'number',
    //           message: "请输入正确的数字'",
    //         },
    //       ],
    //       show: true,
    //     },
    //     {
    //       tag: 'textarea',
    //       key: 'textarea1',
    //       formItemProps: {
    //         label: '多行输入框的label',
    //         required: true,
    //       },
    //       nodeProps: {
    //         defaultValue: '默认内容',
    //         maxlength: 50,
    //         minlength: 10,
    //         autosize: { minRows: 2, maxRows: 6 },
    //         showCount: true,
    //       },
    //       error: [
    //         {
    //           type: 'number',
    //           message: '请输入正确的数字',
    //         },
    //       ],
    //       show: true,
    //     },
    //     {
    //       tag: 'rate',
    //       key: 'rate1',
    //       formItemProps: {
    //         label: '评分的label',
    //         required: true,
    //       },
    //       nodeProps: {
    //         allowHalf: false,
    //         count: 5,
    //         tooltips: ['不满意', '', '一般', '', '满意'],
    //       },
    //       show: true,
    //     },
    //     {
    //       tag: 'radio',
    //       key: 'radio1',
    //       formItemProps: {
    //         label: '单选项的label',
    //         required: true,
    //       },
    //       nodeProps: {
    //         options: [
    //           {
    //             label: '单选按钮1',
    //             value: 1,
    //             disabled: false,
    //           },
    //           {
    //             label: '单选按钮2',
    //             value: 2,
    //             disabled: true,
    //           },
    //           {
    //             label: '单选按钮3',
    //             value: 3,
    //             disabled: false,
    //           },
    //         ],
    //       },
    //       layout: 'horizontal',
    //       show: true,
    //     },
    //     {
    //       tag: 'checkbox',
    //       key: 'checkbox1',
    //       formItemProps: {
    //         label: '多选项的label',
    //         required: true,
    //       },
    //       nodeProps: {
    //         options: [
    //           {
    //             label: '多选按钮1',
    //             value: 1,
    //             disabled: false,
    //           },
    //           {
    //             label: '多选按钮2',
    //             value: 2,
    //             disabled: true,
    //           },
    //           {
    //             label: '多选按钮3',
    //             value: 3,
    //             disabled: false,
    //           },
    //         ],
    //       },
    //       layout: 'horizontal',
    //       show: true,
    //     },
    //     {
    //       tag: 'select',
    //       key: 'select1',
    //       formItemProps: {
    //         label: '下拉的label',
    //         required: true,
    //       },
    //       nodeProps: {
    //         options: [
    //           {
    //             label: '下拉按钮1',
    //             value: 1,
    //             disabled: false,
    //           },
    //           {
    //             label: '下拉按钮2',
    //             value: 2,
    //             disabled: true,
    //           },
    //           {
    //             label: '下拉按钮3',
    //             value: 3,
    //             disabled: false,
    //           },
    //         ],
    //       },
    //       show: true,
    //     },
    //   ],
    //   rules: [],
    //   note: '感谢你花时间填写信息',
    //   success_note: '感谢你的提交',
    //   name: '问卷标题1',
    // };
    // TODO: 这个数据从数据库里面读取, 这个数据要放到数据库里面去
    // const submitFormData = [
    //   {
    //     input1: '我是input1的内容',
    //     textarea1: '我是textarea1的内容',
    //     radio1: 2,
    //     checkbox1: 1,
    //     select1: 3,
    //     rate1: 3,
    //   },
    //   {
    //     input1: '我是input1的内容2',
    //     textarea1: '我是textarea1的内容2',
    //     radio1: 1,
    //     checkbox1: 1,
    //     select1: 3,
    //     rate1: 2,
    //   },
    // ];
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
    // const components = config.components;
    // components.forEach((item) => {
    //   const res = {
    //     header: item.formItemProps.label,
    //     key: item.key,
    //   };
    //   columns.push(res);
    // });

    // 这里是获取formData的提交数据
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
          // TODO:  这里要遍历FormdataService的form_data
          // Object.keys(submitFormData[i]).forEach((submitFormDataItem) => {
          //   // res[submitFormDataItem] = submitFormData[i][submitFormDataItem];
          // });
          if (formDataFromSql && formDataFromSql.trim() !== '') {
            // const formDataFromSqlObj = JSON.parse(JSON.parse(formDataFromSql));
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
