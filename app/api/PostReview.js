const pool = require('./db');

export default async (req, res) => {
  // Extract data from the request body
  const {reviewer, rating_one, rating_two, rating_three, text, course_number, quarter, professor} = req.body;
  
  // SQL query to insert data into the database
  const query = 'INSERT INTO reviews (reviewer, rating_one, rating_two, rating_three, text, class_id, quarter, professor) VALUES (?, ?, ?, ?, ?, (SELECT class_id FROM courses WHERE number = ?), ?, ?)';
  const queryParams = [reviewer, rating_one, rating_two, rating_three, text, course_number, quarter, professor];
  
  // Execute the query
  await pool.query(query, queryParams, (err, results) => {
    if (err) {
      console.error('Error executing MySQL query:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.json({ success: true, message: 'Data inserted successfully' });
    }
  });

  // SQL query to calculate the average ratings from all the reviews for the course
  const avgQuery = `
    SELECT 
      AVG(rating_one) AS avg_rating_one, 
      AVG(rating_two) AS avg_rating_two,
      AVG(rating_three) AS avg_rating_three,
    FROM reviews 
    WHERE class_id = (SELECT class_id FROM courses WHERE number = ?)`;
  const avgParams = [course_number];
  let avgResult;

  // Execute the average query  
  try {
    avgResult = await pool.query(avgQuery, avgParams);
    res.json({ success: true, message: 'Averages calculated successfully' });
  } catch (avgError) {
    console.error('Error executing AVG query:', avgError);
    res.status(500).json({ error: 'Error calculating averages' });
    return; // Exit the function early to avoid sending the success response
  }

  // Extract the average rating_one value from the result
  const { avg_rating_one, avg_rating_two, avg_rating_three } = avgResult[0];

  // SQL query to update the ratings for the course
  const updateQuery = 'UPDATE courses SET rating_one = ?, rating_two = ?, rating_three = ? WHERE class_id = ?';
  const updateQueryParams = [avg_rating_one, avg_rating_two, avg_rating_three, course_number];

  // Execute the update query
  await pool.query(updateQuery, updateQueryParams, (err, results) => {
    if (err) {
      console.error('Error executing UPDATE query:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.json({ success: true, message: 'Course ratings updated successfully' });
    }
  });
};
