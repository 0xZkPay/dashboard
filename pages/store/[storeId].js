import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

const StoreDetails = () => {
  const [store, setStore] = useState(null);
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { storeId } = router.query;

  useEffect(() => {
    const fetchStoreDetails = async () => {
      const token = sessionStorage.getItem('pasetoToken');

      try {
        const response = await axios.get(`/api/getMerchant?id=${storeId}`, {
          headers: {
            authorization: token
          }
        });
        setStore(response.data.payload.merchants[0]);

        const paymentResponse = await axios.get(`/api/getPayments?id=${storeId}`, {
          headers: {
            authorization: token
          }
        });
        setPayments(paymentResponse.data.payload.payments);

        setLoading(false);
      } catch (error) {
        console.error('Error fetching the store details:', error);
        setLoading(false);
      }
    };

    if (storeId && typeof window !== "undefined" && sessionStorage.getItem('pasetoToken')) {
      fetchStoreDetails();
    }
  }, [storeId]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'success':
        return 'text-green-500';
      case 'cancelled':
        return 'text-red-500';
      case 'pending':
        return 'text-yellow-500';
      default:
        return 'text-gray-500';
    }
  };

  return (
    <div className="max-w-screen-xl mx-auto p-6 bg-gray-800">
      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-purple-500 border-b pb-2">{store.name}</h2>
          <p className="text-gray-600 mb-2">Type: {store.type}</p>
          <p className="text-gray-600 mb-2">Domain: {store.domain}</p>
          <p className="text-gray-500 mb-2">Payout Address: {store.payout_addr}</p>
          <p className="text-gray-500 mb-4">API Key: {store.api_key}</p>
          <h3 className="text-xl font-medium mb-4 text-purple-500 border-b pb-2">Payments</h3>
          <ul>
            {payments.map((payment, index) => (
              <li key={index} className="text-gray-600 mb-2">
                Product: {payment.product_name} ({payment.product_id}) <br />
                Amount: {payment.amount / 1e9} SOL <br />
                Receiving Address: {payment.receiving_addr} <br />
                Status: <span className={getStatusColor(payment.status)}>{payment.status}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default StoreDetails;
