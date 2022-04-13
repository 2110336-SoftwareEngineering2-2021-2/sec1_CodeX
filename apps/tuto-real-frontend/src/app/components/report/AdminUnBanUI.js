import React from "react"


class AdminUnBanUI extends React.Component{
    constructor(prop) {
        super(prop);
    }
    state = {
        testText: "this is AdminUnBanUI"
    }

    fetchBannedList() {

    }
    
    onClickUnbanButton(target_id) {
        return null
    }


    render() {
        return ( 
            <div>
                <p>{this.state.testText}</p>
                <button onClick={() => {this.testButtonHandler()}}>
                    test
                </button>
            </div>
        )
    }
}

export default AdminUnBanUI