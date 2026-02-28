'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface FloatingLabelInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon?: React.ReactNode;
}

export function FloatingLabelInput({
  label,
  icon,
  className = '',
  ...props
}: FloatingLabelInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);

  return (
    <div className="relative">
      <motion.label
        animate={{
          y: isFocused || hasValue ? -24 : 0,
          scale: isFocused || hasValue ? 0.85 : 1,
          x: isFocused || hasValue ? -8 : 0,
        }}
        transition={{ type: 'spring', stiffness: 200, damping: 10 }}
        className="absolute left-4 top-4 font-medium text-gray-600 pointer-events-none origin-left clay-gradient-text"
      >
        {icon && <span className="mr-2">{icon}</span>}
        {label}
      </motion.label>

      <input
        {...props}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onChange={(e) => {
          setHasValue(e.target.value.length > 0);
          props.onChange?.(e);
        }}
        className={`clay-input w-full pt-6 ${className}`}
      />
    </div>
  );
}
