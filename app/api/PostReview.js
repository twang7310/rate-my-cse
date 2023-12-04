const pool = require('./db');

export default async (req, res) => {
  try {
    const { reviewer, rating_one, rating_two, rating_three, text, course_number, quarter, professor } = req.body;

    // Insert data into the database
    const insertQuery = 'INSERT INTO reviews (reviewer, rating_one, rating_two, rating_three, text, class_id, quarter, professor) VALUES (?, ?, ?, ?, ?, (SELECT class_id FROM courses WHERE number = ?), ?, ?)';
    const insertParams = [reviewer, rating_one, rating_two, rating_three, text, course_number, quarter, professor];
    
    const insertResult = await new Promise((resolve, reject) => {
      pool.query(insertQuery, insertParams, (err, results) => {
        if (err) {
          console.error('Error executing INSERT query:', err);
          reject(err);
        } else {
          resolve(results);
        }
      });
    });

    // Calculate the average ratings from all the reviews for the course
    const avgQuery = `
      SELECT 
          ROUND(AVG(rating_one), 1) AS avg_rating_one, 
          ROUND(AVG(rating_two), 1) AS avg_rating_two,
          ROUND(AVG(rating_three), 1) AS avg_rating_three
      FROM reviews 
      WHERE class_id = (SELECT class_id FROM courses WHERE number = ?)`;
    const avgParams = [course_number];

    const avgResult = await new Promise((resolve, reject) => {
      pool.query(avgQuery, avgParams, (err, results) => {
        if (err) {
          console.error('Error executing AVG query:', err);
          reject(err);
        } else {
          resolve(results);
        }
      });
    });

    const { avg_rating_one, avg_rating_two, avg_rating_three } = avgResult[0];

    const updateQuery = 'UPDATE courses SET rating_one = ?, rating_two = ?, rating_three = ? WHERE class_id = (SELECT class_id FROM courses WHERE number = ?)';
    const updateQueryParams = [avg_rating_one, avg_rating_two, avg_rating_three, course_number];

    // Execute the update query
    const updateResult = await new Promise((resolve, reject) => {
      pool.query(updateQuery, updateQueryParams, (err, results) => {
        if (err) {
          console.error('Error executing UPDATE query:', err);
          reject(err);
        } else {
          resolve(results);
        }
      });
    });

    // Send a single response
    res.json({ success: true, message: 'Data inserted, AVG calculated, and courses updated successfully', insertResult, avgResult, updateResult });
  } catch (error) {
    console.error('Unhandled error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};