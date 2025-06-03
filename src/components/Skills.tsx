import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';
import { cn } from '@/lib/utils';

interface Skill {
  name: string;
  level: number; // 0-100
  category: 'frontend' | 'mobile' | 'devops';
}

const Skills: React.FC = () => {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.2 });
  const [animate, setAnimate] = useState(false);

  const skills: Skill[] = [
    // Frontend
    { name: 'React', level: 95, category: 'frontend' },
    { name: 'Angular', level: 85, category: 'frontend' },
    { name: 'Vue.js', level: 80, category: 'frontend' },
    { name: 'TypeScript', level: 90, category: 'frontend' },
    { name: 'HTML/CSS', level: 95, category: 'frontend' },
    
    // Mobile
    { name: 'Flutter', level: 85, category: 'mobile' },
    { name: 'React Native', level: 90, category: 'mobile' },
    { name: 'Swift', level: 75, category: 'mobile' },
    { name: 'Kotlin', level: 70, category: 'mobile' },
    
    // DevOps
    { name: 'Docker', level: 85, category: 'devops' },
    { name: 'Kubernetes', level: 75, category: 'devops' },
    { name: 'CI/CD', level: 90, category: 'devops' },
    { name: 'AWS', level: 80, category: 'devops' },
    { name: 'Security', level: 85, category: 'devops' },
  ];

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
      setAnimate(true);
    }
  }, [controls, isInView]);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1
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
    <section id="skills" className="py-24 bg-hacker-darker relative">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-mono mb-12 text-center glitch-effect text-gray-900 dark:text-white" data-text="Skills">
          Skills
        </h2>
        
        <div ref={ref} className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Frontend Skills */}
            <div className="bg-hacker-dark border border-hacker-grey rounded-lg p-6">
              <h3 className="text-2xl font-mono mb-6 text-gray-900 dark:text-white text-center">Frontend</h3>
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate={controls}
                className="space-y-6"
              >
                {skills
                  .filter(skill => skill.category === 'frontend')
                  .map((skill, index) => (
                    <motion.div key={index} variants={itemVariants}>
                      <div className="flex justify-between mb-2">
                        <span className="font-mono text-gray-900 dark:text-white">{skill.name}</span>
                        <span className="text-hacker-green dark:text-white">{skill.level}%</span>
                      </div>
                      <div className="progress-bar">
                        <div 
                          className="progress-bar-fill"
                          style={{ 
                            transform: animate ? `scaleX(${skill.level / 100})` : 'scaleX(0)'
                          }}
                        />
                      </div>
                    </motion.div>
                  ))
                }
              </motion.div>
            </div>

            {/* Mobile Skills */}
            <div className="bg-hacker-dark border border-hacker-grey rounded-lg p-6">
              <h3 className="text-2xl font-mono mb-6 text-gray-900 dark:text-white text-center">Mobile</h3>
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate={controls}
                className="space-y-6"
              >
                {skills
                  .filter(skill => skill.category === 'mobile')
                  .map((skill, index) => (
                    <motion.div key={index} variants={itemVariants}>
                      <div className="flex justify-between mb-2">
                        <span className="font-mono text-gray-900 dark:text-white">{skill.name}</span>
                        <span className="text-hacker-green dark:text-white">{skill.level}%</span>
                      </div>
                      <div className="progress-bar">
                        <div 
                          className="progress-bar-fill"
                          style={{ 
                            transform: animate ? `scaleX(${skill.level / 100})` : 'scaleX(0)'
                          }}
                        />
                      </div>
                    </motion.div>
                  ))
                }
              </motion.div>
            </div>

            {/* DevOps Skills */}
            <div className="bg-hacker-dark border border-hacker-grey rounded-lg p-6">
              <h3 className="text-2xl font-mono mb-6 text-gray-900 dark:text-white text-center">DevOps</h3>
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate={controls}
                className="space-y-6"
              >
                {skills
                  .filter(skill => skill.category === 'devops')
                  .map((skill, index) => (
                    <motion.div key={index} variants={itemVariants}>
                      <div className="flex justify-between mb-2">
                        <span className="font-mono text-gray-900 dark:text-white">{skill.name}</span>
                        <span className="text-hacker-green dark:text-white">{skill.level}%</span>
                      </div>
                      <div className="progress-bar">
                        <div 
                          className="progress-bar-fill"
                          style={{ 
                            transform: animate ? `scaleX(${skill.level / 100})` : 'scaleX(0)'
                          }}
                        />
                      </div>
                    </motion.div>
                  ))
                }
              </motion.div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Animated dots background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(50)].map((_, i) => (
          <div 
            key={i}
            className="absolute w-1 h-1 bg-hacker-green rounded-full opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              boxShadow: '0 0 5px #00FF41',
              animation: `pulse ${2 + Math.random() * 4}s infinite ease-in-out ${Math.random() * 2}s`
            }}
          ></div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
