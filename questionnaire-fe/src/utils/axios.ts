import Axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import { notification } from 'ant-design-vue'
import { IResponse } from '@/types/api.global'

const baseURL = import.meta.env.VITE_APP_API_BASE
const axios = Axios.create({
  baseURL,
  timeout: 30 * 1000
})

axios.interceptors.request.use(onRequestInterceptorResolve)
axios.interceptors.response.use(onResponseInterceptorResolve, onResponseInterceptorReject)

// 请求拦截回调
function onRequestInterceptorResolve (config: AxiosRequestConfig) {
  return config
}

// 响应拦截回调
function onResponseInterceptorResolve (resp: AxiosResponse<IResponse<any>>) {
  const { status, data: { code, message } } = resp
  handleStatusCode(code || status, message)
  return resp
}

// 响应错误回调
function onResponseInterceptorReject (error: any) {
  notification.error({
    message: '请求失败',
    description: error.response?.data?.message || '数据请求失败'
  })
  return error
}

// 状态码处理
function handleStatusCode (code: number, desc?: string) {
  if (code < 300 && code >= 0) return
  const descSuffix = `[${code}]`
  let description = '数据请求失败'
  switch (code) {
    case 401:
      description = '用户未授权'
      break
    case 500:
      description = '服务端错误'
      break
  }
  notification.error({
    message: '数据请求失败',
    description: (desc || description) + descSuffix
  })
}
const fetch = <T = any>(config: AxiosRequestConfig): Promise<T> => {
  return axios(config)
    .then(res => {
      return res.data.data || res.data
    })
}
export function GET <T = any> (config: AxiosRequestConfig) {
  config.method = 'GET'
  return fetch<T>(config)
}

export function POST <T = any> (config: AxiosRequestConfig) {
  config.method = 'POST'
  return fetch<T>(config)
}

export function PUT <T = any> (config: AxiosRequestConfig) {
  config.method = 'PUT'
  return fetch<T>(config)
}

export function DELETE <T = any> (config: AxiosRequestConfig) {
  config.method = 'DELETE'
  return fetch<T>(config)
}

export function PATCH <T = any> (config: AxiosRequestConfig) {
  config.method = 'PATCH'
  return fetch<T>(config)
}

export default fetch
