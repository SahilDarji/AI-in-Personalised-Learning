# Predictive Learning System: Visualizing the Forgetting Curve 🧠

**AI Project - Module E Submission**
*A Dual-Component Project combining Data Analysis (Python) and Interactive Simulation (Web).*

## 📌 Project Overview
The **Predictive Learning System** is an AI-driven tool designed to optimize human memory retention using **Spaced Repetition**.

It solves the "Forgetting Curve" problem—the natural decay of memory over time—by predicting the optimal moment to review material. The system uses **Bayesian Knowledge Tracing (BKT)** to estimate mastery and an **Exponential Decay Model** to forecast forgetting.

---

## 📂 Project Components

This repository contains two distinct parts required for the project submission:

### 1. The Analysis (Jupyter Notebook) 🐍
*   **File**: `Smart_Review_Scheduler.ipynb`
*   **Purpose**: This notebook contains the foundational research and model prototyping.
*   **Key Contents**:
    *   Implementation of the **BKT Algorithm** (Bayes Theorem update logic).
    *   Visualization of the Ebbinghaus Forgetting Curve using `matplotlib`/`seaborn`.
    *   Simulation of student interactions to test the decay formulas.
    *   Mathematical derivation of the "Optimal Review Time" constraint solver.

### 2. The Application (Interactive Web Simulation) 🌐
*   **Folder**: `app/` (Next.js Source Code)
*   **Purpose**: A production-ready web application that translates the notebook's logic into a user-friendly experience.
*   **Key Features**:
    *   **The Intelligence Engine**: A real-time dashboard showing the AI thinking process.
    *   **Interactive Controls**: Sliders to set "Target Retention" (e.g., 90% vs 80%).
    *   **Dynamic Visuals**: Real-time graphs that change based on user inputs.

---

## 🚀 How to Run

### Running the Web Application
1.  **Install dependencies**:
    ```bash
    npm install
    ```
2.  **Start the server**:
    ```bash
    npm run dev
    ```
3.  **View**: Open [http://localhost:3000](http://localhost:3000)

### Running the Notebook
1.  Ensure you have Python installed.
2.  Open `Smart_Review_Scheduler.ipynb` in **VS Code** or **Jupyter Lab**.
3.  Run all cells to see the analysis and static visualizations.

---

## 🛠️ Technology Stack
*   **AI/Logic**: Python (Pandas, Scikit-learn), Bayesian Statistics.
*   **Frontend**: Next.js 16 (App Router), React, TypeScript.
*   **Styling**: Tailwind CSS, Shadcn UI.
*   **Visualization**: Recharts (Web), Matplotlib (Notebook).
