# SpringBoot

## 简介

SpringBoot是Spring中的一个成员， 可以简化Spring，SpringMVC的使用。 他的核心还是IOC容器。



### 特点

1. Create stand-alone Spring applications

  - 创建spring应用

2. Embed Tomcat, Jetty or Undertow directly (no need to deploy WAR files)

  - 内嵌的tomcat， jetty ， Undertow 

3. Provide opinionated 'starter' dependencies to simplify your build configuration

  - 提供了starter起步依赖，简化应用的配置。   

  - 比如使用MyBatis框架 ， 需要在Spring项目中，配置MyBatis的对象 SqlSessionFactory ， Dao的代理对象

  - 在SpringBoot项目中，在pom.xml里面, 加入一个 mybatis-spring-boot-starter依赖

4. Automatically configure Spring and 3rd party libraries whenever possible

  尽可能去配置spring和第三方库。叫做自动配置（就是把spring中的，第三方库中的对象都创建好，放到容器中， 开发人员可以直接使用）

5. Provide production-ready features such as metrics, health checks, and externalized configuration

  - 提供了健康检查， 统计，外部化配置

6. Absolutely no code generation and no requirement for XML configuration

  - 不用生成代码， 不用使用xml，做配置



## 创建Spring Boot项目

### 三种方式

#### 一、使用使用Spring提供的初始化器， 就是向导创建SpringBoot应用

