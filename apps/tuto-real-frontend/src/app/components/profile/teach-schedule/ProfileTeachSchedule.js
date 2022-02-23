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
import ModalTwoButton from '../../modal/ModalTwoButton';
import EditingSlotModal from '../../modal/EditingSlotModal';
import ViewingSlotModal from '../../modal/ViewingSlotModal';

import COLORS from '../../../constants/color';
import SUBJECTS from '../../../constants/subjects';
import { DAY } from '../../../constants/day';

const ProfileTeachSchedule = ({ targetId, viewType }) => {
  // const ProfileTeachSchedule = ({ targetId }) => {
  //   const viewType = 'TutorOther';
  // const viewType = "TutorSelf"

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
  const [info, setInfo] = useState({});

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
      })
      .catch((res) => {
        console.log(res);
      });
  }, []);

  useEffect(() => {
    fetchData();
    setRefresh(false);
  }, [fetchData, refresh]);

  useEffect(() => {
    if (scheduleList[currentSchedule]) {
      setSubjectList(scheduleList[currentSchedule].allSubjects);
      // setTime('Day Time');
    }
  }, [currentSchedule]);

  // useEffect(() => {
  //   console.log(tempPrice);
  // }, [tempPrice]);

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

  const savePrice = () => {
    console.log('saving Price...', tempPrice);
    setPrice(tempPrice ? tempPrice : 0);
    // Patch to backend.....
    setEditingPrice(false);
  };

  const cancelPrice = () => {
    setTempPrice(price ? price : 0);
    setEditingPrice(false);
  };

  //can fix
  // const deleteSlot = () => {
  //   setShowModal('delete');
  // };

  const onViewInfo = (slotData) => {
    setShowModal('info');
    setInfo(slotData);
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

  const selectedToDayAndSlot = async (subject, description, _callback) => {
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
      <p className="header">PRICE (PER HOUR)</p>
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
          <FiEdit
            size={20}
            color={COLORS.third}
            style={{ cursor: 'pointer' }}
            onClick={() => setEditingPrice(true)}
          />
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
          allSubject={Object.keys(SUBJECTS)} //get all subject
          subjectIn="Choose your subject" //subject in slots
          descriptionIn="" //description in slots
          setModalState={setShowModal}
          confirmFunc={sendEditData}
          isPending={isPending}
        />
      )}

      {showModal === 'info' && (
        <ViewingSlotModal
          cancelFunc={handleCancel}
          number={info.students ? info.students.length : 0}
          subject={info.subject}
          description={info.description}
          studentList={info.students ?? []}
        />
      )}
    </>
  );
};

export default ProfileTeachSchedule;
