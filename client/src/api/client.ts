import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

import { ApiResponse } from "../types";

import { API_BASE_URL, API_TIMEOUT } from "./config";

/**
 * API客户端 - 使用Axios创建
 */
class ApiClient {
  private client: AxiosInstance;

  constructor() {
    // 创建axios实例
    this.client = axios.create({
      baseURL: API_BASE_URL,
      timeout: API_TIMEOUT,
      headers: {
        "Content-Type": "application/json",
      },
    });

    // 请求拦截器 - 添加token
    this.client.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem("token");
        if (token && config.headers) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error),
    );

    // 响应拦截器 - 处理错误
    this.client.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          // 清除token并重定向到登录页
          // localStorage.removeItem("token");
          // window.location.href = "/login";
        }
        return Promise.reject(error);
      },
    );
  }

  // GET请求
  async get<T>(
    url: string,
    params?: object,
    config?: AxiosRequestConfig,
  ): Promise<ApiResponse<T>> {
    try {
      const response: AxiosResponse<ApiResponse<T>> = await this.client.get(
        url,
        {
          params,
          ...config,
        },
      );
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  // POST请求
  async post<T>(
    url: string,
    data?: object,
    config?: AxiosRequestConfig,
  ): Promise<ApiResponse<T>> {
    try {
      const response: AxiosResponse<ApiResponse<T>> = await this.client.post(
        url,
        data,
        config,
      );
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  // PUT请求
  async put<T>(
    url: string,
    data?: object,
    config?: AxiosRequestConfig,
  ): Promise<ApiResponse<T>> {
    try {
      const response: AxiosResponse<ApiResponse<T>> = await this.client.put(
        url,
        data,
        config,
      );
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  // DELETE请求
  async delete<T>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<ApiResponse<T>> {
    try {
      const response: AxiosResponse<ApiResponse<T>> = await this.client.delete(
        url,
        config,
      );
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  // 统一处理错误
  private handleError<T>(error: any): ApiResponse<T> {
    if (error.response?.data) {
      return error.response.data;
    }

    return {
      success: false,
      message: "网络错误，请稍后再试",
      timestamp: new Date().toISOString(),
      code: 500,
      error: error.message || "未知错误",
    };
  }
}

// 创建并导出API客户端实例
export const apiClient = new ApiClient();
export default apiClient;
