import * as React from "react";

const WarningIcon = ({ className = "" }) => {
    return (
        <div className={`attr-icon`}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18">
                <path
                    d="M7.2 2.3L.3 13.8C-.5 15.2.5 17 2.1 17h13.8c1.6 0 2.6-1.8 1.8-3.2L10.8 2.3a2.07 2.07 0 0 0-3.6 0z"
                    fill="#ffc107"
                />
                <path
                    d="M9 10.6c-.4 0-.8-.3-.8-.8V5.7c0-.4.3-.8.8-.8s.8.3.8.8v4.2c0 .4-.3.7-.8.7zm0 3.2c-.4 0-.8-.3-.8-.8s.3-.8.8-.8.8.3.8.8h0c0 .5-.3.8-.8.8z"
                    fill="#fff"
                />
            </svg>
        </div>
    );
};

export default React.memo(WarningIcon);
