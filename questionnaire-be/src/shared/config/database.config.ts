import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { TemplateEntities } from '../entity/template.entities';
import { FormdataEntities } from '../entity/formdata.entities';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) {}
  createTypeOrmOptions(): TypeOrmModuleOptions | Promise<TypeOrmModuleOptions> {
    // return this.configService.get('database');
    const synchronize = process.env.DB_SYNCHRONIZE === 'true' ? true : false;
    const config = {
      type: 'mysql' as any,
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB,
      entities: [TemplateEntities, FormdataEntities],
      // entities: ['dist/shared/entity/**.entities{.ts,.js}'],
      synchronize: synchronize, // 生产环境不能是true, 否则会丢失生产环境的数据
      logging: true,
    };
    return config;
  }
}
