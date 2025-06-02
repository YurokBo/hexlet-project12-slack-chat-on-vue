import { Ref } from "vue";
import { HttpMethods, RequestPerformer } from "../api-requests-factory";
import GetLoginRequest from "./get-login.request";

export class AuthApiResources {
  public constructor(
    private readonly requestPerformer: RequestPerformer,
    private readonly apiUrl: Ref<string>,
  ) {}

  public get getLoginRequest(): GetLoginRequest {
    return new GetLoginRequest(
      this.requestPerformer,
      `${this.apiUrl.value}login`,
      HttpMethods.POST,
    );
  }
}
