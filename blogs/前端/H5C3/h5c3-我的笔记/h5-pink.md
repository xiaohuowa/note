## web标准



遵循 Web 标准除了可以让不同的开发人员写出的页面更标准、更统一外，还有以下优点：

1. 让 Web 的发展前景更广阔。 

2. 内容能被更广泛的设备访问。

3. 更容易被搜寻引擎搜索。

4. 降低网站流量费用。

5. 使网站更易于维护。

6. 提高页面浏览速度。
   ## web标准的构成：
   主要包括 《结构Structure》 、《表现（Presentation）》和《行为（Behavior）》三个方面。
   ![image-20220623185513719](https://note-img54.oss-cn-hongkong.aliyuncs.com/note/h5c3-%E6%88%91%E7%9A%84%E7%AC%94%E8%AE%B0/h5-pink.assets/image-20220623185513719.png)
   Web 标准提出的最佳体验方案：**结构、样式、行为相分离**。  
   简单理解：**结构写到 HTML 文件中， 表现写到 CSS 文件中， 行为写到 JavaScript 文件中**



# HTML

## 基本结构标签：
​    每个网页都会有一个基本的结构标签（也称为骨架标签），页面内容也是在这些基本标签上书写

![image-20220623190304654](https://note-img54.oss-cn-hongkong.aliyuncs.com/note/h5c3-%E6%88%91%E7%9A%84%E7%AC%94%E8%AE%B0/h5-pink.assets/image-20220623190304654.png)

---

**DOCTYPE**
    &lt; !DOCTYPE html &gt;   文档类型声明标签,告诉浏览器这个页面采取html5版本来显示页面.
**lang 语言种类**
    用来定义当前文档显示的语言。
    en定义语言为英语
    zh-CN定义语言为中文
    简单来说,定义为en 就是英文网页, 定义为 zh-CN 就是中文网页
    其实对于文档显示来说，定义成en的文档也可以显示中文，定义成zh-CN的文档也可以显示英文
    这个属性对浏览器和搜索引擎(百度.谷歌等)还是有作用的

**字符集**
    1.字符集 (Character set)是多个字符的集合。以便计算机能够识别和存储各种文字。
    2.在<head>标签内，可以通过<meta> 标签的 charset 属性来规定 HTML 文档应该使用哪种字符编码。
    3.<meta charset=" UTF-8" />
    4.charset 常用的值有：GB2312 、BIG5 、GBK 和 UTF-8，其中 UTF-8 也被称为万国码，基本包含了全世界所有国家需要用到的字符.
    5.注意：上面语法是必须要写的代码，否则可能引起乱码的情况。一般情况下，统一使用“UTF-8”编码，尽量统一写成标准的 "UTF-8"，不要写成  "utf8" 或 "UTF8"。



### 段落标签：
​    在网页中，要把文字有条理地显示出来，就需要将这些文字分段显示。在 HTML 标签中，<p>标签用于定义段落，它可以将整个网页分为若干个段落。
​    具体实现：
​         <p> 我是一个段落标签 </p>
​    特点：
​        1. 文本在一个段落中会根据浏览器窗口的大小自动换行。
​                2. 段落和段落之间保有空隙。



### 倾斜加粗下划线

![image-20220623194008348](https://note-img54.oss-cn-hongkong.aliyuncs.com/note/h5c3-%E6%88%91%E7%9A%84%E7%AC%94%E8%AE%B0/h5-pink.assets/image-20220623194008348.png)

### div和span标签

```
<div> 和 <span> 是没有语义的，它们就是一个盒子，用来装内容的。
    具体实现：
         <div> 这是头部 </div>    
         <span> 今日价格 </span>
    特点：
        1. <div> 标签用来布局，但是现在一行只能放一个<div>。 大盒子
        2. <span> 标签用来布局，一行上可以多个 <span>。小盒子
```



### 图片标签

![image-20220623195453921](https://note-img54.oss-cn-hongkong.aliyuncs.com/note/h5c3-%E6%88%91%E7%9A%84%E7%AC%94%E8%AE%B0/h5-pink.assets/image-20220623195453921.png)

### 链接标签：

**链接的语法格式**
        <a href="跳转目标" target="目标窗口的弹出方式"> 文本或图像 </a>
**属性：**
        1.href：用于指定链接目标的url地址：

​				**url要以 http://开头**（访问互联网url的时候）

​        2.target:用于指定链接页面的打开方式 ：

​				**_self 默认值，当前窗口打开 _blank 新窗口打开**
​        3.#：空链接
**链接分类：**
​    1.外部链接: 例如 < a href="http:// www.baidu.com "> 百度</a >。
​    2.内部链接:网站内部页面之间的相互链接. 直接链接内部页面名称即可，例如 < a href="index.html"> 首页 </a >。
​    3.空链接: 如果当时没有确定链接目标时，< a href="#"> 首页 </a > 。
​    4.下载链接: 如果 href 里面地址是一个文件或者压缩包，会下载这个文件。
​    5.网页元素链接: 在网页中的各种网页元素，如文本、图像、表格、音频、视频等都可以添加超链接.
​    6.锚点链接:  点我们点击链接,可以快速定位到页面中的某个位置. 

+        在链接文本的 href 属性中，设置属性值为 #名字 的形式，如<a href="#two"> 第2集 </a> 
+        找到目标位置标签，里面添加一个 id 属性 = 刚才的名字 ，如：<h3 id="two">第2集介绍</h3>



### 特殊字符

![image-20220623203238505](https://note-img54.oss-cn-hongkong.aliyuncs.com/note/h5c3-%E6%88%91%E7%9A%84%E7%AC%94%E8%AE%B0/h5-pink.assets/image-20220623203238505.png)



## 表格

**表格属性：**
    1. 表格标签这部分属性我们实际开发我们不常用，后面通过 CSS 来设置.

![image-20220623205102747](https://note-img54.oss-cn-hongkong.aliyuncs.com/note/h5c3-%E6%88%91%E7%9A%84%E7%AC%94%E8%AE%B0/h5-pink.assets/image-20220623205102747.png)



**表格结构标签：**
    使用场景:
        因为表格可能很长,为了更好的表示表格的语义，可以将表格分割成 表格头部和表格主体两大部分.
    在表格标签中，分别用：<thead>标签 表格的头部区域、<tbody>标签 表格的主体区域. 这样可以更好的分清表格结构。

![image-20220623205922922](https://note-img54.oss-cn-hongkong.aliyuncs.com/note/h5c3-%E6%88%91%E7%9A%84%E7%AC%94%E8%AE%B0/h5-pink.assets/image-20220623205922922.png)

**总结:**
    1. <thead></thead>：用于定义表格的头部。<thead> 内部必须拥有 <tr> 标签。 一般是位于第一行。
    2. <tbody></tbody>：用于定义表格的主体，主要用于放数据本体 。
    3. 以上标签都是放在 <table></table> 标签中。



### 🎈无序列表

```
1. 无序列表的各个列表项之间没有顺序级别之分，是并列的。

2. <ul></ul> 中只能嵌套 <li></li>，直接在 <ul></ul> 标签中输入其他标签或者文字的做法是不被允许的。

3. <li> 与 </li> 之间相当于一个容器，可以容纳所有元素。

4. 无序列表会带有自己的样式属性，但在实际使用时，我们会使用 CSS 来设置。
```



### 🎈自定义列表

![image-20220623211809729](https://note-img54.oss-cn-hongkong.aliyuncs.com/note/h5c3-%E6%88%91%E7%9A%84%E7%AC%94%E8%AE%B0/h5-pink.assets/image-20220623211809729.png)



### **列表总结**

![image-20220623212024133](https://note-img54.oss-cn-hongkong.aliyuncs.com/note/h5c3-%E6%88%91%E7%9A%84%E7%AC%94%E8%AE%B0/h5-pink.assets/image-20220623212024133.png)



## 表单

### input

![image-20220623212806203](https://note-img54.oss-cn-hongkong.aliyuncs.com/note/h5c3-%E6%88%91%E7%9A%84%E7%AC%94%E8%AE%B0/h5-pink.assets/image-20220623212806203.png)

![image-20220623213452248](https://note-img54.oss-cn-hongkong.aliyuncs.com/note/h5c3-%E6%88%91%E7%9A%84%E7%AC%94%E8%AE%B0/h5-pink.assets/image-20220623213452248.png)

### 🎈label

> 主要为了点击文字的时候也能选中对应的输入框

![image-20220623214710369](https://note-img54.oss-cn-hongkong.aliyuncs.com/note/h5c3-%E6%88%91%E7%9A%84%E7%AC%94%E8%AE%B0/h5-pink.assets/image-20220623214710369.png)



### select

![image-20220623214918168](https://note-img54.oss-cn-hongkong.aliyuncs.com/note/h5c3-%E6%88%91%E7%9A%84%E7%AC%94%E8%AE%B0/h5-pink.assets/image-20220623214918168.png)











