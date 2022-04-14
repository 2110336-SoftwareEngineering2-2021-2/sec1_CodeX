import { Modal } from "react-bootstrap";
import COLORS from "../../constants/color";
import "./report.css"

const ConfirmBanModal = (props) => {
    const {onHide, onClickConfirmBtn, duration, targetName} = props;
    return (
        <Modal
            show={true}
            backdrop="static"
            onHide={onHide}
            keyboard={false}
            animation={false}
            centered
        >
            <Modal.Header closeButton>
                <p style={{fontSize:"24px", fontWeight:"500", color:COLORS.darkgray}}>
                    Are you sure?
                </p>
            </Modal.Header>

            <Modal.Body>
                <p>If you click confirm button, <b className="text-highlight">{targetName}</b> will be banned ? ( increase ban duration <b className="text-highlight">{duration}</b> hour )</p>

            </Modal.Body>

            <Modal.Footer>
                <button className="outline-gray-button"
                    onClick={onClickConfirmBtn}
                >
                    Confirm & Ban
                </button>
                <button className="outline-gray-button"
                    onClick={onHide}
                >
                    Cancel
                </button>
            </Modal.Footer>
      </Modal>
    )
}

export default ConfirmBanModal
