import { IoIosInformation } from 'react-icons/io';
import { ImCross } from 'react-icons/im';

import COLORS from '../../../constants/color';
import SUBJECTS from '../../../constants/subjects';

const Slot = ({
  slotDataList,
  viewType,
  _id,
  isSelected,
  isX,
  whenClick,
  onViewInfo,
  day,
  viewOnly,
}) => {
  // viewType => "TutorSelf" | "TutorOther" //
  /*
    slotDataList: {
      slot: number start from 0 - 15 (8.00 - 23.00)
      subject: string
      description: string
      students: {id, firstName, lastName, status}[]
    }[]
  */

  const status =
    slotDataList && slotDataList[0]
      ? slotDataList[0].students?.find((student) => student.id === _id)?.status
      : null;

  const getSlotStyle = () => {
    // 4 Options: slot-tutor, slot-student, slot-active-tutor, slot-active-student //
    // Don't show effects (when student is already Pending or Approve) or (in view only mode)
    if (status || viewOnly) return null;
    // Can't click if 'Pending' or 'Approved'
    else if (viewType === 'TutorSelf') {
      if (isSelected) return 'slot-active-tutor'; // Show green block
      return 'slot-tutor'; // Show light green background when hover
    } else if (viewType === 'TutorOther') {
      if (isSelected) return 'slot-active-student';
      // Show orange block
      else if (slotDataList) return 'slot-student'; // Show light orange background when hover
    }
    return null; // no effect (can't click anything on this slot)
  };

  const onClick = () => {
    if (viewType === 'TutorSelf' || (slotDataList && !status)) whenClick();
  };

  if (isX) {
    // render X slot (Only use on Night Time) //
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
        }}
      >
        <ImCross size={24} color={COLORS.lightgray} />
      </div>
    );
  }

  return (
    <div
      className={getSlotStyle()}
      onClick={!viewOnly ? onClick : null}
      style={{ display: 'flex', flexDirection: 'column' }}
    >
      {slotDataList ? (
        <div style={{ textAlign: 'right' }}>
          <IoIosInformation
            size={24}
            className="hover-icon"
            onClick={
              onViewInfo ? () => onViewInfo({ slotDataList, day }) : null
            }
          />
        </div>
      ) : null}
      <p>
        {slotDataList && slotDataList[0].subject
          ? SUBJECTS[slotDataList[0].subject]
          : ' '}
      </p>
      {/* If this is student view and student is a member of the slot */}
      {viewType === 'TutorOther' && status ? (
        <p
          style={{
            color: status === 'Approved' ? COLORS.third : COLORS.orange,
          }}
        >
          {status}
        </p>
      ) : null}
    </div>
  );
};

export default Slot;
