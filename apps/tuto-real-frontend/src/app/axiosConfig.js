import Axios from 'axios';
// import Cookies from 'universal-cookie'

// const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3333/api/v1';
const API_URL = 'https://tuto-real-backend.herokuapp.com/api/v1';

export const client = Axios.create({
  baseURL: API_URL,
});

client.interceptors.request.use(
  (req) => {
    if (!req.headers.Authorization) {
      const token = localStorage.getItem('token');
      if (token) {
        req.headers.Accept = 'application/json';
        req.headers.Authorization = `Bearer ${token}`;
      }
      return req;
      // const cookies = new Cookies();
      // const token = cookies.get('token')
    } else return req;
  },
  (error) => Promise.reject(error)
);
