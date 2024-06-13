import type {
  InternalAxiosRequestConfig,
  AxiosResponse,
  AxiosRequestConfig
} from 'axios'

export interface requestInterceptors<T = any> {
  requestInterceptor?: (
    config: InternalAxiosRequestConfig
  ) => InternalAxiosRequestConfig
  requestInterceptorCatch?: (error: any) => any
  responseInterceptor?: (res: AxiosResponse<T>) => AxiosResponse<T>
  responseInterceptorCatch?: (error: any) => any
}

export interface requestConfig<T = any> extends AxiosRequestConfig {
  interceptors?: requestInterceptors<T>
  showLoading?: boolean
}
