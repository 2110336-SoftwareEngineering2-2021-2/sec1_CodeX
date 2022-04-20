import Axios from 'axios';
// import Cookies from 'universal-cookie'

const APP_API_URL = 'http://localhost:3333/api/v1';

export const client = Axios.create({
  baseURL: APP_API_URL,
});

client.interceptors.request.use(
  (req) => {
    if (!req.headers.Authorization) {
      // const cookies = new Cookies();
      // const token = cookies.get('token')
      req.headers.Accept = 'application/json';
      req.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
      return req;
    } else return req;
  },
  (error) => Promise.reject(error)
);
