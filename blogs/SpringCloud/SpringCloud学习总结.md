## 微服务架构

### 架构演化

软件系统架构大致经历了：`单体应用架构—>垂直应用架构—>分布式架构—>SOA架构—>微服务架构的演变`

1. 单体应用架构：
   - 一个项目一个tomcat。
   - 优点：简单维护简单。
   - 缺点：紧密耦合容错低，扩展性差，**不适合大项目**。
2. 垂直应用架构：
   - 对单体应用架构拆分，多个项目多个tomcat。
   - 优点：可以针对模块进行集群扩展，一个模块的问题不会影响另一个模块
   - 缺点：各系统相互独立，会有重复冗余的代码且系统间无法互相调用
3. 分布式架构：
   - 对垂直应用架构拆分，把整个系统分为展现层和服务层
   - 优点：**提高代码复用性**
   - 缺点：系统间耦合度变高，调用关系错综复杂，难以维护
4. SOA架构（面向服务）：
   - 对分布式架构优化，展现层和服务层中间多了个服务治理中心。
   - 优点：使用注册中心解决了服务间调用关系的自动调节
   - 缺点：服务间有依赖关系，一但出现问题会引起服务雪崩；服务间调用关系复杂
5. 微服务架构：
   - 把SOA架构中的服务层拆分成原子状态。
   - 优点：服务原子化拆分，独立打包、部署和升级，保证每个微服务清晰的任务划分，**利于扩展**



### 微服务架构的问题以及解决方式

一旦采用微服务系统架构，就势必会遇到这样几个问题：

- 这么多小服务，如何管理他们？(服务治理 注册中心[服务注册 发现 剔除])
- 这么多小服务，他们之间如何通讯？(**restful**)
- 这么多小服务，客户端怎么访问他们？(网关)
- 这么多小服务，一旦出现问题了，应该如何自处理？(容错)
- 这么多小服务，一旦出现问题了，应该如何排错？ (链路追踪)



## SpringCloud Alibaba组件

### 一、Nacos

> 服务注册与发现、服务剔除

可以将各个微服务自动注册进注册中心，各个服务实例可以通过nacos获取到其他服务的信息，通过这些信息去请求其他服务



#### 1.1 Nacos对比其他注册中心

在Eureka闭源后，Nacos已经成为SpringCloudAlibaba的首选注册中心了

