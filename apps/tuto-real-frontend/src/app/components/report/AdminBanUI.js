import React from "react"
import ReportCard from "./ReportCard";


class AdminBanUI extends React.Component{
    constructor(prop) {
        super(prop);
    }
    state = {
        testText: "this is AdminBanUI",
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
                    />
                ))}
            </div>
        )
    }
}

export default AdminBanUI