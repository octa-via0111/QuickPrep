import React, { useState, useMemo, useRef, useEffect } from 'react';
import { useParams, useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import confetti from 'canvas-confetti';
import { 
  Play, 
  RotateCcw, 
  ChevronLeft, 
  ChevronRight, 
  CheckCircle, 
  Clock, 
  Timer, 
  Star,
  Award,
  ArrowRight,
  ArrowLeft,
  X,
  ChefHat,
  RefreshCw,
  Sparkles
} from 'lucide-react';
import useRecipeDetail from '../hooks/useRecipeDetail.js';
import CookingTimer from '../components/CookingTimer.jsx';
import historyService from '../services/historyService.js';
import { addStoredHistory } from '../utils/storage.js';
import { goBackOneStep } from '../utils/navigation.js';

export const CookingModePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const { recipe, loading } = useRecipeDetail(id);

  // Ambil data bahan pengganti jika ada yang dipilih dari RecipeDetailPage
  const appliedSubstitutions = location.state?.appliedSubstitutions || {};

  const [completed, setCompleted] = useState(false);
  const [rating, setRating] = useState(5);
  const [cookingNotes, setCookingNotes] = useState('');
  const [savingHistory, setSavingHistory] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [showStepTimer, setShowStepTimer] = useState(false);

  // Otomatis sesuaikan instruksi langkah memasak jika ada bahan pengganti yang dipilih
  const steps = useMemo(() => {
    const rawSteps = recipe?.instructions || [];
    if (!appliedSubstitutions || Object.keys(appliedSubstitutions).length === 0) {
      return rawSteps;
    }

    const subList = [];
    const recipeIngredients = recipe?.ingredients || [];

    Object.entries(appliedSubstitutions).forEach(([idx, subName]) => {
      const orig = recipeIngredients[idx]?.name || recipeIngredients[idx]?.originalName;
      if (orig && subName) {
        subList.push({ original: orig.trim(), substitute: subName.trim() });
      }
    });

    if (subList.length === 0) return rawSteps;

    return rawSteps.map(step => {
      let text = step.instruction || '';
      let isChanged = false;
      const changes = [];

      subList.forEach(({ original, substitute }) => {
        const escaped = original.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const reg = new RegExp(`\\b${escaped}\\b`, 'gi');
        if (reg.test(text)) {
          isChanged = true;
          changes.push({ original, substitute });
          text = text.replace(reg, substitute);
        } else {
          const parts = original.split(' ');
          if (parts.length > 1 && parts[0].length >= 4) {
            const partEsc = parts[0].replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
            const partReg = new RegExp(`\\b${partEsc}\\b`, 'gi');
            if (partReg.test(text)) {
              isChanged = true;
              changes.push({ original, substitute });
              text = text.replace(partReg, substitute);
            }
          }
        }
      });

      return {
        ...step,
        instruction: text,
        isModifiedBySubstitution: isChanged,
        substitutionChanges: changes
      };
    });
  }, [recipe, appliedSubstitutions]);

  const totalSteps = steps.length;

  // Baca langkah saat ini langsung dari searchParams (?step=1, ?step=2, dst)
  // Ini memastikan back gesture bawaan HP / swipe kembali per langkah, tidak mental ke awal
  const stepQuery = parseInt(searchParams.get('step') || '1', 10);
  const targetStepIndex = !isNaN(stepQuery) && stepQuery >= 1 ? stepQuery - 1 : 0;
  const currentStepIndex = totalSteps > 0 ? Math.min(Math.max(0, targetStepIndex), totalSteps - 1) : targetStepIndex;
  const currentStep = steps[currentStepIndex];

  // Tutup layar selesai jika pengguna menekan back / mundur ke langkah memasak
  useEffect(() => {
    if (completed) {
      setCompleted(false);
    }
  }, [searchParams]);

  const handleNextStep = () => {
    if (currentStepIndex < totalSteps - 1) {
      const nextStepNumber = currentStepIndex + 2; // e.g. index 0 (Langkah 1) -> Langkah 2
      navigate(`/cook/${id}?step=${nextStepNumber}`, { state: location.state });
    } else {
      // Selesai semua langkah memasak!
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
    if (completed) {
      setCompleted(false);
      return;
    }
    if (currentStepIndex > 0) {
      // Jika browser memiliki history langkah sebelumnya, gunakan navigate(-1) agar selaras dengan swipe back HP
      if (window.history.state && window.history.state.idx > 0) {
        navigate(-1);
      } else {
        const prevStepNumber = currentStepIndex; // e.g. currentStepIndex 3 (Langkah 4) -> Langkah 3
        navigate(`/cook/${id}?step=${prevStepNumber}`, { state: location.state });
      }
    }
  };

  // --- DETEKSI GESTUR SENTUH / SWIPE HORIZONTAL (LAYAR HP) ---
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);
  const touchStartTime = useRef(0);
  const touchEndX = useRef(0);
  const touchEndY = useRef(0);

  const handleTouchStart = (e) => {
    if (!e.touches || e.touches.length === 0) return;
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
    touchEndX.current = e.touches[0].clientX;
    touchEndY.current = e.touches[0].clientY;
    touchStartTime.current = Date.now();
  };

  const handleTouchMove = (e) => {
    if (!e.touches || e.touches.length === 0) return;
    touchEndX.current = e.touches[0].clientX;
    touchEndY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = () => {
    const diffX = touchEndX.current - touchStartX.current;
    const diffY = touchEndY.current - touchStartY.current;
    const elapsed = Date.now() - touchStartTime.current;

    // Hanya picu jika swipe horizontal jelas:
    // 1. Jarak horizontal minimal 40px
    // 2. Horizontal jauh lebih dominan dibanding vertikal (tidak sedang scroll membaca resep)
    // 3. Durasi swipe cepat di bawah 700ms
    if (Math.abs(diffX) > 40 && Math.abs(diffX) > Math.abs(diffY) * 1.3 && elapsed < 700) {
      if (diffX > 0) {
        // Geser ke kanan (kiri -> kanan) = Langkah Sebelumnya
        handlePrevStep();
      } else {
        // Geser ke kiri (kanan -> kiri) = Langkah Selanjutnya
        handleNextStep();
      }
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

    // Simpan di local storage
    addStoredHistory(historyPayload);

    // Sinkronkan ke API / Supabase
    try {
      await historyService.createHistory(historyPayload);
    } catch (err) {
      console.warn('Simpan riwayat lokal berhasil:', err);
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

  // --- TAMPILAN SELESAI MEMASAK ---
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
            Selamat, Masakan Selesai!
          </h1>
          <p style={{ fontSize: '14.5px', color: 'var(--text-muted)', marginBottom: '24px' }}>
            Kamu berhasil memasak <strong style={{ color: 'var(--primary)' }}>{recipe.name}</strong> dengan panduan langkah demi langkah QuickPrep.
          </p>

          {/* Rating Bintang */}
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
                    transition: 'transform 0.1s',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer'
                  }}
                >
                  <Star size={28} fill={star <= rating ? 'currentColor' : 'none'} />
                </button>
              ))}
            </div>
          </div>

          {/* Catatan Pengalaman */}
          <div style={{ marginBottom: '24px', textAlign: 'left' }}>
            <label style={{ fontSize: '12.5px', fontWeight: '600', color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>
              Catatan Rasa / Pengalaman Memasak (Opsional):
            </label>
            <textarea
              className="input-field"
              rows={2}
              placeholder="Contoh: Enak banget, rasanya pas dan matangnya merata!"
              value={cookingNotes}
              onChange={(e) => setCookingNotes(e.target.value)}
              style={{ resize: 'none' }}
            />
          </div>

          {/* Tombol Simpan Riwayat */}
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
                fontWeight: '700',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px'
              }}>
                <CheckCircle size={16} />
                <span>Berhasil disimpan ke riwayat memasakmu.</span>
              </div>
            )}

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <button
                onClick={() => setCompleted(false)}
                className="btn-secondary"
                style={{ padding: '12px', fontSize: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
              >
                <ArrowLeft size={16} />
                <span>Lihat Kembali Langkah Memasak</span>
              </button>

              <button
                onClick={() => {
                  if (recipe?.id) {
                    navigate(`/recipe/${recipe.id}`);
                  } else {
                    goBackOneStep(navigate, location.pathname);
                  }
                }}
                className="btn-primary"
                style={{ padding: '12px', fontSize: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
              >
                <span>Lihat Detail Resep</span>
                <ArrowRight size={16} />
              </button>

              <button
                onClick={() => navigate('/')}
                className="btn-secondary"
                style={{ padding: '12px', fontSize: '14px' }}
              >
                Kembali ke Beranda
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // --- TAMPILAN MODE MEMASAK LANGKAH DEMI LANGKAH ---
  const currentDuration = currentStep?.duration_minutes || 2;
  const hasSubstitutions = Object.keys(appliedSubstitutions).length > 0;

  return (
    <div style={{
      maxWidth: '720px',
      margin: '0 auto',
      display: 'flex',
      flexDirection: 'column',
      gap: '20px'
    }}>
      {/* Header Mode Memasak */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '12px 0'
      }}>
        <button
          onClick={() => {
            if (recipe?.id) {
              navigate(`/recipe/${recipe.id}`);
            } else {
              goBackOneStep(navigate, location.pathname);
            }
          }}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '13px',
            fontWeight: '600',
            color: 'var(--text-muted)',
            background: 'none',
            border: 'none',
            cursor: 'pointer'
          }}
        >
          <X size={18} />
          <span>Keluar Mode Masak</span>
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <ChefHat size={18} color="var(--primary)" />
          <div style={{ fontSize: '13.5px', fontWeight: '800', color: 'var(--text-main)' }}>
            Langkah {currentStepIndex + 1} dari {totalSteps}
          </div>
        </div>
      </div>

      {/* Indikator Bahan Pengganti Diterapkan */}
      {hasSubstitutions && (
        <div style={{
          padding: '10px 14px',
          background: 'var(--primary-light)',
          borderRadius: 'var(--radius-md)',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          fontSize: '12.5px',
          fontWeight: '700',
          color: 'var(--primary)',
          border: '1px solid rgba(224, 98, 58, 0.2)'
        }}>
          <RefreshCw size={14} />
          <span>Bahan Pengganti Aktif: Langkah memasak telah disesuaikan otomatis dengan bahan pengganti pilihan Anda.</span>
        </div>
      )}

      {/* Progress Bar Langkah */}
      <div style={{
        width: '100%',
        height: '6px',
        backgroundColor: 'var(--bg-secondary)',
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

      {/* Card Instruksi Langkah Utama dengan Dukungan Geser / Swipe */}
      <div 
        className="card" 
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{
          padding: '24px',
          background: 'var(--bg-card-warm)',
          border: '1.5px solid var(--border-subtle)',
          touchAction: 'pan-y',
          position: 'relative'
        }}
      >
        {/* Step Badge & Tombol Timer */}
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
              border: '1px solid #C8E6C9',
              cursor: 'pointer'
            }}
          >
            <Timer size={15} />
            <span>{showStepTimer ? 'Sembunyikan Timer' : `Buka Timer (~${currentDuration} mnt)`}</span>
          </button>
        </div>

        {/* Judul Langkah */}
        <h2 style={{ fontSize: '22px', fontWeight: '800', color: 'var(--text-main)', marginBottom: '14px' }}>
          {currentStep?.title}
        </h2>

        {/* Teks Instruksi Langkah yang Jelas & Nyaman Dibaca */}
        <p style={{
          fontSize: '18px',
          lineHeight: 1.65,
          color: 'var(--text-main)',
          marginBottom: '20px',
          fontWeight: '500'
        }}>
          {currentStep?.instruction}
        </p>

        {/* Penanda jika langkah ini menggunakan bahan pengganti */}
        {currentStep?.isModifiedBySubstitution && (
          <div style={{
            marginBottom: '18px',
            fontSize: '12px',
            color: 'var(--primary)',
            background: 'var(--primary-light)',
            padding: '6px 12px',
            borderRadius: 'var(--radius-sm)',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            fontWeight: '700'
          }}>
            <RefreshCw size={13} />
            <span>Langkah disesuaikan ({currentStep.substitutionChanges?.map(c => `${c.substitute} menggantikan ${c.original}`).join(', ')})</span>
          </div>
        )}

        {/* Tips Langkah */}
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
            <strong>Catatan:</strong> {currentStep.tips}
          </div>
        )}

        {/* Timer Memasak Terintegrasi */}
        {showStepTimer && (
          <div style={{ marginBottom: '10px' }}>
            <CookingTimer 
              initialMinutes={currentDuration} 
              label={`Timer Langkah ${currentStepIndex + 1}: ${currentStep?.title}`} 
            />
          </div>
        )}
      </div>

      {/* Petunjuk Geser / Swipe untuk Pengguna HP */}
      <div style={{
        textAlign: 'center',
        fontSize: '12px',
        color: 'var(--text-muted)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        margin: '-6px 0 2px 0',
        userSelect: 'none'
      }}>
        <span>👉 Geser kanan untuk kembali</span>
        <span>•</span>
        <span>Geser kiri untuk lanjut 👈</span>
      </div>

      {/* Bar Navigasi Langkah: Sebelum & Lanjut */}
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
            flex: 1,
            padding: '14px 20px',
            fontSize: '14.5px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
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
            flex: 1.2,
            padding: '14px 20px',
            fontSize: '14.5px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px'
          }}
        >
          <span>{currentStepIndex === totalSteps - 1 ? 'Selesaikan Masakan 🎉' : 'Langkah Selanjutnya'}</span>
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
};

export default CookingModePage;
