import React from 'react'
import { useBenchmarks } from '../services/api'
import { useStore, Currency } from '../store/useStore'

const EXCHANGE_RATES: Record<Currency, number> = {
  USD: 1,
  IDR: 16200,
  EUR: 0.92,
  GBP: 0.79,
  JPY: 155.50,
  AUD: 1.52,
  CAD: 1.36,
  SGD: 1.35,
}

export default function SettingsPanel() {
  const { data: models } = useBenchmarks()
  const { weights, setWeight, currency, setCurrency } = useStore()

  const formatPrice = (priceUsd: number) => {
    const converted = priceUsd * EXCHANGE_RATES[currency]
    if (currency === 'IDR') return `Rp ${converted.toLocaleString('id-ID')}`
    if (currency === 'EUR') return `€${converted.toFixed(2)}`
    if (currency === 'GBP') return `£${converted.toFixed(2)}`
    if (currency === 'JPY') return `¥${Math.round(converted).toLocaleString('ja-JP')}`
    if (currency === 'AUD') return `A$${converted.toFixed(2)}`
    if (currency === 'CAD') return `C$${converted.toFixed(2)}`
    if (currency === 'SGD') return `S$${converted.toFixed(2)}`
    return `$${converted.toFixed(2)}`
  }

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
        <div className="flex justify-between items-center mb-3 px-1">
          <h2 className="text-sm font-bold text-cyber-primary tracking-widest uppercase">API PRICING (Per 1M)</h2>
          <select 
            value={currency} 
            onChange={(e) => setCurrency(e.target.value as Currency)}
            className="bg-widget-card border border-cyber-primary/30 rounded text-[10px] p-1 text-cyber-primary outline-none focus:border-cyber-primary cursor-pointer"
          >
            <option value="USD" className="bg-widget-dark text-white">USD ($)</option>
            <option value="IDR" className="bg-widget-dark text-white">IDR (Rp)</option>
            <option value="EUR" className="bg-widget-dark text-white">EUR (€)</option>
            <option value="GBP" className="bg-widget-dark text-white">GBP (£)</option>
            <option value="JPY" className="bg-widget-dark text-white">JPY (¥)</option>
            <option value="AUD" className="bg-widget-dark text-white">AUD (A$)</option>
            <option value="CAD" className="bg-widget-dark text-white">CAD (C$)</option>
            <option value="SGD" className="bg-widget-dark text-white">SGD (S$)</option>
          </select>
        </div>
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
                  <td className="p-2 text-cyber-green">{formatPrice(model.pricing.input)}</td>
                  <td className="p-2 text-cyber-accent">{formatPrice(model.pricing.output)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
