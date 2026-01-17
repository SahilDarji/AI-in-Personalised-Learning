import { IntroSection } from "@/components/sections/IntroSection";
import { ProblemSection } from "@/components/sections/ProblemSection";
import { SolutionSection } from "@/components/sections/SolutionSection";
import { ComparisonSection } from "@/components/sections/ComparisonSection";
import { EngineSection } from "@/components/sections/EngineSection";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50 font-sans selection:bg-blue-100">
      <IntroSection />

      <div id="problem-section">
        <ProblemSection />
      </div>

      <SolutionSection />

      <EngineSection />

      <ComparisonSection />
    </main>
  );
}
