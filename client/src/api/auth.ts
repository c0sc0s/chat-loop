import { ApiResponse, AuthData, LoginInput, RegisterInput } from "../types";

import { apiClient } from "./client";

/**
 * 认证相关API服务
 */
export const authApi = {
  /**
   * 用户注册
   * @param data 注册信息
   */
  register(data: RegisterInput): Promise<ApiResponse<AuthData>> {
    return apiClient.post<AuthData>("/auth/register", data);
  },

  /**
   * 用户登录
   * @param data 登录信息
   */
  login(data: LoginInput): Promise<ApiResponse<AuthData>> {
    return apiClient.post<AuthData>("/auth/login", data);
  },

  /**
   * 用户登出
   */
  logout(): Promise<ApiResponse<null>> {
    return apiClient.post<null>("/auth/logout");
  },
};

export default authApi;
