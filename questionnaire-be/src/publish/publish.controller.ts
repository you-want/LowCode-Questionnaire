import {
  Body,
  Controller,
  NotFoundException,
  Patch,
  Post,
} from '@nestjs/common';
import { PublishTemplateDTO } from 'src/shared/dto/template.dto';
import { TemplateService } from '../template/template.service';

@Controller('publish')
export class PublishController {
  constructor(private readonly templateService: TemplateService) {}

  @Post()
  async publish(@Body() body: PublishTemplateDTO): Promise<any> {
    const currentTemplate = await this.templateService.findOne(
      body.question_id,
    );

    if (!currentTemplate) {
      throw new NotFoundException(`${body.question_id}问卷不存在`);
    }
    await this.templateService.publish(body.question_id);
  }

  @Patch()
  async end(@Body() body: PublishTemplateDTO): Promise<any> {
    const currentTemplate = await this.templateService.findOne(
      body.question_id,
    );

    if (!currentTemplate) {
      throw new NotFoundException(`${body.question_id}问卷不存在`);
    }
    await this.templateService.end(body.question_id);
  }
}
