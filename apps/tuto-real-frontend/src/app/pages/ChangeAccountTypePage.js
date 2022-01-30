import React, { useState} from 'react';
import { Link } from 'react-router-dom';
import UploadButton from '../components/changeacc/UploadButton';

const ChangeAccountTypePage = () => {

    const back = '< back'
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
    <div>
        <Link to='/'>{back}</Link>
        <p>upgrade user's type form</p>
        <p>Please submit your  copy of citizen id card and transcription</p>
        <p>COPY OF CITIZEN ID CARD</p>
        <UploadButton id='cidUpload' image={citizenID} setimage={handleSelectCid}/>

        <p>TRANSCRIPTION</p>
        <UploadButton id='transUpload' image={transcription} setimage={handleSelectTrans}/>

        <br/>
        
        <button onClick={handleUploadFile}>Submit</button>
    </div>
  );
};

export default ChangeAccountTypePage;
