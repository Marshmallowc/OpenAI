<script setup>
import { ref, inject } from 'vue'
import { useRouter } from 'vue-router'

// Inject the sidebar collapsed state
const sidebarCollapsed = inject('sidebarCollapsed', ref(false))
const router = useRouter()

// Enterprise plan tiers
const planTiers = [
  {
    id: 1,
    name: "Enterprise Basic",
    price: "$1,000",
    billing: "per month",
    features: [
      "100 users included",
      "Access to ChatGPT Enterprise model",
      "Priority support (24-hour response)",
      "Basic analytics dashboard",
      "Team workspace",
      "SSO integration"
    ],
    recommended: false
  },
  {
    id: 2,
    name: "Enterprise Pro",
    price: "$3,500",
    billing: "per month",
    features: [
      "500 users included",
      "Access to advanced GPT-4 features",
      "Priority support (4-hour response)",
      "Advanced analytics and reporting",
      "Custom plugins development",
      "Domain-specific model fine-tuning",
      "Training sessions for your team",
      "API access for custom integrations"
    ],
    recommended: true
  },
  {
    id: 3,
    name: "Enterprise Elite",
    price: "Custom",
    billing: "contact us",
    features: [
      "Unlimited users",
      "Dedicated instance deployment",
      "24/7 priority support with dedicated account manager",
      "Custom model training on your data",
      "Full API access with higher rate limits",
      "White-labeling options",
      "End-to-end integration services",
      "On-premise deployment options",
      "Custom security requirements"
    ],
    recommended: false
  }
]

// Case studies
const caseStudies = [
  {
    id: 1,
    company: "Global Financial Inc.",
    logo: "https://placehold.co/100x40/10a37f/FFFFFF.png?text=GFI",
    industry: "Financial Services",
    challenge: "Needed to streamline customer support for complex financial products while maintaining compliance requirements",
    solution: "Implemented ChatGPT Enterprise with custom compliance checks and domain-specific training",
    results: "Reduced response time by 74%, increased customer satisfaction by 45%, while ensuring 100% compliance with regulations"
  },
  {
    id: 2,
    company: "TechCorp Solutions",
    logo: "https://placehold.co/100x40/10a37f/FFFFFF.png?text=TCS",
    industry: "Technology",
    challenge: "Sought to improve developer productivity and knowledge management across global teams",
    solution: "Deployed ChatGPT Enterprise with code repository integration and custom documentation plugins",
    results: "40% reduction in development time, 65% faster onboarding for new engineers, and improved code quality metrics"
  },
  {
    id: 3,
    company: "HealthPartners",
    logo: "https://placehold.co/100x40/10a37f/FFFFFF.png?text=HP",
    industry: "Healthcare",
    challenge: "Needed to assist medical staff with research and patient care recommendations while protecting sensitive data",
    solution: "Implemented secure ChatGPT Enterprise with HIPAA compliance and medical knowledge base integration",
    results: "Physicians saved 15+ hours weekly on research, improved diagnosis speed by 35%, with zero data privacy incidents"
  }
]

const scrollToPlans = () => {
  document.getElementById('pricing-section').scrollIntoView({ 
    behavior: 'smooth' 
  });
}

const contactSales = () => {
  console.log('Contact sales clicked');
  // Would typically open a contact form or redirect to contact page
}
</script>

