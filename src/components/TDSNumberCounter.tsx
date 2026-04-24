import React, { useState, useEffect } from 'react';

interface Props {
    target: number;
}

export const TDSNumberCounter: React.FC<Props> = ({ target }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        let now = target;
        const interval = setInterval(() => {
            // Exponential deceleration logic: step size decreases as 'now' gets smaller
            const step = now / 10;
            now -= step;

            setCount(Math.ceil(target - now));

            // Stop condition when remaining decrement is negligible
            if (now < 0.05) {
                setCount(target);
                clearInterval(interval);
            }
        }, 50);

        return () => clearInterval(interval);
    }, [target]);

    return (
        <span style={{ fontSize: '64px', fontWeight: '800', color: '#3182F6' }}>
            {count}
        </span>
    );
};
