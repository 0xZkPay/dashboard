import { useState, useEffect } from 'react';
import axios from 'axios';
import { useGlobalContext } from '../contexts/GlobalContext';
import { useWallet } from '@solana/wallet-adapter-react';

function EditUser() {
  const { updateUser, fetchUserDetails } = useGlobalContext(); // Get the updateUser function from the context
  const [user, setUser] = useState({ name: '', location: '' });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const { connected } = useWallet();

  useEffect(() => {
    // Fetch the current user details here if needed
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      
      if (typeof window !== "undefined" && connected) {
      const pasetoToken = sessionStorage.getItem('pasetoToken');
      const response = await axios.patch('/api/updateUser', user, {
        headers: {
          authorization: pasetoToken
        }
      });

      setMessage('User updated successfully!');
      fetchUserDetails(pasetoToken);
    }
    } catch (error) {
      console.error('Failed to update user:', error);
      setMessage('Error updating user. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center lg:h-full h-screen">
      <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 w-96">
        <h2 className="text-xl font-medium mb-4 text-purple-500">Edit User</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-600 mb-2" htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={user.name}
              onChange={handleInputChange}
              className="w-full p-2 bg-gray-100 rounded text-gray-700"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-600 mb-2" htmlFor="city">Location</label>
            <input
              type="text"
              id="city"
              name="city"
              value={user.city}
              onChange={handleInputChange}
              className="w-full p-2 bg-gray-100 rounded text-gray-700"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-purple-500 text-white p-2 rounded hover:bg-purple-600"
            disabled={loading}
          >
            {loading ? 'Updating...' : 'Update'}
          </button>
        </form>
        {message && <p className="mt-4 text-purple-300">{message}</p>}
      </div>
    </div>
  );
}

export default EditUser;
