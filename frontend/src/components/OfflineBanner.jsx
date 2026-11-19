import React from 'react';
import { WifiOff, AlertTriangle } from 'lucide-react';
import useOnlineStatus from '../hooks/useOnlineStatus.js';

export const OfflineBanner = ({ isOfflineData = false }) => {
  const isOnline = useOnlineStatus();

  if (isOnline && !isOfflineData) return null;

  return (
    <div style={{
      background: '#FEF3C7',
      borderBottom: '1px solid #FCD34D',
      color: '#92400E',
      padding: '8px 16px',
      fontSize: '13px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '8px',
      fontWeight: '600'
    }}>
      <WifiOff size={16} />
      <span>
        {!isOnline 
          ? 'Koneksi internet terputus. Menampilkan resep dari memori cache lokal.' 
          : 'Data resep dimuat dari cache lokal perangkat.'}
      </span>
    </div>
  );
};

export default OfflineBanner;
