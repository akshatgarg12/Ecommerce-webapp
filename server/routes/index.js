const router = require('express').Router();
const AuthRoutes = require('./auth');
const ProductRoutes = require('./product');

router.use('/auth', AuthRoutes);
router.use('/product', ProductRoutes);

module.exports = router;
