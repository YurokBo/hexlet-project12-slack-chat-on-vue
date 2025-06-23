import { apiRequestFactory } from "../api/api-requests-factory";
import { ApiResourcesFactory } from "../api/api-resources-factory";
import { storeToRefs } from "pinia";
import { useAuthStore } from "../stores/auth.store";
import { ElNotification } from "element-plus";
import router from "../router";
import { authErrorCodes, authForbiddenCode } from "../models/auth.model";

export const apiResourcesFactory = new ApiResourcesFactory();
export const http = apiRequestFactory.getRequestPerformer();

http.setInterceptor({
  request: {
    onFulfilled(config) {
      const { token } = storeToRefs(useAuthStore());

      if (!config.headers) {
        config.headers = {};
      }

      if (token.value) {
        config.headers['X-Auth-Token'] = token.value;
      }

      return config;
    },
  },
  response: {
    onFulfilled(response) {
      const fileContentTypes = ['text/csv; charset=UTF-8'];

      if (fileContentTypes.includes(response.headers['content-type'])) {
        response.data = { fileData: response.data };
      }

      if (response.data.textCode) {
        ElNotification({
          title: 'Error',
          message: response.data.message,
          type: 'error',
        });
        throw new Error(response.data.message);
      }

      return response;
    },
    onRejected(error) {
      const { token } = storeToRefs(useAuthStore());

      if (authErrorCodes.includes(error.response?.status)) {
        token.value = null;
      }

      if (error.response?.status === authForbiddenCode) {
        ElNotification({
          title: 'Error',
          message: error.response.data.message,
          type: 'error',
        });
        router.push({ name: 'login' });
      }

      throw error;
    },
  },
});

export const api = apiResourcesFactory.getInstance(http);
