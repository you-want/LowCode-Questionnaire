import { Body, Controller, NotFoundException, Post } from '@nestjs/common';
import { TemplateService } from '../template/template.service';
import { v4 as uuidv4 } from 'uuid';

interface TemplateCopyInterface {
  readonly question_id: string;
}

@Controller('copy')
export class CopyController {
  constructor(private readonly templateService: TemplateService) {}

  @Post()
  async copy(@Body() body: TemplateCopyInterface): Promise<any> {
    const copyTemplate = await this.templateService.findOne(body.question_id);

    if (!copyTemplate) {
      throw new NotFoundException(`${body.question_id}问卷不存在`);
    }

    // 注意这里如果数据库添加字段了，这里也得添加
    // const template = new TemplateEntities();
    // template.question_id = uuidv4();
    // template.name = copyTemplate.name + '_复制';
    // template.creator = copyTemplate.creator;
    // template.config = copyTemplate.config;

    const TEMPLATE_STATUS = this.templateService.getTemplateStatus();
    const template = JSON.parse(JSON.stringify(copyTemplate));
    template.question_id = uuidv4();
    template.name = copyTemplate.name + '_复制';
    template.status = TEMPLATE_STATUS.PRE;
    template.id = null;

    await this.templateService.create(template);
  }
}
