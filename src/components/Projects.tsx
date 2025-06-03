import React, { useEffect, useRef } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useTranslation } from 'react-i18next';

interface Project {
  title: string;
  description: string;
  technologies: string;
  link: string;
}

const Projects: React.FC = () => {
  const { t } = useTranslation();
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.2 });

  const projects = t('projects.items', { returnObjects: true }) as Project[];

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [controls, isInView]);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5,
        ease: "easeOut"
      } 
    }
  };

  return (
    <section id="projects" className="py-24 bg-hacker-darker relative">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-mono mb-12 text-center glitch-effect text-gray-900 dark:text-white" data-text={t('projects.title')}>
          {t('projects.title')}
        </h2>
        
        <p className="text-xl text-gray-900 dark:text-white text-center mb-12 max-w-3xl mx-auto">
          {t('projects.description')}
        </p>
        
        <motion.div 
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {projects.map((project, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-hacker-dark border border-hacker-grey rounded-lg p-6 hover:border-hacker-green transition-colors duration-300"
            >
              <h3 className="text-xl font-mono mb-3 text-gray-900 dark:text-white">{project.title}</h3>
              <p className="mb-4 text-gray-700 dark:text-white">{project.description}</p>
              <div className="text-hacker-cyan dark:text-white text-sm font-mono mb-4">
                {project.technologies}
              </div>
              <button className="text-hacker-green hover:text-hacker-cyan transition-colors">
                {project.link}
              </button>
            </motion.div>
          ))}
        </motion.div>
      </div>
      
      {/* Tech particle background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div 
            key={i}
            className="absolute bg-hacker-green/10 rotate-45 rounded-md"
            style={{
              width: `${20 + Math.random() * 40}px`,
              height: `${20 + Math.random() * 40}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${5 + Math.random() * 10}s linear infinite`,
              animationDelay: `${i * 0.5}s`,
              opacity: 0.1 + Math.random() * 0.2,
            }}
          ></div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
