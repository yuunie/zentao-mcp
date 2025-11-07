# 禅道 MCP 服务器

这是一个基于禅道 RESTful API v1 的 MCP (Model Context Protocol) 服务器，通过 token 和 zentaosid 进行 Cookie 认证，可以查询禅道中的需求、bug、任务等内容。

## 功能特性

- 🔐 使用 token 和 zentaosid 进行 Cookie 认证
- 📋 获取产品需求列表
- 📄 获取单个需求详情
- 🐛 获取产品 bug 列表
- ✅ 获取项目任务列表
- 📊 获取产品详情
- 🔍 获取项目详情
- ⚙️ 支持环境变量和动态配置两种方式

## 安装

### 方式一：从 npm 安装（如果已发布）

```bash
npm install -g zentao-mcp
```

### 方式二：从源码安装

```bash
# 克隆仓库
git clone https://github.com/your-username/zentao-mcp.git
cd zentao-mcp

# 安装依赖
npm install
```

### 方式三：本地开发

```bash
npm install
```

## 配置方式

### 方式一：环境变量配置

在启动服务器前，设置以下环境变量：

```bash
export ZENTAO_URL=https://your-zentao-url.com
export ZENTAO_TOKEN=your-token
export ZENTAO_SID=your-zentaosid
```

### 方式二：MCP 工具动态配置（推荐）

使用 `configure` 工具动态设置连接信息，更灵活且不需要在配置文件中硬编码敏感信息。

## 使用方法

### 1. 配置禅道连接信息

使用 `configure` 工具设置禅道 URL、token 和 zentaosid：

**如何获取 token 和 zentaosid：**
1. 登录禅道系统
2. 打开浏览器开发者工具（F12）
3. 在 Network 标签中查看请求的 Cookie
4. 复制 `token` 和 `zentaosid` 的值

**配置示例：**
```json
{
  "url": "https://your-zentao-url.com",
  "token": "bearer eyJhbGciOiJSUzI1NiJ9...",
  "zentaosid": "712bc0a88bfff38a0a7310240521b40f"
}
```

### 2. 查询数据

使用以下工具查询数据：

- **`get_requirements`** - 获取产品需求列表
  - 参数：`productId`（必需），`page`（可选，默认1），`limit`（可选，默认20）
  
- **`get_requirement`** - 获取单个需求详情
  - 参数：`storyId`（必需）
  
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

### 如果全局安装了 zentao-mcp

```json
{
  "mcpServers": {
    "zentao": {
      "command": "zentao-mcp"
    }
  }
}
```

### 如果从源码安装

```json
{
  "mcpServers": {
    "zentao": {
      "command": "node",
      "args": ["/absolute/path/to/zentao-mcp/src/index.js"],
      "env": {
        "ZENTAO_URL": "https://your-zentao-url.com",
        "ZENTAO_TOKEN": "your-token",
        "ZENTAO_SID": "your-zentaosid"
      }
    }
  }
}
```

**注意：** 推荐使用动态配置方式，不在配置文件中硬编码 token 和 zentaosid，而是通过 `configure` 工具动态设置。

## API 文档

参考 [禅道 RESTful API v1 文档](https://www.zentao.net/book/api/1397.html)

## 技术实现

- 使用 `@modelcontextprotocol/sdk` 实现 MCP 协议
- 通过 Cookie 认证（token + zentaosid）访问禅道 API
- 支持分页查询（page 和 limit 参数）
- 完整的错误处理机制

## 许可证

MIT

