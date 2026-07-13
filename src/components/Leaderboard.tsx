import React, { useMemo, useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useBenchmarks } from '../services/api'
import { useStore } from '../store/useStore'
import { Activity, ChevronUp, ChevronDown, Minus } from 'lucide-react'

export default function Leaderboard() {
  const { data: models, isLoading } = useBenchmarks()
  const { weights } = useStore()
  const [previousRanks, setPreviousRanks] = useState<Record<string, number>>({})

  const rankedModels = useMemo(() => {
    if (!models) return []
    const sumWeights = weights.sweBench + weights.liveBench + weights.terminalBench
    const normalized = {
      swe: weights.sweBench / sumWeights,
      live: weights.liveBench / sumWeights,
      term: weights.terminalBench / sumWeights,
    }

    const calculated = models.map(m => {
      const finalScore = (
        (m.rawBenchmarks.sweBench * normalized.swe) +
        (m.rawBenchmarks.liveBench * normalized.live) +
        (m.rawBenchmarks.terminalBench * normalized.term)
      ) / 10 // scale to 10
      return { ...m, finalScore }
    })

    return calculated.sort((a, b) => b.finalScore - a.finalScore)
  }, [models, weights])

  useEffect(() => {
    if (rankedModels.length > 0) {
      const currentRanks: Record<string, number> = {}
      rankedModels.forEach((m, idx) => {
        currentRanks[m.name] = idx
      })
      setPreviousRanks(currentRanks)
    }
  }, [rankedModels])

  if (isLoading) {
    return <div className="animate-pulse space-y-3 px-1">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="h-12 bg-widget-card rounded border border-widget-border/50" />
      ))}
    </div>
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 px-1 text-cyber-primary border-b border-cyber-primary/20 pb-2 mb-4">
        <Activity size={16} />
        <h2 className="text-sm font-bold tracking-widest uppercase">Live Ranking</h2>
      </div>
      
      <div className="space-y-2 relative">
        <AnimatePresence>
          {rankedModels?.map((model, index) => {
            const prevRank = previousRanks[model.name] ?? index
            const trend = index < prevRank ? 'up' : index > prevRank ? 'down' : 'stable'
            
            return (
              <motion.div
                layout
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, type: 'spring' }}
                key={model.name}
                className="flex items-center justify-between p-3 bg-widget-card/80 backdrop-blur hover:bg-widget-card rounded border border-cyber-primary/10 hover:border-cyber-primary/50 transition-all cursor-pointer group shadow-[0_0_10px_rgba(0,0,0,0.5)]"
              >
                <div className="flex items-center gap-3">
                  <span className={`text-sm font-bold w-6 text-center ${index === 0 ? 'text-[#ffd700] drop-shadow-[0_0_5px_#ffd700]' : index === 1 ? 'text-[#c0c0c0]' : index === 2 ? 'text-[#cd7f32]' : 'text-cyber-primary/50'}`}>
                    0{index + 1}
                  </span>
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-gray-200 group-hover:text-cyber-primary transition-colors tracking-tight">{model.name}</span>
                    <div className="flex gap-2 text-[9px] uppercase tracking-wider mt-0.5">
                      <span className="text-cyber-secondary">Tier {model.tier}</span>
                      <span className="text-gray-500">[{model.contextWindow}]</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex flex-col items-end">
                    <motion.span 
                      key={model.finalScore}
                      initial={{ scale: 1.2, color: '#fff' }}
                      animate={{ scale: 1, color: '#e5e7eb' }}
                      className="text-sm font-bold text-white font-mono"
                    >
                      {model.finalScore.toFixed(2)}
                    </motion.span>
                    <span className="text-[9px] text-gray-500">SCORE</span>
                  </div>
                  <div className="w-4 flex justify-center">
                    {trend === 'up' && <ChevronUp size={16} className="text-cyber-green drop-shadow-[0_0_5px_#39ff14]" />}
                    {trend === 'down' && <ChevronDown size={16} className="text-cyber-accent drop-shadow-[0_0_5px_#ff003c]" />}
                    {trend === 'stable' && <Minus size={16} className="text-cyber-primary/50" />}
                  </div>
                </div>
              </motion.div>
            )
          })}
        </AnimatePresence>
      </div>
    </div>
  )
}
