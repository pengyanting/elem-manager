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

export const _delShop = (data, fun) => {
  ax('/api/shop/del/' + data.id, 'post', data).then(res => { fun(res.data) }).catch(err => console.log(err))
}

export const _editShop = (data, fun) => {
  ax('/api/shop/edit/' + data.id, 'post', data).then(res => { fun(res.data) }).catch(err => console.log(err))
}

export const _foodCategoryAdd = (data, fun) => {
  ax('/api/food/category/add', 'post', data).then(res => { fun(res.data) }).catch(err => console.log(err))
}

export const _foodCategoryQuery = (data, fun) => {
  ax('/api/food/category/query/' + data.shopid, 'post', data).then(res => { fun(res.data) }).catch(err => console.log(err))
}

export const _foodAdd = (data, fun) => {
  ax('/api/food/add', 'post', data).then(res => { fun(res.data) }).catch(err => console.log(err))
}

export const _foodSpecif = (data, fun) => {
  ax('/api/food/specification/add', 'post', data).then(res => { fun(res.data) }).catch(err => console.log(err))
}

export const _queryFood = (data, fun) => {
  ax('/api/food/query', 'post', data).then(res => { fun(res.data) }).catch(err => console.log(err))
}

export const _deleteFood = (data, fun) => {
  ax('/api/food/delete', 'post', data).then(res => { fun(res.data) }).catch(err => console.log(err))
}

export const _querySpecif = (data, fun) => {
  ax('/api/food/specifications/query', 'post', data).then(res => { fun(res.data) }).catch(err => console.log(err))
}
export const _delSpecif = (data, fun) => {
  ax('/api/food/specifications/del', 'post', data).then(res => { fun(res.data) }).catch(err => console.log(err))
}

export const _updateFood = (data, fun) => {
  ax('/api/food/update', 'post', data).then(res => { fun(res.data) }).catch(err => console.log(err))
}

export const _getAdmin = (data, fun) => {
  ax('/api/admin/getAdmin/' + data.id, 'post', data).then(res => { fun(res.data) }).catch(err => console.log(err))
}
