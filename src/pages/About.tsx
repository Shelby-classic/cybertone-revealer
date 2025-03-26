
import React from 'react';
import { motion } from 'framer-motion';
import { Github, Mail, Info } from 'lucide-react';

const About: React.FC = () => {
  return (
    <div className="flex flex-col w-full max-w-3xl mx-auto h-full py-8 px-4">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold mb-8 text-center"
      >
        About Do Not Lie
      </motion.h1>
      
      <div className="flex flex-col gap-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-panel p-6"
        >
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Info className="h-5 w-5 text-cyberpunk-blue" />
            <span>How It Works</span>
          </h2>
          
          <p className="text-white/80 mb-4">
            Do Not Lie is an entertainment app that simulates lie detection technology. In a real-world application, lie detection would involve:
          </p>
          
          <ul className="list-disc pl-5 space-y-2 text-white/80 mb-4">
            <li>
              <span className="font-medium text-white">Voice Pattern Analysis:</span> Detecting micro-variations in vocal tone, pace, and pitch that can indicate stress when lying.
            </li>
            <li>
              <span className="font-medium text-white">Speech Hesitation Detection:</span> Identifying unnatural pauses or hesitations that might suggest fabrication.
            </li>
            <li>
              <span className="font-medium text-white">Stress Indicators:</span> Analyzing subtle changes in voice that correlate with heightened stress levels often present during deception.
            </li>
          </ul>
          
          <div className="p-4 bg-white/5 rounded-lg">
            <p className="text-white/70 text-sm italic">
              <strong>Disclaimer:</strong> This application is for entertainment purposes only. The "detection" results are randomly generated and not based on actual voice analysis. Real lie detection requires professional equipment and trained experts.
            </p>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-panel p-6"
        >
          <h2 className="text-xl font-semibold mb-4">Technology</h2>
          
          <p className="text-white/80 mb-4">
            This application is built with modern web technologies:
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {['React', 'TypeScript', 'TailwindCSS', 'Framer Motion'].map((tech) => (
              <div key={tech} className="bg-white/10 rounded-lg p-3 text-center text-sm">
                {tech}
              </div>
            ))}
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-panel p-6"
        >
          <h2 className="text-xl font-semibold mb-4">Design Philosophy</h2>
          
          <p className="text-white/80 mb-4">
            Do Not Lie was designed with a focus on minimalism, intuitiveness, and elegant user experience, drawing inspiration from design principles of simplicity and functionality. The interface prioritizes clarity and ease of use while maintaining a modern aesthetic.
          </p>
          
          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1 text-xs bg-white/10 rounded-full">Minimalism</span>
            <span className="px-3 py-1 text-xs bg-white/10 rounded-full">Intuitive UX</span>
            <span className="px-3 py-1 text-xs bg-white/10 rounded-full">Elegant Design</span>
            <span className="px-3 py-1 text-xs bg-white/10 rounded-full">Functional Beauty</span>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="glass-panel p-6"
        >
          <h2 className="text-xl font-semibold mb-4">Contact</h2>
          
          <div className="flex flex-col md:flex-row gap-4">
            <a 
              href="#" 
              className="flex items-center gap-2 px-4 py-3 bg-white/10 hover:bg-white/20 rounded-lg transition-colors text-center md:text-left"
            >
              <Github className="h-5 w-5" />
              <span>GitHub Repository</span>
            </a>
            
            <a 
              href="mailto:example@example.com" 
              className="flex items-center gap-2 px-4 py-3 bg-white/10 hover:bg-white/20 rounded-lg transition-colors text-center md:text-left"
            >
              <Mail className="h-5 w-5" />
              <span>Contact Developer</span>
            </a>
          </div>
        </motion.div>
      </div>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="text-center text-white/50 text-sm mt-12"
      >
        &copy; {new Date().getFullYear()} Do Not Lie. All rights reserved.
      </motion.div>
    </div>
  );
};

export default About;
