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
              src="https://images.wallpaperscraft.com/image/single/headphones_books_education_121501_1366x768.jpg"
              alt="First slide"
            />
            <Carousel.Caption>
              {/* <div className='carousel-caption' id='home-page'>
                <h1 style={{fontSize:"10vh"}}>TutoReal</h1>
              </div> */}

              <h3>TutoReal to find your tutor</h3>
              <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
            </Carousel.Caption>
          </Carousel.Item>

          <Carousel.Item>
            <img
              className="carousel-image"
              src="https://quotefancy.com/media/wallpaper/3840x2160/13453-Henry-David-Thoreau-Quote-Success-usually-comes-to-those-who-are.jpg"
              alt="Second slide"
            />
            <Carousel.Caption>
              <h3>Never stop learning</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </Carousel.Caption>
          </Carousel.Item>

          <Carousel.Item>
            <img
              className="carousel-image"
              src="https://quotefancy.com/media/wallpaper/3840x2160/1699923-Steve-Jobs-Quote-Learn-continually-There-s-always-one-more-thing.jpg"
              alt="Third slide"
            />
            <Carousel.Caption>
              <h3>The endless learning</h3>
              <p>
                Praesent commodo cursus magna, vel scelerisque nisl consectetur.
              </p>
            </Carousel.Caption>
          </Carousel.Item>

          <Carousel.Item>
            <img
              className="carousel-image"
              src="https://quotefancy.com/media/wallpaper/3840x2160/50061-Will-Rogers-Quote-A-man-only-learns-in-two-ways-one-by-reading-and.jpg"
              alt="Third slide"
            />
            <Carousel.Caption>
              {/* <h3>Don't stop learn</h3> */}
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
