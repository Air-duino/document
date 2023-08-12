import { defineUserConfig } from "vuepress";
import theme from "./theme.js";
import { hopeTheme } from "vuepress-theme-hope";
import { searchConsolePlugin } from 'vuepress-plugin-china-search-console';
import { searchProPlugin } from "vuepress-plugin-search-pro";

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
    searchConsolePlugin({
      baiduId: "13aae466d578c10f526a87cba8e7db3e",
    }),
    searchProPlugin({
      indexContent: true,
      autoSuggestions: false,
    }),
  ],
});
