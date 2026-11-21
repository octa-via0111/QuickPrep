import React, { useState, useEffect, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Plus, 
  Search, 
  Edit3, 
  Trash2, 
  Image as ImageIcon, 
  Clock, 
  Wallet, 
  X, 
  Check, 
  AlertCircle, 
  ChefHat, 
  FolderOpen,
  UtensilsCrossed,
  Home,
  Flame,
  Wrench,
  RefreshCw,
  Database,
  ArrowLeft,
  Menu,
  ShieldCheck,
  CheckCircle2,
  Lock,
  Eye,
  EyeOff,
  LogOut,
  LogIn,
  ShieldAlert,
  User
} from 'lucide-react';
import { useAuth } from '../context/AuthContext.jsx';
import recipeService from '../services/recipeService.js';
import toolService from '../services/toolService.js';
import substitutionService from '../services/substitutionService.js';
import useCategories from '../hooks/useCategories.js';
import { formatRupiah, formatTime, getDifficultyColor } from '../utils/formatter.js';

export const AdminPage = () => {
  const navigate = useNavigate();
  const { currentUser, isAdmin, isUser, loginAsAdmin, logout, openLogin } = useAuth();

  // Local Form States for Admin Login
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState('');

  // Data States
  const [recipes, setRecipes] = useState([]);
  const [toolsList, setToolsList] = useState([]);
  const [substitutionsList, setSubstitutionsList] = useState([]);
  const [loading, setLoading] = useState(true);

  // Active Sidebar Tab State
  // Tabs: 'all' | 'kos' | 'popular' | 'categories' | 'tools' | 'substitutions' | 'system'
  const [activeTab, setActiveTab] = useState('all');
  const [sidebarSearch, setSidebarSearch] = useState('');
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Recipe List Filter & Search State
  const [recipeSearch, setRecipeSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('semua');

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRecipe, setEditingRecipe] = useState(null);
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [alertMsg, setAlertMsg] = useState(null);

  // Categories hook
  const { categories } = useCategories();

  // Form Fields State
  const [formData, setFormData] = useState({
    name: '',
    category_id: 'anak-kos',
    description: '',
    image_url: '',
    cooking_time: 15,
    preparation_time: 5,
    estimated_cost: 10000,
    servings: 1,
    difficulty: 'Mudah',
    is_popular: false,
    is_kos_friendly: true,
    tips: '',
    instructions: [
      { step_number: 1, title: 'Persiapan Bahan', instruction: '', duration_minutes: 3, tips: '' }
    ]
  });

  const [imagePreview, setImagePreview] = useState('');

  // Load all initial data
  const loadData = async () => {
    try {
      setLoading(true);
      const [resRecipes, resTools, resSubs] = await Promise.all([
        recipeService.getRecipes().catch(() => ({ data: [] })),
        toolService.getTools().catch(() => ({ data: [] })),
        substitutionService.getSubstitutions().catch(() => ({ data: [] }))
      ]);

      if (resRecipes?.data) setRecipes(resRecipes.data);
      if (resTools?.data) setToolsList(resTools.data);
      if (resSubs?.data) setSubstitutionsList(resSubs.data);
    } catch (err) {
      showAlert('error', 'Gagal memuat data dari server');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAdmin) {
      loadData();
    }
  }, [isAdmin]);

  const showAlert = (type, text) => {
    setAlertMsg({ type, text });
    setTimeout(() => setAlertMsg(null), 4000);
  };

  // Handle Admin Login Form Submission
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError('');

    if (!loginUsername.trim() || !loginPassword.trim()) {
      setLoginError('Username dan kata sandi admin wajib diisi!');
      return;
    }

    try {
      setLoginLoading(true);
      await loginAsAdmin(loginUsername.trim(), loginPassword);
      showAlert('success', 'Selamat datang! Anda berhasil masuk sebagai Administrator.');
    } catch (err) {
      setLoginError('Akses ditolak! Anda bukan administrator atau kredensial yang dimasukkan salah.');
    } finally {
      setLoginLoading(false);
    }
  };

  // Handle Admin Logout
  const handleLogout = () => {
    logout();
    setLoginUsername('');
    setLoginPassword('');
    showAlert('success', 'Sesi admin berakhir. Anda telah keluar dengan aman.');
  };

  // Open modal for Adding New Recipe
  const handleOpenAddModal = () => {
    setEditingRecipe(null);
    setFormData({
      name: '',
      category_id: categories[0]?.id || 'anak-kos',
      description: '',
      image_url: '/recipes/contoh.jpg',
      cooking_time: 15,
      preparation_time: 5,
      estimated_cost: 10000,
      servings: 1,
      difficulty: 'Mudah',
      is_popular: false,
      is_kos_friendly: true,
      tips: '',
      instructions: [
        { step_number: 1, title: 'Persiapan Bahan', instruction: 'Siapkan seluruh bumbu dan bahan yang dibutuhkan.', duration_minutes: 3, tips: '' },
        { step_number: 2, title: 'Memasak', instruction: 'Masak dengan api sedang hingga matang merata.', duration_minutes: 10, tips: '' }
      ]
    });
    setImagePreview('/recipes/contoh.jpg');
    setIsModalOpen(true);
  };

  // Open modal for Editing Existing Recipe
  const handleOpenEditModal = (recipe) => {
    setEditingRecipe(recipe);
    
    let parsedInstructions = recipe.instructions;
    if (typeof parsedInstructions === 'string') {
      try {
        parsedInstructions = JSON.parse(parsedInstructions);
      } catch (e) {
        parsedInstructions = [];
      }
    }
    if (!Array.isArray(parsedInstructions) || parsedInstructions.length === 0) {
      parsedInstructions = [
        { step_number: 1, title: 'Langkah Memasak', instruction: '', duration_minutes: 5, tips: '' }
      ];
    }

    setFormData({
      name: recipe.name || '',
      category_id: recipe.category_id || recipe.category?.id || 'anak-kos',
      description: recipe.description || '',
      image_url: recipe.image_url || '',
      cooking_time: recipe.cooking_time || 15,
      preparation_time: recipe.preparation_time || 5,
      estimated_cost: recipe.estimated_cost || 10000,
      servings: recipe.servings || 1,
      difficulty: recipe.difficulty || 'Mudah',
      is_popular: Boolean(recipe.is_popular),
      is_kos_friendly: Boolean(recipe.is_kos_friendly),
      tips: recipe.tips || '',
      instructions: parsedInstructions
    });
    setImagePreview(recipe.image_url || '');
    setIsModalOpen(true);
  };

  // Handle local file selection from File Manager
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const cleanFileName = file.name.replace(/\s+/g, '-').toLowerCase();
    const localPath = `/recipes/${cleanFileName}`;
    const previewUrl = URL.createObjectURL(file);
    setImagePreview(previewUrl);

    setFormData(prev => ({
      ...prev,
      image_url: localPath
    }));
  };

  // Step instructions handlers
  const handleInstructionChange = (index, field, value) => {
    setFormData(prev => {
      const updated = [...prev.instructions];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, instructions: updated };
    });
  };

  const handleAddInstruction = () => {
    setFormData(prev => ({
      ...prev,
      instructions: [
        ...prev.instructions,
        {
          step_number: prev.instructions.length + 1,
          title: `Langkah ${prev.instructions.length + 1}`,
          instruction: '',
          duration_minutes: 3,
          tips: ''
        }
      ]
    }));
  };

  const handleRemoveInstruction = (index) => {
    if (formData.instructions.length <= 1) return;
    setFormData(prev => {
      const updated = prev.instructions
        .filter((_, i) => i !== index)
        .map((step, i) => ({ ...step, step_number: i + 1 }));
      return { ...prev, instructions: updated };
    });
  };

  // Submit Add or Edit Form
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      alert('Nama resep wajib diisi!');
      return;
    }

    try {
      setFormSubmitting(true);
      if (editingRecipe) {
        await recipeService.updateRecipe(editingRecipe.id, formData);
        showAlert('success', `Resep "${formData.name}" berhasil diperbarui!`);
      } else {
        await recipeService.createRecipe(formData);
        showAlert('success', `Resep baru "${formData.name}" berhasil ditambahkan!`);
      }

      setIsModalOpen(false);
      loadData();
    } catch (err) {
      showAlert('error', 'Terjadi kesalahan saat menyimpan resep.');
    } finally {
      setFormSubmitting(false);
    }
  };

  // Delete Recipe Handler
  const handleDeleteRecipe = async (recipe) => {
    const confirmed = window.confirm(`Apakah Anda yakin ingin menghapus resep "${recipe.name}"?`);
    if (!confirmed) return;

    try {
      await recipeService.deleteRecipe(recipe.id);
      showAlert('success', `Resep "${recipe.name}" berhasil dihapus.`);
      setRecipes(prev => prev.filter(r => r.id !== recipe.id));
    } catch (err) {
      showAlert('error', 'Gagal menghapus resep dari database.');
    }
  };

  // Filter recipes based on active tab and search filters
  const filteredRecipes = useMemo(() => {
    return recipes.filter(r => {
      // Tab filter
      if (activeTab === 'kos' && !r.is_kos_friendly) return false;
      if (activeTab === 'popular' && !r.is_popular) return false;

      // Recipe search filter
      const matchSearch = recipeSearch.trim() === '' || 
        r.name.toLowerCase().includes(recipeSearch.toLowerCase()) ||
        (r.description && r.description.toLowerCase().includes(recipeSearch.toLowerCase()));
      
      // Category dropdown filter
      const matchCategory = selectedCategory === 'semua' || 
        r.category_id === selectedCategory || 
        r.category?.id === selectedCategory;

      return matchSearch && matchCategory;
    });
  }, [recipes, activeTab, recipeSearch, selectedCategory]);

  // Sidebar Menu Definitions
  const sidebarSections = [
    {
      title: 'MANAJEMEN RESEP',
      items: [
        {
          id: 'all',
          label: 'Semua Resep',
          icon: UtensilsCrossed,
          iconBg: '#E0623A',
          badge: recipes.length
        },
        {
          id: 'add',
          label: 'Tambah Resep Baru',
          icon: Plus,
          iconBg: '#4E7C5D',
          isAction: true
        },
        {
          id: 'kos',
          label: 'Resep Anak Kos',
          icon: Home,
          iconBg: '#D97706',
          badge: recipes.filter(r => r.is_kos_friendly).length
        },
        {
          id: 'popular',
          label: 'Resep Populer',
          icon: Flame,
          iconBg: '#D9534F',
          badge: recipes.filter(r => r.is_popular).length
        }
      ]
    },
    {
      title: 'DATA MASTER',
      items: [
        {
          id: 'categories',
          label: 'Kategori Masakan',
          icon: FolderOpen,
          iconBg: '#7C3AED',
          badge: categories.length
        },
        {
          id: 'tools',
          label: 'Alat Masak Kos',
          icon: Wrench,
          iconBg: '#2563EB',
          badge: toolsList.length
        },
        {
          id: 'substitutions',
          label: 'Substitusi Bahan',
          icon: RefreshCw,
          iconBg: '#0D9488',
          badge: substitutionsList.length
        }
      ]
    },
    {
      title: 'SISTEM',
      items: [
        {
          id: 'system',
          label: 'Status Database',
          icon: Database,
          iconBg: '#059669'
        },
        {
          id: 'logout',
          label: 'Keluar (Logout)',
          icon: LogOut,
          iconBg: '#DC2626',
          isAction: true
        },
        {
          id: 'back_home',
          label: 'Kembali ke Beranda',
          icon: ArrowLeft,
          iconBg: '#4B5563',
          isAction: true
        }
      ]
    }
  ];

  const handleSidebarItemClick = (item) => {
    setIsMobileSidebarOpen(false);
    if (item.id === 'add') {
      handleOpenAddModal();
    } else if (item.id === 'logout') {
      if (window.confirm('Apakah Anda yakin ingin keluar dari sesi Admin?')) {
        handleLogout();
      }
    } else if (item.id === 'back_home') {
      navigate('/');
    } else {
      setActiveTab(item.id);
    }
  };

  // ==========================================
  // JIKA BUKAN ADMINISTRATOR
  // ==========================================
  if (!isAdmin) {
    // 1. Jika pengguna saat ini login dengan role Pengguna (User)
    if (currentUser && isUser) {
      return (
        <div style={{
          minHeight: '75vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '24px 16px'
        }}>
          <div style={{
            width: '100%',
            maxWidth: '440px',
            background: 'var(--card-bg)',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--border-subtle)',
            boxShadow: 'var(--shadow-card)',
            overflow: 'hidden',
            textAlign: 'center'
          }}>
            <div style={{
              background: 'var(--purple-dark)',
              padding: '28px 24px 22px',
              color: '#FFFFFF'
            }}>
              <div style={{
                width: '56px',
                height: '56px',
                borderRadius: '16px',
                background: 'var(--alert-red)',
                margin: '0 auto 16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 6px 18px rgba(220, 38, 38, 0.35)'
              }}>
                <ShieldAlert size={28} color="#FFFFFF" strokeWidth={2.2} />
              </div>
              <h2 style={{ fontSize: '20px', fontWeight: '800', margin: '0 0 6px', color: '#FFFFFF' }}>
                Akses Ditolak: Khusus Admin
              </h2>
              <p style={{ fontSize: '13px', color: 'rgba(255, 255, 255, 0.8)', margin: 0, lineHeight: 1.45 }}>
                Halo, <strong>{currentUser.name}</strong>! Anda saat ini masuk dengan akun <strong>Pengguna</strong>.
              </p>
            </div>

            <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <p style={{ fontSize: '13.5px', color: 'var(--text-muted)', margin: 0, lineHeight: 1.5 }}>
                Pengguna reguler tidak memiliki hak akses untuk mengedit, menambah, atau menghapus menu resep. Halaman ini hanya untuk Administrator.
              </p>

              <button
                type="button"
                onClick={() => openLogin('admin')}
                style={{
                  width: '100%',
                  height: '44px',
                  borderRadius: 'var(--radius-full)',
                  background: 'var(--purple-dark)',
                  color: '#FFFFFF',
                  fontWeight: '700',
                  fontSize: '13.5px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  cursor: 'pointer',
                  border: 'none',
                  boxShadow: 'var(--shadow-purple)'
                }}
              >
                <ShieldCheck size={17} />
                <span>Masuk Sebagai Admin</span>
              </button>

              <button
                type="button"
                onClick={() => navigate('/')}
                style={{
                  width: '100%',
                  padding: '10px',
                  borderRadius: 'var(--radius-full)',
                  background: 'transparent',
                  color: 'var(--text-muted)',
                  fontWeight: '600',
                  fontSize: '13px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  cursor: 'pointer',
                  border: 'none'
                }}
              >
                <ArrowLeft size={16} />
                <span>Kembali ke Beranda</span>
              </button>
            </div>
          </div>
        </div>
      );
    }

    // 2. Jika belum login sama sekali (Guest)
    return (
      <div style={{
        minHeight: '75vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px 16px'
      }}>
        <div style={{
          width: '100%',
          maxWidth: '430px',
          background: 'var(--card-bg)',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--border-subtle)',
          boxShadow: 'var(--shadow-card)',
          overflow: 'hidden'
        }}>
          {/* Header Banner - Solid Deep Purple */}
          <div style={{
            background: 'var(--purple-dark)',
            padding: '28px 24px 22px',
            textAlign: 'center',
            color: '#FFFFFF'
          }}>
            <div style={{
              width: '56px',
              height: '56px',
              borderRadius: '16px',
              background: 'var(--primary)',
              margin: '0 auto 16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 6px 18px rgba(224, 98, 58, 0.4)'
            }}>
              <Lock size={28} color="#FFFFFF" strokeWidth={2.2} />
            </div>
            <h2 style={{
              fontSize: '20px',
              fontWeight: '800',
              margin: '0 0 6px',
              letterSpacing: '-0.3px',
              color: '#FFFFFF'
            }}>
              Masuk Panel Admin
            </h2>
            <p style={{
              fontSize: '13px',
              color: 'rgba(255, 255, 255, 0.8)',
              margin: 0,
              lineHeight: 1.45
            }}>
              Area khusus pengelola. Masukkan username dan kata sandi admin untuk mengelola resep.
            </p>
          </div>

          {/* Form Content */}
          <div style={{ padding: '24px' }}>
            {loginError && (
              <div style={{
                padding: '12px 14px',
                borderRadius: 'var(--radius-md)',
                background: 'var(--alert-red-light)',
                color: 'var(--alert-red)',
                border: '1px solid #FECACA',
                fontSize: '13px',
                fontWeight: '600',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                marginBottom: '18px'
              }}>
                <AlertCircle size={18} style={{ flexShrink: 0 }} />
                <span>{loginError}</span>
              </div>
            )}

            <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', marginBottom: '6px', color: 'var(--purple-dark)' }}>
                  Username
                </label>
                <div style={{ position: 'relative' }}>
                  <ShieldCheck size={18} color="var(--text-muted)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                  <input
                    type="text"
                    value={loginUsername}
                    onChange={(e) => setLoginUsername(e.target.value)}
                    placeholder="Masukkan username"
                    className="input-field"
                    required
                    autoComplete="off"
                    style={{ paddingLeft: '38px', height: '44px', fontSize: '14px' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', marginBottom: '6px', color: 'var(--purple-dark)' }}>
                  Kata Sandi
                </label>
                <div style={{ position: 'relative' }}>
                  <Lock size={18} color="var(--text-muted)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="Masukkan kata sandi"
                    className="input-field"
                    required
                    autoComplete="current-password"
                    style={{ paddingLeft: '38px', paddingRight: '40px', height: '44px', fontSize: '14px' }}
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
                      color: 'var(--text-muted)',
                      display: 'flex',
                      alignItems: 'center'
                    }}
                    title={showPassword ? 'Sembunyikan sandi' : 'Tampilkan sandi'}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loginLoading}
                style={{
                  width: '100%',
                  height: '46px',
                  borderRadius: 'var(--radius-full)',
                  background: 'var(--primary)',
                  color: '#FFFFFF',
                  fontWeight: '700',
                  fontSize: '14px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  cursor: loginLoading ? 'not-allowed' : 'pointer',
                  opacity: loginLoading ? 0.75 : 1,
                  boxShadow: 'var(--shadow-warm)',
                  marginTop: '4px'
                }}
              >
                {loginLoading ? (
                  <span>Memverifikasi...</span>
                ) : (
                  <>
                    <LogIn size={18} />
                    <span>Masuk Sebagai Admin</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => navigate('/')}
                style={{
                  width: '100%',
                  padding: '10px',
                  borderRadius: 'var(--radius-full)',
                  background: 'transparent',
                  color: 'var(--text-muted)',
                  fontWeight: '600',
                  fontSize: '13px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  cursor: 'pointer'
                }}
              >
                <ArrowLeft size={16} />
                <span>Kembali ke Beranda</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Mobile Sidebar Toggle Button & Action Bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px', flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button
            onClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
            className="admin-sidebar-mobile-toggle"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 18px',
              borderRadius: 'var(--radius-full)',
              background: 'var(--purple-dark)',
              color: '#FFFFFF',
              fontSize: '13.5px',
              fontWeight: '700',
              cursor: 'pointer',
              boxShadow: 'var(--shadow-purple)'
            }}
          >
            <Menu size={18} />
            <span>Menu Navigasi Admin</span>
          </button>

          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '7px 14px',
            borderRadius: 'var(--radius-full)',
            background: 'var(--purple-dark)',
            color: '#FFFFFF',
            fontSize: '12.5px',
            fontWeight: '700'
          }}>
            <ShieldCheck size={16} color="var(--primary)" />
            <span>Admin: <strong>{currentUser?.name || currentUser?.username || 'Administrator'}</strong></span>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button
            onClick={handleOpenAddModal}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '10px 18px',
              borderRadius: 'var(--radius-full)',
              background: 'var(--primary)',
              color: '#FFFFFF',
              fontSize: '13px',
              fontWeight: '700',
              cursor: 'pointer',
              boxShadow: 'var(--shadow-warm)'
            }}
          >
            <Plus size={16} />
            <span>Tambah Resep</span>
          </button>

          <button
            onClick={() => {
              if (window.confirm('Apakah Anda yakin ingin keluar dari sesi Admin?')) {
                handleLogout();
              }
            }}
            title="Keluar dari Admin"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '10px 14px',
              borderRadius: 'var(--radius-full)',
              background: 'var(--bg-secondary)',
              color: 'var(--alert-red)',
              fontSize: '13px',
              fontWeight: '700',
              cursor: 'pointer',
              border: '1px solid var(--border-subtle)'
            }}
          >
            <LogOut size={15} />
            <span>Keluar</span>
          </button>
        </div>
      </div>

      {/* Alert Notification */}
      {alertMsg && (
        <div style={{
          padding: '14px 18px',
          borderRadius: 'var(--radius-md)',
          fontSize: '14px',
          fontWeight: '700',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          background: alertMsg.type === 'success' ? 'var(--success-green-light)' : 'var(--alert-red-light)',
          color: alertMsg.type === 'success' ? 'var(--success-green)' : 'var(--alert-red)',
          border: `1px solid ${alertMsg.type === 'success' ? '#A7F3D0' : '#FECACA'}`
        }}>
          {alertMsg.type === 'success' ? <Check size={20} /> : <AlertCircle size={20} />}
          <span>{alertMsg.text}</span>
        </div>
      )}

      {/* Main Admin Layout: Sidebar on Left, Content on Right */}
      <div className="admin-layout">
        {/* ==================================================== */}
        {/* 1. SIDEBAR NAVIGASI (Sleek Dark Theme Sesuai Gambar) */}
        {/* ==================================================== */}
        <aside className={`admin-sidebar ${isMobileSidebarOpen ? 'open' : ''}`}>
          {/* Header Title Sidebar */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 4px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                background: 'var(--primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#FFFFFF'
              }}>
                <ShieldCheck size={18} />
              </div>
              <div style={{ fontSize: '15.5px', fontWeight: '800', letterSpacing: '-0.2px' }}>
                Admin Panel
              </div>
            </div>

            {/* Mobile close button */}
            <button
              onClick={() => setIsMobileSidebarOpen(false)}
              className="admin-mobile-close"
              style={{
                color: 'rgba(255, 255, 255, 0.6)',
                padding: '4px',
                cursor: 'pointer'
              }}
            >
              <X size={20} />
            </button>
          </div>

          {/* Search Box di Atas Sidebar */}
          <div style={{ position: 'relative', width: '100%' }}>
            <Search 
              size={15} 
              color="rgba(255, 255, 255, 0.45)" 
              style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} 
            />
            <input
              type="text"
              placeholder="Cari menu / data..."
              value={sidebarSearch}
              onChange={(e) => setSidebarSearch(e.target.value)}
              style={{
                width: '100%',
                padding: '9px 12px 9px 34px',
                background: 'rgba(255, 255, 255, 0.08)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                borderRadius: '10px',
                color: '#FFFFFF',
                fontSize: '13px',
                outline: 'none',
                fontFamily: 'inherit'
              }}
            />
          </div>

          {/* Menu Sections List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px', marginTop: '4px' }}>
            {sidebarSections.map((sec, sIdx) => {
              // Filter items based on sidebar search input
              const visibleItems = sec.items.filter(item => 
                sidebarSearch.trim() === '' || item.label.toLowerCase().includes(sidebarSearch.toLowerCase())
              );

              if (visibleItems.length === 0) return null;

              return (
                <div key={sIdx} style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {/* Group Header */}
                  <div style={{
                    fontSize: '11px',
                    fontWeight: '800',
                    color: 'rgba(255, 255, 255, 0.45)',
                    letterSpacing: '0.8px',
                    textTransform: 'uppercase',
                    padding: '0 8px',
                    userSelect: 'none'
                  }}>
                    {sec.title}
                  </div>

                  {/* Menu Items */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                    {visibleItems.map((item) => {
                      const Icon = item.icon;
                      const isActive = activeTab === item.id;

                      return (
                        <button
                          key={item.id}
                          onClick={() => handleSidebarItemClick(item)}
                          style={{
                            width: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            gap: '10px',
                            padding: '8px 10px',
                            borderRadius: '10px',
                            background: isActive ? 'rgba(255, 255, 255, 0.14)' : 'transparent',
                            color: '#FFFFFF',
                            textAlign: 'left',
                            cursor: 'pointer',
                            transition: 'all 0.15s ease'
                          }}
                          onMouseEnter={(e) => {
                            if (!isActive) e.currentTarget.style.background = 'rgba(255, 255, 255, 0.07)';
                          }}
                          onMouseLeave={(e) => {
                            if (!isActive) e.currentTarget.style.background = 'transparent';
                          }}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            {/* Colorful Solid Icon Box */}
                            <div style={{
                              width: '30px',
                              height: '30px',
                              borderRadius: '8px',
                              background: item.iconBg,
                              color: '#FFFFFF',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              flexShrink: 0
                            }}>
                              <Icon size={16} strokeWidth={2.2} />
                            </div>

                            <span style={{
                              fontSize: '13.5px',
                              fontWeight: isActive ? '700' : '500',
                              color: isActive ? '#FFFFFF' : 'rgba(255, 255, 255, 0.88)'
                            }}>
                              {item.label}
                            </span>
                          </div>

                          {/* Badge Count if available */}
                          {item.badge !== undefined && (
                            <span style={{
                              fontSize: '11px',
                              fontWeight: '700',
                              padding: '2px 7px',
                              borderRadius: '999px',
                              background: isActive ? 'var(--primary)' : 'rgba(255, 255, 255, 0.12)',
                              color: '#FFFFFF'
                            }}>
                              {item.badge}
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </aside>

        {/* ==================================================== */}
        {/* 2. MAIN CONTENT AREA DI SEBELAH KANAN SIDEBAR       */}
        {/* ==================================================== */}
        <main className="admin-main-content">
          {/* TAB 1: ALL RECIPES, KOS RECIPES, OR POPULAR RECIPES */}
          {['all', 'kos', 'popular'].includes(activeTab) && (
            <>
              {/* Header Box */}
              <div style={{
                background: 'var(--purple-dark)',
                color: '#FFFFFF',
                padding: '22px 24px',
                borderRadius: 'var(--radius-xl)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '14px',
                boxShadow: 'var(--shadow-purple)'
              }}>
                <div>
                  <div style={{
                    fontSize: '11px',
                    fontWeight: '800',
                    color: 'var(--amber)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.6px',
                    marginBottom: '4px'
                  }}>
                    {activeTab === 'kos' ? 'Kategori Khusus' : activeTab === 'popular' ? 'Favorit Pengguna' : 'Kelola Resep'}
                  </div>
                  <h1 style={{ fontSize: '24px', fontWeight: '800', color: '#FFF' }}>
                    {activeTab === 'kos' ? 'Resep Masakan Anak Kos' : 
                     activeTab === 'popular' ? 'Resep Masakan Populer' : 'Daftar Seluruh Menu Masakan'}
                  </h1>
                  <p style={{ fontSize: '13px', color: 'rgba(255, 255, 255, 0.85)', marginTop: '2px' }}>
                    Menampilkan {filteredRecipes.length} resep masakan aktif di aplikasi QuickPrep.
                  </p>
                </div>

                <button
                  onClick={handleOpenAddModal}
                  style={{
                    background: 'var(--primary)',
                    color: '#FFFFFF',
                    padding: '10px 20px',
                    borderRadius: '999px',
                    fontWeight: '700',
                    fontSize: '13.5px',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    cursor: 'pointer',
                    boxShadow: 'var(--shadow-warm)'
                  }}
                >
                  <Plus size={16} strokeWidth={2.5} />
                  <span>Tambah Resep Baru</span>
                </button>
              </div>

              {/* Search & Filter Bar */}
              <div className="card" style={{
                padding: '14px 18px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '12px'
              }}>
                <div style={{ position: 'relative', flex: 1, minWidth: '220px' }}>
                  <Search size={16} color="var(--text-light)" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
                  <input
                    type="text"
                    className="input-field"
                    placeholder="Cari nama menu masakan..."
                    value={recipeSearch}
                    onChange={(e) => setRecipeSearch(e.target.value)}
                    style={{ paddingLeft: '38px', height: '40px', fontSize: '13.5px', borderRadius: 'var(--radius-md)' }}
                  />
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '12.5px', color: 'var(--text-muted)', fontWeight: '600' }}>Kategori:</span>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    style={{
                      padding: '8px 12px',
                      borderRadius: 'var(--radius-md)',
                      border: '1.5px solid var(--border-subtle)',
                      fontSize: '13px',
                      fontWeight: '600',
                      color: 'var(--text-main)',
                      background: '#FFFFFF',
                      outline: 'none',
                      cursor: 'pointer'
                    }}
                  >
                    <option value="semua">Semua ({recipes.length})</option>
                    {categories.map(c => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Recipe Cards List */}
              {loading ? (
                <div style={{ textAlign: 'center', padding: '50px 20px', color: 'var(--text-muted)' }}>
                  <div className="skeleton" style={{ width: '60px', height: '60px', borderRadius: '50%', margin: '0 auto 12px' }} />
                  <div style={{ fontWeight: '700' }}>Memuat daftar resep...</div>
                </div>
              ) : filteredRecipes.length === 0 ? (
                <div className="card" style={{ textAlign: 'center', padding: '40px 20px' }}>
                  <ChefHat size={36} color="var(--text-light)" style={{ margin: '0 auto 8px' }} />
                  <div style={{ fontSize: '15.5px', fontWeight: '800' }}>Tidak ada resep yang sesuai</div>
                  <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '2px' }}>
                    Coba ubah kata kunci pencarian atau kategori.
                  </div>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {filteredRecipes.map((recipe) => {
                    const diffStyle = getDifficultyColor(recipe.difficulty);
                    return (
                      <div
                        key={recipe.id}
                        className="card"
                        style={{
                          padding: '12px 16px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          flexWrap: 'wrap',
                          gap: '12px'
                        }}
                      >
                        {/* Thumbnail & Title */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flex: 1, minWidth: '240px' }}>
                          <div style={{
                            width: '58px',
                            height: '58px',
                            borderRadius: '10px',
                            overflow: 'hidden',
                            backgroundColor: '#F0ECE4',
                            flexShrink: 0
                          }}>
                            <img
                              src={recipe.image_url}
                              alt={recipe.name}
                              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                              onError={(e) => {
                                e.currentTarget.src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80';
                              }}
                            />
                          </div>

                          <div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '5px', flexWrap: 'wrap', marginBottom: '2px' }}>
                              <span style={{
                                fontSize: '10px',
                                fontWeight: '700',
                                color: 'var(--purple-dark)',
                                textTransform: 'uppercase'
                              }}>
                                {recipe.category?.name || recipe.category_id}
                              </span>
                              <span className="badge" style={{ fontSize: '9.5px', padding: '2px 5px', background: diffStyle.bg, color: diffStyle.text }}>
                                {recipe.difficulty}
                              </span>
                              {recipe.is_kos_friendly && (
                                <span className="badge" style={{ fontSize: '9.5px', padding: '2px 5px', background: 'var(--amber-light)', color: 'var(--amber)' }}>
                                  Anak Kos
                                </span>
                              )}
                              {recipe.is_popular && (
                                <span className="badge" style={{ fontSize: '9.5px', padding: '2px 5px', background: 'var(--primary-light)', color: 'var(--primary)' }}>
                                  Populer
                                </span>
                              )}
                            </div>

                            <h3 style={{ fontSize: '15px', fontWeight: '800', color: 'var(--text-main)', lineHeight: 1.25 }}>
                              {recipe.name}
                            </h3>

                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '11.5px', color: 'var(--text-muted)', marginTop: '3px' }}>
                              <span style={{ fontWeight: '700', color: 'var(--primary)' }}>
                                {formatRupiah(recipe.estimated_cost)}
                              </span>
                              <span style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                                <Clock size={11} /> {formatTime(recipe.cooking_time)}
                              </span>
                              <span>{recipe.servings} Porsi</span>
                            </div>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <button
                            onClick={() => handleOpenEditModal(recipe)}
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '5px',
                              background: 'var(--purple-dark)',
                              color: '#FFFFFF',
                              padding: '7px 14px',
                              borderRadius: 'var(--radius-md)',
                              fontSize: '12.5px',
                              fontWeight: '700',
                              cursor: 'pointer'
                            }}
                          >
                            <Edit3 size={14} />
                            <span>Edit</span>
                          </button>

                          <button
                            onClick={() => handleDeleteRecipe(recipe)}
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '5px',
                              background: 'var(--alert-red-light)',
                              color: 'var(--alert-red)',
                              padding: '7px 12px',
                              borderRadius: 'var(--radius-md)',
                              fontSize: '12.5px',
                              fontWeight: '700',
                              cursor: 'pointer',
                              border: '1px solid #FECACA'
                            }}
                          >
                            <Trash2 size={14} />
                            <span>Hapus</span>
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </>
          )}

          {/* TAB 2: DATA KATEGORI */}
          {activeTab === 'categories' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div className="card" style={{ padding: '20px 24px', background: 'var(--bg-card-warm)' }}>
                <h2 style={{ fontSize: '20px', fontWeight: '800', color: 'var(--purple-dark)' }}>
                  Data Master Kategori Masakan
                </h2>
                <p style={{ fontSize: '13.5px', color: 'var(--text-muted)', marginTop: '2px' }}>
                  Daftar seluruh kelompok hidangan yang digunakan untuk klasifikasi menu.
                </p>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '14px' }}>
                {categories.map((cat) => {
                  const countInCat = recipes.filter(r => r.category_id === cat.id || r.category?.id === cat.id).length;
                  return (
                    <div key={cat.id} className="card" style={{ padding: '18px 20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <span style={{ fontSize: '15px', fontWeight: '800', color: 'var(--text-main)' }}>{cat.name}</span>
                        <span style={{
                          fontSize: '11px',
                          fontWeight: '700',
                          background: 'var(--purple-light)',
                          color: 'var(--purple-main)',
                          padding: '2px 8px',
                          borderRadius: '999px'
                        }}>
                          {countInCat} Resep
                        </span>
                      </div>
                      <div style={{ fontSize: '12.5px', color: 'var(--text-muted)' }}>{cat.description}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 3: DATA ALAT MASAK */}
          {activeTab === 'tools' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div className="card" style={{ padding: '20px 24px', background: 'var(--bg-card-warm)' }}>
                <h2 style={{ fontSize: '20px', fontWeight: '800', color: 'var(--purple-dark)' }}>
                  Data Peralatan Masak
                </h2>
                <p style={{ fontSize: '13.5px', color: 'var(--text-muted)', marginTop: '2px' }}>
                  Peralatan yang digunakan pada fitur "Cook with My Tools".
                </p>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
                {toolsList.map((tool) => (
                  <div key={tool.id} className="card" style={{ padding: '18px 20px', display: 'flex', alignItems: 'center', gap: '14px' }}>
                    <div style={{
                      width: '42px',
                      height: '42px',
                      borderRadius: '10px',
                      background: 'var(--primary-light)',
                      color: 'var(--primary)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}>
                      <Wrench size={20} />
                    </div>
                    <div>
                      <div style={{ fontSize: '15px', fontWeight: '800', color: 'var(--text-main)' }}>{tool.name}</div>
                      <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '1px' }}>ID: <code>{tool.id}</code></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: DATA SUBSTITUSI BAHAN */}
          {activeTab === 'substitutions' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div className="card" style={{ padding: '20px 24px', background: 'var(--bg-card-warm)' }}>
                <h2 style={{ fontSize: '20px', fontWeight: '800', color: 'var(--purple-dark)' }}>
                  Data Substitusi Bahan (Missing Ingredients)
                </h2>
                <p style={{ fontSize: '13.5px', color: 'var(--text-muted)', marginTop: '2px' }}>
                  Rekomendasi alternatif bumbu ketika bahan tertentu habis di kosan.
                </p>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {substitutionsList.map((sub) => (
                  <div key={sub.id} className="card" style={{ padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                      <span style={{ fontSize: '14.5px', fontWeight: '800', color: 'var(--text-main)' }}>
                        {sub.original_ingredient}
                      </span>
                      <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>digantikan oleh</span>
                      <span style={{
                        fontSize: '13px',
                        fontWeight: '700',
                        color: 'var(--primary)',
                        background: 'var(--primary-light)',
                        padding: '2px 8px',
                        borderRadius: '999px'
                      }}>
                        {sub.substitute_ingredient}
                      </span>
                      <span style={{ fontSize: '12px', color: 'var(--sage)', fontWeight: '600' }}>
                        (Rasio: {sub.ratio})
                      </span>
                    </div>
                    <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
                      <strong>Catatan Rasa:</strong> {sub.notes}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: SISTEM & DATABASE STATUS */}
          {activeTab === 'system' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div className="card" style={{ padding: '24px', background: 'var(--bg-card-warm)' }}>
                <h2 style={{ fontSize: '20px', fontWeight: '800', color: 'var(--purple-dark)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Database size={22} color="var(--primary)" />
                  <span>Status Sistem & Database Supabase</span>
                </h2>
                <p style={{ fontSize: '13.5px', color: 'var(--text-muted)', marginTop: '4px' }}>
                  Informasi konektivitas REST API Express dan Supabase PostgreSQL.
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '18px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px' }}>
                    <CheckCircle2 size={18} color="var(--success-green)" />
                    <span><strong>Database Supabase:</strong> Terhubung Aktif (8 Tabel Relasional)</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px' }}>
                    <CheckCircle2 size={18} color="var(--success-green)" />
                    <span><strong>Project Ref:</strong> <code>dnhlngwxepicvugxbeee</code></span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px' }}>
                    <CheckCircle2 size={18} color="var(--success-green)" />
                    <span><strong>CRUD Endpoints:</strong> POST, PUT, DELETE /api/recipes Siap Pakai</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px' }}>
                    <CheckCircle2 size={18} color="var(--success-green)" />
                    <span><strong>PWA Offline Cache:</strong> Service Worker Siap Cache File Lokal <code>/recipes/</code></span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* ==================================================== */}
      {/* 3. MODAL FORM: TAMBAH / EDIT RESEP                   */}
      {/* ==================================================== */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
            style={{ maxWidth: '680px', width: '100%', maxHeight: '90vh' }}
          >
            {/* Modal Header */}
            <div style={{
              padding: '20px 24px',
              borderBottom: '1px solid var(--border-subtle)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              background: 'var(--purple-dark)',
              color: '#FFFFFF'
            }}>
              <div>
                <div style={{ fontSize: '11.5px', textTransform: 'uppercase', letterSpacing: '0.5px', color: 'var(--amber)', fontWeight: '700' }}>
                  {editingRecipe ? 'Formulir Edit Menu' : 'Tambah Resep Baru'}
                </div>
                <h2 style={{ fontSize: '19px', fontWeight: '800', marginTop: '2px', color: '#FFF' }}>
                  {editingRecipe ? `Edit: ${editingRecipe.name}` : 'Tambah Menu Masakan Baru'}
                </h2>
              </div>

              <button
                onClick={() => setIsModalOpen(false)}
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  background: 'rgba(255, 255, 255, 0.15)',
                  color: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer'
                }}
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Form Body */}
            <form onSubmit={handleSubmit} style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {/* Row 1: Nama Resep & Kategori */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '14px' }}>
                <div>
                  <label style={{ fontSize: '13px', fontWeight: '700', color: 'var(--text-main)', display: 'block', marginBottom: '6px' }}>
                    Nama Masakan *
                  </label>
                  <input
                    type="text"
                    required
                    className="input-field"
                    placeholder="Contoh: Nasi Goreng Spesial Kos"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '13px', fontWeight: '700', color: 'var(--text-main)', display: 'block', marginBottom: '6px' }}>
                    Kategori Menu *
                  </label>
                  <select
                    className="input-field"
                    value={formData.category_id}
                    onChange={(e) => setFormData({ ...formData, category_id: e.target.value })}
                    style={{ background: '#FFFFFF' }}
                  >
                    {categories.map(c => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Row 2: Pengaturan Foto Masakan */}
              <div style={{
                padding: '16px',
                background: 'var(--bg-secondary)',
                borderRadius: 'var(--radius-md)',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <label style={{ fontSize: '13.5px', fontWeight: '800', color: 'var(--purple-dark)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <ImageIcon size={16} /> Foto Masakan
                  </label>
                  <span style={{ fontSize: '11.5px', color: 'var(--text-muted)' }}>
                    Bisa pakai file lokal di <code>/recipes/...</code> atau link URL
                  </span>
                </div>

                {/* Input URL atau File Path */}
                <div>
                  <input
                    type="text"
                    className="input-field"
                    placeholder="Contoh: /recipes/nasi-goreng.jpg atau link URL https://..."
                    value={formData.image_url}
                    onChange={(e) => {
                      setFormData({ ...formData, image_url: e.target.value });
                      setImagePreview(e.target.value);
                    }}
                  />
                </div>

                {/* Upload dari File Manager */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
                  <label style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    background: 'var(--purple-dark)',
                    color: '#FFFFFF',
                    padding: '8px 14px',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '12.5px',
                    fontWeight: '700',
                    cursor: 'pointer'
                  }}>
                    <FolderOpen size={15} />
                    <span>Pilih Foto dari File Manager</span>
                    <input
                      type="file"
                      accept="image/*"
                      style={{ display: 'none' }}
                      onChange={handleFileChange}
                    />
                  </label>

                  <div style={{ fontSize: '11.5px', color: 'var(--text-muted)' }}>
                    File tersimpan di folder: <code>frontend/public/recipes/</code>
                  </div>
                </div>

                {/* Live Photo Preview */}
                {imagePreview && (
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '8px',
                    background: '#FFFFFF',
                    borderRadius: 'var(--radius-sm)'
                  }}>
                    <div style={{ width: '60px', height: '60px', borderRadius: '8px', overflow: 'hidden', flexShrink: 0 }}>
                      <img
                        src={imagePreview}
                        alt="Preview"
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        onError={(e) => {
                          e.currentTarget.src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80';
                        }}
                      />
                    </div>
                    <div>
                      <div style={{ fontSize: '12px', fontWeight: '700', color: 'var(--text-main)' }}>Pratinjau Foto Masakan</div>
                      <div style={{ fontSize: '11px', color: 'var(--text-muted)', wordBreak: 'break-all' }}>{formData.image_url}</div>
                    </div>
                  </div>
                )}
              </div>

              {/* Row 3: Biaya, Porsi, dan Waktu */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '12px' }}>
                <div>
                  <label style={{ fontSize: '12.5px', fontWeight: '700', color: 'var(--text-main)', display: 'block', marginBottom: '4px' }}>
                    Estimasi Biaya (Rp)
                  </label>
                  <input
                    type="number"
                    min="1000"
                    step="500"
                    className="input-field"
                    value={formData.estimated_cost}
                    onChange={(e) => setFormData({ ...formData, estimated_cost: Number(e.target.value) })}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '12.5px', fontWeight: '700', color: 'var(--text-main)', display: 'block', marginBottom: '4px' }}>
                    Jumlah Porsi
                  </label>
                  <input
                    type="number"
                    min="1"
                    className="input-field"
                    value={formData.servings}
                    onChange={(e) => setFormData({ ...formData, servings: Number(e.target.value) })}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '12.5px', fontWeight: '700', color: 'var(--text-main)', display: 'block', marginBottom: '4px' }}>
                    Waktu Masak (Mnt)
                  </label>
                  <input
                    type="number"
                    min="1"
                    className="input-field"
                    value={formData.cooking_time}
                    onChange={(e) => setFormData({ ...formData, cooking_time: Number(e.target.value) })}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '12.5px', fontWeight: '700', color: 'var(--text-main)', display: 'block', marginBottom: '4px' }}>
                    Tingkat Kesulitan
                  </label>
                  <select
                    className="input-field"
                    value={formData.difficulty}
                    onChange={(e) => setFormData({ ...formData, difficulty: e.target.value })}
                    style={{ background: '#FFFFFF' }}
                  >
                    <option value="Mudah">Mudah</option>
                    <option value="Sedang">Sedang</option>
                    <option value="Sulit">Sulit</option>
                  </select>
                </div>
              </div>

              {/* Row 4: Flags & Deskripsi */}
              <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '13px', fontWeight: '700' }}>
                  <input
                    type="checkbox"
                    checked={formData.is_kos_friendly}
                    onChange={(e) => setFormData({ ...formData, is_kos_friendly: e.target.checked })}
                    style={{ width: '16px', height: '16px', accentColor: 'var(--primary)' }}
                  />
                  <span>Cocok untuk Anak Kos</span>
                </label>

                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '13px', fontWeight: '700' }}>
                  <input
                    type="checkbox"
                    checked={formData.is_popular}
                    onChange={(e) => setFormData({ ...formData, is_popular: e.target.checked })}
                    style={{ width: '16px', height: '16px', accentColor: 'var(--amber)' }}
                  />
                  <span>Tandai Sebagai Menu Populer</span>
                </label>
              </div>

              <div>
                <label style={{ fontSize: '13px', fontWeight: '700', color: 'var(--text-main)', display: 'block', marginBottom: '6px' }}>
                  Deskripsi Singkat Masakan
                </label>
                <textarea
                  className="input-field"
                  rows="2"
                  placeholder="Ceritakan cita rasa, aroma, atau keunikan resep ini..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  style={{ resize: 'vertical' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '13px', fontWeight: '700', color: 'var(--text-main)', display: 'block', marginBottom: '6px' }}>
                  Tips Memasak
                </label>
                <input
                  type="text"
                  className="input-field"
                  placeholder="Tips trik agar masakan matang sempurna atau tidak gagal..."
                  value={formData.tips}
                  onChange={(e) => setFormData({ ...formData, tips: e.target.value })}
                />
              </div>

              {/* Row 5: Langkah-Langkah Memasak */}
              <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                  <div style={{ fontSize: '14px', fontWeight: '800', color: 'var(--text-main)' }}>
                    Langkah-Langkah Memasak ({formData.instructions.length} Langkah)
                  </div>
                  <button
                    type="button"
                    onClick={handleAddInstruction}
                    style={{
                      background: 'var(--sage)',
                      color: '#FFFFFF',
                      padding: '6px 12px',
                      borderRadius: 'var(--radius-sm)',
                      fontSize: '12px',
                      fontWeight: '700',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                      cursor: 'pointer'
                    }}
                  >
                    <Plus size={14} />
                    <span>Tambah Langkah</span>
                  </button>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {formData.instructions.map((step, idx) => (
                    <div
                      key={idx}
                      style={{
                        padding: '12px',
                        background: 'var(--bg-secondary)',
                        borderRadius: 'var(--radius-md)',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '8px'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <span style={{ fontSize: '12.5px', fontWeight: '800', color: 'var(--primary)' }}>
                          Langkah {idx + 1}
                        </span>
                        {formData.instructions.length > 1 && (
                          <button
                            type="button"
                            onClick={() => handleRemoveInstruction(idx)}
                            style={{ color: 'var(--alert-red)', fontSize: '11px', fontWeight: '700', cursor: 'pointer' }}
                          >
                            Hapus
                          </button>
                        )}
                      </div>

                      <input
                        type="text"
                        className="input-field"
                        placeholder="Judul langkah (contoh: Tumis Bumbu Halus)"
                        value={step.title}
                        onChange={(e) => handleInstructionChange(idx, 'title', e.target.value)}
                        style={{ height: '38px', fontSize: '13px' }}
                      />

                      <textarea
                        className="input-field"
                        rows="2"
                        placeholder="Instruksi lengkap langkah ini..."
                        value={step.instruction}
                        onChange={(e) => handleInstructionChange(idx, 'instruction', e.target.value)}
                        style={{ fontSize: '13px', resize: 'vertical' }}
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Form Buttons */}
              <div style={{
                borderTop: '1px solid var(--border-subtle)',
                paddingTop: '16px',
                display: 'flex',
                justifyContent: 'flex-end',
                gap: '10px'
              }}>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  style={{
                    padding: '10px 20px',
                    borderRadius: 'var(--radius-full)',
                    background: 'var(--bg-secondary)',
                    color: 'var(--text-main)',
                    fontWeight: '700',
                    fontSize: '13.5px',
                    cursor: 'pointer'
                  }}
                >
                  Batal
                </button>

                <button
                  type="submit"
                  disabled={formSubmitting}
                  style={{
                    padding: '10px 24px',
                    borderRadius: 'var(--radius-full)',
                    background: 'var(--primary)',
                    color: '#FFFFFF',
                    fontWeight: '700',
                    fontSize: '13.5px',
                    cursor: formSubmitting ? 'not-allowed' : 'pointer',
                    opacity: formSubmitting ? 0.7 : 1,
                    boxShadow: 'var(--shadow-warm)'
                  }}
                >
                  {formSubmitting ? 'Menyimpan...' : (editingRecipe ? 'Simpan Perubahan' : 'Tambah Resep')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Responsive Styles for Sidebar */}
      <style>{`
        .admin-mobile-close {
          display: none;
        }
        .admin-sidebar-mobile-toggle {
          display: none;
        }
        @media (max-width: 960px) {
          .admin-sidebar-mobile-toggle {
            display: inline-flex;
          }
          .admin-mobile-close {
            display: block;
          }
          .admin-sidebar {
            display: none;
          }
          .admin-sidebar.open {
            display: flex;
            position: fixed;
            top: 0;
            left: 0;
            bottom: 0;
            width: 290px;
            max-width: 85vw;
            z-index: 1001;
            border-radius: 0 20px 20px 0;
            overflow-y: auto;
            box-shadow: 0 0 40px rgba(0, 0, 0, 0.6);
            animation: slideInLeft 0.25s ease;
          }
        }
        @keyframes slideInLeft {
          from { transform: translateX(-100%); }
          to { transform: translateX(0); }
        }
      `}</style>
    </div>
  );
};

export default AdminPage;
