import React, { useState } from 'react';
import NeonButton from './NeonButton';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useTranslation } from 'react-i18next';

const About: React.FC = () => {
  const { t } = useTranslation();
  const [showDetails, setShowDetails] = useState(false);
  
  const skills = {
    "CI/CD": ["Jenkins", "GitHub Actions", "GitLab CI/CD", "CircleCI"],
    "Infrastructure as Code": ["Terraform", "AWS CloudFormation", "Ansible", "Puppet"],
    "Docker": ["Docker Compose", "Docker Swarm", "Kubernetes"],
    "Cloud": ["AWS", "Google Cloud", "Azure", "Digital Ocean"],
    "Security": ["OWASP", "Penetration Testing", "Encryption", "Authentication & Authorization"],
    "Languages": ["JavaScript", "TypeScript", "Python", "Java", "Swift", "Kotlin"],
    "Frameworks": ["React", "Vue.js", "Angular", "Node.js", "Express", "Django", "Flutter"]
  };

  return (
    <section id="about" className="py-24 bg-hacker-darker relative">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-mono mb-12 text-center glitch-effect text-gray-900 dark:text-hacker-green" data-text={t('about.title')}>
          {t('about.title')}
        </h2>
        
        <div className="max-w-3xl mx-auto">
          <p className="text-xl mb-6 leading-relaxed font-sans text-gray-900 dark:text-white">
            {t('about.description')}
          </p>
          
          {/*
          <div className="flex justify-center mb-12">
            <NeonButton 
              variant={showDetails ? "outline" : "green"}
              onClick={() => setShowDetails(!showDetails)}
            >
              {showDetails ? t('common.hideDetails') : t('common.showDetails')}
            </NeonButton>
          </div>
          */}
          
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-hacker-dark border border-hacker-grey rounded-md p-6"
          >
            <h3 className="text-2xl font-mono mb-6 text-gray-900 dark:text-hacker-green">{t('about.skills.title')}</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {Object.entries(skills).map(([category, items]) => (
                <div key={category} className="mb-6">
                  <h4 className="font-mono text-lg mb-3 text-gray-900 dark:text-hacker-green">{category}</h4>
                  <ul className="space-y-2">
                    {items.map(item => (
                      <li key={item} className="flex items-center">
                        <span className="w-1 h-1 bg-hacker-green mr-2"></span>
                        <span className="text-gray-900 dark:text-white">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
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

export default About;
