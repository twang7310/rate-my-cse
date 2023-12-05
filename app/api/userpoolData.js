export default function handler(req, res) {
    const envKeys = {
      user_pool: process.env.USER_POOL,
      client_id: process.env.CLIENT_ID,
    };
  
    res.status(200).json(envKeys);
  }