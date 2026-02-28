'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ClayCard } from '@/components/ui/ClayCard';
import { ClayButton } from '@/components/ui/ClayButton';
import { AuthModal } from '@/components/auth/AuthModal';
import { OrbFallback } from '@/components/3d/OrbFallback';

const features = [
  {
    title: 'Psychometric Testing',
    description: 'Adaptive psychological assessments tailored to understand your mental state',
    icon: '🧠',
  },
  {
    title: 'AI-Powered Chat',
    description: 'Intelligent conversations with dynamic theme adaptation based on your responses',
    icon: '💬',
  },
  {
    title: 'Personal Dashboard',
    description: 'Visualize your emotional journey with real-time analytics and insights',
    icon: '📊',
  },
  {
    title: 'Emotion Detection',
    description: 'Advanced voice and text analysis to understand your emotional patterns',
    icon: '❤️',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: 'easeOut' },
  },
};

export default function Home() {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleAuthSuccess = () => {
    setShowAuthModal(false);
    setIsAuthenticated(true);
    // Redirect to psychometric test
    setTimeout(() => {
      window.location.href = '/psychometric-test';
    }, 500);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-slate-100 overflow-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-40 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-2xl font-bold clay-gradient-text"
          >
            MindVoice
          </motion.div>
          <ClayButton
            onClick={() => setShowAuthModal(true)}
            className="px-6 py-2"
          >
            Get Started
          </ClayButton>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-8"
            >
              <motion.h1
                variants={itemVariants}
                className="text-5xl md:text-6xl font-bold leading-tight"
              >
                <span className="clay-gradient-text">Your Mental Wellness</span>
                <br />
                <span className="text-gray-900">Companion</span>
              </motion.h1>

              <motion.p
                variants={itemVariants}
                className="text-lg text-gray-600 leading-relaxed max-w-md"
              >
                Discover your emotional patterns through intelligent psychometric testing and AI-powered conversations. MindVoice adapts to your needs with dynamic theme-based interactions.
              </motion.p>

              <motion.div
                variants={itemVariants}
                className="flex flex-col sm:flex-row gap-4"
              >
                <ClayButton
                  size="lg"
                  onClick={() => setShowAuthModal(true)}
                  className="text-white font-bold"
                >
                  Start Your Journey
                </ClayButton>
                <button className="px-8 py-4 text-lg font-semibold text-gray-700 hover:text-gray-900 transition-colors">
                  Learn More →
                </button>
              </motion.div>

              {/* Stats */}
              <motion.div
                variants={itemVariants}
                className="flex gap-8 pt-8"
              >
                {[
                  { number: '10K+', label: 'Users' },
                  { number: '50+', label: 'Test Types' },
                  { number: '24/7', label: 'Support' },
                ].map((stat) => (
                  <div key={stat.label}>
                    <div className="text-2xl font-bold clay-gradient-text">
                      {stat.number}
                    </div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </div>
                ))}
              </motion.div>
            </motion.div>

            {/* Right Content - 3D Orb */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="relative h-96 md:h-full min-h-96"
            >
              <OrbFallback />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="clay-gradient-text">Powerful Features</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Experience the future of mental wellness with our comprehensive suite of tools
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {features.map((feature, index) => (
              <motion.div key={index} variants={itemVariants}>
                <ClayCard hoverable className="h-full text-center">
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-bold mb-3 text-gray-900">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">{feature.description}</p>
                </ClayCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center"
        >
          <ClayCard className="clay-glass p-12">
            <h2 className="text-4xl font-bold mb-6">Ready to Begin?</h2>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Join thousands of users who have transformed their mental wellness journey with MindVoice.
            </p>
            <ClayButton
              size="lg"
              onClick={() => setShowAuthModal(true)}
              className="text-white font-bold mx-auto"
            >
              Start Free Today
            </ClayButton>
          </ClayCard>
        </motion.div>
      </section>

      {/* Auth Modal */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onAuthSuccess={handleAuthSuccess}
      />

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 border-t border-gray-200">
        <div className="max-w-7xl mx-auto text-center text-gray-600">
          <p>&copy; 2024 MindVoice. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}
