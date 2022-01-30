import React from 'react';

const UploadButton = (props) => {
  return (
    <div>
        <label htmlFor={props.id}>
          {props.image.preview ? (
            <img src={props.image.preview} alt='dummy' width='300' height='300' />
          ) : (
            <p>[ click here to upload your image ]</p>
          )}
        </label>
        <input 
          id={props.id}
          style={{display: 'none'}} 
          type='file' 
          onChange={props.setimage}
        />
    </div>
  );
};

export default UploadButton;
