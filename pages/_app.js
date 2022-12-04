import "../styles/globals.css";
import Navbar from "../components/Navbar";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import { useState, useEffect } from "react";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: "https://api.thegraph.com/subgraphs/name/0xzkpay/zkpay-mumbai",
});

import { ChainId } from "@thirdweb-dev/sdk";

const activeChainId = ChainId.Polygon;

function App({ Component, pageProps }) {
  const [apiKey, setApiKey] = useState("");

  const API_URL = "http://localhost:9081";

  useEffect(() => {
    if (
      localStorage.getItem("api_key") === null ||
      localStorage.getItem("api_key") === undefined
    ) {
      fetch(API_URL + "/getKey", {
        method: "GET",
        mode: "cors",
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      })
        .then((res) => res.json())
        .then((json) => {
          localStorage.setItem("api_key", json.Key._id);
        });
    }
  }, [apiKey]);

  return (
    <ThirdwebProvider desiredChainId={activeChainId}>
      <ApolloProvider client={client}>
        <div className="bg-black lg:h-screen">
          <Navbar />
          <Component {...pageProps} />
        </div>
      </ApolloProvider>
    </ThirdwebProvider>
  );
}

export default App;
