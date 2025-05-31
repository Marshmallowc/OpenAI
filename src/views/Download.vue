<script setup>
import { ref, inject, computed } from 'vue'
import { useRouter } from 'vue-router'

// Inject the sidebar collapsed state
const sidebarCollapsed = inject('sidebarCollapsed', ref(false))
const router = useRouter()

// 检测操作系统
const userPlatform = computed(() => {
  const userAgent = navigator.userAgent.toLowerCase()
  
  if (userAgent.includes('windows')) return 'windows'
  if (userAgent.includes('macintosh') || userAgent.includes('mac os')) return 'mac'
  if (userAgent.includes('linux')) return 'linux'
  if (userAgent.includes('android')) return 'android'
  if (userAgent.includes('iphone') || userAgent.includes('ipad')) return 'ios'
  
  return 'windows' // 默认为Windows
})

// 下载链接
const downloadLinks = {
  windows: {
    title: 'Windows',
    icon: 'windows',
    link: 'https://example.com/chatgpt-windows.exe',
    size: '86 MB',
    version: '1.2.4',
    requirements: 'Windows 10 or later (64-bit)',
    instructions: [
      'Download the installer',
      'Double-click the installer file',
      'Follow the installation wizard',
      'Launch ChatGPT from your Start menu'
    ]
  },
  mac: {
    title: 'macOS',
    icon: 'apple',
    link: 'https://example.com/chatgpt-mac.dmg',
    size: '92 MB',
    version: '1.2.4',
    requirements: 'macOS 11.0 or later',
    instructions: [
      'Download the disk image',
      'Open the disk image',
      'Drag ChatGPT to your Applications folder',
      'Launch ChatGPT from your Applications folder'
    ]
  },
  linux: {
    title: 'Linux',
    icon: 'linux',
    link: 'https://example.com/chatgpt-linux.deb',
    size: '82 MB',
    version: '1.2.4',
    requirements: 'Ubuntu 20.04, Debian 11, or compatible (64-bit)',
    instructions: [
      'Download the package',
      'Open with your package manager',
      'Install the package',
      'Launch ChatGPT from your application menu'
    ]
  },
  android: {
    title: 'Android',
    icon: 'android',
    link: 'https://play.google.com/store/apps/details?id=com.example.chatgpt',
    size: '45 MB',
    version: '1.2.3',
    requirements: 'Android 8.0 or later',
    instructions: [
      'Open Google Play Store',
      'Search for "ChatGPT"',
      'Tap "Install"',
      'Open the app after installation'
    ]
  },
  ios: {
    title: 'iOS',
    icon: 'apple',
    link: 'https://apps.apple.com/app/chatgpt/id1234567890',
    size: '48 MB',
    version: '1.2.3',
    requirements: 'iOS 15.0 or later',
    instructions: [
      'Open App Store',
      'Search for "ChatGPT"',
      'Tap "Get" or download icon',
      'Open the app after installation'
    ]
  }
}

// 系统要求
const systemRequirements = {
  desktop: [
    {
      title: 'Windows',
      requirements: [
        'Windows 10 or later (64-bit)',
        'Intel Core i3 or AMD Ryzen 3 processor or better',
        '4 GB RAM minimum, 8 GB recommended',
        '250 MB available storage',
        'Internet connection'
      ]
    },
    {
      title: 'macOS',
      requirements: [
        'macOS 11.0 (Big Sur) or later',
        'Apple M1 chip or Intel Core i3 or better',
        '4 GB RAM minimum, 8 GB recommended',
        '250 MB available storage',
        'Internet connection'
      ]
    },
    {
      title: 'Linux',
      requirements: [
        'Ubuntu 20.04, Debian 11, or compatible distributions (64-bit)',
        'Intel Core i3 or AMD Ryzen 3 processor or better',
        '4 GB RAM minimum, 8 GB recommended',
        '250 MB available storage',
        'Internet connection'
      ]
    }
  ],
  mobile: [
    {
      title: 'Android',
      requirements: [
        'Android 8.0 or later',
        '2 GB RAM minimum',
        '100 MB available storage',
        'Internet connection'
      ]
    },
    {
      title: 'iOS',
      requirements: [
        'iOS 15.0 or later',
        'Compatible with iPhone, iPad, and iPod touch',
        '100 MB available storage',
        'Internet connection'
      ]
    }
  ]
}

