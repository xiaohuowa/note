## Spring提供获取应用上下文的工具

![image-20220529120555302](https://s2.loli.net/2023/10/17/fPlVy5C8aJQwE7F.png)

导坐标

```
<dependency>
    <groupId>org.springframework</groupId>
    <artifactId>spring-web</artifactId>
    <version>5.2.8.RELEASE</version>
</dependency>
```

web.xml 中配置监听器

```java
<!--配置全局初始化参数-->
<!--以后如果applicationContext.xml改名了，只需要在这里修改即可，其他地方用contextConfigLocation就可以动态修改了-->
<context-param>
    <param-name>contextConfigLocation</param-name>
    <param-value>classpath:applicationContext.xml</param-value>
</context-param>


<!--配置监听器-->
<listener>
    <listener-class>com.xiaohuowa.listener.ContextLoadListener</listener-class>
</listener>
```



## Spring MVC

![image-20220529160954767](https://s2.loli.net/2023/10/17/GYReIgDKniZqOvw.png)

### 开发步骤

![image-20220529161037468](https://s2.loli.net/2023/10/17/UqWkG5fMrn9KaH6.png)

### 流程图

![image-20220529165817260](https://s2.loli.net/2023/10/17/XdQPZLUDIsa4fjx.png)



### 执行流程

![image-20220529170122304](https://s2.loli.net/2023/10/17/KC83WkQNabhVXdL.png)

![image-20220529170840430](https://s2.loli.net/2023/10/17/DxZyfRjCkv1HAap.png) 



### 注解解析

#### @RequMapping

![image-20220529172108742](https://s2.loli.net/2023/10/17/As6D5ebKyXYzni7.png)



### XML配置解析

#### 视图解析器

![image-20220529173048608](https://s2.loli.net/2023/10/17/FXAMiexsvmfqVtJ.png)





















