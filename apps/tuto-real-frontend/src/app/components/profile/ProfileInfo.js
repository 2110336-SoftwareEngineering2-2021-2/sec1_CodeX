import { useState, useEffect, useCallback } from 'react';
import { Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';

import { useAuth } from '../../auth';
import { client } from '../../axiosConfig';
import AdvanceInfo from './AdvanceInfo';
import ViewContactInfo from './ViewContactInfo';
import ViewBasicInfo from './ViewBasicInfo';
import EditBasicInfo from './EditBasicInfo';
import EditContactInfo from './EditContactInfo';
import NormalButton from '../ui/NormalButton';
import ChangePassword from '../modal/ChangePassword';
import UserReportUI from '../report/UserReportUI';
import './profile.css';

import COLORS from '../../constants/color';

const ProfileInfo = ({ targetId, viewType }) => {
  // const [viewType, setViewType] = useState('TutorSelf'); // "TutorSelf" | "StudentSelf" | "TutorOther"
  const [isEditing, setEditing] = useState(false);
  const [basicInfo, setBasicInfo] = useState({
    picture: undefined,
    firstName: '',
    lastName: '',
    birthDate: {
      date: 1,
      month: 1,
      year: 2020,
    },
    citizenId: '',
  });
  const [contactInfo, setContactInfo] = useState({
    email: '',
    telephone: '',
    address: '',
  });
  const [advance, setAdvance] = useState({
    userType: 'User',
    password: '',
  });
  const [tempProfile, setTempProfile] = useState({
    preview: '',
    raw: '',
  }); // use for preview new upload profile image
  const [changePasswordShow, setChangePasswordShow] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const { _id, setReset } = useAuth();

  const fetchData = useCallback(async () => {
    // console.log(targetId)
    await client({
      method: 'GET',
      url: `/user`,
      params: {
        _id: targetId,
      },
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then(({ data: { data } }) => {
        setTempProfile({
          ...tempProfile,
          preview: data.profileImg.url,
        });
        setBasicInfo({
          picture: data.profileImg.url,
          firstName: data.firstName,
          lastName: data.lastName,
          birthDate: {
            date: parseInt(data.birthDate.substr(8, 2)),
            month: parseInt(data.birthDate.substr(5, 2)),
            year: parseInt(data.birthDate.substr(0, 4)),
          },
          citizenId: data.citizenID,
        });
        setContactInfo({
          email: data.email,
          telephone: data.phoneNumber,
          address: data.address,
        });
        setAdvance({
          userType: data.role,
          password: '',
        });
      })
      .catch(({ response }) => {
        console.log(response);
      });
  }, [targetId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const sendData = async (data) => {
    console.log('sending data...');
    let changeData = {
      firstName: data.firstName,
      lastName: data.lastName,
      birthDate: translateDateForSendToBack(data.date, data.month, data.year),
      address: data.address,
    };
    if (tempProfile.raw)
      changeData = { ...changeData, profile64: tempProfile.raw };
    await client({
      method: 'PATCH',
      url: `/user`,
      params: {
        _id: targetId,
      },
      data: changeData,
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then(({ data: { data } }) => {
        console.log(data);
        setReset(true);
      })
      .catch((res) => {
        console.log(res);
      });
  };

  const onSubmit = (data) => {
    setBasicInfo({
      ...basicInfo,
      picture: tempProfile.preview,
      // picture: tempProfile ?? basicInfo.picture,
      firstName: data.firstName,
      lastName: data.lastName,
      // birthDate: new Date(data.year, data.month, data.date),
      birthDate: {
        date: data.date,
        month: data.month,
        year: data.year,
      },
    });
    setContactInfo({
      ...contactInfo,
      address: data.address,
    });
    sendData(data);
    setEditing(false);
  };

  const onCancel = () => {
    reset();
    setTempProfile({
      ...tempProfile,
      preview: basicInfo.picture,
    });
    setEditing(false);
  };

  const renderViewForm = () => {
    return (
      <>
        <ViewBasicInfo
          viewType={viewType}
          basicInfo={basicInfo}
          setShowReportModal={setShowReportModal}
        />
        <ViewContactInfo viewType={viewType} contactInfo={contactInfo} />
      </>
    );
  };

  function translateDateForSendToBack(date, month, year) {
    var temp = '';
    temp += year + '-';

    if (month < 10) {
      temp += '0';
    }
    temp += month.toString() + '-';

    if (date < 10) {
      temp += '0';
    }
    temp += date.toString() + 'T17:00:00.000+00:00';

    return temp;
    // 2001-03-12T17:00:00.000+00:00
  }

  const renderEditForm = () => {
    return (
      <Form className="form">
        <EditBasicInfo
          register={register}
          errors={errors}
          basicInfo={basicInfo}
          tempProfile={tempProfile}
          setTempProfile={setTempProfile}
        />
        <EditContactInfo
          register={register}
          errors={errors}
          contactInfo={contactInfo}
        />
      </Form>
    );
  };

  return (
    <div
      style={{
        width: '100%',
        padding: '0px 20px',
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      {isEditing ? renderEditForm() : renderViewForm()}
      {viewType !== 'TutorOther' ? (
        <>
          <AdvanceInfo
            setChangePasswordShow={setChangePasswordShow}
            advance={advance}
            viewType={viewType}
          />
          <div className="profile-info-button-zone">
            {isEditing ? (
              <>
                <NormalButton
                  title={'Submit'}
                  whenClick={handleSubmit(onSubmit)}
                  size={'l'}
                  bgColor={COLORS.third}
                />
                <NormalButton
                  title={'Cancel'}
                  whenClick={onCancel}
                  size={'l'}
                  bgColor={COLORS.yellow}
                />
              </>
            ) : (
              <NormalButton
                title={'Edit'}
                whenClick={() => {
                  setEditing(true);
                  setTempProfile({
                    ...tempProfile,
                    raw: undefined,
                  });
                }}
                size={'l'}
                bgColor={COLORS.third}
              />
            )}
          </div>
        </>
      ) : null}
      <ChangePassword
        show={changePasswordShow}
        setShow={setChangePasswordShow}
      />

      <UserReportUI
        show={showReportModal}
        closeModal={() => setShowReportModal(false)}
        targetId={targetId}
        targetName={`${basicInfo.firstName} ${basicInfo.lastName}`}
        reporterId={_id}
      />
    </div>
  );
};

export default ProfileInfo;
