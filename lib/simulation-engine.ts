export type SimulationHistoryItem = {
    day: number;
    retention: number;
    reviewType?: 'learn' | 'review' | 'forgot' | null;
    stability: number;
};

export class SimulationEngine {
    // Constants
    private static readonly DEC_FACTOR_EASY = 2.5;
    private static readonly DEC_FACTOR_GOOD = 2.0;
    private static readonly DEC_FACTOR_HARD = 1.2;

    /**
     * Calculates retention based on time elapsed since last review and current stability.
     * R = exp(-t / S) * 100
     * @param daysElapsed Days since the last review
     * @param stability Stability of the memory (halflife in days)
     */
    static calculateRetention(daysElapsed: number, stability: number): number {
        if (stability <= 0) return 0;
        // R = e^(-t/S)
        // When t = S, R = e^-1 ≈ 36.8% (Using standard definition of stability often mapping to 90% is complex, 
        // let's stick to a visual approximation where S is "days until R drops significantly")

        // Let's stick effectively to: R = 100 * 2^(-t/h) where h is half-life.
        // Let's treat 'stability' as 'half-life' for simplicity in this visual sim.
        return 100 * Math.pow(2, -daysElapsed / stability);
    }

    static getNextStability(currentStability: number, performance: 'easy' | 'good' | 'hard'): number {
        switch (performance) {
            case 'easy': return currentStability * this.DEC_FACTOR_EASY;
            case 'good': return currentStability * this.DEC_FACTOR_GOOD;
            case 'hard': return currentStability * this.DEC_FACTOR_HARD;
            default: return currentStability;
        }
    }

    /**
     * Generates a "forecast" curve for the next N days
     */
    static generateCurve(
        startDay: number,
        duration: number,
        startStability: number,
        startRetention: number = 100
    ): { day: number, retention: number }[] {
        const curve = [];
        // We assume the retention resets to 100% (or near it) at 'startDay' if it was a review
        // But for a continuous decay from a specific point:
        // We effectively need to find the "effective time elapsed" that matches the startRetention,
        // or just multiply.
        // Simpler visual model: R(t) = startRetention * 2^(-t/S)

        for (let i = 0; i <= duration; i++) {
            // R = StartR * 2^(-t/S)
            const val = startRetention * Math.pow(2, -i / startStability);
            curve.push({
                day: startDay + i,
                retention: val
            });
        }
        return curve;
    }
}
