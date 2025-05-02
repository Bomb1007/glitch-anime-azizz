
import React from 'react';
import { cn } from '@/lib/utils';

const Footer: React.FC = () => {
  // Detect current language from document (set by Navbar)
  const isEnglish = document.documentElement.lang !== 'fr';
  
  return (
    <footer className="py-8 bg-hacker-dark border-t border-hacker-grey transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <span className="font-mono text-hacker-green text-lg">
              &lt;AzizRayene/&gt;
            </span>
            <p className="text-gray-400 text-sm mt-1">
              {isEnglish 
                ? "Web, Mobile and Desktop Developer" 
                : "Développeur Web, Mobile et Desktop"}
            </p>
          </div>
          
          <div className="text-center mb-4 md:mb-0">
            <div className="text-gray-400 text-sm">
              <span className="mr-2">{isEnglish ? "Made with" : "Fait avec"}</span>
              <span className="text-hacker-green">{"<"}</span>
              <span className="text-hacker-cyan">/</span>
              <span className="text-hacker-green">{">"}</span>
              <span className="ml-2">{isEnglish ? "and a lot of coffee" : "et beaucoup de café"}</span>
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
