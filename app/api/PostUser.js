const pool = require('./db');

export default async (req, res) => {
  const user = req.query.name;

  const query = 'INSERT INTO users (username) VALUES (?)';
  const queryParams = [`${user}`];

  pool.query(query, queryParams, (err, results) => {
    if (err) {
      console.error('Error executing MySQL query:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.json(results);
    }
  });
};
