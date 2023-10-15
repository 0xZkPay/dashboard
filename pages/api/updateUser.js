import axios from 'axios';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export default async function handler(req, res) {
  if (req.method === 'PATCH') {
    try {
      const response = await axios.patch(`${BASE_URL}/manage/user`, req.body, {
        headers: {
          'Authorization': `Bearer ${req.headers.authorization}`
        }
      });
      res.status(200).json(response.data);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update user' });
    }
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
