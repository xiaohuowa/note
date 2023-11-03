export default [
    {text: '首页', link: '/'},
    {text: '先看', link: '/pre-reading.html'},
    {text: '计算机', link: '/computer/'},
    {
        text: '基石', children: [
            {text: '数学', link: '/cornerstone/math/'},
        ]
    },
    {
        text: '系统', children: [
            {text: 'Linux', link: '/os/linux/'},
            {text: 'Arch', link: '/os/arch/'},
            {text: 'Manjaro', link: '/os/manjaro/'},
            {text: 'Ubuntu', link: '/os/ubuntu/'},
            {text: 'CentOS', link: '/os/centos/'},
            {text: 'Kubernetes', link: '/os/kubernetes/'},
        ]
    },
    {
        text: '前端', children: [
            {text: 'Ajax', link: '/blogs/前端/Ajax/MyNote_Ajax.md'},
            {text: 'CSS', link: '/blogs/前端/H5C3/h5c3-我的笔记/css-pink.md'},
            // {text: 'CSS', link: '/blogs/前端/H5C3/h5c3-我的笔记/css03-其他样式.md'},
            {text: 'Vue', link: '/blogs/前端/Vue/MyNote_Vue.md'},
        ]
    },
    {
        text: '后端', children: [
            {text: 'Javaweb', link: '/blogs/Javaweb/Javaweb.md'},
        ]
    },
    {text: '算法', link: '/algorithms/'},
    {
        text: '设计', children: [
            {text: '像素风', link: '/design/pixel/'},
        ]
    },
    {
        text: '开发工具', children: [
            {text: 'Git', link: '/tools/git/'},
            {text: 'Github', link: '/tools/github/'},
            {text: 'VSCode', link: '/tools/vscode/'},
            {text: 'Chrome', link: '/tools/chrome/'},
            {text: 'Google', link: '/tools/google/'},
            {text: 'Bookmark scripts', link: '/tools/bookmark-scripts/'},
        ]
    },
    {
        text: '更多', children: [
            {text: '导航 🎉', link: '/more/navigation.html'},
            {text: 'VuePress 侧边栏插件', link: 'https://shanyuhai123.github.io/vuepress-plugin-auto-sidebar/zh/'},
            {text: 'VuePress 官网', link: 'https://vuepress.vuejs.org/zh/'},
        ]
    },
    {text: '🚇 开往', link: 'https://www.travellings.cn/go.html'},
];