

## 微服务架构演化

### 从单体到微服务

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



## Eureka

### 集群

#### 集群方案

1. 中心化集群
2. 主从模式集群
3. 去中心化模式（没有主从概念）（Eureka采用这个模式）

![image-20230217141309353](https://s2.loli.net/2023/10/17/KuimTewqZDWSNBJ.png)





#### 集群注册方案

##### 第一种

1. A服务器向B和C服务器注册
2. B向A和C注册
3. C向A和B注册



##### 第二种

1. A向ABC注册
2. 修改[配置文件](# 集群服务器的yml配置)，改变端口即可





#### 如何在一台电脑模拟出集群效果呢

> 通过`win + r`打开运行，输入`drivers`，修改`etc/host`，加入以下配置就能骗过去了

~~~
127.0.0.1 peer1
127.0.0.1 peer2
127.0.0.1 peer3
~~~



#### 集群服务器的yml配置

> 可以通过一次性注册所有集群url，然后复制配置文件就能直接启动了

~~~yml
# 单机

## 应用名称
#spring:
#  application:
#    name: euraka-server
#server:
#  port: 8761 # eureka默认端口
#eureka:
#  server:
#    eviction-interval-timer-in-ms: 10000  # 服务器隔多少毫秒执行清除操作
#    renewal-percent-threshold: 0.85 # 续约百分比，超过85%的应用没和服务器续约，则不会删除任何服务（防止因为服务器自身网络问题误删）
#  instance:
#    instance-id: ${eureka.instance.hostname}:${spring.application.name}:${server.port}
#    hostname: localhost
#    prefer-ip-address: true # 以ip形式显示具体服务信息
#    lease-renewal-interval-in-seconds: 5 # 服务示例续约的时间间隔

# 集群，这里简单配置一下
# 应用名称
#spring:
#  application:
#    name: euraka-server
#server:
#  port: 8761 # eureka默认端口
#eureka:
#  client:
#    service-url: # 默认是 8761 ，现在要指定向另外两台服务器注册
#      defaultZone: http://peer2:8762/eureka,http://peer3:8763/eureka
#  instance:
#    instance-id: ${eureka.instance.hostname}:${spring.application.name}:${server.port}
#    hostname: peer1
#    prefer-ip-address: true # 以ip形式显示具体服务信息
#    lease-renewal-interval-in-seconds: 5 # 服务示例续约的时间间隔


#集群终极方案
#通过改配置端口，开启多台服务器，同时注册的时候全写就行
# 应用名称
spring:
  application:
    name: euraka-server
server:
  port: 8761 # eureka默认端口
eureka:
  client:
    service-url: # 默认是 8761 ，现在要指定向所有服务器注册（包括自己）
      defaultZone: http://peer1:8762/eureka,http://peer2:8762/eureka,http://peer3:8763/eureka
  instance:
#    instance-id: ${eureka.instance.hostname}:${spring.application.name}:${server.port}
    instance-id: ${spring.application.name}:${server.port}
#    hostname: peer1
    prefer-ip-address: true # 以ip形式显示具体服务信息
    lease-renewal-interval-in-seconds: 5 # 服务示例续约的时间间隔
~~~





#### 集群客户端的yml配置

> 直接向所有服务器注册

~~~yml
## 应用名称
#spring:
#  application:
#    name: eureka-client-a
#server:
#  port: 8080 # 客户端端口无要求
#eureka:
#  client:
#    service-url: # 指定注册的地址
#      defaultZone: http://localhost:8761/eureka
#    register-with-eureka: true
#    fetch-registry: true
#    registry-fetch-interval-seconds: 10
#  instance:
#    instance-id: ${eureka.instance.hostname}:${spring.application.name}:${server.port}
#    hostname: localhost
#    prefer-ip-address: true # 以ip形式显示具体服务信息
#    lease-renewal-interval-in-seconds: 10 # 服务示例续约的时间间隔


# 应用名称
spring:
  application:
    name: eureka-client-a
server:
  port: 8080 # 客户端端口无要求
eureka:
  client:
    service-url: # 指定注册的地址
      defaultZone: http://peer1:8761/eureka,http://peer2:8762/eureka，http://peer3:8763/eureka
    register-with-eureka: true  #是否注册自己（集群需要注册自己和拉取服务）
    fetch-registry: true
    registry-fetch-interval-seconds: 10
  instance:
    instance-id: ${eureka.instance.hostname}:${spring.application.name}:${server.port}
    hostname: localhost
    prefer-ip-address: true # 以ip形式显示具体服务信息
    lease-renewal-interval-in-seconds: 10 # 服务示例续约的时间间隔
    

~~~





### **分布式数据一致性协议** 

> `eureka` **没有分布式数据一致性的机制** 节点都是相同的
>
> 在有主从模式的集群中 一般都要遵循`Paxos或Raft`等的协议 才可以稳定对外提供服务

#### Paxos

zk（Zookeeper） 是 Paxos

#### Raft

Nacos raft

动画展示：http://thesecretlivesofdata.com/raft/



### **Eureka** **概念的理解**

**6.1** **服务的注册**

当项目启动时（eureka 的客户端），就会向 eureka-server 发送自己的**元数据（原始数据）**（运行的 ip，端口 port，健康的状态监控等，因为使用的是 http/ResuFul 请求风格），

eureka-server 会在自己内部保留这些元数据(内存中)。（有一个服务列表）（restful 风格，以 http 动词的请求方式，完成对 url 资源的操作）

**6.2** **服务的续约**

项目启动成功了，除了向 eureka-server 注册自己成功，还会**定时**的向 eureka-server 汇报自己，心跳，表示自己还活着。（修改一个时间）

**6.3** **服务的下线（主动下线）**

当项目关闭时，会给 eureka-server 报告，说明自己要下机了。

**6.4** **服务的剔除（被动下线，主动剔除）**

当项目超过了指定时间没有向 eureka-server 汇报自己，那么 eureka-server 就会认为此节点死掉了，会把它剔除掉，也不会放流量和请求到此节点了。





### **服务发现（源头）**

#### **什么是服务发现**

**根据服务名称发现服务的实例过程**

**客户端会在本地缓存服务端的列表**

**拉取列表是有间隔周期的 （导致服务上线 客户端不能第一时间感知到 （可以容忍））**

**其实每次做服务发现 都是从本地的列表来进行的**



![image-20230217165044369](https://s2.loli.net/2023/10/17/kVX7R4taEAKsDd9.png)

1. 在a服务里做服务发现
2. 访问访问 http://localhost:8001/find?serviceId=eureka-client-b

~~~java
package com.bjpowernode.controller;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.client.ServiceInstance;
import org.springframework.cloud.client.discovery.DiscoveryClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;

@RestController
public class TestController {
    /**
    * 注入服务发现组件，我们的 eureka 已经实现了这个接口，所以 IOC 里面有这个对象
    */
    @Autowired
    private DiscoveryClient discoveryClient;
    /**
    * 服务发现
    *
    * @param serviceId
    * @return
    */
    @GetMapping("find")
    public String find(String serviceId) {
        //调用服务发现
        List<ServiceInstance> instances = discoveryClient.getInstances(serviceId);
        instances.forEach(System.out::print);
        return instances.toString();
    }
}
~~~





### RestTemplate发送同步REST请求

#### 使用步骤

1. 通过实例化`RestTemplate`
2. 通过`RestTemplate`的对象调用对应方法（GET、POST等等）
   - `getForObject`返回的是个泛型，希望什么类型可以指定
   - `getForEntity`返回响应的实体





## Ribbon

### 概述

Spring Cloud Ribbon 是一个基于 HTTP 和 TCP 的`客户端负载均衡工具`，它基于 **Netflix**Ribbon 实现。通过 Spring Cloud 的封装，可以让我们轻松地将面向服务的 **REST 模版请求**自动转换成客户端负载均衡的服务调用。 `轮询 hash 权重 ... `

简单的说 Ribbon 就是 netfix 公司的一个开源项目，主要功能是提供**客户端负载均衡算法和服务调用**。Ribbon 客户端组件提供了一套完善的配置项，比如**连接超时，重试**等。。通过Load Balancer获取到服务提供的所有机器实例，Ribbon会自动基于某种规则(轮询，随机)去调用这些服务。Ribbon也可以实现我们自己的负载均衡算法。

在 Spring Cloud 构建的微服务系统中， Ribbon 作为服务**消费者(客户端)**的负载均衡器，有两种使用方式，一种是和 **RestTemplate** 相结合，另一种是和 OpenFeign 相结合。OpenFeign 已经默认集成了 Ribbon,关于 OpenFeign 的内容将会在下一章进行详细讲解。Ribbon 有很多子模块，但很多模块没有用于生产环境!

> 目前主流的负载方案分为以下两种：
>
> 1. 集中式负载均衡，在消费者和服务提供方中间使用独立的代理方式进行负载，有硬件的（比如 F5），也有软件的（比如Nginx）。
> 2. 客户端根据自己的请求情况做负载均衡，Ribbon 就属于客户端自己做负载均衡。



### 负载均衡

负载均衡，英文名称为 Load Balance（**`LB`**）http:// lb://（负载均衡协议） ，其含义就是指将负载（工作任务）进行平衡、分摊到多个操作单元上进行运行，例如 Web 服务器、企业核心应用服务器和其它主要任务服务器等，从而协同完成工作任务。

负载均衡构建在原有网络结构之上，它提供了一种透明且廉价有效的方法扩展服务器和网络设备的带宽、加强网络数据处理能力、增加吞吐量、提高网络的可用性和灵活性。



### **常见负载均衡算法**

1. 随机，通过随机选择服务进行执行，一般这种方式使用较少;
2. 轮训，负载均衡默认实现方式，请求来之后排队处理;
3. 加权轮训，通过对服务器性能的分型，给高配置，低负载的服务器分配更高的权重，均衡各个服务器的压力;
4. 地址Hash，通过客户端请求的地址的HASH值取模映射进行服务器调度。 ip --->hash
5. 最小链接数，即使请求均衡了，压力不一定会均衡，最小连接数法就是根据服务器的情况，比如请求积压数等参数，将请求分配到当前压力最小的服务器上。 最小活跃数

![image-20230228175757542](https://s2.loli.net/2023/10/17/fa1uUoHeGhR57Ji.png)

#### **IRule**

这是所有负载均衡策略的**父接口**，里边的核心方法就是choose方法，用来选择一个服务实例。

#### **AbstractLoadBalancerRule**

AbstractLoadBalancerRule是一个抽象类，里边主要定义了一个ILoadBalancer，这里定义它的目的主要是辅助负责均衡策略选取合适的服务端实例。

#### **RandomRule**

看名字就知道，这种负载均衡策略就是**随机选择一个服务实例**，看源码我们知道，在RandomRule的无参构造方法中初始化了一个Random对象，然后在它重写的choose方法又调用了choose(ILoadBalancer lb, Object key)这个重载的choose方法，在这个重载的choose方法中，每次利用random对象生成一个不大于服务实例总数的随机数，并将该数作为下标所以获取一个服务实例。

#### **RoundRobinRule**

RoundRobinRule这种负载均衡策略叫做线性**轮询负载均衡策略**。这个类的choose(ILoadBalancer lb, Object key)函数整体逻辑是这样的：开启一个计数器count，在while循环中遍历服务清单，获取清单之前先通过incrementAndGetModulo方法获取一个下标，这个下标是一个不断自增长的数先加1然后和服务清单总数取模之后获取到的（所以这个下标从来不会越界），拿着下标再去服务清单列表中取服务，每次循环计数器都会加1，如果连续10次都没有取到服务，则会报一个警告No available alive servers after 10 tries from load balancer: XXXX。

#### **RetryRule**（在轮询的基础上进行重试）

看名字就知道这种负载均衡策略带有**重试**功能。首先RetryRule中又定义了一个subRule，它的实现类是RoundRobinRule，然后在RetryRule的choose(ILoadBalancer lb, Object key)方法中，每次还是采用RoundRobinRule中的choose规则来选择一个服务实例，如果选到的实例正常就返回，如果选择的服务实例为null或者已经失效，则**在失效时间deadline之前不断的进行重试**（重试时获取服务的策略还是RoundRobinRule中定义的策略），如果超过了deadline还是没取到则会返回一个null。 

#### **WeightedResponseTimeRule**

（**Nacos还扩展了一个自己的基于配置的权重扩展--NacosRule**）**

WeightedResponseTimeRule是RoundRobinRule的一个子类，在WeightedResponseTimeRule中对RoundRobinRule的功能进行了扩展，WeightedResponseTimeRule中会根据每一个实例的运行情况来给计算出该实例的一个**权重**，然后在挑选实例的时候则根据权重进行挑选，这样能够实现更优的实例调用。WeightedResponseTimeRule中有一个名叫DynamicServerWeightTask的定时任务，默认情况下每隔30秒会计算一次各个服务实例的权重，权重的计算规则也很简单，**如果一个服务的平均响应时间越短则权重越大，那么该服务实例被选中执行任务的概率也就越大**。

#### **ClientConfigEnabledRoundRobinRule**

ClientConfigEnabledRoundRobinRule选择策略的实现很简单，内部定义了RoundRobinRule，choose方法还是采用了RoundRobinRule的choose方法，所以它的选择策略和**RoundRobinRule**的选择策略一致，不赘述。

#### **BestAvailableRule**

BestAvailableRule继承自ClientConfigEnabledRoundRobinRule，它在ClientConfigEnabledRoundRobinRule的基础上主要增加了根据loadBalancerStats中保存的服务实例的状态信息来**过滤掉失效的服务实例的功能，然后顺便找出并发请求最小的服务实例来使用。**然而loadBalancerStats有可能为null，如果loadBalancerStats为null，则BestAvailableRule将采用它的父类即ClientConfigEnabledRoundRobinRule的服务选取策略（线性轮询）。

#### **ZoneAvoidanceRule（默认）** 

（**默认规则**，复合判断server所在区域的性能和server的可用性选择服务器。）（如果**单台机器的话就相当于是轮询**）

ZoneAvoidanceRule是PredicateBasedRule的一个实现类，只不过这里多一个过滤条件，ZoneAvoidanceRule中的过滤条件是以

ZoneAvoidancePredicate为主过滤条件和以AvailabilityPredicate为次过滤条件组成的一个叫做CompositePredicate的组合过滤条件，过滤成功之后，继续采用线性轮询(**RoundRobinRule**)的方式从过滤结果中选择一个出来。

#### **AvailabilityFilteringRule**

（先过滤掉故障实例，再选择并发较小的实例）

过滤掉一直连接失败的被标记为circuit tripped的后端Server，并过滤掉那些高并发的后端Server或者使用一个AvailabilityPredicate来包含过滤server的逻辑，其实就是检查status里记录的各个Server的运行状态。









### 入门使用

#### 1-引入依赖

~~~xml
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-netflix-ribbon</artifactId>
    <version>2.2.9.RELEASE</version>
</dependency>
~~~



#### 2-注册RestTemplate的时候加上@LoadBalanced

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





#### 3-之后只要是通过这个restTemplate示例发送的请求都会被ribbon接管



### 修改默认负载均衡策略

> 注意，修改都在客户端（消费者）

#### 一、配置类方法

##### 1.编写配置类

> **注意：==此处有坑==。**不能写在@SpringbootApplication注解的@CompentScan扫描得到的地方（默认是扫描启动类的包及其子包下所有），否则自定义的配置类就会被所有的 
>
> RibbonClients共享。
>
> 不建议使用配置类方式，推荐yml方式

~~~java
@Configuration
public class RibbonConfig {

/**
* 全局配置
* 指定负载均衡策略
* @return
*/
@Bean
public IRule iRule() {
         // 指定使用Nacos提供的负载均衡策略（优先调用同一集群的实例，基于随机权重）
         return new NacosRule();
         }
}
~~~



##### 2.在启动类上用@RibbonClient指定微服务及其负载均衡策略。

~~~java
@RibbonClients(value = { 
    // name 是服务名，configuration配置自定义配置类
    @RibbonClient(name = "mall‐order",configuration = RibbonConfig.class),
    @RibbonClient(name = "mall‐account",configuration = RibbonConfig.class)
})
~~~





#### 二、配置文件方法

调用指定微服务提供的服务时，使用对应的负载均衡算法

修改application.yml

~~~yml
被调用的微服务名
mall‐order:
  ribbon:
    指定使用Nacos提供的负载均衡策略（优先调用同一集群的实例，基于随机&权重）
    NFLoadBalancerRuleClassName: com.alibaba.cloud.nacos.ribbon.NacosRule
~~~





### **自定义负载均衡策略**

> 通过实现 IRule 接口可以自定义负载策略，主要的选择服务逻辑在 choose 方法中



#### **实现基于Nacos权重的负载均衡策略**



~~~java
1 @Slf4j
2 public class NacosRandomWithWeightRule extends AbstractLoadBalancerRule {
3
4  @Autowired
5 private NacosDiscoveryProperties nacosDiscoveryProperties;
6
7  @Override
8 public Server choose(Object key) {
9  DynamicServerListLoadBalancer loadBalancer = (DynamicServerListLoadBalancer) getLoadBalancer();
10  String serviceName = loadBalancer.getName();
11  NamingService namingService = nacosDiscoveryProperties.namingServiceInstance();
12 try {
13 //nacos基于权重的算法
14  Instance instance = namingService.selectOneHealthyInstance(serviceName);
15 return new NacosServer(instance);
16 } catch (NacosException e) {
17  log.error("获取服务实例异常：{}", e.getMessage());
18  e.printStackTrace();
19 }
20 return null;
21 }
22  @Override
23 public void initWithNiwsConfig(IClientConfig clientConfig) {
24
25 }
26 }
~~~









#### **配置自定义的策略**

通过修改application.yml

~~~yml
1 # 被调用的微服务名
2 mall‐order:
3  ribbon:
4  # 自定义的负载均衡策略（基于随机&权重）
5  NFLoadBalancerRuleClassName: com.tuling.mall.ribbondemo.rule.NacosRandomWithWeightRule
~~~







### 饥饿加载



在进行服务调用的时候，如果网络情况不好，第一次调用会超时。

Ribbon默认懒加载，意味着只有在发起调用的时候才会创建客户端。



开启饥饿加载，解决第一次调用慢的问题

~~~yml
1 ribbon:
2   eager‐load:
3     # 开启ribbon饥饿加载
4     enabled: true
5     # 配置mall‐user使用ribbon饥饿加载，多个使用逗号分隔
6     clients: mall‐order
~~~





































## Nacos

### 是什么

官方：一个更易于构建云原生应用的动态**服务发现(**Nacos Discovery **)**、**服务配置(**Nacos Config**)**和服务管理平台。 

集 注册中心+配置中心+服务管理 平台

Nacos 的关键特性包括:

1. 服务发现和服务健康监测
2. 动态配置服务
3. 动态 DNS 服务
4. 服务及其元数据管理



### 执行过程/流程

![image-20230228171701626](https://s2.loli.net/2023/10/17/EFm2ipxWyZ7LUhg.png)



### 与其他注册中心对比

> CAP  C 一致性 A可用性 P 分区容错性
>
> P一定有，剩下就是保证A或者保证C了

![image-20230228171740576](https://s2.loli.net/2023/10/17/wBLYy73ScJWnuef.png)







### 核心功能

1. **服务注册**：Nacos Client会通过发送REST请求的方式向Nacos Server注册自己的服务，提供自身的元数据，比如ip地址、端口等信息。Nacos Server接收到注册请求后，就会把这些元数据信息存储在一个双层的内存Map中。
2. **服务心跳**：在服务注册后，Nacos Client会维护一个定时心跳来持续通知Nacos Server，说明服务一直处于可用状态，防止被剔除。默认5s发送一次心跳。
3. **服务同步**：Nacos Server集群之间会互相同步服务实例，用来保证服务信息的一致性。 leader  raft  
4. **服务发现**：服务消费者（Nacos Client）在调用服务提供者的服务时，会发送一个REST请求给Nacos Server，获取上面注册的服务清单，并且缓存在Nacos Client本地，同时会在Nacos Client本地开启一个定时任务定时拉取服务端最新的注册表信息更新到本地缓存
5. **服务健康检查**：Nacos Server会开启一个定时任务用来检查注册服务实例的健康情况，对于超过15s没有收到客户端心跳的实例会将它的healthy属性置为false(客户端服务发现时不会发现)，如果某个实例超过30秒没有收到心跳，直接剔除该实例(被剔除的实例如果恢复发送心跳则会重新注册）





### 配置

https://github.com/alibaba/spring-cloud-alibaba/wiki/Nacos-discovery



### 注册中心-入门用法

#### **搭建**nacos环境

##### 第1步: 安装nacos

下载地址: https://github.com/alibaba/nacos/releases

下载zip格式的安装包，然后进行解压缩操作



##### 第2步: 启动nacos

~~~cmd
#切换目录，进入bin目录
cd nacos/bin
#命令启动，-m可以用来指定单机还是集群，默认是单机，默认端口8848
startup.cmd -m standalone
~~~



##### 第3步: 访问nacos

打开浏览器输入http://localhost:8848/nacos，即可访问服务， 默认密码是nacos/nacos



#### **将商品微服务注册到nacos**

##### 1 在pom.xml中添加nacos的依赖

~~~xml
<!--nacos客户端-->
<dependency>
<groupId>com.alibaba.cloud</groupId>
<artifactId>spring-cloud-starter-alibaba-nacos-discovery</artifactId>
</dependency>
~~~



##### 2 在主类上添加`@EnableDiscoveryClient`注解

~~~java
@SpringBootApplication
@EnableDiscoveryClient
public class ProductApplication
~~~



##### 3 在application.yml中添加nacos服务的地址

~~~yml
spring:
  cloud:
    nacos:
      discovery:
        server-addr: 127.0.0.1:8848
~~~





### 配置中心

#### 与SpringCloud config对比

**三大优势：**

1. springcloud config大部分场景结合git 使用，动态变更还需要依赖 `Spring Cloud Bus` 消息总线来通过所有的户端变化（有延迟）
2. springcloud config`不提供`可视化界面
3. nacos config使用长轮询更新配置，一旦配置有变动后，通知Provider的过程非常的迅速，从速度上秒杀springcloud原来的config几条街





#### 入门用法

##### 1）nacos中创建配置

[//]: # (![image-20230314162528569]&#40;D:\BaiduSyncdisk\学习笔记\MyNote_SpringCloud.assets\image-20230314162528569.png&#41;)



##### 2）项目中引入依赖

> 在`SpringCloud 2020.* `版本把bootstrap禁用了，导致在读取文件的时候读取不到而报错，所以要把bootstrap手动导入进来才能生效

~~~xml
<dependencies>
    <!-- https://mvnrepository.com/artifact/org.springframework.cloud/spring-cloud-starter-bootstrap -->
    <dependency>
        <groupId>org.springframework.cloud</groupId>
        <artifactId>spring-cloud-starter-bootstrap</artifactId>
	<!-- <version>3.0.3</version>-->
    </dependency>
    <dependency>
        <groupId>com.alibaba.cloud</groupId>
        <artifactId>spring-cloud-starter-alibaba-nacos-config</artifactId>
    </dependency>
</dependencies>
~~~



##### 3）添加bootstrap.yml

> 注意：这里项目名要与配置中心的`DataId`一致才行

~~~yml
spring:
  application:
    name: com.xiaohuowa.order
  cloud:
    nacos:
      server-addr: 127.0.0.1:8848
      username: nacos
      password: nacos
~~~



##### 4）测试

> 在启动类中读取配置中心的配置并输出

~~~java
@SpringBootApplication
public class ConfigApplication {
    public static void main(String[] args) throws InterruptedException {
        ConfigurableApplicationContext applicationContext = SpringApplication.run(ConfigApplication.class, args);

        while (true) {
            String userName = applicationContext.getEnvironment().getProperty("user.name");
            String userAge = applicationContext.getEnvironment().getProperty("user.age");
            System.out.println(userName + userAge);
            Thread.sleep(1000);
        }
    }
}
~~~











































































































































## Feign



### **JAVA 项目中如何实现接口调用？**

**1）Httpclient**

HttpClient 是 Apache Jakarta Common 下的子项目，用来提供高效的、最新的、功能丰富的支持 Http 协议的客户端编程工具包，并且它支持 HTTP 协议最新版本和建议。HttpClient 相比传统 JDK 自带的 URLConnection，提升了易用性和灵活性，使客户端发送 HTTP 请求变得容易，提高了开发的效率。

**2）Okhttp**

一个处理网络请求的开源项目，是安卓端最火的轻量级框架，由 Square 公司贡献，用于替代 HttpUrlConnection 和 Apache HttpClient。OkHttp 拥有简洁的 API、高效的性能，并支持多种协议（HTTP/2 和 SPDY）。

**3）HttpURLConnection**

HttpURLConnection 是 Java 的标准类，它继承自 URLConnection，可用于向指定网站发送 GET 请求、POST 请求。HttpURLConnection 使用比较复杂，不像 HttpClient 那样容易使用。

**4）RestTemplate  WebClient**

RestTemplate 是 Spring 提供的用于访问 Rest 服务的客户端，RestTemplate 提供了多种便捷访问远程 HTTP 服务的方法，能够大大提高客户端的编写效率。





### **什么是Feign**



Feign是Netflix开发的声明式、模板化的HTTP客户端，其灵感来自Retrofit、JAXRS-2.0以及WebSocket。

Feign可帮助我们更加便捷、优雅地调用HTTP API。

Spring Cloud openfeign对Feign进行了增强，使其支持Spring MVC注解，另外还整合了Ribbon和Nacos，从而使得Feign的使用更加方便（所以现在提到Feign基本都是在指openfeign）





#### 优势

Feign可以做到使用 HTTP 请求远程服务时就**像调用本地方法一样**的体验，开发者完全感知不到这是远程方法，更感知不到这是个 HTTP 请求。

它像 Dubbo 一样，consumer 直接调用接口方法调用 provider，而不需要通过常规的 Http Client 构造请求再解析返回数据。它解决了让开发者调用远程接口就跟调用本地方法一样，无需关注与远程的交互细节，更无需关注分布式环境开发。





### **Spring Cloud Alibaba快速整合OpenFeign**（四步）



#### 一、引入依赖

~~~xml
<!--加入openfeign依赖-->
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-openfeign</artifactId>
</dependency>
~~~



#### 二、编写调用接口+@FeignClient注解

~~~java
/**
 * name 指定要调用的服务名
 * path 相当于对应服务的类的 @RequestMapping("/stock") 中的值
 */
@FeignClient(value = "mall‐order",path = "/order")
public interface OrderFeignService {
    /**
     * 声明方法，同对应服务的对应方法
     * @return
     */
     @RequestMapping("/findOrderByUserId/{userId}")
    public R findOrderByUserId(@PathVariable("userId") Integer userId);
}
~~~





#### 三、调用端在启动类上添加@EnableFeignClients注解

~~~java
@SpringBootApplication
// @EnableDiscoveryClient
@EnableFeignClients
public class OrderOpenFeignApplication {

    public static void main(String[] args) {
        SpringApplication.run(OrderOpenFeignApplication.class, args);
    }

/*
    用了 openfeign 之后不需要RestTemplate了
    @Bean
    @LoadBalanced // 负载均衡
    public RestTemplate restTemplate(RestTemplateBuilder builder) {
        RestTemplate restTemplate = builder.build();
        return restTemplate;
    }*/
}
~~~



#### 四、发起调用，像调用本地方式一样调用远程服务

~~~java
@RestController
@RequestMapping("/order")
public class OrderController {

    @Autowired
    private StockFeignService stockFeignService;

    @Autowired
    private ProductFeignService productFeignService;

    @RequestMapping("/add")
    public String add() {
        System.out.println("下单成功");
        // String msg = restTemplate.getForObject("http://localhost:8011/stock/reduct", String.class);
        // String msg = restTemplate.getForObject("http://stock-service/stock/reduct", String.class);
        String msg = stockFeignService.reduct();
        String pro = productFeignService.get(1);
        return "hello world" + msg + pro;
    }

}
~~~





### **Spring Cloud Feign的自定义配置及使用**



#### **日志配置**

有时候我们遇到 Bug，比如接口调用失败、参数没收到等问题，或者想看看调用性能，就需要配置 Feign 的日志了，以此让 Feign 把请求信息输出来



##### 日志等级

1. **`NONE`**【性能最佳，适用于生产】：不记录任何日志（默认值）。
2. **`BASIC`**【适用于生产环境追踪问题】：仅记录请求方法、URL、响应状态代码以及执行时间。
3. **`HEADERS`**：记录BASIC级别的基础上，记录请求和响应的header。
4. **`FULL`**【比较适用于开发及测试环境定位问题】：记录请求和响应的header、body和元数据。



##### 配置方法

###### **1）定义一个配置类，指定日志级别**

> 加`@Configuration`代表是全局配置
>
> 不加`@Configuration`是[局部配置](# 局部配置，让调用的微服务生效，在@FeignClient 注解中指定使用的配置类)

~~~java
/**
 * 加了 @Configuration 会使配置作用在所有的服务提供方（全局配置）
 * 不加 @Configuration ，可以针对某个或某几个服务提供方进行配置（局部配置）
 */
@Configuration // 全局配置
public class FeignConfig {

    @Bean
    public Logger.Level feignLoggerLevel(){
        // 设置返回日志的级别
        return Logger.Level.FULL;
    }
}
~~~



###### 2) 修改yml日志级别

> 格式是`logging.level.feign接口包路径=debug`

~~~yml
# SpringBoot 默认日志等级为 info，如果不进行如下修改，feign 的 debug 日志等级就不会输出
logging:
  level: # 如果在这里配，就是所有日志等级都修改
    com.xiaohuowa.order.feign: debug  # 在这里指定包来配，可以让部分改变日志等级
~~~







###### 局部配置，让调用的微服务生效，在@FeignClient 注解中指定使用的配置类

> 注意：用局部配置之后，配置类不能加`@Configuration`注解！

~~~java
/**
 * name 指定要调用的服务名
 * path 相当于对应服务的类的 @RequestMapping("/stock") 中的值
 * configuration 可以指定一个 feign 的局部配置
 */
@FeignClient(name = "stock-service", path = "/stock", configuration = FeignConfig.class)
public interface StockFeignService {

    /**
     * 声明方法，同对应服务的对应方法
     * @return
     */
    @RequestMapping("/reduct")
    public String reduct();
}
~~~











###### **补充：局部配置可以在yml中配置**

~~~yml
# feign 日志，局部配置
feign:
  client:
    config:
      product-service: # 指定服务提供方名字
        logger-level: BASIC
~~~



#### **契约配置（让高版本支持Cloud支持Feign原生注解）**

​		Spring Cloud 在 Feign 的基础上做了扩展，使用 Spring MVC 的注解来完成Feign的功能。原生的 Feign 是不支持 Spring MVC 注解的，如果你想在 Spring Cloud 中使用原生的注解方式来定义客户端也是可以的，通过配置契约来改变这个配置，Spring Cloud 中默认的是 SpringMvcContract。

​		Spring Cloud 1 早期版本就是用的原生Fegin. 随着netflix的停更替换成了Open feign

> 注意：修改契约配置后，OrderFeignService `不再支持`springmvc的注解，需要使用Feign原生的注解

##### 配置文件-配置步骤

###### **1）修改契约配置，支持Feign原生的注解**

~~~java
1 /**
2 * 修改契约配置，支持Feign原生的注解
3 * @return
4 */
5 @Bean
6 public Contract feignContract() {
7 return new Contract.Default();
8 }
~~~



###### **2）OrderFeignService 中配置使用Feign原生的注解**

~~~java
1 @FeignClient(value = "mall‐order",path = "/order")
2 public interface OrderFeignService {
3  @RequestLine("GET /findOrderByUserId/{userId}")
4 public R findOrderByUserId(@Param("userId") Integer userId);
5 }
~~~



##### **yml-配置步骤**

~~~yml
feign:
  client:
    config:
      product-service: # 指定服务提供方名字
        logger-level: BASIC
        contract: feign.Contract.Default  # 设置为默认的契约 （还原成原生的注解）
~~~



#### **自定义拦截器**

> 从`客户端`到`服务器`，中间的拦截器是MVC的
>
> 从一个`微服务`到另一个`微服务`，中间拦截器是feign可以配置的

##### 配置文件方式

###### 创建自定义拦截器

> 需要实现`RequestInterceptor`并重写`apply`方法

~~~java
/**
 * @author xiaohuowa
 */
public class CustomInterceptor implements RequestInterceptor  {

    Logger logger = LoggerFactory.getLogger(this.getClass());

    @Override
    public void apply(RequestTemplate requestTemplate) {
        // 给 header 加东西
        requestTemplate.header("haha", "123");
        // 给请求参数加东西
        requestTemplate.query("name", "zhangsan");
        // 修改uri
        requestTemplate.uri("/999");
        // 自定义记录日志操作
        logger.info("这里是 feign 的拦截器");
    }
}
~~~



###### 在配置文件中创建拦截器实例

~~~java
@Configuration // 全局配置
public class FeignConfig {

    /**
     * 自定义拦截器
     * @return
     */
    public CustomInterceptor customInterceptor() {
        return new CustomInterceptor();
    }
}
~~~



##### **yml配置**

~~~yml
feign:
  client:
    config:
      product-service: # 指定服务提供方名字
        logger-level: BASIC
        connect-timeout: 1000  # 连接超时时间，默认2s
        read-timeout: 10000  # 请求处理超时时间，默认5s
        request-interceptors:
          - com.xiaohuowa.order.interceptor.feign.CustomInterceptor  # 配置自定义的拦截器
~~~



#### **超时时间配置**

> 补充说明： Feign的底层用的是Ribbon，但超时时间以Feign配置为准

通过 Options 可以配置连接超时时间和读取超时时间

1. Options 的第一个参数是连接的超时时间（ms），默认值是 `2s`；
2. 第二个是请求处理的超时时间（ms），默认值是 `5s`。



##### **全局配置**

~~~java
@Configuration // 全局配置
public class FeignConfig {

    @Bean
    public Request.Options options() {
        /**
         * 这里设置连接超时时间为：1s
         * 读取（响应）超时时间为：3s
         */
        return new Request.Options(1000, 3000);
    }
}
~~~





##### **yml中配置**

~~~yml
feign:
  client:
    config:
      product-service: # 指定服务提供方名字
        logger-level: BASIC
        connect-timeout: 1000  # 连接超时时间，默认2s
        read-timeout: 3000  # 请求处理超时时间，默认5s
~~~



#### **客户端组件配置**

Feign 中默认使用 JDK 原生的 URLConnection 发送 HTTP 请求，我们可以集成别的组件来替换掉 URLConnection，比如 Apache HttpClient，OkHttp



##### **配置Apache HttpClient**

> 关于配置可参考源码： org.springframework.cloud.openfeign.FeignAutoConfiguration

###### 引入依赖

~~~xml
1 <!‐‐ Apache HttpClient ‐‐>
2 <dependency>
3 <groupId>org.apache.httpcomponents</groupId>
4 <artifactId>httpclient</artifactId>
5 <version>4.5.7</version>
6 </dependency>
7 <dependency>
8 <groupId>io.github.openfeign</groupId>
9 <artifactId>feign‐httpclient</artifactId>
10 <version>10.1.0</version>
11 </dependency>
~~~



###### 修改yml配置

在yml中启用 HttpClient

~~~yml
1 feign:
2  #feign 使用 Apache HttpClient 可以忽略，默认开启
3  httpclient:
4  enabled: true
~~~







##### **配置 OkHttp**

> 关于配置可参考源码： org.springframework.cloud.openfeign.FeignAutoConfiguration

###### 引入依赖

~~~xml
1 <dependency>
2     <groupId>io.github.openfeign</groupId>
3     <artifactId>feign‐okhttp</artifactId>
4 </dependency>
~~~



###### 修改yml

将 Feign 的 HttpClient 禁用，启用 OkHttp，配置如下：



~~~yml
1 feign:
2  #feign 使用 okhttp
3  httpclient:
4  enabled: false
5  okhttp:
6  enabled: true
~~~





#### **GZIP 压缩配置**

> 注意：只有当 Feign 的 Http Client **不是 okhttp3 的时候，压缩才会生效**，配置源码在FeignAcceptGzipEncodingAutoConfiguration

开启压缩可以有效节约网络资源，提升接口性能，我们可以配置 GZIP 来压缩数据：

~~~yml
1 feign:
2  # 配置 GZIP 来压缩数据
3  compression:
4  request:
5  enabled: true
6  # 配置压缩的类型
7  mime‐types: text/xml,application/xml,application/json
8  # 最小压缩值
图灵课堂
9  min‐request‐size: 2048
10  response:
11  enabled: true
~~~



##### 为什么在okhttp3的时候不会生效？

核心代码就是 `@ConditionalOnMissingBean（type="okhttp3.OkHttpClient"）`，表示 Spring BeanFactory 中**不包含**指定的 bean 时条件匹配，也就是没有启用 okhttp3 时才会进行压缩配置。

[//]: # (![image-20230302100450523]&#40;D:\BaiduSyncdisk\学习笔记\MyNote_SpringCloud_冲突文件_小火娃_20230305234125.assets\image-20230302100450523.png&#41;)





​	







## sentinel

[sentinel快速开始](https://github.com/alibaba/Sentinel/wiki/%E5%A6%82%E4%BD%95%E4%BD%BF%E7%94%A8)

> 默认是懒加载的，必须先访问一次服务之后才会出现在控制台上
>
> 可以通过配置取消懒加载
>
> ~~~yml
> sentinel:  
> eager: true
> ~~~





##### 降级

定义降级逻辑

两种方法：

1）fallback 

~~~java
@FeignClient(value = "media-api",configuration = MultipartSupportConfig.class,fallback = MediaServiceClientFallback.class)
@RequestMapping("/media")
public interface MediaServiceClient{
...
~~~



定义一个fallback类MediaServiceClientFallback，此类实现了MediaServiceClient接口。

这种方法**无法取出熔断所抛出的异常**，而第二种方法定义FallbackFactory 可以解决这个问题。

 

2）fallbackFactory 

第二种方法在FeignClient中指定fallbackFactory ，如下：

~~~java
@FeignClient(value = "media-api",
             configuration = M  ultipartSupportConfig.class,
             fallbackFactory = MediaServiceClientFallbackFactory.class)
~~~



定义MediaServiceClientFallbackFactory如下：

~~~java
@Slf4j
@Component
public class MediaServiceClientFallbackFactory implements FallbackFactory<MediaServiceClient> {
    @Override
    public MediaServiceClient create(Throwable throwable) {
        return new MediaServiceClient(){
            @Override
            public String uploadFile(MultipartFile upload, String objectName) {
                //降级方法
                log.debug("调用媒资管理服务上传文件时发生熔断，异常信息:{}",throwable.toString(),throwable);
                return null;
            }
        };
    }
}
~~~



降级处理逻辑：

返回一个null对象，上游服务请求接口得到一个null说明执行了降级处理。























































































































































































































