import { sidebar } from "vuepress-theme-hope";

export const zhSidebar = sidebar({
  "/": [
    "",
    {
      text: "快速开始",
      icon: "book",
      prefix: "getting_started/",
      children: "structure",
    },
    {
      text: "API 参考",
      icon: "book",
      prefix: "library/",
      children: "structure",
    },
    {
      text: "进阶教程",
      icon: "book",
      prefix: "tutorial-advanced/",
      children: "structure",
    },
    {
      text: "应用示例",
      icon: "book",
      prefix: "tutorial-extras/",
      children: "structure",
    },
    {
      text: "贡献指南",
      prefix: "ContributionsGuide/",
      children: "structure",
    },
    {
      text: "常见问题",
      icon: "book",
      // prefix: "FAQ/",
      // children: "structure",
      link: "/FAQ/",
    },
  ],
});
