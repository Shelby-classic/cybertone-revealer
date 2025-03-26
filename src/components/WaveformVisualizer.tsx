
import React, { useRef, useEffect } from 'react';

interface WaveformVisualizerProps {
  audioData: Uint8Array | null;
  isAnalyzing: boolean;
  result: 'truth' | 'lie' | 'neutral' | null;
}

const WaveformVisualizer: React.FC<WaveformVisualizerProps> = ({ 
  audioData, 
  isAnalyzing, 
  result 
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Determine color based on result
  const getWaveColor = () => {
    if (isAnalyzing) return '#60A5FA'; // neutral/analyzing blue
    if (!result) return '#60A5FA'; // default neutral
    
    const colors = {
      truth: '#4ADE80',
      lie: '#FF5A5A',
      neutral: '#60A5FA'
    };
    
    return colors[result];
  };
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas size
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
    
    const waveColor = getWaveColor();
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    if (!audioData && !isAnalyzing) {
      // Draw a flat line when no audio data
      ctx.beginPath();
      ctx.moveTo(0, canvas.height / 2);
      ctx.lineTo(canvas.width, canvas.height / 2);
      ctx.strokeStyle = waveColor;
      ctx.lineWidth = 2;
      ctx.stroke();
      return;
    }
    
    // Draw waveform or animated bars if analyzing
    if (isAnalyzing) {
      // Create animated bars when analyzing
      const barCount = 64;
      const barWidth = canvas.width / barCount;
      const barMaxHeight = canvas.height * 0.8;
      
      for (let i = 0; i < barCount; i++) {
        // Create random heights that change over time
        const height = Math.sin(Date.now() / 200 + i * 0.3) * 20 + 30;
        const y = (canvas.height - height) / 2;
        
        ctx.fillStyle = waveColor;
        ctx.fillRect(i * barWidth, y, barWidth - 1, height);
      }
      
      // Request next frame for animation
      requestAnimationFrame(() => {
        if (isAnalyzing) {
          // Force re-render by updating state or props
        }
      });
    } else if (audioData) {
      // Draw actual audio data
      const barCount = audioData.length;
      const barWidth = canvas.width / barCount;
      const barMaxHeight = canvas.height * 0.8;
      
      ctx.fillStyle = waveColor;
      
      for (let i = 0; i < barCount; i++) {
        const percent = audioData[i] / 255;
        const height = percent * barMaxHeight;
        const y = (canvas.height - height) / 2;
        
        ctx.fillRect(i * barWidth, y, barWidth - 1, height);
      }
    }
    
  }, [audioData, isAnalyzing, result]);
  
  return (
    <div className={`
      w-full h-24 rounded-2xl overflow-hidden glass-panel
      ${result === 'truth' ? 'truth-glow' : result === 'lie' ? 'lie-glow' : 'neutral-glow'}
      transition-all duration-500
    `}>
      <canvas 
        ref={canvasRef} 
        className="w-full h-full"
      />
    </div>
  );
};

export default WaveformVisualizer;
