import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import './styles/globals.css';

import LoadingScreen from './components/LoadingScreen';
import ScrollProgress from './components/ScrollProgress';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AdminPage from './pages/AdminPage';

import Profile    from './sections/Profile';
import About      from './sections/About';
import Experience from './sections/Experience';
import Education  from './sections/Education';
import Skills     from './sections/Skills';
import Projects   from './sections/Projects';
import Formations from './sections/Formations';
import Contact    from './sections/Contact';

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
        <Route path="/"      element={<PortfolioHome />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </BrowserRouter>
  );
}
