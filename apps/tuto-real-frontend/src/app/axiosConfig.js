import Axios from 'axios'


const APP_API_URL = "http://localhost:3333/api"


export const client = Axios.create({
  baseURL: APP_API_URL,
})