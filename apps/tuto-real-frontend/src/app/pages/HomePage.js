import React from 'react';
import { Carousel } from 'react-bootstrap';
import { useAuth } from '../auth';
import COLORS from '../constants/color';
import './HomePage.css'

import {
  HOMEPAGE_WALLPAPER_1, 
  HOMEPAGE_WALLPAPER_2, 
  HOMEPAGE_WALLPAPER_3,
  HOMEPAGE_WALLPAPER_4,
  HOMEPAGE_WALLPAPER_5,
  HOMEPAGE_WALLPAPER_6
} from '../constants/image'

const HomePage = () => {
  const {
    currentUser,
    signUp,
    signInWithGoogle,
    logIn,
    logOut,
    updateUserPassword,
    resetPassword,
  } = useAuth();

  return (
    <div style={{width:"100%", display:"flex", flexDirection:"column", alignItems:"center"}}>
      <div style={{width:"100%"}}>
        <Carousel>
          <Carousel.Item>
            <img
              className="carousel-image"
              src={HOMEPAGE_WALLPAPER_1}
              // style={{borderRadius:"0px", width:"100%", height:"85vh", objectFit:"cover"}}
              alt="First slide"
            />
            <Carousel.Caption>
              {/* <div className='carousel-caption' id='home-page'>
                <h1 style={{fontSize:"10vh"}}>TutoReal</h1>
              </div> */}

              <h3>First slide label</h3>
              <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
            </Carousel.Caption>
          </Carousel.Item>

          <Carousel.Item>
            <img
              className="carousel-image"
              src={HOMEPAGE_WALLPAPER_4}
              // style={{borderRadius:"0px", width:"100%", height:"85vh", objectFit:"cover"}}
              alt="Second slide"
            />
            <Carousel.Caption>
              <h3>Second slide label</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </Carousel.Caption>
          </Carousel.Item>

          <Carousel.Item>
            <img
              className="carousel-image"
              src={HOMEPAGE_WALLPAPER_5}
              // style={{borderRadius:"0px", width:"100%", height:"85vh", objectFit:"cover"}}
              alt="Third slide"
            />
            <Carousel.Caption>
              <h3>Third slide label</h3>
              <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
            </Carousel.Caption>
          </Carousel.Item>

          <Carousel.Item>
            <img
              className="carousel-image"
              src={HOMEPAGE_WALLPAPER_6}
              // style={{borderRadius:"0px", width:"100%", height:"85vh", objectFit:"cover"}}
              alt="Third slide"
            />
            <Carousel.Caption>
              <h3>Third slide label</h3>
              <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
        {/* <img src={TESTFUCK} /> */}
        {/* <img
          // className="d-block w-100"
          src={HOMEPAGE_WALLPAPER_5}
          style={{borderRadius:"0px", width:"100%", height:"100vh", objectFit:"cover"}}
          alt="Third slide"
        /> */}
      </div>
      <div style={{margin:"50vh 0px"}}>
        <h2 style={{color:COLORS.third}}>
          Welcome to
        </h2>
        <h1 style={{fontSize:"10vh", color:COLORS.primary}}>
          Tutoreal.com
        </h1>
      </div>
    </div>
  )
};

export default HomePage;
