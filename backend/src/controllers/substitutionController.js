import { substitutionService } from '../services/supabaseService.js';

export const getAllSubstitutions = async (req, res, next) => {
  try {
    const { ingredient } = req.query;
    const substitutions = await substitutionService.getAllSubstitutions(ingredient);

    return res.status(200).json({
      success: true,
      message: 'Data substitusi bahan berhasil diambil',
      count: substitutions.length,
      data: substitutions
    });
  } catch (error) {
    next(error);
  }
};
