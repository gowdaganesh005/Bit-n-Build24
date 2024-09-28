import React from "react";

const ButtonClick = () => {
  console.log("Button Clicked");
};

const Home = () => {
  return (
    <div className="relative items-center w-screen h-screen bg-black">
      {/* Spline iframe */}
      <iframe
        className="absolute w-screen h-screen top-1 left-0"
        src="https://my.spline.design/robotfollowcursorforlandingpage-368e9926666555d919c7a83361a7a50c/"
        
        allowFullScreen
        style={{ border: "none" }}
      />

      {/* Top Text */}
      <div className="absolute font-oswald top-5 w-full text-center text-3xl md:text-6xl bg-gradient-to-r from-purple-900 to-blue-200 bg-clip-text text-transparent">
        Experience The Power
      </div>

      <div className="absolute font-oswald left-20  top-20 w-20 text-left text-3xl md:text-6xl text-white">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti, atque?
      </div>

      {/* Register Button at the bottom */}
      <div className="absolute bottom-10 w-full flex justify-center">
        <button
          onClick={ButtonClick}
          className="bg-gradient-to-r
          from-purple-600 to-blue-400  text-black text-2xl font-oswald rounded-3xl px-8 py-3 hover:bg-gray-300"
          
        >
          Register Today
        </button>
      </div>
    </div>
  );
};

export default Home;
