import {
  Conversation,
  Message,
  PaginationParams,
  MessageInput,
  CallInitiateInput,
  CallStatusUpdateInput,
  ConversationDirectInput,
  ConversationGroupInput,
} from "../types/chat";
import { ApiResponse } from "../types";

import { apiClient } from "./client";

/**
 * 聊天相关API服务
 */
export const chatApi = {
  /**
   * 获取会话列表
   * @param page 页码
   * @param limit 每页记录数
   */
  getConversations(
    page: number = 1,
    limit: number = 20,
  ): Promise<
    ApiResponse<{
      conversations: Conversation[];
      total: number;
      page: number;
      limit: number;
      hasMore: boolean;
    }>
  > {
    return apiClient.get("/chat/conversations", { page, limit });
  },

  /**
   * 获取会话详情
   * @param id 会话ID
   */
  getConversationById(id: number): Promise<ApiResponse<Conversation>> {
    return apiClient.get(`/chat/conversations/${id}`);
  },

  /**
   * 创建私聊会话
   * @param data 会话创建数据
   */
  createDirectConversation(
    data: ConversationDirectInput,
  ): Promise<ApiResponse<Conversation>> {
    return apiClient.post("/chat/conversations/direct", data);
  },

  /**
   * 创建群聊会话
   * @param data 群聊创建数据
   */
  createGroupConversation(
    data: ConversationGroupInput,
  ): Promise<ApiResponse<Conversation>> {
    return apiClient.post("/chat/conversations/group", data);
  },

  /**
   * 获取消息列表
   * @param conversationId 会话ID
   * @param params 分页参数
   */
  getMessages(
    conversationId: number,
    params: PaginationParams & { before?: number },
  ): Promise<
    ApiResponse<{
      messages: Message[];
      total: number;
      page: number;
      limit: number;
      hasMore: boolean;
    }>
  > {
    return apiClient.get(
      `/chat/conversations/${conversationId}/messages`,
      params,
    );
  },

  /**
   * 发送消息
   * @param data 消息数据
   */
  sendMessage(data: MessageInput): Promise<ApiResponse<Message>> {
    return apiClient.post("/chat/messages", data);
  },

  /**
   * 标记消息为已读
   * @param conversationId 会话ID
   * @param lastReadMessageId 最后一条已读消息ID
   */
  markMessagesAsRead(
    conversationId: number,
    lastReadMessageId?: number,
  ): Promise<ApiResponse<null>> {
    return apiClient.post("/chat/messages/read", {
      conversationId,
      lastReadMessageId,
    });
  },

  /**
   * 删除消息
   * @param id 消息ID
   */
  deleteMessage(id: number): Promise<ApiResponse<null>> {
    return apiClient.delete(`/chat/messages/${id}`);
  },

  /**
   * 发起通话
   * @param data 通话数据
   */
  initiateCall(data: CallInitiateInput): Promise<ApiResponse<Message>> {
    return apiClient.post("/chat/calls/initiate", data);
  },

  /**
   * 更新通话状态
   * @param data 通话状态数据
   */
  updateCallStatus(data: CallStatusUpdateInput): Promise<ApiResponse<Message>> {
    return apiClient.post("/chat/calls/status", data);
  },
};

export default chatApi;
