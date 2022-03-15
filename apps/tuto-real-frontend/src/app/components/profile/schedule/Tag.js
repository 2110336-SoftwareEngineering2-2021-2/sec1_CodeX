
import { BsTrash } from "react-icons/bs";


const Tag = (props) => {
    const {text,bgColor,textColor,canEdit,whenClickBin} = props

    return (
        <div style={{
            backgroundColor:bgColor, 
            margin:"4px",
            padding:"6px",
            paddingLeft:"10px", 
            paddingRight:"10px", 
            borderRadius: "100px",
            borderWidth: "5px",
            borderColor:bgColor,
            display:"flex",
            flexDirection:"row",
            alignItems:"center"
        }}>
            <p style={{color:textColor, fontFamily:"Roboto", fontWeight: "bold"}}>{text}</p>
            {canEdit ?
                <button style={{borderWidth:"0px", padding:"0px", backgroundColor:bgColor, display:"flex",alignItems:"center"}}
                    type="button"    
                    onClick={whenClickBin ?? undefined}
                >
                    <BsTrash 
                        color="white" 
                        style={{marginLeft:"3px"}}
                        //onClick={whenClickBin ?? undefined}
                        // onClick={console.log("trash")}
                    />
                </button>
                :null
            }
        </div>
    )
}

export default Tag