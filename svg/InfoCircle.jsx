import React from "react";

const InfoCircle = ({ className = "" }) => {
    return (
        <div className={`attr-icon ${className}`}>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 540 540"
                fill="#fff"
            >
                <path d="M342.9 385.7h-17.1V239.1c0-18.9-15.4-34.3-35.1-37.7-1.7-.9-3.4-.9-6-.9h-88.3c-24 0-42.9 17.1-42.9 38.6 0 21.4 18.9 38.6 42.9 38.6h42.9l.9 108h-42.9c-24 0-42.9 17.1-42.9 38.6 0 21.4 18.9 38.6 42.9 38.6H343c24 0 42.9-17.1 42.9-38.6-.2-21.4-19-38.6-43-38.6zm-77.2-219.4c33.4 0 60-26.7 60-60s-26.6-60-60-60-60 26.7-60 60 26.6 60 60 60z" />
            </svg>
        </div>
    );
};

export default React.memo(InfoCircle);