![image-20230228171740576](https://s2.loli.net/2023/10/17/wBLYy73ScJWnuef.png)



#### 1.2 核心功能

1. **服务注册**：Nacos Client会通过发送REST请求的方式向Nacos Server注册自己的服务，提供自身的元数据，比如ip地址、端口等信息。Nacos Server接收到注册请求后，就会把这些元数据信息存储在一个双层的内存Map中。
2. **服务心跳**：在服务注册后，Nacos Client会维护一个定时心跳来持续通知Nacos Server，说明服务一直处于可用状态，防止被剔除。默认5s发送一次心跳。
3. **服务同步**：Nacos Server集群之间会互相同步服务实例，用来保证服务信息的一致性。 leader  raft  
4. **服务发现**：服务消费者（Nacos Client）在调用服务提供者的服务时，会发送一个REST请求给Nacos Server，获取上面注册的服务清单，并且缓存在Nacos Client本地，同时会在Nacos Client本地开启一个定时任务定时拉取服务端最新的注册表信息更新到本地缓存
5. **服务健康检查**：Nacos Server会开启一个定时任务用来检查注册服务实例的健康情况，对于超过15s没有收到客户端心跳的实例会将它的healthy属性置为false(客户端服务发现时不会发现)，如果某个实例超过30秒没有收到心跳，直接剔除该实例(被剔除的实例如果恢复发送心跳则会重新注册）





#### 1.3 基础用法

##### 搭建Nacos环境

1. 去GitHub上下对应版本的Nacos
2. 启动服务（默认端口8848，默认账号密码是nacos/nacos）



##### 将服务注册到Nacos

1. 添加依赖

   - ~~~xml
     <!--nacos客户端-->
     <dependency>
         <groupId>com.alibaba.cloud</groupId>
         <artifactId>spring-cloud-starter-alibaba-nacos-discovery</artifactId>
     </dependency>
     ~~~

2. 在主类上添加**@EnableDiscoveryClient**注解

   - ~~~java
     @SpringBootApplication
     @EnableDiscoveryClient
     public class ProductApplication......
     ~~~

3. 在application.yml中添加nacos服务的地址

   - ~~~yml
     spring:
       cloud:
         nacos:
           discovery:
             server-addr: 127.0.0.1:8848
     ~~~



### 二、Ribbon

Spring Cloud Ribbon 是一个基于 HTTP 和 TCP 的`客户端负载均衡工具`，它基于 NetflixRibbon 实现。通过 Spring Cloud 的封装，可以轻松地将面向服务的 **REST 模版请求**自动转换成客户端负载均衡的服务调用。





#### 2.1 基础用法

##### 1-引入依赖

~~~xml
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-netflix-ribbon</artifactId>
    <version>2.2.9.RELEASE</version>
</dependency>
~~~



##### 2-注册RestTemplate的时候加上@LoadBalanced

~~~java
/**
* 加了@LoadBalanced之后，就会被ribbon控制
* @return
*/
@Bean
@LoadBalanced
public RestTemplate restTemplate() {
    return new RestTemplate();
}
~~~





##### 3-之后只要是通过这个restTemplate示例发送的请求都会被ribbon接管



#### 2.2 通过配置文件方式修改复杂均衡策略

修改application.yml

~~~yml
被调用的微服务名:
  ribbon:
    指定使用Nacos提供的负载均衡策略（优先调用同一集群的实例，基于随机&权重）
    NFLoadBalancerRuleClassName: com.alibaba.cloud.nacos.ribbon.NacosRule
~~~





### 三、Feign

Feign是Spring Cloud提供的一个声明式的`伪Http客户端`， 它使得**调用远程服务就像调用本地服务一样简单**， 只需要创建一个接口并添加一个注解即可。

Spring Cloud openfeign对Feign进行了增强，使其支持Spring MVC注解，另外还整合了Ribbon和Nacos，从而使得Feign的使用更加方便，通常提到Feign都指的是`openFeign`

Nacos很好的兼容了Feign， Feign默认集成了 Ribbon， 所以在Nacos下使用Fegin默认就实现了负载均衡的效果。



#### 3.1 基础用法

##### 1 加入Fegin的依赖

~~~xml
<!--fegin组件-->
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-openfeign</artifactId>
</dependency>
~~~



##### 2 在主类上添加开启Feign的注解

~~~java
@SpringBootApplication
@EnableDiscoveryClient
@EnableFeignClients//开启Feign
public class BootApplication {}
~~~



##### 3 创建一个service， 并使用Fegin实现微服务调用

~~~java
@FeignClient("声明调用的提供者的name")
public interface ProductService {
//指定调用提供者的哪个方法
//@FeignClient+@GetMapping 就是一个完整的请求路径 http://声明调用的提供者的name/路径
@GetMapping(value = "/路径")
Product findByPid(参数和服务原方法参数一致);
}
~~~



##### 4 在Controller中注入刚才的Service，像调用本地方式一样调用远程服务







### 四、**Sentinel**

Sentinel (分布式系统的流量防卫兵) 是阿里开源的一套用于**服务容错**的综合性解决方案。它以流量为切入点, 从**流量控制、熔断降级、系统负载保护**等多个维度来保护服务的稳定性。

#### 4.1 服务容错

系统可能出现的问题：

1. 一个服务的故障导致其它服务的连锁反应（雪崩）
2. 激增流量击垮服务器

服务容错的**目的**：

1. 保护服务自身，不受外界环境（CPU内存等）影响
2. 保护服务自身，不被上游服务压垮（限流）
3. 保护服务自身，不被下游服务拖垮（超时、熔断）



#### 4.2 **常见的容错思路**

常见的容错思路有`隔离、超时、限流、熔断、降级`这几种

##### 隔离

它是指将系统按照一定的原则划分为若干个服务模块，各个模块之间相对独立，无强依赖。当有故障发生时，能将问题和影响隔离在某个模块内部，而不扩散风险，不波及其它模块，不影响整体的系统服务。

常见的隔离方式有：线程池隔离和信号量隔离．

##### 超时

在上游服务调用下游服务的时候，设置一个最大响应时间，如果超过这个时间，下游未作出反应，就断开请求，释放掉线程。

##### 限流

限流就是限制系统的输入和输出流量已达到保护系统的目的。为了保证系统的稳固运行,一旦达到的需要限制的阈值,就需要限制流量并采取少量措施以完成限制流量的目的

##### 熔断

在互联网系统中，当下游服务因访问压力过大而响应变慢或失败，上游服务为了保护系统整体的可用性，可以暂时切断对下游服务的调用。这种牺牲局部，保全整体的措施就叫做熔断



#### 4.3 基础用法

##### 1 在pom.xml中加入依赖

~~~xml
<dependency>
    <groupId>com.alibaba.cloud</groupId>
    <artifactId>spring-cloud-starter-alibaba-sentinel</artifactId>
</dependency>
~~~



##### 2 在GitHub上下载jar包，解压到文件夹

##### 3 控制台启动sentinel

控制台本身是一个SpringBoot项目，启动的时候可以指定配置参数

~~~cmd
# 直接使用jar命令启动项目(控制台本身是一个SpringBoot项目)
java -Dserver.port=8080 -Dcsp.sentinel.dashboard.server=localhost:8080 -Dproject.name=sentinel-dashboard -jar sentinel-dashboard-1.7.0.jar
~~~



##### 4 修改yml

~~~yml
spring:
  cloud:
    sentinel:
      transport:
        port: 9999 #跟控制台交流的端口,随意指定一个未使用的端口即可
          dashboard: localhost:8080 # 指定控制台服务的地址
~~~



##### 5 通过浏览器访问sentinel

默认用户名密码是 sentinel/sentinel 



### 五、**Gateway**

#### 5.1 概述

在微服务架构中，一个系统会被拆分为很多个微服务。那么作为客户端要如何去调用这么多的微服务呢？

如果没有网关的存在，只能在客户端记录每个微服务的地址，然后分别去调用，这样非常麻烦且容易出错。

可以加入网关，就是指系统的**统一入口**，它封装了应用程序的内部结构，为客户端提供统一服务，一些与业务本身功能无关的公共逻辑可以在这里实现，诸如认证、鉴权、监控、路由转发等等。

![image-20230305233444008](https://s2.loli.net/2023/10/17/XmxUeLNiovMgwkz.png)



#### 5.2 基础用法-结合nacos

##### 1 引入Nacos和Gateway依赖

~~~xml
<!--gateway网关-->
<dependency>
    <groupId>org.springframework.cloud</groupId>
	<artifactId>spring-cloud-starter-gateway</artifactId>
</dependency>
<!--nacos客户端-->
<dependency>
    <groupId>com.alibaba.cloud</groupId>
    <artifactId>spring-cloud-starter-alibaba-nacos-discovery</artifactId>
</dependency>
~~~



##### 2 主类上启用Nacos

~~~java
@SpringBootApplication
@EnableDiscoveryClient
public class ApiGatewayApplication {
    public static void main(String[] args) {
        SpringApplication.run(ApiGatewayApplication.class, args);
    }
}
~~~



##### 3 修改yml

~~~yml
server:
  port: 7000
spring:
  application:
    name: api-gateway
  cloud:
    nacos:
      discovery:
        server-addr: 127.0.0.1:8848
    gateway:
	  discovery:
	    locator:
	      enabled: true # 让gateway可以发现nacos中的微服务
	  routes:
	    - id: product_route
	      uri: lb://service-product # lb指的是从nacos中按照名称获取微服务,并遵循负载均衡策略
	      predicates:
	        - Path=/product-serv/**
	      filters:
	        - StripPrefix=1
~~~





#### 5.3 **Gateway**核心架构

##### 基本概念

路由(Route) 是 gateway 中最基本的组件之一，表示一个具体的路由信息载体。主要定义了下面的几个信息:

1. **`id`**，路由标识符，区别于其他 Route。
2. **`uri`**，路由指向的目的地 uri，即客户端请求最终被转发到的微服务。
3. **`order`**`，用于多个 Route 之间的排序，数值越小排序越靠前，匹配优先级越高。
4. **`predicate`**，断言的作用是进行条件判断，只有断言都返回真，才会真正的执行路由。
5. **`fifilter`**，过滤器用于修改请求和响应信息。



##### 执行流程图

[//]: # (![image-20230306092922679]&#40;D:\BaiduSyncdisk\学习笔记\SpringCloud学习总结.assets\image-20230306092922679.png&#41;)

##### 执行流程简述

1. Gateway Client向Gateway Server发送请求
2. 请求首先会被`HttpWebHandlerAdapter`进行提取组装成网关上下文
3. 然后网关的上下文会传递到`DispatcherHandler`，它负责将请求分发给`RoutePredicateHandlerMapping`
4. `RoutePredicateHandlerMapping`负责路由查找，并根据路由断言判断路由是否可用
5. 如果过断言成功，由`FilteringWebHandler`创建过滤器链并调用
6. 请求会一次经过`PreFilter--微服务--PostFilter`的方法，最终返回响应









### 六、**SkyWalking**

#### 6.1 链路追踪可以解决的问题

1. 串联整个调用链路，快速定位问题
2. 缕清各个微服务之间的依赖关系
3. 进行各个微服务接口的性能分折
4. 跟踪整个业务流程的调用处理顺序





#### 6.2 链路追踪框架对比

1. Zipkin是Twitter开源的调用链分析工具，目前基于springcloud sleuth得到了广泛的使用，特点是轻量，使用部署简单。
2. Pinpoint是韩国人开源的基于字节码注入的调用链分析，以及应用监控分析工具。特点是支持多种插件，UI功能强大，接入端无代码侵入。

3. SkyWalking是本土开源的基于字节码注入的调用链分析，以及应用监控分析工具。特点是支持多种插件，UI功能较强，接入端无代码侵入。目前已加入Apache孵化器。

4. CAT是大众点评开源的基于编码和配置的调用链分析，应用监控分析，日志采集，监控报警等一系列的监控平台工具。



![image-20230306093621560](https://s2.loli.net/2023/10/17/fiWp5Rat6LIl43s.png)





#### 6.3 **Skywalking主要功能特性**

1、多种监控手段，可以通过语言探针和service mesh获得监控的数据；

2、支持多种语言自动探针，包括 Java，.NET Core 和 Node.JS；

3、轻量高效，无需大数据平台和大量的服务器资源；

4、模块化，UI、存储、集群管理都有多种机制可选；

5、支持告警；

6、优秀的可视化解决方案；



#### 	6.4 基础用法

##### 1 下载SkyWalking

http://skywalking.apache.org/downloads/



##### 2 通过startup启动SkyWalking

启动成功后会启动两个服务，一个是skywalking-oap-server，一个是skywalking-web-ui

1. skywalking-oap-server服务启动后会暴露11800 和 12800 两个端口，分别为收集监控数据的端口11800和接受前端请求的端口12800，修改端口可以修改config/applicaiton.yml
2. skywalking-web-ui服务会占用 8080 端口， 修改端口可以修改webapp/webapp.yml



##### 3 IDEA中接入SkyWalking

通过javaagent参数配置方式

~~~
# skywalking‐agent.jar的本地磁盘的路径
‐javaagent:D:\apache\apache‐skywalking‐apm‐es7‐8.4.0\apache‐skywalking‐apm‐bin‐es7\agent\skywalking‐agent.jar
# 在skywalking上显示的服务名
‐DSW_AGENT_NAME=springboot‐skywalking‐demo
# skywalking的collector服务的IP及端口
‐DSW_AGENT_COLLECTOR_BACKEND_SERVICES=192.168.3.100:11800
~~~

