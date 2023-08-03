import { defineUserConfig } from "vuepress";
import theme from "./theme.js";
import { commentPlugin } from "vuepress-plugin-comment2";
import { hopeTheme } from "vuepress-theme-hope";
import { docsearchPlugin } from "@vuepress/plugin-docsearch";
import { searchConsolePlugin } from 'vuepress-plugin-china-search-console'

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


  theme: hopeTheme({
    plugins: {
      copyCode: {},
      comment: {},
    },
  }),

  // Enable it with pwa
  // shouldPrefetch: false,
  plugins: [
    searchConsolePlugin({
      baiduId: "13aae466d578c10f526a87cba8e7db3e",
    }),
    docsearchPlugin({
      appId: "5QQU7F897X",
      apiKey: "8f8b4494d7a414b4eea44bdc3bd383b4",
      indexName: "arduino-luatos",
      locales: {
        "/": {
          placeholder: "搜索文档",
          translations: {
            button: {
              buttonText: "搜索文档",
            },
          },
        },
        // "/en/": {
        //   placeholder: "Search Documentation",
        //   translations: {
        //     button: {
        //       buttonText: "Search Documentation",
        //     },
        //   },
        // },
      },
    }),
  ],
});
