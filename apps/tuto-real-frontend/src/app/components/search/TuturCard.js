import { useState } from 'react'
import { Placeholder } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import COLORS from '../../constants/color'
import RatingTag from './RatingTag'
import './search.css'
import SubjectTag from './SubjectTag'

const TutorCard = (props) => {
    const {firstName, lastName, rating, imgUrl, subjectList, price, targetId} = props
    // const [dummySubjects] = useState(["Mathematic", "Science", "Programing", "Algorithm", "Society", "Yaranika"])
    const [dummyColors] = useState(["red","orange","#ded51b","green","blue","darkblue","purple"])

    const navigate = useNavigate()

    const toProfile = () => {
        console.log("to profile" , firstName ?? "Unknownf", " " , lastName ?? "Unknownl")
        navigate(`/profile/${targetId}`);
    }

    return (
        <div className="search-page-card" 
            id='search-page-hover-card'
            onClick={toProfile}
            style={{padding:"8px", display:"flex", flexDirection:"row"}}
        >
            {/* <div style={{width:"140px", height:"140px", backgroundColor:"gray", borderRadius:"5px"}}/> */}
            {/* <img src='https://www.techoffside.com/wp-content/uploads/2020/11/MiHoYo-Genshin-Impact-001.jpg'></img> */}
            <img className='tutor-card-img' src={imgUrl ?? "https://www.saraswatiias.com/wp-content/uploads/2018/11/dummy-profile-pic-male1.jpg"}/>
            <div style={{display:"flex", flexDirection:"column", marginLeft:"15px", alignItems:"flex-start"}}>
                <div style={{display:"flex", flexDirection:"row", alignItems:"center"}}>
                    {firstName ?
                        <p style={{color:COLORS.primary, fontSize:"22px", marginRight:"10px", fontWeight:"bold"}}>
                            {firstName}
                        </p>
                        :
                        // <p>กล้วย</p>
                        <Placeholder as="p" animation="glow">
                            <Placeholder xs={12} />
                        </Placeholder>
                        // <Placeholder as="p" xs={6} bg="primary"  />
                    }
                    {" "}
                    <p style={{color:COLORS.primary, fontSize:"22px", marginRight:"10px", fontWeight:"bold"}}>
                        {lastName ?? "Last"}
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
                            <SubjectTag 
                                text={e} 
                                color={dummyColors[Math.floor(Math.random() * dummyColors.length)]}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TutorCard