![image-20221021170859172](https://s2.loli.net/2023/10/17/robWR4NVup5aLfE.png)

#### 二、使用国内的地址

`https://start.springboot.io`

![image-20221021170839270](https://s2.loli.net/2023/10/17/5gLnQfR9FUbXDBw.png)



## SpringBoot的基本使用

### 🍤SpringBoot启动类注解@SpringBootApplication

![image-20221021171248109](https://s2.loli.net/2023/10/17/oBSPnhlpYmDuctL.png)

`@SpringBootApplication`是一个复合注解，主要部分由以下三个注解构成：

1. `@SpringBootConfiguration`
   - 这个注解的元注解有`@Configuration`
   - 所以使用了`@SpringBootConfiguration注解`标注的类，**可以作为配置文件使用**，可以使用Bean声明对象，注入到容器
2. `@EnableAutoConfiguration`
   - 启用自动配置， 把java对象配置好，注入到spring容器中。例如可以把mybatis的对象创建好，放入到容器中
3. `@ComponentScan`
   - 扫描器，找到注解，根据注解的功能创建对象，给属性赋值等等。
   - **默认扫描的包：** `@ComponentScan`所在的类所在的包和子包。





### 🍤SpringBoot的配置文件

> SpringBoot的主配置文件名字固定为`application`
>
> 配置文件有两种格式`.properties`和`.yml`
>
> 区别：
>
> 1. `.properties`里面用的是`key=value`
>
>    - ~~~properties
>      # 设置端口
>      server.port=8081
>      # 设置访问应用上下文路径（contextpath）
>      server.servlet.context-path=/haha
>      ~~~
> 1. `.yml`里面用的是`key: value`（注意空格）
>
>    - ~~~yaml
>      server:
>        port: 8080
>        servlet:
>          context-path: /ha
>      student:
>        name: 张三
>      ~~~
>
> 





##### 一、 多环境配置

在开发和测试或者上线的时候，用到的配置不止一套，要快速切换的话就要准备一下多环境的配置文件

###### 不同环境配置文件命名

> `application-XXX.yml`或者`application-XXX.properties`

###### 在主配置中启用某个环境配置文件

~~~yml
# 环境配置文件名为 application-dev.yml
spring:
  profiles:
    active: dev
~~~





##### 二、将配置文件数据映射为Java对象

> 通过在POJO类上加入`@ConfigurationProperties`就能把配置文件的数据映射为java对象。
>
> `@ConfigurationProperties`属性：`prefix`，用于配置文件中的某些key的开头的内容。

###### 例子

pojo类

```java
@Component
@ConfigurationProperties(prefix = "school")
public class SchoolInfo {

    private String name;

    private String website;

    private String address;

	// getter & setter
    // toString
}

```

application.properties

```properties
# 自定义key=value
school.name=福建幼儿园
school.website=www.baidu.com
school.address=福建
```



#### 三、**@Value 注解** 

通过`@Value 注解`可以将配置文件的信息获取出来

~~~java
@Value("${school.name}")
private String schoolName;
~~~



> 注意：通过`@Resource`可以获取到配置文件映射后的Java对象
>
> ~~~java
> @Resource
> private SchoolInfo schoolInfo;
> ~~~



#### 四、使用jsp

>  SpringBoot不推荐使用jsp ，而是使用模板技术代替jsp



使用jsp需要配置：

1. 加入一个处理jsp的依赖。 负责编译jsp文件

   - ~~~xml
     <dependency>
         <groupId>org.apache.tomcat.embed</groupId>
         <artifactId>tomcat-embed-jasper</artifactId>
     </dependency>
     ~~~

2. 如果需要使用servlet， jsp，jstl的功能

   - ~~~xml
     <dependency>
     	<groupId>javax.servlet</groupId>
     	<artifactId>jstl</artifactId>
     </dependency>
     
     <dependency>
     	<groupId>javax.servlet</groupId>
     	<artifactId>javax.servlet-api</artifactId>
     </dependency>
     
     <dependency>
     <groupId>javax.servlet.jsp</groupId>
     	<artifactId>javax.servlet.jsp-api</artifactId>
     	<version>2.3.1</version>
     </dependency>
     ~~~

3. 创建一个存放jsp的目录，一般叫做webapp

4. 需要在pom.xml指定jsp文件编译后的存放目录。

   - META-INF/resources

   - ~~~xml
     <!—
      SpringBoot 要求 jsp 文件必须编译到指定的
     META-INF/resources 目录下才能访问，否则访问不到。
      其它官方已经建议使用模版技术（后面会课程会单独讲解模版技
     术）
     注意这部分要放<build>里
     -->
     <resources>
         <resource>
             <!--源文件位置-->
             <directory>src/main/webapp</directory>
             <!--指定编译到META-INF/resource，该目录不能随便写-->
             <targetPath>META-INF/resources</targetPath>
             <!--指定要把哪些文件编译进去，**表示 webapp 目录及子
     目录，*.*表示所有文件-->
             <includes>
                 <include>**/*.*</include>
             </includes>
         </resource>
     </resources>
     ~~~

   

5. 创建Controller， 访问jsp

6. 在application.propertis文件中配置视图解析器

   - 相当于 Spring MVC 的配置

   - ~~~properties
     #配置 SpringMVC 的视图解析器
     #其中：'/'相当于 src/main/webapp 目录
     spring.mvc.view.prefix=/
     spring.mvc.view.suffix=.jsp
     ~~~

   - 



### 🍤使用ApplicationContext容器

> 在`Application启动类`中，`run方法`的返回值是`ConfigurableApplicationContext`，而`ConfigurableApplicationContext`是`ApplicationContext`的子接口
>
> 所以通过run方法可以**直接拿到容器对象**
>
> 也可以从容器中获取对象

~~~java
package com.xiaohuowa;

import com.xiaohuowa.service.UserService;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ConfigurableApplicationContext;

@SpringBootApplication
public class Application {

    public static void main(String[] args) {
        // 拿到容器
        ConfigurableApplicationContext applicationContext = SpringApplication.run(Application.class, args);
        // 获取对象
        UserService userService = (UserService) applicationContext.getBean("userService");
        // 执行一些操作
        userService.doSome();
    }

}

~~~





### 🍤SpringBoot自动装配

#### 查看容器里面的组件

~~~java
public static void main(String[] args) {
    ConfigurableApplicationContext run = SpringApplication.run(UserBootApplication.class, args);
    
    // 查看容器里面的组件
    String[] beanDefinitionNames = run.getBeanDefinitionNames();
    for (String beanDefinitionName : beanDefinitionNames) {
        System.out.println(beanDefinitionName);
    }
}
~~~



#### @Bean

`@Bean`

1. 所在的方法名即为注册组件的ID（也可以在@Bean后面加上参数，指定组件的ID）
2. 返类型就是组件的类型
3. 返回的值就是容器中的实例。



#### @Configuration标注的配置类

~~~java
/**
 * 1、配置类里面使用@Bean标注在方法上给容器注册组件，默认也是单实例的
 * 2、配置类本身也是组件
 * 3、proxyBeanMethods：代理bean的方法
 *      Full(proxyBeanMethods = true)、【保证每个@Bean方法被调用多少次返回的组件都是单实例的】
 *      Lite(proxyBeanMethods = false)【每个@Bean方法被调用多少次返回的组件都是新创建的】
 *      组件依赖必须使用Full模式默认。其他默认是否Lite模式
 *
 * 4、@Import({User.class, DBHelper.class})
 *      给容器中自动创建出这两个类型的组件、默认组件的名字就是全类名
 *
 *
 * 5、@ImportResource("classpath:beans.xml")导入Spring的配置文件，
 *
 */

@Import({User.class, DBHelper.class})
@Configuration(proxyBeanMethods = false) //告诉SpringBoot这是一个配置类 == 配置文件
//@ConditionalOnBean(name = "tom")
@ConditionalOnMissingBean(name = "tom")
@ImportResource("classpath:beans.xml")
//@EnableConfigurationProperties(Car.class)
//1、开启Car配置绑定功能
//2、把这个Car这个组件自动注册到容器中
public class MyConfig {


    /**
     * Full:外部无论对配置类中的这个组件注册方法调用多少次获取的都是之前注册容器中的单实例对象
     * @return
     */

    @Bean //给容器中添加组件。以方法名作为组件的id。返回类型就是组件类型。返回的值，就是组件在容器中的实例
    public User user01(){
        User zhangsan = new User("zhangsan", 18);
        //user组件依赖了Pet组件
        zhangsan.setPet(tomcatPet());
        return zhangsan;
    }

    @Bean("tom22")
    public Pet tomcatPet(){
        return new Pet("tomcat");
    }

//    @Bean
//    public CharacterEncodingFilter filter(){
//        return null;
//    }
}
~~~



##### proxyBeanMethods

> `proxyBeanMethods`为`@configuration`的参数，用于指定是否代理bean的方法，默认是true
>
>  1. `Full(proxyBeanMethods = true)`【保证每个@Bean方法被调用多少次返回的组件都是单实例的】
>  2. `Lite(proxyBeanMethods = false)`【每个@Bean方法被调用多少次返回的组件都是新创建的】
>
> 
>
> - 如果有组件依赖必须使用Full模式，因为依赖的另一个组件会是单例的，能构成依赖关系
> - 其他的情况可以用Lite模式，优点是SpringBoot启动速度快，启动时候不会检查容器中是否已经有方法返回值是否已经存在在容器中





#### @Import

`@Import({User.class, DBHelper.class})`

以上代码作用：给容器中自动创建出这两个类型的组件，默认组件的名字就是**全类名**



#### @Conditional

> **条件装配**：满足Conditional指定的条件，则进行组件注入
>
> 1. 放在配置类上表示，当容器中满足条件时，配置类中的组件才生效；
> 2. 放在配置方法上的时候，表示的意思是当满足条件的时候配置方法才生效；

`@Conditional`，中派生了很多的子注解，它们可以添加在@Bean注解的方法上也可以放在配置类上

示例：以`@ConditionalOnBean(name="tom")`为例，当 IOC 容器中拥有id为`tom`的组件时才会满足条件，否则不满足条件



`@Conditional`子注解

![image-20230112141329609](https://s2.loli.net/2023/10/17/WCxz1ZbtXv7TKJq.png)



####  @ImportResource原生配置文件引入

> 有些旧的项目用xml写了spring配置文件，可以通过在配置类上面加上` @ImportResource(classpath:xxxx)`导入SpringBoot进行解析，完成对应的组件注册
> 注解位置：在配置类的上方



#### 配置绑定

读取到`properties文件`中的内容，并且把它配置到JavaBean中，以供随时使用



##### 两种方式

1. `@Component` + `@ConfigurationProperties(prefix = "配置文件中的前缀")`声明在要绑定的类的上方
   - 只有在容器中的组件，才会拥有SpringBoot提供的强大功能，所以要加上@Component
2. `@ConfigurationProperties(prefix = "配置文件中的前缀")`声明在要绑定的类的上方 + 在配置类的上方声明`@EnableConfigurationProperties(要绑定的类.class)`，开启对应类的配置绑定功能，把Car这个组件自动注入到容器中；
   - 通过 `@EnableConfigurationProperties` 可以实现：
     1. 开启要绑定的类的配置绑定功能
     2. 把这个要绑定的类这个组件自动注册到容器中











### 🍤CommandLineRunner 接口 /  ApplicationRunner接口

特点：

- 这两个接口都有一个`run()方法`。
  - 执行时间：**在容器对象创建好后， 自动执**行`run()方法`。
  - 两个接口的run方法的参数不同

可以完成自定义的在容器对象创建好的一些操作。

```java
@FunctionalInterface
public interface CommandLineRunner {
    void run(String... args) throws Exception;
}

@FunctionalInterface
public interface ApplicationRunner {
    void run(ApplicationArguments args) throws Exception;
}

```



#### 示例

> 执行顺序已经做了标号了

~~~java
package com.xiaohuowa;

import com.xiaohuowa.service.UserService;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import javax.annotation.Resource;

@SpringBootApplication
public class Application implements ApplicationRunner {

    @Resource
    private UserService userService;

    public static void main(String[] args) {
        System.out.println("1.创建容器前");
        SpringApplication.run(Application.class, args);  // 2
        System.out.println("6.创建容器后");
    }

    @Override
    public void run(ApplicationArguments args) throws Exception {
        System.out.println("3.业务方法准备执行");
        userService.doSome();  // 4
        System.out.println("5.业务方法执行完毕");
    }
}

~~~



## Web组件

### SpringBoot拦截器

#### 使用步骤

1. 创建拦截器类，实现`HandlerInterceptor接口`
   - 看情况重写里面的方法
2. 创建自定义配置类，实现`WebMvcConfigurer接口`
   - 用于注册拦截器



#### 拦截器类

~~~java
package com.xiaohuowa.web;

import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * @author 小火娃
 * @project_name: my_projects
 * @package_name: com.xiaohuowa.web
 */
public class LoginInterceptor implements HandlerInterceptor {

    /**
     *
     * @param request 请求
     * @param response 响应
     * @param handler 被拦截的控制器对象
     * @return boolean
     *         true：代表请求能被 Controller处理
     *         false：代表请求被截断
     * @throws Exception
     */
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        System.out.println("执行了登录判断");
        return true;
    }
}
~~~



#### 配置类

~~~java
package com.xiaohuowa.config;

import com.xiaohuowa.web.LoginInterceptor;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * @author 小火娃
 * @project_name: my_projects
 * @package_name: com.xiaohuowa.config
 */
@Configuration
public class MyConfig implements WebMvcConfigurer {

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        LoginInterceptor loginInterceptor = new LoginInterceptor();
        // 要拦截哪些路径
        String[] path = {"/user/**"};
        // 不拦截哪些路径
        String[] excludePath = {"/user/login"};
        // 注册拦截器
        registry.addInterceptor(loginInterceptor).addPathPatterns(path).excludePathPatterns(excludePath);

    }
}
~~~



#### 测试Service类

```java
package com.xiaohuowa.service;

import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * @author 小火娃
 * @project_name: my_projects
 * @package_name: com.xiaohuowa.service
 */
@Service
@RequestMapping("/user")
public class UserService {

    @RequestMapping("/info")
    @ResponseBody
    public String getInfo() {
        return "查看用户信息";
    }

    @RequestMapping("/login")
    @ResponseBody
    public String userLogin() {
        return "用户登录";
    }
}
```



#### 结果

在访问`/user/info`的时候会被拦截器拦下来进行判断，而访问`/user/login`的时候不会。





### 使用Servlet

在SpringBoot框架中使用Servlet对象。

使用步骤：

1. 创建Servlet类。 创建类继承HttpServlet
2. 注册Servlet ，让框架能找到Servlet



#### 自定义Servlet类

```java
package com.xiaohuowa.web;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

/**
 * @author 小火娃
 * @project_name: my_projects
 * @package_name: com.xiaohuowa.web
 */
public class MyServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("text/html;charset=UTF-8");
        // 输出应答结果
        PrintWriter writer = response.getWriter();
        writer.println("servlet running");
        writer.flush();
        writer.close();
    }
}
```



#### 注册Servlet

> 包括`ServletRegistrationBean`的有参和无参构造方法的两种创建方式

```java
package com.xiaohuowa.config;

import com.xiaohuowa.web.MyServlet;
import org.springframework.boot.web.servlet.ServletRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import javax.servlet.Servlet;
import javax.servlet.ServletRegistration;

/**
 * @author 小火娃
 * @project_name: my_projects
 * @package_name: com.xiaohuowa.config
 */
@Configuration
public class WebApplicationConfig {
    /**
     * 注册Servlet
     * @return
     */
    @Bean
    public ServletRegistrationBean servletRegistrationBean(){
        // public ServletRegistrationBean(T servlet, String... urlMappings)
        // 有参构造，第一个是Servlet，第二个是url
        // ServletRegistrationBean<Servlet> bean = new ServletRegistrationBean<>(new MyServlet(), "/myservlet");

        // 无参构造
        ServletRegistrationBean<Servlet> bean = new ServletRegistrationBean<>();
        bean.setServlet(new MyServlet());
        bean.addUrlMappings("/myservlet", "/haha");

        return bean;
    }
}
```





### 过滤器

Filter是Servlet规范中的过滤器，可以处理请求， 对请求的参数， 属性进行调整。 常常在过滤器中处理字符编码

在框架中使用过滤器步骤：

1. 创建自定义过滤器类
2. 注册Filter过滤器对象



#### 自定义过滤器类

```java
package com.xiaohuowa.web;

import javax.servlet.*;
import java.io.IOException;

/**
 * @author 小火娃
 * @project_name: my_projects
 * @package_name: com.xiaohuowa.web
 */
public class MyFilter implements Filter {
    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
        // 执行一些处理
        System.out.println("Filter 执行");
        // 放行
        filterChain.doFilter(servletRequest, servletResponse);
    }
}

```



#### 注册Filter

```java
package com.xiaohuowa.config;

import com.xiaohuowa.web.MyFilter;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * @author 小火娃
 * @project_name: my_projects
 * @package_name: com.xiaohuowa.config
 */
@Configuration
public class MyFilterConfig {

    @Bean
    public FilterRegistrationBean filterRegistrationBean(){
        FilterRegistrationBean filterRegistrationBean = new FilterRegistrationBean();
        // 设置使用哪个过滤器
        filterRegistrationBean.setFilter(new MyFilter());
        // 过滤的url
        filterRegistrationBean.addUrlPatterns("/user/info");
        return filterRegistrationBean;
    }
}

```





### 字符集过滤器

`CharacterEncodingFilter` : 解决post请求中乱码的问题

在SpringMVC框架， 在web.xml 注册过滤器。 配置他的属性。 



#### 第一种方式：

使用步骤：

1. 配置字符集过滤器

   - > `@Bean`所在的方法名即为注册组件的ID（也可以在@Bean后面加上参数，指定组件的ID），返类型就是组件的类型，返回的值就是容器中的实例。



   ```java
   package com.xiaohuowa.config;
   
   import com.xiaohuowa.web.TestServlet;
   import org.springframework.boot.web.servlet.FilterRegistrationBean;
   import org.springframework.boot.web.servlet.ServletRegistrationBean;
   import org.springframework.context.annotation.Bean;
   import org.springframework.context.annotation.Configuration;
   import org.springframework.web.filter.CharacterEncodingFilter;
   
   import javax.servlet.Servlet;
   
   /**
    * @author 小火娃
    * @project_name: my_projects
    * @package_name: com.xiaohuowa.config
    */
   @Configuration
   public class WebSystemConfig {
   
       /**
        * 注册Servlet
        * @return
        */
       @Bean
       public ServletRegistrationBean servletRegistrationBean(){
           ServletRegistrationBean<Servlet> bean = new ServletRegistrationBean<>();
           bean.addUrlMappings("/test");
           bean.setServlet(new TestServlet());
           return bean;
       }
   
       /**
        * 注册字符集过滤器（使用框架自带的过滤器）
        * @return
        */
       @Bean
       public FilterRegistrationBean filterRegistrationBean(){
           FilterRegistrationBean bean = new FilterRegistrationBean();
           CharacterEncodingFilter encodingFilter = new CharacterEncodingFilter();
           encodingFilter.setEncoding("UTF-8");
           encodingFilter.setForceEncoding(true);
           bean.setFilter(encodingFilter);
           return bean;
       }
   }
   ```

2. 修改application.properties文件， 让自定义的过滤器起作用

```properties
#SpringBoot中默认已经配置了CharacterEncodingFilter。 编码默认ISO-8859-1
#设置enabled=false 作用是关闭系统中配置好的过滤器， 使用自定义的CharacterEncodingFilter
server.servlet.encoding.enabled=false
```



Servlet代码

~~~java
package com.xiaohuowa.web;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

/**
 * @author 小火娃
 * @project_name: my_projects
 * @package_name: com.xiaohuowa.web
 */
public class TestServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("text/html");
        PrintWriter writer = response.getWriter();
        writer.println("大家好，测试乱码了");
        writer.flush();
        writer.close();
    }
}
~~~





