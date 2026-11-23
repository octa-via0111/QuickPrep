import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Disc3, SlidersHorizontal, RotateCw, Filter, Check, ChevronLeft } from 'lucide-react';
import useRecipes from '../hooks/useRecipes.js';
import useCategories from '../hooks/useCategories.js';
import toolService from '../services/toolService.js';
import SpinWheel from '../components/SpinWheel.jsx';
import { formatRupiah } from '../utils/formatter.js';

export const SpinPage = () => {
  const navigate = useNavigate();
  const [category, setCategory] = useState('semua');
  const [maxBudget, setMaxBudget] = useState('');
  const [tool, setTool] = useState('semua');
  const [maxCookingTime, setMaxCookingTime] = useState('');
  const [toolsList, setToolsList] = useState([]);

  const handleBack = () => {
    if (window.history.state && window.history.state.idx > 0) {
      navigate(-1);
    } else {
      navigate('/');
    }
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
          <SpinWheel recipes={recipes} />
        )}
      </div>
    </div>
  );
};

export default SpinPage;
