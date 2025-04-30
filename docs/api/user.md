# 用户 API

用户 API 用于获取用户信息、搜索用户以及管理好友关系。

## 获取当前用户信息

获取当前登录用户的详细信息。

### 请求

```
GET /users/me
```

#### 请求头

```
Authorization: Bearer <token>
```

### 响应

#### 成功响应 (200 OK)

```json
{
  "success": true,
  "message": "获取当前用户成功",
  "timestamp": "2023-11-02T08:00:00Z",
  "code": 200,
  "data": {
    "id": 1,
    "email": "user@example.com",
    "phone": "13800138000",
    "username": "example",
    "avatar": "https://example.com/avatar.jpg",
    "bio": "这是我的个人简介",
    "status": "online",
    "lastActiveAt": "2023-11-02T07:50:00Z",
    "createdAt": "2023-10-01T00:00:00Z",
    "updatedAt": "2023-11-02T08:00:00Z"
  }
}
```

#### 错误响应 (401 Unauthorized)

```json
{
  "success": false,
  "message": "未授权",
  "timestamp": "2023-11-02T08:00:00Z",
  "code": 401,
  "error": "请先登录"
}
```

## 获取用户信息

通过用户 ID 获取指定用户的信息。

### 请求

```
GET /users/:id
```

#### 路径参数

| 参数 | 描述    |
| ---- | ------- |
| id   | 用户 ID |

### 响应

#### 成功响应 (200 OK)

```json
{
  "id": 2,
  "email": "other@example.com",
  "phone": "13900139000",
  "username": "other_user",
  "avatar": "https://example.com/avatar2.jpg",
  "bio": "这是其他用户的个人简介",
  "status": "offline",
  "lastActiveAt": "2023-11-01T10:00:00Z",
  "createdAt": "2023-10-02T00:00:00Z",
  "updatedAt": "2023-11-01T10:00:00Z"
}
```

#### 错误响应 (404 Not Found)

```json
{
  "success": false,
  "message": "用户不存在",
  "timestamp": "2023-11-02T08:00:00Z",
  "code": 404,
  "error": "找不到ID为2的用户"
}
```

## 搜索用户

根据关键词搜索用户。

### 请求

```
GET /users/search?keyword=example&page=1&limit=10
```

#### 查询参数

| 参数    | 描述       | 必填 | 默认值 |
| ------- | ---------- | ---- | ------ |
| keyword | 搜索关键词 | 是   | -      |
| page    | 页码       | 否   | 1      |
| limit   | 每页记录数 | 否   | 10     |

### 响应

#### 成功响应 (200 OK)

```json
{
  "success": true,
  "message": "搜索用户成功",
  "timestamp": "2023-11-02T08:00:00Z",
  "code": 200,
  "data": {
    "users": [
      {
        "id": 2,
        "username": "example_user",
        "avatar": "https://example.com/avatar2.jpg",
        "status": "online"
      },
      {
        "id": 3,
        "username": "another_example",
        "avatar": null,
        "status": "offline"
      }
    ],
    "total": 2,
    "page": 1,
    "limit": 10,
    "hasMore": false
  }
}
```

## 获取好友列表

获取当前用户的好友列表。

### 请求

```
GET /users/friends
```

#### 请求头

```
Authorization: Bearer <token>
```

### 响应

#### 成功响应 (200 OK)

```json
{
  "success": true,
  "message": "获取好友列表成功",
  "timestamp": "2023-11-02T08:00:00Z",
  "code": 200,
  "data": {
    "friends": [
      {
        "id": 1,
        "initiatorId": 1,
        "receiverId": 2,
        "status": "accepted",
        "createdAt": "2023-10-15T00:00:00Z",
        "updatedAt": "2023-10-15T00:00:00Z",
        "user": {
          "id": 2,
          "username": "friend1",
          "avatar": "https://example.com/friend1.jpg",
          "status": "online"
        }
      },
      {
        "id": 2,
        "initiatorId": 3,
        "receiverId": 1,
        "status": "accepted",
        "createdAt": "2023-10-20T00:00:00Z",
        "updatedAt": "2023-10-20T00:00:00Z",
        "user": {
          "id": 3,
          "username": "friend2",
          "avatar": null,
          "status": "offline"
        }
      }
    ],
    "total": 2
  }
}
```

