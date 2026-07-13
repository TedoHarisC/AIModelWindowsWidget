import { useQuery } from '@tanstack/react-query'

export interface ModelScore {
  name: string
  tier: string
  contextWindow: string
  maxTokens: number
  rawBenchmarks: {
    sweBench: number
    liveBench: number
    terminalBench: number
  }
  capabilities: {
    bugFixing: number
    refactoring: number
    architecture: number
    agentCoding: number
    codeReview: number
    longContext: number
    toolUse: number
    repoScale: number
    mediaGen: number
  }
  pricing: {
    input: number
    output: number
    cached?: number
  }
}

const BASE_MODELS: ModelScore[] = [
  {
    name: 'Claude Fable 5', tier: 'S+', contextWindow: '1M', maxTokens: 1000000,
    rawBenchmarks: { sweBench: 92.5, liveBench: 95.0, terminalBench: 90.5 },
    capabilities: { bugFixing: 98, refactoring: 96, architecture: 95, agentCoding: 99, codeReview: 97, longContext: 100, toolUse: 98, repoScale: 95, mediaGen: 80 },
    pricing: { input: 15, output: 75, cached: 3.75 }
  },
  {
    name: 'Claude Opus 4.8', tier: 'S+', contextWindow: '200K', maxTokens: 200000,
    rawBenchmarks: { sweBench: 90.0, liveBench: 92.5, terminalBench: 88.0 },
    capabilities: { bugFixing: 97, refactoring: 95, architecture: 98, agentCoding: 95, codeReview: 96, longContext: 92, toolUse: 94, repoScale: 94, mediaGen: 70 },
    pricing: { input: 15, output: 75 }
  },
  {
    name: 'GPT-5.6 Sol', tier: 'S+', contextWindow: '1M', maxTokens: 1000000,
    rawBenchmarks: { sweBench: 89.5, liveBench: 94.0, terminalBench: 91.0 },
    capabilities: { bugFixing: 96, refactoring: 97, architecture: 96, agentCoding: 98, codeReview: 95, longContext: 98, toolUse: 99, repoScale: 97, mediaGen: 95 },
    pricing: { input: 10, output: 30 }
  },
  {
    name: 'GPT-4o', tier: 'S', contextWindow: '128K', maxTokens: 128000,
    rawBenchmarks: { sweBench: 88.0, liveBench: 90.5, terminalBench: 89.0 },
    capabilities: { bugFixing: 94, refactoring: 92, architecture: 93, agentCoding: 95, codeReview: 92, longContext: 88, toolUse: 97, repoScale: 91, mediaGen: 92 },
    pricing: { input: 5, output: 15, cached: 2.5 }
  },
  {
    name: 'Gemini 1.5 Pro', tier: 'S', contextWindow: '2M', maxTokens: 2000000,
    rawBenchmarks: { sweBench: 86.5, liveBench: 89.0, terminalBench: 87.5 },
    capabilities: { bugFixing: 92, refactoring: 90, architecture: 91, agentCoding: 92, codeReview: 94, longContext: 100, toolUse: 90, repoScale: 96, mediaGen: 90 },
    pricing: { input: 3.5, output: 10.5, cached: 0.88 }
  },
  {
    name: 'Claude Sonnet 4.6', tier: 'S', contextWindow: '200K', maxTokens: 200000,
    rawBenchmarks: { sweBench: 85.0, liveBench: 88.5, terminalBench: 84.0 },
    capabilities: { bugFixing: 94, refactoring: 95, architecture: 92, agentCoding: 96, codeReview: 94, longContext: 95, toolUse: 97, repoScale: 92, mediaGen: 75 },
    pricing: { input: 3, output: 15, cached: 0.3 }
  },
  {
    name: 'Llama 3.1 405B', tier: 'A+', contextWindow: '128K', maxTokens: 128000,
    rawBenchmarks: { sweBench: 83.5, liveBench: 86.0, terminalBench: 83.0 },
    capabilities: { bugFixing: 89, refactoring: 90, architecture: 92, agentCoding: 88, codeReview: 90, longContext: 85, toolUse: 89, repoScale: 90, mediaGen: 65 },
    pricing: { input: 2.7, output: 2.7 }
  },
  {
    name: 'Qwen 2.5 Coder', tier: 'A+', contextWindow: '128K', maxTokens: 128000,
    rawBenchmarks: { sweBench: 84.0, liveBench: 84.5, terminalBench: 86.0 },
    capabilities: { bugFixing: 91, refactoring: 92, architecture: 87, agentCoding: 93, codeReview: 89, longContext: 84, toolUse: 92, repoScale: 88, mediaGen: 70 },
    pricing: { input: 1.5, output: 4.5 }
  },
  {
    name: 'DeepSeek V4 Pro', tier: 'A+', contextWindow: '1M', maxTokens: 1000000,
    rawBenchmarks: { sweBench: 80.5, liveBench: 82.0, terminalBench: 85.0 },
    capabilities: { bugFixing: 92, refactoring: 90, architecture: 88, agentCoding: 92, codeReview: 90, longContext: 96, toolUse: 91, repoScale: 89, mediaGen: 60 },
    pricing: { input: 0.14, output: 0.28 }
  },
  {
    name: 'Mistral Large 2', tier: 'A', contextWindow: '128K', maxTokens: 128000,
    rawBenchmarks: { sweBench: 78.0, liveBench: 81.5, terminalBench: 80.0 },
    capabilities: { bugFixing: 87, refactoring: 88, architecture: 89, agentCoding: 86, codeReview: 88, longContext: 82, toolUse: 87, repoScale: 85, mediaGen: 50 },
    pricing: { input: 2.0, output: 6.0 }
  },
  {
    name: 'Command R+', tier: 'A', contextWindow: '128K', maxTokens: 128000,
    rawBenchmarks: { sweBench: 75.5, liveBench: 79.0, terminalBench: 77.5 },
    capabilities: { bugFixing: 85, refactoring: 84, architecture: 86, agentCoding: 90, codeReview: 85, longContext: 86, toolUse: 95, repoScale: 87, mediaGen: 55 },
    pricing: { input: 2.5, output: 10.0 }
  },
  {
    name: 'Claude 3.5 Haiku', tier: 'A', contextWindow: '200K', maxTokens: 200000,
    rawBenchmarks: { sweBench: 74.0, liveBench: 78.0, terminalBench: 75.0 },
    capabilities: { bugFixing: 84, refactoring: 86, architecture: 82, agentCoding: 85, codeReview: 84, longContext: 92, toolUse: 88, repoScale: 83, mediaGen: 60 },
    pricing: { input: 0.25, output: 1.25 }
  }
]

