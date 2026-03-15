/**
 * portfolioV2 — Database Seeder
 *
 * Populates MongoDB with the static portfolioData so all sections
 * can be served from the API instead of the local data file.
 *
 * Usage:
 *   cd backend
 *   node seed.js            — seeds data (skips if already populated)
 *   node seed.js --force    — clears all collections first then seeds
 */

const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

// Models
const Profile = require('./models/Profile');
const Experience = require('./models/Experience');
const Education = require('./models/Education');
const Skill = require('./models/Skill');
const Project = require('./models/Project');
const Formation = require('./models/Formation');

// ─── Static seed data (mirrors portfolioData.js) ────────────────────────────

const profileSeed = {
    name: 'Abdelaaziz Khouda',
    title: 'Full-Stack JavaScript Developer',
    tagline: 'Building scalable web applications with the MERN stack',
    bio: "Passionate about crafting elegant solutions to complex problems. I turn ideas into production-ready applications with clean architecture and modern tooling.",
    avatar: null,
    email: 'abdelkhouda055@gmail.com',
    github: 'https://github.com/abdelaziz11',
    linkedin: 'https://linkedin.com/in/abdel-khouda',
    cvUrl: '#',
    aboutText: "I'm a Full-Stack JavaScript Developer with a deep passion for building modern, performant web applications. My journey began with a curiosity about how things work on the web, which evolved into expertise across the full stack — from crafting pixel-perfect UIs to designing resilient REST APIs and database architectures.",
    aboutHighlights: [
        '3+ years building production MERN applications',
        'Focused on clean code, testing, and scalability',
        'Open-source contributor and lifelong learner',
        'Available for freelance and full-time opportunities',
    ],
};

const experienceSeed = [
    {
        order: 1,
        company: 'TechNova Solutions',
        role: 'Full-Stack JavaScript Developer',
        duration: 'Jan 2023 – Present',
        description: 'Lead development of a real-time SaaS platform serving 10k+ users. Architected microservices backend with Node.js/Express and built React dashboards with complex state management.',
        technologies: ['React', 'Node.js', 'MongoDB', 'Docker', 'Redis'],
    },
    {
        order: 2,
        company: 'WebCraft Agency',
        role: 'Frontend Developer',
        duration: 'Jun 2021 – Dec 2022',
        description: 'Built responsive web applications for 15+ clients across e-commerce, fintech, and media sectors. Implemented performance optimizations reducing load times by 40%.',
        technologies: ['React', 'Redux', 'Sass', 'Jest', 'Webpack'],
    },
    {
        order: 3,
        company: 'Freelance',
        role: 'Junior Web Developer',
        duration: '2020 – Jun 2021',
        description: 'Delivered full-stack projects for small businesses, including e-commerce sites, booking systems, and custom CMS solutions.',
        technologies: ['JavaScript', 'Express.js', 'MySQL', 'HTML/CSS'],
    },
];

const educationSeed = [
    {
        order: 1,
        school: "École Nationale Supérieure d'Informatique",
        degree: "Bachelor's in Computer Science",
        years: '2017 – 2020',
        description: 'Specialized in software engineering, algorithms, databases, and network programming.',
    },
    {
        order: 2,
        school: 'YouCode Maroc',
        degree: 'Full-Stack Web Development Bootcamp',
        years: '2020 – 2021',
        description: 'Intensive 12-month program covering modern web technologies, agile practices, and real-world project delivery.',
    },
];

// Skills: flatten from category-keyed object
const skillsSeed = [
    { category: 'Frontend', order: 1, name: 'HTML5', level: 95 },
    { category: 'Frontend', order: 2, name: 'CSS3', level: 90 },
    { category: 'Frontend', order: 3, name: 'Sass', level: 85 },
    { category: 'Frontend', order: 4, name: 'JavaScript', level: 92 },
    { category: 'Frontend', order: 5, name: 'React', level: 90 },
    { category: 'Frontend', order: 6, name: 'Redux', level: 80 },
    { category: 'Backend', order: 1, name: 'Node.js', level: 88 },
    { category: 'Backend', order: 2, name: 'Express.js', level: 88 },
    { category: 'Backend', order: 3, name: 'REST APIs', level: 90 },
    { category: 'Backend', order: 4, name: 'JWT Auth', level: 85 },
    { category: 'Databases', order: 1, name: 'MongoDB', level: 85 },
    { category: 'Databases', order: 2, name: 'PostgreSQL', level: 75 },
    { category: 'Databases', order: 3, name: 'MySQL', level: 78 },
    { category: 'Databases', order: 4, name: 'SQLite', level: 70 },
    { category: 'DevOps', order: 1, name: 'Docker', level: 75 },
    { category: 'DevOps', order: 2, name: 'CI/CD', level: 70 },
    { category: 'DevOps', order: 3, name: 'Linux', level: 80 },
    { category: 'Tools', order: 1, name: 'Git', level: 92 },
    { category: 'Tools', order: 2, name: 'GitHub', level: 90 },
    { category: 'Tools', order: 3, name: 'Postman', level: 88 },
    { category: 'Tools', order: 4, name: 'Webpack', level: 75 },
    { category: 'Tools', order: 5, name: 'Jest', level: 80 },
    { category: 'Tools', order: 6, name: 'Supertest', level: 75 },
    { category: 'Deployment', order: 1, name: 'Vercel', level: 88 },
    { category: 'Deployment', order: 2, name: 'Netlify', level: 85 },
    { category: 'Deployment', order: 3, name: 'Render', level: 82 },
    { category: 'Deployment', order: 4, name: 'Railway', level: 80 },
    { category: 'Languages', order: 1, name: 'JavaScript', level: 92 },
    { category: 'Languages', order: 2, name: 'Python', level: 70 },
    { category: 'Languages', order: 3, name: 'C', level: 65 },
    { category: 'Languages', order: 4, name: 'Shell', level: 72 },
];

