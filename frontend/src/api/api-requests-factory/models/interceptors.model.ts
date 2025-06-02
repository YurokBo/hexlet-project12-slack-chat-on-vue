/* eslint-disable */
export type Interceptable = {
  use: (
    f: Interceptors<any>['onFulfilled'],
    r: Interceptors<any>['onRejected']
  ) => number;
}

/* eslint-disable */
export type Interceptors<V> = {
  onFulfilled?: (value: V) => V | Promise<V>;
  onRejected?: (error: any) => any;
}