#### 第二种方式

直接修改application.properties文件

```properties
# 让系统的CharacterEncdoingFilter生效（默认就是true了，所以可以不写）
server.servlet.encoding.enabled=true
# 指定使用的编码方式
server.servlet.encoding.charset=utf-8
# 强制request，response都使用charset属性的值
server.servlet.encoding.force=true
```



## ORM操作



使用MyBatis框架操作数据，  在SpringBoot框架集成MyBatis

使用步骤：

1. mybatis起步依赖 ： 完成mybatis对象自动配置， 对象放在容器中

   - ```xml
     <!--mybatis起步依赖-->
     <dependency>
         <groupId>org.mybatis.spring.boot</groupId>
         <artifactId>mybatis-spring-boot-starter</artifactId>
         <version>2.2.2</version>
     </dependency>
     
     <!--mysql驱动-->
     <dependency>
         <groupId>mysql</groupId>
         <artifactId>mysql-connector-java</artifactId>
         <scope>runtime</scope>
     </dependency>
     ```

2. pom.xml 指定把src/main/java目录中的xml文件包含到classpath中

   - ~~~xml
     <resources>
         <resource>
             <directory>src/main/java</directory>
             <includes>
                 <include>**/*.xml</include>
             </includes>
         </resource>
     </resources>
     ~~~

3. 创建实体类Student

4. 创建Dao接口 StudentDao , 创建一个查询学生的方法 

5. 创建Dao接口对应的Mapper文件， xml文件， 写sql语句

6. 创建Service层对象， 创建StudentService接口和他的实现类。 去dao对象的方法。完成数据库的操作

7. 创建Controller对象，访问Service。

8. 写application.properties文件

   配置数据库的接信息。

   ```properties
   # 连接数据库
   spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
   spring.datasource.url=jdbc:mysql://localhost:3306/springboot_learning?serverTimezoneUTC&characterEncoding=utf8&useUnicode=true&useSSL=false
   spring.datasource.username=root
   spring.datasource.password=admin
   ```



### 第一种方式 ： @Mapper

`@Mapper`：放在dao接口的上面， **每个接口都需要使用这个注解**。

```java
/**
 * @Mapper：告诉MyBatis这是dao接口，创建此接口的代理对象。
 *     位置：在类的上面
 */
