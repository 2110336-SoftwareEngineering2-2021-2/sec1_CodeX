import './navbar.css'
import ModalTwoButton from '../modal/ModalTwoButton'
import { useState } from 'react'
import { client } from '../../axiosConfig'

const BookingActionModal = (prop) => {
    const  {modalConfig,
            setModalConfig,
            setBookingOverlayShow,
            setBookingRequestOverlayShow
        } = prop

    const [isPending, setIsPending] = useState(false)
    
    const genActionConfig = () => {
        switch(modalConfig.modalType) {
            case 'Cancel':
                return {
                    title: 'Do you want to cancel your booking?',
                    description: `If you click confirm button, your booking ( with ${modalConfig.targetName} ) will be cancelled. `,
                    confirmBtnColor: "var(--yellow)"
                }
            case 'Approve':
                return {
                    title: 'Do you want to approve the booking?',
                    description: `If you click confirm button, that ( ${modalConfig.targetName} ) will become a member of your course. `,
                    confirmBtnColor: "var(--third)"
                }
            case 'Reject':
                return {
                    title: 'Do you want to reject the booking?',
                    description: `If you click confirm button, the booking request ( of ${modalConfig.targetName} ) will be rejected. `,
                    confirmBtnColor: "var(--warning)"
                }
            default:
                return {
                    title: 'Something went wrong.',
                    description: 'Something went wrong..',
                    confirmBtnColor: "var(--warning)"
                }
        }
    }

    const handleRight = () => {
        if (modalConfig.modalType === "Cancel") {
            setBookingOverlayShow(true);
            setModalConfig({
                modalType: "None",
                bookingId: "",
                targetName:""
            });
        } else if (modalConfig.modalType === "Approve" || modalConfig.modalType === "Reject") {
            setBookingRequestOverlayShow(true);
            setModalConfig({
                modalType: "None",
                bookingId: "",
                targetName:""
            });
        }
    }

    const translateCommand = () => {
        
    }

    const handleLeft = () => {
        setIsPending(true);
        switch(modalConfig.modalType) {
            case 'Cancel': {
                sendUpdateBooking("Cancelled");
                return
            }
            case 'Approve': {
                sendUpdateBooking("Approved");
                return
            }
            case 'Reject': {
                sendUpdateBooking("Reject");
                return
            }
            default: return
        }
    }

    const sendUpdateBooking = async (toBeStatus) => {
        console.log('sending update booking:', modalConfig.bookingId);
        console.log('expect to be:', toBeStatus);
        await client({
            method: 'PATCH',
            url: `/booking`,
            // url: `/user`,
            params: {
                _id: modalConfig.bookingId,
            },
            data: {
               status: toBeStatus
            }
        })
        .then(({ data: { data } }) => {
            console.log('data response', data);
            handleRight()
        })
        .catch((res) => {
            console.log(res);
        });
    };
    
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