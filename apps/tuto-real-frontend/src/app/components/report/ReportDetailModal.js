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
            className="report-detail-modal"
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
                <div className="flex-column" style={{gap:"9px"}}>
                    <div className="flex-column">
                        <div className="reporting-name flex-row gap5">
                            <p>Reporting</p>
                            <p style={{color:"red"}}>{reportingName}</p>
                        </div>
                        <p id="id-text">
                            [ reporting user id: {reportingId} ]
                        </p>
                    </div>
                    <div className="flex-column">
                        <div className="reporter-name flex-row gap5">
                            <p style={{fontWeight:"600"}}>from</p>
                            <p>{reporterName}</p>
                        </div>
                        <p id="id-text">
                            [ reporter id: {reporterId} ]
                        </p>
                    </div>
                </div>
            </Modal.Header>
            <Modal.Body>
                <div className="flex-column" style={{gap:"15px"}}>
                    <div className="flex-row gap5" style={{alignItems:"center"}}>
                        <p style={{fontSize:"16px"}}>REPORT DETAILS</p>
                        <p id="id-text">
                            [ report id: {reportId} ]
                        </p>
                    </div>
                    <div className="image-zone">
                        <img src={imageURL}></img>
                    </div>
                    <div className="report-text-container">
                        <p>{text}</p>
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ReportDetailModal
