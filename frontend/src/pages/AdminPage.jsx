import React, { useState, useEffect, useMemo } from 'react';
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
  Upload, 
  ExternalLink,
  SlidersHorizontal,
  FolderOpen
} from 'lucide-react';
import recipeService from '../services/recipeService.js';
import useCategories from '../hooks/useCategories.js';
import { formatRupiah, formatTime, getDifficultyColor } from '../utils/formatter.js';

export const AdminPage = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('semua');
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRecipe, setEditingRecipe] = useState(null); // null = Add mode, object = Edit mode
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [alertMsg, setAlertMsg] = useState(null); // { type: 'success' | 'error', text: '' }

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

  // Local image preview state
  const [imagePreview, setImagePreview] = useState('');

  // Fetch all recipes
  const loadRecipes = async () => {
    try {
      setLoading(true);
      const res = await recipeService.getRecipes();
      if (res && res.data) {
        setRecipes(res.data);
      }
    } catch (err) {
      showAlert('error', 'Gagal memuat daftar resep dari server');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRecipes();
  }, []);

  const showAlert = (type, text) => {
    setAlertMsg({ type, text });
    setTimeout(() => setAlertMsg(null), 4000);
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
    
    // Parse instructions if string
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

  // Handle local file selection from file manager
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Bersihkan nama file agar rapi
    const cleanFileName = file.name.replace(/\s+/g, '-').toLowerCase();
    const localPath = `/recipes/${cleanFileName}`;

    // Buat URL object preview lokal instan
    const previewUrl = URL.createObjectURL(file);
    setImagePreview(previewUrl);

    // Otomatis masukkan path ke form
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
        // Update Recipe
        const res = await recipeService.updateRecipe(editingRecipe.id, formData);
        showAlert('success', `Resep "${formData.name}" berhasil diperbarui!`);
      } else {
        // Create Recipe
        const res = await recipeService.createRecipe(formData);
        showAlert('success', `Resep baru "${formData.name}" berhasil ditambahkan!`);
      }

      setIsModalOpen(false);
      loadRecipes();
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

  // Filtered recipes for display
  const filteredRecipes = useMemo(() => {
    return recipes.filter(r => {
      const matchSearch = search.trim() === '' || 
        r.name.toLowerCase().includes(search.toLowerCase()) ||
        (r.description && r.description.toLowerCase().includes(search.toLowerCase()));
      
      const matchCategory = selectedCategory === 'semua' || 
        r.category_id === selectedCategory || 
        r.category?.id === selectedCategory;

      return matchSearch && matchCategory;
    });
  }, [recipes, search, selectedCategory]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* 1. Header Admin */}
      <div style={{
        background: 'var(--purple-dark)',
        color: '#FFFFFF',
        padding: '28px 24px',
        borderRadius: 'var(--radius-xl)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '16px',
        boxShadow: 'var(--shadow-purple)'
      }}>
        <div>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            background: 'var(--amber)',
            color: '#FFFFFF',
            padding: '4px 12px',
            borderRadius: '999px',
            fontSize: '12px',
            fontWeight: '700',
            marginBottom: '8px'
          }}>
            <ChefHat size={14} /> Admin Dashboard QuickPrep
          </div>
          <h1 style={{ fontSize: '26px', fontWeight: '800', lineHeight: 1.2, color: '#FFF' }}>
            Kelola Menu Masakan
          </h1>
          <p style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.85)', marginTop: '4px' }}>
            Tambah resep baru, ubah foto makanan, perbarui estimasi harga, durasi, dan langkah memasak.
          </p>
        </div>

        <button
          onClick={handleOpenAddModal}
          style={{
            background: 'var(--primary)',
            color: '#FFFFFF',
            padding: '12px 22px',
            borderRadius: '999px',
            fontWeight: '700',
            fontSize: '14px',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            cursor: 'pointer',
            boxShadow: 'var(--shadow-warm)',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; }}
        >
          <Plus size={18} strokeWidth={2.5} />
          <span>Tambah Resep Baru</span>
        </button>
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

      {/* 2. Quick Stats Bar */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
        gap: '12px'
      }}>
        <div className="card" style={{ padding: '16px 20px', borderLeft: '4px solid var(--purple-dark)' }}>
          <div style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: '600' }}>Total Seluruh Menu</div>
          <div style={{ fontSize: '24px', fontWeight: '800', color: 'var(--purple-dark)', marginTop: '2px' }}>
            {recipes.length} <span style={{ fontSize: '13px', fontWeight: '500' }}>Resep</span>
          </div>
        </div>

        <div className="card" style={{ padding: '16px 20px', borderLeft: '4px solid var(--primary)' }}>
          <div style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: '600' }}>Masakan Anak Kos</div>
          <div style={{ fontSize: '24px', fontWeight: '800', color: 'var(--primary)', marginTop: '2px' }}>
            {recipes.filter(r => r.is_kos_friendly).length} <span style={{ fontSize: '13px', fontWeight: '500' }}>Menu</span>
          </div>
        </div>

        <div className="card" style={{ padding: '16px 20px', borderLeft: '4px solid var(--amber)' }}>
          <div style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: '600' }}>Menu Populer</div>
          <div style={{ fontSize: '24px', fontWeight: '800', color: 'var(--amber)', marginTop: '2px' }}>
            {recipes.filter(r => r.is_popular).length} <span style={{ fontSize: '13px', fontWeight: '500' }}>Menu</span>
          </div>
        </div>

        <div className="card" style={{ padding: '16px 20px', borderLeft: '4px solid var(--sage)' }}>
          <div style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: '600' }}>Kategori Tersedia</div>
          <div style={{ fontSize: '24px', fontWeight: '800', color: 'var(--sage)', marginTop: '2px' }}>
            {categories.length} <span style={{ fontSize: '13px', fontWeight: '500' }}>Kategori</span>
          </div>
        </div>
      </div>

      {/* 3. Search & Filter Bar */}
      <div className="card" style={{
        padding: '16px 20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '12px'
      }}>
        {/* Search Input */}
        <div style={{ position: 'relative', flex: 1, minWidth: '240px' }}>
          <Search size={18} color="var(--text-light)" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
          <input
            type="text"
            className="input-field"
            placeholder="Cari menu berdasarkan nama masakan..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ paddingLeft: '42px', height: '44px', borderRadius: 'var(--radius-md)' }}
          />
        </div>

        {/* Category Filter */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '13px', color: 'var(--text-muted)', fontWeight: '600' }}>Kategori:</span>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            style={{
              padding: '10px 14px',
              borderRadius: 'var(--radius-md)',
              border: '1.5px solid var(--border-subtle)',
              fontSize: '13.5px',
              fontWeight: '600',
              color: 'var(--text-main)',
              background: '#FFFFFF',
              outline: 'none',
              cursor: 'pointer'
            }}
          >
            <option value="semua">Semua Kategori ({recipes.length})</option>
            {categories.map(c => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* 4. Recipe List Table / Cards */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--text-muted)' }}>
          <div className="skeleton" style={{ width: '80px', height: '80px', borderRadius: '50%', margin: '0 auto 16px' }} />
          <div style={{ fontWeight: '700' }}>Memuat data resep...</div>
        </div>
      ) : filteredRecipes.length === 0 ? (
        <div className="card" style={{ textAlign: 'center', padding: '50px 20px' }}>
          <ChefHat size={40} color="var(--text-light)" style={{ margin: '0 auto 12px' }} />
          <div style={{ fontSize: '16px', fontWeight: '800' }}>Tidak ada resep yang cocok</div>
          <div style={{ fontSize: '13.5px', color: 'var(--text-muted)', marginTop: '4px' }}>
            Coba ganti kata kunci pencarian atau filter kategori Anda.
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
                  padding: '14px 18px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: '14px',
                  transition: 'transform 0.15s ease'
                }}
              >
                {/* Left: Thumbnail & Details */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', minWidth: '260px', flex: 1 }}>
                  {/* Photo Thumbnail */}
                  <div style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    backgroundColor: '#F0ECE4',
                    flexShrink: 0,
                    position: 'relative'
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
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap', marginBottom: '3px' }}>
                      <span style={{
                        fontSize: '10.5px',
                        fontWeight: '700',
                        color: 'var(--purple-dark)',
                        textTransform: 'uppercase',
                        letterSpacing: '0.4px'
                      }}>
                        {recipe.category?.name || recipe.category_id}
                      </span>
                      <span className="badge" style={{ fontSize: '10px', padding: '2px 6px', background: diffStyle.bg, color: diffStyle.text }}>
                        {recipe.difficulty}
                      </span>
                      {recipe.is_kos_friendly && (
                        <span className="badge" style={{ fontSize: '10px', padding: '2px 6px', background: 'var(--amber-light)', color: 'var(--amber)' }}>
                          Anak Kos
                        </span>
                      )}
                      {recipe.is_popular && (
                        <span className="badge" style={{ fontSize: '10px', padding: '2px 6px', background: 'var(--primary-light)', color: 'var(--primary)' }}>
                          Populer
                        </span>
                      )}
                    </div>

                    <h3 style={{ fontSize: '15.5px', fontWeight: '800', color: 'var(--text-main)', lineHeight: 1.25 }}>
                      {recipe.name}
                    </h3>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '14px', fontSize: '12px', color: 'var(--text-muted)', marginTop: '4px' }}>
                      <span style={{ fontWeight: '700', color: 'var(--primary)' }}>
                        {formatRupiah(recipe.estimated_cost)}
                      </span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                        <Clock size={12} /> {formatTime(recipe.cooking_time)}
                      </span>
                      <span>{recipe.servings} Porsi</span>
                    </div>
                  </div>
                </div>

                {/* Right: Action Buttons */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <button
                    onClick={() => handleOpenEditModal(recipe)}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      background: 'var(--purple-dark)',
                      color: '#FFFFFF',
                      padding: '8px 16px',
                      borderRadius: 'var(--radius-md)',
                      fontSize: '13px',
                      fontWeight: '700',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    <Edit3 size={15} />
                    <span>Edit</span>
                  </button>

                  <button
                    onClick={() => handleDeleteRecipe(recipe)}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      background: 'var(--alert-red-light)',
                      color: 'var(--alert-red)',
                      padding: '8px 14px',
                      borderRadius: 'var(--radius-md)',
                      fontSize: '13px',
                      fontWeight: '700',
                      cursor: 'pointer',
                      border: '1px solid #FECACA',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    <Trash2 size={15} />
                    <span>Hapus</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* 5. MODAL FORM: TAMBAH / EDIT RESEP */}
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
    </div>
  );
};

export default AdminPage;
