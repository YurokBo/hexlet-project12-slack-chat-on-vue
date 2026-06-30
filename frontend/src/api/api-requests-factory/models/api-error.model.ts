export enum ApiErrorCode {
  SUCCESS = 0,
  NOT_FOUND = 404,
  CAPTCHA_REQUIRED = 10000,
  UNKNOWN = 99999,
}

export class ApiError extends Error {
  constructor(message: string | undefined, readonly code: number) {
    super(message);
  }
}
