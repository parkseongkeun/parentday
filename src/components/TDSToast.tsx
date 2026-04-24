import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Props {
    message: string;
    show: boolean;
    onClose: () => void;
}

export const TDSToast: React.FC<Props> = ({ message, show, onClose }) => {
    useEffect(() => {
        if (show) {
            const timer = setTimeout(onClose, 3000);
            return () => clearTimeout(timer);
        }
    }, [show, onClose]);

    return (
        <AnimatePresence>
            {show && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 20, x: '-50%' }}
                    animate={{ opacity: 1, scale: 1, y: 0, x: '-50%' }}
                    exit={{ opacity: 0, scale: 0.9, y: 10, x: '-50%' }}
                    style={{
                        position: 'fixed',
                        bottom: '40px',
                        left: '50%',
                        backgroundColor: 'rgba(25, 31, 40, 0.9)',
                        color: '#FFFFFF',
                        padding: '16px 24px',
                        borderRadius: '16px',
                        fontSize: '15px',
                        fontWeight: '500',
                        zIndex: 1000,
                        textAlign: 'center',
                        boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
                        width: 'calc(100% - 48px)',
                        maxWidth: '400px'
                    }}
                >
                    {message}
                </motion.div>
            )}
        </AnimatePresence>
    );
};
