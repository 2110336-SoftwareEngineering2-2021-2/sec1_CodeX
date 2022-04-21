


export class Info {
  firstName ;
  lastName ; 
  mobilePhone ;
  emailAddress ;
  password ;
  confirmPassword;
  citizenId;
  address ;
}
export const onSubmit = (dto : Info) => {


    var errMsg;
    console.log('Validateing...');
    if (dto.firstName.length === 0)
      errMsg = "Your first name can't be empty.";
    else if (dto.lastName.length === 0)
      errMsg = "Your last name can't be empty.";
    else if (dto.mobilePhone.length === 0)
      errMsg = "Your mobile phone can't be empty.";
    else if (isNaN(dto.mobilePhone) || dto.mobilePhone.length !== 10)
      errMsg = 'The mobile phone must be 10 numeric characters long.';
    else if (
      dto.emailAddress.length === 0 ||
      !dto.emailAddress
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )
    )
      errMsg = 'Invalid email address.';
    else if (dto.password.length === 0)
      errMsg = "Your password can't be empty.";
    else if (dto.password.length < 8)
      errMsg = 'Your password must long than 8 charectors.';
    else if (dto.confirmPassword.length === 0)
      errMsg = 'Please confirm your password.';
    else if (dto.confirmPassword !== dto.password)
      errMsg = 'Your password and confirm password is not match.';
    else if (dto.address.length === 0)
      errMsg = "Your address can't be empty.";
    else if (dto.citizenId.length === 0)
      errMsg = "Your citizen id can't be empty.";
    else if (isNaN(dto.citizenId) || dto.citizenId.length !== 13)
      errMsg = 'The citizen id must be 13 numeric characters long.';
    else {
      errMsg = '';
    }
    return errMsg
  };
