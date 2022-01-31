import Axios from 'axios'

export const client = Axios.create({
  baseURL: process.env.APP_API_URL
})