import React, { useState, useEffect } from 'react';
import { ArrowRight, Figma, Smartphone, Layout, ChevronLeft, ChevronRight } from 'lucide-react';
import { PERSONAL_DETAILS, HIGHLIGHTS, PROJECTS_DATA } from '../constants';
import { SectionId } from '../types';

const Hero: React.FC = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    const scrollToProjects = () => {
        document.getElementById(SectionId.PROJECTS)?.scrollIntoView({ behavior: 'smooth' });
    };

    const handleStatClick = (index: number) => {
        if (index === 0) {
            // Dispatch custom event to open Attendance App modal
            const event = new CustomEvent('open-project-modal', { detail: 'attendance-app' });
            window.dispatchEvent(event);
        }
    };

    // Slider Logic
    const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % 2);
    const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + 2) % 2);

    useEffect(() => {
        const timer = setInterval(nextSlide, 5000);
        return () => clearInterval(timer);
    }, []);

  return (
    <section id={SectionId.HOME} className="pt-32 pb-20 md:pt-48 md:pb-32 px-6 min-h-screen flex items-center bg-sand-200 dark:bg-obsidian-950 transition-colors duration-300">
      <div className="container mx-auto flex flex-col-reverse md:flex-row items-center gap-16">
        
        {/* Text Content */}
        <div className="flex-1 space-y-8 animate-fade-in">
            <div className="inline-flex items-center gap-3 px-4 py-1.5 border border-black/10 dark:border-white/10 rounded-full bg-white/50 dark:bg-white/5 text-slate-800 dark:text-slate-200 text-xs font-semibold uppercase tracking-wider shadow-sm">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-600"></span>
                </span>
                {PERSONAL_DETAILS.availability}
            </div>

            <h1 className="text-5xl md:text-7xl font-bold leading-[1.1] text-slate-900 dark:text-white tracking-tight">
                Designing <br/>
                <span className="italic font-light">Intuitive</span> Digital <br/>
                Experiences
            </h1>
            
            <p className="text-lg text-slate-700 dark:text-slate-400 max-w-xl leading-relaxed border-l-2 border-black/20 dark:border-white/20 pl-6">
                I'm <span className="font-bold">{PERSONAL_DETAILS.name}</span>, a {PERSONAL_DETAILS.role}. 
                {PERSONAL_DETAILS.mission}
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
                <button 
                    onClick={scrollToProjects}
                    className="px-8 py-4 bg-black text-white dark:bg-white dark:text-black font-medium transition-all flex items-center gap-3 hover:bg-slate-800 dark:hover:bg-slate-200 shadow-xl hover:shadow-2xl hover:-translate-y-1 rounded-xl uppercase text-sm tracking-widest"
                >
                    View My Work <ArrowRight size={16} />
                </button>
                <button 
                    onClick={() => document.getElementById(SectionId.CONTACT)?.scrollIntoView({ behavior: 'smooth' })}
                    className="px-8 py-4 bg-transparent border border-black dark:border-white text-black dark:text-white font-medium hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all rounded-xl uppercase text-sm tracking-widest"
                >
                    Contact Me
                </button>
            </div>

            {/* Stats / Highlights */}
            <div className="pt-10 grid grid-cols-1 sm:grid-cols-3 gap-8 border-t border-black/10 dark:border-white/10 mt-8">
                {HIGHLIGHTS.map((item, index) => (
                    <button 
                        key={index} 
                        onClick={() => handleStatClick(index)}
                        className={`flex flex-col gap-2 text-left transition-transform hover:translate-y-[-2px] ${index === 0 ? 'cursor-pointer hover:opacity-80' : 'cursor-default'}`}
                        title={index === 0 ? "Click to view case study" : ""}
                    >
                         <div className="text-slate-900 dark:text-white">
                             {index === 0 && <Layout size={24} strokeWidth={1.5} />}
                             {index === 1 && <Smartphone size={24} strokeWidth={1.5} />}
                             {index === 2 && <Figma size={24} strokeWidth={1.5} />}
                         </div>
                         <p className="text-sm font-medium text-slate-600 dark:text-slate-400 leading-snug">
                             {item}
                         </p>
                    </button>
                ))}
            </div>
        </div>

        {/* Visual / Image Slider */}
        <div className="flex-1 flex justify-center w-full relative">
            <div className="relative w-full max-w-md aspect-[3/4] md:w-[28rem] md:h-[36rem]">
                {/* Abstract shape background */}
                <div className="absolute inset-0 bg-[#e3d2b6] dark:bg-obsidian-800 rounded-tr-[100px] rounded-bl-[100px] z-0 transform rotate-3 scale-105 opacity-50"></div>
                
                {/* Main Card */}
                <div className="absolute inset-0 bg-white dark:bg-obsidian-900 border border-black/5 dark:border-white/5 shadow-2xl z-10 flex flex-col overflow-hidden transform -rotate-2 hover:rotate-0 transition-transform duration-500 rounded-3xl">
                   
                   {/* Slider Content */}
                   <div className="relative h-full w-full">
                       {/* Slide 0: Abstract Art */}
                       <div className={`absolute inset-0 transition-opacity duration-700 ${currentSlide === 0 ? 'opacity-100' : 'opacity-0'}`}>
                           <div className="h-full w-full flex flex-col">
                                <div className="h-16 border-b border-black/5 dark:border-white/5 flex items-center justify-between px-6 bg-sand-50 dark:bg-obsidian-800/50">
                                    <div className="font-bold text-lg tracking-tight">Portfolio.</div>
                                    <div className="flex gap-2">
                                        <div className="w-2 h-2 rounded-full bg-slate-300 dark:bg-slate-600"></div>
                                        <div className="w-2 h-2 rounded-full bg-slate-300 dark:bg-slate-600"></div>
                                    </div>
                                </div>
                                <div className="flex-1 p-8 space-y-6 bg-white dark:bg-obsidian-900 relative">
                                    <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none" 
                                        style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '20px 20px' }}>
                                    </div>
                                    <div className="h-32 bg-sand-200 dark:bg-obsidian-800 rounded-2xl animate-pulse"></div>
                                    <div className="flex gap-4">
                                        <div className="h-24 w-1/3 bg-slate-100 dark:bg-obsidian-800 rounded-2xl"></div>
                                        <div className="h-24 w-2/3 bg-slate-100 dark:bg-obsidian-800 rounded-2xl"></div>
                                    </div>
                                    <div className="space-y-3 pt-4">
                                        <div className="h-2 w-full bg-slate-100 dark:bg-obsidian-800 rounded"></div>
                                        <div className="h-2 w-5/6 bg-slate-100 dark:bg-obsidian-800 rounded"></div>
                                        <div className="h-2 w-4/6 bg-slate-100 dark:bg-obsidian-800 rounded"></div>
                                    </div>
                                </div>
                           </div>
                       </div>

                       {/* Slide 1: Attendance App Image */}
                       <div className={`absolute inset-0 transition-opacity duration-700 ${currentSlide === 1 ? 'opacity-100' : 'opacity-0'}`}>
                           <img 
                                src={PROJECTS_DATA[0].image} 
                                alt="Attendance App Mockup" 
                                className="w-full h-full object-cover"
                           />
                           <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                           <div className="absolute bottom-6 left-6 text-white">
                               <p className="text-sm font-bold uppercase tracking-wider mb-1">Featured</p>
                               <p className="text-2xl font-bold">Attendance App</p>
                           </div>
                       </div>
                   </div>

                   {/* Slider Controls */}
                    <div className="absolute bottom-0 right-0 p-4 flex gap-2 z-20">
                        <button onClick={prevSlide} className="p-2 bg-white/20 hover:bg-white/40 backdrop-blur-md rounded-full text-slate-800 dark:text-white transition-colors" aria-label="Previous Slide">
                            <ChevronLeft size={20} />
                        </button>
                         <button onClick={nextSlide} className="p-2 bg-white/20 hover:bg-white/40 backdrop-blur-md rounded-full text-slate-800 dark:text-white transition-colors" aria-label="Next Slide">
                            <ChevronRight size={20} />
                        </button>
                    </div>

                    {/* Floating Metric Badge */}
                    <div className="absolute bottom-8 right-8 bg-black text-white dark:bg-white dark:text-black p-4 shadow-xl z-20 max-w-[160px] rounded-xl transform transition-transform hover:scale-105 cursor-pointer" onClick={() => handleStatClick(0)}>
                        <p className="text-xs uppercase tracking-widest mb-1 opacity-70">Metric</p>
                        <p className="font-bold text-2xl">30%</p>
                        <p className="text-xs mt-1">Increase in app usability</p>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;