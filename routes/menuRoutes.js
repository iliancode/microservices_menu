const express = require('express');
const router = express.Router();
const controller = require('../controllers/menuController');
const { protect, authorize } = require('../middleware/auth');

router.get('/menu/:restaurant_id', controller.getAllMenus);
router.get('/menu/:restaurant_id/:item_id', controller.getOneMenu);
router.post('/menu/:restaurant_id', protect, authorize('admin', 'restaurant'), controller.createMenu);
router.put('/menu/:restaurant_id/:menu_id', protect, authorize('admin', 'restaurant'), controller.updateMenu);
router.delete('/menu/:id', protect, authorize('admin', 'restaurant'), controller.deleteMenu);

module.exports = router;
