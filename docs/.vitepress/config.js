import { defineConfig } from "vitepress"

export default defineConfig({
  head: [
    ["meta", { name: "ChatGPT", content: "AI热门工具教程和分享，提示生产力" }]
  ],
  description: "AI热门工具教程和分享，提示生产力",
  themeConfig: {
    logo: "/logo.webp",
    siteTitle: "洛尔",
    nav: [
      {
        text: "ChatGPT",
        link: "/chatgpt/what-is-chatgpt"
      },
      {
        text: "Go编程",
        // link: "/go-debris/go"
        items: [
          { text: "高并发编程", link: "/go-debris/goroutine/g1" },
          { text: "GORM", link: "/go-debris/gorm/g1" },
          { text: "RPC调用", link: "/go-debris/rpc/r1" }
        ]
      },
      {
        text: "数据库",
        link: "/database/mysql/m1"
      }
    ],
    sidebar: {
      "/chatgpt/": [
        {
          text: "教程",
          items: [
            { text: "什么是 ChatGPT", link: "/chatgpt/what-is-chatgpt" },
            { text: "免费ChatGPT账号注册", link: "/chatgpt/register" },
            { text: "升级ChatGPT Plus", link: "/chatgpt/plus" },
            { text: "一键部署ChatGPT应用", link: "/chatgpt/deploy" },
            { text: "免费ChatGPT应用", link: "/chatgpt/free-use" }
          ]
        }
      ],
      // "/go-debris/go": [
      //   {
      //     text: "教程",
      //     items: [
      //       { text: "高并发编程", link: "/go-debris/goroutine/g1" },
      //       { text: "GORM", link: "/go-debris/gorm/g1" },
      //       { text: "RPC调用", link: "/go-debris/rpc/r1" }
      //     ]
      //   }
      // ],
      "/database/mysql": [
        {
          text: "指南",
          items: [
            { text: "介绍", link: "/database/mysql/m1" },
          ]
        }
      ],
      "/go-debris/goroutine": [
        {
          text: "指南",
          items: [
            { text: "认识协程", link: "/go-debris/goroutine/g1" },
            { text: "管理协程的并发操作", link: "/go-debris/goroutine/g2" },
            { text: "互斥锁", link: "/go-debris/goroutine/g3" },
            { text: "读写锁", link: "/go-debris/goroutine/g4" },
            { text: "协程之间的通信", link: "/go-debris/goroutine/g5" }
          ]
        }
      ],
      "/go-debris/rpc": [
        {
          text: "指南",
          items: [{ text: "快速开始", link: "/go-debris/rpc/r1" }]
        }
      ],
      "/go-debris/gorm": [
        {
          text: "指南",
          items: [
            { text: "介绍", link: "/go-debris/gorm/g1" },
            { text: "使用", link: "/go-debris/gorm/g2" }
          ]
        }
      ]
    }
  }
})
