import React, { useEffect, useState } from "react";
import { useAddress } from "@thirdweb-dev/react";

export default function Dashboard() {
  const address = useAddress();

  const [data, setData] = useState({ transactions: [] });
  const [input, setInput] = useState("");

  const API_URL = "http://localhost:9081";

  const GetData = () => {
    fetch(API_URL + `/getDashboardData/${localStorage.getItem("api_key")}`)
      .then((res) => res.json())
      .then((json) => {
        setData(json);
      });
    //
  };

  const withDrawFunds = () => {
    fetch(
      API_URL + `/withdrawAmountTo/${input}/${localStorage.getItem("api_key")}`
    )
      .then((res) => res.json())
      .then((json) => {
        alert(json.message);
      });
  };

  const DisplayData = data.transactions.map((transaction) => {
    return (
      <tr key={transaction.zkAddress} className="text-white">
        <td>{transaction.zkAddress}</td>
        <td>{Number(transaction.amount) / 1000000000} BOB</td>
        <td>{transaction.timestamp}</td>
      </tr>
    );
  });

  if (!address) {
    return (
      <div className="flex justify-center text-white mt-8">
        Please connect your wallet to view dashboard
      </div>
    );
  }

  return (
    <div>
      <div
        className="flex flex-row justify-center mt-24 mb-8 text-3xl font-semibold 
            bg-gradient-to-r bg-clip-text  text-transparent 
            from-gray-500 via-gray-400 to-gray-300
            
            "
      >
        Transactions
      </div>
      <button onClick={GetData}>Refresh</button>
      <div className="flex flex-col flex-grow items-center">
        <div className="flex justify-center h-40 overflow-y-auto mb-8">
          <table className="table table-auto border border-white border-separate border-spacing-x-8 border-spacing-y-4 rounded-md">
            <thead>
              <tr className="text-white">
                <th>zkAddress</th>
                <th>Amount</th>
                <th>timestamp</th>
              </tr>
            </thead>
            <tbody>{data !== null && data !== undefined && DisplayData}</tbody>
          </table>
        </div>
      </div>
      <div
        className="text-3xl font-semibold overflow-hidden
            bg-gradient-to-r bg-clip-text  text-transparent 
            from-gray-500 via-gray-400 to-gray-300 flex flex-col items-center"
      >
        Balance: {Number(data.balance) / 1000000000}
        <button
          className="hover:bg-gradient-to-r
            from-indigo-500 via-purple-500 to-indigo-500
            animate-text bg-gradient-to-r from gray-500 via gray-400 to-gray-300
            text-white border-indigo-500 border-2 rounded-lg p-4 shadow-lg font-bold mt-4"
          onClick={() => withDrawFunds(input)}
        >
          Withdraw
        </button>
        <div className="overflow-hidden resize-x mt-4">
          <textarea
            className="resize rounded-md text-black h-8"
            onInput={(e) => setInput(e.target.value)}
            value={input}
            placeholder={"Enter ZK address"}
          ></textarea>
        </div>
      </div>
    </div>
  );
}
