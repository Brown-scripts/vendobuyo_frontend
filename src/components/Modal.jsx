import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';

const Modal = ({ isOpen, children }) => {
  if (!isOpen) return null;

  const modalRoot = typeof document !== 'undefined' ? document.getElementById('modal-root') : null;
  if (!modalRoot) return null;

  return ReactDOM.createPortal(
    <>
      {children}
    </>,
    modalRoot
  );
};

export default Modal;
