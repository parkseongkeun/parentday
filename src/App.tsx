import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DotLottiePlayer } from '@dotlottie/react-player';
import { TDSButton } from './components/TDSButton';
import { TDSRadioGroup } from './components/TDSRadioGroup';
import { TDSToast } from './components/TDSToast';
import { TDSSkeleton } from './components/TDSSkeleton';
import { TDSNumberCounter } from './components/TDSNumberCounter';
import './App.css';

type Step = 'INTRO' | 'SELECT' | 'DRAG' | 'RESULT';

const App: React.FC = () => {
  const [step, setStep] = useState<Step>('INTRO');
  const [isLoading, setIsLoading] = useState(false);
  const [target, setTarget] = useState('');
  const [result, setResult] = useState<number | null>(null);
  const [showToast, setShowToast] = useState(false);
  const [isExploding, setIsExploding] = useState(false);
  const [dragY, setDragY] = useState(0);

  // Constants
  const DRAG_THRESHOLD = 150;

  // Haptic Feedback Helper
  const triggerHaptic = (type: 'light' | 'heavy' | 'success') => {
    if (typeof navigator !== 'undefined' && navigator.vibrate) {
      if (type === 'light') navigator.vibrate(10);
      else if (type === 'heavy') navigator.vibrate(50);
      else if (type === 'success') navigator.vibrate([30, 30, 40]);
    }
  };

  const handleStart = () => {
    if (target) {
      setIsLoading(true);
      setTimeout(() => {
        setStep('DRAG');
        setIsLoading(false);
      }, 700);
    }
  };

  const handleRelease = (_: any, info: any) => {
    if (info.offset.y > DRAG_THRESHOLD) {
      triggerHaptic('heavy');
      setIsExploding(true);
      setDragY(0);

      setTimeout(() => {
        setStep('RESULT');
        setIsExploding(false);
        const finalValue = [5, 10, 15][Math.floor(Math.random() * 3)];
        setResult(finalValue);
        triggerHaptic('success');
        setShowToast(true);
      }, 2000); // 2 seconds as requested
    } else {
      setDragY(0);
    }
  };

  return (
    <div className="app-container">
      <AnimatePresence>
        {(isExploding || isLoading) && (
          <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 100, overflow: 'hidden' }}>
            {isExploding && Array.from({ length: 70 }).map((_, i) => {
              const startX = Math.random() * 100; // in vw
              return (
                <motion.img
                  key={i}
                  src="/assets/carnation_petal.png"
                  draggable={false}
                  initial={{
                    x: `${startX}vw`,
                    y: `-10vh`,
                    scale: Math.random() * 0.2 + 0.25,
                    rotate: Math.random() * 360
                  }}
                  animate={{
                    y: '110vh',
                    x: [
                      `${startX}vw`,
                      `${startX + (Math.random() * 10 - 5)}vw`,
                      `${startX - (Math.random() * 10 - 5)}vw`,
                      `${startX + (Math.random() * 10 - 5)}vw`
                    ],
                    rotate: Math.random() * 1080,
                    opacity: [0, 1, 1, 0]
                  }}
                  transition={{
                    duration: 2 + Math.random() * 0.8,
                    delay: Math.random() * 1.2, // Spread out over time
                    ease: "linear",
                    opacity: { times: [0, 0.1, 0.9, 1] },
                    x: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                  }}
                  style={{ width: '40px', position: 'absolute', userSelect: 'none', filter: `blur(${Math.random() * 1}px)` }}
                />
              );
            })}
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {step === 'INTRO' && (
          <motion.div
            key="intro"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100dvh' }}
          >
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
              <div style={{ width: '280px', height: '280px' }}>
                <DotLottiePlayer
                  src="/intro.lottie"
                  autoplay
                  loop={false}
                />
              </div>
              <h1 style={{ marginTop: '32px', fontSize: '24px', fontWeight: '700', color: '#191F28', textAlign: 'center' }}>
                어버이날 깜짝 선물<br />용돈 뽑기 이벤트
              </h1>
            </div>
            <div style={{ padding: '24px', width: '100%' }}>
              <TDSButton onClick={() => setStep('SELECT')}>
                시작하기
              </TDSButton>
            </div>
          </motion.div>
        )}

        {isLoading && (
          <motion.div
            key="skeleton"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ flex: 1, padding: '20px 24px' }}
          >
            <div style={{ marginBottom: '60px' }}>
              <TDSSkeleton width="180px" height="32px" borderRadius="10px" />
              <div style={{ height: '8px' }} />
              <TDSSkeleton width="220px" height="32px" borderRadius="10px" />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '32px', marginTop: '60px', width: '100%' }}>
              <TDSSkeleton width="210px" height="250px" borderRadius="100px" />
              <TDSSkeleton width="2px" height="200px" borderRadius="0" />
            </div>
          </motion.div>
        )}

        {step === 'SELECT' && !isLoading && (
          <motion.div
            key="select"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            style={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100dvh' }}
          >
            <div style={{ paddingTop: '20px', paddingLeft: '24px', paddingBottom: '32px', textAlign: 'left' }}>
              <h1 style={{ marginBottom: '8px', fontSize: '22px', fontWeight: '700', lineHeight: '1.4' }}>용돈 뽑기</h1>
              <p style={{ fontSize: '17px', color: '#6B7684' }}>행운을 뽑아주세요</p>
            </div>

            <div style={{ padding: '0 20px' }}>
              <TDSRadioGroup
                options={[
                  { label: '엄마', value: '엄마', icon: '/assets/woman.png' },
                  { label: '아버지', value: '아버지', icon: '/assets/man.png' },
                  { label: '이모', value: '이모', icon: '/assets/aunt.png' }
                ]}
                value={target}
                onChange={setTarget}
              />
            </div>

            <div style={{ marginTop: 'auto', padding: '24px' }}>
              <TDSButton disabled={!target} onClick={handleStart}>
                시작하기
              </TDSButton>
            </div>
          </motion.div>
        )}

        {step === 'DRAG' && !isLoading && (
          <motion.div
            key="drag"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', height: '100dvh' }}
          >
            <div style={{ paddingTop: '20px', paddingLeft: '24px', width: '100%' }}>
              <h2 style={{ fontSize: '22px', fontWeight: '700', lineHeight: '1.4', margin: 0 }}>
                로켓을 아래로 당겨서<br />행운을 쏘아 올리세요!
              </h2>
            </div>

            <div style={{ position: 'relative', height: '450px', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'flex-start', marginTop: '60px' }}>
              <motion.div
                drag="y"
                dragConstraints={{ top: 0, bottom: 250 }}
                dragElastic={0.05}
                onDrag={(_, info) => {
                  setDragY(info.offset.y);
                  if (info.offset.y > 10 && Math.floor(info.offset.y) % 40 === 0) {
                    triggerHaptic('light');
                  }
                }}
                onDragEnd={handleRelease}
                animate={{ y: dragY === 0 ? 0 : dragY }}
                transition={dragY === 0 ? { type: 'spring', stiffness: 300, damping: 20 } : { duration: 0 }}
                style={{
                  cursor: 'grab',
                  zIndex: 10,
                  userSelect: 'none',
                  WebkitUserSelect: 'none'
                }}
              >
                <motion.img
                  src="/assets/rocket.png"
                  draggable={false}
                  style={{
                    width: '210px',
                    height: 'auto',
                    transformOrigin: 'top center',
                    scaleY: 1 + (dragY / 500),
                    scaleX: 1 - (dragY / 1000),
                    userSelect: 'none',
                    WebkitUserSelect: 'none',
                    pointerEvents: 'auto',
                    mixBlendMode: 'multiply'
                  }}
                />
              </motion.div>

              <div style={{
                position: 'absolute',
                top: '60px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '2px',
                height: '320px',
                background: 'linear-gradient(to bottom, #F2F4F6, transparent)',
                zIndex: 0
              }} />
            </div>
          </motion.div>
        )}

        {step === 'RESULT' && !isLoading && (
          <motion.div
            key="result"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100dvh', paddingBottom: '24px' }}
          >
            {!result ? (
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <motion.div
                  animate={{ scale: [1, 1.1, 1], rotate: [0, -5, 5, 0] }}
                  transition={{ repeat: Infinity, duration: 0.8 }}
                  style={{ fontSize: '80px' }}
                >
                  ✨
                </motion.div>
                <p style={{ marginTop: '24px', fontSize: '18px', fontWeight: '600', color: '#333D4B' }}>행운을 정하는 중...</p>
              </div>
            ) : (
              <div style={{ flex: 1, width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{ marginTop: '100px', textAlign: 'center' }}>
                  <span style={{ fontSize: '18px', fontWeight: '600', color: '#6B7684', display: 'block', marginBottom: '16px' }}>
                    {target}님에게 확정된 행운
                  </span>
                  <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center', gap: '6px' }}>
                    <TDSNumberCounter target={result} />
                    <span style={{ fontSize: '36px', fontWeight: '700', color: '#3182F6' }}>만원</span>
                  </div>
                </div>

                <div style={{ marginTop: 'auto', width: '100%' }}>
                  <TDSButton type="secondary" onClick={() => {
                    setStep('SELECT');
                    setResult(null);
                    setTarget('');
                  }}>
                    처음으로 돌아가기
                  </TDSButton>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <TDSToast
        show={showToast}
        message={`${target}님, ${result}만원 확정! 🧧`}
        onClose={() => setShowToast(false)}
      />
    </div >
  );
};

export default App;
