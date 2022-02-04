import React, { useState} from 'react';
import { Link } from 'react-router-dom';
import { client } from '../axiosConfig';
import ModalRequestButton from '../components/changeacc/ModalRequestButton';
import UploadButton from '../components/changeacc/UploadButton';
import './ChangeAccountTypePage.css'

const ChangeAccountTypePage = () => {

    const back = '< Back'
    const [citizenID, setCitizenID] = useState({preview: "", raw : ""})
    const [transcription, setTranscription] = useState({preview: "", raw : ""})
    const [showModal,setShowModal] = useState(false)
    const [sendImage, setSendImage] = useState({
      email: 'sorasit@gmail.com',
      evidenceImg: [citizenID.raw, transcription.raw]
    })

    const handleSelectCid = (e) => {
      if(e.target.files.length){
        setCitizenID({
          preview: URL.createObjectURL(e.target.files[0]),
          raw : e.target.files[0]
        })

        setSendImage({
          ...sendImage,
          evidenceImg : [e.target.files[0], sendImage.evidenceImg[1]]
        })

        // const formData1 = new FormData();
        // formData1.append(
        //   "myFile1",
        //   e.target.files[0],
        //   e.target.files[0].name
        // );

        // console.log(e.target.files[0])
        // console.log(formData1.get('myFile1'))

      }
    }

    const handleSelectTrans = (e) => {
      if(e.target.files.length){
        setTranscription({
          preview: URL.createObjectURL(e.target.files[0]),
          raw : e.target.files[0]
        })

        setSendImage({
          ...sendImage,
          evidenceImg : [sendImage.evidenceImg[0], e.target.files[0]]
        })
      }
    }

    const handleUploadFile = (event) => {
        // console.log(citizenID.raw)
        // console.log(transcription.raw)
        // console.log(JSON.stringify(sendImage))

        const formData1 = new FormData();
        const imgValue = [JSON.stringify(citizenID.raw),JSON.stringify(transcription.raw)]

        formData1.append(
          "email",
          'sorasit@gmail.com'
        );

        formData1.append(
          "evidenceImg",
          citizenID.raw
        );

        formData1.append(
          "evidenceImg",
          transcription.raw
        );

        console.log(formData1.getAll("evidenceImg"))

        const formData2 = new FormData();
        formData2.append(
          "myFile2",
          transcription.raw,
          transcription.raw.name
        );

        client({
          url: '/tutorReq/create',
          method: 'POST',
          headers: {'Content-Type': 'multipart/form-data'},
          body: formData1
        }).then( ({data}) => {

          console.log(data)
          setShowModal(true)
        }).catch( ({response}) => {

          console.log(response)

        })
    }

  return (
    <div style={{display: 'flex',flexDirection: 'column',alignItems: 'center' , width: '100%'}}>
        <div style={{display: 'flex', width: '45%'}}>
          <Link className='backtoprofile shadow' to='/profile'>{back}</Link>
        </div>
        

        <div className='info-card shadow' >
          <p className='title left' style={{width: '100%'}}>upgrade user's type form</p>
          <p className='header' style={{width: '100%'}}>Please submit your  copy of citizen id card and transcription</p>
          <hr/>
          
          <div className='section' style={{alignItems: 'flex-start'}}>
            <p className='header' style={{width: '30%'}}>COPY OF CITIZEN ID CARD</p>
            <UploadButton 
                id='cidUpload' 
                image={citizenID} 
                setimage={handleSelectCid} 
                csstext='upload-text' 
                csslabel='upload' 
                cssimage='upload-image'
            />
          </div>
          <hr/>
          
          <div className='section' style={{alignItems: 'flex-start'}}>
            <p className='header' style={{width: '30%'}}>TRANSCRIPTION</p>
            <UploadButton 
              id='transUpload' 
              image={transcription} 
              setimage={handleSelectTrans} 
              csstext='upload-text' 
              csslabel='upload' 
              cssimage='upload-image'
            />
          </div>
        </div>

        <div style={{display: 'flex',flexDirection: 'row-reverse', width: '45%'}}>
          {
            (!transcription.preview || 
            !citizenID.preview) && 
            <button className='submit-close shadow' disabled>Submit</button>
          }
        </div>

        <div style={{display: 'flex',flexDirection: 'row-reverse', width: '45%'}}>
          {
            transcription.preview && 
            citizenID.preview && 
            <button onClick={handleUploadFile} className='submit-open shadow' data-toggle='modal'>Submit</button>
          }
        </div>
        
        <ModalRequestButton setshow={setShowModal} show={showModal}/>
    </div>
  );
};

export default ChangeAccountTypePage;
