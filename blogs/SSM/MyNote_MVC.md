# SpringMVC

## 简介概述

SpringMVC 也叫 Spring web mvc。是 Spring 框架的一部分，是在 Spring3.0 后发布的。

作 为 Spring 框 架 一 部 分 ， 能 够 使 用 Spring 的 IoC 和 Aop 。 方 便 整 合Strtus,MyBatis,Hiberate,JPA 等其他框架。



**SpringMVC** **强化注解的使用，在控制器，Service，Dao 都可以使用注解。方便灵活。**

使用@Controller 创建处理器对象,@Service 创建业务对象，@Autowired 或者@Resource

在控制器类中注入 Service, Service 类中注入 Dao。





## 编写步骤

### 一、通过模板创建工程

![image-20220910160542552](https://s2.loli.net/2023/10/17/aMGtLHYEnyziJqj.png)

### 二、**pom.xml**加入依赖

> 加入了`<artifactId>spring-webmvc</artifactId> `依赖之后，Spring的其他依赖也会被加入

~~~xml
依赖：
<dependency> 
    <groupId>javax.servlet</groupId> 
    <artifactId>javax.servlet-api</artifactId> 
    <version>3.1.0</version> <scope>provided</scope>
</dependency> 
<dependency> 
    <groupId>org.springframework</groupId> 
    <artifactId>spring-webmvc</artifactId> 
    <version>5.2.5.RELEASE</version>
</dependency>
插件：
<build> <plugins>
    <!-- 编码和编译和JDK版本 -->
    <plugin>
        <artifactId>maven-compiler-plugin</artifactId>
        <version>3.1</version>
        <configuration>
            <source>1.8</source>
            <target>1.8</target>
        </configuration>
    </plugin>
    </plugins>
</build>
~~~



### 三、配置web.xml

#### 注册中央调度器（DispatcherServlet）

> 在`web.xml`文件中注册

##### 启动即实例化中央调度器

需要在tomcat服务器启动后，创建DispatcherServlet对象的实例，所以设置`<load-on-startup>1</load-on-startup>`

##### 为啥要创建DispatcherServlet对象的实例？

因为DispatcherServlet在创建过程中，会同时创建springmvc容器对象，读取springmvc的配置文件，把这个配置文件中的对象都创建好， 当用户发起请求时就可以直接使用对象了。



##### 中央调度器读取SpringMVC配置文件

springmvc创建容器对象时，读取的配置文件默认是`/WEB-INF/<servlet-name>-servlet.xml`如果在这个位置没有同名配置文件的话就会报错

一般在开发中可以自定义配置文件路径，通过下面的代码来指定在resources目录下的名为`springmvc.xml`的是springMVC配置文件

~~~xml
<!--springmvc的配置文件的位置的属性-->
<param-name>contextConfigLocation</param-name>
<!--指定自定义文件的位置-->
<param-value>classpath:springmvc.xml</param-value>
~~~



##### \<url-pattern>的配置

使用框架的时候， url-pattern可以使用两种值

1. 语法 `*.xxxx` , xxxx是**自定义的扩展名**。 常用的方式 *.do, *.action, *.mvc等等，主要不能使用 *.jsp
   - 如：http://localhost:8080/myweb/some.do
2. 使用斜杠 "/"

~~~xml
<servlet>
    <servlet-name>myweb</servlet-name>
    <servlet-class>org.springframework.web.servlet.DispatcherServlet</servlet-class>
    <!--自定义springmvc读取的配置文件的位置-->
    <init-param>
        <!--springmvc的配置文件的位置的属性-->
        <param-name>contextConfigLocation</param-name>
        <!--指定自定义文件的位置-->
        <param-value>classpath:springmvc.xml</param-value>
    </init-param>
    <load-on-startup>1</load-on-startup>
</servlet>

<servlet-mapping>
    <servlet-name>myweb</servlet-name>
    <url-pattern>*.do</url-pattern>
</servlet-mapping>
~~~



#### 配置请求乱码解决的过滤器

通过自带的CharacterEncodingFilter过滤器实现请求响应的字符编码设定

~~~xml
<!--注册声明过滤器，解决post请求乱码的问题-->
<filter>
    <filter-name>characterEncodingFilter</filter-name>
    <filter-class>org.springframework.web.filter.CharacterEncodingFilter</filter-class>
    <!--设置项目中使用的字符编码-->
    <init-param>
        <param-name>encoding</param-name>
        <param-value>utf-8</param-value>
    </init-param>
    <!--强制请求对象（HttpServletRequest）使用encoding编码的值-->
    <init-param>
        <param-name>forceRequestEncoding</param-name>
        <param-value>true</param-value>
    </init-param>
    <!--强制应答对象（HttpServletResponse）使用encoding编码的值-->
    <init-param>
        <param-name>forceResponseEncoding</param-name>
        <param-value>true</param-value>
    </init-param>
</filter>
<filter-mapping>
    <filter-name>characterEncodingFilter</filter-name>
    <!-- /* :表示强制所有的请求先通过过滤器处理。-->
    <url-pattern>/*</url-pattern>
</filter-mapping>
~~~





### 四、**创建** **SpringMVC** **配置文件**

使用中央调度器中配置过的配置文件路径和文件名来创建SpringMVC 配置文件



#### 配置组件扫描器

~~~xml
<!--声明组件扫描器-->
<context:component-scan base-package="com.bjpowernode.controller" />
~~~



#### 配置视图解析器

把文件方法WEB-INF下直接访问就访问不到了，更安全一点

```xml
<!--声明 springmvc框架中的视图解析器， 帮助开发人员设置视图文件的路径-->
<bean  class="org.springframework.web.servlet.view.InternalResourceViewResolver">
    <!--前缀：视图文件的路径-->
    <property name="prefix" value="/WEB-INF/view/" />
    <!--后缀：视图文件的扩展名-->
    <property name="suffix" value=".jsp" />
</bean>
```





### 五、创建处理器

处理器其实就是个普通的类

在这个类上加入`@Controller`就表示当前类为处理器

#### @RequestMapping

请求映射，作用是把一个请求地址和一个方法绑定在一起。

在方法上加入@RequestMapping表示当前方法为处理器方法。该方法要对 value 属性所指定的 URI进行处理与响应,value的值必须是唯一的， 不能重复。 在使用时，推荐地址以“/”开头。（如果有多个请求路径都匹配同一个控制器方法的话，value可以写成数组形式）

被注解的方法的方法名可以随意。



#### 返回值ModelAndView 

返回值：ModelAndView 表示本次请求的处理结果

- Model: 数据，请求处理完成后，要显示给用户的数据
- View: 视图， 比如jsp等等。

ModelAndView 类中的 addObject()方法用于向其 Model 中添加数据。Model 的底层为一个 HashMap。

Model 中的数据存储在 request 作用域中，SringMVC 默认采用转发的方式跳转到视图，本次请求结束，模型中的数据被销毁。

通过setViewName方法来指定视图的完整路径，如果配置了[视图解析器](# 配置视图解析器)的话，就可以直接返回文件的逻辑名称

```java
@RequestMapping("/some.do")
public ModelAndView doSome(){
    ModelAndView mv  = new ModelAndView();
    //添加数据， 框架在请求的最后把数据放入到request作用域。
    //下面这行相当于是request.setAttribute("msg","欢迎使用springmvc");
    mv.addObject("msg","欢迎使用springmvc");

    //指定视图, 指定视图的完整路径（在没配置视图解析器的时候）
    //框架对视图执行的forward操作， request.getRequestDispather("/show.jsp).forward(...)
    //mv.setViewName("/show.jsp");
    //mv.setViewName("/WEB-INF/view/show.jsp");
    //mv.setViewName("/WEB-INF/view/other.jsp");


    //当配置了视图解析器后，可以使用逻辑名称（文件名），指定视图
    //框架会使用视图解析器的前缀 + 逻辑名称 + 后缀 组成完成路径， 这里就是字符连接操作
    ///WEB-INF/view/ + show + .jsp
    mv.setViewName("show");

    //返回mv
    return mv;
}
```



## **使用** **SpringMVC** **框架** **web** **请求处理顺序**

![image-20220910163032744](https://s2.loli.net/2023/10/17/jH1QgKc4xRr6hLU.png)



### 执行流程

![image-20220910163231182](https://s2.loli.net/2023/10/17/WMCeFQGETcVnAgb.png)



（1）浏览器提交请求到中央调度器
（2）中央调度器直接将请求转给处理器映射器。
（3）处理器映射器会根据请求，找到处理该请求的处理器，并将其封装为处理器执行链后
返回给中央调度器。
（4）中央调度器根据处理器执行链中的处理器，找到能够执行该处理器的处理器适配器。
（5）处理器适配器调用执行处理器。
（6）处理器将处理结果及要跳转的视图封装到一个对象 ModelAndView 中，并将其返回给
处理器适配器。
（7）处理器适配器直接将结果返回给中央调度器。
（8）中央调度器调用视图解析器，将 ModelAndView 中的视图名称封装为视图对象。
（9）视图解析器将封装了的视图对象返回给中央调度器
（10）中央调度器调用视图对象，让其自己进行渲染，即进行数据填充，形成响应对象。
（11）中央调度器响应浏览器。



## 注解式开发

### **@RequestMapping**

若请求具有相同的 URI 部分，则这些相同的 URI，可以被抽取到注解在类之上的@RequestMapping 的 value 属性中。此时的这个 URI 表示模块的名称。



### **处理器方法的参数**

1. HttpServletRequest
2. HttpServletResponse
3. HttpSession
4. 请求中所携带的请求参数



#### 参数的接收-单个接收

##### 如果请求参数名和请求处理方法的参数名相同

直接在形参位置写对应参数即可



##### 如果请求参数名和请求处理方法的参数名不同

在形参前加上`@RequestParam(“请求参数名”)`即可

```java
@RequestMapping(value = "/test.do")
public ModelAndView test(@RequestParam(value = "rname",required = false) String name,
                         @RequestParam(value = "rage",required = false) Integer age){
    System.out.println("name=" + name + "age=" + age);
    //可以在方法中直接使用 name ， age
    ModelAndView mv  = new ModelAndView();
    mv.addObject("myname",name);
    mv.addObject("myage",age);
    //show是视图文件的逻辑名称（文件名称）
    mv.setViewName("show");
    return mv;
}
```

`@RequestParam`可以加的参数如下图所示，如果没有将`required`改为false的话，默认的这个参数是必须的，没有会报错。也可以手动改成false，这样就不是必须的了

![image-20220910193100846](https://s2.loli.net/2023/10/17/T1Pu3Mcn5VaNQkw.png)

#### 参数的接收-对象接收

> 给一个类，类中的属性名和请求中的参数名一样
>
> 当这个类作为控制器方法的参数时，框架会创建对象，并调用set方法赋值

（其实也可以是List、Map、数组等等，不过对于前端传值的格式要求复杂，且用得少，所以没有学习）

~~~java
/**
     * 处理器方法形参是java对象， 这个对象的属性名和请求中参数名一样的
     * 框架会创建形参的java对象， 给属性赋值。 请求中的参数是name，框架会调用setName()
     * @return
     */
@RequestMapping(value = "/some.do")
public ModelAndView doSome(Student myStudent){
    System.out.println("receiveParam, name="+myStudent.getName()+"   age="+myStudent.getAge());
    
    ModelAndView mv  = new ModelAndView();
    mv.addObject("myname",myStudent.getName());
    mv.addObject("myage",myStudent.getAge());
    mv.addObject("mystudent",myStudent);
    
    //show是视图文件的逻辑名称（文件名称）
    mv.setViewName("show");
    return mv;
}
~~~





### 处理器方法返回值

使用@Controller 注解的处理器的处理器方法，其返回值常用的有四种类型：

1. ModelAndView
2. String
3. 无返回值 void
4. 返回自定义类型对象



#### ModelAndView

若处理器方法处理完后，需要`跳转`（forward）到其它资源，且又要在跳转的资源间传递数据，此时处理器方法返回 ModelAndView 比较好。当然，若要返回 ModelAndView，则处理器方法中需要定义 ModelAndView 对象。

在使用时，若该处理器方法只是进行跳转而不传递数据，或只是传递数据而并不向任何资源跳转（如对页面的 Ajax 异步响应），此时若返回 ModelAndView，则将总是有一部分多余：要么 Model 多余，要么 View 多余。即此时返回 ModelAndView 将不合适。





#### String（返回视图）

处理器方法返回的字符串可以指定逻辑视图名，通过视图解析器解析可以将其转换为物理视图地址

如果没有视图解析器的话：也可以直接返回资源的物理视图名



#### void

对于处理器方法返回 void 的应用场景，比如说AJAX 响应，通过HttpServletResponse输出数据。响应ajax请求。

若处理器对请求处理后，无需跳转到其它任何资源，此时可以让处理器方法返回 void。

##### 手工实现Ajax请求

有一些代码重复：

1. java对象转为json
2. 通过HttpServletResponse输出json数据

```java
//处理器方法返回void， 响应ajax请求
@RequestMapping(value = "/returnVoid-ajax.do")
public void doReturnVoidAjax(HttpServletResponse response, String name, Integer age) throws IOException {
    System.out.println("===doReturnVoidAjax====, name="+name+"   age="+age);
   //处理ajax， 使用json做数据的格式
   //service调用完成了， 使用Student表示处理结果
    Student student  = new Student();
    student.setName("张飞同学");
    student.setAge(28);

    String json = "";
    //把结果的对象转为json格式的数据
    if( student != null){
        ObjectMapper om  = new ObjectMapper();
        json  = om.writeValueAsString(student);
        System.out.println("student转换的json===="+json);
    }

    //输出数据，响应ajax的请求
    response.setContentType("application/json;charset=utf-8");
    PrintWriter pw  = response.getWriter();
    pw.println(json);
    pw.flush();
    pw.close();

}
```





#### 返回Object

处理器方法也可以返回 Object 对象。这个 Object 可以是 Integer，String，自定义对象，Map，List 等。

但返回的对象不是作为逻辑视图出现的，而是作为直接在页面显示的数据出现的。

返回对象，需要使用@ResponseBody 注解，将转换后的 JSON 数据放入到响应体中。

> `@responseBody注解`的作用是将controller的方法返回的对象通过适当的转换器转换为指定的格式之后，写入到response对象的body区，通常用来返回JSON数据或者是XML数据

##### 1. Jackson依赖

由于返回 Object 数据，一般都是将数据转化为了 JSON 对象后传递给浏览器页面的。而这个由 Object 转换为 JSON，是由 Jackson 工具完成的。所以需要导入 Jackson 的相关 Jar 包。

~~~xml
<dependency>
    <groupId>com.fasterxml.jackson.core</groupId>
    <artifactId>jackson-core</artifactId>
    <version>2.9.0</version>
</dependency> <dependency>
    <groupId>com.fasterxml.jackson.core</groupId>
    <artifactId>jackson-databind</artifactId>
    <version>2.9.0</version>
</dependency>
~~~



##### 2. **声明注解驱动**

> 注意注解要用`http://www.springframework.org/schema/mvc`下的`<mvc:annotation-driven/>`

将 Object 数据转化为 JSON 数据，需要由消息转换器 HttpMessageConverter 完成。而转换器的开启，需要由`<mvc:annotation-driven/>`来完成。在mvc配置文件中加入`<mvc:annotation-driven/>`即可。

---

注解驱动实现的功能是 完成java对象到json，xml， text，二进制等数据格式的转换。在`<mvc:annotation-driven/>`加入到springmvc配置文件后， 会自动创建HttpMessageConverter接口的7个实现类对象， 包括 MappingJackson2HttpMessageConverter （使用jackson工具库中的ObjectMapper实现java对象转为json字符串）

| **HttpMessageConverter** **接口实现类**   | **作用**                                                     |
| ----------------------------------------- | ------------------------------------------------------------ |
| ByteArrayHttpMessageConverter             | 负责读取二进制格式的数据和写出二进制格式的数据               |
| :star:StringHttpMessageConverter          | 负责读取字符串格式的数据和写出字符串格式的数据               |
| ResourceHttpMessageConverter              | 负责读取资源文件和写出资源文件数据                           |
| SourceHttpMessageConverter                | 能够读 / 写 来 自 HTTP 的 请 求 与 响 应 的javax.xml.transform.Source ,支持 DOMSource, SAXSource, 和 StreamSource 的 XML 格式 |
| AllEncompassingFormHttpMessageConverter   | 负责处理表单(form)数据                                       |
| Jaxb2RootElementHttpMessageConverter      | 使用 JAXB 负责读取和写入 xml 标签格式的数据                  |
| :star:MappingJackson2HttpMessageConverter | 负责读取和写入 json 格式的数据。利用Jackson 的 ObjectMapper 读写 json 数据，操作Object 类型数据，可读取 application/json，响应媒体类型为 application/json |





###### HttpMessageConverter接口

消息转换器

**功能：**

定义了java转为json，xml等数据格式的方法。 这个接口有很多的实现类。这些实现类完成 java对象到json， java对象到xml，java对象到二进制数据的转换

**方法：**

下面的canWrite和write方法是控制器类把结果输出给浏览器时使用的：

HttpMessageConverter接口源码

```java
public interface HttpMessageConverter<T> {
    boolean canRead(Class<?> var1, @Nullable MediaType var2);

    boolean canWrite(Class<?> var1, @Nullable MediaType var2);

    List<MediaType> getSupportedMediaTypes();

    T read(Class<? extends T> var1, HttpInputMessage var2) throws IOException, HttpMessageNotReadableException;

    void write(T var1, @Nullable MediaType var2, HttpOutputMessage var3) throws IOException, HttpMessageNotWritableException;
}
```



```java
//例如处理器方法
@RequestMapping(value = "/returnString.do")
public Student doReturnView2(HttpServletRequest request,String name, Integer age){
        Student student = new Student();
        student.setName("lisi");
        student.setAge(20);
        return student;
}
/*
1）canWrite作用检查处理器方法的返回值，能不能转为var2表示的数据格式。
  检查student(lisi，20)能不能转为var2表示的数据格式。如果检查能转为json，canWrite返回true
  MediaType：表示数格式的， 例如json， xml等等

2）write：把处理器方法的返回值对象，调用jackson中的ObjectMapper转为json字符串。
  相当于是：json  = om.writeValueAsString(student);
*/
```



###### 执行过程

```java
/**
 * 处理器方法返回一个Student，通过框架转为json，响应ajax请求
 * @ResponseBody:
 *    作用：把处理器方法返回对象转为json后，通过HttpServletResponse输出给浏览器。
 *    位置：方法的定义上面。 和其它注解没有顺序的关系。
 * 返回对象框架的处理流程：
 *  1. 框架会把返回Student类型，调用框架的中ArrayList<HttpMessageConverter>中每个类的
 * canWrite()方法，检查哪个HttpMessageConverter接口的实现类能处理Student类型的数据（找到了 
 * MappingJackson2HttpMessageConverter）
 *
 *  2.框架会调用实现类的write（），也就是MappingJackson2HttpMessageConverter的write()方法
 *    把李四同学的student对象转为json， 调用Jackson的ObjectMapper实现转为json
 *    contentType: application/json;charset=utf-8
 *
 *  3.框架会调用@ResponseBody把上面的json结果数据输出到浏览器， ajax请求处理完成
 */
```



##### 3. 在处理器方法上加入@ResponseBody注解

这个注解加在处理器方法的上面， 通过`HttpServletResponse`输出数据，响应ajax请求的。

~~~java
//相当于
PrintWriter pw  = response.getWriter();
pw.println(json);
pw.flush();
pw.close();
~~~





#### 返回List

和返回Object基本相同

~~~java
/**
     *  处理器方法返回List<Student>
     * 返回对象框架的处理流程：
     *  1. 框架会把返回List<Student>类型，调用框架的中ArrayList<HttpMessageConverter>中每个类的canWrite()方法
     *     检查那个HttpMessageConverter接口的实现类能处理Student类型的数据--MappingJackson2HttpMessageConverter
     *
     *  2.框架会调用实现类的write（）， MappingJackson2HttpMessageConverter的write()方法
     *    把李四同学的student对象转为json， 调用Jackson的ObjectMapper实现转为json array
     *    contentType: application/json;charset=utf-8
     *
     *  3.框架会调用@ResponseBody把2的结果数据输出到浏览器， ajax请求处理完成
     */
@RequestMapping(value = "/returnStudentJsonArray.do")
@ResponseBody
public List<Student> doStudentJsonObjectArray(String name, Integer age) {

    List<Student> list = new ArrayList<>();
    //调用service，获取请求结果数据 ， Student对象表示结果数据
    Student student = new Student();
    student.setName("李四同学");
    student.setAge(20);
    list.add(student);

    student = new Student();
    student.setName("张三");
    student.setAge(28);
    list.add(student);


    return list;

}
~~~



#### String（返回字符串，非视图）

##### 区分是返回字符串还是返回视图

如果有@ResponseBody注解，返回String就是数据，反之就是视图

##### 默认编码格式

默认是`text/plain;charset=ISO-8859-1`作为contentType,导致中文有乱码（没有经过过滤器，所以过滤器配置字符集编码在这里无效）

##### 修改默认编码格式

给`@RequestMapping`增加一个属性 `produces`, 使用这个属性指定新的`contentType`

~~~java
@RequestMapping(value = "/returnStringData.do",produces = "text/plain;charset=utf-8")
~~~



##### 代码实例与处理流程

```java
/**
 * 返回String 框架的处理流程：
 *  1. 框架会把返回String类型，调用框架的中ArrayList<HttpMessageConverter>中每个类的canWrite()方法
 *     检查那个HttpMessageConverter接口的实现类能处理String类型的数据--StringHttpMessageConverter
 *
 *  2.框架会调用实现类的write（）， StringHttpMessageConverter的write()方法
 *    把字符按照指定的编码处理 text/plain;charset=ISO-8859-1
 *
 *  3.框架会调用@ResponseBody把2的结果数据输出到浏览器， ajax请求处理完成
 */
@RequestMapping(value = "/returnStringData.do",produces = "text/plain;charset=utf-8")
@ResponseBody
public String doStringData(String name,Integer age){
    return "SpringMVC 返回String，表示数据";
}
```



## urlpattern问题

### 发起的请求是由哪些服务器程序处理的。

http://localhost:8080/项目名/index.jsp ：tomcat（jsp会转为servlet）
http://localhost:8080/项目名/js/jquery-3.4.1.js ： tomcat
http://localhost:8080/项目名/images/p1.jpg ： tomcat
http://localhost:8080/项目名/html/test.html： tomcat
http://localhost:8080/项目名/some.do ：  DispatcherServlet（springmvc框架处理的）

> tomcat本身能处理静态资源的访问， 像html， 图片， js文件都是静态资源

#### 为什么Tomcat有处理静态资源的能力？

tomcat的web.xml文件有一个servlet 名称是 default ， 在服务器启动时创建的。
 ~~~XML
 <servlet>
     <servlet-name>default</servlet-name>
     <servlet-class>org.apache.catalina.servlets.DefaultServlet</servlet-class>
     <init-param>
         <param-name>debug</param-name>
         <param-value>0</param-value>
     </init-param>
     <init-param>
         <param-name>listings</param-name>
         <param-value>false</param-value>
     </init-param>
     <load-on-startup>1</load-on-startup>
 </servlet>
 <servlet-mapping>
     <servlet-name>default</servlet-name>
     <url-pattern>/</url-pattern>  表示静态资源和未映射的请求都这个default处理
 </servlet-mapping>
 ~~~

Tomcat对这个叫default的Servlet作用的描述：

1. 处理静态资源
2. 处理未映射到其它servlet的请求

~~~
The default servlet for all web applications, that serves static  resources.  It processes all requests that are not mapped to other  servlets with servlet mappings (defined either here or in your own web.xml file).
~~~



### 给中央调度器urlpattern设为 `/` 

#### 静态资源404

如果项目中使用了 ` /` ，它会替代 tomcat中的default。导致所有的静态资源都给DispatcherServlet处理，而 默认情况下DispatcherServlet没有处理静态资源的能力。这样就没有控制器对象能处理静态资源的访问，所以静态资源（html，js，图片，css）都是404。

而此时动态资源是可以访问的（@RequestMapping路径对上就行）

```xml
<servlet>
    <servlet-name>myweb</servlet-name>
    <servlet-class>org.springframework.web.servlet.DispatcherServlet</servlet-class>
    <!--自定义springmvc读取的配置文件的位置-->
    <init-param>
        <!--springmvc的配置文件的位置的属性-->
        <param-name>contextConfigLocation</param-name>
        <!--指定自定义文件的位置-->
        <param-value>classpath:springmvc.xml</param-value>
    </init-param>

    <!--在tomcat启动后，创建Servlet对象
        load-on-startup:表示tomcat启动后创建对象的顺序。它的值是整数，数值越小，
                        tomcat创建对象的时间越早。 大于等于0的整数。
    -->
    <load-on-startup>1</load-on-startup>
</servlet>

<servlet-mapping>
    <servlet-name>myweb</servlet-name>
    <!--
        使用框架的时候， url-pattern可以使用两种值
        1. 使用扩展名方式， 语法 *.xxxx , xxxx是自定义的扩展名。 常用的方式 *.do, *.action, *.mvc等等
           不能使用 *.jsp
           http://localhost:8080/myweb/some.do
           http://localhost:8080/myweb/other.do

        2.使用斜杠 "/"
          当你的项目中使用了  / ，它会替代 tomcat中的default。
          导致所有的静态资源都给DispatcherServlet处理， 默认情况下DispatcherServlet没有处理静态资源的能力。
          没有控制器对象能处理静态资源的访问。所以静态资源（html，js，图片，css）都是404.

          动态资源some.do是可以访问，的因为我们程序中有MyController控制器对象，能处理some.do请求。

    -->
    <url-pattern>/</url-pattern>
</servlet-mapping>
```



#### 第一种解决办法

需要在springmvc配置文件加入` <mvc:default-servlet-handler>`

原理：加入这个标签后，框架会创健控制器对象DefaultServletHttpRequestHandler（类似我们自己创建的MyController）。DefaultServletHttpRequestHandler这个对象可以把接收的请求转发给 tomcat的default这个servlet。

> 因为default-servlet-handler 和 @RequestMapping注解 有冲突， 需要加入\<mvc:annotation-driven>解决问题
>
> 如果没加`<mvc:annotation-driven>`的话，静态资源是可以访问，但是动态资源就不行了

```xml
<!-- default-servlet-handler 和 @RequestMapping注解 有冲突， 需要加入annotation-driven 解决问题-->
<mvc:annotation-driven />

<!--第一种处理静态资源的方式：
    需要在springmvc配置文件加入 <mvc:default-servlet-handler>
-->
<mvc:default-servlet-handler />
```



#### :star:第二种解决方法

需要在springmvc配置文件中添加`<mvc:resources/>`标签

原理：

mvc:resources 加入后框架会创建 ResourceHttpRequestHandler这个处理器对象。让这个对象处理静态资源的访问，**不依赖tomcat服务器**。

属性：

- mapping:访问静态资源的uri地址， 使用通配符 **
- location：静态资源在你的项目中的目录位置。

> 因为mvc:resources 和 @RequestMapping注解 有冲突， 需要加入\<mvc:annotation-driven>解决问题
>
> 如果没加`<mvc:annotation-driven>`的话，静态资源是可以访问，但是动态资源就不行了

***可以把静态文件都放static文件夹下面，这样指定的时候就一句就行***

```xml
<!--第二种处理静态资源的方式
    images/**:表示 images/p1.jpg  , images/user/logo.gif , images/order/history/list.png
-->
<mvc:resources mapping="/images/**" location="/images/" />
<mvc:resources mapping="/html/**" location="/html/" />
<mvc:resources mapping="/js/**" location="/js/" />

<!--mvc:resources和@RequestMapping有一定的冲突-->
<mvc:annotation-driven />

<!--使用一个配置语句，指定多种静态资源的访问-->
<!--<mvc:resources mapping="/static/**" location="/static/" />-->
```





## 相对路径和绝对路径

在jsp ， html中使用的地址， 都是在前端页面中的地址，都是相对地址

### 地址分类：

1. 绝对地址 ， 带有协议名称的是绝对地址，  http://www.baidu.com , ftp://202.122.23.1
2. 相对地址， 没有协议开头的， 例如 user/some.do  , /user/some.do
   - 相对地址不能独立使用，必须有一个参考地址。 通过`参考地址+相对地址本身`才能指定资源。
3. 参考地址

#### 在页面中的，访问地址前不加 "/"

- 访问的是： http://localhost:8080/项目名/index.jsp
- 路径： http://localhost:8080/项目名
- 资源： index.jsp

在index.jsp发起没有斜杠开头的 user/some.do请求，访问地址变为 http://localhost:8080/ch06_path/user/some.do
 即当前页面的地址 + 链接的地址 http://localhost:8080/ch06_path/ + user/some.do

---



  index.jsp  访问 user/some.do  ， 返回后现在的地址： 

- 访问的是http://localhost:8080/项目名/user/some.do
- 路径：	  http://localhost:8080/项目名/user/
- 资源：   some.do

  在index.jsp再次访问 user/some.do ，就变为 http://localhost:8080/项目名/user/user/some.do

这样就导致参考路径重复叠加了，要用到绝对地址了

**解决方案：**

1. 加入`${pageContext.request.contextPath}`
2. 加入一个`base标签`， 是html语言中的标签。 表示当前页面中访问地址的基地址。
   - 你的页面中所有 没有“/”开头的地址，都是以base标签中的地址为参考地址
   - 使用base中的地址 + user/some.do 组成访问地址





#### 在页面中的，访问地址加 "/"

- 访问的是： http://localhost:8080/项目名/index.jsp
- 路径： http://localhost:8080/项目名/
- 资源： index.jsp

- 点击路径为` /user/some.do`的超链接, 访问地址变为 http://localhost:8080/user/some.do
- 参考地址是服务器地址， 也就是 http://localhost:8080

这样资源没法正常访问，需要加入`${pageContext.request.contextPath}`

让路径变为绝对路径


```html
<a href="${pageContext.request.contextPath}/user/some.do">发起user/some.do的get请求</a>
```


​	



#### page标签

~~~html
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%
    String basePath = request.getScheme() + "://" +
            request.getServerName() + ":" + request.getServerPort() +
            request.getContextPath() + "/";
%>
<html>
<head>
    <title>Title</title>
    <base href="<%=basePath%>" />
</head>
<body>
     <p>第一个springmvc项目</p>
     <p><a href="user/some.do">发起user/some.do的get请求</a> </p>
     <br/>


</body>
</html>

~~~





## 转发与重定向

> 转发（forward）对于浏览器来说实际上是一个请求，这个请求发给服务器后，在服务器内部转发给其他控制器来处理。
>
> 重定向（redirect）对于浏览器来说实际上是两次请求，第一次请求给服务器后，服务器对这个请求进行响应，之后浏览器自动再发一个新的请求。

### 特点

1. 转发和重定向都不和视图解析器共同工作（自己补全路径和文件后缀）
2. 都可以访问视图文件
   - 如某个jsp、html等
   - forward:/hello.jsp  forward:/main.html
3. 都可以访问其他controller
   - 如 forward:/some.do , redirect:/student/goStudentListPage.do，redirect:goStudentListPage.do



### 转发

处理器方法返回ModelAndView,实现转发forward
语法： setViewName("forward:视图文件完整路径")
forward特点： 不和视图解析器一同使用，就当项目中没有视图解析器



### 重定向

处理器方法返回ModelAndView,实现重定向redirect
语法：setViewName("redirect:视图完整路径")
redirect特点： 不和视图解析器一同使用，就当项目中没有视图解析器
框架对重定向的操作：
1.框架会把Model中的简单类型的数据，转为string使用，作为hello.jsp的get请求参数使用。
  目的是在 doRedirect.do 和 hello.jsp 两次请求之间传递数据
2.在目标hello.jsp页面可以使用参数集合对象 ${param}获取请求参数值
   ${param.myname}
3.重定向不能访问/WEB-INF资源





## 异常处理

> 在Controller里的异常如果都用trycatch的话就很多而且很乱，可以把对异常的处理都分离出来，用AOP的思想把异常加进去



### 异常处理步骤

1. 新建maven web项目

2. 加入依赖

3. 新建一个自定义异常类 MyUserException , 再定义它的子类NameException ,AgeException

4. 在controller抛出NameException , AgeException

5. 创建一个普通类，作用全局异常处理类

   - 在类的上面加入@ControllerAdvice
   - 在类中定义方法，方法的上面加入@ExceptionHandler

6. 创建处理异常的视图页面

7. 创建springmvc的配置文件

   - 组件扫描器 ，扫描@Controller注解

   - 组件扫描器，扫描@ControllerAdvice所在的包名

   - 声明注解驱动

   - ~~~xml
     <!--处理异常需要的三步-->
     <!--声明组件扫描器-->
     <context:component-scan base-package="com.bjpowernode.controller" />
     <context:component-scan base-package="com.bjpowernode.handler" />
     <mvc:annotation-driven />
     ~~~



#### 异常的执行流程

在执行`Controller`遇到异常后直接进入全局异常处理类里面，根据`@ExceptionHandler(异常的class)`来匹配异常，之后执行对应方法的逻辑

#### 全局异常处理类

可以写在handler包下

1. 类上要加上`@ControllerAdvice`
2. 方法上要加上`@ExceptionHandler(异常的class)`
   - 如果没加“异常的class”的话默认是所有异常（这种默认的注解只能有一个）

~~~java
package com.bjpowernode.handler;

import com.bjpowernode.exception.AgeException;
import com.bjpowernode.exception.NameException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.servlet.ModelAndView;

/**
 * @ControllerAdvice : 控制器增强（也就是说给控制器类增加功能--异常处理功能）
 *           位置：在类的上面。
 *  特点：必须让框架知道这个注解所在的包名，需要在springmvc配置文件声明组件扫描器。
 *  指定@ControllerAdvice所在的包名
 */
@ControllerAdvice
public class GlobalExceptionHandler {
    //定义方法，处理发生的异常
    /*
        处理异常的方法和控制器方法的定义一样， 可以有多个参数，可以有ModelAndView,
        String, void,对象类型的返回值

        形参：Exception，表示Controller中抛出的异常对象。
        通过形参可以获取发生的异常信息。

        @ExceptionHandler(异常的class)：表示异常的类型，当发生此类型异常时，
        由当前方法处理
     */

    @ExceptionHandler(value = NameException.class)
    public ModelAndView doNameException(Exception exception){
        //处理NameException的异常。
        /*
           异常发生处理逻辑：
           1.需要把异常记录下来， 记录到数据库，日志文件。
             记录日志发生的时间，哪个方法发生的，异常错误内容。
           2.发送通知，把异常的信息通过邮件，短信，微信发送给相关人员。
           3.给用户友好的提示。
         */
        ModelAndView mv = new ModelAndView();
        mv.addObject("msg","姓名必须是zs，其它用户不能访问");
        mv.addObject("ex",exception);
        mv.setViewName("nameError");
        return mv;
    }


    //处理AgeException
    @ExceptionHandler(value = AgeException.class)
    public ModelAndView doAgeException(Exception exception){
        //处理AgeException的异常。
        /*
           异常发生处理逻辑：
           1.需要把异常记录下来， 记录到数据库，日志文件。
             记录日志发生的时间，哪个方法发生的，异常错误内容。
           2.发送通知，把异常的信息通过邮件，短信，微信发送给相关人员。
           3.给用户友好的提示。
         */
        ModelAndView mv = new ModelAndView();
        mv.addObject("msg","你的年龄不能大于80");
        mv.addObject("ex",exception);
        mv.setViewName("ageError");
        return mv;
    }

    //处理其它异常， NameException, AgeException以外，不知类型的异常
    @ExceptionHandler
    public ModelAndView doOtherException(Exception exception){
        //处理其它异常
        ModelAndView mv = new ModelAndView();
        mv.addObject("msg","你的年龄不能大于80");
        mv.addObject("ex",exception);
        mv.setViewName("defaultError");
        return mv;
    }
}

~~~







## 拦截器

### 是什么

1. 拦截器是springmvc中的一种，需要实现`HandlerInterceptor接口`。
2. 可以看做是多个Controller中公用的功能，集中到拦截器统一处理。**使用的aop的思想**
4. 拦截器是全局的，可以对多个Controller做拦截。 
5. 一个项目中可以有0个或多个拦截器， 他们在一起拦截用户的请求。
6. 拦截器常用在：用户登录处理，权限检查， 记录日志。

### 拦截器的使用步骤

1. 新建maven web项目
2. 加入依赖
3. 创建Controller类
4. 创建一个普通类，作为拦截器使用
   - 实现HandlerInterceptor接口
   - 实现接口中的三个方法（5.2.5版本开始接口方法是default的，可以不完全实现）
5. 创建视图.jsp
6. 创建springmvc的配置文件
   - 组件扫描器 ，扫描@Controller注解
   - [声明拦截器](# 多个拦截器)，并指定拦截的请求uri地址

定义类实现HandlerInterceptor接口

```java
package com.xiaohuowa.handler;

import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Date;

//拦截器类：拦截用户的请求。
public class MyInterceptor implements HandlerInterceptor {

	// 三个拦截器方法，见下面的详解
    
}
```

### 拦截器的方法与执行时间

#### :star::star:preHandle

在请求处理之前， 也就是controller类中的方法执行之前先被拦截。

- ~~~java
  /*
       * preHandle叫做预处理方法。
       *   重要：是整个项目的入口，门户。 当preHandle返回true 请求可以被处理。
       *        preHandle返回false，请求到此方法就截止。
       *
       * 参数：
       *  Object handler ： 被拦截的控制器对象
       * 返回值boolean
       *   true：请求是通过了拦截器的验证，可以执行处理器方法。
           *   拦截器的MyInterceptor的preHandle()
               =====执行MyController中的doSome方法=====
               拦截器的MyInterceptor的postHandle()
               拦截器的MyInterceptor的afterCompletion()
           *
       *   false：请求没有通过拦截器的验证，请求到达拦截器就截止了。 请求没有被处理
       *      拦截器的MyInterceptor的preHandle()
       *
       *
       *  特点：
       *   1.方法在控制器方法（MyController的doSome）之前先执行的。
       *     用户的请求首先到达此方法
       *
       *   2.在这个 方法中可以获取请求的信息， 验证请求是否符合要求。
       *     可以验证用户是否登录， 验证用户是否有权限访问某个连接地址（url）。
       *      如果验证失败，可以截断请求，请求不能被处理。
       *      如果验证成功，可以放行请求，此时控制器方法才能执行。
       */
      @Override
      public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
          btime = System.currentTimeMillis();
          System.out.println("拦截器的MyInterceptor的preHandle()");
          //计算的业务逻辑，根据计算结果，返回true或者false
          //给浏览器一个返回结果
          //request.getRequestDispatcher("/tips.jsp").forward(request,response);
          return true;
      }
  ~~~





#### postHandle

> 用来对原来的执行结果做二次修正

在控制器方法执行之后也会执行拦截器。

- ~~~java
  /*
         postHandle:后处理方法。
         参数：
          Object handler：被拦截的处理器对象MyController
          ModelAndView mv:处理器方法的返回值
  
          特点：
           1.在处理器方法之后执行的（MyController.doSome()）
           2.能够获取到处理器方法的返回值ModelAndView,可以修改ModelAndView中的
           数据和视图，可以影响到最后的执行结果。
           3.主要是对原来的执行结果做二次修正，
  
           ModelAndView mv = MyController.doSome();
           postHandle(request,response,handler,mv);
       */
  @Override
  public void postHandle(HttpServletRequest request,
                         HttpServletResponse response,
                         Object handler, ModelAndView mv) throws Exception {
      System.out.println("拦截器的MyInterceptor的postHandle()");
      //对原来的doSome执行结果，需要调整。
      if( mv != null){
          //修改数据
          mv.addObject("mydate",new Date());
          //修改视图
          mv.setViewName("other");
      }
  }
  ~~~



#### afterCompletion

> 一般用来资源回收，也可以通过在`preHandle()`方法中加入开始毫秒数，在`afterCompletion()`方法中计算请求结束的耗时等

在请求处理完成后也会执行拦截器。

- ~~~java
  /*
        afterCompletion:最后执行的方法
        参数
          Object handler:被拦截器的处理器对象
          Exception ex：程序中发生的异常
        特点:
         1.在请求处理完成后执行的。框架中规定是当你的视图处理完成后，对视图执行了forward。就认为请求处理完成。
         2.一般做资源回收工作的， 程序请求过程中创建了一些对象，在这里可以删除，把占用的内存回收。
  */
  @Override
  public void afterCompletion(HttpServletRequest request, HttpServletResponse response,Object handler, Exception ex) throws Exception {
      // 一些业务逻辑
  }





### 多个拦截器

#### 多个拦截器的优先级

在springmvc的配置文件中，配置越靠上的优先级越高

因为实际上是根据声明先后顺序被存进ArrayList里的

```xml
<!--声明拦截器： 拦截器可以有0或多个
    在框架中保存多个拦截器是ArrayList，
    按照声明的先后顺序放入到ArrayList
-->
<mvc:interceptors>
    <!--声明第一个拦截器-->
    <mvc:interceptor>
        <mvc:mapping path="/**"/>
        <!--声明拦截器对象-->
        <bean class="com.bjpowernode.handler.MyInterceptor" />
    </mvc:interceptor>
    <!--声明第二个拦截器-->
    <mvc:interceptor>
        <mvc:mapping path="/**"/>
        <bean class="com.bjpowernode.handler.MyInterceptor2" />
    </mvc:interceptor>
</mvc:interceptors>
```



#### 在多个拦截器的`preHandle()方法`都为true时

![image-20220912192920071](https://s2.loli.net/2023/10/17/d95VZrcaBuGLYNJ.png)



#### 如果第二个拦截器`preHandle()方法`为false，第一个为true

1. 拦截器1的preHandle()执行
2. 拦截器2的preHandle()执行
3. 拦截器1的afterCompletion()执行

#### 如果第一个拦截器`preHandle()方法`为false，第二个为true / false

1. 拦截器1的preHandle()执行






### 拦截器和过滤器的区别

1. 过滤器是servlet中的对象，  拦截器是框架中的对象
2. 过滤器实现`Filter接口`的对象， 拦截器是`实现HandlerInterceptor`
3. 过滤器是用来设置request，response的参数，属性的，侧重对数据过滤的。
   拦截器是用来验证请求的，能截断请求。
4. 过滤器是在拦截器之前先执行的。
5. 过滤器是tomcat服务器创建的对象
   拦截器是springmvc容器中创建的对象
6. 过滤器是一个执行时间点。
   拦截器有三个执行时间点
7. 过滤器可以处理jsp，js，html等等
   拦截器是侧重拦截对Controller的对象。 （如果你的请求不能被DispatcherServlet接收， 这个请求不会执行拦截器内容）
8. 拦截器拦截普通类方法执行，过滤器过滤servlet请求响应






























































# 拓展

## 整理导入文件

`Ctrl + Alt + o`可以整理掉没用的导入



















































































































