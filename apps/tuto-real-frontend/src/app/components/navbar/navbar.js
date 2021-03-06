import { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import {MdSearch} from 'react-icons/md'

import { SearchContext } from '../../app'
import { getNavbarData } from './navbarData'
import { useAuth } from '../../auth'
import './navbar.css'
import BookingOverlay from './booking/BookingOverlay'
import BookingRequestOverlay from './bookingRequest/BookingRequestOverlay'
// import ModalTwoButton from '../modal/ModalTwoButton'
import BookingActionModal from './BookingActionModal'

const NavBar = () => {
  // User have type => "Guest" | "Student" | "Admin" | "Tutor" //
  const [userType, setUserType] = useState("Guest")
  const [searchTextTemp, setSearchTextTemp] = useState("");

  const navigate = useNavigate()
  // const params = useParams();
  const { searchText, setSearchText } = useContext(SearchContext)
  const { logOut, _id, role, firstName, lastName } = useAuth()

  const [bookingOverlayTarget, setBookingOverlayTarget] = useState(null)
  const [bookingOverlayShow, setBookingOverlayShow] = useState(false)
  const [bookingRequestOverlayTarget, setBookingRequestOverlayTarget] = useState(null)
  const [bookingRequestOverlayShow, setBookingRequestOverlayShow] = useState(false)

  const [showModal, setShowModal] = useState('none');
  // const [isPending, setIsPending] = useState(false);
  // const [modalActionType, setModalActionType] = useState('None'); //( "None" || "Cancel" || "Approve" || "Reject")
  const [modalConfig, setModalConfig] = useState({
                                                    modalType: "None",//( "None" || "Cancel" || "Approve" || "Reject")
                                                    bookingId: "",
                                                    targetName:""
                                                });

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

  useEffect(() => {
    if (bookingOverlayShow) {
      setBookingRequestOverlayShow(false)
    }
  },[bookingOverlayShow])

  useEffect(() => {
    if (bookingRequestOverlayShow) {
      setBookingOverlayShow(false)
    }
  },[bookingRequestOverlayShow])

  const handleButton = (name, path, param, event) => {
    if(name === "Sign out") {
      console.log("Logging out....")
      logOut()
    }
    if(name === "Booking") {
      setBookingOverlayShow(!bookingOverlayShow);
      setBookingOverlayTarget(event.target);
      return
    }
    if(name === "Booking Request") {
      setBookingRequestOverlayShow(!bookingRequestOverlayShow);
      setBookingRequestOverlayTarget(event.target);
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
        <BookingOverlay 
          show={bookingOverlayShow} 
          setShow={setBookingOverlayShow}
          target={bookingOverlayTarget}
          setModalConfig={setModalConfig}
          // setSelectedBooking={setSelectedBooking}
        />
        <BookingRequestOverlay 
          show={bookingRequestOverlayShow} 
          setShow={setBookingRequestOverlayShow}
          target={bookingRequestOverlayTarget} 
          setModalConfig={setModalConfig} 
        />
        {navbarDataList}
      </div>

      {/* modal approve */}
      {(modalConfig.modalType === 'Cancel' ||
        modalConfig.modalType === 'Approve' || 
        modalConfig.modalType === 'Reject') && (
          <BookingActionModal
            modalConfig={modalConfig}
            setModalConfig={setModalConfig}
            setBookingOverlayShow={setBookingOverlayShow}
            setBookingRequestOverlayShow={setBookingRequestOverlayShow}
          />
      )}
    </div>
  )
}

export default NavBar