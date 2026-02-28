'use client';

import React from 'react';
import { motion } from 'framer-motion';

export function ScrollIndicator() {
  return (
    <motion.div
      animate={{ y: [0, 12, 0] }}
      transition={{ duration: 2, repeat: Infinity }}
      className="flex flex-col items-center gap-2"
    >
      <span className="text-xs font-semibold text-gray-600">Scroll to explore</span>
      <svg
        className="w-6 h-6 text-gray-600"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
      </svg>
    </motion.div>
  );
}