export const useBenchmarks = () => {
  return useQuery({
    queryKey: ['benchmarks'],
    queryFn: async () => {
      // Simulate real-time minor fluctuations in scores (+/- 0.5%)
      return BASE_MODELS.map(model => ({
        ...model,
        rawBenchmarks: {
          sweBench: Math.min(100, Math.max(0, model.rawBenchmarks.sweBench + (Math.random() - 0.5))),
          liveBench: Math.min(100, Math.max(0, model.rawBenchmarks.liveBench + (Math.random() - 0.5))),
          terminalBench: Math.min(100, Math.max(0, model.rawBenchmarks.terminalBench + (Math.random() - 0.5))),
        }
      }))
    },
    refetchInterval: 3000, // Fetch every 3 seconds to show real-time changes
  })
}

export const useNews = () => {
  return useQuery({
    queryKey: ['news'],
    queryFn: async () => {
      await new Promise(resolve => setTimeout(resolve, 600))
      return [
        { id: 1, headline: 'Anthropic releases Claude Fable 5', publisher: 'Anthropic', published: '2h ago', url: '#' },
        { id: 2, headline: 'OpenAI announces GPT-5.6 Sol context window updates', publisher: 'OpenAI', published: '5h ago', url: '#' },
        { id: 3, headline: 'DeepSeek V4 Pro tops SWE-Bench Lite', publisher: 'DeepSeek', published: '1d ago', url: '#' },
      ]
    },
    refetchInterval: 1000 * 60 * 30, // 30 minutes
  })
}
