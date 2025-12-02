import React, { useState } from 'react';
import { PERSONAL_DETAILS } from '../constants';
import { SectionId } from '../types';
import { supabase } from '../supabaseClient'; 
import emailjs from '@emailjs/browser';
import { Mail, Phone, MapPin, Send, Github, Linkedin, Instagram, CheckCircle, AlertCircle } from 'lucide-react';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.email || !formData.message) {
        setStatus('error');
        return;
    }

    setStatus('submitting');

    try {
        // --- 1. Send Email via EmailJS ---
        console.log("Sending email...");
        
        // We use (import.meta as any) here to fix the red TypeScript errors
        const serviceID = (import.meta as any).env.VITE_EMAILJS_SERVICE_ID;
        const templateID = (import.meta as any).env.VITE_EMAILJS_TEMPLATE_ID;
        const publicKey = (import.meta as any).env.VITE_EMAILJS_PUBLIC_KEY;

        await emailjs.send(
            serviceID,
            templateID,
            {
                name: formData.name,
                email: formData.email,
                subject: formData.subject || 'No Subject',
                message: formData.message,
            },
            publicKey
        );
        console.log("Email sent successfully!");

        // --- 2. Save to Supabase (Database) ---
        try {
            const { error } = await supabase
                .from('contact_messages')
                .insert([
                    { 
                        name: formData.name, 
                        email: formData.email, 
                        subject: formData.subject, 
                        message: formData.message 
                    }
                ]);
            if (error) console.error("Supabase error:", error);
        } catch (dbErr) {
            console.error("Database save failed, but email was sent.", dbErr);
        }

        // --- Success State ---
        setStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
        
        // Reset success message after 5 seconds
        setTimeout(() => setStatus('idle'), 5000);
        
    } catch (err) {
        console.error('Failed to send message:', err);
        setStatus('error');
    }
  };

  return (
    <section id={SectionId.CONTACT} className="py-24 bg-sand-200 dark:bg-obsidian-950 transition-colors duration-300">
      <div className="container mx-auto px-6">
        
        <div className="grid md:grid-cols-2 gap-16 mb-24">
            {/* Contact Info */}
            <div className="space-y-10">
                 <div>
                    <h2 className="text-5xl md:text-6xl font-bold mb-8 text-slate-900 dark:text-white tracking-tight">Let's Talk.</h2>
                    <p className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed font-light">
                        Open for <span className="text-black dark:text-white font-medium border-b border-black dark:border-white pb-0.5">internships</span>, <span className="text-black dark:text-white font-medium border-b border-black dark:border-white pb-0.5">collaborations</span>, and freelance projects.
                    </p>
                 </div>

                 <div className="space-y-8 pt-8 border-t border-black/10 dark:border-white/10">
                    <div className="group flex items-start gap-6 transition-all hover:translate-x-2">
                        <div className="w-12 h-12 flex items-center justify-center bg-white dark:bg-obsidian-900 border border-black/10 dark:border-white/10 text-black dark:text-white rounded-xl shadow-sm">
                            <Mail size={20} />
                        </div>
                        <div>
                            <p className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-1">Email</p>
                            <a href={`mailto:${PERSONAL_DETAILS.email}`} className="text-xl font-medium text-slate-900 dark:text-white hover:underline decoration-1 underline-offset-4">
                                {PERSONAL_DETAILS.email}
                            </a>
                        </div>
                    </div>

                    <div className="group flex items-start gap-6 transition-all hover:translate-x-2">
                        <div className="w-12 h-12 flex items-center justify-center bg-white dark:bg-obsidian-900 border border-black/10 dark:border-white/10 text-black dark:text-white rounded-xl shadow-sm">
                            <Phone size={20} />
                        </div>
                        <div>
                            <p className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-1">Phone</p>
                            <a href={`tel:${PERSONAL_DETAILS.phone}`} className="text-xl font-medium text-slate-900 dark:text-white hover:underline decoration-1 underline-offset-4">
                                {PERSONAL_DETAILS.phone}
                            </a>
                        </div>
                    </div>

                     <div className="group flex items-start gap-6 transition-all hover:translate-x-2">
                        <div className="w-12 h-12 flex items-center justify-center bg-white dark:bg-obsidian-900 border border-black/10 dark:border-white/10 text-black dark:text-white rounded-xl shadow-sm">
                            <MapPin size={20} />
                        </div>
                        <div>
                            <p className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-1">Location</p>
                            <p className="text-xl font-medium text-slate-900 dark:text-white max-w-xs">
                                {PERSONAL_DETAILS.address}
                            </p>
                        </div>
                    </div>
                 </div>
            </div>

            {/* Form */}
            <div className="bg-white dark:bg-obsidian-900 p-8 md:p-10 shadow-2xl border border-black/5 dark:border-white/5 rounded-3xl">
                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Name</label>
                            <input 
                                type="text" 
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full px-4 py-4 bg-sand-50 dark:bg-obsidian-800 border-b-2 border-slate-200 dark:border-slate-700 focus:border-black dark:focus:border-white outline-none transition-colors rounded-t-lg text-slate-900 dark:text-white" 
                                placeholder="John Doe" 
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Email</label>
                            <input 
                                type="email" 
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full px-4 py-4 bg-sand-50 dark:bg-obsidian-800 border-b-2 border-slate-200 dark:border-slate-700 focus:border-black dark:focus:border-white outline-none transition-colors rounded-t-lg text-slate-900 dark:text-white" 
                                placeholder="john@example.com" 
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Subject</label>
                        <input 
                            type="text" 
                            name="subject"
                            value={formData.subject}
                            onChange={handleChange}
                            className="w-full px-4 py-4 bg-sand-50 dark:bg-obsidian-800 border-b-2 border-slate-200 dark:border-slate-700 focus:border-black dark:focus:border-white outline-none transition-colors rounded-t-lg text-slate-900 dark:text-white" 
                            placeholder="Project Inquiry" 
                        />
                    </div>
                     <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Message</label>
                        <textarea 
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            rows={4} 
                            className="w-full px-4 py-4 bg-sand-50 dark:bg-obsidian-800 border-b-2 border-slate-200 dark:border-slate-700 focus:border-black dark:focus:border-white outline-none transition-colors resize-none rounded-t-lg text-slate-900 dark:text-white" 
                            placeholder="Tell me about your project..."
                        ></textarea>
                    </div>

                    {status === 'error' && (
                        <div className="flex items-center gap-2 text-red-600 text-sm bg-red-50 p-3 rounded-lg">
                            <AlertCircle size={16} /> Failed to send message. Please try again.
                        </div>
                    )}

                    {status === 'success' ? (
                        <div className="w-full py-5 bg-green-600 text-white font-bold uppercase tracking-widest rounded-xl flex justify-center items-center gap-3 animate-in fade-in">
                            Message Sent <CheckCircle size={20} />
                        </div>
                    ) : (
                        <button 
                            type="submit" 
                            disabled={status === 'submitting'}
                            className="w-full py-5 bg-black hover:bg-slate-800 text-white dark:bg-white dark:text-black dark:hover:bg-slate-200 font-bold uppercase tracking-widest transition-all rounded-xl flex justify-center items-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {status === 'submitting' ? 'Sending...' : 'Send Message'} <Send size={16} />
                        </button>
                    )}
                </form>
            </div>
        </div>

        {/* Footer */}
        <div className="border-t border-black/10 dark:border-white/10 pt-10 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-slate-500 text-sm font-medium">
                © {new Date().getFullYear()} M. Nandana Anand.
            </p>
            <div className="flex gap-6">
                <a href="#" className="text-slate-400 hover:text-black dark:hover:text-white transition-colors" target="_blank" rel="noopener noreferrer"><Github size={20} /></a>
                <a href="#" className="text-slate-400 hover:text-black dark:hover:text-white transition-colors" target="_blank" rel="noopener noreferrer"><Linkedin size={20} /></a>
                <a href="#" className="text-slate-400 hover:text-black dark:hover:text-white transition-colors" target="_blank" rel="noopener noreferrer"><Instagram size={20} /></a>
            </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;