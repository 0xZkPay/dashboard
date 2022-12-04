import { useAddress } from "@thirdweb-dev/react";
import { useQuery, gql } from "@apollo/client";
import { useState } from "react";

const GET_LOYALTY_NFTs = gql`
  {
    loyaltyNFTCreateds {
      id
      tokenID
      creator
      metaDataUri
      blockNumber
      blockTimestamp
      transactionHash
    }
  }
`;

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
    .then((response) => console.log(JSON.stringify(response)));
};

export default function Claim() {
  const address = useAddress();

  const [NFTs, setNFTs] = useState([]);

  const { loading, error, data } = useQuery(GET_LOYALTY_NFTs);

  console.log(data);

  return (
    <div>
      <button onClick={() => claimNFT(address)}>Click</button>
      {data &&
        data.loyaltyNFTCreateds.map((nft, i) => (
          <div
            key={i}
            className="flex flex-col border shadow rounded-xl overflow-hidden mb-4 ml-48 mr-48"
          >
            <img
              style={{ height: "20rem", width: "100%" }}
              src={
                "https://nftstorage.link/ipfs/" +
                "bafybeifl3slw66xtpb3r5wv4gtrz52quwd3rq6xu3m4aalnhr6idoorkry"
              }
            />
            <div className="p-4">
              <a
                href={
                  `https://testnets.opensea.io/assets/mumbai/0x19064239b6592f01dec4ec6c9e5976136d51c33b/` +
                  `${i + 1}`
                }
                target="_blank"
                rel="noreferrer"
              >
                <p
                  style={{ height: "64px" }}
                  className="text-xl text-white font-semibold overflow-hidden"
                >
                  {`ZkPay Loyalty NFT #${nft.id}`}
                </p>
              </a>

              <div style={{ height: "70px", overflow: "visible" }}>
                <p className="text-gray-400">{nft.creator}</p>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}
