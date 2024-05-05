import React from "react";

export default function Loading({ placement }) {
  return (
    <div
      className={` ${
        placement === "center"
          ? ""
          : "relative flex flex-col items-center justify-center h-full top-20"
      }`}
    >
      <div className="w-16 h-16 flex items-center justify-center animate-spin">
        <svg
          className="w-12 h-12 text-blue-500"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 1V3M12 21V23M4.92929 4.92929L7.05025 7.05025M16.9497 16.9497L19.0707 19.0707M1 12H3M21 12H23M4.92929 19.0707L7.05025 16.9497M16.9497 7.05025L19.0707 4.92929"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <span className="text-blue-500 font-semibold text-lg">
        Loading
        <span className="text-3xl animate-blink">.</span>
        <span className="text-3xl animate-blink-delay">.</span>
        <span className="text-3xl animate-blink-delay2">.</span>
      </span>
    </div>
  );
}
