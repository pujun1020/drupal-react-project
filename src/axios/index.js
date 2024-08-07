import axios from 'axios';

//1. 创建axios对象
const service = axios.create();

//2. 请求拦截器
service.interceptors.request.use(config => {
  return config;
}, 
error => {
  return Promise.reject(error);
});

//3. 响应拦截器
service.interceptors.response.use(response => {
  return response.data;
},error => {
  return Promise.reject(error);
});

export default service;