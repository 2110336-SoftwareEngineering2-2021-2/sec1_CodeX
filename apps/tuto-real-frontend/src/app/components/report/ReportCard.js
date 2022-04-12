

const ReportCard = (prop) => {

    const {reportId,
        reportingName,
        reportingId,
        reporterName,
        reporterId,
        timeStamp,
        reportInfo,
        reportUrl} = prop;

    return (
        <>
            <p>{reportId}</p>
            <p>{reportingName}</p>
            <p>{reportingId}</p>
            <p>{reporterName}</p>
            <p>{reporterId}</p>
            <p>{timeStamp}</p>
            <p>{reportInfo}</p>
            <p>{reportUrl}</p>
        </>
    )
}

export default ReportCard
