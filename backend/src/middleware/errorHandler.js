export const notFoundHandler = (req, res, next) => {
  res.status(404).json({
    success: false,
    message: `Endpoint ${req.method} ${req.originalUrl} tidak ditemukan di server QuickPrep`
  });
};

export const errorHandler = (err, req, res, next) => {
  console.error('[QuickPrep Error]', err);

  const statusCode = err.status || err.statusCode || 500;
  const message = err.message || 'Terjadi kesalahan pada server internal';

  res.status(statusCode).json({
    success: false,
    message,
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
};
