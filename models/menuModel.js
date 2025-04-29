const pool = require('../config/db');

const getAllMenus = async () => {
  const [rows] = await pool.query('SELECT * FROM menu_items');
  return rows;
}

const getMenuByRestaurant = async (restaurantId) => {
  const [rows] = await pool.query('SELECT * FROM menu_items WHERE restaurant_id = ?', [restaurantId]);
  return rows;
};

const getMenuItem = async (restaurantId, itemId) => {
  const [rows] = await pool.query('SELECT * FROM menu_items WHERE restaurant_id = ? AND id = ?', [restaurantId, itemId]);
  return rows[0];
};

const createMenuItem = async (restaurantId, { name, description, price, available }) => {
  const [result] = await pool.query(
    'INSERT INTO menu_items (restaurant_id, name, description, price, available) VALUES (?, ?, ?, ?, ?)',
    [restaurantId, name, description, price, available ?? 1]
  );
  return result.insertId;
};

const updateMenuItem = async (restaurantId, itemId, { name, description, price, available }) => {
  await pool.query(
    'UPDATE menu_items SET name = ?, description = ?, price = ?, available = ? WHERE restaurant_id = ? AND id = ?',
    [name, description, price, available, restaurantId, itemId]
  );
};

const deleteMenuItem = async (id) => {
  await pool.query('DELETE FROM menu_items WHERE id = ?', [id]);
};

module.exports = {
  getAllMenus,
  getMenuByRestaurant,
  getMenuItem,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem
};
