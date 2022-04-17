import { Modal } from "react-bootstrap";
import COLORS from "../../constants/color";
import "./report.css"

const ConfirmIgnoreModal = (props) => {
    const {onHide, status, onClickConfirmBtn, onAcknowledge} = props;

    const genConfigWithStatus = () => {
        switch (status) {
            case "normal": 
                return {
                    title: "Are you sure?",
                    titleColor: COLORS.darkgray,
                    body: "If you click confirm button, this report will be delete ?",
                    closeBtnText: "Cancel",
                    closeBtnStyle: "outline-gray-button"
                }
            case "sending": 
                return {
                    title: "Sending your ban request....",
                    titleColor: COLORS.darkgray,
                    body: "Please wait a minite for sending request",
                    closeBtnText: "Sending",
                    closeBtnStyle: "outline-gray-button"
                }
            case "success": 
                return {
                    title: "Success",
                    titleColor: COLORS.third,
                    body: "Your delete report request success",
                    closeBtnText: "OK",
                    closeBtnStyle: "acknowledge-button"
                }
            case "fail":
                return {
                    title: "Oop.. incomplete",
                    titleColor: "red",
                    body: "Something went wrong your request fail.",
                    closeBtnText: "OK",
                    closeBtnStyle: "acknowledge-button"
                }
            default :
                return {
                    title: "...",
                    titleColor: "red",
                    body: "......",
                    closeBtnText: ".....",
                    closeBtnStyle: "acknowledge-button"
                }
        }
    }

    return (
        <Modal
            show={true}
            backdrop="static"
            onHide={() => (status === "normal" ? onHide() : onAcknowledge())}
            keyboard={false}
            animation={false}
            centered
        >
            <Modal.Header closeButton>
                <p style={{fontSize:"24px", fontWeight:"500", color:genConfigWithStatus().titleColor}}>
                    {genConfigWithStatus().title}
                </p>
            </Modal.Header>

            <Modal.Body>
                <p>{genConfigWithStatus().body}</p>
            </Modal.Body>

            <Modal.Footer>
                {status === "normal" &&
                    <button className="ignore-button"
                        onClick={onClickConfirmBtn}
                    >
                        Confirm & Delete
                    </button>
                }
                {status === "sending" ?
                    <button className="outline-gray-button" style={{opacity:"0.3"}}>
                        Sending...
                    </button>
                :
                    <button className={genConfigWithStatus().closeBtnStyle}
                        onClick={() => (status === "normal" ? onHide() : onAcknowledge())}
                    >
                        {genConfigWithStatus().closeBtnText}
                    </button>
                }
            </Modal.Footer>
        </Modal>
    )
}

export default ConfirmIgnoreModal
