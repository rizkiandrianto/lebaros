import { createPortal } from 'react-dom';

export default function Modal({ className, children, show, onHide }) {
  return createPortal(
    <div className={`modal ${show ? 'show' : ''} ${className}`}>
      <div className="modal-container container">
        {children}
      </div>
      <div className="modal-overlay" onClick={onHide} />
    </div>
  , document.body);
}

Modal.defaultProps = {
  className: ''
}
