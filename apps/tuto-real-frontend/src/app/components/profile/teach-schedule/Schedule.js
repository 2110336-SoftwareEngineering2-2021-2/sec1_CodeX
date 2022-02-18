import React, { Fragment } from 'react'

import { useAuth } from '../../../auth' 
import Slot from './Slot'
import "./schedule.css"

const Schedule = ({time, scheduleData, viewType, selected, setSelected, setShowModal}) => { 
  /* 
    time: "Day Time" | "Night Time"
    scheduleData: {
      day: string,
      slots: {slot: number, subject: string, description: string, student: {id, firstName, lastName, status}}[]
    }[]
    slotData: {
      slot: number start from 0 - 15 (8.00 - 23.00)
      subject: string
      description: string
      students: {id, firstName, lastName, status}[]
    }
  */
  const {_id} = useAuth()

  const DAY = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
  const DAY_SHORT = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"]

  // const DAY = {
  //   SUNDAY: "SUN", 
  //   MONDAY: 'MON', 
  //   TUESDAY: 'TUE', 
  //   WEDNESDAY: 'WED',
  //   THURSDAY: 'THU',
  //   FRIDAY: 'FRI',
  //   SATURDAY: 'SAT'
  // }

  const IdxToDayAndSlot = (idx) => {
    // console.log(idx)
    // console.log({day: DAY[Math.floor(idx/16)], slotNum: idx%16})
    return {day: DAY[Math.floor(idx/16)], slotNum: idx%16} // day, slot number
  }

  // const isClickable = (status) => {
  //   // return True if that slot is clickable //
  //   if(status === "available") return true
  //   return false
  // }

  const isInSchedule = (day, slotIdx) => {
    if(scheduleData.find(schedule => schedule.day === day)?.slots.find(slot => slot.slot === slotIdx)) {
      console.log(`${day} ${slotIdx} include`)
      return true
    }
    return false
  }

  const whenClickSlot = (idx) => {
    if(!selected.includes(idx)) setSelected([...selected, idx])
    else setSelected(selected.filter(i => (i !== idx)))
  }

  const getSlotData = (idx) => {
    const {day, slotNum} = IdxToDayAndSlot(idx)
    const slotData = scheduleData.find(schedule => (schedule.day === day))?.slots.find(slot => (slot.slot === slotNum))
    console.log(slotData)
    return slotData
  }

  const renderHeader = (
    <tr>
      <th>Date/Time</th>
      {[...Array(10).keys()].map(t => (
        <th key={t} style={{textAlign: "left", paddingLeft: "1%"}}>{t !== 0 ?
          (time === "Day Time"? 
            (t+8)
            :(t+14))
          : null}
        </th>
      ))}
    </tr>
  )

  const renderBody = () => {
    // let dayIdx = 0
    return (
      <>
      {DAY.map((day, row) => (
        <tr key={row}>
          {[...Array(10).keys()].map(col => {
            const idx = (time === "Day Time")? (row*16 + col):  (row*16 + col + 6)
            // if(idx%16 === 0) return <td key={idx} style={{fontWeight: "bold"}}><p>{DAY_SHORT[row]}</p></td>
            // else if(scheduleData.length > dayIdx && isInSchedule(day, col, dayIdx)) {
            if(time === "Night Time" && ([6,7,8,9].includes(col))) {
              return (
                <td key={idx} style={{verticalAlign: "top"}}>
                    <Slot 
                      slotData={null} 
                      viewType={viewType} 
                      isSelected={null} 
                      isX={true}
                      whenClick={null} 
                      onViewInfo={null}
                    />
                  </td>
              )
            } else if(isInSchedule(day, idx%16)) {
                return (
                  <Fragment key={idx}>
                    {idx%16 === 0? <td style={{fontWeight: "bold"}}><p>{DAY_SHORT[row]}</p></td>: null}
                    <td id="available" style={{verticalAlign: "top"}}>
                      <Slot 
                        slotData={getSlotData(idx)} 
                        viewType={viewType} 
                        id={_id}
                        isSelected={selected.includes(idx)} 
                        isX={false}
                        whenClick={() => whenClickSlot(idx)} 
                        onViewInfo={() => setShowModal(true)}
                        />
                    </td>
                  </Fragment>
                )
            } else {
              return (
                <Fragment key={idx}>
                  {idx%16 === 0? <td style={{fontWeight: "bold"}}><p>{DAY_SHORT[row]}</p></td>: null}
                  <td style={{verticalAlign: "top"}}>
                    <Slot 
                      slotData={null} 
                      viewType={viewType} 
                      id={_id}
                      isSelected={selected.includes(idx)} 
                      isX={false}
                      whenClick={() => whenClickSlot(idx)} 
                      onViewInfo={null}
                    />
                  </td>
                </Fragment>
              )
            }
            // const idx = row*10 + col - 1
            // if(col === 0) return <td key={idx} style={{fontWeight: "bold"}}><p>{DAY[row]}</p></td>
            // else return (
            //   <td id={isClickable(xxx[idx]?.status)? "available": null} key={idx} style={{verticalAlign: "top"}}>
            //     <Slot 
            //       slotData={xxx[idx]} 
            //       viewType={viewType} 
            //       isSelected={selected.includes(idx)} 
            //       whenClick={() => whenClickSlot(idx)} 
            //     />
            //   </td>
            // )

          })}
        </tr>
      ))}
    </>
    )
  }

  return (
    <table>
      <thead>
        {renderHeader}
      </thead>
      <tbody>
        {renderBody()}
      </tbody>
    </table>
  )
  
}

export default Schedule