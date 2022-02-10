import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { client } from '../axiosConfig';
import ModalRequestButton from '../components/changeacc/ModalRequestButton';
import UploadButton from '../components/changeacc/UploadButton';
import './ChangeAccountTypePage.css';

const ChangeAccountTypePage = () => {
  const back = '< Back';

  const location = useLocation();
  const { ownerRequestEmail } = location.state;

  //use for display
  const [citizenID, setCitizenID] = useState({ preview: '', raw: '' });
  const [transcription, setTranscription] = useState({ preview: '', raw: '' });
  const [isPending, setIsPending] = useState(false);

  //modal
  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();

  //send to DB
  const [sendImage, setSendImage] = useState({
    email: 'sorasit@gmail.com',
    citizenID64: '',
    transcription64: '',
  });

  //change to base64 function
  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  useEffect(() => {
    console.log(sendImage)
  }, [sendImage])


  //handle citizenid upload
  const handleSelectCid = async (e) => {
    if (e.target.files.length) {
      setCitizenID({
        preview: URL.createObjectURL(e.target.files[0]),
        raw: e.target.files[0],
      });

      if ((await toBase64(e.target.files[0])).substr(11, 4) === 'jpeg') {
        //jpeg case
        setSendImage({
          ...sendImage,
          email:ownerRequestEmail,
          citizenID64: (await toBase64(e.target.files[0])).substr(23),
        });
      } else {
        //png case
        setSendImage({
          ...sendImage,
          email:ownerRequestEmail,
          citizenID64: (await toBase64(e.target.files[0])).substr(22),
        });
      }
    }
  };

  //handle transcription upload
  const handleSelectTrans = async (e) => {
    if (e.target.files.length) {
      setTranscription({
        preview: URL.createObjectURL(e.target.files[0]),
        raw: e.target.files[0],
      });

      setSendImage({
        ...sendImage,
        email:ownerRequestEmail
      })

      if ((await toBase64(e.target.files[0])).substr(11, 4) === 'jpeg') {
        //jpeg case
        setSendImage({
          ...sendImage,
          email:ownerRequestEmail,
          transcription64: (await toBase64(e.target.files[0])).substr(23),
        });
      } else {
        //png case
        setSendImage({
          ...sendImage,
          email:ownerRequestEmail,
          transcription64: (await toBase64(e.target.files[0])).substr(22),
        });
      }
    }
  };

  //send file to DB
  const handleUploadFile = (event) => {
    console.log(sendImage);
    setIsPending(true);

    client({
      url: '/tutorReq/create',
      method: 'POST',
      data: sendImage,
    })
      .then(({ data }) => {
        console.log(data);
        setIsPending(false);
        setShowModal(true);
      })
      .catch(({ response }) => {
        console.log(response);
      });
  };

  const backToOwnerProfileHandle = () => {
    setShowModal(false);
    // navigate("/profile", {state:{targetEmail: "poneiei@mail.com"}})
    navigate('/profile', { state: { targetEmail: ownerRequestEmail } });
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
      }}
    >
      {/* back button */}
      <div style={{ display: 'flex', width: '45%' }}>
        <Link
          className="backtoprofile shadow"
          to="/profile"
          state={{
            // targetEmail: "nifon@gmail.com"
            targetEmail: ownerRequestEmail,
          }}
        >
          {back}
        </Link>
      </div>

      <div className="info-card shadow">
        {/* title */}
        <p className="title left" style={{ width: '100%' }}>
          upgrade user's type form
        </p>
        <p className="header" style={{ width: '100%' }}>
          Please submit your copy of citizen id card and transcription
        </p>
        <hr />

        {/* upload citizenID section */}
        <div className="section" style={{ alignItems: 'flex-start' }}>
          <p className="header" style={{ width: '30%' }}>
            COPY OF CITIZEN ID CARD
          </p>
          <UploadButton
            id="cidUpload"
            image={citizenID}
            setimage={handleSelectCid}
            csstext="upload-text"
            csslabel="upload"
            cssimage="upload-image"
          />
        </div>
        <hr />

        {/* upload transcription section */}
        <div className="section" style={{ alignItems: 'flex-start' }}>
          <p className="header" style={{ width: '30%' }}>
            TRANSCRIPTION
          </p>
          <UploadButton
            id="transUpload"
            image={transcription}
            setimage={handleSelectTrans}
            csstext="upload-text"
            csslabel="upload"
            cssimage="upload-image"
          />
        </div>
      </div>

      {/* submit with disabled */}
      <div
        style={{ display: 'flex', flexDirection: 'row-reverse', width: '45%' }}
      >
        {(!transcription.preview || !citizenID.preview) && (
          <button className="submit-close shadow" disabled>
            Submit
          </button>
        )}
      </div>

      {/* submit without disabled */}
      <div
        style={{ display: 'flex', flexDirection: 'row-reverse', width: '45%' }}
      >
        {!isPending && transcription.preview && citizenID.preview && (
          <button
            onClick={handleUploadFile}
            className="submit-open shadow"
            data-toggle="modal"
          >
            Submit
          </button>
        )}
      </div>

      {/* submit is pending */}
      <div
        style={{ display: 'flex', flexDirection: 'row-reverse', width: '45%' }}
      >
        {isPending && (
          <button className="submit-close shadow" disabled>
            Sending...
          </button>
        )}
      </div>

      {/* change account type page modal */}
      <ModalRequestButton
        setshow={setShowModal}
        show={showModal}
        whenClickButton={backToOwnerProfileHandle}
      />
    </div>
  );
};

export default ChangeAccountTypePage;
