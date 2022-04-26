

//1
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
    //2
    var errMsg;
    console.log('Validateing...');
    //3
    if (dto.firstName.length === 0)
      /*4*/ errMsg = "Your first name can't be empty.";
    //5
    else if (dto.lastName.length === 0)
      /*6*/ errMsg = "Your last name can't be empty.";
    //7
      else if (dto.mobilePhone.length === 0)
      /*8*/ errMsg = "Your mobile phone can't be empty.";
    //9
      else if (isNaN(dto.mobilePhone) || dto.mobilePhone.length !== 10)
      /*10*/ errMsg = 'The mobile phone must be 10 numeric characters long.';
    //11
    else if (
      dto.emailAddress.length === 0 ||
      !dto.emailAddress
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )
    )
      /*12*/ errMsg = 'Invalid email address.';
    //13
    else if (dto.password.length === 0)
      /*14*/ errMsg = "Your password can't be empty.";
    //15
    else if (dto.password.length < 8)
      /*16*/ errMsg = 'Your password must long than 8 charectors.';
    //17
    else if (dto.confirmPassword.length === 0)
      /*18*/ errMsg = 'Please confirm your password.';
    //19
    else if (dto.confirmPassword !== dto.password)
      /*20*/ errMsg = 'Your password and confirm password is not match.';
    //21
    else if (dto.address.length === 0)
      /*22*/ errMsg = "Your address can't be empty.";
    //23
    else if (dto.citizenId.length === 0)
      /*24*/ errMsg = "Your citizen id can't be empty.";
    //25
    else if (isNaN(dto.citizenId) || dto.citizenId.length !== 13)
      /*26*/ errMsg = 'The citizen id must be 13 numeric characters long.';
    else {
      //27
      errMsg = '';
    }
    //28
    return errMsg
  };
