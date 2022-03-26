import './navbar.css'
import ModalTwoButton from '../modal/ModalTwoButton'
import { useState } from 'react'

const BookingActionModal = (prop) => {
    const {actionType,
            setActionType,
            bookingId,
            setBookingOverlayShow,
            setBookingRequestOverlayShow
        } = prop

    const [isPending, setIsPending] = useState(false)
    
    const genActionConfig = () => {
        switch(actionType) {
            case 'Cancel':
                return {
                    title: 'Do you want to cancel your booking?',
                    description: 'If you click confirm button, the following change will be applied to the booking request.',
                    confirmBtnColor: "var(--yellow)"
                }
            case 'Approve':
                return {
                    title: 'Do you want to approve the booking?',
                    description: 'If you click confirm button, that user will become a member of your course. ',
                    confirmBtnColor: "var(--third)"
                }
            case 'Reject':
                return {
                    title: 'Do you want to reject the booking?',
                    description: 'If you click confirm button, the booking request will be rejected.',
                    confirmBtnColor: "var(--warning)"
                }
        }
    }

    const handleLeft = () => {

    }
    const handleRight = () => {
        setActionType("None");
        if (actionType === "Cancel") {
            setBookingOverlayShow(true);
        } else if (actionType === "Approve" || actionType === "Reject") {
            setBookingRequestOverlayShow(true);
        }
    }
    return (
        <ModalTwoButton
            title={genActionConfig().title}
            header={genActionConfig().description}
            leftFunc={handleLeft}
            rightFunc={handleRight}
            leftMessage="Confirm"
            rightMessage="Cancel"
            leftColor={genActionConfig().confirmBtnColor}
            rightColor="cancel-button"
            isPending={isPending}
            leftPending="Confirm..."
            leftPendingColor="var(--lightgray)"
        />
    )
}

export default BookingActionModal