"use client"

import { useState, useCallback } from "react"

// Define types for better type safety and documentation
export type Choice = "rock" | "paper" | "scissors" | "lizard" | "spock" | null
export type GameOutcome = "win" | "lose" | "draw" | null
export type GameRecord = {
  playerChoice: Choice
  computerChoice: Choice
  result: GameOutcome
  timestamp: Date
}

export type GameState = "choosing" | "result"

/**
 * Custom hook that encapsulates the game logic for Rock, Paper, Scissors, Lizard, Spock
 * @returns Game state and functions to manage the game
 */
export function useGameLogic() {
  // Game state
  const [playerChoice, setPlayerChoice] = useState<Choice>(null)
  const [computerChoice, setComputerChoice] = useState<Choice>(null)
  const [result, setResult] = useState<GameOutcome>(null)
  const [score, setScore] = useState({ player: 0, computer: 0 })
  const [gameHistory, setGameHistory] = useState<GameRecord[]>([])
  const [gameState, setGameState] = useState<GameState>("choosing")

  // Available choices
  const choices: Choice[] = ["rock", "paper", "scissors", "lizard", "spock"]

  // Game rules defining what each choice can beat
  const rules = {
    rock: ["scissors", "lizard"],
    paper: ["rock", "spock"],
    scissors: ["paper", "lizard"],
    lizard: ["paper", "spock"],
    spock: ["rock", "scissors"],
  }

  /**
   * Determines the winner based on player and computer choices
   * @param player - The player's choice
   * @param computer - The computer's choice
   * @returns The game outcome (win, lose, draw, or null)
   */
  const determineWinner = useCallback(
    (player: Choice, computer: Choice): GameOutcome => {
      if (!player || !computer) return null
      if (player === computer) return "draw"
      return rules[player].includes(computer) ? "win" : "lose"
    },
    [rules],
  )

  /**
   * Generates a random choice for the computer
   * @returns A random game choice
   */
  const makeComputerChoice = useCallback((): Choice => {
    const randomIndex = Math.floor(Math.random() * choices.length)
    return choices[randomIndex]
  }, [choices])

  /**
   * Handles the player's choice and determines the game outcome
   * @param choice - The player's selected choice
   */
  const handlePlayerChoice = useCallback(
    (choice: Choice) => {
      setPlayerChoice(choice)
      const computerSelection = makeComputerChoice()
      setComputerChoice(computerSelection)
      setGameState("result")

      // Determine the result after a short delay to allow for animation
      setTimeout(() => {
        const gameResult = determineWinner(choice, computerSelection)
        setResult(gameResult)

        // Update score
        if (gameResult === "win") {
          setScore((prev) => ({ ...prev, player: prev.player + 1 }))
        } else if (gameResult === "lose") {
          setScore((prev) => ({ ...prev, computer: prev.computer + 1 }))
        }

        // Add to history (keep only last 10 games)
        const newRecord: GameRecord = {
          playerChoice: choice,
          computerChoice: computerSelection,
          result: gameResult,
          timestamp: new Date(),
        }
        setGameHistory((prev) => [newRecord, ...prev].slice(0, 10))
      }, 800)
    },
    [makeComputerChoice, determineWinner],
  )

  /**
   * Resets the game state to start a new round
   */
  const resetGame = useCallback(() => {
    setGameState("choosing")
    setPlayerChoice(null)
    setComputerChoice(null)
    setResult(null)
  }, [])

  return {
    // State
    playerChoice,
    computerChoice,
    result,
    score,
    gameHistory,
    gameState,
    choices,

    // Actions
    handlePlayerChoice,
    resetGame,
  }
}

