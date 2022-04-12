import React from "react"
import ReportCard from "./ReportCard";
import { Modal, Button } from "react-bootstrap"
import BookingActionModal from "../navbar/BookingActionModal";
import ModalTwoButton from "../modal/ModalTwoButton";
import ReportDetailModal from "./ReportDetailModal";


class AdminBanUI extends React.Component{
    constructor(prop) {
        super(prop);
    }
    state = {
        testText: "this is AdminBanUI",
        isReportDetailModalShow: false,
        reportDetailModalData: {
            reportId: "",
            reportingName: "Nobi Nobita",
            reportingId: "6205e3c8618b7d42c9935d03",
            reporterName: "Takeshi Giant",
            reporterId: "6205e4b0a5dc5a9a775b9c7c",
            timeStamp: "2022-04-04T18:00:33.538+00:00",

            reportInfo: "สอนแย่มาก",
            reportUrl: "http://localhost:4200/userReport",
        },
        reportList: [
            {
                _id: "624acfd1e46797011adbc33d",
                reportingName: "Nobi Nobita",
                reportingId: "6205e3c8618b7d42c9935d03",
                reporterName: "Takeshi Giant",
                reporterId: "6205e4b0a5dc5a9a775b9c7c",
                timeStamp: "2022-04-04T18:00:33.538+00:00",

                reportInfo: "สอนแย่มาก",
                reportUrl: "http://localhost:4200/userReport",
            },
            {
                _id: "624acfd1e46797011adbc33d",
                reportingName: "Nobi Nobita",
                reportingId: "6205e3c8618b7d42c9935d03",
                reporterName: "Takeshi Giant",
                reporterId: "6205e4b0a5dc5a9a775b9c7c",
                timeStamp: "2022-04-04T18:00:33.538+00:00",

                reportInfo: "สอนแย่มาก",
                reportUrl: "http://localhost:4200/userReport",
            },
            {
                _id: "624acfd1e46797011adbc33d",
                reportingName: "Nobi Nobita",
                reportingId: "6205e3c8618b7d42c9935d03",
                reporterName: "Takeshi Giant",
                reporterId: "6205e4b0a5dc5a9a775b9c7c",
                timeStamp: "2022-04-04T18:00:33.538+00:00",

                reportInfo: "สอนแย่มาก",
                reportUrl: "http://localhost:4200/userReport",
            },
        ]
    }

    testButtonHandler() {
        this.setState({testText: "1111"})
    }

    fetchReportList() {

    }

    onClickBanButton(target_id) {
        return null
    }

    onDeleteReport(_id) {
        return null
    }

    render() {
        return ( 
            <div>
                {/* <p>{this.state.testText}</p>
                <button onClick={() => {this.testButtonHandler()}}>
                    test
                </button> */}
                {this.state.reportList.map((e,i) => (
                    <ReportCard 
                        reportId={e._id}
                        reportingName={e.reportingName}
                        reportingId={e.reportingId}
                        reporterName={e.reporterName}
                        reporterId={e.reporterId}
                        timeStamp={e.timeStamp}
                        reportInfo={e.reportInfo}
                        reportUrl={e.reportUrl}
                        onClickCard={() => (
                            this.setState({
                                reportDetailModalData: {
                                    reportId: e._id,
                                    reportingName: e.reportingName,
                                    reportingId: e.reportingId,
                                    reporterName: e.reporterName,
                                    reporterId: e.reporterId,
                                    timeStamp: e.timeStamp,
                                    reportInfo: e.reportInfo,
                                    reportUrl: e.reportUrl,
                                },
                                isReportDetailModalShow: true
                            })
                        )}
                    />
                ))}
                <button 
                    onClick={() => (this.setState({isReportDetailModalShow: !this.state.isReportDetailModalShow}))}
                >
                    show modal
                </button>
                {this.state.isReportDetailModalShow ?
                // <ModalTwoButton
                //     title="1234"
                //     header="1234"
                //     // leftFunc={handleLeft}
                //     // rightFunc={handleRight}
                //     leftMessage="Confirm"
                //     rightMessage="Cancel"
                //     leftColor="black"
                //     rightColor="cancel-button"
                //     // isPending={isPending}
                //     leftPending="Confirm..."
                //     leftPendingColor="var(--lightgray)"
                // />
                <ReportDetailModal onHide={() => (this.setState({isReportDetailModalShow: !this.state.isReportDetailModalShow}))}/>
                :
                null}
            </div>
        )
    }
}

// const ReportDetailModal = (props) => {
//     return (
//         <Modal
//             size="lg"
//             aria-labelledby="contained-modal-title-vcenter"
//             centered
//             >
//             <Modal.Header closeButton>
//                 <Modal.Title id="contained-modal-title-vcenter">
//                 Modal heading
//                 </Modal.Title>
//             </Modal.Header>
//             <Modal.Body>
//                 <h4>Centered Modal</h4>
//                 <p>
//                 Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
//                 dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
//                 consectetur ac, vestibulum at eros.
//                 </p>
//             </Modal.Body>
//             <Modal.Footer>
//                 <Button onClick={props.onHide}>Close</Button>
//             </Modal.Footer>
//         </Modal>
//     )
// }


export default AdminBanUI