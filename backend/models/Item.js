const pool = require('../config/db');

class Item {
  static async create({ name, category }) {
    if (!name || !category) throw new Error('Name and category are required');
    
    const result = await pool.query(
      'INSERT INTO items (name, category) VALUES ($1, $2) RETURNING *',
      [name, category]
    );
    return result.rows[0];
  }

  static async findAll(search = '') {
    let query = 'SELECT * FROM items';
    const values = [];
    
    if (search) {
      query += ' WHERE name ILIKE $1 OR category ILIKE $1';
      values.push(`%${search}%`);
    }
    
    const result = await pool.query(query, values);
    return result.rows;
  }

  static async findById(id) {
    const result = await pool.query('SELECT * FROM items WHERE id = $1', [id]);
    return result.rows[0];
  }

  static async update(id, { name, category }) {
    if (!name || !category) throw new Error('Name and category are required');
    
    const result = await pool.query(
      'UPDATE items SET name = $1, category = $2 WHERE id = $3 RETURNING *',
      [name, category, id]
    );
    return result.rows[0];
  }

  static async delete(id) {
    const result = await pool.query(
      'DELETE FROM items WHERE id = $1 RETURNING *',
      [id]
    );
    return result.rows[0];
  }
}

module.exports = Item;