@Mapper
public interface StudentDao {
    Student selectById(@Param("stuId") Integer id);
}
```





### 第二种方式  @MapperScan

包扫描的形式，将`@MapperScan`配在主配置文件上

```java
/**
 * @MapperScan: 找到Dao接口和Mapper文件
 *     basePackages：Dao接口所在的包名
 */
@SpringBootApplication
@MapperScan(basePackages = {"com.bjpowernode.dao","com.bjpowernode.mapper"})
public class Application {
}
```



### 第三种方式： Mapper文件和Dao接口分开管理



 现在把Mapper文件放在resources目录下

1）在resources目录中创建子目录 （自定义的） ， 例如mapper

2）把mapper文件放到 mapper目录中

3）在application.properties文件中，指定mapper文件的目录

```properties
#指定mapper文件的位置
mybatis.mapper-locations=classpath:mapper/*.xml
#指定mybatis的日志
mybatis.configuration.log-impl=org.apache.ibatis.logging.stdout.StdOutImpl
```

4) 在pom.xml中指定 把resources目录中的文件 ， 编译到目标目录中

```xml
<!--resources插件-->
<resources>
   <resource>
      <directory>src/main/resources</directory>
      <includes>
         <include>**/*.*</include>
      </includes>
   </resource>
</resources>
```



### 第四个  事务

#### Spring框架中的事务：

1） 管理事务的对象： 事务管理器（接口， 接口有很多的实现类）

​      例如：使用Jdbc或mybatis访问数据库，使用的事务管理器：DataSourceTransactionManager

2 ) 声明式事务：  在xml配置文件或者使用注解说明事务控制的内容

​     控制事务： 隔离级别，传播行为， 超时时间

3）事务处理方式：

​      1） Spring框架中的@Transactional

​      2)    aspectj框架可以在xml配置文件中，声明事务控制的内容



​    

#### SpringBoot中使用事务：

> 1. Spring框架中的@Transactional
>
> 2. aspectj框架可以在xml配置文件中，声明事务控制的内容
>
> 上面的两种方式都可以。

##### 步骤

1. 在业务方法的上面加入`@Transactional` ,  加入注解后，方法有事务功能了。
2. 明确的在 主启动类的上面 ，加入`@EnableTransactionManager`



##### 例子：

```java
/**
 * @Transactional: 表示方法的有事务支持
 *       默认：使用库的隔离级别， REQUIRED 传播行为； 超时时间  -1
 *       抛出运行时异常，回滚事务
 */
