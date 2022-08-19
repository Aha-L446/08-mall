import {request} from "./request"

export function getHomeMultidata () {
  // 【request本质上是一个Promise】
  return request({
    url: '/home/multidata',
  })
}
