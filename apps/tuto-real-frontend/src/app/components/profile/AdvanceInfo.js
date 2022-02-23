import React from 'react';
import { Link } from 'react-router-dom';
import COLORS from '../../constants/color';

const AdvanceInfo = ({ viewType, advance, targetEmail, changePasswordShow, setChangePasswordShow}) => {
  const { userType, password } = advance;

  return (
    <div className="info-card shadow">
      <p className="title">Advance</p>
      <hr />
      <div className="section">
        <p className="header">USER TYPE</p>
        <p className="header">{userType}</p>
        {viewType === "StudentSelf" ?
          <Link 
            style={{textDecoration:'none', color: COLORS.third}} 
            to={`/changAaccType`}
            state={{
              ownerRequestEmail : targetEmail
            }}
          >
            [ upgrade to tutor]
          </Link>
        :null}
      </div>
      <hr />
      <div className="section">
        <p className="header">PASSWORD</p>
        <p>{password}</p>
        <input type="password" readOnly defaultValue="12345678" style={{margin:"0px" ,width:"25%", textAlign:"left"}}></input>
        <button 
          className='change-password-button'
          onClick={() => setChangePasswordShow(true)}
        >
          [ change password]
        </button>
      </div>
    </div>
  );
};

export default AdvanceInfo;