<template>
  <div class="enterprise-page">
    <main class="main-content" :class="{ 'sidebar-collapsed': sidebarCollapsed }">
      <!-- Hero Section -->
      <section class="hero-section">
        <div class="hero-content">
          <h1>ChatGPT Enterprise</h1>
          <p class="hero-subtitle">AI-powered solutions to transform your business</p>
          <p class="hero-description">
            Harness the power of advanced AI to drive innovation, increase productivity, 
            and create exceptional experiences for your customers and employees.
          </p>
          <div class="hero-actions">
            <button class="btn btn-primary" @click="scrollToPlans">
              View Enterprise Plans
            </button>
            <button class="btn btn-outline" @click="contactSales">
              Contact Sales
            </button>
          </div>
        </div>
        <div class="hero-image">
          <div class="enterprise-image"></div>
        </div>
      </section>

      <!-- Features Section -->
      <section class="features-section">
        <h2>Enterprise-Grade AI Solutions</h2>
        <div class="features-grid">
          <div class="feature-card">
            <div class="feature-icon security"></div>
            <h3>Enhanced Security & Privacy</h3>
            <p>Enterprise-grade security with dedicated instances, data encryption, and compliance with global regulations including GDPR, HIPAA, and SOC 2.</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon customization"></div>
            <h3>Custom Model Training</h3>
            <p>Train models on your proprietary data to create specialized AI solutions tailored to your industry and business requirements.</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon integration"></div>
            <h3>Seamless Integrations</h3>
            <p>Connect with your existing tools and workflows through our comprehensive API and pre-built integrations with leading enterprise software.</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon analytics"></div>
            <h3>Advanced Analytics</h3>
            <p>Gain actionable insights with comprehensive usage analytics, performance metrics, and custom reporting dashboards.</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon support"></div>
            <h3>Dedicated Support</h3>
            <p>Access to dedicated account managers, priority support, and expert guidance for implementation and optimization.</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon scalability"></div>
            <h3>Enterprise Scalability</h3>
            <p>Built to scale with your organization, supporting thousands of users with consistent performance and reliability.</p>
          </div>
        </div>
      </section>

      <!-- Case Studies Section -->
      <section class="case-studies-section">
        <h2>Success Stories</h2>
        <p class="section-subtitle">See how leading organizations are leveraging ChatGPT Enterprise</p>
        
        <div class="case-studies-grid">
          <div v-for="study in caseStudies" :key="study.id" class="case-study-card">
            <div class="case-study-header">
              <img :src="study.logo" :alt="study.company + ' logo'" class="company-logo">
              <div class="company-info">
                <h3>{{ study.company }}</h3>
                <span class="industry-tag">{{ study.industry }}</span>
              </div>
            </div>
            <div class="case-study-content">
              <div class="case-study-section">
                <h4>Challenge</h4>
                <p>{{ study.challenge }}</p>
              </div>
              <div class="case-study-section">
                <h4>Solution</h4>
                <p>{{ study.solution }}</p>
              </div>
              <div class="case-study-section">
                <h4>Results</h4>
                <p>{{ study.results }}</p>
              </div>
            </div>
            <button class="btn btn-text">Read full case study →</button>
          </div>
        </div>
      </section>

      <!-- Pricing Section -->
      <section id="pricing-section" class="pricing-section">
        <h2>Enterprise Plans</h2>
        <p class="section-subtitle">Scalable solutions for organizations of all sizes</p>
        
        <div class="pricing-grid">
          <div v-for="plan in planTiers" :key="plan.id" 
               class="pricing-card" 
               :class="{ 'recommended': plan.recommended }">
            <div v-if="plan.recommended" class="recommended-badge">Recommended</div>
            <h3>{{ plan.name }}</h3>
            <div class="pricing-details">
              <span class="price">{{ plan.price }}</span>
              <span class="billing">{{ plan.billing }}</span>
            </div>
            <ul class="features-list">
              <li v-for="(feature, index) in plan.features" :key="index">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                {{ feature }}
              </li>
            </ul>
            <button class="btn" :class="plan.recommended ? 'btn-primary' : 'btn-outline'">
              Get Started
            </button>
          </div>
        </div>
        
        <div class="enterprise-contact">
          <p>Looking for a custom solution? Our team is ready to help.</p>
          <button class="btn btn-outline" @click="contactSales">Contact our sales team</button>
        </div>
      </section>

      <!-- FAQ Section -->
      <section class="faq-section">
        <h2>Frequently Asked Questions</h2>
        <div class="faq-grid">
          <div class="faq-item">
            <h3>How is ChatGPT Enterprise different from the regular version?</h3>
            <p>ChatGPT Enterprise offers advanced features tailored for businesses, including enhanced security, custom model training, dedicated support, and enterprise-grade integrations not available in the standard version.</p>
          </div>
          <div class="faq-item">
            <h3>Can we train the model on our company's data?</h3>
            <p>Yes, our Enterprise plans include options for custom model fine-tuning using your proprietary data, allowing the AI to understand your specific terminology, products, and processes.</p>
          </div>
          <div class="faq-item">
            <h3>How do you ensure data privacy and security?</h3>
            <p>We employ enterprise-grade security measures including data encryption, dedicated instances, access controls, and compliance with major security standards. Your data is never used to train our models without explicit permission.</p>
          </div>
          <div class="faq-item">
            <h3>Do you offer on-premise deployment options?</h3>
            <p>Yes, our Enterprise Elite plan includes options for on-premise deployment for organizations with strict security requirements or regulatory needs.</p>
          </div>
        </div>
      </section>

      <!-- CTA Section -->
      <section class="cta-section">
        <div class="cta-content">
          <h2>Ready to transform your business with AI?</h2>
          <p>Join leading organizations leveraging ChatGPT Enterprise to drive innovation and efficiency.</p>
          <div class="cta-buttons">
            <button class="btn btn-primary" @click="scrollToPlans">View Plans</button>
            <button class="btn btn-outline" @click="contactSales">Schedule a Demo</button>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<style scoped>
