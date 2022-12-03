import "../styles/globals.css";
import Navbar from "../components/Navbar";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import { useState, useEffect } from "react";

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
      <div className="bg-black h-screen">
        <Navbar />
        <Component {...pageProps} />
      </div>
    </ThirdwebProvider>
  );
}

export default App;
