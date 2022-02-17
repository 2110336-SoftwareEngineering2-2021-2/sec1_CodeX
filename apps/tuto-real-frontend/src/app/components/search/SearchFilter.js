import { useState } from "react"
import { Button, Form, Modal } from "react-bootstrap"
import COLORS from "../../constants/color"
import './search.css'


const SearchFilter = ({show, setShow, searchInfo, setSearchInfo, onSearch, backupSearchInfo}) => {

    const [dummySubjects] = useState(["All","Math","Phys","Bio","Chem","Sci","Society","His","PE"])

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
            teachingDay: backupSearchInfo.teachingDay
        })
        setShow(false)
    }
    const setDefaultHandle = () => {
        setSearchInfo({
            ...searchInfo,
            subject: "All",
            minPrice: 0,
            maxPrice: 1000000,
            rangePriceChoice: 6,
            teachingDay: []
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
                            defaultChecked={searchInfo.rangePriceChoice === 1}
                            onClick={() => priceRateRadioHandle(0,30,1)}
                        />
                        <Form.Check
                            inline
                            label="60 - 100 bath"
                            name="group1"
                            type="radio"
                            defaultChecked={searchInfo.rangePriceChoice === 3}
                            onClick={() => priceRateRadioHandle(60,100,3)}
                        />
                        <Form.Check
                            inline
                            label="150 - 250 bath"
                            name="group1"
                            type="radio"
                            defaultChecked={searchInfo.rangePriceChoice === 5}
                            onClick={() => priceRateRadioHandle(150,250,5)}
                        />
                        <Form.Check
                            inline
                            label="All"
                            name="group1"
                            type="radio"
                            defaultChecked={searchInfo.rangePriceChoice === 0}
                            onClick={() => priceRateRadioHandle(0,1000000,0)}
                        />
                    </div>
                    <div className="mb-3" style={{display:"flex", flexDirection:"column", width:"100%"}}>
                        <Form.Check
                            inline
                            label="30 - 60 bath"
                            name="group1"
                            type="radio"
                            defaultChecked={searchInfo.rangePriceChoice === 2}
                            onClick={() => priceRateRadioHandle(30,60,2)}
                        />
                        <Form.Check
                            inline
                            label="100 - 150 bath"
                            name="group1"
                            type="radio"
                            defaultChecked={searchInfo.rangePriceChoice === 4}
                            onClick={() => priceRateRadioHandle(100,150,4)}
                        />
                        <Form.Check
                            inline
                            label="more than 250 bath"
                            name="group1"
                            type="radio"
                            defaultChecked={searchInfo.rangePriceChoice === 6}
                            onClick={() => priceRateRadioHandle(250,1000000,6)}
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
                        />
                        <Form.Check
                            inline
                            label="Tuesday"
                            name="group1"
                            type="checkbox"
                        />
                        <Form.Check
                            inline
                            label="Thursday"
                            name="group1"
                            type="checkbox"
                        />
                        <Form.Check
                            inline
                            label="Saturday"
                            name="group1"
                            type="checkbox"
                        />
                    </div>
                    <div className="mb-3" style={{display:"flex", flexDirection:"column", width:"100%"}}>
                        <Form.Check
                            inline
                            label="Monday"
                            name="group1"
                            type="checkbox"
                        />
                        <Form.Check
                            inline
                            label="Wednesday"
                            name="group1"
                            type="checkbox"
                        />
                        <Form.Check
                            inline
                            label="Friday"
                            name="group1"
                            type="checkbox"
                        />
                        <Form.Check
                            inline
                            label="All"
                            name="group1"
                            type="checkbox"
                        />
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
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
                        setShow(false),
                        onSearch()
                    }}>
                    Apply Filter
                </button>
                {/* <Button onClick={() => setShow(false)}>Close</Button> */}
            </Modal.Footer>
        </Modal>
        )
}

export default SearchFilter