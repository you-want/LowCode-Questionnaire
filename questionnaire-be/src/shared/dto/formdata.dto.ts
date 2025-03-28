import { IsNotEmpty } from 'class-validator';

export class CreateFormdataDTO {
  id: number;

  @IsNotEmpty({ message: '问卷id不能为空' })
  question_id: string;

  workcode: string;

  username: string;

  department: string;

  form_data: string;
}
