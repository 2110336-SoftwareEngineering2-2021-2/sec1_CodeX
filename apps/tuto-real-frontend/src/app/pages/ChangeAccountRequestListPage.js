import React from 'react';
import RequestBox from '../components/requestlist/RequestBox';
import { useState } from 'react';

const ChangeAccountRequestListPage = () => {
  const [dummyRequestList, setDummyRequestList] = useState([
    {
      firstName: "kharit1",
      lastName: "123",
      date: "1/1/2022",
      time: "16:03"
    },
    {
      firstName: "kharit2",
      lastName: "1234",
      date: "1/2/2022",
      time: "16:04"
    },
    {
      firstName: "kharit3",
      lastName: "1235",
      date: "1/3/2022",
      time: "16:05"
    }
  ]);  

  return (
    <div 
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center' , 
        width: '150%'}
    }>
        <div style={{display: 'flex', width: '45%'}}>
          <p className='title left' style={{width: '100%',fontSize: '26px'}}>Promote Submission List</p>
        </div>
        {dummyRequestList.map(e => (
          <RequestBox 
            name={e.firstName + "  " + e.lastName} 
            date={e.date + "  " + e.time} 
          />
        ))}
    </div>
  );
};

export default ChangeAccountRequestListPage;
