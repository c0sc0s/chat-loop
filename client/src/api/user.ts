import {
  ApiResponse,
  UserData,
  FriendRequest,
  Friendship,
  FriendRequestAction,
} from "../types";

import { apiClient } from "./client";

/**
 * 分页响应接口
 */
interface PaginatedResponse<T> {
  users: T[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}

/**
 * 用户相关API服务
 */
export const userApi = {
  /**
   * 获取当前用户信息
   */
  getCurrentUser(): Promise<ApiResponse<UserData>> {
    return apiClient.get<UserData>("/users/me");
  },

  /**
   * 获取用户信息
   * @param id 用户ID
   */
  getUserById(id: number): Promise<ApiResponse<UserData>> {
    return apiClient.get<UserData>(`/users/${id}`);
  },

  /**
   * 搜索用户
   * @param keyword 搜索关键词
   * @param page 页码
   * @param limit 每页记录数
   */
  searchUsers(
    keyword: string,
    page: number = 1,
    limit: number = 10,
  ): Promise<ApiResponse<PaginatedResponse<UserData>>> {
    return apiClient.get<PaginatedResponse<UserData>>("/users/search", {
      keyword,
      page,
      limit,
    });
  },

  /**
   * 获取好友列表
   */
  getFriends(): Promise<ApiResponse<{ friends: Friendship[]; total: number }>> {
    return apiClient.get<{ friends: Friendship[]; total: number }>(
      "/users/friends",
    );
  },

  /**
   * 获取好友请求列表
   */
  getFriendRequests(): Promise<
    ApiResponse<{ requests: FriendRequest[]; total: number }>
  > {
    return apiClient.get<{ requests: FriendRequest[]; total: number }>(
      "/users/friend-requests",
    );
  },

  /**
   * 添加好友
   * @param userId 用户ID
   * @param message 附加消息
   */
  addFriend(userId: number, message?: string): Promise<ApiResponse<null>> {
    return apiClient.post<null>("/users/add-friend", { userId, message });
  },

  /**
   * 处理好友请求
   * @param requestId 请求ID
   * @param action 操作: "accept", "reject", "block"
   */
  handleFriendRequest(
    requestId: number,
    action: FriendRequestAction,
  ): Promise<ApiResponse<null>> {
    return apiClient.post<null>("/users/handle-friend-request", {
      requestId,
      action,
    });
  },

  /**
   * 删除好友
   * @param friendshipId 好友关系ID
   */
  deleteFriend(friendshipId: number): Promise<ApiResponse<null>> {
    return apiClient.post<null>("/users/delete-friend", { friendshipId });
  },
};

export default userApi;
