
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Home, Settings, Info, Menu, X } from 'lucide-react';
import AnimatedBackground from './AnimatedBackground';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = React.useState(false);
  
  const navItems = [
    { path: '/', name: 'Home', icon: <Home className="h-5 w-5" /> },
    { path: '/settings', name: 'Settings', icon: <Settings className="h-5 w-5" /> },
    { path: '/about', name: 'About', icon: <Info className="h-5 w-5" /> },
  ];
  
  const toggleMenu = () => setMenuOpen(!menuOpen);
  
  return (
    <div className="relative h-full w-full overflow-hidden bg-cyberpunk-dark text-cyberpunk-light">
      <AnimatedBackground />
      
      {/* Mobile menu toggle */}
      <button 
        onClick={toggleMenu}
        className="fixed top-4 right-4 z-50 p-2 rounded-full bg-black/30 backdrop-blur-md border border-white/10 text-white"
        aria-label={menuOpen ? "Close menu" : "Open menu"}
      >
        {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>
      
      {/* Mobile navigation overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/80 backdrop-blur-md"
            onClick={toggleMenu}
          >
            <motion.nav 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25 }}
              className="absolute right-0 top-0 bottom-0 w-64 bg-black/50 backdrop-blur-xl p-6 pt-20"
              onClick={e => e.stopPropagation()}
            >
              <ul className="space-y-4">
                {navItems.map((item) => (
                  <li key={item.path}>
                    <Link 
                      to={item.path}
                      className={`flex items-center gap-3 p-3 rounded-lg transition-all
                                ${location.pathname === item.path 
                                  ? 'bg-white/10 text-white' 
                                  : 'text-white/70 hover:text-white hover:bg-white/5'}`}
                      onClick={toggleMenu}
                    >
                      {item.icon}
                      <span>{item.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Desktop navigation */}
      <nav className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-30 hidden md:block">
        <ul className="flex gap-1 p-1 bg-black/30 backdrop-blur-md rounded-full border border-white/10">
          {navItems.map((item) => (
            <li key={item.path}>
              <Link 
                to={item.path}
                className={`flex items-center justify-center h-12 w-12 rounded-full transition-all
                          ${location.pathname === item.path 
                            ? 'bg-white/10 text-white' 
                            : 'text-white/70 hover:text-white hover:bg-white/5'}`}
                aria-label={item.name}
              >
                {item.icon}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      
      {/* Page content */}
      <main className="relative h-full w-full overflow-x-hidden overflow-y-auto pb-24">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="min-h-full w-full max-w-7xl mx-auto px-4 py-6 flex flex-col items-center"
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
};

export default Layout;
