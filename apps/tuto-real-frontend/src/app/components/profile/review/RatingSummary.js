import React from 'react'
import { FULL_STAR } from '../../../constants/image'

const RatingSummary = () => {
  return (
    <div className='info-card shadow'>
        <p className='title' style={{fontWeight: '500'}}>Average Rating </p>
        <hr style={{margin: '0% 0%'}}/>
        <div style={{display: 'flex', alignItems: 'center'}}>
            <p style={{fontWeight: '300', fontSize: '96px', color: 'var(--yellow)', marginRight: '5%'}}>4.5</p>
            <img alt='' src={FULL_STAR} style={{height: '70px', paddingRight: '5%', borderRight: '1px solid var(--lightgray)'}}/>
        </div>
    </div>
  )
}

export default RatingSummary