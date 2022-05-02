import { useState, useEffect, useCallback } from 'react';
import { Form, Tabs, Tab, Spinner } from 'react-bootstrap';
import {
  IoIosArrowDropleftCircle,
  IoIosArrowDroprightCircle,
} from 'react-icons/io';

import { client } from '../../../axiosConfig';
import Tag from './Tag';
import Schedule from './Schedule';
import ViewingSlotModal from '../../modal/ViewingSlotModal';
import '../profile.css';

import COLORS from '../../../constants/color';

const ProfileLearnSchedule = ({ targetId, viewType, redirectToTutor }) => {
  const [isLoading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState('none'); // "none" | "edit" | "info" | "delete" | "book" //
  const [refresh, setRefresh] = useState(false); // Set to true when you want to refresh page //

  const [subjectList, setSubjectList] = useState([]);
  const [time, setTime] = useState('Day Time'); // "Day Time" | "Night Time" //
  const [scheduleList, setScheduleList] = useState([]);
  const [currentSchedule, setCurrentSchedule] = useState(0);
  const [info, setInfo] = useState([]);
  const [modalDay, setModalDay] = useState();

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
      url: `/schedule/learn`,
      params: {
        studentId: targetId,
      },
    })
      .then(({ data: { data } }) => {
        // console.log(data);
        setScheduleList(data ?? []);
        if (data?.length > 0) {
          setSubjectList(data[currentSchedule].subjects ?? []);
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
      setSubjectList(scheduleList[currentSchedule].subjects ?? []);
    }
  }, [currentSchedule]);

  const onViewInfo = ({ slotDataList, day }) => {
    setModalDay(day);
    setInfo(slotDataList);
    setShowModal('info');
  };

  // Arrow for changing week //
  const goLeft = () => {
    if (currentSchedule) setCurrentSchedule(currentSchedule - 1);
  };

  const goRight = () => {
    if (currentSchedule < scheduleList.length - 1)
      setCurrentSchedule(currentSchedule + 1);
  };

  // Render Section //
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
          <p className="title">Learning Schedule</p>
          <p className="header" style={{ width: '100%' }}>
            Schdule that show all the slots that you have successfully
            registered.
          </p>
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
                selected={[]}
                setShowModal={setShowModal}
                onViewInfo={onViewInfo}
                viewOnly={true}
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
                selected={[]}
                setShowModal={setShowModal}
                onViewInfo={onViewInfo}
                viewOnly={true}
              />
            </Tab>
          </Tabs>
        </div>
      </Form>

      {showModal === 'info' && (
        <ViewingSlotModal
          cancelFunc={() => {
            setShowModal('none');
          }}
          day={modalDay}
          info={info}
          fromLearnSchedule={true}
          redirectToTutor={redirectToTutor}
        />
      )}
    </>
  );
};

export default ProfileLearnSchedule;
