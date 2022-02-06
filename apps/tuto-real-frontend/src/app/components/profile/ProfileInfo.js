import React, { useState, useEffect, useCallback } from 'react';
import { Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';

import { client } from '../../axiosConfig';
import AdvanceInfo from './AdvanceInfo';
import ViewContactInfo from './ViewContactInfo';
import ViewBasicInfo from './ViewBasicInfo';
import EditBasicInfo from './EditBasicInfo';
import EditContactInfo from './EditContactInfo';
import NormalButton from '../ui/NormalButton';
import './profile.css';

import COLORS from '../../constants/color';

const ProfileInfo = () => {
  const [viewType, setViewType] = useState('TutorSelf'); // "TutorSelf" | "StudentSelf" | "TutorOther"
  const [isEditing, setEditing] = useState(false);
  const [basicInfo, setBasicInfo] = useState({
    picture: undefined,
    firstName: "",
    lastName: "",
    birthDate: {
      day: 1,
      month: 1,
      year: 2020
    },
    citizenId: ""
  })
  const [contactInfo, setContactInfo] = useState({
    email: "",
    telephone: "",
    address: ""
  })
  const [advance, setAdvance] = useState({
    userType: 'User',
    password: '',
  });
  const [tempProfile, setTempProfile] = useState(); // use for preview new upload profile image

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const fetchData = useCallback(async () => {
    await client({
      method: 'GET',
      // url: `/user/${contactInfo.email}`
      url: "/user/nifon@gmail.com"
    })
    .then(({data}) => {
      console.log(data[0])
      // console.log(Date(data[0].birthDate))
      // console.log(new Date())
      setBasicInfo({
        picture: "",//data[0].profileImg.fileName,
        firstName: data[0].firstName,
        lastName: data[0].lastName,
        birthDate: {
          day: parseInt(data[0].birthDate.substr(8,2)),
          month: parseInt(data[0].birthDate.substr(5,2)),
          year: parseInt(data[0].birthDate.substr(0,4))
        },
        citizenId: data[0].citizenID
      })
      setContactInfo({
        email: data[0].email,
        telephone: data[0].phoneNumber,
        address: data[0].address
      })
      setAdvance({
        userType: data[0].role,
        password: ""
      })
    })
    .catch(({response}) => {
      console.log(response)
    })
  },[])

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const sendData = async () => {
    console.log('sending data...');
    // const formData = new FormData()
    // formData.append("Profile Picture", tempProfile, tempProfile?.name)
    await client({
      method: "PATCH",
      url: "/user/nifon@gmail.com"
    })
    .then(({data}) => {
      console.log(data)
    })
    .catch((res) => {
      console.log(res)
    })
  }

  const onSubmit = (data) => {
    console.log(data);
    console.log(tempProfile);
    setBasicInfo({
      ...basicInfo,
      picture: tempProfile ?? basicInfo.picture,
      firstName: data.firstName,
      lastName: data.lastName,
      birthDate: new Date(data.year, data.month, data.date),
    });
    setContactInfo({
      ...contactInfo,
      telephone: data.telephone,
      address: data.address,
    });
    // sendData()
    setEditing(false);
  };

  const onCancel = () => {
    reset();
    setTempProfile(basicInfo.picture);
    setEditing(false);
  };

  const renderViewForm = () => {
    return (
      <>
        <ViewBasicInfo viewType={viewType} basicInfo={basicInfo} />
        <ViewContactInfo viewType={viewType} contactInfo={contactInfo} />
      </>
    );
  };

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
    <>
      {isEditing ? renderEditForm() : renderViewForm()}
      {viewType !== 'TutorOther' ? (
        <>
          <AdvanceInfo advance={advance} />
          {isEditing ? (
            <div
              style={{ width: '45%', textAlign: 'right', marginBottom: '5%' }}
            >
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
            </div>
          ) : (
            <div
              style={{ width: '45%', textAlign: 'right', marginBottom: '5%' }}
            >
              <NormalButton
                title={'Edit'}
                whenClick={() => setEditing(true)}
                size={'l'}
                bgColor={COLORS.third}
              />
            </div>
          )}
        </>
      ) : null}
    </>
  );
};

export default ProfileInfo;
