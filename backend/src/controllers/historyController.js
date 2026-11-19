import { historyService } from '../services/supabaseService.js';

export const createCookingHistory = async (req, res, next) => {
  try {
    const { recipe_id, recipe_name, servings_cooked, duration_minutes, rating, notes } = req.body;

    if (!recipe_name) {
      return res.status(400).json({
        success: false,
        message: 'Nama resep wajib diisi untuk riwayat memasak'
      });
    }

    const saved = await historyService.recordCooking({
      recipe_id,
      recipe_name,
      servings_cooked,
      duration_minutes,
      rating,
      notes
    });

    return res.status(201).json({
      success: true,
      message: 'Riwayat memasak berhasil disimpan',
      data: saved
    });
  } catch (error) {
    next(error);
  }
};

export const getCookingHistory = async (req, res, next) => {
  try {
    const history = await historyService.getHistory();
    return res.status(200).json({
      success: true,
      message: 'Riwayat memasak berhasil diambil',
      count: history.length,
      data: history
    });
  } catch (error) {
    next(error);
  }
};
