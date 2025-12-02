import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Contact from './components/Contact';
import AIChat from './components/AIChat';

const App: React.FC = () => {
  const [isDark, setIsDark] = useState(false);

  // Initialize theme based on preference or system settings
  useEffect(() => {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setIsDark(true);
    }
  }, []);

  // Update HTML class for Tailwind dark mode
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const toggleTheme = () => setIsDark(!isDark);

  return (
    <div className="min-h-screen bg-sand-200 dark:bg-obsidian-950 text-slate-900 dark:text-slate-100 font-sans selection:bg-black selection:text-white dark:selection:bg-white dark:selection:text-black">
      <Header isDark={isDark} toggleTheme={toggleTheme} />
      <main>
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Contact />
      </main>
      <AIChat />
    </div>
  );
};

export default App;