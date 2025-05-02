
import React, { useEffect, useRef } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';
import { cn } from '@/lib/utils';

interface TimelineItem {
  year: string;
  title: string;
  company: string;
  description: string;
  icon: string;
}

const Timeline: React.FC = () => {
  const timelineData: TimelineItem[] = [
    {
      year: '2023 - Present',
      title: 'Senior Full Stack Developer',
      company: 'InnoTech Solutions',
      description: 'Leading development of secure fintech applications with React, Node.js, and AWS infrastructure.',
      icon: '💼'
    },
    {
      year: '2021 - 2023',
      title: 'Mobile Developer',
      company: 'AppFusion',
      description: 'Developed cross-platform mobile applications using Flutter and integrated with RESTful APIs.',
      icon: '📱'
    },
    {
      year: '2018 - 2021',
      title: 'Web Developer',
      company: 'CodeCraft',
      description: 'Built responsive web applications using React, Angular, and implemented CI/CD pipelines.',
      icon: '🖥️'
    },
    {
      year: '2016 - 2018',
      title: 'Junior Developer',
      company: 'TechStart',
      description: 'Developed and maintained web applications using JavaScript, HTML, and CSS.',
      icon: '🚀'
    }
  ];

  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.2 });

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [controls, isInView]);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { 
        duration: 0.8,
        ease: "easeOut"
      } 
    }
  };

  return (
    <section id="timeline" className="py-24 bg-hacker-dark relative">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-mono text-hacker-green mb-12 text-center glitch-effect" data-text="Timeline">
          Timeline
        </h2>
        
        <motion.div 
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="max-w-3xl mx-auto relative"
        >
          {/* Vertical line */}
          <div className="absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-hacker-green to-hacker-cyan"></div>
          
          {timelineData.map((item, index) => (
            <motion.div 
              key={index}
              variants={itemVariants}
              className={cn(
                "mb-12 ml-12 relative",
                "before:absolute before:left-[-39px] before:top-2",
                "before:w-5 before:h-5 before:bg-hacker-dark",
                "before:border-2 before:border-hacker-green before:rounded-full",
                "before:shadow-[0_0_10px_rgba(0,255,65,0.5)]",
                "before:z-10"
              )}
            >
              {/* Dots connecting to timeline */}
              <div className="absolute left-[-34px] top-3 w-8 h-px bg-hacker-green"></div>
              
              <div className="bg-hacker-darker border border-hacker-grey rounded-lg p-6 hover:border-hacker-green transition-colors duration-300">
                <div className="text-hacker-cyan text-sm font-mono mb-2">{item.year}</div>
                <h3 className="text-xl font-mono text-white mb-1">{item.title}</h3>
                <div className="text-hacker-green mb-3">{item.company}</div>
                <p className="text-gray-400">{item.description}</p>
                <div className="absolute right-4 top-4 text-2xl opacity-70">{item.icon}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
      
      {/* Background grid pattern */}
      <div className="absolute inset-0 opacity-5 z-0" 
        style={{ 
          backgroundImage: 'linear-gradient(to right, #333 1px, transparent 1px), linear-gradient(to bottom, #333 1px, transparent 1px)',
          backgroundSize: '20px 20px'
        }}>
      </div>
    </section>
  );
};

export default Timeline;
