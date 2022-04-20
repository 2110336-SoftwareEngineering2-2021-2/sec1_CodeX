import { translateDateFormat } from '../util/translator';
import COLORS from '../../constants/color';
import './report.css';

const ReportCard = (prop) => {
  const { reportingName, reporterName, timeStamp, onClickCard } = prop;

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
