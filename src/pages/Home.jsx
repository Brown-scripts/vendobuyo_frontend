import React from 'react';

function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-blue-500 to-purple-600 text-white">
      <h1 className="text-5xl font-extrabold mb-6 drop-shadow-lg">
        Welcome to VendoBuyo
      </h1>
      <p className="text-2xl italic">
        Discover top-notch products from a variety of trusted sellers—all in one convenient place!
      </p>
    </div>
  );
}

export default Home;
