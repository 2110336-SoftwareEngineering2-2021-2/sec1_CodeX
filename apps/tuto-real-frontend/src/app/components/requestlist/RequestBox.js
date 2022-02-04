import React from 'react';
import {Link} from 'react-router-dom'

const RequestBox = ({name, date}) => {
  return (
      <div className='info-card shadow' style={{marginBottom:"1.5vh", paddingLeft:"1.5%"}}>
        <Link style={{textDecoration:'none'}} to='/changeaccapprove'>
          <p className='title left' style={{width: '100%'}}>{name}</p>
          <p className='header' style={{width: '100%'}}>{date}</p>
       </Link>
      </div>
  );
};

export default RequestBox;

