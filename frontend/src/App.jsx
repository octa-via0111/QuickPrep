import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import BottomNav from './components/BottomNav.jsx';
import OfflineBanner from './components/OfflineBanner.jsx';
import AuthModal from './components/AuthModal.jsx';
import ErrorBoundary from './components/ErrorBoundary.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
import { ThemeProvider } from './context/ThemeContext.jsx';

import HomePage from './pages/HomePage.jsx';
import ExplorePage from './pages/ExplorePage.jsx';
import BudgetPage from './pages/BudgetPage.jsx';
import SpinPage from './pages/SpinPage.jsx';
import FavoritesPage from './pages/FavoritesPage.jsx';
import RecipeDetailPage from './pages/RecipeDetailPage.jsx';
import CookingModePage from './pages/CookingModePage.jsx';
import ProfilePage from './pages/ProfilePage.jsx';
import AdminPage from './pages/AdminPage.jsx';

function App() {
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

          {/* Main Content View */}
          <main className="main-content">
            <ErrorBoundary>
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
            </ErrorBoundary>
          </main>

          {/* Mobile Bottom Navigation Bar (5 tabs) */}
          <BottomNav />
        </div>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
