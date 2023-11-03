



## 基本使用

### 依赖

~~~xml
<dependencies>
    <!--springboot起步依赖-->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter</artifactId>
    </dependency>
    <!--springboot测试依赖-->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-test</artifactId>
        <scope>test</scope>
    </dependency>
    <!--mybatis-plus起步依赖-->
    <dependency>
        <groupId>com.baomidou</groupId>
        <artifactId>mybatis-plus-boot-starter</artifactId>
        <version>3.5.1</version>
    </dependency>
    <!--lombok起步依赖-->
    <dependency>
        <groupId>org.projectlombok</groupId>
        <artifactId>lombok</artifactId>
        <optional>true</optional>
    </dependency>
    <!--mysql驱动-->
    <dependency>
        <groupId>mysql</groupId>
        <artifactId>mysql-connector-java</artifactId>
        <scope>runtime</scope>
    </dependency>
</dependencies>
~~~



### 数据库配置

~~~properties
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
spring.datasource.url=jdbc:mysql://localhost:3306/mybatisplus_learning?serverTimezone=GMT%2B8&characterEncoding=utf-8&useSSL=false
spring.datasource.username=root
spring.datasource.password=admin
~~~





### 日志配置

~~~yml
mybatis-plus:
  configuration:
    log-impl: org.apache.ibatis.logging.stdout.StdOutImpl
~~~







## CRUD

MyBatis-Plus中的基本CRUD在内置的BaseMapper中都已得到了实现

直接通过继承`BaseMapper`即可

~~~java
@Repository
public interface UserMapper extends BaseMapper<User> {
}
~~~





























## 分页

MySQL分页关键字：`limit 起始索引 每页条数`

起始索引算法：$$（当前页码-1） * 每页显示条数 = 当前页起始索引$$



### 使用MP的分页插件

#### 第一步：加配置

创建MP的配置类（可以把包扫描注解也加到这里面），加上``注解

通过方法获得带分页插件的拦截器对象

~~~java
package com.xiaohuowa.config;

import com.baomidou.mybatisplus.annotation.DbType;
import com.baomidou.mybatisplus.extension.plugins.MybatisPlusInterceptor;
import com.baomidou.mybatisplus.extension.plugins.inner.PaginationInnerInterceptor;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * @author 小火娃
 * @project_name: my_projects
 * @package_name: com.xiaohuowa.config
 */
@Configuration
// 扫描mapper所在包
@MapperScan("com.xiaohuowa.mapper")
public class MyBatisPlusConfig {

    @Bean
    public MybatisPlusInterceptor mybatisPlusInterceptor() {
        MybatisPlusInterceptor mybatisPlusInterceptor = new MybatisPlusInterceptor();
        mybatisPlusInterceptor.addInnerInterceptor(new PaginationInnerInterceptor(DbType.MYSQL));
        return mybatisPlusInterceptor;
    }

}

~~~



#### 第二步：使用

测试步骤：

1. 获取page对象，泛型为实体类
   - 是实例化page的时候传入`页码 + 每页条数`
2. 直接通过mapper调用`selectPage`方法可以查询到对应数据
   - 结果封装在page对象里



```java
@SpringBootTest
public class MPpaginationTest {

    @Autowired
    private UserMapper userMapper;

    /**
     * 测试分页
     */
    @Test
    public void test01() {
        // 查询第二页，每页十条数据
        Page<User> page = new Page<>(2, 10);
        // ==>  Preparing: SELECT id,name,age,email,is_delete FROM user WHERE is_delete=0 LIMIT ?,?
        // ==> Parameters: 10(Long), 10(Long)
        userMapper.selectPage(page, null);
    }
}
```



### page对象的方法

```java
// 获取查到的记录（list）
System.out.println(page.getRecords());
// 获取总页数
System.out.println(page.getPages());
// 获取当前页数
System.out.println(page.getCurrent());
// 获取每页显示的条数
System.out.println("page.getSize() = " + page.getSize());
// 获取总记录条数
System.out.println(page.getTotal());
// 是否有前一页
System.out.println(page.hasPrevious());
// 是否有后一页
System.out.println(page.hasNext());
```





