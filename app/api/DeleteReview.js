const pool = require('./db');

// Endpoint to delete a review
export default async (req, res) => {
  const { reviewer, classNumber } = req.query;

  const deleteQuery = `
    DELETE FROM reviews 
    WHERE
      reviewer = ? 
      AND class_id = (SELECT class_id FROM courses WHERE number = ?)
  `;
  const deleteParams = [reviewer, classNumber];

  pool.query(deleteQuery, deleteParams, (err, results) => {
    if (err) {
      console.error('Error executing MySQL query:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.json({ message: 'Review deleted successfully' });
    }
  });
};