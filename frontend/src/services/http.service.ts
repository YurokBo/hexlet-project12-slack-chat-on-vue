import { apiRequestFactory } from "../api/api-requests-factory";
import { ApiResourcesFactory } from "../api/api-resources-factory";
// import { storeToRefs } from "pinia";
// import { useAuthStore } from "../stores/auth.store";
import { ElNotification } from "element-plus";
import router from "../router";
import { authErrorCodes, authForbiddenCode } from "../models/auth.model";

export const apiResourcesFactory = new ApiResourcesFactory();
export const http = apiRequestFactory.getRequestPerformer();

console.log('service 1')

http.setInterceptor({
  request: {
    onFulfilled(config) {
      console.log('request')
      // const authStore = useAuthStore();
      // const { token } = storeToRefs(authStore);

      const token = localStorage.getItem('token')

      if (!config.headers) {
        config.headers = {};
      }

      if (token) {
        config.headers['X-Auth-Token'] = token;
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
      // const authStore = useAuthStore()
      // const { token } = storeToRefs(authStore);
      // const token = localStorage.getItem('token')

      if (authErrorCodes.includes(error.response?.status)) {
        // token = null;

        localStorage.setItem('token', null)
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

console.log('service 2', apiResourcesFactory.getInstance(http))

export const api = apiResourcesFactory.getInstance(http);
