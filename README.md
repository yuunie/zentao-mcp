# 禅道 MCP 服务器

这是一个基于禅道 RESTful API v1 的 MCP (Model Context Protocol) 服务器，可以通过账号密码获取 token，并查询禅道中的需求、bug、任务等内容。

## 功能特性

- 🔐 通过账号密码获取 token（自动缓存，有效期1小时）
- 📋 获取产品需求列表
- 🐛 获取产品 bug 列表
- ✅ 获取项目任务列表
- 📊 获取产品详情
- 🔍 获取项目详情
- ⚙️ 支持环境变量和动态配置两种方式

## 安装

```bash
npm install
```

## 配置方式

### 方式一：环境变量配置

在启动服务器前，设置以下环境变量：

```bash
export ZENTAO_URL=https://your-zentao-url.com
export ZENTAO_ACCOUNT=your-username
export ZENTAO_PASSWORD=your-password
```

### 方式二：MCP 工具动态配置

使用 `configure` 工具动态设置连接信息（推荐，更灵活）。

## 使用方法

### 1. 配置禅道连接信息

使用 `configure` 工具设置禅道 URL、账号和密码：

```json
{
  "url": "https://your-zentao-url.com",
  "account": "your-username",
  "password": "your-password"
}
```

### 2. 获取 Token

使用 `get_token` 工具获取认证 token（会自动使用配置的账号密码，token 会被缓存1小时）。

### 3. 查询数据

使用以下工具查询数据：

- **`get_requirements`** - 获取产品需求列表
  - 参数：`productId`（必需），`page`（可选，默认1），`limit`（可选，默认20）
  
- **`get_bugs`** - 获取产品 bug 列表
  - 参数：`productId`（必需），`page`（可选，默认1），`limit`（可选，默认20）
  
- **`get_tasks`** - 获取项目任务列表
  - 参数：`projectId`（必需），`page`（可选，默认1），`limit`（可选，默认20）
  
- **`get_product`** - 获取产品详情
  - 参数：`productId`（必需）
  
- **`get_project`** - 获取项目详情
  - 参数：`projectId`（必需）

## MCP 客户端配置示例

在 Cursor 或其他 MCP 客户端的配置文件中添加：

```json
{
  "mcpServers": {
    "zentao": {
      "command": "node",
      "args": ["/absolute/path/to/zentao-mcp/src/index.js"],
      "env": {
        "ZENTAO_URL": "https://your-zentao-url.com",
        "ZENTAO_ACCOUNT": "your-username",
        "ZENTAO_PASSWORD": "your-password"
      }
    }
  }
}
```

## API 文档

参考 [禅道 RESTful API v1 文档](https://www.zentao.net/book/api/1397.html)

## 技术实现

- 使用 `@modelcontextprotocol/sdk` 实现 MCP 协议
- Token 自动缓存，避免频繁请求
- 支持分页查询（page 和 limit 参数）
- 完整的错误处理机制

## 许可证

MIT

