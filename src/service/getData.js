import { ax } from './server.js'

export const login = (data, fun) => {
  ax('/api/admin/login', 'post', data).then(res => { fun(res) }).catch(err => console.log(err))
}

export const getUser = (data, fun) => {
  ax('/api/admin/getUser', 'post', data).then(res => { fun(res) }).catch(err => console.log(err))
}

export const getAdmin = (data, fun) => {
  ax('/api/admin/getAdmin', 'post', data).then(res => { fun(res) }).catch(err => console.log(err))
}

export const _getCategory = (data, fun) => {
  ax('/api/common/getCategory', 'get', data).then(res => { fun(res) }).catch(err => console.log(err))
}

export const _addShop = (data, fun) => {
  ax('/api/shop/add', 'post', data).then(res => { fun(res) }).catch(err => console.log(err))
}

export const _getShopList = (data, fun) => {
  ax('/api/shop/query', 'post', data).then(res => { fun(res.data) }).catch(err => console.log(err))
}

