
import React, { useEffect, useState } from 'react';

const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [visible, setVisible] = useState(false);
  const [clicking, setClicking] = useState(false);
  
  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!visible) setVisible(true);
    };
    
    const handleMouseDown = () => setClicking(true);
    const handleMouseUp = () => setClicking(false);
    const handleMouseLeave = () => setVisible(false);
    const handleMouseEnter = () => setVisible(true);
    
    window.addEventListener('mousemove', updatePosition);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.body.addEventListener('mouseleave', handleMouseLeave);
    document.body.addEventListener('mouseenter', handleMouseEnter);
    
    return () => {
      window.removeEventListener('mousemove', updatePosition);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.body.removeEventListener('mouseleave', handleMouseLeave);
      document.body.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [visible]);

  // Apply custom cursor styles to the body
  useEffect(() => {
    document.body.classList.add('neon-cursor');
    document.body.style.cursor = 'none';
    
    return () => {
      document.body.classList.remove('neon-cursor');
      document.body.style.cursor = '';
    };
  }, []);
  
  return (
    <>
      <div
        className="fixed w-6 h-6 rounded-full pointer-events-none z-[9999] mix-blend-screen"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: 'translate(-50%, -50%)',
          backgroundColor: 'rgba(0, 255, 65, 0.2)',
          boxShadow: '0 0 10px rgba(0, 255, 65, 0.5)',
          opacity: visible ? 1 : 0,
          transition: 'opacity 0.2s ease-out, transform 0.1s ease-out',
          scale: clicking ? 0.8 : 1,
        }}
      />
      <div
        className="fixed w-2 h-2 rounded-full pointer-events-none z-[9999] bg-hacker-green"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: 'translate(-50%, -50%)',
          boxShadow: '0 0 10px rgba(0, 255, 65, 0.8)',
          opacity: visible ? 1 : 0,
          transition: 'opacity 0.15s ease-out',
        }}
      />
    </>
  );
};

export default CustomCursor;
