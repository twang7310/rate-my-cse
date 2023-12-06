const pool = require('./db');

export default async (req, res) => {
  try {
    const { reviewer, rating_one, rating_two, rating_three, text, course_number, quarter, professor } = req.body;
    
    // Delete any existing review in that course
    const deleteQuery = `
    DELETE FROM reviews 
    WHERE
      reviewer = ? 
      AND class_id = (SELECT class_id FROM courses WHERE number = ?)
    `;
    const deleteParams = [reviewer, course_number];

    await new Promise((resolve, reject) => {
        pool.query(deleteQuery, deleteParams, (err, results) => {
            if (err && err.code === 'ER_BAD_FIELD_ERROR') {
              // Handling an error indicating the review doesn't exist but still considered successful deletion
              resolve({ message: 'Review does not exist, no action needed' });
            } else if (err) {
              reject(err); // Reject for other errors
            } else {
              resolve(results); // Resolve for successful deletion
            }
        });
    });
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

    // Update the rating columns in courses with the average of all the reviews
    const updateQuery = `
      UPDATE courses 
      SET rating_one = ?, rating_two = ?, rating_three = ?
      WHERE number = ?
      LIMIT 1`;
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