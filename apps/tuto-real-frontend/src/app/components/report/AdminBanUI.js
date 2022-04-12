import React from "react"
import ReportCard from "./ReportCard";
import { Modal, Button } from "react-bootstrap"
import BookingActionModal from "../navbar/BookingActionModal";
import ModalTwoButton from "../modal/ModalTwoButton";
import ReportDetailModal from "./ReportDetailModal";
import "./report.css"


class AdminBanUI extends React.Component{
    constructor(prop) {
        super(prop);
    }
    state = {
        testText: "this is AdminBanUI",
        isReportDetailModalShow: false,
        reportDetailModalData: {
            reportId: "",
            reportingName: "",
            reportingId: "",
            reporterName: "",
            reporterId: "",
            
            createdAt: "",
            status: "",
            text: "",
            imageURL: "",
        },
        reportList: [
            {
                _id: "624acfd1e46797011adbc33d",
                reporter: {
                    _id: "6205e4b0a5dc5a9a775b9c7c",
                    firstName: "Takeshi",
                    lastName: "Giant"
                },
                target: {
                    _id: "6205e3c8618b7d42c9935d03",
                    firstName: "Nobi",
                    lastName: "Nobita"
                },

                text: "สอนแย่มาก",
                createdAt: "2022-04-04T18:00:33.538+00:00",
                status: "Pending",
                imageURL: "https://i.ytimg.com/vi/SQ8nV_PaSss/hqdefault.jpg",
            },
            {
                _id: "624acfd1e46797011adbc33d",
                reporter: {
                    _id: "6205e4b0a5dc5a9a775b9c7c",
                    firstName: "Takeshi",
                    lastName: "Giant"
                },
                target: {
                    _id: "6205e3c8618b7d42c9935d03",
                    firstName: "Nobi",
                    lastName: "Nobita"
                },

                text: "สอนแย่มาก",
                createdAt: "2022-04-04T18:00:33.538+00:00",
                status: "Pending",
                imageURL: "https://i.ytimg.com/vi/SQ8nV_PaSss/hqdefault.jpg",
            },
            {
                _id: "624acfd1e46797011adbc33d",
                reporter: {
                    _id: "6205e4b0a5dc5a9a775b9c7c",
                    firstName: "Takeshi",
                    lastName: "Giant"
                },
                target: {
                    _id: "6205e3c8618b7d42c9935d03",
                    firstName: "Nobi",
                    lastName: "Nobita"
                },

                text: "สอนแย่มาก",
                createdAt: "2022-04-04T18:00:33.538+00:00",
                status: "Pending",
                imageURL: "https://i.ytimg.com/vi/SQ8nV_PaSss/hqdefault.jpg",
            },
            {
                _id: "624acfd1e46797011adbc33d",
                reporter: {
                    _id: "6205e4b0a5dc5a9a775b9c7c",
                    firstName: "Takeshi",
                    lastName: "Giant"
                },
                target: {
                    _id: "6205e3c8618b7d42c9935d03",
                    firstName: "Nobi",
                    lastName: "Nobita"
                },

                text: "สอนแย่มาก",
                createdAt: "2022-04-04T18:00:33.538+00:00",
                status: "Pending",
                imageURL: "https://i.ytimg.com/vi/SQ8nV_PaSss/hqdefault.jpg",
            },
            {
                _id: "624acfd1e46797011adbc33d",
                reporter: {
                    _id: "6205e4b0a5dc5a9a775b9c7c",
                    firstName: "Takeshi",
                    lastName: "Giant"
                },
                target: {
                    _id: "6205e3c8618b7d42c9935d03",
                    firstName: "Nobi",
                    lastName: "Nobita"
                },

                text: "สอนแย่มาก",
                createdAt: "2022-04-04T18:00:33.538+00:00",
                status: "Pending",
                imageURL: "https://i.ytimg.com/vi/SQ8nV_PaSss/hqdefault.jpg",
            },
            {
                _id: "624acfd1e46797011adbc33d",
                reporter: {
                    _id: "6205e4b0a5dc5a9a775b9c7c",
                    firstName: "Takeshi",
                    lastName: "Giant"
                },
                target: {
                    _id: "6205e3c8618b7d42c9935d03",
                    firstName: "Nobi",
                    lastName: "Nobita"
                },

                text: "สอนแย่มาก",
                createdAt: "2022-04-04T18:00:33.538+00:00",
                status: "Pending",
                imageURL: "https://i.ytimg.com/vi/SQ8nV_PaSss/hqdefault.jpg",
            },
            {
                _id: "624acfd1e46797011adbc33d",
                reporter: {
                    _id: "6205e4b0a5dc5a9a775b9c7c",
                    firstName: "Takeshi",
                    lastName: "Giant"
                },
                target: {
                    _id: "6205e3c8618b7d42c9935d03",
                    firstName: "Nobieeee",
                    lastName: "Nobita"
                },

                text: "สอนแย่มาก",
                createdAt: "2022-04-04T18:00:33.538+00:00",
                status: "Pending",
                imageURL: "https://i.ytimg.com/vi/SQ8nV_PaSss/hqdefault.jpg",
            },
            {
                _id: "624acfd1e46797011adbc33d",
                reporter: {
                    _id: "6205e4b0a5dc5a9a775b9c7c",
                    firstName: "Takeshi",
                    lastName: "Giant"
                },
                target: {
                    _id: "6205e3c8618b7d42c9935d03",
                    firstName: "Nobi",
                    lastName: "Nobita"
                },

                text: "สอนแย่มาก",
                createdAt: "2022-04-04T18:00:33.538+00:00",
                status: "Pending",
                imageURL: "https://i.ytimg.com/vi/SQ8nV_PaSss/hqdefault.jpg",
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
            <div className="report-list-container">

                {this.state.reportList.map((e,i) => (
                    <ReportCard 
                        reportingName={e.target.firstName + " " + e.target.lastName}
                        reporterName={e.reporter.firstName + " " + e.reporter.lastName}
                        timeStamp={e.createdAt}
                        onClickCard={() => (
                            this.setState({
                                // reportId: "",
                                // reportingName: "",
                                // reportingId: "",
                                // reporterName: "",
                                // reporterId: "",
                                
                                // createdAt: "",
                                // status: "",
                                // text: "",
                                // imageURL: "",
                                reportDetailModalData: {
                                    reportId: e._id,
                                    reportingName: e.target.firstName + " " + e.target.lastName,
                                    reportingId: e.target._id,
                                    reporterName: e.reporter.firstName + " " + e.reporter.lastName,
                                    reporterId: e.reporter._id,

                                    createdAt: e.createdAt,
                                    status: e.status,
                                    text: e.text,
                                    imageURL: e.imageURL,
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
                    <ReportDetailModal 
                        onHide={() => (this.setState({isReportDetailModalShow: false}))}
                        reportId={this.state.reportDetailModalData.reportId}
                        reportingName={this.state.reportDetailModalData.reportingName}
                        reportingId={this.state.reportDetailModalData.reportingId}
                        reporterName={this.state.reportDetailModalData.reporterName}
                        reporterId={this.state.reportDetailModalData.reporterId}

                        createdAt={this.state.reportDetailModalData.createdAt}
                        status={this.state.reportDetailModalData.status}
                        text={this.state.reportDetailModalData.text}
                        imageURL={this.state.reportDetailModalData.imageURL}
                    />
                :
                null}
            </div>
        )
    }
}

export default AdminBanUI
