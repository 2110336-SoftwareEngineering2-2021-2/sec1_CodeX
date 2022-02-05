import React, { useCallback, useEffect } from 'react';
import RequestBox from '../components/requestlist/RequestBox';
import { useState } from 'react';
import { client } from '../axiosConfig';

const ChangeAccountRequestListPage = () => {
  // const [dummyRequestList, setDummyRequestList] = useState([
  //   {
  //     firstName: "kharit1",
  //     lastName: "123",
  //     date: "1/1/2022",
  //     time: "16:03"
  //   },
  //   {
  //     firstName: "kharit2",
  //     lastName: "1234",
  //     date: "1/2/2022",
  //     time: "16:04"
  //   },
  //   {
  //     firstName: "kharit3",
  //     lastName: "1235",
  //     date: "1/3/2022",
  //     time: "16:05"
  //   }
  // ]);  

  const [dataList,setDataList] = useState(null)
  const [isPending,setIsPending] = useState(true)

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

  // const check = () => {
  //   dummy.map( (e) => {
  //     return console.log(e)
  //   })
  // }

  return (
    <div 
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center' , 
        width: '150%'}
    }>
        <div style={{display: 'flex', width: '45%'}}>
          <p className='title left' style={{width: '100%',fontSize: 'xx-large'}}>Promote Submission List</p>
        </div>
        {isPending && <p>Loading...</p>}
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
          />
        ))}
        {/* <button onClick={check}>check</button> */}
    </div>
  );
};

export default ChangeAccountRequestListPage;
