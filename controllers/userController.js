const pool = require('../db');

// CALL insert_user
const insertUser = async (req, res) => {
  const { name, email, age } = req.body;

  try {
    await pool.query('CALL insert_user($1, $2, $3)', [name, email, age]);
    res.status(201).json({ message: 'User inserted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error inserting user' });
  }
};

// CALL update_user
const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, email, age } = req.body;

  try {
    await pool.query('CALL update_user($1, $2, $3, $4)', [
      id,
      name,
      email,
      age,
    ]);
    res.status(200).json({ message: 'User updated successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error updating user' });
  }
};

// CALL delete_user
const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    await pool.query('CALL delete_user($1)', [id]);
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error deleting user' });
  }
};

module.exports = { insertUser, updateUser, deleteUser };
