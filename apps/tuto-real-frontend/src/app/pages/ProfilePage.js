import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { useAuth } from '../auth';
import { client } from '../axiosConfig';
import ProfileInfo from '../components/profile/ProfileInfo';
import ProfileMenuBar from '../components/profile/ProfileMenuBar';
import ProfileTeachSchedule from '../components/profile/teach-schedule/ProfileTeachSchedule';
import ProfileReview from '../components/profile/review/ProfileReview';

const ProfilePage = () => {
  const [selecting, setSelecting] = useState('Info'); // "Info" | "Learn" | "Teach" | "Review"
  const [viewType, setViewType] = useState('StudentSelf'); // "TutorSelf" | "StudentSelf" | "TutorOther" | "StudentOther"
  const [zoomUrl, setZoomUrl] = useState(null);
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [targetRole, setTargetRole] = useState('');

  const { _id } = useAuth();
  const params = useParams();
  const navigate = useNavigate();

  const fetchData = useCallback(async () => {
    await client({
      method: 'GET',
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
    setSelecting('Info');
  }, [targetRole]);

  useEffect(() => {
    if (params?._id === _id) {
      if (targetRole === 'Tutor') setViewType('TutorSelf');
      if (targetRole === 'Student') setViewType('StudentSelf');
    } else if (targetRole === 'Tutor') setViewType('TutorOther');
    else setViewType('StudentOther');
  }, [targetRole, _id, params]);

  const renderContent = () => {
    switch (selecting) {
      case 'Info':
        return <ProfileInfo viewType={viewType} targetId={params?._id} />;
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
        return <ProfileReview />; // Replace null with Review page...
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
    </>
  );
};

export default ProfilePage;
