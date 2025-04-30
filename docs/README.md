# 聊天应用 API 文档

本文档描述了聊天应用的 API 接口，帮助前端开发者理解和使用后端服务。

## 目录

- [介绍](#介绍)
- [认证](#认证)
- [用户](#用户)
- [聊天](#聊天)
- [健康检查](#健康检查)

## 介绍

本 API 基于 RESTful 设计，使用 JSON 作为数据交换格式。所有请求和响应的内容类型均为`application/json`。

### 基本 URL

```
http://localhost:3000
```

### 认证

大多数 API 需要认证。通过在 HTTP 头部添加`Authorization`字段来进行认证：

```
Authorization: Bearer <token>
```

其中`<token>`是通过登录 API 获取的 JWT 令牌。

### 请求格式

- GET 请求：参数通过 URL 查询字符串发送
- POST/PUT/DELETE 请求：参数通过请求体发送，格式为 JSON

### 响应格式

所有 API 响应都遵循以下格式：

```json
{
  "success": true,
  "message": "操作成功",
  "timestamp": "2023-11-02T08:00:00Z",
  "code": 200,
  "data": { ... }
}
```

出错时的响应格式：

```json
{
  "success": false,
  "message": "操作失败",
  "timestamp": "2023-11-02T08:00:00Z",
  "code": 400,
  "error": "具体错误信息"
}
```

### 通用状态码

- 200: 请求成功
- 400: 请求参数错误
- 401: 未认证或认证失败
- 403: 权限不足
- 404: 资源不存在
- 500: 服务器内部错误

## 详细文档

请查看各模块的具体文档以了解详细信息：

- [认证 API](./api/auth.md)
- [用户 API](./api/user.md)
- [聊天 API](./api/chat.md)
- [健康检查 API](./api/health.md)
