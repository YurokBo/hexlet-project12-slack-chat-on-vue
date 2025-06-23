import { DEFAULT_LOGIN_FORM_DATA, LoginForm, LoginFormResponse } from "../models/auth.model";
import { defineStore } from "pinia";
import { ElNotification } from "element-plus";
import { computed, ComputedRef, Ref, ref } from "vue";
import { api } from "../services/http.service";

interface AuthStore {
  isAuthLoading: Ref<boolean>;
  loginFormData: Ref<LoginForm>;
  login: () => Promise<LoginFormResponse>;
  token: Ref<string | null>;
  isAuth: ComputedRef<boolean>;
}

export const useAuthStore = defineStore('AuthStore', (): AuthStore => {
  const loginFormData = ref({ ...DEFAULT_LOGIN_FORM_DATA });
  const isAuthLoading = ref(false);
  const token = ref(null);
  const username = ref(null);

  async function login(): Promise<LoginFormResponse> {
    isAuthLoading.value = true;

    try {
      const response = await api.auth.getLoginRequest.perform(loginFormData.value)

      token.value = response.token;
      username.value = response.username;

      localStorage.setItem('token', response.token);
      localStorage.setItem('username', response.username);

      return response;
    } catch (error) {
      ElNotification({
        title: 'Error',
        message: error.response?.data?.message ?? 'Login failed',
        type: 'error',
      });
      throw error;
    } finally {
      isAuthLoading.value = false;
    }
  }

  const isAuth = computed(() => Boolean(localStorage.getItem('token')));

  return {
    loginFormData,
    isAuthLoading,
    login,
    token,
    isAuth,
  }
});
