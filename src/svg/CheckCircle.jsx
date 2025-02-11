import React from "react";

const CheckCircle = ({ className = "" }) => {
  return (
    <div className={`attr-icon ${className}`}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 14 10"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="icon"
      >
        <path
          d="M0.984375 4.40707L5.22075 8.24002L12.4226 1"
          stroke="#fff"
          // stroke="#000"
          strokeWidth="1.5"
        />
      </svg>
    </div>
  );
};

export default React.memo(CheckCircle);
