import React, { useState } from 'react'

import BarButton from '../ui/BarButton'
import "./profile.css"

const ProfileMenuBar = ({viewType, selecting, setSelecting}) => {
  // const [selecting, setSelecting] = useState("Info") // "Info" | "Learn" | "Teach" | "Review"
  const [widthStyle] = useState(() => {
    switch(viewType) {
      case "TutorSelf": return "25%"
      case "StudentSelf": return "50%"
      case "TutorOther": return "33.33%"
      default: return undefined
    }
  })

  return (
    <>
      {/* Button Bar Section */}
      <div className="bar">
        <BarButton title="Information" onSelect={() => setSelecting("Info")} isActive={(selecting === "Info")} widthStyle={widthStyle} />
        {viewType !== "TutorOther" ?
          <BarButton title="Learn Schedule" onSelect={() => setSelecting("Learn")} isActive={(selecting === "Learn")} widthStyle={widthStyle} />
        :null}
        {viewType !== "StudentSelf" ?
          <BarButton title="Teach Schedule" onSelect={() => setSelecting("Teach")} isActive={(selecting === "Teach")} widthStyle={widthStyle} />
        :null}
        {viewType !== "StudentSelf" ?
          <BarButton title="Reviews" onSelect={() => setSelecting("Review")} isActive={(selecting === "Review")} widthStyle={widthStyle} />
        :null}
      </div>
    </>
  )
}

export default ProfileMenuBar