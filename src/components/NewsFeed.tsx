import React from 'react'
import { motion } from 'framer-motion'
import { ExternalLink } from 'lucide-react'
import { useNews } from '../services/api'

export default function NewsFeed() {
  const { data: news, isLoading } = useNews()

  if (isLoading) {
    return <div className="animate-pulse space-y-3">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="h-16 bg-widget-card rounded-lg" />
      ))}
    </div>
  }

  return (
    <div className="space-y-3">
      <h2 className="text-sm font-semibold text-gray-400 px-1 mb-2">LATEST AI NEWS</h2>
      <div className="space-y-2">
        {news?.map((item, index) => (
          <motion.a
            href={item.url}
            target="_blank"
            rel="noreferrer"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            key={item.id}
            className="block p-3 bg-widget-card/40 hover:bg-widget-card border border-transparent hover:border-widget-border rounded-lg transition-all group"
          >
            <div className="flex justify-between items-start mb-1">
              <span className="text-[10px] uppercase tracking-wider text-blue-400 font-semibold">{item.publisher}</span>
              <span className="text-[10px] text-gray-500">{item.published}</span>
            </div>
            <div className="flex justify-between items-center gap-2">
              <h3 className="text-sm text-gray-200 group-hover:text-white transition-colors leading-snug">{item.headline}</h3>
              <ExternalLink size={12} className="text-gray-600 group-hover:text-gray-400 shrink-0" />
            </div>
          </motion.a>
        ))}
      </div>
    </div>
  )
}
