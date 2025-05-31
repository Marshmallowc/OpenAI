<script setup>
import { ref, inject } from 'vue'
import { useRouter } from 'vue-router'

// Inject the sidebar collapsed state
const sidebarCollapsed = inject('sidebarCollapsed', ref(false))
const router = useRouter()

// 价格套餐数据
const pricingTiers = [
  {
    id: 1,
    name: "Free",
    price: "$0",
    billing: "forever",
    description: "Basic access to ChatGPT with standard features",
    features: [
      "Access to GPT-3.5 model",
      "Standard response time",
      "Regular model updates",
      "Web-based access only",
      "Limited messages per day"
    ],
    limitations: [
      "May experience high traffic delays",
      "No priority access to new features"
    ],
    ctaText: "Start for free",
    ctaAction: () => {
      router.push('/explore')
    },
    popular: false
  },
  {
    id: 2,
    name: "Plus",
    price: "$20",
    billing: "per month",
    description: "Faster response times and enhanced features for power users",
    features: [
      "Access to GPT-4 model",
      "Faster response times",
      "Priority access during high traffic",
      "Web and mobile app access",
      "Higher message limits",
      "Early access to new features",
      "Unlimited chat history"
    ],
    limitations: [],
    ctaText: "Get Plus",
    ctaAction: () => {
      console.log('Get Plus clicked')
    },
    popular: true
  },
  {
    id: 3,
    name: "Team",
    price: "$30",
    billing: "per user/month",
    description: "Collaborative features for small to medium teams",
    features: [
      "All Plus features",
      "Workspace for team collaboration",
      "Admin dashboard and analytics",
      "Shared chat history within team",
      "API access with higher rate limits",
      "Advanced security features",
      "Centralized billing"
    ],
    limitations: [],
    ctaText: "Try Team",
    ctaAction: () => {
      console.log('Try Team clicked')
    },
    popular: false
  }
]

// 功能对比表格数据
const featureComparisonData = [
  {
    category: "Models",
    features: [
      {
        name: "GPT-3.5",
        free: true,
        plus: true,
        team: true
      },
      {
        name: "GPT-4",
        free: false,
        plus: true,
        team: true
      },
      {
        name: "GPT-4 Turbo",
        free: false,
        plus: true,
        team: true
      },
      {
        name: "Custom fine-tuning",
        free: false,
        plus: false,
        team: true
      }
    ]
  },
  {
    category: "Usage",
    features: [
      {
        name: "Message limit",
        free: "25/3hr",
        plus: "100/3hr",
        team: "Unlimited"
      },
      {
        name: "Response speed",
        free: "Standard",
        plus: "Prioritized",
        team: "Prioritized"
      },
      {
        name: "High traffic access",
        free: "Limited",
        plus: "Prioritized",
        team: "Guaranteed"
      }
    ]
  },
  {
    category: "Features",
    features: [
      {
        name: "Web app access",
        free: true,
        plus: true,
        team: true
      },
      {
        name: "Mobile app access",
        free: false,
        plus: true,
        team: true
      },
      {
        name: "Voice conversation",
        free: false,
        plus: true,
        team: true
      },
      {
        name: "Image understanding",
        free: false,
        plus: true,
        team: true
      },
      {
        name: "Custom instructions",
        free: true,
        plus: true,
        team: true
      },
      {
        name: "Plugins ecosystem",
        free: false,
        plus: true,
        team: true
      },
      {
        name: "Team workspace",
        free: false,
        plus: false,
        team: true
      },
      {
        name: "Admin controls",
        free: false,
        plus: false,
        team: true
      }
    ]
  },
  {
    category: "Data Privacy",
    features: [
      {
        name: "History encryption",
        free: true,
        plus: true,
        team: true
      },
      {
        name: "Data export",
        free: false,
        plus: true,
        team: true
      },
      {
        name: "Custom data retention",
        free: false,
        plus: false,
        team: true
      }
    ]
  },
  {
    category: "Support",
    features: [
      {
        name: "Community support",
        free: true,
        plus: true,
        team: true
      },
      {
        name: "Email support",
        free: false,
        plus: true,
        team: true
      },
      {
        name: "Priority support",
        free: false,
        plus: false,
        team: true
      },
      {
        name: "Dedicated account manager",
        free: false,
        plus: false,
        team: true
      }
    ]
  }
]

