import React from 'react';
import {
  SiAnthropic,
  SiNeovim,
  SiLinux,
  SiNvidia,
  SiDocker,
  SiPostman,
  SiPytest,
  SiGit,
  SiObsidian,
} from '@icons-pack/react-simple-icons';
import { Antigravity } from '@lobehub/icons';

interface ToolIconProps {
  id: string;
  className?: string;
}

export const ToolIcon: React.FC<ToolIconProps> = ({ id, className = 'w-5 h-5' }) => {
  switch (id) {
    case 'claude':
      return <SiAnthropic className={className} />;
    case 'antigravity':
      return <Antigravity className={className} />;
    case 'neovim':
      return <SiNeovim className={className} />;
    case 'zed':
      // Official Zed Editor logo
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
          <path d="M3 4.5C3 3.67 3.67 3 4.5 3H19.5C20.33 3 21 3.67 21 4.5V7C21 7.83 20.33 8.5 19.5 8.5H10.2L20.1 16.4C20.67 16.85 21 17.55 21 18.3V19.5C21 20.33 20.33 21 19.5 21H4.5C3.67 21 3 20.33 3 19.5V17C3 16.17 3.67 15.5 4.5 15.5H13.8L3.9 7.6C3.33 7.15 3 6.45 3 5.7V4.5Z" />
        </svg>
      );
    case 'vscode':
      // Official Microsoft Visual Studio Code ribbon
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
          <path d="M17.5 2L7 10.2L3.5 7.5L1.5 8.7L5.3 12L1.5 15.3L3.5 16.5L7 13.8L17.5 22L22.5 19.5V4.5L17.5 2ZM17.5 7.8V16.2L10.2 12L17.5 7.8Z" />
        </svg>
      );
    case 'ghostty':
      // Official Ghostty Terminal icon
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
          <path d="M12 2C6.48 2 2 6.48 2 12v7.5c0 .83.67 1.5 1.5 1.5 1 0 1.5-.5 2-.5s1 .5 2 .5 1.5-.5 2-.5 1 .5 2 .5 1.5-.5 2-.5 1 .5 2 .5 1.5-.5 2-.5 1 .5 2 .5c.83 0 1.5-.67 1.5-1.5V12c0-5.52-4.48-10-10-10zm-3 11a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm6 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" />
        </svg>
      );
    case 'linux':
      return <SiLinux className={className} />;
    case 'hyprland':
      // Official Hyprland geometric mountain prism
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
          <path d="M12 2L2 19.5H7.5L12 11.5L16.5 19.5H22L12 2ZM12 6.8L15.6 13.5H8.4L12 6.8Z" />
        </svg>
      );
    case 'obsidian':
      return <SiObsidian className={className} />;
    case 'cuda':
      return <SiNvidia className={className} />;
    case 'valgrind':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <path d="M12 8v5" />
          <path d="M12 16h.01" />
        </svg>
      );
    case 'docker':
      return <SiDocker className={className} />;
    case 'postman':
      return <SiPostman className={className} />;
    case 'pytest':
      return <SiPytest className={className} />;
    case 'git':
      return <SiGit className={className} />;
    default:
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className} aria-hidden="true">
          <circle cx="12" cy="12" r="8" />
        </svg>
      );
  }
};
