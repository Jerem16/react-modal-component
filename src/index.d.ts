import { ReactNode } from "react";

export interface ModalProps {
    isOpen: boolean;
    children: ReactNode;
    onClose: () => void;
    title: string;
    type: string;
}

declare function Modal(props: ModalProps): JSX.Element;

export default Modal;
