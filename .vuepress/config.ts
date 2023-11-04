import bulletinConf from "./config/bulletinConf";
import navConf from "./config/navConf";
import seriesConf from "./config/seriesConf";

import { defineUserConfig } from "vuepress";
import type { DefaultThemeOptions } from "vuepress";
import recoTheme from "vuepress-theme-reco";

export default defineUserConfig({
  base: "/note/",
  title: "小火娃的笔记中心",
  description: "个人笔记收纳",
  theme: recoTheme({
    style: "@vuepress-reco/style-default",
    logo: "/logo.png",
    author: "xiaohuowa",
    authorAvatar: "/head.png",
    docsRepo: "https://github.com/vuepress-reco/vuepress-theme-reco-next",
    docsBranch: "main",
    docsDir: "example",
    lastUpdatedText: "最近更新时间",

    navbar: navConf,
    // 自动设置系列（文章在docs下才支持）
    // autoSetSeries: true,
    series: seriesConf,

    // 自动设置分类
    autoSetBlogCategories: true,
    // 自动将分类和标签添加至头部导航条
    // 当 autoAddCategoryToNavbar 为 true 时，则全部取默认值
    // autoAddCategoryToNavbar: true,
    autoAddCategoryToNavbar: {
      location: 1, // 默认 0
      categoryText: '分类', // 默认 categories
      tagText: '标签' // 默认 tags
    },

    // 公告栏
    bulletin: bulletinConf,

    // commentConfig: {
    //   type: 'valie',
    //   // options 与 1.x 的 valineConfig 配置一致
    //   options: {
    //     // appId: 'xxx',
    //     // appKey: 'xxx',
    //     // placeholder: '填写邮箱可以收到回复提醒哦！',
    //     // verify: true, // 验证码服务
    //     // notify: true,
    //     // recordIP: true,
    //     // hideComments: true // 隐藏评论
    //   },
    // },
  }),
  // debug: true,
});
