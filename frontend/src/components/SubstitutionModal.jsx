import React from 'react';
import { X, Check, ArrowRight, AlertCircle, RefreshCw } from 'lucide-react';

export const SubstitutionModal = ({ 
  isOpen, 
  onClose, 
  ingredientName, 
  substitutions = [], 
  onApplySubstitution 
}) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div style={{
          padding: '20px',
          borderBottom: '1px solid var(--border-subtle)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div>
            <div style={{
              fontSize: '11px',
              fontWeight: '700',
              textTransform: 'uppercase',
              color: 'var(--primary)',
              letterSpacing: '0.5px'
            }}>
              Alternatif Bahan
            </div>
            <h2 style={{ fontSize: '18px', fontWeight: '800', marginTop: '2px' }}>
              Pengganti untuk: <span style={{ color: 'var(--primary)' }}>{ingredientName}</span>
            </h2>
          </div>

          <button
            onClick={onClose}
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'var(--bg-secondary)',
              color: 'var(--text-muted)'
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Content list */}
        <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {substitutions.length === 0 ? (
            <div style={{
              textAlign: 'center',
              padding: '24px 12px',
              background: 'var(--bg-secondary)',
              borderRadius: 'var(--radius-md)'
            }}>
              <AlertCircle size={28} color="var(--text-light)" style={{ margin: '0 auto 8px' }} />
              <p style={{ fontSize: '14px', fontWeight: '600', color: 'var(--text-main)' }}>
                Belum ada substitusi resmi untuk bahan ini
              </p>
              <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '4px' }}>
                Bahan ini memegang peranan kunci dalam cita rasa resep, atau disarankan untuk tetap menggunakan bahan aslinya.
              </p>
            </div>
          ) : (
            substitutions.map((sub, idx) => (
              <div
                key={idx}
                className="card"
                style={{
                  padding: '16px',
                  background: 'var(--bg-card-warm)',
                  border: '1.5px solid var(--border-subtle)'
                }}
              >
                {/* Proposed substitute */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '10px'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '50%',
                      background: 'var(--primary-light)',
                      color: 'var(--primary)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <RefreshCw size={13} />
                    </div>
                    <span style={{ fontSize: '15px', fontWeight: '800', color: 'var(--text-main)' }}>
                      {sub.substitute_ingredient}
                    </span>
                  </div>

                  <button
                    onClick={() => {
                      onApplySubstitution(sub.substitute_ingredient);
                      onClose();
                    }}
                    className="btn-primary"
                    style={{ padding: '6px 14px', fontSize: '12.5px' }}
                  >
                    <span>Pakai Ini</span>
                    <Check size={14} />
                  </button>
                </div>

                {/* Reason */}
                <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '12px' }}>
                  {sub.reason}
                </p>

                {/* Taste & Texture Impacts */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '8px',
                  background: '#F9F5EF',
                  padding: '10px 12px',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '12px'
                }}>
                  <div>
                    <span style={{ fontWeight: '700', color: 'var(--primary-dark)', display: 'block' }}>
                      Perubahan Rasa:
                    </span>
                    <span style={{ color: 'var(--text-muted)' }}>{sub.taste_change}</span>
                  </div>

                  <div>
                    <span style={{ fontWeight: '700', color: 'var(--sage-dark)', display: 'block' }}>
                      Perubahan Tekstur:
                    </span>
                    <span style={{ color: 'var(--text-muted)' }}>{sub.texture_change}</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div style={{
          padding: '14px 20px',
          borderTop: '1px solid var(--border-subtle)',
          display: 'flex',
          justifyContent: 'flex-end',
          background: 'var(--bg-secondary)'
        }}>
          <button onClick={onClose} className="btn-secondary" style={{ padding: '8px 18px', fontSize: '13px' }}>
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubstitutionModal;
