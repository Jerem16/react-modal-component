import * as React from "react";

const CheckCircle = ({ className = "" }) => {
    return (
        <div className={`attr-icon ${className}`}>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 18 18"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="icon"
            >
                <path
                    d="M5.4,8.9l2.7,2.4l4.5-4.6"
                    stroke="#fff"
                    strokeWidth="1.5"
                />
            </svg>
        </div>
    );
};

export default React.memo(CheckCircle);
