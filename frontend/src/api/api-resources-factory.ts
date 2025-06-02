import { AuthApiResources } from "./auth";
import { storeToRefs } from "pinia";
import { useEnvStore } from "../stores/env.store";
import { RequestPerformer } from "./api-requests-factory";

export interface ApiResources {
  auth: AuthApiResources;
}

export class ApiResourcesFactory {
  public getInstance(basePerformer: RequestPerformer): ApiResources {
    const { API_URL } = storeToRefs(useEnvStore());

    return {
      auth: new AuthApiResources(basePerformer, API_URL),
    }
  }
}
