import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/addons/booking/house/houseList',
    method: 'get',
    params: query
  })
}


export function createHouse(data) {
  return request({
    url: '/addons/booking/house/add',
    method: 'get',
    params: data
  })
}

export function updateArticle(data) {
  return request({
    url: '/vue-element-admin/article/update',
    method: 'post',
    data
  })
}
