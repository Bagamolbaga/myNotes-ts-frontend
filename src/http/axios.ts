import axios from 'axios'

const API = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL_URL}`,
})

const interceptor = (config: any) => {
  config.headers.authorization = `Bearer ${localStorage.getItem('my-notes-token')}`
  return config
}

API.interceptors.request.use(interceptor)

export { API }