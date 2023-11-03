# Javaweb

## HTML

## HTML 简介

![image-20220414101527605](https://note-img54.oss-cn-hongkong.aliyuncs.com/note/Javaweb/Javaweb.assets/image-20220414101527605.png)

## HTML 目录

![image-20220414101932173](https://note-img54.oss-cn-hongkong.aliyuncs.com/note/Javaweb/Javaweb.assets/image-20220414101932173.png)

### 1. HTML 快速入门

![image-20220414103301812](https://note-img54.oss-cn-hongkong.aliyuncs.com/note/Javaweb/Javaweb.assets/image-20220414103301812.png)

![image-20220414103411004](https://note-img54.oss-cn-hongkong.aliyuncs.com/note/Javaweb/Javaweb.assets/image-20220414103411004.png)

### 2. 基础标签

![image-20220414103627539](https://note-img54.oss-cn-hongkong.aliyuncs.com/note/Javaweb/Javaweb.assets/image-20220414103627539.png)

#### 转义字符

![image-20220414105141279](https://note-img54.oss-cn-hongkong.aliyuncs.com/note/Javaweb/Javaweb.assets/image-20220414105141279.png)

### 3. 图片、音频、视频标签

![image-20220414105259893](https://note-img54.oss-cn-hongkong.aliyuncs.com/note/Javaweb/Javaweb.assets/image-20220414105259893.png)

#### 资源路径、尺寸单位

![image-20220414110828770](https://note-img54.oss-cn-hongkong.aliyuncs.com/note/Javaweb/Javaweb.assets/image-20220414110828770.png)

### 4. 超链接

![image-20220414111556853](https://note-img54.oss-cn-hongkong.aliyuncs.com/note/Javaweb/Javaweb.assets/image-20220414111556853.png)

```html
  <a href="https://www.baidu.com" target="_blank">点我去百度（开个新的百度窗口）</a><br/>
  <a href="https://www.baidu.com" target="_self">点我去百度（当前页面改为百度）</a>
```

### 5. 列表标签

![image-20220414112740322](https://note-img54.oss-cn-hongkong.aliyuncs.com/note/Javaweb/Javaweb.assets/image-20220414112740322.png)

### 6. 表格标签

![image-20220414113046854](https://note-img54.oss-cn-hongkong.aliyuncs.com/note/Javaweb/Javaweb.assets/image-20220414113046854.png)

### 7. 布局标签

（等学css了联合css来使用）

![image-20220414125622277](https://note-img54.oss-cn-hongkong.aliyuncs.com/note/Javaweb/Javaweb.assets/image-20220414125622277.png)

### 8. 表单标签

![image-20220414125741978](https://note-img54.oss-cn-hongkong.aliyuncs.com/note/Javaweb/Javaweb.assets/image-20220414125741978.png)

![image-20220414130056715](https://note-img54.oss-cn-hongkong.aliyuncs.com/note/Javaweb/Javaweb.assets/image-20220414130056715.png)

#### 8.1 表单项

![image-20220414130158444](https://note-img54.oss-cn-hongkong.aliyuncs.com/note/Javaweb/Javaweb.assets/image-20220414130158444.png)

##### 8.1.1 用户名密码

用以下这种方式是可以，如果想要点击"用户名："这三个字的时候也能算点击输入框的话就要用到<labal>标签了

```html
<form action="#" method="post">
    用户名：<input type="text" name="username"><br>
    密码：<input type="password" name="password"><br>

    <br>
    <input type="submit" value="注册"/>
</form>
```

使用到<labal>标签

```html
<form action="#" method="post">
    <label for="username">用户名：</label>
    <input type="text" name="username" id="username"><br>  <!-- lable 的for关联到要关联的输入框的id -->
    
    <label for="password">密码：</label>
    <input type="password" name="password" id="password"><br>

    <br>
    <input type="submit" value="注册"/>
</form>
```

##### 8.1.2 性别（单选）：

```html
性别：
<input type="radio" name="gen" value="1" id="male"><label for="male"> 男</label>
<input type="radio" name="gen" value="0" id="female"><label for="female"> 女</label>
<!-- name 用于单选的关联。value 可以在提交表单后获取值看到具体选择哪个。id 用来和 label 关联，效果同上。 -->
```

##### 8.1.3 爱好（多选）：

```html
爱好：
<input type="checkbox" name="hobby" value="1"> 旅游
<input type="checkbox" name="hobby" value="2"> 电影
<input type="checkbox" name="hobby" value="3"> 游戏
```

##### 8.1.4 头像（文件选择）：

```html
头像：
<input type="file">
```

##### 8.1.5 重置按钮

```html
<input type="reset" value="重置"/>
```

##### 8.1.6 城市（下拉菜单）：

```html
城市：
<select name="city">
    <option value="beijing">北京</option>
    <option value="fujian">福建</option>
    <option value="shanghai">上海</option>
</select>
```

##### 8.1.7 个人描述（文本输入域）：

```html
个人描述:  <!-- rows用于指定多少行，cols指定每行多少个字符 -->
<textarea cols="20" rows="10" name="desc"></textarea>
```

## 拉钩

#### 文本标签

![image-20220505123742994](https://note-img54.oss-cn-hongkong.aliyuncs.com/note/Javaweb/Javaweb.assets/image-20220505123742994.png)

#### 格式化标签

![image-20220505124159921](https://note-img54.oss-cn-hongkong.aliyuncs.com/note/Javaweb/Javaweb.assets/image-20220505124159921.png)

#### 图片标签

![image-20220505124643959](https://note-img54.oss-cn-hongkong.aliyuncs.com/note/Javaweb/Javaweb.assets/image-20220505124643959.png)

#### 超链接标签

![image-20220505125022327](https://note-img54.oss-cn-hongkong.aliyuncs.com/note/Javaweb/Javaweb.assets/image-20220505125022327.png)

#### 表格标签

![image-20220505125438322](https://note-img54.oss-cn-hongkong.aliyuncs.com/note/Javaweb/Javaweb.assets/image-20220505125438322.png)

#### 表单标签

![image-20220505130005793](https://note-img54.oss-cn-hongkong.aliyuncs.com/note/Javaweb/Javaweb.assets/image-20220505130005793.png)

![image-20220505130707808](https://note-img54.oss-cn-hongkong.aliyuncs.com/note/Javaweb/Javaweb.assets/image-20220505130707808.png)

![image-20220505130735399](https://note-img54.oss-cn-hongkong.aliyuncs.com/note/Javaweb/Javaweb.assets/image-20220505130735399.png)

![image-20220505130814512](https://note-img54.oss-cn-hongkong.aliyuncs.com/note/Javaweb/Javaweb.assets/image-20220505130814512.png)

##### 既有输入又能提示和选择

![image-20220505131145926](https://note-img54.oss-cn-hongkong.aliyuncs.com/note/Javaweb/Javaweb.assets/image-20220505131145926.png)

##### 下拉框分组显示

![image-20220505131301014](https://note-img54.oss-cn-hongkong.aliyuncs.com/note/Javaweb/Javaweb.assets/image-20220505131301014.png)

#### 行内框架

可以在网页内掏个洞放另一个网页（不常用）

![image-20220505131350052](https://note-img54.oss-cn-hongkong.aliyuncs.com/note/Javaweb/Javaweb.assets/image-20220505131350052.png)

#### 多媒体标签

![image-20220505131524493](https://note-img54.oss-cn-hongkong.aliyuncs.com/note/Javaweb/Javaweb.assets/image-20220505131524493.png)



# CSS / JS

## css简介

![image-20220414135816211](https://note-img54.oss-cn-hongkong.aliyuncs.com/note/Javaweb/Javaweb.assets/image-20220414135816211.png)

![image-20220414135940590](https://note-img54.oss-cn-hongkong.aliyuncs.com/note/Javaweb/Javaweb.assets/image-20220414135940590.png)

### css 导入HTML的三种方式：

![image-20220414140110095](https://note-img54.oss-cn-hongkong.aliyuncs.com/note/Javaweb/Javaweb.assets/image-20220414140110095.png)

内联样式：css和html耦合在一起，不利于维护

### css 选择器

![image-20220414141446471](https://note-img54.oss-cn-hongkong.aliyuncs.com/note/Javaweb/Javaweb.assets/image-20220414141446471.png)

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <style>
        div{
            color: red;
        }
        #d1{
            color: blue;
        }
        #d2{
            color: gray;
        }
        .cls{
            color: pink;
        }
    </style>
</head>
<body>
    <div>div1</div>
    <div id="d1">div2</div>
    <div id="d2" class="cls">div3</div>
    <!--选择范围：谁小谁生效。id < class < 元素 ，所以div3的颜色按照d2的id来，为灰色-->
    <span class="cls">span</span>
</body>
</html>
```

![image-20220505205217545](https://note-img54.oss-cn-hongkong.aliyuncs.com/note/Javaweb/Javaweb.assets/image-20220505205217545.png)

![image-20220505205239635](https://note-img54.oss-cn-hongkong.aliyuncs.com/note/Javaweb/Javaweb.assets/image-20220505205239635.png)

![image-20220505205250876](https://note-img54.oss-cn-hongkong.aliyuncs.com/note/Javaweb/Javaweb.assets/image-20220505205250876.png)



## JavaScript

### JavaScript 简介

![image-20220414142705318](https://note-img54.oss-cn-hongkong.aliyuncs.com/note/Javaweb/Javaweb.assets/image-20220414142705318.png)

### js的引入方式

![image-20220414143421253](https://note-img54.oss-cn-hongkong.aliyuncs.com/note/Javaweb/Javaweb.assets/image-20220414143421253.png)

#### 1. 内部脚本

![image-20220414143538892](https://note-img54.oss-cn-hongkong.aliyuncs.com/note/Javaweb/Javaweb.assets/image-20220414143538892.png)

#### 2. 外部脚本

![image-20220414143605241](https://note-img54.oss-cn-hongkong.aliyuncs.com/note/Javaweb/Javaweb.assets/image-20220414143605241.png)

```html
<script>
    // alert为写入警告框。全称为 window.alert()
    alert("hello!!!")
</script>
```

## JavaScript 基础语法

## 1.书写语法

![image-20220414144450907](https://note-img54.oss-cn-hongkong.aliyuncs.com/note/Javaweb/Javaweb.assets/image-20220414144450907.png)

## 2. 输出语句

![image-20220414144935489](https://note-img54.oss-cn-hongkong.aliyuncs.com/note/Javaweb/Javaweb.assets/image-20220414144935489.png)

```html
<script>
    window.alert("hello1");  // 写入警告框
    document.write("write1")  // 写入html页面
    console.log("hello log")  // 写入浏览器的控制台
</script>
```

## 3. 变量

![image-20220414145640172](https://note-img54.oss-cn-hongkong.aliyuncs.com/note/Javaweb/Javaweb.assets/image-20220414145640172.png)

var定义变量特点

- 作用域：全局变量
- 变量可以重复定义
- 变量可以被赋不同类型的值

```html
<script>

    {
        var age = 60
        var age = "张三"
    }
    alert(age)  // 输出后为 张三，且出了大括号范围也算数

</script>
```

let定义变量特点：

- 局部变量
- 不允许重复定义

## 4. 数据类型

![image-20220414215958919](https://note-img54.oss-cn-hongkong.aliyuncs.com/note/Javaweb/Javaweb.assets/image-20220414215958919.png)

```html
<script>

    var a = 90;
    var b = 90.5;
    alert(typeof a); // number
    alert(typeof b); // number

    var ch = 'a';
    var name = '张三';
    var add = "北京";
    alert(typeof ch); // string
    alert(typeof name); // string
    alert(typeof add); // string

    var flag = true;
    var flag2 = false;
    alert(typeof flag); // boolean
    alert(typeof flag2); // boolean

    var obj = null;
    alert(typeof obj); // object

    var a;
    alert(typeof a); // undefined

</script>
```

## 5. 运算符

![image-20220414220924621](https://note-img54.oss-cn-hongkong.aliyuncs.com/note/Javaweb/Javaweb.assets/image-20220414220924621.png)

![image-20220414221119337](https://note-img54.oss-cn-hongkong.aliyuncs.com/note/Javaweb/Javaweb.assets/image-20220414221119337.png)

### 类型转换

- 其他类型转为number：

  - string：按照字符串字面值，转为数字。如果字面值不是数字，会转为NaN。

    两种方法转：

    1. 在字符串前加 ' + ' 
    2. 用 parseInt(str1) 方法转

    ```html
    <script>
    
        var str = +'20';
        var str1 = '20';
        alert(parseInt(str1) + 1); // 21
        
    </script>
    ```

    

  - ​	boolean：true 转为1，false 转为0

- 其他类型转为boolean（可以放进 if 的判断条件里）：

1. ​	number :0和NaN转为false，其他的数字转为true
2. ​	string:空字符串转为false，其他的字符串转为true
3. ​	null:false
4. ​	undefined : false

​	用于健壮性的判断：

```html
<script>
//健壮性判断,判断传来的串是不是空串
//if(str != null && str.length > 0){
if(str){
	alert("转为true" );
}else {
	alert("转为false" );
}
</script>
```



## 6. 流程控制语句

（和 java 基本相同）

![image-20220414222911108](https://note-img54.oss-cn-hongkong.aliyuncs.com/note/Javaweb/Javaweb.assets/image-20220414222911108.png)



## 7. 函数

![image-20220414223234337](https://note-img54.oss-cn-hongkong.aliyuncs.com/note/Javaweb/Javaweb.assets/image-20220414223234337.png)

```html
<script>
function add(a, b){
	return a + b;
}
var result = add(1, 2);
alert(result); // 3
</script>
```



![image-20220414223438581](https://note-img54.oss-cn-hongkong.aliyuncs.com/note/Javaweb/Javaweb.assets/image-20220414223438581.png)

```html
<script>
var add = function (a,b){
	return a + b;
}

var result = add(1,2);
alert(result); // 3

</script>
```

若参数个数不同的话：

```html
<script>
var add = function (a,b){
	return a + b;
}

var result1 =add(1,2,3);
alert(result1);  // 3 ,虽然传了三个参数进去，但是函数只接了两个，第三个虽然进去了但是没用
    
var result2 = add(1);
alert(result2);  // NaN ，一个数加上NaN为NaN

</script>
```



## JavaScript 对象

### Array

![image-20220415180907031](https://note-img54.oss-cn-hongkong.aliyuncs.com/note/Javaweb/Javaweb.assets/image-20220415180907031.png)

数组可以用foreach进行遍历

可以给超出定义范围的索引赋值，中间没给值的都为undefined

```html
<script>

    var arr = [1,2,3]
    arr[10] = 10
    alert(arr)

</script>
```

![image-20220415181828376](https://note-img54.oss-cn-hongkong.aliyuncs.com/note/Javaweb/Javaweb.assets/image-20220415181828376.png)

![image-20220415182101216](https://note-img54.oss-cn-hongkong.aliyuncs.com/note/Javaweb/Javaweb.assets/image-20220415182101216.png)

### String

![image-20220415182224550](https://note-img54.oss-cn-hongkong.aliyuncs.com/note/Javaweb/Javaweb.assets/image-20220415182224550.png)

用 trim 来去除字符串前后空白符

![image-20220415182508434](https://note-img54.oss-cn-hongkong.aliyuncs.com/note/Javaweb/Javaweb.assets/image-20220415182508434.png)

### 自定义对象

![image-20220415182549266](https://note-img54.oss-cn-hongkong.aliyuncs.com/note/Javaweb/Javaweb.assets/image-20220415182549266.png)

![image-20220415190250689](https://note-img54.oss-cn-hongkong.aliyuncs.com/note/Javaweb/Javaweb.assets/image-20220415190250689.png)

### BOM 对象

![image-20220415190330639](https://note-img54.oss-cn-hongkong.aliyuncs.com/note/Javaweb/Javaweb.assets/image-20220415190330639.png)

#### Window 窗口对象

![image-20220415190728526](https://note-img54.oss-cn-hongkong.aliyuncs.com/note/Javaweb/Javaweb.assets/image-20220415190728526.png)

```html
<script>

    // alert
    window.alert( "abc" );
    alert("bbb" );

    // confirm，点击确定按钮，返回true，点击取消按钮，返回false
    var flag = confirm("确认删除? ");
    alert(flag);
    if(flag){
        //删除逻辑
    }

</script>
```

```html
<script>
	/*
    setTimeout(function,毫秒值):在一定的时间间隔后执行一个function，只执行一次
    setInterval(function,毫秒值):在一定的时间间隔后执行一个function，循环执行*/

    // 三秒弹一次，只弹一次
    setTimeout(function (){
        alert( "hehe");
    },3000);

    // 两秒弹一次，循环弹
    setInterval(function (){
        alert( "hehe");
    },2000);


</script>
```

#### 定时器案例

```html
<body>

<input type="button" onclick="on()" value="开灯">
<img id="myImage" border="0" src="../imgs/off.gif" style="text-align:center;">
<input type="button" onclick="off()" value="关灯">

<script>

    function on(){
        document.getElementById('myImage').src='../imgs/on.gif';
    }

    function off(){
        document.getElementById('myImage').src='../imgs/off.gif'
    }
    var x = 0;

    // 根据一个变化的数字，产生固定个数的值； 2  x % 2     3   x % 3
    //定时器
    setInterval(function (){

        if(x % 2 == 0){
            on();
        }else {
            off();
        }

        x ++;

    },1000);

</script>
</body>
```

### History 对象

![image-20220415194850127](https://note-img54.oss-cn-hongkong.aliyuncs.com/note/Javaweb/Javaweb.assets/image-20220415194850127.png)

### Location 对象

![image-20220415195043301](https://note-img54.oss-cn-hongkong.aliyuncs.com/note/Javaweb/Javaweb.assets/image-20220415195043301.png)

```html
<script>
/*

    alert("要跳转了");
    location.href = "https://www.baidu.com";

*/


    //3秒跳转到首页

    document.write("3秒跳转到首页...");
    setTimeout(function (){
        location.href = "https://www.baidu.com"
    },3000);

</script>
```



# HTTP

![image-20220509220512101](https://note-img54.oss-cn-hongkong.aliyuncs.com/note/Javaweb/Javaweb.assets/image-20220509220512101.png)



## 响应的常见格式

![image-20220520185537963](https://note-img54.oss-cn-hongkong.aliyuncs.com/note/Javaweb/Javaweb.assets/image-20220520185537963.png)

## Tomcat

![image-20220520190804229](https://note-img54.oss-cn-hongkong.aliyuncs.com/note/Javaweb/Javaweb.assets/image-20220520190804229.png)

### Tomcat 使用

![image-20220520191219128](https://note-img54.oss-cn-hongkong.aliyuncs.com/note/Javaweb/Javaweb.assets/image-20220520191219128.png)

**startup.bat 闪退的解决**

在文件头加入下面两行：

SET JAVA_HOME=C:\Program Files (x86)\Java\jdk1.8.0_121（java jdk目录）
SET TOMCAT_HOME=E:\Xiamen Ligong\web lesson\Tomcat\apache-tomcat-8.5.78（tomcat文件目录）



### 基本使用

![image-20220520193524968](https://note-img54.oss-cn-hongkong.aliyuncs.com/note/Javaweb/Javaweb.assets/image-20220520193524968.png)

### Tomcat 部署项目

![image-20220520204219344](https://note-img54.oss-cn-hongkong.aliyuncs.com/note/Javaweb/Javaweb.assets/image-20220520204219344.png)



### IDEA 中创建 Maven Web项目

![image-20220520204619478](https://note-img54.oss-cn-hongkong.aliyuncs.com/note/Javaweb/Javaweb.assets/image-20220520204619478.png)

#### 两种方式：

- 使用骨架
- 不使用骨架



使用骨架

<img src="https://note-img54.oss-cn-hongkong.aliyuncs.com/note/Javaweb/Javaweb.assets/image-20220520204821569.png" alt="image-20220520204821569" style="zoom:200%;" />

![image-20220520210050221](https://note-img54.oss-cn-hongkong.aliyuncs.com/note/Javaweb/Javaweb.assets/image-20220520210050221.png)

![image-20220520210220439](https://note-img54.oss-cn-hongkong.aliyuncs.com/note/Javaweb/Javaweb.assets/image-20220520210220439.png)



不使用骨架

<img src="https://note-img54.oss-cn-hongkong.aliyuncs.com/note/Javaweb/Javaweb.assets/image-20220520204741113.png" alt="image-20220520204741113" style="zoom:200%;" />



#### IDEA 中使用 Tomcat

两种方式：

1. 集成本地Tomcat
2. Tomcat Maven 插件

![image-20220520210741076](https://note-img54.oss-cn-hongkong.aliyuncs.com/note/Javaweb/Javaweb.assets/image-20220520210741076.png)



![image-20220520211620021](https://note-img54.oss-cn-hongkong.aliyuncs.com/note/Javaweb/Javaweb.assets/image-20220520211620021.png)



## Servlet

![image-20220520212044624](https://note-img54.oss-cn-hongkong.aliyuncs.com/note/Javaweb/Javaweb.assets/image-20220520212044624.png)



### 快速入门

![image-20220520212509386](https://note-img54.oss-cn-hongkong.aliyuncs.com/note/Javaweb/Javaweb.assets/image-20220520212509386.png)



### 五个方法

> 后两个用的少

![image-20220521101141861](https://note-img54.oss-cn-hongkong.aliyuncs.com/note/Javaweb/Javaweb.assets/image-20220521101141861.png)





### Servlet 执行流程![image-20220520213727956](https://note-img54.oss-cn-hongkong.aliyuncs.com/note/Javaweb/Javaweb.assets/image-20220520213727956.png)

### Servlet 生命周期

![image-20220520214059978](https://note-img54.oss-cn-hongkong.aliyuncs.com/note/Javaweb/Javaweb.assets/image-20220520214059978.png)



```java
@WebServlet(urlPatterns = "/demo2", loadOnStartup = 1)
public class ServletDemo2 implements Servlet {

    /**
     * 初始化方法
     * 1. 调用时机：
     *      默认情况下：Servlet 被第一次访问时调用
     *      可以配置loadOnStartup：
     *          默认 -1
     *          改为 0 或正整数可以在服务器启动时创建 Servlet对象，数字越小优先级越高
     * 2. 调用次数：1
     * @param servletConfig
     * @throws ServletException
     */
    @Override
    public void init(ServletConfig servletConfig) throws ServletException {
        System.out.println("init 方法执行~");
    }

    /**
     * 提供服务
     * 1. 调用时机：每一次 Servlet 被访问时调用
     * 2. 调用次数：多次
     * @param servletRequest
     * @param servletResponse
     * @throws ServletException
     * @throws IOException
     */
    @Override
    public void service(ServletRequest servletRequest, ServletResponse servletResponse) throws ServletException, IOException {
        System.out.println("hello world~~~~~~~~~~");
    }

    /**
     * 销毁方法
     * 1. 调用时机：内存释放或者服务器关闭的时候，Servlet 对象会被销毁，那时调用
     * 2. 调用次数：1
     */
    @Override
    public void destroy() {
        System.out.println("destory~!!");
    }
```

终端输入  mvn tomcat7:run 可以手动开启

再ctrl   c 可以结束，这时候destory也会输出

![image-20220521100703798](https://note-img54.oss-cn-hongkong.aliyuncs.com/note/Javaweb/Javaweb.assets/image-20220521100703798.png)

![image-20220521100756776](https://note-img54.oss-cn-hongkong.aliyuncs.com/note/Javaweb/Javaweb.assets/image-20220521100756776.png)



### Servlet 体系结构

继承 HttpServlet 就能根据 get 或 post 来分发请求

![image-20220521103224094](https://note-img54.oss-cn-hongkong.aliyuncs.com/note/Javaweb/Javaweb.assets/image-20220521103224094.png)

### Servlet urlPattern配置

```java
/**
 * urlPattern 一个Servlet 可以配置多个访问路径
 * @author 小火娃
 */
@WebServlet(urlPatterns = {"/demo7", "/demo8"})
public class ServletDemo7 extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        System.out.println("demo7   do get");
    }
}
```

![image-20220521103418658](https://note-img54.oss-cn-hongkong.aliyuncs.com/note/Javaweb/Javaweb.assets/image-20220521103418658.png)

#### 配置规则

- 如果一个路径同时满足精确匹配和目录匹配时，精确匹配优先级高
- 扩展名匹配的路径<font color="red">不能以 `/ `开头</font>

![image-20220521105013618](https://note-img54.oss-cn-hongkong.aliyuncs.com/note/Javaweb/Javaweb.assets/image-20220521105013618.png)

![image-20220521103846981](https://note-img54.oss-cn-hongkong.aliyuncs.com/note/Javaweb/Javaweb.assets/image-20220521103846981.png)

> tomcat默认的 / 可以访问一些静态资源，如果覆盖了就不行了，所以一般不写“/”或者“/*”

![image-20220521104904372](https://note-img54.oss-cn-hongkong.aliyuncs.com/note/Javaweb/Javaweb.assets/image-20220521104904372.png)



### 老版本用xml方式配置Servlet（还是用注解方便）

![image-20220521105204000](https://note-img54.oss-cn-hongkong.aliyuncs.com/note/Javaweb/Javaweb.assets/image-20220521105204000.png)



## Request & Response

![image-20220521105511433](https://note-img54.oss-cn-hongkong.aliyuncs.com/note/Javaweb/Javaweb.assets/image-20220521105511433.png)



### Request

#### Request 继承体系

![image-20220521110047196](https://note-img54.oss-cn-hongkong.aliyuncs.com/note/Javaweb/Javaweb.assets/image-20220521110047196.png)



#### Request 获取请求数据

![image-20220521111703692](https://note-img54.oss-cn-hongkong.aliyuncs.com/note/Javaweb/Javaweb.assets/image-20220521111703692.png)



Request 获取请求行数据

```java
@WebServlet("/req1")
public class RequestDemo1 extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        // 我访问的路径：http://localhost:8080/web-demo/req1?username=zhangsan&password=123

        // String getMethod():获取请求方式————GET
        String method = req.getMethod();
        System.out.println(method);

        // String getContextPath(): 获取虚拟目录（项目访问路径）————/web-demo
        String contextPath = req.getContextPath();
        System.out.println(contextPath);

        // StringBuffer getRequestURL():获取URL（统一资源定位符）————http://localhost:8080/web-demo/req1
        StringBuffer url = req.getRequestURL();
        System.out.println(url);

        // String getRequestURI():获取uri （统一资源标识符）————/web-demo/req1
        String uri = req.getRequestURI();
        System.out.println(uri);

        // String getQueryString():获取请求参数（get方式）————username=zhangsan&password=123
        String queryString = req.getQueryString();
        System.out.println(queryString);
    }
}
```

doGet里获取请求头里的user-agent

```java
//-----------
// 获取请求头里的user-agent：浏览器版本信息
String agent = req.getHeader("user-agent");
System.out.println(agent);
```

doPost 里获取post 的请求体：请求参数

```java
protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

    // 获取post 的请求体：请求参数

    // 1. 获取字符输入流
    BufferedReader reader = req.getReader();
    // 2. 读取数据
    String line = reader.readLine();
    System.out.println(line);
}
```



> Request 通用方式获取请求参数

request会把参数打包成个map，键是String，values是个字符串数组

调用下面三种方法可以获取值

1. `getParameterMap()`——返回map
2. `getParameterValues(String  name)`——返回字符串数组
3. `getParameter(String  name)`——返回字符串（如果已经知道这个name只对应一个值，用这个）

![image-20220603100600468](https://note-img54.oss-cn-hongkong.aliyuncs.com/note/Javaweb/Javaweb.assets/image-20220603100600468.png)

```java
protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
    // get 的请求逻辑
    System.out.println("get ....");

    // 获取所有参数的map集合
    Map<String, String[]> map = req.getParameterMap();
    for (String key: map.keySet()) {
        // 用 name:zhangsan 这样的形式输出
        System.out.print(key + ":");

        String[] values = map.get(key);
        for (String value : values) {
            System.out.print(value + " ");

        }
        System.out.println();
    }

    // 用getParameterValues通过key来拿到一个字符串数组
    System.out.println("用getParameterValues通过key来拿到一个字符串数组----------");
    String[] hobbies = req.getParameterValues("hobby");
    for (String hobby : hobbies) {
        System.out.println("hobby:" + hobby);
    }

    // 根据key拿到单个值
    System.out.println("根据key拿到单个值----------");
    String username = req.getParameter("username");
    String password = req.getParameter("password");
    System.out.println(username);
    System.out.println(password);
}

@Override
protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        
        this.doGet(req, resp);
    }
```



---

idea改模板可以快速创建servlet

![image-20220603153738795](https://note-img54.oss-cn-hongkong.aliyuncs.com/note/Javaweb/Javaweb.assets/image-20220603153738795.png)

---

#### Request 中文乱码问题

![image-20220603160850180](https://note-img54.oss-cn-hongkong.aliyuncs.com/note/Javaweb/Javaweb.assets/image-20220603160850180.png)

![image-20220603161012603](https://note-img54.oss-cn-hongkong.aliyuncs.com/note/Javaweb/Javaweb.assets/image-20220603161012603.png)



##### 乱码解决原理

```java
import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;

/**
 * @author 小火娃
 * @project_name: IDEA-Javaweb_workspace
 * @package_name: xyz.xiaohuowa.web2
 */
public class UrlDemo {
    public static void main(String[] args) throws UnsupportedEncodingException {
        String username = "张三";

        // 1. URL编码（浏览器自动用utf8的）
        String en = URLEncoder.encode(username, "utf8");
        System.out.println(en);

        // 2. URL解码（模拟tomcat使用 ISO-8859-1 来解码，就会出现乱码）
        String decode = URLDecoder.decode(en, "ISO-8859-1");
        System.out.println(decode);

        // 3. 将乱码转为字节数据————编码
        byte[] bytes = decode.getBytes(StandardCharsets.ISO_8859_1);

        // 4. 将字节数组转为 utf8 字符串————解码
        String s = new String(bytes, StandardCharsets.UTF_8);
        System.out.println(s);
    }
}
```



解决tomcat乱码

> username = new String(username.getBytes(StandardCharsets.ISO_8859_1), StandardCharsets.UTF_8);



```java
protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
    // 1. 解决乱码POST.getReader()。因为post是这种流的形式，所以可以直接设置编码
    request.setCharacterEncoding("utf8");

    // 获取username
    String username = request.getParameter("username");
    System.out.println(username);

    // // 2. 解决GET的乱码问题。通过将乱码转字节数组，再用utf8编码回来即可
    // byte[] bytes = username.getBytes(StandardCharsets.ISO_8859_1);
    //
    // // 3. 用 utf8 转回来
    // username = new String(bytes, StandardCharsets.UTF_8);

    
    // 2和3 可以整合成一句来写，这句通用，POST和GET的乱码都能解决
    username = new String(username.getBytes(StandardCharsets.ISO_8859_1), StandardCharsets.UTF_8);
    
    System.out.println(username);
}
```



#### 请求转发

![image-20220603161611054](https://note-img54.oss-cn-hongkong.aliyuncs.com/note/Javaweb/Javaweb.assets/image-20220603161611054.png)



## Response

![image-20220603161718565](https://note-img54.oss-cn-hongkong.aliyuncs.com/note/Javaweb/Javaweb.assets/image-20220603161718565.png)



### Response 设置响应数据功能介绍

![image-20220603162031661](https://note-img54.oss-cn-hongkong.aliyuncs.com/note/Javaweb/Javaweb.assets/image-20220603162031661.png)

### 重定向

动态获取虚拟目录地址   /web-demo

`String contextPath = request.getContextPath();`



![image-20220603164446786](https://note-img54.oss-cn-hongkong.aliyuncs.com/note/Javaweb/Javaweb.assets/image-20220603164446786.png)



```java
protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
    System.out.println("resp1.........");

    // // 重定向
    // // 设置状态码302
    // response.setStatus(302);
    //
    // // 设置响应头 location
    // response.setHeader("location", "/web-demo/resp2");

    // 简化方式完成重定向
    // 动态获取虚拟目录地址   /web-demo
    String contextPath = request.getContextPath();

    response.sendRedirect("/web-demo/resp2");
}
```



### Response 响应字符数据

![image-20220603195354936](https://note-img54.oss-cn-hongkong.aliyuncs.com/note/Javaweb/Javaweb.assets/image-20220603195354936.png)



```java
protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
    response.setContentType("text/html; charset=UTF-8");

    // 获取字符输出流
    PrintWriter writer = response.getWriter();

    writer.write("你好啊");
    writer.write("<h1>我在测试哈哈</h1>");

}
```



### Response 响应字节数据

![image-20220603195910429](https://note-img54.oss-cn-hongkong.aliyuncs.com/note/Javaweb/Javaweb.assets/image-20220603195910429.png)



```java
protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
    // 读取文件
    FileInputStream fileInputStream = new FileInputStream("这里放一个绝对路径");

    // 获取response字节输出流
    ServletOutputStream os = response.getOutputStream();

    IOUtils.copy(fileInputStream, os);

    fileInputStream.close();

}
```



## SQLSessionFactory工具类

- 最好是只返回工厂，sqlSession在需要的时候再各自创建

![image-20220603204610586](https://note-img54.oss-cn-hongkong.aliyuncs.com/note/Javaweb/Javaweb.assets/image-20220603204610586.png)





# JSP

## 是什么

![image-20220603205307626](https://note-img54.oss-cn-hongkong.aliyuncs.com/note/Javaweb/Javaweb.assets/image-20220603205307626.png)



## JSP 入门

![image-20220603205436909](https://note-img54.oss-cn-hongkong.aliyuncs.com/note/Javaweb/Javaweb.assets/image-20220603205436909.png)



## JSP 原理

![image-20220603205832883](https://note-img54.oss-cn-hongkong.aliyuncs.com/note/Javaweb/Javaweb.assets/image-20220603205832883.png)



## JSP 脚本

![image-20220603210152959](https://note-img54.oss-cn-hongkong.aliyuncs.com/note/Javaweb/Javaweb.assets/image-20220603210152959.png)



## JSP 发展过程（已经落后了）

![image-20220603212004365](https://note-img54.oss-cn-hongkong.aliyuncs.com/note/Javaweb/Javaweb.assets/image-20220603212004365.png)



# EL 表达式

从域中拿数据

- 四个域的域对象都有setAttribute可以把键值对放进对应域中

![image-20220603213249580](https://note-img54.oss-cn-hongkong.aliyuncs.com/note/Javaweb/Javaweb.assets/image-20220603213249580.png)



# JSTL

![image-20220603213545314](https://note-img54.oss-cn-hongkong.aliyuncs.com/note/Javaweb/Javaweb.assets/image-20220603213545314.png)



## JSTL 入门

![image-20220603213618419](https://note-img54.oss-cn-hongkong.aliyuncs.com/note/Javaweb/Javaweb.assets/image-20220603213618419.png)

![image-20220603214050673](https://note-img54.oss-cn-hongkong.aliyuncs.com/note/Javaweb/Javaweb.assets/image-20220603214050673.png)

- 注意foreach里面的 varStatus。因为如果要输出一些编号的话，单从数据库里面数据的id是不一定连续的，所以在循环的时候可以加上status来计数，可以输出连续id

  1. index >> 从0开始

     ![image-20220603214957516](https://note-img54.oss-cn-hongkong.aliyuncs.com/note/Javaweb/Javaweb.assets/image-20220603214957516.png)

  2. count >> 从1开始![image-20220603215030933](https://note-img54.oss-cn-hongkong.aliyuncs.com/note/Javaweb/Javaweb.assets/image-20220603215030933.png)

![image-20220603214737818](https://note-img54.oss-cn-hongkong.aliyuncs.com/note/Javaweb/Javaweb.assets/image-20220603214737818.png)



# MVC 模式



![image-20220603215330506](https://note-img54.oss-cn-hongkong.aliyuncs.com/note/Javaweb/Javaweb.assets/image-20220603215330506.png)

# 三层架构

![image-20220603215640902](https://note-img54.oss-cn-hongkong.aliyuncs.com/note/Javaweb/Javaweb.assets/image-20220603215640902.png)



# MVC和三层架构关系

- MVC 是一个大的概念
- 三层架构可以理解为对MVC的实现思想
  - 编码尽可能遵循三层架构的逻辑

![image-20220603215755612](https://note-img54.oss-cn-hongkong.aliyuncs.com/note/Javaweb/Javaweb.assets/image-20220603215755612.png)





# 综合案例

![image-20220603222835648](https://note-img54.oss-cn-hongkong.aliyuncs.com/note/Javaweb/Javaweb.assets/image-20220603222835648.png)



![image-20220604084606625](https://note-img54.oss-cn-hongkong.aliyuncs.com/note/Javaweb/Javaweb.assets/image-20220604084606625.png)

![image-20220604113323311](https://note-img54.oss-cn-hongkong.aliyuncs.com/note/Javaweb/Javaweb.assets/image-20220604113323311.png)

![image-20220604113951180](https://note-img54.oss-cn-hongkong.aliyuncs.com/note/Javaweb/Javaweb.assets/image-20220604113951180.png)



# ⚠会话跟踪技术

![image-20220604114914157](https://note-img54.oss-cn-hongkong.aliyuncs.com/note/Javaweb/Javaweb.assets/image-20220604114914157.png)



## cookie

### cookie 的基本使用

![image-20220604152613292](https://note-img54.oss-cn-hongkong.aliyuncs.com/note/Javaweb/Javaweb.assets/image-20220604152613292.png)



### cookie 原理

![image-20220604153300432](https://note-img54.oss-cn-hongkong.aliyuncs.com/note/Javaweb/Javaweb.assets/image-20220604153300432.png)



### cookie 存活时间、存储中文

url编码

```java
String value = "张三";
//URL编码
value = URLEncoder.encode(value, "UTF-8");
System.out.println("存储数据："+value);

Cookie cookie = new Cookie("username",value);
```

url解码

```java
//1. 获取Cookie数组
Cookie[] cookies = request.getCookies();

//2. 遍历数组
for (Cookie cookie : cookies) {
    //3. 获取数据
    String name = cookie.getName();
    if("username".equals(name)){
        String value = cookie.getValue();
        //URL解码
        value = URLDecoder.decode(value,"UTF-8");


        System.out.println(name+":"+value);

        break;
    }
}
```

![image-20220604154212536](https://note-img54.oss-cn-hongkong.aliyuncs.com/note/Javaweb/Javaweb.assets/image-20220604154212536.png)



## session

### session 的基本使用

![image-20220604163834615](https://note-img54.oss-cn-hongkong.aliyuncs.com/note/Javaweb/Javaweb.assets/image-20220604163834615.png)

### session 原理

1. 在第一次请求的时候，会创建新的session，响应回客户端会传回cookie键为 JSESSIONID ，的一个cookie
2. 下次来访问的时候会带上cookie里的JSESSIONID，再创建的session对象就是原来的对象了



![image-20220604165133283](https://note-img54.oss-cn-hongkong.aliyuncs.com/note/Javaweb/Javaweb.assets/image-20220604165133283.png)



### session的使用细节

- 在web.xml内可以配置销毁时间，单位分钟。

![image-20220604170106452](https://note-img54.oss-cn-hongkong.aliyuncs.com/note/Javaweb/Javaweb.assets/image-20220604170106452.png)

## Cookie 、 Session总结

cookie一般用来登录的，session一般是登录完的操作

![image-20220604170730187](https://note-img54.oss-cn-hongkong.aliyuncs.com/note/Javaweb/Javaweb.assets/image-20220604170730187.png)

## 案例：登录注册

![image-20220604171016847](https://note-img54.oss-cn-hongkong.aliyuncs.com/note/Javaweb/Javaweb.assets/image-20220604171016847.png)



![image-20220605110615723](https://note-img54.oss-cn-hongkong.aliyuncs.com/note/Javaweb/Javaweb.assets/image-20220605110615723.png)





![image-20220605115442884](https://note-img54.oss-cn-hongkong.aliyuncs.com/note/Javaweb/Javaweb.assets/image-20220605115442884.png)



![image-20220605120640928](https://note-img54.oss-cn-hongkong.aliyuncs.com/note/Javaweb/Javaweb.assets/image-20220605120640928.png)

 ![image-20220605122144399](https://note-img54.oss-cn-hongkong.aliyuncs.com/note/Javaweb/Javaweb.assets/image-20220605122144399.png)

![image-20220605123900890](https://note-img54.oss-cn-hongkong.aliyuncs.com/note/Javaweb/Javaweb.assets/image-20220605123900890.png)

![image-20220605124449637](https://note-img54.oss-cn-hongkong.aliyuncs.com/note/Javaweb/Javaweb.assets/image-20220605124449637.png)

显示验证码

```html
<tr>
    <td>验证码</td>
    <td class="inputs">
        <input name="checkCode" type="text" id="checkCode">
        <img id="checkCodeImg" src="/brand-demo/checkCodeServlet">
        <a href="#" id="changeImg">看不清？</a>
    </td>
</tr>
```

点击图片和 “看不清” 切换验证码图片

```html
<script>
    document.getElementById("changeImg").onclick = function () {
        // 要带上毫秒值的参数，不然同样的路径会被浏览器缓存，就不能切换图片了
        document.getElementById("checkCodeImg").src = "/brand-demo/checkCodeServlet?" + new Date().getMilliseconds()
    }
    document.getElementById("checkCodeImg").onclick = function () {
        // 要带上毫秒值的参数，不然同样的路径会被浏览器缓存，就不能切换图片了
        document.getElementById("checkCodeImg").src = "/brand-demo/checkCodeServlet?" + new Date().getMilliseconds()
    }
</script>
```



![image-20220605160942748](https://note-img54.oss-cn-hongkong.aliyuncs.com/note/Javaweb/Javaweb.assets/image-20220605160942748.png)





# Filter 过滤器

![image-20220605162746236](https://note-img54.oss-cn-hongkong.aliyuncs.com/note/Javaweb/Javaweb.assets/image-20220605162746236.png)

## 快速入门

![image-20220605163241289](https://note-img54.oss-cn-hongkong.aliyuncs.com/note/Javaweb/Javaweb.assets/image-20220605163241289.png)



![image-20220605171202960](https://note-img54.oss-cn-hongkong.aliyuncs.com/note/Javaweb/Javaweb.assets/image-20220605171202960.png)

## Filter 执行流程

![image-20220605171443861](https://note-img54.oss-cn-hongkong.aliyuncs.com/note/Javaweb/Javaweb.assets/image-20220605171443861.png)



```java
@WebFilter("/*")
public class FilterDemo implements Filter {


    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {

        //1. 放行前，对 request数据进行处理（因为放行前可以对request进行操作）
        System.out.println("1.FilterDemo...");

        //放行
        chain.doFilter(request,response);
        
        //2. 放行后，对Response 数据进行处理（放行后response有内容了，可以对request进行操作）
        System.out.println("5.FilterDemo...");
    }

    @Override
    public void init(FilterConfig filterConfig) throws ServletException {

    }


    @Override
    public void destroy() {

    }
}
```



## Filter 拦截路径配置

![image-20220605172037227](https://note-img54.oss-cn-hongkong.aliyuncs.com/note/Javaweb/Javaweb.assets/image-20220605172037227.png)

## 过滤器链（过滤器执行顺序）

> #### 注解配置的filter，过滤器链的执行顺序是按过滤器类名（字符串）的自然排序

![image-20220605172226231](https://note-img54.oss-cn-hongkong.aliyuncs.com/note/Javaweb/Javaweb.assets/image-20220605172226231.png)



## 案例：登录验证

![image-20220701120733813](https://note-img54.oss-cn-hongkong.aliyuncs.com/note/Javaweb/Javaweb.assets/image-20220701120733813.png)



# Listener 监听器



![image-20220701121621939](https://note-img54.oss-cn-hongkong.aliyuncs.com/note/Javaweb/Javaweb.assets/image-20220701121621939.png)

![image-20220701122139960](https://note-img54.oss-cn-hongkong.aliyuncs.com/note/Javaweb/Javaweb.assets/image-20220701122139960.png)







# Ajax

![image-20220809111552923](https://note-img54.oss-cn-hongkong.aliyuncs.com/note/Javaweb/Javaweb.assets/image-20220809111552923.png)

![image-20220809113730547](https://note-img54.oss-cn-hongkong.aliyuncs.com/note/Javaweb/Javaweb.assets/image-20220809113730547.png)



## 同步和异步

![image-20220809113939452](https://note-img54.oss-cn-hongkong.aliyuncs.com/note/Javaweb/Javaweb.assets/image-20220809113939452.png)



## 快速入门（代码不用背，有地方复制）

> 从w3school上ajax的部分复制
>
> ~~~html
> <script>
>     // 1. 创建核心对象
>     var xhttp;
>     if (window.XMLHttpRequest) {
>         xhttp = new XMLHttpRequest();
>     } else {
>         // code for IE6, IE5
>         xhttp = new ActiveXObject("Microsoft.XMLHTTP");
>     }
> 
>     // 2. 发送请求
>     xhttp.open("GET", "http://localhost:8080/ajax-demo/ajaxServlet", true);
>     xhttp.send();
> 
>     // 3. 获取响应
>     xhttp.onreadystatechange = function() {
>         if (this.readyState == 4 && this.status == 200) {
>             alert(this.responseText)
>         }
>     };
> </script>
> ~~~
>
> 

![image-20220809114231972](https://note-img54.oss-cn-hongkong.aliyuncs.com/note/Javaweb/Javaweb.assets/image-20220809114231972.png)



## Axios 异步框架

![image-20220809142219076](https://note-img54.oss-cn-hongkong.aliyuncs.com/note/Javaweb/Javaweb.assets/image-20220809142219076.png)



### axios 快速入门

![image-20220809142258735](https://note-img54.oss-cn-hongkong.aliyuncs.com/note/Javaweb/Javaweb.assets/image-20220809142258735.png)



### axios 请求方式别名

~~~javascript
<script>
    /*axios({
        method:"post",
        url: "http://localhost:8080/ajax-demo/axiosServlet",
        data: "username=zhangsan"
    }).then(function (resp) {
        alert(resp.data)
    })*/
    axios.post("http://localhost:8080/ajax-demo/axiosServlet","username=nihao").then(function (resp) {
    alert(resp.data)
})
</script>
~~~



![image-20220809143445472](https://note-img54.oss-cn-hongkong.aliyuncs.com/note/Javaweb/Javaweb.assets/image-20220809143445472.png)





## JSON

![image-20220809144844423](https://note-img54.oss-cn-hongkong.aliyuncs.com/note/Javaweb/Javaweb.assets/image-20220809144844423.png)



### 基础语法

![image-20220809145406249](https://note-img54.oss-cn-hongkong.aliyuncs.com/note/Javaweb/Javaweb.assets/image-20220809145406249.png)

### JSON 数据和Java对象转换

> 用到`Fastjson`
>
> ~~~java
> public static void main(String[] args) {
>     // 将Java对象转JSON
>     User user = new User("zhangsan", 1);
> 
>     String jsonString = JSON.toJSONString(user);
>     System.out.println(jsonString);
> 
>     // 将JSON转Java对象
>     User object = JSON.parseObject(jsonString, User.class);
>     System.out.println(object);
> }
> ~~~

> ==注意==，在Servlet里的`request.getParameter`不能接受JSON数据，应该去获取post的请求体
>
> ~~~java
> protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
>     // request.getParameter不能接受JSON数据，应该去获取post的请求体
>     /* String brand = request.getParameter("brand");
>         Brand brandObj = JSON.parseObject(brand, Brand.class);*/
> 
>     BufferedReader reader = request.getReader();
>     String brand = reader.readLine();  // JSON只有一行，直接读出来就行
>     Brand brandObj = JSON.parseObject(brand, Brand.class);  // 转Java对象
> 
>     BrandService2 brandService2 = new BrandService2();
>     brandService2.addBrand(brandObj);
> 
>     // 响应成功标识，如果上面报错就不会到这里
>     response.getWriter().write("success");
> 
> 
> }
> ~~~
>
> 

![image-20220809145557713](https://note-img54.oss-cn-hongkong.aliyuncs.com/note/Javaweb/Javaweb.assets/image-20220809145557713.png)





# VUE

## 概述

![image-20220809173715332](https://note-img54.oss-cn-hongkong.aliyuncs.com/note/Javaweb/Javaweb.assets/image-20220809173715332.png)



## 快速入门

![image-20220809175812069](https://note-img54.oss-cn-hongkong.aliyuncs.com/note/Javaweb/Javaweb.assets/image-20220809175812069.png)

Vue 使用起来是比较简单的，总共分为如下三步：

1. **新建 HTML 页面，引入 Vue.js文件**

   ```html
   <script src="js/vue.js"></script>
   ```

2. **在JS代码区域，创建Vue核心对象，进行数据绑定**

   ```js
   new Vue({
       el: "#app",
       data() {
           return {
               username: ""
           }
       }
   });
   ```

   创建 Vue 对象时，需要传递一个 js 对象，而该对象中需要如下属性：

   * `el` ： 用来指定哪儿些标签受 Vue 管理。 该属性取值 `#app` 中的 `app` 需要是受管理的标签的id属性值
   * `data` ：用来定义数据模型
   * `methods` ：用来定义函数。这个我们在后面就会用到

3. **编写视图**

   ```html
   <div id="app">
       <input name="username" v-model="username" >
       {{username}}
   </div>
   ```

   `{{}}` 是 Vue 中定义的 `插值表达式` ，在里面写数据模型，到时候会将该模型的数据值展示在这个位置。

**整体代码如下：**

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
<div id="app">
    <input v-model="username">
    <!--插值表达式-->
    {{username}}
</div>
<script src="js/vue.js"></script>
<script>
    //1. 创建Vue核心对象
    new Vue({
        el:"#app",
        data(){  // data() 是 ECMAScript 6 版本的新的写法
            return {
                username:""
            }
        }

        /*data: function () {
            return {
                username:""
            }
        }*/
    });

</script>
</body>
</html>
```



### 1.3  Vue 指令

**指令：**HTML 标签上带有 v- 前缀的特殊属性，不同指令具有不同含义。例如：v-if，v-for…

常用的指令有：

| **指令**  | **作用**                                            |
| --------- | --------------------------------------------------- |
| v-bind    | 为HTML标签绑定属性值，如设置  href , css样式等      |
| v-model   | 在表单元素上创建双向数据绑定                        |
| v-on      | 为HTML标签绑定事件                                  |
| v-if      | 条件性的渲染某元素，判定为true时渲染,否则不渲染     |
| v-else    | 条件性的渲染某元素，判定为true时渲染,否则不渲染     |
| v-else-if | 条件性的渲染某元素，判定为true时渲染,否则不渲染     |
| v-show    | 根据条件展示某元素，区别在于切换的是display属性的值 |
| v-for     | 列表渲染，遍历容器的元素或者对象的属性              |



#### 1.3.1  v-bind & v-model 指令

<img src="https://note-img54.oss-cn-hongkong.aliyuncs.com/note/Javaweb/Javaweb.assets/image-20210831150101736.png" alt="image-20210831150101736" style="zoom:70%;" />

* **v-bind**

  该指令可以给标签原有属性绑定模型数据。这样模型数据发生变化，标签属性值也随之发生变化

  例如：

  ```html
  <a v-bind:href="url">百度一下</a>
  ```

  上面的 `v-bind:"`  可以简化写成 `:`  ，如下：

  ```html
  <!--
  	v-bind 可以省略
  -->
  <a :href="url">百度一下</a>
  ```

* **v-model**

  该指令可以给表单项标签绑定模型数据。这样就能实现双向绑定效果。例如：

  ```html
  <input name="username" v-model="username">
  ```

**代码演示：**

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
<div id="app">
    <a v-bind:href="url">点击一下</a>
    <a :href="url">点击一下</a>
    <input v-model="url">
</div>

<script src="js/vue.js"></script>
<script>
    //1. 创建Vue核心对象
    new Vue({
        el:"#app",
        data(){
            return {
                username:"",
                url:"https://www.baidu.com"
            }
        }
    });
</script>
</body>
</html>
```

通过浏览器打开上面页面，并且使用检查查看超链接的路径，该路径会根据输入框输入的路径变化而变化，这是因为超链接和输入框绑定的是同一个模型数据

<img src="https://note-img54.oss-cn-hongkong.aliyuncs.com/note/Javaweb/Javaweb.assets/image-20210831150945931.png" alt="image-20210831150945931" style="zoom:80%;" />

#### 1.3.2  v-on 指令

<img src="https://note-img54.oss-cn-hongkong.aliyuncs.com/note/Javaweb/Javaweb.assets/image-20210831151231955.png" alt="image-20210831151231955" style="zoom:70%;" />

我们在页面定义一个按钮，并给该按钮使用 `v-on` 指令绑定单击事件，html代码如下

```html
<input type="button" value="一个按钮" v-on:click="show()">
```

而使用 `v-on` 时还可以使用简化的写法，将 `v-on:` 替换成 `@`，html代码如下

```html
<input type="button" value="一个按钮" @click="show()">
```

上面代码绑定的 `show()` 需要在 Vue 对象中的 `methods` 属性中定义出来

```js
new Vue({
    el: "#app",
    methods: {
        show(){
            alert("我被点了");
        }
    }
});
```

> ==注意：`v-on:` 后面的事件名称是之前原生事件属性名去掉on。==
>
> 例如：
>
> * 单击事件 ： 事件属性名是 onclick，而在vue中使用是 `v-on:click`
> * 失去焦点事件：事件属性名是 onblur，而在vue中使用时 `v-on:blur`

**整体页面代码如下：**

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
<div id="app">
    <input type="button" value="一个按钮" v-on:click="show()"><br>
    <input type="button" value="一个按钮" @click="show()">
</div>
<script src="js/vue.js"></script>
<script>
    //1. 创建Vue核心对象
    new Vue({
        el:"#app",
        data(){
            return {
                username:"",
            }
        },
        methods:{
            show(){
                alert("我被点了...");
            }
        }
    });
</script>
</body>
</html>
```

#### 1.3.3  条件判断指令

<img src="https://note-img54.oss-cn-hongkong.aliyuncs.com/note/Javaweb/Javaweb.assets/image-20210831151904081.png" alt="image-20210831151904081" style="zoom:70%;" />

接下来通过代码演示一下。在 Vue中定义一个 `count` 的数据模型，如下

```js
//1. 创建Vue核心对象
new Vue({
    el:"#app",
    data(){
        return {
            count:3
        }
    }
});
```

现在要实现，当 `count` 模型的数据是3时，在页面上展示 `div1` 内容；当 `count` 模型的数据是4时，在页面上展示 `div2` 内容；`count` 模型数据是其他值时，在页面上展示 `div3`。这里为了动态改变模型数据 `count` 的值，再定义一个输入框绑定 `count` 模型数据。html 代码如下：

```html
<div id="app">
    <div v-if="count == 3">div1</div>
    <div v-else-if="count == 4">div2</div>
    <div v-else>div3</div>
    <hr>
    <input v-model="count">
</div>
```

**整体页面代码如下：**

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
<div id="app">
    <div v-if="count == 3">div1</div>
    <div v-else-if="count == 4">div2</div>
    <div v-else>div3</div>
    <hr>
    <input v-model="count">
</div>

<script src="js/vue.js"></script>
<script>
    //1. 创建Vue核心对象
    new Vue({
        el:"#app",
        data(){
            return {
                count:3
            }
        }
    });
</script>
</body>
</html>
```

通过浏览器打开页面并在输入框输入不同的值，效果如下

<img src="https://note-img54.oss-cn-hongkong.aliyuncs.com/note/Javaweb/Javaweb.assets/image-20210831154300325.png" alt="image-20210831154300325" style="zoom:80%;" />

然后我们在看看 `v-show` 指令的效果，如果模型数据 `count ` 的值是3时，展示 `div v-show` 内容，否则不展示，html页面代码如下

```html
<div v-show="count == 3">div v-show</div>
<br>
<input v-model="count">
```

浏览器打开效果如下：

<img src="https://note-img54.oss-cn-hongkong.aliyuncs.com/note/Javaweb/Javaweb.assets/image-20210831154547780.png" alt="image-20210831154547780" style="zoom:80%;" />

通过上面的演示，发现 `v-show` 和 `v-if` 效果一样，那它们到底有什么区别呢？我们根据浏览器的检查功能查看源代码

<img src="https://note-img54.oss-cn-hongkong.aliyuncs.com/note/Javaweb/Javaweb.assets/image-20210831154759672.png" alt="image-20210831154759672" style="zoom:80%;" />

通过上图可以看出 `v-show` 不展示的原理是给对应的标签添加 `display` css属性，并将该属性值设置为 `none` ，这样就达到了隐藏的效果。而 `v-if` 指令是条件不满足时根本就不会渲染。

#### 1.3.4  v-for 指令

<img src="https://note-img54.oss-cn-hongkong.aliyuncs.com/note/Javaweb/Javaweb.assets/image-20210831155204829.png" alt="image-20210831155204829" style="zoom:80%;" />

这个指令看到名字就知道是用来遍历的，该指令使用的格式如下：

```html
<标签 v-for="变量名 in 集合模型数据">
    {{变量名}}
</标签>
```

> ==注意：需要循环那个标签，`v-for` 指令就写在那个标签上。==

如果在页面需要使用到集合模型数据的索引，就需要使用如下格式：

```html
<标签 v-for="(变量名,索引变量) in 集合模型数据">
    <!--索引变量是从0开始，所以要表示序号的话，需要手动的加1-->
   {{索引变量 + 1}} {{变量名}}
</标签>
```

**代码演示：**

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
<div id="app">
    <div v-for="addr in addrs">
        {{addr}} <br>
    </div>

    <hr>
    <div v-for="(addr,i) in addrs">
        {{i+1}}--{{addr}} <br>
    </div>
</div>

<script src="js/vue.js"></script>
<script>

    //1. 创建Vue核心对象
    new Vue({
        el:"#app",
        data(){
            return {
                addrs:["北京","上海","西安"]
            }
        }
    });
</script>
</body>
</html>
```

通过浏览器打开效果如下

<img src="https://note-img54.oss-cn-hongkong.aliyuncs.com/note/Javaweb/Javaweb.assets/image-20210831155837801.png" alt="image-20210831155837801" style="zoom:80%;" />

### 1.4  生命周期 

生命周期的八个阶段：每触发一个生命周期事件，会自动执行一个生命周期方法，这些生命周期方法也被称为钩子方法。

<img src="https://note-img54.oss-cn-hongkong.aliyuncs.com/note/Javaweb/Javaweb.assets/image-20210831160239294.png" alt="image-20210831160239294" style="zoom:80%;" />

下图是 Vue 官网提供的从创建 Vue 到效果 Vue 对象的整个过程及各个阶段对应的钩子函数

<img src="https://note-img54.oss-cn-hongkong.aliyuncs.com/note/Javaweb/Javaweb.assets/image-20210831160335496.png" alt="image-20210831160335496" style="zoom:80%;" />

`mounted`：挂载完成，Vue初始化成功，HTML页面渲染成功。而以后我们会在该方法中==发送异步请求，加载数据。==





## Servlet代码优化

> 正常写Servlet的话，一个操作就要写一个，太麻烦了
>
> 可以写一个类继承HttpServlet，来代替HttpServlet，通过请求路径来分发。
>
> 只要让url的最后一段跟方法名同名就可以进行反射执行操作了

**BaseServlet**

```java
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;

/**
 * @author 小火娃
 * @project_name: IDEA-Javaweb_workspace
 * @package_name: com.xiaohuowa.web.servlet
 * 代替HttpServlet，通过请求路径来分发
 */
public class BaseServlet extends HttpServlet {

    @Override
    public void service(HttpServletRequest request, HttpServletResponse response){
        String uri = request.getRequestURI();
        // System.out.println(uri);

        int index = uri.lastIndexOf('/');
        String methodName = uri.substring(index + 1);  // 获取请求路径末尾的方法名

        // System.out.println(methodName);

        // this：谁调用我(this所在方法)，我(this)代表谁
        // 如果是BrandServlet调用的话就代表BrandServlet
        Class c = this.getClass();
        try {
            // 通过名字获取方法
            Method method = c.getDeclaredMethod(methodName, HttpServletRequest.class, HttpServletResponse.class);
            // 通过反射调用方法
            method.invoke(this, request, response);
        } catch (NoSuchMethodException e) {
            e.printStackTrace();
        } catch (InvocationTargetException e) {
            e.printStackTrace();
        } catch (IllegalAccessException e) {
            e.printStackTrace();
        }
    }
}
```



**BrandServlet**

```java
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * @author 小火娃
 * @project_name: IDEA-Javaweb_workspace
 * @package_name: com.xiaohuowa.web.servlet
 * 其他业务只要复制一份，修改一下@WebServlet后面的属性值即可
 */
@WebServlet("/brand/*")
public class BrandServlet extends BaseServlet{

    public void selectAll(HttpServletRequest request, HttpServletResponse response){
        System.out.println("brand selectAll");
    }
    public void add(HttpServletRequest request, HttpServletResponse response){
        System.out.println("brand add");
    }
}
```





## 分页查询算法

![image-20220818113630922](https://note-img54.oss-cn-hongkong.aliyuncs.com/note/Javaweb/Javaweb.assets/image-20220818113630922.png)

手动封一个Javabean，把总记录数和当前页数据一并打包发给前端

![image-20220818113927069](https://note-img54.oss-cn-hongkong.aliyuncs.com/note/Javaweb/Javaweb.assets/image-20220818113927069.png)

![image-20220818122242839](https://note-img54.oss-cn-hongkong.aliyuncs.com/note/Javaweb/Javaweb.assets/image-20220818122242839.png)

























