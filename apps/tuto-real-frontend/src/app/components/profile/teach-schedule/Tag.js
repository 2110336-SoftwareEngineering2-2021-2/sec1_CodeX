
import { BsTrash } from "react-icons/bs";


const Tag = ({text,bgColor,textColor,canEdit}) => {
    return (
        <div style={{
            backgroundColor:bgColor, 
            margin:"4px",
            padding:"6px",
            paddingLeft:"10px", 
            paddingRight:"10px", 
            borderRadius: "100px",
            display:"flex",
            flexDirection:"row",
            alignItems:"center"
        }}>
            <p style={{color:textColor, fontFamily:"Roboto", fontWeight: "bold"}}>{text}</p>
            {canEdit ?
                <BsTrash color="white" style={{marginLeft:"3px"}}/>
                :null
            }
        </div>
    )
}

export default Tag