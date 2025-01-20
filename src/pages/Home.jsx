import React from 'react';

function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 sm:px-8">
      <h1 className="text-3xl sm:text-5xl font-extrabold mb-4 sm:mb-6 drop-shadow-lg text-center">
        Welcome to VendoBuyo
      </h1>
      <p className="text-lg sm:text-2xl italic text-center max-w-2xl">
        Discover top-notch products from a variety of trusted sellers—all in one convenient place!
      </p>
    </div>
  );
}

export default Home;
