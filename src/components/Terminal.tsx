
import React, { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { X } from 'lucide-react';
import NeonButton from './NeonButton';

interface TerminalProps {
  isOpen: boolean;
  onClose: () => void;
  onRunCommand: (command: string) => void;
  history: string[];
}

const Terminal: React.FC<TerminalProps> = ({ isOpen, onClose, onRunCommand, history }) => {
  const [input, setInput] = useState('');
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  
  const availableCommands = [
    'help',
    'about',
    'timeline',
    'skills',
    'projects',
    'contact',
    'cv',
    'exit'
  ];

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInput(value);
    
    if (value.trim()) {
      const filtered = availableCommands.filter(cmd => 
        cmd.startsWith(value.trim().toLowerCase())
      );
      setSuggestions(filtered);
      setShowSuggestions(filtered.length > 0);
    } else {
      setShowSuggestions(false);
    }
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Tab completion
    if (e.key === 'Tab' && showSuggestions) {
      e.preventDefault();
      setInput(suggestions[0]);
      setShowSuggestions(false);
    }
    
    // Command history navigation
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0 && historyIndex < commandHistory.length - 1) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        setInput(commandHistory[commandHistory.length - 1 - newIndex]);
      }
    }
    
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInput(commandHistory[commandHistory.length - 1 - newIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInput('');
      }
    }
    
    // Execute command
    if (e.key === 'Enter') {
      e.preventDefault();
      executeCommand();
    }
  };

  const executeCommand = () => {
    if (input.trim()) {
      onRunCommand(input.trim().toLowerCase());
      // Add to command history
      setCommandHistory(prev => [...prev, input.trim()]);
      setHistoryIndex(-1);
      setInput('');
      setShowSuggestions(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className={cn(
        "w-full max-w-3xl terminal",
        "transform transition-all duration-300",
        "animate-fade-in"
      )}>
        <div className="terminal-header">
          <div className="text-sm">aziz@portfolio:~$</div>
          <button 
            onClick={onClose}
            className="text-hacker-green hover:text-hacker-cyan transition-colors"
          >
            <X size={18} />
          </button>
        </div>
        
        <div className="terminal-body overflow-auto" ref={terminalRef}>
          {history.map((line, index) => (
            <div key={index} className="mb-1">
              {line.startsWith('> ') ? (
                <div className="flex">
                  <span className="text-hacker-green mr-2">$</span>
                  <span>{line.substring(2)}</span>
                </div>
              ) : (
                <div className="text-hacker-cyan">{line}</div>
              )}
            </div>
          ))}
        </div>
        
        <div className="terminal-input">
          <span className="text-hacker-green mr-2">$</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={handleInputChange}
            onKeyDown={handleInputKeyDown}
            className="bg-transparent border-none outline-none text-hacker-green w-full"
            spellCheck="false"
            autoComplete="off"
          />
          <span 
            className={cn(
              "w-2 h-5 ml-0.5 bg-hacker-green opacity-70",
              "animate-cursor-blink"
            )}
          ></span>
        </div>
        
        {showSuggestions && (
          <div className="mt-2 bg-hacker-dark border border-hacker-grey rounded-sm">
            {suggestions.map((suggestion, index) => (
              <div 
                key={index} 
                className="px-2 py-1 cursor-pointer hover:bg-hacker-grey"
                onClick={() => {
                  setInput(suggestion);
                  setShowSuggestions(false);
                  if (inputRef.current) inputRef.current.focus();
                }}
              >
                {suggestion}
              </div>
            ))}
          </div>
        )}
        
        <div className="mt-4 text-xs text-hacker-green/70">
          Type 'help' for available commands
        </div>
      </div>
    </div>
  );
};

export default Terminal;
