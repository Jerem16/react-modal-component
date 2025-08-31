// src/index.d.ts
import { ReactNode } from "react";

export interface ModalProps {
    isOpen: boolean;
    children: ReactNode;
    onClose: () => void;
    title: string;
    type: string;
    closeOnEsc?: boolean;
    closeOnOverlayClick?: boolean;
    hideCloseButton?: boolean;
}

declare function Modal(props: ModalProps): JSX.Element;
export default Modal;
