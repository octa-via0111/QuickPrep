import React, { useState } from 'react';
import { 
  X, 
  User, 
  ShieldCheck, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  AlertCircle, 
  CheckCircle2,
  LogIn,
  ArrowRight
} from 'lucide-react';
import { useAuth } from '../context/AuthContext.jsx';
import { useNavigate } from 'react-router-dom';

export const AuthModal = () => {
  const { 
    isAuthModalOpen, 
    closeLogin, 
    authModalTab, 
    setAuthModalTab, 
    loginAsUser, 
    loginAsAdmin 
  } = useAuth();
  
  const navigate = useNavigate();

  // Form States - Pengguna
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');

  // Form States - Admin
  const [adminUsername, setAdminUsername] = useState('');
  const [adminPassword, setAdminPassword] = useState('');

  // UI States
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  if (!isAuthModalOpen) return null;

  // Reset form errors on tab switch
  const handleTabChange = (tab) => {
    setAuthModalTab(tab);
    setErrorMessage('');
    setSuccessMessage('');
  };

  // Submit Handler for Pengguna
  const handleUserSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (!userEmail.trim() || !userPassword.trim()) {
      setErrorMessage('Email dan kata sandi wajib diisi!');
      return;
    }

    try {
      setLoading(true);
      await loginAsUser({
        name: userName.trim() || userEmail.trim().split('@')[0],
        email: userEmail.trim(),
        password: userPassword
      });
      setSuccessMessage('Berhasil masuk sebagai Pengguna!');
      setTimeout(() => {
        closeLogin();
      }, 700);
    } catch (err) {
      setErrorMessage(err.message || 'Gagal masuk sebagai pengguna. Silakan coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  // Submit Handler for Admin
  const handleAdminSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (!adminUsername.trim() || !adminPassword.trim()) {
      setErrorMessage('Username dan kata sandi admin wajib diisi!');
      return;
    }

    try {
      setLoading(true);
      await loginAsAdmin(adminUsername.trim(), adminPassword);
      setSuccessMessage('Login admin berhasil! Mengalihkan ke panel...');
      setTimeout(() => {
        closeLogin();
        navigate('/admin');
      }, 700);
    } catch (err) {
      setErrorMessage('Akses ditolak! Kredensial admin tidak valid. Hanya administrator berwenang yang dapat masuk.');
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
        maxWidth: '440px',
        boxShadow: '0 16px 40px rgba(31, 14, 52, 0.35)',
        border: '1px solid var(--border-subtle)',
        overflow: 'hidden',
        animation: 'scaleUp 0.2s ease'
      }}>
        {/* Header Dialog */}
        <div style={{
          background: 'var(--purple-dark)',
          padding: '20px 22px 16px',
          color: '#FFFFFF',
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          gap: '12px'
        }}>
          <div>
            <div style={{ fontSize: '11.5px', fontWeight: '700', letterSpacing: '0.8px', color: 'var(--primary)', textTransform: 'uppercase', marginBottom: '3px' }}>
              Autentikasi Akun
            </div>
            <h3 style={{ fontSize: '19px', fontWeight: '800', margin: 0, letterSpacing: '-0.3px', color: '#FFFFFF' }}>
              Masuk ke QuickPrep
            </h3>
          </div>

          <button
            onClick={closeLogin}
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

        {/* Tab Switcher: Pengguna vs Admin */}
        <div style={{
          display: 'flex',
          background: '#F5EFE6',
          padding: '6px',
          gap: '6px',
          borderBottom: '1px solid var(--border-subtle)'
        }}>
          <button
            type="button"
            onClick={() => handleTabChange('user')}
            style={{
              flex: 1,
              padding: '9px 12px',
              borderRadius: '12px',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              fontWeight: '700',
              fontSize: '13.5px',
              transition: 'all 0.15s ease',
              background: authModalTab === 'user' ? 'var(--primary)' : 'transparent',
              color: authModalTab === 'user' ? '#FFFFFF' : 'var(--text-muted)'
            }}
          >
            <User size={16} />
            <span>Pengguna</span>
          </button>

          <button
            type="button"
            onClick={() => handleTabChange('admin')}
            style={{
              flex: 1,
              padding: '9px 12px',
              borderRadius: '12px',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              fontWeight: '700',
              fontSize: '13.5px',
              transition: 'all 0.15s ease',
              background: authModalTab === 'admin' ? 'var(--purple-dark)' : 'transparent',
              color: authModalTab === 'admin' ? '#FFFFFF' : 'var(--text-muted)'
            }}
          >
            <ShieldCheck size={16} />
            <span>Administrator</span>
          </button>
        </div>

        {/* Modal Body Form */}
        <div style={{ padding: '22px' }}>
          {/* Alert Messages */}
          {errorMessage && (
            <div style={{
              padding: '11px 14px',
              borderRadius: 'var(--radius-md)',
              background: 'var(--alert-red-light)',
              color: 'var(--alert-red)',
              border: '1px solid #FECACA',
              fontSize: '12.5px',
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

          {successMessage && (
            <div style={{
              padding: '11px 14px',
              borderRadius: 'var(--radius-md)',
              background: 'var(--success-green-light)',
              color: 'var(--success-green)',
              border: '1px solid #A7F3D0',
              fontSize: '12.5px',
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

          {/* TAB 1: FORM PENGGUNA (NAMA, EMAIL, SANDI) */}
          {authModalTab === 'user' && (
            <form onSubmit={handleUserSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div style={{ fontSize: '12.5px', color: 'var(--text-muted)', marginBottom: '2px' }}>
                Masukkan data akun pengguna Anda untuk menyimpan menu favorit & preferensi.
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', marginBottom: '5px', color: 'var(--purple-dark)' }}>
                  Nama Lengkap
                </label>
                <div style={{ position: 'relative' }}>
                  <User size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                  <input
                    type="text"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    placeholder="Contoh: Budi Santoso"
                    className="input-field"
                    style={{ paddingLeft: '36px', height: '42px', fontSize: '13.5px' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', marginBottom: '5px', color: 'var(--purple-dark)' }}>
                  Alamat Email <span style={{ color: 'var(--alert-red)' }}>*</span>
                </label>
                <div style={{ position: 'relative' }}>
                  <Mail size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                  <input
                    type="email"
                    value={userEmail}
                    onChange={(e) => setUserEmail(e.target.value)}
                    placeholder="nama@email.com"
                    className="input-field"
                    required
                    style={{ paddingLeft: '36px', height: '42px', fontSize: '13.5px' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', marginBottom: '5px', color: 'var(--purple-dark)' }}>
                  Kata Sandi <span style={{ color: 'var(--alert-red)' }}>*</span>
                </label>
                <div style={{ position: 'relative' }}>
                  <Lock size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={userPassword}
                    onChange={(e) => setUserPassword(e.target.value)}
                    placeholder="Masukkan kata sandi"
                    className="input-field"
                    required
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
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                style={{
                  height: '44px',
                  borderRadius: 'var(--radius-full)',
                  background: 'var(--primary)',
                  color: '#FFFFFF',
                  fontWeight: '700',
                  fontSize: '14px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  opacity: loading ? 0.75 : 1,
                  boxShadow: 'var(--shadow-warm)',
                  marginTop: '6px'
                }}
              >
                <LogIn size={17} />
                <span>{loading ? 'Memproses...' : 'Masuk Sebagai Pengguna'}</span>
              </button>
            </form>
          )}

          {/* TAB 2: FORM ADMINISTRATOR (USERNAME, SANDI SEPERTI BIASA) */}
          {authModalTab === 'admin' && (
            <form onSubmit={handleAdminSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div style={{ fontSize: '12.5px', color: 'var(--text-muted)', marginBottom: '2px' }}>
                Khusus pengelola aplikasi QuickPrep untuk mengedit resep dan data master.
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', marginBottom: '5px', color: 'var(--purple-dark)' }}>
                  Username Admin
                </label>
                <div style={{ position: 'relative' }}>
                  <ShieldCheck size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                  <input
                    type="text"
                    value={adminUsername}
                    onChange={(e) => setAdminUsername(e.target.value)}
                    placeholder="Masukkan username admin"
                    className="input-field"
                    required
                    autoComplete="off"
                    style={{ paddingLeft: '36px', height: '42px', fontSize: '13.5px' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', marginBottom: '5px', color: 'var(--purple-dark)' }}>
                  Kata Sandi Admin
                </label>
                <div style={{ position: 'relative' }}>
                  <Lock size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={adminPassword}
                    onChange={(e) => setAdminPassword(e.target.value)}
                    placeholder="Masukkan kata sandi admin"
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
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                style={{
                  height: '44px',
                  borderRadius: 'var(--radius-full)',
                  background: 'var(--purple-dark)',
                  color: '#FFFFFF',
                  fontWeight: '700',
                  fontSize: '14px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  opacity: loading ? 0.75 : 1,
                  boxShadow: 'var(--shadow-purple)',
                  marginTop: '6px'
                }}
              >
                <ShieldCheck size={17} />
                <span>{loading ? 'Memverifikasi...' : 'Masuk Sebagai Admin'}</span>
              </button>
            </form>
          )}
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
