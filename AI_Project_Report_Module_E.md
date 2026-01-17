# 📘 AI Project Report – Module E

## Student & Project Details
● **Student Name**: [Your Name]
● **Mentor Name**: [Mentor Name]
● **Project Title**: Predictive Learning System: Visualizing the Forgetting Curve

---

## 1. Problem Statement

### Background and Context
Human memory follows a "Forgetting Curve," where approximately 70% of new information is lost within 24 hours if not reviewed. Traditional study methods often rely on "cramming" (massed practice), which is inefficient and leads to poor long-term retention.

### Relevance
In an educational landscape increasingly driven by data, understanding *when* to study is just as important as *what* to study. Students waste time reviewing what they already know or reviewing too late after they've forgotten.

### AI Task Definition
**Prediction & Optimization**: The system aims to:
1.  **Predict** the probability of future recall (Retention) based on review history.
2.  **Optimize** the review schedule to maximize data retention with the minimum number of reviews.
3.  **Visualize** these hidden cognitive processes for the user.

### Objectives
-   To build an interactive web simulation that demonstrates the mechanics of Spaced Repetition.
-   To implement a predictive model (Bayesian Knowledge Tracing + Exponential Decay) that adapts to user interactions.
-   To provide a clear, "Sticky" dashboard that makes abstract algebraic constraints intuitive.

### Constraints
-   **Data**: Used simulated patterns based on Ebbinghaus’ empirical data (priors) rather than live longitudinal user data.
-   **Scope**: Focused on a single-concept simulation rather than a full-fledged LMS backend.

---

## 2. Approach

### System Overview
The solution consists of two parts:
1.  **Exploratory Analysis (Jupyter Notebook)**: A Python environment used to prototype the mathematical models (BKT, Decay formulas) and visualize theoretical outcomes.
2.  **Interactive Application (Next.js)**: A React-based "Scrollytelling" experience that translates the Python logic into a real-time, user-facing simulation.

### Data Strategy
-   **Simulation**: We generated synthetic "review events" modeled on standard cognitive science parameters (Learning Rate = 0.3, Slip Probability = 0.1).
-   **Preprocessing**: Calculated `Stability` (S) and `Retention` (R) iteratively to model memory strength accumulation.

### AI / Model Design
-   **Technique**: **Hybrid Probabilistic Model**.
    -   **Bayesian Knowledge Tracing (BKT)**: Updates the probability of "Mastery" ($P(K)$) after every interaction using Bayes' Theorem.
    -   **Exponential Decay**: Models retention over time using $R = e^{-\frac{t}{S}}$.
-   **Inference Strategy**: Real-time inference in the browser (`simulation-engine.ts`) to provide instant feedback loops (click -> update -> predict).

### Tools & Technologies
-   **Frontend**: Next.js 16 (App Router), React, Tailwind CSS.
-   **Visualization**: Recharts (for dynamic graphing), Framer Motion (for animations).
-   **Logic**: TypeScript (ported from Python prototypes).
-   **Analysis**: Python (Pandas, Scikit-learn) in Jupyter Notebooks.

### Design Decisions
-   **"Sticky" Dashboard**: We utilized a persistent side panel to show the immediate cause-and-effect of the AI model, solving the usability issue of scrolling between inputs and outputs.
-   **Concrete Math**: We chose to display raw formula values (e.g., "85% = ...") to demystify the "black box" nature of the algorithm.

---

## 3. Key Results

### Working Prototype
We successfully built the **"Intelligence Engine,"** a vertical, interactive pipeline that visualizes the AI decision process:
1.  **Input**: User clicks "Correct" or "Incorrect" (Simulated Flashcard).
2.  **BKT Layer**: Updates Mastery % (Visualized as a progress bar).
3.  **Prediction Layer**: Updates the Forgetting Curve (Visualized as a decay graph).
4.  **Optimization Layer**: Solves for $t$ (Time) and displays the "Next Review Day."

### Example Outputs
-   **Graph Decoding**: A clear legend explaining that the "Red Line" represents the critical 85% retention threshold.
-   **Responsive Scheduling**:
    -   *Scenario A (Low Mastery)*: System recommends review in **1 day**.
    -   *Scenario B (High Mastery)*: System pushes review out to **6 days**.
-   **Comparative Insight**: The difference dashboard clearly shows Spaced Repetition requiring **60% fewer reviews** than cramming for the same retention outcome.

### Performance Insights
-   The client-side inference is instant (<10ms), creating a "tight" feedback loop that feels magical to the user.
-   The "Sticky" UI significantly improved understandability compared to the initial linear layout.

### Limitations
-   The current model assumes a "Single Concept" view; a production version would need to handle a queue of thousands of items (Matrix Factorization).
-   Parameters (learning rate, decay baseline) are currently fixed constants rather than personalized learned parameters.

---

## 4. Learnings

### Technical Learnings
-   **Porting Logic**: effective strategies for translating Python data science models into efficient TypeScript functions for the frontend.
-   **Recharts quirks**: Handling Server-Side Rendering (SSR) issues with charting libraries in Next.js.
-   **Math Rendering**: How to structure HTML/CSS to render complex LaTeX-style formulas without heavy libraries like MathJax.

### System & Design Learnings
-   **UX of AI**: "Explainability" is a UX challenge. Showing the *math* alongside the *result* builds trust.
-   **Scrollytelling**: A powerful pattern for breaking down complex algorithmic pipelines into digestible steps.

### Challenges Faced
-   **Visualization Scale**: Making the "Forgetting Curve" look dramatic enough to be educational while remaining mathematically accurate. *Resolution: Added a "Zoom" effect and clear threshold lines.*
-   **Layout**: Vertical height made it hard to connect updates to results. *Resolution: Implemented the "Sticky Dashboard" pattern.*

### Future Improvements
-   **Personalization**: Implement the "Learning Speed" parameter so the model adapts to fast vs. slow learners.
-   **Database Integration**: Store actual user history in a database (PostgreSQL) to enable long-term tracking.

---

## References & AI Usage Disclosure

### Datasets
-   **Synthetic Data**: Generated based on the Ebbinghaus Forgetting Curve and SuperMemo (SM-2) algorithm principles. [Reference: SuperMemo Algorithms](https://www.supermemo.com/en/archives1990-2015/english/ol/sm2)

### Tools & Frameworks
-   **Next.js**: [https://nextjs.org/](https://nextjs.org/)
-   **Recharts**: [https://recharts.org/](https://recharts.org/)
-   **Lucide React**: [https://lucide.dev/](https://lucide.dev/)

### AI Tools Disclosure
-   **Google Gemini (via Antigravity)**: Used for assisting with code refactoring, bug fixing (specifically SSR issues), and generating first drafts of project documentation and reports.
-   **Jupyter Notebook**: Used for initial model exploration and algorithm validation.
