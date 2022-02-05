import React from 'react';

const AdvanceInfo = ({ viewType, advance }) => {
  const { userType, password } = advance;

  return (
    <div className="info-card shadow">
      <p className="title">Advance</p>
      <hr />
      <div className="section">
        <p className="header">USER TYPE</p>
        <p>{userType}</p>
      </div>
      <hr />
      <div className="section">
        <p className="header">PASSWORD</p>
        <p>{password}</p>
      </div>
    </div>
  );
};

export default AdvanceInfo;
