import {IoIosInformation} from 'react-icons/io'
import {ImCross} from 'react-icons/im'
import COLORS from '../../../constants/color'


const Slot = ({slotData, viewType, _id, isSelected, isX, whenClick, onViewInfo}) => { // viewType => "TutorSelf" | "TutorOther" //
  /*
    slotData: {
      slot: number start from 0 - 15 (8.00 - 23.00)
      subject: string
      description: string
      students: {id, firstName, lastName, status}[]
    }
  */

  const student = slotData?.students.find(student => student.id === _id)

  const getSlotColor = () => {
    // slot-tutor, slot-student, slot-active-tutor, slot-active-student //
    if(viewType === "TutorSelf") {
      if(isSelected) return "slot-active-tutor"
      return "slot-tutor"
    } else if(viewType === "TutorOther") {
      if(isSelected) return "slot-active-student"
      else if(slotData) return "slot-student"
    }
    return null
  }

  const onClick = () => {
    if(viewType === "TutorSelf" || slotData) whenClick()
  }

  if(isX) {
    return (
      <div style={{display: 'flex', flexDirection: 'column'}}>
        <ImCross size={24} color={COLORS.darkgray} />
      </div>
    )
  }

  return (
    <div className={getSlotColor()} onClick={onClick} style={{display: 'flex', flexDirection: 'column'}}>
      {slotData? (
        <div style={{textAlign: "right"}} onClick={onViewInfo ?? null}>
          <IoIosInformation size={24} className="hover-icon" />
        </div>
      ): null}
      <p>{slotData?.subject}</p>
      {/* If this is student view and student is a member of the slot */}
      {viewType === "TutorOther" && student ? (
        <p style={{color: student.status === "Approved"? COLORS.third: COLORS.orange}}>{student.status}</p>
      ): null}
    </div>
  )
}

export default Slot