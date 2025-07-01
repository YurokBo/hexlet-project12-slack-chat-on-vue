import { AuthApiResources } from "./auth";
import { RequestPerformer } from "./api-requests-factory";

export interface ApiResources {
  auth: AuthApiResources;
}

export class ApiResourcesFactory {
  public getInstance(basePerformer: RequestPerformer): ApiResources {
    return {
      auth: new AuthApiResources(basePerformer, '/api/v1/'),
    }
  }
}
