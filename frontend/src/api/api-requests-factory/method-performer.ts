import { Subject, Observable, from, throwError } from 'rxjs';
import { share, catchError } from 'rxjs/operators';
import { HttpMethods } from './models/methods.model';
import { RequestPerformer } from './request-performer';
import { AxiosRequestConfig } from 'axios';
import type { BaseResponse } from './models/response.model';

/**
 * Contains and manipulates particular request subscription
 * Performs network call with given parameters
 */
export class ApiMethodPerformer<R> {
  /**
   * RxJS Subject and Observable
   */
  private resultSubject!: Subject<R>;
  public result$!: Observable<R>;

  /**
   * Network activity status of the method
   */
  private requestInProgress = false;

  constructor(
    private readonly requestPerformer: RequestPerformer,
    private readonly endpoint: string,
    private readonly method: HttpMethods,
  ) {
    this.initSubject();
  }

  /**
   * Getter for method activity status
   */
  public get inProgress(): boolean {
    return this.requestInProgress;
  }

  /**
   * Creates and shares new RxJS subject
   */
  private initSubject(): void {
    this.resultSubject = new Subject<R>();
    this.result$ = this.resultSubject.pipe(share());
    this.result$.subscribe({
      next: this.releaseProgress.bind(this),
      error: this.releaseProgress.bind(this),
    });
  }

  /**
   * Sets method progress flag to false
   */
  private releaseProgress(): void {
    this.requestInProgress = false;
  }

  /**
   * Adds parameter to endpoint if exists
   */
  private buildUrl(param?: number | string): string {
    return param ? `${this.endpoint}/${param}` : this.endpoint;
  }

  /**
   * Prepares parameters for making request
   */
  private buildParams(params?: AxiosRequestConfig): AxiosRequestConfig {
    return {
      ...params,
      url: this.buildUrl(params?.url),
      method: this.method,
    };
  }

  /**
   * Performs network request call and triggers RxJS Subject
   */
  request(params?: AxiosRequestConfig): Promise<R> {
    this.requestInProgress = true;
    const requestPromise = this.requestPerformer.execute<R>(this.buildParams(params));
    const response$ = from(requestPromise)
      .pipe<R>(
      catchError((error) => {
        this.initSubject();

        return throwError(error);
      }),
    );
    response$.subscribe({
      next: this.resultSubject.next.bind(this.resultSubject),
      error: this.resultSubject.error.bind(this.resultSubject),
    });

    return requestPromise;
  }

  async requestWithMapper<T>(params?: AxiosRequestConfig, mapper?: (payload: BaseResponse<T>) => R): Promise<R> {
    const result = await this.request(params);

    return mapper ? mapper(result as BaseResponse<T>) : result;
  }
}
