import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity({ name: 'questionnaire_form_data' })
export class FormdataEntities {
  // 主键装饰器
  @PrimaryGeneratedColumn({ comment: '自增id' })
  id: number;

  @Column({ name: 'question_id', comment: '问卷id' })
  question_id: string;

  @CreateDateColumn({ name: 'created_time', comment: '提交时间' })
  created_time: string;

  @Column({ name: 'workcode', default: '', comment: '用户workcode' })
  workcode: string;

  @Column({ name: 'username', default: '', comment: '用户名' })
  username: string;

  @Column({ name: 'department', default: '', comment: '部门' })
  department: string;

  // @Column({ name: 'form_data', default: '', comment: '用户提交数据' })
  @Column({
    name: 'form_data',
    comment: '用户提交数据',
    type: 'longtext',
  })
  form_data: string;
}
