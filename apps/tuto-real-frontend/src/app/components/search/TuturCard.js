import { useState } from 'react'
import COLORS from '../../constants/color'
import RatingTag from './RatingTag'
import './search.css'
import SubjectTag from './SubjectTag'

const TutorCard = (props) => {
    const {firstName, lastName, rating, imgUrl, subjectList, price, targetId} = props
    const [dummySubjects] = useState(["Mathematic", "Science", "Programing", "Algorithm", "Society", "Yaranika"])
    const [dummyColors] = useState(["red","orange","yellow","green","blue","darkblue","purple"])
    return (
        <div className="search-page-card" 
            onClick={() => (console.log("Hello"))}
            style={{padding:"8px", display:"flex", flexDirection:"row"}}
        >
            <div style={{width:"140px", height:"140px", backgroundColor:"gray", borderRadius:"5px"}}/>
            <div style={{display:"flex", flexDirection:"column", marginLeft:"15px", alignItems:"flex-start"}}>
                <div style={{display:"flex", flexDirection:"row", alignItems:"center"}}>
                    <p style={{color:COLORS.primary, fontSize:"22px", marginRight:"10px", fontWeight:"bold"}}>
                        {firstName ?? "First"}  {lastName ?? "Last"}
                    </p>
                    <RatingTag rating={rating ?? "0.0"}/>
                </div>
                <p style={{color:COLORS.darkgray, fontSize:"18px"}}>
                    PRICE/HOUR:  {price ?? 0} baht
                </p>
                <div style={{display:"flex", flexDirection:"row"}}>
                    <p style={{color:COLORS.darkgray, fontSize:"18px" , margin:"0px", marginRight:"5px"}}>SUBJECTS:</p>
                    <div style={{display:"flex", flexDirection:"row", flexWrap:"wrap"}}>
                        {(subjectList ?? []).map((e,i) => (
                            <SubjectTag text={e} color={dummyColors[(i + 3) % dummyColors.length]}/>
                        ))}
                    </div>
                </div>
                    {/* <p style={{color:COLORS.darkgray, fontSize:"18px"}}>100 baht</p> */}
                    {/* <RatingTag rating="4.8"/> */}

            </div>
        </div>
    )
}

export default TutorCard