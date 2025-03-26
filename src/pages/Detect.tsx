
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Mic, MicOff, ArrowLeft } from 'lucide-react';

import RecordButton from '../components/RecordButton';
import WaveformVisualizer from '../components/WaveformVisualizer';
import ResultCard from '../components/ResultCard';
import { useMicrophone } from '../hooks/useMicrophone';
import { useVoiceAnalysis } from '../hooks/useVoiceAnalysis';

const Detect: React.FC = () => {
  const navigate = useNavigate();
  const { 
    isRecording, 
    audioData, 
    startRecording, 
    stopRecording, 
    audioBlob,
    hasPermission,
    requestPermission
  } = useMicrophone();
  
  const {
    isAnalyzing,
    result,
    confidence,
    analyzeVoice,
    resetAnalysis
  } = useVoiceAnalysis();
  
  const [permissionRequested, setPermissionRequested] = useState(false);
  const [showInstructions, setShowInstructions] = useState(true);
  
  // Check microphone permission
  useEffect(() => {
    const checkPermission = async () => {
      if (hasPermission === null && !permissionRequested) {
        setPermissionRequested(true);
        await requestPermission();
      }
    };
    
    checkPermission();
  }, [hasPermission, permissionRequested, requestPermission]);
  
  // Handle audio recording
  const handleStartRecording = async () => {
    if (hasPermission === false) {
      toast.error('Microphone access is required');
      await requestPermission();
      return;
    }
    
    resetAnalysis();
    setShowInstructions(false);
    
    try {
      await startRecording();
      toast.success('Recording started');
    } catch (error) {
      console.error('Error starting recording:', error);
      toast.error('Failed to start recording');
    }
  };
  
  const handleStopRecording = () => {
    stopRecording();
    
    if (audioBlob) {
      analyzeVoice(audioBlob);
    }
  };
  
  // When new audio blob is available, analyze it
  useEffect(() => {
    if (audioBlob && !isRecording && !isAnalyzing && !result) {
      analyzeVoice(audioBlob);
    }
  }, [audioBlob, isRecording, isAnalyzing, result, analyzeVoice]);
  
  const handleTryAgain = () => {
    resetAnalysis();
    setShowInstructions(true);
  };
  
  const handleShare = () => {
    if (!result) return;
    
    // In a real app, this would create a shareable link
    // Here we'll just copy a fake result to clipboard
    const shareText = `I just took the "Do Not Lie" test and was found to be ${
      result === 'truth' ? 'telling the truth' : 
      result === 'lie' ? 'lying' : 
      'giving an unclear response'
    } with ${confidence}% confidence. Try it yourself!`;
    
    navigator.clipboard.writeText(shareText)
      .then(() => toast.success('Result copied to clipboard'))
      .catch(() => toast.error('Failed to copy result'));
  };
  
  const goBack = () => {
    if (isRecording) {
      stopRecording();
    }
    navigate('/');
  };
  
  return (
    <div className="flex flex-col w-full max-w-3xl mx-auto h-full">
      <header className="flex items-center justify-between py-4">
        <button 
          onClick={goBack}
          className="p-2 rounded-full hover:bg-white/10"
          aria-label="Go back"
        >
          <ArrowLeft className="h-6 w-6" />
        </button>
        
        <div className="flex items-center gap-2">
          <div className={`h-3 w-3 rounded-full ${hasPermission ? 'bg-truth' : 'bg-lie'}`} />
          <span className="text-sm">
            {hasPermission ? 'Microphone connected' : 'Microphone access required'}
          </span>
        </div>
      </header>
      
      <div className="flex-1 flex flex-col items-center justify-center gap-10 py-8">
        <AnimatePresence mode="wait">
          {showInstructions && !isRecording && !isAnalyzing && !result && (
            <motion.div
              key="instructions"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="glass-panel p-6 w-full max-w-md text-center"
            >
              <h2 className="text-xl font-semibold mb-4">Instructions</h2>
              <p className="text-white/80 mb-6">
                Press the record button and clearly state a sentence. 
                Our AI will analyze your voice patterns to determine if 
                you're telling the truth or lying.
              </p>
              <div className="flex justify-center">
                <button
                  onClick={() => setShowInstructions(false)}
                  className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
                >
                  Got it
                </button>
              </div>
            </motion.div>
          )}
          
          {!showInstructions && !result && (
            <motion.div
              key="recording-interface"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="flex flex-col items-center gap-8 w-full"
            >
              <div className="text-center">
                <h2 className="text-2xl font-bold mb-2">
                  {isRecording ? 'Speak Now' : isAnalyzing ? 'Analyzing...' : 'Ready to Begin'}
                </h2>
                <p className="text-white/70">
                  {isRecording 
                    ? 'Speak clearly into your microphone' 
                    : isAnalyzing 
                      ? 'Please wait while we analyze your statement'
                      : 'Press the button to start recording'}
                </p>
              </div>
              
              <WaveformVisualizer 
                audioData={audioData} 
                isAnalyzing={isAnalyzing}
                result={result}
              />
              
              <RecordButton
                onStartRecording={handleStartRecording}
                onStopRecording={handleStopRecording}
                isRecording={isRecording}
                disabled={isAnalyzing}
              />
            </motion.div>
          )}
          
          {result && (
            <motion.div
              key="result"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full"
            >
              <ResultCard
                result={result}
                confidence={confidence}
                onTryAgain={handleTryAgain}
                onShare={handleShare}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Detect;
