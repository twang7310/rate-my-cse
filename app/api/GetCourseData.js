const pool = require('./db');


export default async (req, res) => {
  const classNumber = req.query.num;

  const query = 'SELECT * FROM courses WHERE number = ?';
  const queryParams = [`${classNumber}__`];

  pool.query(query, queryParams, (err, results) => {
    if (err) {
      console.error('Error executing MySQL query:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.json(results);
    }
  });
};