@Transactional
@Override
public int addStudent(Student student) {
    System.out.println("业务方法addStudent");
    int rows  =  studentDao.insert(student);
    System.out.println("执行sql语句");

    //抛出一个运行时异常， 目的是回滚事务
    //int m   = 10 / 0 ;

    return rows;
}
```





## 接口架构风格 —RESTful



接口： API（Application Programming Interface，应用程序接口）是一些预先定义的接口（如函数、HTTP接口），或指[软件系统](https://baike.baidu.com/item/软件系统/224122)不同组成部分衔接的约定。 用来提供[应用程序](https://baike.baidu.com/item/应用程序)与开发人员基于某[软件](https://baike.baidu.com/item/软件)或硬件得以访问的一组[例程](https://baike.baidu.com/item/例程/2390628)，而又无需访问源码，或理解内部[工作机制](https://baike.baidu.com/item/工作机制/9905789)的细节。



接口（API）： 可以指访问servlet， controller的url，   调用其他程序的 函数



架构风格： api组织方式（样子）

   就是一个传统的：    http://localhost:9002/mytrans/addStudent?name=lisi&age=26 

​                                      在地址上提供了 访问的资源名称addStudent, 在其后使用了get方式传递参数。

### 5.1  REST

RESTful架构风格

1)REST :  （英文： Representational State Transfer , 中文： 表现层状态转移)。

   REST：是一种接口的架构风格和设计的理念，不是标准。

   优点： 更简洁，更有层次



   表现层状态转移: 

​         表现层就是视图层， 显示资源的， 通过视图页面，jsp等等显示操作资源的结果。

​          状态： 资源变化

​         转移： 资源可以变化的。 资源能创建，new状态，  资源创建后可以查询资源， 能看到资源的内容，

这个资源内容 ，可以被修改， 修改后资源 和之前的不一样。  





2）REST中的要素：

   用REST表示资源和对资源的操作。  在互联网中，表示一个资源或者一个操作。 

   资源使用url表示的， 在互联网， 使用的图片，视频， 文本，网页等等都是资源。

   资源是用名词表示。



  对资源： 

​        查询资源： 看，通过url找到资源。 

​        创建资源： 添加资源

​        更新资源：更新资源 ，编辑

​        删除资源： 去除

​       

 资源使用url表示，通过名词表示资源。

​     在url中，使用名词表示资源， 以及访问资源的信息,  在url中，使用“ / " 分隔对资源的信息

​     http://localhost:8080/myboot/student/1001

 使用http中的动作（请求方式）， 表示对资源的操作（CURD）

   GET:  查询资源  --  sql select

​                 处理单个资源： 用他的单数方式

​                  http://localhost:8080/myboot/student/1001

​                 http://localhost:8080/myboot/student/1001/1

​                处理多个资源：使用复数形式

​                  http://localhost:8080/myboot/students/1001/1002

​                

   POST: 创建资源  -- sql insert

​                http://localhost:8080/myboot/student

​                在post请求中传递数据

```html
<form action="http://localhost:8080/myboot/student" method="post">
	姓名：<input type="text" name="name" />
    年龄：<input type="text" name="age" />
  </form>
```


   PUT： 更新资源  --  sql  update

   ```xml
<form action="http://localhost:8080/myboot/student/1" method="post">
	姓名：<input type="text" name="name" />
    年龄：<input type="text" name="age" />
         <input type="hidden" name="_method" value="PUT" />
  </form>
   ```



   DELETE: 删除资源  -- sql delete

```xml
<a href="http://localhost:8080/myboot/student/1">删除1的数据</a>
```



 需要的分页，  排序等参数，依然放在  url的后面， 例如 

 http://localhost:8080/myboot/students?page=1&pageSize=20

   `

  

3） 一句话说明REST： 

​    使用url表示资源 ，使用http动作操作资源。



4) 注解

  `@PathVariable` :  从url中获取数据

  `@GetMapping`:    支持的get请求方式，  等同于 @RequestMapping( method=RequestMethod.GET)

  `@PostMapping`:  支持post请求方式 ，等同于 @RequestMapping( method=RequestMethod.POST)

  `@PutMapping`:  支持put请求方式，  等同于 @RequestMapping( method=RequestMethod.PUT)

   `@DeleteMapping`: 支持delete请求方式，  等同于 @RequestMapping( method=RequestMethod.DELETE)

  

  @RestController:  符合注解， 是@Controller 和@ResponseBody组合。

​               在类的上面使用@RestController ， 表示当前类者的所有方法都加入了 @ResponseBody



5. Postman : 测试工具

   使用Postman : 可以测试 get ，post ， put ，delete 等请求





### 5.2  在页面中或者ajax中，支持put，delete请求

在SpringMVC中 有一个过滤器， 支持post请求转为put ,delete



过滤器： org.springframework.web.filter.HiddenHttpMethodFilter

作用： 把请求中的post请求转为 put ， delete



实现步骤：

1. application.properties(yml) : 开启使用 HiddenHttpMethodFilter 过滤器
2. 在请求页面中，包含 _method参数， 他的值是 put， delete  ，  发起这个请求使用的post方式



## Redis

Redis ： 一个NoSQL数据库，  常用作 缓存使用 （cache）

Redis的数据类型： string  ,  hash  ,set  ,zset , list

Redis是一个中间件： 是一个独立的服务器。

java中著名的客户端： Jedis ，  lettuce ， Redisson



Spring，SpringBoot中有 一个RedisTemplate（StringRedisTemplate） ，处理和redis交互  



### 对比 StringRedisTemplate 和 RedisTemplate 



1. `StringRedisTemplate`
   1. 把k，v 都是作为String处理， 使用的是**String的序列化** ， 可读性好
2. `RedisTemplate `
   1. 把k，v 经过了序列化存到redis。 k，v 是序列化的内容， **不能直接识别**
   2. **默认使用的jdk序列化**， 可以修改为前提的序列化



#### 序列化和反序列化

