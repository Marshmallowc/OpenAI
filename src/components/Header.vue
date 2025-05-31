<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const navigateHome = () => {
  router.push('/')
}
</script>

<template>
  <header class="header">
    <div class="header-content">
      <div class="logo" @click="navigateHome">
        <img src="../assets/logo.svg" alt="OpenAI Logo" class="logo-img" />
        <h1>OpenAI</h1>
      </div>
      <div class="header-actions">
        <div class="search-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
        </div>
        <button class="btn login-btn" @click="navigateHome">Log in</button>
      </div>
    </div>
  </header>
</template>

<style scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 60px;
  background-color: white;
  border-bottom: none;
  z-index: 1000;
  box-shadow: 0 1px 3px rgba(0,0,0,0.05);
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  padding: 0 20px;
}

.logo {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
}

.logo-img {
  width: 24px;
  height: 24px;
}

.logo h1 {
  font-size: 1.3rem;
  font-weight: 600;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 16px;
}

.login-btn {
  border: none;
  background: none;
  font-weight: 500;
  cursor: pointer;
}

/* Search icon hover effect */
.search-icon {
  cursor: pointer;
  border-radius: 50%;
  padding: 6px;
  transition: background-color 0.2s ease;
}

.search-icon:hover {
  background-color: var(--light-gray);
}
</style> 