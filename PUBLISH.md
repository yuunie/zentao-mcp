# 发布指南

本指南说明如何将这个禅道 MCP 服务器发布给其他人使用。

## 发布方式

### 方式一：发布到 npm（推荐）

这是最简单和标准的发布方式，用户可以通过 `npm install` 直接安装。

#### 1. 准备工作

确保 `package.json` 中包含了正确的信息：

```json
{
  "name": "zentao-mcp",
  "version": "1.0.0",
  "description": "禅道 MCP 服务器 - 通过cookie认证并查询需求、bug、任务等内容",
  "main": "src/index.js",
  "bin": {
    "zentao-mcp": "./src/index.js"
  },
  "keywords": ["mcp", "zentao", "api", "project-management"],
  "author": "你的名字",
  "license": "MIT"
}
```

#### 2. 创建 npm 账号

如果还没有 npm 账号，访问 https://www.npmjs.com/signup 注册。

#### 3. 登录 npm

```bash
npm login
```

#### 4. 发布到 npm

```bash
npm publish
```

**注意：** 如果包名已存在，需要修改 `package.json` 中的 `name` 字段为唯一名称，例如 `@your-username/zentao-mcp`。

#### 5. 用户安装方式

发布后，用户可以通过以下方式安装：

```bash
npm install -g zentao-mcp
```

或者安装到本地项目：

```bash
npm install zentao-mcp
```

然后在 MCP 客户端配置中使用：

```json
{
  "mcpServers": {
    "zentao": {
      "command": "node",
      "args": ["/path/to/node_modules/zentao-mcp/src/index.js"]
    }
  }
}
```

如果全局安装，可以使用：

```json
{
  "mcpServers": {
    "zentao": {
      "command": "zentao-mcp"
    }
  }
}
```

### 方式二：发布到 GitHub

#### 1. 创建 GitHub 仓库

1. 访问 https://github.com/new 创建新仓库
2. 仓库名建议：`zentao-mcp`
3. 选择 Public（公开）或 Private（私有）

#### 2. 初始化 Git（如果还没有）

```bash
git init
git add .
git commit -m "Initial commit"
```

#### 3. 推送到 GitHub

```bash
git remote add origin https://github.com/your-username/zentao-mcp.git
git branch -M main
git push -u origin main
```

#### 4. 创建 Release

1. 在 GitHub 仓库页面，点击 "Releases"
2. 点击 "Create a new release"
3. 填写版本号（例如：v1.0.0）
4. 添加发布说明
5. 点击 "Publish release"

#### 5. 用户安装方式

用户可以通过以下方式安装：

**方式 A：使用 npm 从 GitHub 安装**

```bash
npm install -g github:your-username/zentao-mcp
```

**方式 B：克隆仓库**

```bash
git clone https://github.com/your-username/zentao-mcp.git
cd zentao-mcp
npm install
```

然后在 MCP 客户端配置中使用：

```json
{
  "mcpServers": {
    "zentao": {
      "command": "node",
      "args": ["/absolute/path/to/zentao-mcp/src/index.js"]
    }
  }
}
```

### 方式三：打包分发

#### 1. 创建发布包

```bash
# 创建压缩包（排除 node_modules）
tar -czf zentao-mcp-v1.0.0.tar.gz --exclude='node_modules' --exclude='.git' .
```

或者使用 zip：

```bash
zip -r zentao-mcp-v1.0.0.zip . -x "node_modules/*" ".git/*"
```

#### 2. 分发方式

- 上传到文件分享服务（如 Google Drive、Dropbox）
- 通过邮件发送
- 放在公司内部服务器

#### 3. 用户安装方式

用户下载后：

```bash
# 解压
tar -xzf zentao-mcp-v1.0.0.tar.gz
cd zentao-mcp

# 安装依赖
npm install
```

然后在 MCP 客户端配置中使用。

## 发布前检查清单

- [ ] 更新 `package.json` 中的版本号
- [ ] 确保 `README.md` 包含完整的安装和使用说明
- [ ] 检查 `.gitignore` 是否正确（排除 `node_modules`、`.env` 等）
- [ ] 测试安装和运行是否正常
- [ ] 确保代码中没有硬编码的敏感信息
- [ ] 添加适当的许可证文件（如 `LICENSE`）

## 版本管理

建议使用语义化版本（Semantic Versioning）：

- **主版本号（MAJOR）**：不兼容的 API 修改
- **次版本号（MINOR）**：向下兼容的功能性新增
- **修订号（PATCH）**：向下兼容的问题修正

更新版本号：

```bash
npm version patch  # 1.0.0 -> 1.0.1
npm version minor  # 1.0.0 -> 1.1.0
npm version major  # 1.0.0 -> 2.0.0
```

## 更新已发布的包

### npm

1. 更新版本号：`npm version patch/minor/major`
2. 重新发布：`npm publish`

### GitHub

1. 提交更改并推送到 GitHub
2. 创建新的 Release 标签

## 用户支持

建议在 README.md 中包含：
- 详细的安装说明
- 配置示例
- 常见问题解答
- 问题反馈渠道（GitHub Issues 等）

