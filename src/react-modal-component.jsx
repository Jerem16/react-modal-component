import React, { useEffect, useRef } from "react";
import "./react-modal-component.css"; // Importation des styles CSS
import SearchClose from "./svg/SearchClose"; // Icône de fermeture
import CheckCircle from "./svg/CheckCircle"; // Icône de succès
import InfoCircle from "./svg/InfoCircle"; // Icône d'information
import ErrorIcon from "./svg/ErrorIcon"; // Icône d'erreur

/**
 * Composant Modal affichant une boîte de dialogue avec prise en charge de l'accessibilité.
 *
 * @param {Object} props - Les propriétés du composant.
 * @param {boolean} props.isOpen - Indique si la modal est ouverte ou non.
 * @param {Function} props.onClose - Fonction appelée pour fermer la modal.
 * @param {string} props.title - Le titre affiché dans la modal.
 * @param {React.ReactNode} props.children - Le contenu de la modal.
 * @param {"info"|"success"|"error"} [props.type] - Le type de modal pour afficher une icône spécifique.
 * @returns {JSX.Element|null} - Le composant Modal ou null si isOpen est false.
 */
const Modal = ({ isOpen, onClose, title, children, type }) => {
    const modalRef = useRef(null);
    const closeButtonRef = useRef(null);
    // Stocke l'élément actif avant l'ouverture de la modal
    const previousActiveElement = useRef(null);

    useEffect(() => {
        if (isOpen) {
            // Sauvegarde l'élément actif avant l'ouverture
            previousActiveElement.current = document.activeElement;
            // Déplace le focus sur le bouton de fermeture
            closeButtonRef.current?.focus();

            // Gestion des touches clavier pour l'accessibilité
            const handleKeyDown = (e) => {
                if (e.key === "Escape") {
                    // Ferme la modal si l'utilisateur appuie sur "Échap"
                    onClose();
                } else if (e.key === "Tab") {
                    // Récupère tous les éléments interactifs dans la modal
                    const focusableElements =
                        modalRef.current?.querySelectorAll(
                            "button, a, input, select, textarea, [tabindex]:not([tabindex='-1'])"
                        );

                    if (focusableElements) {
                        const firstElement = focusableElements[0]; // Premier élément interactif
                        const lastElement =
                            focusableElements[focusableElements.length - 1]; // Dernier élément interactif

                        if (
                            e.shiftKey &&
                            document.activeElement === firstElement
                        ) {
                            // Si Shift+Tab est pressé sur le premier élément, on focus le dernier
                            lastElement.focus();
                            e.preventDefault();
                        } else if (
                            !e.shiftKey &&
                            document.activeElement === lastElement
                        ) {
                            // Si Tab est pressé sur le dernier élément, on focus le premier
                            firstElement.focus();
                            e.preventDefault();
                        }
                    }
                }
            };

            // Ajout de l'écouteur d'événement sur le document
            document.addEventListener("keydown", handleKeyDown);

            return () => {
                // Nettoyage : suppression de l'écouteur et restauration du focus précédent
                document.removeEventListener("keydown", handleKeyDown);
                if (previousActiveElement.current) {
                    previousActiveElement.current.focus();
                }
            };
        }
    }, [isOpen, onClose]);

    /**
     * Retourne l'icône correspondant au type de la modal.
     *
     * @returns {JSX.Element|null} L'élément d'icône ou null si aucun type n'est défini.
     */
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

    // Si la modal est fermée, ne retourne rien (évite un rendu inutile)
    if (!isOpen) return null;

    return (
        // Overlay de la modal (arrière-plan semi-transparent)
        <div
            className={`modal-overlay ${isOpen ? "show" : ""}`}
            onClick={onClose} // Ferme la modal si on clique sur l'overlay
            role="presentation"
            tabIndex={-1}
            aria-hidden={isOpen ? "false" : "true"}
        >
            {/* Élément de la boîte de dialogue modale */}
            <dialog
                className={`modal-content ${type}`}
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
                ref={modalRef}
                open={isOpen}
                onClick={(e) => e.stopPropagation()} // Empêche la fermeture si on clique sur la modal elle-même
                onKeyDown={(e) => {
                    if (e.key === "Escape") {
                        onClose();
                    }
                }}
                tabIndex={-1}
            >
                {/* Bouton de fermeture de la modal */}
                <button
                    ref={closeButtonRef}
                    className="modal-close"
                    onClick={onClose}
                    aria-label="Fermer la boîte de dialogue"
                >
                    <SearchClose className="close-icon" />
                </button>

                {/* Contenu interne de la modal */}
                <div className="modal-inner_content">
                    {/* En-tête contenant le titre et l'icône */}
                    <div className="modal-header">
                        <h2 id="modal-title" className="modal-title">
                            {getIcon()}{" "}
                            {/* Affichage de l'icône selon le type */}
                            {title}
                        </h2>
                    </div>

                    {/* Corps de la modal avec le contenu passé en children */}
                    <div className="modal-body">
                        <div id="modal-description">{children}</div>
                    </div>
                </div>
            </dialog>
        </div>
    );
};

export default Modal;
