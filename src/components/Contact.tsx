import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import NeonButton from './NeonButton';
import { Linkedin, Mail, Phone } from 'lucide-react';

const Contact: React.FC = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(null);
    setError(null);
    // Simuler l'envoi (remplacer par une vraie intégration si besoin)
    setTimeout(() => {
      if (form.name && form.email && form.message) {
        setSuccess("Votre message a bien été envoyé ! Merci de m'avoir contacté.");
        setForm({ name: '', email: '', message: '' });
      } else {
        setError("Veuillez remplir tous les champs.");
      }
      setLoading(false);
    }, 1200);
  };

  const openCalendly = () => {
    window.open('https://calendly.com/', '_blank');
  };

  return (
    <section id="contact" className="py-24 bg-hacker-darker relative">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-mono mb-12 text-center glitch-effect text-gray-900 dark:text-white" data-text="Contact">
          Contact
        </h2>
        
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Contact Form */}
          <div className="bg-hacker-dark border border-hacker-grey rounded-lg p-6">
            <h3 className="text-2xl font-mono mb-6 text-gray-900 dark:text-white">Get In Touch</h3>
            
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-mono mb-2 text-gray-700 dark:text-white">NAME</label>
                <input 
                  type="text" 
                  id="name" 
                  className="w-full bg-hacker-darker border border-hacker-grey p-3 rounded focus:border-hacker-green focus:outline-none transition-colors text-gray-900 dark:text-white"
                  required
                  value={form.name}
                  onChange={handleChange}
                  disabled={loading}
                />
              </div>
              
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-mono mb-2 text-gray-700 dark:text-white">EMAIL</label>
                <input 
                  type="email" 
                  id="email" 
                  className="w-full bg-hacker-darker border border-hacker-grey p-3 rounded focus:border-hacker-green focus:outline-none transition-colors text-gray-900 dark:text-white"
                  required
                  value={form.email}
                  onChange={handleChange}
                  disabled={loading}
                />
              </div>
              
              <div className="mb-6">
                <label htmlFor="message" className="block text-sm font-mono mb-2 text-gray-700 dark:text-white">MESSAGE</label>
                <textarea 
                  id="message" 
                  rows={5}
                  className="w-full bg-hacker-darker border border-hacker-grey p-3 rounded focus:border-hacker-green focus:outline-none transition-colors text-gray-900 dark:text-white"
                  required
                  value={form.message}
                  onChange={handleChange}
                  disabled={loading}
                ></textarea>
              </div>
              
              {success && <div className="mb-4 text-green-600 dark:text-white font-mono">{success}</div>}
              {error && <div className="mb-4 text-red-600 dark:text-white font-mono">{error}</div>}
              
              <div className="flex justify-between items-center">
                <NeonButton variant="green" type="submit" disabled={loading}>
                  {loading ? 'Envoi...' : 'Send Message'}
                </NeonButton>
                
                <NeonButton variant="outline" type="button" onClick={openCalendly}>
                  Schedule Meeting
                </NeonButton>
              </div>
            </form>
          </div>
          
          {/* Contact Info */}
          <div>
            <h3 className="text-2xl font-mono mb-6 text-gray-900 dark:text-white">Connect With Me</h3>
            
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-full bg-hacker-darker flex items-center justify-center border border-hacker-green">
                  <Mail size={24} className="text-hacker-green" />
                </div>
                <div>
                  <h4 className="font-mono text-gray-900 dark:text-white">Email</h4>
                  <a href="mailto:delaarayene@gmail.com" className="text-hacker-green hover:underline dark:text-hacker-green">
                    delaarayene@gmail.com
                  </a>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-full bg-hacker-darker flex items-center justify-center border border-hacker-green">
                  <Linkedin size={24} className="text-hacker-green" />
                </div>
                <div>
                  <h4 className="font-mono text-gray-900 dark:text-white">LinkedIn</h4>
                  <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-hacker-green hover:underline dark:text-hacker-green">
                    linkedin.com/in/aziz-rayene
                  </a>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-full bg-hacker-darker flex items-center justify-center border border-hacker-green">
                  <Phone size={24} className="text-hacker-green" />
                </div>
                <div>
                  <h4 className="font-mono text-gray-900 dark:text-white">Phone</h4>
                  <a href="tel:+1234567890" className="text-hacker-green hover:underline dark:text-hacker-green">
                    +1 (234) 567-890
                  </a>
                </div>
              </div>
            </div>
            
            <div className="mt-8 p-4 bg-hacker-darker rounded border border-hacker-grey">
              <p className="text-gray-700 dark:text-white text-sm">
                I'm currently available for freelance work and full-time positions. 
                Feel free to reach out for collaborations or just a friendly chat!
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Matrix-like falling code animation in background */}
      <div className="absolute inset-0 overflow-hidden opacity-5 pointer-events-none">
        {[...Array(10)].map((_, i) => (
          <div 
            key={i}
            className="absolute top-0 text-xs font-mono text-hacker-green whitespace-nowrap"
            style={{
              left: `${i * 10}%`,
              animation: `fall ${5 + Math.random() * 10}s linear infinite ${i * 0.5}s`,
            }}
          >
            {[...Array(20)].map((_, j) => (
              <div
                key={j}
                style={{
                  opacity: Math.random() * 0.8 + 0.2,
                  transform: `translateY(${j * 20}px)`,
                  animation: `none`,
                }}
              >
                {String.fromCharCode(33 + Math.floor(Math.random() * 94))}
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Contact;