![image-20221030185047194](https://s2.loli.net/2023/10/17/KwlbWBDGzd5yFQu.png)

![image-20221030185050745](https://s2.loli.net/2023/10/17/mE5Ae2ixYZCaR3L.png)

- 序列化：把对象转化为可传输的字节序列过程称为序列化。

- 反序列化：把字节序列还原为对象的过程称为反序列化。




##### 为什么需要序列化

序列化最终的目的是为了对象可以跨平台存储，和进行网络传输。而我们进行跨平台存储和网络传输的方式就是IO，而我们的IO支持的数据格式就是字节数组。我们必须在把对象转成字节数组的时候就制定一种规则（序列化），那么我们从IO流里面读出数据的时候再以这种规则把对象还原回来（反序列化）。



##### 什么情况下需要序列化

通过上面我想你已经知道了凡是需要进行“跨平台存储”和”网络传输”的数据，都需要进行序列化。

本质上存储和网络传输 都需要经过 把一个对象状态保存成一种跨平台识别的字节格式，然后其他的平台才可以通过字节信息解析还原对象信息。



##### 序列化的方式

序列化只是一种拆装组装对象的规则，那么这种规则肯定也可能有多种多样，比如现在常见的序列化方式有：JDK（不支持跨语言）、JSON、XML、Hessian、Kryo（不支持跨语言）、Thrift、Protofbuff、



序列化过程：Student( name=zs, age=20)   ----  { "name":"zs", "age":20 }



java的序列化： 把java对象转为byte[], 二进制数据

json序列化：json序列化功能将对象转换为 JSON 格式或从 JSON 格式转换对象。例如把一个Student对象转换为JSON字符串{"name":"李四", "age":29} )，反序列化(将JSON字符串 {"name":"李四", "age":29} 转换为Student对象)





##### springboot中设置key或者value的序列化方式

```java
@PostMapping("/setStu")
public String setStu() {
    Student student = new Student();
    student.setId(10);
    student.setName("zhagnsan");
    student.setEmail("zhagnsan@gmail.com");
    // 使用RedisTemplate ，在存取值之前，设置序列化
    // 设置 key 使用String的序列化
    redisTemplate.setKeySerializer(new StringRedisSerializer());
    // 设置 value 的序列化
    redisTemplate.setHashValueSerializer(new Jackson2JsonRedisSerializer(Student.class));
    redisTemplate.opsForValue().set("mystu", student);
    return "向redis添加学生数据";
}
```





## 打包

### 8.1 打包war

1.创建了一个jsp应用

2.修改pom.xml

 1)指定打包后的文件名称

```xml
<build>
   <!--打包后的文件名称-->
   <finalName>myboot</finalName>
</build>
```



2)指定jsp编译目录

```xml
<!--resources插件， 把jsp编译到指定的目录-->
<resources>
   <resource>
      <directory>src/main/webapp</directory>
      <targetPath>META-INF/resources</targetPath>
      <includes>
         <include>**/*.*</include>
      </includes>
   </resource>

   <!--使用了mybatis ，而且mapper文件放在src/main/java目录-->
   <resource>
      <directory>src/main/java</directory>
      <includes>
         <include>**/*.xml</include>
      </includes>
   </resource>

   <!--把src/main/resources下面的所有文件，都包含到classes目录-->
   <resource>
      <directory>src/main/resources</directory>
      <includes>
         <include>**/*.*</include>
      </includes>
   </resource>
</resources>
```



3）执行打包是war

```xml
<!--打包类型-->
<packaging>war</packaging>
```



4）主启动类继承SpringBootServletInitializer

```java
/**
 * SpringBootServletInitializer: 继承这个类， 才能使用独立tomcat服务器
 */
@SpringBootApplication
public class JspApplication  extends SpringBootServletInitializer  {

   public static void main(String[] args) {
      SpringApplication.run(JspApplication.class, args);
   }

   @Override
   protected SpringApplicationBuilder configure(SpringApplicationBuilder builder) {
      return builder.sources(JspApplication.class);
   }
}
```



5）部署war

 把war放到tomcat等服务器的发布目录中。  tomcat为例， myboot.war放到tomcat/webapps目录。





### 8.2 打包为jar

1.创建了一个包含了jsp的项目

2.修改pom.xml

​     1) 指定打包后的文件名称

```xml
<build>
   <!--打包后的文件名称-->
   <finalName>myboot</finalName>
</build>
```



    2) 指定springboot-maven-plugin版本

```xml
<plugins>
   <plugin>
      <groupId>org.springframework.boot</groupId>
      <artifactId>spring-boot-maven-plugin</artifactId>
      <!--打包jar， 有jsp文件时，必须指定maven-plugin插件的版本是 1.4.2.RELEASE-->
      <version>1.4.2.RELEASE</version>
   </plugin>
</plugins>
```



3）最后执行 maven clean package

​       在target目录中，生成jar 文件， 例子是myboot.jar



​       执行独立的springboot项目  在cmd中 java  -jar  myboot.jar







# Thymeleaf

### 是什么

Thymeleaf： 是使用Java开发的模板技术， 在服务器端运行。 把处理后的数据发送给浏览器。

​         模板是作视图层工作的。  显示数据的。  Thymeleaf是基于Html语言。 Thymleaf语法是应用在

​        html标签中 。 SpringBoot框架集成Thymealeaf,  使用Thymeleaf代替jsp。



Thymeleaf 的官方网站：http://www.thymeleaf.org
Thymeleaf 官方手册：https://www.thymeleaf.org/doc/tutorials/3.0/usingthymeleaf.html



## 9.1 表达式

1. 标准变量表达式 

   语法：  ${key} 

   作用： 获取key对于的文本数据，  key 是request作用域中的key ， 使用request.setAttribute(), model.addAttribute()

   在页面中的 html标签中， 使用 th:text="${key}" 

```html
<div style="margin-left: 400px">
    <h3>标准变量表达式:  ${key}</h3>
    <p th:text="${site}">key不存在</p>
    <br/>
    <p>获取SysUser对象 属性值</p>
    <p th:text="${myuser.id}">id</p>
    <p th:text="${myuser.name}">姓名</p>
    <p th:text="${myuser.sex}">姓名：m男</p>
    <p th:text="${myuser.age}">年龄</p>
    <p th:text="${myuser.getName()}">获取姓名使用getXXX</p>
</div>
```



2. 选择变量表达式（ 星号变量表达式）

   语法：  *{key}

   作用： 获取这个key对应的数据，   *{key}需要和th:object 这个属性一起使用。

   目的是简单获取对象的属性值。

   ```html
   <p>使用 *{} 获取SysUser的属性值</p>
   <div th:object="${myuser}">
       <p th:text="*{id}"></p>
       <p th:text="*{name}"></p>
       <p th:text="*{sex}"></p>
       <p th:text="*{age}"></p>
   
   </div>
   <p>使用*{}完成的表示 对象的属性值</p>
   <p th:text="*{myuser.name}" ></p>
   ```

3. 链接表达式

   语法： @{url}

   作用： 表示链接， 可以

   ```html
    <script src="..."> , <link href="..."> <a href=".."> ,<form action="..."> <img src="...">
   ```

   

## 9.2  Thymeleaf属性

属性是放在html元素中的，就是html元素的属性，加入了th前缀。  属性的作用不变。    加入上th， 属性的值由模板引擎处理了。  在属性可以使用变量表达式

例如：

```xml
<form action="/loginServlet" method="post"></form>

<form th:action="/loginServlet" th:method="${methodAttr}"></form>
```





## 9.3 each

each循环， 可以循环List，Array

