<template>
  <div class="login-page">
    <el-card class="login-page__wrapper" header-class="login-page__header" footer-class="login-page__footer">
      <template #header>
        Login
      </template>
      <div class="login-page__content">
        <div class="login-page__content-item login-page__image-box">
          <img :src="loginImage" alt="login image" />
        </div>
        <LoginForm class="login-page__content-item" />
      </div>
      <template #footer>
        Don't have an account? Register
      </template>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import LoginForm from '@/views/login/login-form/login-form.vue';
import loginImage from '@/assets/images/login-image.png'
</script>
<style lang="scss">
.login-page {
  display: flex;
  justify-content: center;
  align-items: center;

  &__wrapper {
    min-width: 320px;
    max-width: 846px;
    width: 100%;
    height: 100%;
  }

  &__header {
    font-size: 40px;
    font-weight: 500;
  }

   &__content {
     display: flex;
     justify-content: stretch;
     align-items: center;
     gap: 20px;
   }

  &__content-item {
    width: 100%;
  }

  &__image-box {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &__footer {
    text-align: center;
    background-color: var(--el-color-info-light-9);
  }
}
</style>
