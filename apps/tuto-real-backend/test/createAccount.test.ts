import {onSubmit , Info} from './onSubmit'



var ex = new Info()
ex.firstName = "Somchai"
ex.lastName = "Jaidee"
ex.address = "Thailand"
ex.citizenId = "1111111111111"
ex.password = "12345678"
ex.confirmPassword = "12345678"
ex.emailAddress = "somchai_j@gmail.com"
ex.mobilePhone = "0888888888"

describe("CheckSortedTest", () => {

  it(`Correct information should return empty error message`, () => {
    expect(onSubmit(ex)).toBe("");
  });

  it(`Correct information should return empty error message`, () => {
    let temp = {...ex}
    temp.firstName = ""
    expect(onSubmit(temp)).toBe("Your first name can't be empty.");
  });

  it(`Correct information should return empty error message`, () => {
    let temp = {...ex}
    temp.lastName = ""
    expect(onSubmit(temp)).toBe("Your last name can't be empty.");
  });

  it(`Correct information should return empty error message`, () => {
    let temp = {...ex}
    temp.mobilePhone = ""
    expect(onSubmit(temp)).toBe("Your mobile phone can't be empty.");
  });

  it(`Correct information should return empty error message`, () => {
    let temp = {...ex}
    temp.mobilePhone = "08888888aa"
    expect(onSubmit(temp)).toBe("The mobile phone must be 10 numeric characters long.");
  });

  it(`Correct information should return empty error message`, () => {
    let temp = {...ex}
    temp.emailAddress = "somchai_j/gmail.com"
    expect(onSubmit(temp)).toBe('Invalid email address.');
  });

  it(`Correct information should return empty error message`, () => {
    let temp = {...ex}
    temp.password = ""
    expect(onSubmit(temp)).toBe("Your password can't be empty.");
  });

  it(`Correct information should return empty error message`, () => {
    let temp = {...ex}
    temp.password = ""
    expect(onSubmit(temp)).toBe("Your password can't be empty.");
  });

  it(`Correct information should return empty error message`, () => {
    let temp = {...ex}
    temp.password = "1234567"
    expect(onSubmit(temp)).toBe('Your password must long than 8 charectors.');
  });

  it(`Correct information should return empty error message`, () => {
    let temp = {...ex}
    temp.confirmPassword = ""
    expect(onSubmit(temp)).toBe('Please confirm your password.');
  });

  it(`Correct information should return empty error message`, () => {
    let temp = {...ex}
    temp.confirmPassword = "87654321"
    //password is "12345678"
    expect(onSubmit(temp)).toBe('Your password and confirm password is not match.');
  });

  it(`Correct information should return empty error message`, () => {
    let temp = {...ex}
    temp.address = ""
    expect(onSubmit(temp)).toBe("Your address can't be empty.");
  });

  it(`Correct information should return empty error message`, () => {
    let temp = {...ex}
    temp.citizenId = ""
    expect(onSubmit(temp)).toBe( "Your citizen id can't be empty.");
  });

  it(`Correct information should return empty error message`, () => {
    let temp = {...ex}
    temp.citizenId = "citizenId"
    expect(onSubmit(temp)).toBe( 'The citizen id must be 13 numeric characters long.');
  }); 
 
});
