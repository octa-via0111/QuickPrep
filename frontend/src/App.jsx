import React, { useEffect, Suspense, lazy } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import BottomNav from './components/BottomNav.jsx';
import OfflineBanner from './components/OfflineBanner.jsx';
import AuthModal from './components/AuthModal.jsx';
import ErrorBoundary from './components/ErrorBoundary.jsx';
import PWAInstallBanner from './components/PWAInstallBanner.jsx';
import PageLoadingSkeleton from './components/PageLoadingSkeleton.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
import { ThemeProvider } from './context/ThemeContext.jsx';
import { trackNavigation } from './utils/navigation.js';

// Code Splitting & Route-Level Lazy Loading
// Tiap halaman diunduh secara on-demand hanya saat dibuka pengguna
const HomePage = lazy(() => import('./pages/HomePage.jsx'));
const ExplorePage = lazy(() => import('./pages/ExplorePage.jsx'));
const BudgetPage = lazy(() => import('./pages/BudgetPage.jsx'));
const SpinPage = lazy(() => import('./pages/SpinPage.jsx'));
const FavoritesPage = lazy(() => import('./pages/FavoritesPage.jsx'));
const RecipeDetailPage = lazy(() => import('./pages/RecipeDetailPage.jsx'));
const CookingModePage = lazy(() => import('./pages/CookingModePage.jsx'));
const ProfilePage = lazy(() => import('./pages/ProfilePage.jsx'));
const AdminPage = lazy(() => import('./pages/AdminPage.jsx'));

function App() {
  const location = useLocation();

  // Otomatis lacak riwayat halaman agar tombol kembali selalu tepat 1 langkah ke belakang
  useEffect(() => {
    trackNavigation(location.pathname + (location.search || ''));
  }, [location.pathname, location.search]);

  return (
    <ThemeProvider>
      <AuthProvider>
        <div className="app-container">
          {/* Offline Status Warning Bar */}
          <OfflineBanner />

          {/* Global Auth Modal for Pengguna & Admin */}
          <AuthModal />

          {/* Top Sticky Navigation */}
          <Navbar />

          {/* Main Content View with Suspense Lazy Loading */}
          <main className="main-content">
            <ErrorBoundary>
              <Suspense fallback={<PageLoadingSkeleton />}>
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/explore" element={<ExplorePage />} />
                  <Route path="/budget" element={<BudgetPage />} />
                  <Route path="/spin" element={<SpinPage />} />
                  <Route path="/favorites" element={<FavoritesPage />} />
                  <Route path="/recipe/:id" element={<RecipeDetailPage />} />
                  <Route path="/cook/:id" element={<CookingModePage />} />
                  <Route path="/profile" element={<ProfilePage />} />
                  <Route path="/admin" element={<AdminPage />} />
                  <Route path="/about" element={<Navigate to="/profile" replace />} />
                  {/* Catch-all fallback */}
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </Suspense>
            </ErrorBoundary>
          </main>

          {/* Mobile Bottom Navigation Bar (5 tabs) */}
          <BottomNav />

          {/* Floating PWA Install Notification Banner */}
          <PWAInstallBanner />
        </div>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
