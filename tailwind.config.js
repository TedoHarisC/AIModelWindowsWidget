/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'Menlo', 'monospace'],
      },
      colors: {
        widget: {
          dark: '#050a0f', // Deeper tech blue-black
          card: '#0a1526', // slightly lighter tech blue
          border: '#1e3a5f', // glowing border color
        },
        cyber: {
          primary: '#00f0ff', // Cyberpunk cyan
          secondary: '#7000ff', // Cyberpunk purple
          accent: '#ff003c', // Cyberpunk red
          green: '#39ff14', // Neon green
        },
        trend: {
          up: '#39ff14',
          down: '#ff003c',
          stable: '#00f0ff',
        }
      },
      backgroundImage: {
        'cyber-grid': 'linear-gradient(rgba(0, 240, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 240, 255, 0.1) 1px, transparent 1px)',
      },
      backgroundSize: {
        'grid-size': '20px 20px',
      }
    },
  },
  plugins: [],
}
