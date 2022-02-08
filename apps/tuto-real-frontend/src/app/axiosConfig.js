import Axios from 'axios';
// import Cookies from 'universal-cookie'

const APP_API_URL = 'http://localhost:3333/api';

export const client = Axios.create({
  baseURL: APP_API_URL,
});

// client.interceptors.request.use(
//   (req) => {
//     if (!req.headers.Authorization) {
//       const cookies = new Cookies();
//       const token = cookies.get('token')
//       req.headers.Authorization = `Bearer ${token}`
//       return req
//     } else return req
//   },
//   (error) => Promise.reject(error)
// )
