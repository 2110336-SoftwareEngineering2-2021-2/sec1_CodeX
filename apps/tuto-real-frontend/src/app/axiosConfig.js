import Axios from 'axios';
// import Cookies from 'universal-cookie'

const apiUrl = process.env.APP_API_URL | 'http://localhost:3333/api/v1';

export const client = Axios.create({
  baseURL: apiUrl,
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
