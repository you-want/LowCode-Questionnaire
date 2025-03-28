import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Patch,
  Post,
  Query,
  UsePipes,
} from '@nestjs/common';
import { TemplateService } from './template.service';
import { ValidationPipe } from '../shared/pipe/validation.pipe';
import { TemplateEntities } from '../shared/entity/template.entities';
import { CreateTemplateDTO, EditTemplateDTO } from '../shared/dto/template.dto';
import { v4 as uuidv4 } from 'uuid';

@Controller('template')
export class TemplateController {
  constructor(private readonly templateService: TemplateService) {}

  @Get()
  async findOne(@Query() query): Promise<any> {
    const currentTemplate = await this.templateService.findOne(
      query.question_id,
    );

    if (!currentTemplate) {
      throw new NotFoundException(`${query.question_id}问卷不存在`);
    }
    return await currentTemplate;
  }

  @UsePipes(new ValidationPipe()) // 使用管道验证
  @Post('')
  async create(@Body() body: CreateTemplateDTO) {
    const template = new TemplateEntities();
    template.question_id = uuidv4();
    template.name = body.name;
    template.creator = body.creator;
    template.config = '{}';
    await this.templateService.create(template);
  }

  @UsePipes(new ValidationPipe()) // 使用管道验证
  @Patch('')
  async update(@Body() body: EditTemplateDTO) {
    // 已经发布的问卷不能再编辑
    const currentTemplate = await this.templateService.findOne(
      body.question_id,
    );
    if (!currentTemplate) {
      throw new NotFoundException(`${body.question_id}问卷不存在`);
    }
    const templateConfig = JSON.parse(JSON.stringify(currentTemplate));

    // 发布状态
    const TEMPLATE_STATUS = this.templateService.getTemplateStatus();
    if (templateConfig.status === TEMPLATE_STATUS.DO) {
      throw new BadRequestException('您不能编辑已发布的问卷！');
    }
    if (templateConfig.status === TEMPLATE_STATUS.AFTER) {
      throw new BadRequestException('您不能编辑已结束的问卷！');
    }

    const template = new TemplateEntities();
    template.question_id = body.question_id;
    template.name = body.name;

    if (!this.isJSON(body.config)) {
      throw new BadRequestException('config必须是JSON对象');
    }
    if (typeof body.config === 'string') {
      template.config = body.config;
    } else {
      template.config = JSON.stringify(body.config);
    }
    await this.templateService.update(template);
  }

  @Delete()
  async remove(@Body() body) {
    const project = await this.templateService.findOne(body.question_id);
    if (!project) {
      throw new NotFoundException(`${body.question_id}信息不存在`);
    }
    await this.templateService.remove(body.question_id);
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
