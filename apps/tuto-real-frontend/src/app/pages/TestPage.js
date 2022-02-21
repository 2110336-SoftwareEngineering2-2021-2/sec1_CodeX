import React, { useState } from 'react';
import EditingSlotModal from '../components/modal/EditingSlotModal';
import ModalTwoButton from '../components/modal/ModalTwoButton';
import ViewingSlotModal from '../components/modal/ViewingSlotModal';

const TestPage = () => {
  const [show1, setShow1] = useState(false);
  // const [show2, setShow2] = useState(false);
  // const studentList = ['You', 'Are', 'Such', 'A', 'Nice', 'Person'];

  return (
    <div>
      <button
        onClick={() => {
          setShow1(true);
        }}
      >
        test1
      </button>

      {/* <button
        onClick={() => {
          setShow2(true);
        }}
      >
        test2
      </button> */}

      {/* <EditingSlotModal
        show={show1}
        setShow={setShow1}
        subjectIn="Art"
        descriptionIn=""
      />

      <ViewingSlotModal
        show={show2}
        setShow={setShow2}
        number="6"
        subject="Art"
        description="眠い"
        studentList={studentList}
      /> */}

      {show1 && <ModalTwoButton 
        title='Do you want to enroll on this course?'
        header={
          <div>
            Are you sure you want to enroll on the selected slotsIf you click confirm button, the request will be sent to this tutor. After this tutor accept your request, you will have to pay
            <span style={{
              fontSize: '18px', 
              fontWeight: '600', 
              color: 'var(--primary)'
            }}>
              {` 800 THB.`}
            </span>
          </div>
        }
        leftFunc=''
        rightFunc={() => (setShow1(false))}
        leftMessage='Confirm'
        rightMessage='Cancel'
        leftColor='var(--yellow)'
        rightColor='cancel-button'
        isPending={false}
        leftPending='Booking...'
        leftPendingColor='var(--lightgray)'
      />}


    </div>
  );
};

export default TestPage;
