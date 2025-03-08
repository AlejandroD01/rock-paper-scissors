"use client"

import type React from "react"
import { motion } from "framer-motion"
import { ScrollArea } from "@/components/ui/scroll-area"

/**
 * Type definition for a game record
 */
type GameRecord = {
  playerChoice: string | null
  computerChoice: string | null
  result: "win" | "lose" | "draw" | null
  timestamp: Date
}

/**
 * Props for the GameHistory component
 */
type GameHistoryProps = {
  history: GameRecord[]
  icons: Record<string, React.ReactNode>
}

/**
 * Component that displays the history of game rounds
 * @param props - Component properties
 */
export default function GameHistory({ history, icons }: GameHistoryProps) {
  /**
   * Get the appropriate text color class based on the game outcome
   * @param result - The game outcome
   * @returns A Tailwind CSS color class
   */
  const getResultColor = (result: "win" | "lose" | "draw" | null) => {
    if (!result) return "text-white"
    if (result === "win") return "text-emerald-400"
    if (result === "lose") return "text-pink-400"
    return "text-amber-400"
  }

  /**
   * Get the appropriate text for the result
   * @param result - The game outcome
   * @returns A string describing the result
   */
  const getResultText = (result: "win" | "lose" | "draw" | null) => {
    if (!result) return "..."
    if (result === "win") return "Win"
    if (result === "lose") return "Loss"
    return "Draw"
  }

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 280,
        damping: 60,
      },
    },
  }

  // If there's no history, show a message
  if (history.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center py-8 text-slate-400"
      >
        No games played yet. Make your first choice!
      </motion.div>
    )
  }

  return (
    <ScrollArea className="h-[400px]">
      <motion.div className="space-y-3 pr-2" variants={containerVariants} initial="hidden" animate="visible">
        {history.map((record, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            className="bg-slate-700/80 backdrop-blur-sm rounded-lg p-3 text-sm border-l-4 
              border-l-indigo-500 hover:border-l-cyan-500 transition-colors"
          >
            <div className="flex justify-between items-center mb-2">
              <span className={`font-medium ${getResultColor(record.result)}`}>{getResultText(record.result)}</span>
              <span className="text-xs text-slate-400">{new Date(record.timestamp).toLocaleTimeString()}</span>
            </div>
            <div className="flex justify-between">
              <div className="flex items-center gap-2">
                <span className="text-cyan-200">You:</span>
                <span className="inline-block">{record.playerChoice && icons[record.playerChoice]}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-pink-200">CPU:</span>
                <span className="inline-block">{record.computerChoice && icons[record.computerChoice]}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </ScrollArea>
  )
}

