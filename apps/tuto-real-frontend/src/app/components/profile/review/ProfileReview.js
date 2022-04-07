import { useEffect, useState } from 'react';
import { useAuth } from '../../../auth';
import { client } from '../../../axiosConfig';
import OtherReview from './OtherReview';
import RatingSummary from './RatingSummary';
import WriteComment from './WriteComment';

const ProfileReview = (props) => {
  const { viewType, targetId } = props;
  const [data, setData] = useState([]);
  const [sumRating, setSumRating] = useState(0);
  const [checkMy, setCheckMy] = useState(false);
  const [myReview, setMyReview] = useState([]);
  const [myState, setMyState] = useState('');
  const [noReview, setNoReview] = useState(0);
  const [reset, setReset] = useState(true);
  const myId = useAuth();

  const countReview = (data, myReview) => {
    const sumCount = data + myReview;
    setNoReview(sumCount);
    console.log(data);
    console.log(myReview);
  };

  const getReview = async () => {
    const tempParams = 
    (myId._id ? 
      {
        _id: targetId,
        sid: myId._id
      }
      :
      {
        _id: targetId,
      }
    )
    await client({
      method: 'GET',
      url: `/reviews`,
      params: tempParams,
      // headers: {
      //   Accept: 'application/json',
      //   Authorization: `Bearer ${localStorage.getItem('token')}`,
      // },
    })
      .then(({ data: { data } }) => {
        console.log(data);
        setSumRating(data.rating);
        setCheckMy(data.allow);
        if (data.self !== null) setMyReview(data.self);
        if (data.reviews !== null) setData(data.reviews);
        if (data.self === null) setMyState('none');
        else if (data.self !== null) setMyState('have');
        if (data.self === null) countReview(data.reviews.length, 0);
        else if (data.self !== null) countReview(data.reviews.length, 1);
      })
      .catch((res) => {
        console.log(res);
      });
  };

  useEffect(() => {
    if (reset) getReview();
    setReset(false);
  }, [reset]);

  return (
    <div>
      <RatingSummary sumRating={sumRating} number={noReview} />
      {checkMy &&
        viewType !== 'StudentSelf' &&
        viewType !== 'TutorSelf' &&
        myState === 'none' && (
          <WriteComment
            state="none"
            data={myReview}
            targetId={targetId}
            inReviewId=""
            setReset={setReset}
          />
        )}
      {checkMy &&
        viewType !== 'StudentSelf' &&
        viewType !== 'TutorSelf' &&
        myState === 'have' && (
          <WriteComment
            state="have"
            data={myReview}
            targetId={targetId}
            inReviewId={myReview._id}
            setReset={setReset}
          />
        )}
      <OtherReview data={data} />
    </div>
  );
};

export default ProfileReview;
