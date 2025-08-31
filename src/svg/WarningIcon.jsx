import * as React from "react";

const WarningIcon = ({ className = "" }) => {
    return (
        <div className={`attr-icon ${className}`}>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 18 18"
                width="18"
                height="18"
                fill="#fff"
            >
                <path d="M9 13.3c.5 0 .8-.3.8-.8s-.3-.8-.8-.8-.8.3-.8.8.4.8.8.8zm0-2.9c.5 0 .8-.3.8-.7V5.5c0-.5-.3-.8-.8-.8s-.8.4-.8.8v4.1c0 .5.4.8.8.8z" />
            </svg>
        </div>
    );
};

export default React.memo(WarningIcon);
