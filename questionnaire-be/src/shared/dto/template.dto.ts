import { IsNotEmpty } from 'class-validator';

export class CreateTemplateDTO {
  id: number;

  //   @IsNotEmpty({ message: '问卷id不能为空' })
  //   question_id: string;

  @IsNotEmpty({ message: '问卷标题不能为空' })
  name: string;

  @IsNotEmpty({ message: '创建者不能为空' })
  creator: string;

  status: string;

  config?: any;
}

export class EditTemplateDTO {
  @IsNotEmpty({ message: '问卷id不能为空' })
  question_id: string;

  @IsNotEmpty({ message: '问卷标题不能为空' })
  name: string;

  creator: string;

  status: string;

  note: string;

  success_note: string;

  config?: any;
}

export class PublishTemplateDTO {
  @IsNotEmpty({ message: '问卷id不能为空' })
  question_id: string;
}
