import { DEFAULT_LOGIN_FORM_DATA, LoginForm } from "../models/auth.model";
import { defineStore } from "pinia";
import { FormInstance } from "element-plus";
import { ref } from "vue";

interface AuthStore {
  isAuthLoading: boolean;
  loginFormData: LoginForm;
  submitLoginForm: () => Promise<void>;
}

export const loginFormDataRef = ref<FormInstance>()

export const useAuthStore = defineStore('AuthStore', (): AuthStore => {
 const loginFormData = ref({ ...DEFAULT_LOGIN_FORM_DATA });
 const isAuthLoading = ref(false);

 function submitLoginForm(): Promise<void> {
   loginFormDataRef.value.validate((valid: boolean) => {
     if (!valid) {
       return;
     }

     isAuthLoading.value = true;

     setTimeout(() => {
       isAuthLoading.value = false;
     }, 3000)
   })
 }

 return {
   loginFormData,
   isAuthLoading,
   submitLoginForm,
 }
});
