import { AxiosResponseHeaders } from 'axios';

export enum ResponseMessage {
  SUCCESS = 'Successfully',
  UNAUTHORIZED = 'Unauthorized',
}

/* eslint-disable */
export interface BaseResponse<T extends unknown> {
  textCode: string;
  message: ResponseMessage;
  data: T;
  code: number;
  headers: AxiosResponseHeaders;
}
