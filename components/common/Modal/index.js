export default function Modal({ children, show, onHide }) {
  return (
    <div className={`modal ${show ? 'show' : ''}`}>
      <div className="modal-container container">
        {children}
      </div>
      <div className="modal-overlay" onClick={onHide} />
    </div>
  );
}
