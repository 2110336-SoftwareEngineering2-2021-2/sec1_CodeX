import { translateDateFormat } from '../util/translator';
import './report.css';

const UserBannedCard = (props) => {
  const { name, timeStamp, onClickCard, onClickUnBanBtn } = props;

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
    <div className="user-banned-card" name="card" onClick={onClickCard}>
      {/* <p>this is banned user card</p> */}
      <div className="flex-column">
        <p style={{ fontSize: '24px', fontWeight: '500' }}>{name}</p>
        <div className="flex-row gap5">
          <p>Banned Until:</p>
          <p>
            {translateDateFormat(timeStamp)} {translateTimeFormat(timeStamp)}
          </p>
        </div>
      </div>
      <button
        className="ignore-button"
        name="button"
        onClick={onClickUnBanBtn}
        style={{ maxHeight: '3rem' }}
      >
        Unban
      </button>
    </div>
  );
};

export default UserBannedCard;
