import React from 'react';
import { motion } from 'framer-motion';
import { HeartPulse } from 'lucide-react';

export default function WelcomeScreen() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white dark:bg-[#0a120e]"
    >
      <motion.div
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.5, 1, 0.5] 
        }}
        transition={{ 
          duration: 1.5, 
          repeat: Infinity,
          ease: "easeInOut" 
        }}
        className="mb-6 relative"
      >
        <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full"></div>
        <HeartPulse className="h-20 w-20 text-accent dark:text-primary relative z-10" />
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-center"
      >
        <h1 className="text-3xl font-bold tracking-tight text-text dark:text-text-dark flex items-center justify-center gap-1">
          Rujuk<span className="text-accent dark:text-primary">Cepat</span>
        </h1>
        <p className="text-muted dark:text-gray-400 mt-2 font-medium">Mempersiapkan Layanan Kesehatan...</p>
      </motion.div>
    </motion.div>
  );
}
