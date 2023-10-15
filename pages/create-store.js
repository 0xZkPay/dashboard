import { useState } from 'react';
import axios from 'axios';
import { useWallet } from '@solana/wallet-adapter-react';

function CreateMerchant() {
  const { publicKey, connected } = useWallet();
  const [merchant, setMerchant] = useState({ name: '', type: '', domain: '' });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMerchant((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (typeof window !== "undefined" && connected) {
        const pasetoToken = sessionStorage.getItem('pasetoToken');
        const response = await axios.post('/api/createMerchant', {
          ...merchant,
          payout_address: publicKey?.toBase58()
        }, {
          headers: {
            authorization: pasetoToken
          }
        });

        setMessage(response.data.message);
      }
    } catch (error) {
      console.error('Failed to create merchant:', error);
      setMessage('Error creating merchant. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center lg:h-full h-screen">
      <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 w-96">
        <h2 className="text-xl font-medium mb-4 text-purple-500">Create Store</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-600 mb-2" htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={merchant.name}
              onChange={handleInputChange}
              className="w-full p-2 bg-gray-100 rounded text-gray-700"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-600 mb-2" htmlFor="type">Type</label>
            <input
              type="text"
              id="type"
              name="type"
              value={merchant.type}
              onChange={handleInputChange}
              className="w-full p-2 bg-gray-100 rounded text-gray-700"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-600 mb-2" htmlFor="domain">Domain</label>
            <input
              type="text"
              id="domain"
              name="domain"
              value={merchant.domain}
              onChange={handleInputChange}
              className="w-full p-2 bg-gray-100 rounded text-gray-700"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-purple-500 text-white p-2 rounded hover:bg-purple-600"
            disabled={loading}
          >
            {loading ? 'Creating...' : 'Create'}
          </button>
        </form>
        {message && <p className="mt-4 text-purple-300">{message}</p>}
      </div>
    </div>
  );
}

export default CreateMerchant;
