# 聊天 API

聊天 API 用于管理会话、发送消息和处理通话功能。

## 获取会话列表

获取当前用户的所有会话。

### 请求

```
GET /chat/conversations?page=1&limit=20
```

#### 请求头

```
Authorization: Bearer <token>
```

#### 查询参数

| 参数  | 描述       | 必填 | 默认值 |
| ----- | ---------- | ---- | ------ |
| page  | 页码       | 否   | 1      |
| limit | 每页记录数 | 否   | 20     |

### 响应

#### 成功响应 (200 OK)

```json
{
  "success": true,
  "message": "获取会话列表成功",
  "timestamp": "2023-11-02T08:00:00Z",
  "code": 200,
  "data": {
    "conversations": [
      {
        "id": 1,
        "type": "direct",
        "lastMessageAt": "2023-11-01T20:00:00Z",
        "unreadCount": 3,
        "isArchived": false,
        "isMuted": false,
        "createdAt": "2023-10-15T00:00:00Z",
        "updatedAt": "2023-11-01T20:00:00Z",
        "participants": [
          {
            "id": 1,
            "username": "me",
            "avatar": "https://example.com/me.jpg",
            "status": "online"
          },
          {
            "id": 2,
            "username": "friend",
            "avatar": "https://example.com/friend.jpg",
            "status": "offline"
          }
        ],
        "lastMessage": {
          "id": 101,
          "content": "明天见！",
          "type": "text",
          "createdAt": "2023-11-01T20:00:00Z",
          "senderId": 2,
          "senderName": "friend"
        },
        "group": null
      },
      {
        "id": 2,
        "type": "group",
        "lastMessageAt": "2023-11-01T18:30:00Z",
        "unreadCount": 5,
        "isArchived": false,
        "isMuted": true,
        "createdAt": "2023-10-20T00:00:00Z",
        "updatedAt": "2023-11-01T18:30:00Z",
        "participants": [
          {
            "id": 1,
            "username": "me",
            "avatar": "https://example.com/me.jpg",
            "status": "online"
          },
          {
            "id": 2,
            "username": "friend",
            "avatar": "https://example.com/friend.jpg",
            "status": "offline"
          },
          {
            "id": 3,
            "username": "colleague",
            "avatar": null,
            "status": "away"
          }
        ],
        "lastMessage": {
          "id": 203,
          "content": "我已经上传了文档",
          "type": "text",
          "createdAt": "2023-11-01T18:30:00Z",
          "senderId": 3,
          "senderName": "colleague"
        },
        "group": {
          "id": 1,
          "name": "项目组",
          "avatar": "https://example.com/group.jpg"
        }
      }
    ],
    "total": 2,
    "page": 1,
    "limit": 20,
    "hasMore": false
  }
}
```

## 获取会话详情

获取指定会话的详细信息。

### 请求

```
GET /chat/conversations/:id
```

#### 请求头

```
Authorization: Bearer <token>
```

#### 路径参数

| 参数 | 描述    |
| ---- | ------- |
| id   | 会话 ID |

### 响应

#### 成功响应 (200 OK)

```json
{
  "success": true,
  "message": "获取会话详情成功",
  "timestamp": "2023-11-02T08:00:00Z",
  "code": 200,
  "data": {
    "id": 1,
    "type": "direct",
    "lastMessageAt": "2023-11-01T20:00:00Z",
    "unreadCount": 3,
    "isArchived": false,
    "isMuted": false,
    "createdAt": "2023-10-15T00:00:00Z",
    "updatedAt": "2023-11-01T20:00:00Z",
    "participants": [
      {
        "id": 1,
        "username": "me",
        "avatar": "https://example.com/me.jpg",
        "status": "online"
      },
      {
        "id": 2,
        "username": "friend",
        "avatar": "https://example.com/friend.jpg",
        "status": "offline"
      }
    ],
    "lastMessage": {
      "id": 101,
      "content": "明天见！",
      "type": "text",
      "createdAt": "2023-11-01T20:00:00Z",
      "senderId": 2,
      "senderName": "friend"
    },
    "group": null
  }
}
```

#### 错误响应 (404 Not Found)

```json
{
  "success": false,
  "message": "会话不存在",
  "timestamp": "2023-11-02T08:00:00Z",
  "code": 404,
  "error": "找不到ID为1的会话"
}
```

## 创建私聊会话

创建与指定用户的私聊会话。

### 请求

```
POST /chat/conversations/direct
```

#### 请求头

```
Authorization: Bearer <token>
```

#### 请求体

```json
{
  "userId": 3
}
```

| 字段   | 类型   | 必填 | 描述        |
| ------ | ------ | ---- | ----------- |
| userId | number | 是   | 对方用户 ID |

### 响应

#### 成功响应 (200 OK)

