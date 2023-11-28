const pool = require('./db');

export default async (req, res) => {
  // Extract data from the request body
  const {reviewer, rating_one, rating_two, rating_three, text, course_number} = req.body;
  
  // SQL query to insert data into the database
  const query = 'INSERT INTO reviews (reviewer, rating_one, rating_two, rating_three, text, course_number) VALUES (?, ?, ?, ?, ?, ?)';
  const queryParams = [reviewer, rating_one, rating_two, rating_three, text, course_number];
  
  // Execute the query
  pool.query(query, queryParams, (err, results) => {
    if (err) {
      console.error('Error executing MySQL query:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.json({ success: true, message: 'Data inserted successfully' });
    }
  });
};
