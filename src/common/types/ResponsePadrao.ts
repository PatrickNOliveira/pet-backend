export interface IResponsePadrao<T> {
  error: boolean;
  message: string[];
  data: T;
}
