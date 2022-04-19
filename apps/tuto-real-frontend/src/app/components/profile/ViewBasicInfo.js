import { IoMegaphoneOutline } from 'react-icons/io5';

import './profile.css';

const ViewBasicInfo = ({ viewType, basicInfo, setShowReportModal }) => {
  const { picture, firstName, lastName, birthDate, citizenId } = basicInfo;

  function translateDateToShow(date) {
    const monthName = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    return (
      monthName[date.month - 1].toString() +
      ' ' +
      date.date.toString() +
      ', ' +
      date.year.toString()
    );
  }

  function translateCitizenIdToShow(citizenId) {
    // var tmp = "1234";
    var tmp = citizenId.toString();
    // console.log("tmp lenght:", tmp.concat("xxxxxxxxxxxxxxxx").lenght)
    if (tmp.length < 13) {
      tmp = tmp + 'xxxxxxxxxxxxx';
    }
    return (
      tmp[0] +
      '-' +
      tmp.substr(1, 4) +
      '-' +
      tmp.substr(5, 5) +
      '-' +
      tmp.substr(10, 2) +
      '-' +
      tmp[12]
    );
  }

  return (
    <div className="info-card shadow">
      <div style={{ display: 'flex', width: '100%' }}>
        <div style={{ width: '95%', textAlign: 'left' }}>
          <p className="title">Basic Information</p>
          <p className="header">
            Some of your information may be seen by other users.
          </p>
        </div>
        <div style={{ width: '5%', textAlign: 'right' }}>
          <IoMegaphoneOutline
            size={20}
            onClick={() => setShowReportModal(true)}
          />
        </div>
      </div>

      <hr />
      <div className="section" style={{ alignItems: 'flex-start' }}>
        <p className="header">PICTURE</p>
        {/* <img className='profile-image' src={picture? URL.createObjectURL(picture): undefined} alt="profile" /> */}
        {/* <img className='profile-image' src={picture} alt="profile" /> */}
        <img className="profile-image" src={picture} alt="profile" />
      </div>
      <hr />
      <div className="section">
        <p className="header">FIRST NAME</p>
        <p>{firstName}</p>
      </div>
      <hr />
      <div className="section">
        <p className="header">LAST NAME</p>
        <p>{lastName}</p>
      </div>
      <hr />
      <div className="section">
        <p className="header">BIRTHDATE</p>
        <p>{translateDateToShow(birthDate)}</p>
      </div>
      {viewType !== 'TutorOther' ? (
        <>
          <hr />
          <div className="section">
            <p className="header">CITIZEN ID</p>
            <p>{translateCitizenIdToShow(citizenId)}</p>
          </div>
        </>
      ) : null}
    </div>
  );
};

export default ViewBasicInfo;
