// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion
const path = require('path')

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'AirMCU',
  tagline: 'AirMCU 是一个基于 AirM2M 公司 ARM-Cortex 架构微处理器兼容 Arduino 开发平台',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://arduino.luatos.com',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'Air-duino', // Usually your GitHub org/user name.
  projectName: 'AirMCU', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'zh',
    locales: ['zh'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/Air-duino/document/blob/main/',
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/Air-duino/document/blob/main/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
        sitemap: {
          changefreq: 'daily',
          priority: 0.5,
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: 'img/docusaurus-social-card.jpg',
      navbar: {
        title: 'AirMCU',
        logo: {
          alt: 'AirMCU Logo',
          src: 'img/logo.svg',
        },
        items: [
          {to: '/docs/getting_started', label: '文档', position: 'left'},
          {to: '/blog', label: '文章', position: 'left'},
          {
            href: 'https://github.com/Air-duino',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      docs: {
        sidebar: {
          hideable: true,
          autoCollapseCategories: true,
        },
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: '入门',
            items: [
              {
                label: '文档',
                to: '/docs/getting_started',
              },
            ],
          },
          {
            title: '社区',
            items: [
              {
                label: '论坛',
                href: 'https://github.com/orgs/Air-duino/discussions',
              },
              {
                label: 'QQ 交流群',
                href: 'https://jq.qq.com/',
              },
              // {
              //   label: 'Twitter',
              //   href: 'https://twitter.com/docusaurus',
              // },
            ],
          },
          {
            title: '更多',
            items: [
              {
                label: '博客',
                to: '/blog',
              },
              {
                label: 'GitHub',
                href: 'https://github.com/orgs/Air-duino',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Air-duino. Built with Docusaurus.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),

    plugins: [
      path.resolve(__dirname, './src/plugin/plugin-baidu-tongji'),
      path.resolve(__dirname, './src/plugin/plugin-baidu-push'),
    ],
};

module.exports = config;
