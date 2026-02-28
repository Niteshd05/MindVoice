'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ClayCard } from '@/components/ui/ClayCard';
import { ClayButton } from '@/components/ui/ClayButton';
import { Sidebar } from '@/components/chat/Sidebar';
import { useTheme } from '@/lib/theme-context';

interface TestResult {
  userId: string;
  answers: number[];
  theme: string;
  completedAt: string;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

export default function DashboardPage() {
  const { theme } = useTheme();
  const [testResults, setTestResults] = useState<TestResult | null>(null);
  const [showSidebar, setShowSidebar] = useState(true);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const results = localStorage.getItem('test-results');
    const userData = localStorage.getItem('user');

    if (results) {
      setTestResults(JSON.parse(results));
    }
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const getScoreMeaning = (average: number) => {
    if (average >= 3.5) {
      return {
        level: 'Excellent',
        description: 'You are in a strong place emotionally',
        color: 'from-green-400 to-green-600',
      };
    } else if (average >= 2.5) {
      return {
        level: 'Good',
        description: 'You are managing well with some areas to focus on',
        color: 'from-blue-400 to-blue-600',
      };
    } else if (average >= 1.5) {
      return {
        level: 'Fair',
        description: 'You are working through some challenges',
        color: 'from-yellow-400 to-yellow-600',
      };
    } else {
      return {
        level: 'Needs Support',
        description: 'Consider reaching out for additional support',
        color: 'from-purple-400 to-purple-600',
      };
    }
  };

  const averageScore =
    testResults && testResults.answers.length > 0
      ? testResults.answers.reduce((a, b) => a + b, 0) / testResults.answers.length
      : 0;

  const scoreMeaning = getScoreMeaning(averageScore);

  const categories = [
    { name: 'Mood & Energy', score: testResults?.answers[0] || 0, icon: '😊' },
    { name: 'Stress Levels', score: testResults?.answers[1] || 0, icon: '😰' },
    { name: 'Sleep Quality', score: testResults?.answers[2] || 0, icon: '😴' },
    { name: 'Coping Skills', score: testResults?.answers[3] || 0, icon: '💪' },
    { name: 'Social Connection', score: testResults?.answers[4] || 0, icon: '👥' },
    { name: 'Self-Care', score: testResults?.answers[5] || 0, icon: '🌿' },
    { name: 'Anxiety', score: testResults?.answers[6] || 0, icon: '🧘' },
    { name: 'Confidence', score: testResults?.answers[7] || 0, icon: '✨' },
    { name: 'Resilience', score: testResults?.answers[8] || 0, icon: '🛡️' },
    { name: 'Fulfillment', score: testResults?.answers[9] || 0, icon: '🌟' },
  ];

  return (
    <div className="flex h-screen bg-gradient-to-br from-white via-blue-50 to-slate-100">
      {/* Sidebar */}
      {showSidebar && <Sidebar onClose={() => setShowSidebar(false)} />}

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 z-10 border-b border-gray-200 bg-white/70 backdrop-blur-md p-4">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <div className="flex items-center gap-4">
              {!showSidebar && (
                <button
                  onClick={() => setShowSidebar(true)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  ☰
                </button>
              )}
              <div>
                <h1 className="text-2xl font-bold clay-gradient-text">Dashboard</h1>
                <p className="text-sm text-gray-500">Your emotional wellness insights</p>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-8"
            >
              {/* Overall Score */}
              <motion.div variants={itemVariants}>
                <ClayCard className="p-8 clay-glass">
                  <h2 className="text-3xl font-bold mb-8 clay-gradient-text">Your Wellness Score</h2>

                  <div className="grid md:grid-cols-2 gap-8 items-center">
                    {/* Score Circle */}
                    <div className="flex justify-center">
                      <div className="relative w-64 h-64">
                        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                          <circle
                            cx="50"
                            cy="50"
                            r="45"
                            fill="none"
                            stroke="#f3f4f6"
                            strokeWidth="3"
                          />
                          <motion.circle
                            cx="50"
                            cy="50"
                            r="45"
                            fill="none"
                            strokeWidth="3"
                            stroke="url(#gradient)"
                            strokeDasharray={282.7}
                            initial={{ strokeDashoffset: 282.7 }}
                            animate={{ strokeDashoffset: 282.7 - (averageScore / 4) * 282.7 }}
                            transition={{ duration: 1, ease: 'easeOut' }}
                            strokeLinecap="round"
                          />
                          <defs>
                            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                              <stop offset="0%" style={{ stopColor: 'var(--clay-primary)', stopOpacity: 1 }} />
                              <stop offset="100%" style={{ stopColor: 'var(--clay-accent)', stopOpacity: 1 }} />
                            </linearGradient>
                          </defs>
                        </svg>

                        {/* Center Content */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                          <div className="text-5xl font-bold clay-gradient-text">
                            {averageScore.toFixed(1)}
                          </div>
                          <div className="text-sm text-gray-600">/ 4.0</div>
                        </div>
                      </div>
                    </div>

                    {/* Score Meaning */}
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">
                          {scoreMeaning.level}
                        </h3>
                        <p className="text-lg text-gray-600">
                          {scoreMeaning.description}
                        </p>
                      </div>

                      <div className="space-y-3 pt-4">
                        <div>
                          <p className="text-sm font-semibold text-gray-700 mb-1">Current Theme</p>
                          <div className="inline-block px-4 py-2 rounded-full clay-card font-semibold text-gray-900">
                            {theme}
                          </div>
                        </div>

                        <div>
                          <p className="text-sm font-semibold text-gray-700 mb-1">Last Assessment</p>
                          <p className="text-gray-600">
                            {testResults?.completedAt
                              ? new Date(testResults.completedAt).toLocaleDateString()
                              : 'Not yet taken'}
                          </p>
                        </div>
                      </div>

                      <div className="pt-6">
                        <ClayButton className="text-white font-bold w-full">
                          Retake Assessment
                        </ClayButton>
                      </div>
                    </div>
                  </div>
                </ClayCard>
              </motion.div>

              {/* Categories Grid */}
              <motion.div variants={itemVariants}>
                <h3 className="text-2xl font-bold mb-6 text-gray-900">Wellness Categories</h3>
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="grid md:grid-cols-2 lg:grid-cols-5 gap-4"
                >
                  {categories.map((category, index) => (
                    <motion.div key={index} variants={itemVariants}>
                      <ClayCard className="p-6 text-center">
                        <div className="text-4xl mb-3">{category.icon}</div>
                        <h4 className="font-semibold text-gray-900 text-sm mb-3">
                          {category.name}
                        </h4>

                        {/* Mini Progress Bar */}
                        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden mb-2">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${(category.score / 4) * 100}%` }}
                            transition={{ duration: 0.8, delay: 0.1 + index * 0.05 }}
                            className="h-full bg-gradient-to-r from-clay-primary to-clay-accent"
                            style={{
                              background: 'linear-gradient(90deg, var(--clay-primary), var(--clay-accent))',
                            }}
                          />
                        </div>
                        <p className="text-lg font-bold clay-gradient-text">
                          {category.score.toFixed(1)}
                        </p>
                      </ClayCard>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>

              {/* Insights Section */}
              <motion.div variants={itemVariants}>
                <h3 className="text-2xl font-bold mb-6 text-gray-900">Personalized Insights</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <ClayCard className="p-6">
                    <h4 className="font-bold text-lg mb-3 text-gray-900">💡 Key Recommendation</h4>
                    <p className="text-gray-600">
                      Based on your assessment, focus on building your self-care routine and strengthening your support network.
                    </p>
                  </ClayCard>

                  <ClayCard className="p-6">
                    <h4 className="font-bold text-lg mb-3 text-gray-900">🎯 Next Steps</h4>
                    <p className="text-gray-600">
                      Start with small daily actions: 10 minutes of meditation or journaling each morning can make a significant difference.
                    </p>
                  </ClayCard>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
