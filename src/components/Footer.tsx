
import React from 'react';
import { cn } from '@/lib/utils';

const Footer: React.FC = () => {
  return (
    <footer className="py-8 bg-hacker-dark border-t border-hacker-grey">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <span className="font-mono text-hacker-green text-lg">
              &lt;AzizRayene/&gt;
            </span>
            <p className="text-gray-400 text-sm mt-1">
              Web, Mobile and Desktop Developer
            </p>
          </div>
          
          <div className="text-center mb-4 md:mb-0">
            <div className="text-gray-400 text-sm">
              <span className="mr-2">Made with</span>
              <span className="text-hacker-green">{"<"}</span>
              <span className="text-hacker-cyan">/</span>
              <span className="text-hacker-green">{">"}</span>
              <span className="ml-2">and a lot of coffee</span>
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
