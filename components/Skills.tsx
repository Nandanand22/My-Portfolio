import React from 'react';
import { SKILLS_DATA, CERTIFICATIONS } from '../constants';
import { SectionId } from '../types';
import { PenTool, Code, Award } from 'lucide-react';

const Skills: React.FC = () => {
  return (
    <section id={SectionId.SKILLS} className="py-24 bg-white dark:bg-obsidian-950 relative border-t border-black/5 dark:border-white/5">
      <div className="container mx-auto px-6">
        <div className="flex flex-col items-center text-center mb-20">
            <span className="text-sm font-bold uppercase tracking-widest text-slate-500 mb-3">Expertise</span>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-slate-900 dark:text-white">Skills & Tools</h2>
            <div className="h-0.5 w-24 bg-black dark:bg-white"></div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
            
            {/* Design */}
            <div className="bg-sand-50 dark:bg-obsidian-900 p-10 border border-black/5 dark:border-white/5 hover:border-black/20 dark:hover:border-white/20 transition-all duration-300">
                <div className="w-14 h-14 bg-black dark:bg-white text-white dark:text-black flex items-center justify-center mb-8 rounded-none">
                    <PenTool size={24} />
                </div>
                <h3 className="text-2xl font-bold mb-6 text-slate-900 dark:text-white">UI/UX Design</h3>
                <div className="flex flex-wrap gap-2">
                    {SKILLS_DATA.uiUx.map((skill, i) => (
                        <span key={i} className="px-4 py-2 bg-white dark:bg-obsidian-950 border border-slate-200 dark:border-slate-700 text-sm font-medium text-slate-700 dark:text-slate-300">
                            {skill}
                        </span>
                    ))}
                </div>
            </div>

            {/* Development */}
            <div className="bg-sand-50 dark:bg-obsidian-900 p-10 border border-black/5 dark:border-white/5 hover:border-black/20 dark:hover:border-white/20 transition-all duration-300">
                 <div className="w-14 h-14 bg-black dark:bg-white text-white dark:text-black flex items-center justify-center mb-8 rounded-none">
                    <Code size={24} />
                </div>
                <h3 className="text-2xl font-bold mb-6 text-slate-900 dark:text-white">Development</h3>
                <div className="flex flex-wrap gap-2 mb-8">
                    {SKILLS_DATA.technical.map((skill, i) => (
                        <span key={i} className="px-4 py-2 bg-white dark:bg-obsidian-950 border border-slate-200 dark:border-slate-700 text-sm font-medium text-slate-700 dark:text-slate-300">
                            {skill}
                        </span>
                    ))}
                </div>
                <div>
                     <p className="text-xs uppercase tracking-widest font-bold text-slate-500 mb-4">Software & Tools</p>
                     <div className="grid grid-cols-2 gap-3">
                        {SKILLS_DATA.tools.map((tool, i) => (
                            <div key={i} className="flex items-center gap-2 text-slate-700 dark:text-slate-300 text-sm">
                                <span className="w-1.5 h-1.5 bg-slate-400 rounded-full"></span>
                                {tool}
                            </div>
                        ))}
                     </div>
                </div>
            </div>

            {/* Certifications */}
            <div className="bg-sand-50 dark:bg-obsidian-900 p-10 border border-black/5 dark:border-white/5 hover:border-black/20 dark:hover:border-white/20 transition-all duration-300">
                <div className="w-14 h-14 bg-black dark:bg-white text-white dark:text-black flex items-center justify-center mb-8 rounded-none">
                    <Award size={24} />
                </div>
                <h3 className="text-2xl font-bold mb-6 text-slate-900 dark:text-white">Certifications</h3>
                <ul className="space-y-4">
                    {CERTIFICATIONS.map((cert, i) => (
                        <li key={i} className="flex items-start gap-4 text-sm text-slate-700 dark:text-slate-300 pb-4 border-b border-black/5 dark:border-white/5 last:border-0 last:pb-0">
                             <span className="font-serif italic text-slate-400 text-lg">0{i+1}</span>
                             <span className="mt-1">{cert}</span>
                        </li>
                    ))}
                </ul>
            </div>

        </div>
      </div>
    </section>
  );
};

export default Skills;