const l=JSON.parse('{"key":"v-35556cd8","path":"/blogs/RabbitMQ/MyNote_RabbitMQ.html","title":"","lang":"en-US","frontmatter":{},"headers":[{"level":2,"title":"1. RabbitMQ工作模型","slug":"_1-rabbitmq工作模型","link":"#_1-rabbitmq工作模型","children":[{"level":3,"title":"1.1. 各部分角色介绍","slug":"_1-1-各部分角色介绍","link":"#_1-1-各部分角色介绍","children":[]}]},{"level":2,"title":"2. 在SpringBoot中使用RabbitMQ步骤","slug":"_2-在springboot中使用rabbitmq步骤","link":"#_2-在springboot中使用rabbitmq步骤","children":[{"level":3,"title":"2.1. 加入AMQP依赖","slug":"_2-1-加入amqp依赖","link":"#_2-1-加入amqp依赖","children":[]},{"level":3,"title":"2.2. 编写RabbitMQ配置类","slug":"_2-2-编写rabbitmq配置类","link":"#_2-2-编写rabbitmq配置类","children":[]},{"level":3,"title":"2.3. 发送消息","slug":"_2-3-发送消息","link":"#_2-3-发送消息","children":[]},{"level":3,"title":"2.4. 接收消息","slug":"_2-4-接收消息","link":"#_2-4-接收消息","children":[]}]},{"level":2,"title":"3. 交换机Exchange","slug":"_3-交换机exchange","link":"#_3-交换机exchange","children":[{"level":3,"title":"3.1. 扇形交换机（Fanout Exchange）","slug":"_3-1-扇形交换机-fanout-exchange","link":"#_3-1-扇形交换机-fanout-exchange","children":[]},{"level":3,"title":"3.2. 直连交换机（Direct Exchange）","slug":"_3-2-直连交换机-direct-exchange","link":"#_3-2-直连交换机-direct-exchange","children":[]},{"level":3,"title":"3.3. 主题交换机（Topic Exchange）","slug":"_3-3-主题交换机-topic-exchange","link":"#_3-3-主题交换机-topic-exchange","children":[]},{"level":3,"title":"3.4. 头交换机（Headers Exchange）","slug":"_3-4-头交换机-headers-exchange","link":"#_3-4-头交换机-headers-exchange","children":[]}]},{"level":2,"title":"4. TTL","slug":"_4-ttl","link":"#_4-ttl","children":[{"level":3,"title":"4.1. 给队列设置TTL","slug":"_4-1-给队列设置ttl","link":"#_4-1-给队列设置ttl","children":[]},{"level":3,"title":"4.2. 给单条消息设置TTL","slug":"_4-2-给单条消息设置ttl","link":"#_4-2-给单条消息设置ttl","children":[]}]},{"level":2,"title":"5. 🔴死信队列","slug":"_5-🔴死信队列","link":"#_5-🔴死信队列","children":[{"level":3,"title":"5.1. 是什么","slug":"_5-1-是什么","link":"#_5-1-是什么","children":[]},{"level":3,"title":"5.2. 让消息变为死信的特殊情况","slug":"_5-2-让消息变为死信的特殊情况","link":"#_5-2-让消息变为死信的特殊情况","children":[]},{"level":3,"title":"5.3. 给队列配置死信交换机","slug":"_5-3-给队列配置死信交换机","link":"#_5-3-给队列配置死信交换机","children":[]},{"level":3,"title":"5.4. TTL死信","slug":"_5-4-ttl死信","link":"#_5-4-ttl死信","children":[]},{"level":3,"title":"5.5. 最大长度导致死信","slug":"_5-5-最大长度导致死信","link":"#_5-5-最大长度导致死信","children":[]},{"level":3,"title":"5.6. 消费者手动确认模式拒绝消息","slug":"_5-6-消费者手动确认模式拒绝消息","link":"#_5-6-消费者手动确认模式拒绝消息","children":[]}]},{"level":2,"title":"6. 🔴延迟队列","slug":"_6-🔴延迟队列","link":"#_6-🔴延迟队列","children":[{"level":3,"title":"6.1. 是什么","slug":"_6-1-是什么","link":"#_6-1-是什么","children":[]},{"level":3,"title":"6.2. TTL+DLX组合实现延迟队列","slug":"_6-2-ttl-dlx组合实现延迟队列","link":"#_6-2-ttl-dlx组合实现延迟队列","children":[]},{"level":3,"title":"6.3. 延迟队列问题：TTL不一致问题","slug":"_6-3-延迟队列问题-ttl不一致问题","link":"#_6-3-延迟队列问题-ttl不一致问题","children":[]},{"level":3,"title":"6.4. 插件实现延迟队列","slug":"_6-4-插件实现延迟队列","link":"#_6-4-插件实现延迟队列","children":[]}]},{"level":2,"title":"7. 消息投递可靠性","slug":"_7-消息投递可靠性","link":"#_7-消息投递可靠性","children":[{"level":3,"title":"7.1. 第一阶段：生产者到交换机","slug":"_7-1-第一阶段-生产者到交换机","link":"#_7-1-第一阶段-生产者到交换机","children":[]},{"level":3,"title":"7.2. 第二阶段：交换机到队列","slug":"_7-2-第二阶段-交换机到队列","link":"#_7-2-第二阶段-交换机到队列","children":[]},{"level":3,"title":"7.3. 第三阶段：持久化","slug":"_7-3-第三阶段-持久化","link":"#_7-3-第三阶段-持久化","children":[]},{"level":3,"title":"7.4. 第四阶段：队列到消费者","slug":"_7-4-第四阶段-队列到消费者","link":"#_7-4-第四阶段-队列到消费者","children":[]}]},{"level":2,"title":"8. 交换机属性","slug":"_8-交换机属性","link":"#_8-交换机属性","children":[{"level":3,"title":"8.1. 设置属性","slug":"_8-1-设置属性","link":"#_8-1-设置属性","children":[]},{"level":3,"title":"8.2. 备用交换机设置","slug":"_8-2-备用交换机设置","link":"#_8-2-备用交换机设置","children":[]}]},{"level":2,"title":"9. 队列属性","slug":"_9-队列属性","link":"#_9-队列属性","children":[]},{"level":2,"title":"10. 幂等性问题","slug":"_10-幂等性问题","link":"#_10-幂等性问题","children":[{"level":3,"title":"10.1. 什么是幂等性","slug":"_10-1-什么是幂等性","link":"#_10-1-什么是幂等性","children":[]},{"level":3,"title":"10.2. 可能引起重复操作的情况","slug":"_10-2-可能引起重复操作的情况","link":"#_10-2-可能引起重复操作的情况","children":[]},{"level":3,"title":"10.3. 如何达到消息幂等性","slug":"_10-3-如何达到消息幂等性","link":"#_10-3-如何达到消息幂等性","children":[]}]}],"git":{"createdTime":1699003101000,"updatedTime":1699003101000,"contributors":[{"name":"lh","email":"1178844902@qq.com","commits":1}]},"filePathRelative":"blogs/RabbitMQ/MyNote_RabbitMQ.md"}');export{l as data};