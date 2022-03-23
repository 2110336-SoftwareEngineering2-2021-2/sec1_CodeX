import { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import {MdSearch} from 'react-icons/md'

import { SearchContext } from '../../app'
import { getNavbarData } from './navbarData'
import { useAuth } from '../../auth'
import './navbar.css'
import BookingOverlay from './booking/BookingOverlay'
import BookingRequestOverlay from './bookingRequest/BookingRequestOverlay'
import ModalTwoButton from '../modal/ModalTwoButton'

const NavBar = () => {
  // User have type => "Guest" | "Student" | "Admin" | "Tutor" //
  const [userType, setUserType] = useState("Guest")
  const [searchTextTemp, setSearchTextTemp] = useState("");

  const navigate = useNavigate()
  // const params = useParams();
  const { searchText, setSearchText } = useContext(SearchContext)
  const { logOut, _id, role, firstName, lastName } = useAuth()

  const [bookingTarget, setBookingTarget] = useState(null)
  const [bookingShow, setBookingShow] = useState(false)
  const [bookingRequestTarget, setBookingRequestTarget] = useState(null)
  const [bookingRequestShow, setBookingRequestShow] = useState(false)

  const [showModal, setShowModal] = useState('none');
  const [isPending, setIsPending] = useState(false);

  const navbarDataList = getNavbarData(userType).map(item => (
    <button 
      key={item.id} 
      className={item.style} 
      style={{marginRight: "2%"}} 
      onClick={(event) => handleButton(item.name, item.path, item.param, event)}>
        {item.icon}
        <p style={{width: "-webkit-fill-available"}}>{item.name !== "User Name"? item.name: `${firstName} ${lastName}`}</p>
    </button>     
  ))

  useEffect(() => {
    if(role) setUserType(role)
    else setUserType("Guest")
  },[role])

  useEffect(() => {
    setSearchTextTemp(searchText)
  },[searchText])

  // useEffect(() => {
  //   if(params?.searchText) {
  //     setSearchText(params?.searchText)
  //   }
  // },[params.searchText])

  const handleButton = (name, path, param, event) => {
    if(name === "Sign out") {
      console.log("Logging out....")
      logOut()
    }
    if(name === "Booking") {
      setBookingShow(!bookingShow);
      setBookingTarget(event.target);
      return
    }
    if(name === "Booking Request") {
      setBookingRequestShow(!bookingRequestShow);
      setBookingRequestTarget(event.target);
      return
    }
    if(param) {
      if(param === "_id") navigate(`${path}/${_id}`)
    } else navigate(path)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      setSearchText(searchTextTemp)
      navigate(`/search`)
    }
  }

  const handleConfirm = () => {
     
  };
  
  const handleCancel = () => {
      setShowModal(true);
      setBookingRequestShow(!bookingRequestShow);
  };

  return (
    <div className='navbar'>
      <div className='left-side'>
        <button className='main-icon' onClick={() => navigate('/')}>TutoReal</button>
        <div className='search-bar'>
          <MdSearch size="5%" color='gray' style={{marginLeft: "2%"}} />
          <input 
            type='text' 
            placeholder='Search to find your interested tutor.'
            value={searchTextTemp}
            onKeyDown={handleKeyDown}
            onChange={(e) => setSearchTextTemp(e.target.value)}
          />
        </div>
      </div>
      <div className='right-side'>
        <BookingOverlay show={bookingShow} target={bookingTarget}/>
        <BookingRequestOverlay show={bookingRequestShow} target={bookingRequestTarget} 
        setShowModal={setShowModal} setShow={setBookingRequestShow}/>
        {navbarDataList}
      </div>

      {/* modal approve */}
      {showModal === 'Approve' && (
            <ModalTwoButton
              title="Do you want to approve the booking?"
              header="If you click confirm button, that user will become a member of your course."
              leftFunc={handleConfirm}
              rightFunc={handleCancel}
              leftMessage="Confirm"
              rightMessage="Cancel"
              leftColor="var(--third)"
              rightColor="cancel-button"
              isPending={isPending}
              leftPending="Confirm..."
              leftPendingColor="var(--lightgray)"
            />
        )}
    </div>
  )
}

export default NavBar