import React, { useState } from 'react'
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from 'recharts'
import { useBenchmarks } from '../services/api'
import { useStore } from '../store/useStore'

export default function CapabilityRadar() {
  const { data: models, isLoading } = useBenchmarks()
  const { isExpanded } = useStore()
  const [selectedModel, setSelectedModel] = useState(models?.[0]?.name || 'Claude Fable 5')

  if (isLoading || !models) return <div className="animate-pulse h-48 bg-widget-card rounded-lg" />

  const model = models.find(m => m.name === selectedModel) || models[0]
  
  const chartData = [
    { subject: 'Bug Fix', A: model.capabilities.bugFixing },
    { subject: 'Refactor', A: model.capabilities.refactoring },
    { subject: 'Arch', A: model.capabilities.architecture },
    { subject: 'Agent', A: model.capabilities.agentCoding },
    { subject: 'Review', A: model.capabilities.codeReview },
    { subject: 'Context', A: model.capabilities.longContext },
    { subject: 'Tools', A: model.capabilities.toolUse },
    { subject: 'Scale', A: model.capabilities.repoScale },
  ]

  return (
    <div className="flex flex-col h-full space-y-4">
      <div className="flex justify-between items-center px-1">
        <h2 className="text-sm font-semibold text-gray-400">CAPABILITIES</h2>
        <select 
          className="bg-widget-card border border-widget-border rounded text-xs p-1 text-gray-300 outline-none"
          value={selectedModel}
          onChange={(e) => setSelectedModel(e.target.value)}
        >
          {models.map(m => <option key={m.name} value={m.name}>{m.name}</option>)}
        </select>
      </div>

      <div className={`w-full flex-1 min-h-[${isExpanded ? '350px' : '220px'}]`}>
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius={isExpanded ? "70%" : "60%"} data={chartData}>
            <PolarGrid stroke="#333" />
            <PolarAngleAxis dataKey="subject" tick={{ fill: '#888', fontSize: 10 }} />
            <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
            <Tooltip contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #333', borderRadius: '8px' }} />
            <Radar name={model.name} dataKey="A" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.5} />
          </RadarChart>
        </ResponsiveContainer>
      </div>
      
      {isExpanded && (
        <div className="grid grid-cols-2 gap-2 mt-4 text-xs">
          {chartData.map(d => (
            <div key={d.subject} className="flex justify-between p-2 bg-widget-card rounded">
              <span className="text-gray-400">{d.subject}</span>
              <span className="text-white font-medium">{d.A}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
