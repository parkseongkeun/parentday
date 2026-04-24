import React from 'react';
import { motion } from 'framer-motion';

interface Props {
    width?: string | number;
    height?: string | number;
    borderRadius?: string | number;
}

export const TDSSkeleton: React.FC<Props> = ({
    width = '100%',
    height = '20px',
    borderRadius = '8px'
}) => {
    return (
        <div style={{
            width,
            height,
            borderRadius,
            backgroundColor: '#F2F4F6',
            overflow: 'hidden',
            position: 'relative'
        }}>
            <motion.div
                animate={{
                    x: ['-100%', '100%']
                }}
                transition={{
                    repeat: Infinity,
                    duration: 1.5,
                    ease: "linear"
                }}
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '50%',
                    height: '100%',
                    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent)',
                }}
            />
        </div>
    );
};
