'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PSYCHOMETRIC_QUESTIONS, getThemeFromScores } from '@/lib/psychometric-questions';
import { ClayCard } from '@/components/ui/ClayCard';
import { ClayButton } from '@/components/ui/ClayButton';
import { useTheme } from '@/lib/theme-context';

export default function PsychometricTest() {
  const { setTheme } = useTheme();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [isComplete, setIsComplete] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleAnswer = (value: number) => {
    const newAnswers = [...answers, value];
    setAnswers(newAnswers);

    if (currentQuestion < PSYCHOMETRIC_QUESTIONS.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      completeTest(newAnswers);
    }
  };

  const completeTest = async (finalAnswers: number[]) => {
    setIsLoading(true);

    // Calculate theme based on answers
    const selectedTheme = getThemeFromScores(finalAnswers);
    setTheme(selectedTheme);

    // Save test results
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const testResults = {
      userId: user.id,
      answers: finalAnswers,
      theme: selectedTheme,
      completedAt: new Date().toISOString(),
    };

    localStorage.setItem('test-results', JSON.stringify(testResults));

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsComplete(true);
      // Redirect to chat interface
      setTimeout(() => {
        window.location.href = '/chat';
      }, 2000);
    }, 1500);
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setAnswers(answers.slice(0, -1));
    }
  };

  if (isComplete) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-slate-100 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-2xl"
        >
          <ClayCard className="clay-glass p-12">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: 'spring' }}
              className="text-6xl mb-6"
            >
              ✨
            </motion.div>
            <h1 className="text-4xl font-bold mb-4 clay-gradient-text">
              Assessment Complete!
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Your personalized theme has been set based on your responses. Preparing your dashboard...
            </p>
            <div className="flex justify-center">
              <div className="w-8 h-8 border-4 border-gray-300 border-t-gray-900 rounded-full animate-spin" />
            </div>
          </ClayCard>
        </motion.div>
      </main>
    );
  }

  const question = PSYCHOMETRIC_QUESTIONS[currentQuestion];
  const progress = ((currentQuestion + 1) / PSYCHOMETRIC_QUESTIONS.length) * 100;

  return (
    <main className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-slate-100 p-4">
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 z-40 bg-white/70 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold clay-gradient-text">Mental Wellness Assessment</h1>
            <span className="text-sm font-semibold text-gray-600">
              Question {currentQuestion + 1} of {PSYCHOMETRIC_QUESTIONS.length}
            </span>
          </div>
          {/* Progress Bar */}
          <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
              className="h-full bg-gradient-to-r from-clay-primary to-clay-accent"
              style={{
                background: 'linear-gradient(90deg, var(--clay-primary), var(--clay-accent))',
              }}
            />
          </div>
        </div>
      </div>

      {/* Question Container */}
      <div className="max-w-4xl mx-auto mt-24 mb-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            <ClayCard className="p-8 sm:p-12">
              <h2 className="text-3xl sm:text-4xl font-bold mb-12 text-gray-900">
                {question.text}
              </h2>

              {/* Options */}
              <div className="space-y-4">
                {question.options.map((option, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.02, translateX: 4 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleAnswer(option.value)}
                    className="w-full text-left p-4 sm:p-6 clay-card hover:shadow-lg transition-all group"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full border-2 border-gray-400 group-hover:border-gray-900 flex items-center justify-center flex-shrink-0">
                        <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-gray-900 scale-0 group-hover:scale-100 transition-transform" />
                      </div>
                      <span className="text-lg sm:text-xl font-semibold text-gray-800 group-hover:text-gray-900">
                        {option.text}
                      </span>
                    </div>
                  </motion.button>
                ))}
              </div>

              {/* Navigation Buttons */}
              <div className="flex gap-4 mt-12 justify-between">
                <ClayButton
                  onClick={handlePrevious}
                  disabled={currentQuestion === 0}
                  className="opacity-50 disabled:cursor-not-allowed"
                >
                  ← Previous
                </ClayButton>

                <span className="text-sm font-semibold text-gray-600 self-center">
                  {currentQuestion + 1} / {PSYCHOMETRIC_QUESTIONS.length}
                </span>

                <div className="w-24" />
              </div>
            </ClayCard>
          </motion.div>
        </AnimatePresence>
      </div>

      {isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50"
        >
          <ClayCard className="clay-glass p-8">
            <div className="flex flex-col items-center gap-4">
              <div className="w-8 h-8 border-4 border-gray-300 border-t-gray-900 rounded-full animate-spin" />
              <p className="text-gray-600 font-semibold">Analyzing your responses...</p>
            </div>
          </ClayCard>
        </motion.div>
      )}
    </main>
  );
}
