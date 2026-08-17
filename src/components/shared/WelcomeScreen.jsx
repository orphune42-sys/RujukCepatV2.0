import React from 'react';
import { motion } from 'framer-motion';
import RC_Logo2 from '../../assets/RC_Logo2.png';

export default function WelcomeScreen() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white "
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
        <img src={RC_Logo2} alt="Logo" className="h-24 w-auto object-contain relative z-10" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-center"
      >
        <h1 className="text-3xl font-bold tracking-tight text-[#009360] flex items-center justify-center gap-1">
          Rujuk<span className="text-[#41c379]">Cepat</span>
        </h1>
        <p className="text-muted  mt-2 font-medium">Mempersiapkan Layanan Kesehatan...</p>
      </motion.div>
    </motion.div>
  );
}
