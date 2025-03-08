"use client"

import type React from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"

/**
 * Props for the GameChoice component
 */
type GameChoiceProps = {
  choice: string
  icon: React.ReactNode
  onClick: () => void
}

/**
 * Component that renders a single game choice button with animation
 * @param props - Component properties
 */
export default function GameChoice({ choice, icon, onClick }: GameChoiceProps) {
  // Get color classes based on choice type
  const getChoiceColors = () => {
    switch (choice) {
      case "rock":
        return "bg-purple-900/70 hover:bg-purple-800 border-purple-500"
      case "paper":
        return "bg-blue-900/70 hover:bg-blue-800 border-blue-500"
      case "scissors":
        return "bg-red-900/70 hover:bg-red-800 border-red-500"
      case "lizard":
        return "bg-green-900/70 hover:bg-green-800 border-green-500"
      case "spock":
        return "bg-amber-900/70 hover:bg-amber-800 border-amber-500"
      default:
        return "bg-slate-700 hover:bg-slate-600 border-slate-600"
    }
  }

  return (
    <motion.div
      whileHover={{
        scale: 1.1,
        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.1)",
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 20,
      }}
      className="flex flex-col items-center"
    >
      <Button
        onClick={onClick}
        variant="outline"
        aria-label={`Choose ${choice}`}
        className={`w-full h-24 flex flex-col items-center justify-center gap-2 ${getChoiceColors()}`}
      >
        {icon}
        <span className="capitalize">{choice}</span>
      </Button>
    </motion.div>
  )
}

