
import React, { useState, useEffect } from 'react';
import NeonButton from '@/components/NeonButton';
import { cn } from '@/lib/utils';
import { Moon, Sun, Languages } from 'lucide-react';

interface NavbarProps {
  onOpenTerminal: () => void;
  onOpenCV: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onOpenTerminal, onOpenCV }) => {
  const [scrolled, setScrolled] = useState(false);
  const [language, setLanguage] = useState<'EN' | 'FR'>('EN');
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'EN' ? 'FR' : 'EN');
    // In a real app, we would implement language switching logic here
  };

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
    // In a real app, we would implement theme switching logic here
  };

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className={cn(
      "fixed top-0 left-0 right-0 z-40 transition-all duration-300",
      scrolled ? "bg-hacker-dark/80 backdrop-blur-md shadow-lg py-3" : "py-5"
    )}>
      <div className="container mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center">
          <span 
            className={cn(
              "font-mono text-hacker-green text-xl cursor-pointer",
              "hover:text-hacker-cyan transition-colors"
            )}
            onClick={() => scrollToSection('hero')}
          >
            &lt;AzizRayene/&gt;
          </span>
        </div>

        <div className="hidden md:flex items-center space-x-6 font-mono text-sm">
          {['About', 'Timeline', 'Skills', 'Projects', 'Contact'].map((item) => (
            <button 
              key={item} 
              onClick={() => scrollToSection(item.toLowerCase())}
              className={cn(
                "relative px-2 py-1 text-gray-300 hover:text-hacker-green",
                "after:absolute after:bottom-0 after:left-0 after:h-0.5",
                "after:w-full after:origin-bottom-right after:scale-x-0",
                "after:bg-hacker-green after:transition-transform",
                "hover:after:origin-bottom-left hover:after:scale-x-100",
                "hover:animate-glitch-hover"
              )}
            >
              {item}
            </button>
          ))}
          
          <NeonButton 
            variant="outline" 
            size="sm"
            onClick={onOpenCV}
            className="ml-2"
          >
            View CV
          </NeonButton>

          <NeonButton 
            variant="green" 
            size="sm"
            onClick={onOpenTerminal}
            className="ml-2"
          >
            Terminal
          </NeonButton>
        </div>

        <div className="flex items-center space-x-4">
          <button 
            onClick={toggleLanguage}
            className="text-gray-300 hover:text-hacker-green transition-colors"
          >
            <Languages size={20} className="inline mr-1" />
            <span className="font-mono text-xs">{language}</span>
          </button>

          <button 
            onClick={toggleTheme}
            className="text-gray-300 hover:text-hacker-green transition-colors"
          >
            {theme === 'dark' ? (
              <Moon size={20} />
            ) : (
              <Sun size={20} />
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
