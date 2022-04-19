import { IoMegaphoneOutline } from 'react-icons/io5';

import {
  translateDateFormat,
  translateTimeFormat,
} from '../../util/translator';
import COLORS from '../../../constants/color';
import { FULL_STAR, EMPTY_STAR } from '../../../constants/image';

const OtherReview = (props) => {
  const { data } = props;

  const numberOfStar = [1, 2, 3, 4, 5];

  const createStar = (number, rating) => {
    return (
      <img
        alt={`star${number}`}
        key={`star${number}`}
        src={rating > number - 1 ? FULL_STAR : EMPTY_STAR}
        className="star-left"
      />
    );
  };

  return data.map((comment) => {
    return (
      <div key={comment._id} className="info-card shadow">
        <div style={{ display: 'flex', width: '100%' }}>
          <div style={{ display: 'flex', width: '100%', alignItems: 'center' }}>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                marginRight: '5%',
              }}
            >
              <p
                className="title"
                style={{
                  display: 'flex',
                  fontWeight: '400',
                  marginBottom: '0%',
                  width: '100%',
                  color: 'var(--darkgray)',
                }}
              >
                Anonymous
              </p>
              <p className="header" style={{ marginTop: '0%', width: '100%' }}>
                {`${translateDateFormat(
                  comment.createdAt
                )} ${translateTimeFormat(comment.createdAt)}
                `}
              </p>
            </div>
            <IoMegaphoneOutline
              color={COLORS.darkgray}
              size={20}
              // onClick={() => setShowReportModal(true)}
            />
          </div>

          {numberOfStar.map((number) => {
            return createStar(number, comment.rating);
          })}
        </div>
        <hr style={{ margin: '0% 0%' }} />
        <p className="header">{comment.comment}</p>
      </div>
    );
  });
};

export default OtherReview;
