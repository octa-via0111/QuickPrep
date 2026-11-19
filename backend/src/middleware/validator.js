export const validateRecipeQuery = (req, res, next) => {
  const { maxBudget, maxCookingTime } = req.query;

  if (maxBudget !== undefined && maxBudget !== '') {
    const budgetNum = Number(maxBudget);
    if (isNaN(budgetNum) || budgetNum < 0) {
      return res.status(400).json({
        success: false,
        message: 'Parameter maxBudget harus berupa angka positif'
      });
    }
  }

  if (maxCookingTime !== undefined && maxCookingTime !== '') {
    const timeNum = Number(maxCookingTime);
    if (isNaN(timeNum) || timeNum < 0) {
      return res.status(400).json({
        success: false,
        message: 'Parameter maxCookingTime harus berupa angka positif'
      });
    }
  }

  next();
};
