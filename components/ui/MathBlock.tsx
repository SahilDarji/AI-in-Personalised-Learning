import { cn } from "@/lib/utils";

interface MathBlockProps {
    className?: string;
    formula: string;
    realValue?: string;
    label?: string;
    description?: string;
}

export function MathBlock({ formula, label, description, realValue, className }: MathBlockProps) {
    return (
        <div className={cn("flex flex-col items-center justify-center p-6 bg-slate-50 rounded-xl border border-slate-200", className)}>
            {label && (
                <span className="text-xs uppercase tracking-wider font-bold text-slate-400 mb-3">
                    {label}
                </span>
            )}

            <div className="text-xl md:text-2xl font-serif text-slate-800 mb-3 tracking-wide">
                <span dangerouslySetInnerHTML={{ __html: formula }} />
            </div>

            {realValue && (
                <div className="mb-3 px-3 py-1 bg-yellow-50 text-yellow-800 border border-yellow-200 rounded text-sm font-mono whitespace-pre-wrap text-center">
                    {realValue}
                </div>
            )}

            {description && (
                <p className="text-sm text-slate-500 text-center max-w-sm">
                    {description}
                </p>
            )}
        </div>
    );
}
