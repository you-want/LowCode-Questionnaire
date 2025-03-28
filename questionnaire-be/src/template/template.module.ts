import { Module } from '@nestjs/common';
import { TemplateController } from './template.controller';
import { TemplateService } from './template.service';
import { TemplateEntities } from '../shared/entity/template.entities';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ListController } from '../list/list.controller';
import { CopyController } from '../copy/copy.controller';
import { PublishController } from '../publish/publish.controller';

@Module({
  imports: [TypeOrmModule.forFeature([TemplateEntities])],
  controllers: [
    TemplateController,
    ListController,
    CopyController,
    PublishController,
  ],
  providers: [TemplateService],
})
export class TemplateModule {}
