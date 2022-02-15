import { useState } from "react"
import { Button, Form, Modal } from "react-bootstrap"
import COLORS from "../../constants/color"
import './search.css'


const SearchFilter = ({show, setShow}) => {

    const [dummySubjects] = useState(["All","Math","Phys","Bio","Chem","Sci","Society","His","PE"])


    return (
        <Modal
            show={show}
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
                    <Form.Select style={{width:"25%"}}>
                        {dummySubjects.map(e => (<option value={e}>{e}</option>))}
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
                        />
                        <Form.Check
                            inline
                            label="60 - 100 bath"
                            name="group1"
                            type="radio"
                        />
                        <Form.Check
                            inline
                            label="150 - 250 bath"
                            name="group1"
                            type="radio"
                        />
                        <Form.Check
                            inline
                            label="All"
                            name="group1"
                            type="radio"
                        />
                    </div>
                    <div className="mb-3" style={{display:"flex", flexDirection:"column", width:"100%"}}>
                        <Form.Check
                            inline
                            label="30 - 60 bath"
                            name="group1"
                            type="radio"
                        />
                        <Form.Check
                            inline
                            label="100 - 150 bath"
                            name="group1"
                            type="radio"
                        />
                        <Form.Check
                            inline
                            label="more than 250 bath"
                            name="group1"
                            type="radio"
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
                <Button onClick={() => setShow(false)} variant="outline-secondary">
                    Cancel
                </Button>{' '}

                <Button variant="secondary">
                    Set Default
                </Button>{' '}

                <button className="apply-filter-button" onClick={() => setShow(false)}>
                    Apply Filter
                </button>
                {/* <Button onClick={() => setShow(false)}>Close</Button> */}
            </Modal.Footer>
        </Modal>
        )
}

export default SearchFilter