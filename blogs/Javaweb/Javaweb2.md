## JavaEE简介

- Java包括三大块：
  - JavaSE
    - Java标准版（一套类库：别人写好的一套类库，只不过这个类库是标准类库，走EE，或者走ME，这个SE一定是基础，先学。）
  - JavaEE（WEB方向，WEB系统。）
    - Java企业版（也是一套类库：也是别人写好的一套类库，只不过这套类库可以帮助我们完成企业级项目的开发，专门为企业内部提供解决方案的一套（多套）类库。）
    - 别人写好的，你用就行了，用它可以开发企业级项目。
    - 可以开发web系统。
    - Java比较火爆的就是这个JavaEE方向。
  - JavaME
    - Java微型版（还是一套类库，只不过这套类库帮助我们进行电子微型设备内核程序的开发）
    - 机顶盒内核程序，吸尘器内核程序，电冰箱内核程序，电饭煲内核程序。。。。。
- JavaEE实际上包括很多种规范，13种规范，其中Servlet就是JavaEE规范之一。学Servlet还是Java语言。



### 关于JavaEE的版本

- JavaEE目前最高版本是 JavaEE8
- JavaEE被Oracle捐献了，Oracle将JavaEE规范捐献给Apache了。
- Apache把JavaEE换名了，以后不叫JavaEE了，以后叫做 jakarta EE。
- 以后没有JavaEE了。以后都叫做`Jakarta EE`。
- JavaEE8版本升级之后的"JavaEE 9"，不再是"JavaEE9"这个名字了，叫做JakartaEE9
- JavaEE8的时候对应的Servlet类名是：javax.servlet.Servlet
- JakartaEE9的时候对应的Servlet类名是：jakarta.servlet.Servlet （包名都换了）
- 如果之前的项目还是在使用javax.servlet.Servlet，那么你的项目无法直接部署到Tomcat10+版本上。你只能部署到Tomcat9-版本上。在Tomcat9以及Tomcat9之前的版本中还是能够识别javax.servlet这个包。





## web服务器简介

- WEB服务器软件都有哪些呢？（这些软件都是提前开发好的。）
  - Tomcat（WEB服务器）
  - jetty（WEB服务器）
  - JBOSS（应用服务器）
  - WebLogic（应用服务器）
  - WebSphere（应用服务器）
- 应用服务器和WEB服务器的关系？
  - 应用服务器实现了JavaEE的所有规范。(JavaEE有13个不同的规范。)
  - WEB服务器只实现了JavaEE中的Servlet + JSP两个核心的规范。
  - 通过这个讲解说明了：应用服务器是包含WEB服务器的。
  - 用过JBOSS服务器的同学应该很清楚，JBOSS中内嵌了一个Tomcat服务器。



### Tomcat

#### 简介

- tomcat开源免费的轻量级WEB服务器。
- tomcat还有另外一个名字：catalina（catalina是美国的一个岛屿，风景秀丽，据说作者是在这个风景秀丽的小岛上开发了一个轻量级的WEB服务器，体积小，运行速度快，因此tomcat又被称为catalina）



#### 环境

Tomcat服务器要想运行，需要先有jre，所以要先安装JDK，配置java运行环境。

- JAVA_HOME=C:\Program Files\Java\jdk-17.0.1
- CATALINA_HOME=Tomcat服务器的根
- PATH=%JAVA_HOME%\bin;%CATALINA_HOME%\bin



#### 关于Tomcat服务器的目录

- bin ： 这个目录是Tomcat服务器的命令文件存放的目录，比如：启动Tomcat，关闭Tomcat等。
- conf： 这个目录是Tomcat服务器的配置文件存放目录。（server.xml文件中可以配置端口号，默认Tomcat端口是8080）
- lib ：这个目录是Tomcat服务器的核心程序目录，因为Tomcat服务器是Java语言编写的，这里的jar包里面都是class文件。
- logs: Tomcat服务器的日志目录，Tomcat服务器启动等信息都会在这个目录下生成日志文件。
- temp：Tomcat服务器的临时目录。存储临时文件。
- webapps：这个目录当中就是用来存放大量的webapp（web application：web应用）
- work：这个目录是用来存放JSP文件翻译之后的java文件以及编译之后的class文件。



#### Tomcat服务器在DOS命令窗口中的乱码问题（控制台乱码）

将`CATALINA_HOME/conf/logging.properties文件`中的内容修改如下：

`java.util.logging.ConsoleHandler.encoding = GBK`





## Servlet

### 规范

Servlet规范是一个什么规范？

- 遵循Servlet规范的webapp，这个webapp就可以放在不同的WEB服务器中运行。（因为这个webapp是遵循Servlet规范的。）
- Servlet规范包括什么呢？
  - 规范了哪些接口
  - 规范了哪些类
  - 规范了一个web应用中应该有哪些配置文件
  - 规范了一个web应用中配置文件的名字
  - 规范了一个web应用中配置文件存放的路径
  - 规范了一个web应用中配置文件的内容
  - 规范了一个合法有效的web应用它的目录结构应该是怎样的。
  - .....





### 在IDEA中开发

**注意**：在IDEA工具中根据Web Application模板生成的目录中有一个web目录，这个目录就代表webapp的根





### 生命周期

