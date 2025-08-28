import React, { useEffect, useRef } from "react";
import "./react-modal-component.css";
import SearchClose from "./svg/SearchClose";
import CheckCircle from "./svg/CheckCircle";
import InfoCircle from "./svg/InfoCircle";
import ErrorIcon from "./svg/ErrorIcon";

const Modal = ({ isOpen, onClose, title, children, type }) => {
    const modalRef = useRef(null);
    const closeButtonRef = useRef(null);
    const previousActiveElement = useRef(null);

    useEffect(() => {
        if (isOpen) {
            previousActiveElement.current = document.activeElement;
            closeButtonRef.current?.focus();

            const handleKeyDown = (e) => {
                if (e.key === "Escape") {
                    onClose();
                } else if (e.key === "Tab") {
                    const focusableElements =
                        modalRef.current?.querySelectorAll(
                            "button, a, input, select, textarea, [tabindex]:not([tabindex='-1'])"
                        );
                    if (focusableElements && focusableElements.length) {
                        const firstElement = focusableElements[0];
                        const lastElement = focusableElements[focusableElements.length - 1];
                        if (e.shiftKey && document.activeElement === firstElement) {
                            lastElement.focus();
                            e.preventDefault();
                        } else if (!e.shiftKey && document.activeElement === lastElement) {
                            firstElement.focus();
                            e.preventDefault();
                        }
                    }
                }
            };

            document.addEventListener("keydown", handleKeyDown);
            return () => {
                document.removeEventListener("keydown", handleKeyDown);
                if (previousActiveElement.current) previousActiveElement.current.focus();
            };
        }
    }, [isOpen, onClose]);

    const getIcon = () => {
        switch (type) {
            case "info":
                return <InfoCircle className="modal-icon info" />;
            case "success":
                return <CheckCircle className="modal-icon success" />;
            case "error":
                return <ErrorIcon className="modal-icon error" />;
            default:
                return null;
        }
    };

    if (!isOpen) return null;

    return (
        <div
            className={`modal-overlay ${isOpen ? "show" : ""}`}
            onClick={onClose}
            role="presentation"
            tabIndex={-1}
            aria-hidden={isOpen ? "false" : "true"}
        >
            <dialog
                className={`modal-content ${type}`}
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
                ref={modalRef}
                open={isOpen}
                onClick={(e) => e.stopPropagation()}
                onKeyDown={(e) => {
                    if (e.key === "Escape") onClose();
                }}
                tabIndex={-1}
            >
                <button
                    ref={closeButtonRef}
                    className="modal-close"
                    onClick={onClose}
                    aria-label="Fermer la boîte de dialogue"
                >
                    <SearchClose className="close-icon" />
                </button>

                <div className="modal-inner_content">
                    <div className="modal-header">
                        <h2 id="modal-title" className="modal-title">
                            {getIcon()} {title}
                        </h2>
                    </div>
                    <div className="modal-body">
                        <div id="modal-description">{children}</div>
                    </div>
                </div>
            </dialog>
        </div>
    );
};

export default Modal;
