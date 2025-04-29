const menuModel = require('../models/menuModel');

const getAllMenus = async (req, res) => {
  try {
    console.log('Fetching all menus for restaurant:', req.params.restaurant_id);
    const menus = await menuModel.getMenuByRestaurant(req.params.restaurant_id);
    res.json(menus);
  } catch (err) {
    res.status(500).json({ err});
  }
};

const getOneMenu = async (req, res) => {
  try {
    const menu = await menuModel.getMenuItem(req.params.restaurant_id, req.params.item_id);
    if (!menu) return res.status(404).json({ message: 'Menu item not found' });
    res.json(menu);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const createMenu = async (req, res) => {
  try {
    const id = await menuModel.createMenuItem(req.params.restaurant_id, req.body);
    const menu = await menuModel.getMenuItem(req.params.restaurant_id, id);
    res.status(201).json(menu);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateMenu = async (req, res) => {
  try {
    await menuModel.updateMenuItem(req.params.restaurant_id, req.params.menu_id, req.body);
    const updated = await menuModel.getMenuItem(req.params.restaurant_id, req.params.menu_id);
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteMenu = async (req, res) => {
  try {
    await menuModel.deleteMenuItem(req.params.id);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getAllMenus,
  getOneMenu,
  createMenu,
  updateMenu,
  deleteMenu
};
