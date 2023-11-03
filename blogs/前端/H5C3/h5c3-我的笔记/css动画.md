## [3. 2D 转换](https://docs.mphy.top/#/CSS/ch07?id=_3-2d-转换)

转换（`transform`）是 CSS3 中具有颠覆性的特征之一，可以实现元素的位移、旋转、缩放等效果。

转换可以理解为变形。

- 移动：`translate`
- 旋转：`rotate`
- 缩放：`scale`

### [3.1 二维坐标系](https://docs.mphy.top/#/CSS/ch07?id=_31-二维坐标系)

### [3.2 移动 translate](https://docs.mphy.top/#/CSS/ch07?id=_32-移动-translate)

语法

- 三种写法

```css
transform: translate(x, y);
transform: translateX(x);
transform: translateY(y);
```

- 参数 `x, y` 可以是百分数，为盒子自身的宽度或高度。

重点

- 定义 2D 转换中的移动，沿着X和Y轴移动元素
- <font color=red size=6>translate 最大的优点：不会影响到其他元素的位置</font>
- translate 中的百分比单位是相对于 自身元素 的 `trainslate:(50%，50%)`
- **对行内标签没有效果**

### [3.3 让盒子实现水平和垂直居中](https://docs.mphy.top/#/CSS/ch07?id=_33-让盒子实现水平和垂直居中)

```css
/*子绝父相*/
position: absolute;
top: 50%;
left: 50%;
transform: translate(-50%, -50%);
```

### [3.4 旋转 rotate](https://docs.mphy.top/#/CSS/ch07?id=_34-旋转-rotate)

值为正数则顺时针旋转，为负数则逆时针旋转。

```css
transform: rotate(45deg);
```

### [3.5 2D 转换中心点 transform-origin](https://docs.mphy.top/#/CSS/ch07?id=_35-2d-转换中心点-transform-origin)

> 可以结合`background-position`一起记

我们可以通过设置 `transform-origin` 设置元素转换的中心点。

#### [3.5.1 语法](https://docs.mphy.top/#/CSS/ch07?id=_351-语法)

```css
transform-origin: x y;
```

#### [3.5.2 重点](https://docs.mphy.top/#/CSS/ch07?id=_352-重点)

- 注意后面的参数 x 和 y 用空格隔开
- x y 默认转换的中心点是元素的中心点（50% 50%）
  - 默认相当于transform-origin: center center;
- 还可以给 x y 设置像素或者方位名词（top bottom left right center）

### [3.6 2D 转换之缩放 scale](https://docs.mphy.top/#/CSS/ch07?id=_36-2d-转换之缩放-scale)

```css
 transform: scale(x, y);
```

`x, y` 不跟单位的话，是指缩放的倍数。

```css
transform: scale(2,1);
```

- 参数大于 `1` 则放大，小于 `1` 则缩小。
- 可以配合 `transform-origin` 使用，改变缩放中心。
- <font color=red size=6>`scale` 的优势：不占空间</font>

### [3.7 👓2D 转换综合写法](https://docs.mphy.top/#/CSS/ch07?id=_37-2d-转换综合写法)

注意：

1. 同时使用多个转换，其格式为： `transform: translate(), rotate() scale()`
2. 其顺序会影转换的效果。（先旋转会改变坐标轴方向）
3. 当我们同时有位移和其他属性的时候，记得要<font color=red size=6>将位移放到最前.</font>

### 3.8 2D总结

