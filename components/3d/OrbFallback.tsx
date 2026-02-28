'use client';

import React from 'react';
import { motion } from 'framer-motion';

export function OrbFallback() {
  return (
    <div className="w-full h-96 relative flex items-center justify-center">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-200 via-purple-200 to-pink-200 rounded-full opacity-20 blur-3xl" />
      
      <motion.div
        animate={{
          y: [0, -20, 0],
          rotateX: [0, 10, 0],
          rotateY: [0, 10, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="relative w-48 h-48"
      >
        {/* Outer glow */}
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full blur-2xl"
        />

        {/* Main orb */}
        <div className="absolute inset-0 bg-gradient-to-br from-amber-300 via-orange-300 to-red-300 rounded-full shadow-2xl">
          {/* Inner shine */}
          <div className="absolute top-4 left-4 w-16 h-16 bg-white rounded-full opacity-40 blur-xl" />
        </div>

        {/* Rotating rings */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, linear: true }}
          className="absolute inset-0 rounded-full border-2 border-transparent border-t-blue-400 border-r-purple-400"
        />

        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 12, repeat: Infinity, linear: true }}
          className="absolute inset-4 rounded-full border-2 border-transparent border-b-pink-400 border-l-blue-400"
        />
      </motion.div>

      {/* Floating particles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          animate={{
            x: [0, Math.cos((i / 6) * Math.PI * 2) * 60, 0],
            y: [0, Math.sin((i / 6) * Math.PI * 2) * 60, 0],
          }}
          transition={{
            duration: 4 + i,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"
        />
      ))}
    </div>
  );
}
