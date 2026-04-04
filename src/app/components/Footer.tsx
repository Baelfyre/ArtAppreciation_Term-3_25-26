import React from "react";

export const Footer = () => {
  return (
    <footer className="border-t border-white/5 bg-[#020617] py-8 px-6 text-center">
      <div className="max-w-7xl mx-auto flex flex-col items-center justify-center">
        <p className="text-slate-500 text-sm font-light">
          Art Appreciation Project | <span className="text-slate-400">Mapping Filipino Cultural Presence Globally</span>
        </p>
        <p className="text-slate-600 text-xs mt-2">
          Interactive 3D Globe Interface &copy; {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
};
