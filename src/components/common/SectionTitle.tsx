import React from 'react';
import { motion } from 'framer-motion';

const SectionTitle = ({ children }: { children: React.ReactNode }) => {
  return (
    <h2 className="text-4xl font-bold text-text mb-20 relative">
      {children}
      <motion.div
        className="absolute w-24 h-1 bg-primary bottom-[-20px] left-1/2"
        style={{ x: '-50%' }}
        initial={{ width: 0 }}
        whileInView={{ width: '6rem' }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true, amount: 0.8 }}
      />
    </h2>
  );
};

export default SectionTitle; 