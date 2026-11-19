import { categoryService } from '../services/supabaseService.js';

export const getAllCategories = async (req, res, next) => {
  try {
    const categories = await categoryService.getAllCategories();
    return res.status(200).json({
      success: true,
      message: 'Data kategori berhasil diambil',
      count: categories.length,
      data: categories
    });
  } catch (error) {
    next(error);
  }
};
