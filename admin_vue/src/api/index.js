import request from '@/utils/fabric_request'



// Token

export function getTokenList(){
    
}



export function getAllorder() {
  return request({
    url: '/order/getall',
    method: 'get',
  })
}

export function getOrderDetailById(id) {
  return request({
    url: '/order/get',
    method: 'get',
    params: {
      id:id
    }
  })
}