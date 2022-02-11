import React from 'react';
import {Link} from 'react-router-dom'

const RequestBox = ({name, date, _id, citizenID, transcription, email}) => {

  return (
      <div className='info-card shadow' style={{marginBottom:"1.5vh", paddingLeft:"1.5%"}}>
        <Link 
          style={{textDecoration:'none', width: '100%'}} 
          to={`/changeAccApprove`}
          state={{
            name,
            citizenID,
            transcription,
            _id
          }}
        >
          <p className='title left' style={{width: '100%', marginTop: '0%'}}>{name}</p>
          <p className='header' style={{width: '100%', marginBottom: '0%'}}>{date}</p>
       </Link>
      </div>
  );
};

export default RequestBox;

