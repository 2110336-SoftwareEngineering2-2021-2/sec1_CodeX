


const Tag = ({text,bgColor,textColor,canEdit}) => {
    return (
        <div style={{backgroundColor:bgColor, margin:"4px",padding:"6px",paddingLeft:"10px", 
            paddingRight:"10px", borderRadius: "100px"
        }}>
            <p style={{color:textColor, fontFamily:"Roboto", fontWeight: "bold"}}>{text}</p>
        </div>
    )
}

export default Tag