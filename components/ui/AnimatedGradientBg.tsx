'use client';

import React from 'react';
import { motion } from 'framer-motion';

export function AnimatedGradientBg() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <motion.div
        animate={{
          backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: 'linear',
        }}
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(45deg, rgba(212, 165, 116, 0.1), rgba(184, 149, 106, 0.1), rgba(232, 201, 160, 0.1))',
          backgroundSize: '200% 200%',
        }}
      />

      {/* Animated Blur Circles */}
      <motion.div
        animate={{
          x: [0, 100, 0],
          y: [0, 50, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute top-20 -left-40 w-80 h-80 bg-clay-primary rounded-full mix-blend-multiply filter blur-3xl opacity-20"
      />

      <motion.div
        animate={{
          x: [0, -100, 0],
          y: [0, -50, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute bottom-20 right-20 w-96 h-96 bg-clay-accent rounded-full mix-blend-multiply filter blur-3xl opacity-15"
      />
    </div>
  );
}
