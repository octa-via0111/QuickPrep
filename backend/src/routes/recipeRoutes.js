import { Router } from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import {
  getAllRecipes,
  getRecipeById,
  getRecipeSubstitutions,
  createRecipe,
  updateRecipe,
  deleteRecipe
} from '../controllers/recipeController.js';
import { validateRecipeQuery } from '../middleware/validator.js';
import { requireAdmin } from '../middleware/authMiddleware.js';
import { isSupabaseConfigured, supabase } from '../config/supabase.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = Router();

router.get('/', validateRecipeQuery, getAllRecipes);
router.get('/:id', getRecipeById);
router.get('/:id/substitutions', getRecipeSubstitutions);

// Upload Foto Resep Langsung ke Server & Supabase (Khusus Administrator)
router.post('/upload-image', requireAdmin, async (req, res, next) => {
  try {
    const { filename, base64Data } = req.body;
    if (!base64Data || !filename) {
      return res.status(400).json({
        success: false,
        message: 'File foto dan nama file wajib disertakan'
      });
    }

    const ext = path.extname(filename).toLowerCase() || '.jpg';
    const baseName = path.basename(filename, ext).replace(/[^a-zA-Z0-9_-]/g, '-').toLowerCase();
    const finalName = `${Date.now()}-${baseName}${ext}`;

    const pureBase64 = base64Data.replace(/^data:image\/\w+;base64,/, '');
    const buffer = Buffer.from(pureBase64, 'base64');

    // 1. Simpan ke folder frontend/public/recipes jika filesystem dapat ditulis (misal lokal)
    try {
      const publicRecipesDir = path.resolve(__dirname, '../../../frontend/public/recipes');
      if (!fs.existsSync(publicRecipesDir)) {
        fs.mkdirSync(publicRecipesDir, { recursive: true });
      }
      const publicFilePath = path.join(publicRecipesDir, finalName);
      fs.writeFileSync(publicFilePath, buffer);

      // Salin juga ke frontend/dist/recipes jika folder build ada
      const distRecipesDir = path.resolve(__dirname, '../../../frontend/dist/recipes');
      if (fs.existsSync(distRecipesDir)) {
        fs.writeFileSync(path.join(distRecipesDir, finalName), buffer);
      }
    } catch (fsErr) {
      console.warn('[Storage] Filesystem lokal read-only, mengandalkan Supabase/Base64 URL:', fsErr.message);
    }

    let finalUrl = `/recipes/${finalName}`;

    // 2. Jika Supabase terhubung, coba unggah ke Supabase Storage (recipe-images)
    if (isSupabaseConfigured && supabase) {
      try {
        const mimeType = ext === '.png' ? 'image/png' : (ext === '.webp' ? 'image/webp' : 'image/jpeg');
        const { error: uploadErr } = await supabase.storage
          .from('recipe-images')
          .upload(finalName, buffer, {
            contentType: mimeType,
            upsert: true
          });

        if (!uploadErr) {
          const { data: urlData } = supabase.storage.from('recipe-images').getPublicUrl(finalName);
          if (urlData?.publicUrl) {
            finalUrl = urlData.publicUrl;
          }
        }
      } catch (e) {
        // Fallback tetap menggunakan finalUrl lokal /recipes/...
      }
    }

    return res.status(200).json({
      success: true,
      message: 'Foto resep berhasil diunggah',
      data: {
        imageUrl: finalUrl,
        filename: finalName
      }
    });
  } catch (error) {
    next(error);
  }
});

// Admin / CRUD Routes (Dilindungi Autentikasi Administrator)
router.post('/', requireAdmin, createRecipe);
router.put('/:id', requireAdmin, updateRecipe);
router.delete('/:id', requireAdmin, deleteRecipe);

export default router;