![image-20220711222057412](https://note-img54.oss-cn-hongkong.aliyuncs.com/note/h5c3-%E6%88%91%E7%9A%84%E7%AC%94%E8%AE%B0/css%E5%8A%A8%E7%94%BB.assets/image-20220711222057412.png)

## [4. 动画](https://docs.mphy.top/#/CSS/ch07?id=_4-动画)

动画( animation ) 是 CSS3 中具有颠覆性的特征之一，可通过设置多个节点来精确控制一个或一组动画，常用来实现复杂的动画效果。 相比较过渡，动画可以实现更多变化，更多控制，连续自动播放等效果。

### [4.1 动画的基本使用](https://docs.mphy.top/#/CSS/ch07?id=_41-动画的基本使用)

分为两步：

1. 定义动画 (动画序列 `%α`)
2. 使用动画

```css
 /* 1. 定义动画 */
@keyframes move {
    /*开始状态*/
    0% {
        transform: translateX(0px);
    }
    /*结束状态*/
    100% {
        transform: translateX(1000px);
    }
}
div {
    width: 200px;
    height: 200px;
    background-color: pink;
    /* 2. 调用动画 */
    /* 动画名称 */
    animation-name: move;
    /* 持续时间 */
    animation-duration: 5s;
}
```

**动画序列**

- 0% 是动画的开始，100% 是动画的完成。这样的规则就是动画序列。
- 在 @keyframes 中规定某项 CSS 样式，就能创建由当前样式逐渐改为新样式的动画效果。
- 动画是使元素从一种样式逐渐变化为另一种样式的效果。您可以改变任意多的样式任意多的次数。
- 请用百分比来规定变化发生的时间，或用关键词"from"和“to”，等同于0%和100%。

注意:

1. 可以做多个状态的变化 `keyframes` 关键帧
2. 百分比必须是整数
3. 百分比是总时间 `animation-duration` 的划分

### [4.2 动画常用属性](https://docs.mphy.top/#/CSS/ch07?id=_42-动画常用属性)

| 属性                        | 描述                                                         |
| --------------------------- | ------------------------------------------------------------ |
| `keyframes`                 | 规定动画。                                                   |
| `animation`                 | 所有动画属性的简写属性,除了animation-play-state属性。        |
| `animation-name`            | 规定@keyframes动画的名称。(必须的)                           |
| `animation-duration`        | 规定动画完成一个周期所花费的秒或毫秒，默认是0。（必须的)     |
| `animation-timing-function` | 规定动画的速度曲线，默认是“ease” .                           |
| `animation-delay`           | 规定动画何时开始，默认是0.                                   |
| `animation-iteration-count` | 规定动画被播放的次数，默认是1，还有infinite                  |
| `animation-direction`       | 规定动画是否在下一周期逆向播放，默认是 "normal",alternate逆播放 |
| `animation-play-state`      | 规定动画是否正在运行或暂停。默认是"running",还有"paused".    |
| `animation-fill-mode`       | 规定动画结束后状态,保持forwards回到起始backwards             |

#### 4.2.1 `animation-timing-function`

