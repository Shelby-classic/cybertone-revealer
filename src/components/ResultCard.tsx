
import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, AlertCircle, RefreshCw, Share2 } from 'lucide-react';

interface ResultCardProps {
  result: 'truth' | 'lie' | 'neutral' | null;
  confidence: number;
  onTryAgain: () => void;
  onShare: () => void;
}

const ResultCard: React.FC<ResultCardProps> = ({
  result,
  confidence,
  onTryAgain,
  onShare
}) => {
  const resultData = {
    truth: {
      icon: <CheckCircle className="h-16 w-16 text-truth" />,
      title: 'Truth Detected',
      description: 'The analysis indicates this statement is likely truthful.',
      color: 'text-truth',
      glow: 'truth-glow'
    },
    lie: {
      icon: <AlertCircle className="h-16 w-16 text-lie" />,
      title: 'Lie Detected',
      description: 'The analysis indicates this statement is likely false.',
      color: 'text-lie',
      glow: 'lie-glow'
    },
    neutral: {
      icon: <RefreshCw className="h-16 w-16 text-neutral animate-spin" />,
      title: 'Analysis Unclear',
      description: 'We couldn\'t determine with confidence. Try again with a clearer statement.',
      color: 'text-neutral',
      glow: 'neutral-glow'
    }
  };
  
  if (!result) return null;
  
  const data = resultData[result];
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className={`
        w-full max-w-md glass-panel p-6 ${data.glow}
        flex flex-col items-center text-center space-y-6
      `}
    >
      <motion.div 
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', damping: 12 }}
      >
        {data.icon}
      </motion.div>
      
      <div className="space-y-2">
        <h2 className={`text-2xl font-bold ${data.color}`}>{data.title}</h2>
        <p className="text-white/80">{data.description}</p>
      </div>
      
      {result !== 'neutral' && (
        <div className="w-full">
          <div className="flex justify-between mb-2">
            <span className="text-sm text-white/60">Confidence</span>
            <span className={`text-sm font-medium ${data.color}`}>{confidence}%</span>
          </div>
          <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${confidence}%` }}
              transition={{ duration: 1, ease: 'easeOut' }}
              className={`h-full ${result === 'truth' ? 'bg-truth' : 'bg-lie'}`}
            />
          </div>
        </div>
      )}
      
      <div className="flex gap-4 w-full justify-center pt-4">
        <button 
          onClick={onTryAgain}
          className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-all"
        >
          <RefreshCw className="h-4 w-4" />
          <span>Try Again</span>
        </button>
        
        <button 
          onClick={onShare}
          className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-all"
        >
          <Share2 className="h-4 w-4" />
          <span>Share</span>
        </button>
      </div>
    </motion.div>
  );
};

export default ResultCard;
