import { Modal, Button } from "react-bootstrap"


const ReportDetailModal = (props) => {
    const {onHide,
        reportId,
        reportingName,
        reportingId,
        reporterName,
        reporterId,
        createdAt,
        status,
        text,
        imageURL} = props;
    return (
        <Modal
            show={true}
            backdrop="static"
            onHide={onHide}
            keyboard={false}
            animation={false}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                Modal heading
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h4>Centered Modal</h4>
                <p>
                Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
                dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
                consectetur ac, vestibulum at eros.
                </p>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ReportDetailModal
