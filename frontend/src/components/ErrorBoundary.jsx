import React from 'react';
import { AlertCircle, RotateCcw, Home } from 'lucide-react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  handleReload = () => {
    window.location.reload();
  };

  handleGoHome = () => {
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '70vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '24px',
          textAlign: 'center',
          color: 'var(--text-main)'
        }}>
          <div style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            background: 'var(--alert-red-light, rgba(239, 68, 68, 0.15))',
            color: 'var(--alert-red, #EF4444)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '16px'
          }}>
            <AlertCircle size={32} />
          </div>

          <h2 style={{ fontSize: '20px', fontWeight: '800', marginBottom: '8px' }}>
            Terjadi Kendala Memuat Halaman
          </h2>
          <p style={{ fontSize: '13.5px', color: 'var(--text-muted)', maxWidth: '400px', marginBottom: '24px', lineHeight: 1.6 }}>
            Halaman sedang mengalami gangguan teknis sementara. Silakan coba muat ulang atau kembali ke beranda utama.
          </p>

          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center' }}>
            <button
              onClick={this.handleReload}
              className="btn-primary"
              style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 18px', fontSize: '13.5px' }}
            >
              <RotateCcw size={16} /> Coba Muat Ulang
            </button>
            <button
              onClick={this.handleGoHome}
              className="btn-secondary"
              style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 18px', fontSize: '13.5px' }}
            >
              <Home size={16} /> Ke Beranda
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
