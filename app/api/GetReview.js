const pool = require('./db');

// Make sure the passed in num is a string
// To use: call fetch(`api/GetCourseReviews?num=${classNumber}')
export default async (req, res) => {
  const classNumber = req.query.num;
  const reviewer = req.query.user;

  const query = 'SELECT * FROM reviews WHERE class_id = (SELECT class_id FROM courses WHERE number = ?) AND reviewer = ?';
  const queryParams = [`${classNumber}`, reviewer];

  pool.query(query, queryParams, (err, results) => {
    if (err) {
      console.error('Error executing MySQL query:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.json(results);
    }
  });
};
