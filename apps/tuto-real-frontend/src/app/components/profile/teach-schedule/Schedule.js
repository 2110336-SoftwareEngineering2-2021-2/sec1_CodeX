import React from 'react'

import Slot from './Slot'
import "./schedule.css"

const Schedule = ({time, slotList, viewType, selected, setSelected}) => { 
  /* 
    time = "Morning" | "Evening"
    slotData = {
      number: number start from 0
      subject: string,
      status: "available" | "disable" | "booked" | "pending" | "x"
      onViewInfo?: function
    }
  */

  const DAY = ["SUN", 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']

  const isClickable = (status) => {
    // return True if that slot is clickable //
    if(status === "available") return true
    return false
  }

  const whenClickSlot = (idx) => {
    if(!selected.includes(idx)) setSelected([...selected, idx])
    else setSelected(selected.filter(i => (i !== idx)))
  }

  const renderHeader = (
    <tr>
      <th>Date/Time</th>
      {[...Array(10).keys()].map(t => (
        <th key={t} style={{textAlign: "left", paddingLeft: "1%"}}>{t !== 0 ?
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
        <tr key={row}>
          {[...Array(11).keys()].map(col => {
            const idx = row*10 + col - 1
            if(col === 0) return <td key={idx} style={{fontWeight: "bold"}}><p>{DAY[row]}</p></td>
            else return (
              <td id={isClickable(slotList[idx]?.status)? "available": null} key={idx} style={{verticalAlign: "top"}}>
                <Slot 
                  slotData={slotList[idx]} 
                  viewType={viewType} 
                  isSelected={selected.includes(idx)} 
                  whenClick={() => whenClickSlot(idx)} 
                />
              </td>
            )
          })}
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