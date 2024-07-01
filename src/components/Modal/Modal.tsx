import styles from './Modal.module.scss'
import React from "react";
import close from "../../icons/close-icon.svg"

interface ModalProps{
  isOpen: boolean,
  onClose: VoidFunction
  children: React.ReactNode
}

function Modal({ isOpen, onClose, children }: ModalProps) {

  if (!isOpen) return null;

  return (
    <div className={styles.modal}>
      <div className={styles.modal_content}>
        <span className={styles.close} onClick={onClose}><img src={close} alt='close icon'/></span>
        {children}
      </div>
    </div>
  );
}


export default Modal