const projectsSeed = [
    {
        order: 1,
        title: 'DevCollab Platform',
        shortDescription: 'Real-time collaboration platform for development teams with kanban boards and live code sharing.',
        fullDescription: 'A comprehensive project management and collaboration tool built for software development teams. Features real-time updates via WebSockets, code sharing with syntax highlighting, and an intelligent task assignment system.',
        problem: 'Development teams struggle with fragmented tooling — switching between project management, code review, and communication tools creates context-switching overhead and reduces productivity.',
        features: [
            'Real-time kanban boards with drag-and-drop',
            'Live code editor with syntax highlighting',
            'WebSocket-powered team chat',
            'GitHub integration for PR tracking',
            'Role-based access control',
            'Activity feed and notifications',
        ],
        technologies: ['React', 'Node.js', 'MongoDB', 'Socket.io', 'Redux', 'JWT'],
        architecture: 'Microservices architecture with a React SPA frontend, Node.js/Express REST API, MongoDB Atlas for persistence, and Socket.io for real-time bidirectional communication. Deployed on Railway with GitHub CI/CD pipeline.',
        thumbnail: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=600&q=80',
        githubUrl: 'https://github.com/alexmercer/devcollab',
        liveUrl: 'https://devcollab.vercel.app',
        featured: true,
    },
    {
        order: 2,
        title: 'ShopFlow E-Commerce',
        shortDescription: 'Full-featured e-commerce platform with Stripe payments, inventory management, and admin dashboard.',
        fullDescription: 'A production-grade e-commerce solution with complete shopping experience from product discovery to checkout. Features a powerful admin dashboard for inventory and order management.',
        problem: 'Small businesses need a customizable e-commerce solution without the overhead and cost of platforms like Shopify, with full control over their data and functionality.',
        features: [
            'Product catalog with advanced filtering',
            'Stripe payment integration',
            'Order tracking and history',
            'Admin inventory dashboard',
            'Email notifications with Nodemailer',
            'Image upload with Cloudinary',
        ],
        technologies: ['React', 'Express.js', 'MongoDB', 'Stripe', 'Cloudinary', 'JWT'],
        architecture: 'Three-tier architecture: React frontend deployed on Vercel, Express.js REST API on Render, MongoDB Atlas as the database. Stripe webhooks handle payment events asynchronously.',
        thumbnail: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&q=80',
        githubUrl: 'https://github.com/alexmercer/shopflow',
        liveUrl: 'https://shopflow.netlify.app',
        featured: true,
    },
    {
        order: 3,
        title: 'PulseAPI Gateway',
        shortDescription: 'RESTful API gateway with authentication, rate limiting, and analytics dashboard.',
        fullDescription: 'A developer-focused API management platform that provides authentication middleware, rate limiting, request logging, and a beautiful analytics dashboard for monitoring API health.',
        problem: 'Teams building APIs need a unified gateway for authentication, monitoring, and rate limiting without setting up complex infrastructure.',
        features: [
            'JWT & API key authentication',
            'Rate limiting per client',
            'Request/response logging',
            'Real-time analytics dashboard',
            'Webhook management',
            'OpenAPI documentation generation',
        ],
        technologies: ['Node.js', 'Express.js', 'MongoDB', 'Redis', 'JWT', 'React'],
        architecture: 'Express.js middleware pipeline with Redis for rate limiting and session storage, MongoDB for persistent data, React dashboard for analytics visualization.',
        thumbnail: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&q=80',
        githubUrl: 'https://github.com/alexmercer/pulseapi',
        liveUrl: 'https://pulseapi.render.com',
        featured: false,
    },
    {
        order: 4,
        title: 'TaskMind AI',
        shortDescription: 'AI-powered task manager that auto-prioritizes and categorizes tasks using NLP.',
        fullDescription: 'An intelligent task management application that uses natural language processing to automatically categorize, prioritize, and schedule tasks based on context and deadlines.',
        problem: 'Traditional task managers require manual organization. TaskMind uses AI to analyze task descriptions and intelligently manage your workload.',
        features: [
            'NLP-based task categorization',
            'Smart deadline suggestions',
            'Priority scoring algorithm',
            'Calendar integration',
            'Habit tracking',
            'Weekly productivity reports',
        ],
        technologies: ['React', 'Python', 'Node.js', 'MongoDB', 'OpenAI API', 'Chart.js'],
        architecture: 'React frontend communicates with a Node.js orchestration layer that proxies to a Python FastAPI service for AI processing. Results stored in MongoDB.',
        thumbnail: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=600&q=80',
        githubUrl: 'https://github.com/alexmercer/taskmind',
        liveUrl: 'https://taskmind.vercel.app',
        featured: false,
    },
];

