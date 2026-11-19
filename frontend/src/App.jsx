import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import BottomNav from './components/BottomNav.jsx';
import OfflineBanner from './components/OfflineBanner.jsx';

import HomePage from './pages/HomePage.jsx';
import ExplorePage from './pages/ExplorePage.jsx';
import BudgetPage from './pages/BudgetPage.jsx';
import SpinPage from './pages/SpinPage.jsx';
import FavoritesPage from './pages/FavoritesPage.jsx';
import RecipeDetailPage from './pages/RecipeDetailPage.jsx';
import CookingModePage from './pages/CookingModePage.jsx';
import ProfilePage from './pages/ProfilePage.jsx';

function App() {
  return (
    <div className="app-container">
      {/* Offline Status Warning Bar */}
      <OfflineBanner />

      {/* Top Sticky Navigation */}
      <Navbar />

      {/* Main Content View */}
      <main className="main-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/explore" element={<ExplorePage />} />
          <Route path="/budget" element={<BudgetPage />} />
          <Route path="/spin" element={<SpinPage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="/recipe/:id" element={<RecipeDetailPage />} />
          <Route path="/cook/:id" element={<CookingModePage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/about" element={<ProfilePage defaultTab="about" />} />
          {/* Catch-all fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      {/* Mobile Bottom Navigation Bar (5 tabs) */}
      <BottomNav />
    </div>
  );
}

export default App;
