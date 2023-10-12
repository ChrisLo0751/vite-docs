import { defineConfig } from 'vitepress';

export default defineConfig({
  head: [['meta', { name: 'ChatGPT', content: 'AI热门工具教程和分享，提示生产力' }]],
  description: "AI热门工具教程和分享，提示生产力",
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
        { text: '一键部署ChatGPT应用', link: '/chatgpt/deploy' },
		{ text: '免费ChatGPT应用', link: '/chatgpt/free-use' },
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
            { text: '一键部署ChatGPT应用', link: '/chatgpt/deploy' },
			{ text: '免费ChatGPT应用', link: '/chatgpt/free-use' },
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

