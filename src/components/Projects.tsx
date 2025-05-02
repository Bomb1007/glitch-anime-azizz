
import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';
import { cn } from '@/lib/utils';
import NeonButton from './NeonButton';
import { Github, ExternalLink } from 'lucide-react';

interface Project {
  id: number;
  title: string;
  description: string;
  category: 'web' | 'mobile' | 'iot';
  image: string;
  github?: string;
  demo?: string;
  technologies: string[];
}

const Projects: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'web' | 'mobile' | 'iot'>('all');
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.2 });
  
  const projects: Project[] = [
    {
      id: 1,
      title: "E-commerce Platform",
      description: "Full-stack e-commerce solution with payment integration, user authentication, and admin dashboard.",
      category: "web",
      image: "https://placehold.co/600x400/222/444?text=E-commerce",
      github: "https://github.com",
      demo: "https://example.com",
      technologies: ["React", "Node.js", "MongoDB", "Stripe"]
    },
    {
      id: 2,
      title: "Fitness Tracker App",
      description: "Mobile app for tracking workouts, nutrition, and fitness progress with social features.",
      category: "mobile",
      image: "https://placehold.co/600x400/222/444?text=Fitness+App",
      github: "https://github.com",
      technologies: ["Flutter", "Firebase", "Rest API"]
    },
    {
      id: 3,
      title: "Smart Home System",
      description: "IoT solution for monitoring and controlling home devices with voice commands and automation.",
      category: "iot",
      image: "https://placehold.co/600x400/222/444?text=Smart+Home",
      github: "https://github.com",
      demo: "https://example.com/demo",
      technologies: ["Python", "MQTT", "React", "Node.js"]
    },
    {
      id: 4,
      title: "Financial Dashboard",
      description: "Interactive data visualization platform for financial analytics with real-time updates.",
      category: "web",
      image: "https://placehold.co/600x400/222/444?text=Finance",
      github: "https://github.com",
      technologies: ["Vue.js", "Express", "D3.js", "PostgreSQL"]
    },
    {
      id: 5,
      title: "AR Navigation App",
      description: "Mobile application using augmented reality for indoor and outdoor navigation.",
      category: "mobile",
      image: "https://placehold.co/600x400/222/444?text=AR+App",
      github: "https://github.com",
      technologies: ["Swift", "ARKit", "Core Location"]
    },
    {
      id: 6,
      title: "Environmental Monitoring",
      description: "IoT network for collecting and analyzing environmental data in urban areas.",
      category: "iot",
      image: "https://placehold.co/600x400/222/444?text=Environmental",
      github: "https://github.com",
      demo: "https://example.com/env",
      technologies: ["Arduino", "LoRaWAN", "React", "Python"]
    }
  ];

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
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

  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeFilter);

  return (
    <section id="projects" className="py-24 bg-hacker-dark relative">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-mono text-hacker-green mb-12 text-center glitch-effect" data-text="Projects">
          Projects
        </h2>
        
        <div className="flex justify-center mb-8">
          <div className="inline-flex space-x-2 bg-hacker-darker p-1 rounded-lg">
            {(['all', 'web', 'mobile', 'iot'] as const).map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={cn(
                  "px-4 py-2 font-mono text-sm transition-all duration-300 rounded",
                  activeFilter === filter 
                    ? "bg-hacker-green text-hacker-darker" 
                    : "text-gray-300 hover:text-hacker-green"
                )}
              >
                {filter.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
        
        <motion.div 
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredProjects.map((project) => (
            <motion.div
              key={project.id}
              variants={itemVariants}
              className="bg-hacker-darker border border-hacker-grey rounded-lg overflow-hidden neon-border group"
            >
              <div 
                className="h-48 bg-cover bg-center"
                style={{ backgroundImage: `url(${project.image})` }}
              ></div>
              
              <div className="p-6">
                <div className="flex justify-between items-start">
                  <h3 className="text-xl font-mono text-hacker-green mb-2">{project.title}</h3>
                  <span className="text-xs font-mono bg-hacker-dark px-2 py-1 rounded text-hacker-cyan">
                    {project.category.toUpperCase()}
                  </span>
                </div>
                
                <p className="text-gray-400 mb-4 text-sm">{project.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech, index) => (
                    <span 
                      key={index}
                      className="text-xs bg-hacker-dark text-gray-300 px-2 py-1 rounded"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                
                <div className="flex justify-between">
                  {project.github && (
                    <a 
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-300 hover:text-hacker-green transition-colors"
                    >
                      <Github size={20} />
                    </a>
                  )}
                  
                  {project.demo && (
                    <a 
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-300 hover:text-hacker-green transition-colors"
                    >
                      <ExternalLink size={20} />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
