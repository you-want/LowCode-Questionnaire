export interface IResponse<T> {
  data: T,
  code: number
  message: string
}
