
import React from 'react';
import { X } from 'lucide-react';
import NeonButton from './NeonButton';
import { cn } from '@/lib/utils';

interface CVProps {
  isOpen: boolean;
  onClose: () => void;
}

const CV: React.FC<CVProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  
  const downloadCV = () => {
    // In a real implementation, this would trigger a download of the actual CV PDF
    console.log("Downloading CV");
  };
  
  // Mock PDF content - in a real app, we would embed an actual PDF
  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className={cn(
        "w-full max-w-4xl bg-hacker-dark border border-hacker-green rounded-lg overflow-hidden",
        "h-[80vh] flex flex-col",
        "transform transition-all duration-300",
        "animate-fade-in"
      )}>
        <div className="flex justify-between items-center p-4 border-b border-hacker-grey">
          <h3 className="font-mono text-hacker-green text-xl">Curriculum Vitae</h3>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X size={24} />
          </button>
        </div>
        
        <div className="flex-1 overflow-auto p-6 bg-white">
          {/* Mock CV content - replace with actual PDF viewer in a real implementation */}
          <div className="flex justify-center items-center h-full">
            <div className="text-center text-gray-800">
              <p className="mb-4">PDF Viewer would be embedded here in a real implementation.</p>
              <p className="text-sm">For demo purposes, you can download the CV using the button below.</p>
            </div>
          </div>
        </div>
        
        <div className="p-4 border-t border-hacker-grey flex justify-between">
          <NeonButton variant="outline" onClick={onClose}>
            Close
          </NeonButton>
          <NeonButton variant="green" onClick={downloadCV}>
            Download PDF
          </NeonButton>
        </div>
      </div>
    </div>
  );
};

export default CV;