// 常见问题
const faqItems = [
  {
    question: 'Is the ChatGPT app free to download?',
    answer: 'Yes, the ChatGPT app is free to download. However, some features may require a subscription to ChatGPT Plus or a Team plan.'
  },
  {
    question: 'Can I use the same account across multiple devices?',
    answer: 'Yes, you can use the same ChatGPT account on multiple devices. Your conversations will be synchronized across all your devices.'
  },
  {
    question: 'Do I need an internet connection to use ChatGPT?',
    answer: 'Yes, ChatGPT requires an internet connection to function as the language model runs on our servers. However, the app includes limited offline capabilities for viewing your recent conversations.'
  },
  {
    question: 'How do I update to the latest version?',
    answer: 'On desktop, the app will automatically check for updates and prompt you when a new version is available. On mobile devices, updates are handled through the App Store or Google Play Store.'
  },
  {
    question: 'Why is the app not available in my country?',
    answer: 'ChatGPT may not be available in all regions due to regulatory requirements or other restrictions. We\'re continuously working to expand our availability to more countries.'
  }
]

// 展开/收起FAQ项目
const toggleFaq = (index) => {
  expandedFaq.value = expandedFaq.value === index ? null : index
}

const expandedFaq = ref(null)

// 选择的平台
const selectedPlatform = ref(userPlatform.value)

// 切换平台
const switchPlatform = (platform) => {
  selectedPlatform.value = platform
}

// 开始下载
const startDownload = () => {
  // 实际应用中会真正触发下载
  console.log('Starting download for', selectedPlatform.value)
  window.open(downloadLinks[selectedPlatform.value].link, '_blank')
}

// 跳转到商店
const goToStore = (platform) => {
  window.open(downloadLinks[platform].link, '_blank')
}
</script>

