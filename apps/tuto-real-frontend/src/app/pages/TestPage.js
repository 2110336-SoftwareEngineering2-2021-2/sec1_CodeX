import React, { useState } from 'react'
import EditingSlotModal from '../components/modal/EditingSlotModal'
import ViewingSlotModal from '../components/modal/ViewingSlotModal'

const TestPage = () => {

  const [show, setShow] = useState(false)

  return (
    <div>
        <button onClick={() => {setShow(true)}}>
          test
        </button>


        {/* <EditingSlotModal 
          show={show}
          setShow={setShow}
          subjectIn='Art'
          descriptionIn=''
        /> */}

        <ViewingSlotModal 
          show={show}
          setShow={setShow}
          number='4' 
          subject='Art'
          description='眠い'
        />
    </div>
  )
}

export default TestPage