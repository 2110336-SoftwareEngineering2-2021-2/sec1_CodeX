
//import { auth } from '../../tuto-real-frontend/src/app/firebase' 
//import { client } from '../../tuto-real-frontend/src/app/axiosConfig';
/*import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from 'firebase/auth';

*/

export const signUp = (data) => {
    /*client({
      method: 'POST',
      url: '/user/create',
      data: data,
    })
      .then(async (res) => {
        if (!res.data.success) throw new Error(res.data.data);
        return await createUserWithEmailAndPassword(
          auth,
          data.email,
          data.password
        );
      })
      .then((userCredential) => {
        sendEmailVerification(userCredential.user);
      })
      .then(() => {
        alert('Next step. Please verify your email.');
      })
      .catch((err) => {
        console.log(err.message);
        let msg = 'Please complete the information.';
        if (err.message.includes('email')) msg = 'Email already existed.';
        else if (err.message.includes('citizenID'))
          msg = 'CitizenID already existed.';
        alert(msg);
      });*/
  };

  export const add=(a,b)=>{
      return a+b;
  }