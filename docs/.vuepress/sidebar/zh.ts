import { sidebar } from "vuepress-theme-hope";

export const zhSidebar = sidebar({
  "/": [
    "",
    {
      text: "快速开始",
      collapsible: true,
      prefix: "getting_started/",
      children: "structure",
    },
    {
      text: "API 参考",
      collapsible: true,
      prefix: "library/",
      children: "structure",
    },
    {
      text: "进阶教程",
      collapsible: true,
      prefix: "tutorial-advanced/",
      children: "structure",
    },
    {
      text: "应用示例",
      collapsible: true,
      prefix: "tutorial-extras/",
      children: "structure",
    },
    {
      text: "贡献指南",
      collapsible: true,
      prefix: "ContributionsGuide/",
      children: "structure",
    },
    {
      text: "常见问题",
      collapsible: true,
      // prefix: "FAQ/",
      // children: "structure",
      link: "/FAQ/",
    },
  ],
});