![image-20220712231624641](https://note-img54.oss-cn-hongkong.aliyuncs.com/note/h5c3-%E6%88%91%E7%9A%84%E7%AC%94%E8%AE%B0/css%E5%8A%A8%E7%94%BB.assets/image-20220712231624641.png)

### [4.3 👓动画简写属性](https://docs.mphy.top/#/CSS/ch07?id=_43-动画简写属性)

```css
animation: 动画名称 持续时间 运动曲线 何时开始 播放次数 是否反方向 动画起始或者结束的状态;
animation: myfirst 5s linear 2s infinite alternate;
```

- 简写属性里面不包含 `animation-play-state`
- 暂停动画: `animation-play-state: puased;`
- 经常和鼠标经过等其他配合使用想要动画走回来，而不是直接跳回来: `animation-direction: alternate`
- 盒子动画结束后，停在结束位置: ` animation-fill-mode: forwards`



## 5. 3D

![image-20220713112843952](https://note-img54.oss-cn-hongkong.aliyuncs.com/note/h5c3-%E6%88%91%E7%9A%84%E7%AC%94%E8%AE%B0/css%E5%8A%A8%E7%94%BB.assets/image-20220713112843952.png)

![image-20220713114907919](https://note-img54.oss-cn-hongkong.aliyuncs.com/note/h5c3-%E6%88%91%E7%9A%84%E7%AC%94%E8%AE%B0/css%E5%8A%A8%E7%94%BB.assets/image-20220713114907919.png)

```css
div {
            width: 200px;
            height: 200px;
            background-color: pink;
            /* transform: translateX(100px);
            transform: translateY(100px); */ 
    		/* 用下面的方法合写xyz变化 */
            /* transform: translateX(100px) translateY(100px) translateZ(100px); */
            /* 1. translateZ 沿着Z轴移动 */
            /* 2. translateZ 后面的单位我们一般跟px */
            /* 3. translateZ(100px) 向外移动100px （向我们的眼睛来移动的） */
            /* 4. 3D移动有简写的方法 */
            /* transform: translate3d(x,y,z); */
            /* transform: translate3d(100px, 100px, 100px); */
            /* 5. xyz是不能省略的，如果没有就写0 */
            transform: translate3d(400px, 100px, 100px);
        }
```



### 5.1 透视

透视可以成为视距：

1. 视距越小（离得远看得大）成像越大
2. 视距越大（离得远看得小）成像越小（近大远小）

![image-20220713115526301](https://note-img54.oss-cn-hongkong.aliyuncs.com/note/h5c3-%E6%88%91%E7%9A%84%E7%AC%94%E8%AE%B0/css%E5%8A%A8%E7%94%BB.assets/image-20220713115526301.png)

### 5.2 3D旋转

![image-20220713121824796](https://note-img54.oss-cn-hongkong.aliyuncs.com/note/h5c3-%E6%88%91%E7%9A%84%E7%AC%94%E8%AE%B0/css%E5%8A%A8%E7%94%BB.assets/image-20220713121824796.png)

#### x轴的左手准则（旋转方向）

![image-20220713121240785](https://note-img54.oss-cn-hongkong.aliyuncs.com/note/h5c3-%E6%88%91%E7%9A%84%E7%AC%94%E8%AE%B0/css%E5%8A%A8%E7%94%BB.assets/image-20220713121240785.png)



#### y轴的左手准则（旋转方向）

![image-20220713121634223](https://note-img54.oss-cn-hongkong.aliyuncs.com/note/h5c3-%E6%88%91%E7%9A%84%E7%AC%94%E8%AE%B0/css%E5%8A%A8%E7%94%BB.assets/image-20220713121634223.png)

#### rotate3d

![image-20220713161033516](https://note-img54.oss-cn-hongkong.aliyuncs.com/note/h5c3-%E6%88%91%E7%9A%84%E7%AC%94%E8%AE%B0/css%E5%8A%A8%E7%94%BB.assets/image-20220713161033516.png)



### 5.3 3D呈现

`transform-style: preserve-3d;`

![image-20220713161637155](https://note-img54.oss-cn-hongkong.aliyuncs.com/note/h5c3-%E6%88%91%E7%9A%84%E7%AC%94%E8%AE%B0/css%E5%8A%A8%E7%94%BB.assets/image-20220713161637155.png)







## [6. 浏览器私有前缀](https://docs.mphy.top/#/CSS/ch07?id=_5-浏览器私有属性)

浏览器私有前缀是为了兼容老版本的写法，比较新版本的浏览器无须添加。

1. 私有前缀

   - `-moz-`: 代表firefox浏览器私有属性
   - `-ms-`: 代表ie浏览器私有属性
   - `-webkit-`: 代表safari、chrome私有属性-o-∶代表Opera私有属性

2. 提倡的写法

   ```css
   -moz-border-radius: 10px;
   -webkit-border-radius: 10px;
   -o-border-radius: 10px;
   border-radius: 10px;
   ```



## [7. CSS3 新特性](https://docs.mphy.top/#/CSS/ch07?id=_6-css3-新特性)

![CSS3](https://note-img54.oss-cn-hongkong.aliyuncs.com/note/h5c3-%E6%88%91%E7%9A%84%E7%AC%94%E8%AE%B0/css%E5%8A%A8%E7%94%BB.assets/CSS3.png)