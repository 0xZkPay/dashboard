import { useState } from "react";
import Link from "next/link";
import {
  useNetworkMismatch,
  useNetwork,
  ChainId,
  ConnectWallet,
} from "@thirdweb-dev/react";
import { useRouter } from "next/router";

const navlinks = [
  { title: "Dashboard", path: "/dashboard" },
  { title: "Claim NFT", path: "/claim" },
];

const Navbar = () => {
  const [active, setActive] = useState(false);

  const [, switchNetwork] = useNetwork();
  const isMismatched = useNetworkMismatch();

  const router = useRouter();

  const handleClick = () => {
    setActive(!active);
  };

  return (
    <div className="z-50">
      <nav className="flex flex-row justify-between items-center flex-wrap pt-2 pl-6 pr-6 bg-transparent">
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
          <div className="lg:inline-flex lg:flex-row lg:ml-auto lg:w-auto w-full lg:items-center items-start -mt-8 lg:mt-4 flex flex-col lg:h-auto">
            {navlinks.map((item, index) => {
              return (
                <Link legacyBehavior key={index} href={item.path}>
                  <a
                    className={`mr-8 mt-2 lg:mt-0 lg:mr-4 text-lg font-bold lg:font-medium ${
                      router.pathname === item.path
                        ? "text-gray-600"
                        : "hover:text-gray-600 text-white"
                    }  `}
                  >
                    {item.title}
                  </a>
                </Link>
              );
            })}
            {isMismatched && (
              <button
                className="text-purple-400 mr-4"
                onClick={() => switchNetwork(ChainId.Polygon)}
              >
                Switch To Polygon
              </button>
            )}
            <div className="lg:mt-0 mt-4 lg:-ml-2 lg:ml-2 z-50 rounded-lg bg-white">
              <ConnectWallet />
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
