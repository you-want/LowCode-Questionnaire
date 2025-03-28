import {
  BadRequestException,
  Body,
  Controller,
  NotFoundException,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateFormdataDTO } from 'src/shared/dto/formdata.dto';
import { FormdataService } from './formdata.service';
import { FormdataEntities } from '../shared/entity/formdata.entities';
import { TemplateService } from 'src/template/template.service';

@Controller('submit')
export class FormdataController {
  constructor(
    private readonly formdataService: FormdataService,
    private readonly templateService: TemplateService,
  ) {}

  @UsePipes(new ValidationPipe()) // 使用管道验证
  @Post('')
  async create(@Body() body: CreateFormdataDTO) {
    const currentTemplate = await this.templateService.findOne(
      body.question_id,
    );
    if (!currentTemplate) {
      throw new NotFoundException(`${body.question_id}问卷不存在`);
    }
    const templateConfig = JSON.parse(JSON.stringify(currentTemplate));

    // 发布状态
    const TEMPLATE_STATUS = this.templateService.getTemplateStatus();
    if (templateConfig.status === TEMPLATE_STATUS.PRE) {
      throw new BadRequestException('该问卷还未发布，您不能提交！');
    }
    if (templateConfig.status === TEMPLATE_STATUS.AFTER) {
      throw new BadRequestException('该问卷已经结束，感谢您的支持！');
    }

    const formdata = new FormdataEntities();
    formdata.question_id = body.question_id;
    formdata.workcode = body.workcode;
    formdata.username = body.username;
    formdata.department = body.department;
    // formdata.form_data = body.form_data;
    if (!this.isJSON(body.form_data)) {
      throw new BadRequestException('form_data必须是JSON对象');
    }

    if (typeof body.form_data === 'string') {
      formdata.form_data = body.form_data;
    } else {
      formdata.form_data = JSON.stringify(body.form_data);
    }
    await this.formdataService.create(formdata);
  }

  isJSON = (str) => {
    if (typeof str == 'string') {
      try {
        const obj = JSON.parse(str);
        if (typeof obj == 'object' && obj) {
          return true;
        } else {
          return false;
        }
      } catch (e) {
        return false;
      }
    }
    console.log('It is not a string!');
  };
}
