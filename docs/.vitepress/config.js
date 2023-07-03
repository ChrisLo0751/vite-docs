import { defineConfig } from 'vitepress';

export default defineConfig({
  themeConfig: {
    siteTitle: "锦衣",
    nav: [{ 
      text: 'ChatGPT', 
      items: [
        { 
          text: 'ChatGpt账号注册', 
          link: '/chatgpt/what-is-chatgpt' 
        },
        { 
          text: 'ChatGpt私有化部署', 
          link: '...' 
        }
      ]
    }],
    sidebar: {
      '/guide/': [
        {
          text: '介绍',
          items: [
            { text: '什么是 VitePress', link: '/guide/what-is-vitepress' },
            { text: '快速开始', link: '/guide/getting-started' },
            { text: '配置', link: '/guide/configuration' },
            { text: '发布', link: '/guide/deploying' }
          ],
          collapsible: true
        }
      ],
      "/chatgpt/": [
        {
          text: '教程',
          items: [
            { text: '什么是 ChatGpt', link: '/guide/what-is-vitepress' },
            { text: '账号注册', link: '/guide/getting-started' },
            { text: '配置', link: '/guide/configuration' },
            { text: '发布', link: '/guide/deploying' }
          ],
          collapsible: true
        }
      ],
    }
  },
  sidebar: {
    '/guide/': [
      {
        text: 'Guide',
        items: [
          { text: 'Index', link: '/guide/' }, 
          { text: 'One', link: '/guide/one' }, 
          { text: 'Two', link: '/guide/two' } 
        ]
      }
    ]
  }
});

