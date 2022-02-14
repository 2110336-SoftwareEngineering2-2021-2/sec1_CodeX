import { useState } from "react";
import SearchConfigCard from "../components/search/SearchConfigCard";
import TutorCard from "../components/search/TuturCard";


const SearchPage = () => {

    const [dummyList, setDummyList] = useState([1,2,2,2,2,2,2,2,2,2,2,2,2])

    return (
        <div style={{width:"45%"}}>
            <SearchConfigCard/>
            {dummyList.map((e) => (
                <TutorCard/>
            ))}
        </div>
    )
}

export default SearchPage;