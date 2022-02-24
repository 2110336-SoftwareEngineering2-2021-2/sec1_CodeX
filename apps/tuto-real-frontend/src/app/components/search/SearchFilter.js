import { useState } from "react"
import { Button, Form, Modal } from "react-bootstrap"
import COLORS from "../../constants/color"
import './search.css'


const SearchFilter = ({show, setShow, searchInfo, setSearchInfo, onSearch, backupSearchInfo}) => {

    const [dummySubjects] = useState(["All","Math","Phys","Bio","Chem","Sci","Society","His","PE"])

    const onDayCheck = (dayIndex)=> {
        var temp = searchInfo.daysCheck;
        if (dayIndex === 7) {
            if (searchInfo.daysCheck[7]) {
                temp[0] = false;
                temp[1] = false;
                temp[2] = false;
                temp[3] = false;
                temp[4] = false;
                temp[5] = false;
                temp[6] = false;
                temp[7] = false;
                // temp = [false,false,false,false,false,false,false,false]   
            }
            else {
                temp[0] = true;
                temp[1] = true;
                temp[2] = true;
                temp[3] = true;
                temp[4] = true;
                temp[5] = true;
                temp[6] = true;
                temp[7] = true; 
            }
        } else if (0 <= dayIndex <= 6) {
            if (searchInfo.daysCheck[7]) {
                temp[7] = false;
            }
            temp[dayIndex] = !temp[dayIndex];
        } else {
            return
        }

        if (temp[0] && temp[1] && temp[2] && temp[3] && temp[4] && temp[5] && temp[6]) {
            temp[7] = true;
        }

        setSearchInfo({
            ...searchInfo,
            daysCheck: temp
        })
    }

    const priceRateRadioHandle = (minPrice,maxPrice,choice) => {
        setSearchInfo({
            ...searchInfo,
            minPrice: minPrice,
            maxPrice: maxPrice,
            rangePriceChoice: choice,
        })
     }
    const onCancelHandle = () => {
        setSearchInfo({
            ...searchInfo,
            subject: backupSearchInfo.subject,
            minPrice: backupSearchInfo.minPrice,
            maxPrice: backupSearchInfo.maxPrice,
            rangePriceChoice: backupSearchInfo.rangePriceChoice,
            daysCheck: [...backupSearchInfo.daysCheck]
        })
        setShow(false)
    }
    const setDefaultHandle = () => {
        setSearchInfo({
            ...searchInfo,
            subject: "All",
            minPrice: 0,
            maxPrice: 1000000,
            rangePriceChoice: 0,
            daysCheck: [true,true,true,true,true,true,true,true]
        })
    }
    return (
        <Modal
            show={show}
            className='search-filter'
            onHide={() => setShow(false)}
            // size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Filter
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>
                    SUBJECTS
                </p>
                <div style={{paddingLeft:"15px"}}>
                    <Form.Select 
                        value={searchInfo.subject} 
                        tyle={{width:"25%"}}
                        onChange={(e) => 
                            setSearchInfo({
                                ...searchInfo,
                                subject: e.target.value
                            })
                        }
                    >
                        {dummySubjects.map((e,i) => (
                            <option value={e} key={`subject-${i}`}>
                                {e}
                            </option>
                        ))}
                    </Form.Select>
                </div>
            </Modal.Body>
            <hr/>
            <Modal.Body>
                <p>
                    PRICE (per Hour)
                </p>
                <div style={{paddingLeft:"15px",display:"flex", flexDirection:"row", margin:"0px!important"}}>
                    <div style={{display:"flex", flexDirection:"column", width:"100%"}}>
                        <Form.Check
                            inline
                            label="Less than 30 bath "
                            name="group1"
                            type="radio"
                            // defaultChecked={searchInfo.rangePriceChoice === 1}
                            checked={searchInfo.rangePriceChoice === 1}
                            onChange={() => priceRateRadioHandle(0,30,1)}
                        />
                        <Form.Check
                            inline
                            label="60 - 100 bath"
                            name="group1"
                            type="radio"
                            // defaultChecked={searchInfo.rangePriceChoice === 3}
                            checked={searchInfo.rangePriceChoice === 3}
                            onChange={() => priceRateRadioHandle(60,100,3)}
                        />
                        <Form.Check
                            inline
                            label="150 - 250 bath"
                            name="group1"
                            type="radio"
                            // defaultChecked={searchInfo.rangePriceChoice === 5}
                            checked={searchInfo.rangePriceChoice === 5}
                            onChange={() => priceRateRadioHandle(150,250,5)}
                        />
                        <Form.Check
                            inline
                            label="All"
                            name="group1"
                            type="radio"
                            // defaultChecked={searchInfo.rangePriceChoice === 0}
                            checked={searchInfo.rangePriceChoice === 0}
                            onChange={() => priceRateRadioHandle(0,1000000,0)}
                        />
                    </div>
                    <div className="mb-3" style={{display:"flex", flexDirection:"column", width:"100%"}}>
                        <Form.Check
                            inline
                            label="30 - 60 bath"
                            name="group1"
                            type="radio"
                            // defaultChecked={searchInfo.rangePriceChoice === 2}
                            checked={searchInfo.rangePriceChoice === 2}
                            onChange={() => priceRateRadioHandle(30,60,2)}
                        />
                        <Form.Check
                            inline
                            label="100 - 150 bath"
                            name="group1"
                            type="radio"
                            // defaultChecked={searchInfo.rangePriceChoice === 4}
                            checked={searchInfo.rangePriceChoice === 4}
                            onChange={() => priceRateRadioHandle(100,150,4)}
                        />
                        <Form.Check
                            inline
                            label="more than 250 bath"
                            name="group1"
                            type="radio"
                            // defaultChecked={searchInfo.rangePriceChoice === 6}
                            checked={searchInfo.rangePriceChoice === 6}
                            onChange={() => priceRateRadioHandle(250,1000000,6)}
                        />
                    </div>
                </div>
            </Modal.Body>
            <hr/>
            <Modal.Body>
                <p>
                    TEACHING DAYS
                </p>
                <div style={{paddingLeft:"15px",display:"flex", flexDirection:"row", margin:"0px!important"}}>
                    <div style={{display:"flex", flexDirection:"column", width:"100%"}}>
                        <Form.Check
                            inline
                            label="Sunday"
                            name="group1"
                            type="checkbox"
                            checked={searchInfo.daysCheck[0]}
                            onChange={(e) => onDayCheck(0)}
                        />
                        <Form.Check
                            inline
                            label="Tuesday"
                            name="group1"
                            type="checkbox"
                            checked={searchInfo.daysCheck[2]}
                            onChange={(e) => onDayCheck(2)}
                        />
                        <Form.Check
                            inline
                            label="Thursday"
                            name="group1"
                            type="checkbox"
                            checked={searchInfo.daysCheck[4]}
                            onChange={(e) => onDayCheck(4)}
                        />
                        <Form.Check
                            inline
                            label="Saturday"
                            name="group1"
                            type="checkbox"
                            checked={searchInfo.daysCheck[6]}
                            onChange={(e) => onDayCheck(6)}
                        />
                    </div>
                    <div className="mb-3" style={{display:"flex", flexDirection:"column", width:"100%"}}>
                        <Form.Check
                            inline
                            label="Monday"
                            name="group1"
                            type="checkbox"
                            checked={searchInfo.daysCheck[1]}
                            onChange={(e) => onDayCheck(1)}
                        />
                        <Form.Check
                            inline
                            label="Wednesday"
                            name="group1"
                            type="checkbox"
                            checked={searchInfo.daysCheck[3]}
                            onChange={(e) => onDayCheck(3)}
                        />
                        <Form.Check
                            inline
                            label="Friday"
                            name="group1"
                            type="checkbox"
                            checked={searchInfo.daysCheck[5]}
                            onChange={(e) => onDayCheck(5)}
                        />
                        <Form.Check
                            inline
                            label="All"
                            name="group1"
                            type="checkbox"
                            checked={searchInfo.daysCheck[7]}
                            onChange={(e) => onDayCheck(7)}
                        />
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                {/* <button onClick={() => console.log(backupSearchInfo)}>test</button> */}
                <Button 
                    onClick={() => onCancelHandle()} 
                    variant="outline-secondary"
                    >
                    Cancel
                </Button>{' '}

                <Button 
                    onClick={() => setDefaultHandle()} 
                    variant="secondary"
                    >
                    Set Default
                </Button>{' '}

                <button 
                    className="apply-filter-button" 
                    onClick={() => {
                        setShow(false)
                        onSearch()
                        console.log("apply",searchInfo)
                    }}>
                    Apply Filter
                </button>
                {/* <Button onClick={() => setShow(false)}>Close</Button> */}
            </Modal.Footer>
        </Modal>
        )
}

export default SearchFilter