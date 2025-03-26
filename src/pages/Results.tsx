
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, RefreshCw, Share2 } from 'lucide-react';

const Results: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // In a real app, you'd get this from the location state or a global state
  // Here we'll just use default values if none are provided
  const result = location.state?.result || 'neutral';
  const confidence = location.state?.confidence || 75;
  
  const goBack = () => {
    navigate('/detect');
  };
  
  const tryAgain = () => {
    navigate('/detect');
  };
  
  return (
    <div className="flex flex-col w-full max-w-3xl mx-auto h-full">
      <header className="flex items-center py-4">
        <button 
          onClick={goBack}
          className="p-2 rounded-full hover:bg-white/10"
          aria-label="Go back"
        >
          <ArrowLeft className="h-6 w-6" />
        </button>
        <h1 className="text-xl font-semibold ml-2">Your Results</h1>
      </header>
      
      <div className="flex-1 flex flex-col items-center justify-center gap-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-panel p-8 w-full max-w-md"
        >
          <h2 className="text-2xl font-bold mb-6 text-center">
            {result === 'truth' ? 'Truth Detected' : 
             result === 'lie' ? 'Lie Detected' : 
             'Analysis Inconclusive'}
          </h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-sm text-white/60 mb-1">Confidence Score</h3>
              <div className="flex justify-between mb-2">
                <span className="font-medium">{confidence}%</span>
                <span className="text-sm text-white/60">Certainty</span>
              </div>
              <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${confidence}%` }}
                  transition={{ duration: 1, ease: 'easeOut' }}
                  className={`h-full ${
                    result === 'truth' ? 'bg-truth' : 
                    result === 'lie' ? 'bg-lie' : 
                    'bg-neutral'
                  }`}
                />
              </div>
            </div>
            
            <div>
              <h3 className="text-sm text-white/60 mb-2">Voice Analysis Metrics</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span>Voice Stress Level</span>
                    <span className="font-medium">{result === 'lie' ? 'High' : 'Low'}</span>
                  </div>
                  <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-cyberpunk-blue" 
                      style={{ width: result === 'lie' ? '85%' : '30%' }}
                    />
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <span>Speech Hesitation</span>
                    <span className="font-medium">{result === 'lie' ? 'Frequent' : 'Minimal'}</span>
                  </div>
                  <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-cyberpunk-purple" 
                      style={{ width: result === 'lie' ? '75%' : '20%' }}
                    />
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <span>Vocal Consistency</span>
                    <span className="font-medium">{result === 'lie' ? 'Inconsistent' : 'Consistent'}</span>
                  </div>
                  <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-cyberpunk-pink" 
                      style={{ width: result === 'lie' ? '40%' : '90%' }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex gap-4 mt-8">
            <button
              onClick={tryAgain}
              className="flex items-center justify-center gap-2 flex-1 px-4 py-3 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
            >
              <RefreshCw className="h-4 w-4" />
              <span>Try Again</span>
            </button>
            
            <button
              className="flex items-center justify-center gap-2 flex-1 px-4 py-3 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
            >
              <Share2 className="h-4 w-4" />
              <span>Share Results</span>
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Results;
