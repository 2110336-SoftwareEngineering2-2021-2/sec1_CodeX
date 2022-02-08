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

const ProfileInfo = ({targetEmail, viewType}) => {
  // const [viewType, setViewType] = useState('TutorSelf'); // "TutorSelf" | "StudentSelf" | "TutorOther"
  const [isEditing, setEditing] = useState(false);
  const [basicInfo, setBasicInfo] = useState({
    picture: undefined,
    firstName: "",
    lastName: "",
    birthDate: {
      date: 1,
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
  const [tempProfile, setTempProfile] = useState({
    preview: "",
    raw: ""
  }); // use for preview new upload profile image

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const fetchData = useCallback(async () => {
    await client({
      method: 'GET',
      url: `/user/${targetEmail}`
    })
    .then(({data}) => {
      console.log("profile in fetch: ", data)
      console.log("fetch profile image @ ",data[0].profileImg.url)
      setTempProfile({
        ...tempProfile,
        preview: data[0].profileImg.url
      })
      setBasicInfo({
        picture: data[0].profileImg.url,
        firstName: data[0].firstName,
        lastName: data[0].lastName,
        birthDate: {
          date: parseInt(data[0].birthDate.substr(8,2)),
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

  useEffect(() => {
    console.log("tempProfile.preview set to: ",tempProfile.preview);
    console.log("tempProfile.raw set to: ",tempProfile.raw);
  }, [tempProfile]);

  const sendData = async (data) => {
    console.log('sending data...');
    // const formData = new FormData()
    // formData.append("Profile Picture", tempProfile, tempProfile?.name)
    await client({
      method: "PATCH",
      url: `/user/${targetEmail}`,
      data: {
        profileImg: {
          fileName: `${targetEmail}-profile-picture`,
          url: tempProfile.raw
        }, 
        firstName: data.firstName,
        // firstName: basicInfo.firstName,
        lastName: data.lastName,
        birthDate: translateDateForSendToBack(data.date, data.month, data.year),
        address: data.address,
      }
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
      picture: tempProfile.preview,
      // picture: tempProfile ?? basicInfo.picture,
      firstName: data.firstName,
      lastName: data.lastName,
      // birthDate: new Date(data.year, data.month, data.date),
      birthDate: {
        date: data.date,
        month: data.month,
        year: data.year
      }
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
      preview: basicInfo.picture
    });
    setEditing(false);
    //console.log(translateDateForSendToBack(1,1,2022));
  };

  const renderViewForm = () => {
    return (
      <>
        <ViewBasicInfo viewType={viewType} basicInfo={basicInfo} />
        <ViewContactInfo viewType={viewType} contactInfo={contactInfo} />
      </>
    );
  };

  // function translateDateForSendToBack(date, month, year) {
  //   var temp = "";

  //   if (month < 10) {
  //     temp += "0";
  //   }
  //   temp += month.toString() + "/";

  //   if (date < 10) {
  //     temp += "0";
  //   }
  //   temp += date.toString() + "/";

  //   temp += (year % 100).toString();

  //   return temp;
  // }

  function translateDateForSendToBack(date, month, year) {
    var temp = "";
    temp += year + "-"; 

    if (month < 10) {
      temp += "0";
    }
    temp += month.toString() + "-";

    if (date < 10) {
      temp += "0";
    }
    temp += date.toString() + "T17:00:00.000+00:00";

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
    <>
      {isEditing ? renderEditForm() : renderViewForm()}
      {viewType !== 'TutorOther' ? (
        <>
          <AdvanceInfo advance={advance} targetEmail={targetEmail} viewType={viewType}/>
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
                whenClick={() => {
                  setEditing(true);
                  setTempProfile({
                    ...tempProfile,
                    raw: ""
                  })
                }}
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
