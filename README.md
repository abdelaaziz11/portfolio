# 🚀 Alex Mercer — MERN Stack Portfolio

A professional, modern full-stack developer portfolio built with the MERN stack (MongoDB, Express, React, Node.js).

---

## ✨ Features

- **Full-Stack MERN** architecture
- **Dark mode** with modern tech aesthetics (Syne + DM Mono fonts)
- **Framer Motion** animations throughout
- **Responsive** — mobile, tablet, desktop
- **Smooth scroll** + active section highlighting
- **Skills** with animated progress bars + category filtering
- **Projects** with modal detail view + technology filtering
- **Contact form** connected to MongoDB backend
- **Scroll progress** indicator
- **Loading animation**

---

## 📁 Project Structure

```
portfolio/
├── frontend/           # React.js SPA
│   ├── src/
│   │   ├── components/ # Navbar, Footer, ProjectModal, LoadingScreen, ScrollProgress
│   │   ├── sections/   # Profile, About, Experience, Education, Skills, Projects, Formations, Contact
│   │   ├── hooks/      # useInView (scroll animation)
│   │   ├── data/       # portfolioData.js (all content)
│   │   └── styles/     # globals.css (design system)
│   └── public/
└── backend/            # Node.js + Express API
    ├── controllers/    # contactController, projectController
    ├── models/         # Contact, Project (Mongoose schemas)
    ├── routes/         # /api/contact, /api/projects
    └── config/         # db.js (MongoDB connection)
```

---

## 🛠️ Setup & Installation

### Prerequisites
- Node.js 18+
- MongoDB Atlas account (or local MongoDB)

### 1. Clone and Install

```bash
# Install backend dependencies
cd portfolio/backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### 2. Configure Environment Variables

**Backend** (`backend/.env`):
```env
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster.xxxxx.mongodb.net/portfolio
FRONTEND_URL=http://localhost:3000
NODE_ENV=development
```

**Frontend** (`frontend/.env`):
```env
REACT_APP_API_URL=http://localhost:5000
```

### 3. Run Development Servers

```bash
# Terminal 1 — Backend
cd backend
npm run dev

# Terminal 2 — Frontend
cd frontend
npm start
```

App runs at: **http://localhost:3000**  
API runs at: **http://localhost:5000**

---

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/contact` | Submit contact form → saves to MongoDB |
| GET | `/api/contact` | Get all contact messages |
| GET | `/api/projects` | Get all projects (supports `?tech=React` filter) |
| GET | `/api/projects/:id` | Get single project details |
| POST | `/api/projects` | Create a project |
| GET | `/api/health` | Health check |

---

## 🎨 Customization

All portfolio content is centralized in:

```
frontend/src/data/portfolioData.js
```

Edit this file to update:
- Personal info (name, title, bio, email, social links)
- Work experience
- Education
- Skills (with proficiency levels)
- Projects (with modal details)
- Formations/certifications

---

## 🚀 Deployment

### Frontend → Vercel

```bash
cd frontend
npm run build

# Deploy with Vercel CLI
vercel --prod

# Set environment variable in Vercel dashboard:
# REACT_APP_API_URL = https://your-backend.onrender.com
```

### Backend → Render

1. Push backend to a GitHub repository
2. Create new **Web Service** on [render.com](https://render.com)
3. Connect your repo
4. Set environment variables:
   - `MONGO_URI` — your MongoDB Atlas connection string
   - `FRONTEND_URL` — your Vercel frontend URL
   - `NODE_ENV` — `production`

---

## 🎯 Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18, Framer Motion, React Router |
| Backend | Node.js, Express.js |
| Database | MongoDB + Mongoose |
| Validation | express-validator |
| Styling | Custom CSS (no framework dependencies) |
| Fonts | Syne (display) + DM Mono + DM Sans |
| Deployment | Vercel (FE) + Render (BE) |

---

## 📝 License

MIT — Free to use and customize.
