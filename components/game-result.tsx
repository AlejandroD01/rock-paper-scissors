"use client"

import type React from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"

/**
 * Props for the GameResult component
 */
type GameResultProps = {
  playerChoice: string | null
  computerChoice: string | null
  result: "win" | "lose" | "draw" | null
  icons: Record<string, React.ReactNode>
  onPlayAgain: () => void
}

/**
 * Component that displays the result of a game round
 * @param props - Component properties
 */
export default function GameResult({ playerChoice, computerChoice, result, icons, onPlayAgain }: GameResultProps) {
  // Animation variants for staggered animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delay: 0.3,
        duration: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 280,
        damping: 20,
      },
    },
  }

  const resultVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delay: 0.8,
        type: "spring",
        stiffness: 200,
        damping: 20,
      },
    },
  }

  /**
   * Get the appropriate result message based on the game outcome
   * @returns A string message describing the result
   */
  const getResultMessage = () => {
    if (!result) return "Calculating..."
    if (result === "win") return "You Win! 🎉"
    if (result === "lose") return "Computer Wins! 😢"
    return "It's a Draw! 🤝"
  }

  /**
   * Get the appropriate text color class based on the game outcome
   * @returns A Tailwind CSS color class
   */
  const getResultColor = () => {
    if (!result) return "text-white"
    if (result === "win") return "text-green-400"
    if (result === "lose") return "text-red-400"
    return "text-yellow-400"
  }

  /**
   * Get the appropriate background color class based on the choice
   * @param choice - The game choice
   * @returns A Tailwind CSS class string
   */
  const getChoiceBackground = (choice: string | null) => {
    if (!choice) return "bg-slate-700"

    switch (choice) {
      case "rock":
        return "bg-purple-900/70 border-2 border-purple-500"
      case "paper":
        return "bg-blue-900/70 border-2 border-blue-500"
      case "scissors":
        return "bg-red-900/70 border-2 border-red-500"
      case "lizard":
        return "bg-green-900/70 border-2 border-green-500"
      case "spock":
        return "bg-amber-900/70 border-2 border-amber-500"
      default:
        return "bg-slate-700 border-2 border-slate-500"
    }
  }

  return (
    <motion.div className="text-center" variants={containerVariants} initial="hidden" animate="visible">
      <h2 className="text-2xl font-semibold mb-8 text-cyan-200">Game Result</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        {/* Player choice display */}
        <motion.div variants={itemVariants} className="flex flex-col items-center">
          <div className="text-xl mb-2 text-cyan-200">Your Choice</div>
          <div
            className={`p-6 rounded-full w-32 h-32 flex items-center justify-center mb-2 ${getChoiceBackground(playerChoice)}`}
          >
            {playerChoice && <div className="text-4xl">{icons[playerChoice]}</div>}
          </div>
          <div className="text-lg capitalize">{playerChoice}</div>
        </motion.div>

        {/* Computer choice display */}
        <motion.div variants={itemVariants} className="flex flex-col items-center">
          <div className="text-xl mb-2 text-cyan-200">Computer's Choice</div>
          <div
            className={`p-6 rounded-full w-32 h-32 flex items-center justify-center mb-2 ${getChoiceBackground(computerChoice)}`}
          >
            {computerChoice && <div className="text-4xl">{icons[computerChoice]}</div>}
          </div>
          <div className="text-lg capitalize">{computerChoice}</div>
        </motion.div>
      </div>

      {/* Result message and play again button */}
      <motion.div variants={resultVariants}>
        <h3 className={`text-3xl font-bold mb-6 ${getResultColor()}`}>{getResultMessage()}</h3>

        <Button
          onClick={onPlayAgain}
          size="lg"
          className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white"
        >
          Play Again
        </Button>
      </motion.div>
    </motion.div>
  )
}

