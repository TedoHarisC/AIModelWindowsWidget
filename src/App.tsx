
import { motion, AnimatePresence } from 'framer-motion'
import { Maximize2, Minimize2, Activity, Settings, TrendingUp, BarChart2, Radio, Maximize } from 'lucide-react'
import { useStore } from './store/useStore'
import Leaderboard from './components/Leaderboard'
import CapabilityRadar from './components/CapabilityRadar'
import NewsFeed from './components/NewsFeed'
import ContextWindow from './components/ContextWindow'
import CompareModels from './components/CompareModels'
import SettingsPanel from './components/Settings'

function App() {
  const { isExpanded, toggleExpanded, activeTab, setActiveTab } = useStore()

  const tabs = [
    { id: 'leaderboard', icon: Activity, label: 'Leaderboard' },
    { id: 'radar', icon: BarChart2, label: 'Radar' },
    { id: 'compare', icon: TrendingUp, label: 'Compare' },
    { id: 'context', icon: Maximize, label: 'Context' },
    { id: 'news', icon: Radio, label: 'News' },
    { id: 'settings', icon: Settings, label: 'Settings' },
  ] as const

  return (
    <div className="w-screen h-screen flex flex-col bg-widget-dark/90 bg-cyber-grid-pattern cyber-border rounded-xl shadow-[0_0_20px_rgba(0,240,255,0.15)] overflow-hidden transition-all duration-300">
      {/* Header / Drag Handle */}
      <div className="drag-handle flex items-center justify-between p-3 border-b border-cyber-primary/20 bg-widget-dark/80">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-cyber-primary shadow-[0_0_8px_#00f0ff] animate-pulse" />
          <span className="text-[10px] font-bold text-cyber-primary tracking-[0.2em]">SYS.INTEL_</span>
        </div>
        <button 
          onClick={toggleExpanded} 
          className="no-drag p-1.5 hover:bg-cyber-primary/20 rounded transition-colors text-cyber-primary/70 hover:text-cyber-primary"
        >
          {isExpanded ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
        </button>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="flex-1 overflow-y-auto no-drag p-4"
          >
            {activeTab === 'leaderboard' && <Leaderboard />}
            {activeTab === 'radar' && <CapabilityRadar />}
            {activeTab === 'compare' && <CompareModels />}
            {activeTab === 'context' && <ContextWindow />}
            {activeTab === 'news' && <NewsFeed />}
            {activeTab === 'settings' && <SettingsPanel />}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom Navigation */}
      <div className="no-drag flex items-center justify-around p-2 border-t border-widget-border/50 bg-widget-dark/90 backdrop-blur-md">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`p-2 rounded-lg transition-all flex flex-col items-center gap-1 ${
              activeTab === tab.id ? 'text-blue-400 bg-blue-500/10' : 'text-gray-500 hover:text-gray-300 hover:bg-white/5'
            }`}
          >
            <tab.icon size={18} />
            {isExpanded && <span className="text-[10px] font-medium">{tab.label}</span>}
          </button>
        ))}
      </div>
    </div>
  )
}

export default App
