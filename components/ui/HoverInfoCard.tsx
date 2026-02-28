'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface HoverInfoCardProps {
  children: React.ReactNode;
  info: React.ReactNode;
  side?: 'top' | 'bottom' | 'left' | 'right';
}

export function HoverInfoCard({
  children,
  info,
  side = 'top',
}: HoverInfoCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const positionVariants = {
    top: {
      initial: { opacity: 0, y: 10 },
      animate: { opacity: 1, y: -10 },
      exit: { opacity: 0, y: 10 },
    },
    bottom: {
      initial: { opacity: 0, y: -10 },
      animate: { opacity: 1, y: 10 },
      exit: { opacity: 0, y: -10 },
    },
    left: {
      initial: { opacity: 0, x: 10 },
      animate: { opacity: 1, x: -10 },
      exit: { opacity: 0, x: 10 },
    },
    right: {
      initial: { opacity: 0, x: -10 },
      animate: { opacity: 1, x: 10 },
      exit: { opacity: 0, x: -10 },
    },
  };

  const sideClasses = {
    top: 'bottom-full mb-2',
    bottom: 'top-full mt-2',
    left: 'right-full mr-2',
    right: 'left-full ml-2',
  };

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}

      <AnimatePresence>
        {isHovered && (
          <motion.div
            variants={positionVariants[side]}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ type: 'spring', stiffness: 200, damping: 15 }}
            className={`absolute ${sideClasses[side]} left-1/2 -translate-x-1/2 z-50 pointer-events-none`}
          >
            <div className="clay-card p-3 text-sm text-gray-700 whitespace-nowrap shadow-lg">
              {info}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
