import React from 'react'

import COLORS from '../../constants/color'

const NormalButton = ({title, whenClick, size, color}) => { // widthStyle is optional
  return (
    <button 
      onClick={whenClick} 
      className='shadow'
      style={{
        fontWeight: "bold",
        padding: `0.5vh ${size === "s"? 2: 4.5}vw`,
        borderColor: "transparent",
        borderRadius: "30px",
        backgroundColor: color,
        color: COLORS.white,
      }}>
        {title}
    </button>
  )
}

export default NormalButton