"use client"

import { motion } from "framer-motion"
import GameIcons from "./game-icons"
import { ScrollArea } from "@/components/ui/scroll-area"

/**
 * Component that displays the rules of the game with visual aids
 * Uses ScrollArea to prevent overflow issues and ensure content stays within container
 */
export default function GameRules() {
  // Rule items with structured data for better rendering
  type IconType = keyof typeof GameIcons;

  const ruleItems: { icon: IconType; primary: string; primaryColor: string; beats: { name: string; color: string }[] }[] = [
    {
      icon: "rock",
      primary: "Rock",
      primaryColor: "text-purple-300",
      beats: [
        { name: "Scissors", color: "text-red-300" },
        { name: "Lizard", color: "text-green-300" },
      ],
    },
    {
      icon: "paper",
      primary: "Paper",
      primaryColor: "text-blue-300",
      beats: [
        { name: "Rock", color: "text-purple-300" },
        { name: "Spock", color: "text-amber-300" },
      ],
    },
    {
      icon: "scissors",
      primary: "Scissors",
      primaryColor: "text-red-300",
      beats: [
        { name: "Paper", color: "text-blue-300" },
        { name: "Lizard", color: "text-green-300" },
      ],
    },
    {
      icon: "lizard",
      primary: "Lizard",
      primaryColor: "text-green-300",
      beats: [
        { name: "Paper", color: "text-blue-300" },
        { name: "Spock", color: "text-amber-300" },
      ],
    },
    {
      icon: "spock",
      primary: "Spock",
      primaryColor: "text-amber-300",
      beats: [
        { name: "Scissors", color: "text-red-300" },
        { name: "Rock", color: "text-purple-300" },
      ],
    },
  ]

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.3,
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 5 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    },
  }

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible">
      {/* ScrollArea component to handle overflow properly */}
      <ScrollArea className="h-[400px] pr-4 rounded-md">
        <div className="space-y-4 text-sm p-1">
          <div>
            <h3 className="font-semibold mb-3 text-cyan-200 text-lg">Game Rules:</h3>
            <ul className="space-y-3 pl-2">
              {ruleItems.map((rule, index) => (
                <motion.li
                  key={index}
                  variants={itemVariants}
                  className="flex items-start gap-2 p-2 rounded-md bg-slate-700/40 hover:bg-slate-700/60 transition-colors"
                >
                  <span className="inline-block w-8 h-8 mt-1 flex-shrink-0">{GameIcons[rule.icon]}</span>
                  <div>
                    <span className={`font-medium ${rule.primaryColor}`}>{rule.primary}</span>
                    <span className="text-white"> beats: </span>
                    <div className="flex flex-wrap gap-x-2 mt-1">
                      {rule.beats.map((target, idx) => (
                        <span key={idx} className={`${target.color} flex items-center gap-1`}>
                          <span>•</span> {target.name}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.li>
              ))}
            </ul>
          </div>

          <motion.div variants={itemVariants} className="pt-3 border-t border-slate-700/50">
            <p className="text-xs text-cyan-400/70 italic">
              "Rock Paper Scissors Lizard Spock" was created by Sam Kass and Karen Bryla as an expansion of the classic
              game "Rock Paper Scissors" to reduce the chance of ties.
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="pt-2">
            <h4 className="font-medium text-pink-300 mb-2">Detailed Rules:</h4>
            <ul className="list-disc pl-5 space-y-1 text-slate-300">
              <li>Rock crushes Scissors and crushes Lizard</li>
              <li>Paper covers Rock and disproves Spock</li>
              <li>Scissors cuts Paper and decapitates Lizard</li>
              <li>Lizard eats Paper and poisons Spock</li>
              <li>Spock smashes Scissors and vaporizes Rock</li>
            </ul>
          </motion.div>
        </div>
      </ScrollArea>
    </motion.div>
  )
}