const formationsSeed = [
    { order: 1, name: 'The Complete JavaScript Course 2024', org: 'Udemy / Jonas Schmedtmann', year: '2023', skills: ['ES6+', 'OOP', 'Async JS', 'Modules'], icon: 'JS' },
    { order: 2, name: 'Node.js, Express, MongoDB & More', org: 'Udemy / Jonas Schmedtmann', year: '2022', skills: ['REST APIs', 'Authentication', 'Mongoose', 'Security'], icon: 'Node' },
    { order: 3, name: 'React — The Complete Guide', org: 'Udemy / Maximilian Schwarzmüller', year: '2022', skills: ['Hooks', 'Context API', 'Redux', 'React Router'], icon: 'React' },
    { order: 4, name: 'Docker & Kubernetes: The Practical Guide', org: 'Udemy / Maximilian Schwarzmüller', year: '2023', skills: ['Containerization', 'Orchestration', 'CI/CD', 'Networking'], icon: 'Docker' },
    { order: 5, name: 'Testing JavaScript with Jest', org: 'Frontend Masters', year: '2023', skills: ['Unit Testing', 'Integration Testing', 'TDD', 'Mocking'], icon: 'Jest' },
    { order: 6, name: 'AWS Cloud Practitioner Essentials', org: 'Amazon Web Services', year: '2024', skills: ['Cloud Concepts', 'S3', 'EC2', 'IAM'], icon: 'AWS' },
];

// ─── Seeder logic ────────────────────────────────────────────────────────────

const FORCE = process.argv.includes('--force');

async function seed() {
    const uri = process.env.MONGO_URI || 'mongodb://localhost:27017/portfoliov2';
    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('✅ Connected to MongoDB:', mongoose.connection.host);

    if (FORCE) {
        console.log('⚠️  --force flag detected. Clearing all collections...');
        await Promise.all([
            Profile.deleteMany({}),
            Experience.deleteMany({}),
            Education.deleteMany({}),
            Skill.deleteMany({}),
            Project.deleteMany({}),
            Formation.deleteMany({}),
        ]);
        console.log('🗑️  Collections cleared.');
    }

    // ── Profile ────────────────────────────────────────────────────────────────
    const profileExists = await Profile.findOne();
    if (!profileExists) {
        await Profile.create(profileSeed);
        console.log('✅ Profile seeded');
    } else {
        console.log('ℹ️  Profile already exists — skipping (use --force to reset)');
    }

    // ── Experience ─────────────────────────────────────────────────────────────
    const expCount = await Experience.countDocuments();
    if (expCount === 0) {
        await Experience.insertMany(experienceSeed);
        console.log(`✅ Experience seeded (${experienceSeed.length} items)`);
    } else {
        console.log(`ℹ️  Experience already has ${expCount} items — skipping`);
    }

    // ── Education ──────────────────────────────────────────────────────────────
    const eduCount = await Education.countDocuments();
    if (eduCount === 0) {
        await Education.insertMany(educationSeed);
        console.log(`✅ Education seeded (${educationSeed.length} items)`);
    } else {
        console.log(`ℹ️  Education already has ${eduCount} items — skipping`);
    }

    // ── Skills ─────────────────────────────────────────────────────────────────
    const skillCount = await Skill.countDocuments();
    if (skillCount === 0) {
        await Skill.insertMany(skillsSeed);
        console.log(`✅ Skills seeded (${skillsSeed.length} items)`);
    } else {
        console.log(`ℹ️  Skills already has ${skillCount} items — skipping`);
    }

    // ── Projects ───────────────────────────────────────────────────────────────
    const projCount = await Project.countDocuments();
    if (projCount === 0) {
        await Project.insertMany(projectsSeed);
        console.log(`✅ Projects seeded (${projectsSeed.length} items)`);
    } else {
        console.log(`ℹ️  Projects already has ${projCount} items — skipping`);
    }

    // ── Formations ─────────────────────────────────────────────────────────────
    const formCount = await Formation.countDocuments();
    if (formCount === 0) {
        await Formation.insertMany(formationsSeed);
        console.log(`✅ Formations seeded (${formationsSeed.length} items)`);
    } else {
        console.log(`ℹ️  Formations already has ${formCount} items — skipping`);
    }

    console.log('\n🎉 Seeding complete!');
    await mongoose.disconnect();
    process.exit(0);
}

seed().catch(err => {
    console.error('❌ Seeding failed:', err.message);
    process.exit(1);
});
