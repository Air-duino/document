---
title: 文档贡献指南
---

我们欢迎任何关于文档的新贡献！

## 关于

AirMCU 有一个专用于文档的仓库，位于[GitHub](https://github.com/Air-duino/document)中。该文档使用了[VuePress](https://v2.vuepress.vuejs.org/)进行配置，并使用了[VuePress Theme Hope](https://theme-hope.vuejs.press/)作为主题。

## 文档结构

```text
.
├── .github  → GitHub 配置文件存放路径
│    └── workflow → GitHub 工作流配置
│         └── docs-deploy.yml → 自动部署文档的工作流
│
├── docs → 文档文件夹
│    │
│    ├── .vuepress → VuePress 配置文件夹
│    │    │
│    │    ├── dist → 构建输出目录
│    │    │
│    │    ├── public → 静态资源目录
│    │    │
│    │    ├── styles → 用于存放样式相关的文件
│    │    │
│    │    ├── config.{js,ts} → 配置文件的入口文件
│    │    │
│    │    └── client.{js,ts} → 客户端文件
│    │
│    ├── ContributionsGuide → 贡献指南
│    │
│    ├── FAQ → 常见问题
│    │
│    ├── getting_started → 快速开始
│    │
│    ├── library → API参考
│    │
│    ├── tutorial-advanced → 进阶教程
│    │
│    ├── tutorial-extras → 应用示例
│    │
│    └── README.md → 项目主页
│
└── package.json → Nodejs 配置文件

```

其中，每个文件夹下的`README.md`和`index.md`将被作为主页，而其余的`.md`文档将被添加二级目录。

## 格式要求

1. 每篇文档的头部应当加上一个 emoji 提高美观度，可以直接使用，或者参考<https://theme-hope.vuejs.press/zh/cookbook/markdown/demo.html#emoji>。
2. 文档排版需要合理，参考<https://theme-hope.vuejs.press/zh/guide/markdown/>的附加组件和语法，其余参考 Markdown 标准语法。
3. 所有图片添加前都要经过[此网站](https://tinify.cn/)的压缩，减小文件体积。
4. 为了观察方便，英文与汉字之间需要添加空格，例如`例子 example 例子`。
5. 句末需要加上中文句号`。`。
6. 一般习惯上来说，我们应当把图片或者静态资源放在`.vuepress/public`下，但是为了方便编写，我们也可以把图片放在相应文档目录下的`img`文件夹下，例如`docs/getting_started/img`。
