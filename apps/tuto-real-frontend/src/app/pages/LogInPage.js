import React, { useState } from 'react';
import {Form, Button} from "react-bootstrap";
import { useNavigate } from 'react-router-dom'
import "./RegistrationPage.css"


 export default function Signin() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const navigate = useNavigate()

  const handleSubmit = async e => {
    console.log(email)
    console.log(password)
    /*e.preventDefault();
    const response = await loginUser({
      username,
      password
    });
    if ('accessToken' in response) {
      swal("Success", response.message, "success", {
        buttons: false,
        timer: 2000,
      })
      .then((value) => {
        localStorage.setItem('accessToken', response['accessToken']);
        localStorage.setItem('user', JSON.stringify(response['user']));
        window.location.href = "/profile";
      });
    } else {
      swal("Failed", response.message, "error");
    }*/
  }

  return (
    <div className="page-container" >
      <div className='regispage-left-side'>
        <p className='tutoreal-icon'>TutoReal</p>
        <p className='tutoreal-desc'>
          Tutoreal description .............................. 
          ................................................................ 
          ................................................................</p>
        <div style={{display: 'flex', justifyContent: 'flex-end', width: '100%'}}>
          <p className='sponser'>Power by CodeX</p>
        </div>
      </div>
  
      <div className='regispage-right-side'>
        <Form 
          // noValidate 
          // validated={validated} 
          // onSubmit={handleSubmit}
        >
          {/* {errorMessage.length != 0 ?
            <p style={{color:'red', fontFamily:'roboto', fontWeight:'bold', marginBottom:'1vh'}}>
              {errorMessage}
            </p>
            : null
          } */}

          <Form.Control 
            className='form-control-regis' 
            type="text" 
            placeholder="Email address" 
            required
            onChange={e => {
              setEmail(e.target.value); 
            }}
          />
          
  
          <Form.Control 
            className='form-control-regis' 
            type="password" 
            placeholder="New password" 
            required
            onChange={e => {
              setPassword(e.target.value); 
            }}
          />
  
          <Button 
            className='signup-button-regis' 
            variant="secondary"
            type="button"
            onClick={() =>{
              handleSubmit();
            }}
          >
          Sign in
          </Button>
  
          
          <p className='signup-button-regis'>
            Forgotten password?
          </p>
  
          <Button 
            className='signup-button-regis' 
            variant="secondary"  
            type="button"
            onClick={() => navigate('/register')}
            
          >
            Sign up
            
          </Button>

        </Form>
      </div>
    </div>
    )
  }