// 常见问题数据
const faqItems = [
  {
    question: "What's the difference between the Free and Plus plans?",
    answer: "The Free plan gives you basic access to the GPT-3.5 model with limited usage per day. The Plus plan includes access to our most powerful GPT-4 model, faster response times, priority access during high traffic periods, and higher usage limits."
  },
  {
    question: "Can I switch between plans?",
    answer: "Yes, you can upgrade or downgrade your plan at any time. If you upgrade, the changes will take effect immediately. If you downgrade, the changes will take effect at the end of your current billing cycle."
  },
  {
    question: "Is there a trial period for the Plus plan?",
    answer: "We currently don't offer a free trial for the Plus plan, but you can use the Free plan indefinitely to experience the core features before deciding to upgrade."
  },
  {
    question: "How does Team billing work?",
    answer: "Team billing is charged per user per month. You'll be billed based on the number of active users in your workspace. You can add or remove users at any time, and billing will be adjusted accordingly."
  },
  {
    question: "Can I use ChatGPT for commercial purposes?",
    answer: "Yes, all plans allow for commercial use of ChatGPT, subject to our terms of service. However, the Team plan offers additional features designed specifically for business collaboration and enterprise-grade security."
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards, PayPal, and select regional payment methods. For Team plans with annual billing, we also offer invoice-based payment options."
  }
]

// 展开/收起FAQ项目
const toggleFaq = (index) => {
  expandedFaq.value = expandedFaq.value === index ? null : index
}

const expandedFaq = ref(null)

// 滚动到功能对比表格
const scrollToComparison = () => {
  document.getElementById('features-comparison').scrollIntoView({
    behavior: 'smooth'
  })
}

// 获取当前年份（用于页脚）
const currentYear = new Date().getFullYear()
</script>

<template>
  <div class="pricing-page">
    <main class="main-content" :class="{ 'sidebar-collapsed': sidebarCollapsed }">
      <!-- 页面标题 -->
      <section class="page-header">
        <h1>Simple, transparent pricing</h1>
        <p class="subtitle">Choose the plan that's right for you</p>
      </section>

      <!-- 价格套餐 -->
      <section class="pricing-tiers">
        <div class="pricing-cards">
          <div v-for="tier in pricingTiers" 
               :key="tier.id" 
               class="pricing-card"
               :class="{ 'popular': tier.popular }">
            <div v-if="tier.popular" class="popular-badge">Most popular</div>
            <h2 class="tier-name">{{ tier.name }}</h2>
            <div class="price-container">
              <span class="price">{{ tier.price }}</span>
              <span class="billing-cycle">{{ tier.billing }}</span>
            </div>
            <p class="tier-description">{{ tier.description }}</p>
            <button class="btn" 
                    :class="tier.popular ? 'btn-primary' : 'btn-outline'"
                    @click="tier.ctaAction">
              {{ tier.ctaText }}
            </button>
            <div class="features-section">
              <h3>Includes:</h3>
              <ul class="features-list">
                <li v-for="(feature, index) in tier.features" :key="index">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  {{ feature }}
                </li>
              </ul>
              <div v-if="tier.limitations.length > 0" class="limitations-section">
                <h3>Limitations:</h3>
                <ul class="limitations-list">
                  <li v-for="(limitation, index) in tier.limitations" :key="index">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                    {{ limitation }}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div class="enterprise-banner">
          <div class="banner-content">
            <h2>Looking for enterprise-grade solutions?</h2>
            <p>Discover custom pricing, security features, and deployment options tailored to your organization's needs.</p>
            <button class="btn btn-outline" @click="router.push('/enterprise')">
              Explore Enterprise
            </button>
          </div>
        </div>

        <div class="comparison-cta">
          <p>Need a detailed comparison of all features?</p>
          <button class="btn btn-text" @click="scrollToComparison">
            View full features comparison
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <polyline points="19 12 12 19 5 12"></polyline>
            </svg>
          </button>
        </div>
      </section>

      <!-- 功能对比表格 -->
      <section id="features-comparison" class="comparison-section">
        <h2>Compare all features</h2>
        <div class="comparison-table-container">
          <table class="comparison-table">
            <thead>
              <tr>
                <th class="feature-column">Feature</th>
                <th>Free</th>
                <th>Plus</th>
                <th>Team</th>
              </tr>
            </thead>
            <tbody>
              <template v-for="(category, categoryIndex) in featureComparisonData" :key="categoryIndex">
                <tr class="category-row">
                  <td colspan="4">{{ category.category }}</td>
                </tr>
                <tr v-for="(feature, featureIndex) in category.features" :key="`${categoryIndex}-${featureIndex}`">
                  <td>{{ feature.name }}</td>
                  <td class="center-align">
                    <template v-if="typeof feature.free === 'boolean'">
                      <svg v-if="feature.free" class="icon-check" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      <svg v-else class="icon-x" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                      </svg>
                    </template>
                    <span v-else>{{ feature.free }}</span>
                  </td>
                  <td class="center-align">
                    <template v-if="typeof feature.plus === 'boolean'">
                      <svg v-if="feature.plus" class="icon-check" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      <svg v-else class="icon-x" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                      </svg>
                    </template>
                    <span v-else>{{ feature.plus }}</span>
                  </td>
                  <td class="center-align">
                    <template v-if="typeof feature.team === 'boolean'">
                      <svg v-if="feature.team" class="icon-check" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      <svg v-else class="icon-x" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                      </svg>
                    </template>
                    <span v-else>{{ feature.team }}</span>
                  </td>
                </tr>
              </template>
            </tbody>
          </table>
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
          <h2>Ready to get started?</h2>
          <p>Join millions of users experiencing the power of ChatGPT</p>
          <div class="cta-buttons">
            <button class="btn btn-primary" @click="router.push('/explore')">Try for free</button>
            <button class="btn btn-outline" @click="router.push('/enterprise')">Contact sales</button>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<style scoped>
