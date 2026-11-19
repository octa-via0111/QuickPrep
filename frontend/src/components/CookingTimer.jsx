import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Bell, Timer as TimerIcon } from 'lucide-react';

const playChime = () => {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();

    // 3 pleasant bell tones
    [523.25, 659.25, 783.99].forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.15);

      gain.gain.setValueAtTime(0.2, ctx.currentTime + idx * 0.15);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.15 + 0.6);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime + idx * 0.15);
      osc.stop(ctx.currentTime + idx * 0.15 + 0.65);
    });
  } catch (e) {
    console.warn('Audio chime failed:', e);
  }
};

export const CookingTimer = ({ initialMinutes = 3, label = 'Timer Memasak' }) => {
  const [totalSeconds, setTotalSeconds] = useState(initialMinutes * 60);
  const [timeLeft, setTimeLeft] = useState(initialMinutes * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  // Sync if initialMinutes changes
  useEffect(() => {
    const secs = initialMinutes * 60;
    setTotalSeconds(secs);
    setTimeLeft(secs);
    setIsRunning(false);
    setIsFinished(false);
  }, [initialMinutes]);

  useEffect(() => {
    let timer = null;
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            setIsRunning(false);
            setIsFinished(true);
            playChime();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isRunning, timeLeft]);

  const toggleRun = () => {
    if (timeLeft === 0) {
      setTimeLeft(totalSeconds);
      setIsFinished(false);
      setIsRunning(true);
    } else {
      setIsRunning(!isRunning);
    }
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(totalSeconds);
    setIsFinished(false);
  };

  const setPresetMinutes = (mins) => {
    setIsRunning(false);
    setTotalSeconds(mins * 60);
    setTimeLeft(mins * 60);
    setIsFinished(false);
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const progressPercent = totalSeconds > 0 ? ((totalSeconds - timeLeft) / totalSeconds) * 100 : 0;

  return (
    <div className="card" style={{
      padding: '20px',
      background: isFinished ? 'var(--warning-amber-light)' : 'var(--bg-card-warm)',
      border: isFinished ? '2px solid var(--warning-amber)' : '1px solid var(--border-subtle)',
      transition: 'all 0.3s ease'
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '16px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <TimerIcon size={18} color="var(--primary)" />
          <span style={{ fontSize: '14px', fontWeight: '700', color: 'var(--text-main)' }}>
            {label}
          </span>
        </div>

        {isFinished && (
          <span style={{
            fontSize: '12px',
            fontWeight: '700',
            color: 'var(--warning-amber)',
            display: 'flex',
            alignItems: 'center',
            gap: '4px'
          }}>
            <Bell size={14} className="animate-bounce" /> Waktu Selesai!
          </span>
        )}
      </div>

      {/* Progress Bar */}
      <div style={{
        width: '100%',
        height: '6px',
        backgroundColor: '#EAE3D9',
        borderRadius: '999px',
        overflow: 'hidden',
        marginBottom: '16px'
      }}>
        <div style={{
          height: '100%',
          width: `${progressPercent}%`,
          backgroundColor: isFinished ? 'var(--warning-amber)' : 'var(--primary)',
          transition: 'width 1s linear'
        }} />
      </div>

      {/* Large Digital Clock display */}
      <div style={{
        textAlign: 'center',
        fontSize: '44px',
        fontWeight: '800',
        letterSpacing: '2px',
        color: isFinished ? 'var(--warning-amber)' : 'var(--text-main)',
        fontVariantNumeric: 'tabular-nums',
        marginBottom: '16px'
      }}>
        {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
      </div>

      {/* Control Buttons */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', marginBottom: '16px' }}>
        <button
          onClick={toggleRun}
          className="btn-primary"
          style={{
            padding: '10px 24px',
            fontSize: '14px',
            background: isRunning ? '#E53E3E' : 'var(--primary)'
          }}
        >
          {isRunning ? <Pause size={16} /> : <Play size={16} />}
          <span>{isRunning ? 'Jeda (Pause)' : timeLeft === 0 ? 'Ulangi' : 'Mulai'}</span>
        </button>

        <button
          onClick={resetTimer}
          className="btn-secondary"
          style={{ padding: '10px 18px', fontSize: '14px' }}
          title="Reset Timer"
        >
          <RotateCcw size={16} />
          <span>Reset</span>
        </button>
      </div>

      {/* Quick Presets */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', flexWrap: 'wrap' }}>
        {[1, 3, 5, 10, 15].map(mins => (
          <button
            key={mins}
            onClick={() => setPresetMinutes(mins)}
            style={{
              padding: '4px 10px',
              borderRadius: '999px',
              fontSize: '12px',
              fontWeight: totalSeconds === mins * 60 ? '700' : '500',
              background: totalSeconds === mins * 60 ? 'var(--primary-light)' : 'var(--bg-card)',
              color: totalSeconds === mins * 60 ? 'var(--primary)' : 'var(--text-muted)',
              border: '1px solid var(--border-subtle)',
              cursor: 'pointer'
            }}
          >
            {mins} mnt
          </button>
        ))}
      </div>
    </div>
  );
};

export default CookingTimer;
