import * as React from "react";


const ErrorIcon = ({ className = "" }) => {
    return (
        <div className={className}>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 18 18"
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
        </div>
    );
};

export default React.memo(ErrorIcon);
