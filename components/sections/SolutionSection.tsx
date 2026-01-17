"use client"

import { useState, useEffect, useCallback } from 'react';
import { RetentionChart } from '@/components/ui/RetentionChart';
import { SimulationEngine, type SimulationHistoryItem } from '@/lib/simulation-engine';
import { RefreshCw, Zap, Play, Pause, FastForward } from 'lucide-react';
import { cn } from '@/lib/utils';

export function SolutionSection() {
    const [day, setDay] = useState(0);
    const [stability, setStability] = useState(1.0); // Start with 1 day stability
    const [history, setHistory] = useState<SimulationHistoryItem[]>([
        { day: 0, retention: 100, stability: 1.0, reviewType: 'learn' }
    ]);
    const [isPlaying, setIsPlaying] = useState(false);
    const [lastReviewDay, setLastReviewDay] = useState(0);



    // Sync state to ref for the timer
    // A better pattern for a "Game Loop" in React:


    // Effect to update the ref when React state changes (for UI consistency if mixed)
    // Or just drive everything from the Ref and sync to State for render?
    // Let's keep it simple: The logic is in `advanceDay` which is called by the user or the timer.
    // We will pass the *current state* into the updater to ensure freshness.

    // Refactored Advance Day
    const handleAdvanceDay = useCallback(() => {
        setDay(currentDay => {
            const nextDay = currentDay + 1;
            const daysElapsed = nextDay - lastReviewDay;
            const ret = SimulationEngine.calculateRetention(daysElapsed, stability);

            const newItem: SimulationHistoryItem = {
                day: nextDay,
                retention: ret,
                stability: stability,
                reviewType: null
            };

            setHistory(prev => [...prev, newItem]);

            // Auto-pause if retention is too low (forgotten)
            if (ret < 20 && isPlaying) {
                setIsPlaying(false);
            }

            return nextDay;
        });
    }, [lastReviewDay, stability, isPlaying]);

    // Re-bind the interval to the fresh handler
    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isPlaying) {
            interval = setInterval(handleAdvanceDay, 200);
        }
        return () => clearInterval(interval);
    }, [isPlaying, handleAdvanceDay]);

    const handleReview = (rating: 'easy' | 'good' | 'hard') => {
        // 1. Update Stability
        const newStability = SimulationEngine.getNextStability(stability, rating);
        setStability(newStability);

        // 2. Reset Retention to 100
        const newHistoryItem: SimulationHistoryItem = {
            day: day, // Review happens on current day
            retention: 100,
            stability: newStability,
            reviewType: 'review'
        };

        // We replace the last history item (the decay state of today) with the review state?
        // Or just append? Appending on the same day looks weird on graph. 
        // Let's replace the entry for 'today' if it exists, or append.
        setHistory(prev => {
            const copy = [...prev];
            // If the last item is today, overwrite it (we reviewed today)
            if (copy.length > 0 && copy[copy.length - 1].day === day) {
                copy[copy.length - 1] = newHistoryItem;
            } else {
                copy.push(newHistoryItem);
            }
            return copy;
        });

        // 3. Update Last Review Day
        setLastReviewDay(day);
    };

    const handleReset = () => {
        setIsPlaying(false);
        setDay(0);
        setStability(1.0);
        setLastReviewDay(0);
        setHistory([{ day: 0, retention: 100, stability: 1.0, reviewType: 'learn' }]);
    };

    const currentRetention = history[history.length - 1]?.retention || 100;

    return (
        <section className="min-h-screen py-20 px-4 md:px-8 bg-white border-t border-slate-100">
            <div className="max-w-6xl mx-auto">

                <div className="mb-12 text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-medium mb-4">
                        <RefreshCw className="w-4 h-4" />
                        The Solution
                    </div>
                    <h2 className="text-4xl font-bold text-slate-900 mb-4">Space Your Reviews</h2>
                    <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                        Instead of cramming, review just before you forget. Each successful review strengthens the memory,
                        making the &quot;Stability&quot; curve flatter.
                    </p>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">

                    {/* Controls Panel */}
                    <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 h-fit space-y-8">

                        {/* Dashboard Stats */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
                                <div className="text-xs text-slate-500 uppercase font-semibold">Stability</div>
                                <div className="text-2xl font-bold text-blue-600">{stability.toFixed(1)} <span className="text-sm text-slate-400 font-normal">days</span></div>
                            </div>
                            <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
                                <div className="text-xs text-slate-500 uppercase font-semibold">Retention</div>
                                <div className={cn("text-2xl font-bold", currentRetention > 80 ? "text-green-500" : currentRetention > 40 ? "text-orange-500" : "text-red-500")}>
                                    {currentRetention.toFixed(0)}%
                                </div>
                            </div>
                        </div>

                        {/* Time Controls */}
                        <div>
                            <label className="text-sm font-medium text-slate-700 mb-2 block">Simulation Time</label>
                            <div className="flex items-center gap-2">
                                <button onClick={() => setIsPlaying(!isPlaying)} className="flex-1 flex items-center justify-center gap-2 bg-slate-900 text-white py-3 rounded-lg hover:bg-slate-800 transition-colors">
                                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                                    {isPlaying ? "Pause" : "Start"}
                                </button>
                                <button onClick={handleAdvanceDay} className="p-3 bg-white border border-slate-200 rounded-lg hover:bg-slate-50">
                                    <FastForward className="w-4 h-4 text-slate-600" />
                                </button>
                                <button onClick={handleReset} className="p-3 bg-white border border-slate-200 rounded-lg hover:bg-red-50">
                                    <RefreshCw className="w-4 h-4 text-red-500" />
                                </button>
                            </div>
                            <p className="text-xs text-slate-400 mt-2 text-center">Day {day}</p>
                        </div>

                        <hr className="border-slate-200" />

                        {/* Review Actions */}
                        <div>
                            <label className="text-sm font-medium text-slate-700 mb-2 block">Review Action</label>
                            <div className="grid grid-cols-3 gap-2">
                                <button onClick={() => handleReview('hard')} className="px-3 py-4 bg-orange-100 hover:bg-orange-200 text-orange-700 rounded-lg text-sm font-medium transition-colors">
                                    Hard <br /><span className="text-xs opacity-75">1.2x</span>
                                </button>
                                <button onClick={() => handleReview('good')} className="px-3 py-4 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg text-sm font-medium transition-colors">
                                    Good <br /><span className="text-xs opacity-75">2.0x</span>
                                </button>
                                <button onClick={() => handleReview('easy')} className="px-3 py-4 bg-green-100 hover:bg-green-200 text-green-700 rounded-lg text-sm font-medium transition-colors">
                                    Easy <br /><span className="text-xs opacity-75">2.5x</span>
                                </button>
                            </div>
                            <p className="text-xs text-slate-500 mt-3 leading-relaxed">
                                <strong>Tip:</strong> Wait for retention to drop to ~80% before reviewing for maximum efficiency!
                            </p>
                        </div>

                    </div>

                    {/* Main Graph Area */}
                    <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden p-6 relative">
                        <div className="absolute top-0 right-0 p-6 opacity-10">
                            <Zap className="w-32 h-32 text-blue-600" />
                        </div>
                        <h3 className="text-lg font-bold text-slate-800 mb-6">Retention Timeline</h3>
                        <RetentionChart data={history} className="h-[400px] border-none bg-slate-50/50" />

                        {/* Educational Overlay/Explanation */}
                        {history.length < 5 && (
                            <div className="mt-6 p-4 bg-blue-50 text-blue-800 text-sm rounded-lg border border-blue-100">
                                Press <strong>Start</strong> to watch your memory decay. When it hits the yellow zone, press a <strong>Review</strong> button to boost it back up!
                            </div>
                        )}
                    </div>

                </div>
            </div>
        </section >
    );
}
