import { AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

/**
 * 拦截器 hook, 实例化 _Axios 时传入的参数, 用于拦截请求和响应(没有传入时默认使用全局的）
 * @param requestSuccess 请求成功后的回调，接收一个参数 config，返回一个 config
 * @param requestFail 请求失败后的回调，接收一个参数 error，返回一个 error
 * @param responseSuccess 响应成功后的回调，接收一个参数 response，返回一个 response
 * @param responseFail 响应失败后的回调，接收一个参数 error，返回一个 error
 * @return
 */
export interface IInterceptorHooks {
  requestSuccess?: (config: Partial<InternalAxiosRequestConfig>) => InternalAxiosRequestConfig;
  requestFail?: (error: any) => any;
  responseSuccess?: (response: AxiosResponse) => AxiosResponse;
  responseFail?: (error: any) => any;
}

/**
 * 扩展 axios 请求配置
 * @param interceptor 拦截器 hook { requestSuccess, requestFail, responseSuccess, responseFail }
 * @return
 */
export interface _AxiosRequestConfig extends /* AxiosRequestConfig, */ InternalAxiosRequestConfig {
  interceptors?: IInterceptorHooks;
}
