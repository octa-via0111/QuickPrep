import React, { useState } from 'react';
import { Wallet, Info, ArrowRight, Check, Sparkles, Filter } from 'lucide-react';
import useRecipes from '../hooks/useRecipes.js';
import RecipeCard from '../components/RecipeCard.jsx';
import { formatRupiah } from '../utils/formatter.js';

const BUDGET_PRESETS = [5000, 10000, 15000, 20000, 25000];

export const BudgetPage = () => {
  const [selectedBudget, setSelectedBudget] = useState(15000);
  const [customInput, setCustomInput] = useState('');

  // Fetch filtered recipes strictly <= selectedBudget from API
  const { recipes, loading } = useRecipes({
    maxBudget: selectedBudget,
    sort: 'cost_asc'
  });

  const handlePresetClick = (amount) => {
    setSelectedBudget(amount);
    setCustomInput('');
  };

  const handleCustomChange = (e) => {
    const val = e.target.value.replace(/[^0-9]/g, '');
    setCustomInput(val);
    if (val) {
      setSelectedBudget(Number(val));
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      {/* Title */}
      <div>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          background: 'var(--primary-light)',
          color: 'var(--primary)',
          padding: '4px 12px',
          borderRadius: '999px',
          fontSize: '12.5px',
          fontWeight: '700',
          marginBottom: '8px'
        }}>
          <Wallet size={15} /> Fitur Cook on Budget
        </div>
        <h1 style={{ fontSize: '26px', fontWeight: '800', marginBottom: '6px' }}>
          Masak Sesuai <span style={{ color: 'var(--primary)' }}>Uang di Kantong</span>
        </h1>
        <p style={{ fontSize: '14px', color: 'var(--text-muted)' }}>
          "Aku cuma punya uang sekian, bisa masak apa ya?" Tentukan budgetmu dan biarkan QuickPrep menyaring resep yang pas tanpa boncos.
        </p>
      </div>

      {/* Budget Selector Card */}
      <section className="card" style={{
        padding: '24px',
        background: 'var(--bg-card-warm)',
        border: '1.5px solid var(--border-subtle)',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px'
      }}>
        <div>
          <div style={{ fontSize: '13px', fontWeight: '700', color: 'var(--text-muted)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            Pilih Budget Maksimal
          </div>

          {/* Quick preset buttons */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))',
            gap: '10px'
          }}>
            {BUDGET_PRESETS.map((amount) => {
              const isSelected = selectedBudget === amount && !customInput;
              return (
                <button
                  key={amount}
                  onClick={() => handlePresetClick(amount)}
                  style={{
                    padding: '12px 8px',
                    borderRadius: 'var(--radius-md)',
                    border: isSelected ? '2px solid var(--primary)' : '1px solid var(--border-subtle)',
                    background: isSelected ? 'var(--primary-light)' : 'var(--bg-card)',
                    color: isSelected ? 'var(--primary)' : 'var(--text-main)',
                    fontWeight: isSelected ? '800' : '600',
                    fontSize: '14px',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                    textAlign: 'center',
                    boxShadow: isSelected ? 'var(--shadow-sm)' : 'none'
                  }}
                >
                  {formatRupiah(amount)}
                </button>
              );
            })}
          </div>
        </div>

        {/* Custom Input */}
        <div>
          <label style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text-main)', display: 'block', marginBottom: '6px' }}>
            Atau Masukkan Nominal Sendiri (Rp):
          </label>
          <div style={{ position: 'relative', maxWidth: '320px' }}>
            <span style={{
              position: 'absolute',
              left: '16px',
              top: '50%',
              transform: 'translateY(-50%)',
              fontWeight: '700',
              color: 'var(--text-muted)'
            }}>
              Rp
            </span>
            <input
              type="text"
              className="input-field"
              placeholder="Contoh: 12000"
              value={customInput}
              onChange={handleCustomChange}
              style={{ paddingLeft: '44px', fontWeight: '700' }}
            />
          </div>
        </div>

        {/* Active Target Banner */}
        <div style={{
          padding: '12px 16px',
          background: 'var(--bg-secondary)',
          borderRadius: 'var(--radius-md)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '8px'
        }}>
          <div>
            <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Maksimal Pengeluaran: </span>
            <span style={{ fontSize: '16px', fontWeight: '800', color: 'var(--primary)' }}>
              {formatRupiah(selectedBudget)}
            </span>
          </div>

          <span style={{ fontSize: '13px', fontWeight: '600', color: 'var(--sage)' }}>
            ✓ Ditemukan {recipes.length} menu yang memenuhi syarat
          </span>
        </div>
      </section>

      {/* Market Price Disclaimer Note */}
      <div style={{
        padding: '12px 16px',
        background: '#FFFBEB',
        border: '1px solid #FDE68A',
        borderRadius: 'var(--radius-md)',
        display: 'flex',
        alignItems: 'flex-start',
        gap: '10px',
        fontSize: '13px',
        color: '#92400E',
        lineHeight: 1.5
      }}>
        <Info size={18} style={{ flexShrink: 0, marginTop: '2px' }} />
        <div>
          <strong>Catatan Estimasi Biaya:</strong> Harga bahan dan resep merupakan estimasi harga rata-rata warung dan pasar tradisional, bukan harga real-time. Biaya aktual bisa sedikit berbeda tergantung lokasi daerah dan toko tempatmu berbelanja.
        </div>
      </div>

      {/* Recipes Listing */}
      <section>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
          <h2 style={{ fontSize: '19px', fontWeight: '800' }}>
            Menu Masakan ≤ {formatRupiah(selectedBudget)}
          </h2>
        </div>

        {loading ? (
          <div className="grid-recipes">
            {[1, 2, 3, 4].map(n => (
              <div key={n} className="card skeleton" style={{ height: '280px' }} />
            ))}
          </div>
        ) : recipes.length === 0 ? (
          <div className="card" style={{ padding: '40px 20px', textAlign: 'center' }}>
            <Wallet size={36} color="var(--primary)" style={{ margin: '0 auto 12px' }} />
            <h3 style={{ fontSize: '17px', fontWeight: '700', marginBottom: '6px' }}>
              Belum ada resep dengan budget di bawah {formatRupiah(selectedBudget)}
            </h3>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '16px' }}>
              Coba naikkan budget ke Rp10.000 atau Rp15.000 untuk melihat lebih banyak pilihan menu nikmat.
            </p>
            <button
              onClick={() => handlePresetClick(15000)}
              className="btn-primary"
              style={{ fontSize: '13px', padding: '8px 18px' }}
            >
              Ubah ke Rp15.000
            </button>
          </div>
        ) : (
          <div className="grid-recipes">
            {recipes.map(recipe => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default BudgetPage;
