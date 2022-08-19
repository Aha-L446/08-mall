import axios from "axios"

export function request(config) {
  const instance = axios.create({
    baseURL: 'http://123.207.32.32:8000'
  })

  instance.interceptors.request.use((config) => {
    return config;     // 【拦截后，这里必须return，否则调用request()时，没有相应的信息返回
  }, (res) => {
    return res;
  })

  instance.interceptors.response.use((config) => {
    return config;     // 【拦截后，这里必须return，否则调用request()时，没有相应的信息返回
  }, (res) => {
    return res;
  })

  return instance(config);
}
