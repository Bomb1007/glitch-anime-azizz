
import React, { useState, useEffect } from 'react';
import NeonButton from './NeonButton';
import { cn } from '@/lib/utils';

interface HeroProps {
  onOpenTerminal: () => void;
}

const Hero: React.FC<HeroProps> = ({ onOpenTerminal }) => {
  const [typedText, setTypedText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const [isComplete, setIsComplete] = useState(false);
  
  const fullText = "Hi, I'm Aziz Rayene Delaa";

  useEffect(() => {
    if (typedText.length < fullText.length) {
      const timeout = setTimeout(() => {
        setTypedText(fullText.slice(0, typedText.length + 1));
      }, 100); // Adjust typing speed here
      return () => clearTimeout(timeout);
    } else {
      setIsComplete(true);
    }
  }, [typedText, fullText]);

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);
    
    return () => clearInterval(cursorInterval);
  }, []);

  return (
    <section id="hero" className="min-h-screen flex flex-col items-center justify-center pt-20 relative overflow-hidden">
      {/* Background glitch effect */}
      <div className="absolute inset-0 bg-hacker-dark z-0 before:absolute before:inset-0 before:bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1IiBoZWlnaHQ9IjUiPgo8cmVjdCB3aWR0aD0iNSIgaGVpZ2h0PSI1IiBmaWxsPSIjMTIxMjEyIj48L3JlY3Q+CjxwYXRoIGQ9Ik0wIDVMNSAwWk02IDRMNCA2Wk0tMSAxTDEgLTFaIiBzdHJva2U9IiMyMjIiIG9wYWNpdHk9IjAuMyIgc3Ryb2tlLXdpZHRoPSIxIj48L3BhdGg+Cjwvc3ZnPg==')]"></div>
      
      {/* Animated lines in background */}
      <div className="absolute inset-0 z-0 opacity-10">
        {[...Array(10)].map((_, i) => (
          <div 
            key={i} 
            className="absolute h-px bg-hacker-green w-full animate-pulse" 
            style={{ 
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.2}s`,
              animationDuration: `${3 + Math.random() * 3}s`
            }} 
          />
        ))}
      </div>
      
      <div className="container mx-auto px-4 z-10">
        <div className="text-center">
          {/* Typing text effect */}
          <h1 className="font-mono text-5xl md:text-7xl mb-6 relative inline-block">
            <span data-text={typedText} className="glitch-effect relative inline-block">
              {typedText}
            </span>
            <span className={cn(
              "h-12 w-2 bg-hacker-green inline-block ml-1 relative -top-1",
              showCursor ? "opacity-100" : "opacity-0",
              "transition-opacity duration-100"
            )}></span>
          </h1>
          
          <p className={cn(
            "text-xl md:text-2xl mb-12 text-gray-400 max-w-3xl mx-auto",
            isComplete ? "opacity-100" : "opacity-0",
            "transition-opacity duration-500"
          )}>
            Web, Mobile and Desktop Developer<br />based in Montreal
          </p>
          
          <div className={cn(
            "flex flex-col sm:flex-row gap-4 justify-center items-center",
            isComplete ? "opacity-100" : "opacity-0",
            "transition-opacity duration-1000 delay-500"
          )}>
            <NeonButton 
              variant="green"
              size="lg"
              onClick={onOpenTerminal}
            >
              Open Terminal
            </NeonButton>
            <NeonButton 
              variant="outline"
              size="lg"
              onClick={() => {
                document.getElementById('about')?.scrollIntoView({
                  behavior: 'smooth'
                });
              }}
            >
              Discover More
            </NeonButton>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className={cn(
        "absolute bottom-10 left-1/2 transform -translate-x-1/2",
        "flex flex-col items-center",
        isComplete ? "opacity-100" : "opacity-0",
        "transition-opacity duration-1000 delay-1000"
      )}>
        <span className="text-gray-400 text-sm mb-2 font-mono">Scroll Down</span>
        <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
          <div className="w-1 h-2 bg-hacker-green rounded-full mt-2 animate-bounce"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
