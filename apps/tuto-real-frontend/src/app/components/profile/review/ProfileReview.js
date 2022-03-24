import { useEffect, useState } from 'react';
import { client } from '../../../axiosConfig';
import OtherReview from './OtherReview';
import RatingSummary from './RatingSummary';
import WriteComment from './WriteComment';

const ProfileReview = (props) => {
  const { viewType, targetId } = props;
  const [data,setData] = useState([])

  const dummyData = {
    rating: '3',
    comment: 'tester',
  };

  const getReview = async () => {
    await client({
      method: 'GET',
      url: `/reviews`,
      params: {
        _id: targetId,
      },
    })
      .then(({data : { data }}) => {
        console.log(data);
        setData(data)
      })
      .catch((res) => {
        console.log(res)
      })
  }

  useEffect(() => {
    getReview();
  }, [])

  const getDummyData = [
    {
      _id: 'test',
      created: 'February 29, 2000 9:30 a.m.',
      rating: '4',
      comment: 'เยี่ยมกู้ด',
    },
    {
      _id: 'test again',
      created: 'February 30, 2000 9:30 a.m.',
      rating: '3',
      comment: 'i am normal',
    },
    {
      _id: 'test fuck',
      created: 'February 31, 2000 9:30 a.m.',
      rating: '2',
      comment: 'bad',
    },
  ];

  return (
    <div>
      <RatingSummary />
      {viewType !== 'StudentSelf' && viewType !== 'TutorSelf' && (
        <WriteComment state="none" data={dummyData} targetId={targetId} />
      )}
      <OtherReview data={data} />
    </div>
  );
};

export default ProfileReview;
