import axios from 'axios';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export default async function handler(req, res) {
    if (req.method === 'GET') {
      try {
        const response = await axios.get(`${BASE_URL}/manage/payments?id=${req.query.id}`, {
          headers: {
            'Authorization': `Bearer ${req.headers.authorization}`
          }
        });
        res.status(200).json(response.data);
      } catch (error) {
        const errorMessage = error.response?.data?.error || "An unknown error occurred";
        res.status(500).json({ error: errorMessage });
      }
    } else {
      res.status(405).end(); // Method Not Allowed
    }
  }