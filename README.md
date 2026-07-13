<div align="center">
  <h1>🚀 AI Coding Intelligence Dashboard</h1>
  <p>A premium, transparent, always-on-top Windows Desktop Widget for tracking frontier AI coding models in real-time.</p>

  ![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)
  ![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white)
  ![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB)
  ![Electron](https://img.shields.io/badge/Electron-47848F?style=flat&logo=electron&logoColor=white)
  ![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat&logo=tailwind-css&logoColor=white)
</div>

<br />

## 🌟 Overview

The **AI Coding Intelligence Dashboard** is a highly customizable, futuristic desktop widget designed for developers and AI enthusiasts. It provides a real-time, dynamic leaderboard of the world's most advanced AI coding models (like Claude 3.5 Sonnet, GPT-4o, DeepSeek, etc.).

Unlike static leaderboards, this widget uses a **Dynamic Calculation Engine**. You can adjust the weights of various benchmarks (e.g., SWE-Bench, LiveBench, TerminalBench) in the settings, and the leaderboard will instantly recalculate and re-sort the models with beautiful, smooth animations.

## ✨ Features

- 🔋 **Live Dynamic Ranking**: Adjust benchmark weights (SWE-Bench, LiveBench) in real-time and watch the leaderboard re-sort itself.
- ⚡ **Real-Time Data Simulation**: The UI constantly fetches and pulses with data changes, giving a Bloomberg-terminal-esque live feel.
- 🎨 **Cyberpunk / Techy Aesthetic**: Glowing grid backgrounds, monospace fonts, and neon accents.
- 📊 **Capability Radar**: Visual comparison of model strengths (Bug Fixing, Refactoring, Agent Coding) using interactive Radar charts.
- 📏 **Context Window Visualizer**: Animated progress bars showing the maximum context size of each model.
- 📰 **Latest AI News**: A built-in news feed to keep you updated on the latest releases.
- 🖥️ **Always-On-Top Widget**: Frameless and transparent, it floats elegantly on your Windows desktop.

## 🛠️ Tech Stack

- **Framework**: [Electron](https://www.electronjs.org/) + [React](https://reactjs.org/) (via [Vite](https://vitejs.dev/))
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [TailwindCSS](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Charts**: [Recharts](https://recharts.org/)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand)
- **Data Fetching**: [TanStack Query](https://tanstack.com/query/latest) (React Query)

## 🚀 Getting Started

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/ai-coding-intelligence-dashboard.git
   cd ai-coding-intelligence-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```
   This will start the Vite React development server and automatically launch the Electron widget.

### 📦 Building for Production

To package the app into a standalone Windows executable (`.exe` installer):
```bash
npm run build
```
The output file (e.g., `ai-model-widget-setup.exe`) will be generated in the `release/` or `dist-electron/` folder depending on your `electron-builder` configuration. You can distribute this file to users for a standard Windows installation.

### 🔄 Auto-Start on Windows Login
To have the widget automatically appear when you turn on your computer:
1. Build and install the application using the steps above.
2. Press `Win + R`, type `shell:startup`, and press Enter.
3. Create a shortcut to the installed `.exe` and paste it into this Startup folder.

---

## 🔬 Research Methodology & Scoring Credibility

As an AI-focused engineering tool, the integrity of our leaderboard is paramount. We do not rely on subjective vibes; the scores in this dashboard are synthesized from rigorous, industry-standard benchmarks to reflect true frontier capabilities.

### Data Sources & Parameters
- **SWE-Bench (Software Engineering Benchmark)**: Measures a model's ability to resolve real-world GitHub issues by autonomously editing code across large repositories. A high score indicates elite architectural reasoning and bug-fixing capabilities.
- **LiveBench**: A continuously updated benchmark that evaluates mathematical reasoning, coding, and instruction following, specifically designed to prevent data contamination (models memorizing the test).
- **TerminalBench**: Evaluates terminal and CLI environment mastery, a critical metric for "Agentic" workflows where models execute commands autonomously.

### Dynamic Weighting Engine
Because different developers have different needs, our ranking engine is not static. We employ a real-time capability matrix:
- **Pure Coding**: Heavily biases `Refactoring` and `Bug Fixing` capabilities over general conversational logic.
- **Agentic Work**: Prioritizes `Tool Use` and `Agent Coding`, calculating how well a model can operate independently.
- **Observing / Analysis**: Prioritizes `Long Context` retrieval and `Code Review` accuracy for massive codebases.

*By default, the UI simulates a live data feed to emulate real-time market fluctuations, serving as a placeholder until you connect your preferred LLM pricing API (e.g., OpenRouter or Artificial Analysis).*

---

## 🎮 Usage Guide

- **Moving the Widget**: Click and drag the top header bar (where it says `SYS.INTEL_`) to move the widget around your screen.
- **Resizing**: Click the maximize/minimize icon in the top right corner to toggle between the compact (350x500) and expanded (450x900) views.
- **Adjusting Weights**: Navigate to the **Settings** tab (gear icon at the bottom) and slide the range inputs to adjust how much SWE-Bench, LiveBench, or TerminalBench matters to your personal ranking. The main Leaderboard tab will reflect these changes immediately.
- **Use-Case Filtering**: In the Leaderboard tab, use the top-right filter icon to instantly recalculate the entire global ranking based on your specific task requirements (e.g., Image Generation vs. Architecture).

## 🗺️ Roadmap
- [ ] Direct API integrations with OpenRouter & Artificial Analysis for live production data.
- [ ] Personalized Watchlist with Windows Toast Notifications on price drops or benchmark improvements.
- [ ] Theme toggler (Light / Dark / Cyber).

## 💖 Support
If you like this project, please give this repository a star (⭐️)! Your support is highly appreciated and helps drive future updates and features.

## 📄 License
This project is licensed under the MIT License.
