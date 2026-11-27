import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { 
  Disc3, 
  SlidersHorizontal, 
  RotateCw, 
  Filter, 
  Check, 
  ChevronLeft, 
  History, 
  Trash2, 
  ArrowRight, 
  Clock 
} from 'lucide-react';
import useRecipes from '../hooks/useRecipes.js';
import useCategories from '../hooks/useCategories.js';
import toolService from '../services/toolService.js';
import SpinWheel from '../components/SpinWheel.jsx';
import { formatRupiah, formatTime, getDifficultyColor, formatImageUrl } from '../utils/formatter.js';
import { goBackOneStep } from '../utils/navigation.js';
import { getStoredSpinHistory, clearStoredSpinHistory } from '../utils/storage.js';
import LazyImage from '../components/LazyImage.jsx';

export const SpinPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [category, setCategory] = useState('semua');
  const [maxBudget, setMaxBudget] = useState('');
  const [tool, setTool] = useState('semua');
  const [maxCookingTime, setMaxCookingTime] = useState('');
  const [toolsList, setToolsList] = useState([]);
  const [spinHistory, setSpinHistory] = useState([]);

  // Muat riwayat hasil spin dari localStorage
  useEffect(() => {
    setSpinHistory(getStoredSpinHistory());
  }, []);

  const handleClearHistory = () => {
    if (window.confirm('Yakin ingin menghapus semua riwayat hasil spin?')) {
      clearStoredSpinHistory();
      setSpinHistory([]);
    }
  };

  const handleBack = () => {
    goBackOneStep(navigate, location.pathname);
  };

  const { categories } = useCategories();

  useEffect(() => {
    toolService.getTools()
      .then(res => {
        if (res && res.success) setToolsList(res.data);
      })
      .catch(() => {});
  }, []);

  // Filter recipes strictly matching user settings
  const { recipes, loading } = useRecipes({
    category: category !== 'semua' ? category : undefined,
    maxBudget: maxBudget || undefined,
    tool: tool !== 'semua' ? tool : undefined,
    maxCookingTime: maxCookingTime || undefined
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', alignItems: 'center' }}>
      {/* Back button */}
      <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-start' }}>
        <button
          onClick={handleBack}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '13.5px',
            fontWeight: '600',
            color: 'var(--text-muted)',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: 0
          }}
        >
          <ChevronLeft size={18} />
          <span>Kembali</span>
        </button>
      </div>

      {/* Title */}
      <div style={{ textAlign: 'center', maxWidth: '540px' }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          background: 'var(--purple-light)',
          color: 'var(--purple-main)',
          border: '1px solid var(--purple-border)',
          padding: '5px 14px',
          borderRadius: '999px',
          fontSize: '12.5px',
          fontWeight: '700',
          marginBottom: '8px'
        }}>
          <Disc3 size={15} /> Fitur Unik QuickPrep
        </div>
        <h1 style={{ fontSize: '28px', fontWeight: '800', marginBottom: '6px', color: 'var(--purple-dark)' }}>
          Recipe <span style={{ color: 'var(--primary)' }}>Spin Wheel</span>
        </h1>
        <p style={{ fontSize: '14.5px', color: 'var(--text-muted)' }}>
          Lagi bingung mau masak apa hari ini? Atur filter kriteriamu dan biarkan roda roulette memilihkan menu terbaik untukmu!
        </p>
      </div>

      {/* Pre-Spin Filter Controls Card */}
      <div className="card" style={{
        maxWidth: '640px',
        width: '100%',
        padding: '20px 24px',
        background: 'var(--bg-card)',
        border: '1.5px solid var(--border-subtle)'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          marginBottom: '16px',
          fontSize: '14px',
          fontWeight: '700',
          color: 'var(--text-main)'
        }}>
          <SlidersHorizontal size={18} color="var(--primary)" />
          <span>Atur Filter Sebelum Memutar:</span>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
          gap: '12px'
        }}>
          {/* Category */}
          <div>
            <label style={{ fontSize: '12px', fontWeight: '600', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
              Kategori
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="input-field"
              style={{ padding: '8px 10px', fontSize: '13px' }}
            >
              <option value="semua">Semua Kategori</option>
              {categories.map(c => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>

          {/* Budget */}
          <div>
            <label style={{ fontSize: '12px', fontWeight: '600', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
              Maks Budget
            </label>
            <select
              value={maxBudget}
              onChange={(e) => setMaxBudget(e.target.value)}
              className="input-field"
              style={{ padding: '8px 10px', fontSize: '13px' }}
            >
              <option value="">Bebas Budget</option>
              <option value="8000">Maks. Rp8.000</option>
              <option value="10000">Maks. Rp10.000</option>
              <option value="15000">Maks. Rp15.000</option>
              <option value="20000">Maks. Rp20.000</option>
            </select>
          </div>

          {/* Tools */}
          <div>
            <label style={{ fontSize: '12px', fontWeight: '600', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
              Alat Masak
            </label>
            <select
              value={tool}
              onChange={(e) => setTool(e.target.value)}
              className="input-field"
              style={{ padding: '8px 10px', fontSize: '13px' }}
            >
              <option value="semua">Semua Alat</option>
              {toolsList.map(t => (
                <option key={t.id} value={t.id}>{t.name}</option>
              ))}
            </select>
          </div>

          {/* Cooking Time */}
          <div>
            <label style={{ fontSize: '12px', fontWeight: '600', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
              Waktu Masak
            </label>
            <select
              value={maxCookingTime}
              onChange={(e) => setMaxCookingTime(e.target.value)}
              className="input-field"
              style={{ padding: '8px 10px', fontSize: '13px' }}
            >
              <option value="">Bebas Durasi</option>
              <option value="12">Maks. 12 Menit</option>
              <option value="15">Maks. 15 Menit</option>
              <option value="20">Maks. 20 Menit</option>
            </select>
          </div>
        </div>

        {/* Filter candidate summary */}
        <div style={{
          marginTop: '14px',
          paddingTop: '12px',
          borderTop: '1px solid var(--border-subtle)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontSize: '12.5px',
          color: 'var(--text-muted)'
        }}>
          <span>Kandidat Resep di Roda:</span>
          <span style={{ fontWeight: '700', color: 'var(--primary)' }}>
            {recipes.length} menu cocok
          </span>
        </div>
      </div>

      {/* Spin Wheel Component */}
      <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
        {loading ? (
          <div className="card skeleton" style={{ width: '320px', height: '320px', borderRadius: '50%' }} />
        ) : (
          <SpinWheel 
            recipes={recipes} 
            onSelectRecipe={() => setSpinHistory(getStoredSpinHistory())} 
          />
        )}
      </div>

      {/* Riwayat Hasil Spin (Spin History) */}
      <section style={{ width: '100%', maxWidth: '640px', marginTop: '16px' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '14px',
          flexWrap: 'wrap',
          gap: '8px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{
              width: '32px',
              height: '32px',
              borderRadius: '8px',
              background: 'var(--purple-light)',
              color: 'var(--purple-main)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <History size={18} />
            </div>
            <h2 style={{ fontSize: '18px', fontWeight: '800', color: 'var(--text-main)', margin: 0 }}>
              Riwayat Hasil Spin
            </h2>
            {spinHistory.length > 0 && (
              <span className="badge" style={{ background: 'var(--primary-light)', color: 'var(--primary)' }}>
                {spinHistory.length} kali
              </span>
            )}
          </div>

          {spinHistory.length > 0 && (
            <button
              onClick={handleClearHistory}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
                fontSize: '12.5px',
                fontWeight: '600',
                color: '#EF4444',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '4px 8px'
              }}
              title="Hapus semua riwayat spin"
            >
              <Trash2 size={14} />
              <span>Hapus Riwayat</span>
            </button>
          )}
        </div>

        {spinHistory.length === 0 ? (
          <div className="card" style={{
            padding: '28px 20px',
            textAlign: 'center',
            background: 'var(--bg-card)',
            border: '1.5px dashed var(--border-subtle)'
          }}>
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              background: 'var(--bg-secondary)',
              color: 'var(--text-muted)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 10px'
            }}>
              <Disc3 size={24} />
            </div>
            <h4 style={{ fontSize: '14.5px', fontWeight: '700', marginBottom: '4px' }}>
              Belum Ada Riwayat Spin
            </h4>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)', margin: 0 }}>
              Putar roda roulette di atas untuk menentukan menu makanmu hari ini. Hasilnya akan otomatis tersimpan di sini!
            </p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {spinHistory.map((item) => {
              const diffStyle = item.difficulty ? getDifficultyColor(item.difficulty) : { bg: '#F3F4F6', text: '#374151' };
              const dateStr = item.spun_at 
                ? new Date(item.spun_at).toLocaleDateString('id-ID', {
                    day: 'numeric',
                    month: 'short',
                    hour: '2-digit',
                    minute: '2-digit'
                  })
                : 'Baru saja';

              return (
                <div 
                  key={item.id} 
                  className="card"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '12px 16px',
                    gap: '12px',
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border-subtle)',
                    transition: 'transform 0.15s ease'
                  }}
                >
                  {/* Left: Thumbnail & Info */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', minWidth: 0 }}>
                    <div style={{
                      width: '56px',
                      height: '56px',
                      borderRadius: '12px',
                      overflow: 'hidden',
                      flexShrink: 0,
                      background: 'var(--bg-secondary)'
                    }}>
                      <LazyImage
                        src={formatImageUrl(item.image_url)}
                        alt={item.name}
                        aspectRatio={null}
                        style={{ width: '100%', height: '100%' }}
                        imgStyle={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    </div>

                    <div style={{ minWidth: 0 }}>
                      <Link 
                        to={`/recipe/${item.recipe_id}`}
                        style={{
                          fontSize: '14.5px',
                          fontWeight: '800',
                          color: 'var(--text-main)',
                          textDecoration: 'none',
                          display: 'block',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap'
                        }}
                      >
                        {item.name}
                      </Link>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '4px', flexWrap: 'wrap' }}>
                        {item.estimated_cost && (
                          <span style={{ fontSize: '13px', fontWeight: '700', color: 'var(--primary)' }}>
                            {formatRupiah(item.estimated_cost)}
                          </span>
                        )}
                        {item.cooking_time && (
                          <span style={{ fontSize: '11.5px', color: 'var(--text-muted)', display: 'inline-flex', alignItems: 'center', gap: '3px' }}>
                            <Clock size={12} />
                            {formatTime(item.cooking_time)}
                          </span>
                        )}
                        <span style={{ fontSize: '11px', color: 'var(--text-light)' }}>
                          • {dateStr}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Right: Direct Link Button */}
                  <Link
                    to={`/recipe/${item.recipe_id}`}
                    className="btn-secondary"
                    style={{
                      padding: '8px 12px',
                      fontSize: '12px',
                      fontWeight: '700',
                      flexShrink: 0,
                      textDecoration: 'none',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                  >
                    <span>Resep</span>
                    <ArrowRight size={13} />
                  </Link>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
};

export default SpinPage;
