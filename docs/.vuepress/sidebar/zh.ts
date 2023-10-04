import { sidebar } from "vuepress-theme-hope";

export const zhSidebar = sidebar({
  "/airisp/": [
    "",
    {
      text: "使用介绍",
      collapsible: false,
      prefix: "docs/",
      children: "structure",
    },
  ],
  "/": [
    "",
    {
      text: "快速开始",
      collapsible: true,
      prefix: "getting_started/",
      children: "structure",
      icon: "lightbulb",
    },
    {
      text: "开发上手",
      collapsible: true,
      prefix: "tutorial-advanced/",
      children: "structure",
      icon: "magic",
    },
    {
      text: "API 参考",
      collapsible: true,
      prefix: "library/",
      children: "structure",
      icon: "book",
    },
    {
      text: "应用示例",
      collapsible: true,
      prefix: "tutorial-extras/",
      children: "structure",
      link: "/tutorial-extras/",
      icon: "scissors",
    },
    {
      text: "高级用法",
      collapsible: true,
      prefix: "Advanced/",
      children: "structure",
      icon: "cogs",
    },
    {
      text: "贡献指南",
      collapsible: true,
      prefix: "ContributionsGuide/",
      children: "structure",
      icon: "users",
    },
    {
      text: "常见问题",
      collapsible: true,
      prefix: "FAQ/",
      children: "structure",
      icon: "question-circle",
    },
  ],
});
