import React, { useEffect, useState } from 'react'
import BarButton from '../ui/BarButton'
import COLORS from '../../constants/color'

const ProfileMenuBar = ({viewType}) => {
  const [selecting, setSelecting] = useState("Info") // "Info" | "Learn" | "Teach" | "Review"
  const [widthStyle, setWidthStyle] = useState(() => {
    switch(viewType) {
      case "TutorSelf": return "25%"
      case "StudentSelf": return "50%"
      case "TutorOther": return "33.33%"
      default: return undefined
    }
  })

  // useEffect(() => {
    
  //   setWidthStyle()
  // },[userType])

  return (
    <>
      {/* Button Bar Section */}
      <div style={styles.bar}>
        <BarButton title="Information" onSelect={() => setSelecting("Info")} isActive={(selecting === "Info")} widthStyle={widthStyle} />
        <BarButton title="Learn Schedule" onSelect={() => setSelecting("Learn")} isActive={(selecting === "Learn")} widthStyle={widthStyle} />
        <BarButton title="Teach Schedule" onSelect={() => setSelecting("Teach")} isActive={(selecting === "Teach")} widthStyle={widthStyle} />
        <BarButton title="Reviews" onSelect={() => setSelecting("Review")} isActive={(selecting === "Review")} widthStyle={widthStyle} />
      </div>
    </>
  )
}

const styles = {
  bar: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "stretch",
    width: "50%",
    backgroundColor: COLORS.white,
    borderColor: COLORS.darkgray,
    borderStyle: "solid",
    borderWidth: "1px",
    borderRadius: "30px",
  }
}

export default ProfileMenuBar