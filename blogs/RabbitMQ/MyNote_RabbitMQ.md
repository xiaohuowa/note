## 1. RabbitMQ工作模型
>消息队列有三个核心要素： 消息生产者、消息队列、消息消费者；
1. 消息从`生产者`到`连接信道`到消息服务器`Broker`
2. 在`Broker`中到达对应`交换机`中
3. 交换机根据一定的策略分发到`队列`中
4. 再由消费者接收消息。
![在这里插入图片描述](https://img-blog.csdnimg.cn/43e2207a6230497d8c31b4971f7800f7.png)

### 1.1. 各部分角色介绍
- `生产者`（Producer）：发送消息的应用；（java程序，也可能是别的语言写的程序）
- `消费者`（Consumer）：接收消息的应用；（java程序，也可能是别的语言写的程序）
- `代理`（Broker）：就是消息服务器，RabbitMQ Server就是Message Broker；
- `连接`（Connection）：连接RabbitMQ服务器的TCP长连接；
- `信道`（Channel）：连接中的一个虚拟通道，消息队列发送或者接收消息时，都是通过信道进行的；
- `虚拟主机`（Virtual host）：一个虚拟分组，在代码中就是一个字符串，当多个不同的用户使用同一个RabbitMQ服务时，可以划分出多个Virtual host，每个用户在自己的Virtual host创建exchange/queue等；（分类比较清晰、相互隔离）
- `交换机`（Exchange）：交换机负责从生产者接收消息，并根据交换机类型分发到对应的消息队列中，起到一个路由的作用；
- `路由键`（Routing Key）：交换机根据路由键来决定消息分发到哪个队列，路由键是消息的目的地址；
- `绑定`（Binding）：绑定是队列和交换机的一个关联连接（关联关系）；
- `队列`（Queue）：存储消息的缓存；
- `消息`（Message）：由生产者通过RabbitMQ发送给消费者的信息；（消息可以任何数据，字符串、user对象，json串等等）





## 2. 在SpringBoot中使用RabbitMQ步骤

### 2.1. 加入`AMQP`依赖

> 为什么是`AMQP`？
>
> AMQP（Advanced Message Queue Protocol 高级消息队列协议）：是一个**网络协议**，它支持符合条件的客户端和消息代理中间件（message middleware broker）进行通讯。
>
> RabbitMQ是AMQP协议的实现者，所以AMQP中的概念和准则也适用于RabbitMQ。

~~~xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-amqp</artifactId>
</dependency>
~~~



### 2.2. 编写RabbitMQ配置类

> 在配置类中，声明队列和交换机，同时绑定它们的关系，将它们的实例都交给Spring容器进行管理

~~~java
@Configuration
public class RabbitConfig {

    /**
     * 1. 定义交换机
     * 2. 定义队列
     * 3. 绑定交换机和队列
     */

    /**
     * 1.定义交换机
     */
    @Bean
    public FanoutExchange fanoutExchange(){
        return new FanoutExchange("exchange.fanout");
    }

    /**
     * 2.定义队列
     */
    @Bean
    public Queue queueA() {
        return new Queue("queue.fanout.a");
    }
    @Bean
    public Queue queueB() {
        return new Queue("queue.fanout.b");
    }

    /**
     * 3.绑定交换机和队列
     * 注意，这里方法的形参是会自动注入的，所以写的时候要和创建Bean的时候类型和方法名一致才能注入成功
     */
    @Bean
    public Binding bindingA(FanoutExchange fanoutExchange, Queue queueA) {
        // 将队列a绑定到交换机
        return BindingBuilder.bind(queueA).to(fanoutExchange);
    }
    @Bean
    public Binding bindingB(FanoutExchange fanoutExchange, Queue queueB) {
        // 将队列b绑定到交换机
        return BindingBuilder.bind(queueB).to(fanoutExchange);
    }
}

~~~



### 2.3. 发送消息

> 在发送消息的地方，注入`org.springframework.amqp.rabbit.core.RabbitTemplate`，将要发送的消息封装为`org.springframework.amqp.core.Message`对象，通过`rabbitTemplate`来实现发送消息的操作。

~~~java
import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.core.Message;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
@Slf4j
public class MsgService {

    @Autowired
    private RabbitTemplate rabbitTemplate;

    public void sendMsg() {
        String msg = "Hello world!";
        Message message = new Message(msg.getBytes());
        rabbitTemplate.convertAndSend("exchange.fanout", "", msg);
        log.info("消息发送完毕，发送时间为：{}", new Date());
    }
}
~~~



### 2.4. 接收消息

> 通过`@RabbitListener`来指定监听的队列，当队列有消息的时候就会调用方法

~~~java
import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.core.Message;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;

@Slf4j
@Component
public class ReceiveMsg {
    /**
     * 接收两个队列消息
     * @param message
     */
    @RabbitListener(queues = {"queue.fanout.a", "queue.fanout.b"})
    public void receiveMsg(Message message) {
        byte[] body = message.getBody();
        String string = new String(body);
        log.info("接收到消息：{}", string);
    }
}

~~~











## 3. 交换机Exchange

> 交换机主要就是以下四类
>
> 通过插件还可以扩展其他种类的交换机

1、Fanout Exchange（扇形）
2、Direct Exchange（直连）
3、Topic Exchange（主题）
4、Headers Exchange（头部）



### 3.1. 扇形交换机（Fanout Exchange）

> 扇形交换机就是把消息投递到**所有**绑定的队列上，**无需路由key**，相当于是广播、群发

![在这里插入图片描述](https://img-blog.csdnimg.cn/5014bdd869384a4482ce5b486ec01450.png)

#### 3.1.1. 配置代码

##### 3.1.1.1. 创建扇形交换机

> 通过创建`FanoutExchange`来创建扇形交换机

~~~java
@Bean
public FanoutExchange fanoutExchange(){
    return new FanoutExchange("exchange.fanout");
}
~~~



##### 3.1.1.2. 为扇形交换机绑定队列

~~~java
@Bean
public Binding bindingA(FanoutExchange fanoutExchange, Queue queueA) {
    // 将队列a绑定到交换机
    return BindingBuilder.bind(queueA).to(fanoutExchange);
}
~~~





### 3.2. 直连交换机（Direct Exchange）

> 直连交换机在绑定队列的时候需要指定一个`routingKey`路由key，在收到消息后，会进行**路由key的匹配**，只有匹配成功才会投递
>
> 注意：多个队列的路由key都配对上了，就会将消息分别投递到这些队列里。但是，一个队列要是有多个key匹配，只会投递一次

![img](https://s2.loli.net/2023/10/17/ptAX5Eg2uq7YJOB.jpg)



#### 3.2.1. 配置交换机

##### 3.2.1.1. 创建与绑定

~~~java
@Configuration
@Setter
@ConfigurationProperties(prefix = "my")
public class RabbitConfig {

    /**
     * 1. 定义交换机
     * 2. 定义队列
     * 3. 绑定交换机和队列
     */

    private String queueAName;
    private String queueBName;
    private String exchangeName;

    /**
     * 定义交换机
     */
    @Bean
    public DirectExchange directExchange(){
        return ExchangeBuilder.directExchange(exchangeName).build();
    }

    /**
     * 定义队列
     */
    @Bean
    public Queue queueA() {
        return QueueBuilder.durable(queueAName).build();
    }
    @Bean
    public Queue queueB() {
        return QueueBuilder.durable(queueBName).build();
    }

    /**
     * 绑定交换机和队列
     */
    @Bean
    public Binding bindingA(DirectExchange directExchange, Queue queueA) {
        // 将队列a绑定到交换机
        return BindingBuilder.bind(queueA).to(directExchange).with("error");
    }
    /**
     * 为队列b绑定不同的路由key
     */
    @Bean
    public Binding bindingB1(DirectExchange directExchange, Queue queueB) {
        return BindingBuilder.bind(queueB).to(directExchange).with("error");
    }
    @Bean
    public Binding bindingB2(DirectExchange directExchange, Queue queueB) {
        return BindingBuilder.bind(queueB).to(directExchange).with("info");
    }
    @Bean
    public Binding bindingB3(DirectExchange directExchange, Queue queueB) {
        return BindingBuilder.bind(queueB).to(directExchange).with("warning");
    }
}
~~~



### 3.3. 主题交换机（**Topic Exchange**）

> 在绑定队列和交换机的时候可以指定**带通配符的路由key**
>
> 在发送消息后，会根据消息的路由key进行匹配，匹配成功就会投递到对应队列中

#### 3.3.1. 通配符规则

> 注意：规则中提到的`单词`，都是路由key中以`.`分隔的为单词

1. `*`
   - `*`匹配一个单词（必须有一个，而且只有一个）
   - 比如：`haha.*`的key就能接收`haha.a`。**不能接收**`haha`也不能接收`haha.a.b`
2. `#`
   - `#`匹配多个单词，用来表示任意数量（零个或多个）单词
   - 比如：`haha.#`的key就能接收`haha.a`。**可以接收**`haha`和`haha.a.b`



#### 3.3.2. 配置代码

> 主要是路由key的配置区别

```java
@Configuration
@Setter
@ConfigurationProperties(prefix = "my")
public class RabbitConfig {

    /**
     * 1. 定义交换机
     * 2. 定义队列
     * 3. 绑定交换机和队列
     */

    private String queueAName;
    private String queueBName;
    private String exchangeName;

    /**
     * 定义主题交换机
     */
    @Bean
    public TopicExchange topicExchange(){
        return ExchangeBuilder.topicExchange(exchangeName).build();
    }

    /**
     * 定义队列
     */
    @Bean
    public Queue queueA() {
        return QueueBuilder.durable(queueAName).build();
    }
    @Bean
    public Queue queueB() {
        return QueueBuilder.durable(queueBName).build();
    }

    /**
     * 绑定交换机和队列
     */
    @Bean
    public Binding bindingA(TopicExchange topicExchange, Queue queueA) {
        // 将队列a绑定到交换机
        return BindingBuilder.bind(queueA).to(topicExchange).with("*.orange.*");
    }
    @Bean
    public Binding bindingB1(TopicExchange topicExchange, Queue queueB) {
        return BindingBuilder.bind(queueB).to(topicExchange).with("*.*.rabbit");
    }
    @Bean
    public Binding bindingB2(TopicExchange topicExchange, Queue queueB) {
        return BindingBuilder.bind(queueB).to(topicExchange).with("lazy.#");
    }
}
```





### 3.4. 头交换机（**Headers Exchange**）

> ​		有时消息的路由操作会涉及到**多个属性**，此时使用消息头就比用路由键更容易表达，头交换机（headers exchange）就是为此而生的。头交换机使用多个消息属性来代替路由键建立路由规则。通过判断消息头的值能否与指定的绑定相匹配来确立路由规则。
>
> ​		头交换机可以视为直连交换机的另一种表现形式。头交换机能够像直连交换机一样工作，不同之处在于头交换机的路由规则是建立在头属性值之上，而不是路由键。路由键必须是一个字符串，而头属性值则没有这个约束，它们甚至可以是整数或者哈希值（字典）等。
>
> ​		头交换机用的比较少，了解一下概念即可。



#### 3.4.1. 配置代码

##### 3.4.1.1. 创建交换机和队列

> 满足条件，而当"x-match"设置为“all”的时候，就需要消息头的所有值都匹配成功。
>
> 在绑定交换机和队列的时候，可以确定头属性是需要消息**完全匹配all**还是**任一匹配any**。
>
> - 如果是完全匹配：消息头就需要所有值完全匹配
> - 如果是任一匹配：消息头只要能匹配到任意一个值就满足条件



~~~java
/**
 * 绑定交换机和队列
 */
@Bean
public Binding bindingA(HeadersExchange headersExchange, Queue queueA) {
    Map<String, Object> headerValues = new HashMap<>();
    headerValues.put("type", "m");
    headerValues.put("status", 1);
    // 将队列a绑定到交换机
    return BindingBuilder.bind(queueA).to(headersExchange).whereAll(headerValues).match();
}
@Bean
public Binding bindingB(HeadersExchange headersExchange, Queue queueB) {
    Map<String, Object> headerValues = new HashMap<>();
    headerValues.put("type", "s");
    headerValues.put("status", 0);
    // 将队列b绑定到交换机
    return BindingBuilder.bind(queueB).to(headersExchange).whereAll(headerValues).match();
}
~~~



##### 3.4.1.2. 发送消息

> 给消息加上`消息属性`，在消息属性里面指定上`消息头`

~~~java
@Component
@Slf4j
public class MsgService {

    @Autowired
    private RabbitTemplate rabbitTemplate;

    @Value("${my.exchangeName}")
    private String exchangeName;
    @Value("${my.routingKey}")
    private String routingKey;

    public void sendMsg() {
        // 消息属性
        MessageProperties messageProperties = new MessageProperties();
        Map<String, Object> headers = new HashMap<>();
        headers.put("type", "s");
        headers.put("status", 0);
        // 设置消息头
        messageProperties.setHeaders(headers);
        // 消息带上消息属性
        Message msg = MessageBuilder.withBody("Hello world!!!".getBytes())
                .andProperties(messageProperties).build();
        rabbitTemplate.convertAndSend(exchangeName, "", msg);
        log.info("消息发送完毕，发送时间为：{}，交换机为：{}", new Date(), exchangeName);
    }
}
~~~



## 4. TTL

> TTL：`Time To Live`，消息过期时间



### 4.1. 给队列设置TTL

> - 相当于队列的所有消息都带了TTL，不过，如果消息本身TTL**小于队列TTL**的话，**以小的为主**
>
> - 配置的时候单位是**毫秒**
> - 可以通过两种方式来添加队列配置，一种是`new`，一种是`建造者模式`。个人更喜欢建造者模式（简单），队列配置会在后续章节介绍。

~~~java
/**
 * 定义队列，设置为队列属性添加消息过期时间
 */
@Bean
public Queue queue() {
    // 方式1：new Queue
    Map<String, Object> arguments = new HashMap<>();
    // 设置队列消息过期时间
    arguments.put("x-message-ttl", 15000);
    // return new Queue(queueName, true, false, false, arguments);

    // 方式2：建造者模式
    return QueueBuilder.durable(queueName)
        // 通过建造者模式设置过期时间
        // .ttl(15000)
        .withArguments(arguments)
        .build();
}
~~~



### 4.2. 给单条消息设置TTL

> 通过消息属性`MessageProperties`来添加消息的配置，具体消息属性配置会在后面章节介绍。



~~~java
public void sendMsg() {
    MessageProperties messageProperties = new MessageProperties();
    // 设置过期时间，毫秒数的字符串，这里是30s
    messageProperties.setExpiration("30000");
    Message msg = MessageBuilder
        .withBody("Hello world!!!".getBytes())
        .andProperties(messageProperties)
        .build();
    rabbitTemplate.convertAndSend(exchangeName, "info", msg);
    log.info("消息发送完毕，发送时间为：{}，交换机为：{}", new Date(), exchangeName);
}
~~~





## 5. 🔴死信队列

### 5.1. 是什么

死信队列其实是**死信交换机**和**死信队列**组成的。

**死信交换机**和**死信队列**其实也`就是普通的交换机和队列`，只是程序员让它们接收的消息不太一样，主要就是用来处理**死信**。

出现以下特殊情况的消息才会算作`死信`，死信交换机主要就是为了接收这些死信，放入死信队列中，程序监听死信队列，如果接收到消息了说明程序出现了一些问题，这时候就要通知开发人员查看了。



### 5.2. 让消息变为死信的特殊情况

出现以下特殊情况，会认为消息是死信（没人要的消息）

1. 消息过期（TTL）
   - 包括 **消息自身TTL** 或者 **队列TTL**
2. 正常交换机设置了**最大长度**（包括消息byte限制和消息数量限制）
   - 超过之后如果设置了死信交换机，会将消息放到死信交换机
   - 超过之后如果没有设置死信交换机，消息就被扔了
3. 消费者手动确认消息的模式下，消息被消费者拒绝且没有重新入队



### 5.3. 给队列配置死信交换机

只有当给队列配置了死信交换机，同时声明了死信交换机和死信队列，并绑定它们的关系，才能让消息出现特殊情况时投递到死信交换机

- 设置死信交换机时要指定死信交换机名字
- 同时如果死信交换机是直连的，就需要指定路由到死信队列的路由key

~~~java
@Bean
public Queue queueNormal() {
    Map<String, Object> arguments = new HashMap<>();
    // 设置ttl
    arguments.put("x-message-ttl", 15000);
    // 关键：设置死信交换机
    arguments.put("x-dead-letter-exchange", exchangeDeadName);
    // 关键：设置死信交换机路由key。因为当前死信交换机是直连的，所以要制定死信交换机和死信队列的routingKey
    arguments.put("x-dead-letter-routing-key", deadRoutingKey);
    return QueueBuilder
        .durable(queueNormalName)
        .withArguments(arguments)
        .build();
}
~~~





### 5.4. TTL死信

同前一节TTL配置



### 5.5. 最大长度导致死信

给队列设置最大长度，当超出后就会将头部（默认）消息扔到死信交换机



### 5.6. 消费者手动确认模式拒绝消息

#### 5.6.1. 配置文件中开启消费者手动确认模式

~~~yml
rabbitmq:
host: RabbitMQip
port: 5672
username: 用户名
password: 密码
virtual-host: 虚拟主机名字
listener:
  simple:
    # 消费者手动确认
    acknowledge-mode: manual
~~~



#### 5.6.2. 接收消息，拒绝且不重入队

消费者监听普通队列，接收消息后模拟异常，发生异常后就得**拒绝接收消息**了（如果告诉队列确认接收了，队列会删掉消息），拒绝后**不重投消息**，消息就会进入死信队列了。

```java
/**
 * 监听正常的那个队列的名字，不是监听那个死信队列
 * channel 消息信道（是连接下的一个消息信道，一个连接下有多个消息信息，发消息/接消息都是通过信道完成的）
 */
@RabbitListener(queues = "普通队列名字")
public void getMsg(Message message, Channel channel)  {
    // 获得消息属性
    MessageProperties messageProperties = message.getMessageProperties();
    // 拿到消息唯一id
    long deliveryTag = messageProperties.getDeliveryTag();
    try {
        byte[] body = message.getBody();
        String s = new String(body);
        log.info("时间：{}，获得消息：{}",new Date(), s);
        // 模拟执行业务逻辑的时候遇到异常了
        int i = 1 / 0;
        // 如果无异常，通过信道通知队列，确认收到
        // multiple若为true代表之前的消息全都确认，为false只确认当前消息
        channel.basicAck(deliveryTag, false);
    } catch (Exception e) {
        log.error("接收失败，原因：{}", e.getMessage());
        // requeue – true if the rejected message(s) should be requeued rather than discarded/dead-lettered
        try {
            // 消费者手动不确认，不重新投递（不重新入队）
            // channel.basicNack(deliveryTag, false, false);
            // 重点：拒绝且不重新入队（会进入死信队列）(和上面的区别是，basicNack第二个参数可以批量处理）
            channel.basicReject(deliveryTag, false);
        } catch (IOException ex) {
            throw new RuntimeException(ex);
        }
        throw new RuntimeException(e);
    }
}
```



## 6. 🔴延迟队列

### 6.1. 是什么

RabbitMQ中的延迟队列可以用于在一定时间后才处理消息，通常用于处理一些`需要延迟执行的任务`，例如定时任务、延迟消息发送等。

具体来说，当生产者发送一条消息到延迟队列时，可以设置消息的过期时间（TTL），然后将消息发送到延迟队列（死信队列）中。当消息过期后，RabbitMQ会将消息转发到指定的目标队列中，从而实现延迟执行的效果。

### 6.2. TTL+DLX组合实现延迟队列

![img](https://s2.loli.net/2023/10/17/ECThZMdt4Fe9pIX.jpg)

一般来说，延迟队列需要使用TTL（Time To Live）和DLX（Dead Letter Exchange）来实现。

-  TTL用于设置消息的过期时间，在消息到达队列后，经过指定TTL还没被消费者取出，就会过期，此时将消息转发到死信交换机DLX中。
-  DLX用于接收被丢弃或者过期的消息，并将其转发到指定的目标队列中。
- 消费者从对应队列取出消息，就实现了延迟队列的功能

 因此，使用TTL和DLX可以实现延迟队列的功能，并且可以保证消息的可靠传输。



### 6.3. 延迟队列问题：TTL不一致问题

后一条消息先过期但是被前一条还没过期的消息挡住：如果有两条不一样TTL的消息进入队列，后一条比前一条**先过期**，就会出现本来后一条要过期的，但是得等前一条先出队后一条才能出来。



#### 6.3.1. 解决方式：分散队列

通过把不同TTL的消息投递到不同的队列中，让队列中的消息不会被阻挡

![img](https://s2.loli.net/2023/10/17/pWrJsqUoK3Z45Bf.jpg)



### 6.4. 插件实现延迟队列

![img](https://s2.loli.net/2023/10/17/IW8dlRGaF4ctP5h.jpg)

延迟队列配置相对麻烦（和死信队列配置类似，需要定义额外队列用来接收过期的消息），借助`rabbitmq_delayed_message_exchange`插件，只需要创建自定义的延迟交换机，给这个交换机添加`x-delayed-type参数`，用于指定它的类型。

当消息到达这个交换机时，且消息的消息属性中指定了`x-dealy`，就会在到期后被投递到指定目标队列中，实现延迟队列的效果（同时也解决了消息TTL不一致的问题）



#### 6.4.1. 下载安装插件

1. 找到对应版本下载：http://www.rabbitmq.com/community-plugins.html 
2. 将插件拷贝到RabbitMQ服务器的`plugins`目录内
3. 解压插件
4. 启用插件：`./rabbitmq-plugins enable rabbitmq_delayed_message_exchange`
5. 查看是否安装：`./rabbitmq-plugins list`





#### 6.4.2. 插件原理

消息发送后不会直接投递到队列，

而是存储到 Mnesia（嵌入式数据库，小型数据库，不适用于大量延迟消息的实现），检查 `x-delay` 时间（消息头部）；

延迟插件在 RabbitMQ 3.5.7 及以上的版本才支持，依赖 Erlang/OPT 18.0 及以上运行环境；





#### 6.4.3. 配置代码

##### 6.4.3.1. 创建自定义交换机并绑定普通队列

> 普通队列其实是当做延迟队列了

~~~java
@Configuration
@Setter
@ConfigurationProperties(prefix = "my")
public class RabbitConfig {

    /**
     * 1. 定义交换机
     * 2. 定义队列
     * 3. 绑定交换机和队列
     */

    private String exchangeName;

    private String queueDelayName;

    private String routingKey;

    /**
     * 自定义交换机
     */
    @Bean
    public CustomExchange customExchange(){
        Map<String, Object> arguments = new HashMap<>();
        // 放一个参数，指明这个交换机是直连的
        arguments.put("x-delayed-type", "direct");
        return new CustomExchange(exchangeName, "x-delayed-message", true, false, arguments);
    }

    /**
     * 定义普通队列
     */
    @Bean
    public Queue queue() {
        // 建造者模式
        return QueueBuilder.durable(queueDelayName)
                .build();
    }

    /**
     * 绑定交换机和普通队列
     */
    @Bean
    public Binding binding(CustomExchange customExchange, Queue queue) {
        // 队列和自定义交换机绑定，要指定路由key
        return BindingBuilder.bind(queue).to(customExchange).with(routingKey).noargs();
    }
}
~~~





##### 6.4.3.2. 发送消息

> 这里通过两个代码块模拟两条过期时间不一致的消息，验证了插件交换机会解决过期时间不一致问题。
>
> 同时需要设置消息属性的消息头的`x-delay`参数，来设置延迟时间（毫秒）

~~~java
public void sendMsg() {
    {
        MessageProperties messageProperties = new MessageProperties();
        // // 15秒过期
        // messageProperties.setExpiration("15000");
        // 通过消息头来设置过期时间
        messageProperties.setHeader("x-delay", 15000);
        Message msg = MessageBuilder
            .withBody("Hello world!!!--15000".getBytes())
            .andProperties(messageProperties)
            .build();
        rabbitTemplate.convertAndSend(exchangeName, routingKey, msg);
        log.info("第一条消息发送完毕，发送时间为：{}，交换机为：{}", new Date(), exchangeName);
    }
    {
        MessageProperties messageProperties = new MessageProperties();
        // // 5秒过期
        // messageProperties.setExpiration("5000");
        // 通过消息头来设置过期时间
        messageProperties.setHeader("x-delay", 5000);
        Message msg = MessageBuilder
            .withBody("Hello world!!!--5000".getBytes())
            .andProperties(messageProperties)
            .build();
        rabbitTemplate.convertAndSend(exchangeName, routingKey, msg);
        log.info("第二条消息发送完毕，发送时间为：{}，交换机为：{}", new Date(), exchangeName);
    }
}
~~~



#### 6.4.4. 关于TTL和x-delay

TTL和x-delay不是对立关系，**可以共存**，或只有x-delay（有x-delay说明用了插件了，肯定要配置这个）

1. 设置了x-delay参数后，消息会被延迟一定时间后再被投递到队列中。
2. 设置TTL（Time-To-Live）参数，则表示消息在队列中的存活时间，超过这个时间后，消息会被自动删除。



 x-delay和TTL是两个不同的概念，可以分别使用，也可以结合使用。

- 如果**只需要延迟消息投递**，可以只设置x-delay参数，不需要设置TTL。
- 如果**需要延迟消息投递并且限制消息在队列中的存活时间**，可以同时设置x-delay和TTL参数。 

需要注意的是，x-delay参数只在延迟队列中生效，不会影响正常队列中的消息投递。而TTL参数则适用于所有类型的队列，包括延迟队列和正常队列。





## 7. 消息投递可靠性

![img](https://s2.loli.net/2023/10/17/PbxXEr3LWDNwaqg.jpg)

消息投递过程主要可以分为如图所示的四个阶段，消息可靠性就是确保每个环节的成功，不过肯定会牺牲一点性能，用性能换取可靠性。

四个阶段分别是：

1. 生产者到交换机
2. 交换机投递到队列
3. 消息在队列和交换机中的持久化
4. 队列到消费者



### 7.1. 第一阶段：生产者到交换机

> 目标：确保消息到达RabbitMQ的交换机上

可能因为各种原因导致消息无法正确到达交换机，比如网络问题、配置交换机名字写错了等等，这时候就应该让**生产者**知道消息是否成功到达交换机。



#### 7.1.1. Confirm模式

`Confirm模式`是一个比较常见的处理一阶段问题的模式。开启这个模式后，当消息发出，RabbitMQ服务器就会返回一个信号（执行一个回调），通过这个信号的参数可以判断消息是否到达交换机。

> ==不论消息是否到达交换机，都会调用这个回调==

##### 7.1.1.1. 开启Confirm模式

~~~yml
spring:
  rabbitmq:
    host: ip
    port: 5672
    username: 用户名
    password: 密码
    virtual-host: 虚拟主机 
    # 开启生产者确认模式
    publisher-confirm-type: correlated
~~~





##### 7.1.1.2. 代码

回调方法在`RabbitTemplate.ConfirmCallback`接口中定义了，可以通过四种方式来实现接口并重写里面的方法，给`rabbitTemplate`配置上回调方法，并让它在实例化之后就执行（@PostConstruct），因为实例化的时候就代表发消息了。

1. 编写外部配置类实现接口，并实现方法（这里的外部是相对于发送消息类而言的）
2. 让发送消息类自身实现接口，在类中实现方法
3. 只在`rabbitTemplate`需要设置`confirm回调`时通过**匿名内部类**方式实现
4. 在`rabbitTemplate`需要设置`confirm回调`时通过**lambda表达式**方式实现（最简洁）



###### 7.1.1.2.1. 外部类编写

~~~java
@Component
@Slf4j
public class MyConfirmCallback implements RabbitTemplate.ConfirmCallback {
    @Override
    public void confirm(CorrelationData correlationData, boolean ack, String cause) {
        if (ack) {
            log.info("消息到达");
            return;
        }
        log.error("消息没到达交换机，原因为：{}", cause);
    }
}
~~~

外部类使用

~~~java
@Component
@Slf4j
public class MsgService {

    @Autowired
    private RabbitTemplate rabbitTemplate;

    @Value("${my.exchangeName}")
    private String exchangeName;

    @Resource
    private MyConfirmCallback confirmCallback;

    /**
     * @PostConstruct 会在实例化之后调用方法
     */
    @PostConstruct
    public void init() {
        rabbitTemplate.setConfirmCallback(confirmCallback);
    }

    public void sendMsg() {
        Message msg = MessageBuilder
                .withBody("Hello world!!!".getBytes())
                .build();
        CorrelationData correlationData = new CorrelationData();
        correlationData.setId("order-12345");
        // 第四个参数发送关联数据
        rabbitTemplate.convertAndSend(exchangeName+1, "info", msg, correlationData);
        log.info("消息发送完毕，发送时间为：{}，交换机为：{}", new Date(), exchangeName);
    }
}
~~~



###### 7.1.1.2.2. 发送消息直接实现接口

~~~java
@Component
@Slf4j
public class MsgService  implements RabbitTemplate.ConfirmCallback{

    @Autowired
    private RabbitTemplate rabbitTemplate;

    @Value("${my.exchangeName}")
    private String exchangeName;

    @PostConstruct
    public void init() {
        rabbitTemplate.setConfirmCallback(this);
    }

    public void sendMsg() {
        Message msg = MessageBuilder
                .withBody("Hello world!!!".getBytes())
                .build();
        CorrelationData correlationData = new CorrelationData();
        correlationData.setId("order-12345");
        // 第四个参数发送关联数据
        rabbitTemplate.convertAndSend(exchangeName, "info", msg, correlationData);
        log.info("消息发送完毕，发送时间为：{}，交换机为：{}", new Date(), exchangeName);
    }

    @Override
    public void confirm(CorrelationData correlationData, boolean ack, String cause) {
        String id = correlationData.getId();
        log.info("id为{}", id);
        if (ack) {
            log.info("消息到达");
            return;
        }
        log.error("消息没到达交换机，原因为：{}", cause);
    }
}
~~~





###### 7.1.1.2.3. 匿名内部类

~~~java
@PostConstruct
public void init() {
    /**
     * 匿名内部类方法
     */
    rabbitTemplate.setConfirmCallback(new RabbitTemplate.ConfirmCallback() {
        @Override
        public void confirm(CorrelationData correlationData, boolean ack, String cause) {
            String id = correlationData.getId();
            log.info("id为{}", id);
            if (ack) {
                log.info("消息到达");
                return;
            }
            log.error("消息没到达交换机，原因为：{}", cause);
        }
    });
}
~~~



###### 7.1.1.2.4. lambda表达式

~~~java
@PostConstruct
public void init() {
    /**
     * lambda表达式
     */
    rabbitTemplate.setConfirmCallback(
        // (CorrelationData correlationData, boolean ack, String cause) -> {
        // 也可以不定义类型
        (correlationData, ack, cause) -> {
            // lambda表达式
            String id = correlationData.getId();
            log.info("id为{}", id);
            if (ack) {
                log.info("消息到达");
                return;
            }
            log.error("消息没到达交换机，原因为：{}", cause);
        }
    );
}

~~~



### 7.2. 第二阶段：交换机到队列

#### 7.2.1. Return模式

使用步骤：

1. 开启`Return模式`
2. 使用`rabbitTemplate.setReturnsCallback`设置回调函数
3. 如果消息从交换机投递到队列的过程失败，才会调用这个回调
   - `Confirm`的回调是**一定会**调用的
   - `Return`的回调**只有失败**才会调用



#### 7.2.2. 代码

> 同`Confirm模式`的编写套路，Return也有4中编写方式：
>
> 1. 发送消息类的外部类实现接口
> 2. 发送消息类直接实现接口
> 3. 在`rabbitTemplate`设置回调时**匿名内部类**实现
> 4. 在`rabbitTemplate`设置回调时通过**lambda表达式**实现
>
> 本节只给出第四种lambda表达式示例代码



##### 7.2.2.1. lambda表达式

~~~java
@PostConstruct
public void init() {
    // 设置回调
    rabbitTemplate.setReturnsCallback(
        (returnedMessage) -> {
            log.error("消息从交换机路由到队列失败，原因为：{}", returnedMessage.getReplyText());
        }
    );
}
~~~





### 7.3. 第三阶段：持久化

可能因为系统宕机、重启、关闭等等情况导致没有持久化存储在队列的消息丢失。

所以要通过一些持久化设置让数据不会因为这些情况丢失。

#### 7.3.1. 持久化主要分为四种

1. 交换机持久化
2. 队列持久化
3. 消息持久化
4. 搭建集群、镜像队列，高可用



##### 7.3.1.1. 交换机持久化

在定义交换机时，`默认持久化`，也可以手动改成不持久化

~~~java
/**
 * 定义交换机
 */
@Bean
public DirectExchange directExchange(){
    return ExchangeBuilder
        // 交换机名字
        .directExchange(exchangeName)
        /*// 持久化，默认true
                .durable(false)*/
        .build();
}
~~~



==源码：==

> 在创建交换机建造者时，默认持久化

![image-20230611104909877](https://s2.loli.net/2023/10/17/BX7mNgClI2Tstkj.png)





##### 7.3.1.2. 队列持久化

在定义队列的时候，`默认持久化`

###### 7.3.1.2.1. 通过new方式创建队列

~~~java
/**
 * 定义队列
 */
@Bean
public Queue queueA() {
    return new Queue("queue.fanout.a");
}
~~~



==构造方法源码：==默认持久化

![image-20230611104530777](https://s2.loli.net/2023/10/17/mwaYlBS5DW1pXxN.png)



###### 7.3.1.2.2. 通过建造者模式创建队列

~~~java
/**
 * 定义队列
 */
@Bean
public Queue queueA() {
    return QueueBuilder.durable(queueAName).build();
}
~~~



==源码：==

`durable方法`源码：

![image-20230611104641886](https://s2.loli.net/2023/10/17/8aqr7u2ntlvW9sp.png)

到`setDurable()`源码：默认持久化

![image-20230611104718936](https://s2.loli.net/2023/10/17/wOkcpZL6bTxuj9e.png)





##### 7.3.1.3. 消息持久化

> 消息通过`消息属性MessageProperties`中指定`MessageDeliveryMode`的枚举类型来确定是否持久化，==默认持久化==

###### 7.3.1.3.1. 通过构造者创建消息

~~~java
@Component
@Slf4j
public class MsgService {

    @Autowired
    private RabbitTemplate rabbitTemplate;

    @Value("${my.exchangeName}")
    private String exchangeName;

    public void sendMsg() {
        Message msg = MessageBuilder.withBody("Hello world!!!".getBytes()).build();
        rabbitTemplate.convertAndSend(exchangeName, "error", msg);
        log.info("消息发送完毕，发送时间为：{}，交换机为：{}", new Date(), exchangeName);
    }
}
~~~



###### 7.3.1.3.2. `MessageBuilder.build()`源码：

> 只截取部分源码
>
> 如果没有在创建队列的时候带上消息属性，就会调用`this.buildProperties()`，从父类中拿到消息属性

~~~java
public final class MessageBuilder extends MessageBuilderSupport<Message> {
    public Message build() {
        return new Message(this.body, this.buildProperties());
    }
}
~~~



###### 7.3.1.3.3. 父类消息属性

> 只截取部分源码
>
> 如果没有传递自定义消息属性，就会用组合进来的消息属性

~~~java
public abstract class MessageBuilderSupport<T> {
    private MessageProperties properties = new MessageProperties();

    protected MessageProperties buildProperties() {
        return this.properties;
    }

}

~~~



###### 7.3.1.3.4. 实例化消息属性

> 在实例化消息属性的时候，会默认设置上持久化的模式（枚举）

![image-20230611110949621](https://s2.loli.net/2023/10/17/sIP4uVtU9SBigvh.png)



###### 7.3.1.3.5. MessageDeliveryMode

![image-20230611111018741](https://s2.loli.net/2023/10/17/xmk1ITeQ3jDpEOW.png)



### 7.4. 第四阶段：队列到消费者

#### 7.4.1. 消费者手动确认模式

> 正常情况下，消费者一旦接收了消息，消息会**立刻**从队列中删除，如果此时消费者出现某些异常（比如要把消息存数据库，但是业务报错了没存进去），就会导致消息丢失。
>
> 通过消费者手动确认模式可以让**消费者来控制队列是否删除消息**。

使用步骤：

1. 开启消费者手动确认模式
2. 消费者消费完成后再通知队列删除，否则拒绝消息



##### 7.4.1.1. 代码

###### 7.4.1.1.1. 开启手动确认

~~~yml
spring:
  rabbitmq:
    host: ip
    port: 5672
    username: 用户名
    password: 密码
    virtual-host: 虚拟主机
    listener:
      simple:
        # 开启消费者手动确认
        acknowledge-mode: manual
~~~



###### 7.4.1.1.2. 接收消息时候手动确认

> - `channel.basicAck`来确认消息
> - `channel.basicNack`来拒绝消息

~~~java
@Component
@Slf4j
public class MsgReceive {

    /**
     * 接收正常队列的消息，但是不确认，也不重投
     *
     * @param message
     */
    @RabbitListener(queues = "监听队列名")
    public void getMsg(Message message, Channel channel)  {
        // 获得消息属性
        MessageProperties messageProperties = message.getMessageProperties();
        // 拿到消息唯一id
        long deliveryTag = messageProperties.getDeliveryTag();
        try {
            byte[] body = message.getBody();
            String s = new String(body);
            log.info("时间：{}，获得消息：{}",new Date(), s);
            // 无异常，通过信道通知队列，确认收到
            // multiple（第二参数）若为true代表之前的消息全都确认，为false只确认当前消息
            channel.basicAck(deliveryTag, false);
        } catch (Exception e) {
            log.error("接收失败，原因：{}", e.getMessage());
            // requeue – true if the rejected message(s) should be requeued rather than discarded/dead-lettered
            try {
                // 消费者手动不确认，不重新投递（不重新入队）
                channel.basicNack(deliveryTag, false, false);
            } catch (IOException ex) {
                throw new RuntimeException(ex);
            }
            throw new RuntimeException(e);
        }
    }
}
~~~





## 8. 交换机属性

> 在创建交换机的时候，可以指定的一些属性
>
> 注意：创建交换机或者队列完成后再重新创建，如果修改交换机或队列参数则会报错！

1. `Name`：交换机名称；就是一个字符串
2. `Type`：交换机类型，direct, topic, fanout, headers四种
3. `Durability`：持久化，声明交换机是否持久化，代表交换机在服务器重启后是否还存在；
4. `Auto delete` ：是否自动删除，曾经有队列绑定到该交换机，后来解绑了，那就会自动删除该交换机；
5. `Internal`：内部使用的，如果是yes，客户端无法直接发消息到此交换机，它只能用于交换机与交换机的绑定。
6. `Arguments`
   - 只有一个取值`alternate-exchange`，表示备用交换机；

### 8.1. 设置属性

通过建造者模式创建会更加方便，可以直接通过方法来给交换机加上各种属性。

具体就不展开举例了，可以参考源码`ExchangeBuilder`中的各种方法来根据需要设置



### 8.2. 备用交换机设置

#### 8.2.1. 概念

当消息经过交换器准备路由给队列的时候，发现没有对应的队列可以投递信息，在RabbitMQ中会**默认丢弃消息**，如果想要监测哪些消息被投递到没有对应的队列，可以用备用交换机来实现，可以接收备用交换机的消息，然后记录日志或发送报警信息。

> 备用交换机一般定义为`扇形交换机`（Fanout Exchange），因为消息会到达备用交换机就是因为无法正确投递到队列，备用交换机就需要把这些信息全部输出到指定位置让开发者处理



#### 8.2.2. 代码

##### 8.2.2.1. 定义备用交换机和备用队列，绑定他们的关系

> 备用交换机和备用队列其实也是**普通交换机和队列**，只是会将备用交换机绑定给普通交换机，让它成为备用的而已

~~~java
/**
 * 定义备用交换机
 */
@Bean
public FanoutExchange fanoutExchange(){
    return ExchangeBuilder
        // 交换机名字
        .fanoutExchange(exchangeAlternateName)
        .build();
}
/**
 * 定义备用队列
 */
@Bean
public Queue queueAlternate() {
    return QueueBuilder.durable(queueAlternateName).build();
}

/**
 * 绑定备用交换机和队列
 */
@Bean
public Binding bindingAlternate(FanoutExchange fanoutExchange, Queue queueAlternate) {
    return BindingBuilder.bind(queueAlternate).to(fanoutExchange);
}
~~~



##### 8.2.2.2. 给普通交换机绑定备用交换机

~~~java
/**
 * 定义正常交换机
 */
@Bean
public DirectExchange directExchange(){
    return ExchangeBuilder
        // 交换机名字
        .directExchange(exchangeNormalName)
        // 设置备用交换机
        .alternate(exchangeAlternateName)
        .build();
}
~~~



##### 8.2.2.3. 当投递到队列失败时，消息就会到备用交换机里了



#### 8.2.3. DLX和备用交换机区别

RabbitMQ中的DLX（Dead Letter Exchange）和备用交换机（Alternate Exchange）是两种不同的机制。

`DLX`是一种用于**处理无法被消费者正确处理的消息**的机制。当消息在队列中被拒绝或者超时未被消费者处理时，DLX会将这些消息重新路由到另一个交换机或者队列中。DLX可以帮助应用程序处理那些无法处理的消息，并且可以提高消息处理的可靠性。 

`备用交换机`是一种用于**处理无法被路由到目标队列的消息**的机制。当消息无法被路由到目标队列时，交换机会将这些消息重新路由到另一个备用交换机或者队列中。备用交换机可以帮助应用程序处理那些无法被路由的消息，并且可以提高消息处理的可靠性。 

因此，DLX和备用交换机的作用虽然有一定的重叠，但是它们处理的问题不同，具有不同的应用场景。

## 9. 队列属性

> 在创建队列的时候，可以指定的一些属性。
>
> 注意：创建交换机或者队列完成后再重新创建，如果修改交换机或队列参数则会报错！

Type：队列类型

Name：队列名称，就是一个字符串，随便一个字符串就可以；

Durability：声明队列是否持久化，代表队列在服务器重启后是否还存在；

Auto delete： 是否自动删除，如果为true，当没有消费者连接到这个队列的时候，队列会自动删除；

Exclusive：exclusive属性的[队列](https://so.csdn.net/so/search?q=队列&spm=1001.2101.3001.7020)只对首次声明它的连接可见，并且在连接断开时自动删除；基本上不设置它，设置成false

Arguments：队列的其他属性，例如指定DLX（死信交换机等）；

1. 1、x-expires：Number

   - 当Queue（队列）在指定的时间未被访问，则队列将被自动删除；

2. x-message-ttl：Number

   - 发布的消息在队列中存在多长时间后被取消（单位毫秒）；

3. 3、x-overflow：String

   - 设置队列溢出行为，当达到队列的最大长度时，消息会发生什么，有效值为Drop Head或Reject Publish；

4. 4、x-max-length：Number

   - 队列所能容下消息的最大长度，当超出长度后，新消息将会覆盖最前面的消息，类似于Redis的LRU算法；

5. 5、 x-single-active-consumer：默认为false

   - 激活单一的消费者，也就是该队列只能有一个消息者消费消息；

6. 6、x-max-length-bytes：Number

   - 限定队列的最大占用空间，当超出后也使用类似于Redis的LRU算法；

7. 7、x-dead-letter-exchange：String

   - 指定队列关联的死信交换机，有时候我们希望当队列的消息达到上限后溢出的消息不会被删除掉，而是走到另一个队列中保存起来；

8. 8.x-dead-letter-routing-key：String

   - 指定死信交换机的路由键，一般和6一起定义；

9. 9.x-max-priority：Number

   - 如果将一个队列加上优先级参数，那么该队列为优先级队列；


   - （1）、给队列加上优先级参数使其成为优先级队列


   - x-max-priority=10【0-255取值范围】


   - （2）、给消息加上优先级属性


   - 通过优先级特性，将一个队列实现插队消费；


   - MessageProperties messageProperties=new MessageProperties();messageProperties.setPriority(8);


   - 

10. 10、x-queue-mode：String（理解下即可）

    - 队列类型x-queue-mode=lazy懒队列，在磁盘上尽可能多地保留消息以减少RAM使用，如果未设置，则队列将保留内存缓存以尽可能快地传递消息；

11. 11、x-queue-master-locator：String（用的较少，不讲）

    - 在集群模式下设置队列分配到的主节点位置信息；


    - 每个queue都有一个master节点，所有对于queue的操作都是事先在master上完成，之后再slave上进行相同的操作；


    - 每个不同的queue可以坐落在不同的集群节点上，这些queue如果配置了镜像队列，那么会有1个master和多个slave。


    - 基本上所有的操作都落在master上，那么如果这些queues的master都落在个别的服务节点上，而其他的节点又很空闲，这样就无法做到负载均衡，那么势必会影响性能；


    - 关于master queue host 的分配有几种策略，可以在queue声明的时候使用x-queue-master-locator参数，或者在policy上设置queue-master-locator，或者直接在rabbitmq的配置文件中定义queue_master_locator，有三种可供选择的策略：


    - （1）min-masters：选择master queue数最少的那个服务节点host；


    - （2）client-local：选择与client相连接的那个服务节点host；


    - （3）random：随机分配；



## 10. 幂等性问题

### 10.1. 什么是幂等性

消息幂等性就是`消息不被重复消费`

同一个消息只能处理一次，再收到一次就不能再执行了，否则可能导致重复处理的问题。



### 10.2. 可能引起重复操作的情况

在HTTP请求中：

- GET、DELETE、PUT多次重复不会有问题
- `POST`的提交操作可能会导致重复添加数据问题

在SQL中：

- select、delete、get多次重复不会有问题
- `insert`的提交操作可能会导致重复添加数据问题





### 10.3. 如何达到消息幂等性

> 通过配合`Redis`实现不重复消息

1. 在生产者发送消息时，消息带上了`唯一ID`
2. 消费者接收到消息，通过Redis的`setnx`命令（Java代码中的`setIfAbsent`）向Redis中缓存消息
   - 如果缓存成功，说明消息是第一次接收到，可以执行后续业务逻辑
   - 如果缓存失败，说明消息已经重复接收了，直接跳过即可



~~~java
//把消息的唯一ID写入redis
//如果redis中该key不存在，那么就设置，存在就不设置
boolean flag = stringRedisTemplate.opsForValue().setIfAbsent("idempotent:" + orders.getId(), String.valueOf(orders.getId())); 

if (flag) { 
    //key不存在返回true
    //相当于是第一次消费该消息
    //TODO 处理业务
    System.out.println("正常处理业务....." + orders.getId());
}
~~~













































































































































