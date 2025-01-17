"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { PartyPopper, ThumbsUp, Frown } from 'lucide-react'

interface QuizResultProps {
  score: number
  maxScore: number
}

export default function QuizResult({ score, maxScore }: QuizResultProps) {
  const percentage = (score / maxScore) * 100

  const getResultContent = () => {
    if (percentage >= 75) {
      return {
        icon: <PartyPopper className="w-12 h-12 text-green-500" />,
        message: "Excellent job!",
        description: "You've mastered this quiz. Keep up the great work!",
        color: "bg-green-500"
      }
    } else if (percentage >= 50) {
      return {
        icon: <ThumbsUp className="w-12 h-12 text-yellow-500" />,
        message: "Good effort!",
        description: "You're on the right track. A little more practice and you'll ace it!",
        color: "bg-yellow-500"
      }
    } else {
      return {
        icon: <Frown className="w-12 h-12 text-red-500" />,
        message: "Room for improvement",
        description: "Don't give up! Review the material and try again.",
        color: "bg-red-500"
      }
    }
  }

  const resultContent = getResultContent()

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">Quiz Result</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex flex-col items-center space-y-4">
          {resultContent.icon}
          <h2 className="text-3xl font-bold">{resultContent.message}</h2>
          <p className="text-center text-muted-foreground">{resultContent.description}</p>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span>Your Score</span>
            <span className="font-bold">{score} / {maxScore}</span>
          </div>
          <Progress value={percentage} className={`h-3 ${resultContent.color}`} />
        </div>
      </CardContent>
    </Card>
  )
}