<template>
  <div class="download-page">
    <main class="main-content" :class="{ 'sidebar-collapsed': sidebarCollapsed }">
      <!-- 页面标题 -->
      <section class="page-header">
        <h1>Download ChatGPT</h1>
        <p class="subtitle">Experience the power of AI on your device</p>
      </section>

      <!-- 主要下载区域 -->
      <section class="main-download-section">
        <div class="download-card">
          <div class="platform-switcher">
            <button 
              v-for="(platform, key) in downloadLinks" 
              :key="key"
              @click="switchPlatform(key)"
              :class="{ active: selectedPlatform === key }"
              class="platform-button">
              <span class="platform-icon" :class="platform.icon"></span>
              <span class="platform-name">{{ platform.title }}</span>
            </button>
          </div>

          <div class="download-content">
            <div class="platform-info">
              <h2>
                <span class="platform-icon large" :class="downloadLinks[selectedPlatform].icon"></span>
                ChatGPT for {{ downloadLinks[selectedPlatform].title }}
              </h2>
              <div class="version-info">
                <span class="version">Version {{ downloadLinks[selectedPlatform].version }}</span>
                <span class="size">{{ downloadLinks[selectedPlatform].size }}</span>
              </div>
              <p class="requirements">{{ downloadLinks[selectedPlatform].requirements }}</p>
              
              <button class="btn btn-primary download-btn" @click="startDownload">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                  <polyline points="7 10 12 15 17 10"/>
                  <line x1="12" y1="15" x2="12" y2="3"/>
                </svg>
                Download for {{ downloadLinks[selectedPlatform].title }}
              </button>
            </div>
            
            <div class="installation-instructions">
              <h3>Installation Instructions</h3>
              <ol class="steps-list">
                <li v-for="(step, index) in downloadLinks[selectedPlatform].instructions" :key="index">
                  {{ step }}
                </li>
              </ol>
            </div>
          </div>
        </div>
      </section>

      <!-- 移动应用推广 -->
      <section class="mobile-apps-section" v-if="selectedPlatform !== 'android' && selectedPlatform !== 'ios'">
        <h2>ChatGPT on Mobile</h2>
        <div class="app-stores">
          <div class="app-store-card">
            <div class="store-logo android"></div>
            <h3>Android App</h3>
            <p>Download ChatGPT from Google Play Store</p>
            <button class="btn btn-outline" @click="goToStore('android')">Get it on Google Play</button>
          </div>
          <div class="app-store-card">
            <div class="store-logo ios"></div>
            <h3>iOS App</h3>
            <p>Download ChatGPT from App Store</p>
            <button class="btn btn-outline" @click="goToStore('ios')">Get it on App Store</button>
          </div>
        </div>
      </section>

      <!-- 系统要求 -->
      <section class="system-requirements-section">
        <h2>System Requirements</h2>
        
        <div class="requirements-tabs">
          <div class="tab-group">
            <h3>Desktop Apps</h3>
            <div class="requirements-cards">
              <div v-for="(platform, index) in systemRequirements.desktop" :key="index" class="requirement-card">
                <h4>{{ platform.title }}</h4>
                <ul>
                  <li v-for="(requirement, reqIndex) in platform.requirements" :key="reqIndex">
                    {{ requirement }}
                  </li>
                </ul>
              </div>
            </div>
          </div>
          
          <div class="tab-group">
            <h3>Mobile Apps</h3>
            <div class="requirements-cards">
              <div v-for="(platform, index) in systemRequirements.mobile" :key="index" class="requirement-card">
                <h4>{{ platform.title }}</h4>
                <ul>
                  <li v-for="(requirement, reqIndex) in platform.requirements" :key="reqIndex">
                    {{ requirement }}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 常见问题 -->
      <section class="faq-section">
        <h2>Frequently Asked Questions</h2>
        <div class="faq-container">
          <div v-for="(item, index) in faqItems" 
               :key="index" 
               class="faq-item"
               :class="{ 'expanded': expandedFaq === index }">
            <div class="faq-question" @click="toggleFaq(index)">
              <h3>{{ item.question }}</h3>
              <svg class="icon-chevron" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </div>
            <div class="faq-answer" :class="{ 'show': expandedFaq === index }">
              <p>{{ item.answer }}</p>
            </div>
          </div>
        </div>
      </section>

      <!-- 呼叫组件 -->
      <section class="cta-section">
        <div class="cta-content">
          <h2>Ready to start your AI journey?</h2>
          <p>Download ChatGPT on your preferred device and experience the future of AI</p>
          <div class="cta-buttons">
            <button class="btn btn-primary" @click="startDownload">Download Now</button>
            <button class="btn btn-outline" @click="router.push('/pricing')">View Plans</button>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<style scoped>
.download-page {
  display: flex;
  min-height: 100vh;
}

.main-content {
  flex: 1;
  margin-left: 200px;
  margin-top: 60px;
  padding-bottom: 80px;
  transition: margin-left 0.3s ease;
}

.main-content.sidebar-collapsed {
  margin-left: 60px;
}

/* 页面标题样式 */
.page-header {
  text-align: center;
  padding: 60px 20px 40px;
}

.page-header h1 {
  font-size: 2.8rem;
  font-weight: 700;
  margin-bottom: 16px;
  background: linear-gradient(135deg, #10a37f, #066e54);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.page-header .subtitle {
  font-size: 1.2rem;
  color: #555;
  max-width: 600px;
  margin: 0 auto;
}

/* 主下载区域样式 */
.main-download-section {
  padding: 0 40px 60px;
}

.download-card {
  background: white;
  border-radius: 16px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  max-width: 900px;
  margin: 0 auto;
}

.platform-switcher {
  display: flex;
  background: #f8f9fa;
  border-bottom: 1px solid #eaeaea;
  overflow-x: auto;
}

.platform-button {
  padding: 20px 24px;
  display: flex;
  align-items: center;
  gap: 10px;
  background: transparent;
  border: none;
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.3s ease;
  position: relative;
  color: #555;
  font-weight: 500;
}

.platform-button:hover {
  background-color: rgba(0, 0, 0, 0.03);
}

.platform-button.active {
  color: var(--primary-color);
  font-weight: 600;
}

.platform-button.active::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 3px;
  background-color: var(--primary-color);
}

.platform-icon {
  width: 20px;
  height: 20px;
  display: inline-block;
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
}

