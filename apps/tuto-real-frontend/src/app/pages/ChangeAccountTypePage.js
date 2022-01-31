import React, { useState} from 'react';
import { Link } from 'react-router-dom';
import UploadButton from '../components/changeacc/UploadButton';
import './ChangeAccountTypePage.css'

const ChangeAccountTypePage = () => {

    const back = '< Back'
    const [citizenID, setCitizenID] = useState({preview: "", raw : ""})
    const [transcription, setTranscription] = useState({preview: "", raw : ""})

    const handleSelectCid = (e) => {
      if(e.target.files.length){
        setCitizenID({
          preview: URL.createObjectURL(e.target.files[0]),
          raw : e.target.files[0]
        })
      }
    }

    const handleSelectTrans = (e) => {
      if(e.target.files.length){
        setTranscription({
          preview: URL.createObjectURL(e.target.files[0]),
          raw : e.target.files[0]
        })
      }
    }

    const handleUploadFile = (event) => {
        console.log(citizenID)
        console.log(transcription)
    }

  return (
    <div style={{width: '100%'}}>
        <Link className='shadow' to='/'>{back}</Link>

        <div className='group-content'>
          <p className='changeacc-header'>upgrade user's type form</p>
          <p className='header-desc'>Please submit your  copy of citizen id card and transcription</p>

          <div className='inside-line'>
            <p className='normal'>COPY OF CITIZEN ID CARD</p>
            <UploadButton 
              id='cidUpload' 
              image={citizenID} 
              setimage={handleSelectCid} 
              csstext='upload-text' 
              csslabel='upload' 
              cssimage='upload-image'
            />
          </div>
          
          
          <p className='normal'>TRANSCRIPTION</p>
          <UploadButton 
            id='transUpload' 
            image={transcription} 
            setimage={handleSelectTrans} 
            csstext='upload-text' 
            csslabel='upload' 
            cssimage='upload-image'
          />
        </div>

        <br/>

        {
          (!transcription.preview | 
          !citizenID.preview) && 
          <button onClick={handleUploadFile} className='submit-close' disabled>Submit</button>
        }

        {
          transcription.preview && 
          citizenID.preview && 
          <button onClick={handleUploadFile} className='submit-open'>Submit</button>
        }
    </div>
  );
};

export default ChangeAccountTypePage;
