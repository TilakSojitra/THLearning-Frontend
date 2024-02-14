import axios from 'axios'
import { getAccessToken } from '../utils/common-util'

const API_URL = 'http://localhost:8000'

export const axiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 60000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

axiosInstance.interceptors.request.use(
  config => {
    config.headers.Authorization = getAccessToken()
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

axiosInstance.interceptors.response.use(
  function (response) {
    return processResponse(response)
  },
  function (error) {
    throw processError(error)
  }
)

const processResponse = (response) => {
  // console.log(response)
  if (response?.status >= 200 && response?.status < 300) {
    return { status: response?.status, data: response.data.data, errors: [] }
  } else {
    // console.log(response)
    return {
      status: response?.status,
      data: [],
      errors: response?.data.errors
    }
  }
}

const processError = (error) => {
  // console.log(error.response)
  return {
    status: error.response?.status,
    data: [],
    errors: error.response?.data.errors
  }
}
