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

  const deleteResult = await new Promise((resolve, reject) => {
    pool.query(deleteQuery, deleteParams, (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
    });
  });

  const avgQuery = `
      SELECT 
          ROUND(AVG(rating_one), 1) AS avg_rating_one, 
          ROUND(AVG(rating_two), 1) AS avg_rating_two,
          ROUND(AVG(rating_three), 1) AS avg_rating_three
      FROM reviews 
      WHERE class_id = (SELECT class_id FROM courses WHERE number = ?)`;
    const avgParams = [classNumber];

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
    const updateQueryParams = [avg_rating_one, avg_rating_two, avg_rating_three, classNumber];

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
    res.json({ success: true, message: 'Deleted review and updated averages successfully', deleteResult, avgResult, updateResult });
};