import React from "react"


class AdminBanUI extends React.Component{
    constructor(prop) {
        super(prop);
    }
    state = {
        testText: "1234"
    }

    testButtonHandler() {
        this.setState({testText: "1111"})
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

export default AdminBanUI