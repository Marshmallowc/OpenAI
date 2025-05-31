<script setup>
// Main app component
import Header from './components/Header.vue'
import Sidebar from './components/Sidebar.vue'
</script>

<template>
  <div class="app-container">
    <Header />
    <Sidebar />
    <router-view />
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Söhne', -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif;
}

body {
  background-color: #ffffff;
  overflow-x: hidden; /* 防止水平滚动 */
}

.app-container {
  width: 100%;
  min-height: 100vh; /* 使用最小高度而不是固定高度 */
  background-color: #ffffff;
  position: relative; /* 添加相对定位 */
}
</style>
