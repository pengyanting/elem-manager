import axios from 'axios'
import qs from 'querystring'
export const ax = (url, method, data) => {
  method = method.toUpperCase()
  if (method === 'GET') {
    console.log(url)
    return axios.get(url, { params: data })
  } else if (method === 'POST') {
    return axios.post(url, qs.stringify(data))
  }
}
