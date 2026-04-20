import React from 'react';
import { 
  Layout, 
  Server, 
  Palette, 
  Briefcase, 
  Lightbulb, 
  Cloud, 
  Heart, 
  Target, 
  Users 
} from 'lucide-react';
import * as SiIcons from 'react-icons/si';

// Helper to map icon names to components for Brand Icons (Si)
export const IconRenderer = ({ iconName, color, size = 24, className = "" }) => {
  const SiIcon = SiIcons[iconName];
  if (SiIcon) return <SiIcon size={size} style={{ color }} className={className} />;
  return null;
};

// Helper to map icon names to components for Lucide Icons
export const LucideIconRenderer = ({ iconName, className = "", size = 24 }) => {
  const icons = {
    Layout, Server, Palette, Briefcase, Lightbulb, Cloud, Heart, Target, Users
  };
  const Icon = icons[iconName];
  return Icon ? <Icon size={size} className={className} /> : null;
};
