import React from 'react'

import COLORS from '../../constants/color'

const BarButton = ({title, onSelect, isActive, widthStyle}) => { // widthStyle is optional
  return (
    <button 
      onClick={onSelect} 
      style={{
        fontWeight: "bold",
        padding: "2% 4%",
        borderColor: "transparent",
        borderRadius: "30px",
        minWidth: widthStyle? widthStyle:"fit-content",
        backgroundColor: isActive? COLORS.third: COLORS.white,
        color: isActive? COLORS.white: COLORS.primary,
      }}>
        {title}
    </button>
  )
}

export default BarButton