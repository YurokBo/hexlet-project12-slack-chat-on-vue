<template>
  <el-form
    ref="loginFormDataRef"
    v-loading="isAuthLoading"
    :model="loginFormData"
    size="large"
    :rules="{
        username: [{
          required: true,
          trigger: 'blur',
          message: 'Enter your name'
        }],
        password: [{
          required: true,
          trigger: 'blur',
          message: 'Enter your password'
        }]
    }"
    label-position="top"
    @submit.prevent
  >
    <el-form-item label="Name" required prop="username">
      <el-input v-model="loginFormData.username" placeholder="Enter name" />
    </el-form-item>
    <el-form-item label="Password" required prop="password">
      <el-input v-model="loginFormData.password" type="password" placeholder="Enter password" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitLoginForm">
        Login
      </el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import { useAuthStore } from '@/stores/auth.store';
import { storeToRefs } from "pinia";
import { ref } from 'vue';
import { FormInstance } from 'element-plus';
import router from "@/router";

const authStore = useAuthStore();
const { loginFormData, isAuthLoading } = storeToRefs(authStore);
const { login } = authStore;

const loginFormDataRef = ref<FormInstance>();

async function submitLoginForm() {
  if (!loginFormDataRef.value) {
    return;
  }

  loginFormDataRef.value.validate(async (valid) => {
    if (!valid) {
      return;
    }

    try {
      await login();

      router.push({ name: 'home' });
    } catch (error) {
      console.error(error);
    }
  });
}
</script>
<style lang="scss"></style>
