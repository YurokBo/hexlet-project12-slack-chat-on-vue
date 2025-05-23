<template>
  <div class="common-layout">
    <el-container>
      <el-menu
        :default-active="activeIndex"
        class="common-layout__header"
        mode="horizontal"
        :ellipsis="false"
        @select="handleSelect"
      >
        <el-menu-item index="0">
          <router-link :to="{ name: 'login' }" class="common-layout__logo-link">
            Hexlet Chat
          </router-link>
        </el-menu-item>
      </el-menu>
      <el-main class="common-layout__main">
        <RouterView />
      </el-main>
    </el-container>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const activeIndex = ref('1')
</script>

<style lang="scss">
body,
p,
h1,h2,h3,h4,h5,h6{
  margin: 0;
}

body {
  font-family: sans-serif;
}

.common-layout {
  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: fixed;
    width: 100%;
    box-shadow: var(--el-box-shadow-light);
  }

  &__main {
    margin-top: 60px;
  }

  &__logo-link {
    text-decoration: none;
    font-size: 20px;
  }
}
</style>
