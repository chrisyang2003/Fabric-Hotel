import request from '@/utils/request'

export function init() {
  return request({
    url: '/admin/init',
    method: 'get',
  })
}
