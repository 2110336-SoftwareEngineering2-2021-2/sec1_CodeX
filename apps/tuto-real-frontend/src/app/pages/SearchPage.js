import { useEffect, useState, useCallback, useContext } from "react";
import { Button, Modal } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";

import { SearchContext } from '../app'
import { client } from "../axiosConfig";
import SearchConfigCard from "../components/search/SearchConfigCard";
import SearchFilter from "../components/search/SearchFilter";
import TutorCard from "../components/search/TuturCard";

import './RegistrationPage.css'

const SearchPage = () => {
    // const params = useParams();
    const navigate = useNavigate()
    const { searchText, setSearchText } = useContext(SearchContext)

    const [filterShow, setFilterShow] = useState(false);
    const [isSearched, setSearched] = useState(false)
    const [tutorList,setTutorList] = useState([
        // {
        //     _id: "",
        //     firstName: "",
        //     lastname:"",
        //     price:0,
        //     profileImg: {
        //         url:"",
        //         _id:""
        //     },
        //     rating:0,
        //     subjects: []         
        // }
    ])

    const [searchInfo,setSearchInfo] = useState({
        searchText: searchText ?? "",
        subject:"All",
        minPrice:0,
        maxPrice:1000000,
        rangePriceChoice:0,
        days:[],
        searchType:"rating",
        orderType:"ascending",
        daysCheck: [true,true,true,true,true,true,true,true]
    })
    const [backupSearchInfo,setBackupSearchInfo] = useState({
        subject: "",
        minPrice: 0,
        maxPrice: 10000,
        rangePriceChoice: 0,
        daysCheck: [true,true,true,true,true,true,true,true]
    })
    
    useEffect(() => {
        setSearchInfo({
            ...searchInfo,
            searchText: searchText
        });
        fetchData(true);
    }, [searchText]);

    // useEffect(() => {
    //     if(params.searchText) {
    //         setSearchInfo({
    //             ...searchInfo,
    //             searchText: params.searchText
    //         });
    //     }
    // }, [params.searchText]);

    // useEffect(() => {
    //     onSearch()
    // },[searchInfo.daysCheck, searchInfo.searchType])


    const onSearch = () => {
        console.log("onSearch",searchInfo)
        setSearchText(searchInfo.searchText)
        fetchData(0)
    };

    function genKeyword(text) {
        return text.split(" ").join(",");
    };

    function genDayListText(daysCheckList) {
        var temp = [];
        var dayRefference = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
        for (var i = 0; i < 7; i=i+1) {
            if (daysCheckList[i]) {
                temp.push(dayRefference[i]);
            }
        }
        return temp.join(",");
    };

    const fetchData = async (searchWithContext)  => {
        // console.log(`${searchInfo.minPrice},${searchInfo.maxPrice ?? "10000"}`)
        // console.log("fetchdata",search_info)
        console.log("fetchdata",searchInfo)
        console.log("days",genDayListText(searchInfo.daysCheck))
        await client({
          method: 'GET',
          // url: `/user/${targetEmail}`,
          url: `/tutor/search`,
          params: {
            subjects: `${searchInfo.subject === "All" ? "" : searchInfo.subject}`,
            keyword: genKeyword(searchWithContext ? searchText : searchInfo.searchText),
            ratePrice: `${searchInfo.minPrice.toString()},${searchInfo.maxPrice.toString() ?? "10000"}`,
            days: genDayListText(searchInfo.daysCheck),
          }
        })
          .then(({ data: {data} }) => {
            console.log(data);
            setTutorList(data);
            setSearched(true)
            navigate(`/search`)
            // console.log("currentUser: ", firstName, " ", lastName, " ", currentUser)
            // setViewType(calculateViewType(data[0]?.role))
            // setTargetRole(data?.role);
          })
          .catch((res) => {
            console.log(res);
          });
      };

    return (
        <div className="search-container-responsive">
            <SearchConfigCard 
                searchInfo={searchInfo} 
                setSearchInfo={setSearchInfo}
                onSearch={onSearch}
                // onClickSearchButton={() => onSearch()}
                onClickFilterButton={() => {
                    setFilterShow(true)
                    setBackupSearchInfo({
                        subject: searchInfo.subject,
                        minPrice: searchInfo.minPrice,
                        maxPrice: searchInfo.maxPrice,
                        rangePriceChoice: searchInfo.rangePriceChoice,
                        daysCheck: [...searchInfo.daysCheck]
                    })
                }}
            />
            <SearchFilter
                show={filterShow}
                setShow={setFilterShow}
                searchInfo={searchInfo} 
                setSearchInfo={setSearchInfo}
                onSearch={fetchData}
                backupSearchInfo={backupSearchInfo}
                // onHide={() => setModalShow(false)}
            />
            {/* <button onClick={() => {console.log(genKeyword("122      456   222"))}}>print search info</button> */}
            {tutorList.map((e,i) => (
                <TutorCard 
                    key={`tutor-card-in-search-page-${e._id}`}
                    targetId={e._id} 
                    firstName={e.firstName}
                    lastName={e.lastName}
                    rating={e.rating}
                    price={e.price}
                    subjectList={e.subjects}
                    imgUrl={e.profileImg.url}
                />
            ))}
            {!isSearched ?
                <div style={{ height:"70vh", display:"flex", alignItems:"center", flexDirection:"column", justifyContent:"center", gap:"30px"}}>
                    <img src="https://storage.googleapis.com/codex_img/Profile/default.jpg"/>
                    <h6>Please type your keyword to search your tutor</h6>
                </div>
                :
                null
            }
            {(isSearched && tutorList.length === 0) ?
                <div style={{display:"flex", flexDirection:"column", alignItems:"flex-start", width:"100%", margin:"0px 5%"}}>
                    <h6 style={{color:"red"}}>Your search did not match any tutor.</h6>
                    <h6>Suggestions:</h6>
                    <ul >
                        <li style={{display:"flex", justifyContent:"flex-start"}}>- Make sure that all words are spelled correctly.</li>
                        <li style={{display:"flex", justifyContent:"flex-start"}}>- Try different keywords.</li>
                        <li style={{display:"flex", justifyContent:"flex-start"}}>- Try more general keywords.</li>
                        <li style={{display:"flex", justifyContent:"flex-start"}}>- Try fewer keywords.</li>
                    </ul>

                </div>
                :
                null
            }
        </div>
    )
}

export default SearchPage;