### 自定义的查询操作使用MP分页

#### 第一步：加配置

[同上](# 第一步：加配置)

#### 第二步：在dao层写sql

> 1. 返回值要是`Page<实体类>`类型
> 2. 方法==第一个==参数要是`Page<实体类>`
>
> 这样直接写不分页的sql，在传入page对象只会会自动分页

```java
/**
 * @author 小火娃
 * @project_name: my_projects
 * @package_name: com.xiaohuowa.mapper
 */
@Mapper
public interface UserMapper extends BaseMapper<User> {

    /**
     * 自定义sql，但是使用MP的分页插件
     *
     * @param page MP提供的分页对象，只要传入page对象就可以自动分页，这个参数一定要是第一个
     * @param age 通过年龄来查询
     * @return
     */
    @Select("select id, name, age, email from user where age > #{age}")
    Page<User> selectUserByAge(@Param("page") Page<User> page, @Param("age") Integer age);

}
```





#### 第三步：测试

```java
@SpringBootTest
public class MPpaginationTest {

    @Autowired
    private UserMapper userMapper;

    /**
     * 自定义sql使用MP分页插件
     */
    @Test
    public void test02() {
        // 当前页码1，每页显示五条
        Page<User> page = new Page<>(1, 5);
        // ==>  Preparing: select id, name, age, email from user where age > ? LIMIT ?
        // ==> Parameters: 80(Integer), 5(Long)
        userMapper.selectUserByAge(page, 80);
    }
}
```









## 乐观锁



悲观锁适合写多读少，乐观锁适合 读多写少



### 乐观锁案例

#### 需求

张三李四同时操作同一条记录，对商品修改价格，张三给商品价格增加100元，李四给商品价格降低50元

商品原价100元，无论张三和李四谁的操作先到数据库，都会出现一个人的操作把另一个人的操作覆盖了的情况



#### 没用乐观锁的情况

##### pojo

~~~java
@Data
@TableName("t_product")  // 指定表名
public class Product {
    private Long id;
    private String name;
    private Integer price;
    private Integer version;
}
~~~



##### ProductMapper

```java
@Repository
public interface ProductMapper extends BaseMapper<Product> {
}
```



##### 测试类

```java
@SpringBootTest
public class MPOptimisticLockerTest {

    @Autowired
    private ProductMapper productMapper;

    @Test
    public void test01() {
        // 张三查到的商品数据
        Product productZS = productMapper.selectById(1);
        System.out.println("张三取出的商品价格：" + productZS.getPrice());
        // 李四查到的商品数据
        Product productLS = productMapper.selectById(1);
        System.out.println("李四取出的商品价格：" + productLS.getPrice());

        // 张三修改数据
        productZS.setPrice(productZS.getPrice() + 100);
        productMapper.updateById(productZS);
        // 李四修改数据
        productLS.setPrice(productLS.getPrice() - 50);
        productMapper.updateById(productLS);

        // 老板最后查到的商品数据
        Product productBoss = productMapper.selectById(1);
        System.out.println("老板取出的商品价格：" + productBoss.getPrice());
    }

}
```





##### 结果

原价100

张三先加100，变为200

李四也查到了100，将其减去50，最后剩下的就是50





#### 使用MP提供的乐观锁插件

##### 第一步：在MP配置文件中加入乐观锁插件

`mybatisPlusInterceptor.addInnerInterceptor(new OptimisticLockerInnerInterceptor());`

```java
@Configuration
// 扫描mapper所在包
@MapperScan("com.xiaohuowa.mapper")
public class MyBatisPlusConfig {

    @Bean
    public MybatisPlusInterceptor mybatisPlusInterceptor() {
        MybatisPlusInterceptor mybatisPlusInterceptor = new MybatisPlusInterceptor();
        // 分页插件
        mybatisPlusInterceptor.addInnerInterceptor(new PaginationInnerInterceptor(DbType.MYSQL));
        // 乐观锁插件
        mybatisPlusInterceptor.addInnerInterceptor(new OptimisticLockerInnerInterceptor());
        return mybatisPlusInterceptor;
    }

}
```



##### 第二步：修改实体类

在版本上加入`@Version`注解，代表这个字段是乐观锁的版本记录

```java
@Data
@TableName("t_product")
public class Product {
    private Long id;
    private String name;
    private Integer price;
    @Version
    private Integer version;
}
```



##### 第三步：测试

测试代码不变

```java
@SpringBootTest
public class MPOptimisticLockerTest {

    @Autowired
    private ProductMapper productMapper;

    @Test
    public void test01() {
        // 张三查到的商品数据
        Product productZS = productMapper.selectById(1);
        System.out.println("张三取出的商品价格：" + productZS.getPrice());
        // 李四查到的商品数据
        Product productLS = productMapper.selectById(1);
        System.out.println("李四取出的商品价格：" + productLS.getPrice());

        // 张三修改数据
        productZS.setPrice(productZS.getPrice() + 100);
        productMapper.updateById(productZS);
        // 李四修改数据
        productLS.setPrice(productLS.getPrice() - 50);
        productMapper.updateById(productLS);

        // 老板最后查到的商品数据
        Product productBoss = productMapper.selectById(1);
        System.out.println("老板取出的商品价格：" + productBoss.getPrice());
    }

}
```



##### 结果

张三取出数据，此时价格为100，版本号为0

李四取出数据，此时价格为100，版本号为0

张三将价格提升100，同时改变版本号为1

李四试图将价格降低50，此时版本号已经不是查出来的0了，所以李四的修改失败

最后取出的是150元，符合预期



修改操作的sql

`UPDATE t_product SET name=?, price=?, version=? WHERE id=? AND version=?`







## 通用枚举

### 使用场景

表中的有些字段值是固定的，例如性别（男或女），此时可以使用MyBatis-Plus的通用枚举

来实现





### 使用步骤

#### 表结构

通过int类型的0 / 1代表性别



#### 第一步：创建枚举

> `@EnumValue`注解放在属性的上方，被[扫描](# 第三步：在properties里配置通用枚举的包扫描)后可以映射为对应数据库类型

```java
@Getter  // 枚举只给Getter就够了
public enum SexEnum {

    MALE(1, "男"),
    FEMALE(2, "女");

    @EnumValue  // 注解所标识的值将添加进数据库
    private Integer sex;

    private String sexName;

    SexEnum(Integer sex, String sexName) {
        this.sex = sex;
        this.sexName = sexName;
    };
}
```





#### 第二步：修改实体类

> 主要是将sex设置为枚举类型

```java
@Data
// 用于设置数据库表名
@TableName("user")
public class User {

    /**
     * @TableId 将属性对应字段指定为主键（如果主键名字不叫 “id” 的时候要这么设置）
     */
    @TableId(value = "id")
    private Long id;

    private String name;
    private Integer age;
    private String email;

    // 设置为枚举类型
    private SexEnum sex;

    @TableLogic
    private Integer isDelete;

}
```



#### 第三步：在properties里配置通用枚举的包扫描

```properties
# 通用枚举包扫描
mybatis-plus.type-enums-package=com.xiaohuowa.enums
```



#### 第四步：测试

```java
@SpringBootTest
public class MPEnumTest {

    @Autowired
    private UserMapper userMapper;

    @Test
    public void test() {
        User user = new User();
        user.setId(888L);
        user.setName("树枝666");
        user.setAge(666);
        user.setSex(SexEnum.MALE);

        // ==>  Preparing: INSERT INTO user ( id, name, age, sex ) VALUES ( ?, ?, ?, ? )
        // ==> Parameters: 888(Long), 树枝666(String), 666(Integer), 1(Integer)
        userMapper.insert(user);
    }

}
```





## 代码生成器

通过数据库的表可以直接生成代码

### 步骤一：添加依赖

```xml
<dependency>
    <groupId>com.baomidou</groupId>
    <artifactId>mybatis-plus-generator</artifactId>
    <version>3.5.1</version>
</dependency>
<dependency>
    <groupId>org.freemarker</groupId>
    <artifactId>freemarker</artifactId>
    <version>2.3.31</version>
</dependency>
```





### 步骤二：编写类运行方法

将对应信息进行修改后，直接运行main方法即可

```java
package com.xiaohuowa;

import com.baomidou.mybatisplus.generator.FastAutoGenerator;
import com.baomidou.mybatisplus.generator.config.OutputFile;
import com.baomidou.mybatisplus.generator.engine.FreemarkerTemplateEngine;

import java.util.Collections;

/**
 * @author 小火娃
 * @project_name: my_projects
 * @package_name: com.xiaohuowa
 */
public class FastAutoGeneratorTest {

    public static void main(String[] args) {
        FastAutoGenerator.create("jdbc:mysql://127.0.0.1:3306/mybatisplus_learning?characterEncoding=utf-8&userSSL=false", "root", "admin")
                        .globalConfig(builder -> {
                            builder.author("xiaohuowa") // 设置作者
//.enableSwagger() // 开启 swagger 模式
                                    .fileOverride() // 覆盖已生成文件
                                    .outputDir("D://mybatis_plus"); // 指定输出目录
                        })
                        .packageConfig(builder -> {
                            builder.parent("com.xiaohuowa") // 设置父包名
                                    //.moduleName("mybatisplus") // 设置父包模块名
                                    .pathInfo(Collections.singletonMap(OutputFile.mapperXml, "D://mybatis_plus"));
// 设置mapperXml生成路径
                        })
                        .strategyConfig(builder -> {
                            builder.addInclude("t_product") // 设置需要生成的表名
                                    .addTablePrefix("t_", "c_"); // 设置过滤表前缀
                        })
                        .templateEngine(new FreemarkerTemplateEngine()) // 使用Freemarker引擎模板，默认的是Velocity引擎模板
                        .execute();
    }

}
```





## 多数据源

### 适用于场景

纯粹多库、 读写分离、 一主多从、 混合模式等



### 使用步骤

#### 第一步：引入依赖

~~~xml
<dependency>
    <groupId>com.baomidou</groupId>
    <artifactId>dynamic-datasource-spring-boot-starter</artifactId>
    <version>3.5.0</version>
</dependency>
~~~



#### 第二步：配置多数据源

> 通过配置文件配置上多个数据源，在使用的地方直接用名字即可

~~~yml
spring:
  # 配置数据源信息
  datasource:
    dynamic:
      # 设置默认的数据源或者数据源组,默认值即为master
      primary: master
      # 严格匹配数据源。默认false,使用默认数据源   true匹配指定数据源,匹配不到则抛异常
      strict: false
      datasource:
        master:
          url: jdbc:mysql://localhost:3306/mybatisplus_learning?characterEncoding=utf-8&useSSL=false
          driver-class-name: com.mysql.cj.jdbc.Driver
          username: root
          password: admin
        slave_1:
          url: jdbc:mysql://localhost:3306/mybatis_plus_1?characterEncoding=utf-8&useSSL=false
          driver-class-name: com.mysql.cj.jdbc.Driver
          username: root
          password: admin
~~~



#### 第三步：测试

##### Service层

> 通过`@DS(数据源名字)`来指定数据源
>
> `@DS` 可以注解在方法上或类上，**同时存在就近原则 方法上注解 优先于 类上注解**。
>
> 没有`@DS`则代表使用默认数据源

```java
/**
 * @author 小火娃
 * @project_name: my_projects
 * @package_name: com.xiaohuowa.service.impl
 */
@Service
// 指定数据源
@DS("master")
public class UserServiceImpl extends ServiceImpl<UserMapper, User> implements UserService {
}
```

























## 快捷键

`Alt + 7`

调出当前类的结构





## 拓展

在Service层直接注入mapper的时候可能会出现idea提示错误的情况，解决这个可以在mapper接口上加上@Repository。

不用@mapper 主要是因为它已经被扫描了，这时候是为了让ioc容器识别它是持久层组件才加上@Repository