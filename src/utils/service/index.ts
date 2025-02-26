import axios, { HttpStatusCode } from 'axios';
import type { AxiosInstance } from 'axios';
import { message } from 'antd';
const token = import.meta.env.PUBLIC_SERVICE_TOKEN;
const baseURL = import.meta.env.PUBLIC_SERVICE_BASEURL;
const Authorization = `Bearer ${token}`;
console.log('123', import.meta.env.BASE_URL);
const axiosInstance = axios.create({
  baseURL,
  timeout: 10000,
  headers: { Authorization },
  adapter: 'fetch',
});

// 响应拦截器, 拦截错误状态直接抛出错误
axiosInstance.interceptors.response.use(
  response => {
    const data = response.data;
    if ([HttpStatusCode.Ok, HttpStatusCode.Created, HttpStatusCode.NoContent].includes(response.status)) {
      return response.data;
    }
    return Promise.reject(data);
  },
  error => {
    const { status, message: network_error_message } = error;

    const response_error_message = error?.response?.data?.message;
    const finally_error_message = response_error_message || network_error_message || '应用发生未知错误';

    message.error({
      key: status,
      content: finally_error_message,
    });

    return Promise.reject(error);
  },
);
const serviceInstance = {
  request: <T>(...args: Parameters<AxiosInstance['request']>) => axiosInstance.request<never, T>(...args),
  get: <T>(...args: Parameters<AxiosInstance['get']>) => axiosInstance.get<never, T>(...args),
  post: <T>(...args: Parameters<AxiosInstance['post']>) => axiosInstance.post<never, T>(...args),
  postForm: <T>(...args: Parameters<AxiosInstance['post']>) => axiosInstance.post<never, T>(...args),
  put: <T>(...args: Parameters<AxiosInstance['put']>) => axiosInstance.put<never, T>(...args),
  delete: <T>(...args: Parameters<AxiosInstance['delete']>) => axiosInstance.delete<never, T>(...args),
};

export default serviceInstance;
