/**
 * 聊天相关的共享类型
 */

// 会话类型
export enum ConversationType {
  DIRECT = "direct",
  GROUP = "group",
}

// 消息类型
export enum MessageType {
  TEXT = "text",
  IMAGE = "image",
  FILE = "file",
  AUDIO = "audio",
  VIDEO = "video",
  CALL_AUDIO = "call_audio",
  CALL_VIDEO = "call_video",
}

// 消息状态
export enum MessageStatus {
  SENT = "sent",
  DELIVERED = "delivered",
  READ = "read",
  FAILED = "failed",
}

// 通话状态
export enum CallStatus {
  MISSED = "missed",
  ANSWERED = "answered",
  REJECTED = "rejected",
  COMPLETED = "completed",
}

// 会话参与者基本信息
export interface ConversationParticipantBasic {
  id: number;
  username: string;
  avatar: string | null;
  status: string;
}

// 最后一条消息信息
export interface LastMessageInfo {
  id: number;
  content: string | null;
  type: string;
  createdAt: string | Date;
  senderId: number;
  senderName: string;
}

// 群组基本信息
export interface GroupBasic {
  id: number;
  name: string;
  avatar: string | null;
}

// 会话基本信息
export interface ConversationBasic {
  id: number;
  type: string;
  lastMessageAt: string | Date | null;
  unreadCount: number;
  isArchived: boolean;
  isMuted: boolean;
  createdAt: string | Date;
  updatedAt: string | Date;
  participants: ConversationParticipantBasic[];
  lastMessage: LastMessageInfo | null;
  group: GroupBasic | null;
}

// 回复消息信息
export interface ReplyInfo {
  id: number;
  content: string | null;
  senderId: number;
  senderName: string;
}

// 消息发送者信息
export interface MessageSender {
  id: number;
  username: string;
  avatar: string | null;
}

// 消息完整信息
export interface Message {
  id: number;
  conversationId: number;
  senderId: number;
  content: string | null;
  type: MessageType;
  mediaUrl: string | null;
  status: MessageStatus;
  createdAt: string;
  updatedAt: string;
  sender: MessageSender;
  replyTo: ReplyInfo | null;
  callStatus: CallStatus | null;
  callDuration: number | null;
}

// 获取会话列表参数
export interface GetConversationsParams {
  page?: string;
  limit?: string;
}

// 获取会话详情参数
export interface GetConversationParams {
  id: string;
}

// 创建私聊会话请求体
export interface CreateDirectConversationBody {
  userId: number;
}

// 创建群聊会话请求体
export interface CreateGroupConversationBody {
  name: string;
  userIds: number[];
}

// 获取消息列表参数
export interface GetMessagesParams {
  conversationId: string;
  page?: string;
  limit?: string;
  before?: string; // 获取指定消息ID之前的消息
}

// 发送消息请求体
export interface SendMessageBody {
  conversationId: number;
  content: string;
  type?: MessageType;
  mediaUrl?: string;
  replyToId?: number;
}

// 已读消息请求体
export interface ReadMessagesBody {
  conversationId: number;
  lastReadMessageId?: number;
}

// 删除消息参数
export interface DeleteMessageParams {
  id: string;
}

// 发起通话请求体
export interface InitiateCallBody {
  conversationId: number;
  type: "audio" | "video";
}

// 更新通话状态请求体
export interface UpdateCallStatusBody {
  messageId: number;
  status: CallStatus;
  duration?: number;
}

// 会话列表响应数据
export interface ConversationsListResponse {
  conversations: ConversationBasic[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}

// 消息列表响应数据
export interface MessagesListResponse {
  messages: Message[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}

// 用户简略信息
export interface UserBasic {
  id: number;
  username: string;
  avatar?: string;
  status?: string;
}

// 群组信息
export interface Group {
  id: number;
  name: string;
  avatar?: string;
}

// 回复消息信息
export interface ReplyToMessage {
  id: number;
  content: string;
  senderId: number;
  senderName: string;
}

// 会话最后一条消息
export interface LastMessage {
  id: number;
  content: string | null;
  type: MessageType;
  createdAt: string;
  senderId: number;
  senderName: string;
}

// 会话信息
export interface Conversation {
  id: number;
  type: ConversationType;
  lastMessageAt: string | null;
  unreadCount: number;
  isArchived: boolean;
  isMuted: boolean;
  createdAt: string;
  updatedAt: string;
  participants: UserBasic[];
  lastMessage: LastMessage | null;
  group: Group | null;
}

// 分页参数
export interface PaginationParams {
  page?: number;
  limit?: number;
}

// 分页响应
export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}

// 创建私聊会话请求
export interface ConversationDirectInput {
  userId: number;
}

// 创建群聊会话请求
export interface ConversationGroupInput {
  name: string;
  userIds: number[];
}

// 发送消息请求
export interface MessageInput {
  conversationId: number;
  content: string;
  type?: MessageType;
  mediaUrl?: string;
  replyToId?: number;
}

// 发起通话请求
export interface CallInitiateInput {
  conversationId: number;
  type: "audio" | "video";
}

// 更新通话状态请求
export interface CallStatusUpdateInput {
  messageId: number;
  status: CallStatus;
  duration?: number;
}