.platform-icon.large {
  width: 28px;
  height: 28px;
  margin-right: 12px;
}

.platform-icon.windows {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 448 512'%3E%3Cpath fill='%230078d7' d='M0 93.7l183.6-25.3v177.4H0V93.7zm0 324.6l183.6 25.3V268.4H0v149.9zm203.8 28L448 480V268.4H203.8v177.9zm0-380.6v180.1H448V32L203.8 65.7z'/%3E%3C/svg%3E");
}

.platform-icon.apple {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 384 512'%3E%3Cpath fill='%23555' d='M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z'/%3E%3C/svg%3E");
}

.platform-icon.linux {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 448 512'%3E%3Cpath fill='%23333' d='M220.8 123.3c1 .5 1.8 1.7 3 1.7 1.1 0 2.8-.4 2.9-1.5.2-1.4-1.9-2.3-3.2-2.9-1.7-.7-3.9-1-5.5-.1-.4.2-.8.7-.6 1.1.3 1.3 2.3 1.1 3.4 1.7zm-21.9 1.7c1.2 0 2-1.2 3-1.7 1.1-.6 3.1-.4 3.5-1.6.2-.4-.2-.9-.6-1.1-1.6-.9-3.8-.6-5.5.1-1.3.6-3.4 1.5-3.2 2.9.1 1 1.8 1.5 2.8 1.4zM420 403.8c-3.6-4-5.3-11.6-7.2-19.7-1.8-8.1-3.9-16.8-10.5-22.4-1.3-1.1-2.6-2.1-4-2.9-1.3-.8-2.7-1.5-4.1-2 9.2-27.3 5.6-54.5-3.7-79.1-11.4-30.1-31.3-56.4-46.5-74.4-17.1-21.5-33.7-41.9-33.4-72C311.1 85.4 315.7.1 234.8 0 132.4-.2 158 103.4 156.9 135.2c-1.7 23.4-6.4 41.8-22.5 64.7-18.9 22.5-45.5 58.8-58.1 96.7-6 17.9-8.8 36.1-6.2 53.3-6.5 5.8-11.4 14.7-16.6 20.2-4.2 4.3-10.3 5.9-17 8.3s-14 6-18.5 14.5c-2.1 3.9-2.8 8.1-2.8 12.4 0 3.9.6 7.9 1.2 11.8 1.2 8.1 2.5 15.7.8 20.8-5.2 14.4-5.9 24.4-2.2 31.7 3.8 7.3 11.4 10.5 20.1 12.3 17.3 3.6 40.8 2.7 59.3 12.5 19.8 10.4 39.9 14.1 55.9 10.4 11.6-2.6 21.1-9.6 25.9-20.2 12.5-.1 26.3-5.4 48.3-6.6 14.9-1.2 33.6 5.3 55.1 4.1.6 2.3 1.4 4.6 2.5 6.7v.1c8.3 16.7 23.8 24.3 40.3 23 16.6-1.3 34.1-11 48.3-27.9 13.6-16.4 36-23.2 50.9-32.2 7.4-4.5 13.4-10.1 13.9-18.3.4-8.2-4.4-17.3-15.5-29.7zM223.7 87.3c9.8-22.2 34.2-21.8 44-.4 6.5 14.2 3.6 30.9-4.3 40.4-1.6-.8-5.9-2.6-12.6-4.9 1.1-1.2 3.1-2.7 3.9-4.6 4.8-11.8-.2-27-9.1-27.3-7.3-.5-13.9 10.8-11.8 23-4.1-2-9.4-3.5-13-4.4-1-6.9-.3-14.6 2.9-21.8zM183 75.8c10.1 0 20.8 14.2 19.1 33.5-3.5 1-7.1 2.5-10.2 4.6 1.2-8.9-3.3-20.1-9.6-19.6-8.4.7-9.8 21.2-1.8 28.1 1 .8 1.9-.2-5.9 5.5-15.6-14.6-10.5-52.1 8.4-52.1zm-13.6 60.7c6.2-4.6 13.6-10 14.1-10.5 4.7-4.4 13.5-14.2 27.9-14.2 7.1 0 15.6 2.3 25.9 8.9 6.3 4.1 11.3 4.4 22.6 9.3 8.4 3.5 13.7 9.7 10.5 18.2-2.6 7.1-11 14.4-22.7 18.1-11.1 3.6-19.8 16-38.2 14.9-3.9-.2-7-1-9.6-2.1-8-3.5-12.2-10.4-20-15-8.6-4.8-13.2-10.4-14.7-15.3-1.4-4.9 0-9 4.2-12.3zm3.3 334c-2.7 35.1-43.9 34.4-75.3 18-29.9-15.8-68.6-6.5-76.5-21.9-2.4-4.7-2.4-12.7 2.6-26.4v-.2c2.4-7.6.6-16-.6-23.9-1.2-7.8-1.8-15 .9-20 3.5-6.7 8.5-9.1 14.8-11.3 10.3-3.7 11.8-3.4 19.6-9.9 5.5-5.7 9.5-12.9 14.3-18 5.1-5.5 10-8.1 17.7-6.9 8.1 1.2 15.1 6.8 21.9 16l19.6 35.6c9.5 19.9 43.1 48.4 41 68.9zm-1.4-25.9c-4.1-6.6-9.6-13.6-14.4-19.6 7.1 0 14.2-2.2 16.7-8.9 2.3-6.2 0-14.9-7.4-24.9-13.5-18.2-38.3-32.5-38.3-32.5-13.5-8.4-21.1-18.7-24.6-29.9s-3-23.3-.3-35.2c5.2-22.9 18.6-45.2 27.2-59.2 2.3-1.7.8 3.2-8.7 20.8-8.5 16.1-24.4 53.3-2.6 82.4.6-20.7 5.5-41.8 13.8-61.5 12-27.4 37.3-74.9 39.3-112.7 1.1.8 4.6 3.2 6.2 4.1 4.6 2.7 8.1 6.7 12.6 10.3 12.4 10 28.5 9.2 42.4 1.2 6.2-3.5 11.2-7.5 15.9-9 9.9-3.1 17.8-8.6 22.3-15 7.7 30.4 25.7 74.3 37.2 95.7 6.1 11.4 18.3 35.5 23.6 64.6 3.3-.1 7 .4 10.9 1.4 13.8-35.7-11.7-74.2-23.3-84.9-4.7-4.6-4.9-6.6-2.6-6.5 12.6 11.2 29.2 33.7 35.2 59 2.8 11.6 3.3 23.7.4 35.7 16.4 6.8 35.9 17.9 30.7 34.8-2.2-.1-3.2 0-4.2 0 3.2-10.1-3.9-17.6-22.8-26.1-19.6-8.6-36-8.6-38.3 12.5-12.1 4.2-18.3 14.7-21.4 27.3-2.8 11.2-3.6 24.7-4.4 39.9-.5 7.7-3.6 18-6.8 29-32.1 22.9-76.7 32.9-114.3 7.2zm257.4-11.5c-.9 16.8-41.2 19.9-63.2 46.5-13.2 15.7-29.4 24.4-43.6 25.5s-26.5-4.8-33.7-19.3c-4.7-11.1-2.4-23.1 1.1-36.3 3.7-14.2 9.2-28.8 9.9-40.6.8-15.2 1.7-28.5 4.2-38.7 2.6-10.3 6.6-17.2 13.7-21.1.3-.2.7-.3 1-.5.8 13.2 7.3 26.6 18.8 29.5 12.6 3.3 30.7-7.5 38.4-16.3 9-.3 15.7-.9 22.6 5.1 9.9 8.5 7.1 30.3 17.1 41.6 10.6 11.6 14 19.5 13.7 24.6zM173.3 148.7c2 1.9 4.7 4.5 8 7.1 6.6 5.2 15.8 10.6 27.3 10.6 11.6 0 22.5-5.9 31.8-10.8 4.9-2.6 10.9-7 14.8-10.4s5.9-6.3 3.1-6.6-2.6 2.6-6 5.1c-4.4 3.2-9.7 7.4-13.9 9.8-7.4 4.2-19.5 10.2-29.9 10.2s-18.7-4.8-24.9-9.7c-3.1-2.5-5.7-5-7.7-6.9-1.5-1.4-1.9-4.6-4.3-4.9-1.4-.1-1.8 3.7 1.7 6.5z'/%3E%3C/svg%3E");
}

