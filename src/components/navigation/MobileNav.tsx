import { useState, useEffect, ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface MobileNavProps {
  children: ReactNode;
  variant?: 'light' | 'dark';
}

export function MobileNav({ children, variant = 'dark' }: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const close = () => setIsOpen(false);

  return (
    <div className="md:hidden">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className={`p-2 transition-colors ${
          variant === 'light'
            ? 'text-[#001027] hover:text-[#29ad8d]'
            : 'text-white hover:text-[#E2FF54]'
        }`}
        aria-label={isOpen ? 'Close menu' : 'Open menu'}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/60 z-40 top-0 left-0 right-0 bottom-0"
              onClick={close}
              aria-hidden="true"
            />
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className="fixed top-16 left-4 right-4 z-50 bg-[#001027] border border-white/10 rounded-lg shadow-xl overflow-hidden"
            >
              <div
                className="flex flex-col gap-4 p-6"
                onClick={(e) => e.stopPropagation()}
              >
                {children}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
