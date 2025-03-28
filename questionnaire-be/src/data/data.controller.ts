import { Controller, Get, Query } from '@nestjs/common';
import { FormdataService } from 'src/formdata/formdata.service';
import { FormdataSearchInterface } from 'src/shared/interface/formdata.interface';

@Controller('data')
export class DataController {
  constructor(private readonly formdataService: FormdataService) {}

  @Get()
  async getData(@Query() query: FormdataSearchInterface): Promise<any> {
    const allBuilder = await this.formdataService.queryBuilderForExcel(query);
    const todayBuilder = await this.formdataService.queryBuilder(query);

    const [all] = await allBuilder.getManyAndCount();
    const [today] = await todayBuilder.getManyAndCount();

    return {
      all: all.length,
      today: today.length,
    };
  }
}
