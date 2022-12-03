export default function Home() {
  return (
    <div className="bg-black flex flex-col items-center">
      <div
        className="flex mt-24 text-8xl font-semibold 
            text-white ml-48 mr-48 lg:w-2/4 mb-10
            "
      >
        VPN For Payments
      </div>
      <div
        className="flex mt-4 text-2xl font-semibold 
            text-gray-500 ml-32 lg:w-2/4 mb-28
            "
      >
        Zero Knowledge Payment Gateway for a Privacy Focused Future
      </div>

      <a
        className="mb-24"
        href="http://localhost:3001"
        target="_blank"
        rel="noreferrer"
      >
        <button
          className="hover:bg-gradient-to-r
            from-indigo-500 via-purple-500 to-indigo-500
            animate-text bg-gradient-to-r from gray-500 via gray-400 to-gray-300
            text-white border-indigo-500 border-2 rounded-lg p-4 shadow-lg font-bold"
        >
          View Marketplace
        </button>
      </a>

      <div className="flex justify-center mb-20">
        <img className="w-40 lg:w-80" src="/locker.svg" alt="bob logo" />
        <div
          className="flex mt-32 text-5xl font-semibold 
            text-white mr-80 ml-4 w-8
            "
        >
          Anonymous payments
        </div>
      </div>

      <div className="flex mb-20">
        <div
          className="flex mt-24 text-l font-semibold 
            text-white mr-4 mb-24
            "
        >
          Powered by
        </div>
        <img className="w-12" src="/BOB.svg" alt="bob logo" />
      </div>
    </div>
  );
}
