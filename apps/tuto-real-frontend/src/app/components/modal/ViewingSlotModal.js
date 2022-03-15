import React, { useEffect, useState } from 'react';
import { Modal, Tabs, Tab, Button } from 'react-bootstrap';
import {
  IoIosArrowDropleftCircle,
  IoIosArrowDroprightCircle,
} from 'react-icons/io';
import './ViewingSlotModal.css';

import { DESK } from '../../constants/image';
import COLORS from '../../constants/color';

const isValid = (x) => {
  if (x !== undefined && x !== null) return true;
  return false;
};

const ViewingSlotModal = (props) => {
  const { cancelFunc, day, info, firstName, lastName, infoIdx } = props; // "infoIdx" only available on TeachSchedule
  const index = isValid(infoIdx) ? infoIdx : 0;
  const time = info[index].slot;
  const subject = info[index].subject;
  const description = info[index].description;
  const studentList = info[index].students ?? [];

  const [tabValue, setTabValue] = useState('Information');
  const [newInfo, setNewInfo] = useState([]);

  const checkInfo = () => {
    let tempData = [];
    studentList.map((student) => {
      if (student.status === 'Approved') {
        tempData = [...tempData, student];
      }
    });
    setNewInfo(tempData);
  };

  useEffect(() => {
    checkInfo();
  }, []);

  // render section //
  const renderHeader = () => {
    return (
      <Modal.Header
        className={isValid(infoIdx) ? 'multiDataHeader' : 'singleDataHeader'}
        closeButton
      >
        {isValid(infoIdx) ? (
          // Have Multiple Data in 1 Slot //
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            {/* Left Arrow */}
            <IoIosArrowDropleftCircle
              className={infoIdx > 0 ? 'arrow-icon' : 'disable-arrow'}
              size={36}
              // onClick={goLeft}
              onClick={console.log('going left...')}
            />
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
              {`${firstName} ${lastName}`}
            </Modal.Title>
            {/* Right Arrow */}
            <IoIosArrowDroprightCircle
              className={
                infoIdx < info.length - 1 ? 'arrow-icon' : 'disable-arrow'
              }
              size={36}
              style={{ marginRight: '2%' }}
              // onClick={goRight}
              onClick={console.log('going right...')}
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
              {`${firstName} ${lastName}`}
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
      <Modal.Body>
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
          newInfo.map((student) => (
            <Modal.Title
              key={student.id}
              className="request-header"
              style={{ fontWeight: '400', fontSize: '16px' }}
            >
              {` · ${student.firstName} ${student.lastName}`}
            </Modal.Title>
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
    // <div>
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
    // </div>
  );
};

export default ViewingSlotModal;
