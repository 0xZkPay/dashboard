import "../styles/globals.css";
import Navbar from "../components/Navbar";
import { ThirdwebProvider } from "@thirdweb-dev/react";

import { ChainId } from "@thirdweb-dev/sdk";

const activeChainId = ChainId.Polygon;

function App({ Component, pageProps }) {
  return (
    <ThirdwebProvider desiredChainId={activeChainId}>
      <div className="bg-black lg:h-screen">
        <Navbar />
        <Component {...pageProps} />
      </div>
    </ThirdwebProvider>
  );
}

export default App;
