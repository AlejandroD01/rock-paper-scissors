"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import GameChoice from "@/components/game-choice"
import GameResult from "@/components/game-result"
import ScoreBoard from "@/components/score-board"
import GameHistory from "@/components/game-history"
import GameRules from "@/components/game-rules"
import GameIcons from "@/components/game-icons"
import { useGameLogic } from "@/hooks/use-game-logic"

/**
 * Main component for the Rock, Paper, Scissors, Lizard, Spock game
 * Implements game logic, UI rendering, and animations
 */
export default function RockPaperScissorsGame() {
  // Game logic from custom hook
  const {
    playerChoice,
    computerChoice,
    result,
    score,
    gameHistory,
    gameState,
    choices,
    handlePlayerChoice,
    resetGame,
  } = useGameLogic()

  // UI state
  const [showRules, setShowRules] = useState(false)

  // Icons for game choices
  const choiceIcons = GameIcons

  /**
   * Toggles the visibility of the rules panel
   */
  const toggleRules = () => {
    setShowRules((prev) => !prev)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-900 via-purple-900 to-pink-800 text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header with title */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-pink-300 to-cyan-300">
            Rock, Paper, Scissors, Lizard, Spock
          </h1>
          <p className="text-cyan-200">Choose your weapon wisely!</p>
        </motion.div>

        {/* Main game layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Game area (left/top) */}
          <div className="md:col-span-2">
            {/* Conditional rendering based on game state */}
            {gameState === "choosing" ? (
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 280,
                  damping: 20,
                }}
                className="bg-slate-800/80 backdrop-blur-sm rounded-lg p-6 shadow-lg border border-indigo-500/30"
              >
                <h2 className="text-2xl font-semibold mb-6 text-center text-cyan-200">Make Your Choice</h2>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  {choices.map((choice) => (
                    choice && (
                      <GameChoice
                        key={choice}
                        choice={choice}
                        icon={choiceIcons[choice]}
                        onClick={() => handlePlayerChoice(choice)}
                      />
                    )
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 280,
                  damping: 20,
                }}
                className="bg-slate-800/80 backdrop-blur-sm rounded-lg p-6 shadow-lg border border-indigo-500/30"
              >
                <GameResult
                  playerChoice={playerChoice}
                  computerChoice={computerChoice}
                  result={result}
                  icons={choiceIcons}
                  onPlayAgain={resetGame}
                />
              </motion.div>
            )}

            {/* Score display */}
            <div className="mt-8">
              <ScoreBoard score={score} />
            </div>
          </div>

          {/* Sidebar (right/bottom) */}
          <div>
            <Card className="bg-slate-800/80 backdrop-blur-sm border-indigo-500/30">
              <div className="p-4">
                {/* Header with toggle button */}
                <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-3">
                  <h2 className="text-xl font-semibold text-cyan-200">{showRules ? "Game Rules" : "Game History"}</h2>

                  {/* Enhanced rules button */}
                  <Button
                    onClick={toggleRules}
                    aria-pressed={showRules}
                    aria-label={showRules ? "Hide rules" : "Show rules"}
                    className={`
                      relative overflow-hidden transition-all duration-300 
                      ${
                        showRules
                          ? "bg-gradient-to-r from-pink-600 to-pink-700 hover:from-pink-700 hover:to-pink-800 text-white"
                          : "bg-gradient-to-r from-cyan-600 to-cyan-700 hover:from-cyan-700 hover:to-cyan-800 text-white"
                      }
                      font-medium px-4 py-2 rounded-md shadow-md hover:shadow-lg
                      focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500
                    `}
                  >
                    <span className="relative z-10">{showRules ? "View History" : "Show Rules"}</span>
                    <motion.span
                      initial={{ y: showRules ? 0 : "100%" }}
                      animate={{ y: showRules ? 0 : "100%" }}
                      transition={{ duration: 0.3 }}
                      className={`
                        absolute inset-0 w-full h-full
                        bg-gradient-to-r from-pink-500/20 to-pink-600/20
                      `}
                    />
                  </Button>
                </div>

                {/* Conditional content: rules or history */}
                <div className="mt-2">
                  {showRules ? <GameRules /> : <GameHistory history={gameHistory} icons={choiceIcons} />}
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

