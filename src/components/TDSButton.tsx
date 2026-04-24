import React from 'react';
import { motion } from 'framer-motion';

interface Props {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  type?: 'primary' | 'secondary';
}

export const TDSButton: React.FC<Props> = ({ children, onClick, disabled, className, type = 'primary' }) => {
  return (
    <motion.button
      whileTap={{ scale: 0.96 }}
      onClick={onClick}
      disabled={disabled}
      style={{
        width: '100%',
        padding: '16px 24px',
        borderRadius: '16px',
        fontSize: '17px',
        fontWeight: '600',
        border: 'none',
        cursor: disabled ? 'not-allowed' : 'pointer',
        transition: 'all 0.2s',
        backgroundColor: type === 'primary'
          ? (disabled ? '#F2F4F6' : '#3182F6')
          : '#E8F3FF',
        color: type === 'primary'
          ? (disabled ? '#B0B8C1' : '#FFFFFF')
          : '#1B64DA',
      }}
      className={className}
    >
      {children}
    </motion.button>
  );
};
