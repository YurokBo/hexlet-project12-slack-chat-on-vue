import { DEFAULT_LOGIN_FORM_DATA, LoginForm, LoginFormResponse } from "../models/auth.model";
import { defineStore } from "pinia";
import { ElNotification, FormInstance } from "element-plus";
import { ref } from "vue";
import { api } from "../services/http.service";

interface AuthStore {
  isAuthLoading: boolean;
  loginFormData: LoginForm;
  submitLoginForm: () => Promise<LoginFormResponse>;
  token: string | null;
}

export const loginFormDataRef = ref<FormInstance>()

export const useAuthStore = defineStore('AuthStore', (): AuthStore => {
 const loginFormData = ref({ ...DEFAULT_LOGIN_FORM_DATA });
 const isAuthLoading = ref(false);
 const token = ref(null);
 const username = ref(null);

 function submitLoginForm(): Promise<LoginFormResponse> {
   loginFormDataRef.value.validate((valid: boolean) => {
     if (!valid) {
       return;
     }

     isAuthLoading.value = true;

     return api.auth.getLoginRequest
       .perform(loginFormData.value)
       .then((response: LoginFormResponse) => {
         token.value = response.token;
         username.value = response.username;

         localStorage.setItem("token", token.value);
         localStorage.setItem("username", username.value);

         return { token, username }
       })
       .catch((error) => {
         console.log('submitLoginForm error', error);
         ElNotification({
           title: 'Error',
           message: error.response.data.message,
           type: 'error',
         });
       })
       .finally(() => {
         isAuthLoading.value = false;
       });
   });
 }

 return {
   loginFormData,
   isAuthLoading,
   submitLoginForm,
   token,
 }
});
