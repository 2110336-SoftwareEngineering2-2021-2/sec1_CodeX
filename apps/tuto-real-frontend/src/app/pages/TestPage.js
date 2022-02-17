import React, { useState } from 'react'
import EditingSlotModal from '../components/modal/EditingSlotModal'
import ViewingSlotModal from '../components/modal/ViewingSlotModal'

const TestPage = () => {

  const [show1, setShow1] = useState(false)
  const [show2, setShow2] = useState(false)
  const studentList = [
    'You',
    'Are',
    'Such',
    'A',
    'Nice',
    'Person'
  ]

  return (
    <div>
        <button onClick={() => {setShow1(true)}}>
          test1
        </button>

        <button onClick={() => {setShow2(true)}}>
          test2
        </button>


        <EditingSlotModal 
          show={show1}
          setShow={setShow1}
          subjectIn='Art'
          descriptionIn=''
        />

        <ViewingSlotModal 
          show={show2}
          setShow={setShow2}
          number='4' 
          subject='Art'
          description='眠い'
          studentList={studentList}
        />
    </div>
  )
}

export default TestPage