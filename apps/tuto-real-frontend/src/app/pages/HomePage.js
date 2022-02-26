import { Carousel } from 'react-bootstrap';
import './HomePage.css';

import COLORS from '../constants/color';

const HomePage = () => {
  return (
    <div
      style={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <div style={{ width: '100%' }}>
        <Carousel>
          <Carousel.Item>
            <img
              className="carousel-image"
              src="https://wallpapercave.com/wp/wp2777161.jpg"
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
              src="https://wallpaperaccess.com/full/170249.jpg"
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
              src="https://i.pinimg.com/originals/dd/a6/5a/dda65aa323dcbb528f60b79acd06af44.jpg"
              alt="Third slide"
            />
            <Carousel.Caption>
              <h3>Third slide label</h3>
              <p>
                Praesent commodo cursus magna, vel scelerisque nisl consectetur.
              </p>
            </Carousel.Caption>
          </Carousel.Item>

          <Carousel.Item>
            <img
              className="carousel-image"
              src="https://wallpaperaccess.com/full/938050.jpg"
              alt="Third slide"
            />
            <Carousel.Caption>
              <h3>Third slide label</h3>
              <p>
                Praesent commodo cursus magna, vel scelerisque nisl consectetur.
              </p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </div>
      <div style={{ margin: '50vh 0px' }}>
        <h2 style={{ color: COLORS.third }}>Welcome to</h2>
        <h1 style={{ fontSize: '10vh', color: COLORS.primary }}>
          Tutoreal.com
        </h1>
      </div>
    </div>
  );
};

export default HomePage;
