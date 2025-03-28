import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'template' })
export class TemplateEntities {
  // 主键装饰器
  @PrimaryGeneratedColumn({ comment: '自增id' })
  id: number;

  @Column({ name: 'question_id', comment: '问卷id' })
  question_id: string;

  @Column({ name: 'name', comment: '问卷名称' })
  name: string;

  // @Column({ name: 'note', comment: '问卷前置内容' })
  // note: string;

  // @Column({ name: 'success_note', comment: '问卷提交后内容' })
  // success_note: string;

  @Column({ name: 'creator', comment: '创建人' })
  creator: string;

  @CreateDateColumn({ name: 'created_time', comment: '创建时间' }) // 自动生成列
  created_time: string;

  @UpdateDateColumn({ name: 'updated_time', comment: '更新时间' }) // 自动生成并自动更新列
  updated_time: string;

  @Column({ name: 'status', default: 'pre_publish', comment: '状态' })
  status: string;

  @Column({
    name: 'config',
    comment: '组件配置',
    type: 'longtext',
  })
  config: string;

  // @Column({ type: 'simple-json', name: 'config', comment: '组件配置' })
  // config: {
  //   name: string;
  //   note: string;
  //   rules: object[];
  //   components: object[];
  // };
}
