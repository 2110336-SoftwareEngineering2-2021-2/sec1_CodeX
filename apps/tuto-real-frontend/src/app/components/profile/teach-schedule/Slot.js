import { IoIosInformation } from 'react-icons/io';
import { ImCross } from 'react-icons/im';
import COLORS from '../../../constants/color';

const Slot = ({
  slotData,
  viewType,
  _id,
  isSelected,
  isX,
  whenClick,
  onViewInfo,
}) => {
  // viewType => "TutorSelf" | "TutorOther" //
  /*
    slotData: {
      slot: number start from 0 - 15 (8.00 - 23.00)
      subject: string
      description: string
      students: {id, firstName, lastName, status}[]
    }
  */

  const student = slotData?.students.find((student) => student.id === _id);

  const getSlotStyle = () => {
    // slot-tutor, slot-student, slot-active-tutor, slot-active-student //
    if (student) return null;
    // Can't click if 'Pending' or 'Approved'
    else if (viewType === 'TutorSelf') {
      if (isSelected) return 'slot-active-tutor'; // Show green block
      return 'slot-tutor'; // Show light green background when hover
    } else if (viewType === 'TutorOther') {
      if (isSelected) return 'slot-active-student';
      // Show orange block
      else if (slotData) return 'slot-student'; // Show light orange background when hover
    }
    return null; // no effect (can't click anything on this slot)
  };

  const onClick = () => {
    if (viewType === 'TutorSelf' || (slotData && !student)) whenClick();
  };

  if (isX) {
    // render X slot (Only use on Night Time) //
    return (
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <ImCross size={24} color={COLORS.darkgray} />
      </div>
    );
  }

  return (
    <div
      className={getSlotStyle()}
      onClick={onClick}
      style={{ display: 'flex', flexDirection: 'column' }}
    >
      {slotData ? (
        <div style={{ textAlign: 'right' }} onClick={ () => onViewInfo(slotData) ?? null}>
          <IoIosInformation size={24} className="hover-icon" />
        </div>
      ) : null}
      <p>{slotData?.subject}</p>
      {/* If this is student view and student is a member of the slot */}
      {viewType === 'TutorOther' && student ? (
        <p
          style={{
            color: student.status === 'Approved' ? COLORS.third : COLORS.orange,
          }}
        >
          {student.status}
        </p>
      ) : null}
    </div>
  );
};

export default Slot;
