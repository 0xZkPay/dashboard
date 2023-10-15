// components/UserProfileCard.js
import { useState, useEffect } from 'react';
import axios from 'axios';

function UserProfileCard() {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [updatedUser, setUpdatedUser] = useState({});

  useEffect(() => {
    async function fetchUser() {
      try {
        const token = sessionStorage.getItem('pasetoToken');
        const { data } = await axios.get('/api/getUser', {
          headers: {
            'authorization': token
          }
        });
        setUser(data.payload.user);
        setUpdatedUser(data.payload.user);
      } catch (error) {
        console.error('Failed to fetch user:', error);
      }
    }

    fetchUser();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = async () => {
    try {
      const token = sessionStorage.getItem('pasetoToken');
      const updateData = {
        name: updatedUser.name,
        city: updatedUser.city
      };
      await axios.patch('/api/updateUser', updateData, {
        headers: {
          authorization: token
        }
      });
      setIsEditing(false);
      setUser(updatedUser);
    } catch (error) {
      console.error('Failed to update user:', error);
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-white shadow-md rounded-lg p-6 w-96">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">User Profile</h2>
        {!isEditing && (
          <button onClick={handleEditClick} className="text-blue-500 hover:underline">
            Edit
          </button>
        )}
      </div>

      <div className="space-y-4">
        {isEditing ? (
          <>
            <input
              name="name"
              value={updatedUser.name}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              placeholder="Name"
            />
            <input
              name="city"
              value={updatedUser.city}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              placeholder="City"
            />
            <div className="flex justify-end">
              <button onClick={handleSaveClick} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                Save
              </button>
            </div>
          </>
        ) : (
          <>
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>City:</strong> {user.city}</p>
            <p><strong>Address:</strong> {user.addr}</p>
          </>
        )}
      </div>
    </div>
  );
}

export default UserProfileCard;
