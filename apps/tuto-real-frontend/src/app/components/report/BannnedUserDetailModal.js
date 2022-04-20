import { useState } from 'react';
import { Modal } from 'react-bootstrap';
import {
  IoIosArrowDropleftCircle,
  IoIosArrowDroprightCircle,
} from 'react-icons/io';

import ImageModal from '../modal/ImageModal';

const BannnedUserDetailModal = (props) => {
  const { show, reportList, onUnban, onClose } = props;

  const [idx, setIdx] = useState(0);
  const [isImageModalShow, setIsImageModalShow] = useState(false);

  const goPrev = () => {
    if (idx - 1 >= 0) setIdx(idx - 1);
  };

  const goRight = () => {
    if (idx + 1 < reportList.length) setIdx(idx + 1);
  };

  return (
    <Modal
      className="report-detail-modal"
      show={show}
      backdrop="static"
      onHide={onClose}
      keyboard={false}
      animation={false}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <div className="flex-column" style={{ gap: '9px' }}>
          <div className="reporting-name flex-row gap5">
            <p>Banned User:</p>
            <p style={{ color: 'red' }}>
              {reportList[0]?.targetId
                ? `${reportList[0]?.targetId.firstName} ${reportList[0]?.targetId.lastName}`
                : ''}
            </p>
          </div>
          <p id="id-text">{`[ user id: ${reportList[0]?.targetId?._id} ]`}</p>
        </div>
      </Modal.Header>

      <Modal.Body>
        <div className="flex-column" style={{ gap: '15px' }}>
          <div className="flex-column gap5">
            <p style={{ fontSize: '16px' }}>REPORT DETAILS</p>
            <p id="id-text">{`[ report id: ${reportList[idx]?._id} ]`}</p>
          </div>
          <div className="image-zone flex-row">
            <IoIosArrowDropleftCircle
              className={idx > 0 ? 'arrow-icon' : 'disable-arrow'}
              size={36}
              onClick={goPrev}
            />
            <img
              alt="ReportDetail"
              src={reportList[idx]?.imageUrl}
              onClick={() => setIsImageModalShow(true)}
            />
            <IoIosArrowDroprightCircle
              className={
                idx < reportList.length - 1 ? 'arrow-icon' : 'disable-arrow'
              }
              size={36}
              onClick={goRight}
            />
            {isImageModalShow && (
              <ImageModal
                imgURL={reportList[idx]?.imageUrl}
                onHide={() => setIsImageModalShow(false)}
              />
            )}
          </div>
          <div className="report-text-container">
            <p>{reportList[idx]?.text}</p>
          </div>
        </div>
      </Modal.Body>

      <Modal.Footer>
        <button className="ignore-button" onClick={onUnban}>
          Unban
        </button>
        <button className="outline-gray-button" onClick={onClose}>
          Close
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default BannnedUserDetailModal;
