import { defineConfig } from 'vitepress';

export default defineConfig({
  themeConfig: {
    logo: "/logo.webp",
    siteTitle: "AIHUB",
    nav: [{
      text: 'AI导航', 
      link: 'https://aigchub100.com/'
    },{
      text: 'ChatGPT', 
      items: [
        { text: '什么是 ChatGpt', link: '/chatgpt/what-is-chatgpt' },
        { text: '免费ChatGPT账号注册', link: '/chatgpt/register' },
        { text: '升级ChatGPT Plus', link: '/chatgpt/plus' },
      ],
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

