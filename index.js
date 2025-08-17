const express = require('express');
const bodyParser = require('body-parser');
const pool = require('./db');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

/**
 * Create Table - Run this once
 */
app.get('/init', async (req, res) => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        age INT
      );
    `);
    res.send('✅ users table created');
  } catch (err) {
    console.error(err.message);
    res.status(500).send('❌ Failed to create table');
  }
});

/**
 * Create a new user
 */
app.post('/users', async (req, res) => {
  const { name, email, age } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO users (name, email, age) VALUES ($1, $2, $3) RETURNING *',
      [name, email, age]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('❌ Failed to create user');
  }
});

/**
 * Get all users
 */
app.get('/users', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM users');
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('❌ Failed to fetch users');
  }
});

/**
 * Get a single user by ID
 */
app.get('/users/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).send('🔍 User not found');
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('❌ Failed to fetch user');
  }
});

/**
 * Update a user
 */
app.put('/users/:id', async (req, res) => {
  const { id } = req.params;
  const { name, email, age } = req.body;
  try {
    const result = await pool.query(
      'UPDATE users SET name = $1, email = $2, age = $3 WHERE id = $4 RETURNING *',
      [name, email, age, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).send('🔍 User not found');
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('❌ Failed to update user');
  }
});

/**
 * Delete a user
 */
app.delete('/users/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM users WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) {
      return res.status(404).send('🔍 User not found');
    }
    res.send(`🗑️ User ${id} deleted`);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('❌ Failed to delete user');
  }
});

/**
 * Start the server
 */
app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});
