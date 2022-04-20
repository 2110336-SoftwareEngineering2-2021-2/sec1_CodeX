import {onSubmit} from './onSubmit'
import {signUp,add} from './signup'
/*
firstName,lastName,mobilePhone,emailAddress,password,confirmPassword,citizenId,address
    ,birthYear,birthMonth,birthDay
*/
describe("CheckSortedTest", () => {
  it(`[1, 2, 3] should return "correctly sorted"`, () => {
    expect(onSubmit("mek","wang","0880144972","sorasit789@gmail.com","99999999","99999999",
    "1155544777369","thai","2000","5","3")).toBe(5);
  });

 
});
