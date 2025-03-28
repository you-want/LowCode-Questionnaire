import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FormdataSearchInterface } from 'src/shared/interface/formdata.interface';
import { Repository } from 'typeorm';
import { FormdataEntities } from '../shared/entity/formdata.entities';

@Injectable()
export class FormdataService {
  constructor(
    @InjectRepository(FormdataEntities)
    private formdataRepository: Repository<FormdataEntities>,
  ) {}

  // 提交问卷
  async create(formdata: FormdataEntities): Promise<void> {
    await this.formdataRepository.save(formdata);
  }

  async queryBuilder(query: FormdataSearchInterface) {
    const { question_id } = query;
    const created_time = new Date(new Date().setHours(0, 0, 0, 0));

    let qb = this.formdataRepository.createQueryBuilder();

    if (question_id) {
      qb = qb.andWhere('question_id = :question_id', {
        question_id,
      });
    }

    qb = qb.andWhere('created_time >= :created_time', {
      created_time,
    });

    return qb;
  }

  async queryBuilderForExcel(query: FormdataSearchInterface) {
    const { question_id } = query;

    let qb = this.formdataRepository.createQueryBuilder();

    if (question_id) {
      qb = qb.andWhere('question_id = :question_id', {
        question_id,
      });
    }

    return qb;
  }
}
