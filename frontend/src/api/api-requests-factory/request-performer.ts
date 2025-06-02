import { AxiosInstance, AxiosRequestConfig, AxiosPromise } from 'axios';
import { InterceptorsManager } from './interceptors-manager';
import { PerformerInterceptors } from './index';

/**
 * Manipulates network access status and performs requests
 */
export class RequestPerformer {
  constructor(
    private readonly apiRequest: AxiosInstance) {
  }

  /**
   * Returns current axios instance
   */
  get requestInstance(): AxiosInstance {
    return this.apiRequest;
  }

  get interceptors(): AxiosInstance['interceptors'] {
    return this.apiRequest.interceptors;
  }

  /**
   * Performs network request and returns payload
   */
  async execute<R>(params: AxiosRequestConfig): Promise<R> {
    console.log('execute', params)
    const response = await this.rawRequest<R>(params);

    console.log('execute', response)

    return { ...response.data, headers: response.headers };
  }

  /**
   * Performs request and returns raw axios-compatible data promise
   */
  rawRequest<R>(params: AxiosRequestConfig): AxiosPromise<R> {
    return this.apiRequest<R>(params);
  }

  setInterceptor(newInterceptors: PerformerInterceptors): InterceptorsManager {
    return new InterceptorsManager(this.interceptors, newInterceptors);
  }
}
