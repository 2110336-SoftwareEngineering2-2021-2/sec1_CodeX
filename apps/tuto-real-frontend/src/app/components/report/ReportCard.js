import COLORS from '../../constants/color';
import './report.css';

const ReportCard = (prop) => {
  const { reportingName, reporterName, timeStamp, onClickCard } = prop;

  const translateDateFormat = (timeStamp) => {
    //2001-02-15T17:00:00.000+00:00
    //            to be
    //February 29, 2000 9:30 a.m."
    let temp = new Date(timeStamp);
    // console.log(new Date(timeStamp));
    var date = temp.getDate();
    var month = temp.getMonth();
    var year = temp.getFullYear();
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
    return monthName[month] + ' ' + date.toString() + ', ' + year.toString();
  };

  const translateTimeFormat = (timeStamp) => {
    let temp = new Date(timeStamp);
    // console.log(new Date(timeStamp));
    var hour = temp.getHours().toString();
    if (hour.length < 2) {
      hour = '0' + hour;
    }
    var min = temp.getMinutes().toString();
    if (min.length < 2) {
      min = '0' + min;
    }
    return hour + ':' + min;
  };

  return (
    <div className="report-card" onClick={onClickCard}>
      <div className="header">
        <p style={{ color: COLORS.primary, fontWeight: '500' }}>
          Waiting for review
        </p>
        <p>
          {translateDateFormat(timeStamp)} {translateTimeFormat(timeStamp)}
        </p>
      </div>

      <div className="body">
        <div id="report-target">
          <p style={{ fontWeight: '500' }}>Reporting:</p>
          <p style={{ color: 'red', fontWeight: '500' }}>{reportingName}</p>
        </div>
        <div id="reporter">
          <p>From:</p>
          <p style={{ fontWeight: '500' }}>{reporterName}</p>
        </div>
      </div>
    </div>
  );
};

export default ReportCard;
