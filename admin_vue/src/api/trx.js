import request from '@/utils/fabric_request'

export function getTrxList() {
  return request({
    url: '/order/getall',
    method: 'get',
  })
}

export function getTrxById(id) {
  return request({
    url: '/trx/get',
    method: 'get',
    params: {
      id:id
    }
  })
}