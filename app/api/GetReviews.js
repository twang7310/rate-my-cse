const pool = require('./db');

// Make sure the passed in num is a string
// To use: call fetch(`api/GetCourseData?num=${classNumber}')
export default async (req, res) => {
  const classNumber = req.query.num;

  const query = 'SELECT * FROM reviews WHERE number = ?';
  const queryParams = [`${classNumber}`];

  pool.query(query, queryParams, (err, results) => {
    if (err) {
      console.error('Error executing MySQL query:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.json(results);
    }
  });
};
