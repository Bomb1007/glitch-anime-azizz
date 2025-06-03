import React, { useState, useEffect } from 'react';
import NeonButton from '@/components/NeonButton';
import { cn } from '@/lib/utils';
import { Moon, Sun, Menu, X, ChevronDown } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { Switch } from '@/components/ui/switch';
import { useTranslation } from 'react-i18next';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';

interface NavbarProps {
  onOpenTerminal: () => void;
  onOpenCV: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onOpenTerminal, onOpenCV }) => {
  const { t, i18n } = useTranslation();
  const [scrolled, setScrolled] = useState(false);
  const [theme] = useState<'dark'>('dark');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isMobile = useIsMobile();

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
    document.documentElement.classList.add('dark-theme');
    document.documentElement.classList.remove('light-theme');
  }, []);

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('language', lng);
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

  return (
    <header className={cn(
      "fixed top-0 left-0 right-0 z-40 transition-all duration-300",
      scrolled ? "bg-hacker-dark/80 backdrop-blur-md shadow-lg py-3" : "py-5"
    )}>
      <div className="container mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center">
          <span 
            className={cn(
              "font-mono text-white text-xl cursor-pointer",
              "hover:text-hacker-cyan transition-colors"
            )}
            onClick={() => scrollToSection('home')}
          >
            &lt;AzizRayene/&gt;
          </span>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6 font-mono text-sm">
          <button onClick={() => scrollToSection('about')} className={cn(
            "relative px-2 py-1 text-gray-300 hover:text-hacker-green",
            "after:absolute after:bottom-0 after:left-0 after:h-0.5",
            "after:w-full after:origin-bottom-right after:scale-x-0",
            "after:bg-hacker-green after:transition-transform",
            "hover:after:origin-bottom-left hover:after:scale-x-100",
            "hover:animate-glitch-hover"
          )}>
            {t('navigation.about')}
          </button>
          <button onClick={() => scrollToSection('timeline')} className={cn(
            "relative px-2 py-1 text-gray-300 hover:text-hacker-green",
            "after:absolute after:bottom-0 after:left-0 after:h-0.5",
            "after:w-full after:origin-bottom-right after:scale-x-0",
            "after:bg-hacker-green after:transition-transform",
            "hover:after:origin-bottom-left hover:after:scale-x-100",
            "hover:animate-glitch-hover"
          )}>
            {t('navigation.timeline')}
          </button>
          <button onClick={() => scrollToSection('skills')} className={cn(
            "relative px-2 py-1 text-gray-300 hover:text-hacker-green",
            "after:absolute after:bottom-0 after:left-0 after:h-0.5",
            "after:w-full after:origin-bottom-right after:scale-x-0",
            "after:bg-hacker-green after:transition-transform",
            "hover:after:origin-bottom-left hover:after:scale-x-100",
            "hover:animate-glitch-hover"
          )}>
            {t('navigation.skills')}
          </button>
          <button onClick={() => scrollToSection('projects')} className={cn(
            "relative px-2 py-1 text-gray-300 hover:text-hacker-green",
            "after:absolute after:bottom-0 after:left-0 after:h-0.5",
            "after:w-full after:origin-bottom-right after:scale-x-0",
            "after:bg-hacker-green after:transition-transform",
            "hover:after:origin-bottom-left hover:after:scale-x-100",
            "hover:animate-glitch-hover"
          )}>
            {t('navigation.projects')}
          </button>
          <button onClick={() => scrollToSection('contact')} className={cn(
            "relative px-2 py-1 text-gray-300 hover:text-hacker-green",
            "after:absolute after:bottom-0 after:left-0 after:h-0.5",
            "after:w-full after:origin-bottom-right after:scale-x-0",
            "after:bg-hacker-green after:transition-transform",
            "hover:after:origin-bottom-left hover:after:scale-x-100",
            "hover:animate-glitch-hover"
          )}>
            {t('navigation.contact')}
          </button>
        </div>

        {/* Theme & Language Controls */}
        <div className="hidden md:flex items-center space-x-4">
          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1 text-gray-300 hover:text-hacker-green transition-colors font-mono text-xs">
                {i18n.language.toUpperCase()}
                <ChevronDown size={14} />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-hacker-darker border border-hacker-grey">
                <DropdownMenuItem 
                  className={`${i18n.language === 'en' ? 'text-hacker-green' : 'text-gray-300'}`}
                  onClick={() => changeLanguage('en')}
                >
                  English
                </DropdownMenuItem>
                <DropdownMenuItem 
                  className={`${i18n.language === 'fr' ? 'text-hacker-cyan' : 'text-gray-300'}`}
                  onClick={() => changeLanguage('fr')}
                >
                  Français
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="flex items-center gap-2">
            <Moon size={16} className={`text-gray-300 ${theme === 'dark' ? 'text-hacker-green' : ''}`} />
            <Switch 
              checked={theme === 'dark'} 
              onCheckedChange={() => {}} 
              className="data-[state=checked]:bg-hacker-cyan data-[state=unchecked]:bg-hacker-green"
            />
            <Sun size={16} className={`text-gray-300 ${theme === 'dark' ? 'text-hacker-cyan' : ''}`} />
          </div>

          <NeonButton 
            variant="outline" 
            size="sm"
            onClick={onOpenCV}
            className="ml-2 text-white border-white hover:text-hacker-cyan hover:border-hacker-cyan"
          >
            {t('navigation.viewCv')}
          </NeonButton>

          <NeonButton 
            variant="green" 
            size="sm"
            onClick={onOpenTerminal}
            className="ml-2"
          >
            {t('navigation.terminal')}
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
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobile && (
        <div className={cn(
          "md:hidden bg-hacker-darker border-t border-hacker-grey shadow-lg",
          "transition-all duration-300 overflow-hidden",
          mobileMenuOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        )}>
          <div className="container mx-auto px-4 py-4 space-y-4">
            <div className="space-y-3">
              <button onClick={() => scrollToSection('about')} className="block w-full text-left px-3 py-2 text-gray-300 hover:text-hacker-green hover:bg-hacker-dark/50 rounded-md transition-colors">
                {t('navigation.about')}
              </button>
              <button onClick={() => scrollToSection('timeline')} className="block w-full text-left px-3 py-2 text-gray-300 hover:text-hacker-green hover:bg-hacker-dark/50 rounded-md transition-colors">
                {t('navigation.timeline')}
              </button>
              <button onClick={() => scrollToSection('skills')} className="block w-full text-left px-3 py-2 text-gray-300 hover:text-hacker-green hover:bg-hacker-dark/50 rounded-md transition-colors">
                {t('navigation.skills')}
              </button>
              <button onClick={() => scrollToSection('projects')} className="block w-full text-left px-3 py-2 text-gray-300 hover:text-hacker-green hover:bg-hacker-dark/50 rounded-md transition-colors">
                {t('navigation.projects')}
              </button>
              <button onClick={() => scrollToSection('contact')} className="block w-full text-left px-3 py-2 text-gray-300 hover:text-hacker-green hover:bg-hacker-dark/50 rounded-md transition-colors">
                {t('navigation.contact')}
              </button>
            </div>

            <div className="flex flex-col space-y-4 pt-3 border-t border-hacker-grey">
              <NeonButton 
                variant="outline" 
                size="sm"
                onClick={onOpenCV}
                className="w-full text-white border-white hover:text-hacker-cyan hover:border-hacker-cyan"
              >
                {t('navigation.viewCv')}
              </NeonButton>

              <NeonButton 
                variant="green" 
                size="sm"
                onClick={onOpenTerminal}
                className="w-full"
              >
                {t('navigation.terminal')}
              </NeonButton>
            </div>

            <div className="flex justify-between pt-3 border-t border-hacker-grey">
              <div className="flex items-center gap-2">
                <div className="flex bg-hacker-grey rounded-md">
                  <button
                    className={`px-3 py-1 rounded-md ${i18n.language === 'en' ? 'bg-hacker-dark text-hacker-green' : 'text-gray-300'}`}
                    onClick={() => changeLanguage('en')}
                  >
                    EN
                  </button>
                  <button
                    className={`px-3 py-1 rounded-md ${i18n.language === 'fr' ? 'bg-hacker-dark text-hacker-cyan' : 'text-gray-300'}`}
                    onClick={() => changeLanguage('fr')}
                  >
                    FR
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Moon size={16} className={`text-gray-300 ${theme === 'dark' ? 'text-hacker-green' : ''}`} />
                <Switch 
                  checked={theme === 'dark'} 
                  onCheckedChange={() => {}} 
                  className="data-[state=checked]:bg-hacker-cyan data-[state=unchecked]:bg-hacker-green"
                />
                <Sun size={16} className={`text-gray-300 ${theme === 'dark' ? 'text-hacker-cyan' : ''}`} />
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
