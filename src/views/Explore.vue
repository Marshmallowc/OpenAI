<script setup>
import { ref, inject, onMounted, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

// Inject the sidebar collapsed state
const sidebarCollapsed = inject('sidebarCollapsed', ref(false))

// Gemini API Key
const GEMINI_API_KEY = ''
const GEMINI_API_URL = ''

const userInput = ref('')
const isLoading = ref(false)
const chatMessages = ref([
  {
    id: 1,
    role: 'assistant',
    content: 'Hello! I\'m an AI assistant powered by Gemini. How can I help you today?'
  }
])

// 处理从Home页面传来的消息
const processIncomingMessage = (message) => {
  if (message && message.trim()) {
    console.log('处理传入消息:', message)
    // 设置用户输入
    userInput.value = message
    // 手动触发发送消息
    setTimeout(() => {
      sendMessage(message)
    }, 300)
  }
}

// 组件挂载后检查URL参数
onMounted(() => {
  if (route.query.message) {
    console.log('URL参数中检测到消息:', route.query.message)
    processIncomingMessage(route.query.message)
  }
})

// 监听路由变化，处理传入的消息参数
watch(
  () => route.query.message,
  (newMessage, oldMessage) => {
    console.log('路由参数变化:', oldMessage, '->', newMessage)
    if (newMessage && newMessage !== oldMessage) {
      processIncomingMessage(newMessage)
    }
  }
)

// 调用Gemini API
const callGeminiAPI = async (message) => {
  try {
    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{ text: message }]
        }],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1024,
        }
      })
    })

    if (!response.ok) {
      const errorData = await response.json()
      console.error('Gemini API 错误:', errorData)
      return `抱歉，我遇到了一些问题。错误: ${errorData.error?.message || '未知错误'}`
    }

    const data = await response.json()
    if (data.candidates && data.candidates.length > 0 && 
        data.candidates[0].content && 
        data.candidates[0].content.parts && 
        data.candidates[0].content.parts.length > 0) {
      return data.candidates[0].content.parts[0].text
    } else {
      console.error('意外的API响应格式:', data)
      return '抱歉，我无法生成回复。'
    }
  } catch (error) {
    console.error('调用Gemini API时出错:', error)
    return '抱歉，连接AI服务时出现了问题。请稍后再试。'
  }
}

const sendMessage = async (directMessage = null) => {
  // 使用传入的直接消息或输入框中的内容
  const messageToSend = directMessage || userInput.value

  if (!messageToSend.trim()) return

  console.log('发送消息:', messageToSend)
  
  // 设置加载状态
  isLoading.value = true

  // 添加用户消息
  chatMessages.value.push({
    id: chatMessages.value.length + 1,
    role: 'user',
    content: messageToSend
  })

  // 清除URL中的query参数，以便用户可以刷新页面而不会重复发送消息
  if (route.query.message) {
    router.replace({ path: '/explore' }, () => {
      console.log('已清除URL参数')
    })
  }

  // 清除输入框
  userInput.value = ''
  
  // 滚动到底部，显示用户消息
  scrollToBottom()

  try {
    // 调用Gemini API获取回复
    const aiResponse = await callGeminiAPI(messageToSend)
    
    // 添加AI回复到聊天历史
    chatMessages.value.push({
      id: chatMessages.value.length + 1,
      role: 'assistant',
      content: aiResponse
    })
  } catch (error) {
    console.error('处理AI响应时出错:', error)
    // 添加错误消息
    chatMessages.value.push({
      id: chatMessages.value.length + 1,
      role: 'assistant',
      content: '抱歉，发生了一个错误。请稍后再试。'
    })
  } finally {
    // 无论成功与否，都关闭加载状态
    isLoading.value = false
    // 确保再次滚动到底部，显示AI回复
    scrollToBottom()
  }
}

const navigateHome = () => {
  router.push('/')
}

// 确保聊天窗口在消息发送后自动滚动到底部
const scrollToBottom = () => {
  const chatContainer = document.querySelector('.chat-messages')
  if (chatContainer) {
    setTimeout(() => {
      chatContainer.scrollTop = chatContainer.scrollHeight
    }, 100)
  }
}

// 监听消息数组变化，自动滚动到底部
watch(chatMessages, () => {
  scrollToBottom()
}, { deep: true })

