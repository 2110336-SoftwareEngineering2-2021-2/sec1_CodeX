import { useEffect, useState } from 'react';
import { MdNoEncryptionGmailerrorred } from 'react-icons/md';
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
  const myId = useAuth();

  // const dummyData = {
  //   rating: '3',
  //   comment: 'tester',
  // };

  const countReview = (data, myReview) => {
    const sumCount = data + myReview;
    setNoReview(sumCount);
    console.log(data);
    console.log(myReview);
  };

  // const checkState = ({ myReview }) => {
  //   if (myReview?.length === 1) {
  //     setMyState('have');
  //   } else {
  //     setMyState('none');
  //   }
  // };

  const getReview = async () => {
    await client({
      method: 'GET',
      url: `/reviews`,
      params: {
        _id: targetId,
        sId: myId._id,
      },
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then(({ data: { data } }) => {
        console.log(data);
        setSumRating(data.rating);
        setCheckMy(data.allow);
        if (data.self !== null) setMyReview(data.self);
        if (data.reviews !== null) setData(data.reviews);
        if (data.self === null) setMyState('none')
        else if (data.self !== null) setMyState('have');
        if (data.self === null) countReview(data.reviews.length, 0);
        else if (data.self !== null) countReview(data.reviews.length, 1);
      })
      .catch((res) => {
        console.log(res);
      });
  };

  useEffect(() => {
    getReview();
  }, []);

  // const getDummyData = [
  //   {
  //     _id: 'test',
  //     created: 'February 29, 2000 9:30 a.m.',
  //     rating: '4',
  //     comment: 'เยี่ยมกู้ด',
  //   },
  //   {
  //     _id: 'test again',
  //     created: 'February 30, 2000 9:30 a.m.',
  //     rating: '3',
  //     comment: 'i am normal',
  //   },
  //   {
  //     _id: 'test fuck',
  //     created: 'February 31, 2000 9:30 a.m.',
  //     rating: '2',
  //     comment: 'bad',
  //   },
  // ];

  return (
    <div>
      <RatingSummary sumRating={sumRating} number={noReview} />
      {checkMy && viewType !== 'StudentSelf' && viewType !== 'TutorSelf' && myState === 'none' && (
        <WriteComment state='none' data={myReview} targetId={targetId} inReviewId = ''/>
      )}
      {checkMy && viewType !== 'StudentSelf' && viewType !== 'TutorSelf' && myState === 'have' && (
        <WriteComment state='have' data={myReview} targetId={targetId} inReviewId = {myReview._id}/>
      )}
      {/* {checkMy && viewType !== 'StudentSelf' && viewType !== 'TutorSelf' && (
        <WriteComment state={myState} data={myReview} targetId={targetId} />
      )} */}
      <OtherReview data={data} />
    </div>
  );
};

export default ProfileReview;
