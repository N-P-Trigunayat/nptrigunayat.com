// Database simulation using in-memory storage
const DB = {
  services: [],
  team: [],
  blog: [],
  contacts: [],
  admin: null,
  currentUser: null
};

// Initialize app
function initApp() {
  seedDatabase();
  initRouter();
  initMobileMenu();
  initScrollEffects();
  
  // Check if user is logged in
  const token = getAuthToken();
  if (token) {
    DB.currentUser = DB.admin;
  }
}

// Seed database with placeholder data
function seedDatabase() {
  // Admin user
  DB.admin = {
    id: '1',
    email: 'admin@example.com',
    password: 'Admin@123', // In production, this would be hashed
    name: 'Admin User'
  };

  // Services
  DB.services = [
    {
      id: '1',
      name: 'Cloud Solutions',
      slug: 'cloud-solutions',
      shortDescription: 'Scalable and secure cloud infrastructure tailored to your needs',
      fullDescription: 'Our cloud solutions help businesses migrate, manage, and optimize their infrastructure across AWS, Azure, and Google Cloud platforms.',
      benefits: ['99.9% uptime guarantee', 'Auto-scaling capabilities', 'Cost optimization strategies', '24/7 monitoring and support'],
      icon: '☁️',
      displayOrder: 1,
      active: true
    },
    {
      id: '2',
      name: 'Web Development',
      slug: 'web-development',
      shortDescription: 'Custom web applications built with modern technologies',
      fullDescription: 'We create high-performance, scalable web applications using cutting-edge frameworks and best practices.',
      benefits: ['Responsive design for all devices', 'SEO optimization included', 'Fast loading times', 'Ongoing maintenance and support'],
      icon: '💻',
      displayOrder: 2,
      active: true
    },
    {
      id: '3',
      name: 'Mobile Development',
      slug: 'mobile-development',
      shortDescription: 'Native and cross-platform mobile apps for iOS and Android',
      fullDescription: 'Transform your ideas into powerful mobile applications with seamless user experiences.',
      benefits: ['Native iOS and Android development', 'Cross-platform solutions', 'App Store optimization', 'Post-launch support'],
      icon: '📱',
      displayOrder: 3,
      active: true
    },
    {
      id: '4',
      name: 'Data Analytics',
      slug: 'data-analytics',
      shortDescription: 'Turn your data into actionable business insights',
      fullDescription: 'Leverage advanced analytics and business intelligence to make data-driven decisions.',
      benefits: ['Custom dashboards and reports', 'Predictive analytics', 'Real-time data processing', 'Integration with existing systems'],
      icon: '📊',
      displayOrder: 4,
      active: true
    },
    {
      id: '5',
      name: 'Cybersecurity',
      slug: 'cybersecurity',
      shortDescription: 'Enterprise-grade security solutions to protect your assets',
      fullDescription: 'Comprehensive security services including penetration testing, compliance auditing, and threat management.',
      benefits: ['24/7 threat monitoring', 'Compliance certification support', 'Security training for teams', 'Incident response planning'],
      icon: '🔒',
      displayOrder: 5,
      active: true
    },
    {
      id: '6',
      name: 'AI & Machine Learning',
      slug: 'ai-machine-learning',
      shortDescription: 'Intelligent automation and AI-powered solutions',
      fullDescription: 'Implement cutting-edge AI and ML solutions to automate processes and gain competitive advantages.',
      benefits: ['Custom ML model development', 'Natural language processing', 'Computer vision solutions', 'Continuous model optimization'],
      icon: '🤖',
      displayOrder: 6,
      active: true
    }
  ];

  // Team members
  DB.team = [
    {
      id: '1',
      name: 'Sarah Chen',
      role: 'Chief Executive Officer',
      photoUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
      shortBio: '15+ years leading technology companies with a focus on innovation and growth',
      longBio: 'Sarah brings over 15 years of executive leadership experience in the technology sector. Prior to founding our company, she served as VP of Engineering at a Fortune 500 company and led multiple successful digital transformation initiatives.',
      linkedinUrl: 'https://linkedin.com',
      expertise: ['Strategic Planning', 'Business Development', 'Digital Transformation'],
      yearsExperience: 15,
      sortOrder: 1,
      active: true
    },
    {
      id: '2',
      name: 'Michael Rodriguez',
      role: 'Chief Technology Officer',
      photoUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Michael',
      shortBio: 'Cloud architecture expert with passion for scalable systems',
      longBio: 'Michael has architected and deployed cloud solutions for clients ranging from startups to enterprise organizations. He holds certifications in AWS, Azure, and Google Cloud.',
      linkedinUrl: 'https://linkedin.com',
      expertise: ['Cloud Architecture', 'DevOps', 'System Design'],
      yearsExperience: 12,
      sortOrder: 2,
      active: true
    },
    {
      id: '3',
      name: 'Emily Watson',
      role: 'Head of Design',
      photoUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emily',
      shortBio: 'Award-winning designer specializing in user experience and brand identity',
      longBio: "Emily's design work has been featured in leading industry publications. She leads our design team in creating intuitive, beautiful experiences that drive engagement.",
      linkedinUrl: 'https://linkedin.com',
      expertise: ['UI/UX Design', 'Brand Strategy', 'Design Systems'],
      yearsExperience: 10,
      sortOrder: 3,
      active: true
    },
    {
      id: '4',
      name: 'David Kim',
      role: 'Lead Developer',
      photoUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=David',
      shortBio: 'Full-stack developer passionate about clean code and performance',
      longBio: "David has built and scaled applications serving millions of users. He's an active contributor to open-source projects and a frequent speaker at tech conferences.",
      linkedinUrl: 'https://linkedin.com',
      expertise: ['Full-Stack Development', 'React', 'Node.js', 'Performance Optimization'],
      yearsExperience: 8,
      sortOrder: 4,
      active: true
    },
    {
      id: '5',
      name: 'Priya Sharma',
      role: 'Director of Marketing',
      photoUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Priya',
      shortBio: 'Growth marketing specialist with proven track record in B2B tech',
      longBio: 'Priya has driven growth for multiple SaaS companies through data-driven marketing strategies. She specializes in content marketing, SEO, and conversion optimization.',
      linkedinUrl: 'https://linkedin.com',
      expertise: ['Growth Marketing', 'Content Strategy', 'SEO', 'Analytics'],
      yearsExperience: 9,
      sortOrder: 5,
      active: true
    },
    {
      id: '6',
      name: 'James Anderson',
      role: 'Security Architect',
      photoUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=James',
      shortBio: 'Cybersecurity expert focused on enterprise security solutions',
      longBio: 'James holds multiple security certifications including CISSP and CEH. He has protected organizations from sophisticated cyber threats and leads our security practice.',
      linkedinUrl: 'https://linkedin.com',
      expertise: ['Cybersecurity', 'Penetration Testing', 'Compliance', 'Risk Management'],
      yearsExperience: 11,
      sortOrder: 6,
      active: true
    }
  ];

  // Blog posts
  DB.blog = [
    {
      id: '1',
      title: 'The Future of Cloud Computing in 2025',
      slug: 'future-cloud-computing-2025',
      featuredImageUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800',
      author: 'Michael Rodriguez',
      category: 'Technology',
      tags: ['Cloud', 'Infrastructure', 'Trends'],
      excerpt: 'Exploring emerging trends in cloud technology and what they mean for businesses looking to scale.',
      content: '# The Future of Cloud Computing in 2025\n\nCloud computing continues to evolve at a rapid pace. As we look ahead to 2025, several key trends are emerging that will reshape how businesses leverage cloud infrastructure.\n\n## Key Trends\n\n1. **Edge Computing Integration**: Moving processing closer to data sources for reduced latency\n2. **AI-Optimized Cloud Services**: Native AI/ML capabilities built into cloud platforms\n3. **Sustainability Focus**: Green cloud initiatives and carbon-neutral data centers\n4. **Enhanced Security**: Zero-trust architectures becoming the standard\n\n## What This Means for Your Business\n\nBusinesses that adapt early to these trends will gain significant competitive advantages. Cloud migration is no longer optional—it\'s essential for staying competitive in the digital economy.',
      status: 'published',
      publishDate: new Date('2025-11-01').toISOString()
    },
    {
      id: '2',
      title: '10 UX Design Principles Every Developer Should Know',
      slug: 'ux-design-principles-developers',
      featuredImageUrl: 'https://images.unsplash.com/photo-1559028012-481c04fa702d?w=800',
      author: 'Emily Watson',
      category: 'Design',
      tags: ['UX', 'Design', 'Development'],
      excerpt: 'Bridge the gap between design and development with these essential UX principles.',
      content: '# 10 UX Design Principles Every Developer Should Know\n\nGreat products require collaboration between designers and developers. Here are the essential UX principles that every developer should understand.\n\n## 1. User-Centered Design\nAlways start with user needs, not technical constraints.\n\n## 2. Consistency\nMaintain consistent patterns throughout your application.\n\n## 3. Feedback\nProvide immediate feedback for user actions.\n\n## 4. Accessibility\nDesign for all users, including those with disabilities.\n\n## 5. Progressive Disclosure\nShow only what users need, when they need it.',
      status: 'published',
      publishDate: new Date('2025-10-28').toISOString()
    },
    {
      id: '3',
      title: 'How AI is Transforming Business Operations',
      slug: 'ai-transforming-business-operations',
      featuredImageUrl: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800',
      author: 'Sarah Chen',
      category: 'Business',
      tags: ['AI', 'Automation', 'Strategy'],
      excerpt: 'Real-world examples of how companies are leveraging AI to improve efficiency and decision-making.',
      content: '# How AI is Transforming Business Operations\n\nArtificial intelligence is no longer a future concept—it\'s actively transforming how businesses operate today.\n\n## Real-World Applications\n\n### Customer Service\nAI-powered chatbots handle 80% of routine inquiries, freeing human agents for complex issues.\n\n### Data Analysis\nMachine learning algorithms identify patterns humans might miss, enabling predictive maintenance and demand forecasting.\n\n### Process Automation\nRobotic Process Automation (RPA) handles repetitive tasks, reducing errors and costs.\n\n## Getting Started\n\nThe key to successful AI implementation is starting small, measuring results, and scaling what works.',
      status: 'published',
      publishDate: new Date('2025-10-25').toISOString()
    }
  ];

  // Contact inquiries
  DB.contacts = [
    {
      id: '1',
      fullName: 'John Smith',
      email: 'john.smith@techcorp.com',
      phone: '+1-555-0123',
      company: 'TechCorp Industries',
      subject: 'Cloud Migration Consultation',
      message: "We're looking to migrate our infrastructure to the cloud and would like to discuss your services.",
      status: 'new',
      notes: '',
      createdAt: new Date('2025-11-20').toISOString()
    },
    {
      id: '2',
      fullName: 'Lisa Johnson',
      email: 'lisa.j@startup.io',
      phone: '+1-555-0124',
      company: 'StartupIO',
      subject: 'Web Development Quote',
      message: 'Need a quote for building a SaaS platform with React and Node.js.',
      status: 'in-progress',
      notes: 'Sent initial proposal on Nov 20',
      createdAt: new Date('2025-11-18').toISOString()
    }
  ];
}

