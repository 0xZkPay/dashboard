import { useState } from "react";
import Link from "next/link";
import {
  useNetworkMismatch,
  useNetwork,
  useAddress,
  ChainId,
  ConnectWallet,
} from "@thirdweb-dev/react";
import { useRouter } from "next/router";

const navlinks = [
  { title: "Dashboard", path: "/dashboard" },
  { title: "Claim NFT", path: "/claim" },
  { title: "Gallery", path: "/gallery" },
];

const Navbar = () => {
  const [active, setActive] = useState(false);

  const address = useAddress();

  const [, switchNetwork] = useNetwork();
  const isMismatched = useNetworkMismatch();

  const router = useRouter();

  const handleClick = () => {
    setActive(!active);
  };

  return (
    <div className="z-50">
      <nav className="flex flex-row justify-between items-center flex-wrap pt-2 pl-6 pr-6 bg-transparent">
        <Link href="/">
          <h1
            className="font-semibold 
            bg-gradient-to-r bg-clip-text text-transparent 
            from-indigo-500 via-purple-500 to-indigo-500
            animate-text text-4xl lg:ml-24"
          >
            ZkPay
          </h1>
        </Link>
        <button
          className="inline-flex p-3 rounded lg:hidden text-black ml-auto hover:text-black outline-none"
          onClick={handleClick}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="white"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
        <div
          className={`${
            active ? "" : "hidden"
          } w-full lg:inline-flex lg:flex-grow lg:w-auto`}
        >
          <div className="lg:inline-flex lg:flex-row lg:ml-auto lg:w-auto w-full lg:items-center items-start mt-2  flex flex-col lg:h-auto">
            {address &&
              navlinks.map((item, index) => {
                return (
                  <Link legacyBehavior key={index} href={item.path}>
                    <a
                      className={`mr-8 mt-2 lg:mt-0 lg:mr-16 text-lg font-bold lg:font-medium ${
                        router.pathname === item.path
                          ? "text-white"
                          : "hover:text-white text-gray-500"
                      }  `}
                    >
                      {item.title}
                    </a>
                  </Link>
                );
              })}
            {isMismatched && (
              <button
                className="text-purple-400 mr-12"
                onClick={() => switchNetwork(ChainId.Polygon)}
              >
                Switch To Polygon
              </button>
            )}
            <div className="lg:mt-0 mt-4 lg:mr-20 z-50 rounded-lg bg-white">
              <ConnectWallet />
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
