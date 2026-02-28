'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface ConfettiPiece {
  id: number;
  left: number;
  delay: number;
  duration: number;
  rotation: number;
}

interface ConfettiProps {
  trigger?: boolean;
  colors?: string[];
  count?: number;
}

export function Confetti({
  trigger = true,
  colors = ['#D4A574', '#B8956A', '#E8C9A0', '#F5E6D3'],
  count = 50,
}: ConfettiProps) {
  const [pieces, setPieces] = useState<ConfettiPiece[]>([]);

  useEffect(() => {
    if (!trigger) return;

    const newPieces = Array.from({ length: count }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 0.2,
      duration: 2 + Math.random() * 1,
      rotation: Math.random() * 360,
    }));

    setPieces(newPieces);

    const timer = setTimeout(() => setPieces([]), 3500);
    return () => clearTimeout(timer);
  }, [trigger, count]);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">
      {pieces.map((piece) => (
        <motion.div
          key={piece.id}
          initial={{ opacity: 1, y: -100 }}
          animate={{
            opacity: 0,
            y: window.innerHeight + 100,
            rotate: piece.rotation + 360,
          }}
          transition={{
            duration: piece.duration,
            delay: piece.delay,
            ease: 'easeIn',
          }}
          className="absolute w-2 h-2 rounded-full"
          style={{
            left: `${piece.left}%`,
            backgroundColor: colors[Math.floor(Math.random() * colors.length)],
          }}
        />
      ))}
    </div>
  );
}
