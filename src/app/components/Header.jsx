import React, { useState, useEffect } from "react";
import { LuMoon, LuSun } from "react-icons/lu";

const Header = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);
  return (
    <div className="w-full h-18 flex items-center justify-end z-50 backdrop-blur-sm">
      <h1 className=" text-3xl mr-4 font-bold sm:text-4xl md:text-4xl lg:text-5xl lg:mr-10">
        e-Tymology
      </h1>
      <button
        onClick={() => setIsDarkMode(!isDarkMode)}
        className="mr-5 rounded-2xl border-2 p-2 bg-zinc-800 text-white hover:bg-zinc-700 transition"
        title="Toggle Dark Mode"
      >
        {isDarkMode ? <LuMoon size={30} /> : <LuSun size={30} />}
      </button>
    </div>
  );
};

export default Header;
