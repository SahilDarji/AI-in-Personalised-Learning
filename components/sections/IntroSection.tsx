"use client"

import { BrainCircuit, ChevronDown } from 'lucide-react';

// Actually, simple elements are fine.

export function IntroSection() {
    const scrollToStart = () => {
        const el = document.getElementById('problem-section');
        el?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <section className="h-screen flex flex-col items-center justify-center bg-gradient-to-b from-slate-50 to-white text-center px-4">
            <div className="bg-blue-100 p-4 rounded-full mb-8 animate-pulse">
                <BrainCircuit className="w-12 h-12 text-blue-600" />
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 tracking-tight mb-6">
                Smart Review <br /> <span className="text-blue-600">Simulator</span>
            </h1>
            <p className="text-xl text-slate-500 max-w-2xl mb-12 leading-relaxed">
                Why do we forget? And how can a simple algorithm verify that you remember everything you learn, forever?
            </p>

            <button
                onClick={scrollToStart}
                className="group flex items-center gap-2 px-8 py-4 bg-slate-900 text-white rounded-full font-semibold hover:bg-slate-800 transition-all hover:scale-105"
            >
                Start the Journey
                <ChevronDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
            </button>
        </section>
    );
}
