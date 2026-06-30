import { ApiMethodPerformer } from './method-performer';
import { RequestPerformer } from './request-performer';
import { take } from 'rxjs/operators';
import { HttpMethods, TypedAxiosError } from './models/methods.model';
import { Subscription, Observable } from 'rxjs';

/* eslint-disable */
export type ApiResourceMethodConstructor = new (
  requestPerformer: RequestPerformer,
  endpoint: string,
  method: HttpMethods
) => ApiResourceMethod<any, any>;

/**
 * Api method base
 * Provides easy access to RxJS subscription, basic method properties and request performer
 */
/* eslint-disable */
export class ApiResourceMethod<R, E = any> {
  /**
   * Contains method's guts
   */
  protected performer: ApiMethodPerformer<R>;

  constructor(
    private readonly requestPerformer: RequestPerformer,
    public readonly endpoint: string,
    private readonly method: HttpMethods,
  ) {
    this.performer = new ApiMethodPerformer<R>(this.requestPerformer, this.endpoint, this.method);
  }

  /**
   * Network activity status at the moment
   */
  get inProgress(): boolean {
    return this.performer.inProgress;
  }

  /**
   * Shared method subject
   * Fill free to create your own subscribtions
   */
  get result$(): Observable<R> {
    return this.performer.result$;
  }

  /**
   * Works only for next one request call
   * Success request callback is first
   * Second is failed request callback
   * Third is for advanced users, read RxJS docs
   */
  subscribeOnce(
    next: (payload: R) => void,
    error?: (error: TypedAxiosError<E>) => void,
    complete?: () => void,
  ): void {
    this.performer.result$.pipe(take(1)).subscribe(next, error, complete);
  }

  /**
   * Creates default RxJS subscription
   * Don't forget to unsubscribe
   */
  subscribe(
    next: (payload: R) => void,
    error?: (error: TypedAxiosError<E>) => void,
    complete?: () => void,
  ): Subscription {
    return this.performer.result$.subscribe(next, error, complete);
  }
}
