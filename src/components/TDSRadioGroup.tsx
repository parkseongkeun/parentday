import React from 'react';
import { motion } from 'framer-motion';

interface Option {
    label: string;
    value: string;
    icon?: string;
}

interface Props {
    options: Option[];
    value: string;
    onChange: (value: string) => void;
}

export const TDSRadioGroup: React.FC<Props> = ({ options, value, onChange }) => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
            {options.map((option) => (
                <motion.div
                    key={option.value}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => onChange(option.value)}
                    style={{
                        padding: '20px 0',
                        backgroundColor: 'transparent',
                        borderBottom: 'none',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        transition: 'all 0.1s'
                    }}
                >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        {option.icon && (
                            <img
                                src={option.icon}
                                alt={option.label}
                                style={{ width: '24px', height: '24px', borderRadius: '50%' }}
                            />
                        )}
                        <span style={{
                            fontSize: '18px',
                            fontWeight: '600',
                            color: value === option.value ? '#3182F6' : '#191F28',
                            transition: 'color 0.2s'
                        }}>
                            {option.label}
                        </span>
                    </div>
                    <div style={{
                        width: '24px',
                        height: '24px',
                        borderRadius: '50%',
                        border: value === option.value ? '8px solid #3182F6' : '1.5px solid #D1D6DB',
                        backgroundColor: '#FFF',
                        boxSizing: 'border-box',
                        transition: 'all 0.2s'
                    }} />
                </motion.div>
            ))}
        </div>
    );
};