.pricing-page {
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

/* 价格套餐卡片 */
.pricing-tiers {
  padding: 0 40px 60px;
}

.pricing-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
  margin-bottom: 40px;
}

.pricing-card {
  background: white;
  border-radius: 12px;
  border: 1px solid #e5e7eb;
  padding: 30px;
  position: relative;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
}

.pricing-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 20px rgba(0, 0, 0, 0.1);
}

.pricing-card.popular {
  border: 2px solid var(--primary-color);
  transform: scale(1.03);
}

.pricing-card.popular:hover {
  transform: translateY(-5px) scale(1.03);
}

.popular-badge {
  position: absolute;
  top: -12px;
  left: 50%;
  transform: translateX(-50%);
  background: var(--primary-color);
  color: white;
  padding: 5px 15px;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 500;
}

.tier-name {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 10px;
  color: #333;
}

.price-container {
  margin-bottom: 20px;
}

.price {
  font-size: 3rem;
  font-weight: 700;
  color: var(--primary-color);
}

.billing-cycle {
  font-size: 1rem;
  color: #888;
  margin-left: 5px;
}

.tier-description {
  font-size: 1rem;
  color: #666;
  margin-bottom: 25px;
  line-height: 1.5;
  flex-grow: 1;
}

.pricing-card .btn {
  width: 100%;
  margin-bottom: 25px;
}

.features-section h3, .limitations-section h3 {
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 12px;
  color: #444;
}

.features-list, .limitations-list {
  list-style: none;
  padding: 0;
  margin-bottom: 25px;
}

.features-list li, .limitations-list li {
  display: flex;
  align-items: flex-start;
  margin-bottom: 10px;
  font-size: 0.95rem;
  color: #555;
}

.features-list li svg, .limitations-list li svg {
  margin-right: 10px;
  color: var(--primary-color);
  flex-shrink: 0;
  margin-top: 4px;
}

.limitations-list li svg {
  color: #888;
}