.platform-icon.android {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 576 512'%3E%3Cpath fill='%23a4c639' d='M420.55,301.93a24,24,0,1,1,24-24,24,24,0,0,1-24,24m-265.1,0a24,24,0,1,1,24-24,24,24,0,0,1-24,24m273.7-144.48,47.94-83a10,10,0,1,0-17.27-10h0l-48.54,84.07a301.25,301.25,0,0,0-246.56,0L116.18,64.45a10,10,0,1,0-17.27,10h0l47.94,83C64.53,202.22,8.24,285.55,0,384H576c-8.24-98.45-64.54-181.78-146.85-226.55'/%3E%3C/svg%3E");
}

.download-content {
  padding: 40px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
}

.platform-info h2 {
  display: flex;
  align-items: center;
  font-size: 1.8rem;
  font-weight: 600;
  margin-bottom: 16px;
  color: #333;
}

.version-info {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 12px;
}

.version, .size {
  font-size: 0.95rem;
  color: #666;
  display: flex;
  align-items: center;
}

.version::before, .size::before {
  content: '';
  display: inline-block;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: #aaa;
  margin-right: 10px;
}

.requirements {
  margin-bottom: 30px;
  color: #555;
  font-size: 1rem;
}

.download-btn {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 24px;
  font-size: 1.1rem;
}