```json
{
  "success": true,
  "message": "创建私聊会话成功",
  "timestamp": "2023-11-02T08:00:00Z",
  "code": 200,
  "data": {
    "id": 3,
    "type": "direct",
    "lastMessageAt": null,
    "unreadCount": 0,
    "isArchived": false,
    "isMuted": false,
    "createdAt": "2023-11-02T08:00:00Z",
    "updatedAt": "2023-11-02T08:00:00Z",
    "participants": [
      {
        "id": 1,
        "username": "me",
        "avatar": "https://example.com/me.jpg",
        "status": "online"
      },
      {
        "id": 3,
        "username": "new_contact",
        "avatar": null,
        "status": "online"
      }
    ],
    "lastMessage": null,
    "group": null
  }
}
```

## 创建群聊会话

创建一个新的群聊会话。

### 请求

```
POST /chat/conversations/group
```

#### 请求头

```
Authorization: Bearer <token>
```

#### 请求体

```json
{
  "name": "项目讨论组",
  "userIds": [2, 3, 4]
}
```

| 字段    | 类型     | 必填 | 描述                               |
| ------- | -------- | ---- | ---------------------------------- |
| name    | string   | 是   | 群组名称                           |
| userIds | number[] | 是   | 要添加的用户 ID 数组（不包括自己） |

### 响应

#### 成功响应 (200 OK)

```json
{
  "success": true,
  "message": "创建群聊会话成功",
  "timestamp": "2023-11-02T08:00:00Z",
  "code": 200,
  "data": {
    "id": 4,
    "type": "group",
    "lastMessageAt": null,
    "unreadCount": 0,
    "isArchived": false,
    "isMuted": false,
    "createdAt": "2023-11-02T08:00:00Z",
    "updatedAt": "2023-11-02T08:00:00Z",
    "participants": [
      {
        "id": 1,
        "username": "me",
        "avatar": "https://example.com/me.jpg",
        "status": "online"
      },
      {
        "id": 2,
        "username": "friend",
        "avatar": "https://example.com/friend.jpg",
        "status": "offline"
      },
      {
        "id": 3,
        "username": "colleague1",
        "avatar": null,
        "status": "away"
      },
      {
        "id": 4,
        "username": "colleague2",
        "avatar": "https://example.com/colleague2.jpg",
        "status": "online"
      }
    ],
    "lastMessage": null,
    "group": {
      "id": 2,
      "name": "项目讨论组",
      "avatar": null
    }
  }
}
```

## 获取消息列表

获取指定会话的消息列表。

### 请求

```
GET /chat/conversations/:conversationId/messages?page=1&limit=20&before=150
```

#### 请求头

```
Authorization: Bearer <token>
```

#### 路径参数

| 参数           | 描述    |
| -------------- | ------- |
| conversationId | 会话 ID |

#### 查询参数

| 参数   | 描述                       | 必填 | 默认值 |
| ------ | -------------------------- | ---- | ------ |
| page   | 页码                       | 否   | 1      |
| limit  | 每页记录数                 | 否   | 20     |
| before | 获取指定消息 ID 之前的消息 | 否   | -      |

### 响应

#### 成功响应 (200 OK)

```json
{
  "success": true,
  "message": "获取消息列表成功",
  "timestamp": "2023-11-02T08:00:00Z",
  "code": 200,
  "data": {
    "messages": [
      {
        "id": 102,
        "conversationId": 1,
        "senderId": 1,
        "content": "明天几点见？",
        "type": "text",
        "mediaUrl": null,
        "status": "read",
        "createdAt": "2023-11-01T19:55:00Z",
        "updatedAt": "2023-11-01T19:55:30Z",
        "sender": {
          "id": 1,
          "username": "me",
          "avatar": "https://example.com/me.jpg"
        },
        "replyTo": null,
        "callStatus": null,
        "callDuration": null
      },
      {
        "id": 101,
        "conversationId": 1,
        "senderId": 2,
        "content": "明天见！",
        "type": "text",
        "mediaUrl": null,
        "status": "delivered",
        "createdAt": "2023-11-01T19:50:00Z",
        "updatedAt": "2023-11-01T19:50:30Z",
        "sender": {
          "id": 2,
          "username": "friend",
          "avatar": "https://example.com/friend.jpg"
        },
        "replyTo": {
          "id": 100,
          "content": "你好！",
          "senderId": 1,
          "senderName": "me"
        },
        "callStatus": null,
        "callDuration": null
      }
    ],
    "total": 3,
    "page": 1,
    "limit": 20,
    "hasMore": true
  }
}
```

## 发送消息

向指定会话发送消息。

### 请求

```
POST /chat/messages
```

#### 请求头

```
Authorization: Bearer <token>
```

#### 请求体

```json
{
  "conversationId": 1,
  "content": "你好，这是一条测试消息",
  "type": "text",
  "mediaUrl": null,
  "replyToId": 101
}
```

| 字段           | 类型   | 必填 | 描述                                            |
| -------------- | ------ | ---- | ----------------------------------------------- |
| conversationId | number | 是   | 会话 ID                                         |
| content        | string | 是   | 消息内容                                        |
| type           | string | 否   | 消息类型：text(默认)、image、file、audio、video |
| mediaUrl       | string | 否   | 媒体文件 URL（用于非文本消息）                  |
| replyToId      | number | 否   | 回复的消息 ID                                   |

