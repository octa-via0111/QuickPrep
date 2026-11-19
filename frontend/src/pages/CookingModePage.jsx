import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import confetti from 'canvas-confetti';
import { 
  Volume2, 
  VolumeX, 
  Play, 
  Pause, 
  RotateCcw, 
  ChevronLeft, 
  ChevronRight, 
  CheckCircle, 
  Clock, 
  Timer, 
  Sparkles, 
  Star,
  Award,
  ArrowRight,
  Sliders,
  X
} from 'lucide-react';
import useRecipeDetail from '../hooks/useRecipeDetail.js';
import useSpeech from '../hooks/useSpeech.js';
import CookingTimer from '../components/CookingTimer.jsx';
import historyService from '../services/historyService.js';
import { addStoredHistory } from '../utils/storage.js';

export const CookingModePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { recipe, loading } = useRecipeDetail(id);

  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [rating, setRating] = useState(5);
  const [cookingNotes, setCookingNotes] = useState('');
  const [savingHistory, setSavingHistory] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [showStepTimer, setShowStepTimer] = useState(false);

  const {
    supported,
    isSpeaking,
    isPaused,
    speed,
    changeSpeed,
    speak,
    pause,
    resume,
    replay,
    stop
  } = useSpeech();

  const steps = recipe?.instructions || [];
  const currentStep = steps[currentStepIndex];
  const totalSteps = steps.length;

  // Speak current instruction when requested or when user changes steps
  const readCurrentInstruction = () => {
    if (!currentStep) return;
    const narrationText = `Langkah ke ${currentStep.step_number || currentStepIndex + 1}. ${currentStep.title}. ${currentStep.instruction}. ${currentStep.tips ? 'Tips penting: ' + currentStep.tips : ''}`;
    speak(narrationText);
  };

  // Stop audio speech when leaving page
  useEffect(() => {
    return () => stop();
  }, [stop]);

  const handleNextStep = () => {
    stop();
    if (currentStepIndex < totalSteps - 1) {
      setCurrentStepIndex(prev => prev + 1);
    } else {
      // Completed all steps!
      setCompleted(true);
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (e) {}
    }
  };

  const handlePrevStep = () => {
    stop();
    if (currentStepIndex > 0) {
      setCurrentStepIndex(prev => prev - 1);
    }
  };

  const handleSaveHistory = async () => {
    if (!recipe) return;
    setSavingHistory(true);

    const historyPayload = {
      recipe_id: recipe.id,
      recipe_name: recipe.name,
      servings_cooked: recipe.servings || 1,
      duration_minutes: recipe.cooking_time || 15,
      rating: Number(rating),
      notes: cookingNotes
    };

    // Save locally first
    addStoredHistory(historyPayload);

    // Sync to backend API
    try {
      await historyService.createHistory(historyPayload);
    } catch (err) {
      console.warn('Backend sync failed, saved locally in LocalStorage:', err);
    } finally {
      setSavingHistory(false);
      setSavedSuccess(true);
    }
  };

  if (loading || !recipe) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', padding: '20px' }}>
        <div className="card skeleton" style={{ height: '400px' }} />
      </div>
    );
  }

  // --- SCREEN 2: COOKING COMPLETED CELEBRATION ---
  if (completed) {
    return (
      <div style={{
        maxWidth: '560px',
        margin: '20px auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '24px'
      }}>
        <div className="card" style={{
          padding: '36px 24px',
          textAlign: 'center',
          background: 'var(--bg-card-warm)',
          border: '2px solid var(--sage)'
        }}>
          <div style={{
            width: '72px',
            height: '72px',
            borderRadius: '50%',
            background: 'var(--sage-light)',
            color: 'var(--sage)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 16px'
          }}>
            <Award size={36} />
          </div>

          <h1 style={{ fontSize: '24px', fontWeight: '800', marginBottom: '8px' }}>
            Selamat! Masakan Selesai 🎉
          </h1>
          <p style={{ fontSize: '14.5px', color: 'var(--text-muted)', marginBottom: '24px' }}>
            Kamu berhasil memasak <strong style={{ color: 'var(--primary)' }}>{recipe.name}</strong> dengan panduan suara QuickPrep.
          </p>

          {/* Rating Stars */}
          <div style={{ marginBottom: '20px' }}>
            <div style={{ fontSize: '13px', fontWeight: '700', color: 'var(--text-main)', marginBottom: '8px' }}>
              Bagaimana hasil masakanmu?
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '8px' }}>
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setRating(star)}
                  style={{
                    color: star <= rating ? '#F59E0B' : '#D1D5DB',
                    transition: 'transform 0.1s'
                  }}
                >
                  <Star size={28} fill={star <= rating ? 'currentColor' : 'none'} />
                </button>
              ))}
            </div>
          </div>

          {/* Notes input */}
          <div style={{ marginBottom: '24px', textAlign: 'left' }}>
            <label style={{ fontSize: '12.5px', fontWeight: '600', color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>
              Catatan Rasa / Pengalaman Memasak (Opsional):
            </label>
            <textarea
              className="input-field"
              rows={2}
              placeholder="Contoh: Enak banget, tadi ditambah cabai rawit ekstra makin mantap!"
              value={cookingNotes}
              onChange={(e) => setCookingNotes(e.target.value)}
              style={{ resize: 'none' }}
            />
          </div>

          {/* Action buttons */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {!savedSuccess ? (
              <button
                onClick={handleSaveHistory}
                disabled={savingHistory}
                className="btn-primary"
                style={{ padding: '12px', fontSize: '15px' }}
              >
                <CheckCircle size={18} />
                <span>{savingHistory ? 'Menyimpan...' : 'Simpan ke Riwayat Masak'}</span>
              </button>
            ) : (
              <div style={{
                padding: '10px',
                background: 'var(--success-green-light)',
                color: 'var(--success-green)',
                borderRadius: 'var(--radius-md)',
                fontSize: '13px',
                fontWeight: '700'
              }}>
                ✓ Berhasil disimpan ke riwayat memasakmu!
              </div>
            )}

            <button
              onClick={() => navigate('/')}
              className="btn-secondary"
              style={{ padding: '12px', fontSize: '14px' }}
            >
              Kembali ke Halaman Utama
            </button>
          </div>
        </div>
      </div>
    );
  }

  // --- SCREEN 1: ACTIVE STEP-BY-STEP VOICE COOKING MODE ---
  const currentDuration = currentStep?.duration_minutes || 2;

  return (
    <div style={{
      maxWidth: '720px',
      margin: '0 auto',
      display: 'flex',
      flexDirection: 'column',
      gap: '20px'
    }}>
      {/* Top Header Navigation */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '12px 0'
      }}>
        <button
          onClick={() => {
            stop();
            navigate(`/recipe/${recipe.id}`);
          }}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '13px',
            fontWeight: '600',
            color: 'var(--text-muted)'
          }}
        >
          <X size={18} />
          <span>Keluar Mode Masak</span>
        </button>

        <div style={{ fontSize: '13px', fontWeight: '700', color: 'var(--primary)' }}>
          Langkah {currentStepIndex + 1} dari {totalSteps}
        </div>
      </div>

      {/* Progress Bar of Steps */}
      <div style={{
        width: '100%',
        height: '6px',
        backgroundColor: '#EAE3D9',
        borderRadius: '999px',
        overflow: 'hidden'
      }}>
        <div style={{
          height: '100%',
          width: `${((currentStepIndex + 1) / totalSteps) * 100}%`,
          backgroundColor: 'var(--primary)',
          transition: 'width 0.3s ease'
        }} />
      </div>

      {/* Main Step Instruction Card */}
      <div className="card" style={{
        padding: '24px',
        background: 'var(--bg-card-warm)',
        border: '1.5px solid var(--border-subtle)'
      }}>
        {/* Step Badge & Duration */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '16px'
        }}>
          <span style={{
            fontSize: '13px',
            fontWeight: '800',
            textTransform: 'uppercase',
            color: 'var(--primary)',
            background: 'var(--primary-light)',
            padding: '4px 12px',
            borderRadius: '999px'
          }}>
            Langkah {currentStepIndex + 1}
          </span>

          <button
            onClick={() => setShowStepTimer(!showStepTimer)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '13px',
              fontWeight: '700',
              color: 'var(--sage)',
              background: 'var(--sage-light)',
              padding: '6px 12px',
              borderRadius: '999px',
              border: '1px solid #C8E6C9'
            }}
          >
            <Timer size={15} />
            <span>{showStepTimer ? 'Sembunyikan Timer' : `Buka Timer (~${currentDuration} mnt)`}</span>
          </button>
        </div>

        {/* Step Title */}
        <h2 style={{ fontSize: '22px', fontWeight: '800', color: 'var(--text-main)', marginBottom: '14px' }}>
          {currentStep?.title}
        </h2>

        {/* Big Step Instruction Text for Easy Reading */}
        <p style={{
          fontSize: '17px',
          lineHeight: 1.6,
          color: '#372B25',
          marginBottom: '20px'
        }}>
          {currentStep?.instruction}
        </p>

        {/* Step Tips */}
        {currentStep?.tips && (
          <div style={{
            padding: '12px 16px',
            background: 'var(--sage-light)',
            borderLeft: '4px solid var(--sage)',
            borderRadius: 'var(--radius-sm)',
            fontSize: '13.5px',
            color: 'var(--sage-dark)',
            lineHeight: 1.5,
            marginBottom: '18px'
          }}>
            <strong>💡 Perhatian:</strong> {currentStep.tips}
          </div>
        )}

        {/* Embedded Step Cooking Timer if toggled */}
        {showStepTimer && (
          <div style={{ marginBottom: '20px' }}>
            <CookingTimer 
              initialMinutes={currentDuration} 
              label={`Timer Langkah ${currentStepIndex + 1}: ${currentStep?.title}`} 
            />
          </div>
        )}

        {/* Voice Audio Controls Bar */}
        <div style={{
          padding: '16px',
          background: 'var(--bg-secondary)',
          borderRadius: 'var(--radius-lg)',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Volume2 size={18} color="var(--primary)" />
              <span style={{ fontSize: '13.5px', fontWeight: '700', color: 'var(--text-main)' }}>
                Panduan Suara QuickPrep (Bahasa Indonesia)
              </span>
            </div>

            {/* Speed Control Pill */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Kecepatan:</span>
              <select
                value={speed}
                onChange={(e) => changeSpeed(Number(e.target.value))}
                style={{
                  fontSize: '12px',
                  fontWeight: '700',
                  padding: '3px 8px',
                  borderRadius: '999px',
                  border: '1px solid var(--border-subtle)',
                  background: 'var(--bg-card)',
                  color: 'var(--text-main)',
                  outline: 'none'
                }}
              >
                <option value={0.75}>0.75x</option>
                <option value={1.0}>1x Normal</option>
                <option value={1.25}>1.25x</option>
                <option value={1.5}>1.5x</option>
                <option value={2.0}>2x Cepat</option>
              </select>
            </div>
          </div>

          {/* Voice Action Buttons: Play, Pause, Resume, Replay */}
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            {!isSpeaking && !isPaused ? (
              <button
                onClick={readCurrentInstruction}
                className="btn-primary"
                style={{ flex: 1, padding: '10px 16px', fontSize: '13.5px' }}
              >
                <Play size={16} fill="currentColor" />
                <span>Bacakan Instruksi Ini</span>
              </button>
            ) : isSpeaking ? (
              <button
                onClick={pause}
                className="btn-primary"
                style={{ flex: 1, padding: '10px 16px', fontSize: '13.5px', background: '#D97706' }}
              >
                <Pause size={16} />
                <span>Jeda Suara (Pause)</span>
              </button>
            ) : (
              <button
                onClick={resume}
                className="btn-primary"
                style={{ flex: 1, padding: '10px 16px', fontSize: '13.5px' }}
              >
                <Play size={16} fill="currentColor" />
                <span>Lanjutkan Suara (Resume)</span>
              </button>
            )}

            <button
              onClick={readCurrentInstruction}
              className="btn-secondary"
              style={{ padding: '10px 16px', fontSize: '13.5px' }}
              title="Ulangi Instruksi Langkah Ini"
            >
              <RotateCcw size={15} />
              <span>Ulangi Suara</span>
            </button>
          </div>
        </div>
      </div>

      {/* Step Navigation Bar: Prev & Next Step */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '12px'
      }}>
        <button
          onClick={handlePrevStep}
          disabled={currentStepIndex === 0}
          className="btn-secondary"
          style={{
            padding: '12px 20px',
            fontSize: '14px',
            opacity: currentStepIndex === 0 ? 0.4 : 1,
            cursor: currentStepIndex === 0 ? 'not-allowed' : 'pointer'
          }}
        >
          <ChevronLeft size={18} />
          <span>Langkah Sebelumnya</span>
        </button>

        <button
          onClick={handleNextStep}
          className="btn-primary"
          style={{
            padding: '12px 24px',
            fontSize: '14px',
            background: currentStepIndex === totalSteps - 1 ? 'var(--sage)' : 'var(--primary)'
          }}
        >
          <span>{currentStepIndex === totalSteps - 1 ? 'Selesai Memasak! 🎉' : 'Langkah Selanjutnya'}</span>
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
};

export default CookingModePage;
