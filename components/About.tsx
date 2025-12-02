import React from 'react';
import { ABOUT_ME, EDUCATION_DATA, EXPERIENCE_DATA } from '../constants';
import { SectionId } from '../types';
import { Briefcase, GraduationCap, User } from 'lucide-react';

const About: React.FC = () => {
  return (
    <section id={SectionId.ABOUT} className="py-24 bg-white dark:bg-obsidian-950 border-t border-black/5 dark:border-white/5">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row gap-16">
            
            {/* Title Column */}
            <div className="md:w-1/3">
                <div className="sticky top-24">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight text-slate-900 dark:text-white">About Me</h2>
                    <div className="h-1 w-20 bg-black dark:bg-white mb-8"></div>
                    <p className="text-lg text-slate-600 dark:text-slate-400 font-medium leading-relaxed mb-8">
                        My journey in design and development is driven by a passion for solving real problems.
                    </p>
                    <div className="hidden md:block p-6 bg-sand-200 dark:bg-obsidian-900 rounded-none border-l-4 border-black dark:border-white">
                        <p className="italic text-slate-800 dark:text-slate-200 font-serif text-lg">
                            "I aim to design meaningful digital experiences that balance usability, creativity, and visual clarity."
                        </p>
                    </div>
                </div>
            </div>

            {/* Content Column */}
            <div className="md:w-2/3 space-y-16">
                
                {/* Biography */}
                <div className="space-y-6">
                    <h3 className="text-2xl font-bold flex items-center gap-3 uppercase tracking-wider text-sm text-slate-500 dark:text-slate-400">
                        <User size={18} /> Biography
                    </h3>
                    <p className="text-xl text-slate-800 dark:text-slate-300 leading-relaxed font-light">
                        {ABOUT_ME}
                    </p>
                </div>
                
                {/* Experience */}
                <div id={SectionId.EXPERIENCE} className="space-y-8">
                    <h3 className="text-2xl font-bold flex items-center gap-3 uppercase tracking-wider text-sm text-slate-500 dark:text-slate-400">
                        <Briefcase size={18} /> Experience
                    </h3>
                    <div className="space-y-6">
                        {EXPERIENCE_DATA.map((exp, index) => (
                            <div key={index} className="group relative pl-8 border-l border-slate-300 dark:border-slate-700">
                                <div className="absolute left-[-5px] top-2 w-2.5 h-2.5 bg-black dark:bg-white rounded-full group-hover:scale-150 transition-transform"></div>
                                <div className="flex flex-col md:flex-row md:justify-between md:items-baseline gap-2 mb-2">
                                    <h4 className="text-2xl font-bold text-slate-900 dark:text-white">{exp.role}</h4>
                                    <span className="text-sm font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                                        {exp.duration}
                                    </span>
                                </div>
                                <p className="text-lg text-slate-700 dark:text-slate-300 font-medium mb-4">{exp.company}</p>
                                <ul className="space-y-2">
                                    {exp.description.map((item, i) => (
                                        <li key={i} className="text-slate-600 dark:text-slate-400">
                                            — {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Education */}
                <div className="space-y-8">
                    <h3 className="text-2xl font-bold flex items-center gap-3 uppercase tracking-wider text-sm text-slate-500 dark:text-slate-400">
                        <GraduationCap size={18} /> Education
                    </h3>
                    <div className="grid gap-6">
                        {EDUCATION_DATA.map((edu, index) => (
                             <div key={index} className="bg-sand-50 dark:bg-obsidian-900 p-8 border border-black/5 dark:border-white/5 hover:border-black/20 dark:hover:border-white/20 transition-colors">
                                <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                                    <div>
                                        <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{edu.institution}</h4>
                                        <p className="text-slate-600 dark:text-slate-400">{edu.degree}</p>
                                    </div>
                                    <div className="text-right sm:text-left">
                                         <span className="block text-2xl font-bold text-slate-900 dark:text-white">{edu.year}</span>
                                         <span className="text-sm text-slate-500 uppercase tracking-wide font-medium">CGPA: {edu.cgpa}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
      </div>
    </section>
  );
};

export default About;