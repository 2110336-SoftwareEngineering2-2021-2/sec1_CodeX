import React from 'react'

const Schedule = ({time, slotData}) => { 
  /* 
    time = "Morning" | "Evening"
    slotData = {
      number: number start from 0
      subject: string,
      status: "available" | "disable" | "booked" | "pending" | "x" | "tutorSelect" | "studentSelect"
      onViewInfo?: function
    }
  */

  const DAY = ["SUN", 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']

  const renderHeader = (
    <tr>
      <th>Date/Time</th>
      {[...Array(10).keys()].map(t => (
        <th key={t}>{t !== 0 ?
          (time === "Morning"? 
            (t+8)
            :(t+14))
          : null}
        </th>
      ))}
    </tr>
  )

  const renderBody = (
    <>
      {[...Array(7).keys()].map((row) => (
        <tr>
          {[...Array(11).keys()].map(col => (
            <td>{col !== 0? slotData[row*10 + col - 1]?.subject: DAY[row]}</td>
          ))}
        </tr>
      ))}
    </>
  )

  return (
    <table>
      <thead>
        {renderHeader}
      </thead>
      <tbody>
        {renderBody}
      </tbody>
    </table>
  )
  
}

export default Schedule