# Maven

![image-20220413210543237](https://s2.loli.net/2023/10/17/gioMYGvA4nTOp8t.png)

# Mybatis

比如说小于号不能在直接出现在xml内，可以用 &lt；来转义；也可以输入大写CD，用提示打出CDATA区，把内容直接输入就行

字符少用转义，多用CDATA区

![image-20220414093406057](https://s2.loli.net/2023/10/17/rBZif3zCxq8yIng.png)

## mybatis参数传递

![image-20220414100938432](https://s2.loli.net/2023/10/17/nM1WkuGmyZsCOqx.png)

### 参数封装

![image-20220414101112752](https://s2.loli.net/2023/10/17/sgQEVGL78ezvru4.png)

封装总结：复杂的直接加@Param来给个别名



# Spring

## 1. spring新注解  （本部分代码在spring_test_annotation文件中）

![image-20220510155206087](https://s2.loli.net/2023/10/17/PqcW9SnQFYzAEgu.png)

![image-20220510155156949](https://s2.loli.net/2023/10/17/CWfMYcGF6hm2Zej.png)

#### 主配置文件的配置：

```java
/**
 * 用类的方式来代替 applicationContext.xml
 * @author 小火娃
 */
// 标志该类是 Spring 的核心配置类，用类的方式来代替 applicationContext.xml
@Configuration

// <context:component-scan base-package="com.xiaohuowa"/>
@ComponentScan("com.xiaohuowa")

// <import resource="applicationContext-xxx.xml"/> 引入分的配置文件
//@Import({DataSourceConfiguration.class, xxx.class})  可以用 逗号 来分隔开多个分的配置文件
@Import({DataSourceConfiguration.class})
public class SpringConfiguration {

}
```

![image-20220510213423410](https://s2.loli.net/2023/10/17/AireMyPjCZvxR8E.png)

#### 分配置文件的配置:

- 读取外部文件
- 通过内部的属性来获取外部文件的值，再进行注入

![image-20220510213452732](https://s2.loli.net/2023/10/17/oCE39vuxQ52Phfb.png)

![image-20220510213549749](https://s2.loli.net/2023/10/17/2hEi78wKIjFLvcV.png)

![image-20220510213652895](https://s2.loli.net/2023/10/17/DMzTS3sKxvXIV8E.png)

##### 测试文件的写法：

- 主要要注意在 *AnnotationConfigApplicationContext(SpringConfiguration.class);* 的时候**类名不能加引号**

![image-20220510213731127](https://s2.loli.net/2023/10/17/9oyateuURYDM7nP.png)

## 2. spring 集成 Junit  （本部分代码在spring_test_annotation文件中）

<font color="red">**现有问题：**</font>

![image-20220510214604022](https://s2.loli.net/2023/10/17/9u1IXz5JiwDOt3B.png)

<font color="red">**解决思路：**</font>

![image-20220510214533528](https://s2.loli.net/2023/10/17/J1IHKspO2BY63Xd.png)

### spring 集成 Junit 步骤

- 导入坐标要 spring-junit 和 junit

![image-20220510214859928](https://s2.loli.net/2023/10/17/dcVFobZqpKeWQ7x.png)

```java
// RunWith 指定Spirng用某个内核来跑测试
@RunWith(SpringJUnit4ClassRunner.class)
//@ContextConfiguration("classpath:applicationContext.xml")  用xml方式
@ContextConfiguration(classes = {SpringConfiguration.class})  // 用全注解方式配置
public class SpringJunitTest2 {

    @Autowired
    private UserService userService;

    @Test
    public void test1(){
        userService.save();
    }
}
```

## 3. Spring 集成 web

[IDEA中出现异常: java.lang.NoClassDefFoundError: org/springframework/web/context/WebApplicationContext...._Thinkao~的博客-CSDN博客](https://blog.csdn.net/wangxinyao1997/article/details/88087564)

- 给项目创 web 模块

![img](https://img-blog.csdnimg.cn/43c0af18d3b34f9d845c6e33067e948f.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA5omO5ZOH5aSq5p6j57OV,size_20,color_FFFFFF,t_70,g_se,x_16)
