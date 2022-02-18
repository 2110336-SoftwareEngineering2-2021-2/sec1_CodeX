import COLORS from "../../constants/color"


const SubjectTag = ({text, color}) => {
    return (
        <div style={{
            backgroundColor:color ?? COLORS.third, 
            padding:"0px 8px", 
            borderRadius:"2px", 
            display:"flex", 
            flexDirection:"row",
            alignItems:"center",
            margin:"3px",
            height:"21px",
            justifyContent:"center"
        }}>
            <p style={{color:"white", fontSize:"14px", margin:"0px"}}>{text ?? "---"}</p>
        </div>
    )
} 

export default SubjectTag