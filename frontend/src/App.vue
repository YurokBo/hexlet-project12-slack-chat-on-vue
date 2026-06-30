<template>
  <div class="common-layout">
    <el-container>
      <MainMenu />
      <el-main class="common-layout__main">
        <RouterView />
      </el-main>
    </el-container>
  </div>
</template>

<script lang="ts" setup>
import MainMenu from '@/components/menu/main-menu.vue';
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
