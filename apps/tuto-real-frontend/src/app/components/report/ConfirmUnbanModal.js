import { Modal } from 'react-bootstrap';

import './report.css';

import COLORS from '../../constants/color';

const ConfirmUnbanModal = (props) => {
  const { show, onHide, onClickConfirmBtn, status, targetName } = props;

  const genConfigWithStatus = () => {
    switch (status) {
      case 'normal':
        return {
          title: 'Are you sure?',
          titleColor: COLORS.darkgray,
          body: '',
          closeBtnText: 'Cancel',
          closeBtnStyle: 'outline-gray-button',
        };
      case 'sending':
        return {
          title: 'Sending your ban request....',
          titleColor: COLORS.darkgray,
          body: 'Please wait a minite for sending request',
          closeBtnText: 'Sending',
          closeBtnStyle: 'outline-gray-button',
        };
      case 'success':
        return {
          title: 'Success',
          titleColor: COLORS.third,
          body: 'Succesfully unban' + targetName,
          closeBtnText: 'OK',
          closeBtnStyle: 'acknowledge-button',
        };
      case 'fail':
        return {
          title: 'Oop.. incomplete',
          titleColor: 'red',
          body: 'Something went wrong your request fail.',
          closeBtnText: 'OK',
          closeBtnStyle: 'acknowledge-button',
        };
      default:
        return {
          title: '...',
          titleColor: 'red',
          body: '......',
          closeBtnText: '.....',
          closeBtnStyle: 'acknowledge-button',
        };
    }
  };

  return (
    <Modal
      show={show}
      backdrop="static"
      onHide={onHide}
      keyboard={false}
      animation={false}
      centered
    >
      <Modal.Header closeButton>
        <p
          style={{
            fontSize: '24px',
            fontWeight: '500',
            color: genConfigWithStatus().titleColor,
          }}
        >
          {genConfigWithStatus().title}
        </p>
      </Modal.Header>

      <Modal.Body>
        <p>{genConfigWithStatus().body}</p>
        {status === 'normal' && (
          <p>
            If you click confirm button,{' '}
            <b className="text-highlight">{targetName}</b> will be banned ?
          </p>
        )}
      </Modal.Body>

      <Modal.Footer>
        {status === 'normal' && (
          <button className="ignore-button" onClick={onClickConfirmBtn}>
            Confirm & Unban
          </button>
        )}
        {status === 'sending' ? (
          <button className="outline-gray-button" style={{ opacity: '0.3' }}>
            Sending...
          </button>
        ) : (
          <button
            className={genConfigWithStatus().closeBtnStyle}
            onClick={onHide}
          >
            {genConfigWithStatus().closeBtnText}
          </button>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmUnbanModal;
