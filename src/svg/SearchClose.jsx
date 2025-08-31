import * as React from "react";

const SearchClose = ({ className = "" }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 18 18"
            className={`close-search ${className}`}
        >
            
            <g
                fill="none"
                stroke="#fff"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <path d="M12.6 12.6L5.4 5.4" />
                <path d="M5.4 12.6l7.2-7.2" />
            </g>
        </svg>
    );
};

export default React.memo(SearchClose);
