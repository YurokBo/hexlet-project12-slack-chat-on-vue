import { AxiosHeaders } from "axios";

export const authErrorCodes = [401, 419];
export const authForbiddenCode = 403;

export type LoginForm = {
  username: string;
  password: string;
}

export const DEFAULT_LOGIN_FORM_DATA: LoginForm = {
  username: '',
  password: '',
}

export type LoginFormResponse = {
  token: string;
  username: string;
  headers: AxiosHeaders;
}
