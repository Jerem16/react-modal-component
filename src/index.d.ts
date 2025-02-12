declare module "react-modal-component-by-jeremy" {
    import { ReactNode } from "react";
  
    export interface ModalProps {
      isOpen: boolean;
      onClose: () => void;
      title: string;
      children: ReactNode;
      type?: "success" | "error" | "info";
    }
  
    const Modal: React.FC<ModalProps>;
    export default Modal;
  }
  