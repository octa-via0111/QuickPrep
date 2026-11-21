import React, { useState } from 'react';
import { 
  X, 
  User, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  AlertCircle, 
  CheckCircle2,
  LogIn
} from 'lucide-react';
import { useAuth } from '../context/AuthContext.jsx';
import { useNavigate } from 'react-router-dom';

export const AuthModal = () => {
  const { isAuthModalOpen, closeLogin, login } = useAuth();
  const navigate = useNavigate();

  // Form States (Satu Form Bersatu)
  const [name, setName] = useState('');
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');

  // UI States
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  if (!isAuthModalOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (!identifier.trim() || !password.trim()) {
      setErrorMessage('Email/Username dan kata sandi wajib diisi!');
      return;
    }

    try {
      setLoading(true);
      const res = await login({
        name: name.trim(),
        identifier: identifier.trim(),
        password: password
      });

      if (res?.data?.role === 'admin') {
        setSuccessMessage('Login Administrator berhasil! Mengalihkan ke panel...');
        setTimeout(() => {
          closeLogin();
          navigate('/admin');
        }, 600);
      } else {
        setSuccessMessage(res?.message || 'Login berhasil! Selamat datang.');
        setTimeout(() => {
          closeLogin();
        }, 600);
      }
    } catch (err) {
      setErrorMessage(err.message || 'Gagal masuk. Periksa kembali email/username dan kata sandi Anda.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(26, 12, 42, 0.65)',
      backdropFilter: 'blur(5px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '16px',
      zIndex: 2000,
      animation: 'fadeIn 0.2s ease'
    }}>
      <div style={{
        background: '#FFFDF9',
        borderRadius: '20px',
        width: '100%',
        maxWidth: '430px',
        boxShadow: '0 16px 40px rgba(31, 14, 52, 0.35)',
        border: '1px solid var(--border-subtle)',
        overflow: 'hidden',
        animation: 'scaleUp 0.2s ease'
      }}>
        {/* Header Modal - Solid Ungu Gelap */}
        <div style={{
          background: 'var(--purple-dark)',
          padding: '22px 22px 18px',
          color: '#FFFFFF',
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          gap: '12px'
        }}>
          <div>
            <div style={{ 
              fontSize: '11px', 
              fontWeight: '700', 
              letterSpacing: '0.8px', 
              color: 'var(--primary)', 
              textTransform: 'uppercase', 
              marginBottom: '3px' 
            }}>
              Akun QuickPrep
            </div>
            <h3 style={{ fontSize: '20px', fontWeight: '800', margin: 0, letterSpacing: '-0.3px', color: '#FFFFFF' }}>
              Masuk Akun
            </h3>
            <p style={{ fontSize: '12.5px', color: 'rgba(255, 255, 255, 0.8)', margin: '4px 0 0 0', lineHeight: 1.4 }}>
              Silakan masukkan data akun Anda untuk melanjutkan.
            </p>
          </div>

          <button
            onClick={closeLogin}
            title="Tutup"
            style={{
              background: 'rgba(255, 255, 255, 0.12)',
              border: 'none',
              borderRadius: '50%',
              width: '32px',
              height: '32px',
              color: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'background 0.15s ease'
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Form Body - SATU FORM TERSATU */}
        <div style={{ padding: '22px' }}>
          {/* Alert Error */}
          {errorMessage && (
            <div style={{
              padding: '11px 14px',
              borderRadius: 'var(--radius-md)',
              background: 'var(--alert-red-light)',
              color: 'var(--alert-red)',
              border: '1px solid #FECACA',
              fontSize: '13px',
              fontWeight: '600',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              marginBottom: '16px'
            }}>
              <AlertCircle size={17} style={{ flexShrink: 0 }} />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Alert Success */}
          {successMessage && (
            <div style={{
              padding: '11px 14px',
              borderRadius: 'var(--radius-md)',
              background: 'var(--success-green-light)',
              color: 'var(--success-green)',
              border: '1px solid #A7F3D0',
              fontSize: '13px',
              fontWeight: '700',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              marginBottom: '16px'
            }}>
              <CheckCircle2 size={17} style={{ flexShrink: 0 }} />
              <span>{successMessage}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            {/* Field 1: Nama Lengkap */}
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', marginBottom: '5px', color: 'var(--purple-dark)' }}>
                Nama Lengkap
              </label>
              <div style={{ position: 'relative' }}>
                <User size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Masukkan nama Anda (Contoh: Budi Santoso)"
                  className="input-field"
                  style={{ paddingLeft: '36px', height: '42px', fontSize: '13.5px' }}
                />
              </div>
            </div>

            {/* Field 2: Email atau Username */}
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', marginBottom: '5px', color: 'var(--purple-dark)' }}>
                Email atau Username <span style={{ color: 'var(--alert-red)' }}>*</span>
              </label>
              <div style={{ position: 'relative' }}>
                <Mail size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                <input
                  type="text"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  placeholder="nama@email.com atau username admin"
                  className="input-field"
                  required
                  autoComplete="username"
                  style={{ paddingLeft: '36px', height: '42px', fontSize: '13.5px' }}
                />
              </div>
            </div>

            {/* Field 3: Kata Sandi */}
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', marginBottom: '5px', color: 'var(--purple-dark)' }}>
                Kata Sandi <span style={{ color: 'var(--alert-red)' }}>*</span>
              </label>
              <div style={{ position: 'relative' }}>
                <Lock size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Masukkan kata sandi"
                  className="input-field"
                  required
                  autoComplete="current-password"
                  style={{ paddingLeft: '36px', paddingRight: '38px', height: '42px', fontSize: '13.5px' }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: 'absolute',
                    right: '10px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: '4px',
                    color: 'var(--text-muted)'
                  }}
                  title={showPassword ? 'Sembunyikan sandi' : 'Tampilkan sandi'}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Tombol Masuk Tunggal */}
            <button
              type="submit"
              disabled={loading}
              style={{
                height: '46px',
                borderRadius: 'var(--radius-full)',
                background: 'var(--primary)',
                color: '#FFFFFF',
                fontWeight: '700',
                fontSize: '14.5px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                cursor: loading ? 'not-allowed' : 'pointer',
                opacity: loading ? 0.75 : 1,
                boxShadow: 'var(--shadow-warm)',
                marginTop: '6px',
                border: 'none'
              }}
            >
              <LogIn size={18} />
              <span>{loading ? 'Memproses...' : 'Masuk'}</span>
            </button>
          </form>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleUp {
          from { transform: scale(0.96); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default AuthModal;
