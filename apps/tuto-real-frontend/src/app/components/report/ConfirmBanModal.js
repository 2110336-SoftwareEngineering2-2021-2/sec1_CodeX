import { Modal } from "react-bootstrap";
import COLORS from "../../constants/color";
import "./report.css"

const ConfirmBanModal = (props) => {
    const {
        onHide, 
        onClickConfirmBtn, 
        duration, 
        onAcknowledge,
        status,
        targetName} = props;
    
    const genConfigWithStatus = () => {
        switch (status) {
            case "normal": 
                return {
                    title: "Are you sure?",
                    titleColor: COLORS.darkgray,
                    body: "",
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
                    body: targetName + " become banned user.",
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
                {status === "normal" &&
                    <p>If you click confirm button, <b className="text-highlight">{targetName}</b> will be banned ? ( increase ban duration <b className="text-highlight">{duration}</b> hour )</p>
                }

            </Modal.Body>

            <Modal.Footer>
                {status === "normal" &&
                    <button className="ban-button"
                        onClick={onClickConfirmBtn}
                    >
                        Confirm & Ban
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

export default ConfirmBanModal
