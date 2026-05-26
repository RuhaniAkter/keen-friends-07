import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react"; // মোবাইল মেনু আইকনের জন্য লারাবেল বা রিঅ্যাক্ট স্ট্যান্ডার্ড lucide-react ব্যবহার করা হলো

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const activeClass =
    "flex items-center gap-2 bg-green-900 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 w-full md:w-auto";
  const normalClass =
    "flex items-center gap-2 text-gray-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-100 transition-all duration-200 w-full md:w-auto";

  return (
    <nav className="bg-white border-b border-gray-200 px-6 py-3 relative z-50">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        {/* Logo — "Keen" bold, "Keeper" normal */}
        <div className="text-gray-900 text-base">
          <span className="font-bold">Keen</span>
          <span className="font-normal text-[#244D3F]">Keeper</span>
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 focus:outline-none"
        >
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </button>

        <div className="hidden md:flex items-center gap-2">
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? activeClass : normalClass)}
          >
            🏠 Home
          </NavLink>
          <NavLink
            to="/timeline"
            className={({ isActive }) => (isActive ? activeClass : normalClass)}
          >
            🕐 Timeline
          </NavLink>
          <NavLink
            to="/stats"
            className={({ isActive }) => (isActive ? activeClass : normalClass)}
          >
            📈 Stats
          </NavLink>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white border-b border-gray-200 px-6 py-4 flex flex-col gap-2 shadow-lg animate-fadeIn">
          <NavLink
            to="/"
            onClick={() => setIsOpen(false)} // ক্লিক করলে মেনু অটো বন্ধ হয়ে যাবে
            className={({ isActive }) => (isActive ? activeClass : normalClass)}
          >
            🏠 Home
          </NavLink>
          <NavLink
            to="/timeline"
            onClick={() => setIsOpen(false)}
            className={({ isActive }) => (isActive ? activeClass : normalClass)}
          >
            🕐 Timeline
          </NavLink>
          <NavLink
            to="/stats"
            onClick={() => setIsOpen(false)}
            className={({ isActive }) => (isActive ? activeClass : normalClass)}
          >
            📈 Stats
          </NavLink>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
