import { navbar } from "vuepress-theme-hope";

export const zhNavbar = navbar([
  //"/", // 主页
  {
    text: "AirMCU 文档",
    link: "/getting_started/",
    icon: "microchip",
  },
  {
    text: "AirISP 烧录工具",
    link: "/airisp/",
    icon: "rocket",
  }
]);
