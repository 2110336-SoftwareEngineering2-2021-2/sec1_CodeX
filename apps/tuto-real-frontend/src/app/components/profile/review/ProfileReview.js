import OtherReview from './OtherReview';
import RatingSummary from './RatingSummary';
import WriteComment from './WriteComment';

const dummyData = {
  rating: '3',
  comment: 'tester',
};

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

const ProfileReview = () => {
  return (
    <div>
      <RatingSummary />
      <WriteComment state="have" data={dummyData} />
      <OtherReview data={getDummyData} />
    </div>
  );
};

export default ProfileReview;
