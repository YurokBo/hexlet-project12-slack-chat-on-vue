import { AxiosResponse, AxiosRequestConfig } from 'axios';

export enum HttpMethods {
  GET = 'get',
  POST = 'post',
  PUT = 'put',
  PATCH = 'patch',
  DELETE = 'delete',
}

/* eslint-disable */
export interface TypedAxiosError<E> {
  config: AxiosRequestConfig;
  response?: AxiosResponse<E>;
  request?: any;
}
