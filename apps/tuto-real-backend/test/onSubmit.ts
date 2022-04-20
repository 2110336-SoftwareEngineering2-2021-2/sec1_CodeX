import { useState } from 'react';
import {signUp} from './signup'

var errMsg = ""

export const onSubmit = async (firstName,lastName,mobilePhone,emailAddress,password,confirmPassword,citizenId,address
    ,birthYear,birthMonth,birthDay) => {
    console.log('Validateing...');

    if (firstName.length === 0)
      errMsg = "Your first name can't be empty.";
    else if (lastName.length === 0)
      errMsg = "Your last name can't be empty.";
    else if (mobilePhone.length === 0)
      errMsg = "Your mobile phone can't be empty.";
    else if (isNaN(mobilePhone) || mobilePhone.length !== 10)
      errMsg = 'The mobile phone must be 10 numeric characters long.';
    else if (
      emailAddress.length === 0 ||
      !emailAddress
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )
    )
      errMsg = 'Invalid email address.';
    else if (password.length === 0)
      errMsg = "Your password can't be empty.";
    else if (password.length < 8)
      errMsg = 'Your password must long than 8 charectors.';
    else if (confirmPassword.length === 0)
      errMsg = 'Please confirm your password.';
    else if (confirmPassword !== password)
      errMsg = 'Your password and confirm password is not match.';
    else if (address.length === 0)
      errMsg = "Your address can't be empty.";
    else if (citizenId.length === 0)
      errMsg = "Your citizen id can't be empty.";
    else if (isNaN(citizenId) || citizenId.length !== 13)
      errMsg = 'The citizen id must be 13 numeric characters long.';
    else {
      errMsg = '';
      /*await signUp(
        {
          email: emailAddress,
          password: password,
          firstName: firstName,
          lastName: lastName,
          phoneNumber: mobilePhone,
          birthDate: new Date(birthYear, birthMonth, birthDay + 1, 0, 0, 0),
          address: address,
          citizenID: citizenId,
        }
      );*/
    }
  };