
import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Sparkles } from 'lucide-react';

const Home: React.FC = () => {
  const navigate = useNavigate();
  
  const startDetection = () => {
    navigate('/detect');
  };
  
  return (
    <div className="flex flex-col items-center justify-center w-full max-w-3xl mx-auto h-full py-16 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="space-y-2 text-center mb-12"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="inline-block mb-2"
        >
          <span className="px-3 py-1 text-sm font-medium bg-white/10 backdrop-blur-md rounded-full">
            Voice Analysis Technology
          </span>
        </motion.div>
        
        <motion.h1 
          className="text-4xl md:text-6xl font-bold tracking-tight text-white"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <span className="block">Do Not Lie</span>
        </motion.h1>
        
        <motion.p
          className="mt-6 text-lg text-white/70 max-w-2xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.6 }}
        >
          Our advanced voice analysis technology can detect subtle patterns in your speech to determine if you're telling the truth or lying.
        </motion.p>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.9, duration: 0.6 }}
        className="w-full max-w-md glass-panel p-8 mb-12"
      >
        <h2 className="text-xl font-semibold mb-4">How It Works</h2>
        <ol className="space-y-4 text-white/80">
          <li className="flex gap-3">
            <span className="flex-shrink-0 flex items-center justify-center h-6 w-6 rounded-full bg-white/20 text-sm">1</span>
            <span>Speak clearly into your microphone</span>
          </li>
          <li className="flex gap-3">
            <span className="flex-shrink-0 flex items-center justify-center h-6 w-6 rounded-full bg-white/20 text-sm">2</span>
            <span>Our algorithm analyzes your voice patterns</span>
          </li>
          <li className="flex gap-3">
            <span className="flex-shrink-0 flex items-center justify-center h-6 w-6 rounded-full bg-white/20 text-sm">3</span>
            <span>Get instant results on whether you're telling the truth</span>
          </li>
        </ol>
      </motion.div>
      
      <motion.button
        onClick={startDetection}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1, duration: 0.6 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="flex items-center gap-2 px-8 py-4 text-lg font-medium rounded-lg 
                  bg-gradient-to-r from-cyberpunk-blue to-cyberpunk-purple
                  text-white shadow-lg interactive-btn neutral-glow"
      >
        <Sparkles className="h-5 w-5" />
        <span>Start Lie Detection</span>
      </motion.button>
      
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3, duration: 0.6 }}
        className="mt-8 text-sm text-white/50"
      >
        Disclaimer: This is a simulation for entertainment purposes only.
      </motion.p>
    </div>
  );
};

export default Home;
