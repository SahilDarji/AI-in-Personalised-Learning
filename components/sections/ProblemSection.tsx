"use client"

import { useState } from 'react';
import { RetentionChart } from '@/components/ui/RetentionChart';
import { SimulationEngine } from '@/lib/simulation-engine';
import { Brain, ArrowDown } from 'lucide-react';

export function ProblemSection() {
    // Generate curve in initializer to avoid effect
    const [data] = useState(() => SimulationEngine.generateCurve(0, 14, 2));

    return (
        <section className="min-h-screen flex flex-col items-center justify-center p-8 bg-slate-50">
            <div className="max-w-4xl w-full grid md:grid-cols-2 gap-12 items-center">

                {/* Text Content */}
                <div className="space-y-6">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-100 text-red-700 text-sm font-medium">
                        <Brain className="w-4 h-4" />
                        The Problem
                    </div>
                    <h2 className="text-4xl font-bold text-slate-900 leading-tight">
                        The Moment You Learn, <br />
                        <span className="text-red-500">You Start Forgetting.</span>
                    </h2>
                    <p className="text-lg text-slate-600 leading-relaxed">
                        Hermann Ebbinghaus discovered this in 1885. Without active review, memory decay is exponential.
                        <br /><br />
                        Within just <strong>2 days</strong>, you might lose over <strong>50%</strong> of what you learned in a lecture.
                    </p>

                    <div className="flex items-center gap-4 text-sm text-slate-500">
                        <ArrowDown className="w-5 h-5 animate-bounce" />
                        <span>Scroll to find the solution</span>
                    </div>
                </div>

                {/* Visual */}
                <div className="relative">
                    <div className="absolute -top-10 -left-10 w-20 h-20 bg-red-500/10 rounded-full blur-2xl" />
                    <div className="bg-white p-6 rounded-2xl shadow-xl border border-slate-100">
                        <h3 className="text-sm font-semibold text-slate-500 mb-4 uppercase tracking-wider">Natural Memory Decay</h3>
                        <RetentionChart data={data} showThreshold={false} className="h-[250px] border-none bg-white p-0" />
                        <div className="mt-4 flex justify-between text-xs text-slate-400">
                            <span>Day 0 (100%)</span>
                            <span>Day 7 (~10%)</span>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
}
