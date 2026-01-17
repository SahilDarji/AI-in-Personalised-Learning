"use client"

import { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { cn } from '@/lib/utils';

interface RetentionDataPoint {
    day: number;
    retention: number;
    crammingRetention?: number;
    [key: string]: number | string | undefined | null;
}

interface RetentionChartProps {
    data: RetentionDataPoint[];
    className?: string;
    showThreshold?: boolean;
    targetRetention?: number;
}

export function RetentionChart({ data, className, showThreshold = true, targetRetention = 85 }: RetentionChartProps) {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return <div className={cn("w-full h-[300px] bg-slate-50/50 rounded-lg border border-slate-200 p-4 animate-pulse", className)} />;
    }

    return (
        <div className={cn("w-full h-[300px] bg-slate-50 rounded-lg border border-slate-200 p-4", className)}>
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                    data={data}
                    margin={{
                        top: 10,
                        right: 30,
                        left: 0,
                        bottom: 0,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                    <XAxis
                        dataKey="day"
                        label={{ value: 'Days Passed', position: 'insideBottomRight', offset: -5 }}
                        tick={{ fill: '#64748b', fontSize: 12 }}
                        tickLine={false}
                        axisLine={false}
                    />
                    <YAxis
                        domain={[0, 100]}
                        unit="%"
                        tick={{ fill: '#64748b', fontSize: 12 }}
                        tickLine={false}
                        axisLine={false}
                    />
                    <Tooltip
                        contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                    />

                    <Area
                        type="monotone"
                        dataKey="retention"
                        stroke="#2563eb"
                        fill="#3b82f6"
                        fillOpacity={0.2}
                        strokeWidth={3}
                        animationDuration={500}
                        name="Retention"
                    />

                    {/* Optional Comparison Line if data has 'crammingRetention' */}
                    {data[0]?.crammingRetention !== undefined && (
                        <Area
                            type="monotone"
                            dataKey="crammingRetention"
                            stroke="#ef4444"
                            fill="#ef4444"
                            fillOpacity={0.1}
                            strokeWidth={3}
                            strokeDasharray="5 5"
                            animationDuration={500}
                            name="Cramming"
                        />
                    )}

                    {showThreshold && (
                        <ReferenceLine y={targetRetention} stroke="#ef4444" strokeDasharray="3 3" label={{ value: `Target Retention (${targetRetention}%)`, fill: "#ef4444", fontSize: 12, position: "insideBottomRight" }} />
                    )}
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
}
