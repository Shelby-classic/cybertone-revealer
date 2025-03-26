
import React, { useRef, useEffect } from 'react';

const AnimatedBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas size
    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);
    
    // Particle system
    const particleCount = 100;
    const particles: Particle[] = [];
    
    interface Particle {
      x: number;
      y: number;
      radius: number;
      color: string;
      velocity: {
        x: number;
        y: number;
      };
      alpha: number;
      decreasing: boolean;
    }
    
    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
      const radius = Math.random() * 2 + 0.5;
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius,
        color: getRandomColor(),
        velocity: {
          x: (Math.random() - 0.5) * 0.3,
          y: (Math.random() - 0.5) * 0.3
        },
        alpha: Math.random() * 0.5 + 0.1,
        decreasing: Math.random() > 0.5
      });
    }
    
    function getRandomColor() {
      const colors = [
        'rgba(51, 195, 240, 1)',  // Cyberpunk blue
        'rgba(139, 92, 246, 1)',  // Cyberpunk purple
        'rgba(236, 72, 153, 1)'   // Cyberpunk pink
      ];
      return colors[Math.floor(Math.random() * colors.length)];
    }
    
    // Animation loop
    let animationFrameId: number;
    
    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Background gradient
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, 'rgba(23, 23, 23, 1)');
      gradient.addColorStop(1, 'rgba(31, 31, 31, 1)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Draw and update particles
      particles.forEach(particle => {
        // Update alpha (fade in/out effect)
        if (particle.decreasing) {
          particle.alpha -= 0.002;
          if (particle.alpha <= 0.1) {
            particle.decreasing = false;
          }
        } else {
          particle.alpha += 0.002;
          if (particle.alpha >= 0.5) {
            particle.decreasing = true;
          }
        }
        
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = particle.color.replace('1)', `${particle.alpha})`);
        ctx.fill();
        
        // Add glow effect
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius * 2, 0, Math.PI * 2);
        const glowGradient = ctx.createRadialGradient(
          particle.x, particle.y, particle.radius * 0.5,
          particle.x, particle.y, particle.radius * 4
        );
        glowGradient.addColorStop(0, particle.color.replace('1)', `${particle.alpha * 0.5})`));
        glowGradient.addColorStop(1, particle.color.replace('1)', '0)'));
        ctx.fillStyle = glowGradient;
        ctx.fill();
        
        // Move particles
        particle.x += particle.velocity.x;
        particle.y += particle.velocity.y;
        
        // Wrap around edges
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;
      });
      
      // Draw connection lines between nearby particles
      particles.forEach((particle, i) => {
        for (let j = i + 1; j < particles.length; j++) {
          const otherParticle = particles[j];
          const distance = Math.sqrt(
            Math.pow(particle.x - otherParticle.x, 2) + 
            Math.pow(particle.y - otherParticle.y, 2)
          );
          
          if (distance < 100) {
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            const opacity = 0.1 * (1 - distance / 100);
            ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      });
      
      animationFrameId = window.requestAnimationFrame(render);
    };
    
    render();
    
    // Cleanup
    return () => {
      window.cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', setCanvasSize);
    };
  }, []);
  
  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full -z-10"
    />
  );
};

export default AnimatedBackground;
