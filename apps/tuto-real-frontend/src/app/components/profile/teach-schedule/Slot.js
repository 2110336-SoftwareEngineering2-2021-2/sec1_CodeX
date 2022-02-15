import {IoIosInformation} from 'react-icons/io'
import COLORS from '../../../constants/color'


const Slot = ({slotData, viewType, isSelected, whenClick}) => { // viewType => "TutorSelf" | "TutorOther" //

  const getSlotColor = () => { // status: "available" | "disable" | "booked" | "pending" | "x" //
    // slot-tutor, slot-student, slot-active-tutor, slot-active-student //
    if(viewType === "TutorSelf") {
      if(isSelected) return "slot-active-tutor"
      return "slot-tutor"
    } else if(viewType === "TutorOther") {
      if(isSelected) return "slot-active-student"
      else if(slotData?.status === "available") return "slot-student"
    } else return null
  }

  return (
    <div className={getSlotColor()} onClick={whenClick} style={{display: 'flex', flexDirection: 'column'}}>
      <div style={{textAlign: "right"}}>
          <IoIosInformation size={24} className="hover-icon" />
      </div>
      <p>{slotData?.subject}</p>
      {slotData?.status === "booked" || slotData?.status === "pending" ? (
        <p style={{color: slotData?.status === "booked"? COLORS.third: COLORS.orange}}>{slotData?.status === "booked"? "Booked": "Pending"}</p>
      ): null}
    </div>
  )
}

export default Slot