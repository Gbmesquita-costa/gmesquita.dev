"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { CheckCircle2, XCircle, RotateCcw, Trophy } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

interface QuizProps {
  title: string;
  description?: string;
  questions: QuizQuestion[];
}

export function Quiz({ title, description, questions }: QuizProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

  const [answers, setAnswers] = useState<(number | null)[]>(
    new Array(questions.length).fill(null)
  );

  const [showResult, setShowResult] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const handleAnswerSelect = (answerIndex: number) => {
    if (showResult) return;
    setSelectedAnswer(answerIndex);
  };

  const handleNext = () => {
    if (selectedAnswer === null) return;

    const newAnswers = [...answers];
    newAnswers[currentQuestion] = selectedAnswer;

    setAnswers(newAnswers);
    setShowResult(true);

    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);

        setShowResult(false);
      } else {
        setIsCompleted(true);
      }
    }, 2000);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);

    setAnswers(new Array(questions.length).fill(null));
    setShowResult(false);

    setIsCompleted(false);
  };

  const correctAnswersCount = answers.filter(
    (answer, index) => answer === questions[index].correctAnswer
  ).length;

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-400";
    if (score >= 60) return "text-yellow-400";
    return "text-red-400";
  };

  if (isCompleted) {
    const score = (correctAnswersCount / questions.length) * 100;

    return (
      <Card className="my-8 border-2 border-green-400/50">
        <CardHeader className="text-center pb-4">
          <Trophy className="w-12 h-12 text-yellow-400 mx-auto mb-2" />
          <CardTitle className="text-2xl">Quiz Completo!</CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <div className="space-y-2">
            <p className="text-lg">Sua pontuação:</p>
            <p className={cn("text-4xl font-bold", getScoreColor(score))}>
              {score.toFixed(0)}%
            </p>
            <p className="text-muted-foreground">
              {correctAnswersCount} de {questions.length} respostas corretas
            </p>
          </div>

          <div className="flex flex-col gap-2">
            {score >= 80 && (
              <p className="text-green-400 font-medium">
                🎉 Excelente! Você domina o assunto!
              </p>
            )}
            {score >= 60 && score < 80 && (
              <p className="text-yellow-400 font-medium">
                👍 Bom trabalho! Continue estudando!
              </p>
            )}
            {score < 60 && (
              <p className="text-red-400 font-medium">
                📚 Que tal revisar o conteúdo e tentar novamente?
              </p>
            )}
          </div>

          <Button onClick={resetQuiz} className="mt-4">
            <RotateCcw className="w-4 h-4 mr-2" />
            Tentar Novamente
          </Button>
        </CardContent>
      </Card>
    );
  }

  const question = questions[currentQuestion];
  const isCorrectAnswer = selectedAnswer === question.correctAnswer;

  return (
    <Card className="my-8 border-2 border-blue-400/50">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl">{title}</CardTitle>
          <Badge variant="outline">
            {currentQuestion + 1} / {questions.length}
          </Badge>
        </div>
        {description && <p className="text-muted-foreground">{description}</p>}
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Progress Bar */}
        <div className="w-full bg-muted rounded-full h-2">
          <motion.div
            className="bg-blue-400 h-2 rounded-full"
            initial={{ width: 0 }}
            animate={{
              width: `${((currentQuestion + 1) / questions.length) * 100}%`,
            }}
            transition={{ duration: 0.3 }}
          />
        </div>

        {/* Question */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium">{question.question}</h3>

          {/* Options */}
          <div className="space-y-3">
            {question.options.map((option, index) => (
              <motion.button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                disabled={showResult}
                className={cn(
                  "w-full p-4 text-left rounded-lg border-2 transition-all",
                  "hover:border-blue-400/50 hover:bg-blue-400/10",
                  selectedAnswer === index &&
                    !showResult &&
                    "border-blue-400 bg-blue-400/20",
                  showResult &&
                    selectedAnswer === index &&
                    isCorrectAnswer &&
                    "border-green-400 bg-green-400/20",
                  showResult &&
                    selectedAnswer === index &&
                    !isCorrectAnswer &&
                    "border-red-400 bg-red-400/20",
                  showResult &&
                    index === question.correctAnswer &&
                    selectedAnswer !== index &&
                    "border-green-400 bg-green-400/10"
                )}
                whileHover={{ scale: showResult ? 1 : 1.02 }}
                whileTap={{ scale: showResult ? 1 : 0.98 }}
              >
                <div className="flex items-center justify-between">
                  <span>{option}</span>
                  <AnimatePresence>
                    {showResult && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                      >
                        {index === question.correctAnswer ? (
                          <CheckCircle2 className="w-5 h-5 text-green-400" />
                        ) : selectedAnswer === index ? (
                          <XCircle className="w-5 h-5 text-red-400" />
                        ) : null}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.button>
            ))}
          </div>

          {/* Explanation */}
          <AnimatePresence>
            {showResult && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="p-4 rounded-lg bg-muted/50 border-l-4 border-blue-400"
              >
                <p className="text-sm font-medium mb-1">Explicação:</p>
                <p className="text-sm text-muted-foreground">
                  {question.explanation}
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Next Button */}
          {!showResult && (
            <Button
              onClick={handleNext}
              disabled={selectedAnswer === null}
              className="w-full"
            >
              {currentQuestion === questions.length - 1
                ? "Finalizar Quiz"
                : "Próxima Pergunta"}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
