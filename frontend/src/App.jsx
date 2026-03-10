import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import './styles/globals.css';

import LoadingScreen from './components/LoadingScreen';
import ScrollProgress from './components/ScrollProgress';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

import Profile from './sections/Profile';
import About from './sections/About';
import Experience from './sections/Experience';
import Education from './sections/Education';
import Skills from './sections/Skills';
import Projects from './sections/Projects';
import Formations from './sections/Formations';
import Contact from './sections/Contact';

export default function App() {
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
