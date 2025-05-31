<script setup>
import { inject, ref } from 'vue'
import { useRouter } from 'vue-router'

defineProps({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    default: 'Content coming soon'
  }
})

const router = useRouter()
// Inject the sidebar collapsed state
const sidebarCollapsed = inject('sidebarCollapsed', ref(false))

const navigateHome = () => {
  router.push('/')
}
</script>

<template>
  <div class="page-template">
    <!-- Main Content -->
    <main class="main-content" :class="{ 'sidebar-collapsed': sidebarCollapsed }">
      <div class="page-content">
        <h1 class="page-title">{{ title }}</h1>
        <div class="page-body">
          <p>{{ content }}</p>
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped>
.page-template {
  display: flex;
  height: 100vh;
}

.main-content {
  flex: 1;
  margin-left: 200px;
  margin-top: 60px;
  padding: 40px;
  transition: margin-left 0.3s ease;
}

.main-content.sidebar-collapsed {
  margin-left: 60px;
}

.page-content {
  max-width: 800px;
  margin: 0 auto;
}

.page-title {
  font-size: 2.5rem;
  font-weight: 600;
  margin-bottom: 24px;
}

.page-body {
  font-size: 1.1rem;
  line-height: 1.6;
}
</style> 