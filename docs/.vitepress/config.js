import { defineConfig } from 'vitepress';

export default defineConfig({
  base: "/vite-docs/",
  themeConfig: {
    logo: "/logo.svg",
    siteTitle: "沧浪之巅",
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
            { text: '免费ChatGPT账号注册', link: '/chatgpt/register' },
            { text: '升级ChatGPT Plus', link: '/chatgpt/plus' },
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

