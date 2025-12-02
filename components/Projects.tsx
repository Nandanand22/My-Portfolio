import React, { useState, useEffect } from 'react';
import { PROJECTS_DATA } from '../constants';
import { SectionId, Project } from '../types';
import { ExternalLink, ArrowUpRight, X, Layout, Smartphone, Tag } from 'lucide-react';

const Projects: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [filteredProjects, setFilteredProjects] = useState<Project[]>(PROJECTS_DATA);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Extract unique categories
  const categories = ['All', ...Array.from(new Set(PROJECTS_DATA.map(p => p.category)))];

  useEffect(() => {
    // Load filter preference from localStorage
    const savedFilter = localStorage.getItem('portfolio_project_filter');
    if (savedFilter && categories.includes(savedFilter)) {
      setActiveCategory(savedFilter);
    }
  }, []);

  useEffect(() => {
    if (activeCategory === 'All') {
      setFilteredProjects(PROJECTS_DATA);
    } else {
      setFilteredProjects(PROJECTS_DATA.filter(p => p.category === activeCategory));
    }
    // Save to localStorage
    localStorage.setItem('portfolio_project_filter', activeCategory);
  }, [activeCategory]);

  useEffect(() => {
    // Listen for custom event from Hero section
    const handleOpenProject = (e: CustomEvent) => {
        const projectId = e.detail;
        const project = PROJECTS_DATA.find(p => p.id === projectId);
        if (project) {
            setSelectedProject(project);
            // Also scroll to projects section
            document.getElementById(SectionId.PROJECTS)?.scrollIntoView({ behavior: 'smooth' });
        }
    };

    window.addEventListener('open-project-modal' as any, handleOpenProject as any);
    return () => window.removeEventListener('open-project-modal' as any, handleOpenProject as any);
  }, []);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (selectedProject) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = 'unset';
    }
  }, [selectedProject]);

  return (
    <section id={SectionId.PROJECTS} className="py-24 px-6 bg-sand-200 dark:bg-obsidian-950 transition-colors duration-300">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div className="max-w-2xl">
                <span className="text-sm font-bold uppercase tracking-widest text-slate-500 mb-2 block">Portfolio</span>
                <h2 className="text-4xl md:text-6xl font-bold text-slate-900 dark:text-white tracking-tight">Selected Works</h2>
            </div>
            
            {/* Filter Chips */}
            <div className="flex flex-wrap gap-2">
                {categories.map(cat => (
                    <button
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        className={`px-4 py-2 text-sm font-medium rounded-full transition-all border ${
                            activeCategory === cat 
                            ? 'bg-black text-white border-black dark:bg-white dark:text-black dark:border-white' 
                            : 'bg-transparent text-slate-600 border-slate-300 hover:border-black dark:text-slate-400 dark:border-slate-700 dark:hover:border-white'
                        }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-12 animate-fade-in">
            {filteredProjects.map((project) => (
                <div 
                    key={project.id} 
                    onClick={() => setSelectedProject(project)}
                    className="group cursor-pointer flex flex-col h-full"
                >
                    {/* Image Area */}
                    <div className="aspect-[4/3] bg-white dark:bg-obsidian-900 mb-6 overflow-hidden relative rounded-2xl shadow-lg border border-black/5 dark:border-white/5 transition-all duration-500 group-hover:shadow-2xl group-hover:-translate-y-2">
                        <img 
                            src={project.image} 
                            alt={project.title} 
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                            loading="lazy"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                            <div className="bg-white/90 dark:bg-black/90 text-black dark:text-white px-6 py-3 rounded-full opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 font-medium">
                                View Case Study
                            </div>
                        </div>
                    </div>

                    {/* Content Area */}
                    <div className="flex flex-col gap-3 flex-grow">
                        <div className="flex justify-between items-baseline">
                            <h3 className="text-3xl font-bold text-slate-900 dark:text-white group-hover:underline decoration-2 underline-offset-4">
                                {project.title}
                            </h3>
                            <span className="text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 bg-black/5 dark:bg-white/10 px-3 py-1 rounded-full">
                                {project.category}
                            </span>
                        </div>
                        
                        <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-lg line-clamp-2">
                            {project.description}
                        </p>

                        <div className="flex flex-wrap gap-2 pt-2 mt-auto">
                            {project.techStack.map((tech, i) => (
                                <span key={i} className="text-xs font-semibold px-3 py-1 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-600 dark:text-slate-400">
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            ))}
        </div>
        
        {/* Project Modal (Case Study) */}
        {selectedProject && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setSelectedProject(null)}></div>
                <div className="bg-sand-50 dark:bg-obsidian-900 w-full max-w-4xl max-h-[90vh] overflow-y-auto relative rounded-3xl shadow-2xl animate-in fade-in zoom-in-95 duration-300 flex flex-col border border-white/5">
                    
                    {/* Modal Header Image */}
                    <div className="relative h-64 md:h-80 w-full shrink-0">
                        <img 
                            src={selectedProject.image} 
                            alt={selectedProject.title} 
                            className="w-full h-full object-cover"
                        />
                        <button 
                            onClick={() => setSelectedProject(null)}
                            className="absolute top-4 right-4 p-2 bg-white/90 dark:bg-black/90 rounded-full text-black dark:text-white hover:scale-110 transition-transform shadow-lg"
                        >
                            <X size={24} />
                        </button>
                    </div>

                    {/* Modal Content */}
                    <div className="p-8 md:p-12 space-y-8">
                        <div>
                            <div className="flex flex-wrap items-center gap-3 mb-4">
                                <span className="px-3 py-1 bg-black text-white dark:bg-white dark:text-black text-xs font-bold uppercase tracking-wider rounded-full">
                                    {selectedProject.category}
                                </span>
                                {selectedProject.result && (
                                    <span className="px-3 py-1 bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 text-xs font-bold uppercase tracking-wider rounded-full flex items-center gap-1">
                                        <ArrowUpRight size={12} /> {selectedProject.result}
                                    </span>
                                )}
                            </div>
                            <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">{selectedProject.title}</h2>
                            <p className="text-xl text-slate-600 dark:text-slate-300 leading-relaxed">
                                {selectedProject.description}
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-8 py-8 border-y border-black/10 dark:border-white/10">
                            {selectedProject.problem && (
                                <div className="space-y-3">
                                    <h4 className="text-lg font-bold flex items-center gap-2 text-slate-900 dark:text-white">
                                        <Layout size={20} className="text-red-500" /> The Challenge
                                    </h4>
                                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                                        {selectedProject.problem}
                                    </p>
                                </div>
                            )}
                            {selectedProject.solution && (
                                <div className="space-y-3">
                                    <h4 className="text-lg font-bold flex items-center gap-2 text-slate-900 dark:text-white">
                                        <Smartphone size={20} className="text-green-500" /> The Solution
                                    </h4>
                                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                                        {selectedProject.solution}
                                    </p>
                                </div>
                            )}
                        </div>

                        <div className="space-y-4">
                            <h4 className="text-sm font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 flex items-center gap-2">
                                <Tag size={16} /> Technologies Used
                            </h4>
                            <div className="flex flex-wrap gap-2">
                                {selectedProject.techStack.map((tech, i) => (
                                    <span key={i} className="px-4 py-2 bg-white dark:bg-obsidian-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-300 font-medium">
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="pt-4">
                             <button className="w-full md:w-auto px-8 py-4 bg-black text-white dark:bg-white dark:text-black font-bold uppercase tracking-widest hover:opacity-80 transition-opacity rounded-xl flex items-center justify-center gap-2">
                                 View Live Project <ExternalLink size={18} />
                             </button>
                        </div>
                    </div>
                </div>
            </div>
        )}
      </div>
    </section>
  );
};

export default Projects;