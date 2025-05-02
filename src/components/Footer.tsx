
import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

// Object for translations
const translations = {
  en: {
    jobTitle: "Web, Mobile and Desktop Developer",
    madeWith: "Made with",
    andCoffee: "and a lot of coffee"
  },
  fr: {
    jobTitle: "Développeur Web, Mobile et Desktop",
    madeWith: "Fait avec",
    andCoffee: "et beaucoup de café"
  }
};

const Footer: React.FC = () => {
  const [language, setLanguage] = useState<'en' | 'fr'>('en');
  const t = translations[language];

  // Initialize language from localStorage on component mount
  useEffect(() => {
    const handleLanguageChange = () => {
      const savedLanguage = localStorage.getItem('language') as 'en' | 'fr';
      if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'fr')) {
        setLanguage(savedLanguage);
      } else {
        setLanguage('en');
      }
    };

    // Initial setup
    handleLanguageChange();

    // Listen for storage events (when language is changed in another component)
    window.addEventListener('storage', handleLanguageChange);
    
    return () => {
      window.removeEventListener('storage', handleLanguageChange);
    };
  }, []);
  
  return (
    <footer className="py-8 bg-hacker-dark border-t border-hacker-grey transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <span className="font-mono text-hacker-green text-lg">
              &lt;AzizRayene/&gt;
            </span>
            <p className="text-gray-400 text-sm mt-1">
              {t.jobTitle}
            </p>
          </div>
          
          <div className="text-center mb-4 md:mb-0">
            <div className="text-gray-400 text-sm">
              <span className="mr-2">{t.madeWith}</span>
              <span className="text-hacker-green">{"<"}</span>
              <span className="text-hacker-cyan">/</span>
              <span className="text-hacker-green">{">"}</span>
              <span className="ml-2">{t.andCoffee}</span>
            </div>
          </div>
          
          <div className="text-gray-400 text-sm">
            © {new Date().getFullYear()} Aziz Rayene Delaa
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
