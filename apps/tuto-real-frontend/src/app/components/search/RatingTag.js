import COLORS from "../../constants/color"
import {AiFillStar} from 'react-icons/ai'

const RatingTag = ({rating}) => {
    return (
        <div style={{backgroundColor:COLORS.yellow, 
            padding:"0px 8px", 
            borderRadius:"4px", 
            display:"flex", 
            flexDirection:"row",
            alignItems:"center"
        }}>
            <AiFillStar color="white" style={{marginRight:"3px"}}/>
            <p style={{color:"white", fontSize:"16px"}}>{rating ?? "0.0"}</p>
        </div>
    )
}

export default RatingTag