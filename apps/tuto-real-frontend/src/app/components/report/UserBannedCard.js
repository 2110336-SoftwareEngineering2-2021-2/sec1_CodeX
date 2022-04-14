import "./report.css"

const UserBannedCard = (props) => {
    const {name, timeStamp, onClickCard, onClickUnBanBtn} = props;

    const translateDateFormat = (timeStamp) => {
        //2001-02-15T17:00:00.000+00:00
        //            to be
        //February 29, 2000 9:30 a.m."
        let temp = new Date(timeStamp);
        // console.log(new Date(timeStamp));
        var date = temp.getDate()
        var month = temp.getMonth()
        var year = temp.getFullYear()
        const monthName = [
            'January', 
            'February', 
            'March', 
            'April', 
            'May', 
            'June', 
            'July', 
            'August', 
            'September', 
            'October', 
            'November', 
            'December']
        return (monthName[month] + " " + date.toString() + ", " + year.toString());
    }
        
    const translateTimeFormat = (timeStamp) => {
        let temp = new Date(timeStamp);
        // console.log(new Date(timeStamp));
        var hour = temp.getHours().toString();
        if (hour.length < 2) {
            hour = "0" + hour;
        }
        var min = temp.getMinutes().toString();
        if (min.length < 2) {
            min = "0" + min;
        }
        return hour + ':' + min;
    };

    return (
        <div className="user-banned-card" onClick={onClickCard}>
            {/* <p>this is banned user card</p> */}
            <div className="flex-column">
                <p style={{fontSize:"24px", fontWeight:"500"}}>{name}</p>
                <div className="flex-row gap5">
                    <p>Banned Until:</p>
                    <p>
                        {translateDateFormat(timeStamp)} {translateTimeFormat(timeStamp)}
                    </p>
                </div>
            </div>
            <button className="ignore-button"
                onClick={onClickUnBanBtn} 
                style={{maxHeight:"3rem"}}>
                Unban
            </button>
        </div>
    )
}

export default UserBannedCard
