import { useEffect, useState } from 'react';
import { Modal, Tabs, Tab, Button } from 'react-bootstrap';
import {
  IoIosArrowDropleftCircle,
  IoIosArrowDroprightCircle,
} from 'react-icons/io';
import { RiShareForwardFill } from 'react-icons/ri';
import { IoMegaphoneOutline } from 'react-icons/io5';
import './ViewingSlotModal.css';

import { DESK } from '../../constants/image';
import COLORS from '../../constants/color';

const ViewingSlotModal = (props) => {
  const {
    cancelFunc,
    day,
    info,
    firstName,
    lastName,
    fromLearnSchedule,
    redirectToTutor,
    onReportStudent,
  } = props;

  const [tabValue, setTabValue] = useState('Information');
  const [newInfo, setNewInfo] = useState([]);
  const [infoIdx, setInfoIdx] = useState(0);

  const time = info[infoIdx].slot;
  const subject = info[infoIdx].subject;
  const description = info[infoIdx].description;
  const studentList =
    (fromLearnSchedule ? info[infoIdx].members : info[infoIdx].students) ?? [];
  const showFirstName = fromLearnSchedule
    ? info[infoIdx]?.tutorFirstName
    : firstName;
  const showLastName = fromLearnSchedule
    ? info[infoIdx]?.tutorLastName
    : lastName;

  const checkInfo = () => {
    let tempData = [];
    studentList.map((student) => {
      if (fromLearnSchedule || student.status === 'Approved') {
        tempData = [...tempData, student];
      }
    });
    setNewInfo(tempData);
  };

  useEffect(() => {
    checkInfo();
  }, []);

  const haveMultipleData = () => {
    if (fromLearnSchedule && info.length > 1) return true;
    return false;
  };

  const goNext = () => {
    // console.log('going right...');
    if (infoIdx + 1 < info.length) setInfoIdx(infoIdx + 1);
  };

  const goPrev = () => {
    // console.log('going left...');
    if (infoIdx > 0) setInfoIdx(infoIdx - 1);
  };

  const onGoToTutor = () => {
    cancelFunc();
    redirectToTutor(info[infoIdx]?.tutorId);
  };

  // render section //
  const renderHeader = () => {
    return (
      <Modal.Header
        className={haveMultipleData() ? 'multiDataHeader' : 'singleDataHeader'}
        closeButton
      >
        {haveMultipleData() ? (
          // Have Multiple Data in 1 Slot //
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
            }}
          >
            {/* Left Arrow */}
            <IoIosArrowDropleftCircle
              className={infoIdx > 0 ? 'arrow-icon' : 'disable-arrow'}
              size={36}
              onClick={goPrev}
            />

            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                margin: '0% 5%',
              }}
            >
              <Modal.Title
                className="request-header"
                style={{ fontWeight: '600' }}
              >
                {`${day}, ${time + 8}.00 - ${time + 9}.00`}
              </Modal.Title>
              <Modal.Title
                className="request-header"
                style={{ fontWeight: '500', fontSize: '16px' }}
              >
                {`${showFirstName} ${showLastName} `}
                {redirectToTutor ? (
                  <RiShareForwardFill
                    size={20}
                    color={COLORS.third}
                    style={{ cursor: 'pointer' }}
                    onClick={onGoToTutor}
                  />
                ) : null}
              </Modal.Title>
            </div>

            {/* Right Arrow */}
            <IoIosArrowDroprightCircle
              className={
                infoIdx < info.length - 1 ? 'arrow-icon' : 'disable-arrow'
              }
              size={36}
              style={{ marginRight: '2%' }}
              onClick={goNext}
            />
          </div>
        ) : (
          <div>
            <Modal.Title
              className="request-header"
              style={{ fontWeight: '600' }}
            >
              {`${day}, ${time + 8}.00 - ${time + 9}.00`}
            </Modal.Title>
            <Modal.Title
              className="request-header"
              style={{ fontWeight: '500', fontSize: '16px' }}
            >
              {`${showFirstName} ${showLastName} `}
              {redirectToTutor ? (
                <RiShareForwardFill
                  size={20}
                  color={COLORS.third}
                  style={{ cursor: 'pointer' }}
                  onClick={onGoToTutor}
                />
              ) : null}
            </Modal.Title>
          </div>
        )}
      </Modal.Header>
    );
  };

  const InfoSection = (
    <>
      {/* Subject part */}
      <Modal.Body style={{ borderBottom: '1px solid #dee2e6' }}>
        <Modal.Title
          className="request-header"
          style={{ fontWeight: '500', fontSize: '16px' }}
        >
          SUBJECT
        </Modal.Title>
        <Modal.Title
          className="request-header"
          style={{
            fontWeight: '400',
            fontSize: '16px',
            paddingLeft: '1rem',
          }}
        >
          {subject}
        </Modal.Title>
      </Modal.Body>

      {/* Description part */}
      <Modal.Body style={{ borderBottom: '1px solid #dee2e6' }}>
        <Modal.Title
          className="request-header"
          style={{ fontWeight: '500', fontSize: '16px' }}
        >
          DESCRIPTION
        </Modal.Title>
        <Modal.Title
          className="request-header"
          style={{
            fontWeight: '400',
            fontSize: '16px',
            paddingLeft: '1rem',
          }}
        >
          {description}
        </Modal.Title>
      </Modal.Body>

      {/* Zoom part (Only for learn schedule) */}
      {fromLearnSchedule && info[infoIdx]?.zoomURL ? (
        <Modal.Body>
          <Modal.Title
            className="request-header"
            style={{ fontWeight: '500', fontSize: '16px' }}
          >
            ZOOM LINK
          </Modal.Title>
          <Modal.Title
            className="request-header"
            style={{
              fontWeight: '400',
              fontSize: '16px',
              paddingLeft: '1rem',
            }}
          >
            <a href={info[infoIdx]?.zoomURL} target="_blank">
              {info[infoIdx]?.zoomURL}
            </a>
          </Modal.Title>
        </Modal.Body>
      ) : null}

      {/* button part */}
      <Modal.Footer>
        <Button id="cancel-button" variant="outline-dark" onClick={cancelFunc}>
          Cancel
        </Button>
      </Modal.Footer>
    </>
  );

  const MemberSection = (
    <>
      {/* studentList part */}
      <Modal.Body>
        {newInfo.length > 0 ? (
          newInfo.map((student, i) => (
            <div key={student.id} style={{ display: 'flex' }}>
              <Modal.Title
                className="request-header"
                style={{
                  fontWeight: '400',
                  fontSize: '16px',
                  marginRight: '2%',
                }}
              >
                {` · ${student.firstName} ${student.lastName}`}
              </Modal.Title>
              {onReportStudent ? (
                <IoMegaphoneOutline
                  color={COLORS.darkgray}
                  size={20}
                  onClick={() =>
                    onReportStudent(
                      student.id,
                      student.firstName,
                      student.lastName
                    )
                  }
                />
              ) : null}
            </div>
          ))
        ) : (
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              flexDirection: 'column',
              alignItems: 'center',
              padding: '4% 0%',
            }}
          >
            <img src={DESK} style={{ height: '20vh', marginBottom: '5%' }} />
            <p style={{ color: COLORS.darkgray }}>
              There is no one here right now...
            </p>
          </div>
        )}
      </Modal.Body>

      {/* button part */}
      <Modal.Footer>
        <Button id="cancel-button" variant="outline-dark" onClick={cancelFunc}>
          Cancel
        </Button>
      </Modal.Footer>
    </>
  );

  return (
    <Modal
      id="ViewingSlotModal"
      show={true}
      backdrop="static"
      onHide={cancelFunc}
      keyboard={false}
      animation={false}
      centered
    >
      {/* header part */}
      {renderHeader()}

      {/* body part */}
      <Tabs
        className="viewingTabs"
        activeKey={tabValue}
        onSelect={(e) => {
          setTabValue(e);
        }}
        style={{ paddingLeft: '1rem' }}
      >
        {/* information tab */}
        <Tab eventKey="Information" title="Information">
          {InfoSection}
        </Tab>

        {/* member part */}
        <Tab eventKey="Members" title={`Members (${newInfo.length})`}>
          {MemberSection}
        </Tab>
      </Tabs>
    </Modal>
  );
};

export default ViewingSlotModal;
