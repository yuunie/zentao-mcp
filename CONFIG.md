# 禅道 MCP 服务器配置示例

## 环境变量配置

在 `.env` 文件中设置以下环境变量（可选，也可以通过 configure 工具动态配置）：

```bash
ZENTAO_URL=https://your-zentao-url.com
ZENTAO_ACCOUNT=your-username
ZENTAO_PASSWORD=your-password
```

## MCP 客户端配置

在 MCP 客户端（如 Cursor）的配置文件中添加：

```json
{
  "mcpServers": {
    "zentao": {
      "command": "node",
      "args": ["/path/to/zentao-mcp/src/index.js"],
      "env": {
        "ZENTAO_URL": "https://your-zentao-url.com",
        "ZENTAO_ACCOUNT": "your-username",
        "ZENTAO_PASSWORD": "your-password"
      }
    }
  }
}
```

## 使用示例

### 1. 配置连接信息
使用 `configure` 工具设置禅道连接信息：
- url: 禅道服务器地址
- account: 账号
- password: 密码

### 2. 获取 Token
使用 `get_token` 工具获取认证 token。

### 3. 查询数据
- `get_requirements` - 获取产品需求（需要 productId）
- `get_bugs` - 获取产品 bug（需要 productId）
- `get_tasks` - 获取项目任务（需要 projectId）
- `get_product` - 获取产品详情（需要 productId）
- `get_project` - 获取项目详情（需要 projectId）

## API 端点说明

根据禅道 RESTful API v1 文档：
- Token 获取: `POST /api.php/v1/tokens`
- 产品需求: `GET /api.php/v1/products/{productId}/stories`
- 产品 Bug: `GET /api.php/v1/products/{productId}/bugs`
- 项目任务: `GET /api.php/v1/projects/{projectId}/tasks`
- 产品详情: `GET /api.php/v1/products/{productId}`
- 项目详情: `GET /api.php/v1/projects/{projectId}`

