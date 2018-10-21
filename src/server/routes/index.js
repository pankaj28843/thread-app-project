import express from 'express';

import internshipsRoute from './internships';

const router = express.Router();

router.use('/internships', internshipsRoute);

router.use((req, res, next) => {
  const err = new Error('Not found.');
  err.status = 404;
  next(err);
});

export default router;
