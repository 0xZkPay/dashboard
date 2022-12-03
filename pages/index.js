export default function Home() {
  return (
    <div className="bg-black flex flex-col items-center">
      <div
        className="flex mt-24 text-6xl font-semibold 
            text-white ml-48 mr-48 mb-40
            "
      >
        Make seamless payments with BOB stablecoin and the zkBob dApp!
      </div>

      <a href="http://localhost:3001">
        <button
          className="hover:bg-gradient-to-r
            from-indigo-500 via-purple-500 to-indigo-500
            animate-text bg-gradient-to-r from gray-500 via gray-400 to-gray-300 hover:text-indigo-500
            from-indigo-500 hover:text-white via-purple-500 to-indigo-500 border-indigo-500 border-2 rounded-lg p-4 shadow-lg font-bold"
        >
          View Marketplace
        </button>
      </a>
    </div>
  );
}
