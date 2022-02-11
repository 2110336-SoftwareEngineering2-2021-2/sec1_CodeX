import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { client } from '../axiosConfig';
import ProfileInfo from '../components/profile/ProfileInfo';
import ProfileMenuBar from '../components/profile/ProfileMenuBar';
import ProfileTeachSchedule from '../components/profile/teach-schedule/ProfileTeachSchedule';
// import { getCookieData } from '../components/util/cookieHandler'

import { useAuth } from '../auth';
import { useLocation } from 'react-router-dom';

const ProfilePage = () => {
  const [selecting, setSelecting] = useState('Info'); // "Info" | "Learn" | "Teach" | "Review"
  const [viewType, setViewType] = useState('TutorOther'); // "TutorSelf" | "StudentSelf" | "TutorOther" | "StudentOther"

  const { currentUser } = useAuth();
  // todo: uncomment this 
  // const { currentUser, _id } = useAuth();
  // const currentId = useState(_id);
  const currentId = useState("1234");

  const params = useParams();

  const navigate = useNavigate();
  const location = useLocation();
  const [targetEmail] = useState(location.state?.targetEmail);
  const [targetId] = useState(params?._id);
  const [targetRole, setTargetRole] = useState('');

  const fetchData = useCallback(async () => {
    console.log('Fetching.........');
    await client({
      method: 'GET',
      url: `/user/${targetEmail}`,

      // todo: uncomment this
      // url: `/user`,
      // params: {
      //   _id: targetId
      // }
    })
      .then(({ data: {data} }) => {
        console.log(data);
        // console.log("currentUser: ", firstName, " ", lastName, " ", currentUser)
        // setViewType(calculateViewType(data[0]?.role))
        setTargetRole(data?.role);
      })
      .catch((res) => {
        console.log(res);
      });
  }, []);

  useEffect(() => {
    fetchData();
    console.log(params);
  }, [fetchData]);

  // useEffect(() => {
  //   if (!location.state) navigate('/');
  // }, []);
  useEffect(() => {
    if (!params._id) navigate('/');
  }, []);

  useEffect(() => {
    if (targetEmail === currentUser?.email) {
    // if (targetId === currentId) {
    // if (false) {
      if (targetRole === 'Tutor') setViewType('TutorSelf');
      if (targetRole === 'Student') setViewType('StudentSelf');
    } 
    else if (targetRole === 'Tutor') setViewType('TutorOther'); 
    else setViewType('StudentOther');
  }, [currentUser, targetRole]);

  // useEffect(() => {
  //   console.log("Current User Updated!!!!")
  //   if(!location.state && currentUser) setTargetEmail(currentUser.email)
  // },[currentUser])

  // function calculateViewType(targetProfileUserType) {
  //   console.log(currentUser?.email)
  //   if (targetEmail === currentUser?.email) {
  //   // if ((targetEmail ?? dummyTargetEmail) === currentUser.email) {
  //     if (targetProfileUserType === "Tutor"){
  //       return "TutorSelf"
  //     }
  //     if (targetProfileUserType === "Student"){
  //       return "StudentSelf"
  //     }
  //   }
  //   else {
  //     return "TutorOther"
  //   }
  // }

  const renderContent = () => {
    console.log(viewType)
    switch (selecting) {
      case 'Info':
        return <ProfileInfo targetEmail={targetEmail} viewType={viewType} targetId={currentId}/>;
      case 'Learn':
        return null; // Replace null with Student Schedule page...
      case 'Teach':
        return (
          <ProfileTeachSchedule targetEmail={targetEmail} viewType={viewType} targetId={currentId}/>
        );
      case 'Review':
        return null; // Replace null with Review page...
      default:
        return <ProfileInfo />;
    }
  };

  return (
    <>
      <ProfileMenuBar
        viewType={viewType}
        setSelecting={setSelecting}
        selecting={selecting}
      />
      {viewType !== "StudentOther" ? renderContent() : null}
      {/* {renderContent()} */}
    </>
  );
};

export default ProfilePage;