语法：

在一个html标签中，使用th:each

```xml
<div th:each="集合循环成员,循环的状态变量:${key}">
    <p th:text="${集合循环成员}" ></p>
</div>

集合循环成员,循环的状态变量:两个名称都是自定义的。 “循环的状态变量”这个名称可以不定义，默认是"集合循环成员Stat"


```





each循环Map

在一个html标签中，使用th:each

```html
<div th:each="集合循环成员,循环的状态变量:${key}">
    <p th:text="${集合循环成员.key}" ></p>
    <p th:text="${集合循环成员.value}" ></p>
</div>

集合循环成员,循环的状态变量:两个名称都是自定义的。 “循环的状态变量”这个名称可以不定义，默认是"集合循环成员Stat"

key:map集合中的key
value：map集合key对应的value值

```





## 9.4 th:if

"th:if"  : 判断语句， 当条件为true， 显示html标签体内， 反之不显示 没有else语句

```xml
语法：
<div th:if=" 10 > 0 "> 显示文本内容 </div>

```



还有一个 th:unless  和 th:if相反的行为

```xml
语法：
<div th:unless=" 10 < 0 "> 当条件为false显示标签体内容 </div>
```



例子：if

```xml
<div style="margin-left: 400px">
        <h3> if 使用</h3>
        <p th:if="${sex=='m'}">性别是男</p>
        <p th:if="${isLogin}">已经登录系统</p>
        <p th:if="${age > 20}">年龄大于20</p>
        <!--""空字符是true-->
        <p th:if="${name}">name是“”</p>
        <!--null是false-->
        <p th:if="${isOld}"> isOld是null</p>
 </div>

```



例子： unless

```html
 <div style="margin-left: 400px">
        <h3>unless: 判断条件为false，显示标签体内容</h3>
        <p th:unless="${sex=='f'}">性别是男的</p>
        <p th:unless="${isLogin}">登录系统</p>
        <p th:unless="${isOld}"> isOld是null </p>
 </div>
```





## 9.5  th:switch

th:switch 和 java中的swith一样的

```html
语法：
<div th:switch="要比对的值">
    <p th:case="值1">
        结果1
    </p>
    <p th:case="值2">
        结果2
    </p>
    <p th:case="*">
        默认结果
    </p>
    以上的case只有一个语句执行
    
</div>
```





## 9.6 th:inline

1. 内联text：  在html标签外，获取表达式的值

   语法： 

   ```xml
   <p>显示姓名是：[[${key}]]</p>
   
    <div style="margin-left: 400px">
           <h3>内联 text, 使用内联表达式显示变量的值</h3>
           <div th:inline="text">
               <p>我是[[${name}]]，年龄是[[${age}]]</p>
               我是<span th:text="${name}"></span>,年龄是<span th:text="${age}"></span>
           </div>
   
           <div>
               <p>使用内联text</p>
               <p>我是[[${name}]],性别是[[${sex}]]</p>
           </div>
   </div>
   ```

   

2. 内联javascript

```html
例子：
 <script type="text/javascript" th:inline="javascript">
         var myname = [[${name}]];
         var myage = [[${age}]];

         //alert("获取的模板中数据 "+ myname + ","+myage)

        function fun(){
            alert("单击事件，获取数据 "+ myname + ","+ [[${sex}]])
        }
    </script>
```



## 9.7  字面量

例子：

```html
 <div style="margin-left: 400px">
       <h3>文本字面量: 使用单引号括起来的字符串</h3>
       <p th:text="'我是'+${name}+',我所在的城市'+${city}">数据显示</p>

       <h3>数字字面量</h3>
        <p th:if="${20>5}"> 20大于 5</p>

        <h3>boolean字面量</h3>
        <p th:if="${isLogin == true}">用户已经登录系统</p>

        <h3>null字面量</h3>
        <p th:if="${myuser != null}">有myuser数据</p>
    </div>
```



## 9.8  字符串连接

连接字符串有两种语法

1） 语法使用 单引号括起来字符串  ， 使用 + 连接其他的 字符串或者表达式

```html
  <p th:text="'我是'+${name}+',我所在的城市'+${city}">数据显示</p>
```

2）语法：使用双竖线， |字符串和表达式|

```html
<p th:text="|我是${name},我所在城市${city|">
    显示数据
</p>
```



例子：

```html
    <div style="margin-left: 400px">
       <h3>字符串连接方式1：使用单引号括起来的字符串</h3>
       <p th:text="'我是'+${name}+',我所在的城市'+${city}">数据显示</p>
        <br/>
        <br/>
        <h3>字符串连接方式2：|字符串和表达式|</h3>
        <p th:text="|我是${name},所在城市${city},其他人${myuser.name}|"></p>
    </div>
```



## 9.9 运算符

```xml
算术运 算： + , - - , * , / , %
关系比较 : > , < , >= , <= ( gt , lt , ge , le )
相等判断： == , != ( eq , ne )


<div style="margin-left: 400px">
        <h3>使用运算符</h3>
        <p th:text="${age > 10}">年龄大于 10 </p>
        <p th:text="${ 20 + 30 }">显示运算结果</p>
        <p th:if="${myuser == null}">myuser是null</p>
        <p th:if="${myuser eq null}">myuser是null</p>
        <p th:if="${myuser ne null}">myuser不是null</p>

        <p th:text="${isLogin == true ? '用户已经登录' : '用户需要登录'}"></p>
        <p th:text="${isLogin == true ? ( age > 10 ? '用户是大于10的' : '用户年龄比较小') : '用户需要登录'}"></p>

    </div>

三元运算符：
 表达式  ？ true的结果 : false的结果

三元运算符可以嵌套

```



## 9.10 内置对象

文档地址：https://www.thymeleaf.org/doc/tutorials/3.0/usingthymeleaf.html#web-context-namespaces-for-requestsession-attributes-etc.



#request 表示 HttpServletRequest

#session 表示 HttpSession对象

session 表示Map对象的， 是#session的简单表示方式， 用来获取session中指定的key的值

​               #session.getAttribute("loginname") == session.loginname

​					如果要调用session的方法的话就一定要用 #session了

这些是内置对象，可以在模板文件中直接使用。

```html
例子：
 <div style="margin-left: 350px">
        <h3>内置对象#request,#session，session的使用</h3>
        <p>获取作用域中的数据</p>
        <p th:text="${#request.getAttribute('requestData')}"></p>
        <p th:text="${#session.getAttribute('sessionData')}"></p>
        <p th:text="${session.loginname}"></p>

        <br/>
        <br/>
        <h3>使用内置对象的方法</h3>
        getRequestURL=<span th:text="${#request.getRequestURL()}"></span><br/>
        getRequestURI=<span th:text="${#request.getRequestURI()}"></span><br/>
        getQueryString=<span th:text="${#request.getQueryString()}"></span><br/>
        getContextPath=<span th:text="${#request.getContextPath()}"></span><br/>
        getServerName=<span th:text="${#request.getServerName()}"></span><br/>
        getServerPort=<span th:text="${#request.getServerPort()}"></span><br/>
</div>
```





