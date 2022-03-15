import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import BarButton from '../ui/BarButton';
import './profile.css';

const ProfileMenuBar = ({ viewType, selecting, setSelecting }) => {
  // const [selecting, setSelecting] = useState("Info") // "Info" | "Learn" | "Teach" | "Review"
  const [widthStyle] = useState(() => {
    switch (viewType) {
      case 'TutorSelf':
        return '25%';
      case 'StudentSelf':
        return '50%';
      case 'TutorOther':
        return '33.33%';
      default:
        return undefined;
    }
  });

  const navigate = useNavigate();

  return (
    <div className="profile-page-menu-bar-zone">
      {/* Button Bar Section */}
      <div className="menu-bar-side show-more-than-1000px">
        <button className="menu-bar-side-button" onClick={() => navigate(-1)}>
          <AiOutlineArrowLeft />
        </button>
      </div>
      <div className="bar-with-button">
        <button
          className="menu-bar-side-button show-less-than-1000px"
          onClick={() => navigate(-1)}
        >
          <AiOutlineArrowLeft />
        </button>
        {viewType !== 'StudentOther' ? (
          <div className="bar">
            <BarButton
              title="Information"
              onSelect={() => setSelecting('Info')}
              isActive={selecting === 'Info'}
              widthStyle={widthStyle}
            />
            {viewType !== 'TutorOther' ? (
              <BarButton
                title="Learn Schedule"
                onSelect={() => setSelecting('Learn')}
                isActive={selecting === 'Learn'}
                widthStyle={widthStyle}
              />
            ) : null}
            {viewType !== 'StudentSelf' ? (
              <BarButton
                title="Teach Schedule"
                onSelect={() => setSelecting('Teach')}
                isActive={selecting === 'Teach'}
                widthStyle={widthStyle}
              />
            ) : null}
            {viewType !== 'StudentSelf' ? (
              <BarButton
                title="Reviews"
                onSelect={() => setSelecting('Review')}
                isActive={selecting === 'Review'}
                widthStyle={widthStyle}
              />
            ) : null}
          </div>
        ) : (
          <div>
            <p style={{ margin: '3vh', color: 'red', fontWeight: 'bold' }}>
              This site can't load: because you don't have permission to see
              this infomation of Student's user
            </p>
            {/* <img src="https://www.vhv.rs/dpng/d/415-4157925_transparent-pepe-frog-png-pepe-the-frog-punching.png" alt="frog punching" width={"60%"}/> */}
            <Button variant="primary" onClick={() => navigate(-1)}>
              Click here to go back
            </Button>
          </div>
        )}
      </div>
      <div className="menu-bar-side show-more-than-1000px" />
    </div>
  );
};

export default ProfileMenuBar;
