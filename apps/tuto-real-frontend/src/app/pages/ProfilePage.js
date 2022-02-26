import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { client } from '../axiosConfig';
import ProfileInfo from '../components/profile/ProfileInfo';
import ProfileMenuBar from '../components/profile/ProfileMenuBar';
import ProfileTeachSchedule from '../components/profile/teach-schedule/ProfileTeachSchedule';

import { useAuth } from '../auth';
import ChangePassword from '../components/modal/ChangePassword';

const ProfilePage = () => {
  const [selecting, setSelecting] = useState('Info'); // "Info" | "Learn" | "Teach" | "Review"
  const [viewType, setViewType] = useState('StudentSelf'); // "TutorSelf" | "StudentSelf" | "TutorOther" | "StudentOther"
  const [zoomUrl, setZoomUrl] = useState(null);
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();

  const { currentUser, _id } = useAuth();

  const params = useParams();

  const navigate = useNavigate();
  const [targetRole, setTargetRole] = useState('');

  const [changePasswordShow, setChangePasswordShow] = useState(false);

  const fetchData = useCallback(async () => {
    await client({
      method: 'GET',
      // url: `/user/${targetEmail}`,
      url: `/user`,
      params: {
        _id: params?._id,
      },
    })
      .then(({ data: { data } }) => {
        console.log(data);
        setTargetRole(data?.role);
        setZoomUrl(data?.zoomStartURL ?? null);
        setFirstName(data.firstName);
        setLastName(data.lastName);
      })
      .catch((res) => {
        console.log(res);
      });
  }, [params]);

  useEffect(() => {
    if (params._id) fetchData();
    else navigate('/');
  }, [fetchData]);

  useEffect(() => {
    if (params?._id === _id) {
      if (targetRole === 'Tutor') setViewType('TutorSelf');
      if (targetRole === 'Student') setViewType('StudentSelf');
    } else if (targetRole === 'Tutor') setViewType('TutorOther');
    else setViewType('StudentOther');
  }, [currentUser, targetRole, _id, params]);

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
    // console.log(viewType)
    switch (selecting) {
      case 'Info':
        return (
          <ProfileInfo
            changePasswordShow={changePasswordShow}
            setChangePasswordShow={setChangePasswordShow}
            viewType={viewType}
            targetId={params?._id}
          />
        );
      case 'Learn':
        return null; // Replace null with Student Schedule page...
      case 'Teach':
        return (
          <ProfileTeachSchedule
            viewType={viewType}
            targetId={params?._id}
            zoomUrl={zoomUrl}
            firstName={firstName}
            lastName={lastName}
          />
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
      {viewType !== 'StudentOther' ? renderContent() : null}
      {/* {renderContent()} */}
      <ChangePassword
        show={changePasswordShow}
        setShow={setChangePasswordShow}
      />
    </>
  );
};

export default ProfilePage;
