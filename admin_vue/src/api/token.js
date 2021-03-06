import request from '@/utils/fabric_request'



// Token

export function getTokenList() {
    return request({
        url: '/erc20/tokenlist',
        method: 'get',
    })
}

export function getTokenInfo() {
    return request({
        url: '/erc20/tokeninfo',
        method: 'get',
    })
}

export function querybalance() {
    return request({
        url: '/erc20/querybalance',
        method: 'get',
        params: {
            user: 'hotelaccount'
        }
    })
}