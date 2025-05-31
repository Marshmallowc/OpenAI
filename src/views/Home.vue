<script setup>
import { ref, inject, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
// Inject the sidebar collapsed state
const sidebarCollapsed = inject('sidebarCollapsed', ref(false))

// 添加动画状态
const heroAnimated = ref(false)
const suggestionsAnimated = ref(false)

// 在组件挂载后启动动画
onMounted(() => {
  // 延迟执行以确保DOM已完全渲染
  setTimeout(() => {
    heroAnimated.value = true
    
    // 错开建议卡片的动画时间
    setTimeout(() => {
      suggestionsAnimated.value = true
    }, 500)
  }, 100)
})

// 处理卡片点击，将文本发送到Explore页面
const handleSuggestionClick = (text) => {
  console.log('点击了建议卡片:', text)
  // 使用路由导航到Explore页面，并通过query参数传递消息
  router.push({
    path: '/explore',
    query: { message: text }
  }).catch(err => {
    console.error('路由导航失败:', err)
    // 如果已经在explore页面，尝试强制刷新路由
    if (router.currentRoute.value.path === '/explore') {
      router.replace({
        path: '/explore',
        query: { message: text, _t: Date.now() }
      })
    }
  })
}

const suggestions = ref([
  { 
    id: 1, 
    text: 'Write a text inviting my neighbors to a barbecue',
    action: () => handleSuggestionClick('Write a text inviting my neighbors to a barbecue')
  },
  { 
    id: 2, 
    text: 'Give me ideas for what to do with my kids\' art',
    action: () => handleSuggestionClick('Give me ideas for what to do with my kids\' art')
  },
  { 
    id: 3, 
    text: 'Help me study vocabulary for a college entrance exam',
    action: () => handleSuggestionClick('Help me study vocabulary for a college entrance exam')
  },
  { 
    id: 4, 
    text: 'Write a message that goes with a kitten gif for a friend on a rough day',
    action: () => handleSuggestionClick('Write a message that goes with a kitten gif for a friend on a rough day')
  },
  { 
    id: 5, 
    text: 'Help me pick an outfit that will look good on camera',
    action: () => handleSuggestionClick('Help me pick an outfit that will look good on camera')
  },
  { 
    id: 6, 
    text: 'Write an email to request a quote from local plumbers',
    action: () => handleSuggestionClick('Write an email to request a quote from local plumbers')
  },
  { 
    id: 7, 
    text: 'Create a charter to start a film club',
    action: () => handleSuggestionClick('Create a charter to start a film club')
  },
  { 
    id: 8, 
    text: 'Write a Python script to automate sending daily email reports',
    action: () => handleSuggestionClick('Write a Python script to automate sending daily email reports')
  },
  { 
    id: 9, 
    text: 'Design a programming game teach basics in a fun way',
    action: () => handleSuggestionClick('Design a programming game teach basics in a fun way')
  },
  { 
    id: 10, 
    text: 'Make up a story about Sharky, a tooth-brushing shark superhero',
    action: () => handleSuggestionClick('Make up a story about Sharky, a tooth-brushing shark superhero')
  },
  { 
    id: 11, 
    text: 'Explain nostalgia to a kindergartener',
    action: () => handleSuggestionClick('Explain nostalgia to a kindergartener')
  },
  { 
    id: 12, 
    text: 'Plan a trip to experience Seoul like a local',
    action: () => handleSuggestionClick('Plan a trip to experience Seoul like a local')
  },
])

const navigateTo = (path) => {
  router.push(path)
}

const startChatGPT = () => {
  router.push('/explore')
}

const downloadApp = () => {
  // Logic for downloading the app
  console.log('Download app clicked')
  router.push('/download')
}

// 背景元素数据
const backgroundElements = ref([])

// 生成随机背景元素
onMounted(() => {
  for (let i = 0; i < 20; i++) {
    backgroundElements.value.push({
      id: i,
      top: Math.random() * 100 + '%',
      left: Math.random() * 100 + '%',
      size: Math.random() * 50 + 10 + 'px',
      animationDelay: Math.random() * 5 + 's',
      animationDuration: (Math.random() * 10 + 15) + 's',
      opacity: Math.random() * 0.1 + 0.05
    })
  }
})
</script>

<template>
  <div class="home">
    <!-- 流动背景 -->
    <div class="flowing-background">
      <div v-for="element in backgroundElements" :key="element.id"
           class="background-element"
           :style="{
              top: element.top,
              left: element.left,
              width: element.size,
              height: element.size,
              animationDelay: element.animationDelay,
              animationDuration: element.animationDuration,
              opacity: element.opacity
           }">
      </div>
    </div>
    
    <!-- Main Content -->
    <main class="main-content" :class="{ 'sidebar-collapsed': sidebarCollapsed }">
      <div class="hero" :class="{ 'animated': heroAnimated }">
        <div class="hero-badge">ChatGPT</div>
        <h1 class="hero-title">
          <span class="animate-text">Get answers.</span>
          <span class="animate-text delay-1">Find inspiration.</span>
          <span class="animate-text delay-2">Be more productive.</span>
        </h1>
        <p class="hero-description">Free to use. Easy to try. Just ask and ChatGPT can help with writing, learning, brainstorming, and more.</p>
        
        <div class="hero-actions">
          <button class="btn btn-primary start-btn pulse-animation" @click="startChatGPT">
            Start now
            <span class="arrow-icon">→</span>
          </button>
          <button class="btn btn-outline download-btn" @click="downloadApp">
            Download the app
            <span class="arrow-icon">→</span>
          </button>
        </div>
      </div>

      <!-- Suggestion Grid -->
      <div class="suggestions-grid" :class="{ 'animated': suggestionsAnimated }">
        <div v-for="(suggestion, index) in suggestions" :key="suggestion.id" 
             class="suggestion-item" 
             :style="{ '--i': index }"
             @click="suggestion.action">
          <p>{{ suggestion.text }}</p>
          <span class="suggestion-arrow">→</span>
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped>
.home {
  display: flex;
  min-height: 100vh;
  position: relative;
  overflow-x: hidden;
  overflow-y: auto;
}

