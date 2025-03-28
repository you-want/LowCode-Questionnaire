import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { TemplateEntities } from '../shared/entity/template.entities';
import {
  TemplateEditInterface,
  TemplateQueryInterface,
} from '../shared/interface/template.interface';

@Injectable()
export class TemplateService {
  constructor(
    @InjectRepository(TemplateEntities)
    private templateRepository: Repository<TemplateEntities>,
    private configService: ConfigService,
  ) {}

  // 问卷的发布状态
  getTemplateStatus() {
    return this.configService.get('templateStatus');
  }

  async findAll(): Promise<TemplateEntities[]> {
    return await this.templateRepository.find();
  }

  async findOne(question_id: string): Promise<any> {
    const res = await this.templateRepository.find({ question_id });
    // 如果找到多条数据，需要返回error
    return res.length === 0 ? null : res[0];
  }

  // 创建问卷
  async create(template: TemplateEntities): Promise<void> {
    await this.templateRepository.save(template);
  }

  async queryBuilder(query: TemplateQueryInterface) {
    const {
      question_id,
      name,
      creator,
      status,
      created_time_sort,
      updated_time_sort,
      page,
      page_size,
    } = query;

    let qb = this.templateRepository.createQueryBuilder();

    // 根据created_time DESC排序
    qb = qb.orderBy('created_time', 'DESC');

    // 排序
    if (created_time_sort && updated_time_sort) {
      qb = qb
        .orderBy('created_time', created_time_sort)
        .addOrderBy('updated_time', updated_time_sort);
    } else if (created_time_sort) {
      qb = qb.orderBy('created_time', created_time_sort);
    } else if (updated_time_sort) {
      qb = qb.orderBy('updated_time', updated_time_sort);
    }

    // 分页
    if (page && page_size) {
      qb = qb.skip(page_size * (page - 1)).take(page_size);
    } else {
      qb = qb.skip(0).take(10);
    }

    if (question_id) {
      qb = qb.andWhere('question_id = :question_id', {
        question_id,
      });
    }

    // if (name) {
    //   qb = qb.andWhere('name = :name', {
    //     name,
    //   });
    // }
    // .where("user.firstName like :name", { name:`%${firstName}%` })
    if (name) {
      qb = qb.andWhere('name like :name', {
        name: `%${name}%`,
      });
    }

    if (creator) {
      qb = qb.andWhere('creator = :creator', {
        creator,
      });
    }

    if (status) {
      qb = qb.andWhere('status = :status', {
        status,
      });
    }

    return qb;
  }

  // 编辑问卷
  async update(template: TemplateEditInterface) {
    await this.templateRepository
      .createQueryBuilder()
      .update()
      .set({
        name: template.name,
        config: template.config,
      })
      .where('question_id = :question_id', {
        question_id: template.question_id,
      })
      .execute();
  }

  // 发布问卷
  async publish(question_id: string) {
    await this.templateRepository
      .createQueryBuilder()
      .update()
      .set({
        status: this.getTemplateStatus().DO,
      })
      .where('question_id = :question_id', {
        question_id,
      })
      .execute();
  }

  // 结束问卷
  async end(question_id: string) {
    await this.templateRepository
      .createQueryBuilder()
      .update()
      .set({
        status: this.getTemplateStatus().AFTER,
      })
      .where('question_id = :question_id', {
        question_id,
      })
      .execute();
  }

  // 删除问卷
  async remove(question_id: string): Promise<void> {
    await this.templateRepository.delete({ question_id });
  }
}
