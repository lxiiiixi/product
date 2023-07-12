import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

// // server client api
// const nodeEnv = process.env.NODE_ENV;
// const isDev = nodeEnv === "development";
// const baseURL = isDev ? "https://shield.fairyproof.com" : "https://shield.fairyproof.com";

const instance: AxiosInstance = axios.create({
  // baseURL,
  timeout: 5000,
  withCredentials: true
});

// // 设置拦截器
// instance.interceptors.request.use((config) => {
//     // console.log(Cookies.get('token'));
//     // config.headers['Cookie'] = "token="+ Cookies.get('token')
//     return config
//   }, (error) => {
//     return Promise.reject(error)
//   })

// 响应拦截
instance.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    console.log(error);
    if (
      error.response.request.status === 401 &&
      !window.location.href.includes('login')
    ) {
      window.location.href = '/#/product';
    }
    return Promise.reject(error);
  }
);

export default function Request(config: AxiosRequestConfig) {
  const { url = '', method = 'GET', data = {}, headers = {} } = config;
  const requestUrl = '/fp-api' + url; // match proxy config
  switch (method.toUpperCase()) {
    case 'GET':
      return instance.get(requestUrl, { params: data });
    case 'POST':
      // 表单提交  application/x-www-form-url-encoded
      if (headers['content-type'] === 'application/x-www-form-url-encoded') {
        // 转参数 URLSearchParams/第三方库qs
        const p = new URLSearchParams();
        for (let key in data) {
          p.append(key, data[key]);
        }
        return instance.post(requestUrl, p, { headers });
      }
      // 文件提交  multipart/form-data
      if (headers['content-type'] === 'multipart/form-data') {
        const p = new FormData();
        for (let key in data) {
          p.append(key, data[key]);
        }
        return instance.post(requestUrl, p, { headers });
      }

      return instance.post(requestUrl, data); // 默认 application/json
    case 'PUT':
      return instance.put(requestUrl, data);
    case 'DELETE':
      return instance.delete(requestUrl, { data });
    case 'PATCH':
      return instance.patch(requestUrl, data);
    default:
      return instance(config);
  }
}
