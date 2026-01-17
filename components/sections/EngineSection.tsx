"use client"

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Brain, Calculator, CalendarClock, ArrowRight, CheckCircle2, XCircle } from 'lucide-react';
import { RetentionChart } from '@/components/ui/RetentionChart';
import { MathBlock } from '@/components/ui/MathBlock';
import { SimulationEngine } from '@/lib/simulation-engine';
import { cn } from '@/lib/utils';

export function EngineSection() {
    // --- STATE ---
    // 1. BKT State (The Brain)
    const [mastery, setMastery] = useState(0.5); // Start at 50% mastery
    const [history, setHistory] = useState<boolean[]>([]); // Track correct/incorrect

    // 2. ML State (The Prediction) - Derived from mastery
    const [decayRate, setDecayRate] = useState(0.1);
    const [predictionData, setPredictionData] = useState<{ day: number, retention: number }[]>([]);

    // 3. Optimization State (The Schedule)
    const [optimalDay, setOptimalDay] = useState(0);

    // --- LOGIC ---

    // Update Prediction & Schedule whenever Mastery changes
    useEffect(() => {
        // Decay = BaseDecay * (1 - Mastery * 0.8)
        const newDecay = 0.25 * (1 - mastery * 0.9) + 0.02;
        setDecayRate(newDecay);

        // Generate Curve: R = M * e^(-dt)
        const curve = [];
        let hitTarget = false;
        let foundDay = -1;

        for (let t = 0; t <= 30; t++) {
            const retention = (mastery * Math.exp(-newDecay * t)) * 100;
            curve.push({ day: t, retention });

            // Find optimal review day (closest to 85%)
            if (!hitTarget && retention < 85) {
                foundDay = t;
                hitTarget = true;
            }
        }
        setPredictionData(curve);
        setOptimalDay(foundDay === -1 ? 1 : foundDay); // Default to 1 if immediate

    }, [mastery]);

    const handleUpdateMastery = (correct: boolean) => {
        setMastery(prev => {
            if (correct) {
                return Math.min(0.99, prev + (1 - prev) * 0.4);
            } else {
                return Math.max(0.1, prev * 0.6);
            }
        });
        setHistory(prev => [...prev, correct]);
    };

    return (
        <section className="min-h-screen bg-slate-50 py-24 relative">
            <div className="max-w-7xl mx-auto px-6">

                {/* HEADLINE */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-100 text-violet-700 text-sm font-medium mb-6">
                        <Brain className="w-4 h-4" />
                        The Intelligence Engine
                    </div>
                    <h2 className="text-5xl font-bold text-slate-900 mb-6 tracking-tight">
                        How We Read Your Mind
                    </h2>
                    <p className="text-xl text-slate-500 max-w-3xl mx-auto">
                        See how the system updates your optimal review time <strong>instantly</strong> as you learn.
                    </p>
                </div>

                <div className="grid lg:grid-cols-12 gap-12 items-start">

                    {/* --- LEFT COLUMN (SCROLLABLE LOGIC) --- */}
                    <div className="lg:col-span-7 space-y-32">

                        {/* STAGE 1: BKT */}
                        <div className="space-y-6">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-12 h-12 bg-white border-2 border-violet-100 rounded-full flex items-center justify-center text-xl font-bold text-violet-400 shadow-sm">1</div>
                                <h3 className="text-2xl font-bold text-slate-800">The Brain (BKT)</h3>
                            </div>

                            <p className="text-slate-600 leading-relaxed">
                                We track your "Mastery" probability. Click below to simulate answering questions and watch the
                                <strong> Result Panel</strong> on the right update instantly using Bayes' Theorem.
                            </p>

                            <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm">
                                <div className="flex gap-3 mb-6">
                                    <button
                                        onClick={() => handleUpdateMastery(true)}
                                        className="flex-1 flex items-center justify-center gap-2 py-4 rounded-xl bg-green-50 text-green-700 font-bold hover:bg-green-100 transition-colors border border-green-200"
                                    >
                                        <CheckCircle2 className="w-5 h-5" /> Correct
                                    </button>
                                    <button
                                        onClick={() => handleUpdateMastery(false)}
                                        className="flex-1 flex items-center justify-center gap-2 py-4 rounded-xl bg-red-50 text-red-700 font-bold hover:bg-red-100 transition-colors border border-red-200"
                                    >
                                        <XCircle className="w-5 h-5" /> Incorrect
                                    </button>
                                </div>
                                <MathBlock
                                    label="Bayesian Update"
                                    formula="P(K|A) = P(A|K) · P(K) / P(A)"
                                    realValue={`New Mastery = ${(mastery * 100).toFixed(1)}%`}
                                    description="Your current probability of knowing the concept."
                                    className="bg-slate-50 border-none"
                                />
                            </div>
                        </div>

                        {/* STAGE 2: PREDICTION */}
                        <div className="space-y-6">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-12 h-12 bg-white border-2 border-violet-100 rounded-full flex items-center justify-center text-xl font-bold text-violet-400 shadow-sm">2</div>
                                <h3 className="text-2xl font-bold text-slate-800">The Prediction (ML)</h3>
                            </div>

                            <p className="text-slate-600 leading-relaxed">
                                We project your future forgetting curve. Notice how higher mastery leads to a flatter curve (slower decay).
                            </p>

                            <div className="p-2 bg-white rounded-2xl border border-slate-200 shadow-sm">
                                <RetentionChart data={predictionData} className="h-[300px] w-full" showThreshold={true} />
                            </div>

                            {/* GRAPH DECODER */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                                <div className="bg-blue-50 p-3 rounded-lg border border-blue-100">
                                    <div className="font-bold text-blue-700 mb-1">The Curve 📉</div>
                                    <div className="text-blue-600/80">Shows your memory usage fading over time without practice.</div>
                                </div>
                                <div className="bg-red-50 p-3 rounded-lg border border-red-100">
                                    <div className="font-bold text-red-700 mb-1">The Red Line 🚫</div>
                                    <div className="text-red-600/80">The "Danger Zone" (85%). We must review before hitting this.</div>
                                </div>
                                <div className="bg-emerald-50 p-3 rounded-lg border border-emerald-100">
                                    <div className="font-bold text-emerald-700 mb-1">The Goal 🎯</div>
                                    <div className="text-emerald-600/80">Find exactly when the curve crosses the red line.</div>
                                </div>
                            </div>

                            <MathBlock
                                label="Exponential Decay Model"
                                formula="R = M · e<sup>-dt</sup>"
                                realValue={`85% = ${(mastery * 100).toFixed(0)}% · e^(-${decayRate.toFixed(3)} · ${optimalDay})`}
                                description="Solving for when Retention (R) drops to 85%."
                                className="bg-white"
                            />
                        </div>

                    </div>

                    {/* --- RIGHT COLUMN (STICKY RESULT) --- */}
                    <div className="lg:col-span-5 relative">
                        <div className="sticky top-24 space-y-6">

                            {/* RESULT CARD */}
                            <div className="bg-slate-900 text-white p-8 rounded-3xl shadow-2xl border border-slate-800 overflow-hidden relative">
                                <div className="absolute top-0 right-0 p-32 bg-violet-600/20 blur-[80px] rounded-full pointer-events-none" />

                                <div className="relative z-10 text-center">
                                    <div className="text-slate-400 uppercase tracking-widest text-xs font-bold mb-4">
                                        Optimization Result
                                    </div>

                                    <motion.div
                                        key={optimalDay}
                                        initial={{ scale: 0.9, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        className="mb-2"
                                    >
                                        <span className="text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-emerald-400">
                                            {optimalDay}
                                        </span>
                                        <span className="text-2xl font-bold text-slate-500 ml-2">days</span>
                                    </motion.div>

                                    <div className="text-slate-400 mb-8 border-b border-white/10 pb-8">
                                        Until Next Review
                                    </div>

                                    <div className="grid grid-cols-2 gap-4 text-left">
                                        <div>
                                            <div className="text-xs text-slate-500 mb-1">Current Mastery</div>
                                            <div className="text-xl font-bold text-white">{(mastery * 100).toFixed(0)}%</div>
                                        </div>
                                        <div>
                                            <div className="text-xs text-slate-500 mb-1">Estimated Decay</div>
                                            <div className="text-xl font-bold text-white">{decayRate.toFixed(3)}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* EXPLANATION CARD */}
                            <div className="bg-emerald-50 p-6 rounded-2xl border border-emerald-100 text-emerald-900 text-sm leading-relaxed">
                                <p>
                                    <strong>Why this matters:</strong> Instead of reviewing every day (wasteful) or every month (too late),
                                    the algorithm solved <strong>t = {optimalDay}</strong> because that is exactly when your memory will hit the critical 85% threshold.
                                </p>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
