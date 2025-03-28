import { Module } from '@nestjs/common';
import { FormdataController } from './formdata.controller';
import { FormdataService } from './formdata.service';
import { FormdataEntities } from '../shared/entity/formdata.entities';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataController } from '../data/data.controller';
import { DownloadController } from '../download/download.controller';
import { TemplateEntities } from '../shared/entity/template.entities';
import { TemplateService } from '../template/template.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([FormdataEntities]),
    TypeOrmModule.forFeature([TemplateEntities]),
  ],
  controllers: [FormdataController, DataController, DownloadController],
  providers: [FormdataService, TemplateService],
})
export class FormdataModule {}
