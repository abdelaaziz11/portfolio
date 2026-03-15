import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import './src/styles/globals.css';

import LoadingScreen from './src/components/LoadingScreen';
import ScrollProgress from './src/components/ScrollProgress';
import Navbar from './src/components/Navbar';
import Footer from './src/components/Footer';
import AdminPage from './src/pages/AdminPage';

import Profile from './src/sections/Profile';
import About from './src/sections/About';
import Experience from './src/sections/Experience';
import Education from './src/sections/Education';
import Skills from './src/sections/Skills';
import Projects from './src/sections/Projects';
import Formations from './src/sections/Formations';
import Contact from './src/sections/Contact';

function PortfolioHome() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      <AnimatePresence mode="wait">
        {loading && (
          <LoadingScreen key="loading" onComplete={() => setLoading(false)} />
        )}
      </AnimatePresence>

      {!loading && (
        <>
          <div className="ambient-bg" />
          <ScrollProgress />
          <Navbar />
          <main>
            <Profile />
            <About />
            <Experience />
            <Education />
            <Skills />
            <Projects />
            <Formations />
            <Contact />
          </main>
          <Footer />
        </>
      )}
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PortfolioHome />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </BrowserRouter>
  );
}
