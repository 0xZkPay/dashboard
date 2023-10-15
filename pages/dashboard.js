import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

function Dashboard() {
  const [user, setUser] = useState(null);
  const [merchants, setMerchants] = useState([]);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [storeOpen, setStoreOpen] = useState(false);
  const [payments, setPayments] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const pasetoToken = sessionStorage.getItem('pasetoToken');
        const { data } = await axios.get('/api/getUser', {
          headers: {
            authorization: pasetoToken
          }
        });
        setUser(data.payload.user);
      } catch (error) {
        console.error('Failed to fetch user details:', error);
      }
    };

    const fetchMerchants = async () => {
      try {
        const pasetoToken = sessionStorage.getItem('pasetoToken');
        const { data } = await axios.get('/api/getMerchants', {
          headers: {
            'authorization': pasetoToken
          }
        });
        setMerchants(data.payload.merchants);
      } catch (error) {
        console.error('Failed to fetch merchants:', error);
      }
    };

    const fetchPayments = async () => {
      try {
        const pasetoToken = sessionStorage.getItem('pasetoToken');
        const { data } = await axios.get('/api/getPayments', {
          headers: {
            authorization: pasetoToken
          }
        });
        setPayments(data.payload.payments);
      } catch (error) {
        console.error('Failed to fetch payments:', error);
      }
    };

    fetchUser();
    fetchMerchants();
    fetchPayments();
  }, []);

  return (
    <div className="flex h-screen relative overflow-hidden justify-center">
      <main className=" p-4  lg:ml-1/5 lg:pl-1/5 ">
        <section className="mt-1 mb-6">
          <h2 className="text-2xl font-semibold mb-4 lg:ml-16 text-purple-300">Payments</h2>
          <ul>
            {payments.map(payment => (
              <li key={payment.receiving_addr} className="mb-4 p-4 bg-gray-800 shadow rounded text-purple-300">
                <h3 className="text-xl font-medium">{payment.product_name}</h3>
                <p>Receiving Address: {payment.receiving_addr}</p>
                <p>Amount: {payment.amount}</p>
                <p>Status: {payment.status}</p>
                <p>Product ID: {payment.product_id}</p>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
}

export default Dashboard;
