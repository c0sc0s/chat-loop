import { ApiResponse } from "../types";

import { apiClient } from "./client";

/**
 * 健康检查接口返回类型
 */
export interface HealthStatus {
  status: string;
  version: string;
  timestamp: string;
  uptime: number;
  services: {
    database: string;
    cache: string;
  };
}

/**
 * 详细健康检查接口返回类型
 */
export interface HealthDetailStatus {
  status: string;
  version: string;
  timestamp: string;
  uptime: number;
  services: {
    database: {
      status: string;
      latency: number;
      connections: number;
      activeQueries: number;
    };
    cache: {
      status: string;
      latency: number;
      memoryUsage: string;
      hitRate: number;
    };
    fileStorage: {
      status: string;
      space: {
        total: string;
        used: string;
        free: string;
      };
    };
  };
  system: {
    cpu: {
      usage: number;
      cores: number;
    };
    memory: {
      total: string;
      used: string;
      free: string;
    };
  };
}

/**
 * 健康检查API服务
 */
export const healthApi = {
  /**
   * 获取服务健康状态
   */
  getStatus(): Promise<ApiResponse<HealthStatus>> {
    return apiClient.get<HealthStatus>("/health");
  },

  /**
   * 获取详细健康状态
   */
  getDetailStatus(): Promise<ApiResponse<HealthDetailStatus>> {
    return apiClient.get<HealthDetailStatus>("/health/details");
  },
};

export default healthApi;
