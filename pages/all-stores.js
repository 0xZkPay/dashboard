import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import axios from 'axios';
import { useWallet } from '@solana/wallet-adapter-react';

const AllStores = () => {
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);
  const { connected } = useWallet();

  useEffect(() => {
    const fetchStores = async () => {
      const token = sessionStorage.getItem('pasetoToken');

      try {
        const response = await axios.get('/api/getMerchants', {
          headers: {
            authorization: token
          }
        });
        setStores(response.data.payload.merchants);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching the stores:', error);
        setLoading(false);
      }
    };

    if (typeof window !== "undefined" && connected && sessionStorage.getItem('pasetoToken')) {
        fetchStores();
    }
  }, [connected]);

  return (
    <div className="max-w-screen-xl mx-auto p-6">
      
      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stores.map((store) => (
            <div key={store.id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
              <Link href={`/store/${store.id}`} className="text-purple-600 hover:text-purple-700">
                
                  <h2 className="text-xl font-medium mb-2">{store.name}</h2>
                  <p className="text-gray-500 mb-1">{store.type}</p>
                  <p className="text-gray-400">{store.domain}</p>
                
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllStores;
