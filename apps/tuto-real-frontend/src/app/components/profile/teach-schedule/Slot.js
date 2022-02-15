import {IoIosInformation} from 'react-icons/io'
import COLORS from '../../../constants/color'


const Slot = ({slotData, viewType}) => {

  const getSlotColor = (status) => {
    // slot-tutor, slot-student, slot-active-tutor, slot-active-student //
    switch(status) {
      case "tutorSelect": return "slot-active-tutor"
      case "studentSelect": return "slot-active-student"
      case "available":
        if(viewType === "TutorSelf") return "slot-tutor"
        else if(viewType === "TutorOther") return "slot-student"
        return null
      default: 
        if(viewType === "TutorSelf") return "slot-tutor"
        return null
    }
  }

  return (
    <div className={getSlotColor(slotData?.status)} style={{display: 'flex', flexDirection: 'column'}}>
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