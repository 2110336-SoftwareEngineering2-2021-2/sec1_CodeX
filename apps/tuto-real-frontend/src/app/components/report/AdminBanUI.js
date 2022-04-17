import React from "react"
import ReportCard from "./ReportCard";
import ReportDetailModal from "./ReportDetailModal";
import "./report.css"
import { Spinner } from "react-bootstrap";
import COLORS from "../../constants/color";
import { DESK } from "../../constants/image"
import ConfirmBanModal from "./ConfirmBanModal";
import ConfirmIgnoreModal from "./ConfirmIgnoreModal";
import { client } from "../../axiosConfig";


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
            // {
            //     _id: "624acfd1e46797011adbc33d",
            //     reporter: {
            //         _id: "6205e4b0a5dc5a9a775b9c7c",
            //         firstName: "Takeshi",
            //         lastName: "Giant"
            //     },
            //     target: {
            //         _id: "6205e3c8618b7d42c9935d03",
            //         firstName: "Nobi1",
            //         lastName: "Nobita"
            //     },
        ]
    }

    componentDidMount() {
        this.fetchReportList();
    }

    showConfirmBanModal = (duration) => {
        this.setState({
            banDuration: duration, 
            isReportDetailModalShow: false,
            isConfirmBanModalShow: true,
            confirmBanModalStatus: "normal",
        });
        console.log("call showConfirmBanModal",duration);
    }

    showConfirmIgnoreModal = () => {
        this.setState({
            isReportDetailModalShow: false,
            isConfirmIgnoreModalShow: true,
            confirmIgnoreModalStatus: "normal"
        });
    }

    fetchReportList = async () => {
        this.setState({isLoading: true, isSomethingWentWrong: false})
        await client({
            method: 'GET',
            url: `/report`,
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        })
        .then(({data : { data }}) => {
            // console.log(data);
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

    onClickBanButton = async (target_id)=> {
        console.log("call onClickBanButton :", target_id);
        console.log("with duration :", this.state.banDuration);
        this.setState({confirmBanModalStatus: "sending"})
        await client({
            method: 'PATCH',
            url: `/punishment/ban`,
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
            params: {
                target_id: target_id
            },
            data: {
                duration: this.state.banDuration,
                reportId: this.state.reportDetailModalData.reportId
            }
        })
        .then(({data}) => {
            console.log(data);
            // console.log(data);
            this.setState({confirmBanModalStatus: "success", isReportDetailModalShow: false});
            this.fetchReportList();
        })
        .catch((res) => {
            console.log(res);
            this.setState({confirmBanModalStatus: "fail", isReportDetailModalShow: false});
        });

        // this.setState({confirmBanModalStatus: "normal"})
        // this.setState({confirmBanModalStatus: "success"})
        // this.setState({confirmBanModalStatus: "fail"})
        // return null
    }

    onDeleteReport = async (_id) => {
        console.log("call onDeleteReport :", _id);
        this,this.setState({confirmIgnoreModalStatus: "sending"})
        await client({
            method: 'DELETE',
            url: `/report`,
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
            params: {
                _id: _id
            }
        })
        .then(({data}) => {
            console.log(data);
            // console.log(data);
            this.setState({confirmIgnoreModalStatus: "success", isReportDetailModalShow: false});
            this.fetchReportList();
        })
        .catch((res) => {
            console.log(res);
            this.setState({confirmIgnoreModalStatus: "fail", isReportDetailModalShow: false});
        });
        // this,this.setState({confirmIgnoreModalStatus: "normal"})
        // this,this.setState({confirmIgnoreModalStatus: "success"})
        // // this,this.setState({confirmIgnoreModalStatus: "fail"})
        // return null
    }

    render() {
        return ( 
            <div className="ban-unban-container">

                {/* เด๋วมาลบทีหลัง ตรงนี้ */}
                <div className="flex-row gap5" style={{justifyContent:"center"}}>
                    <button 
                        className="outline-gray-button" 
                        onClick={() => (this.fetchReportList())}
                        >
                        fetchReportList
                    </button>
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
                                        reportingName={e.targetId.firstName + " " + e.targetId.lastName}
                                        reporterName={e.reporterId.firstName + " " + e.reporterId.lastName}
                                        timeStamp={e.createdAt}
                                        key={"reportcard :" + i}
                                        onClickCard={() => (
                                            this.setState({
                                                reportDetailModalData: {
                                                    reportId: e._id,
                                                    reportingName: e.targetId.firstName + " " + e.targetId.lastName,
                                                    reportingId: e.targetId._id,
                                                    reporterName: e.reporterId.firstName + " " + e.reporterId.lastName,
                                                    reporterId: e.reporterId._id,

                                                    createdAt: e.createdAt,
                                                    status: e.status,
                                                    text: e.text,
                                                    imageURL: e.imageUrl,
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
                        onAcknowledge={() => (this.setState({isConfirmBanModalShow: false}))}
                        targetName={this.state.reportDetailModalData.reportingName}
                        duration={this.state.banDuration}
                        status={this.state.confirmBanModalStatus}
                        onClickConfirmBtn={() => (this.onClickBanButton(this.state.reportDetailModalData.reportingId))}
                    />
                }
                {this.state.isConfirmIgnoreModalShow &&
                    <ConfirmIgnoreModal 
                        onHide={() => (this.setState({isConfirmIgnoreModalShow: false,  isReportDetailModalShow: true}))}
                        onAcknowledge={() => (this.setState({isConfirmIgnoreModalShow: false}))}
                        status={this.state.confirmIgnoreModalStatus}
                        onClickConfirmBtn={() => (this.onDeleteReport(this.state.reportDetailModalData.reportId))}
                    />
                }
            </div>
        )
    }
}

export default AdminBanUI
