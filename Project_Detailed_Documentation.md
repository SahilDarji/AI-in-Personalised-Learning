# Predictive Learning System: Detailed Project Documentation

**Use this document as the primary source for generating presentation slides.**

---

## 1. Executive Summary

The **Predictive Learning System** is a dual-component project designed to demystify and optimize human learning. It combines:
1.  A **Python/Jupyter Notebook** backend for data analysis and model prototyping.
2.  A **Next.js Web Application** for interactive visualization and user simulation.

**Core Value Proposition**: By moving from "Intuitive Study" (guessing when to review) to "Algorithmic Study" (Spaced Repetition), learners can achieve **higher retention** with **less effort**.

---

## 2. The Problem: The Forgetting Curve

### Concept
Discovered by Hermann Ebbinghaus, the "Forgetting Curve describes the exponential loss of information over time.
-   **Immediate Recall**: 100%
-   **24 Hours Later**: ~30% retained
-   **1 Week Later**: <10% retained

### The "Cramming" Flaw
Most students wait until retention is near 0% before re-studying. This forces them to "re-learn" material from scratch (high cognitive load).
-   **Inefficiency**: Repeatedly climbing the same mountain.
-   **Anxiety**: The feeling of "I studied this, why don't I know it?"

---

## 3. The Solution: Spaced Repetition + AI

### The "Smart Review" Strategy
Instead of cramming, we interrupt the forgetting process *just* before the memory is lost.
-   **The Magic Moment**: Reviewing when retention is at **80-90%**.
-   **The Effect**: Each successful review flattens the decay curve. Information stays "stable" for longer periods (days -> weeks -> months).

### The Intelligence Engine (How it Works)
Our system uses a 3-step pipeline to find that "Magic Moment":

#### Step 1: The Brain (Bayesian Knowledge Tracing - BKT)
We model the probability that a student "Knows" a concept ($P(K)$).
-   **Input**: Student answers (Correct/Incorrect).
-   **Logic**: Bayes' Theorem updates our belief state.
-   **Formula**: $P(K|A) = \frac{P(A|K) \cdot P(K)}{P(A)}$

#### Step 2: The Prediction (Machine Learning)
We project how fast that specific memory will decay.
-   **Input**: Current Mastery Level.
-   **Logic**: Higher mastery = Slower decay (Lower $d$).
-   **Formula**: Retention $R = Mastery \cdot e^{-d \cdot t}$

#### Step 3: Optimization (Constraint Solver)
We solve for Time ($t$).
-   **Input**: Target Retention Threshold (e.g., 85%).
-   **Logic**: "On what day will $R$ drop to exactly 0.85?"
-   **Formula**: $t = \frac{-\ln(0.85 / Mastery)}{d}$

---

## 4. Application Walkthrough (User Journey)

### Section 1: The Hook ("Why do we forget?")
-   **Visual**: A particle animation of a brain network disconnecting over time.
-   **Message**: Forgetting is a biological inevitability, not a personal failure.

### Section 2: The Problem Simulator
-   **Action**: User watches a graph decay.
-   **Interactive**: They try to "boost" the graph by clicking randomly.
-   **Outcome**: They realize that random clicking (cramming) is exhausting and temporary.

### Section 3: The Intelligence Engine (The Core)
-   **Layout**: A split-screen dashboard.
    -   **Left**: Educational steps (BKT -> ML -> Scheduler).
    -   **Right (Sticky)**: A live "Result Panel" showing the optimal review date.
-   **Features**:
    -   **Concrete Math**: Formulas update with real-real time numbers (e.g., "New Mastery = 76%").
    -   **Graph Decoder**: Color-coded legend explaining the "Danger Zone" (Red Line).

### Section 4: The Comparison (Proof)
-   **Visual**: Two charts running side-by-side.
    -   **Crammer**: High frequency, high stress, low long-term retention.
    -   **Smart Scheduler**: Low frequency, low stress, high long-term retention.

---

## 5. Technical Architecture

### Tech Stack
-   **Frontend**: Next.js 16 (App Router), React 19.
-   **Styling**: Tailwind CSS (Utility-first).
-   **Components**: Shadcn UI (Buttons, Cards).
-   **Logic**: TypeScript Custom Hooks (`useSimulation`).

### Key Code Components
-   `EngineSection.tsx`: The heart of the visualization. Handles the orchestrated flow of data between the BKT model and the Chart.
-   `MathBlock.tsx`: A custom component for rendering LaTeX-style formulas with dynamic values.
-   `simulation-engine.ts`: A purely functional utility class that contains the "Physics" of the memory model (decay rates, stability updates).

---

## 6. Future Roadmap

1.  **Multi-Concept Support**: Scaling the engine to handle decks of 100+ cards using a Priority Queue.
2.  **Voice Interface**: Using Gemini/OpenAI to allow oral reviews instead of just multiple choice.
3.  **LMS Integration**: API hooks to connect with Canvas or Blackboard for real classroom data.
