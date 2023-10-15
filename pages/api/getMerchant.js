// /pages/api/getMerchant.js
import axios from 'axios';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).end();
  }

  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ message: 'Merchant ID is required.' });
  }

  try {
    const pasetoToken = req.headers.authorization

    if (!pasetoToken) {
      return res.status(401).json({ message: 'Authentication token is missing.' });
    }

    // Assuming you have an external service or database where you fetch the merchant details
    const response = await axios.get(`${BASE_URL}/manage/merchant?id=${id}`, {
      headers: {
        'Authorization': `Bearer ${pasetoToken}`
      }
    });

    if (response.data) {
      return res.status(200).json(response.data);
    } else {
      return res.status(404).json({ message: 'Merchant not found.' });
    }
  } catch (error) {
    console.error('Error fetching merchant:', error);
    return res.status(500).json({ message: 'Internal Server Error.' });
  }
}
