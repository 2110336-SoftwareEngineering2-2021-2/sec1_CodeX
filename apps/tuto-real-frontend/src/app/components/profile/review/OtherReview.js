import { FULL_STAR, EMPTY_STAR } from "../../../constants/image";

const OtherReview = (props) => {

    const {data} = props

    const numberOfStar = [1,2,3,4,5];

    const createStar = (number, rating) => {
        return (
            <img 
                alt={`star${number}`} 
                key={`star${number}`} 
                src={rating>number-1 ? FULL_STAR: EMPTY_STAR} 
                className='star-left'
            />
        )
    }

  return (
    data.map((comment) => {
        return (
            <div className='info-card shadow'>
                <div style={{display: 'flex', width: '100%'}}>
                    <div style={{display: 'flex', flexDirection: 'column', width: '70%'}}>
                        <p className='title' style={{display: 'flex', fontWeight: '400', marginBottom: '0%', width: '100%', color: 'var(--darkgray)'}}>Anonymous</p>
                        <p className='header' style={{marginTop: '0%', width: '100%'}}>{comment.created}</p>
                    </div>
                    
                    {numberOfStar.map((number) => {
                        return createStar(number, comment.rating);
                    })}
                    
                </div>
                <hr style={{margin: '0% 0%'}}/>
                <p className='header'>{comment.comment}</p>
            </div>
        )
    })
  )
}

export default OtherReview