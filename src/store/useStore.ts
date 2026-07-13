import { create } from 'zustand'

export interface RankingWeights {
  sweBench: number
  liveBench: number
  terminalBench: number
}

export type Currency = 'USD' | 'IDR' | 'EUR' | 'GBP' | 'JPY' | 'AUD' | 'CAD' | 'SGD'
export type UseCase = 'balanced' | 'pure-coding' | 'agentic' | 'observing' | 'architecture' | 'media-gen'

interface WidgetState {
  isExpanded: boolean
  toggleExpanded: () => void
  activeTab: 'leaderboard' | 'radar' | 'news' | 'settings' | 'compare' | 'context'
  setActiveTab: (tab: 'leaderboard' | 'radar' | 'news' | 'settings' | 'compare' | 'context') => void
  weights: RankingWeights
  setWeight: (key: keyof RankingWeights, value: number) => void
  currency: Currency
  setCurrency: (c: Currency) => void
  useCase: UseCase
  setUseCase: (u: UseCase) => void
}

export const useStore = create<WidgetState>((set) => ({
  isExpanded: false,
  toggleExpanded: () => {
    set((state) => {
      const newState = !state.isExpanded
      if (window.electronAPI) {
        if (newState) {
          window.electronAPI.resizeWindow(450, 900)
        } else {
          window.electronAPI.resizeWindow(350, 500)
        }
      }
      return { isExpanded: newState }
    })
  },
  activeTab: 'leaderboard',
  setActiveTab: (tab) => set({ activeTab: tab }),
  weights: {
    sweBench: 40,
    liveBench: 30,
    terminalBench: 30,
  },
  setWeight: (key, value) => set((state) => ({ weights: { ...state.weights, [key]: value } })),
  currency: 'USD',
  setCurrency: (c) => set({ currency: c }),
  useCase: 'balanced',
  setUseCase: (u) => set({ useCase: u }),
}))

declare global {
  interface Window {
    electronAPI?: {
      resizeWindow: (width: number, height: number) => Promise<void>
      minimizeWindow: () => Promise<void>
      closeWindow: () => Promise<void>
      storeGet: (key: string) => Promise<any>
      storeSet: (key: string, value: any) => Promise<void>
    }
  }
}
