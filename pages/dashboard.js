import React from "react";
import data from "../api.json";

export default function Dashboard() {
  const DisplayData = data.record.getDashboardData.txs.map((info) => {
    return (
      <tr key={info.zkAddress} className="text-white">
        <td>{info.zkAddress}</td>
        <td>{info.Amount}</td>
        <td>{info.timestamp}</td>
      </tr>
    );
  });

  return (
    <div>
      <div
        className="flex flex-row justify-center mt-24 mb-4 text-3xl font-semibold 
            bg-gradient-to-r bg-clip-text  text-transparent 
            from-indigo-500 via-purple-500 to-indigo-500
            animate-text
            "
      >
        Transactions
      </div>
      <div className="flex flex-col flex-grow items-center">
        <div className="flex justify-center h-20 overflow-y-auto w-80">
          <table class="table table-striped">
            <thead>
              <tr className="text-white">
                <th>zkAddress</th>
                <th>Amount</th>
                <th>timestamp</th>
              </tr>
            </thead>
            <tbody>{DisplayData}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
