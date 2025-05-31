<script setup>
import { ref, inject } from 'vue'

// Inject the sidebar collapsed state
const sidebarCollapsed = inject('sidebarCollapsed', ref(false))

// 团队成员数据
const teamMembers = [
  {
    id: 1,
    name: "Dr. Sophia Chen",
    title: "Chief AI Scientist",
    photo: "https://randomuser.me/api/portraits/women/23.jpg",
    bio: "Former DeepMind and Stanford AI Lab researcher with over 50 publications in top AI conferences. Dr. Chen pioneered breakthrough work in transformer architecture optimization, reducing computational requirements by 40% while improving performance. Her research on context-aware neural networks forms the foundation of our conversational AI systems.",
    achievements: ["ACM Computing Prize (2021)", "IEEE AI Innovation Award", "15 Patents in ML Systems"],
    education: "Ph.D. Computer Science, Stanford University"
  },
  {
    id: 2,
    name: "Alexander Wright",
    title: "CTO & Co-founder",
    photo: "https://randomuser.me/api/portraits/men/32.jpg",
    bio: "Ex-Google AI technical lead who built distributed systems powering billions of queries daily. Alex architected our proprietary neural processing framework that enables near-instantaneous response times across multiple language models. Previously designed mission-critical systems for autonomous vehicle decision making at Tesla's AI division.",
    achievements: ["MIT Technology Review 35 Under 35", "Lead architect on TensorFlow Quantum", "CNCF Top Contributor"],
    education: "M.S. Artificial Intelligence, MIT"
  },
  {
    id: 3,
    name: "Dr. Mei Wong",
    title: "Head of NLP Research",
    photo: "https://randomuser.me/api/portraits/women/75.jpg",
    bio: "Computational linguistics pioneer whose work on semantic understanding algorithms has been cited over 8,000 times. Dr. Wong developed our proprietary context retention system that allows for unprecedented conversation coherence across complex interactions. Previously led BERT advancement research at OpenAI.",
    achievements: ["ACL Outstanding Paper Award (2022)", "Named Top 10 Women in AI", "Google Research Fellowship"],
    education: "Ph.D. Computational Linguistics, UC Berkeley"
  },
  {
    id: 4,
    name: "David Kavinsky",
    title: "VP of Engineering",
    photo: "https://randomuser.me/api/portraits/men/45.jpg",
    bio: "Scaled multiple unicorn startups as engineering leader, including Stripe and Databricks. David architected our distributed inference system capable of handling millions of concurrent requests with sub-100ms latency. Expert in high-performance computing optimization and resilient system design.",
    achievements: ["Built AWS Lambda's core scaling engine", "InfoWorld Top Innovator", "3x Startup Exit Veteran"],
    education: "B.S. Computer Science, Carnegie Mellon University"
  },
  {
    id: 5,
    name: "Dr. Elijah Washington",
    title: "Ethics & AI Safety Director",
    photo: "https://randomuser.me/api/portraits/men/22.jpg",
    bio: "Globally recognized AI ethics researcher and policy advisor to the UN AI Council. Dr. Washington oversees our responsible AI development framework and bias detection systems. His groundbreaking work on algorithmic fairness assessment has become an industry standard adopted by major tech companies worldwide.",
    achievements: ["World Economic Forum Tech Pioneer", "Authored 'AI Ethics in Practice'", "Presidential Medal for Scientific Achievement"],
    education: "Ph.D. AI Ethics, Oxford University"
  },
  {
    id: 6,
    name: "Amara Okafor",
    title: "Chief Product Officer",
    photo: "https://randomuser.me/api/portraits/women/44.jpg",
    bio: "Former Head of Product at Anthropic and Netflix AI division. Amara has led the development of AI products used by over 500 million people globally. She pioneered our human-centered design approach, resulting in industry-leading user satisfaction scores and retention rates 45% above competitor benchmarks.",
    achievements: ["Product of the Year - Fast Company", "Named Fortune 40 Under 40", "Harvard Business School Case Study Feature"],
    education: "MBA, Harvard Business School"
  }
]
</script>