.installation-instructions h3 {
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 20px;
  color: #333;
}

.steps-list {
  padding-left: 25px;
}

.steps-list li {
  margin-bottom: 15px;
  color: #555;
  line-height: 1.5;
}

/* 移动应用推广样式 */
.mobile-apps-section {
  padding: 60px 40px;
  text-align: center;
  background: linear-gradient(to right, #f8f9fa, #f3f4f6);
  border-radius: 16px;
  margin: 0 40px 60px;
}

.mobile-apps-section h2 {
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 40px;
  color: #333;
}

.app-stores {
  display: flex;
  gap: 30px;
  justify-content: center;
  flex-wrap: wrap;
}

.app-store-card {
  background: white;
  border-radius: 12px;
  padding: 40px 30px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  width: 280px;
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.app-store-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
}

.store-logo {
  width: 80px;
  height: 80px;
  margin: 0 auto 20px;
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
}

.store-logo.android {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'%3E%3Cpath fill='%23a4c639' d='M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0zm425.6 225.6l-58.9-34.1-65.7 64.5 65.7 64.5 60.1-34.1c18-14.3 18-46.5-1.2-60.8zM104.6 499l280.8-161.2-60.1-60.1L104.6 499z'/%3E%3C/svg%3E");
}

.store-logo.ios {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 384 512'%3E%3Cpath fill='%23555' d='M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z'/%3E%3C/svg%3E");
}

.app-store-card h3 {
  font-size: 1.3rem;
  font-weight: 600;
  margin-bottom: 12px;
  color: #333;
}

.app-store-card p {
  color: #666;
  margin-bottom: 25px;
  line-height: 1.5;
}

.app-store-card .btn {
  width: 100%;
}

/* 系统要求样式 */
.system-requirements-section {
  padding: 60px 40px;
  margin-bottom: 60px;
}

.system-requirements-section h2 {
  font-size: 2.2rem;
  text-align: center;
  margin-bottom: 40px;
  color: #333;
}

.requirements-tabs {
  display: flex;
  flex-direction: column;
  gap: 40px;
  max-width: 1000px;
  margin: 0 auto;
}

.tab-group h3 {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 24px;
  color: #333;
  text-align: center;
  padding-bottom: 15px;
  border-bottom: 1px solid #eaeaea;
}

.requirements-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 25px;
}

.requirement-card {
  background: white;
  border-radius: 12px;
  padding: 25px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease;
}

.requirement-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
}

.requirement-card h4 {
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 16px;
  color: var(--primary-color);
  display: flex;
  align-items: center;
}

.requirement-card h4::before {
  content: '';
  display: inline-block;
  width: 6px;
  height: 20px;
  background-color: var(--primary-color);
  border-radius: 3px;
  margin-right: 12px;
}

