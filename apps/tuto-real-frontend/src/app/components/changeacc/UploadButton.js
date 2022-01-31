import React from 'react';

const UploadButton = (props) => {
  return (
    <>
        <label htmlFor={props.id} className={props.csslabel}>
          {props.image.preview ? (
            <img src={props.image.preview} alt='dummy' width='300' height='300' />
          ) : (
            <p className={props.csstext}>[ click here to upload your image ]</p>
          )}
        </label>
        <input 
          id={props.id}
          style={{display: 'none'}} 
          type='file' 
          onChange={props.setimage}
        />
    </>
  );
};

export default UploadButton;
