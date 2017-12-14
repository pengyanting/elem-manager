import axios from 'axios'
import qs from 'querystring'
const baseUrl = 'http://47.94.86.219:8080'
export const ax = (url, method, data) => {
  method = method.toUpperCase()
  if (method === 'GET') {
    return axios.get(baseUrl + url, { params: data })
  } else if (method === 'POST') {
    return axios.post(baseUrl + url, qs.stringify(data))
  }
}