/* 流动背景样式 */
.flowing-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 0;
}

.background-element {
  position: absolute;
  border-radius: 50%;
  background: linear-gradient(120deg, rgba(16, 163, 127, 0.15), rgba(16, 163, 127, 0.05));
  animation: float-around linear infinite;
  z-index: -1;
  filter: blur(5px);
}

@keyframes float-around {
  0% {
    transform: translate(0, 0) rotate(0deg) scale(1);
  }
  25% {
    transform: translate(10%, 15%) rotate(90deg) scale(1.05);
  }
  50% {
    transform: translate(5%, 10%) rotate(180deg) scale(1.1);
  }
  75% {
    transform: translate(-5%, 5%) rotate(270deg) scale(1.05);
  }
  100% {
    transform: translate(0, 0) rotate(360deg) scale(1);
  }
}

.main-content {
  flex: 1;
  margin-left: 200px;
  margin-top: 60px;
  padding: 40px;
  padding-bottom: 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: margin-left 0.3s ease;
  z-index: 1;
  position: relative;
  height: auto;
  min-height: auto;
}

.main-content.sidebar-collapsed {
  margin-left: 60px;
}

.hero {
  text-align: center;
  max-width: 800px;
  margin: 0 auto 40px;
  transform: translateY(30px);
  opacity: 0;
  transition: all 0.8s cubic-bezier(0.215, 0.61, 0.355, 1);
}

.hero.animated {
  transform: translateY(0);
  opacity: 1;
}