### 响应

#### 成功响应 (200 OK)

```json
{
  "success": true,
  "message": "发送消息成功",
  "timestamp": "2023-11-02T08:00:00Z",
  "code": 200,
  "data": {
    "id": 103,
    "conversationId": 1,
    "senderId": 1,
    "content": "你好，这是一条测试消息",
    "type": "text",
    "mediaUrl": null,
    "status": "sent",
    "createdAt": "2023-11-02T08:00:00Z",
    "updatedAt": "2023-11-02T08:00:00Z",
    "sender": {
      "id": 1,
      "username": "me",
      "avatar": "https://example.com/me.jpg"
    },
    "replyTo": {
      "id": 101,
      "content": "明天见！",
      "senderId": 2,
      "senderName": "friend"
    },
    "callStatus": null,
    "callDuration": null
  }
}
```

## 标记消息为已读

将指定会话中的消息标记为已读。

### 请求

```
POST /chat/messages/read
```

#### 请求头

```
Authorization: Bearer <token>
```

#### 请求体

```json
{
  "conversationId": 1,
  "lastReadMessageId": 103
}
```

| 字段              | 类型   | 必填 | 描述                                          |
| ----------------- | ------ | ---- | --------------------------------------------- |
| conversationId    | number | 是   | 会话 ID                                       |
| lastReadMessageId | number | 否   | 最后一条已读消息 ID（不提供则标记全部为已读） |

### 响应

#### 成功响应 (200 OK)

```json
{
  "success": true,
  "message": "消息已标记为已读",
  "timestamp": "2023-11-02T08:00:00Z",
  "code": 200
}
```

## 删除消息

删除指定的消息（仅限自己发送的消息）。

### 请求

```
DELETE /chat/messages/:id
```

#### 请求头

```
Authorization: Bearer <token>
```

#### 路径参数

| 参数 | 描述    |
| ---- | ------- |
| id   | 消息 ID |

### 响应

#### 成功响应 (200 OK)

```json
{
  "success": true,
  "message": "消息已删除",
  "timestamp": "2023-11-02T08:00:00Z",
  "code": 200
}
```

#### 错误响应 (403 Forbidden)

```json
{
  "success": false,
  "message": "无权删除消息",
  "timestamp": "2023-11-02T08:00:00Z",
  "code": 403,
  "error": "只能删除自己发送的消息"
}
```

## 发起通话

发起语音或视频通话。

### 请求

```
POST /chat/calls/initiate
```

#### 请求头

```
Authorization: Bearer <token>
```

#### 请求体

```json
{
  "conversationId": 1,
  "type": "video"
}
```

| 字段           | 类型   | 必填 | 描述                                |
| -------------- | ------ | ---- | ----------------------------------- |
| conversationId | number | 是   | 会话 ID                             |
| type           | string | 是   | 通话类型：audio(语音)或 video(视频) |

### 响应

#### 成功响应 (200 OK)

```json
{
  "success": true,
  "message": "通话请求已发送",
  "timestamp": "2023-11-02T08:00:00Z",
  "code": 200,
  "data": {
    "id": 104,
    "conversationId": 1,
    "senderId": 1,
    "content": null,
    "type": "call_video",
    "mediaUrl": null,
    "status": "sent",
    "createdAt": "2023-11-02T08:00:00Z",
    "updatedAt": "2023-11-02T08:00:00Z",
    "sender": {
      "id": 1,
      "username": "me",
      "avatar": "https://example.com/me.jpg"
    },
    "replyTo": null,
    "callStatus": "missed",
    "callDuration": null
  }
}
```

## 更新通话状态

更新通话状态（接听、拒绝、结束等）。

### 请求

```
POST /chat/calls/status
```

#### 请求头

```
Authorization: Bearer <token>
```

#### 请求体

```json
{
  "messageId": 104,
  "status": "answered",
  "duration": 120
}
```

| 字段      | 类型   | 必填 | 描述                                                                            |
| --------- | ------ | ---- | ------------------------------------------------------------------------------- |
| messageId | number | 是   | 通话消息 ID                                                                     |
| status    | string | 是   | 通话状态：answered(已接听)、rejected(已拒绝)、completed(已完成)、missed(已错过) |
| duration  | number | 否   | 通话时长（秒），仅当 status 为 completed 时有意义                               |

### 响应

#### 成功响应 (200 OK)

```json
{
  "success": true,
  "message": "通话状态已更新",
  "timestamp": "2023-11-02T08:05:00Z",
  "code": 200,
  "data": {
    "id": 104,
    "conversationId": 1,
    "senderId": 1,
    "content": null,
    "type": "call_video",
    "mediaUrl": null,
    "status": "delivered",
    "createdAt": "2023-11-02T08:00:00Z",
    "updatedAt": "2023-11-02T08:05:00Z",
    "sender": {
      "id": 1,
      "username": "me",
      "avatar": "https://example.com/me.jpg"
    },
    "replyTo": null,
    "callStatus": "answered",
    "callDuration": 120
  }
}
```
