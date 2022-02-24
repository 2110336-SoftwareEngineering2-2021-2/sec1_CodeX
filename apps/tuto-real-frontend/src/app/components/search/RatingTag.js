import COLORS from "../../constants/color"
import {AiFillStar} from 'react-icons/ai'

const RatingTag = ({rating}) => {

    const convertToString = (num) => {
        var temp = num.toString()
        if (temp.length === 1) {
            return temp + ".0"
        } else if (temp.length === 2) {
            return temp + "0"
        } else if (temp.length >= 3) {
            return temp.slice(0,3)
        }
    }

    return (
        <div style={{backgroundColor:COLORS.yellow, 
            padding:"0px 8px", 
            borderRadius:"4px", 
            display:"flex", 
            flexDirection:"row",
            alignItems:"center"
        }}>
            <AiFillStar color="white" style={{marginRight:"3px"}}/>
            <p style={{color:"white", fontSize:"16px"}}>{rating ? convertToString(rating) : "0.0"}</p>
        </div>
    )
}

export default RatingTag