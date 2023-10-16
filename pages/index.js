export default function Home() {
  return (
    <div className="bg-black flex flex-col items-center min-h-screen py-10">
      <div className="text-8xl font-semibold text-white text-center max-w-2xl mt-24 mb-10">
        VPN For Payments
      </div>
      <div className="text-2xl font-semibold text-gray-500 text-center max-w-xl mt-4 mb-28">
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

      <div className="flex flex-col md:flex-row justify-center items-center mb-20">
        <img className="w-40 lg:w-80 mb-8 md:mb-0" src="/locker.svg" alt="locker logo" />
        <div className="text-5xl font-semibold text-white ml-4 text-center">
          Anonymous payments
        </div>
      </div>

      <div className="flex items-center mb-20">
        <div className="text-xl font-semibold text-white mr-4">
          Powered by Elusive
        </div>
        <img className="w-12" src="/BOB.svg" alt="bob logo" />
        
      </div>
    </div>
  );
}
