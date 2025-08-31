import * as React from "react";

const InfoCircle = ({ className = "" }) => {
    return (
        <div className={`attr-icon ${className}`}>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 18 18"
                width="18"
                height="18"
                fill="#fff"
            >
                <path d="M10.5 11.7h-.4v-3c0-.4-.3-.7-.7-.8h-.1-1.8c-.5 0-.9.3-.9.8 0 .4.4.8.9.8h.9v2.3h-.9c-.5 0-.9.4-.9.8s.4.8.9.8h3c.5 0 .9-.4.9-.8 0-.5-.4-.9-.9-.9zM8.9 7.2c.7 0 1.3-.6 1.3-1.3s-.6-1.3-1.3-1.3-1.3.6-1.3 1.3.6 1.3 1.3 1.3z" />
            </svg>
        </div>
    );
};

export default React.memo(InfoCircle);
