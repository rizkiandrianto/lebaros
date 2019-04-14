export default function Modal({ className, children, show, onHide }) {
  return (
    <div className={`modal ${show ? 'show' : ''} ${className}`}>
      <div className="modal-container container">
        {children}
      </div>
      <div className="modal-overlay" onClick={onHide} />
    </div>
  );
}
