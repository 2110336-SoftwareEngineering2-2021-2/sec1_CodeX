import COLORS from "../../constants/color";
import "./report.css"

const ReportCard = (prop) => {

    const {reportId,
        reportingName,
        reportingId,
        reporterName,
        reporterId,
        timeStamp,
        reportInfo,
        reportUrl,
        onClickCard} = prop;

    return (
        <div className="report-card" onClick={onClickCard}>
            <div className="header">
                <p style={{color:COLORS.primary, fontWeight:"500"}}>
                    Waiting for review
                </p>
                <p>{timeStamp}</p>
            </div>
            
            <hr />
            <div className="body">
                <div id="report-target">
                    <p>Reporting</p>
                    <p style={{color:"red", fontWeight:"500"}}>
                        {reportingName}
                    </p>    
                </div>
                <div id="reporter">
                    <p>from</p>
                    <p style={{fontWeight:"500"}}>
                        {reporterName}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default ReportCard