## 获取好友请求列表

获取发送给当前用户的好友请求。

### 请求

```
GET /users/friend-requests
```

#### 请求头

```
Authorization: Bearer <token>
```

### 响应

#### 成功响应 (200 OK)

```json
{
  "success": true,
  "message": "获取好友请求列表成功",
  "timestamp": "2023-11-02T08:00:00Z",
  "code": 200,
  "data": {
    "requests": [
      {
        "id": 3,
        "initiatorId": 4,
        "receiverId": 1,
        "status": "pending",
        "createdAt": "2023-11-01T00:00:00Z",
        "updatedAt": "2023-11-01T00:00:00Z",
        "user": {
          "id": 4,
          "username": "new_friend",
          "avatar": "https://example.com/new_friend.jpg",
          "status": "online"
        }
      }
    ],
    "total": 1
  }
}
```

## 添加好友

向其他用户发送好友请求。

### 请求

```
POST /users/add-friend
```

#### 请求头

```
Authorization: Bearer <token>
```

#### 请求体

```json
{
  "userId": 5,
  "message": "你好，我是小明，请添加我为好友"
}
```

| 字段    | 类型   | 必填 | 描述            |
| ------- | ------ | ---- | --------------- |
| userId  | number | 是   | 要添加的用户 ID |
| message | string | 否   | 附加消息        |

### 响应

#### 成功响应 (200 OK)

```json
{
  "success": true,
  "message": "好友请求已发送",
  "timestamp": "2023-11-02T08:00:00Z",
  "code": 200
}
```

#### 错误响应 (400 Bad Request)

```json
{
  "success": false,
  "message": "无法添加好友",
  "timestamp": "2023-11-02T08:00:00Z",
  "code": 400,
  "error": "已经是好友关系或请求已存在"
}
```

## 处理好友请求

接受、拒绝或阻止好友请求。

### 请求

```
POST /users/handle-friend-request
```

#### 请求头

```
Authorization: Bearer <token>
```

#### 请求体

```json
{
  "requestId": 3,
  "action": "accept"
}
```

| 字段      | 类型   | 必填 | 描述                                                |
| --------- | ------ | ---- | --------------------------------------------------- |
| requestId | number | 是   | 好友请求 ID                                         |
| action    | string | 是   | 操作："accept"(接受)、"reject"(拒绝)或"block"(阻止) |

### 响应

#### 成功响应 (200 OK)

```json
{
  "success": true,
  "message": "已接受好友请求",
  "timestamp": "2023-11-02T08:00:00Z",
  "code": 200
}
```

#### 错误响应 (404 Not Found)

```json
{
  "success": false,
  "message": "请求不存在",
  "timestamp": "2023-11-02T08:00:00Z",
  "code": 404,
  "error": "找不到ID为3的好友请求"
}
```

## 删除好友

删除与指定用户的好友关系。

### 请求

```
POST /users/delete-friend
```

#### 请求头

```
Authorization: Bearer <token>
```

#### 请求体

```json
{
  "friendshipId": 1
}
```

| 字段         | 类型   | 必填 | 描述        |
| ------------ | ------ | ---- | ----------- |
| friendshipId | number | 是   | 好友关系 ID |

### 响应

#### 成功响应 (200 OK)

```json
{
  "success": true,
  "message": "好友已删除",
  "timestamp": "2023-11-02T08:00:00Z",
  "code": 200
}
```

#### 错误响应 (404 Not Found)

```json
{
  "success": false,
  "message": "好友关系不存在",
  "timestamp": "2023-11-02T08:00:00Z",
  "code": 404,
  "error": "找不到ID为1的好友关系"
}
```
