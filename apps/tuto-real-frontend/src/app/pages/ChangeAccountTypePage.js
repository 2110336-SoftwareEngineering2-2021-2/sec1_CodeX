import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const ChangeAccountTypePage = () => {

    const back = '< back'
    const [citizenID, setCitizenID] = useState(null)
    const [transcription, setTranscription] = useState(null)

    const handleSelectCid = (event) => {
        setCitizenID(event.target.files[0])
    }

    const handleSelectTrans = (event) => {
        setTranscription(event.target.files[0])
    }

    const handleUploadFile = (event) => {
        // const fileList = new FormData()
        // fileList.append('image',citizenID,citizenID.name)
        // console.log(fileList)
        // axios.post()
        console.log(citizenID)
        console.log(transcription)
    }

  return (
    <div>
        <Link to='/'>{back}</Link>
        <p>upgrade user's type form</p>
        <p>Please submit your  copy of citizen id card and transcription</p>
        <p>COPY OF CITIZEN ID CARD</p>
        <label htmlFor='cidUpload'>[ click here to upload your image ]</label>
        <input 
          id='cidUpload'
          style={{display: 'none'}} 
          type='file' 
          onChange={handleSelectCid}
        />

        <p>TRANSCRIPTION</p>
        <label htmlFor='transUpload'>[ click here to upload your image ]</label>
        <input 
          id='transUpload'
          style={{display: 'none'}} 
          type='file' 
          onChange={handleSelectTrans}
        />
        <br/>
        <button onClick={handleUploadFile}>Submit</button>
    </div>
  );
};

export default ChangeAccountTypePage;
