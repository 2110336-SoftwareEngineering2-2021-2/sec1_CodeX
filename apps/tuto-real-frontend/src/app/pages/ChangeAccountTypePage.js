import React, { useState} from 'react';
import { Link } from 'react-router-dom';
import { client } from '../axiosConfig';
import ModalRequestButton from '../components/changeacc/ModalRequestButton';
import UploadButton from '../components/changeacc/UploadButton';
import './ChangeAccountTypePage.css'

const ChangeAccountTypePage = () => {

    const back = '< Back'

    //use for display
    const [citizenID, setCitizenID] = useState({preview: "", raw : ""})
    const [transcription, setTranscription] = useState({preview: "", raw : ""})
    const [isPending, setIsPending] = useState(false)

    //modal
    const [showModal,setShowModal] = useState(false)

    //send to DB
    const [sendImage, setSendImage] = useState({
      email: 'sorasit@gmail.com',
      citizenID64: '',
      transcription64: ''
    })


    const toBase64 = file => new Promise((resolve, reject) => {
      const formData = new FormData()
      formData.append("", file, file.name)
      return formData
  });

    const handleSelectCid = async(e) => {
      if(e.target.files.length){
        setCitizenID({
          preview: URL.createObjectURL(e.target.files[0]),
          raw : e.target.files[0]
        })

        // getBase64_Cid(e.target.files[0])
        setSendImage({
          ...sendImage,
          citizenID64: (await toBase64(e.target.files[0])).slice(23),
        })
      }
    }

    const handleSelectTrans = async (e) => {
      if(e.target.files.length){
        setTranscription({
          preview: URL.createObjectURL(e.target.files[0]),
          raw : e.target.files[0]
        })

        // getBase64_Trans(e.target.files[0])
        setSendImage({
          ...sendImage,
          transcription64: (await toBase64(e.target.files[0])).slice(23),
        })
      }
    }

    const handleUploadFile = (event) => {

        console.log(sendImage)
        setIsPending(true)

        client({
          url: '/tutorReq/create',
          method: 'POST',
          data: sendImage
        }).then( ({data}) => {

          console.log(data)
          setIsPending(false)
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
            !isPending &&
            transcription.preview && 
            citizenID.preview && 
            <button onClick={handleUploadFile} className='submit-open shadow' data-toggle='modal'>Submit</button>
          }
        </div>

        <div style={{display: 'flex',flexDirection: 'row-reverse', width: '45%'}}>
          {
            isPending && 
            <button className='submit-close shadow' disabled>Sending...</button>
          }
        </div>
        
        <ModalRequestButton setshow={setShowModal} show={showModal}/>
    </div>
  );
};

export default ChangeAccountTypePage;