.enterprise-banner {
  background: linear-gradient(to right, #f8f9fa, #f3f4f6);
  border-radius: 12px;
  padding: 40px;
  margin: 40px 0;
  text-align: center;
}

.banner-content h2 {
  font-size: 1.8rem;
  font-weight: 600;
  margin-bottom: 15px;
  color: #333;
}

.banner-content p {
  max-width: 600px;
  margin: 0 auto 25px;
  font-size: 1.1rem;
  color: #666;
}

.comparison-cta {
  text-align: center;
  margin: 30px 0;
}

.comparison-cta p {
  font-size: 1.1rem;
  color: #555;
  margin-bottom: 15px;
}

.btn-text {
  background: none;
  border: none;
  color: var(--primary-color);
  font-weight: 500;
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-size: 1rem;
  cursor: pointer;
  padding: 5px 10px;
  border-radius: 6px;
  transition: background-color 0.2s ease;
}

.btn-text:hover {
  background-color: rgba(16, 163, 127, 0.05);
}

.btn-text svg {
  transition: transform 0.2s ease;
}

.btn-text:hover svg {
  transform: translateY(3px);
}

/* 功能对比表格 */
.comparison-section {
  padding: 60px 40px;
  margin-top: 20px;
  scroll-margin-top: 80px;
}

.comparison-section h2 {
  font-size: 2.2rem;
  text-align: center;
  margin-bottom: 40px;
  color: #333;
}

.comparison-table-container {
  overflow-x: auto;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  border-radius: 12px;
}

.comparison-table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
  border: 1px solid #eaeaea;
  background-color: white;
}

.comparison-table th, .comparison-table td {
  padding: 16px 20px;
  border-bottom: 1px solid #eaeaea;
  font-size: 0.95rem;
}

.comparison-table th {
  background-color: #f9f9f9;
  font-weight: 600;
  color: #333;
}

.comparison-table tr:last-child td {
  border-bottom: none;
}

.comparison-table .category-row td {
  font-weight: 600;
  background-color: #f5f5f5;
  color: #444;
  padding: 12px 20px;
  font-size: 1rem;
}

.center-align {
  text-align: center;
}

.feature-column {
  width: 40%;
}

.icon-check {
  color: var(--primary-color);
}

.icon-x {
  color: #d1d5db;
}

/* FAQ样式 */
.faq-section {
  padding: 60px 40px;
  margin-top: 20px;
}

.faq-section h2 {
  font-size: 2.2rem;
  text-align: center;
  margin-bottom: 40px;
  color: #333;
}

.faq-container {
  max-width: 800px;
  margin: 0 auto;
}

.faq-item {
  border: 1px solid #eaeaea;
  border-radius: 12px;
  margin-bottom: 15px;
  overflow: hidden;
  background-color: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  transition: box-shadow 0.3s ease;
}

.faq-item:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.faq-question {
  padding: 20px 25px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.faq-question h3 {
  font-size: 1.1rem;
  font-weight: 600;
  color: #333;
  margin: 0;
}

.icon-chevron {
  transition: transform 0.3s ease;
  color: #888;
}

.faq-item.expanded .icon-chevron {
  transform: rotate(180deg);
  color: var(--primary-color);
}

.faq-answer {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease, padding 0.3s ease;
  padding: 0 25px;
}

.faq-answer.show {
  max-height: 500px;
  padding: 0 25px 20px;
}

.faq-answer p {
  color: #555;
  font-size: 1rem;
  line-height: 1.6;
  margin: 0;
}

/* 呼叫组件样式 */
.cta-section {
  background: linear-gradient(135deg, #10a37f, #066e54);
  border-radius: 12px;
  padding: 60px 40px;
  margin: 60px 40px 0;
  text-align: center;
  color: white;
}

.cta-content h2 {
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 15px;
}

.cta-content p {
  font-size: 1.1rem;
  max-width: 600px;
  margin: 0 auto 30px;
  opacity: 0.9;
}

.cta-buttons {
  display: flex;
  justify-content: center;
  gap: 15px;
}

.cta-section .btn-primary {
  background: white;
  color: var(--primary-color);
}

.cta-section .btn-outline {
  border-color: white;
  color: white;
}

.cta-section .btn-primary:hover {
  background: rgba(255, 255, 255, 0.9);
}

.cta-section .btn-outline:hover {
  background: rgba(255, 255, 255, 0.1);
}

/* 响应式调整 */
@media (max-width: 768px) {
  .pricing-cards {
    grid-template-columns: 1fr;
  }

  .enterprise-banner {
    padding: 30px 20px;
  }

  .comparison-table th, .comparison-table td {
    padding: 12px 15px;
  }

  .cta-buttons {
    flex-direction: column;
    gap: 10px;
  }

  .cta-section {
    padding: 40px 20px;
    margin: 40px 20px 0;
  }
}
</style> 