.requirement-card ul {
  padding-left: 20px;
}

.requirement-card li {
  margin-bottom: 10px;
  color: #555;
  line-height: 1.5;
}

.requirement-card li::marker {
  color: var(--primary-color);
}

/* FAQ部分样式 */
.faq-section {
  padding: 60px 40px;
  margin-bottom: 60px;
}

.faq-section h2 {
  font-size: 2.2rem;
  text-align: center;
  margin-bottom: 40px;
  color: #333;
}

.faq-list {
  max-width: 900px;
  margin: 0 auto;
}

.faq-item {
  background: white;
  border-radius: 12px;
  margin-bottom: 16px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.04);
  border: 1px solid #eaeaea;
}

.faq-question {
  padding: 20px 25px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 600;
  font-size: 1.1rem;
  color: #333;
  user-select: none;
  transition: background-color 0.3s ease;
}

.faq-question:hover {
  background-color: rgba(0, 0, 0, 0.01);
}

.faq-question .chevron {
  transition: transform 0.3s ease;
  width: 20px;
  height: 20px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.faq-question .chevron::before {
  content: '';
  width: 10px;
  height: 10px;
  border-right: 2px solid #666;
  border-bottom: 2px solid #666;
  transform: rotate(45deg);
  display: block;
  position: relative;
  top: -4px;
}

.faq-question.active .chevron::before {
  transform: rotate(-135deg);
  top: 0;
}

.faq-answer {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.5s ease;
}

.faq-answer.show {
  max-height: 500px;
}

.faq-answer-content {
  padding: 0 25px 20px;
  color: #555;
  line-height: 1.6;
}

.faq-answer-content p {
  margin-bottom: 12px;
}

.faq-answer-content p:last-child {
  margin-bottom: 0;
}

/* Call-to-Action部分样式 */
.cta-section {
  padding: 80px 40px;
  text-align: center;
  background: linear-gradient(to right, rgba(16, 163, 127, 0.1), rgba(16, 163, 127, 0.05));
  border-radius: 16px;
  margin: 0 40px 60px;
}

.cta-section h2 {
  font-size: 2.2rem;
  font-weight: 700;
  margin-bottom: 20px;
  color: #333;
}

.cta-section p {
  font-size: 1.2rem;
  color: #555;
  max-width: 700px;
  margin: 0 auto 40px;
  line-height: 1.6;
}

.cta-buttons {
  display: flex;
  gap: 20px;
  justify-content: center;
  flex-wrap: wrap;
}

.btn {
  padding: 12px 30px;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
}

.btn-primary {
  background-color: var(--primary-color);
  color: white;
  border: none;
}

.btn-primary:hover {
  background-color: #0c8c6d;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(16, 163, 127, 0.3);
}

.btn-outline {
  background-color: transparent;
  color: var(--primary-color);
  border: 2px solid var(--primary-color);
}

.btn-outline:hover {
  background-color: rgba(16, 163, 127, 0.05);
  transform: translateY(-2px);
}

/* 响应式布局 */
@media (max-width: 992px) {
  .download-content {
    grid-template-columns: 1fr;
  }
  
  .mobile-apps-section,
  .cta-section {
    margin: 0 20px 40px;
    padding: 40px 20px;
  }
  
  .system-requirements-section,
  .faq-section {
    padding: 40px 20px;
  }
}

@media (max-width: 768px) {
  .main-content {
    margin-left: 0;
  }
  
  .page-header h1 {
    font-size: 2.2rem;
  }
  
  .main-download-section,
  .system-requirements-section,
  .faq-section {
    padding: 0 20px 40px;
  }
  
  .platform-button {
    padding: 15px 16px;
  }
  
  .download-content {
    padding: 30px 20px;
  }
  
  .platform-info h2 {
    font-size: 1.6rem;
  }
  
  .requirement-card h4 {
    font-size: 1.1rem;
  }
  
  .requirements-cards {
    grid-template-columns: 1fr;
  }
  
  .cta-section h2 {
    font-size: 1.8rem;
  }
  
  .cta-section p {
    font-size: 1.1rem;
  }
}
</style> 