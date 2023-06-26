import type { AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios'

// 针对AxiosRequestConfig配置进行扩展
export interface _Interceptors<T = AxiosResponse> {
  requestSuccessFn?: (config: InternalAxiosRequestConfig<any>) => InternalAxiosRequestConfig<any>
  requestFailureFn?: (err: any) => any
  responseSuccessFn?: (res: T) => T
  responseFailureFn?: (err: any) => any
}

export interface _RequestConfig<T = AxiosResponse> extends InternalAxiosRequestConfig<any> {
  interceptors?: _Interceptors<T>
}
