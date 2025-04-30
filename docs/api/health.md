# 健康检查 API

健康检查 API 用于监控系统状态和性能。

## 服务状态检查

检查 API 服务是否正常运行。

### 请求

```
GET /health
```

### 响应

#### 成功响应 (200 OK)

```json
{
  "status": "ok",
  "version": "1.0.0",
  "timestamp": "2023-11-02T08:00:00Z",
  "uptime": 3600000,
  "services": {
    "database": "connected",
    "cache": "connected"
  }
}
```

## 详细状态检查

获取系统各组件的详细状态信息。

### 请求

```
GET /health/details
```

### 响应

#### 成功响应 (200 OK)

```json
{
  "status": "ok",
  "version": "1.0.0",
  "timestamp": "2023-11-02T08:00:00Z",
  "uptime": 3600000,
  "services": {
    "database": {
      "status": "connected",
      "latency": 5,
      "connections": 10,
      "activeQueries": 2
    },
    "cache": {
      "status": "connected",
      "latency": 2,
      "memoryUsage": "45MB",
      "hitRate": 0.85
    },
    "fileStorage": {
      "status": "connected",
      "space": {
        "total": "10GB",
        "used": "4.5GB",
        "free": "5.5GB"
      }
    }
  },
  "system": {
    "cpu": {
      "usage": 0.35,
      "cores": 4
    },
    "memory": {
      "total": "8GB",
      "used": "4.2GB",
      "free": "3.8GB"
    }
  }
}
```
