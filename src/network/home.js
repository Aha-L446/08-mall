import {request, request2} from "./request"

export function getHomeMultidata () {
  // 【request本质上是一个Promise】
  return request({
    url: '/home/multidata',
  })
}

export function getHomeGoods (data) {
  // 【request本质上是一个Promise】
  return request2({
    url: '/silver-web-shop/goods/getShowGoodsBaseInfo',
    method: 'POST',
    params: data,
    // data: data
  })
}
