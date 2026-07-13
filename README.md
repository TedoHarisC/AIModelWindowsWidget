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

### Building for Production
To package the app into a Windows executable (`.exe`):
```bash
npm run build
```
The output file will be located in the `dist-electron` or `release` folder (depending on `electron-builder` config).

## 🎮 Usage Guide

- **Moving the Widget**: Click and drag the top header bar (where it says `SYS.INTEL_`) to move the widget around your screen.
- **Resizing**: Click the maximize/minimize icon in the top right corner to toggle between the compact (350x500) and expanded (450x900) views.
- **Adjusting Weights**: Navigate to the **Settings** tab (gear icon at the bottom) and slide the range inputs to adjust how much SWE-Bench, LiveBench, or TerminalBench matters to your personal ranking. The main Leaderboard tab will reflect these changes immediately.

## 🗺️ Roadmap
- [ ] Direct API integrations with OpenRouter & Artificial Analysis for live production data.
- [ ] Personalized Watchlist with Windows Toast Notifications on price drops or benchmark improvements.
- [ ] Theme toggler (Light / Dark / Cyber).

## 📄 License
This project is licensed under the MIT License.
