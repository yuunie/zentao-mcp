#!/usr/bin/env node

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";

// 配置存储
let config = {
  url: process.env.ZENTAO_URL || "",
  zentaosid: process.env.ZENTAO_SID || "", // zentaosid
};

/**
 * 发送 API 请求（使用 Cookie）
 */
async function apiRequest(endpoint, method = "GET", body = null) {
  if (!config.zentaosid) {
    throw new Error("请先配置 zentaosid");
  }
  
  // 确保 URL 末尾没有斜杠，然后拼接路径
  const baseUrl = config.url.replace(/\/$/, "");
  const url = `${baseUrl}/api.php/v1${endpoint}`;

  const options = {
    method,
    headers: {
      "Content-Type": "application/json",
      Cookie: `zentaosid=${config.zentaosid}`, // Cookie 中使用 zentaosid
    },
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(url, options);
    
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`API 请求失败: ${response.status} ${errorText}`);
    }

    return await response.json();
  } catch (error) {
    throw new Error(`API 请求出错: ${error.message}`);
  }
}

// 创建 MCP 服务器
const server = new Server(
  {
    name: "zentao-mcp",
    version: "1.0.0",
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// 列出所有可用工具
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: "configure",
        description: "配置禅道连接信息（URL、zentaosid）",
        inputSchema: {
          type: "object",
          properties: {
            url: {
              type: "string",
              description: "禅道服务器地址（例如：https://your-zentao-url.com）",
            },
            zentaosid: {
              type: "string",
              description: "zentaosid（用于 Cookie 认证）",
            },
          },
          required: ["url", "zentaosid"],
        },
      },
      {
        name: "get_requirements",
        description: "获取产品的需求列表",
        inputSchema: {
          type: "object",
          properties: {
            productId: {
              type: "number",
              description: "产品ID",
            },
            page: {
              type: "number",
              description: "页码（默认：1）",
            },
            limit: {
              type: "number",
              description: "每页数量（默认：20）",
            },
          },
          required: ["productId"],
        },
      },
      {
        name: "get_bugs",
        description: "获取产品的 bug 列表",
        inputSchema: {
          type: "object",
          properties: {
            productId: {
              type: "number",
              description: "产品ID",
            },
            page: {
              type: "number",
              description: "页码（默认：1）",
            },
            limit: {
              type: "number",
              description: "每页数量（默认：20）",
            },
          },
          required: ["productId"],
        },
      },
      {
        name: "get_tasks",
        description: "获取项目的任务列表",
        inputSchema: {
          type: "object",
          properties: {
            projectId: {
              type: "number",
              description: "项目ID",
            },
            page: {
              type: "number",
              description: "页码（默认：1）",
            },
            limit: {
              type: "number",
              description: "每页数量（默认：20）",
            },
          },
          required: ["projectId"],
        },
      },
      {
        name: "get_product",
        description: "获取产品详情",
        inputSchema: {
          type: "object",
          properties: {
            productId: {
              type: "number",
              description: "产品ID",
            },
          },
          required: ["productId"],
        },
      },
      {
        name: "get_project",
        description: "获取项目详情",
        inputSchema: {
          type: "object",
          properties: {
            projectId: {
              type: "number",
              description: "项目ID",
            },
          },
          required: ["projectId"],
        },
      },
      {
        name: "get_requirement",
        description: "获取单个需求详情",
        inputSchema: {
          type: "object",
          properties: {
            storyId: {
              type: "number",
              description: "需求ID",
            },
          },
          required: ["storyId"],
        },
      },
      {
        name: "get_bug",
        description: "获取单个 bug 详情",
        inputSchema: {
          type: "object",
          properties: {
            bugId: {
              type: "number",
              description: "Bug ID",
            },
          },
          required: ["bugId"],
        },
      },
    ],
  };
});

// 处理工具调用
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  try {
    switch (name) {
      case "configure": {
        config = {
          url: args.url,
          zentaosid: args.zentaosid,
        };
        return {
          content: [
            {
              type: "text",
              text: `禅道配置已更新：
- URL: ${config.url}
- Zentaosid: ${config.zentaosid ? "已配置" : "未配置"}`,
            },
          ],
        };
      }

      case "get_requirements": {
        const { productId, page = 1, limit = 20 } = args;
        const result = await apiRequest(
          `/products/${productId}/stories?page=${page}&limit=${limit}`
        );
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(result, null, 2),
            },
          ],
        };
      }

      case "get_bugs": {
        const { productId, page = 1, limit = 20 } = args;
        const result = await apiRequest(
          `/products/${productId}/bugs?page=${page}&limit=${limit}`
        );
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(result, null, 2),
            },
          ],
        };
      }

      case "get_tasks": {
        const { projectId, page = 1, limit = 20 } = args;
        const result = await apiRequest(
          `/projects/${projectId}/tasks?page=${page}&limit=${limit}`
        );
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(result, null, 2),
            },
          ],
        };
      }

      case "get_product": {
        const { productId } = args;
        const result = await apiRequest(`/products/${productId}`);
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(result, null, 2),
            },
          ],
        };
      }

      case "get_project": {
        const { projectId } = args;
        const result = await apiRequest(`/projects/${projectId}`);
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(result, null, 2),
            },
          ],
        };
      }

      case "get_requirement": {
        const { storyId } = args;
        const result = await apiRequest(`/stories/${storyId}`);
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(result, null, 2),
            },
          ],
        };
      }

      case "get_bug": {
        const { bugId } = args;
        const result = await apiRequest(`/bugs/${bugId}`);
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(result, null, 2),
            },
          ],
        };
      }

      default:
        throw new Error(`未知的工具: ${name}`);
    }
  } catch (error) {
    return {
      content: [
        {
          type: "text",
          text: `错误: ${error.message}`,
        },
      ],
      isError: true,
    };
  }
});

// 启动服务器
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("禅道 MCP 服务器已启动");
}

main().catch((error) => {
  console.error("服务器启动失败:", error);
  process.exit(1);
});

