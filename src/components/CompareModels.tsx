import React, { useState } from 'react'
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Legend, Tooltip } from 'recharts'
import { useBenchmarks } from '../services/api'
import { useStore } from '../store/useStore'

export default function CompareModels() {
  const { data: models, isLoading } = useBenchmarks()
  const { isExpanded } = useStore()
  const [modelA, setModelA] = useState(models?.[0]?.name || 'Claude Fable 5')
  const [modelB, setModelB] = useState(models?.[1]?.name || 'GPT-5.6 Sol')

  if (isLoading || !models) return <div className="animate-pulse h-48 bg-widget-card rounded-lg" />

  const dataA = models.find(m => m.name === modelA) || models[0]
  const dataB = models.find(m => m.name === modelB) || models[1]

  const chartData = [
    { subject: 'Bug Fix', A: dataA.capabilities.bugFixing, B: dataB.capabilities.bugFixing },
    { subject: 'Refactor', A: dataA.capabilities.refactoring, B: dataB.capabilities.refactoring },
    { subject: 'Arch', A: dataA.capabilities.architecture, B: dataB.capabilities.architecture },
    { subject: 'Agent', A: dataA.capabilities.agentCoding, B: dataB.capabilities.agentCoding },
    { subject: 'Review', A: dataA.capabilities.codeReview, B: dataB.capabilities.codeReview },
    { subject: 'Context', A: dataA.capabilities.longContext, B: dataB.capabilities.longContext },
    { subject: 'Tools', A: dataA.capabilities.toolUse, B: dataB.capabilities.toolUse },
  ]

  return (
    <div className="flex flex-col h-full space-y-4">
      <h2 className="text-sm font-semibold text-gray-400 px-1">COMPARE MODELS</h2>
      
      <div className="flex flex-col gap-2">
        <select 
          className="bg-widget-card border border-blue-500/50 rounded text-xs p-2 text-white outline-none"
          value={modelA} onChange={(e) => setModelA(e.target.value)}
        >
          {models.map(m => <option key={m.name} value={m.name}>{m.name}</option>)}
        </select>
        <select 
          className="bg-widget-card border border-green-500/50 rounded text-xs p-2 text-white outline-none"
          value={modelB} onChange={(e) => setModelB(e.target.value)}
        >
          {models.map(m => <option key={m.name} value={m.name}>{m.name}</option>)}
        </select>
      </div>

      <div className={`w-full flex-1 min-h-[${isExpanded ? '350px' : '220px'}]`}>
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius={isExpanded ? "65%" : "55%"} data={chartData}>
            <PolarGrid stroke="#333" />
            <PolarAngleAxis dataKey="subject" tick={{ fill: '#888', fontSize: 10 }} />
            <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
            <Tooltip contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #333' }} />
            {isExpanded && <Legend wrapperStyle={{ fontSize: '10px' }} />}
            <Radar name={dataA.name} dataKey="A" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.4} />
            <Radar name={dataB.name} dataKey="B" stroke="#22c55e" fill="#22c55e" fillOpacity={0.4} />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
