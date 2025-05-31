<script setup>
import { ref, provide } from 'vue'

// Sidebar collapse state
const isCollapsed = ref(false)

// Toggle sidebar collapse state
const toggleSidebar = () => {
  isCollapsed.value = !isCollapsed.value
}

// Provide the collapsed state to other components
provide('sidebarCollapsed', isCollapsed)
</script>

<template>
  <nav class="sidebar" :class="{ 'collapsed': isCollapsed }">
    <div class="toggle-button" @click="toggleSidebar">
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" :class="{ 'rotate-180': isCollapsed }">
        <path d="M15 18l-6-6 6-6"/>
      </svg>
    </div>
    <div class="sidebar-links">
      <router-link to="/" class="nav-link">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
          <polyline points="9 22 9 12 15 12 15 22"></polyline>
        </svg>
        <span v-show="!isCollapsed">Home</span>
      </router-link>
      <router-link to="/explore" class="nav-link">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="10"/>
          <line x1="12" y1="8" x2="12" y2="16"/>
          <line x1="8" y1="12" x2="16" y2="12"/>
        </svg>
        <span v-show="!isCollapsed">Explore ChatGPT</span>
      </router-link>
      <router-link to="/team" class="nav-link">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
          <circle cx="9" cy="7" r="4"/>
          <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
        </svg>
        <span v-show="!isCollapsed">Team</span>
      </router-link>
      <router-link to="/enterprise" class="nav-link">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
          <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
        </svg>
        <span v-show="!isCollapsed">Enterprise</span>
      </router-link>
      <router-link to="/pricing" class="nav-link">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="10"/>
          <path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8"/>
          <path d="M12 18V6"/>
        </svg>
        <span v-show="!isCollapsed">Pricing</span>
      </router-link>
      <router-link to="/download" class="nav-link">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
          <polyline points="7 10 12 15 17 10"/>
          <line x1="12" y1="15" x2="12" y2="3"/>
        </svg>
        <span v-show="!isCollapsed">Download</span>
      </router-link>
    </div>
  </nav>
</template>

<style scoped>
.sidebar {
  position: fixed;
  top: 60px;
  left: 0;
  width: 200px;
  height: calc(100vh - 60px);
  background-color: white;
  border-right: none;
  padding: 20px 0;
  transition: width 0.3s ease;
  overflow-x: hidden;
  z-index: 100;
}

.sidebar.collapsed {
  width: 60px;
}

.toggle-button {
  position: absolute;
  top: 10px;
  right: 10px;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background-color: var(--light-gray);
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 101;
  box-shadow: 0 1px 3px rgba(0,0,0,0.05);
}

.toggle-button:hover {
  background-color: #e9e9ea;
  transform: scale(1.05);
}

.toggle-button svg {
  transition: transform 0.3s ease;
}

.toggle-button svg.rotate-180 {
  transform: rotate(180deg);
}

.sidebar-links {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 20px;
}

.nav-link {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 20px;
  text-decoration: none;
  color: var(--text-color);
  border-radius: 6px;
  margin: 0 10px;
  white-space: nowrap;
  transition: all 0.2s ease;
}

.nav-link:hover,
.nav-link.router-link-active {
  background-color: var(--light-gray);
  transform: translateX(2px);
}

.nav-link.router-link-active {
  color: var(--primary-color);
  font-weight: 500;
}

.sidebar.collapsed .nav-link {
  justify-content: center;
  margin: 0 auto;
  padding: 10px;
}

.sidebar.collapsed .nav-link:hover {
  transform: scale(1.1);
}
</style> 