<template>
  <div class="team-page">
    <main class="main-content" :class="{ 'sidebar-collapsed': sidebarCollapsed }">
      <div class="page-header">
        <h1>Meet Our Exceptional Team</h1>
        <p class="subtitle">The brilliant minds behind our AI technology</p>
      </div>
      
      <div class="team-grid">
        <div v-for="member in teamMembers" :key="member.id" class="team-member">
          <div class="member-photo">
            <img :src="member.photo" :alt="member.name">
          </div>
          <div class="member-info">
            <h2>{{ member.name }}</h2>
            <h3>{{ member.title }}</h3>
            <p class="member-bio">{{ member.bio }}</p>
            <div class="member-achievements">
              <h4>Achievements & Recognition</h4>
              <ul>
                <li v-for="(achievement, index) in member.achievements" :key="index">
                  {{ achievement }}
                </li>
              </ul>
            </div>
            <div class="member-education">
              <strong>Education:</strong> {{ member.education }}
            </div>
          </div>
        </div>
      </div>
      
      <div class="join-team">
        <h2>Join Our Team</h2>
        <p>We're on a mission to build safe, helpful AI systems that empower humanity. If you're passionate about pushing the boundaries of AI technology while ensuring it benefits everyone, we want to hear from you.</p>
        <button class="btn-primary">View Open Positions</button>
      </div>
    </main>
  </div>
</template>

<style scoped>
.team-page {
  display: flex;
  min-height: 100vh;
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

.page-header {
  text-align: center;
  margin-bottom: 60px;
}

.page-header h1 {
  font-size: 2.8rem;
  font-weight: 700;
  margin-bottom: 10px;
  background: linear-gradient(120deg, #10a37f, #066e54);
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

.team-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(900px, 1fr));
  gap: 40px;
  margin-bottom: 60px;
}

.team-member {
  display: flex;
  background-color: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.team-member:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
}

.member-photo {
  flex: 0 0 250px;
  overflow: hidden;
}

.member-photo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.team-member:hover .member-photo img {
  transform: scale(1.05);
}

.member-info {
  flex: 1;
  padding: 25px;
}

.member-info h2 {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 4px;
  color: #10a37f;
}

.member-info h3 {
  font-size: 1rem;
  font-weight: 500;
  margin-bottom: 16px;
  color: #666;
}

.member-bio {
  font-size: 0.95rem;
  line-height: 1.6;
  margin-bottom: 20px;
  color: #333;
}

.member-achievements {
  margin-bottom: 15px;
}

.member-achievements h4 {
  font-size: 0.9rem;
  font-weight: 600;
  margin-bottom: 8px;
  color: #444;
}

.member-achievements ul {
  padding-left: 20px;
}

.member-achievements li {
  font-size: 0.9rem;
  margin-bottom: 4px;
  color: #555;
}

.member-education {
  font-size: 0.9rem;
  color: #444;
}

.join-team {
  background: linear-gradient(to right, rgba(16, 163, 127, 0.1), rgba(16, 163, 127, 0.05));
  border-radius: 12px;
  padding: 40px;
  text-align: center;
  margin: 60px auto 40px;
  max-width: 800px;
}

.join-team h2 {
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 15px;
  color: #10a37f;
}

.join-team p {
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 25px;
  color: #444;
}

.btn-primary {
  background-color: #10a37f;
  color: white;
  border: none;
  border-radius: 6px;
  padding: 12px 24px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn-primary:hover {
  background-color: #0d8a6c;
}

/* Responsive adjustments */
@media (max-width: 1024px) {
  .team-grid {
    grid-template-columns: 1fr;
  }
  
  .team-member {
    flex-direction: column;
    max-width: 500px;
    margin: 0 auto;
  }
  
  .member-photo {
    flex: 0 0 300px;
  }
}
</style> 