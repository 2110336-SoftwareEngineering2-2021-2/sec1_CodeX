import React from "react"
import ReportCard from "./ReportCard";
import ReportDetailModal from "./ReportDetailModal";
import "./report.css"
import { Spinner } from "react-bootstrap";
import COLORS from "../../constants/color";
import { DESK } from "../../constants/image"
import ConfirmBanModal from "./ConfirmBanModal";
import ConfirmIgnoreModal from "./ConfirmIgnoreModal";


class AdminBanUI extends React.Component{
    constructor(prop) {
        super(prop);
    }
    state = {
        isLoading: false,
        isSomethingWentWrong: false,
        isReportDetailModalShow: false,
        isConfirmBanModalShow: false,
        confirmBanModalStatus: "normal", // normal | sending | success | fail
        isConfirmIgnoreModalShow: false,
        confirmIgnoreModalStatus: "normal", // normal | sending | success | fail
        banDuration: 0,
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
                    firstName: "Nobi1",
                    lastName: "Nobita"
                },

                text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
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
                    firstName: "Nobi2",
                    lastName: "Nobita"
                },

                text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
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
                    firstName: "Nobi3",
                    lastName: "Nobita"
                },

                text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
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
                    firstName: "Nobi4",
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
                    firstName: "Nobi5",
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
                    firstName: "Nobi6",
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
                    firstName: "Nobi8",
                    lastName: "Nobita"
                },

                text: "สอนแย่มาก",
                createdAt: "2022-04-04T18:00:33.538+00:00",
                status: "Pending",
                imageURL: "https://i.ytimg.com/vi/SQ8nV_PaSss/hqdefault.jpg",
            },
        ]
    }

    showConfirmBanModal = (duration) => {
        this.setState({
            banDuration: duration, 
            isReportDetailModalShow: false,
            isConfirmBanModalShow: true
        });
        console.log("call showConfirmBanModal",duration);
    }

    showConfirmIgnoreModal = () => {
        this.setState({
            isReportDetailModalShow: false,
            isConfirmIgnoreModalShow: true
        });
    }

    fetchReportList = async() => {
        this.setState({isLoading: true, isSomethingWentWrong: false})
        await client({
            method: 'GET',
            url: `/report`,
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        })
        .then(({ data: { data } }) => {
            console.log(data);
            this.setState({
                reportList: data, 
                isLoading: false, 
                isSomethingWentWrong: false
            })
        })
        .catch((res) => {
            console.log(res);
            this.setState({ 
                isLoading: false, 
                isSomethingWentWrong: true
            })
        });
    }

    onClickBanButton = (target_id)=> {
        console.log("call onClickBanButton");
        // this.setState({confirmBanModalStatus: "normal"})
        // this.setState({confirmBanModalStatus: "sending"})
        this.setState({confirmBanModalStatus: "success"})
        // this.setState({confirmBanModalStatus: "fail"})
        return null
    }

    onDeleteReport = (_id) => {
        console.log("call onDeleteReport");
        // this,this.setState({confirmIgnoreModalStatus: "normal"})
        // this,this.setState({confirmIgnoreModalStatus: "sending"})
        this,this.setState({confirmIgnoreModalStatus: "success"})
        // this,this.setState({confirmIgnoreModalStatus: "fail"})
        return null
    }

    render() {
        return ( 
            <div className="ban-unban-container">

                <div className="flex-row gap5" style={{justifyContent:"center"}}>
                    <button 
                        className="outline-gray-button" 
                        onClick={() => (this.setState({isLoading: !this.state.isLoading}))}
                        >
                        toggleLoading
                    </button>
                    <button 
                        className="outline-gray-button" 
                        onClick={() => (this.setState({reportList: []}))}
                        >
                        setEmpty
                    </button>
                    <button 
                        className="outline-gray-button" 
                        onClick={() => (this.setState({isSomethingWentWrong: !this.state.isSomethingWentWrong}))}
                        >
                        toggleSomethingWentWrong
                    </button>
                </div>

                {this.state.isLoading ? 
                    <div className="loading_spinner" style={{marginBottom:"20px", width:"100%", height:"auto"}} >
                        <Spinner
                            animation="border"
                            role="status"
                            style={{ marginBottom: '2vh' }}
                        >
                            <span className="visually-hidden">Loading...</span>
                        </Spinner>
                        <h4 style={{ color: COLORS.darkgray }}>Loading</h4>
                    </div>
                :
                    <div className="card-list-container">
                        {this.state.isSomethingWentWrong ?
                            <p style={{color:"red", fontSize:"24px", marginTop:"10vh", fontWeight:"500"}}>
                                Oop!!? Something went wrong.
                            </p>
                        :
                            <>
                                {this.state.reportList.length === 0 &&
                                    <div id="place-hover-empty-image">
                                        <img src={DESK}/>
                                        <p>We don't have any report</p>
                                    </div>
                                }
                                {this.state.reportList.map((e,i) => (
                                    <ReportCard 
                                        reportingName={e.target.firstName + " " + e.target.lastName}
                                        reporterName={e.reporter.firstName + " " + e.reporter.lastName}
                                        timeStamp={e.createdAt}
                                        onClickCard={() => (
                                            this.setState({
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
                            </>
                        }
                    </div>
                }
                {this.state.isReportDetailModalShow &&
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

                        onClickBanBtn={this.showConfirmBanModal}
                        onClickIgnoreBtn={this.showConfirmIgnoreModal}
                    />
                }
                {this.state.isConfirmBanModalShow &&
                    <ConfirmBanModal 
                        onHide={() => (this.setState({isConfirmBanModalShow: false, isReportDetailModalShow: true}))}
                        targetName={this.state.reportDetailModalData.reportingName}
                        duration={this.state.banDuration}
                        status={this.state.confirmBanModalStatus}
                        onClickConfirmBtn={() => (this.onClickBanButton(this.state.duration))}
                    />
                }
                {this.state.isConfirmIgnoreModalShow &&
                    <ConfirmIgnoreModal 
                        onHide={() => (this.setState({isConfirmIgnoreModalShow: false, isReportDetailModalShow: true}))}
                        status={this.state.confirmIgnoreModalStatus}
                        onClickConfirmBtn={() => (this.onDeleteReport(this.state.reportDetailModalData.reportId))}
                    />
                }
            </div>
        )
    }
}

export default AdminBanUI
