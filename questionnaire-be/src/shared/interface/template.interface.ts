export enum OrderType {
  DESC = 'DESC',
  ASC = 'ASC',
}

export interface TemplateQueryInterface {
  readonly question_id: string;
  readonly name: string;
  readonly creator: string;
  readonly page?: number;
  readonly page_size?: number;
  readonly status: string;
  created_time_sort?: OrderType;
  updated_time_sort?: OrderType;
}

export interface TemplateEditInterface {
  //   readonly id: number;
  readonly question_id: string;
  readonly name: string;
  readonly config: any;
}

// export interface TemplatePublishInterface {
//   readonly question_id: string;
// }
