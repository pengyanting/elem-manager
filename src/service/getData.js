import { ax } from './server.js'

export const login = (data, fun) => {
  ax('admin/login', 'post', data).then(res => { fun(res) }).catch(err => console.log(err))
}

export const getUser = (data, fun) => {
  ax('admin/getUser', 'post', data).then(res => { fun(res) }).catch(err => console.log(err))
}

export const getAdmin = (data, fun) => {
  ax('/admin/getAdmin', 'post', data).then(res => { fun(res) }).catch(err => console.log(err))
}
