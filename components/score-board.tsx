"use client"

import { useState, useEffect } from "react"
import { motion, useMotionValue, useTransform, animate } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

/**
 * Props for the ScoreBoard component
 */
type ScoreBoardProps = {
  score: {
    player: number
    computer: number
  }
}

/**
 * Component that displays the current game score
 * @param props - Component properties
 */
export default function ScoreBoard({ score }: ScoreBoardProps) {
  // Motion values for animated counters
  const playerCount = useMotionValue(0)
  const computerCount = useMotionValue(0)

  // Transform motion values to rounded numbers for display
  const playerDisplay = useTransform(playerCount, (value) => Math.floor(value))
  const computerDisplay = useTransform(computerCount, (value) => Math.floor(value))

  // State to track when to trigger animations
  const [playerKey, setPlayerKey] = useState(0)
  const [computerKey, setComputerKey] = useState(0)

  // Animate player score when it changes
  useEffect(() => {
    const animation = animate(playerCount, score.player, {
      duration: 0.8,
      type: "spring",
      stiffness: 280,
      damping: 120,
    })

    setPlayerKey((prev) => prev + 1)

    return animation.stop
  }, [score.player, playerCount])

  // Animate computer score when it changes
  useEffect(() => {
    const animation = animate(computerCount, score.computer, {
      duration: 0.8,
      type: "spring",
      stiffness: 280,
      damping: 120,
    })

    setComputerKey((prev) => prev + 1)

    return animation.stop
  }, [score.computer, computerCount])

  return (
    <Card className="bg-slate-800/80 backdrop-blur-sm border-indigo-500/30">
      <CardHeader className="pb-2">
        <CardTitle className="text-center text-transparent bg-clip-text bg-gradient-to-r from-pink-300 to-cyan-300">
          Score
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4 text-center">
          {/* Player score */}
          <div className="bg-gradient-to-br from-cyan-900/70 to-blue-900/70 p-4 rounded-lg border border-cyan-500/50">
            <h3 className="text-lg font-medium mb-2 text-cyan-200">You</h3>
            <motion.div
              key={playerKey}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-300"
              aria-live="polite"
              aria-atomic="true"
            >
              {playerDisplay}
            </motion.div>
          </div>

          {/* Computer score */}
          <div className="bg-gradient-to-br from-pink-900/70 to-purple-900/70 p-4 rounded-lg border border-pink-500/50">
            <h3 className="text-lg font-medium mb-2 text-pink-200">Computer</h3>
            <motion.div
              key={computerKey}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-300 to-purple-300"
              aria-live="polite"
              aria-atomic="true"
            >
              {computerDisplay}
            </motion.div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