// Router
function initRouter() {
  function handleRoute() {
    const hash = window.location.hash.slice(1) || '/';
    const [path, ...params] = hash.split('/');
    
    // Update active nav link
    document.querySelectorAll('.nav-link').forEach(link => {
      const route = link.getAttribute('data-route');
      if (hash === route || (route !== '/' && hash.startsWith(route))) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
    
    // Route to appropriate page
    if (hash === '/' || hash === '') {
      renderHomePage();
    } else if (hash === '/services') {
      renderServicesPage();
    } else if (hash.startsWith('/services/')) {
      const slug = hash.replace('/services/', '');
      renderServiceDetailPage(slug);
    } else if (hash === '/team') {
      renderTeamPage();
    } else if (hash === '/blog') {
      renderBlogPage();
    } else if (hash.startsWith('/blog/')) {
      const slug = hash.replace('/blog/', '');
      renderBlogDetailPage(slug);
    } else if (hash === '/contact') {
      renderContactPage();
    } else if (hash === '/admin/login') {
      renderAdminLoginPage();
    } else if (hash.startsWith('/admin')) {
      if (!DB.currentUser) {
        window.location.hash = '#/admin/login';
        return;
      }
      if (hash === '/admin' || hash === '/admin/') {
        renderAdminDashboard();
      } else if (hash === '/admin/services') {
        renderAdminServices();
      } else if (hash === '/admin/team') {
        renderAdminTeam();
      } else if (hash === '/admin/blog') {
        renderAdminBlog();
      } else if (hash === '/admin/contacts') {
        renderAdminContacts();
      }
    }
    
    // Scroll to top
    window.scrollTo(0, 0);
  }
  
  window.addEventListener('hashchange', handleRoute);
  handleRoute();
}

// Mobile menu
function initMobileMenu() {
  const toggle = document.getElementById('mobileMenuToggle');
  const menu = document.getElementById('navMenu');
  
  toggle.addEventListener('click', () => {
    menu.style.display = menu.style.display === 'flex' ? 'none' : 'flex';
  });
}

// Scroll effects
function initScrollEffects() {
  const header = document.getElementById('header');
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}

// Auth helpers
function getAuthToken() {
  // Simulated token storage in memory
  return DB.currentUser ? 'fake-jwt-token' : null;
}

function setAuthToken(token) {
  // In a real app, this would be stored securely
  DB.currentUser = DB.admin;
}

function clearAuthToken() {
  DB.currentUser = null;
}

// Toast notification
function showToast(message, type = 'success') {
  const container = document.getElementById('toastContainer');
  const toast = document.createElement('div');
  toast.className = `toast toast--${type}`;
  toast.textContent = message;
  container.appendChild(toast);
  
  setTimeout(() => {
    toast.remove();
  }, 3000);
}

// Modal
function showModal(title, content, footer = '') {
  const container = document.getElementById('modalContainer');
  container.innerHTML = `
    <div class="modal">
      <div class="modal-header">
        <h3 class="modal-title">${title}</h3>
        <button class="modal-close" onclick="closeModal()">&times;</button>
      </div>
      <div class="modal-body">${content}</div>
      ${footer ? `<div class="modal-footer">${footer}</div>` : ''}
    </div>
  `;
  container.classList.add('active');
}

function closeModal() {
  const container = document.getElementById('modalContainer');
  container.classList.remove('active');
  container.innerHTML = '';
}

// Format date
function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

// HOME PAGE
function renderHomePage() {
  const app = document.getElementById('app');
  const activeServices = DB.services.filter(s => s.active).slice(0, 6);
  const activeTeam = DB.team.filter(t => t.active).slice(0, 4);
  const publishedBlog = DB.blog.filter(b => b.status === 'published').slice(0, 3);
  
  app.innerHTML = `
    <!-- Hero Section -->
    <section class="hero">
      <div class="container">
        <div class="hero-content">
          <h1>Transform Your Business with Expert Solutions</h1>
          <p>We deliver cutting-edge technology services that drive growth and efficiency</p>
          <div class="hero-actions">
            <a href="#/contact" class="btn btn--primary btn--lg">Book a Consultation</a>
            <a href="#/services" class="btn btn--secondary btn--lg">View Services</a>
          </div>
        </div>
      </div>
    </section>

    <!-- Services Overview -->
    <section class="section">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">Our Services</h2>
          <p class="section-subtitle">Comprehensive technology solutions to power your business forward</p>
        </div>
        <div class="grid grid-3">
          ${activeServices.map(service => `
            <div class="card">
              <div class="card-icon">${service.icon}</div>
              <h3 class="card-title">${service.name}</h3>
              <p class="card-description">${service.shortDescription}</p>
              <a href="#/services/${service.slug}" class="btn btn--secondary btn--sm">Learn More</a>
            </div>
          `).join('')}
        </div>
      </div>
    </section>

    <!-- Trust Section -->
    <section class="section" style="background: var(--color-surface);">
      <div class="container">
        <div class="stats-grid">
          <div class="stat-card">
            <div class="stat-number">500+</div>
            <div class="stat-label">Clients Served</div>
          </div>
          <div class="stat-card">
            <div class="stat-number">15+</div>
            <div class="stat-label">Years Experience</div>
          </div>
          <div class="stat-card">
            <div class="stat-number">98%</div>
            <div class="stat-label">Client Satisfaction</div>
          </div>
          <div class="stat-card">
            <div class="stat-number">50+</div>
            <div class="stat-label">Countries</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Team Teaser -->
    <section class="section">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">Meet Our Experts</h2>
          <p class="section-subtitle">Our talented team is dedicated to your success</p>
        </div>
        <div class="grid grid-4">
          ${activeTeam.map(member => `
            <div class="card team-card">
              <img src="${member.photoUrl}" alt="${member.name}" class="team-photo">
              <h3 class="team-name">${member.name}</h3>
              <div class="team-role">${member.role}</div>
              <p class="team-bio">${member.shortBio}</p>
            </div>
          `).join('')}
        </div>
        <div style="text-align: center; margin-top: var(--space-32);">
          <a href="#/team" class="btn btn--primary">View Full Team</a>
        </div>
      </div>
    </section>

    <!-- Blog Preview -->
    <section class="section" style="background: var(--color-surface);">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">Latest Insights</h2>
          <p class="section-subtitle">Stay informed with our latest articles and industry insights</p>
        </div>
        <div class="grid grid-3">
          ${publishedBlog.map(post => `
            <div class="card blog-card">
              <img src="${post.featuredImageUrl}" alt="${post.title}" class="blog-image">
              <div class="blog-meta">
                <span>${formatDate(post.publishDate)}</span>
                <span>${post.author}</span>
              </div>
              <h3 class="blog-title">
                <a href="#/blog/${post.slug}">${post.title}</a>
              </h3>
              <p class="blog-excerpt">${post.excerpt}</p>
              <a href="#/blog/${post.slug}" class="btn btn--secondary btn--sm">Read More</a>
            </div>
          `).join('')}
        </div>
        <div style="text-align: center; margin-top: var(--space-32);">
          <a href="#/blog" class="btn btn--primary">View All Articles</a>
        </div>
      </div>
    </section>

    <!-- Final CTA -->
    <section class="section">
      <div class="container">
        <div style="text-align: center; max-width: 600px; margin: 0 auto;">
          <h2 class="section-title">Ready to Get Started?</h2>
          <p class="section-subtitle">Let's discuss how we can help transform your business</p>
          <a href="#/contact" class="btn btn--primary btn--lg" style="margin-top: var(--space-24);">Contact Us Today</a>
        </div>
      </div>
    </section>
  `;
}

// SERVICES PAGE
function renderServicesPage() {
  const app = document.getElementById('app');
  const activeServices = DB.services.filter(s => s.active).sort((a, b) => a.displayOrder - b.displayOrder);
  
  app.innerHTML = `
    <section class="hero">
      <div class="container">
        <div class="hero-content">
          <h1>Our Services</h1>
          <p>Comprehensive technology solutions tailored to your business needs</p>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="grid grid-3">
          ${activeServices.map(service => `
            <div class="card">
              <div class="card-icon">${service.icon}</div>
              <h3 class="card-title">${service.name}</h3>
              <p class="card-description">${service.shortDescription}</p>
              <ul style="margin: var(--space-16) 0; padding-left: var(--space-24); color: var(--color-text-secondary);">
                ${service.benefits.slice(0, 3).map(benefit => `<li style="margin-bottom: var(--space-8);">${benefit}</li>`).join('')}
              </ul>
              <a href="#/services/${service.slug}" class="btn btn--primary btn--sm">Learn More</a>
            </div>
          `).join('')}
        </div>
      </div>
    </section>

    <section class="section" style="background: var(--color-surface);">
      <div class="container">
        <div style="text-align: center; max-width: 600px; margin: 0 auto;">
          <h2 class="section-title">Ready to Transform Your Business?</h2>
          <p class="section-subtitle">Contact us today to discuss your project requirements</p>
          <a href="#/contact" class="btn btn--primary btn--lg" style="margin-top: var(--space-24);">Get Started</a>
        </div>
      </div>
    </section>
  `;
}

// SERVICE DETAIL PAGE
function renderServiceDetailPage(slug) {
  const app = document.getElementById('app');
  const service = DB.services.find(s => s.slug === slug);
  
  if (!service) {
    app.innerHTML = '<div class="container" style="padding: var(--space-64) 0;"><h1>Service not found</h1></div>';
    return;
  }
  
  app.innerHTML = `
    <section class="hero">
      <div class="container">
        <div class="hero-content">
          <div style="font-size: 64px; margin-bottom: var(--space-16);">${service.icon}</div>
          <h1>${service.name}</h1>
          <p>${service.shortDescription}</p>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div style="max-width: 800px; margin: 0 auto;">
          <h2 style="margin-bottom: var(--space-24);">Overview</h2>
          <p style="font-size: var(--font-size-lg); color: var(--color-text-secondary); line-height: 1.8; margin-bottom: var(--space-48);">${service.fullDescription}</p>
          
          <h2 style="margin-bottom: var(--space-24);">Key Benefits</h2>
          <div class="grid grid-2" style="margin-bottom: var(--space-48);">
            ${service.benefits.map(benefit => `
              <div class="card">
                <div style="font-size: 32px; margin-bottom: var(--space-12);">✓</div>
                <p>${benefit}</p>
              </div>
            `).join('')}
          </div>

          <div style="background: var(--color-surface); padding: var(--space-32); border-radius: var(--radius-lg); text-align: center;">
            <h3 style="margin-bottom: var(--space-16);">Get Started Today</h3>
            <p style="color: var(--color-text-secondary); margin-bottom: var(--space-24);">Contact us to discuss how ${service.name.toLowerCase()} can benefit your business</p>
            <a href="#/contact" class="btn btn--primary btn--lg">Contact Us</a>
          </div>
        </div>
      </div>
    </section>
  `;
}

// TEAM PAGE
function renderTeamPage() {
  const app = document.getElementById('app');
  const activeTeam = DB.team.filter(t => t.active).sort((a, b) => a.sortOrder - b.sortOrder);
  
  app.innerHTML = `
    <section class="hero">
      <div class="container">
        <div class="hero-content">
          <h1>Meet Our Team</h1>
          <p>Talented professionals dedicated to delivering excellence</p>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="grid grid-3">
          ${activeTeam.map(member => `
            <div class="card team-card">
              <img src="${member.photoUrl}" alt="${member.name}" class="team-photo">
              <h3 class="team-name">${member.name}</h3>
              <div class="team-role">${member.role}</div>
              <p class="team-bio">${member.shortBio}</p>
              <div style="margin-bottom: var(--space-16);">
                ${member.expertise.map(exp => `<span class="status-badge status-badge--active" style="margin: var(--space-4);">${exp}</span>`).join('')}
              </div>
              <button class="btn btn--secondary btn--sm" onclick="showTeamMemberModal('${member.id}')">View Profile</button>
            </div>
          `).join('')}
        </div>
      </div>
    </section>
  `;
}

function showTeamMemberModal(id) {
  const member = DB.team.find(t => t.id === id);
  if (!member) return;
  
  const content = `
    <div style="text-align: center;">
      <img src="${member.photoUrl}" alt="${member.name}" style="width: 150px; height: 150px; border-radius: 50%; margin-bottom: var(--space-16);">
      <h3 style="margin-bottom: var(--space-8);">${member.name}</h3>
      <div style="color: var(--color-primary); margin-bottom: var(--space-16);">${member.role}</div>
      <p style="color: var(--color-text-secondary); margin-bottom: var(--space-24);">${member.longBio}</p>
      
      <h4 style="margin-bottom: var(--space-12);">Expertise</h4>
      <div style="margin-bottom: var(--space-24);">
        ${member.expertise.map(exp => `<span class="status-badge status-badge--active" style="margin: var(--space-4);">${exp}</span>`).join('')}
      </div>
      
      <div style="color: var(--color-text-secondary);"><strong>${member.yearsExperience}+</strong> years of experience</div>
    </div>
  `;
  
  showModal(member.name, content, `
    <a href="${member.linkedinUrl}" target="_blank" class="btn btn--primary">View LinkedIn</a>
    <button class="btn btn--secondary" onclick="closeModal()">Close</button>
  `);
}

// BLOG PAGE
function renderBlogPage() {
  const app = document.getElementById('app');
  const publishedPosts = DB.blog.filter(b => b.status === 'published').sort((a, b) => new Date(b.publishDate) - new Date(a.publishDate));
  
  app.innerHTML = `
    <section class="hero">
      <div class="container">
        <div class="hero-content">
          <h1>Insights &amp; Resources</h1>
          <p>Stay informed with the latest industry trends and best practices</p>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="grid grid-3">
          ${publishedPosts.map(post => `
            <div class="card blog-card">
              <img src="${post.featuredImageUrl}" alt="${post.title}" class="blog-image">
              <div class="blog-meta">
                <span>${formatDate(post.publishDate)}</span>
                <span>${post.author}</span>
              </div>
              <span class="status-badge status-badge--active" style="margin-bottom: var(--space-12);">${post.category}</span>
              <h3 class="blog-title">
                <a href="#/blog/${post.slug}">${post.title}</a>
              </h3>
              <p class="blog-excerpt">${post.excerpt}</p>
              <a href="#/blog/${post.slug}" class="btn btn--primary btn--sm">Read More</a>
            </div>
          `).join('')}
        </div>
      </div>
    </section>
  `;
}

// BLOG DETAIL PAGE
function renderBlogDetailPage(slug) {
  const app = document.getElementById('app');
  const post = DB.blog.find(b => b.slug === slug);
  
  if (!post) {
    app.innerHTML = '<div class="container" style="padding: var(--space-64) 0;"><h1>Post not found</h1></div>';
    return;
  }
  
  const relatedPosts = DB.blog.filter(b => b.id !== post.id && b.status === 'published' && b.category === post.category).slice(0, 3);
  
  app.innerHTML = `
    <section class="hero" style="background-image: url('${post.featuredImageUrl}'); background-size: cover; background-position: center; position: relative;">
      <div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0, 0, 0, 0.6);"></div>
      <div class="container" style="position: relative; z-index: 1;">
        <div class="hero-content" style="color: white;">
          <span class="status-badge" style="background: rgba(255,255,255,0.2); color: white; margin-bottom: var(--space-16);">${post.category}</span>
          <h1 style="color: white;">${post.title}</h1>
          <div style="display: flex; gap: var(--space-24); justify-content: center; color: rgba(255,255,255,0.9);">
            <span>${post.author}</span>
            <span>${formatDate(post.publishDate)}</span>
          </div>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div style="max-width: 800px; margin: 0 auto;">
          <div style="font-size: var(--font-size-lg); line-height: 1.8; color: var(--color-text);">
            ${post.content.split('\n').map(line => {
              if (line.startsWith('# ')) return `<h1 style="margin: var(--space-32) 0 var(--space-16);">${line.replace('# ', '')}</h1>`;
              if (line.startsWith('## ')) return `<h2 style="margin: var(--space-24) 0 var(--space-16);">${line.replace('## ', '')}</h2>`;
              if (line.startsWith('### ')) return `<h3 style="margin: var(--space-16) 0 var(--space-12);">${line.replace('### ', '')}</h3>`;
              if (line.trim() === '') return '<br>';
              return `<p style="margin-bottom: var(--space-16); color: var(--color-text-secondary);">${line}</p>`;
            }).join('')}
          </div>

          ${relatedPosts.length > 0 ? `
            <div style="margin-top: var(--space-64);">
              <h2 style="margin-bottom: var(--space-32);">Related Articles</h2>
              <div class="grid grid-3">
                ${relatedPosts.map(related => `
                  <div class="card">
                    <h4><a href="#/blog/${related.slug}" style="color: var(--color-text); text-decoration: none;">${related.title}</a></h4>
                    <p style="color: var(--color-text-secondary); margin-top: var(--space-12);">${related.excerpt}</p>
                  </div>
                `).join('')}
              </div>
            </div>
          ` : ''}

          <div style="background: var(--color-surface); padding: var(--space-32); border-radius: var(--radius-lg); text-align: center; margin-top: var(--space-48);">
            <h3 style="margin-bottom: var(--space-16);">Have Questions?</h3>
            <p style="color: var(--color-text-secondary); margin-bottom: var(--space-24);">Get in touch with our team to learn more</p>
            <a href="#/contact" class="btn btn--primary">Contact Us</a>
          </div>
        </div>
      </div>
    </section>
  `;
}

// CONTACT PAGE
function renderContactPage() {
  const app = document.getElementById('app');
  
  app.innerHTML = `
    <section class="hero">
      <div class="container">
        <div class="hero-content">
          <h1>Contact Us</h1>
          <p>Let's discuss how we can help your business succeed</p>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="contact-grid">
          <div>
            <h2 style="margin-bottom: var(--space-24);">Send us a message</h2>
            <form id="contactForm" onsubmit="handleContactSubmit(event)">
              <div class="form-group">
                <label class="form-label">Full Name *</label>
                <input type="text" name="fullName" class="form-input" required>
              </div>
              <div class="form-group">
                <label class="form-label">Email *</label>
                <input type="email" name="email" class="form-input" required>
              </div>
              <div class="form-group">
                <label class="form-label">Phone</label>
                <input type="tel" name="phone" class="form-input">
              </div>
              <div class="form-group">
                <label class="form-label">Company</label>
                <input type="text" name="company" class="form-input">
              </div>
              <div class="form-group">
                <label class="form-label">Subject *</label>
                <input type="text" name="subject" class="form-input" required>
              </div>
              <div class="form-group">
                <label class="form-label">Message *</label>
                <textarea name="message" class="form-textarea" required></textarea>
              </div>
              <button type="submit" class="btn btn--primary btn--full">Send Message</button>
            </form>
          </div>

          <div class="contact-info">
            <h3>Get in Touch</h3>
            <div class="contact-item">
              <h4>Office Address</h4>
              <p>123 Tech Street<br>San Francisco, CA 94105</p>
            </div>
            <div class="contact-item">
              <h4>Phone</h4>
              <p>+1 (555) 123-4567</p>
            </div>
            <div class="contact-item">
              <h4>Email</h4>
              <p>hello@techvision.com</p>
            </div>
            <div class="contact-item">
              <h4>Office Hours</h4>
              <p>Monday - Friday: 9:00 AM - 6:00 PM<br>Saturday: 10:00 AM - 2:00 PM<br>Sunday: Closed</p>
            </div>
            <div style="margin-top: var(--space-24); padding: var(--space-16); background: rgba(var(--color-blue-500-rgb), 0.1); border-radius: var(--radius-base);">
              <p style="font-weight: 600; margin-bottom: var(--space-8);">⚡ Quick Response</p>
              <p style="font-size: var(--font-size-sm); color: var(--color-text-secondary);">We typically respond to all inquiries within 24 hours</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;
}

function handleContactSubmit(event) {
  event.preventDefault();
  const form = event.target;
  const formData = new FormData(form);
  
  const contact = {
    id: Date.now().toString(),
    fullName: formData.get('fullName'),
    email: formData.get('email'),
    phone: formData.get('phone') || '',
    company: formData.get('company') || '',
    subject: formData.get('subject'),
    message: formData.get('message'),
    status: 'new',
    notes: '',
    createdAt: new Date().toISOString()
  };
  
  DB.contacts.push(contact);
  showToast('Thank you! Your message has been sent successfully.');
  form.reset();
}

// ADMIN LOGIN
function renderAdminLoginPage() {
  const app = document.getElementById('app');
  
  app.innerHTML = `
    <div class="login-container">
      <div class="login-card card">
        <div class="login-header">
          <h1>Admin Login</h1>
          <p style="color: var(--color-text-secondary);">Sign in to manage your site</p>
        </div>
        <form onsubmit="handleAdminLogin(event)">
          <div class="form-group">
            <label class="form-label">Email</label>
            <input type="email" name="email" class="form-input" value="admin@example.com" required>
          </div>
          <div class="form-group">
            <label class="form-label">Password</label>
            <input type="password" name="password" class="form-input" value="Admin@123" required>
          </div>
          <button type="submit" class="btn btn--primary btn--full">Sign In</button>
        </form>
        <div style="margin-top: var(--space-24); padding: var(--space-16); background: rgba(var(--color-blue-500-rgb), 0.1); border-radius: var(--radius-base); font-size: var(--font-size-sm);">
          <strong>Demo Credentials:</strong><br>
          Email: admin@example.com<br>
          Password: Admin@123
        </div>
      </div>
    </div>
  `;
}

function handleAdminLogin(event) {
  event.preventDefault();
  const form = event.target;
  const formData = new FormData(form);
  
  const email = formData.get('email');
  const password = formData.get('password');
  
  if (email === DB.admin.email && password === DB.admin.password) {
    setAuthToken('fake-jwt-token');
    showToast('Login successful!');
    window.location.hash = '#/admin';
  } else {
    showToast('Invalid credentials', 'error');
  }
}

// ADMIN LAYOUT
function renderAdminLayout(title, content) {
  const app = document.getElementById('app');
  
  app.innerHTML = `
    <div class="admin-layout">
      <aside class="admin-sidebar">
        <div class="logo" style="margin-bottom: var(--space-32);">
          <span class="logo-icon">⚡</span>
          <span class="logo-text">TechVision</span>
        </div>
        <ul class="admin-nav">
          <li><a href="#/admin" class="${window.location.hash === '#/admin' ? 'active' : ''}">Dashboard</a></li>
          <li><a href="#/admin/services" class="${window.location.hash === '#/admin/services' ? 'active' : ''}">Services</a></li>
          <li><a href="#/admin/team" class="${window.location.hash === '#/admin/team' ? 'active' : ''}">Team</a></li>
          <li><a href="#/admin/blog" class="${window.location.hash === '#/admin/blog' ? 'active' : ''}">Blog</a></li>
          <li><a href="#/admin/contacts" class="${window.location.hash === '#/admin/contacts' ? 'active' : ''}">Contacts</a></li>
        </ul>
        <div style="margin-top: var(--space-48); padding-top: var(--space-24); border-top: 1px solid var(--color-card-border);">
          <button onclick="handleLogout()" class="btn btn--secondary btn--sm btn--full">Logout</button>
        </div>
      </aside>
      <main class="admin-main">
        <div class="admin-header">
          <h1 class="admin-title">${title}</h1>
        </div>
        ${content}
      </main>
    </div>
  `;
}

function handleLogout() {
  clearAuthToken();
  showToast('Logged out successfully');
  window.location.hash = '#/admin/login';
}

// ADMIN DASHBOARD
function renderAdminDashboard() {
  const totalServices = DB.services.length;
  const totalTeam = DB.team.length;
  const totalBlog = DB.blog.length;
  const totalContacts = DB.contacts.length;
  const newContacts = DB.contacts.filter(c => {
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    return new Date(c.createdAt) > weekAgo;
  }).length;
  
  const recentContacts = DB.contacts.slice(-5).reverse();
  
  const content = `
    <div class="grid grid-4" style="margin-bottom: var(--space-48);">
      <div class="card">
        <div style="font-size: var(--font-size-2xl); font-weight: 700; color: var(--color-primary); margin-bottom: var(--space-8);">${totalServices}</div>
        <div style="color: var(--color-text-secondary);">Total Services</div>
      </div>
      <div class="card">
        <div style="font-size: var(--font-size-2xl); font-weight: 700; color: var(--color-primary); margin-bottom: var(--space-8);">${totalTeam}</div>
        <div style="color: var(--color-text-secondary);">Team Members</div>
      </div>
      <div class="card">
        <div style="font-size: var(--font-size-2xl); font-weight: 700; color: var(--color-primary); margin-bottom: var(--space-8);">${totalBlog}</div>
        <div style="color: var(--color-text-secondary);">Blog Posts</div>
      </div>
      <div class="card">
        <div style="font-size: var(--font-size-2xl); font-weight: 700; color: var(--color-primary); margin-bottom: var(--space-8);">${totalContacts}</div>
        <div style="color: var(--color-text-secondary);">Total Inquiries</div>
      </div>
    </div>

    <div class="card">
      <h2 style="margin-bottom: var(--space-24);">Recent Inquiries</h2>
      <div class="table-container">
        <table class="data-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Subject</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            ${recentContacts.map(contact => `
              <tr>
                <td>${contact.fullName}</td>
                <td>${contact.email}</td>
                <td>${contact.subject}</td>
                <td>${formatDate(contact.createdAt)}</td>
                <td><span class="status-badge status-badge--${contact.status}">${contact.status}</span></td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
  
  renderAdminLayout('Dashboard', content);
}

// ADMIN SERVICES
function renderAdminServices() {
  const content = `
    <div style="margin-bottom: var(--space-24);">
      <button onclick="showServiceForm()" class="btn btn--primary">Add New Service</button>
    </div>

    <div class="card">
      <div class="table-container">
        <table class="data-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Slug</th>
              <th>Active</th>
              <th>Display Order</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            ${DB.services.sort((a, b) => a.displayOrder - b.displayOrder).map(service => `
              <tr>
                <td><strong>${service.name}</strong></td>
                <td>${service.slug}</td>
                <td><span class="status-badge status-badge--${service.active ? 'active' : 'inactive'}">${service.active ? 'Active' : 'Inactive'}</span></td>
                <td>${service.displayOrder}</td>
                <td>
                  <div class="table-actions">
                    <button class="btn btn--secondary btn--sm" onclick="editService('${service.id}')">Edit</button>
                    <button class="btn btn--secondary btn--sm" onclick="deleteService('${service.id}')">Delete</button>
                  </div>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
  
  renderAdminLayout('Services Management', content);
}

function showServiceForm(id = null) {
  const service = id ? DB.services.find(s => s.id === id) : null;
  const isEdit = !!service;
  
  const formContent = `
    <form onsubmit="handleServiceSubmit(event, ${isEdit ? "'" + id + "'" : 'null'})">
      <div class="form-group">
        <label class="form-label">Name *</label>
        <input type="text" name="name" class="form-input" value="${service?.name || ''}" required>
      </div>
      <div class="form-group">
        <label class="form-label">Slug *</label>
        <input type="text" name="slug" class="form-input" value="${service?.slug || ''}" required>
      </div>
      <div class="form-group">
        <label class="form-label">Icon (emoji)</label>
        <input type="text" name="icon" class="form-input" value="${service?.icon || ''}">
      </div>
      <div class="form-group">
        <label class="form-label">Short Description *</label>
        <textarea name="shortDescription" class="form-textarea" required>${service?.shortDescription || ''}</textarea>
      </div>
      <div class="form-group">
        <label class="form-label">Full Description *</label>
        <textarea name="fullDescription" class="form-textarea" required>${service?.fullDescription || ''}</textarea>
      </div>
      <div class="form-group">
        <label class="form-label">Benefits (one per line)</label>
        <textarea name="benefits" class="form-textarea">${service?.benefits?.join('\n') || ''}</textarea>
      </div>
      <div class="form-group">
        <label class="form-label">Display Order</label>
        <input type="number" name="displayOrder" class="form-input" value="${service?.displayOrder || DB.services.length + 1}">
      </div>
      <div class="form-group">
        <label style="display: flex; align-items: center; gap: var(--space-8);">
          <input type="checkbox" name="active" ${service?.active !== false ? 'checked' : ''}>
          <span>Active</span>
        </label>
      </div>
      <button type="submit" class="btn btn--primary">${isEdit ? 'Update' : 'Create'} Service</button>
    </form>
  `;
  
  showModal(`${isEdit ? 'Edit' : 'Add'} Service`, formContent);
}

function editService(id) {
  showServiceForm(id);
}

function handleServiceSubmit(event, id) {
  event.preventDefault();
  const form = event.target;
  const formData = new FormData(form);
  
  const serviceData = {
    name: formData.get('name'),
    slug: formData.get('slug'),
    icon: formData.get('icon') || '📦',
    shortDescription: formData.get('shortDescription'),
    fullDescription: formData.get('fullDescription'),
    benefits: formData.get('benefits').split('\n').filter(b => b.trim()),
    displayOrder: parseInt(formData.get('displayOrder')),
    active: formData.get('active') === 'on'
  };
  
  if (id) {
    const index = DB.services.findIndex(s => s.id === id);
    DB.services[index] = { ...DB.services[index], ...serviceData };
    showToast('Service updated successfully!');
  } else {
    DB.services.push({ id: Date.now().toString(), ...serviceData });
    showToast('Service created successfully!');
  }
  
  closeModal();
  renderAdminServices();
}

function deleteService(id) {
  if (confirm('Are you sure you want to delete this service?')) {
    DB.services = DB.services.filter(s => s.id !== id);
    showToast('Service deleted successfully!');
    renderAdminServices();
  }
}

// ADMIN TEAM (similar structure to services)
function renderAdminTeam() {
  const content = `
    <div style="margin-bottom: var(--space-24);">
      <button onclick="showTeamForm()" class="btn btn--primary">Add New Member</button>
    </div>

    <div class="card">
      <div class="table-container">
        <table class="data-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Role</th>
              <th>Active</th>
              <th>Sort Order</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            ${DB.team.sort((a, b) => a.sortOrder - b.sortOrder).map(member => `
              <tr>
                <td><strong>${member.name}</strong></td>
                <td>${member.role}</td>
                <td><span class="status-badge status-badge--${member.active ? 'active' : 'inactive'}">${member.active ? 'Active' : 'Inactive'}</span></td>
                <td>${member.sortOrder}</td>
                <td>
                  <div class="table-actions">
                    <button class="btn btn--secondary btn--sm" onclick="editTeamMember('${member.id}')">Edit</button>
                    <button class="btn btn--secondary btn--sm" onclick="deleteTeamMember('${member.id}')">Delete</button>
                  </div>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
  
  renderAdminLayout('Team Management', content);
}

function showTeamForm(id = null) {
  const member = id ? DB.team.find(t => t.id === id) : null;
  const isEdit = !!member;
  
  const formContent = `
    <form onsubmit="handleTeamSubmit(event, ${isEdit ? "'" + id + "'" : 'null'})">
      <div class="form-group">
        <label class="form-label">Name *</label>
        <input type="text" name="name" class="form-input" value="${member?.name || ''}" required>
      </div>
      <div class="form-group">
        <label class="form-label">Role *</label>
        <input type="text" name="role" class="form-input" value="${member?.role || ''}" required>
      </div>
      <div class="form-group">
        <label class="form-label">Photo URL</label>
        <input type="text" name="photoUrl" class="form-input" value="${member?.photoUrl || ''}">
      </div>
      <div class="form-group">
        <label class="form-label">Short Bio *</label>
        <textarea name="shortBio" class="form-textarea" required>${member?.shortBio || ''}</textarea>
      </div>
      <div class="form-group">
        <label class="form-label">Long Bio</label>
        <textarea name="longBio" class="form-textarea">${member?.longBio || ''}</textarea>
      </div>
      <div class="form-group">
        <label class="form-label">LinkedIn URL</label>
        <input type="text" name="linkedinUrl" class="form-input" value="${member?.linkedinUrl || ''}">
      </div>
      <div class="form-group">
        <label class="form-label">Expertise (comma-separated)</label>
        <input type="text" name="expertise" class="form-input" value="${member?.expertise?.join(', ') || ''}">
      </div>
      <div class="form-group">
        <label class="form-label">Years Experience</label>
        <input type="number" name="yearsExperience" class="form-input" value="${member?.yearsExperience || 0}">
      </div>
      <div class="form-group">
        <label class="form-label">Sort Order</label>
        <input type="number" name="sortOrder" class="form-input" value="${member?.sortOrder || DB.team.length + 1}">
      </div>
      <div class="form-group">
        <label style="display: flex; align-items: center; gap: var(--space-8);">
          <input type="checkbox" name="active" ${member?.active !== false ? 'checked' : ''}>
          <span>Active</span>
        </label>
      </div>
      <button type="submit" class="btn btn--primary">${isEdit ? 'Update' : 'Create'} Member</button>
    </form>
  `;
  
  showModal(`${isEdit ? 'Edit' : 'Add'} Team Member`, formContent);
}

function editTeamMember(id) {
  showTeamForm(id);
}

function handleTeamSubmit(event, id) {
  event.preventDefault();
  const form = event.target;
  const formData = new FormData(form);
  
  const memberData = {
    name: formData.get('name'),
    role: formData.get('role'),
    photoUrl: formData.get('photoUrl') || 'https://api.dicebear.com/7.x/avataaars/svg?seed=' + formData.get('name'),
    shortBio: formData.get('shortBio'),
    longBio: formData.get('longBio') || formData.get('shortBio'),
    linkedinUrl: formData.get('linkedinUrl') || 'https://linkedin.com',
    expertise: formData.get('expertise').split(',').map(e => e.trim()).filter(e => e),
    yearsExperience: parseInt(formData.get('yearsExperience')) || 0,
    sortOrder: parseInt(formData.get('sortOrder')),
    active: formData.get('active') === 'on'
  };
  
  if (id) {
    const index = DB.team.findIndex(t => t.id === id);
    DB.team[index] = { ...DB.team[index], ...memberData };
    showToast('Team member updated successfully!');
  } else {
    DB.team.push({ id: Date.now().toString(), ...memberData });
    showToast('Team member created successfully!');
  }
  
  closeModal();
  renderAdminTeam();
}

function deleteTeamMember(id) {
  if (confirm('Are you sure you want to delete this team member?')) {
    DB.team = DB.team.filter(t => t.id !== id);
    showToast('Team member deleted successfully!');
    renderAdminTeam();
  }
}

// ADMIN BLOG
function renderAdminBlog() {
  const content = `
    <div style="margin-bottom: var(--space-24);">
      <button onclick="showBlogForm()" class="btn btn--primary">Add New Post</button>
    </div>

    <div class="card">
      <div class="table-container">
        <table class="data-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>Category</th>
              <th>Status</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            ${DB.blog.sort((a, b) => new Date(b.publishDate) - new Date(a.publishDate)).map(post => `
              <tr>
                <td><strong>${post.title}</strong></td>
                <td>${post.author}</td>
                <td>${post.category}</td>
                <td><span class="status-badge status-badge--${post.status}">${post.status}</span></td>
                <td>${formatDate(post.publishDate)}</td>
                <td>
                  <div class="table-actions">
                    <button class="btn btn--secondary btn--sm" onclick="editBlogPost('${post.id}')">Edit</button>
                    <button class="btn btn--secondary btn--sm" onclick="deleteBlogPost('${post.id}')">Delete</button>
                  </div>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
  
  renderAdminLayout('Blog Management', content);
}

function showBlogForm(id = null) {
  const post = id ? DB.blog.find(p => p.id === id) : null;
  const isEdit = !!post;
  
  const formContent = `
    <form onsubmit="handleBlogSubmit(event, ${isEdit ? "'" + id + "'" : 'null'})">
      <div class="form-group">
        <label class="form-label">Title *</label>
        <input type="text" name="title" class="form-input" value="${post?.title || ''}" required>
      </div>
      <div class="form-group">
        <label class="form-label">Slug *</label>
        <input type="text" name="slug" class="form-input" value="${post?.slug || ''}" required>
      </div>
      <div class="form-group">
        <label class="form-label">Featured Image URL</label>
        <input type="text" name="featuredImageUrl" class="form-input" value="${post?.featuredImageUrl || ''}">
      </div>
      <div class="form-group">
        <label class="form-label">Author *</label>
        <input type="text" name="author" class="form-input" value="${post?.author || ''}" required>
      </div>
      <div class="form-group">
        <label class="form-label">Category *</label>
        <input type="text" name="category" class="form-input" value="${post?.category || ''}" required>
      </div>
      <div class="form-group">
        <label class="form-label">Tags (comma-separated)</label>
        <input type="text" name="tags" class="form-input" value="${post?.tags?.join(', ') || ''}">
      </div>
      <div class="form-group">
        <label class="form-label">Excerpt *</label>
        <textarea name="excerpt" class="form-textarea" required>${post?.excerpt || ''}</textarea>
      </div>
      <div class="form-group">
        <label class="form-label">Content *</label>
        <textarea name="content" class="form-textarea" style="min-height: 300px;" required>${post?.content || ''}</textarea>
      </div>
      <div class="form-group">
        <label class="form-label">Status</label>
        <select name="status" class="form-select">
          <option value="draft" ${post?.status === 'draft' ? 'selected' : ''}>Draft</option>
          <option value="published" ${post?.status === 'published' ? 'selected' : ''}>Published</option>
        </select>
      </div>
      <div class="form-group">
        <label class="form-label">Publish Date</label>
        <input type="date" name="publishDate" class="form-input" value="${post?.publishDate ? new Date(post.publishDate).toISOString().split('T')[0] : new Date().toISOString().split('T')[0]}">
      </div>
      <button type="submit" class="btn btn--primary">${isEdit ? 'Update' : 'Create'} Post</button>
    </form>
  `;
  
  showModal(`${isEdit ? 'Edit' : 'Add'} Blog Post`, formContent);
}

function editBlogPost(id) {
  showBlogForm(id);
}

function handleBlogSubmit(event, id) {
  event.preventDefault();
  const form = event.target;
  const formData = new FormData(form);
  
  const postData = {
    title: formData.get('title'),
    slug: formData.get('slug'),
    featuredImageUrl: formData.get('featuredImageUrl') || 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800',
    author: formData.get('author'),
    category: formData.get('category'),
    tags: formData.get('tags').split(',').map(t => t.trim()).filter(t => t),
    excerpt: formData.get('excerpt'),
    content: formData.get('content'),
    status: formData.get('status'),
    publishDate: new Date(formData.get('publishDate')).toISOString()
  };
  
  if (id) {
    const index = DB.blog.findIndex(p => p.id === id);
    DB.blog[index] = { ...DB.blog[index], ...postData };
    showToast('Blog post updated successfully!');
  } else {
    DB.blog.push({ id: Date.now().toString(), ...postData });
    showToast('Blog post created successfully!');
  }
  
  closeModal();
  renderAdminBlog();
}

function deleteBlogPost(id) {
  if (confirm('Are you sure you want to delete this blog post?')) {
    DB.blog = DB.blog.filter(p => p.id !== id);
    showToast('Blog post deleted successfully!');
    renderAdminBlog();
  }
}

// ADMIN CONTACTS
function renderAdminContacts() {
  const content = `
    <div class="card">
      <div class="table-container">
        <table class="data-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Company</th>
              <th>Subject</th>
              <th>Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            ${DB.contacts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).map(contact => `
              <tr>
                <td><strong>${contact.fullName}</strong></td>
                <td>${contact.email}</td>
                <td>${contact.company || '-'}</td>
                <td>${contact.subject}</td>
                <td>${formatDate(contact.createdAt)}</td>
                <td><span class="status-badge status-badge--${contact.status}">${contact.status}</span></td>
                <td>
                  <button class="btn btn--secondary btn--sm" onclick="viewContact('${contact.id}')">View</button>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
  
  renderAdminLayout('Contact Inquiries', content);
}

function viewContact(id) {
  const contact = DB.contacts.find(c => c.id === id);
  if (!contact) return;
  
  const content = `
    <div>
      <div style="margin-bottom: var(--space-24);">
        <h4>Contact Information</h4>
        <p><strong>Name:</strong> ${contact.fullName}</p>
        <p><strong>Email:</strong> ${contact.email}</p>
        <p><strong>Phone:</strong> ${contact.phone || 'N/A'}</p>
        <p><strong>Company:</strong> ${contact.company || 'N/A'}</p>
        <p><strong>Date:</strong> ${formatDate(contact.createdAt)}</p>
      </div>
      
      <div style="margin-bottom: var(--space-24);">
        <h4>Subject</h4>
        <p>${contact.subject}</p>
      </div>
      
      <div style="margin-bottom: var(--space-24);">
        <h4>Message</h4>
        <p style="white-space: pre-wrap;">${contact.message}</p>
      </div>
      
      <form onsubmit="handleContactUpdate(event, '${id}')">
        <div class="form-group">
          <label class="form-label">Status</label>
          <select name="status" class="form-select">
            <option value="new" ${contact.status === 'new' ? 'selected' : ''}>New</option>
            <option value="in-progress" ${contact.status === 'in-progress' ? 'selected' : ''}>In Progress</option>
            <option value="closed" ${contact.status === 'closed' ? 'selected' : ''}>Closed</option>
          </select>
        </div>
        <div class="form-group">
          <label class="form-label">Internal Notes</label>
          <textarea name="notes" class="form-textarea">${contact.notes}</textarea>
        </div>
        <button type="submit" class="btn btn--primary">Update</button>
      </form>
    </div>
  `;
  
  showModal('Contact Details', content);
}

function handleContactUpdate(event, id) {
  event.preventDefault();
  const form = event.target;
  const formData = new FormData(form);
  
  const index = DB.contacts.findIndex(c => c.id === id);
  DB.contacts[index] = {
    ...DB.contacts[index],
    status: formData.get('status'),
    notes: formData.get('notes')
  };
  
  showToast('Contact updated successfully!');
  closeModal();
  renderAdminContacts();
}

// Initialize app when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}