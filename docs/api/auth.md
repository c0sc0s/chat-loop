# 认证 API

认证 API 用于用户登录、注册和登出操作。

## 用户注册

创建新用户账户。

### 请求

```
POST /auth/register
```

#### 请求体

```json
{
  "username": "example",
  "email": "user@example.com",
  "password": "password123",
  "phone": "13800138000", // 可选
  "firstName": "张", // 可选
  "lastName": "三", // 可选
  "avatar": "https://example.com/avatar.jpg" // 可选
}
```

| 字段      | 类型   | 必填 | 描述                  |
| --------- | ------ | ---- | --------------------- |
| username  | string | 是   | 用户名，至少 3 个字符 |
| email     | string | 是   | 电子邮件地址          |
| password  | string | 是   | 密码，至少 6 个字符   |
| phone     | string | 否   | 手机号码              |
| firstName | string | 否   | 名                    |
| lastName  | string | 否   | 姓                    |
| avatar    | string | 否   | 头像 URL              |

### 响应

#### 成功响应 (200 OK)

```json
{
  "success": true,
  "message": "注册成功",
  "timestamp": "2023-11-02T08:00:00Z",
  "code": 200,
  "data": {
    "user": {
      "id": 1,
      "username": "example",
      "email": "user@example.com",
      "avatar": null,
      "status": "online"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

#### 错误响应 (400 Bad Request)

```json
{
  "success": false,
  "message": "注册失败",
  "timestamp": "2023-11-02T08:00:00Z",
  "code": 400,
  "error": "电子邮件已被注册"
}
```

## 用户登录

使用凭据登录系统。

### 请求

```
POST /auth/login
```

#### 请求体

```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

| 字段     | 类型   | 必填 | 描述         |
| -------- | ------ | ---- | ------------ |
| email    | string | 是   | 电子邮件地址 |
| password | string | 是   | 密码         |

### 响应

#### 成功响应 (200 OK)

```json
{
  "success": true,
  "message": "登录成功",
  "timestamp": "2023-11-02T08:00:00Z",
  "code": 200,
  "data": {
    "user": {
      "id": 1,
      "username": "example",
      "email": "user@example.com",
      "avatar": null,
      "status": "online"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

#### 错误响应 (401 Unauthorized)

```json
{
  "success": false,
  "message": "登录失败",
  "timestamp": "2023-11-02T08:00:00Z",
  "code": 401,
  "error": "邮箱或密码不正确"
}
```

## 用户登出

登出当前用户。

### 请求

```
POST /auth/logout
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
  "message": "成功登出",
  "timestamp": "2023-11-02T08:00:00Z",
  "code": 200,
  "data": null
}
```

#### 错误响应 (401 Unauthorized)

```json
{
  "success": false,
  "message": "未授权",
  "timestamp": "2023-11-02T08:00:00Z",
  "code": 401,
  "error": "无效或已过期的令牌"
}
```
