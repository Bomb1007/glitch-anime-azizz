
import React from 'react';
import { Button } from "@/components/ui/button";
import { cn } from '@/lib/utils';

interface NeonButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'green' | 'cyan' | 'outline';
  size?: 'sm' | 'default' | 'lg';
  children: React.ReactNode;
}

const NeonButton: React.FC<NeonButtonProps> = ({
  variant = 'green',
  size = 'default',
  className,
  children,
  ...props
}) => {
  const buttonStyles = cn(
    'font-mono relative overflow-hidden transition-all duration-300',
    'hover:animate-neon-pulse active:scale-95',
    {
      'bg-transparent border border-hacker-green text-hacker-green hover:bg-hacker-green/10 hover:shadow-[0_0_10px_rgba(0,255,65,0.5)]': 
        variant === 'outline',
      'bg-hacker-green text-hacker-darker hover:bg-hacker-green/90 hover:shadow-[0_0_15px_rgba(0,255,65,0.7)]': 
        variant === 'green',
      'bg-hacker-cyan text-hacker-darker hover:bg-hacker-cyan/90 hover:shadow-[0_0_15px_rgba(0,255,255,0.7)]':
        variant === 'cyan',
      'text-sm px-3 py-1': size === 'sm',
      'text-base px-4 py-2': size === 'default',
      'text-lg px-6 py-3': size === 'lg',
    },
    className
  );

  return (
    <Button className={buttonStyles} {...props}>
      {children}
      <span className="absolute inset-0 bg-white/10 opacity-0 hover:opacity-20 transition-opacity"></span>
    </Button>
  );
};

export default NeonButton;
