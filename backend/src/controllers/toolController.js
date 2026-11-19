import { toolService } from '../services/supabaseService.js';

export const getAllTools = async (req, res, next) => {
  try {
    const tools = await toolService.getAllTools();
    return res.status(200).json({
      success: true,
      message: 'Data alat masak berhasil diambil',
      count: tools.length,
      data: tools
    });
  } catch (error) {
    next(error);
  }
};
