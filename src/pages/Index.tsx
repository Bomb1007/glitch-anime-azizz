
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

// Import for animations
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

const Index = () => {
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [isCVOpen, setIsCVOpen] = useState(false);
  const [terminalHistory, setTerminalHistory] = useState<string[]>([
    "Welcome to Aziz Rayene Delaa's portfolio terminal.",
    "Type 'help' to see available commands."
  ]);

  // Initialize theme from localStorage on component mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
      document.documentElement.classList.add('light-theme');
      document.documentElement.classList.remove('dark-theme');
    } else {
      document.documentElement.classList.add('dark-theme');
      document.documentElement.classList.remove('light-theme');
    }
  }, []);

  const handleRunCommand = (command: string) => {
    // Add command to history
    setTerminalHistory(prev => [...prev, `> ${command}`]);
    
    // Process command
    switch(command) {
      case 'help':
        setTerminalHistory(prev => [
          ...prev,
          "Available commands:",
          "  help     - Show this help message",
          "  about    - Display a brief bio",
          "  timeline - Show my professional timeline",
          "  skills   - Display my technical skills",
          "  projects - List my projects",
          "  contact  - Get my contact information",
          "  cv       - Open my CV",
          "  exit     - Close this terminal"
        ]);
        break;
        
      case 'about':
        setTerminalHistory(prev => [
          ...prev,
          "Full stack developer with 5+ years of experience in web, mobile, and desktop applications.",
          "Specializing in secure, scalable solutions with a focus on modern technologies and cybersecurity best practices.",
          "",
          "Type 'help' to see other commands."
        ]);
        break;
        
      case 'timeline':
        setTerminalHistory(prev => [
          ...prev,
          "Professional Timeline:",
          "2023 - Present: Senior Full Stack Developer @ InnoTech Solutions",
          "2021 - 2023: Mobile Developer @ AppFusion",
          "2018 - 2021: Web Developer @ CodeCraft",
          "2016 - 2018: Junior Developer @ TechStart",
          "",
          "For more details, scroll to the Timeline section."
        ]);
        scrollToSection('timeline');
        break;
        
      case 'skills':
        setTerminalHistory(prev => [
          ...prev,
          "Technical Skills:",
          "- Frontend: React, Angular, Vue.js, TypeScript, HTML/CSS",
          "- Mobile: Flutter, React Native, Swift, Kotlin",
          "- DevOps: Docker, Kubernetes, CI/CD, AWS, Security",
          "",
          "For detailed skill ratings, scroll to the Skills section."
        ]);
        scrollToSection('skills');
        break;
        
      case 'projects':
        setTerminalHistory(prev => [
          ...prev,
          "Projects Portfolio:",
          "- E-commerce Platform (Web)",
          "- Fitness Tracker App (Mobile)",
          "- Smart Home System (IoT)",
          "- Financial Dashboard (Web)",
          "- AR Navigation App (Mobile)",
          "- Environmental Monitoring (IoT)",
          "",
          "For more details, scroll to the Projects section."
        ]);
        scrollToSection('projects');
        break;
        
      case 'contact':
        setTerminalHistory(prev => [
          ...prev,
          "Contact Information:",
          "Email: aziz.rayene@example.com",
          "LinkedIn: linkedin.com/in/aziz-rayene",
          "Phone: +1 (234) 567-890",
          "",
          "Or use the contact form in the Contact section."
        ]);
        scrollToSection('contact');
        break;
        
      case 'cv':
        setTerminalHistory(prev => [
          ...prev,
          "Opening CV..."
        ]);
        setIsCVOpen(true);
        break;
        
      case 'exit':
        setTerminalHistory(prev => [
          ...prev,
          "Closing terminal..."
        ]);
        setTimeout(() => {
          setIsTerminalOpen(false);
          // Reset terminal history for next time
          setTerminalHistory([
            "Welcome to Aziz Rayene Delaa's portfolio terminal.",
            "Type 'help' to see available commands."
          ]);
        }, 500);
        break;
        
      default:
        setTerminalHistory(prev => [
          ...prev,
          `Command not found: ${command}`,
          "Type 'help' for available commands."
        ]);
    }
  };

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
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
