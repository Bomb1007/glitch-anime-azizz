import React, { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface TerminalProps {
  isOpen: boolean;
  onClose: () => void;
  onRunCommand: (command: string) => void;
  history: string[];
}

interface FileSystemNode {
  type: 'file' | 'directory';
  name: string;
  content?: string;
  children?: { [key: string]: FileSystemNode };
}

const Terminal: React.FC<TerminalProps> = ({ isOpen, onClose, onRunCommand, history }) => {
  const { t } = useTranslation();
  const [input, setInput] = useState('');
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [currentDir, setCurrentDir] = useState('/');
  const [fileSystem, setFileSystem] = useState<FileSystemNode>({
    type: 'directory',
    name: '/',
    children: {
      'home': {
        type: 'directory',
        name: 'home',
        children: {
          'user': {
            type: 'directory',
            name: 'user',
            children: {
              'Documents': {
                type: 'directory',
                name: 'Documents',
                children: {}
              },
              'Downloads': {
                type: 'directory',
                name: 'Downloads',
                children: {}
              },
              'readme.txt': {
                type: 'file',
                name: 'readme.txt',
                content: 'Welcome to the virtual terminal!\n\nThis is a readme file to help you get started.'
              }
            }
          }
        }
      },
      'etc': {
        type: 'directory',
        name: 'etc',
        children: {}
      },
      'var': {
        type: 'directory',
        name: 'var',
        children: {}
      }
    }
  });
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  
  const availableCommands = [
    // Commandes bash de base
    'ls',
    'cd',
    'pwd',
    'mkdir',
    'rm',
    'touch',
    'cat',
    'echo',
    'clear',
    'cp',
    'mv',
    'grep',
    'find',
    'chmod',
    'chown',
    'ps',
    'kill',
    'top',
    'df',
    'du',
    'tar',
    'zip',
    'unzip',
    'ssh',
    'scp',
    'ping',
    'ifconfig',
    'netstat',
    'curl',
    'wget',
    // Commandes de l'application
    'help',
    'about',
    'timeline',
    'skills',
    'projects',
    'contact',
    'cv',
    'exit'
  ];

  const getCurrentDirectory = (path: string): FileSystemNode => {
    if (path === '/') return fileSystem;
    const parts = path.split('/').filter(Boolean);
    let current = fileSystem;
    for (const part of parts) {
      if (current.children && current.children[part]) {
        current = current.children[part];
      } else {
        throw new Error(`Directory not found: ${path}`);
      }
    }
    return current;
  };

  const formatFileSize = (size: number): string => {
    const units = ['B', 'KB', 'MB', 'GB', 'TB'];
    let i = 0;
    while (size >= 1024 && i < units.length - 1) {
      size /= 1024;
      i++;
    }
    return `${size.toFixed(1)} ${units[i]}`;
  };

  const getFileSize = (node: FileSystemNode): number => {
    if (node.type === 'file') {
      return node.content?.length || 0;
    }
    let size = 0;
    if (node.children) {
      for (const child of Object.values(node.children)) {
        size += getFileSize(child);
      }
    }
    return size;
  };

  const formatPermissions = (node: FileSystemNode): string => {
    return node.type === 'directory' ? 'drwxr-xr-x' : '-rw-r--r--';
  };

  const formatDate = (date: Date): string => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const month = months[date.getMonth()];
    const day = date.getDate().toString().padStart(2, '0');
    const hour = date.getHours().toString().padStart(2, '0');
    const min = date.getMinutes().toString().padStart(2, '0');
    return `${month} ${day} ${hour}:${min}`;
  };

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
      const command = input.trim().toLowerCase();
      
      // Vérifier si la commande est une sortie de ls
      if (command.startsWith('drwxr-xr-x') || command.startsWith('-rw-r--r--')) {
        onRunCommand(`Error: This appears to be a directory listing. Use 'ls' to list directory contents.`);
        setCommandHistory(prev => [...prev, input.trim()]);
        setInput('');
        setHistoryIndex(-1);
        return;
      }

      const [cmd, ...args] = command.split(' ');

      try {
        // Gestion des commandes bash de base
        switch (cmd) {
          case 'ls':
            const currentDirNode = getCurrentDirectory(currentDir);
            if (currentDirNode.type === 'directory' && currentDirNode.children) {
              // Affichage simplifié : juste les noms
              const files = Object.values(currentDirNode.children).map(node => node.name);
              onRunCommand(files.join('\n'));
            }
            break;

          case 'cd':
            if (args[0]) {
              const newPath = args[0] === '..' 
                ? currentDir.split('/').slice(0, -1).join('/') || '/'
                : `${currentDir}${currentDir === '/' ? '' : '/'}${args[0]}`;
              getCurrentDirectory(newPath); // Vérifie si le chemin existe
              setCurrentDir(newPath);
              onRunCommand(`Changed directory to ${newPath}`);
            } else {
              setCurrentDir('/');
              onRunCommand('Changed directory to /');
            }
            break;

          case 'pwd':
            onRunCommand(currentDir);
            break;

          case 'mkdir':
            if (args[0]) {
              const currentDirNode = getCurrentDirectory(currentDir);
              if (currentDirNode.type === 'directory') {
                if (!currentDirNode.children) currentDirNode.children = {};
                if (currentDirNode.children[args[0]]) {
                  onRunCommand(`mkdir: cannot create directory '${args[0]}': File exists`);
                } else {
                  currentDirNode.children[args[0]] = {
                    type: 'directory',
                    name: args[0],
                    children: {}
                  };
                  setFileSystem({...fileSystem});
                  onRunCommand(`Created directory ${args[0]}`);
                }
              }
            } else {
              onRunCommand('mkdir: missing operand');
            }
            break;

          case 'rm':
            if (args[0]) {
              const currentDirNode = getCurrentDirectory(currentDir);
              if (currentDirNode.type === 'directory' && currentDirNode.children) {
                if (currentDirNode.children[args[0]]) {
                  delete currentDirNode.children[args[0]];
                  setFileSystem({...fileSystem});
                  onRunCommand(`Removed ${args[0]}`);
                } else {
                  onRunCommand(`rm: cannot remove '${args[0]}': No such file or directory`);
                }
              }
            } else {
              onRunCommand('rm: missing operand');
            }
            break;

          case 'touch':
            if (args[0]) {
              const currentDirNode = getCurrentDirectory(currentDir);
              if (currentDirNode.type === 'directory') {
                if (!currentDirNode.children) currentDirNode.children = {};
                currentDirNode.children[args[0]] = {
                  type: 'file',
                  name: args[0],
                  content: ''
                };
                setFileSystem({...fileSystem});
                onRunCommand(`Created file ${args[0]}`);
              }
            } else {
              onRunCommand('touch: missing file operand');
            }
            break;

          case 'cat':
            if (args[0]) {
              const currentDirNode = getCurrentDirectory(currentDir);
              if (currentDirNode.type === 'directory' && currentDirNode.children) {
                const file = currentDirNode.children[args[0]];
                if (file && file.type === 'file') {
                  onRunCommand(file.content || '');
                } else {
                  onRunCommand(`cat: ${args[0]}: No such file`);
                }
              }
            } else {
              onRunCommand('cat: missing file operand');
            }
            break;

          case 'echo':
            onRunCommand(args.join(' '));
            break;

          case 'clear':
            onRunCommand('__CLEAR__');
            break;

          case 'cp':
            if (args.length === 2) {
              const currentDirNode = getCurrentDirectory(currentDir);
              if (currentDirNode.type === 'directory' && currentDirNode.children) {
                const source = currentDirNode.children[args[0]];
                if (source) {
                  if (!currentDirNode.children[args[1]]) {
                    currentDirNode.children[args[1]] = {
                      ...source,
                      name: args[1]
                    };
                    setFileSystem({...fileSystem});
                    onRunCommand(`Copied ${args[0]} to ${args[1]}`);
                  } else {
                    onRunCommand(`cp: cannot create '${args[1]}': File exists`);
                  }
                } else {
                  onRunCommand(`cp: cannot stat '${args[0]}': No such file or directory`);
                }
              }
            } else {
              onRunCommand('cp: missing file operand');
            }
            break;

          case 'mv':
            if (args.length === 2) {
              const currentDirNode = getCurrentDirectory(currentDir);
              if (currentDirNode.type === 'directory' && currentDirNode.children) {
                const source = currentDirNode.children[args[0]];
                if (source) {
                  currentDirNode.children[args[1]] = {
                    ...source,
                    name: args[1]
                  };
                  delete currentDirNode.children[args[0]];
                  setFileSystem({...fileSystem});
                  onRunCommand(`Moved ${args[0]} to ${args[1]}`);
                } else {
                  onRunCommand(`mv: cannot stat '${args[0]}': No such file or directory`);
                }
              }
            } else {
              onRunCommand('mv: missing file operand');
            }
            break;

          case 'grep':
            if (args.length >= 2) {
              const pattern = args[0];
              const filename = args[1];
              const currentDirNode = getCurrentDirectory(currentDir);
              if (currentDirNode.type === 'directory' && currentDirNode.children) {
                const file = currentDirNode.children[filename];
                if (file && file.type === 'file') {
                  const content = file.content || '';
                  const lines = content.split('\n');
                  const matches = lines.filter(line => line.includes(pattern));
                  onRunCommand(matches.join('\n'));
                } else {
                  onRunCommand(`grep: ${filename}: No such file or directory`);
                }
              }
            } else {
              onRunCommand('grep: missing pattern or file operand');
            }
            break;

          case 'find':
            if (args[0]) {
              const currentDirNode = getCurrentDirectory(currentDir);
              const results: string[] = [];
              const searchInDir = (node: FileSystemNode, path: string) => {
                if (node.name.includes(args[0])) {
                  results.push(path);
                }
                if (node.type === 'directory' && node.children) {
                  Object.values(node.children).forEach(child => {
                    searchInDir(child, `${path}/${child.name}`);
                  });
                }
              };
              searchInDir(currentDirNode, currentDir);
              onRunCommand(results.join('\n') || 'No matches found');
            } else {
              onRunCommand('find: missing path operand');
            }
            break;

          case 'chmod':
            onRunCommand('chmod: Operation not permitted in virtual environment');
            break;

          case 'chown':
            onRunCommand('chown: Operation not permitted in virtual environment');
            break;

          case 'ps':
            onRunCommand('PID TTY          TIME CMD\n1 ?        00:00:00 terminal');
            break;

          case 'kill':
            onRunCommand('kill: Operation not permitted in virtual environment');
            break;

          case 'top':
            onRunCommand('top: Operation not permitted in virtual environment');
            break;

          case 'df':
            onRunCommand('Filesystem      Size  Used Avail Use% Mounted on\n/dev/vda1       20G   10G   10G  50% /');
            break;

          case 'du':
            if (args[0]) {
              const currentDirNode = getCurrentDirectory(currentDir);
              if (currentDirNode.type === 'directory' && currentDirNode.children) {
                const target = currentDirNode.children[args[0]];
                if (target) {
                  const size = getFileSize(target);
                  onRunCommand(`${formatFileSize(size)}\t${args[0]}`);
                } else {
                  onRunCommand(`du: cannot access '${args[0]}': No such file or directory`);
                }
              }
            } else {
              onRunCommand('du: missing operand');
            }
            break;

          case 'tar':
            onRunCommand('tar: Operation not permitted in virtual environment');
            break;

          case 'zip':
            onRunCommand('zip: Operation not permitted in virtual environment');
            break;

          case 'unzip':
            onRunCommand('unzip: Operation not permitted in virtual environment');
            break;

          case 'ssh':
            onRunCommand('ssh: Operation not permitted in virtual environment');
            break;

          case 'scp':
            onRunCommand('scp: Operation not permitted in virtual environment');
            break;

          case 'ping':
            onRunCommand('ping: Operation not permitted in virtual environment');
            break;

          case 'ifconfig':
            onRunCommand('ifconfig: Operation not permitted in virtual environment');
            break;

          case 'netstat':
            onRunCommand('netstat: Operation not permitted in virtual environment');
            break;

          case 'curl':
            onRunCommand('curl: Operation not permitted in virtual environment');
            break;

          case 'wget':
            onRunCommand('wget: Operation not permitted in virtual environment');
            break;

          default:
            onRunCommand(command);
        }
      } catch (error) {
        onRunCommand(`Error: ${error.message}`);
      }

      setCommandHistory(prev => [...prev, input.trim()]);
      setInput('');
      setHistoryIndex(-1);
    }
  };

  const renderCommandHelp = () => {
    const commands = [
      // Commandes bash de base
      { name: 'ls', desc: 'List directory contents' },
      { name: 'cd', desc: 'Change directory' },
      { name: 'pwd', desc: 'Print working directory' },
      { name: 'mkdir', desc: 'Create a new directory' },
      { name: 'rm', desc: 'Remove files or directories' },
      { name: 'touch', desc: 'Create an empty file' },
      { name: 'cat', desc: 'Display file contents' },
      { name: 'echo', desc: 'Display a line of text' },
      { name: 'clear', desc: 'Clear the terminal screen' },
      { name: 'cp', desc: 'Copy files and directories' },
      { name: 'mv', desc: 'Move (rename) files' },
      { name: 'grep', desc: 'Search for patterns in files' },
      { name: 'find', desc: 'Search for files in a directory hierarchy' },
      { name: 'chmod', desc: 'Change file permissions' },
      { name: 'chown', desc: 'Change file owner and group' },
      { name: 'ps', desc: 'Display running processes' },
      { name: 'kill', desc: 'Terminate processes' },
      { name: 'top', desc: 'Display system processes' },
      { name: 'df', desc: 'Display disk space usage' },
      { name: 'du', desc: 'Display file and directory space usage' },
      { name: 'tar', desc: 'Archive files' },
      { name: 'zip', desc: 'Package and compress files' },
      { name: 'unzip', desc: 'Extract compressed files' },
      { name: 'ssh', desc: 'Secure shell client' },
      { name: 'scp', desc: 'Secure copy' },
      { name: 'ping', desc: 'Test network connectivity' },
      { name: 'ifconfig', desc: 'Configure network interface' },
      { name: 'netstat', desc: 'Network statistics' },
      { name: 'curl', desc: 'Transfer data from or to a server' },
      { name: 'wget', desc: 'Retrieve files from the web' },
      // Commandes de l'application
      { name: 'help', desc: t('terminal.commands.help') },
      { name: 'about', desc: t('terminal.commands.about') },
      { name: 'timeline', desc: t('terminal.commands.timeline') },
      { name: 'skills', desc: t('terminal.commands.skills') },
      { name: 'projects', desc: t('terminal.commands.projects') },
      { name: 'contact', desc: t('terminal.commands.contact') },
      { name: 'cv', desc: t('terminal.commands.cv') },
      { name: 'exit', desc: t('terminal.commands.exit') },
    ];
    return (
      <div className="space-y-1">
        <div className="text-hacker-cyan font-bold mb-2 dark:text-hacker-cyan">Available Commands:</div>
        <pre className="text-gray-200 dark:text-gray-200">
          {commands.map(cmd => (
            <div key={cmd.name} className="flex">
              <span className="w-24 inline-block text-hacker-green dark:text-hacker-green">{cmd.name}</span>
              <span className="text-gray-300 dark:text-gray-300">- {cmd.desc}</span>
            </div>
          ))}
        </pre>
      </div>
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent 
        className="max-w-4xl h-[80vh] p-0 bg-hacker-darker border-hacker-green dark:bg-hacker-darker dark:text-hacker-green"
        onOpenAutoFocus={(e) => {
          e.preventDefault();
          inputRef.current?.focus();
        }}
      >
        <DialogHeader className="border-b border-hacker-grey p-4">
          <DialogTitle className="text-hacker-green font-mono flex items-center justify-between dark:text-hacker-green">
            <span>Terminal</span>
          <button 
            onClick={onClose}
              className="text-gray-400 hover:text-hacker-red transition-colors dark:text-gray-300 dark:hover:text-hacker-red"
          >
              <X size={20} />
          </button>
          </DialogTitle>
        </DialogHeader>
        
        <div
          ref={terminalRef}
          className="p-4 font-mono text-hacker-green h-full overflow-y-auto dark:text-hacker-green"
          onClick={() => inputRef.current?.focus()}
        >
          <div className="mb-4 text-gray-200 dark:text-gray-200">
            {t('terminal.welcome')}
          </div>
          <div className="mb-4 text-gray-300 dark:text-gray-300">
            {t('terminal.help')}
          </div>
          
          {history.map((line, index) => (
            <div key={index} className="mb-1 text-gray-200 dark:text-gray-200 whitespace-pre-line">
              {line === '__SHOW_HELP__' ? renderCommandHelp() : 
               line === '__CLEAR__' ? null : line.replace(/^> /, '<span class="text-hacker-cyan font-bold">$ </span>')}
            </div>
          ))}
        
          <div className="flex items-center mt-4">
            <span className="mr-2 text-hacker-cyan dark:text-hacker-cyan font-bold">{currentDir} $</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={handleInputChange}
            onKeyDown={handleInputKeyDown}
              className="bg-transparent border-none outline-none text-gray-200 dark:text-gray-200 flex-1 w-full"
              placeholder={t('terminal.help')}
              autoFocus
            />
        </div>
        
        {showSuggestions && (
            <div className="mt-2">
            {suggestions.map((suggestion, index) => (
                <div key={index} className="text-hacker-cyan dark:text-hacker-cyan">
                {suggestion}
              </div>
            ))}
          </div>
        )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Terminal;
