import React, { useContext } from 'react';
import { context } from '../App';

const Navbar = () => {
    const { darkMode, setDarkMode, setIsMenu, isMenu } = useContext(context);

    return (
        <nav
            className={`h-16 w-full border-b flex items-center px-3 sm:px-5 transition-colors duration-300 relative
            ${darkMode
                    ? "bg-[#111a2a] border-slate-700 text-white"
                    : "bg-white border-slate-200 text-slate-800"
                }`}
        >
            {/* Left side: Menu toggle */}
            <div className="flex items-center gap-3">
                <button
                    className="p-1 rounded-md hover:bg-slate-500/10 transition-colors text-lg md:hidden"
                    aria-label="Toggle Menu"
                    onClick={() => {
                        setIsMenu(!isMenu)
                        console.log(isMenu)
                    }} 
                >
                    ☰
                </button>
            </div>

            {/* Search Bar - Hidden on mobile, visible on sm screens and up */}
            <div
                className={`hidden sm:flex ml-3 md:ml-6 w-[200px] md:w-[280px] h-10 rounded-md items-center px-3 border
                ${darkMode
                        ? "bg-[#1c293d] border-slate-600"
                        : "bg-slate-100 border-slate-300"
                    }`}
            >
                {/* Search icon */}
                <svg
                    className={`w-4 h-4 mr-2 shrink-0 ${darkMode ? "text-slate-400" : "text-slate-500"}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m21 21-4.35-4.35m2.35-5.65a8 8 0 11-16 0 8 8 0 0116 0z"
                    />
                </svg>

                <input
                    type="text"
                    placeholder="Search campaigns..."
                    className={`w-full bg-transparent outline-none text-sm
                    ${darkMode
                            ? "text-white placeholder:text-slate-400"
                            : "text-slate-800 placeholder:text-slate-500"
                        }`}
                />
            </div>

            {/* Right side controls */}
            <div className="ml-auto flex items-center gap-3 sm:gap-5">

                {/* 🌙 / ☀️ Toggle */}
                <button
                    onClick={() => setDarkMode(!darkMode)}
                    className={`relative w-11 h-6 rounded-full transition-colors duration-300 shrink-0
                    ${darkMode ? "bg-slate-700" : "bg-slate-300"}`}
                    aria-label="Toggle Dark Mode"
                >
                    <span
                        className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow-md
                        flex items-center justify-center text-[10px]
                        transition-transform duration-300
                        ${darkMode ? "translate-x-1" : "translate-x-6"}`}
                    >
                        {darkMode ? "🌙" : "☀️"}
                    </span>
                </button>

                {/* Notification */}
                <button className="relative p-1" aria-label="Notifications">
                    🔔
                    <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full" />
                </button>

                {/* Profile */}
                <img
                    src="https://i.pravatar.cc/100?img=12"
                    alt="Profile"
                    className="w-8 h-8 rounded-full object-cover shrink-0"
                />

            </div>
        </nav>
    );
};

export default Navbar;