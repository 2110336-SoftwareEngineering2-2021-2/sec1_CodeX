

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
        <div onClick={onClickCard}>
            <p>{reportId}</p>
            <p>{reportingName}</p>
            <p>{reportingId}</p>
            <p>{reporterName}</p>
            <p>{reporterId}</p>
            <p>{timeStamp}</p>
            <p>{reportInfo}</p>
            <p>{reportUrl}</p>
        </div>
    )
}

export default ReportCard
