import React, { useState, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  Clock, 
  Wallet, 
  Heart, 
  Users, 
  ChevronLeft, 
  Volume2, 
  CheckSquare, 
  Square, 
  Sparkles, 
  HelpCircle, 
  ChefHat, 
  Share2,
  Wrench,
  AlertCircle,
  Play
} from 'lucide-react';
import useRecipeDetail from '../hooks/useRecipeDetail.js';
import { useFavorites } from '../hooks/useFavorites.js';
import { formatRupiah, formatTime, getDifficultyColor } from '../utils/formatter.js';
import SubstitutionModal from '../components/SubstitutionModal.jsx';

export const RecipeDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { recipe, loading, error } = useRecipeDetail(id);
  const { isFavorite, toggleFavorite } = useFavorites();

  // Serving Scaler state
  const [servings, setServings] = useState(1);
  const [servingsInitialized, setServingsInitialized] = useState(false);

  // Sync initial recipe servings once loaded
  if (recipe && !servingsInitialized) {
    setServings(recipe.servings || 1);
    setServingsInitialized(true);
  }

  // Checked ingredients tracker { [ingIndex]: boolean }
  const [checkedIngredients, setCheckedIngredients] = useState({});

  // Active substitutions applied: { [ingIndex]: substituteName }
  const [appliedSubstitutions, setAppliedSubstitutions] = useState({});

  // Substitution modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [modalIngredient, setModalIngredient] = useState({ index: null, name: '' });

  const isFav = recipe ? isFavorite(recipe.id) : false;
  const diffStyle = recipe ? getDifficultyColor(recipe.difficulty) : {};

  // Scale ingredient quantities based on servings multiplier
  const baseServings = recipe?.servings || 1;
  const scaleFactor = servings / baseServings;

  const scaledIngredients = useMemo(() => {
    if (!recipe || !recipe.ingredients) return [];
    return recipe.ingredients.map((ing, idx) => {
      const scaledQty = Number((ing.quantity * scaleFactor).toFixed(1));
      const isSubstituted = appliedSubstitutions[idx];
      return {
        ...ing,
        displayName: isSubstituted || ing.name,
        originalName: ing.name,
        isSubstituted: Boolean(isSubstituted),
        scaledQuantity: scaledQty % 1 === 0 ? Math.round(scaledQty) : scaledQty
      };
    });
  }, [recipe, scaleFactor, appliedSubstitutions]);

  const toggleCheckIngredient = (index) => {
    setCheckedIngredients(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const handleOpenSubstitution = (index, name) => {
    setModalIngredient({ index, name });
    setModalOpen(true);
  };

  const handleApplySubstitution = (substituteName) => {
    if (modalIngredient.index !== null) {
      setAppliedSubstitutions(prev => ({
        ...prev,
        [modalIngredient.index]: substituteName
      }));
    }
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div className="card skeleton" style={{ height: '360px', borderRadius: 'var(--radius-xl)' }} />
        <div className="card skeleton" style={{ height: '140px' }} />
        <div className="card skeleton" style={{ height: '240px' }} />
      </div>
    );
  }

  if (error || !recipe) {
    return (
      <div className="card" style={{ padding: '48px 24px', textAlign: 'center' }}>
        <AlertCircle size={40} color="var(--alert-red)" style={{ margin: '0 auto 12px' }} />
        <h2 style={{ fontSize: '20px', fontWeight: '800', marginBottom: '8px' }}>
          Resep Tidak Ditemukan
        </h2>
        <p style={{ fontSize: '14px', color: 'var(--text-muted)', marginBottom: '20px' }}>
          {error || 'Resep yang kamu tuju mungkin telah dipindahkan atau belum tersedia.'}
        </p>
        <button onClick={() => navigate('/explore')} className="btn-primary">
          Kembali ke Explore
        </button>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      {/* Back button & Action Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <button
          onClick={() => navigate(-1)}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '13.5px',
            fontWeight: '600',
            color: 'var(--text-muted)'
          }}
        >
          <ChevronLeft size={18} />
          <span>Kembali</span>
        </button>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={() => toggleFavorite(recipe.id)}
            className="btn-secondary"
            style={{
              padding: '8px 14px',
              fontSize: '13px',
              color: isFav ? 'var(--alert-red)' : 'var(--text-muted)'
            }}
          >
            <Heart size={16} fill={isFav ? 'currentColor' : 'none'} strokeWidth={isFav ? 0 : 2} />
            <span>{isFav ? 'Tersimpan' : 'Favorit'}</span>
          </button>
        </div>
      </div>

      {/* Hero Food Image & Title Banner */}
      <section className="card" style={{ overflow: 'hidden', border: 'none' }}>
        <div style={{
          position: 'relative',
          width: '100%',
          height: '320px',
          backgroundColor: '#F0ECE4'
        }}>
          <img
            src={recipe.image_url}
            alt={recipe.name}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            onError={(e) => {
              e.currentTarget.src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80';
            }}
          />
          <div style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            padding: '24px',
            background: 'linear-gradient(180deg, transparent 0%, rgba(46, 35, 31, 0.85) 100%)',
            color: '#FFFFFF'
          }}>
            <div style={{ display: 'flex', gap: '8px', marginBottom: '8px', flexWrap: 'wrap' }}>
              <span className="badge" style={{ background: diffStyle.bg, color: diffStyle.text }}>
                {recipe.difficulty}
              </span>
              <span className="badge" style={{ background: 'rgba(255,255,255,0.25)', color: '#FFF' }}>
                {recipe.category?.name || 'Praktis'}
              </span>
            </div>
            <h1 style={{ fontSize: '26px', fontWeight: '800', lineHeight: 1.25, color: '#FFFFFF' }}>
              {recipe.name}
            </h1>
          </div>
        </div>

        {/* Quick Recipe Info Bar */}
        <div style={{
          padding: '18px 24px',
          background: 'var(--bg-card-warm)',
          borderTop: '1px solid var(--border-subtle)',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
          gap: '16px',
          textAlign: 'center'
        }}>
          <div>
            <div style={{ fontSize: '11px', color: 'var(--text-light)', fontWeight: '600' }}>TOTAL WAKTU</div>
            <div style={{ fontSize: '15px', fontWeight: '800', color: 'var(--text-main)', marginTop: '2px' }}>
              ⏱️ {formatTime((recipe.preparation_time || 0) + recipe.cooking_time)}
            </div>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
              (Masak: {recipe.cooking_time} mnt)
            </div>
          </div>

          <div>
            <div style={{ fontSize: '11px', color: 'var(--text-light)', fontWeight: '600' }}>ESTIMASI TOTAL</div>
            <div style={{ fontSize: '15px', fontWeight: '800', color: 'var(--primary)', marginTop: '2px' }}>
              💰 {formatRupiah(Math.round(recipe.estimated_cost * scaleFactor))}
            </div>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
              ({formatRupiah(recipe.cost_per_serving)} / porsi)
            </div>
          </div>

          <div>
            <div style={{ fontSize: '11px', color: 'var(--text-light)', fontWeight: '600' }}>PORSI</div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              marginTop: '2px'
            }}>
              <button
                onClick={() => setServings(prev => Math.max(1, prev - 1))}
                style={{
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  background: 'var(--bg-secondary)',
                  fontWeight: '800',
                  color: 'var(--text-main)'
                }}
              >
                -
              </button>
              <span style={{ fontSize: '15px', fontWeight: '800' }}>{servings} Porsi</span>
              <button
                onClick={() => setServings(prev => prev + 1)}
                style={{
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  background: 'var(--bg-secondary)',
                  fontWeight: '800',
                  color: 'var(--text-main)'
                }}
              >
                +
              </button>
            </div>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
              Bahan otomatis diskalakan
            </div>
          </div>
        </div>
      </section>

      {/* Primary Action Buttons: Start Cooking Mode */}
      <div style={{
        display: 'flex',
        gap: '12px',
        flexWrap: 'wrap'
      }}>
        <Link
          to={`/cook/${recipe.id}`}
          className="btn-primary"
          style={{ flex: 1, padding: '14px 24px', fontSize: '15px', minWidth: '220px' }}
        >
          <Volume2 size={20} />
          <span>Masak dengan Panduan Suara</span>
        </Link>
      </div>

      {/* Description & Tips */}
      <div className="card" style={{ padding: '20px 24px' }}>
        <p style={{ fontSize: '14.5px', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '14px' }}>
          {recipe.description}
        </p>

        {recipe.tips && (
          <div style={{
            padding: '12px 16px',
            background: 'var(--sage-light)',
            borderLeft: '4px solid var(--sage)',
            borderRadius: 'var(--radius-sm)',
            fontSize: '13px',
            color: 'var(--sage-dark)',
            lineHeight: 1.5
          }}>
            <strong>💡 Tips Kunci:</strong> {recipe.tips}
          </div>
        )}
      </div>

      {/* Tools Needed */}
      {recipe.tools && recipe.tools.length > 0 && (
        <section className="card" style={{ padding: '20px 24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
            <Wrench size={18} color="var(--primary)" />
            <h3 style={{ fontSize: '16px', fontWeight: '800' }}>Alat Masak yang Dibutuhkan</h3>
          </div>

          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {recipe.tools.map((t, idx) => (
              <span
                key={idx}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '6px 14px',
                  borderRadius: 'var(--radius-full)',
                  background: 'var(--bg-secondary)',
                  fontSize: '13px',
                  fontWeight: '600',
                  color: 'var(--text-main)',
                  border: '1px solid var(--border-subtle)'
                }}
              >
                🍳 {t.name || t}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Ingredients Checklist with Substitutions Trigger */}
      <section className="card" style={{ padding: '20px 24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <CheckSquare size={18} color="var(--primary)" />
            <h3 style={{ fontSize: '17px', fontWeight: '800' }}>Daftar Bahan</h3>
          </div>
          <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
            Centang yang sudah kamu punya di kos
          </span>
        </div>

        <p style={{ fontSize: '12.5px', color: 'var(--text-muted)', marginBottom: '16px' }}>
          Tidak punya salah satu bahan? Klik tombol <strong>"Cari Pengganti"</strong> untuk melihat rekomendasi substitusi bumbu.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {scaledIngredients.map((ing, idx) => {
            const isChecked = Boolean(checkedIngredients[idx]);

            return (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '12px 14px',
                  borderRadius: 'var(--radius-md)',
                  background: isChecked ? '#F6F3EC' : 'var(--bg-card-warm)',
                  border: '1px solid var(--border-subtle)',
                  transition: 'background 0.2s'
                }}
              >
                {/* Left check and ingredient name */}
                <div 
                  onClick={() => toggleCheckIngredient(idx)}
                  style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer', flex: 1 }}
                >
                  {isChecked ? (
                    <CheckSquare size={20} color="var(--primary)" />
                  ) : (
                    <Square size={20} color="var(--text-light)" />
                  )}

                  <div>
                    <div style={{
                      fontSize: '14px',
                      fontWeight: '700',
                      color: isChecked ? 'var(--text-light)' : 'var(--text-main)',
                      textDecoration: isChecked ? 'line-through' : 'none'
                    }}>
                      {ing.displayName}
                      {ing.isSubstituted && (
                        <span style={{
                          marginLeft: '6px',
                          fontSize: '11px',
                          color: 'var(--primary)',
                          background: 'var(--primary-light)',
                          padding: '2px 6px',
                          borderRadius: '4px'
                        }}>
                          (Pengganti {ing.originalName})
                        </span>
                      )}
                    </div>
                    {ing.notes && (
                      <div style={{ fontSize: '11.5px', color: 'var(--text-muted)' }}>
                        {ing.notes}
                      </div>
                    )}
                  </div>
                </div>

                {/* Right Quantity & Substitute Action */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{
                    fontSize: '13.5px',
                    fontWeight: '700',
                    color: 'var(--primary)',
                    whiteSpace: 'nowrap'
                  }}>
                    {ing.scaledQuantity} {ing.unit}
                  </span>

                  <button
                    onClick={() => handleOpenSubstitution(idx, ing.originalName)}
                    style={{
                      padding: '4px 8px',
                      borderRadius: 'var(--radius-sm)',
                      background: 'var(--bg-secondary)',
                      fontSize: '11px',
                      fontWeight: '600',
                      color: 'var(--text-muted)',
                      border: '1px solid var(--border-subtle)',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                    title="Cari alternatif bahan ini jika tidak ada"
                  >
                    <Sparkles size={11} color="var(--primary)" />
                    <span>Ganti</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Step by Step Cooking Instructions */}
      <section className="card" style={{ padding: '20px 24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ChefHat size={18} color="var(--primary)" />
            <h3 style={{ fontSize: '17px', fontWeight: '800' }}>Langkah Memasak</h3>
          </div>
          <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
            {recipe.instructions?.length || 0} Langkah
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {(recipe.instructions || []).map((step, idx) => (
            <div
              key={idx}
              style={{
                display: 'flex',
                gap: '14px',
                padding: '16px',
                background: 'var(--bg-card-warm)',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-subtle)'
              }}
            >
              {/* Step Number Circle */}
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                background: 'var(--primary-light)',
                color: 'var(--primary)',
                fontWeight: '800',
                fontSize: '14px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                {step.step_number || idx + 1}
              </div>

              {/* Step Content */}
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
                  <h4 style={{ fontSize: '15px', fontWeight: '700', color: 'var(--text-main)' }}>
                    {step.title}
                  </h4>
                  {step.duration_minutes && (
                    <span style={{ fontSize: '11.5px', color: 'var(--text-light)', fontWeight: '600' }}>
                      ⏱️ ~{step.duration_minutes} mnt
                    </span>
                  )}
                </div>

                <p style={{ fontSize: '13.5px', color: 'var(--text-muted)', lineHeight: 1.55 }}>
                  {step.instruction}
                </p>

                {step.tips && (
                  <div style={{
                    marginTop: '8px',
                    fontSize: '12px',
                    color: 'var(--sage-dark)',
                    background: 'var(--sage-light)',
                    padding: '6px 10px',
                    borderRadius: 'var(--radius-sm)'
                  }}>
                    💡 {step.tips}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Floating Bottom Cook Action for Mobile */}
      <div style={{
        position: 'sticky',
        bottom: '76px',
        zIndex: 40,
        background: 'rgba(255, 253, 249, 0.95)',
        backdropFilter: 'blur(8px)',
        padding: '12px',
        borderRadius: 'var(--radius-full)',
        boxShadow: 'var(--shadow-lg)',
        border: '1px solid var(--border-subtle)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <div>
          <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Siap Memasak?</div>
          <div style={{ fontSize: '14px', fontWeight: '800', color: 'var(--primary)' }}>
            {recipe.name}
          </div>
        </div>

        <Link
          to={`/cook/${recipe.id}`}
          className="btn-primary"
          style={{ padding: '10px 20px', fontSize: '13.5px' }}
        >
          <Play size={16} fill="currentColor" />
          <span>Mulai Masak</span>
        </Link>
      </div>

      {/* Substitution Modal */}
      <SubstitutionModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        ingredientName={modalIngredient.name}
        substitutions={recipe.substitutions || []}
        onApplySubstitution={handleApplySubstitution}
      />
    </div>
  );
};

export default RecipeDetailPage;