##  9.11 内置工具类

内置工具类型： Thymeleaf自己的一些类，提供对string， date ，集合的一些处理方法

#dates: 处理日器的工具类

#numbers:处理数字的

#lists: 处理list集合的

```xml
<div style="margin-left: 350px">
      <h3>日期类对象 #dates</h3>
      <p th:text="${#dates.format(mydate )}"></p>
      <p th:text="${#dates.format(mydate,'yyyy-MM-dd')}"></p>
      <p th:text="${#dates.format(mydate,'yyyy-MM-dd HH:mm:ss')}"></p>
      <p th:text="${#dates.year(mydate)}"></p>
      <p th:text="${#dates.month(mydate)}"></p>
      <p th:text="${#dates.monthName(mydate)}"></p>
      <p th:text="${#dates.createNow()}"></p>
      <br/>

      <h3>内置工具类#numbers，操作数字的</h3>
      <p th:text="${#numbers.formatCurrency(mynum)}"></p>
      <p th:text="${#numbers.formatDecimal(mynum,5,2)}"></p>

      <br/>
      <h3>内置工具类#strings,操作字符串</h3>
      <p th:text="${#strings.toUpperCase(mystr)}"></p>
      <p th:text="${#strings.indexOf(mystr,'power')}"></p>
      <p th:text="${#strings.substring(mystr,2,5)}"></p>
      <p th:text="${#strings.substring(mystr,2)}"></p>
      <p th:text="${#strings.concat(mystr,'---java开发的黄埔军校---')}"></p>
      <p th:text="${#strings.length(mystr)}"></p>
      <p th:text="${#strings.length('hello')}"></p>
      <p th:unless="${#strings.isEmpty(mystr)}"> mystring 不是 空字符串  </p>

      <br/>
      <h3>内置工具类#lists,操作list集合</h3>
      <p th:text="${#lists.size(mylist)}"></p>
      <p th:if="${#lists.contains(mylist,'a')}">有成员a</p>
      <p th:if="!${#lists.isEmpty(mylist)}"> list 集合有多个成员</p>

      <br/>
      <h3>处理null</h3>
      <p th:text="${zoo?.dog?.name}"></p>

  </div>
```



## 9.12 自定义模板

模板是内容复用， 定义一次，在其他的模板文件中多次使用。

模板使用：

1.定义模板

2.使用模板



模板定义语法：

```html
th:fragment="模板自定义名称"

例如：
<div th:fragment="head">
    <p>
        动力节点-java开发
    </p>
    <p>
        www.bjpowernode.com
    </p>
</div>
```



引用模板语法：

```html
1) ~{templatename :: selector}
   templatename:  文件名称
   selector： 自定义模板名称
2）templatename :: selector
   templatename:  文件名称
   selector： 自定义模板名称

对于使用模板：有包含模板（th:include）， 插入模板(th:insert)
```







# SSM和SpringBoot注解总结

## 注解

Spring + SpringMVC + SpringBoot 

```java
创建对象的：
@Controller: 放在类的上面，创建控制器对象，注入到容器中
@RestController: 放在类的上面，创建控制器对象，注入到容器中。
             作用：复合注解是@Controller , @ResponseBody, 使用这个注解类的，里面的控制器方法的返回值                   都是数据

@Service ： 放在业务层的实现类上面，创建service对象，注入到容器
@Repository : 放在dao层的实现类上面，创建dao对象，放入到容器。 没有使用这个注解，是因为现在使用MyBatis框               架，  dao对象是MyBatis通过代理生成的。 不需要使用@Repository、 所以没有使用。
@Component:  放在类的上面，创建此类的对象，放入到容器中。 

赋值的：
@Value ： 简单类型的赋值， 例如 在属性的上面使用@Value("李四") private String name
          还可以使用@Value,获取配置文件者的数据（properties或yml）。 
          @Value("${server.port}") private Integer port

@Autowired: 引用类型赋值自动注入的，支持byName, byType. 默认是byType 。 放在属性的上面，也可以放在构造             方法的上面。 推荐是放在构造方法的上面
@Qualifer:  给引用类型赋值，使用byName方式。   
            @Autowird, @Qualifer都是Spring框架提供的。

@Resource ： 来自jdk中的定义， javax.annotation。 实现引用类型的自动注入， 支持byName, byType.
             默认是byName, 如果byName失败， 再使用byType注入。 在属性上面使用


其他：
@Configuration ： 放在类的上面，表示这是个配置类，相当于xml配置文件

@Bean：放在方法的上面， 把方法的返回值对象，注入到spring容器中。

@ImportResource ： 加载其他的xml配置文件， 把文件中的对象注入到spring容器中

@PropertySource ： 读取其他的properties属性配置文件

@ComponentScan： 扫描器 ，指定包名，扫描注解的

@ResponseBody: 放在方法的上面，表示方法的返回值是数据， 不是视图
    
@RequestBody : 把请求体中的数据，读取出来， 转为java对象使用。(传来的是Json的时候用这个接，不是JSON的，比如直接表单提交的，直接写对象接就行)

@ControllerAdvice:  控制器增强， 放在类的上面， 表示此类提供了方法，可以对controller增强功能。

@ExceptionHandler : 处理异常的，放在方法的上面

@Transcational :  处理事务的， 放在service实现类的public方法上面， 表示此方法有事务
    
@RequestParam : 加在 Controller 方法参数上面，指定传参名字等（可以给defaultValue，指定没传参的默认值）


SpringBoot中使用的注解
    
@SpringBootApplication ： 放在启动类上面， 包含了@SpringBootConfiguration
                          @EnableAutoConfiguration， @ComponentScan


    
MyBatis相关的注解

@Mapper ： 放在类的上面 ， 让MyBatis找到接口， 创建他的代理对象    
@MapperScan :放在主类的上面 ， 指定扫描的包， 把这个包中的所有接口都创建代理对象。 对象注入到容器中
@Param ： 放在dao接口的方法的形参前面， 作为命名参数使用的。
    
Dubbo注解
@DubboService: 在提供者端使用的，暴露服务的， 放在接口的实现类上面
@DubboReference:  在消费者端使用的， 引用远程服务， 放在属性上面使用。
@EnableDubbo : 放在主类上面， 表示当前引用启用Dubbo功能。


```

















































































































































































