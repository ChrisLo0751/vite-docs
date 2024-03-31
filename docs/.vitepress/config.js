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
        // link: "/go-debris/goroutine/test",
        items: [{ text: "高并发编程", link: "/go-debris/goroutine/g1" }]
      },
      {
        text: "前端开发",
        link: "/frontend"
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
      "/go-debris/goroutine/": [
        {
          text: "教程",
          items: [
            { text: "认识协程", link: "/go-debris/goroutine/g1" },
            { text: "管理协程的并发操作", link: "/go-debris/goroutine/g2" },
            { text: "互斥锁", link: "/go-debris/goroutine/g3" },
            { text: "读写锁", link: "/go-debris/goroutine/g4" },
            { text: "协程之间的通信", link: "/go-debris/goroutine/g5" }
          ]
        }
      ]
    }
  }
})
