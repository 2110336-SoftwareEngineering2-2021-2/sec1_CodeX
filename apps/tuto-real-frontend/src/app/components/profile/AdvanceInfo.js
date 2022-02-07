import React from 'react';
import { Link } from 'react-router-dom';
import COLORS from '../../constants/color';

const AdvanceInfo = ({ viewType, advance, targetEmail}) => {
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
            to={`/changeacctype`}
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
        <input type="password" readOnly defaultValue="12345678" style={{margin:"0px"}}></input>
      </div>
    </div>
  );
};

export default AdvanceInfo;
