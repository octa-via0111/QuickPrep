import React, { useState, useRef, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Disc3, RotateCw, ArrowRight, Utensils, Clock, CheckCircle } from 'lucide-react';
import { formatRupiah, formatTime } from '../utils/formatter.js';

// Web Audio API tick generator
const playWheelTick = () => {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(600, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(120, ctx.currentTime + 0.05);

    gain.gain.setValueAtTime(0.15, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.06);
  } catch (e) {
    // Ignore audio error if browser blocks auto audio
  }
};

const WHEEL_COLORS = [
  '#260F3D', // Deep Purple
  '#E0623A', // Terracotta
  '#4E7C5D', // Sage Green
  '#F59E0B', // Amber
  '#431C75', // Royal Plum
  '#D97706', // Warm Ochre
  '#2563EB', // Soft Blue
  '#C85228'  // Dark Terracotta
];

export const SpinWheel = ({ recipes = [], onSelectRecipe }) => {
  const [spinning, setSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [winner, setWinner] = useState(null);
  const canvasRef = useRef(null);

  // Take at most 8 candidate recipes for clean wheel slices
  const candidateRecipes = recipes.length > 0 ? recipes.slice(0, 8) : [];
  const numSlices = candidateRecipes.length;

  // Draw the wheel onto the canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || numSlices === 0) return;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    const radius = width / 2 - 12;
    const centerX = width / 2;
    const centerY = height / 2;
    const sliceAngle = (2 * Math.PI) / numSlices;

    ctx.clearRect(0, 0, width, height);

    // Draw outer golden ring
    ctx.save();
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius + 8, 0, 2 * Math.PI);
    ctx.fillStyle = '#E8DFD3';
    ctx.fill();
    ctx.restore();

    // Draw each slice
    candidateRecipes.forEach((recipe, i) => {
      const angle = i * sliceAngle;
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, radius, angle, angle + sliceAngle);
      ctx.closePath();

      ctx.fillStyle = WHEEL_COLORS[i % WHEEL_COLORS.length];
      ctx.fill();
      ctx.lineWidth = 2.5;
      ctx.strokeStyle = '#FFFFFF';
      ctx.stroke();

      // Text label inside slice
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(angle + sliceAngle / 2);
      ctx.textAlign = 'right';
      ctx.fillStyle = '#FFFFFF';
      ctx.font = 'bold 12.5px "Plus Jakarta Sans", sans-serif';
      ctx.shadowColor = 'rgba(0,0,0,0.3)';
      ctx.shadowBlur = 4;
      
      // Truncate recipe title for slice
      let title = recipe.name;
      if (title.length > 18) title = title.substring(0, 16) + '...';
      ctx.fillText(title, radius - 20, 4);
      ctx.restore();

      ctx.restore();
    });

    // Draw center hub pin
    ctx.save();
    ctx.beginPath();
    ctx.arc(centerX, centerY, 32, 0, 2 * Math.PI);
    ctx.fillStyle = '#FFFFFF';
    ctx.fill();
    ctx.lineWidth = 4;
    ctx.strokeStyle = '#E0623A';
    ctx.stroke();

    // Center icon
    ctx.fillStyle = '#E0623A';
    ctx.font = '800 12px "Plus Jakarta Sans", sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('SPIN', centerX, centerY);
    ctx.restore();
  }, [candidateRecipes, numSlices]);

  const handleSpin = () => {
    if (spinning || numSlices === 0) return;

    setSpinning(true);
    setWinner(null);

    // Choose random winner index
    const randomIndex = Math.floor(Math.random() * numSlices);
    const sliceAngleDegrees = 360 / numSlices;
    
    // Calculate rotation:
    // The top pointer is at 270 deg (top). We want the random slice centered there.
    // extra full spins: 5 to 7 turns
    const extraSpins = 360 * (5 + Math.floor(Math.random() * 3));
    // Center of chosen slice in wheel degrees: randomIndex * sliceAngleDegrees + sliceAngleDegrees / 2
    const targetOffset = 270 - (randomIndex * sliceAngleDegrees + sliceAngleDegrees / 2);
    const totalRotation = rotation + extraSpins + ((targetOffset - (rotation % 360) + 360) % 360);

    setRotation(totalRotation);

    // Audio tick interval
    let tickCount = 0;
    const tickInterval = setInterval(() => {
      playWheelTick();
      tickCount++;
      if (tickCount > 25) clearInterval(tickInterval);
    }, 140);

    // Animation duration: 4.5s
    setTimeout(() => {
      clearInterval(tickInterval);
      setSpinning(false);
      const selected = candidateRecipes[randomIndex];
      setWinner(selected);
      if (onSelectRecipe) onSelectRecipe(selected);

      // Trigger Confetti!
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#E0623A', '#5B8266', '#F59E0B', '#FFFFFF']
        });
      } catch (e) {}
    }, 4500);
  };

  if (numSlices === 0) {
    return (
      <div className="card" style={{ padding: '32px', textAlign: 'center' }}>
        <p style={{ color: 'var(--text-muted)' }}>
          Tidak ada resep yang cocok dengan filter saat ini untuk dimasukkan ke roda putar.
        </p>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '24px' }}>
      {/* Wheel Wrapper */}
      <div style={{
        position: 'relative',
        width: '320px',
        height: '320px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        {/* Top Pointer / Needle */}
        <div style={{
          position: 'absolute',
          top: '-12px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 10,
          width: 0,
          height: 0,
          borderLeft: '14px solid transparent',
          borderRight: '14px solid transparent',
          borderTop: '28px solid #2E231F',
          filter: 'drop-shadow(0 3px 6px rgba(0,0,0,0.3))'
        }} />

        {/* Rotating Canvas Wheel */}
        <canvas
          ref={canvasRef}
          width={320}
          height={320}
          style={{
            transform: `rotate(${rotation}deg)`,
            transition: spinning ? 'transform 4.5s cubic-bezier(0.15, 0.9, 0.2, 1)' : 'none',
            borderRadius: '50%',
            boxShadow: '0 10px 30px rgba(46, 35, 31, 0.15)'
          }}
        />
      </div>

      {/* Spin Button */}
      <button
        onClick={handleSpin}
        disabled={spinning}
        className="btn-primary"
        style={{
          padding: '14px 36px',
          fontSize: '16px',
          fontWeight: '700',
          cursor: spinning ? 'not-allowed' : 'pointer',
          opacity: spinning ? 0.75 : 1,
          transform: spinning ? 'scale(0.98)' : 'scale(1)',
          background: 'linear-gradient(135deg, #260F3D 0%, #E0623A 100%)',
          boxShadow: '0 6px 20px rgba(38, 15, 61, 0.3)'
        }}
      >
        <RotateCw size={20} className={spinning ? 'animate-spin' : ''} />
        <span>{spinning ? 'Roda Berputar...' : 'Putar Resep Sekarang!'}</span>
      </button>

      {/* Winner Modal / Card */}
      {winner && !spinning && (
        <div className="card" style={{
          maxWidth: '460px',
          width: '100%',
          padding: '24px',
          border: '2px solid var(--primary)',
          background: 'var(--bg-card-warm)',
          animation: 'modalPop 0.3s ease'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--sage)', marginBottom: '8px' }}>
            <CheckCircle size={18} />
            <span style={{ fontSize: '13px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Hasil Spin Untukmu!
            </span>
          </div>

          <div style={{ display: 'flex', gap: '16px', alignItems: 'center', marginBottom: '16px' }}>
            <img
              src={winner.image_url}
              alt={winner.name}
              style={{
                width: '84px',
                height: '84px',
                borderRadius: '16px',
                objectFit: 'cover'
              }}
            />
            <div>
              <h3 style={{ fontSize: '18px', fontWeight: '800', marginBottom: '4px' }}>
                {winner.name}
              </h3>
              <div style={{ fontSize: '14px', fontWeight: '700', color: 'var(--primary)', marginBottom: '4px' }}>
                {formatRupiah(winner.estimated_cost)}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: 'var(--text-muted)' }}>
                <span>Durasi: {formatTime(winner.cooking_time)}</span>
                <span>|</span>
                <span>Tingkat: {winner.difficulty}</span>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <a
              href={`/recipe/${winner.id}`}
              className="btn-primary"
              style={{ flex: 1, padding: '10px 16px', fontSize: '14px' }}
            >
              <span>Lihat Detail Resep</span>
              <ArrowRight size={16} />
            </a>
            <button
              onClick={handleSpin}
              className="btn-secondary"
              style={{ padding: '10px 16px', fontSize: '14px' }}
            >
              Spin Ulang
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SpinWheel;
