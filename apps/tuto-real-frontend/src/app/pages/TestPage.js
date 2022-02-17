import React, { useState } from 'react'
import EditingSlotModal from '../components/modal/EditingSlotModal'

const TestPage = () => {

  const [show, setShow] = useState(false)

  return (
    <div>
        <button onClick={() => {setShow(true)}}>
          test
        </button>
        <EditingSlotModal 
          show={show}
          setShow={setShow}
          subjectIn='Art'
          descriptionIn=''
        />
    </div>
  )
}

export default TestPage