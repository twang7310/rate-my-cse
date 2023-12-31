const pool = require('./db');

// Takes in the first number of the class level
// and returns list of all classes in that level
// 3 -> 300-level classes
export default async (req, res) => {
  const classLevel = req.query.level;

  const query = 'SELECT * FROM courses WHERE number LIKE ?';
  const queryParams = [`${classLevel}__`];

  pool.query(query, queryParams, (err, results) => {
    if (err) {
      console.error('Error executing MySQL query:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.json(results);
    }
  });
};
