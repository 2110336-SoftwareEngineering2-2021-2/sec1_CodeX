import { FULL_STAR } from '../../../constants/image';

const RatingSummary = (props) => {

  const {sumRating, number} = props

  // const dummyNumReviews = 5;
  // const dummyReviewScore = 3.3;

  const getSummary = (number) => {
    if(number > 4) {
      return 'Very Positive Reviews'
    }else if(number > 3) {
      return 'Positive Reviews'
    }else if(number > 2) {
      return 'Mixed Reviews'
    }else if(number > 1) {
      return 'Negative Reviews'
    }else if(number > 0) {
      return 'Very Negative Reviews'
    }else if(number === 0) {
      return 'No Review Yet'
    }
  }

  return (
    <div className="info-card shadow">
      <p className="title" style={{ fontWeight: '500' }}>
        Average Rating{' '}
      </p>
      <hr style={{ margin: '0% 0%' }} />
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <p
          style={{
            fontWeight: '300',
            fontSize: '80px',
            color: 'var(--yellow)',
            marginRight: '5%'
          }}
        >
          {sumRating.toFixed(1)}
        </p>
        <img
          alt=""
          src={FULL_STAR}
          style={{
            height: '60px',
            paddingRight: '5%',
            borderRight: '1px solid var(--lightgray)',
          }}
        />
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start', width: '50vh', paddingLeft: '5%'}}>
          <p style={{color: 'var(--darkgray)', fontSize: 'larger'}}>{`from ${number} persons`}</p>
          <p style={{color: 'var(--darkgray)', fontSize: 'larger'}}>{getSummary(sumRating)}</p>
        </div>
        
      </div>
    </div>
  );
};

export default RatingSummary;
