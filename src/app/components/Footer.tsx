import React from "react";

export const Footer = () => {
  return (
    <footer className="px-6 pb-10 pt-4 text-center">
      <div className="glass-panel relative mx-auto flex max-w-7xl flex-col items-center justify-center rounded-[1.75rem] px-6 py-8">
        <div className="flag-accent absolute inset-x-0 top-0 h-px" />
        <p className="text-sm font-light text-slate-400">
          Art Appreciation Project | <span className="text-slate-200">Mapping Filipino Cultural Presence Globally</span>
        </p>
        <p className="mt-2 text-xs text-slate-500">
          Interactive 3D Globe Interface &copy; {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
};
