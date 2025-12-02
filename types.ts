export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  techStack: string[];
  image: string;
  result?: string;
  problem?: string;
  solution?: string;
}

export interface Experience {
  role: string;
  company: string;
  duration: string;
  description: string[];
}

export interface Education {
  degree: string;
  institution: string;
  year: string;
  cgpa: string;
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}

export enum SectionId {
  HOME = 'home',
  ABOUT = 'about',
  EXPERIENCE = 'experience',
  PROJECTS = 'projects',
  SKILLS = 'skills',
  CONTACT = 'contact',
}