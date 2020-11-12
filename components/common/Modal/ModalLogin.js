import Modal from '.';
import LoginForm from '../Form/LoginForm';
import Image from '../Image';

const ModalLogin = ({ show, onHide, onSuccess }) => (
  <Modal show={show} className="modal-fullscreen">
    <div className="row mt-n3 d-flex justify-content-center">
      <div className="sticky-top text-left py-2 w-100 mb-5">
        <div className="container">
          <a onClick={() => onHide()}>
            <Image width={24} height={24} src="/images/icon-arrow-left-greyDark.png" />
          </a>
        </div>
      </div>
      <LoginForm onSuccess={onSuccess} />
    </div>
  </Modal>
)

export default ModalLogin;