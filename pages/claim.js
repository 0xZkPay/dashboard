import React, { useState } from "react";
import { useAddress } from "@thirdweb-dev/react";

const API_URL = "https://platform.zkpay.in";

function Claim() {
  const address = useAddress();
  const [input, setInput] = useState("");
  const claimNFT = (address) => {
    fetch(API_URL + "/api/v1.0/delegateLoyaltyNFTCreation", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        creatorAddress: address,
        metadataUrl:
          "ipfs://bafkreian4o7xgn2r4rljjzfffgsu7iltokyvth64325756y75huezlqt44",
      }),
    })
      .then((response) => response.json())
      .then((response) => alert(JSON.stringify(response)));
  };

  if (!address) {
    return (
      <div className="flex justify-center text-white mt-8">
        Please connect your wallet to view dashboard
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center">
      <button
        className="hover:bg-gradient-to-r
            from-indigo-500 via-purple-500 to-indigo-500 mb-20
            animate-text bg-gradient-to-r from gray-500 via gray-400 to-gray-300 hover:text-indigo-500 mt-40
            from-indigo-500 hover:text-white via-purple-500 to-indigo-500 border-indigo-500 border-2 rounded-lg p-4 shadow-lg font-bold"
        onClick={() => claimNFT(address)}
      >
        Claim Loyalty NFT
      </button>

      <textarea
        className="resize rounded-md text-black h-8"
        onInput={(e) => setInput(e.target.value)}
        value={input}
        placeholder={"Enter tx hash to verify"}
      ></textarea>
    </div>
  );
}

export default Claim;
