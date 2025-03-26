
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { Volume2, VolumeX, Palette, RotateCcw } from 'lucide-react';

const Settings: React.FC = () => {
  const [sensitivity, setSensitivity] = useState(50);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [theme, setTheme] = useState('cyberpunk');
  
  const handleSensitivityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSensitivity(Number(e.target.value));
  };
  
  const handleSoundToggle = () => {
    setSoundEnabled(!soundEnabled);
    toast.success(`Sound effects ${!soundEnabled ? 'enabled' : 'disabled'}`);
  };
  
  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme);
    toast.success(`Theme changed to ${newTheme}`);
    // In a real app, you'd apply the theme here
  };
  
  const resetSettings = () => {
    setSensitivity(50);
    setSoundEnabled(true);
    setTheme('cyberpunk');
    toast.success('Settings reset to defaults');
  };
  
  return (
    <div className="flex flex-col w-full max-w-3xl mx-auto h-full py-8 px-4">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold mb-8 text-center"
      >
        Settings
      </motion.h1>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass-panel p-6 w-full max-w-md mx-auto mb-6"
      >
        <h2 className="text-xl font-semibold mb-4">Voice Sensitivity</h2>
        <p className="text-white/70 text-sm mb-4">
          Adjust how sensitive the lie detection algorithm is to variations in your voice.
        </p>
        
        <div className="space-y-2">
          <div className="flex justify-between">
            <span>Low</span>
            <span>High</span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={sensitivity}
            onChange={handleSensitivityChange}
            className="w-full h-2 bg-white/10 rounded-full appearance-none cursor-pointer"
          />
          <div className="text-center text-sm text-white/70">
            Current: {sensitivity}%
          </div>
        </div>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="glass-panel p-6 w-full max-w-md mx-auto mb-6"
      >
        <h2 className="text-xl font-semibold mb-4">Sound Effects</h2>
        <div className="flex items-center justify-between">
          <span className="text-white/70">
            {soundEnabled ? 'Enabled' : 'Disabled'}
          </span>
          <button
            onClick={handleSoundToggle}
            className={`relative w-12 h-6 rounded-full transition-colors ${
              soundEnabled ? 'bg-cyberpunk-blue' : 'bg-white/20'
            }`}
          >
            <span className={`absolute top-1 left-1 bg-white w-4 h-4 rounded-full transition-transform ${
              soundEnabled ? 'translate-x-6' : ''
            }`} />
            <span className="sr-only">{soundEnabled ? 'Disable' : 'Enable'} sound effects</span>
          </button>
        </div>
        <div className="mt-4 flex justify-center">
          <button
            onClick={handleSoundToggle}
            className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
          >
            {soundEnabled ? (
              <>
                <VolumeX className="h-4 w-4" />
                <span>Mute</span>
              </>
            ) : (
              <>
                <Volume2 className="h-4 w-4" />
                <span>Unmute</span>
              </>
            )}
          </button>
        </div>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="glass-panel p-6 w-full max-w-md mx-auto mb-8"
      >
        <h2 className="text-xl font-semibold mb-4">Themes</h2>
        <div className="grid grid-cols-3 gap-3">
          <button
            onClick={() => handleThemeChange('cyberpunk')}
            className={`aspect-video rounded-lg overflow-hidden border-2 transition-all ${
              theme === 'cyberpunk' ? 'border-cyberpunk-blue scale-105' : 'border-transparent'
            }`}
          >
            <div className="h-full w-full bg-gradient-to-br from-cyberpunk-blue via-cyberpunk-purple to-cyberpunk-pink" />
            <span className="sr-only">Cyberpunk theme</span>
          </button>
          
          <button
            onClick={() => handleThemeChange('minimal')}
            className={`aspect-video rounded-lg overflow-hidden border-2 transition-all ${
              theme === 'minimal' ? 'border-cyberpunk-blue scale-105' : 'border-transparent'
            }`}
          >
            <div className="h-full w-full bg-gradient-to-br from-gray-900 to-gray-800" />
            <span className="sr-only">Minimal theme</span>
          </button>
          
          <button
            onClick={() => handleThemeChange('dark')}
            className={`aspect-video rounded-lg overflow-hidden border-2 transition-all ${
              theme === 'dark' ? 'border-cyberpunk-blue scale-105' : 'border-transparent'
            }`}
          >
            <div className="h-full w-full bg-gradient-to-br from-black to-gray-900" />
            <span className="sr-only">Dark theme</span>
          </button>
        </div>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="flex justify-center"
      >
        <button
          onClick={resetSettings}
          className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
        >
          <RotateCcw className="h-4 w-4" />
          <span>Reset to Defaults</span>
        </button>
      </motion.div>
    </div>
  );
};

export default Settings;
