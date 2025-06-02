import { ApiRequestFactory } from './request-factory';

import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { Interceptors } from './models/interceptors.model';

export { RequestPerformer } from './request-performer';
export { ApiResourceMethod } from './resource-method';
export { HttpMethods } from './models/methods.model';
export { ApiMethodPerformer } from './method-performer';

export type PerformerInterceptors = {
  request?: Interceptors<AxiosRequestConfig>;
  response?: Interceptors<AxiosResponse>;
}

export const apiRequestFactory = new ApiRequestFactory();