.hero-badge {
  display: inline-block;
  font-weight: 500;
  margin-bottom: 24px;
  background-color: rgba(16, 163, 127, 0.1);
  color: var(--primary-color);
  padding: 6px 12px;
  border-radius: 16px;
  transform: translateY(20px);
  opacity: 0;
  animation: fade-in-up 0.6s forwards;
  animation-delay: 0.3s;
}

.hero-title {
  font-size: 3rem;
  font-weight: 600;
  line-height: 1.2;
  margin-bottom: 24px;
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.animate-text {
  opacity: 0;
  transform: translateY(20px);
  animation: fade-in-up 0.6s forwards;
  animation-delay: 0.6s;
}

.delay-1 {
  animation-delay: 0.9s;
}

.delay-2 {
  animation-delay: 1.2s;
}

.hero-description {
  font-size: 1.1rem;
  margin-bottom: 32px;
  opacity: 0;
  transform: translateY(20px);
  animation: fade-in-up 0.6s forwards;
  animation-delay: 1.5s;
}

.hero-actions {
  display: flex;
  gap: 16px;
  justify-content: center;
  margin-bottom: 48px;
  opacity: 0;
  transform: translateY(20px);
  animation: fade-in-up 0.6s forwards;
  animation-delay: 1.8s;
}

.start-btn, .download-btn {
  padding: 10px 16px;
  border-radius: 6px;
  font-size: 1rem;
  display: flex;
  align-items: center;
  gap: 8px;
}

.pulse-animation {
  animation: pulse 2s infinite;
  animation-delay: 2.5s;
}

@keyframes pulse {
  0% {
    box-shadow: 0 0 0 0 rgba(16, 163, 127, 0.4);
  }
  70% {
    box-shadow: 0 0 0 10px rgba(16, 163, 127, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(16, 163, 127, 0);
  }
}

.arrow-icon {
  font-size: 1.2rem;
  transition: transform 0.3s ease;
}

.start-btn:hover .arrow-icon, .download-btn:hover .arrow-icon {
  transform: translateX(4px);
}

.suggestions-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 20px;
  width: 100%;
  max-width: 1200px;
  opacity: 0;
  transition: opacity 1s ease;
  margin-bottom: 40px;
}

.suggestions-grid.animated {
  opacity: 1;
}

.suggestion-item {
  position: relative;
  height: auto;
  min-height: 80px;
  display: flex;
  align-items: center;
  padding: 20px 42px 20px 20px;
  border-radius: 12px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  background-color: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(10px);
  cursor: pointer;
  transform: translateY(30px);
  opacity: 0;
  animation: fade-in-up 0.5s forwards;
  animation-play-state: paused;
  transition: all 0.4s cubic-bezier(0.19, 1, 0.22, 1);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  overflow: hidden;
  will-change: transform, box-shadow;
}

.suggestions-grid.animated .suggestion-item {
  animation-play-state: running;
}

.suggestion-item::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(120deg, transparent 30%, rgba(16, 163, 127, 0.03) 50%, transparent 70%);
  background-size: 200% 200%;
  animation: shimmer 6s infinite;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.suggestion-item:hover::before {
  opacity: 1;
}

@keyframes shimmer {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}

.suggestion-item:hover {
  background-color: rgba(255, 255, 255, 0.95);
  transform: translateY(-12px) scale(1.03);
  box-shadow: 0 20px 35px rgba(0, 0, 0, 0.12);
  border-color: rgba(16, 163, 127, 0.6);
  animation-play-state: paused;
  transition: all 0.3s cubic-bezier(0.165, 0.84, 0.44, 1);
  z-index: 5;
}

.suggestion-item:hover .suggestion-arrow {
  transform: translateX(5px);
  opacity: 1;
  color: var(--primary-color);
}

.suggestion-item p {
  font-size: 1rem;
  line-height: 1.5;
  color: #353740;
  margin: 0;
  transition: color 0.3s ease;
}

.suggestion-item:hover p {
  color: var(--primary-color);
}

.suggestion-arrow {
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 1.2rem;
  color: rgba(0, 0, 0, 0.4);
  opacity: 0.7;
  transition: all 0.3s ease;
}

/* 流动效果模拟 - 优化后的版本 */
.suggestion-item:nth-child(1) {
  animation-duration: 0.5s, 4s;
  animation-delay: 0.05s, 0.3s;
}

.suggestion-item:nth-child(2) {
  animation-duration: 0.5s, 5s;
  animation-delay: 0.1s, 0.5s;
}

.suggestion-item:nth-child(3) {
  animation-duration: 0.5s, 6s;
  animation-delay: 0.15s, 0.7s;
}

.suggestion-item:nth-child(4) {
  animation-duration: 0.5s, 4.5s;
  animation-delay: 0.2s, 0.2s;
}

.suggestion-item:nth-child(5) {
  animation-duration: 0.5s, 5.5s;
  animation-delay: 0.25s, 0.4s;
}

.suggestion-item:nth-child(6) {
  animation-duration: 0.5s, 4.2s;
  animation-delay: 0.3s, 0.9s;
}

.suggestion-item:nth-child(7) {
  animation-duration: 0.5s, 5.2s;
  animation-delay: 0.35s, 0.6s;
}

.suggestion-item:nth-child(8) {
  animation-duration: 0.5s, 4.7s;
  animation-delay: 0.4s, 0.8s;
}

.suggestion-item:nth-child(9) {
  animation-duration: 0.5s, 5.7s;
  animation-delay: 0.45s, 0.4s;
}

.suggestion-item:nth-child(10) {
  animation-duration: 0.5s, 4.3s;
  animation-delay: 0.5s, 0.7s;
}

.suggestion-item:nth-child(11) {
  animation-duration: 0.5s, 5.3s;
  animation-delay: 0.55s, 0.5s;
}

.suggestion-item:nth-child(12) {
  animation-duration: 0.5s, 4.8s;
  animation-delay: 0.6s, 0.3s;
}

/* 应用更明显的交错动画 */
.suggestions-grid.animated .suggestion-item:nth-child(odd) {
  animation: fade-in-up 0.5s forwards, float-subtle 4s ease-in-out infinite;
  transform-origin: center bottom;
}

.suggestions-grid.animated .suggestion-item:nth-child(even) {
  animation: fade-in-up 0.5s forwards, float-diagonal 5s ease-in-out infinite;
  transform-origin: center bottom;
}

/* 添加更多变化，使动画不那么重复，减少卡顿感 */
.suggestions-grid.animated .suggestion-item:nth-child(3n) {
  animation: fade-in-up 0.5s forwards, float-3d 4.5s ease-in-out infinite;
  transform-origin: center center;
}

.suggestions-grid.animated .suggestion-item:nth-child(3n+1) {
  animation: fade-in-up 0.5s forwards, float-horizontal 4s ease-in-out infinite, float-subtle 6s ease-in-out infinite;
  transform-origin: center;
}

/* 优化流动动画效果 - 增大幅度 */
@keyframes float-subtle {
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-15px);
  }
  100% {
    transform: translateY(0px);
  }
}

/* 新增更明显的水平流动效果 */
@keyframes float-horizontal {
  0% {
    transform: translateX(0px);
  }
  50% {
    transform: translateX(12px);
  }
  100% {
    transform: translateX(0px);
  }
}

/* 添加斜向运动 */
@keyframes float-diagonal {
  0% {
    transform: translate(0px, 0px);
  }
  50% {
    transform: translate(10px, -12px);
  }
  100% {
    transform: translate(0px, 0px);
  }
}

/* 3D浮动效果 */
@keyframes float-3d {
  0% {
    transform: translate3d(0px, 0px, 0px) rotateY(0deg);
  }
  50% {
    transform: translate3d(8px, -14px, 20px) rotateY(3deg);
  }
  100% {
    transform: translate3d(0px, 0px, 0px) rotateY(0deg);
  }
}

@keyframes fade-in-up {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
</style> 