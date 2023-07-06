import { defineConfig } from 'vitepress';

export default defineConfig({
  themeConfig: {
    siteTitle: "锦衣",
    nav: [{ 
      text: 'ChatGPT', 
      link: "/chatgpt/what-is-chatgpt"
    }],
    sidebar: {
      "/chatgpt/": [
        {
          text: '教程',
          items: [
            { text: '什么是 ChatGpt', link: '/chatgpt/what-is-chatgpt' },
            { text: '账号注册', link: '/chatgpt/register' },
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