![image-20220819115829984](https://note-img54.oss-cn-hongkong.aliyuncs.com/note/Javaweb/Javaweb2.assets/image-20220819115829984.png)

当写了xxxServlet实现了Servlet之后，要重写以上五个方法。

#### Servlet对象更像一个人的一生：

- Servlet的无参数构造方法执行：标志着你出生了。
- Servlet对象的init方法的执行：标志着你正在接受教育。
- Servlet对象的service方法的执行：标志着你已经开始工作了，已经开始为人类提供服务了。
- Servlet对象的destroy方法的执行：标志着临终。有什么遗言，抓紧的。要不然，来不及了。

#### 关于Servlet类中方法的调用次数？

- 构造方法只执行一次。
- init方法只执行一次。
- service方法：用户发送一次请求则执行一次，发送N次请求则执行N次。
- destroy方法只执行一次。



#### 创建过程

1. Servlet对象的创建，对象上方法的调用，对象最终的销毁这些程序员都不能干预，生命周期由WEB Server（Tomcat服务器）负责

   - WEB Server（Tomcat服务器）通常称为`WEB容器【WEB Container】`
   - 由WEB容器创建的Servlet对象会被放进HashMap中统一管理（地址和Servlet对象之间的对应关系），如果自己new的话就不归WEB容器管了

2. 在服务器启动的时候默认是不会创建Servlet对象的

   - 可以在servlet标签加入`<load-on-startup>`子标签，在该子标签中填写整数，越小的整数优先级越高。这样就能在服务器启动的时候创建Servlet对象

     - ~~~xml
       <servlet>
           <servlet-name>aservlet</servlet-name>
           <servlet-class>com.javaweb.servlet.AServlet</servlet-class>
           <load-on-startup>1</load-on-startup>
       </servlet>
       <servlet-mapping>
           <servlet-name>aservlet</servlet-name>
           <url-pattern>/a</url-pattern>
       </servlet-mapping>
       ~~~

     

     

3. 默认情况下第一次发送请求的时候，对应的Servlet对象会创建，且**马上调用init和service方法**

   - 创建对象会执行无参构造，如果写了有参没给无参就会报错
   - 因为init和无参构造的执行时机差不多，所以如果有什么初始化的操作建议写进inti里，而不是写构造方法
   - 后续每次访问都只会调用service方法了，因为**Servlet对象是单例的**（单实例的。但是要注意：Servlet对象是单实例的，但是Servlet类并不符合单例模式。称之为假单例。之所以单例是因为Servlet对象的创建我们javaweb程序员管不着，这个对象的创建只能是Tomcat来说了算，Tomcat只创建了一个，所以导致了单例，但是属于假单例。真单例模式，构造方法是私有化的。）

4. 在服务器关闭之前，会最后调用一次Servlet对象的destroy方法

   - 这个方法只会调用一次，且在调用这个方法的时候Servlet对象的内存还没被销毁



### 优化代码--GenericServlet

因为在实现了Servlet之后要重写的五个方法里，service方法使用最多（每次请求都会调用一次），但是又要多写其他的方法，如果用不到就显得很冗余臃肿，所以要优化代码。

##### 解决方法（适配器模式）

1. 写一个抽象类（GenericServlet）来实现Servlet接口，并重写里面五个方法，但是把service方法改为抽象方法
2. 写业务的Servlet的时候就可以直接继承刚才写的GenericServlet，只需要把抽象方法service重写即可（代码简洁了）



##### 还有什么可以优化？

- 思考：GenericServlet类是否需要改造一下？怎么改造？更利于子类程序的编写？

  - 思考第一个问题：我提供了一个GenericServlet之后，init方法还会执行吗？

    - 还会执行。会执行GenericServlet类中的init方法。

  - 思考第二个问题：init方法是谁调用的？

    - Tomcat服务器调用的。

  - 思考第三个问题：init方法中的ServletConfig对象是谁创建的？是谁传过来的？

    - 都是Tomcat干的。
    - Tomcat服务器先创建了ServletConfig对象，然后调用init方法，将ServletConfig对象传给了init方法。


##### 模仿Tomcat服务器伪代码：

- ```java
  public class Tomcat {
      public static void main(String[] args){
          // .....
          // Tomcat服务器伪代码
          // 创建LoginServlet对象（通过反射机制，调用无参数构造方法来实例化LoginServlet对象）
          Class clazz = Class.forName("com.bjpowernode.javaweb.servlet.LoginServlet");
          Object obj = clazz.newInstance();
          
          // 向下转型
          Servlet servlet = (Servlet)obj;
          
          // 创建ServletConfig对象
          // Tomcat服务器负责将ServletConfig对象实例化出来。
          // 多态（Tomcat服务器完全实现了Servlet规范）
          ServletConfig servletConfig = new org.apache.catalina.core.StandardWrapperFacade();
          
          // 调用Servlet的init方法
          servlet.init(servletConfig);
          
          // 调用Servlet的service方法
          // ....
          
      }
  }
  ```



##### 改进GenericServlet（ServletConfig）

因为在GenericServlet里的init(ServletConfig servletConfig)和getServletConfig()方法都用到了ServletConfig 对象，不妨把ServletConfig 提出来做成员变量，那getServletConfig()相当于是它的getter了，继承了GenericServlet的子类也可以直接用this.getServletConfig()来获得返回的ServletConfig 对象了

代码大致如下：

```java
public class TestServlet implements Servlet {
    
    private ServletConfig servletConfig;
    
    @Override
    public void init(ServletConfig servletConfig) throws ServletException {
        this.servletConfig = servletConfig;
    }

    @Override
    public ServletConfig getServletConfig() {
        return servletConfig;
    }
	
    ...省略其他方法
}
```



##### 改进GenericServlet（init）

因为自己写的GenericServlet里给了init，如果子类重写了同样的init的话会导致父类（GenericServlet）的init方法失效，那就意味着在GenericServlet的init方法里给ServletConfig对象赋值的操作无法执行！！

解决办法：

1. 可以对GenericServlet的init方法进行重载，重载一个无参数的init方法。
2. 子类如果需要一个init方法（只在初始化的时候调用一次且后续不会再用）的话，就直接重写父类的无参数的init方法，把代码写里面就行
3. 父类在原来的有参init方法里调用一下新加的无参数的init方法即可



代码大致如下：

~~~java
public class TestServlet implements Servlet {

    private ServletConfig servletConfig;

    @Override
    public void init(ServletConfig servletConfig) throws ServletException {
        this.servletConfig = servletConfig;
        this.init(); // 调用一下新写的init方法
    }
    
    public void init() throws ServletException {
        // 专门给子类来继承用的
    }

    @Override
    public ServletConfig getServletConfig() {
        return servletConfig;
    }
	
    ...省略其他方法
}
~~~



##### 源码自带GenericServlet

![image-20220819150323480](https://note-img54.oss-cn-hongkong.aliyuncs.com/note/Javaweb/Javaweb2.assets/image-20220819150323480.png)

~~~java
// GenericServlet 源码

package jakarta.servlet;

import java.io.IOException;
import java.util.Enumeration;


public abstract class GenericServlet implements Servlet, ServletConfig,
java.io.Serializable {

    private static final long serialVersionUID = 1L;

    // transient修饰的代表不参与序列化
    private transient ServletConfig config;

	// 无参构造
    public GenericServlet() {
        // NOOP
    }


    @Override
    public void destroy() {
        // NOOP by default
    }


    @Override
    public String getInitParameter(String name) {
        return getServletConfig().getInitParameter(name);
    }


    @Override
    public Enumeration<String> getInitParameterNames() {
        return getServletConfig().getInitParameterNames();
    }


    @Override
    public ServletConfig getServletConfig() {
        return config;
    }


    @Override
    public ServletContext getServletContext() {
        return getServletConfig().getServletContext();
    }


    @Override
    public String getServletInfo() {
        return "";
    }


    @Override
    public void init(ServletConfig config) throws ServletException {
        this.config = config;
        this.init();
    }


    public void init() throws ServletException {
        // NOOP by default
    }


    public void log(String message) {
        getServletContext().log(getServletName() + ": " + message);
    }


    public void log(String message, Throwable t) {
        getServletContext().log(getServletName() + ": " + message, t);
    }


    @Override
    public abstract void service(ServletRequest req, ServletResponse res)
        throws ServletException, IOException;


    @Override
    public String getServletName() {
        return config.getServletName();
    }
}

~~~







### ServletConfig

<img src="https://note-img54.oss-cn-hongkong.aliyuncs.com/note/Javaweb/Javaweb2.assets/image-20220819155248247.png" alt="image-20220819155248247" style="zoom:200%;" />



#### 什么是ServletConfig

`ServletConfig`是一个**接口**。（`jakarta.servlet.Servlet`是一个接口。）`ServletConfig`是`Servlet规范`中的一员。



- Servlet对象的配置信息对象。

- ServletConfig对象中封装了`<servlet></servlet>`标签中的配置信息。（web.xml文件中servlet的配置信息如下所示）

  - ~~~xml
    <servlet>
        <servlet-name>configTest</servlet-name>
        <servlet-class>com.javaweb.servlet.ConfigTestServlet</servlet-class>
        <!--这里是可以配置一个Servlet对象的初始化信息的。-->
        <init-param>
            <param-name>driver</param-name>
            <param-value>com.mysql.cj.jdbc.Driver</param-value>
        </init-param>
        <init-param>
            <param-name>url</param-name>
            <param-value>jdbc:mysql://localhost:3306/bjpowernode</param-value>
        </init-param>
        <init-param>
            <param-name>user</param-name>
            <param-value>root</param-value>
        </init-param>
        <init-param>
            <param-name>password</param-name>
            <param-value>root1234</param-value>
        </init-param>
    </servlet>
    ~~~



- **一个Servlet对应一个ServletConfig对象**。（Servlet和ServletConfig对象是一对一。）
- 谁创建的？何时创建的？
  - Servlet对象是Tomcat服务器创建，并且ServletConfig对象也是Tomcat服务器创建。并且默认情况下，他们都是在用户发送第一次请求的时候创建。

- Tomcat服务器调用Servlet对象的`init方法`的时候需要传一个`ServletConfig对象`的参数给init方法。
- ServletConfig接口的实现类是Tomcat服务器给实现的。（Tomcat服务器说的就是WEB服务器。）



#### ServletConfig接口常用的方法

- ```java
  public String getInitParameter(String name); // 通过初始化参数的name获取value
  public Enumeration<String> getInitParameterNames(); // 获取所有的初始化参数的name
  public ServletContext getServletContext(); // 获取ServletContext对象
  public String getServletName(); // 获取Servlet的name
  ```

- 以上方法在Servlet类当中，都`可以使用this去调用`（这个Servlet类要继承GenericServlet）。因为`GenericServlet实现了ServletConfig接口`。





### ServletContext

#### 是什么

1. ServletContext被称为Servlet上下文对象（Servlet对象的四周环境对象），一个ServletContext对象通常对应的是一个web.xml文件。
2. ServletContext是一个接口，Tomcat服务器对ServletContext接口进行了实现。创建也是Tomcat服务器来完成的，在服务器启动阶段创建，在服务器关闭的时候销毁。这就是ServletContext对象的生命周期。ServletContext对象是应用级对象。
3. ServletContext对象还有另一个名字：应用域（后面还有其他域，例如：请求域、会话域）
   - [request请求域](# 获取请求域数据)

4. 一个Servlet对象对应一个ServletConfig。100个Servlet对象则对应100个ServletConfig对象。而只要在同一个webapp当中，只要在同一个应用当中，所有的Servlet对象都是**共享同一个**ServletContext对象的。
   - Tomcat服务器中有一个webapps，这个webapps下可以存放webapp，可以存放多个webapp，假设有100个webapp，那么就有100个ServletContext对象。但是，总之，一个应用，一个webapp肯定是只有一个ServletContext对象。



#### 对应生活中的例子

一个教室有很多学生，每个学生是`Servlet`，那么这些学生所在的教室就可以看做`ServletContext对象`（只有一个教室）。这些教室里的公共资源都给所有学生共享（黑板、老师、灯、风扇...）

如果要获取某个学生的信息，要用`ServletConfig接口`里的[方法](# ServletConfig接口常用的方法)

如果要获取班上的公共资源信息，要用`ServletContext接口`里的[方法](# ServletContext接口常用方法)





#### ServletContext中存取删数据

常用方法：

1. **存**（怎么向ServletContext应用域中存数据）
   - `public void setAttribute(String name, Object value);`
   - 相当于：map.put(k, v)
2. **取**（怎么从ServletContext应用域中取数据）
   - `public Object getAttribute(String name); `
   - 相当于：Object v = map.get(k)
3. **删**（怎么删除ServletContext应用域中的数据）
   - `public void removeAttribute(String name); `
   - 相当于：map.remove(k)



#### ServletContext中数据的特点

1. 数据被所有Servlet共享
   - 因为整个webapp都共享这一个ServletContext，所以里面的数据肯定是存共享的
2. 数据很少被修改
   - 因为数据是共享的，如果设计修改操作会带来线程并发的安全问题，所以里面的数据一般是存只读的
3. 数据量很少
   - 因为在ServletContext中数据的生命周期是跟随服务器的，生命周期长。如果数据量大的话会占大量堆内存，影响服务器性能

数据量小、所有用户共享、又不修改，这样的数据放到ServletContext这个应用域当中，会大大提升效率。因为应用域相当于一个缓存，放到缓存中的数据，下次在用的时候，不需要从数据库中再次获取，大大提升执行效率。



#### ServletContext接口常用方法

##### 通过初始化参数的name获取value

`public String getInitParameter(String name);`

##### 获取所有的初始化参数的name

`public Enumeration<String> getInitParameterNames();`

- ~~~xml
  <!--以上两个方法是ServletContext对象的方法，这个方法获取的是什么信息？是以下的配置信息-->
  <context-param>
      <param-name>pageSize</param-name>
      <param-value>10</param-value>
  </context-param>
  <context-param>
      <param-name>startIndex</param-name>
      <param-value>0</param-value>
  </context-param>
  <!--注意：以上的配置信息属于应用级的配置信息，一般一个项目中共享的配置信息会放到以上的标签当中。-->
  <!--如果你的配置信息只是想给某一个servlet作为参考，那么你配置到servlet标签当中即可，使用ServletConfig对象来获取。-->
  ~~~

##### :star:获取应用的根路径

`public String getContextPath();`

- ```java
  // 获取应用的根路径（非常重要），因为在java源代码当中有一些地方可能会需要应用的根路径，这个方法可以动态获取应用的根路径
  // 在java源码当中，不要将应用的根路径写死，因为你永远都不知道这个应用在最终部署的时候，起一个什么名字。
  
  //String contextPath = application.getContextPath();
  ```

##### 获取文件的绝对路径（真实路径）

`public String getRealPath(String path);`

##### 记录日志

`public void log(String message);`
`public void log(String message, Throwable t);`

- ```java
  // 通过ServletContext对象也是可以记录日志的
  public void log(String message);
  public void log(String message, Throwable t);
  // 这些日志信息记录到哪里了？
  // 因为idea可以设置多个tomcat副本，所以idea的tomcat会在idea的文件夹中
  // 在项目启动的时候会显示
  Using CATALINA_BASE:   "C:\Users\11788\AppData\Local\JetBrains\IntelliJIdea2021.3\tomcat\cbdd145a-e6ca-4011-addb-bbff214d2a19"
  // 这就是idea的当前tomcat的位置，进去找logs机型
  // localhost.2021-11-05.log
  
  // Tomcat服务器的logs目录下都有哪些日志文件？
  //catalina.2021-11-05.log 服务器端的java程序运行的控制台信息。
  //localhost.2021-11-05.log ServletContext对象的log方法记录的日志信息存储到这个文件中。
  //localhost_access_log.2021-11-05.txt 访问日志
  ```

  



### HttpServlet引言

注意：以后编写`Servlet类`的时候，实际上是不会去直接继承`GenericServlet类`的，因为我们是`B/S结构`的系统，这种系统是基于`HTTP超文本传输协议`的，在Servlet规范当中，提供了一个类叫做`HttpServlet`，它是专门为HTTP协议准备的一个Servlet类。我们编写的Servlet类要继承HttpServlet。（HttpServlet是HTTP协议专用的。）使用`HttpServlet`处理HTTP协议更便捷。但是需要知道它的继承结构：

- ```
  jakarta.servlet.Servlet（接口）【爷爷】
  jakarta.servlet.GenericServlet implements Servlet（抽象类）【儿子】
  jakarta.servlet.http.HttpServlet extends GenericServlet（抽象类）【孙子】
  
  我们以后编写的Servlet要继承HttpServlet类。
  ```

## 拓展--缓存

> 到目前位置学过的缓存：

- 堆内存当中的字符串常量池。
  - "abc" 先在字符串常量池中查找，如果有，直接拿来用。如果没有则新建，然后再放入字符串常量池。
- 堆内存当中的整数型常量池。
  - [-128 ~ 127] 一共256个Integer类型的引用，放在整数型常量池中。没有超出这个范围的话，直接从常量池中取。
- 连接池(Connection Cache)
  - 这里所说的连接池中的连接是java语言连接数据库的连接对象：java.sql.Connection对象。
  - JVM是一个进程。MySQL数据库是一个进程。进程和进程之间建立连接，打开通道是很费劲的。是很耗费资源的。怎么办？可以提前先创建好N个Connection连接对象，将连接对象放到一个集合当中，我们把这个放有Connection对象的集合称为连接池。每一次用户连接的时候不需要再新建连接对象，省去了新建的环节，直接从连接池中获取连接对象，大大提升访问效率。
  - 连接池
    - 最小连接数
    - 最大连接数
    - 连接池可以提高用户的访问效率。当然也可以保证数据库的安全性。
- 线程池
  - Tomcat服务器本身就是支持多线程的。
  - Tomcat服务器是在用户发送一次请求，就新建一个Thread线程对象吗？
    - 当然不是，实际上是在Tomcat服务器启动的时候，会先创建好N多个线程Thread对象，然后将线程对象放到集合当中，称为线程池。用户发送请求过来之后，需要有一个对应的线程来处理这个请求，这个时候线程对象就会直接从线程池中拿，效率比较高。
    - 所有的WEB服务器，或者应用服务器，都是支持多线程的，都有线程池机制。
- redis
  - NoSQL数据库。非关系型数据库。缓存数据库。
- **向ServletContext应用域中存储数据，也等于是将数据存放到缓存cache当中了。**

## HTTP协议

- 什么是HTTP协议？

  - HTTP协议：是W3C制定的一种超文本传输协议。（通信协议：发送消息的模板提前被制定好。）
  - W3C：
    - 万维网联盟组织
    - 负责制定标准的：HTTP HTML4.0 HTML5 XML DOM等规范都是W3C制定的。
    - 万维网之父：蒂姆·伯纳斯·李
  - 什么是超文本？
    - 超文本说的就是：不是普通文本，比如流媒体：声音、视频、图片等。
    - HTTP协议支持：不但可以传送普通字符串，同样支持传递声音、视频、图片等流媒体信息。
  - 这种协议游走在B和S之间。B向S发数据要遵循HTTP协议。S向B发数据同样需要遵循HTTP协议。这样B和S才能解耦合。
  - 什么是解耦合？
    - B不依赖S。
    - S也不依赖B。
  - B/S表示：B/S结构的系统（浏览器访问WEB服务器的系统）
  - 浏览器   向   WEB服务器发送数据，叫做：请求（request)
  - WEB服务器   向   浏览器发送数据，叫做：响应（response）
  - HTTP协议包括：
    - 请求协议
      - 浏览器  向   WEB服务器发送数据的时候，这个发送的数据需要遵循一套标准，这套标准中规定了发送的数据具体格式。
    - 响应协议
      - WEB服务器  向  浏览器发送数据的时候，这个发送的数据需要遵循一套标准，这套标准中规定了发送的数据具体格式。
  - HTTP协议就是提前制定好的一种消息模板。
    - 不管你是哪个品牌的浏览器，都是这么发。
    - 不管你是哪个品牌的WEB服务器，都是这么发。
    - FF浏览器  可以向 Tomcat发送请求，也可以向Jetty服务器发送请求。浏览器不依赖具体的服务器品牌。
    - WEB服务器也不依赖具体的浏览器品牌。可以是FF浏览器，也可以是Chrome浏览器，可以是IE，都行。


### HTTP的请求协议（B --> S）

- HTTP的请求协议包括：4部分

  - 请求行
  - 请求头
  - 空白行
  - 请求体

- HTTP请求协议的具体报文：GET请求

  - ```
    GET /servlet05/getServlet?username=lucy&userpwd=1111 HTTP/1.1                           请求行
    Host: localhost:8080                                                                    请求头
    Connection: keep-alive
    sec-ch-ua: "Google Chrome";v="95", "Chromium";v="95", ";Not A Brand";v="99"
    sec-ch-ua-mobile: ?0
    sec-ch-ua-platform: "Windows"
    Upgrade-Insecure-Requests: 1
    User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.54 Safari/537.36
    Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9
    Sec-Fetch-Site: same-origin
    Sec-Fetch-Mode: navigate
    Sec-Fetch-User: ?1
    Sec-Fetch-Dest: document
    Referer: http://localhost:8080/servlet05/index.html
    Accept-Encoding: gzip, deflate, br
    Accept-Language: zh-CN,zh;q=0.9
                                                                                            空白行
                                                                                            请求体
    ```

  

- HTTP请求协议的具体报文：POST请求

  - ```
    POST /servlet05/postServlet HTTP/1.1                                                  请求行
    Host: localhost:8080                                                                  请求头
    Connection: keep-alive
    Content-Length: 25
    Cache-Control: max-age=0
    sec-ch-ua: "Google Chrome";v="95", "Chromium";v="95", ";Not A Brand";v="99"
    sec-ch-ua-mobile: ?0
    sec-ch-ua-platform: "Windows"
    Upgrade-Insecure-Requests: 1
    Origin: http://localhost:8080
    Content-Type: application/x-www-form-urlencoded
    User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.54 Safari/537.36
    Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9
    Sec-Fetch-Site: same-origin
    Sec-Fetch-Mode: navigate
    Sec-Fetch-User: ?1
    Sec-Fetch-Dest: document
    Referer: http://localhost:8080/servlet05/index.html
    Accept-Encoding: gzip, deflate, br
    Accept-Language: zh-CN,zh;q=0.9
                                                                                          空白行
    username=lisi&userpwd=123                                                             请求体
    ```


#### 请求行

- 包括三部分：
  - 第一部分：请求方式（7种）
    1. get（常用的）
    2. post（常用的）
    3. delete
    4. put
    5. head
    6. options
    7. trace
  - 第二部分：URI
    - 什么是URI？ 统一资源标识符。代表网络中某个资源的名字。但是通过URI是无法定位资源的。
    - 什么是URL？统一资源定位符。代表网络中某个资源，同时，通过URL是可以定位到该资源的。
    - URI和URL什么关系，有什么区别？
      - URL包括URI
      - http://localhost:8080/servlet05/index.html 这是URL。
      - /servlet05/index.html 这是URI。
  - 第三部分：HTTP协议版本号

#### 请求头

- 请求的主机
- 主机的端口
- 浏览器信息
- 平台信息
- cookie等信息
- ....

#### 空白行

- 空白行是用来区分“请求头”和“请求体”

#### 请求体

- 向服务器发送的具体数据。

### HTTP的响应协议（S --> B）

#### HTTP的响应协议包括：4部分

1. 状态行
2. 响应头
3. 空白行
4. 响应体

- HTTP响应协议的具体报文：

  - ```
    HTTP/1.1 200 ok                                     状态行
    Content-Type: text/html;charset=UTF-8               响应头
    Content-Length: 160
    Date: Mon, 08 Nov 2021 13:19:32 GMT
    Keep-Alive: timeout=20
    Connection: keep-alive
                                                        空白行
    <!doctype html>                                     响应体
    <html>
        <head>
            <title>from get servlet</title>
        </head>
        <body>
            <h1>from get servlet</h1>
        </body>
    </html>
    ```


#### 状态行

- 三部分组成
  - 第一部分：协议版本号（HTTP/1.1）
  - 第二部分：状态码（HTTP协议中规定的响应状态号。不同的响应结果对应不同的号码。）
    - 200 表示请求响应成功，正常结束。
    - 404表示访问的资源不存在，通常是因为要么是你路径写错了，要么是路径写对了，但是服务器中对应的资源并没有启动成功。总之404错误是前端错误。
    - 405表示前端发送的请求方式与后端请求的处理方式不一致时发生：
      - 比如：前端是POST请求，后端的处理方式按照get方式进行处理时，发生405
      - 比如：前端是GET请求，后端的处理方式按照post方式进行处理时，发生405
    - 500表示服务器端的程序出现了异常。一般会认为是服务器端的错误导致的。
    - 以4开始的，一般是浏览器端的错误导致的。
    - 以5开始的，一般是服务器端的错误导致的。
  - 第三部分：状态的描述信息
    - ok 表示正常成功结束。
    - not found 表示资源找不到。

#### 响应头

- 响应的内容类型
- 响应的内容长度
- 响应的时间
- ....

#### 空白行

- 用来分隔“响应头”和“响应体”的。

#### 响应体

- 响应体就是响应的正文，这些内容是一个长的字符串，这个字符串被浏览器渲染，解释并执行，最终展示出效果。

- 怎么查看的协议内容？

  - 使用chrome浏览器：F12。然后找到network，通过这个面板可以查看协议的具体内容。

- 怎么向服务器发送GET请求，怎么向服务器发送POST请求？

  - 到目前为止，只有一种情况可以发送POST请求：使用form表单，并且form标签中的method属性值为：method="post"。
  - 其他所有情况一律都是get请求：
    - 在浏览器地址栏上直接输入URL，敲回车，属于get请求。
    - 在浏览器上直接点击超链接，属于get请求。
    - 使用form表单提交数据时，form标签中没有写method属性，默认就是get
    - 或者使用form的时候，form标签中method属性值为：method="get"
    - ....


### GET请求和POST请求有什么区别？

- get请求发送数据的时候，数据会挂在URI的后面，并且在URI后面添加一个“?”，"?"后面是数据。这样会导致发送的数据回显在浏览器的地址栏上。（get请求在“请求行”上发送数据）
  - http://localhost:8080/servlet05/getServlet?username=zhangsan&userpwd=1111
- post请求发送数据的时候，在请求体当中发送。不会回显到浏览器的地址栏上。也就是说post发送的数据，在浏览器地址栏上看不到。（post在“请求体”当中发送数据）
- get请求只能发送普通的字符串。并且发送的字符串长度有限制，不同的浏览器限制不同。这个没有明确的规范。
- `get请求无法发送大数据量`。
- `post请求可以发送任何类型的数据`，包括普通字符串，流媒体等信息：视频、声音、图片。
- post请求可以发送大数据量，理论上没有长度限制。
- get请求在W3C中是这样说的：get请求比较适合从服务器端获取数据。
- post请求在W3C中是这样说的：post请求比较适合向服务器端传送数据。
- `get请求是安全的`。get请求是绝对安全的。为什么？因为get请求只是为了从服务器上获取数据。不会对服务器造成威胁。（get本身是安全的，你不要用错了。用错了之后又冤枉人家get不安全，你这样不好（太坏了），那是你自己的问题，不是get请求的问题。）
- `post请求是危险的`。为什么？因为post请求是向服务器提交数据，如果这些数据通过后门的方式进入到服务器当中，服务器是很危险的。另外post是为了提交数据，所以一般情况下拦截请求的时候，大部分会选择拦截（监听）post请求。
- **`get请求支持缓存`**。
  - https://n.sinaimg.cn/finance/590/w240h350/20211101/b40c-b425eb67cabc342ff5b9dc018b4b00cc.jpg
  - 任何一个get请求最终的“响应结果”都会被浏览器缓存起来。在浏览器缓存当中：
    - 一个get请求的路径a  对应  一个资源。
    - 一个get请求的路径b  对应  一个资源。
    - 一个get请求的路径c  对应  一个资源。
    - ......
  - 实际上，你只要发送get请求，浏览器做的第一件事都是先从本地浏览器缓存中找，找不到的时候才会去服务器上获取。这种缓存机制目的是为了提高用户的体验。
  - 有没有这样一个需求：我们不希望get请求走缓存，怎么办？怎么避免走缓存？我希望每一次这个get请求都去服务器上找资源，我不想从本地浏览器的缓存中取。
    - 只要每一次get请求的请求路径不同即可。
    - https://n.sinaimg.cn/finance/590/w240h350/20211101/7cabc342ff5b9dc018b4b00cc.jpg?t=789789787897898
    - https://n.sinaimg.cn/finance/590/w240h350/20211101/7cabc342ff5b9dc018b4b00cc.jpg?t=789789787897899
    - https://n.sinaimg.cn/finance/590/w240h350/20211101/7cabc342ff5b9dc018b4b00cc.jpg?t=系统毫秒数
    - 怎么解决？可以在路径的后面添加一个每时每刻都在变化的“时间戳”，这样，每一次的请求路径都不一样，浏览器就不走缓存了。
- `post请求不支持缓存`。（POST是用来修改服务器端的资源的。）
  - post请求之后，服务器“响应的结果”不会被浏览器缓存起来。因为这个缓存没有意义。

### GET请求和POST请求如何选择

什么时候使用GET请求，什么时候使用POST请求？

- 怎么选择GET请求和POST请求呢？衡量标准是什么呢？你这个请求是想获取服务器端的数据，还是想向服务器发送数据。如果你是想从服务器上获取资源，建议使用GET请求，如果你这个请求是为了向服务器提交数据，建议使用POST请求。
- 大部分的form表单提交，都是post方式，因为form表单中要填写大量的数据，这些数据是收集用户的信息，一般是需要传给服务器，服务器将这些数据保存/修改等。
- 如果表单中有敏感信息，还是建议适用post请求，因为get请求会回显敏感信息到浏览器地址栏上。（例如：密码信息）
- 做文件上传，一定是post请求。要传的数据不是普通文本。
- 其他情况都可以使用get请求。

- 不管你是get请求还是post请求，发送的请求数据格式是完全相同的，只不过位置不同，格式都是统一的：

  - name=value&name=value&name=value&name=value
  - name是什么？
    - 以form表单为例：form表单中input标签的name。
  - value是什么？
    - 以form表单为例：form表单中input标签的value。

## 模板方法设计模式

### 什么是设计模式？

- 某个问题的固定的解决方案。(可以被重复使用。)

### 有哪些设计模式？

- GoF设计模式：
  - 通常我们所说的23种设计模式。（Gang of Four：4人组提出的设计模式）
  - 单例模式
  - 工厂模式
  - 代理模式
  - 门面模式
  - 责任链设计模式
  - 观察者模式
  - 模板方法设计模式
  - .....
- JavaEE设计模式：
  - DAO
  - DTO
  - VO
  - PO
  - pojo
  - ....
- ....

### 什么是模板方法设计模式？

> 有一个抽象类，里面规定了一系列操作流程，如果有个别流程是因不同的子类而异的，其他的又都一样的话，那就可以把那个不同的流程设置成抽象的。等子类来继承的时候只需要重写那些不一样流程的即可

- 在模板类的模板方法当中定义核心算法骨架，具体的实现步骤可以延迟到子类当中完成。

- 模板类通常是一个抽象类，模板类当中的模板方法定义核心算法，这个方法通常是final的（但也可以不是final的）
- 模板类当中的抽象方法就是不确定实现的方法，这个不确定怎么实现的事儿交给子类去做。



## HttpServlet源码分析

### 为什么要有HttpServlet

`HttpServlet类`是专门`为HTTP协议`准备的。比`GenericServlet`**更加适合HTTP协议下的开发。**



- HttpServlet**在哪个包下**？
  - `jakarta.servlet.http.HttpServlet`
- 到目前为止我们接触了**servlet规范中哪些接口**？
  - `jakarta.servlet.Servlet`  核心接口（接口）
  - `jakarta.servlet.ServletConfig` Servlet配置信息接口（接口）
  - `jakarta.servlet.ServletContext` Servlet上下文接口（接口）
  - `jakarta.servlet.ServletRequest` Servlet请求接口（接口）
  - `jakarta.servlet.ServletResponse` Servlet响应接口（接口）
  - `jakarta.servlet.ServletException` Servlet异常（类）
  - `jakarta.servlet.GenericServlet `标准通用的Servlet类（抽象类）
- **http包下**都有哪些类和接口呢？`jakarta.servlet.http.*;`
  - `jakarta.servlet.http.HttpServlet `（HTTP协议专用的Servlet类，抽象类）
  - `jakarta.servlet.http.HttpServletRequest `（HTTP协议专用的请求对象）
  - `jakarta.servlet.http.HttpServletResponse` （HTTP协议专用的响应对象）
- `HttpServletRequest对象`中封装了什么信息？
  - `HttpServletRequest`，简称request对象。
  - `HttpServletRequest`中封装了请求协议的全部内容。
  - Tomcat服务器（WEB服务器）将“请求协议”中的数据全部解析出来，然后将这些数据全部封装到request对象当中了。
  - 也就是说，我们只要面向HttpServletRequest，就可以获取请求协议中的数据。
- HttpServletResponse对象是专门用来响应HTTP协议到浏览器的。

### 回忆Servlet生命周期？

- 用户第一次请求
  - Tomcat服务器通过反射机制，调用无参数构造方法。创建Servlet对象。(web.xml文件中配置的Servlet类对应的对象。)
  - Tomcat服务器调用Servlet对象的init方法完成初始化。
  - Tomcat服务器调用Servlet对象的service方法处理请求。
- 用户第二次请求
  - Tomcat服务器调用Servlet对象的service方法处理请求。
- 用户第三次请求
  - Tomcat服务器调用Servlet对象的service方法处理请求。
- ....
  - Tomcat服务器调用Servlet对象的service方法处理请求。
- 服务器关闭
  - Tomcat服务器调用Servlet对象的destroy方法，做销毁之前的准备工作。
  - Tomcat服务器销毁Servlet对象。

### HttpServlet源码分析：

```java
public class HelloServlet extends HttpServlet {
	// 1. 用户第一次请求，创建HelloServlet对象的时候，会执行这个无参数构造方法。
	public HelloServlet() {
    }
    
    //override 重写 doGet方法
    //override 重写 doPost方法
}

public abstract class GenericServlet implements Servlet, ServletConfig,
        java.io.Serializable {
           
	// 2. 用户第一次请求的时候，HelloServlet对象第一次被创建之后，这个init方法会执行。
    public void init(ServletConfig config) throws ServletException {
        this.config = config;
        this.init();
    }
	// 3. 用户第一次请求的时候，带有参数的init(ServletConfig config)执行之后，会执行这个没有参数的init()
	public void init() throws ServletException {
        // NOOP by default
    }
}

// HttpServlet模板类。
public abstract class HttpServlet extends GenericServlet {
    // 4. 用户发送第一次请求的时候这个service会执行
    // 用户发送第N次请求的时候，这个service方法还是会执行。
    // 用户只要发送一次请求，这个service方法就会执行一次。
    @Override
    public void service(ServletRequest req, ServletResponse res)
        throws ServletException, IOException {

        HttpServletRequest  request;
        HttpServletResponse response;

        try {
            // 将ServletRequest和ServletResponse向下转型为带有Http的HttpServletRequest和HttpServletResponse
            request = (HttpServletRequest) req;
            response = (HttpServletResponse) res;
        } catch (ClassCastException e) {
            throw new ServletException(lStrings.getString("http.non_http"));
        }
        // 5. 调用重载的service方法。
        service(request, response);
    }
    
    // 这个service方法的两个参数都是带有Http的。
    // 这个service是一个模板方法。
    // 在该方法中定义核心算法骨架，具体的实现步骤延迟到子类中去完成。
    // 5. 由参数不带http的service方法调用的这个方法
    protected void service(HttpServletRequest req, HttpServletResponse resp)
        throws ServletException, IOException {
        // 获取请求方式
        // 这个请求方式最终可能是：""
        // 注意：request.getMethod()方法获取的是请求方式，可能是七种之一：
        // GET POST PUT DELETE HEAD OPTIONS TRACE
        String method = req.getMethod();

        // 如果请求方式是GET请求，则执行doGet方法。
        if (method.equals(METHOD_GET)) {
            long lastModified = getLastModified(req);
            if (lastModified == -1) {
                // servlet doesn't support if-modified-since, no reason
                // to go through further expensive logic
                doGet(req, resp);
            } else {
                long ifModifiedSince;
                try {
                    ifModifiedSince = req.getDateHeader(HEADER_IFMODSINCE);
                } catch (IllegalArgumentException iae) {
                    // Invalid date header - proceed as if none was set
                    ifModifiedSince = -1;
                }
                if (ifModifiedSince < (lastModified / 1000 * 1000)) {
                    // If the servlet mod time is later, call doGet()
                    // Round down to the nearest second for a proper compare
                    // A ifModifiedSince of -1 will always be less
                    maybeSetLastModified(resp, lastModified);
                    doGet(req, resp);
                } else {
                    resp.setStatus(HttpServletResponse.SC_NOT_MODIFIED);
                }
            }

        } else if (method.equals(METHOD_HEAD)) {
            long lastModified = getLastModified(req);
            maybeSetLastModified(resp, lastModified);
            doHead(req, resp);

        } else if (method.equals(METHOD_POST)) {
            // 如果请求方式是POST请求，则执行doPost方法。
            doPost(req, resp);

        } else if (method.equals(METHOD_PUT)) {
            doPut(req, resp);

        } else if (method.equals(METHOD_DELETE)) {
            doDelete(req, resp);

        } else if (method.equals(METHOD_OPTIONS)) {
            doOptions(req,resp);

        } else if (method.equals(METHOD_TRACE)) {
            doTrace(req,resp);

        } else {
            //
            // Note that this means NO servlet supports whatever
            // method was requested, anywhere on this server.
            //

            String errMsg = lStrings.getString("http.method_not_implemented");
            Object[] errArgs = new Object[1];
            errArgs[0] = method;
            errMsg = MessageFormat.format(errMsg, errArgs);

            resp.sendError(HttpServletResponse.SC_NOT_IMPLEMENTED, errMsg);
        }
    }
    
    // 6. 如果是get，且子类没重写doGet的话，会到这里。报405
    protected void doGet(HttpServletRequest req, HttpServletResponse resp)
        throws ServletException, IOException{
        // 报405错误
        String msg = lStrings.getString("http.method_get_not_supported");
        sendMethodNotAllowed(req, resp, msg);
    }
    
    protected void doPost(HttpServletRequest req, HttpServletResponse resp)
        throws ServletException, IOException {
        // 报405错误
        String msg = lStrings.getString("http.method_post_not_supported");
        sendMethodNotAllowed(req, resp, msg);
    }
    
}

/*
通过以上源代码分析：
	假设前端发送的请求是get请求，后端程序员重写的方法是doPost
	假设前端发送的请求是post请求，后端程序员重写的方法是doGet
	会发生什么呢？
		发生405这样的一个错误。
		405表示前端的错误，发送的请求方式不对。和服务器不一致。不是服务器需要的请求方式。
	
	通过以上源代码可以知道：只要HttpServlet类中的doGet方法或doPost方法执行了，必然405.

怎么避免405的错误呢？
	后端重写了doGet方法，前端一定要发get请求。
	后端重写了doPost方法，前端一定要发post请求。
	这样可以避免405错误。
	
	这种前端到底需要发什么样的请求，其实应该后端说了算。后端让发什么方式，前端就得发什么方式。
	
有的人，你会看到为了避免405错误，在Servlet类当中，将doGet和doPost方法都进行了重写。
这样，确实可以避免405的发生，但是不建议，405错误还是有用的。该报错的时候就应该让他报错。
如果你要是同时重写了doGet和doPost，那还不如你直接重写service方法好了。这样代码还能
少写一点。
*/


```

- 我们编写的HelloServlet直接继承HttpServlet，直接重写HttpServlet类中的service()方法行吗？
  - 可以，只不过你享受不到405错误。享受不到HTTP协议专属的东西。


### 最终的一个Servlet类的开发步骤：

1. 第一步：编写一个Servlet类，直接继承HttpServlet
2. 第二步：重写doGet方法或者重写doPost方法，到底重写谁，javaweb程序员说了算。
3. 第三步：将Servlet类配置到web.xml文件当中。
4. 第四步：准备前端的页面（form表单），form表单中指定请求路径即可。

## 关于一个web站点的欢迎页面

### 什么是欢迎页面

在访问一个web站点的时候不指定任何“资源路径”，这个时候会默认访问你的欢迎页面。

~~~
http://localhost:8080/项目名/xxx.html 		这种方式是指定了要访问的就是xxx.html资源。
http://localhost:8080/项目名    		 	这种方式就会找欢迎页面
~~~



### 怎么设置欢迎页面呢？

#### 指定一个页面为欢迎页面

  - 第一步：在IDEA工具的**web目录下**新建了一个文件`xxx.html`

  - 第二步：在web.xml文件中进行了以下的配置

    - ```xml
      <welcome-file-list>
          <welcome-file>xxx.html</welcome-file>
      </welcome-file-list>
      ```

    - <font>注意：设置欢迎页面的时候，这个路径**不需要**以`“/”`开始。并且这个路径默认是从webapp的根下开始查找。</font>

  - 第三步：启动服务器，浏览器地址栏输入地址

    - http://localhost:8080/项目名

#### 指定一个Servlet为欢迎页面的逻辑

1. 写个Servlet，给它一个路径，例如：`/项目名/user/login`

2. 要把这个Servlet逻辑设置为欢迎页面逻辑（url只带上项目名默认走这里）的话，需要在web.xml配置

   - ~~~xml
     <welcome-file-list>
         <welcome-file>user/login</welcome-file>
     </welcome-file-list>
     ~~~

   - <font>注意：设置欢迎页面的时候，这个路径**不需要**以`“/”`开始。</font>

3. 此时直接在浏览器输入：`http://ip:port/项目名`即可直接走对应的`/项目名/user/login`的逻辑

### 如果想设置多级目录下的文件为欢迎页面

如果在webapp的根下新建一个目录，目录中再给一个文件

- 在webapp根下新建page1目录

- 在page1下新建page2目录

- 在page2目录下新建page.html页面

- 在web.xml文件中应该这样配置

  - ```xml
    <welcome-file-list>
        <welcome-file>page1/page2/page.html</welcome-file>
    </welcome-file-list>
    ```

  - <font>注意：路径`不需要以“/”开始`，并且路径默认从webapp的根下开始找。</font>

### 设置多个欢迎页面

- ```xml
  <welcome-file-list>
      <welcome-file>page1/page2/page.html</welcome-file>
      <welcome-file>login.html</welcome-file>
  </welcome-file-list>
  ```

- 注意：越`靠上的优先级越高`。找不到的继续向下找。

### Tomcat已经提前设置好欢迎页面了

> 如果在web目录下，叫`index.html / index.htm / index.jsp`的页面都会默认被Tomcat设置成欢迎页面
>
> - Tomcat设置的是全局配置
> - 如果在wepapp里面的web.xml里配置的是局部的（优先局部，就近原则）



在`CATALINA_HOME/conf/web.xml`文件中进行配置。（在这个地方配置的属于**全局配置**）

- ```xml
  <welcome-file-list>
      <welcome-file>index.html</welcome-file>
      <welcome-file>index.htm</welcome-file>
      <welcome-file>index.jsp</welcome-file>
  </welcome-file-list>
  ```

  

- 注意原则：局部优先原则。（就近原则）

### 欢迎页面也可以是个Servlet

欢迎页面就是个资源而已，既可以是静态资源（什么什么.html等）也可以是动态资源（Servlet类）



- 步骤：

  - 第一步：写一个Servlet

    - ```java
      public class WelcomeServlet extends HttpServlet {
          @Override
          protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
              response.setContentType("text/html");
              PrintWriter out = response.getWriter();
              out.print("<h1>welcome!</h1>");
          }
      }
      ```

      

  - 第二步：在web.xml文件中配置servlet

    - ```xml
      <servlet>
          <servlet-name>welcomeServlet</servlet-name>
          <servlet-class>com.bjpowernode.javaweb.servlet.WelcomeServlet</servlet-class>
      </servlet>
      <servlet-mapping>
          <servlet-name>welcomeServlet</servlet-name>
          <url-pattern>/xxx</url-pattern>
      </servlet-mapping>
      ```

  - 第三步：在web.xml文件中配置欢迎页

    - ```xml
      <welcome-file-list>
          <welcome-file>xxx</welcome-file>
      </welcome-file-list>
      ```

      

### 注意：

<font>在欢迎页面的配置中路径开头`不要“/”`，但是配**Servlet的**`url-pattern`的时候要加</font>

## 关于WEB-INF目录

> 在`WEB-INF目录`下的资源是**受保护的**。在浏览器上不能够通过路径直接访问
>
> 如果直接访问会404

- 在WEB-INF目录下新建了一个文件：welcome.html
- 打开浏览器访问：http://localhost:8080/servlet07/WEB-INF/welcome.html 出现了404错误。
- 注意：放在WEB-INF目录下的资源是受保护的。在浏览器上不能够通过路径直接访问。所以像HTML、CSS、JS、image等静态资源一定要放到WEB-INF目录之外。





## HttpServletRequest接口

### 是什么

HttpServletRequest是一个**接口**，全限定名称(Tomacat10)：`jakarta.servlet.http.HttpServletRequest`

HttpServletRequest接口是`Servlet规范`中的一员。

HttpServletRequest接口的**父接口**：`ServletRequest`

- ```java
  public interface HttpServletRequest extends ServletRequest {}
  ```

HttpServletRequest接口的实现类谁写的? HttpServletRequest对象是谁给创建的？

- 通过测试：org.apache.catalina.connector.RequestFacade 实现了 HttpServletRequest接口

  - ```java
    public class RequestFacade implements HttpServletRequest {}
    ```

- 测试结果说明：Tomcat服务器（WEB服务器、WEB容器）实现了HttpServletRequest接口，还是说明了Tomcat服务器实现了Servlet规范。

### HttpServletRequest对象中都有什么信息？都包装了什么信息？

- HttpServletRequest对象是**Tomcat服务器负责创建**的。这个对象中封装了什么信息？**封装了HTTP的请求协议。**
- 实际上是用户发送请求的时候，遵循了HTTP协议，发送的是HTTP的请求协议，Tomcat服务器将HTTP协议中的信息以及数据全部解析出来，然后Tomcat服务器把这些信息封装到HttpServletRequest对象当中，传给了我们javaweb程序员。
- javaweb程序员面向HttpServletRequest接口编程，调用方法就可以获取到请求的信息了。

### request和response对象的生命周期？

只在当前请求中有效。



### HttpServletRequest接口中有哪些常用的方法？

#### 获取前端数据

- 怎么获取前端浏览器用户提交的数据？

  - ```java
    Map<String,String[]> getParameterMap() 这个是获取Map
    Enumeration<String> getParameterNames() 这个是获取Map集合中所有的key
    String[] getParameterValues(String name) 根据key获取Map集合的value
    String getParameter(String name)  获取value这个一维数组当中的第一个元素。这个方法最常用。
    // 以上的4个方法，和获取用户提交的数据有关系。
    ```

  - 思考：如果是你，前端的form表单提交了数据之后，你准备怎么存储这些数据，你准备采用什么样的数据结构去存储这些数据呢？

    - 前端提交的数据格式：username=abc&userpwd=111&aihao=s&aihao=d&aihao=tt

    - 我会采用Map集合来存储：

      - ```java
        Map<String,String>
            key存储String
            value存储String
            这种想法对吗？不对。
            如果采用以上的数据结构存储会发现key重复的时候value覆盖。
            key         value
            ---------------------
            username    abc
            userpwd     111
            aihao       s
            aihao       d
            aihao       tt
            这样是不行的，因为map的key不能重复。
        Map<String, String[]>
            key存储String
            value存储String[]
            key				value
            -------------------------------
            username		{"abc"}
            userpwd			{"111"}
            aihao			{"s","d","tt"}
        ```

    - 注意：前端表单提交数据的时候，假设提交了120这样的“数字”，其实是以字符串"120"的方式提交的，所以服务器端获取到的一定是一个字符串的"120"，而不是一个数字。（`前端永远提交的是字符串，后端获取的也永远是字符串。`）

  


#### 获取请求域数据

**request对象**实际上又称为`“请求域”对象`。

- `应用域`对象是什么？

  - [回顾ServletContext应用域](# ServletContext)

  - ServletContext当中有三个操作域的方法：

    - ```java
      void setAttribute(String name, Object obj); // 向域当中绑定数据。
      Object getAttribute(String name); // 从域当中根据name获取数据。
      void removeAttribute(String name); // 将域当中绑定的数据移除
      
      // 以上的操作类似于Map集合的操作。
      Map<String, Object> map;
      map.put("name", obj); // 向map集合中放key和value
      Object obj = map.get("name"); // 通过map集合的key获取value
      map.remove("name"); // 通过Map集合的key删除key和value这个键值对。
      ```

- `“请求域”`对象

  - “请求域”对象要比“应用域”对象范围小很多。生命周期短很多。请求域只在一次请求内有效。

  - 一个请求对象request对应一个请求域对象。一次请求结束之后，这个请求域就销毁了。

  - 请求域对象也有这三个方法：

    - ```java
      void setAttribute(String name, Object obj); // 向域当中绑定数据。
      Object getAttribute(String name); // 从域当中根据name获取数据。
      void removeAttribute(String name); // 将域当中绑定的数据移除
      ```

  - 请求域和应用域的选用原则？

    - 尽量使用小的域对象，因为小的域对象占用的资源较少。

#### 请求转发

跳转

- 转发（`一次请求，之前是POST转发了也是POST！！`）

  - ```java
    // 第一步：获取请求转发器对象
    RequestDispatcher dispatcher = request.getRequestDispatcher("/b");
    // 第二步：调用转发器的forward方法完成跳转/转发
    dispatcher.forward(request,response);
    
    // 第一步和第二步代码可以联合在一起。
    request.getRequestDispatcher("/b").forward(request,response);
    
    ```

- 两个Servlet怎么共享数据？

  - 将数据放到ServletContext应用域当中，当然是可以的，但是应用域范围太大，占用资源太多。不建议使用。
  - 可以将数据放到request域当中，然后AServlet转发到BServlet，保证AServlet和BServlet在同一次请求当中，这样就可以做到两个Servlet，或者多个Servlet共享同一份数据。

- 转发的下一个资源必须是一个Servlet吗？

  - 不一定，只要是Tomcat服务器当中的合法资源，都是可以转发的。例如：html....
  - `注意：转发的时候，路径的写法要注意，转发的路径以“/”开始，不加项目名。`
  - [路径问题](# 路径)

- 关于request对象中两个非常容易混淆的方法：

  - ```java
    // uri?username=zhangsan&userpwd=123&sex=1
    String username = request.getParameter("username");
    
    // 之前一定是执行过：request.setAttribute("name", new Object())
    Object obj = request.getAttribute("name");
    
    // 以上两个方法的区别是什么？
    // 第一个方法：获取的是用户在浏览器上提交的数据。
    // 第二个方法：获取的是请求域当中绑定的数据。
    ```




#### 其他方法

HttpServletRequest接口的其他常用方法：

##### 获取客户端的IP地址

`String remoteAddr = request.getRemoteAddr();`

remoteAddr=127.0.0.1   获取到ip地址

##### :star:获取应用的根路径

`String contextPath = request.getContextPath();`

contextPath=/servlet02   （/项目名）

##### 获取请求方式

`String method = request.getMethod();`

method=POST    

##### 获取请求的URI

`String uri = request.getRequestURI();` 

uri=/servlet02/b    （uri带项目名，后面跟的是在web.xml里面配的url-pattern的内容）

##### 获取servlet path

`String servletPath = request.getServletPath();`

servletPath=/b    （在web.xml里面配的url-pattern的内容）



##### 处理请求响应乱码

**注意：从Tomcat10开始不需要考虑[乱码问题](# 请求响应乱码问题)**

###### POST的请求乱码（GET的请求乱码见：[乱码问题](# 请求响应乱码问题)）：

`request.setCharacterEncoding("UTF-8");`

###### 响应乱码（为了通用性，Tomcat10最好也加上）：

`response.setContentType("text/html;charset=UTF-8");`

## 转发、重定向

### 在一个web应用中通过两种方式，可以完成资源的跳转：

1. 第一种方式：转发
2. 第二种方式：重定向

### 转发和重定向有什么区别？

#### 代码上有什么区别？

- 转发

  - ```java
    // 获取请求转发器对象
    RequestDispatcher dispatcher = request.getRequestDispatcher("/dept/list");
    // 调用请求转发器对象的forward方法完成转发
    dispatcher.forward(request, response);
    
    // 合并一行代码
    request.getRequestDispatcher("/dept/list").forward(request, response);
    // 转发的时候是一次请求，不管你转发了多少次。都是一次请求。
    // AServlet转发到BServlet，再转发到CServlet，再转发到DServlet，不管转发了多少次，都在同一个request当中。
    // 这是因为调用forward方法的时候，会将当前的request和response对象传递给下一个Servlet。
    ```

- 重定向

  - ```java
    // 注意：路径上要加一个项目名。为什么？
    // 浏览器发送请求，请求路径上是需要添加项目名的。
    // 以下这一行代码会将请求路径“/oa/dept/list”发送给浏览器
    // 浏览器会自发的向服务器发送一次全新的请求：/oa/dept/list
    response.sendRedirect("/oa/dept/list");
    ```

    

#### 形式上有什么区别？

> 转发浏览器地址不变
>
> 重定向浏览器地址变了

- 转发（一次请求）
  - 在浏览器地址栏上发送的请求是：http://localhost:8080/servlet10/a ，最终请求结束之后，浏览器地址栏上的地址还是这个。没变。
- 重定向（两次请求）
  - 在浏览器地址栏上发送的请求是：http://localhost:8080/servlet10/a ，最终在浏览器地址栏上显示的地址是：http://localhost:8080/servlet10/b

### 转发和重定向的本质区别？

- 转发：是由WEB服务器来控制的。A资源跳转到B资源，这个跳转动作是Tomcat服务器内部完成的。
- 重定向：是浏览器完成的。具体跳转到哪个资源，是浏览器说了算。

### 使用一个例子去描述这个转发和重定向

- 借钱（转发：发送了一次请求）
  - 杜老师没钱了，找张三借钱，其实张三没有钱，但是张三够义气，张三自己找李四借了钱，然后张三把这个钱给了杜老师，杜老师不知道这个钱是李四的，杜老师只求了一个人。杜老师以为这个钱就是张三的。
- 借钱（重定向：发送了两次请求）
  - 杜老师没钱了，找张三借钱，张三没有钱，张三有一个好哥们，叫李四，李四是个富二代，于是张三将李四的家庭住址告诉了杜老师，杜老师按照这个地址去找到李四，然后从李四那里借了钱。显然杜老师在这个过程中，求了两个人。并且杜老师知道最终这个钱是李四借给俺的。

### 转发和重定向应该如何选择？

- 如果在上一个Servlet当中向request域当中绑定了数据，希望从下一个Servlet当中把request域里面的数据取出来，使用转发机制。
- 剩下所有的请求均使用重定向。（重定向使用较多。）

### 跳转的下一个资源有没有要求呢？必须是一个Servlet吗？

- 不一定，跳转的资源只要是服务器内部合法的资源即可。包括：Servlet、JSP、HTML.....

- 转发会存在浏览器的刷新问题。
  - 比如提交了一份数据，后端用了转发的话，只要浏览器一直刷新就会一直重复提交





## Servlet注解，简化配置

### web.xml文件缺点

- 只用xml配置的话文件会很庞大
- 每次要在xml里配置的话效率也很低



> 因为在`web.xml`文件中的配置是**很少被修改**的，所以这种配置信息可以直接配进Java程序里

### Servlet3.0版本之后，推出了各种Servlet基于注解式开发。优点是什么？

- 开发效率高，不需要编写大量的配置信息。直接在java类上使用注解进行标注。
- web.xml文件体积变小了。

- 并不是说注解有了之后，web.xml文件就不需要了：

  - 有一些`需要变化的信息`，还是要配置到web.xml文件中。一般都是 `注解+配置文件` 的开发模式。
  - 一些`不会经常变化修改的配置`**建议使用注解**。一些可能会被修改的建议写到配置文件中。


### 第一个注解

- ```
  jakarta.servlet.annotation.WebServlet
  ```

- 在Servlet类上使用：`@WebServlet`，WebServlet注解中有哪些属性呢？

  - `name属性`：用来指定Servlet的名字。等同于：`<servlet-name>`
  - `urlPatterns属性`：用来指定Servlet的映射路径。可以指定多个字符串。`<url-pattern>`
  - `loadOnStartUp属性`：用来指定在服务器启动阶段是否加载该Servlet。等同于：`<load-on-startup>`
  - `value属性`：当注解的属性名是value的时候，使用注解的时候，value属性名是可以省略的。

> 注意：
>
> 1. 不是必须将所有属性都写上，只需要提供需要的。（需要什么用什么。）
> 2. 属性是一个数组，如果数组中只有一个元素，使用该注解的时候，属性值的大括号可以省略。



### 注解对象的使用格式：

`@注解名称(属性名=属性值, 属性名=属性值, 属性名=属性值....)`



## 使用模板方法设计模式简化Servlet

如果给每个操作都写一个Servlet的话，类就太多了

怎么解决类太多的问题

1. 以前的设计是一个请求一个Servlet类。1000个请求对应1000个Servlet类，导致类数量太多。可以这样做：一个请求对应一个方法。一个业务对应一个Servlet类。
2. 在一个业务的Servlet类里，继承HttpServlet，重写service(HttpServletRequest request, HttpServletResponse response) 方法（在HttpServlet里这个方法是用于根据请求方式进行请求分发的），这里重写之后根据请求路径来分发请求到不同的方法上



```java
@WebServlet({"/user/url1", "/user/url2"})
public class ServletTest extends HttpServlet {
    @Override
    protected void service(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        if ("/user/url1".equals(request.getServletPath())) {  // 如果请求是user业务的某个操作的话就进入
            doUrl1(request, response);  // 把request和response分发给对应方法
        } else if ("/user/url2".equals(request.getServletPath())) {
            doUrl2(request, response);
        }
    }

    private void doUrl1(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        // 执行对应业务逻辑
    }
    private void doUrl2(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
    }
}
```





## 关于B/S结构系统的会话机制（session机制）

在java的servlet规范当中，session对应的类名：HttpSession（jarkata.servlet.http.HttpSession）

### 什么是会话？

- 会话对应的英语单词：session
- 用户打开浏览器，进行一系列操作，然后最终将浏览器关闭，这个整个过程叫做：一次会话。会话在服务器端也有一个对应的java对象，这个java对象叫做：session。
- 什么是一次请求：用户在浏览器上点击了一下，然后到页面停下来，可以粗略认为是一次请求。请求对应的服务器端的java对象是：request。
- 一个会话当中包含多次请求。（一次会话对应N次请求。）

### session概述

- session机制属于B/S结构的一部分。如果使用php语言开发WEB项目，同样也是有session这种机制的。session机制实际上是一个规范。然后不同的语言对这种会话机制都有实现。

- session对象最主要的作用是：保存会话状态。（用户登录成功了，这是一种登录成功的状态，你怎么把登录成功的状态一直保存下来呢？使用session对象可以保留会话状态。）

### session有效时间

因为HTTP请求是无状态的，所以即使用户关闭浏览器之后，session对象也不会立刻清除

要清除session对象的话：

1. [手动清除session](# 销毁session对象)

2. 等时间到了自动清除

   - 在默认30分钟，在`CATALINA_HOME/conf/web.xml`里配置了**默认是30分钟**的session存活时间，可以根据业务需求更改

   - ~~~xml
     <session-config>
         <session-timeout>30</session-timeout>
     </session-config>
     ~~~



### 为什么需要session对象来保存会话状态呢？

#### 因为HTTP协议是一种无状态协议。

- 什么是无状态：请求的时候，B和S是连接的，但是请求结束之后，连接就断了。为什么要这么做？HTTP协议为什么要设计成这样？因为这样的无状态协议，可以降低服务器的压力。请求的瞬间是连接的，请求结束之后，连接断开，这样服务器压力小。
- 只要B和S断开了，那么关闭浏览器这个动作，服务器知道吗？
  - 不知道。服务器是不知道浏览器关闭的。

- 张三打开一个浏览器A，李四打开一个浏览器B，访问服务器之后，在服务器端会生成：
  - 张三专属的session对象
  - 李四专属的session对象


### 为什么选择session而不是request和ServletContext呢

1. request是一次请求一个对象。
   - 作用域太小了，无法保存比如用户登陆之后的状态
2. ServletContext对象是服务器启动的时候创建，服务器关闭的时候销毁，这个ServletContext对象只有一个。
   - ServletContext对象的域太大，而且假设作为用户登陆之后的会话保持，如果用了应用域的话可能出现一个用户登陆所有用户都不用登录的情况。



### :star:session对象的实现原理。

1. `HttpSession session = request.getSession();`  获取session对象，如果获取不到的话就**创建**
2. `HttpSession session = request.getSession(false);`  获取session对象，如果获取不到的话就**返回null**

**session的实现原理：**

1. `JSESSIONID=xxxxxx`  这个是以**Cookie的形式**保存在**浏览器的内存中**的。浏览器只要关闭。这个cookie就没有了。
2. **session列表是一个Map**，map的key是sessionid，map的value是session对象。
3. 用户第一次请求，服务器生成session对象，同时生成id，将**id发送给浏览器**（自动发送）。
4. 用户第二次请求，**自动**将浏览器内存中的id发送给服务器，服务器根据id查找session对象。
5. 关闭浏览器，内存消失，cookie消失，sessionid消失，会话等同于结束。

### Cookie禁用了，session还能找到吗？

- cookie禁用是什么意思？**服务器正常发送**cookie给浏览器，但是**浏览器不要了**。拒收了。并不是服务器不发了。
- 在之后的请求中，浏览器没有发送sessionid，所以每一次请求都会获取到新的session对象。

#### URL重写机制

> 通过在url后面加上`;jsessionid=xxxx`来手动发送cookie，**注意英文分号不能省！**

- 禁用了cookie，也可以通过URL重写机制来实现发送cookie的效果
- http://localhost:8080/servlet12/test/session;jsessionid=19D1C99560DCBF84839FA43D58F56E16
- URL重写机制会提高开发者的成本。开发人员在编写任何请求路径的时候，后面都要添加一个sessionid，给开发带来了很大的难度，很大的成本。所以大部分的网站都是这样设计的：你要是禁用cookie，你就别用了。

### 到目前所了解的域对象：

1. `request`（对应的类名：HttpServletRequest）
   - 请求域（请求级别的）
2. `session`（对应的类名：HttpSession）
   - 会话域（用户级别的）
3. `application`（对应的类名：ServletContext）
   - 应用域（项目级别的，所有用户共享的。）

这三个域对象的**大小关系**

- `request < session < application`

他们三个域对象都有以下**三个公共的方法**：

- `setAttribute`（向域当中绑定数据）
- `getAttribute`（从域当中获取数据）
- `removeAttribute`（删除域当中的数据）

<font>使用原则：尽量使用小的域。</font>



### 销毁session对象

```java
session.invalidate();
```



### 通过session解决登录状态的保持

> 登录成功之后，把用户的信息存进session即可
>
> 其他页面在判断是否登录的时候，**先判断session能不能get到，同时判断session里面的东西（key）是不是在登录时候存进去的**，之所以要两个一起判断，是因为jsp的内置对象会有session，如果不判断里面的内容的话就会误判
>
> ~~~java
> // 获取session（这个session是不需要新建的）
> // 只是获取当前session，获取不到这返回null
> HttpSession session = request.getSession(false);
> if(session != null && session.getAttribute("username") != null){
>     // 代表用户已经登录过了，执行对应业务逻辑即可
> }else{
>     // 到这里代表用户没登录，跳转到登录页面
>     // 重定向到登录页面即可
> }
> ~~~
>
> 



实现原理：

session的实现原理中，每一个session对象都会关联一个sessionid，例如：

- JSESSIONID=41C481F0224664BDB28E95081D23D5B8
- 以上的这个键值对数据其实就是cookie对象。
- 对于session关联的cookie来说，这个cookie是被保存在浏览器的“运行内存”当中。
- 只要浏览器不关闭，用户再次发送请求的时候，会自动将运行内存中的cookie发送给服务器。
- 例如，这个Cookie: JSESSIONID=41C481F0224664BDB28E95081D23D5B8就会再次发送给服务器。
- 服务器就是根据41C481F0224664BDB28E95081D23D5B8这个值来找到对应的session对象的。

## Cookie

### cookie机制

cookie机制和session机制其实都**不属于java中的机制**，实际上cookie机制和session机制**都是HTTP协议的一部分**。

HTTP协议中规定：**任何一个cookie都是由name和value组成的**。name和value都是字符串类型的。当浏览器发送请求的时候，会自动携带该path下的cookie数据给服务器。（URL。）

- 在java的servlet中，对cookie提供了哪些支持呢？

  - 提供了一个Cookie类来专门表示cookie数据。`jakarta.servlet.http.Cookie;`
  - java程序怎么把cookie数据发送给浏览器呢？`response.addCookie(cookie);`

### cookie的作用

cookie和session机制其实都是`为了保存会话的状态`。

1. cookie是将会话的状态保存在浏览器客户端上。（cookie数据存储在浏览器客户端上的。）

2. session是将会话的状态保存在服务器端上。（session对象是存储在服务器上。）

为什么要有cookie和session机制呢？因为HTTP协议是无状态 无连接协议。

### cookie的生成



### cookie的保存位置

cookie最终是保存在浏览器客户端上的。

- 可以保存在运行内存中。（浏览器只要关闭cookie就消失了。）
- 也可以保存在硬盘文件中。（永久保存。）

### 什么请求路径会发送哪些cookie

与请求路径相关联的cookie会在请求的时候被自动发送

#### 如果不设置path

默认path是访问路径的父级以及下面的所有子路径

> 比如访问的是“http://localhost:8080/servlet/cookie”，在这里面生成了cookie没设置path，那么在访问“http://localhost:8080/servlet”以及下面的所有子路径的时候都会带上那个cookie



#### 手动设置path

通过`Cookie对象.setPath(路径);`就能手动设置path了

手动给了path之后，只要访问路径是那个路径以及其子路径时，会发送cookie

> 比如可以手动给cookie一个项目根路径，这样只要项目访问都会带cookie
>
> `cookie.setPath(request.getContextPath()); `



### 浏览器接收cookie

注意：`request.getCookies();`如果没有拿到的话是`返回null`

- ![image-20220824001559262](https://note-img54.oss-cn-hongkong.aliyuncs.com/note/Javaweb/Javaweb2.assets/image-20220824001559262.png)

```java
Cookie[] cookies = request.getCookies(); // 这个方法可能返回null
if(cookies != null){  // 判断是不是null
    for(Cookie cookie : cookies){  // 不是null代表cookie有东西，可以遍历取出需要的数据
        // 获取cookie的name
        String name = cookie.getName();
        // 获取cookie的value
        String value = cookie.getValue();
    }
}

```

cookie中的get能获取的东西

![image-20220824001810142](https://note-img54.oss-cn-hongkong.aliyuncs.com/note/Javaweb/Javaweb2.assets/image-20220824001810142.png)

### cookie有效时间

> `cookie.setMaxAge(秒为单位);`
>
> 没有设置有效时间：默认保存在浏览器的运行内存中，浏览器关闭则cookie消失。

不同的配置不同的效果：

1. 设置cookie的**有效时间 > 0**
   - 这个cookie一定会存储到硬盘文件当中。
2. 设置cookie的**有效时间 = 0** 
   - cookie被删除，同名cookie被删除。
3. 设置cookie的**有效时间 < 0** 
   - 保存在运行内存中。和不设置一样。

### cookie的经典案例

- 京东商城，在未登录的情况下，向购物车中放几件商品。然后关闭商城，再次打开浏览器，访问京东商城的时候，购物车中的商品还在，这是怎么做的？我没有登录，为什么购物车中还有商品呢？
  - 将购物车中的商品编号放到cookie当中，cookie保存在硬盘文件当中。这样即使关闭浏览器。硬盘上的cookie还在。下一次再打开京东商城的时候，查看购物车的时候，会自动读取本地硬盘中存储的cookie，拿到商品编号，动态展示购物车中的商品。
    - 京东存储购物车中商品的cookie可能是这样的：productIds=xxxxx,yyyy,zzz,kkkk
    - 注意：cookie如果清除掉，购物车中的商品就消失了。
- 126邮箱中有一个功能：十天内免登录
  - 这个功能也是需要cookie来实现的。
  - 怎么实现的呢？
    - 用户输入正确的用户名和密码，并且同时选择十天内免登录。登录成功后。浏览器客户端会保存一个cookie，这个cookie中保存了用户名和密码等信息，这个cookie是保存在硬盘文件当中的，十天有效。在十天内用户再次访问126的时候，浏览器自动提交126的关联的cookie给服务器，服务器接收到cookie之后，获取用户名和密码，验证，通过之后，自动登录成功。







### 通过cookie实现记住密码的功能

1. 先实现正常登录功能
2. 在前端页面给出“记住密码”选项
3. 在登录逻辑判断用户合法之后，判断用户有没有选择“记住密码”，如果选择
   - 创建cookie对象用于存用户名密码信息
   - 设置路径
   - 设置有效期
   - 将cookie响应给浏览器
4. [将网站欢迎页改成Servlet](# 指定一个Servlet为欢迎页面的逻辑)，在这个Servlet里进行cookie获取和判断
   - 首先判断能不能获取到cookie，<font>注意获取不到的时候是返回null（可见源码）</font>
   - 获取到cookie数组后遍历，再判断里面的key是不是当时存的用户信息，是的话就取出来
   - 将用户信息送去数据库比对
   - 成功的话就跳转主页，失败就跳转登录页



### 让cookie失效

1. 有效时间到了自动失效。
2. （在“记住密码”的业务里）改密码也可以导致失效（查到cookie里的用户信息之后会进数据库判断的）。
3. 在客户端浏览器上清除cookie。
4. `Cookie对象.setMaxAge(0)`删除cookie
   - 如果在创建的时候有给路径，删除步骤也得加`setPath`
   - 然后再调用`response.addCookie(cookie对象)`把删除的信息响应回去


# JSP

## jsp的底层原理

### JSP是什么？

JSP是：JavaServer Pages的缩写。（基于Java语言实现的服务器端的页面。）是java程序。（JSP本质还是一个Servlet）

- Servlet是JavaEE的13个子规范之一，那么JSP也是JavaEE的13个子规范之一。
- JSP是一套规范。所有的web容器/web服务器都是遵循这套规范的，都是按照这套规范进行的“翻译”
- 每一个web容器/web服务器都会内置一个JSP翻译引擎。

- 对JSP进行错误调试的时候，还是要直接打开JSP文件对应的java文件，检查java代码。
  - 项目运行起来之后，控制台有个`CATALINA_BASE`，这个是IDEA的Tomcat当前项目的副本，进这个目录找以下路径就能找到jsp翻译成的java文件。访问后还会生成字节码文件

  - `CATALINA_BASE`\work\Catalina\localhost\项目名\org\apache\jsp


JSP虽然本质上是一个Servlet，但是他们职责不同

1. Servlet的职责是什么：收集数据。（Servlet的强项是逻辑处理，业务处理，然后链接数据库，获取/收集数据。）
2. JSP的职责是什么：展示数据。（JSP的强项是做数据的展示）

### JSP实际上就是一个Servlet。

1. index.jsp访问的时候，会自动翻译生成index_jsp.java，会自动编译生成index_jsp.class，那么index_jsp 这就是一个类。
2. index_jsp 类继承 `HttpJspBase`，而HttpJspBase类继承的是`HttpServlet`。所以index_jsp类就是一个Servlet类。
3. jsp的生命周期和Servlet的**生命周期完全相同**。完全就是一个东西。没有任何区别。
4. jsp和servlet一样，都是单例的。（假单例。）



### 访问JSP

访问index.jsp，实际上执行的是index_jsp.class中的方法。

jsp文件第一次访问的时候是比较慢的，因为：

1. 要把jsp文件翻译生成java源文件
2. java源文件要编译生成class字节码文件
3. 然后通过class去创建servlet对象
4. 然后调用servlet对象的init方法
5. 最后调用servlet对象的service方法。

- 第二次就比较快了，为什么？
  - 因为第二次直接调用单例servlet对象的service方法即可。



### JSP的基础语法

#### 编写JSP的专业注释

- <%--JSP的专业注释，不会被翻译到java源代码当中。--%>
- <!--这种注释属于HTML的注释，这个注释信息仍然会被翻译到java源代码当中，不建议。-->

#### 在jsp文件中**直接编写文字**，都会自动被翻译到哪里？

- 翻译到servlet类的`service方法`的`out.write("翻译到这里")`，**直接翻译到双引号**里，被java程序当做普通字符串打印**输出到浏览器**。
- 在JSP中编写的HTML CSS JS代码，这些代码对于JSP来说只是一个普通的字符串。但是JSP把这个普通的字符串一旦输出到浏览器，浏览器就会对HTML CSS JS进行解释执行。展现一个效果。

#### JSP的page指令，解决响应时的中文乱码问题：

通过page指令来设置响应的内容类型，在内容类型的最后面添加：`charset=UTF-8`

- <%@page contentType="text/html;charset=UTF-8"%>，表示响应的内容类型是text/html，采用的字符集UTF-8

page指令导包（可以`alt + enter`自动导包）

- <%@page import="java.util.List,java.util.ArrayList"%>

### 在JSP中编写Java程序

#### <% java语句; %>

- 在这个符号当中编写的被视为java程序，被翻译到Servlet类的service方法内部。
- 这里你要细心点，你要思考，在<% %>这个符号里面写java代码的时候，你要时时刻刻的记住你正在“方法体”当中写代码，方法体中可以写什么，不可以写什么，你心里是否明白呢？
- 在service方法当中编写的代码是有顺序的，方法体当中的代码要遵循自上而下的顺序依次逐行执行。
- service方法当中不能写静态代码块，不能写方法，不能定义成员变量。。。。。。
- 在同一个JSP当中 <%%> 这个符号可以出现多个。

#### <%! %>

- 在这个符号当中编写的java程序会自动翻译到service方法之外。
- 这个语法很少用，为什么？不建议使用，因为在service方法外面写静态变量和实例变量，都会存在线程安全问题，因为JSP就是servlet，servlet是单例的，多线程并发的环境下，这个静态变量和实例变量一旦有修改操作，必然会存在线程安全问题。

#### JSP的输出语句

##### 1、通过out.write()来输出java代码

- 怎么向浏览器上输出一个java变量。
- <% String name = “jack”;  out.write("name = " + name); %>
- 注意：以上代码中的out是JSP的九大内置对象之一。可以直接拿来用。当然，必须只能在service方法内部使用。

##### 2、如果没有变量，直接在页面上写就行

- 如果向浏览器上输出的内容中没有“java代码”，例如输出的字符串是一个固定的字符串，可以直接在jsp中编写，不需要写到<%%> 这里。

##### 3、有Java代码，用`<%= %>`方式也行

<%= %> 注意：在=的后面编写要输出的内容。

<%= %> 这个符号会被翻译到哪里？最终翻译成什么？ 

- 翻译成了这个java代码：   out.print();
- 翻译到service方法当中了。

##### 什么时候用`<%= %>`

- 输出的内容中含有java的变量，输出的内容是一个动态的内容，不是一个死的字符串，使用<%=%> 输出。
- 如果输出的是一个固定的字符串，直接在JSP文件中编写即可。



### JSP基础语法总结：

#### JSP中直接编写普通字符串

- 翻译到service方法的out.write("这里")

#### <%%>

- 翻译到service方法体内部，里面是一条一条的java语句。

#### <%! %>

- 翻译到service方法之外。

#### <%= %>

- 翻译到service方法体内部，翻译为：out.print();

#### page指令设置响应UTF-8

- page指令，通过contentType属性用来设置响应的内容类型。
- <%@page  contentType="text/html;charset=UTF-8"%>

#### JSP中动态获取应用根路径

- <%=request.getContextPath() %>  在JSP中动态的获取应用的根路径。

#### Servlet配合JSP数据交互

Servlet中连接数据库，查询需要的内容放进结果集

- 遍历结果集的过程中，取出属性，封装成java对象。
- 将java对象存放到List集合中。（只有一个的话也可以不存）
- 将List集合存储到request域当中。
- `forward`转发到jsp。

在JSP中：

- 从request域当中取出List集合。
- 遍历List集合，取出每个对象。
- 执行相应的操作

#### 只用JSP开发web应用

只用JSP技术也可以开发web应用，因为JSP实际上就是Servlet，但是不建议这么做。建议用Servlet + JSP来开发，JSP用来数据展示，Servlet用来做数据收集处理的业务逻辑。职责分明



#### JSP文件后缀不一定是.jsp

jsp文件的扩展名是可以配置的。不是固定的。

- 在`CATALINA_HOME/conf/web.xml`，在这个文件当中配置jsp文件的扩展名。

- ```xml
  <servlet-mapping>
      <servlet-name>jsp</servlet-name>
      <url-pattern>*.jsp</url-pattern>
      <url-pattern>*.jspx</url-pattern>
  </servlet-mapping>
  ```

- xxx.jsp文件对于Tomcat来说，只是一个普通的文本文件，web容器会将xxx.jsp文件最终生成java程序，最终调用的是java对象相关的方法，真正执行的时候，和jsp文件就没有关系了。



### JSP的指令

#### 是什么

指令的作用：指导JSP的翻译引擎如何工作（指导当前的JSP翻译引擎如何翻译JSP文件。）

#### 指令包括哪些

1. include指令：包含指令，在JSP中完成静态包含，很少用了。（这里不讲）
2. `taglib指令`：引入标签库的指令。这个到JJSTL标签库的时候再学习。现在先不管。
3. `page指令`：目前重点学习一个page指令。

#### 指令的使用语法

- `<%@指令名  属性名=属性值  属性名=属性值  属性名=属性值....%>`



#### page指令当中常用的属性

##### session

`<%@page session="true|false" %>`

true（默认就是true）表示启用JSP的内置对象session，表示一定启动session对象。没有session对象会创建。
session="false" 表示不启动内置对象session。当前JSP页面中无法使用内置对象session。



##### contentType

`<%@page contentType="text/json" %>`

contentType属性用来设置响应的内容类型
但同时也可以设置字符集。
`<%@page contentType="text/json;charset=UTF-8" %>`一般是这么用



##### pageEncoding

> 一般是结合上面`<%@page contentType="text/json;charset=UTF-8" %>`来一起用

`<%@page ="UTF-8" %>`
pageEncoding="UTF-8" 表示设置响应时采用的字符集。



##### import

`<%@page ="java.util.List, java.util.Date, java.util.ArrayList" %>`
<%@page import="java.util.*" %>
import语句，**导包**。



##### errorPage

``<%@page ="/error.jsp" %>`
当前页面出现异常之后，跳转到error.jsp页面。
errorPage属性用来指定出错之后的跳转位置。



##### isErrorPage

`<%@page ="true" %>`
表示启用JSP九大内置对象之一：exception
默认值是false。

因为如果用errorPage跳转过来的，控制台和浏览器都不会报错，如果想看异常信息的话可以用`exception.printStackTrace()`获取异常的信息`



#### JSP的九大内置对象

1. `jakarta.servlet.jsp.PageContext pageContext`       页面作用域
2. `jakarta.servlet.http.HttpServletRequest request` 请求作用域
3. `jakarta.servlet.http.HttpSession session`  会话作用域
4. `jakarta.servlet.ServletContext application` 应用作用域
   - pageContext < request < session < application
   - 以上四个作用域都有：setAttribute、getAttribute、removeAttribute方法。
   - 以上作用域的使用原则：尽可能使用小的域。

5. `java.lang.Throwable exception `  

6. `jakarta.servlet.ServletConfig config`

7. `java.lang.Object page`  （其实是this，当前的servlet对象）

8. `jakarta.servlet.jsp.JspWriter out`  （负责输出）
9. `jakarta.servlet.http.HttpServletResponse response` （负责响应）





## EL

<font>EL表达式只能从某个域中取数据</font>

### EL表达式

- Expression Language（表达式语言）
- EL表达式可以代替JSP中的java代码，让JSP文件中的程序看起来更加整洁，美观。
- JSP中夹杂着各种java代码，例如<% java代码 %>、<%=%>等，导致JSP文件很混乱，不好看，不好维护。所以才有了后期的EL表达式。
- EL表达式可以算是JSP语法的一部分。EL表达式归属于JSP。
- EL表达式对null进行了预处理。如果是null，则向浏览器输出一个空字符串。

### EL表达式出现在JSP中主要是：

> EL表达式的主要作用：从某个作用域中取数据，然后将其转换成字符串，然后将其输出到浏览器。

1. 第一作用：从某个域中取数据。
   - 四个域：
     - pageContext
     - request
     - session
     - application
2. 第二作用：将取出的数据转成字符串。
   - 如果是一个**java对象**，也会**自动调用java对象的toString方法**将其转换成字符串。
3. 第三作用：将字符串输出到浏览器。
   - 和这个一样：<%= %>，将其输出到浏览器。

### EL表达式的使用：

> `${表达式}`

#### 从四个域里取数据：

> 在`域对象.setAttribute(name,obj)`的时候有**存name和obj**，在EL中要取出只需要用`${name}`即可，注意name不用带引号，带引号就是字符串了。等同于`<%=域对象.getAttribute("name")%>`

EL表达式优先从小范围中读取数据。

- pageContext < request < session < application

EL表达式中有四个隐含的隐式的范围：

- pageScope 对应的是 pageContext范围。
- requestScope 对应的是 request范围。
- sessionScope 对应的是 session范围。
- applicationScope 对应的是 application范围。

如果四个域中都存了同名的对象的话，默认输出小的范围。若需要指定输出某个域的对象的话可以用`${xxxxScope.name}`

##### ==面试题：==

${abc} 和 \${"abc"}的区别是什么？

1. \${abc}表示从某个域中取出数据，并且被取的这个数据的name是"abc"，之前一定有这样的代码: 域.setAttribute("abc", 对象);
2. ${"abc"} 表示直接将"abc"当做普通字符串输出到浏览器。不会从某个域中取数据了。



#### 输出对象

`${obj}`底层从域中取数据，取出user对象，然后**调用user对象的toString方法**，转换成字符串，输出到浏览器。



#### 输出对象属性

`${obj.xxx}`

> 实际上调用的是`对象的getXxx方法`，将get去掉并把首字母大写改小写
>
> 如果没有对应get方法会报错，500



- - -

  - 


#### EL表达式取数据的时候有两种形式：

1. 第一种：`.  `（大部分使用这种方式）
2. 第二种：`[ ]` （如果存储到域的时候，这个name中含有特殊字符，可以使用 [ ]）
   - `request.setAttribute("abc.def", "zhangsan");`
   - `${requestScope.abc.def} `这样是**无法取值的**。
   - 应该这样：`${requestScope["abc.def"]}`

##### 从Map集合中取数据

${map.key}



##### 从数组和List集合中取数据

- ${数组[0]}
- ${数组[1]}
- ${list[0]}



##### 通过EL表达式获取应用的根：

> `${pageContext.request.contextPath}`
>
> 通过EL表达式的[pageContex](# pageContext)获取request对象进而获取项目根路径
>
> 注意:pageContext在getRequest()的时候返回的是ServletRequest，而能用contextPath()的是HttpServletRequest，所以要强转才能直接用（直接用EL不需要强转）
>
> `<%((HttpServletRequest)pageContext.getRequest()).getContextPath();%>`
>
> ![pageContext在getjsp内置对象的返回值](https://note-img54.oss-cn-hongkong.aliyuncs.com/note/Javaweb/Javaweb2.assets/image-20220824143714213.png)



### page指令当中，有一个属性，可以忽略EL表达式

- ```jsp
  <%@page contentType="text/html;charset=UTF-8" isELIgnored="true" %>
  isELIgnored="true" 表示忽略EL表达式
  isELIgnored="false" 表示不忽略EL表达式。（这是默认值）
  
  isELIgnored="true" 这个是全局的控制。
  
  可以使用反斜杠进行局部控制：\${username} 这样也可以忽略EL表达式。
  ```



### EL表达式中的隐式对象

#### pageContext

<font>EL表达式中的pageContext和JSP中的九大内置对象pageContext是同一个对象。</font>

> JSP内置对象pageContext获取request`<%=pageContext.getRequest() %>`等同于JSP的内置request`<%=request %>`
>
> 其中JSP的`pageContext`又等同于EL的`pageContext`
>
> 

因为在EL表达式里没有request、session等对象，所以通过`pageContext`就能调用里面的get方法得到对应的对象（get方法的使用也是去掉"get"并将首字母小写）

- EL通过获取request对象进而调用**getContextPath()**获取项目根路径`${pageContext.request.contextPath}`
  - 等同于`<%((HttpServletRequest)pageContext.getRequest()).getContextPath();%>`
  - 等同于`<%request.getContextPath(); %>`

#### param

##### 获取单值

通过`${param.key}`就能获取属性值

注意：如果是复选框那样多个值的话，只能返回第一个值

```jsp
<%--用户在浏览器上提交数据：http://localhost:8080/jsp/test.jsp?username=张三 --%>
用户名：<%=request.getParameter("username")%><br>
用户名：${param.username}<br>
```



#### paramValues

##### 获取复选框

通过`${paramValues.key}`获取到一维数组，通过下标就能获取里面的value

相当于`<%=request.getParameterValues("key")%>`

```jsp
<%--假设用户提交的数据：http://localhost:8080/jsp/test.jsp?hobby=1&hobby=2&hobby=3--%>
<%--以上提交的数据显然是采用checkbox进行提交的。同一组的checkbox的name是一样的。--%>
<%--param 获取的是请求参数一维数组当中的第一个元素。--%>
爱好：${param.aihao} <br>
爱好：<%=request.getParameter("aihao")%> <br>

一维数组：${paramValues.aihao}<br>
一维数组：<%=request.getParameterValues("aihao")%><br>

<%--获取数组当中的元素：[下标]--%>
爱好：${paramValues.aihao[0]}、${paramValues.aihao[1]}、${paramValues.aihao[2]} <br>
```



#### initParam

**用于获取ServletContext的配置信息**

```xml
<!--Servlet上下文初始化参数-->
<!--上下文初始化参数被封装到：ServletContext对象当中了。-->
<context-param>
    <param-name>pageSize</param-name>
    <param-value>20</param-value>
</context-param>

<context-param>
    <param-name>pageNum</param-name>
    <param-value>5</param-value>
</context-param>
```

##### JSP九大内置对象的application也是用来获取这个的

```jsp
<%
    String a = application.getInitParameter("pageSize");
    String b = application.getInitParameter("pageNum");
%>
```

##### 通过EL表达式的initParam来获取

```jsp
每页显示的记录条数：${initParam.pageSize} <br>
页码：${initParam.pageNum} <br>
```



### EL表达式的运算符

> 主要记住`eq`和`empty`即可
>
> 1. eq用来判断是否相等
> 2. empty用来判断是否为空，返回布尔值

#### 算术运算符

> 注意：在EL里`+`只能用来做求和运算，如果两边不是数字就会尝试转换成数字，不能转换的会抛异常比如（`java.lang.NumberFormatException: For input string: "xxx"`）
>
> `${10 + "20"}`为30

- +、-、*、/、%

#### 关系运算符

> `==`等判断是否相等的，调用equals方法

-  ==    eq   !=    >     >=    <    <= 

#### 逻辑运算符

> `!`和`not`效果一样

- !  && ||  not and or

#### 条件运算符

-  ? : 

#### 取值运算符

- 和.

#### empty运算符

- **empty运算符的结果是boolean类型**
- ${empty param.username}
- 用`not`或者`!`都能取反
  - ${not empty param.username}
  - ${!empty param.password}







## JSTL

### 什么是JSTL标签库？

- `Java Standard Tag Lib`（Java标准的标签库）
- JSTL标签库通常结合EL表达式一起使用。目的是**让JSP中的java代码消失。**
- 标签是写在JSP当中的，但实际上最终还是要执行对应的java程序。（java程序在jar包当中。）

### 使用JSTL标签库的步骤：

- 第一步：引入JSTL标签库对应的jar包。

  - **tomcat10之后**引入的jar包是：
    - `jakarta.servlet.jsp.jstl-2.0.0.jar`
    - `jakarta.servlet.jsp.jstl-api-2.0.0.jar`
  - 在IDEA当中怎么引入？
    - 在WEB-INF下新建lib目录，然后将jar包拷贝到lib当中。然后将其“Add Lib...”
    - 一定是要和mysql的数据库驱动一样，都是放在WEB-INF/lib目录下的。
    - 什么时候需要将jar包放到WEB-INF/lib目录下？如果这个jar是tomcat服务器没有的。如果有的话就不用引入（在IDEA的项目结构里把Tomcat的依赖jar包选择一下即可）。

- 第二步：在JSP中引入要使用标签库。（使用taglib指令引入标签库。）

  - JSTL提供了很多种标签，重点掌握核心标签库。

  - ```jsp
    <%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
    这个就是核心标签库。
    prefix="这里随便起一个名字就行了，核心标签库，大家默认的叫做c，你随意。"
    ```

- 第三步：在需要使用标签的位置使用即可。表面使用的是标签，底层实际上还是java程序。

### JSTL标签的原理

在标签`<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>`内

1. uri后面的路径实际上指向了一个`xxx.tld文件`。
   1. tld文件实际上是一个xml配置文件。
   2. 在tld文件中描述了“标签”和“java类”之间的关系。
2. 以上核心标签库对应的tld文件是：c.tld文件。
3. c.tld文件在jakarta.servlet.jsp.jstl-2.0.0.jar里面META-INF目录下，有一个c.tld文件。



### 源码解析：配置文件tld解析

1. `<tag>`标签包含着一个JSTL标签

2. `<description>`是标签的描述

3. `<name>`是标签的名字

4.  `<tag-class>`是标签对应的Java类

5. `<body-content>`标签体当中可以出现的内容，如果是JSP，就表示标签体中可以出现符合JSP所有语法的代码。例如EL表达式。

6. `<attribute>`属性

   1. `<description>`对这个属性的描述

   2. `<name>`属性名

   3. `<required>`false表示该属性不是必须的。true表示该属性是必须的

   4. `<rtexprvalue>`这个描述说明了该属性是否支持EL表达式。false表示不支持。true表示支持EL表达式。

      

- ```
  <tag>
      <description>对该标签的描述</description>
      <name>catch</name> 标签的名字
      <tag-class>org.apache.taglibs.standard.tag.common.core.CatchTag</tag-class> 标签对应的java类。
      <body-content>JSP</body-content> 标签体当中可以出现的内容，如果是JSP，就表示标签体中可以出现符合JSP所有语法的代码。例如EL表达式。
      <attribute>
          <description>
          	对这个属性的描述
          </description>
          <name>var</name> 属性名
          <required>false</required> false表示该属性不是必须的。true表示该属性是必须的。
          <rtexprvalue>false</rtexprvalue> 这个描述说明了该属性是否支持EL表达式。false表示不支持。true表示支持EL表达式。
      </attribute>
    </tag>
  
  使用标签
  <c:catch var="">
  	JSP....
  </c:catch>
  ```

### 核心标签库core中常用的标签

#### c:if

- <c:if test="boolean类型，支持EL表达式"></c: if>

#### c:forEach

1. 遍历集合

   - ~~~jsp
     <c:forEach items="集合，支持EL表达式" var="集合中的元素" varStatus="元素状态对象"> 		${元素状态对象.count} 
     </c: forEach>
     ~~~

2. 循环数字

   - ~~~jsp
     <c:forEach var="i" begin="1" end="10" step="2"> 
         ${i} 
     </c: forEach>
     ~~~

     

#### c:choose c:when c:otherwise

- ```jsp
  <c:choose>
      <c:when test="${param.age < 18}">
          青少年
      </c:when>
      <c:when test="${param.age < 35}">
          青年
      </c:when>
      <c:when test="${param.age < 55}">
          中年
      </c:when>
      <c:otherwise>
          老年
      </c:otherwise>
  </c:choose>
  ```







# Filter过滤器

## 过滤器和拦截器区别

1. 规范不同
   - 过滤器是Servlet的规范。
   - 拦截器是SpringMVC的规范。
2. 拦截范围不同
   - 过滤器过滤范围较大。
   - 拦截器只拦截action或controller



## 为什么要有Filter

1. 很多Servlet执行前都要判断是否登录，没登录的话需要登录。
2. 每个Servlet都需要解决中文乱码问题。

以上的都是公共代码，如果每个Servlet都写一遍就太冗余了，所以可以抽取出来放在Filter里面



## 过滤器怎么写

- 第一步：编写一个Java类实现一个接口：`jarkata.servlet.Filter`。并且实现这个接口当中所有的方法。

  - `init方法`：在Filter对象第一次被创建之后调用，并且只调用一次。
  - `doFilter方法`：只要用户发送一次请求，则执行一次。发送N次请求，则执行N次。在这个方法中编写过滤规则。
  - `destroy方法`：在Filter对象被释放/销毁之前调用，并且只调用一次。

- 第二步：在web.xml文件中对Filter进行配置。这个配置和Servlet很像。

  - ```xml
    <filter>
        <filter-name>filter2</filter-name>
        <filter-class>com.bjpowernode.javaweb.servlet.Filter2</filter-class>
    </filter>
    <filter-mapping>
        <filter-name>filter2</filter-name>
        <url-pattern>*.do</url-pattern>
    </filter-mapping>
    ```

  - 或者使用注解：`@WebFilter({"*.do"})`（只有一个的时候可以省略`{}`）

### 注意：

- Servlet对象默认情况下，在服务器启动的时候是不会新建对象的。
- Filter对象默认情况下，在服务器启动的时候会新建对象。
- Servlet是单例的。Filter也是单例的。（单实例。）

- 目标Servlet是否执行，取决于两个条件：

  - 第一：在过滤器当中是否编写了：chain.doFilter(request, response); 代码。
  - 第二：用户发送的请求路径是否和Servlet的请求路径一致。

- `chain.doFilter(request, response); `这行代码的作用：
  - 执行下一个过滤器，如果下面没有过滤器了，执行最终的Servlet。

- 注意：Filter的优先级，天生的就比Servlet优先级高。

  - /a.do 对应一个Filter，也对应一个Servlet。那么一定是先执行Filter，然后再执行Servlet。


## 关于Filter的配置路径：

1. 精确匹配
   - `/a.do`、`/b.do`、`/dept/save`
2. 后缀匹配（不要以`\`开始）
   - `*.do` 
3. 前缀匹配
   - `*.do` 
4. 匹配所有
   - `/*`





## Filter执行顺序

过滤器的调用顺序，遵循栈数据结构。

### 在web.xml文件中

- 依靠`filter-mapping标签`的配置位置，越靠上优先级越高。



### 在使用@WebFilter注解时

执行顺序是：**比较Filter这个类名**。

- 比如：FilterA和FilterB，则先执行FilterA。
- 比如：Filter1和Filter2，则先执行Filter1.



## 生命周期

- Filter的生命周期？

  - 和Servlet对象生命周期一致。
  - 唯一的区别：**Filter默认情况下，在服务器启动阶段就实例化**。Servlet不会。


## Filter过滤器责任链设计模式。

### 在下面这段代码中的问题：

每一环的调用关系都是在编译阶段已经确定，如果想改变的话就需要修改源代码。Java代码改了就要重新编译重新测试重新发布。

违反了OCP原则

```java
public class Test {
    public static void main(String[] args) {
        System.out.println("main begin");
        m1();
        System.out.println("main over");
    }

    private static void m1() {
        System.out.println("m1 begin");
        m2();
        System.out.println("m1 over");
    }

    private static void m2() {
        System.out.println("m2 begin");
        m3();
        System.out.println("m2 over");
    }

    private static void m3() {
        System.out.println("目标正在执行中。。。。");
    }
}
```



### 过滤器的优点

在程序编译阶段不会确定调用顺序。

因为Filter的调用顺序是配置到web.xml文件中的，只要修改web.xml配置文件中`filter-mapping`的顺序就可以调整Filter的执行顺序。

<font>所以其实是建议在xml里配置Filter的。之所以Servlet建议用注解就是因为Servlet太多了</font>

显然Filter的执行顺序是在程序运行阶段动态组合的。那么这种设计模式被称为责任链设计模式。



### 责任链设计模式最大的核心思想：

- 在程序运行阶段，动态的组合程序的调用顺序。



# Listener监听器

## 什么是监听器？

> 监听器实际上就是给Javaweb开发者一个时机（比如域对象创建或者销毁的时机），如果有一些需要在这种时机做的，可以把代码写进去

- 监听器是Servlet规范中的一员。就像Filter一样。Filter也是Servlet规范中的一员。
- 在Servlet中，所有的监听器接口都是以“Listener”结尾。

## 监听器有什么用？

- 监听器实际上是Servlet规范留给我们javaweb程序员的特殊时机。
- 特殊的时刻如果想执行这段代码，你需要想到使用对应的监听器。

## Servlet规范中提供了哪些监听器

### jakarta.servlet包下：

特点：

1. 都需要@WebListener注解进行标注（或者xml里配（不推荐））
2. 没带Attribute的是监听域对象，里面有创建和销毁时候的方法（因为在接口里的方法是default的，所以即使继承了也不一定要全重写）
3. 带Attribute是监听对应域内的数据变化（增删改）

- `ServletContextListener`
- `ServletContextAttributeListener`
- `ServletRequestListener`
- `ServletRequestAttributeListener`

### jakarta.servlet.http包下：

（以下两个特点和用法都同上）

- `HttpSessionListener`
- `HttpSessionAttributeListener`
  - 该监听器需要使用@WebListener注解进行标注。
  - 该监听器监听的是什么？是session域中数据的变化。只要数据变化，则执行相应的方法。主要监测点在session域对象上。



（以下三个比较特殊）

- `HttpSessionBindingListener`
  - 该监听器**不需要使用@WebListener进行标注**（给Javabean加的实现）。
  - 假设User类实现了该监听器，那么User对象在被放入session的时候触发bind事件，User对象从session中删除的时候，触发unbind事件。
  - 假设Customer类没有实现该监听器，那么Customer对象放入session或者从session删除的时候，不会触发bind和unbind事件。
- `HttpSessionIdListener`
  - session的id发生改变的时候，监听器中的唯一一个方法就会被调用。
- `HttpSessionActivationListener`
  - 监听session对象的钝化和活化的。
  - 钝化：session对象从内存存储到硬盘文件。
  - 活化：从硬盘文件把session恢复到内存。



## 实现一个监听器的步骤

以`ServletContextListener`为例。

- 第一步：编写一个类实现ServletContextListener接口。并且实现里面的方法。

  - ```java
    void contextInitialized(ServletContextEvent event)
    void contextDestroyed(ServletContextEvent event)
    ```

- 第二步：在web.xml文件中对ServletContextListener进行配置，如下：

  - ```xml
    <listener>
        <listener-class>com.bjpowernode.javaweb.listener.MyServletContextListener</listener-class>
    </listener>
    ```

  - 当然，第二步也可以不使用配置文件，也可以用注解，例如：`@WebListener`推荐！

- 注意：所有监听器中的方法都是不需要javaweb程序员调用的，由服务器来负责调用？什么时候被调用呢？

  - 当某个特殊的事件发生（特殊的事件发生其实就是某个时机到了。）之后，被web服务器自动调用。

  

## 实现统计项目中当前登录在线的人数。

- 可以通过服务器端有没有分配session对象，因为一个session代表了一个用户。有一个session就代表有一个用户。如果你采用这种逻辑去实现的话，session有多少个，在线用户就有多少个。这种方式的话：HttpSessionListener够用了。session对象只要新建，则count++，然后将count存储到ServletContext域当中，在页面展示在线人数即可。
- 业务发生改变了，只统计登录的用户的在线数量，这个该怎么办？
  - session.setAttribute("user", userObj); 
  - 用户登录的标志是什么？session中曾经存储过User类型的对象。那么这个时候可以让User类型的对象实现HttpSessionBindingListener监听器，只要User类型对象存储到session域中，则count++，然后将count++存储到ServletContext对象中。页面展示在线人数即可。



- 什么代表着用户登录了？
  - session.setAttribute("user", userObj); User类型的对象只要往session中存储过，表示有新用户登录。
- 什么代表着用户退出了？
  - session.removeAttribute("user"); User类型的对象从session域中移除了。
  - 或者有可能是session销毁了。（session超时）









# MVC

> 名字的问题
>
> pojo：
>
> 1. 有的人也会把这种专门封装数据的对象，称为bean对象。(javabean：咖啡豆)
> 2. 有的人也会把这种专门封装数据的对象，称为领域模型对象。domain对象。
> 3. 有的人也会把这种专门封装数据的对象，称为pojo对象。
>
> 都一样，不同人的习惯不同罢了
>
> service:
>
> 专门写业务逻辑代码的类
>
> 1. 有的人命名为 XxxService
> 2. 有的人命名为 XxxBiz



## 为什么要分层

> 可以让专人干专事，分工明确
>
> 降低代码耦合度
>
> 扩展力增强
>
> 组件可复用性增强

## 不使用MVC架构的缺点

1. 代码的复用性太差。（代码的重用性太差）
   - 因为没有进行“职能分工”，没有独立组件的概念，所以没有办法进行代码复用。代码和代码之间的耦合度太高，扩展力太差。
2. 耦合度高，导致了代码很难扩展。
3. 操作数据库的代码和业务逻辑混杂在一起，很容易出错。编写代码的时候很容易出错，无法专注业务逻辑的编写。





## 三层架构

![image-20220827152841442](https://note-img54.oss-cn-hongkong.aliyuncs.com/note/Javaweb/Javaweb2.assets/image-20220827152841442.png)



## MVC

![image-20220827152920885](https://note-img54.oss-cn-hongkong.aliyuncs.com/note/Javaweb/Javaweb2.assets/image-20220827152920885.png)



## MVC和三层架构区别

1. 三层架构的表现层（表示层/web层）相当于是MVC里的视图层（v）和控制层（c）
2. MVC里的Model层又相当于是包含了三层架构里的业务逻辑层（Service）和持久化层（DAO）





## ThreadLocal

`java.lang.ThreadLocal`

### 正常需要事务的传参方式

在MVC执行的过程中，需要进行事务的控制，一般是在Service层里开启事务结束事务，但是如果只在Service里控制了事务，而DAO层的Connection又是新的对象的话，DAO的事务就不受Service的事务控制了。

**不太好的解决办法：**

通过将Service的Connection对象传参，传给DAO的方法，保证执行过程中的Connection对象都是同一个，就可以让Service控制DAO的事务

**以上解决办法的缺点：**

代码丑陋



### ThreadLocal原理分析

> 给一个map（key是线程对象，value是Connection对象），只要是在同一个线程内，通过线程对象获取的Connection对象就是同一个



#### 底层实现方法

##### ThreadLocal类

在ThreadLocal里给一个map，泛型<Thread, T>（T为实例化ThreadLocal的时候传进来的某个类）。

给出通过线程对象来增加删除获取T的方法

```java
import java.util.HashMap;
import java.util.Map;

/**
 * 自定义一个ThreadLocal类
 */
public class MyThreadLocal<T> {

    /**
     * 所有需要和当前线程绑定的数据要放到这个容器当中
     */
    private Map<Thread, T> map = new HashMap<>();

    /**
     * 向ThreadLocal中绑定数据
     */
    public void set(T obj){
        map.put(Thread.currentThread(), obj);
    }

    /**
     * 从ThreadLocal中获取数据
     * @return
     */
    public T get(){
        return map.get(Thread.currentThread());
    }

    /**
     * 移除ThreadLocal当中的数据
     */
    public void remove(){
        map.remove(Thread.currentThread());
    }
}
```

##### 工具类

1. 给出一个工具类专门用来调ThreadLocal的方法。在这个工具类里给出一个静态（为了只实例化一次）ThreadLocal变量，并实例化ThreadLocal，给定泛型。
2. 调用ThreadLocal对象的获取value，因为在同个线程里线程对象都一样，所以直接获取就行。如果第一次获取肯定是没数据的，判断是null之后就实例化一个就行。
3. 在释放Connection资源的时候也要调用ThreadLocal来删除掉线程对象对应的Connection对象
   - 因为Tomcat支持线程池，如果仅仅关闭了Connection而不删除的话，下一次这个线程还可能被其他人使用，那就是直接拿到已经关闭的Connection对象了

之后如果有需要用同一个对象（比如Connection对象），直接用工具类获取value即可



```java
public class DBUtil {

    // 静态变量特点：类加载时执行，并且只执行一次。
    // 全局的大Map集合
    private static MyThreadLocal<Connection> local = new MyThreadLocal<>();

    /**
     * 每一次都调用这个方法来获取Connection对象
     * @return
     */
    public static Connection getConnection(){
        Connection connection = local.get();
        if (connection == null) {
            // 第一次调用：getConnection()方法的时候，connection一定是空的。
            // 空的就new一次。
            connection = new Connection();
            // 将new的Connection对象绑定到大Map集合中。
            local.set(connection);
        }
        return connection;
    }

}
```



##### 改版之后的DB工具类

（[普通工具类点这里](# JDBC工具类)）

> 需要开启事务就`connection.setAutoCommit(false);`
>
> 没问题就提交`connection.commit();`
>
> 否则回滚`connection.rollback();`

```java
import java.sql.*;
import java.util.ResourceBundle;

public class DBUtil {

    private static ResourceBundle bundle = ResourceBundle.getBundle("resources/jdbc");
    private static String driver = bundle.getString("driver");
    private static String url = bundle.getString("url");
    private static String user = bundle.getString("user");
    private static String password = bundle.getString("password");

    // 不让创建对象，因为工具类中的方法都是静态的。不需要创建对象。
    // 为了防止创建对象，故将构造方法私有化。
    private DBUtil(){}

    // DBUtil类加载时注册驱动
    static {
        try {
            Class.forName(driver);
        } catch (ClassNotFoundException e) {
            e.printStackTrace();
        }
    }

    // 这个对象实际上在服务器中只有一个。
    private static ThreadLocal<Connection> local = new ThreadLocal<>();

    /**
     * 这里没有使用数据库连接池，直接创建连接对象。
     * @return 连接对象
     * @throws SQLException
     */
    public static Connection getConnection() throws SQLException {
        Connection conn = local.get();
        if (conn == null) {
            conn = DriverManager.getConnection(url, user, password);
            local.set(conn);
        }
        return conn;
    }

    /**
     * 关闭资源
     * @param conn 连接对象
     * @param stmt 数据库操作对象
     * @param rs 结果集对象
     */
    public static void close(Connection conn, Statement stmt, ResultSet rs){
        if (rs != null) {
            try {
                rs.close();
            } catch (SQLException e) {
                throw new RuntimeException(e);
            }
        }
        if (stmt != null) {
            try {
                stmt.close();
            } catch (SQLException e) {
                throw new RuntimeException(e);
            }
        }
        if (conn != null) {
            try {
                conn.close();
                // 思考一下：为什么conn关闭之后，这里要从大Map中移除呢？
                // 根本原因是：Tomcat服务器是支持线程池的。也就是说一个人用过了t1线程，t1线程还有可能被其他用户使用。
                local.remove();
            } catch (SQLException e) {
                throw new RuntimeException(e);
            }
        }
    }

}

```





##### 通过DB工具类来控制事务的Service示例

> 这里面还存在问题：
>
> - 把事务控制写进Service里很丑，而且每个方法都写一遍冗余了
>   - 通过动态代理解决

```java
/**
 * 完成转账的业务逻辑
 * @param fromActno 转出账号
 * @param toActno 转入账号
 * @param money 转账金额
 */
public void transfer(String fromActno, String toActno, double money) throws MoneyNotEnoughException, AppException {
    // service层控制事务
    try (Connection connection = DBUtil.getConnection()){
        System.out.println(connection);
        // 开启事务(需要使用Connection对象)
        connection.setAutoCommit(false);

        // 查询余额是否充足
        Account fromAct = accountDao.selectByActno(fromActno);
        if (fromAct.getBalance() < money) {
            throw new MoneyNotEnoughException("对不起，余额不足");
        }
        // 程序到这里说明余额充足
        Account toAct = accountDao.selectByActno(toActno);
        // 修改余额（只是修改了内存中java对象的余额）
        fromAct.setBalance(fromAct.getBalance() - money);
        toAct.setBalance(toAct.getBalance() + money);
        // 更新数据库中的余额
        int count = accountDao.update(fromAct);

        // 模拟异常
        /*String s = null;
        s.toString();*/

        count += accountDao.update(toAct);
        if (count != 2) {
            throw new AppException("账户转账异常！！！");
        }

        // 提交事务
        connection.commit();
    } catch (SQLException e) {
        throw new AppException("账户转账异常！！！");
        // 因为如果转账有问题的话已经在33行抛了异常了，所以不会进行事务的提交，也就不需要回滚了
    }
}
```







# 拓展

### CRUD

1. Create【增】
2. Retrieve【查】
3. Update【改】
4. Delete【删】



### 清除浏览器缓存

`ctrl + shift + del`

### 路径

> 通过[request](# :star:获取应用的根路径)方式动态获取项目根路径（项目名（/xxx））

1. 前端页面里发送请求（超链接等）的路径：
   - ​	以 “/” 开始，**带上项目名**
2. [欢迎页面](# 怎么设置欢迎页面呢？):
   - ​	设置欢迎页面的时候，这个路径**不需要**以`“/”`开始。并且这个路径默认是从webapp的根下开始查找。
3. web.xml里的Servlet的`url-pattern`
   - ​	**Servlet里配的**`url-pattern`的时候要加`“/”`，但是不加项目名
4. [请求转发](# 请求转发)
   - 转发的时候，路径的写法要注意，转发的路径以“/”开始，不加项目名。

5. 重定向
   - 重定向相当于是response回去一个地址给浏览器，浏览器再发一次请求，所以路径要跟在前端页面写一样
   - ​	以 “/” 开始，**带上项目名**



#### base标签

在前端HTML代码中，有一个标签，叫做base标签，这个标签可以设置整个网页的基础路径。

- 这是Java的语法，也不是JSP的语法。是HTML中的一个语法。HTML中的一个标签。**通常出现在head标签中。**

##### 写法

~~~html
<base href="http://localhost:8080/xx/">
<!--  <base href="协议://IP:端口号/项目名/">  -->
~~~



- 在当前页面中，**凡是路径没有以“/”开始的**，都会自动将base中的路径添加到这些路径之前。

  - < a href="ab/def"></ a>
  - 等同于：< a href="http://localhost:8080/oa/ab/def"></ a>
- 需要注意：在**JS代码**中的路径，保险起见，最好**不要依赖base标签**。JS代码中的路径最好写上全路径。

##### JSP结合base标签写法

1. `${pageContext.request.scheme}`获取协议
2. `${pageContext.request.serverName}`获取主机名
3. `${pageContext.request.serverPort}`获取端口号
4. `${pageContext.request.contextPath}`获取项目名
5. （注意在base里的路径后面的`"/"`不要忘了加）

- ```html
  <base href="${pageContext.request.scheme}://${pageContext.request.serverName}:${pageContext.request.serverPort}${pageContext.request.contextPath}/">
  ```








### 请求响应乱码问题

在Tomcat9以及之前版本，会出现中文乱码。在Tomcat10已经默认utf-8了，不会有中文乱码了`（为了通用性，Tomcat10最好也处理一下）`

[处理请求响应乱码问题](# 处理请求响应乱码)

#### POST请求体乱码

通过在Servlet内写上`request.setCharacterEncoding("UTF-8");`

（Tomcat10不会乱码）

#### GET请求乱码

修改`CATALINA_HOME/conf/server.xml配置文件`，里面有一段配置如下图所示，只需要在里面加上`URIEncoding="UTF-8"`就行。

注意：从Tomcat8之后，URIEncoding的默认值就是UTF-8，所以GET请求也没有乱码问题了。

![image-20220821152208451](https://note-img54.oss-cn-hongkong.aliyuncs.com/note/Javaweb/Javaweb2.assets/image-20220821152208451.png)

#### response乱码

通过在Servlet内写上`response.setContentType("text/html;charset=UTF-8");`

（Tomcat10不会乱码，但是为了通用性，Tomcat10最好也加上）





### JavaBean

> 1. 有的人也会把这种专门封装数据的对象，称为bean对象。(javabean：咖啡豆)
> 2. 有的人也会把这种专门封装数据的对象，称为领域模型对象。domain对象。
> 3. 有的人也会把这种专门封装数据的对象，称为pojo对象。
>
> 都一样，不同人的习惯不同罢了

- javabean（java的logo是一杯冒着热气的咖啡。javabean被翻译为：咖啡豆）
- java是一杯咖啡，咖啡又是由一粒一粒的咖啡豆研磨而成。
- 整个java程序中有很多bean的存在。由很多bean组成。
- 什么是javabean？实际上javabean你可以理解为符合某种规范的java类，比如：
  - 有无参数构造方法
  - 属性私有化
  - 对外提供公开的set和get方法
  - 实现java.io.Serializable接口
  - 重写toString
  - 重写hashCode+equals
  - ....
- javabean其实就是java中的实体类。负责数据的封装。
- 由于javabean符合javabean规范，具有更强的通用性。





### JDBC工具类

[加入ThreadLocal的工具类](# 工具类)

```
package com.powernode.bank.utils;

import java.sql.*;
import java.util.ResourceBundle;

/**
 * JDBC工具类
 * @author 老杜
 * @version 1.0
 * @since 1.0
 */
public class DBUtil {

    private static ResourceBundle bundle = ResourceBundle.getBundle("resources/jdbc");
    private static String driver = bundle.getString("driver");
    private static String url = bundle.getString("url");
    private static String user = bundle.getString("user");
    private static String password = bundle.getString("password");

    // 不让创建对象，因为工具类中的方法都是静态的。不需要创建对象。
    // 为了防止创建对象，故将构造方法私有化。
    private DBUtil(){}

    // DBUtil类加载时注册驱动
    static {
        try {
            Class.forName(driver);
        } catch (ClassNotFoundException e) {
            e.printStackTrace();
        }
    }

    // 这个对象实际上在服务器中只有一个。
    private static ThreadLocal<Connection> local = new ThreadLocal<>();

    /**
     * 这里没有使用数据库连接池，直接创建连接对象。
     * @return 连接对象
     * @throws SQLException
     */
    public static Connection getConnection() throws SQLException {
        Connection conn = local.get();
        if (conn == null) {
            conn = DriverManager.getConnection(url, user, password);
            local.set(conn);
        }
        return conn;
    }

    /**
     * 关闭资源
     * @param conn 连接对象
     * @param stmt 数据库操作对象
     * @param rs 结果集对象
     */
    public static void close(Connection conn, Statement stmt, ResultSet rs){
        if (rs != null) {
            try {
                rs.close();
            } catch (SQLException e) {
                throw new RuntimeException(e);
            }
        }
        if (stmt != null) {
            try {
                stmt.close();
            } catch (SQLException e) {
                throw new RuntimeException(e);
            }
        }
        if (conn != null) {
            try {
                conn.close();
                // 思考一下：为什么conn关闭之后，这里要从大Map中移除呢？
                // 根本原因是：Tomcat服务器是支持线程池的。也就是说一个人用过了t1线程，t1线程还有可能被其他用户使用。
                local.remove();
            } catch (SQLException e) {
                throw new RuntimeException(e);
            }
        }
    }

}
```



```java
import java.sql.*;
import java.util.ResourceBundle;

/**
 * JDBC的工具类
 */
public class DBUtil {

    // 静态变量：在类加载时执行。
    // 并且是有顺序的。自上而下的顺序。
    // 属性资源文件绑定，此时在src下有个resources包里面有个jdbc.properties文件存着数据库配置信息
    private static ResourceBundle bundle = ResourceBundle.getBundle("resources.jdbc");
    // 根据属性配置文件key获取value
    private static String driver = bundle.getString("driver");
    private static String url = bundle.getString("url");
    private static String user = bundle.getString("user");
    private static String password = bundle.getString("password");

    // private是不让创建对象，因为工具类中的方法都是静态的。不需要创建对象。
    // 为了防止创建对象，故将构造方法私有化。
    private DBUtil(){}
    
    static {
        // 注册驱动（注册驱动只需要注册一次，放在静态代码块当中。DBUtil类加载的时候执行。）
        try {
            // "com.mysql.jdbc.Driver" 是连接数据库的驱动，不能写死。因为以后可能还会连接Oracle数据库。
            // 如果连接oracle数据库的时候，还需要修改java代码，显然违背了OCP开闭原则。
            // OCP开闭原则：对扩展开放，对修改关闭。（什么是符合OCP呢？在进行功能扩展的时候，不需要修改java源代码。）
            //Class.forName("com.mysql.jdbc.Driver");

            Class.forName(driver);
        } catch (ClassNotFoundException e) {
            e.printStackTrace();
        }
    }

    /**
     * 获取数据库连接对象（这里没用连接池）
     * @return conn 连接对象
     * @throws SQLException
     */
    public static Connection getConnection() throws SQLException {
        // 获取连接
        Connection connection = DriverManager.getConnection(url, user, password);
        return connection;
    }

    /**
     * 释放资源
     * @param conn 连接对象
     * @param ps 数据库操作对象
     * @param rs 结果集对象
     */
    public static void close(Connection conn, Statement ps, ResultSet rs){
        if (rs != null) {
            try {
                rs.close();
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
        if (ps != null) {
            try {
                ps.close();
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
        if (conn != null) {
            try {
                conn.close();
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
    }

}
```