// 组件挂载后滚动到底部
onMounted(() => {
  scrollToBottom()
})
</script>

<template>
  <div class="explore">
    <!-- Main Chat Content -->
    <main class="chat-content" :class="{ 'sidebar-collapsed': sidebarCollapsed }">
      <div class="chat-container">
        <div class="chat-messages">
          <div v-for="message in chatMessages" :key="message.id" 
               :class="['message', message.role === 'assistant' ? 'assistant-message' : 'user-message']">
            <div class="message-avatar">
              <div v-if="message.role === 'assistant'" class="assistant-avatar">AI</div>
              <div v-else class="user-avatar">U</div>
            </div>
            <div class="message-content">
              <p>{{ message.content }}</p>
            </div>
          </div>
          <!-- 加载指示器 -->
          <div v-if="isLoading" class="message assistant-message">
            <div class="message-avatar">
              <div class="assistant-avatar">AI</div>
            </div>
            <div class="message-content typing-indicator">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </div>
        
        <div class="chat-input-container">
          <form @submit.prevent="sendMessage()" class="chat-form">
            <input 
              type="text" 
              v-model="userInput" 
              placeholder="Message Gemini AI..." 
              class="chat-input"
              ref="inputField"
              :disabled="isLoading"
            />
            <button type="submit" class="send-button" :disabled="!userInput.trim() || isLoading">
              <svg v-if="!isLoading" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
              </svg>
              <svg v-else class="loading-spinner" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M12 6v2"></path>
              </svg>
            </button>
          </form>
          <p class="disclaimer">Powered by Google Gemini. AI responses may not always be accurate.</p>
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped>
.explore {
  display: flex;
  height: 100vh;
}

.chat-content {
  flex: 1;
  margin-left: 200px;
  margin-top: 60px;
  display: flex;
  flex-direction: column;
  height: calc(100vh - 60px);
  transition: margin-left 0.3s ease;
}

.chat-content.sidebar-collapsed {
  margin-left: 60px;
}

.chat-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  height: 100%;
}

.chat-messages {
  flex: 1;
  padding: 20px;
  overflow-y: auto;
  scroll-behavior: smooth;
}

.message {
  display: flex;
  margin-bottom: 20px;
  gap: 16px;
}

.message-avatar {
  flex-shrink: 0;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
}

.assistant-avatar {
  background-color: var(--primary-color);
  color: white;
}

.user-avatar {
  background-color: #f0f0f0;
  color: #333;
}

.message-content {
  flex: 1;
  padding: 12px 16px;
  border-radius: 8px;
  line-height: 1.5;
}

.assistant-message .message-content {
  background-color: #f7f7f8;
}

.user-message .message-content {
  background-color: #e7f8ef;
}

.chat-input-container {
  padding: 16px 20px;
  border-top: 1px solid var(--border-color);
}

.chat-form {
  display: flex;
  gap: 10px;
}

.chat-input {
  flex: 1;
  padding: 12px 16px;
  border: 1px solid var(--border-color);
  border-radius: 8px;
  font-size: 1rem;
}

.chat-input:disabled {
  background-color: #f9f9f9;
  cursor: not-allowed;
}

.send-button {
  width: 40px;
  height: 40px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--primary-color);
  border: none;
  color: white;
  cursor: pointer;
}

.send-button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.disclaimer {
  font-size: 0.8rem;
  color: #888;
  margin-top: 8px;
  text-align: center;
}

/* 打字指示器样式 */
.typing-indicator {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  min-height: 20px;
}

.typing-indicator span {
  height: 8px;
  width: 8px;
  margin: 0 2px;
  background-color: #aaa;
  border-radius: 50%;
  display: inline-block;
  opacity: 0.4;
}

.typing-indicator span:nth-child(1) {
  animation: pulse 1s infinite ease-in-out;
}

.typing-indicator span:nth-child(2) {
  animation: pulse 1s infinite ease-in-out .2s;
}

.typing-indicator span:nth-child(3) {
  animation: pulse 1s infinite ease-in-out .4s;
}

@keyframes pulse {
  0% {
    transform: scale(1);
    opacity: 0.4;
  }
  50% {
    transform: scale(1.3);
    opacity: 1;
  }
  100% {
    transform: scale(1);
    opacity: 0.4;
  }
}

/* 加载动画 */
.loading-spinner {
  animation: spin 1.5s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style> 
