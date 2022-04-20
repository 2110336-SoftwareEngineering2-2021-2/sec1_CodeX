import { useState, useEffect, useCallback } from 'react';
import { Form, Tabs, Tab, Button, Spinner } from 'react-bootstrap';
import { FiEdit } from 'react-icons/fi';
import {
  IoIosArrowDropleftCircle,
  IoIosArrowDroprightCircle,
} from 'react-icons/io';

import { client } from '../../../axiosConfig';
import Tag from './Tag';
import Schedule from './Schedule';
import ModalTwoButton from '../../modal/ModalTwoButton';
import EditingSlotModal from '../../modal/EditingSlotModal';
import ViewingSlotModal from '../../modal/ViewingSlotModal';
import UserReportUI from '../../report/UserReportUI';
import { useAuth } from '../../../auth';
import '../profile.css';

import COLORS from '../../../constants/color';
import { DAY } from '../../../constants/day';
import { ZOOM_ICON } from '../../../constants/image';

const ProfileTeachSchedule = ({
  targetId,
  viewType,
  zoomUrl,
  firstName,
  lastName,
}) => {
  const [isLoading, setLoading] = useState(true);
  const [isEditing, setEditing] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [showModal, setShowModal] = useState('none'); // "none" | "edit" | "info" | "delete" | "book" //
  const [isEditingPrice, setEditingPrice] = useState(false);
  const [refresh, setRefresh] = useState(false); // Set to true when you want to refresh page //

  const [subjectList, setSubjectList] = useState([]);
  const [price, setPrice] = useState(0);
  const [tempPrice, setTempPrice] = useState(0);
  const [time, setTime] = useState('Day Time'); // "Day Time" | "Night Time" //
  const [scheduleList, setScheduleList] = useState([]);
  const [currentSchedule, setCurrentSchedule] = useState(0);
  const [selected, setSelected] = useState([]); // Sun: 0-15, Mon: 16-31, Tue: 32-47, ..., Sat: 96-111
  const [info, setInfo] = useState([]);
  const [modalDay, setModalDay] = useState();

  const [studentInfo, setStudentInfo] = useState(null); // ID of student that is going to be reported
  const [showReportModal, setShowReportModal] = useState(false);

  const { _id } = useAuth();

  const tagColor = [
    'Crimson',
    'CornflowerBlue',
    'LightSeaGreen',
    'MediumOrchid',
    'Tomato',
    'SlateGrey',
  ];

  const fetchData = useCallback(async () => {
    await client({
      method: 'GET',
      url: `/schedule`,
      params: {
        _id: targetId,
      },
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then(({ data: { data } }) => {
        console.log(data);
        setScheduleList(data.scheduleList ?? []);
        setPrice(data.pricePerSlot ?? 0);
        setTempPrice(data.pricePerSlot ?? 0);
        if (data.scheduleList?.length > 0) {
          // setCurrentSchedule(0);
          setSubjectList(data.scheduleList[currentSchedule].allSubjects ?? []);
        }
        setLoading(false);
      })
      .catch((res) => {
        console.log(res);
      });
  }, [targetId]);

  useEffect(() => {
    setLoading(true);
    fetchData();
    setRefresh(false);
  }, [fetchData, refresh]);

  useEffect(() => {
    if (scheduleList[currentSchedule]) {
      setSubjectList(scheduleList[currentSchedule].allSubjects);
      // setTime('Day Time');
    }
  }, [currentSchedule]);

  const sendEditData = async (subject, description) => {
    console.log(subject);
    console.log(description);

    setIsPending(true);
    const editData = await selectedToDayAndSlot(subject, description);
    console.log(editData);
    await client({
      method: 'PATCH',
      url: '/schedule/add',
      params: {
        _id: scheduleList[currentSchedule]._id, //_id ของ schedule
      },
      data: {
        // ต้องการ list ของ day กับ slot ในการส่งข้อมูล
        days: editData,
      },
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then(({ data }) => {
        console.log(data);
        setIsPending(false);
        setShowModal('none');
        setSelected([]);
        setRefresh(true);
      })
      .catch(({ response }) => {
        console.log(response);
      });
  };

  const sendBooking = async () => {
    setIsPending(true);
    const bookingData = await selectedToDayAndSlotWithNoSubject();
    console.log(bookingData);

    await client({
      method: 'POST',
      url: '/booking/create',
      data: {
        student_id: _id,
        schedule_id: scheduleList[currentSchedule]._id,
        days: bookingData,
      },
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then(({ data }) => {
        console.log(data);
        setIsPending(false);
        setShowModal('none');
        setSelected([]);
        setRefresh(true);
      })
      .catch(({ response }) => {
        console.log(response);
      });
  };

  const savePrice = async () => {
    console.log('saving Price...', tempPrice);
    await client({
      method: 'PATCH',
      url: '/user',
      params: { _id: targetId },
      data: { pricePerSlot: tempPrice },
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then(({ data }) => {
        console.log(data);
        setPrice(tempPrice ? tempPrice : 0);
        setEditingPrice(false);
      })
      .catch(({ response }) => {
        console.log(response);
      });
  };

  const cancelPrice = () => {
    setTempPrice(price ? price : 0);
    setEditingPrice(false);
  };

  const onViewInfo = ({ slotDataList, day }) => {
    setModalDay(day);
    setInfo(slotDataList);
    setShowModal('info');
  };

  const onReportStudent = (studentId, firstName, lastName) => {
    setStudentInfo({ id: studentId, firstName, lastName });
    setShowReportModal(true);
  };

  const getDeletingSlot = () => {
    const selectedList = [];
    const allSlots = [];
    // Get all existing slot in schedule //
    selected.sort();
    scheduleList[currentSchedule].days.forEach(({ day, slots }) => {
      slots.forEach(({ slot, students }) => {
        const dateIdx = DAY.indexOf(day);
        const haveStudent = students && students.length > 0 ? true : false;
        if (dateIdx !== -1)
          allSlots.push({ haveStudent, slotIdx: dateIdx * 16 + slot });
      });
    });
    let dayList = [];
    let currentDay = 0;
    // Select only the existing slot and send delete request to backend //
    try {
      selected.forEach((idx) => {
        const slot = allSlots.filter(({ slotIdx }) => slotIdx === idx);
        if (slot.length > 0) {
          // If tutor already have that slot //
          // If that slot have to student => user cannot delete error //
          if (slot[0].haveStudent) {
            throw new Error(
              "You can't delete this slot because someone have aleady book this slot."
            );
          } else {
            // If that slot don't have to student => push in array before delete the array //
            if (Math.floor(idx / 16) !== currentDay) {
              if (dayList.length > 0) {
                selectedList.push({ day: DAY[currentDay], slots: dayList });
                dayList = [];
              }
              currentDay = Math.floor(idx / 16);
            }
            dayList.push(idx % 16);
          }
        }
      });
      if (dayList.length > 0)
        selectedList.push({ day: DAY[currentDay], slots: dayList });
      return selectedList;
    } catch (err) {
      alert(err);
    }
    return null;
  };

  const handleDelete = async () => {
    console.log('Deleting...', getDeletingSlot());
    const deletingSlots = getDeletingSlot();
    if (deletingSlots && deletingSlots.length === 0) setSelected([]);
    else if (deletingSlots && deletingSlots.length > 0)
      await client({
        method: 'PATCH',
        url: '/schedule/delete',
        params: {
          _id: scheduleList[currentSchedule]._id,
        },
        data: {
          days: deletingSlots,
        },
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
        .then(({ data }) => {
          console.log(data);
          setSelected([]);
          setRefresh(true);
        })
        .catch((res) => {
          console.log(res);
        });
    setShowModal('none');
  };

  //can fix
  const handleCancel = () => {
    setShowModal('none');
  };

  const selectedToDayAndSlot = async (subject, description) => {
    const dayList = DAY.map((day) => ({ day, slots: [] }));
    selected.sort();
    for (let i = 0; i != selected.length; i++) {
      const dayIndex = Math.floor(selected[i] / 16);
      dayList[dayIndex].slots = [
        ...dayList[dayIndex].slots,
        { slot: selected[i] % 16, subject, description },
      ];
    }
    return dayList.filter((day) => day.slots.length !== 0);
  };

  const selectedToDayAndSlotWithNoSubject = async () => {
    const dayList = DAY.map((day) => ({ day, slots: [] }));
    selected.sort();
    for (let i = 0; i != selected.length; i++) {
      const dayIndex = Math.floor(selected[i] / 16);
      dayList[dayIndex].slots = [...dayList[dayIndex].slots, selected[i] % 16];
    }
    return dayList.filter((day) => day.slots.length !== 0);
  };

  const goLeft = () => {
    if (currentSchedule) setCurrentSchedule(currentSchedule - 1);
    setSelected([]);
  };

  const goRight = () => {
    if (
      (currentSchedule || currentSchedule === 0) &&
      currentSchedule < scheduleList.length - 1
    )
      setCurrentSchedule(currentSchedule + 1);
    setSelected([]);
  };

  // Render Section //
  const renderPrice = (
    <div className="section">
      <p className="header">PRICE (PER SLOT)</p>
      {!isEditingPrice ? (
        <>
          <p
            style={{
              fontSize: 'larger',
              marginRight: '2%',
              color: 'gray',
            }}
          >
            {`${price} THB`}
          </p>
          {viewType === 'TutorSelf' ? (
            <FiEdit
              size={20}
              color={COLORS.third}
              style={{ cursor: 'pointer' }}
              onClick={() => setEditingPrice(true)}
            />
          ) : null}
        </>
      ) : (
        <Form.Group
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            width: '100%',
          }}
        >
          <Form.Control
            type="number"
            value={tempPrice ?? 0}
            onChange={(e) => setTempPrice(parseInt(e.target.value))}
          />
          <Button
            variant="success"
            style={{
              backgroundColor: COLORS.third,
              borderColor: 'none',
              color: COLORS.white,
              margin: '0% 2% 0% 0%',
              width: '25%',
            }}
            onClick={savePrice}
          >
            Save Change
          </Button>
          <Button variant="outline-secondary" onClick={cancelPrice}>
            Cancel
          </Button>
        </Form.Group>
      )}
    </div>
  );

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
            <Button variant="danger" onClick={() => setShowModal('delete')}>
              Delete Selected
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
              Discard All
            </Button>
            <Button
              variant="warning"
              style={{
                backgroundColor: COLORS.yellow,
                color: COLORS.white,
                marginLeft: '2%',
              }}
              onClick={() => {
                setShowModal('edit');
                setEditing(true);
              }}
            >
              Edit
            </Button>
          </div>
        </>
      );
    else if (viewType === 'TutorOther')
      return (
        <>
          <Button variant="outline-secondary" onClick={() => setSelected([])}>
            Discard All
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
            Book Selecting Slot
          </Button>
        </>
      );
    else return null;
  };

  if (isLoading)
    return (
      <div className="loading_spinner">
        <Spinner
          animation="border"
          role="status"
          style={{ marginBottom: '2vh' }}
        >
          <span className="visually-hidden">Loading...</span>
        </Spinner>
        <h4 style={{ color: COLORS.darkgray }}>Loading</h4>
      </div>
    );

  return (
    <>
      <Form className="form">
        <div className="table-card info-card shadow">
          {/* Header */}
          <p className="title">Teaching Information</p>
          <p className="header" style={{ width: '100%' }}>
            Some of your information may be seen by other users.
          </p>
          <hr />
          {/* Price Per Hour */}
          {renderPrice}
          <hr />
          {/* Zoom Section (Only for tutor) */}
          {zoomUrl && viewType === 'TutorSelf' ? (
            <>
              <div className="zoom-button" onClick={() => window.open(zoomUrl)}>
                <img
                  src={ZOOM_ICON}
                  style={{ width: '3vw', marginRight: '1vw' }}
                />
                <p>Click here to go to your classroom.</p>
              </div>
              <hr />
            </>
          ) : null}
          {/* Date Choosing */}
          <div className="section" style={{ marginBottom: '1.5%' }}>
            <IoIosArrowDropleftCircle
              className={currentSchedule > 0 ? 'arrow-icon' : 'disable-arrow'}
              size={36}
              onClick={goLeft}
            />
            <IoIosArrowDroprightCircle
              className={
                currentSchedule < scheduleList.length - 1
                  ? 'arrow-icon'
                  : 'disable-arrow'
              }
              size={36}
              style={{ marginRight: '2%' }}
              onClick={goRight}
            />
            <p className="header">{renderDate()}</p>
          </div>
          {/* Subjects */}
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
                text="There is no subject this week"
                textColor="white"
                bgColor={COLORS.lightgray}
              />
            )}
          </div>

          {/* Day/Night Time Tabs */}
          <Tabs
            defaultActiveKey={time}
            activeKey={time}
            style={{ width: '100%' }}
            onSelect={(k) => setTime(k)}
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

          {/* Button Section */}
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
      {showModal === 'delete' && (
        <ModalTwoButton
          title="Are you sure you want to delete these slots?"
          header="If you click delete button, information of the selected slots will be deleted."
          leftFunc={handleDelete}
          rightFunc={handleCancel}
          leftMessage="Delete"
          rightMessage="Cancel"
          leftColor="red"
          rightColor="cancel-button"
          isPending={isPending}
          leftPending="Deleting..."
          leftPendingColor="var(--lightgray)"
        />
      )}

      {showModal === 'edit' && (
        <EditingSlotModal
          show={isEditing}
          setShow={setEditing}
          setModalState={setShowModal}
          confirmFunc={sendEditData}
          isPending={isPending}
        />
      )}

      {showModal === 'info' && (
        <ViewingSlotModal
          cancelFunc={handleCancel}
          day={modalDay}
          info={info}
          firstName={firstName}
          lastName={lastName}
          onReportStudent={onReportStudent}
        />
      )}

      {showModal === 'book' && (
        <ModalTwoButton
          title="Do you want to enroll on this course?"
          header={
            <div>
              Are you sure you want to enroll on the selected slotsIf you click
              confirm button, the request will be sent to this tutor. After this
              tutor accept your request, you will have to pay
              <span
                style={{
                  fontSize: '18px',
                  fontWeight: '600',
                  color: 'var(--primary)',
                }}
              >
                {` ${price * selected.length} THB. `}
              </span>
            </div>
          }
          leftFunc={sendBooking}
          rightFunc={() => setShowModal('none')}
          leftMessage="Confirm"
          rightMessage="Cancel"
          leftColor="var(--yellow)"
          rightColor="cancel-button"
          isPending={isPending}
          leftPending="Booking..."
          leftPendingColor="var(--lightgray)"
        />
      )}

      <UserReportUI
        show={showReportModal}
        closeModal={() => setShowReportModal(false)}
        targetId={studentInfo?.id}
        targetName={`${studentInfo?.firstName} ${studentInfo?.lastName}`}
        reporterId={_id}
      />
    </>
  );
};

export default ProfileTeachSchedule;
