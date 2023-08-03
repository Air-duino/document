import { defineUserConfig } from "vuepress";
import theme from "./theme.js";
import { commentPlugin } from "vuepress-plugin-comment2";

export default defineUserConfig({
  base: "/",

  locales: {
    // "/en/": {
    //   lang: "en-US",
    //   title: "Docs Demo",
    //   description: "A docs demo for vuepress-theme-hope",
    // },
    "/": {
      lang: "zh-CN",
      title: "AirMCU",
      description: "AirMCU 文档",
    },
  },

  theme,

  // Enable it with pwa
  // shouldPrefetch: false,

  plugins: [
    commentPlugin({
      provider: "Giscus",
      repo: "Air-duino/document",
      repoId: "R_kgDOJ8zwvQ",
      category: "comment",
      categoryId: "DIC_kwDOJ8zwvc4CYT9x",
      mapping: "pathname",
      lazyLoading: false,
    }),
  ],
});
