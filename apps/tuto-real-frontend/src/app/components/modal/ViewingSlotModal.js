import React, { useEffect, useState } from 'react';
import { Modal, Tabs, Tab, Button } from 'react-bootstrap';
import './ViewingSlotModal.css';

const ViewingSlotModal = (props) => {
  const {cancelFunc, day, info, firstName, lastName } = props;
  const time = info.slot
  const subject = info.subject
  const description = info.description
  const studentList = info.students ?? []

  const [tabValue, setTabValue] = useState('Information');
  const [newInfo, setNewInfo] = useState([]);

  const checkInfo = () => {
    let tempData = []
    studentList.map((student) => {
      if(student.status === 'Approved') {
        tempData = [...tempData,student]
      }
    })
    setNewInfo(tempData)
  }
  
  useEffect(() => {
    checkInfo()
  },[])

  return (
    <div>
      <Modal
        show={true}
        backdrop="static"
        onHide={cancelFunc}
        keyboard={false}
        animation={false}
        centered
      >
        {/* header part */}
        <Modal.Header closeButton style={{ border: 'none' }}>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
            }}
          >
            <Modal.Title
              className="request-header"
              style={{ fontWeight: '600' }}
            >
              {`${day}, ${time+8}.00 - ${time+9}.00`}
            </Modal.Title>
            <Modal.Title
              className="request-header"
              style={{ fontWeight: '500', fontSize: '16px' }}
            >
              {`${firstName} ${lastName}`}
            </Modal.Title>
          </div>

        </Modal.Header>

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
              <Button
                id="cancel-button"
                variant="outline-dark"
                onClick={cancelFunc}
              >
                Cancel
              </Button>
            </Modal.Footer>
          </Tab>

            {/* member part */}
          <Tab eventKey="Members" title={`Members (${newInfo.length})`}>

              {/* studentList part */}
            <Modal.Body>
              {newInfo.map((student) => (
                <Modal.Title
                  key={student.id}
                  className="request-header"
                  style={{ fontWeight: '400', fontSize: '16px' }}
                >
                  {` · ${student.firstName} ${student.lastName}`}
                </Modal.Title>
                )
              )}
            </Modal.Body>

            {/* button part */}
            <Modal.Footer>
              <Button
                id="cancel-button"
                variant="outline-dark"
                onClick={cancelFunc}
              >
                Cancel
              </Button>
            </Modal.Footer>
          </Tab>
        </Tabs>
      </Modal>
    </div>
  );
};

export default ViewingSlotModal;
