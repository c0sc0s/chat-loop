import { apiClient } from "./client";
import authApi from "./auth";
import userApi from "./user";
import chatApi from "./chat";
import healthApi from "./health";

// 导出配置
export * from "./config";

// 导出API客户端和服务
export { apiClient, authApi, userApi, chatApi, healthApi };

// 默认导出所有API服务
export default {
  auth: authApi,
  user: userApi,
  chat: chatApi,
  health: healthApi,
};
