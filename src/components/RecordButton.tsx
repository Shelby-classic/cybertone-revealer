
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mic } from 'lucide-react';

interface RecordButtonProps {
  onStartRecording: () => void;
  onStopRecording: () => void;
  isRecording: boolean;
  disabled?: boolean;
}

const RecordButton: React.FC<RecordButtonProps> = ({
  onStartRecording,
  onStopRecording,
  isRecording,
  disabled = false
}) => {
  const handleClick = () => {
    if (isRecording) {
      onStopRecording();
    } else {
      onStartRecording();
    }
  };

  const pulseVariants = {
    inactive: {
      scale: 1,
      opacity: 1
    },
    active: {
      scale: [1, 1.2, 1],
      opacity: [1, 0.8, 1],
      transition: {
        repeat: Infinity,
        duration: 1.5
      }
    }
  };

  const ringVariants = {
    inactive: {
      scale: 1,
      opacity: 0
    },
    active: {
      scale: [1, 1.5, 1.8],
      opacity: [0.6, 0.3, 0],
      transition: {
        repeat: Infinity,
        duration: 1.5,
        repeatDelay: 0
      }
    }
  };

  return (
    <div className="relative">
      {/* Pulse rings */}
      {isRecording && (
        <>
          <motion.div
            variants={ringVariants}
            initial="inactive"
            animate="active"
            className={`absolute inset-0 rounded-full bg-neutral-glow`}
          />
          <motion.div
            variants={ringVariants}
            initial="inactive"
            animate="active"
            transition={{ delay: 0.5 }}
            className={`absolute inset-0 rounded-full bg-neutral-glow`}
          />
        </>
      )}
      
      {/* Main button */}
      <motion.button
        onClick={handleClick}
        disabled={disabled}
        variants={pulseVariants}
        initial="inactive"
        animate={isRecording ? "active" : "inactive"}
        whileTap={{ scale: 0.95 }}
        className={`
          relative z-10 flex items-center justify-center w-24 h-24 md:w-32 md:h-32
          rounded-full interactive-btn btn-shimmer
          ${isRecording 
            ? 'bg-gradient-to-tr from-cyberpunk-pink via-cyberpunk-purple to-cyberpunk-blue neutral-glow' 
            : 'bg-gradient-to-br from-cyberpunk-blue to-cyberpunk-purple'}
          ${disabled ? 'opacity-60 cursor-not-allowed' : ''}
        `}
      >
        <Mic className="h-10 w-10 md:h-12 md:w-12 text-white drop-shadow-lg" />
      </motion.button>
    </div>
  );
};

export default RecordButton;
