import React, { useState } from 'react';
import { Menu, X, Moon, Sun, Download } from 'lucide-react';
import { SectionId } from '../types';

interface HeaderProps {
  isDark: boolean;
  toggleTheme: () => void;
}

const Header: React.FC<HeaderProps> = ({ isDark, toggleTheme }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Home', href: `#${SectionId.HOME}` },
    { label: 'About', href: `#${SectionId.ABOUT}` },
    { label: 'Experience', href: `#${SectionId.EXPERIENCE}` },
    { label: 'Projects', href: `#${SectionId.PROJECTS}` },
    { label: 'Skills', href: `#${SectionId.SKILLS}` },
    { label: 'Contact', href: `#${SectionId.CONTACT}` },
  ];

  const handleNavClick = (id: string) => {
    setIsMenuOpen(false);
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 glass-panel transition-all duration-300">
      <div className="container mx-auto px-6 h-20 flex items-center justify-between">
        
        {/* Logo */}
        <div 
            onClick={() => handleNavClick(`#${SectionId.HOME}`)}
            className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white cursor-pointer tracking-tight whitespace-nowrap"
        >
          Nandana Anand<span className="text-primary-600">.</span>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => handleNavClick(link.href)}
              className="text-sm font-medium text-slate-800 hover:text-black dark:text-slate-300 dark:hover:text-white transition-colors hover-underline-animation uppercase tracking-wide"
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Actions */}
        <div className="hidden lg:flex items-center gap-4">
          <button
            onClick={toggleTheme}
            aria-label="Toggle Theme"
            className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 text-slate-800 dark:text-slate-200 transition-colors"
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          
          {/* --- THIS IS THE FIX --- */}
          {/* We now link directly to the /resume.pdf file instead of generating a fake text file */}
          <a 
            href="/resume.pdf" 
            download="Nandana_Anand_Resume.pdf"
            className="flex items-center gap-2 px-5 py-2.5 bg-black text-white dark:bg-white dark:text-black rounded-none border border-transparent hover:bg-transparent hover:text-black hover:border-black dark:hover:bg-transparent dark:hover:text-white dark:hover:border-white transition-all duration-300 text-sm font-medium uppercase tracking-wider"
          >
            <Download size={16} />
            <span>Resume</span>
          </a>
        </div>

        {/* Mobile Toggle */}
        <div className="lg:hidden flex items-center gap-4">
            <button
                onClick={toggleTheme}
                className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 text-slate-800 dark:text-slate-200 transition-colors"
            >
                {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button
              className="p-2 text-slate-800 dark:text-slate-200"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle Menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden absolute top-20 left-0 right-0 bg-sand-200 dark:bg-obsidian-950 border-b border-black/10 dark:border-white/10 p-6 flex flex-col gap-4 shadow-xl animate-in slide-in-from-top-5 h-[calc(100vh-5rem)] overflow-y-auto">
            {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => handleNavClick(link.href)}
              className="text-left text-lg font-medium text-slate-800 dark:text-slate-200 py-3 border-b border-black/5 dark:border-white/5 hover:pl-2 transition-all"
            >
              {link.label}
            </button>
          ))}
          <a 
            href="/resume.pdf"
            download="resume.pdf"
            className="mt-4 flex w-full items-center justify-center gap-2 px-5 py-3 bg-black text-white dark:bg-white dark:text-black rounded-none font-bold uppercase tracking-widest"
          >
            <Download size={18} />
            <span>Download Resume</span>
          </a>
        </div>
      )}
    </header>
  );
};

export default Header;