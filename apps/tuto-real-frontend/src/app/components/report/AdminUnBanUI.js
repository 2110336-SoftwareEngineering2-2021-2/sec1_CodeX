import React from "react"
import "./report.css"
import { Spinner } from "react-bootstrap";
import COLORS from "../../constants/color";
import { DESK } from "../../constants/image"
import UserBannedCard from "./UserBannedCard";
import { client } from "../../axiosConfig";


class AdminUnBanUI extends React.Component{

    constructor(prop) {
        super(prop);
    }

    state = {
        isLoading: false,
        isSomethingWentWrong: false,
        userBannedList: [
            {
                // _id: "hosehfegnlnlbnldnbldlfm",
                // firstName: "Veerin",
                // lastName: "Juurek",
                // timeStamp: "2022-04-04T18:00:33.538+00:00",
            },
        ]
    }

    componentDidMount() {
        this.fetchBannedList();
    }

    fetchBannedList = async() => {
        this.setState({isLoading: true, isSomethingWentWrong: false})
        await client({
            method: 'GET',
            url: `/punishment`,
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        })
        .then(({data : { data }}) => {
            console.log(data);
            this.setState({
                userBannedList: data, 
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
    
    onClickUnbanButton(target_id) {
        return null
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
                        fetchBannedList
                    </button>
                    <button 
                        className="outline-gray-button" 
                        onClick={() => (this.setState({isLoading: !this.state.isLoading}))}
                        >
                        toggleLoading
                    </button>
                    <button 
                        className="outline-gray-button" 
                        onClick={() => (this.setState({userBannedList: []}))}
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
                                {this.state.userBannedList.length === 0 &&
                                    <div id="place-hover-empty-image">
                                        <img src={DESK}/>
                                        <p>We don't have any banned user</p>
                                    </div>
                                }
                                {this.state.userBannedList.map((e,i) => (
                                    <UserBannedCard 
                                        name={e.firstName + " " + e.lastName}
                                        timeStamp={e.unbanDate}
                                        key={"UserBannedCard" + i}
                                        // onClickUnbanButton={}
                                        // onClickCard={}
                                    />
                                ))}
                            </>
                        }
                    </div>
                }
            </div>
        )
    }
}

export default AdminUnBanUI
