<template>
  <el-menu
    :default-active="activeIndex"
    class="common-layout__header"
    mode="horizontal"
    :ellipsis="false"
  >
    <el-menu-item index="0">
      <router-link :to="{ name: 'home' }" class="common-layout__logo-link">
        Hexlet Chat
      </router-link>
    </el-menu-item>
    <el-menu-item index="0">
      <el-button @click="logOut">
        Exit
      </el-button>
    </el-menu-item>
  </el-menu>
</template>

<script lang="ts" setup>
import { useAuthStore } from "@/stores/auth.store";
import { ref } from "vue";

const activeIndex = ref('1')

const authStore = useAuthStore();
const { logout } = authStore;

const logOut = () => {
  logout();
}
</script>
<style lang="scss"></style>
