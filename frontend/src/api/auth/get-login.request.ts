import { ApiResourceMethod } from "../api-requests-factory";
import { LoginForm, LoginFormResponse } from "../../models/auth.model";
import { BaseResponse } from "../api-requests-factory/models/response.model";

export default class GetLoginRequest extends ApiResourceMethod<LoginFormResponse> {
  public perform(loginFormData: LoginForm): Promise<LoginFormResponse> {
    return this.performer.requestWithMapper(
      {data: loginFormData},
      (payload: BaseResponse<LoginFormResponse>): LoginFormResponse => payload)
  };
}
