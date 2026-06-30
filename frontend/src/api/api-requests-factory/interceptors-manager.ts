import { PerformerInterceptors } from './index';
import { Interceptable, Interceptors } from './models/interceptors.model';
import { AxiosInstance } from 'axios';

export class InterceptorsManager {
  private requestInterceptorId: number | undefined;
  private responseInterceptorId: number | undefined;

  constructor(
    private readonly instanceInterceptors: AxiosInstance['interceptors'],
    private readonly newInterceptors: PerformerInterceptors,
  ) {
    this.enableInterceptors();
  }

  private set<T>(
    interceptable: Interceptable,
    requestInterceptors: Interceptors<T>,
  ): number {
    const { onFulfilled, onRejected } = requestInterceptors;

    return interceptable.use(onFulfilled, onRejected);
  }

  enableInterceptors(): void {
    if (this.newInterceptors.request) {
      this.requestInterceptorId = this.set(this.instanceInterceptors.request, this.newInterceptors.request);
    }

    if (this.newInterceptors.response) {
      this.responseInterceptorId = this.set(this.instanceInterceptors.response, this.newInterceptors.response);
    }
  }

  disableInterceptors(): void {
    if (this.requestInterceptorId) {
      this.instanceInterceptors.request.eject(this.requestInterceptorId);
    }

    if (this.responseInterceptorId) {
      this.instanceInterceptors.request.eject(this.responseInterceptorId);
    }
  }
}