.enterprise-page {
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

/* Hero Section */
.hero-section {
  display: flex;
  padding: 60px 40px;
  align-items: center;
  gap: 40px;
  background: linear-gradient(to right, #f8f9fa, #f3f4f6);
  border-radius: 12px;
  margin: 20px 40px 60px;
}

.hero-content {
  flex: 1;
}

.hero-image {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.enterprise-image {
  width: 400px;
  height: 300px;
  background: url('https://placehold.co/600x400/10a37f/FFFFFF.png?text=Enterprise+AI') no-repeat center center;
  background-size: contain;
  border-radius: 8px;
}

.hero-section h1 {
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 16px;
  background: linear-gradient(90deg, #10a37f, #066e54);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.hero-subtitle {
  font-size: 1.5rem;
  font-weight: 500;
  margin-bottom: 20px;
  color: #333;
}

.hero-description {
  font-size: 1.1rem;
  line-height: 1.6;
  color: #666;
  margin-bottom: 32px;
  max-width: 600px;
}

.hero-actions {
  display: flex;
  gap: 16px;
}

/* Features Section */
.features-section {
  padding: 40px;
  margin-bottom: 60px;
}

.features-section h2 {
  font-size: 2.2rem;
  text-align: center;
  margin-bottom: 40px;
  color: #333;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 30px;
}

.feature-card {
  background: white;
  border-radius: 12px;
  padding: 30px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.feature-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
}

.feature-icon {
  width: 60px;
  height: 60px;
  border-radius: 12px;
  margin-bottom: 20px;
  background-color: rgba(16, 163, 127, 0.1);
  background-position: center;
  background-repeat: no-repeat;
  background-size: 30px;
}

.feature-icon.security {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%2310a37f' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10'/%3E%3C/svg%3E");
}

.feature-icon.customization {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%2310a37f' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z'/%3E%3C/svg%3E");
}

.feature-icon.integration {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%2310a37f' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Crect x='2' y='2' width='9' height='9' rx='2' ry='2'/%3E%3Crect x='13' y='2' width='9' height='9' rx='2' ry='2'/%3E%3Crect x='13' y='13' width='9' height='9' rx='2' ry='2'/%3E%3Crect x='2' y='13' width='9' height='9' rx='2' ry='2'/%3E%3Cline x1='6.5' y1='11' x2='6.5' y2='13'/%3E%3Cline x1='17.5' y1='11' x2='17.5' y2='13'/%3E%3Cline x1='11' y1='6.5' x2='13' y2='6.5'/%3E%3Cline x1='11' y1='17.5' x2='13' y2='17.5'/%3E%3C/svg%3E");
}

.feature-icon.analytics {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%2310a37f' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cline x1='18' y1='20' x2='18' y2='10'/%3E%3Cline x1='12' y1='20' x2='12' y2='4'/%3E%3Cline x1='6' y1='20' x2='6' y2='14'/%3E%3C/svg%3E");
}

.feature-icon.support {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%2310a37f' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z'/%3E%3C/svg%3E");
}

.feature-icon.scalability {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%2310a37f' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M17 18a5 5 0 0 0-10 0'/%3E%3Cline x1='12' y1='9' x2='12' y2='13'/%3E%3Ccircle cx='12' cy='18' r='5'/%3E%3Cpath d='M7 6h10'/%3E%3Cpath d='M5 10h14'/%3E%3Cpath d='M3 14h18'/%3E%3C/svg%3E");
}

.feature-card h3 {
  font-size: 1.3rem;
  font-weight: 600;
  margin-bottom: 12px;
  color: #10a37f;
}

.feature-card p {
  font-size: 1rem;
  line-height: 1.5;
  color: #666;
}

/* Case Studies Section */
.case-studies-section {
  padding: 40px;
  margin-bottom: 60px;
  background: #f8f9fa;
  border-radius: 12px;
  margin: 0 40px 60px;
}

.case-studies-section h2, 
.pricing-section h2,
.faq-section h2 {
  font-size: 2.2rem;
  text-align: center;
  margin-bottom: 16px;
  color: #333;
}

.section-subtitle {
  text-align: center;
  font-size: 1.1rem;
  color: #666;
  margin-bottom: 40px;
}

.case-studies-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 30px;
}

.case-study-card {
  background: white;
  border-radius: 12px;
  padding: 30px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.case-study-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
}

.case-study-header {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.company-logo {
  width: 80px;
  height: 40px;
  object-fit: contain;
  margin-right: 15px;
}

.company-info h3 {
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 5px;
  color: #333;
}

.industry-tag {
  display: inline-block;
  padding: 4px 10px;
  background: rgba(16, 163, 127, 0.1);
  color: #10a37f;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: 500;
}

.case-study-section {
  margin-bottom: 15px;
}

.case-study-section h4 {
  font-size: 0.9rem;
  font-weight: 600;
  text-transform: uppercase;
  color: #888;
  margin-bottom: 5px;
}

.case-study-section p {
  font-size: 0.95rem;
  line-height: 1.5;
  color: #555;
}

.btn-text {
  background: none;
  border: none;
  color: #10a37f;
  font-weight: 500;
  padding: 0;
  cursor: pointer;
  margin-top: 15px;
  font-size: 0.95rem;
  transition: transform 0.2s ease;
}

.btn-text:hover {
  transform: translateX(5px);
}

/* Pricing Section */
.pricing-section {
  padding: 40px;
  margin-bottom: 60px;
  scroll-margin-top: 100px;
}

.pricing-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 30px;
  margin-bottom: 40px;
}

.pricing-card {
  background: white;
  border-radius: 12px;
  padding: 30px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  position: relative;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border: 1px solid #e5e7eb;
}

.pricing-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
}

.pricing-card.recommended {
  border: 2px solid #10a37f;
  transform: scale(1.05);
}

.pricing-card.recommended:hover {
  transform: scale(1.05) translateY(-5px);
}

.recommended-badge {
  position: absolute;
  top: -12px;
  left: 50%;
  transform: translateX(-50%);
  background: #10a37f;
  color: white;
  padding: 5px 15px;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 500;
}

.pricing-card h3 {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 20px;
  text-align: center;
  color: #333;
}

.pricing-details {
  text-align: center;
  margin-bottom: 30px;
}

.price {
  font-size: 2.5rem;
  font-weight: 700;
  color: #10a37f;
}

.billing {
  font-size: 1rem;
  color: #888;
  display: block;
  margin-top: 5px;
}

.features-list {
  list-style: none;
  margin-bottom: 30px;
}

.features-list li {
  display: flex;
  align-items: flex-start;
  margin-bottom: 12px;
  font-size: 0.95rem;
  color: #555;
}

.features-list li svg {
  color: #10a37f;
  margin-right: 10px;
  flex-shrink: 0;
  margin-top: 3px;
}

.pricing-card .btn {
  width: 100%;
  margin-top: auto;
}

.enterprise-contact {
  text-align: center;
  margin-top: 40px;
  padding: 30px;
  background: #f8f9fa;
  border-radius: 12px;
}

.enterprise-contact p {
  font-size: 1.1rem;
  margin-bottom: 20px;
  color: #555;
}

/* FAQ Section */
.faq-section {
  padding: 40px;
  margin-bottom: 60px;
}

.faq-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(450px, 1fr));
  gap: 30px;
  margin-top: 40px;
}

.faq-item {
  background: white;
  border-radius: 12px;
  padding: 25px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
}

.faq-item h3 {
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 15px;
  color: #333;
}

.faq-item p {
  font-size: 1rem;
  line-height: 1.6;
  color: #666;
}

/* CTA Section */
.cta-section {
  background: linear-gradient(135deg, #10a37f, #066e54);
  border-radius: 12px;
  padding: 60px 40px;
  margin: 0 40px;
  color: white;
  text-align: center;
}

.cta-content h2 {
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 20px;
}

.cta-content p {
  font-size: 1.1rem;
  max-width: 600px;
  margin: 0 auto 30px;
  opacity: 0.9;
}

.cta-buttons {
  display: flex;
  gap: 20px;
  justify-content: center;
}

.cta-section .btn-primary {
  background: white;
  color: #10a37f;
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
</style> 