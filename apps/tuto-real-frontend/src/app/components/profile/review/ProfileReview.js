import React from 'react'
import RatingSummary from './RatingSummary'
import WriteComment from './WriteComment'

const dummyData = {
  rating: '3',
  comment: 'tester'
} 

const ProfileReview = () => {
  return (
    <div>
        <RatingSummary/>
        <WriteComment state='none' data={dummyData}/>
    </div>
  )
}

export default ProfileReview