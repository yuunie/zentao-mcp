# 禅道 MCP 服务器使用指南

## 快速开始

### 1. 安装依赖

```bash
cd /Users/unie/Desktop/Project/zentao-mcp
npm install
```

### 2. 配置 MCP 客户端（以 Cursor 为例）

#### 方法一：使用环境变量配置

在 Cursor 的 MCP 配置文件中添加（通常在 `~/.cursor/mcp.json` 或项目配置中）：

```json
{
  "mcpServers": {
    "zentao": {
      "command": "node",
      "args": ["/Users/unie/Desktop/Project/zentao-mcp/src/index.js"],
      "env": {
        "ZENTAO_URL": "https://your-zentao-url.com",
        "ZENTAO_SID": "your-zentaosid"
      }
    }
  }
}
```

**如何获取 zentaosid：**
1. 登录禅道系统
2. 打开浏览器开发者工具（F12）
3. 在 Network 标签中查看请求的 Cookie
4. 复制 `zentaosid` 的值

#### 方法二：动态配置（推荐）

如果不想在配置文件中硬编码 zentaosid，可以只配置命令，然后通过工具动态配置：

```json
{
  "mcpServers": {
    "zentao": {
      "command": "node",
      "args": ["/Users/unie/Desktop/Project/zentao-mcp/src/index.js"]
    }
  }
}
```

### 3. 重启 Cursor

配置完成后，重启 Cursor 以使 MCP 服务器生效。

### 4. 使用 MCP 工具

在 Cursor 的聊天界面中，你可以直接使用自然语言请求，AI 会自动调用相应的工具。

## 使用示例

### 示例 1：配置禅道连接

**对话示例：**

```
你：请帮我配置禅道连接，URL 是 https://zentao.example.com，zentaosid 是 712bc0a88bfff38a0a7310240521b40f

AI：我会使用 configure 工具来配置禅道连接信息...
```

### 示例 2：获取产品需求列表

**对话示例：**

```
你：请获取产品ID为1的所有需求

AI：我会使用 get_requirements 工具获取产品需求...
```

### 示例 2.1：获取单个需求详情

**对话示例：**

```
你：获取需求10818的详情

AI：我会使用 get_requirement 工具获取需求详情...
```

### 示例 3：获取 Bug 列表

**对话示例：**

```
你：查看产品1的第1页bug，每页显示10条

AI：我会使用 get_bugs 工具获取bug列表...
```

### 示例 4：获取项目任务

**对话示例：**

```
你：获取项目ID为5的所有任务

AI：我会使用 get_tasks 工具获取项目任务...
```

## 可用工具列表

### configure
配置禅道连接信息
- **参数：**
  - `url` (string, 必需): 禅道服务器地址（例如：https://your-zentao-url.com）
  - `zentaosid` (string, 必需): zentaosid（用于 Cookie 认证）

**如何获取 zentaosid：**
1. 登录禅道系统
2. 打开浏览器开发者工具（F12）
3. 在 Network 标签中查看任意请求的 Cookie
4. 复制 `zentaosid` 的值

### get_requirements
获取产品需求列表
- **参数：**
  - `productId` (number, 必需): 产品ID
  - `page` (number, 可选): 页码，默认1
  - `limit` (number, 可选): 每页数量，默认20

### get_requirement
获取单个需求详情
- **参数：**
  - `storyId` (number, 必需): 需求ID

### get_bugs
获取产品 bug 列表
- **参数：**
  - `productId` (number, 必需): 产品ID
  - `page` (number, 可选): 页码，默认1
  - `limit` (number, 可选): 每页数量，默认20

### get_tasks
获取项目任务列表
- **参数：**
  - `projectId` (number, 必需): 项目ID
  - `page` (number, 可选): 页码，默认1
  - `limit` (number, 可选): 每页数量，默认20

### get_product
获取产品详情
- **参数：**
  - `productId` (number, 必需): 产品ID

### get_project
获取项目详情
- **参数：**
  - `projectId` (number, 必需): 项目ID

## 常见问题

### Q: 如何找到 Cursor 的 MCP 配置文件？

A: Cursor 的 MCP 配置通常在以下位置：
- macOS: `~/Library/Application Support/Cursor/User/globalStorage/mcp.json`
- 或者通过 Cursor 设置界面配置

### Q: Zentaosid 过期了怎么办？

A: Zentaosid 会过期，如果遇到认证失败，需要重新从浏览器 Cookie 中获取最新的 zentaosid，然后使用 `configure` 工具重新配置。

### Q: 如何测试 MCP 服务器是否正常工作？

A: 可以在终端直接运行服务器测试：

```bash
node /Users/unie/Desktop/Project/zentao-mcp/src/index.js
```

如果看到 "禅道 MCP 服务器已启动" 的提示，说明服务器运行正常。

### Q: 权限不足怎么办？

A: 确保你的禅道账号有相应的权限：
- 查看需求的权限
- 查看 bug 的权限
- 查看任务的权限

可以在禅道后台的「人员管理-权限」中调整。

## 下一步

配置完成后，你就可以在 Cursor 中直接询问关于禅道的问题，AI 会自动调用相应的工具来获取数据。


