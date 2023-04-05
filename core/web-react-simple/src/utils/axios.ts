import axios, {
  AxiosInstance,
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';
import { _AxiosRequestConfig } from './type';

// R：响应数据de类型
class _Axios<R = any> {
  private axios: AxiosInstance;
  constructor(config: _AxiosRequestConfig) {
    // 解构 AxiosRequestConfig 与 ...
    const { interceptors, ...AxiosRequestConfig } = config;
    const { requestSuccess, requestFail, responseSuccess, responseFail } =
      interceptors || {};

    this.axios = axios.create(AxiosRequestConfig);

    const { request, response } = this.axios.interceptors;

    // Use global with no passed arguments
    request.use(
      requestSuccess || this.golbalRequestSuccess,
      requestFail || this.golbalRequestFail,
    );

    // Use global with no passed arguments
    response.use(
      responseSuccess || this.golbalResponseSuccess,
      responseFail || this.golbalResponseFail,
    );
  }

  // 全局请求Success拦截器
  private golbalRequestSuccess = (
    config: InternalAxiosRequestConfig,
  ): InternalAxiosRequestConfig => {
    return config;
  };
  // 全局请求Fail拦截器
  private golbalRequestFail = (error: AxiosError): Promise<AxiosError> => {
    return Promise.reject(error);
  };

  // 全局响应Success拦截器
  private golbalResponseSuccess = (response: AxiosResponse) => {
    return response;
  };
  // 全局响应Fail拦截器
  private golbalResponseFail = (error: AxiosError) => {
    return error;
  };

  // 同样使用 _AxiosRequestConfig 作为参数类型, 实现单个请求的拦截自定义
  // 接收 _Axios 实例传入的 R 类型，作为默认返回值类型, D 为请求数据的类型
  // 单个方法 _AxiosRequestConfig header 非必传, 修改 requestSuccess 类型
  /**
   * D 为请求数据的类型
   * T 为响应数据的类型, 默认为 R 类型, 即实例化时传入的 R 类型
   * @param config - _AxiosRequestConfig.data 为 D 类型
   * @returns Promise<T> 类型数据
   */
  request<D = any, T = R>(config: Partial<_AxiosRequestConfig>): Promise<T> {
    const { requestSuccess, requestFail, responseSuccess, responseFail } =
      config.interceptors || {};

    // 单个请求拦截
    // if (requestSuccess) {
    //   config = requestSuccess(config);
    // }
    return (
      this.axios
        // 接收 _Axios request 方法传入的 D、T 类型并传入内部增强
        .request<T, AxiosResponse<T>, D>(config)
        .then((res) => {
          // 单个响应成功拦截
          if (responseSuccess) {
            res = responseSuccess(res);
            return res.data;
          }

          // 返回 res.data 作为默认返回值，data 为 T 类型(内部处理)，返回 Promise<T> 类型数据
          return res.data;
        })
        .catch((error: AxiosError) => {
          // 单个响应失败拦截
          if (responseFail) {
            error = responseFail(error);
          }

          return Promise.reject(error.config?.data);
        })
    );
  }
  get<D = any, T = R>(url: string, config?: _AxiosRequestConfig): Promise<T> {
    return this.request<D, T>({ ...config, url, method: 'GET' });
  }
  post<D = any, T = R>(
    url: string,
    data?: D,
    config?: _AxiosRequestConfig,
  ): Promise<T> {
    return this.request<D, T>({ ...config, url, method: 'POST', data });
  }
  put<D = any, T = R>(
    url: string,
    data?: D,
    config?: _AxiosRequestConfig,
  ): Promise<T> {
    return this.request<D, T>({ ...config, url, method: 'PUT', data });
  }
  delete<D = any, T = R>(
    url: string,
    config?: _AxiosRequestConfig,
  ): Promise<T> {
    return this.request<D, T>({ ...config, url, method: 'DELETE' });
  }
  head<D = any, T = R>(url: string, config?: _AxiosRequestConfig): Promise<T> {
    return this.request<D, T>({ ...config, url, method: 'HEAD' });
  }
  patch<D = any, T = R>(
    url: string,
    data?: D,
    config?: _AxiosRequestConfig,
  ): Promise<T> {
    return this.request<D, T>({ ...config, url, method: 'PATCH', data });
  }
}

export default _Axios;
