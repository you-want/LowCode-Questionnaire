import { Controller, Get, Query } from '@nestjs/common';
import {
  OrderType,
  TemplateQueryInterface,
} from '../shared/interface/template.interface';
import { TemplateService } from '../template/template.service';

@Controller('list')
export class ListController {
  constructor(private readonly templateService: TemplateService) {}

  @Get()
  async findAll(@Query() query: TemplateQueryInterface): Promise<any> {
    if (query.created_time_sort) {
      query.created_time_sort =
        query.created_time_sort.toUpperCase() as OrderType;
    }

    if (query.updated_time_sort) {
      query.updated_time_sort =
        query.updated_time_sort.toUpperCase() as OrderType;
    }

    const builder = await this.templateService.queryBuilder(query);

    const [list, total] = await builder.getManyAndCount();

    return {
      list,
      total,
    };
  }
}
