import{_ as a,o as n,c as s,e}from"./app-55752f72.js";const t={},i=e(`<p>[toc]</p><h2 id="一、视口" tabindex="-1"><a class="header-anchor" href="#一、视口" aria-hidden="true">#</a> 一、视口</h2><h3 id="_1-1-视口布局" tabindex="-1"><a class="header-anchor" href="#_1-1-视口布局" aria-hidden="true">#</a> 1.1 视口布局</h3><p><img src="https://s2.loli.net/2023/10/18/dC6PsISx9LYyKze.png" alt="image-20220714145359999"></p><p><img src="https://s2.loli.net/2023/10/18/ofCzNHVJuRkMwFY.png" alt="image-20220714150050208"></p><p><img src="https://s2.loli.net/2023/10/18/HjviBXf9dlCw6Qy.png" alt="image-20220714150056034"></p><h3 id="_1-2-视口总结" tabindex="-1"><a class="header-anchor" href="#_1-2-视口总结" aria-hidden="true">#</a> 1.2 视口总结</h3><p><img src="https://s2.loli.net/2023/10/18/b7uXAPx51dn9vSr.png" alt="image-20220714150117994"></p><h3 id="_1-3-视口标签" tabindex="-1"><a class="header-anchor" href="#_1-3-视口标签" aria-hidden="true">#</a> 1.3 视口标签</h3><div class="language-css line-numbers-mode" data-ext="css"><pre class="language-css"><code>&lt;meta name=<span class="token string">&quot;viewport&quot;</span> content=<span class="token string">&quot;width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0&quot;</span>&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><img src="https://s2.loli.net/2023/10/18/NmT8Z7CojdyWXUQ.png" alt="image-20220714151159803"></p><h4 id="标准的viewport设置" tabindex="-1"><a class="header-anchor" href="#标准的viewport设置" aria-hidden="true">#</a> 标准的viewport设置</h4><p><img src="https://s2.loli.net/2023/10/18/MvjlSBXuPgGqOac.png" alt="image-20220714152018948"></p><h2 id="二、二倍图" tabindex="-1"><a class="header-anchor" href="#二、二倍图" aria-hidden="true">#</a> 二、二倍图</h2><h3 id="_2-1-物理像素和物理像素比" tabindex="-1"><a class="header-anchor" href="#_2-1-物理像素和物理像素比" aria-hidden="true">#</a> 2.1 物理像素和物理像素比</h3><p><img src="https://s2.loli.net/2023/10/18/IBtoUbEm6Y8wKzW.png" alt="image-20220714152051613"></p><h3 id="_2-2-由于视网膜屏的出现导致的开发像素和物理像素的不对应" tabindex="-1"><a class="header-anchor" href="#_2-2-由于视网膜屏的出现导致的开发像素和物理像素的不对应" aria-hidden="true">#</a> 2.2 由于视网膜屏的出现导致的开发像素和物理像素的不对应</h3><p><img src="https://s2.loli.net/2023/10/18/z8ribF3GCj1h7wJ.png" alt="image-20220714152432986"></p><h3 id="_2-3-多倍图解决像素显示问题" tabindex="-1"><a class="header-anchor" href="#_2-3-多倍图解决像素显示问题" aria-hidden="true">#</a> 2.3 多倍图解决像素显示问题</h3><p><img src="https://s2.loli.net/2023/10/18/SnOo7NQmKtd3MH8.png" alt="image-20220714155138472"></p><h3 id="_2-4-背景缩放" tabindex="-1"><a class="header-anchor" href="#_2-4-背景缩放" aria-hidden="true">#</a> 2.4 背景缩放</h3><p><code>background-size</code></p><ul><li>如果只跟一个数值或者百分比的话的话就是指定宽度，高度等比例缩放</li><li>如果跟contain 的话，高度宽度会等比例拉伸，至一边碰到边缘为止</li><li>跟cover的话，会完全铺满，可能导致图片显示不完全</li></ul><p><img src="https://s2.loli.net/2023/10/18/bTzEJu8ioIh9Uq5.png" alt="image-20220714155549281"></p><h3 id="_2-5-二倍精灵图" tabindex="-1"><a class="header-anchor" href="#_2-5-二倍精灵图" aria-hidden="true">#</a> 2.5 二倍精灵图</h3><ul><li>在firework里面把精灵图等比例缩放为原来的一半</li><li>之后根据大小测量坐标</li><li>注意代码里面<code>background-size</code>也要写：精灵图原来宽度的一半</li></ul><h2 id="三、移动端开发选择" tabindex="-1"><a class="header-anchor" href="#三、移动端开发选择" aria-hidden="true">#</a> 三、移动端开发选择</h2><h3 id="_3-1移动端开发主流方案" tabindex="-1"><a class="header-anchor" href="#_3-1移动端开发主流方案" aria-hidden="true">#</a> 3.1移动端开发主流方案</h3><p><img src="https://s2.loli.net/2023/10/18/9Vt2TGHjF6Ilv3a.png" alt="image-20220714174116407"></p><p><img src="https://s2.loli.net/2023/10/18/8l5qOHZo1zGBEXr.png" alt="image-20220714174132822"></p><p><img src="https://s2.loli.net/2023/10/18/OkSt74Wu8RfIcsQ.png" alt="image-20220714174148691"></p><h3 id="_3-2-移动端开发方案总结" tabindex="-1"><a class="header-anchor" href="#_3-2-移动端开发方案总结" aria-hidden="true">#</a> 3.2 移动端开发方案总结</h3><p>现在市场常见的移动端开发有<code>单独制作移动端页面</code>和<code>响应式页面</code>两种方案</p><p>现在市场主流的选择还是 <u>单独制作移动端页面</u></p><h2 id="四、移动端技术解决方案" tabindex="-1"><a class="header-anchor" href="#四、移动端技术解决方案" aria-hidden="true">#</a> 四、移动端技术解决方案</h2><h3 id="_4-1-移动端浏览器" tabindex="-1"><a class="header-anchor" href="#_4-1-移动端浏览器" aria-hidden="true">#</a> 4.1 移动端浏览器</h3><p><img src="https://s2.loli.net/2023/10/18/QljeoTEDsty8wL2.png" alt="image-20220714174518740"></p><h3 id="_4-2-css初始化normalize-css" tabindex="-1"><a class="header-anchor" href="#_4-2-css初始化normalize-css" aria-hidden="true">#</a> 4.2 css初始化<code>normalize.css</code></h3><p><code>http://necolas.github.io/normalize.css/</code></p><p><img src="https://s2.loli.net/2023/10/18/QyMGnbFDI176u84.png" alt="image-20220714174559209"></p><h3 id="_4-3-css3-盒子模型box-sizing" tabindex="-1"><a class="header-anchor" href="#_4-3-css3-盒子模型box-sizing" aria-hidden="true">#</a> 4.3 css3 盒子模型<code>box-sizing</code></h3><blockquote><h4 id="输入bz按tab就可以一键生成c3盒子模型" tabindex="-1"><a class="header-anchor" href="#输入bz按tab就可以一键生成c3盒子模型" aria-hidden="true">#</a> 输入<code>bz</code>按<code>tab</code>就可以一键生成c3盒子模型</h4></blockquote><p><img src="https://s2.loli.net/2023/10/18/Spau6q8VioGwXZA.png" alt="image-20220714174904134"></p><h3 id="_4-4-几个特殊样式" tabindex="-1"><a class="header-anchor" href="#_4-4-几个特殊样式" aria-hidden="true">#</a> 4.4 几个特殊样式</h3><div class="language-css line-numbers-mode" data-ext="css"><pre class="language-css"><code><span class="token comment">/*CSS3盒子模型*/</span>
 <span class="token property">box-sizing</span><span class="token punctuation">:</span> border-box<span class="token punctuation">;</span>
 <span class="token property">-webkit-box-sizing</span><span class="token punctuation">:</span> border-box<span class="token punctuation">;</span>
 <span class="token comment">/*点击高亮我们需要清除清除 设置为transparent 完成透明*/</span>
 <span class="token property">-webkit-tap-highlight-color</span><span class="token punctuation">:</span> transparent<span class="token punctuation">;</span>
 <span class="token comment">/*在移动端浏览器默认的外观在iOS上加上这个属性才能给按钮和输入框自定义样式*/</span>
 <span class="token property">-webkit-appearance</span><span class="token punctuation">:</span> none<span class="token punctuation">;</span>
 <span class="token comment">/*禁用长按页面时的弹出菜单*/</span>
 <span class="token selector">img,a</span> <span class="token punctuation">{</span> <span class="token property">-webkit-touch-callout</span><span class="token punctuation">:</span> none<span class="token punctuation">;</span> <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://s2.loli.net/2023/10/18/t6vYfZdzP2Qail8.png" alt="image-20220714200830178"></p><h2 id="五、移动端常见布局" tabindex="-1"><a class="header-anchor" href="#五、移动端常见布局" aria-hidden="true">#</a> 五、移动端常见布局</h2><h3 id="_5-1-移动端技术选型" tabindex="-1"><a class="header-anchor" href="#_5-1-移动端技术选型" aria-hidden="true">#</a> 5.1 移动端技术选型</h3><p><img src="https://s2.loli.net/2023/10/18/N4Ogfi9d1cUpaDe.png" alt="image-20220714201143512"></p><h2 id="六、流式布局-百分百布局" tabindex="-1"><a class="header-anchor" href="#六、流式布局-百分百布局" aria-hidden="true">#</a> 六、流式布局（百分百布局）</h2><p><img src="https://s2.loli.net/2023/10/18/F8jG6fn1IDJmy2K.png" alt="image-20220714201210328"></p><h4 id="拓展-dpg和webp" tabindex="-1"><a class="header-anchor" href="#拓展-dpg和webp" aria-hidden="true">#</a> 拓展：DPG和WEBP</h4><p><img src="https://s2.loli.net/2023/10/18/eIRDqSNo1iZtuTG.png" alt="image-20220715130403927"></p><h2 id="七、❗❗❗-flex布局" tabindex="-1"><a class="header-anchor" href="#七、❗❗❗-flex布局" aria-hidden="true">#</a> 七、❗❗❗ flex布局</h2><h3 id="_7-1-flex和传统布局" tabindex="-1"><a class="header-anchor" href="#_7-1-flex和传统布局" aria-hidden="true">#</a> 7.1 flex和传统布局</h3><p><img src="https://s2.loli.net/2023/10/18/Vi9J52t1o4lnMeq.png" alt="image-20220715135540908"></p><h3 id="_7-2-flex布局原理" tabindex="-1"><a class="header-anchor" href="#_7-2-flex布局原理" aria-hidden="true">#</a> 7.2 flex布局原理</h3><blockquote><h3 id="要记得给父盒子加display-flex" tabindex="-1"><a class="header-anchor" href="#要记得给父盒子加display-flex" aria-hidden="true">#</a> 要记得给父盒子加<code>display:flex;</code></h3></blockquote><p><img src="https://s2.loli.net/2023/10/18/whvYnoTB8rV9Ogs.png" alt="image-20220715145952482"></p><p><img src="https://s2.loli.net/2023/10/18/PGsH5v3zgixMaoq.png" alt=""></p><h3 id="_7-3-常见父项属性" tabindex="-1"><a class="header-anchor" href="#_7-3-常见父项属性" aria-hidden="true">#</a> 7.3 常见父项属性</h3><p><img src="https://s2.loli.net/2023/10/18/t2ovHPKRZ1q4Izk.png" alt="image-20220715150624680"></p><h4 id="_7-3-1-🔴flex-direction-设置主轴方向" tabindex="-1"><a class="header-anchor" href="#_7-3-1-🔴flex-direction-设置主轴方向" aria-hidden="true">#</a> 7.3.1 🔴flex-direction 设置主轴方向</h4><ol><li><h4 id="主轴和侧轴" tabindex="-1"><a class="header-anchor" href="#主轴和侧轴" aria-hidden="true">#</a> 主轴和侧轴</h4></li></ol><p><img src="https://s2.loli.net/2023/10/18/s2XlvTbWuodtARn.png" alt="image-20220715150728696"></p><ol start="2"><li><h4 id="属性值" tabindex="-1"><a class="header-anchor" href="#属性值" aria-hidden="true">#</a> 属性值</h4></li></ol><p><img src="https://s2.loli.net/2023/10/18/5UwIrJzDZXAOqiR.png" alt="image-20220715150754547"></p><h4 id="_7-3-2-🔴justify-content-设置主轴上的子元素排列方式" tabindex="-1"><a class="header-anchor" href="#_7-3-2-🔴justify-content-设置主轴上的子元素排列方式" aria-hidden="true">#</a> 7.3.2 🔴<strong>justify-content</strong> <strong>设置主轴上的子元素排列方式</strong></h4><p><img src="https://s2.loli.net/2023/10/18/84JCPRaASdB6fug.png" alt="image-20220715151719874"></p><h4 id="_7-3-3-🔴flex-wrap-设置子元素是否换行" tabindex="-1"><a class="header-anchor" href="#_7-3-3-🔴flex-wrap-设置子元素是否换行" aria-hidden="true">#</a> 7.3.3 🔴<strong>flex-wrap</strong> <strong>设置子元素是否换行</strong></h4><p><img src="https://s2.loli.net/2023/10/18/HEMWeCO3hP4UX1V.png" alt="image-20220715152033469"></p><h4 id="_7-3-4-🔴align-items-设置侧轴上的子元素排列方式-单行" tabindex="-1"><a class="header-anchor" href="#_7-3-4-🔴align-items-设置侧轴上的子元素排列方式-单行" aria-hidden="true">#</a> 7.3.4 🔴<strong>align-items</strong> <strong>设置侧轴上的子元素排列方式（单行 ）</strong></h4><p><img src="https://s2.loli.net/2023/10/18/iHvyecI1GahFofR.png" alt="image-20220715152528044"></p><h4 id="_7-3-5-🔴align-content-设置侧轴上的子元素的排列方式-多行" tabindex="-1"><a class="header-anchor" href="#_7-3-5-🔴align-content-设置侧轴上的子元素的排列方式-多行" aria-hidden="true">#</a> 7.3.5 🔴<strong>align-content</strong> <strong>设置侧轴上的子元素的排列方式（多行）</strong></h4><p><img src="https://s2.loli.net/2023/10/18/PpEUSno2QBgDOFr.png" alt="image-20220715154744333"></p><h4 id="_7-3-6-align-content-和-align-items-区别" tabindex="-1"><a class="header-anchor" href="#_7-3-6-align-content-和-align-items-区别" aria-hidden="true">#</a> 7.3.6 <strong>align-content 和 align-items 区别</strong></h4><p><img src="https://s2.loli.net/2023/10/18/Yk83ycOzxpZjWM6.png" alt="image-20220715160926879"></p><h4 id="_7-3-7-flex-flow" tabindex="-1"><a class="header-anchor" href="#_7-3-7-flex-flow" aria-hidden="true">#</a> 7.3.7 <strong>flex-flow</strong></h4><blockquote><h3 id="flex-flow-属性是-flex-direction-和-flex-wrap-属性的复合属性" tabindex="-1"><a class="header-anchor" href="#flex-flow-属性是-flex-direction-和-flex-wrap-属性的复合属性" aria-hidden="true">#</a> flex-flow 属性是 flex-direction 和 flex-wrap 属性的复合属性</h3></blockquote><p><code>flex-flow:row wrap;</code></p><h3 id="_7-4-flex布局子项常见属性" tabindex="-1"><a class="header-anchor" href="#_7-4-flex布局子项常见属性" aria-hidden="true">#</a> 7.4 <strong>flex布局子项常见属性</strong></h3><ul><li>flex子项目占的份数</li><li>align-self控制子项自己在侧轴的排列方式</li><li>order属性定义子项的排列顺序（前后顺序）</li></ul><h4 id="_7-4-1-🔴flex-属性" tabindex="-1"><a class="header-anchor" href="#_7-4-1-🔴flex-属性" aria-hidden="true">#</a> 7.4.1 🔴<strong>flex 属性</strong></h4><blockquote><h4 id="里面的-number-可以写百分号-相对于父级来说的百分多少" tabindex="-1"><a class="header-anchor" href="#里面的-number-可以写百分号-相对于父级来说的百分多少" aria-hidden="true">#</a> 里面的<code>&lt;number&gt;</code>可以写百分号，相对于父级来说的百分多少</h4></blockquote><p><img src="https://s2.loli.net/2023/10/18/OsAW3PaHljFqkZx.png" alt="image-20220715222023174"></p><h4 id="_7-4-2-align-self-控制子项自己在侧轴上的排列方式" tabindex="-1"><a class="header-anchor" href="#_7-4-2-align-self-控制子项自己在侧轴上的排列方式" aria-hidden="true">#</a> 7.4.2 <strong>align-self</strong> <strong>控制子项自己在侧轴上的排列方式</strong></h4><p><img src="https://s2.loli.net/2023/10/18/We2aBcQyO9XvRzC.png" alt="image-20220715222422477"></p><h4 id="_7-4-3-order-属性定义项目的排列顺序" tabindex="-1"><a class="header-anchor" href="#_7-4-3-order-属性定义项目的排列顺序" aria-hidden="true">#</a> 7.4.3 <strong>order</strong> 属性定义项目的排列顺序</h4><p><img src="https://s2.loli.net/2023/10/18/rCho7kbsNnGT8Wd.png" alt="image-20220715222447824"></p><h3 id="_7-5-常见flex布局思路" tabindex="-1"><a class="header-anchor" href="#_7-5-常见flex布局思路" aria-hidden="true">#</a> 7.5 常见flex布局思路</h3><p><img src="https://s2.loli.net/2023/10/18/az382iAxrUYJRFm.png" alt="image-20220716125436446"></p><h3 id="拓展-背景线性渐变" tabindex="-1"><a class="header-anchor" href="#拓展-背景线性渐变" aria-hidden="true">#</a> 拓展：背景线性渐变</h3><div class="language-css line-numbers-mode" data-ext="css"><pre class="language-css"><code><span class="token property">background</span><span class="token punctuation">:</span> <span class="token function">linear-gradient</span><span class="token punctuation">(</span>起始方向<span class="token punctuation">,</span> 颜色1<span class="token punctuation">,</span> 颜色2<span class="token punctuation">,</span> ...<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token property">background</span><span class="token punctuation">:</span> <span class="token function">-webkit-linear-gradient</span><span class="token punctuation">(</span>left<span class="token punctuation">,</span> red <span class="token punctuation">,</span> blue<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token property">background</span><span class="token punctuation">:</span> <span class="token function">-webkit-linear-gradient</span><span class="token punctuation">(</span>left top<span class="token punctuation">,</span> red <span class="token punctuation">,</span> blue<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://s2.loli.net/2023/10/18/voCdxna5ZeWzcOA.png" alt="image-20220716132943811"></p><h2 id="八、❗❗❗-rem布局" tabindex="-1"><a class="header-anchor" href="#八、❗❗❗-rem布局" aria-hidden="true">#</a> 八、❗❗❗ rem布局</h2><h3 id="_8-1-rem单位" tabindex="-1"><a class="header-anchor" href="#_8-1-rem单位" aria-hidden="true">#</a> 8.1 rem单位</h3><p><img src="https://s2.loli.net/2023/10/18/6kXV53aTbWUFp9c.png" alt="image-20220718134202548"></p><h3 id="_8-2-媒体查询" tabindex="-1"><a class="header-anchor" href="#_8-2-媒体查询" aria-hidden="true">#</a> 8.2 媒体查询</h3><p><img src="https://s2.loli.net/2023/10/18/PKNEImg31MF4SCV.png" alt="image-20220718134221173"></p><h4 id="_8-2-1-媒体查询语法规范" tabindex="-1"><a class="header-anchor" href="#_8-2-1-媒体查询语法规范" aria-hidden="true">#</a> 8.2.1 媒体查询语法规范</h4><p><img src="https://s2.loli.net/2023/10/18/6hU9SlMD8x2vYkV.png" alt="image-20220718134236185"></p><h5 id="_8-2-1-1-mediatype-查询类型" tabindex="-1"><a class="header-anchor" href="#_8-2-1-1-mediatype-查询类型" aria-hidden="true">#</a> 8.2.1.1 <strong>mediatype 查询类型</strong></h5><p><img src="https://s2.loli.net/2023/10/18/Twj3bHfhQsGURr5.png" alt="image-20220718134534575"></p><p>​</p><h5 id="_8-2-1-2-关键字" tabindex="-1"><a class="header-anchor" href="#_8-2-1-2-关键字" aria-hidden="true">#</a> 8.2.1.2 <strong>关键字</strong></h5><p><img src="https://s2.loli.net/2023/10/18/S4U9knfV2MYDuhB.png" alt="image-20220718134558701"></p><h5 id="_8-2-1-3-媒体特性" tabindex="-1"><a class="header-anchor" href="#_8-2-1-3-媒体特性" aria-hidden="true">#</a> 8.2.1.3 <strong>媒体特性</strong></h5><ul><li>max-width: 小于等于指定像素</li><li>min-width: 大于等于指定像素</li></ul><p><img src="https://s2.loli.net/2023/10/18/4yVHakOKd76IBND.png" alt="image-20220718134641484"></p><h5 id="_8-2-1-4-小案例" tabindex="-1"><a class="header-anchor" href="#_8-2-1-4-小案例" aria-hidden="true">#</a> 8.2.1.4 小案例</h5><p><img src="https://s2.loli.net/2023/10/18/UaPb9F1vogXwHDY.png" alt="image-20220718164810451"></p><div class="language-css line-numbers-mode" data-ext="css"><pre class="language-css"><code>&lt;style type=<span class="token string">&quot;text/css&quot;</span>&gt;
			<span class="token comment">/* 1.小于540px的蓝色 */</span>
			<span class="token atrule"><span class="token rule">@media</span> screen <span class="token keyword">and</span> <span class="token punctuation">(</span><span class="token property">max-width</span><span class="token punctuation">:</span> 539px<span class="token punctuation">)</span></span> <span class="token punctuation">{</span>
				<span class="token selector">body</span> <span class="token punctuation">{</span>
					<span class="token property">background-color</span><span class="token punctuation">:</span> blue<span class="token punctuation">;</span>
				<span class="token punctuation">}</span>
			<span class="token punctuation">}</span>

			<span class="token comment">/* 2.当屏幕大于等于540像素 并且小于等于 969像素的时候 背景颜色为 绿色 ( 540=&lt;x &lt;= 969） */</span>
			<span class="token comment">/* 遵循从小到大写法后，以下可以简写 */</span>
			<span class="token comment">/* @media screen and (min-width: 540px) and (max-width: 969px) {
				body {
					background-color: green;
				}
			} */</span>
			<span class="token comment">/* 简写 */</span>
			<span class="token atrule"><span class="token rule">@media</span> screen <span class="token keyword">and</span> <span class="token punctuation">(</span><span class="token property">min-width</span><span class="token punctuation">:</span> 540px<span class="token punctuation">)</span></span> <span class="token punctuation">{</span>
				<span class="token selector">body</span> <span class="token punctuation">{</span>
					<span class="token property">background-color</span><span class="token punctuation">:</span> green<span class="token punctuation">;</span>
				<span class="token punctuation">}</span>
			<span class="token punctuation">}</span>

			<span class="token comment">/* 3.当屏幕大于等于 970像素的时候，背景颜色为红色 （ x &gt;= 970） */</span>
			<span class="token atrule"><span class="token rule">@media</span> screen <span class="token keyword">and</span> <span class="token punctuation">(</span><span class="token property">min-width</span><span class="token punctuation">:</span> 970px<span class="token punctuation">)</span></span> <span class="token punctuation">{</span>
				<span class="token selector">body</span> <span class="token punctuation">{</span>
					<span class="token property">background-color</span><span class="token punctuation">:</span> red<span class="token punctuation">;</span>
				<span class="token punctuation">}</span>
			<span class="token punctuation">}</span>
		&lt;/style&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><h4 id="因为css的层叠性-可以让第二段的大于970px的部分被第三段层叠掉-所以可以简写第二段" tabindex="-1"><a class="header-anchor" href="#因为css的层叠性-可以让第二段的大于970px的部分被第三段层叠掉-所以可以简写第二段" aria-hidden="true">#</a> 因为css的层叠性，可以让第二段的大于970px的部分被第三段层叠掉，所以可以简写第二段</h4></blockquote><p><img src="https://s2.loli.net/2023/10/18/hZVNXofFp2DaKSb.png" alt="image-20220718164819025"></p><h4 id="_8-2-2-媒体查询-rem实现元素动态大小变化" tabindex="-1"><a class="header-anchor" href="#_8-2-2-媒体查询-rem实现元素动态大小变化" aria-hidden="true">#</a> 8.2.2 <strong>媒体查询+rem实现元素动态大小变化</strong></h4><p>rem单位是跟着html来走的，有了rem页面元素可以设置不同大小尺寸</p><p>媒体查询可以根据不同设备宽度来修改样式</p><p><code>媒体查询+rm</code>就可以实现不同设备宽度，实现页面元素大小的动态变化</p><div class="language-css line-numbers-mode" data-ext="css"><pre class="language-css"><code>&lt;head&gt;
    &lt;meta charset=<span class="token string">&quot;utf-8&quot;</span>&gt;
    &lt;title&gt;&lt;/title&gt;
    &lt;style type=<span class="token string">&quot;text/css&quot;</span>&gt;
    <span class="token comment">/* 大于320px的屏幕 */</span>
    <span class="token atrule"><span class="token rule">@media</span> screen <span class="token keyword">and</span> <span class="token punctuation">(</span><span class="token property">min-width</span><span class="token punctuation">:</span> 320px<span class="token punctuation">)</span></span> <span class="token punctuation">{</span>
        <span class="token selector">html</span> <span class="token punctuation">{</span>
            <span class="token property">font-size</span><span class="token punctuation">:</span> 50px<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token comment">/* 大于640px的屏幕 */</span>
    <span class="token atrule"><span class="token rule">@media</span> screen <span class="token keyword">and</span> <span class="token punctuation">(</span><span class="token property">min-width</span><span class="token punctuation">:</span> 640px<span class="token punctuation">)</span></span> <span class="token punctuation">{</span>
        <span class="token selector">html</span> <span class="token punctuation">{</span>
            <span class="token property">font-size</span><span class="token punctuation">:</span> 100px<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token selector">.top</span> <span class="token punctuation">{</span>
        <span class="token property">height</span><span class="token punctuation">:</span> 1rem<span class="token punctuation">;</span>
        <span class="token property">font-size</span><span class="token punctuation">:</span> .5rem<span class="token punctuation">;</span>
        <span class="token property">background-color</span><span class="token punctuation">:</span> pink<span class="token punctuation">;</span>
        <span class="token comment">/* 水平居中 */</span>
        <span class="token property">text-align</span><span class="token punctuation">:</span> center<span class="token punctuation">;</span>
        <span class="token comment">/* 垂直居中 */</span>
        <span class="token property">line-height</span><span class="token punctuation">:</span> 1rem<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    &lt;/style&gt;
&lt;/head&gt;
&lt;body&gt;
    &lt;div class=<span class="token string">&quot;top&quot;</span>&gt;标题&lt;/div&gt;
&lt;/body&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_8-2-3-媒体查询引入css资源" tabindex="-1"><a class="header-anchor" href="#_8-2-3-媒体查询引入css资源" aria-hidden="true">#</a> 8.2.3 媒体查询引入css资源</h4><p>当样式比较繁多的时候，我们可以针对不同的媒体使用不同<code>stylesheets</code>(样式表)。</p><p>原理：就是直接在<code>link</code>中判断设备的尺寸，然后引用不同的css文件。</p><h2 id="九、-🎈less" tabindex="-1"><a class="header-anchor" href="#九、-🎈less" aria-hidden="true">#</a> 九、 🎈less</h2><h3 id="_9-1-less解决css的弊端" tabindex="-1"><a class="header-anchor" href="#_9-1-less解决css的弊端" aria-hidden="true">#</a> 9.1 less解决css的弊端</h3><p><img src="https://s2.loli.net/2023/10/18/57l3iPHrzJmxNFv.png" alt="image-20220718210503932"></p><h3 id="_9-2-介绍less" tabindex="-1"><a class="header-anchor" href="#_9-2-介绍less" aria-hidden="true">#</a> 9.2 介绍less</h3><p><img src="https://s2.loli.net/2023/10/18/YUICDAn3LrXhSjf.png" alt="image-20220718210602725"></p><h3 id="_9-3-less安装" tabindex="-1"><a class="header-anchor" href="#_9-3-less安装" aria-hidden="true">#</a> 9.3 less安装</h3><p>vscode装插件即可编译less</p><p><img src="https://s2.loli.net/2023/10/18/1hKfSIFe6JYuRcW.png" alt="image-20220718210635057"></p><h3 id="_9-4-less的使用" tabindex="-1"><a class="header-anchor" href="#_9-4-less的使用" aria-hidden="true">#</a> 9.4 less的使用</h3><p>我们首先新建一个后缀名为less的文件，在这个less文件里面书写less语句</p><ol><li>Less变量</li><li>Less编译</li><li>Less嵌套</li><li>Less运算</li></ol><h4 id="_9-4-1-变量" tabindex="-1"><a class="header-anchor" href="#_9-4-1-变量" aria-hidden="true">#</a> 9.4.1 变量</h4><p><img src="https://s2.loli.net/2023/10/18/VpcFqLtJybo8jia.png" alt="image-20220718210721948"></p><p><img src="https://s2.loli.net/2023/10/18/z6lhuw9ckYoiARx.png" alt="image-20220718210751003"></p><h4 id="_9-4-2-编译" tabindex="-1"><a class="header-anchor" href="#_9-4-2-编译" aria-hidden="true">#</a> 9.4.2 编译</h4><p>本质上，Less包含一套自定义的语法及一个解析器，用户根据这些语法定义自己的样式规则，这些规则最终会通过解析器，编译生成对应的CSS文件。</p><p>所以，我们需要把我们的less文件，编译生成为css文件，这样我们的html页面才能使用。</p><p><img src="https://s2.loli.net/2023/10/18/Srhtmz4iX2kOJRx.png" alt="image-20220718210820936"></p><h4 id="_9-4-3-嵌套-选择器" tabindex="-1"><a class="header-anchor" href="#_9-4-3-嵌套-选择器" aria-hidden="true">#</a> 9.4.3 嵌套（选择器）</h4><p><img src="https://s2.loli.net/2023/10/18/SIbtajiKTcH6MGD.png" alt="image-20220718210836365"></p><h4 id="_9-4-4-嵌套-交集-伪类-伪元素选择器" tabindex="-1"><a class="header-anchor" href="#_9-4-4-嵌套-交集-伪类-伪元素选择器" aria-hidden="true">#</a> 9.4.4 嵌套（交集|伪类|伪元素选择器）</h4><p><img src="https://s2.loli.net/2023/10/18/BoQtxNVSsjAhLqT.png" alt="image-20220718210852820"></p><h4 id="_9-4-5-🔴-运算" tabindex="-1"><a class="header-anchor" href="#_9-4-5-🔴-运算" aria-hidden="true">#</a> 9.4.5 🔴 运算</h4><p><img src="https://s2.loli.net/2023/10/18/8RPIGbUvTCAEd6F.png" alt="image-20220718210951538"></p><p><img src="https://s2.loli.net/2023/10/18/1AMzG5tseT3XnUN.png" alt="image-20220718211012894"></p><div class="language-less line-numbers-mode" data-ext="less"><pre class="language-less"><code><span class="token comment">// 除法加括号</span>
<span class="token variable">@border<span class="token punctuation">:</span></span> 50px<span class="token punctuation">;</span>

<span class="token selector">div</span> <span class="token punctuation">{</span>
    <span class="token property">width</span><span class="token punctuation">:</span> 100px<span class="token punctuation">;</span>
    <span class="token property">height</span><span class="token punctuation">:</span> 100px<span class="token punctuation">;</span>
    <span class="token property">border</span><span class="token punctuation">:</span> <span class="token punctuation">(</span><span class="token variable">@border</span> <span class="token operator">/</span> 5<span class="token punctuation">)</span> solid pink<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="十、rem适配方案" tabindex="-1"><a class="header-anchor" href="#十、rem适配方案" aria-hidden="true">#</a> 十、rem适配方案</h2><p><img src="https://s2.loli.net/2023/10/18/NyEgHaCnAWuT52q.png" alt="image-20220718214618209"></p><p><img src="https://s2.loli.net/2023/10/18/VPFCk2MQsDWZNGh.png" alt="image-20220718214623747"></p><p><img src="https://s2.loli.net/2023/10/18/TtQihxdHU3cPO7Z.png" alt="image-20220718214637122"></p><h3 id="_10-1-rem-适配方案技术使用-市场主流" tabindex="-1"><a class="header-anchor" href="#_10-1-rem-适配方案技术使用-市场主流" aria-hidden="true">#</a> 10.1 <strong>rem 适配方案技术使用（市场主流）</strong></h3><p><img src="https://s2.loli.net/2023/10/18/DbLaGPgxhzVe9R1.png" alt="image-20220718214652605"></p><h3 id="_10-2-rem-实际开发适配方案1" tabindex="-1"><a class="header-anchor" href="#_10-2-rem-实际开发适配方案1" aria-hidden="true">#</a> 10.2 <strong>rem 实际开发适配方案1</strong></h3><p><img src="https://s2.loli.net/2023/10/18/28yafUgPBxk6jRQ.png" alt="image-20220718214829882"></p><p><img src="https://s2.loli.net/2023/10/18/H1zWIeQTwmkiqEP.png" alt="image-20220718214843981"></p><p><img src="https://s2.loli.net/2023/10/18/7u6VlMqiwGc4OBU.png" alt="image-20220718214853917"></p><h2 id="十一、响应式开发" tabindex="-1"><a class="header-anchor" href="#十一、响应式开发" aria-hidden="true">#</a> 十一、响应式开发</h2><h3 id="_11-1-原理" tabindex="-1"><a class="header-anchor" href="#_11-1-原理" aria-hidden="true">#</a> 11.1 原理</h3><p><img src="https://s2.loli.net/2023/10/18/LFpy5Wuo2AXnG4a.png" alt="image-20220720120146404"></p><h3 id="_11-2-响应式布局容器" tabindex="-1"><a class="header-anchor" href="#_11-2-响应式布局容器" aria-hidden="true">#</a> 11.2 响应式布局容器</h3><blockquote><p>用一个盒子装需要的东西，在页面不同大小时改变盒子大小实现响应式布局</p></blockquote><p><img src="https://s2.loli.net/2023/10/18/Y6z79HB2OjSnDqm.png" alt="image-20220720120206087"></p><h2 id="十二、bootstrap" tabindex="-1"><a class="header-anchor" href="#十二、bootstrap" aria-hidden="true">#</a> 十二、Bootstrap</h2><h3 id="_12-1-简介" tabindex="-1"><a class="header-anchor" href="#_12-1-简介" aria-hidden="true">#</a> 12.1 简介</h3><p><img src="https://s2.loli.net/2023/10/18/AGXZzrTsxLw8hMH.png" alt="image-20220720154229476"></p><p><img src="https://s2.loli.net/2023/10/18/x1ircwyAZnqkQ9h.png" alt="image-20220720154251379"></p><p><img src="https://s2.loli.net/2023/10/18/xZiKoEPS9FLdQz8.png" alt="image-20220720154257366"></p><h3 id="_12-2-使用" tabindex="-1"><a class="header-anchor" href="#_12-2-使用" aria-hidden="true">#</a> 12.2 使用</h3><p><img src="https://s2.loli.net/2023/10/18/Xvju7KecgN1UiID.png" alt="image-20220720154310848"></p><p><img src="https://s2.loli.net/2023/10/18/9c5zWDTiolINLAe.png" alt="image-20220720154323528"></p><p><img src="https://s2.loli.net/2023/10/18/5uXbywMxv6VeIYP.png" alt="image-20220720154330406"></p><p><img src="https://s2.loli.net/2023/10/18/kh3od2in4WXElZv.png" alt="image-20220720154336698"></p><h3 id="_12-3-布局容器" tabindex="-1"><a class="header-anchor" href="#_12-3-布局容器" aria-hidden="true">#</a> 12.3 布局容器</h3><blockquote><p>一个页面中可以有不止一个的布局容器类</p></blockquote><p><img src="https://s2.loli.net/2023/10/18/j3i5vzNfTKV8thm.png" alt="image-20220720154355046"></p><h3 id="_12-4-bootstrap-栅格系统" tabindex="-1"><a class="header-anchor" href="#_12-4-bootstrap-栅格系统" aria-hidden="true">#</a> 12.4 bootstrap 栅格系统</h3><p><img src="https://s2.loli.net/2023/10/18/3skG5LbBVqrouKz.png" alt="image-20220720154450581"></p><h4 id="_12-4-1-栅格选项" tabindex="-1"><a class="header-anchor" href="#_12-4-1-栅格选项" aria-hidden="true">#</a> 12.4.1 栅格选项</h4><div class="language-css line-numbers-mode" data-ext="css"><pre class="language-css"><code>&lt;div class=<span class="token string">&quot;container&quot;</span>&gt;
            &lt;div class=<span class="token string">&quot;row&quot;</span>&gt;
                &lt;div class=<span class="token string">&quot;col-lg-3&quot;</span>&gt;1&lt;/div&gt;
                &lt;div class=<span class="token string">&quot;col-lg-3&quot;</span>&gt;2&lt;/div&gt;
                &lt;div class=<span class="token string">&quot;col-lg-3&quot;</span>&gt;3&lt;/div&gt;
                &lt;div class=<span class="token string">&quot;col-lg-3&quot;</span>&gt;4&lt;/div&gt;
            &lt;/div&gt;
            &lt;!-- 如果刚好12列就按比例分配，如果超过的话会换行，不足的话就不足 --&gt;
            &lt;div class=<span class="token string">&quot;row&quot;</span>&gt;
                &lt;div class=<span class="token string">&quot;col-lg-6&quot;</span>&gt;1&lt;/div&gt;
                &lt;div class=<span class="token string">&quot;col-lg-2&quot;</span>&gt;2&lt;/div&gt;
                &lt;div class=<span class="token string">&quot;col-lg-2&quot;</span>&gt;3&lt;/div&gt;
                &lt;div class=<span class="token string">&quot;col-lg-2&quot;</span>&gt;4&lt;/div&gt;
            &lt;/div&gt;
        &lt;/div&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://s2.loli.net/2023/10/18/T1YPowIkAOxqmXL.png" alt="image-20220720154506513"></p><h4 id="_12-4-2-列嵌套" tabindex="-1"><a class="header-anchor" href="#_12-4-2-列嵌套" aria-hidden="true">#</a> 12.4.2 列嵌套</h4><p><img src="https://s2.loli.net/2023/10/18/svqjlPy8Sm2aY4U.png" alt="image-20220720160824758"></p><h4 id="_12-4-3-列偏移" tabindex="-1"><a class="header-anchor" href="#_12-4-3-列偏移" aria-hidden="true">#</a> 12.4.3 列偏移</h4><blockquote><p>bootstrap4以后应该是要用<code>offset-md-n</code></p></blockquote><p><img src="https://s2.loli.net/2023/10/18/zFLykuRQTX6jClv.png" alt="image-20220720160837099"></p><h4 id="_12-4-4-列偏移" tabindex="-1"><a class="header-anchor" href="#_12-4-4-列偏移" aria-hidden="true">#</a> 12.4.4 列偏移</h4><p><img src="https://s2.loli.net/2023/10/18/jW3suqeMNpwrG7F.png" alt="image-20220720213011211"></p><h4 id="_12-4-5-响应式工具-根据尺寸显示或隐藏元素" tabindex="-1"><a class="header-anchor" href="#_12-4-5-响应式工具-根据尺寸显示或隐藏元素" aria-hidden="true">#</a> 12.4.5 响应式工具（根据尺寸显示或隐藏元素</h4><p><img src="https://s2.loli.net/2023/10/18/ODqXlVT6MzvHpdS.png" alt="image-20220720213117240"></p><h2 id="十三、总结" tabindex="-1"><a class="header-anchor" href="#十三、总结" aria-hidden="true">#</a> 十三、总结</h2><h3 id="_13-1-移动端主流方案" tabindex="-1"><a class="header-anchor" href="#_13-1-移动端主流方案" aria-hidden="true">#</a> 13.1 移动端主流方案</h3><p><img src="https://s2.loli.net/2023/10/18/ADqgxpNC9lH2zTs.png" alt="image-20220720214839236"></p><h3 id="_13-2-移动端技术选型" tabindex="-1"><a class="header-anchor" href="#_13-2-移动端技术选型" aria-hidden="true">#</a> 13.2 移动端技术选型</h3><p><img src="https://s2.loli.net/2023/10/18/9Ibju4tSaMdUR32.png" alt="image-20220720214926693"></p><h2 id="十四、v-w、v-h" tabindex="-1"><a class="header-anchor" href="#十四、v-w、v-h" aria-hidden="true">#</a> 十四、V W、V H</h2><p><img src="https://s2.loli.net/2023/10/18/wMY5ip9dSrlgWfv.png" alt="image-20220720220633224"></p><p><img src="https://s2.loli.net/2023/10/18/pUkIX2Feu7YDG8Q.png" alt="image-20220720220655300"></p><blockquote><p>举例：</p><h5 id="需要一个-50-50-的盒子-在视口375px的iphone678下写法" tabindex="-1"><a class="header-anchor" href="#需要一个-50-50-的盒子-在视口375px的iphone678下写法" aria-hidden="true">#</a> 需要一个 50 * 50 的盒子，在视口375px的iPhone678下写法</h5><p>计算：50 / 1vw（3.75px）= 13.3333333333vw</p><div class="language-css line-numbers-mode" data-ext="css"><pre class="language-css"><code><span class="token selector">div</span> <span class="token punctuation">{</span>
    <span class="token property">width</span><span class="token punctuation">:</span> 13.3333333333vw<span class="token punctuation">;</span>
    <span class="token property">height</span><span class="token punctuation">:</span> 13.3333333333vw<span class="token punctuation">;</span>
    <span class="token property">background-color</span><span class="token punctuation">:</span> pink<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></blockquote>`,200),l=[i];function p(r,c){return n(),s("div",null,l)}const o=a(t,[["render",p],["__file","yidongduan.html.vue"]]);export{o as default};