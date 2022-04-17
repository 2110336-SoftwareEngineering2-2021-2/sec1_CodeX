import { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import ImageModal from '../modal/ImageModal';

const ReportDetailModal = (props) => {
  const {
    onHide,
    reportId,
    reportingName,
    reportingId,
    reporterName,
    reporterId,
    createdAt,
    status,
    text,
    imageURL,
    onClickBanBtn,
    onClickIgnoreBtn,
  } = props;

  const [banDuration, setBanDuration] = useState(0);
  const [isGoingToBan, setIsGoingToBan] = useState(false);
  const [isImageModalShow, setIsImageModalShow] = useState(false);

  return (
    <Modal
      className="report-detail-modal"
      show={true}
      backdrop="static"
      onHide={onHide}
      keyboard={false}
      animation={false}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <div className="flex-column" style={{ gap: '9px' }}>
          <div className="flex-column">
            <div className="reporting-name flex-row gap5">
              <p>Reporting</p>
              <p style={{ color: 'red' }}>{reportingName}</p>
            </div>
            <p id="id-text">[ reporting user id: {reportingId} ]</p>
          </div>
          <div className="flex-column">
            <div className="reporter-name flex-row gap5">
              <p style={{ fontWeight: '600' }}>from</p>
              <p>{reporterName}</p>
            </div>
            <p id="id-text">[ reporter id: {reporterId} ]</p>
          </div>
        </div>
      </Modal.Header>
      <Modal.Body>
        <div className="flex-column" style={{ gap: '15px' }}>
          <div className="flex-row gap5" style={{ alignItems: 'center' }}>
            <p style={{ fontSize: '16px' }}>REPORT DETAILS</p>
            <p id="id-text">[ report id: {reportId} ]</p>
          </div>
          <div className="image-zone">
            <img src={imageURL} onClick={() => setIsImageModalShow(true)} />
            {isImageModalShow && (
              <ImageModal
                imgURL={imageURL}
                onHide={() => setIsImageModalShow(false)}
              />
            )}
          </div>
          <div className="report-text-container">
            <p>{text}</p>
          </div>
        </div>
      </Modal.Body>
      {isGoingToBan && (
        <div className="flex-column duration-zone">
          <div
            className="flex-row"
            style={{ alignItems: 'center', gap: '5px' }}
          >
            <p>BAN DURATION (HOURS)</p>
            {banDuration > 0 ? null : (
              <p style={{ color: 'red' }}>*(require)</p>
            )}
          </div>
          <Form.Control
            className="form-control-regis"
            type="number"
            placeholder="0"
            onChange={(e) => setBanDuration(e.target.value)}
          />
        </div>
      )}
      <Modal.Footer>
        {isGoingToBan ? (
          <>
            {banDuration > 0 ? (
              <button
                className="ban-button"
                onClick={() => onClickBanBtn(banDuration)}
              >
                Ban
              </button>
            ) : null}
            <button
              className="outline-gray-button"
              onClick={() => {
                setIsGoingToBan(false), setBanDuration(0);
              }}
            >
              Cancel
            </button>
          </>
        ) : (
          <>
            <button
              className="ignore-button"
              onClick={() => onClickIgnoreBtn()}
            >
              Ignore & Delete
            </button>
            <button
              className="ban-button"
              onClick={() => setIsGoingToBan(true)}
            >
              Ban
            </button>
            <button className="outline-gray-button" onClick={onHide}>
              Close
            </button>
          </>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default ReportDetailModal;
