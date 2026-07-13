import React from 'react'
import { useBenchmarks } from '../services/api'
import { useStore } from '../store/useStore'

export default function SettingsPanel() {
  const { data: models } = useBenchmarks()
  const { weights, setWeight } = useStore()

  return (
    <div className="space-y-6 pb-4">
      <div>
        <h2 className="text-sm font-bold text-cyber-primary tracking-widest uppercase mb-3 px-1">Ranking Weights</h2>
        <div className="space-y-3 bg-widget-card/80 p-3 rounded cyber-border">
          
          <div className="space-y-1">
            <div className="flex justify-between text-xs">
              <span className="text-gray-300">SWE-Bench</span>
              <span className="text-cyber-primary font-bold">{weights.sweBench}%</span>
            </div>
            <input 
              type="range" min="0" max="100" 
              value={weights.sweBench} 
              onChange={(e) => setWeight('sweBench', Number(e.target.value))}
              className="w-full accent-cyber-primary"
            />
          </div>

          <div className="space-y-1">
            <div className="flex justify-between text-xs">
              <span className="text-gray-300">LiveBench</span>
              <span className="text-cyber-secondary font-bold">{weights.liveBench}%</span>
            </div>
            <input 
              type="range" min="0" max="100" 
              value={weights.liveBench} 
              onChange={(e) => setWeight('liveBench', Number(e.target.value))}
              className="w-full accent-cyber-secondary"
            />
          </div>

          <div className="space-y-1">
            <div className="flex justify-between text-xs">
              <span className="text-gray-300">TerminalBench</span>
              <span className="text-cyber-green font-bold">{weights.terminalBench}%</span>
            </div>
            <input 
              type="range" min="0" max="100" 
              value={weights.terminalBench} 
              onChange={(e) => setWeight('terminalBench', Number(e.target.value))}
              className="w-full accent-cyber-green"
            />
          </div>
          
        </div>
      </div>

      <div>
        <h2 className="text-sm font-bold text-cyber-primary tracking-widest uppercase mb-3 px-1">API PRICING (Per 1M)</h2>
        <div className="bg-widget-card/80 rounded cyber-border overflow-hidden text-xs">
          <table className="w-full text-left">
            <thead className="bg-widget-dark">
              <tr>
                <th className="p-2 font-bold text-cyber-primary/70">MODEL</th>
                <th className="p-2 font-bold text-cyber-primary/70">IN</th>
                <th className="p-2 font-bold text-cyber-primary/70">OUT</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-cyber-primary/20">
              {models?.map(model => (
                <tr key={model.name} className="hover:bg-cyber-primary/10 transition-colors">
                  <td className="p-2 text-gray-300 font-medium">{model.name}</td>
                  <td className="p-2 text-cyber-green">${model.pricing.input}</td>
                  <td className="p-2 text-cyber-accent">${model.pricing.output}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
