import { useState, useEffect, useCallback } from 'react';
import { Form, Tabs, Tab, Button } from 'react-bootstrap';
import { FiEdit } from 'react-icons/fi';
import {
  IoIosArrowDropleftCircle,
  IoIosArrowDroprightCircle,
} from 'react-icons/io';

import { client } from '../../../axiosConfig';
import Tag from './Tag';
import Schedule from './Schedule';
import '../profile.css';

import COLORS from '../../../constants/color';
import ModalTwoButton from '../../modal/ModalTwoButton';
import EditingSlotModal from '../../modal/EditingSlotModal';
import ViewingSlotModal from '../../modal/ViewingSlotModal';
import { MdArticle } from 'react-icons/md';

const ProfileTeachSchedule = ({ targetId, viewType }) => {
  // const ProfileTeachSchedule = ({ targetId }) => {
  //   const viewType = 'TutorOther';
  // const viewType = "TutorSelf"

  const [isEditing, setEditing] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [showModal, setShowModal] = useState('none'); // "none" | "edit" | "info" | "delete" | "book" //
  const [subjectList, setSubjectList] = useState([]);
  const [price, setPrice] = useState(0);
  const [time, setTime] = useState('Day Time'); // "Day Time" | "Night Time" //
  const [scheduleList, setScheduleList] = useState([]);
  const [currentSchedule, setCurrentSchedule] = useState();
  const [selected, setSelected] = useState([]); // Sun: 0-15, Mon: 16-31, Tue: 32-47, ..., Sat: 96-111
  const [info, setInfo] = useState({})

  const tagColor = ['red', 'blue', 'green', 'purple', 'orange', 'gray'];

  const fetchData = useCallback(async () => {
    await client({
      method: 'GET',
      url: `/schedule`,
      params: {
        _id: targetId,
      },
    })
      // .then(({ data: { data } }) => {
      .then(() => {
        console.log('Data Fetched');
        const data = [
          {
            startDate: new Date('2022-02-20 0:0'),
            pricePerSlot: 250,
            allSubjects: ['Math', 'Art'],
            days: [
              {
                day: 'Monday',
                slots: [
                  {
                    slot: 0,
                    subject: 'Math',
                    description: 'eieieieieieieieieieieieiei',
                    students: [
                      {
                        id: '0000',
                        firstName: 'Komsorn',
                        lastName: 'Sookduay',
                        status: 'Pending',
                      },
                      {
                        id: '0001',
                        firstName: 'Rutthasate',
                        lastName: 'Gunsaduay',
                        status: 'Pending',
                      },
                    ],
                  },
                  {
                    slot: 1,
                    subject: 'Math',
                    description: 'eieieieieieieieieieieieiei',
                    students: [
                      {
                        id: '0000',
                        firstName: 'Komsorn',
                        lastName: 'Sookduay',
                        status: 'Approved',
                      },
                      {
                        id: '0001',
                        firstName: 'Rutthasate',
                        lastName: 'Gunsaduay',
                        status: 'Approved',
                      },
                    ],
                  },
                ],
              },
              {
                day: 'Wednesday',
                slots: [
                  {
                    slot: 15,
                    subject: 'Art',
                    description: 'midnight art course',
                    students: [
                      {
                        id: '0000',
                        firstName: 'Komsorn',
                        lastName: 'Sookduay',
                        status: 'Approved',
                      },
                      {
                        id: '0001',
                        firstName: 'Rutthasate',
                        lastName: 'Gunsaduay',
                        status: 'Pending',
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            startDate: new Date('2022-02-27 0:0'),
            pricePerSlot: 250,
            allSubjects: ['Math', 'Art', 'Sci'],
            days: [
              {
                day: 'Tuesday',
                slots: [
                  {
                    slot: 1,
                    subject: 'Sci',
                    description: 'Sciencee',
                    students: [
                      {
                        id: '0000',
                        firstName: 'Komsorn',
                        lastName: 'Sookduay',
                        status: 'Approved',
                      },
                      {
                        id: '0001',
                        firstName: 'Rutthasate',
                        lastName: 'Gunsaduay',
                        status: 'Approved',
                      },
                    ],
                  },
                  {
                    slot: 10,
                    subject: 'Math',
                    description: 'eieieieieieieieieieieieiei',
                    students: [
                      {
                        id: '0000',
                        firstName: 'Komsorn',
                        lastName: 'Sookduay',
                        status: 'Approved',
                      },
                      {
                        id: '0001',
                        firstName: 'Rutthasate',
                        lastName: 'Gunsaduay',
                        status: 'Approved',
                      },
                    ],
                  },
                  {
                    slot: 11,
                    subject: 'Math',
                    description: 'eieieieieieieieieieieieiei',
                    students: [
                      {
                        id: '0000',
                        firstName: 'Komsorn',
                        lastName: 'Sookduay',
                        status: 'Pending',
                      },
                      {
                        id: '0001',
                        firstName: 'Rutthasate',
                        lastName: 'Gunsaduay',
                        status: 'Pending',
                      },
                    ],
                  },
                ],
              },
              {
                day: 'Thursday',
                slots: [
                  {
                    slot: 15,
                    subject: 'Art',
                    description: 'midnight art course',
                    students: [
                      {
                        id: '0000',
                        firstName: 'Komsorn',
                        lastName: 'Sookduay',
                        status: 'Pending',
                      },
                      {
                        id: '0001',
                        firstName: 'Rutthasate',
                        lastName: 'Gunsaduay',
                        status: 'Pending',
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ];

        console.log(data);
        setScheduleList(data ?? []);
        if (data?.length > 0) {
          console.log('data is valid');
          setCurrentSchedule(0);
          setSubjectList(data[0].allSubjects ?? []);
          setPrice(data[0].pricePerSlot ?? 0);
        }
      })
      .catch(({ response }) => {
        console.log(response);
      });
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    console.log(showModal);
  }, [showModal]);

  const sendData = async () => {
    // await client({
    //     method: "PATCH",
    //     // url: `/user/${targetEmail}`,
    //     url: `/user`,
    //     params: {
    //         _id: targetId
    //         },
    //     data: {
    //         subjects: tempTeachingInfo.subjectList,
    //         description: tempTeachingInfo.description
    //     }
    // }).then(({data}) => {
    //     console.log(data)
    //     setTeachingInfo(tempTeachingInfo);
    //     setEditing(false)
    // }).catch(({response}) => {
    //     console.log(response)
    //     setEditing(false);
    // })
  };

  const Editdata = async (subject, description) => {
    console.log(subject)
    console.log(description)

    setIsPending(true)

    // await client({
    //   method: 'PATCH',
    //   url: '/schedule',
    //   params: {
    //     _id: targetId //_id ของ tutor
    //   },
    //   data: {
    //     pricePerSlot: 400, //ต้องการ price per slot

    //     // ต้องการ list ของ day กับ slot ในการส่งข้อมูล
    //     days: [{
    //       day: 'Sunday',
    //       slots: [{
    //         slot: 0,
    //         subject: subject,
    //         description: description
    //       }]
    //     }]
    //   }
      
    // }).then( ({data}) => {
    //   console.log(data)
    //   setIsPending(false)
    //   setShowModal('none')
    //   setSelected([])
    // }).catch( ({response}) => {
    //   console.log(response)
      
    // })

  }

  const deleteSlot = () => {
    console.log('Deleting....', selected);
    setShowModal('delete');
  };

  const onViewInfo = (slotData) => {
    setShowModal('info');
    setInfo(slotData)
  }

  const handleDelete = () => {
    Editdata('','')
  }

  const handleCancel = () => {
    setShowModal('none')
  }

  const renderDate = () => {
    if ((currentSchedule || currentSchedule === 0) && scheduleList.length > 0) {
      const start = new Date(scheduleList[currentSchedule].startDate);
      const end = new Date(scheduleList[currentSchedule].startDate);
      end.setDate(end.getDate() + 6);
      const formatOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      };
      return `${start.toLocaleDateString(
        'en-us',
        formatOptions
      )} - ${end.toLocaleDateString('en-us', formatOptions)}`;
    } else return 'Loading Date...';
  };

  const renderButton = () => {
    if (selected.length === 0) return null;
    else if (viewType === 'TutorSelf')
      return (
        <>
          <div style={{ display: 'flex', width: '100%' }}>
            <Button variant="danger" onClick={deleteSlot}>
              {' '}
              Delete Selected{' '}
            </Button>
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'flex-end',
              width: '100%',
            }}
          >
            <Button variant="outline-secondary" onClick={() => setSelected([])}>
              {' '}
              Discard All{' '}
            </Button>
            <Button
              variant="warning"
              style={{
                backgroundColor: COLORS.yellow,
                color: COLORS.white,
                marginLeft: '2%',
              }}
              onClick={() => {setShowModal('edit'); setEditing(true);}}
            >
              {' '}
              Edit{' '}
            </Button>
          </div>
        </>
      );
    else if (viewType === 'TutorOther')
      return (
        <>
          <Button variant="outline-secondary" onClick={() => setSelected([])}>
            {' '}
            Discard All{' '}
          </Button>
          <Button
            variant="success"
            style={{
              backgroundColor: COLORS.third,
              borderColor: 'none',
              color: COLORS.white,
              marginLeft: '2%',
            }}
            onClick={() => setShowModal('book')}
          >
            {' '}
            Book Selecting Slot{' '}
          </Button>
        </>
      );
    else return null;
  };

  return (
    <>
      <Form className="form">
        <div className="table-card info-card shadow">
          <p className="title">Teaching Information</p>
          <p className="header" style={{ width: '100%' }}>
            Some of your information may be seen by other users.
          </p>
          <hr />
          <div className="section">
            <p className="header">PRICE (PER HOUR)</p>
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                width: '100%',
              }}
            >
              <p
                style={{
                  fontSize: 'x-large',
                  marginRight: '2%',
                  color: 'gray',
                }}
              >
                {price}
              </p>
              <FiEdit size={20} color={COLORS.third} />
            </div>
          </div>
          <hr />
          <div className="section" style={{ marginBottom: '1.5%' }}>
            <IoIosArrowDropleftCircle className="arrow-icon" size={36} />
            <IoIosArrowDroprightCircle
              className="arrow-icon"
              size={36}
              style={{ marginRight: '2%' }}
            />
            <p className="header">{renderDate()}</p>
          </div>
          <div
            style={{ display: 'flex', flexWrap: 'wrap', marginBottom: '3%' }}
          >
            {subjectList.length !== 0 ? (
              subjectList.map((e, i) => (
                <Tag
                  key={i}
                  text={e}
                  textColor="white"
                  bgColor={tagColor[i % 6]}
                />
              ))
            ) : (
              <Tag
                text={
                  viewType === 'TutorSelf'
                    ? 'Please add your subject'
                    : "The tutor didn't add his subjects yet"
                }
                textColor="white"
                bgColor={COLORS.yellow}
              />
            )}
          </div>
          <Tabs
            defaultActiveKey={time}
            activeKey={time}
            onChange={(e) => setTime(e.target.value)}
            style={{ width: '100%' }}
          >
            <Tab eventKey="Day Time" title="Day Time" style={{ width: '100%' }}>
              <Schedule
                time={'Day Time'}
                scheduleData={
                  scheduleList[currentSchedule]
                    ? scheduleList[currentSchedule].days
                    : []
                }
                viewType={viewType}
                selected={selected}
                setSelected={setSelected}
                setShowModal={setShowModal}
                onViewInfo={onViewInfo}
              />
            </Tab>
            <Tab
              eventKey="Night Time"
              title="Night Time"
              style={{ width: '100%' }}
            >
              <Schedule
                time="Night Time"
                scheduleData={
                  scheduleList[currentSchedule]
                    ? scheduleList[currentSchedule].days
                    : []
                }
                viewType={viewType}
                selected={selected}
                setSelected={setSelected}
                setShowModal={setShowModal}
                onViewInfo={onViewInfo}
              />
            </Tab>
          </Tabs>
          <div
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              width: '100%',
              padding: '0% 0% 1% 0%',
            }}
          >
            {renderButton()}
          </div>
        </div>
      </Form>

      {/* Delete selected modal */}
      {showModal==='delete' && <ModalTwoButton 
        show={true}
        title='Are you sure you want to delete these slots?'
        header='If you click delete button, information of the selected slots will be deleted.'
        leftFunc={handleDelete}
        rightFunc={handleCancel}
        leftMessage='Delete'
        rightMessage='Cancel'
        leftColor='red'
        rightColor='cancel-button'
        isPending={isPending}
        leftPending='Deleting...'
        leftPendingColor='var(--lightgray)'
      />}

      {showModal==='edit' && <EditingSlotModal
        show={isEditing}
        setShow={setEditing}
        allSubject={['Math', 'Art']} //get all subject
        subjectIn='Choose your subject' //subject in slots
        descriptionIn='' //description in slots
        setModalState={setShowModal}
        confirmFunc={Editdata}
        isPending={isPending}
      />}

      {showModal==='info' && <ViewingSlotModal
        show={true}
        cancelFunc={handleCancel}
        number={info.students.length}
        subject={info.subject}
        description={info.description}
        studentList={info.students}
      />}
    </>
  );
};

export default ProfileTeachSchedule;
