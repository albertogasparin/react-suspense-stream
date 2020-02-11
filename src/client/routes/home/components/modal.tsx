import React from 'react';

import { ModalOverlay } from './modal-overlay';

type ModalProps = {
  open: boolean;
  onClose?: (ev: any) => any;
};
const Modal = ({ open, onClose = () => null }: ModalProps) => {
  const style = {
    background: '#FFF',
    padding: '2rem',
    width: '200px',
  };
  return (
    <ModalOverlay open={open}>
      {open && (
        <div style={style}>
          <h3>Modal</h3>
          <button onClick={onClose}>Close</button>
        </div>
      )}
    </ModalOverlay>
  );
};

export default Modal;
