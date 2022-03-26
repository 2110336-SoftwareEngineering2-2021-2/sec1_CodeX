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
            title="Do you want to approve the booking?"
            header="If you click confirm button, that user will become a member of your course."
            leftFunc={handleLeft}
            rightFunc={handleRight}
            leftMessage="Confirm"
            rightMessage="Cancel"
            leftColor="var(--third)"
            rightColor="cancel-button"
            isPending={isPending}
            leftPending="Confirm..."
            leftPendingColor="var(--lightgray)"
        />
    )
}

export default BookingActionModal