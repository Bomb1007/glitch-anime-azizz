import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Terminal from '@/components/Terminal';
import About from '@/components/About';
import Timeline from '@/components/Timeline';
import Skills from '@/components/Skills';
import Projects from '@/components/Projects';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import CV from '@/components/CV';
import CustomCursor from '@/components/CustomCursor';
import DynamicBackground from '@/components/DynamicBackground';
import { useTranslation } from 'react-i18next';

// Import for animations
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

const Index = () => {
  const { t } = useTranslation();
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [isCVOpen, setIsCVOpen] = useState(false);
  const [terminalHistory, setTerminalHistory] = useState<string[]>([
    t('terminal.welcome'),
    t('terminal.help')
  ]);

  // Initialize theme from localStorage on component mount
  useEffect(() => {
    document.documentElement.classList.add('dark-theme');
    document.documentElement.classList.remove('light-theme');
  }, []);

  const handleRunCommand = (command: string) => {
    // Add command to history
    setTerminalHistory(prev => [...prev, `> ${command}`]);
    
    // Process command
    switch(command) {
      case 'help':
        setTerminalHistory(prev => [
          ...prev,
          '__SHOW_HELP__'
        ]);
        break;
        
      case 'about':
        setTerminalHistory(prev => [
          ...prev,
          t('terminal.about.description'),
          t('terminal.about.specialization'),
          "",
          t('terminal.help')
        ]);
        break;
        
      case 'timeline':
        setTerminalHistory(prev => [
          ...prev,
          t('terminal.timeline.title'),
          t('terminal.timeline.present'),
          t('terminal.timeline.previous1'),
          t('terminal.timeline.previous2'),
          t('terminal.timeline.previous3'),
          "",
          t('terminal.help')
        ]);
        scrollToSection('timeline');
        break;
        
      case 'skills':
        setTerminalHistory(prev => [
          ...prev,
          t('terminal.skills.title'),
          t('terminal.skills.frontend'),
          t('terminal.skills.mobile'),
          t('terminal.skills.devops'),
          "",
          t('terminal.help')
        ]);
        scrollToSection('skills');
        break;
        
      case 'projects':
        setTerminalHistory(prev => [...prev, "Projects section will be displayed here."]);
        scrollToSection('projects');
        break;
        
      case 'contact':
        setTerminalHistory(prev => [...prev, "Contact section will be displayed here."]);
        scrollToSection('contact');
        break;
        
      case 'cv':
        setIsCVOpen(true);
        break;
        
      case 'exit':
        setIsTerminalOpen(false);
        break;
        
      default:
        setTerminalHistory(prev => [...prev, `Command not found: ${command}`]);
    }
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    // Add keyboard shortcut for terminal: Ctrl+T or Cmd+T
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 't') {
        e.preventDefault();
        setIsTerminalOpen(prev => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Framer Motion page variants
  const pageVariants = {
    initial: {
      opacity: 0
    },
    animate: {
      opacity: 1,
      transition: {
        staggerChildren: 0.5
      }
    }
  };

  return (
    <motion.div 
      initial="initial"
      animate="animate"
      variants={pageVariants}
      className={cn(
        "bg-hacker-dark min-h-screen",
        "selection:bg-hacker-green selection:text-hacker-dark"
      )}
    >
      <DynamicBackground />
      <CustomCursor />
      
      <Navbar 
        onOpenTerminal={() => setIsTerminalOpen(true)}
        onOpenCV={() => setIsCVOpen(true)}
      />
      
      <Hero onOpenTerminal={() => setIsTerminalOpen(true)} />
      
      <About />
      <Timeline />
      <Skills />
      <Projects />
      <Contact />
      
      <Footer />
      
      <AnimatePresence>
        {isTerminalOpen && (
          <Terminal 
            isOpen={isTerminalOpen}
            onClose={() => setIsTerminalOpen(false)}
            onRunCommand={handleRunCommand}
            history={terminalHistory}
          />
        )}
        
        {isCVOpen && (
          <CV 
            isOpen={isCVOpen}
            onClose={() => setIsCVOpen(false)}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Index;
