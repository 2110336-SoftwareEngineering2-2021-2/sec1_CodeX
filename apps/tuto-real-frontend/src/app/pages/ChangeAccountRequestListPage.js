import React, { useCallback, useEffect } from 'react';
import RequestBox from '../components/requestlist/RequestBox';
import { useState } from 'react';
import { client } from '../axiosConfig';

const ChangeAccountRequestListPage = () => { 

  //data
  const [dataList,setDataList] = useState(null)
  const [isPending,setIsPending] = useState(true)

  //get func
  const fetchData = useCallback( () => {
    client({
      method: "GET",
      url: '/tutorReq'
    })
    .then(({data}) => {
      console.log(data)
      setDataList(data)
      setIsPending(false)
    },[])
    .catch((res) => {
      console.log(res)
    },)
  })

  useEffect( () => {
    fetchData()
  },[])

  return (
    <div 
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center' , 
        width: '150%'}
      }>

        {/* title */}
        <div style={{display: 'flex', width: '45%'}}>
          <p className='title left' style={{width: '100%',fontSize: 'xx-large'}}>Promote Submission List</p>
        </div>

        {/* request box */}
        {!isPending && dataList.map(e => (
          <RequestBox 
            key={e.email}
            name={e.firstName + " " + e.lastName}  
            date={
              e.timeStamp.substr(8,2)+"/"
              +e.timeStamp.substr(5,2)+"/"
              +e.timeStamp.substr(0,4)+" "
              +e.timeStamp.substr(11,5)
            }
            _id={e._id}
            citizenID={e.citizenID}
            transcription={e.transcription}
            email={e.email}
          />
        ))}
        
    </div>
  );
};

export default ChangeAccountRequestListPage;
