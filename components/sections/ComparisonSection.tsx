"use client"

import { useState } from 'react';
import { RetentionChart } from '@/components/ui/RetentionChart';
import { SimulationEngine } from '@/lib/simulation-engine';
import { Scale } from 'lucide-react';

export function ComparisonSection() {
    const [data] = useState(() => {
        const period = 60;
        const smartReviewPoints = [1, 3, 7, 16, 35]; // Optimal-ish intervals
        const crammingPoints = [1, 2, 3, 4, 30, 31, 32, 33]; // The "Exam Week" panic



        // Simulate Smart Review
        let s_smart = 1.0;
        let last_r_smart = 0;

        // Simulate Cramming (Low stability, frequent bursts)
        let s_cram = 1.0;
        let last_r_cram = 0;

        const combinedData = [];

        for (let day = 0; day <= period; day++) {
            // --- Smart Logic ---
            let ret_smart = SimulationEngine.calculateRetention(day - last_r_smart, s_smart);
            if (smartReviewPoints.includes(day)) {
                ret_smart = 100;
                last_r_smart = day;
                s_smart = s_smart * 2.2; // Steady growth
            }

            // --- Cram Logic ---
            let ret_cram = SimulationEngine.calculateRetention(day - last_r_cram, s_cram);
            if (crammingPoints.includes(day)) {
                ret_cram = 100;
                last_r_cram = day;
                // Stability doesn't grow much with cramming usually, as it's rote memorization in short span
                s_cram = 1.2;
            }

            combinedData.push({
                day,
                retention: ret_smart,
                crammingRetention: ret_cram
            });
        }
        return combinedData;
    });

    return (
        <section className="min-h-screen py-20 px-4 md:px-8 bg-slate-50 border-t border-slate-200">
            <div className="max-w-5xl mx-auto">

                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 text-purple-700 text-sm font-medium mb-4">
                        <Scale className="w-4 h-4" />
                        The Comparison
                    </div>
                    <h2 className="text-4xl font-bold text-slate-900 mb-6">Work Smarter, Not Harder</h2>
                </div>

                <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 mb-12">
                    <h3 className="text-lg font-bold text-slate-700 mb-4 flex items-center gap-2">
                        <span className="w-3 h-3 bg-blue-500 rounded-full" /> Smart Schedule
                        <span className="text-slate-400 font-normal">vs</span>
                        <span className="w-3 h-3 bg-red-400 rounded-full" /> Cramming
                    </h3>
                    <RetentionChart data={data} className="h-[400px] bg-white border-0 p-0" />
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    <div className="p-6 bg-red-50 rounded-xl border border-red-100">
                        <h4 className="font-bold text-red-800 mb-2">Cramming Strategy</h4>
                        <p className="text-red-700/80 text-sm">
                            Reviewing 4 times in a row feels productive, but stability barely increases.
                            As soon as you stop, you forget almost everything within a week.
                        </p>
                        <div className="mt-4 text-xs font-mono text-red-600">
                            Total Reviews: 8<br />
                            Final Retention: ~5%
                        </div>
                    </div>

                    <div className="p-6 bg-blue-50 rounded-xl border border-blue-100">
                        <h4 className="font-bold text-blue-800 mb-2">Smart Strategy</h4>
                        <p className="text-blue-700/80 text-sm">
                            By waiting until you almost forget, your brain is forced to work harder,
                            drastically increasing the memory&apos;s stability.
                        </p>
                        <div className="mt-4 text-xs font-mono text-blue-600">
                            Total Reviews: 5 (Less work!)<br />
                            Final Retention: ~95%
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
}
