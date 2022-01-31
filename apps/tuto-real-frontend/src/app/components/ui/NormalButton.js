import React from 'react'

import COLORS from '../../constants/color'

const NormalButton = (props) => {
  const {title, whenClick, size, bgColor} = props

  return (
    <button 
      onClick={whenClick ?? undefined} 
      className='shadow'
      style={{
        fontWeight: "bold",
        padding: `0.5vh ${size === "s"? 2: 4.5}vw`,
        marginLeft: "2vw",
        borderColor: "transparent",
        borderRadius: "30px",
        backgroundColor: bgColor,
        color: COLORS.white,
      }}
      type={props.type ?? undefined}>
        {title}
    </button>
  )
}

export default NormalButton