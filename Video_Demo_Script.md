# Video Demonstration Script
**Target Duration**: 3-5 Minutes
**Format**: Screen Share + Voiceover

---

## 0. Introduction (Camera on or Title Screen)
**Visual**: Title Slide "Predictive Learning System: Visualizing the Forgetting Curve"
**Audio**: 
"Hello! My name is [Name], and this is my AI project for Module E. I've built a **Predictive Learning System** that uses artificial intelligence to solve a very human problem: *Forgetting*."

---

## 1. The Notebook (The Analysis)
**Visual**: Switch tab to VS Code / Jupyter Notebook (`Smart_Review_Scheduler.ipynb`). Scroll briefly through the cells.
**Audio**:
"I started by modeling cognitive data in Python. 
-   Here you can see the **Bayesian Knowledge Tracing** logic [Highlight BKT Class], which estimates how well a student knows a topic.
-   And here [Scroll to Graph], I graphed the 'Forgetting Curve' to establish the mathematical baseline for memory decay.
But raw code is hard to understand, so I turned this logic into an interactive web app."

---

## 2. The Web App (The Experience)
**Visual**: Switch tab to `localhost:3000`.

### A. The Problem
**Visual**: Scroll to the "Problem" Section (The Graph). Let the animation play.
**Audio**:
"First, we visualize the problem. This is the **Forgetting Curve**. Notice how quickly the graph drops? In just days, we lose almost everything we learned. This represents the 'Cramming' cycle."

### B. The Intelligence Engine (The Core Feature)
**Visual**: Scroll down to "The Intelligence Engine".
**Audio**:
"This is the core of my project: **The Intelligence Engine**. It visualizes the AI decision pipeline in real-time."

**Action**: Click "Correct" on the BKT section.
**Audio**:
"Step 1 is the **Brain**. When I click 'Correct', notice the 'Mastery' percentage jumps up. The system now believes I know this topic."

**Action**: Point to the "Prediction" Graph.
**Audio**:
"Step 2 is **Prediction**. Because my mastery went up, the system predicts my forgetting curve will flatten out. It solves for the exact moment my memory hits the 'Danger Zone'—the red line at 85%."

**Action**: Point to the Sticky "Result" Panel on the right.
**Audio**:
"And Step 3 is **Optimization**. The dashboard instantly calculates the optimal review time for me. It says '6 Days'. If I answer incorrectly..." [Click Incorrect] "...it drops to '1 Day'. This is the AI adapting to me in real-time."

---

## 3. Comparison & Conclusion
**Visual**: Scroll to the final "Cramming vs Smart" graph.
**Audio**:
"Finally, we compare the results. The 'Smart Schedule' achieves high retention with far fewer reviews than the 'Cramming' method."

**Visual**: Back to Title Screen.
**Audio**:
"In conclusion, this project demonstrates how we can use Probabilistic Models and Optimization not just to predict grades, but to fundamentally improve *how* we learn. Thank you!"
