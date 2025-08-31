import React, { useEffect, useRef, useCallback, useMemo } from "react";
import "./react-modal-component.css";
import SearchClose from "./svg/SearchClose";
import CheckCircle from "./svg/CheckCircle";
import InfoCircle from "./svg/InfoCircle";
import ErrorIcon from "./svg/ErrorIcon";
import WarningIcon from "./svg/WarningIcon";

const FOCUS_SELECTOR =
    "button, a, input, select, textarea, [tabindex]:not([tabindex='-1'])";

/** Utilitaires focus */
const getFocusable = (container) =>
    container
        ? Array.from(container.querySelectorAll(FOCUS_SELECTOR)).filter(
              (el) => !el.hasAttribute("disabled") && el.tabIndex !== -1
          )
        : [];

const focusFirst = (container) => {
    const first = getFocusable(container)[0];
    if (first && first instanceof HTMLElement) first.focus();
};

const Modal = ({
    isOpen,
    onClose,
    title,
    children,
    type,
    closeOnEsc = true,
    closeOnOverlayClick = true,
    hideCloseButton = false,
}) => {
    const modalRef = useRef(null);
    const closeButtonRef = useRef(null);
    const previousActiveElement = useRef(null);

    /** Map d'icônes pour réduire le branching */
    const ICONS = useMemo(
        () => ({
            info: <InfoCircle className="modal-icon info" />,
            success: <CheckCircle className="modal-icon success" />,
            error: <ErrorIcon className="modal-icon error" />,
            warning: <WarningIcon className="modal-icon warning" />, // ⬅️ ICI
        }),
        []
    );

    const icon = ICONS[type] ?? null;

    /** Gestion Tab + Escape (focus trap + fermeture ESC) */
    const handleKeyDown = useCallback(
        (e) => {
            if (!isOpen) return;

            if (e.key === "Escape") {
                if (closeOnEsc) onClose();
                return;
            }

            if (e.key !== "Tab") return;

            const focusables = getFocusable(modalRef.current);
            if (focusables.length === 0) return;

            const first = focusables[0];
            const last = focusables[focusables.length - 1];

            // Cycle du focus
            if (e.shiftKey && document.activeElement === first) {
                last.focus();
                e.preventDefault();
            } else if (!e.shiftKey && document.activeElement === last) {
                first.focus();
                e.preventDefault();
            }
        },
        [isOpen, closeOnEsc, onClose]
    );

    useEffect(() => {
        if (!isOpen) return;

        // Mémoriser l'élément actif et focus initial
        previousActiveElement.current = document.activeElement;

        // Focus initial : bouton Fermer si présent, sinon premier focusable
        if (!hideCloseButton && closeButtonRef.current) {
            closeButtonRef.current.focus();
        } else {
            focusFirst(modalRef.current);
        }

        document.addEventListener("keydown", handleKeyDown);
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
            // Restaure le focus précédent
            if (previousActiveElement.current instanceof HTMLElement) {
                previousActiveElement.current.focus();
            }
        };
    }, [isOpen, hideCloseButton, handleKeyDown]);

    if (!isOpen) return null;

    return (
        <div
            className={`modal-overlay show`}
            onClick={(e) => {
                // Fermer uniquement si on clique réellement l’overlay (pas un enfant)
                if (closeOnOverlayClick && e.target === e.currentTarget)
                    onClose();
            }}
        >
            <dialog
                className={`modal-content ${type ?? ""}`}
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
                aria-modal="true"
                open={isOpen}
                ref={modalRef}
                // Stop propagation pour éviter que le clic remonte à l’overlay
                onClick={(e) => e.stopPropagation()}
                tabIndex={-1}
            >
                {!hideCloseButton && (
                    <button
                        ref={closeButtonRef}
                        className="modal-close"
                        onClick={onClose}
                        aria-label="Fermer la boîte de dialogue"
                    >
                        <SearchClose className="close-icon" />
                    </button>
                )}

                <div className="modal-inner_content">
                    <div className="modal-header">
                        <h2 id="modal-title" className="modal-title">
                            {icon} {title}
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
