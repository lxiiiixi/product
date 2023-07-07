import axios, { AxiosInstance, AxiosRequestConfig }  from "axios";

// server client api
const nodeEnv = process.env.NODE_ENV;
const isDev = nodeEnv === "development";
const baseURL = isDev ? "https://shield.fairyproof.com" : "https://shield.fairyproof.com";

const instance:AxiosInstance = axios.create({
    baseURL,
    timeout: 2000,
    withCredentials: true
  });

  // 设置拦截器
// instance.interceptors.request.use((config) => {
//     config.headers['token'] = window.localStorage.getItem('token')
//     return config
//   }, (error) => {
//     return Promise.reject(error)
//   })
  
//   instance.interceptors.response.use((response) => {
//     return response
//   }, (error) => {
//     return Promise.reject(error)
//   })
  

export default function Request (config: AxiosRequestConfig) {
    const { url = '', method = 'GET', data = {}, headers = {} } = config
    switch (method.toUpperCase()) {
      case 'GET':
        return instance.get(url, { params: data })
      case 'POST':
        // 表单提交  application/x-www-form-url-encoded
        if (headers['content-type'] === 'application/x-www-form-url-encoded') {
          // 转参数 URLSearchParams/第三方库qs
          const p = new URLSearchParams()
          for(let key in data) {
            p.append(key, data[key])
          }
          return instance.post(url, p, {headers})
        }
        // 文件提交  multipart/form-data
        if (headers['content-type'] === 'multipart/form-data') {
          const p = new FormData()
          for(let key in data) {
            p.append(key, data[key])
          }
          return instance.post(url, p, {headers})
        }
        
        return instance.post(url, data)  // 默认 application/json
      case 'PUT':
        return instance.put(url, data)
      case 'DELETE': 
        return instance.delete(url, {data})
      case 'PATCH':  
        return instance.patch(url, data)
      default:
        return instance(config)
    }
  }