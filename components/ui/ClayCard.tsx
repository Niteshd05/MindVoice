'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface ClayCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  hoverable?: boolean;
}

export function ClayCard({
  children,
  className = '',
  onClick,
  hoverable = true,
}: ClayCardProps) {
  return (
    <motion.div
      whileHover={hoverable ? { y: -8 } : undefined}
      whileTap={hoverable ? { y: -4 } : undefined}
      transition={{ type: 'spring', stiffness: 200, damping: 10 }}
      onClick={onClick}
      className={`clay-card p-6 sm:p-8 cursor-${onClick ? 'pointer' : 'default'} ${className}`}
    >
      {children}
    </motion.div>
  );
}
