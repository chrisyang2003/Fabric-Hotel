import request from '@/utils/fabric_request'

export function getUserList(data) {
  return request({
    url: '/user/userlist',
    method: 'get',
    data
  })
}