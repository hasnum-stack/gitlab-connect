import axios, { HttpStatusCode } from 'axios';
import type { AxiosInstance, AxiosRequestConfig } from 'axios';
import { message } from 'antd';
const token = import.meta.env.PUBLIC_SERVICE_TOKEN;
const baseURL = import.meta.env.PUBLIC_SERVICE_BASEURL;
const Authorization = `Bearer ${token}`;

const axiosInstance: service = axios.create({
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

interface service extends AxiosInstance {
  <R = unknown, D = unknown>(config: AxiosRequestConfig<D>): Promise<R>;
  <R = unknown, D = unknown>(url: string, config?: AxiosRequestConfig<D>): Promise<R>;
  request<R = unknown, D = unknown>(config: AxiosRequestConfig<D>): Promise<R>;
  get<R = unknown, D = unknown>(url: string, config?: AxiosRequestConfig<D>): Promise<R>;
  delete<R = unknown, D = unknown>(url: string, config?: AxiosRequestConfig<D>): Promise<R>;
  head<R = unknown, D = unknown>(url: string, config?: AxiosRequestConfig<D>): Promise<R>;
  options<R = unknown, D = unknown>(url: string, config?: AxiosRequestConfig<D>): Promise<R>;
  post<R = unknown, D = unknown>(url: string, data?: D, config?: AxiosRequestConfig<D>): Promise<R>;
  put<R = unknown, D = unknown>(url: string, data?: D, config?: AxiosRequestConfig<D>): Promise<R>;
  patch<R = unknown, D = unknown>(url: string, data?: D, config?: AxiosRequestConfig<D>): Promise<R>;
  postForm<R = unknown, D = unknown>(url: string, data?: D, config?: AxiosRequestConfig<D>): Promise<R>;
  putForm<R = unknown, D = unknown>(url: string, data?: D, config?: AxiosRequestConfig<D>): Promise<R>;
  patchForm<R = unknown, D = unknown>(url: string, data?: D, config?: AxiosRequestConfig<D>): Promise<R>;
}

export default axiosInstance;
