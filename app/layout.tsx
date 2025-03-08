import type React from "react"
import "@/styles/animations.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] })

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">

      <link rel="icon" type="image/png" href="/favicon.png" />

      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark">
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'
import { title } from "process"

export const metadata = {
 title: 'Rock Paper Scissors Lizard Spock',
 description: 'A fun and interactive game of Rock, Paper, Scissors, Lizard, Spock',
 creator: 'Alejandro D',
};
