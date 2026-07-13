import React from 'react'
import { motion } from 'framer-motion'
import { useBenchmarks } from '../services/api'

export default function ContextWindow() {
  const { data: models, isLoading } = useBenchmarks()

  if (isLoading) return <div className="animate-pulse h-32 bg-widget-card rounded-lg" />

  // Max context in the dataset to scale the bars relative to it
  const maxContext = models ? Math.max(...models.map(m => m.maxTokens)) : 1000000

  return (
    <div className="space-y-4">
      <h2 className="text-sm font-semibold text-gray-400 px-1">CONTEXT WINDOWS</h2>
      <div className="space-y-4">
        {models?.map((model, index) => {
          const percentage = (model.maxTokens / maxContext) * 100
          
          return (
            <div key={model.name} className="space-y-1 group">
              <div className="flex justify-between text-xs px-1">
                <span className="text-gray-300 group-hover:text-white transition-colors">{model.name}</span>
                <span className="text-gray-400 font-mono">{model.contextWindow}</span>
              </div>
              <div className="h-2 w-full bg-widget-card rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${percentage}%` }}
                  transition={{ duration: 1, delay: index * 0.1, ease: "easeOut" }}
                  className="h-full bg-gradient-to-r from-blue-600 to-blue-400 rounded-full"
                />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
