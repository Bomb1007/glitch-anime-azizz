
import React, { useState, useEffect } from 'react';
import NeonButton from '@/components/NeonButton';
import { cn } from '@/lib/utils';
import { Moon, Sun, Menu, X, ChevronDown } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { Switch } from '@/components/ui/switch';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';

// Object for translations
const translations = {
  en: {
    about: "About",
    timeline: "Timeline",
    skills: "Skills",
    projects: "Projects",
    contact: "Contact",
    viewCv: "View CV",
    terminal: "Terminal"
  },
  fr: {
    about: "À propos",
    timeline: "Parcours",
    skills: "Compétences",
    projects: "Projets",
    contact: "Contact",
    viewCv: "Voir CV",
    terminal: "Terminal"
  }
};

interface NavbarProps {
  onOpenTerminal: () => void;
  onOpenCV: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onOpenTerminal, onOpenCV }) => {
  const [scrolled, setScrolled] = useState(false);
  const [language, setLanguage] = useState<'en' | 'fr'>('en');
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isMobile = useIsMobile();
  const t = translations[language];

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

  useEffect(() => {
    // Apply theme to the document
    document.documentElement.classList.toggle('light-theme', theme === 'light');
    document.documentElement.classList.toggle('dark-theme', theme === 'dark');
  }, [theme]);

  useEffect(() => {
    // Apply language to the document
    document.documentElement.lang = language;
    // Store the language preference in localStorage
    localStorage.setItem('language', language);
    console.log(`Language changed to ${language}`);
  }, [language]);

  // Initialize language from localStorage on component mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as 'en' | 'fr';
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    console.log('Theme toggled to', newTheme);
  };

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
      if (isMobile) {
        setMobileMenuOpen(false);
      }
    }
  };

  const navigationLinks = [
    { id: 'about', label: t.about },
    { id: 'timeline', label: t.timeline },
    { id: 'skills', label: t.skills },
    { id: 'projects', label: t.projects },
    { id: 'contact', label: t.contact },
  ];

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

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6 font-mono text-sm">
          {navigationLinks.map((item) => (
            <button 
              key={item.id} 
              onClick={() => scrollToSection(item.id)}
              className={cn(
                "relative px-2 py-1 text-gray-300 hover:text-hacker-green",
                "after:absolute after:bottom-0 after:left-0 after:h-0.5",
                "after:w-full after:origin-bottom-right after:scale-x-0",
                "after:bg-hacker-green after:transition-transform",
                "hover:after:origin-bottom-left hover:after:scale-x-100",
                "hover:animate-glitch-hover"
              )}
            >
              {item.label}
            </button>
          ))}
          
          <NeonButton 
            variant="outline" 
            size="sm"
            onClick={onOpenCV}
            className="ml-2"
          >
            {t.viewCv}
          </NeonButton>

          <NeonButton 
            variant="green" 
            size="sm"
            onClick={onOpenTerminal}
            className="ml-2"
          >
            {t.terminal}
          </NeonButton>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-gray-300 hover:text-hacker-green transition-colors"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Theme & Language Controls */}
        <div className="hidden md:flex items-center space-x-4">
          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1 text-gray-300 hover:text-hacker-green transition-colors font-mono text-xs">
                {language === 'en' ? 'EN' : 'FR'}
                <ChevronDown size={14} />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem 
                  className={`${language === 'en' ? 'text-hacker-green' : ''}`} 
                  onClick={() => setLanguage('en')}
                >
                  English
                </DropdownMenuItem>
                <DropdownMenuItem 
                  className={`${language === 'fr' ? 'text-hacker-cyan' : ''}`} 
                  onClick={() => setLanguage('fr')}
                >
                  Français
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="flex items-center gap-2">
            <Moon size={16} className={`text-gray-300 ${theme === 'dark' ? 'text-hacker-green' : ''}`} />
            <Switch 
              checked={theme === 'light'} 
              onCheckedChange={toggleTheme} 
              className="data-[state=checked]:bg-hacker-cyan data-[state=unchecked]:bg-hacker-green"
            />
            <Sun size={16} className={`text-gray-300 ${theme === 'light' ? 'text-hacker-cyan' : ''}`} />
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobile && (
        <div className={`
          md:hidden bg-hacker-darker border-t border-hacker-grey shadow-lg 
          transition-all duration-300 overflow-hidden
          ${mobileMenuOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}
        `}>
          <div className="container mx-auto px-4 py-4 space-y-4">
            <div className="space-y-3">
              {navigationLinks.map((item) => (
                <button 
                  key={item.id} 
                  onClick={() => scrollToSection(item.id)}
                  className="block w-full text-left px-3 py-2 text-gray-300 hover:text-hacker-green hover:bg-hacker-dark/50 rounded-md transition-colors"
                >
                  {item.label}
                </button>
              ))}
            </div>

            <div className="flex flex-col space-y-4 pt-3 border-t border-hacker-grey">
              <NeonButton 
                variant="outline" 
                size="sm"
                onClick={onOpenCV}
                className="w-full"
              >
                {t.viewCv}
              </NeonButton>

              <NeonButton 
                variant="green" 
                size="sm"
                onClick={onOpenTerminal}
                className="w-full"
              >
                {t.terminal}
              </NeonButton>
            </div>

            <div className="flex justify-between pt-3 border-t border-hacker-grey">
              <div className="flex items-center gap-2">
                <div className="flex bg-hacker-grey rounded-md">
                  <button
                    className={`px-3 py-1 rounded-md ${language === 'en' ? 'bg-hacker-dark text-hacker-green' : 'text-gray-300'}`}
                    onClick={() => setLanguage('en')}
                  >
                    EN
                  </button>
                  <button
                    className={`px-3 py-1 rounded-md ${language === 'fr' ? 'bg-hacker-dark text-hacker-cyan' : 'text-gray-300'}`}
                    onClick={() => setLanguage('fr')}
                  >
                    FR
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Moon size={16} className={`text-gray-300 ${theme === 'dark' ? 'text-hacker-green' : ''}`} />
                <Switch 
                  checked={theme === 'light'} 
                  onCheckedChange={toggleTheme} 
                  className="data-[state=checked]:bg-hacker-cyan data-[state=unchecked]:bg-hacker-green"
                />
                <Sun size={16} className={`text-gray-300 ${theme === 'light' ? 'text-hacker-cyan' : ''}`} />
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
