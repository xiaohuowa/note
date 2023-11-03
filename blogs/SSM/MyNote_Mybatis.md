### mybatis里的动态代理

#### 不用动态代理的话

> 没用动态代理之前需要手动给出DAO接口的实现类（以下为实现类）
>
> 根据`namespace`和对应sql的`id`操作sqlsession执行对应xml里的方法

```java
public class StudentDaoImpl implements StudentDao {
    @Override
    public List<Student> selectStudents() {
        //获取SqlSession对象
        SqlSession sqlSession = MyBatisUtils.getSqlSession();
        String sqlId="com.xiaohuowa.dao.StudentDao.selectStudents";
        //执行sql语句， 使用SqlSession类的方法
        List<Student> students  = sqlSession.selectList(sqlId);
        //关闭
        sqlSession.close();
        return students;
    }
```



#### 用动态代理

> 因为DAO接口的全限定名就是`namespace`的名字（自己命名要规范）
>
> 且DAO里的方法名就对应了sql的`id`（自己命名要规范）
>
> 所以可以通过动态代理机制来简化操作
>
> mybatis的动态代理： mybatis根据 dao的方法调用，获取执行sql语句的信息



```java
/**
 * List<Student> studentList  = dao.selectStudents(); 调用
 * 1.dao对象，类型是StudentDao，全限定名称是：com.xiaohuowa.dao.StudentDao
 *   全限定名称 和 namespace 是一样的。
 *
 * 2.方法名称， selectStudents， 这个方法就是 mapper文件中的 id值 selectStudents
 *
 * 3.通过dao中方法的返回值也可以确定MyBatis要调用的SqlSession的方法
 *    如果返回值是List ，调用的是SqlSession.selectList()方法。
 *    如果返回值 int ，或是非List的， 看mapper文件中的 标签是<insert>，<update> 就会调用
 *    SqlSession的insert， update等方法
 *
 *  mybatis的动态代理： mybatis根据 dao的方法调用，获取执行sql语句的信息。
 *     mybatis根据你的dao接口，创建出一个dao接口的实现类， 并创建这个类的对象。
 *     完成SqlSession调用方法， 访问数据库。
 *
 */
```

通过`sqlSession.getMapper(DAO接口.class)`来获取一个Mapper接口的代理对象

```java
@Test
public void testSelectStudents(){
    /**
     * 使用mybatis的动态代理机制， 使用SqlSession.getMapper(dao接口)
     * getMapper能获取dao接口对于的实现类对象。
     */
    SqlSession sqlSession = MyBatisUtils.getSqlSession();
    StudentDao dao  =  sqlSession.getMapper(StudentDao.class);

    //com.sun.proxy.$Proxy2 : jdk的动态代理
    System.out.println("dao="+dao.getClass().getName());
    //调用dao的方法， 执行数据库的操作
    List<Student> students = dao.selectStudents();
    for(Student stu: students){
        System.out.println("学生="+stu);
    }
}
```



### SQL入参

#### :star:参数是个对象

复杂的语法：

`#{属性名,javaType=类型名称,jdbcType=数据类型} `

1. javaType:指java中的属性数据类型。

2. jdbcType:在数据库中的数据类型。

   

例如： `#{paramName,javaType=java.lang.String,jdbcType=VARCHAR}`



简化的语法：

` # {属性名}  `

javaType, jdbcType的值mybatis反射能获取。不用提供



#### :star:参数有多个

```java
/**
 * 多个参数： 命名参数，在形参定义的前面加入 @Param("自定义参数名称")
 */
List<Student> selectMultiParam(@Param("p1") String name,
                               @Param("p2") Integer age);
```

在xml里直接用`#{名字}`就行

```xml
<!--多个参数，使用@Param命名-->
<select id="selectMultiParam" resultType="com.xiaohuowa.domain.Student">
     select id,name, email,age from student where name=#{p1} or age=#{p2}
</select>
```



##### 按位置（不常用）

多个参数-简单类型的，按位置传值，

* **mybatis 3.4**之前，使用 `#{0} ，#{1}`
* **mybatis 3.4**及之后 ，使用` #{arg0} ,#{arg1}`

```xml
<!--多个参数使用位置-->
<select id="selectMultiPosition" resultType="com.xiaohuowa.domain.Student">
      select id,name, email,age from student where
      name = #{arg0} or age=#{arg1}
</select>
```



#### :star::star:入参是Map

> 如果参数有多个的话，封装成map集合更有语义，查询条件更明确
>
> 在SQL语句中占位的写法`#{map的key}`

查询出生日期在范围内的所有数据

~~~java
@Test
public void testGetByMap() throws ParseException {
    Date begin = sf.parse("1999-01-01");
    Date end = sf.parse("1999-12-31");
    Map map = new HashMap<>();
    map.put("birthdayBegin",begin);
    map.put("birthdayEnd", end);
    
    List<Users> list = uMapper.getByMap(map);
    list.forEach(users -> System.out.println(users));
}
~~~

~~~xml
<select id="getByMap" resultType="users" >
    select <include refid="allColumns"></include>
    from users
    where birthday between #{birthdayBegin} and #{birthdayEnd}
</select>
~~~







### #{}和${}

> 如果parameterType的类型是**简单类型**(8种基本(封装)+String),则`#{}/${}`里随便写写啥都行
>
> 如果是实体类的类型,则只能是类中成员**变量的名称**,而且区分大小写

1. 使用 #{}

   - `select * from student where id=#{studentId}`
     - \#{} 的结果： select* from student where **id=?** 

2. 使用 ${}

   - `select id,name, email,age from student where id=${studentId}`

     - ${} 的结果：select * student where **id=1001**

     - 相当于是：String sql="select * from student where id=" + "1001";
     -  使用的Statement对象执行sql， 效率比PreparedStatement低。

#### $的用处 

> \${} :可以**替换表名或者列名**， 能确定数据是安全的。可以使用$
>
> 比如说有两条sql语句，一条是根据姓名进行模糊查询，一条是根据地址进行模糊查询，实际上两条的区别也就在查的列以及模糊的那个参数不同，其它都一样
>
> - 如果在列名的地方用的是 #{} 的话，就会出现列名这个字符串传进占位符的时候带上引号了，会导致sql语法错误，所以列名要用`${}`来占位
> - 在模糊查询的地方可以用[连接函数](# 第三种方式：通过连接函数)带上`#{}`来占位

#### \#{}  和 ${}区别

- #{}
    1. #使用 ？在sql语句中做占位的， 使用**PreparedStatement执行sql**，效率高
    1. #能够避免sql注入，更安全。

- ${}
    3. $不使用占位符，是字符串连接方式，使用**Statement对象执行sql**，效率低
    3. $有sql注入的风险，缺乏安全性。
    3. `$:可以替换表名或者列名`（$的唯一的关键用处）




### SQL返回值

#### 别名

> 如果在两个包里有同名的类的话，都用包扫描的别名的话就会报错
>
> 使用全限定名虽然麻烦但是很精确

在主配置文件中定义别名

```xml
<!--定义别名-->
<typeAliases>
    <!--
        第一种方式：
        可以指定一个类型一个自定义别名
        type:自定义类型的全限定名称
        alias:别名（短小，容易记忆的）
    -->
    <!--<typeAlias type="com.xiaohuowa.domain.Student" alias="stu" />-->

    <!--
      第二种方式
      <package> name是包名， 这个包中的所有类，类名就是别名（类名不区分大小写）
    -->
    <package name="com.xiaohuowa.domain"/>
</typeAliases>
```

在`resultType`内直接用别名或者全限定名即可



#### 返回值是个Map

```java
<!--
    返回Map
    1）列名是map的key， 列值是map的value
    2)只能最多返回一行记录。多余一行是错误
-->
<select id="selectMapById" resultType="java.util.HashMap">
    select id,name,email from student where id=#{stuid}
</select>
```



##### 扩展：返回值是单行的Map

> 通过`xxxMapper.getReturnMap`获取一行map，其中**key为列名或者列别名**

```java
@Tes
public void testReturnMapOne(){
    Map map = uMapper.getReturnMap(3);
    System.out.println(map);
}
```

~~~xml
<select id="getReturnMap" parameterType="int" resultType="map">
    select username nam,address a
    from users
    where id=#{id}
</select>
~~~



##### 扩展：返回值是多行的Map

> 通过`xxxMapper.getMulMap`获取包含多个map（每行在一个map里）的list

~~~java
@Test
public void testReturnMapMul(){
    List<Map> list = uMapper.getMulMap();
    list.forEach(map -> System.out.println(map));
}
~~~

~~~xml
<select id="getMulMap" resultType="map">
    select username,address
    from users
</select>
~~~











#### 模糊查询

##### 第一种方式：通过Java代码中先拼接好模糊查询内容（推荐）

~~~java
<select id="selectLikeOne" resultType="com.小火娃.domain.Student">
    select * from student where name like #{name}
</select>
~~~



##### 第二种方式：在SQL语句中拼接

> 注意：
>
> 在`#{name}`和左右`%`之间的**一个空格必须要！**

~~~java
<select id="selectLikeTwo" resultType="com.xiaohuowa.domain.Student">
    select * from student where name  like "%" #{name} "%"
</select>
~~~



##### 第三种方式：通过连接函数

> 这里`${col}`是一个列名，一定要用$进行占位，才能不带引号传进去
>
> `#{colValue}`用#可以防止sql注入

~~~java
<select id="selectLikeTwo" resultType="com.xiaohuowa.domain.Student">
    select * from student where ${col} like concat('%', #{colValue}, '%')
</select>
~~~





#### 查询列名和实体类属性名不一致

##### 解决方法1：列名取别名

> 将列名取别名为实体属性名



##### 解决方法2：resultMap

`<resultMap>`

1. id
   - id是唯一的
2. type
   - 指定一个返回值类型
3. `<id>`用于主键绑定
   - property是实体类属性
   - column是查询出来的==表的列名或者别名==
4. `<result>`用于非主键绑定
   - property是实体类属性
   - column是查询出来的==表的列名或者别名==

~~~xml
<!--
	使用resultMap手工完成映射
-->
<resultMap id="bookmap" type="book">
    <!--主键绑定-->
    <id property="id" column="bookid"></id>
    <!--非主键绑定-->
    <result property="name" column="bookname"></result>
</resultMap>
<select id="getAll" resultMap="bookmap">
    select bookid,bookname
    from book
</select>
~~~







### 返回主键

#### 通过`<selectKey>`标签获取主键

在插入语句结束后,，返回自增的主键值到入参的users对象的id属性中.

 ~~~java
 <insert id="insert" parameterType="users" >
     <selectKey  keyProperty="id" resultType="int" order="AFTER">
     	select last_insert_id()
     </selectKey>
     insert into users (username, birthday, sex, address) values(#{userName},#{birthday},#{sex},#{address})
 </insert>
 ~~~

 `<selectKey>`标签的参数详解:

1. `keyProperty`: users对象的哪个属性来接返回的主键值
   - 指定POJO类（对象）的哪个属性来接收主键返回值
2. `resultType`:返回的主键的类型
3. `order`:在插入语句执行前,还是执行后返回主键的值
   - BEFORE：如果为BEFORE，那么就会先执行selectKey元素中的配置来设置主键，然后再执行插入语句
   - AFTER：如果为AFTER，那么会先执行插入语句，再执行selectKey元素中的配置来设置主键





### 动态SQL

> 动态sql: sql的内容是变化的，可以根据条件获取到不同的sql语句。（主要是where部分发生变化。）

 动态sql的实现：使用的是mybatis提供的标签， `<if> ,<where>,<foreach>`

#### `<if> `

用来判断条件的，test里写判断

~~~java
<if test="判断java对象的属性值">
	部分sql语句
</if>
~~~



#### `<where>`

用来包含 多个`<if>`的， 当多个if有一个成立的， `<where>`会**自动增加一个where**关键字，并**去掉 if中多余的 and ，or**等。



#### `<set>`

> 有选择的进行更新处理，至少更新一列
>
> 能够保证如果没有传值进来，则数据库中的数据保持不变
>
> ==会自动去掉多余的逗号==

~~~java
<update id="updateBySet" parameterType="users">
    update users
    <set>
        <if test="userName != null and userName != ''">
            username = #{userName},
        </if>
        <if test="birthday != null">
            birthday = #{birthday},
        </if>
        <if test="sex != null and sex != ''">
            sex = #{sex},
        </if>
        <if test="address != null and address != ''">
            address =#{address} ,
        </if>
    </set>
    where id = #{id}
</update>
~~~







#### `<foreach>`

`<foreach>` 循`环java中的数`组，list集合的。 主要用在sql的in语句中。

~~~java
<foreach collection="" item="" open="" close="" separator="">
	#{xxx}
</foreach>
~~~

1. `collection`:表示接口中的方法参数的类型
   -  如果是数组使用array , 如果是list集合使用list，如果是Map集合用map

2. `item`:自定义的，表示数组和集合成员的变量
3. `open`:循环开始是的字符
4. `close`:循环结束时的字符
5. `separator`:集合成员之间的分隔符



##### 批量添加

> 批量的点在插入的values之后n个数据逗号分隔
>
> ==这个操作属于一次执行多条SQL语句，需要在连接JDBC的url后面加上这个**&allowMultiQueries=true** 来允许多条操作==

用List装所有对象，在SQL语句的values后面用foreach遍历list，将每个对象取出并将数据用 #{} 放好

~~~java
<insert id="insertBatch" >
    insert into users(username,birthday,sex,address) values
    <foreach collection="list" separator="," item="u">
        (#{u.userName},#{u.birthday},#{u.sex},#{u.address})
    </foreach>
</insert>
~~~



##### 批量更新

> 批量的点在批量执行n多条update的语句

用List装所有对象，进入更新语句的时候直接上foreach遍历list（注意这里的结束标签是分号，因为sql语句结束是分号结尾），在foreach里面再套进对象的update语句（可以用set+if标签增强健壮性）

~~~java
<update id="updateSet"  >
    <foreach collection="list" item="u" separator=";">
        update users
        <set>
        <if test="u.userName != null  and u.userName != ''">
            username=#{u.userName},
    	</if>
        <if test="u.birthday != null">
            birthday = #{u.birthday},
    	</if>
        <if test="u.sex != null  and u.sex != ''">
            sex = #{u.sex},
    	</if>
        <if test="u.address != null  and u.address != ''">
            address = #{u.address}
    	</if>
        </set>
        where id = #{u.id}
    </foreach>
</update>
~~~



#### sql代码片段

> 可以复用实现SQL代码复用

使用步骤

1. 先定义 `<sql id="自定义名称唯一">  sql语句， 表名，字段等 </sql>`
2. 再通过 `<include refid="id的值" />`把定义的sql语句插入





### 主配置文件

#### 设置日志开启

~~~xml
<!--设置日志输出底层执行的代码-->
<settings>
    <setting name="logImpl" value="STDOUT_LOGGING"/>
</settings>
~~~



#### `<environment>`

```xml
<environment id="mydev">
    <!--
      transactionManager:mybatis提交事务，回顾事务的方式
         type: 事务的处理的类型
             1）JDBC :（将事务控制交给程序员）表示mybatis底层是调用JDBC中的Connection对象的，commit， rollback
             2）MANAGED : （将事务控制交给容器）把mybatis的事务处理委托给其它的容器（一个服务器软件，一个框架（spring））
    -->
    <transactionManager type="JDBC"/>
    <!--
       dataSource:表示数据源，java体系中，规定实现了javax.sql.DataSource接口的都是数据源。
                  数据源表示Connection对象的。

       type:指定数据源的类型
          1）POOLED: 使用连接池， mybatis会创建PooledDataSource类
          2）UPOOLED: 不使用连接池， 在每次执行sql语句，先创建连接，执行sql，在关闭连接
                      mybatis会创建一个UnPooledDataSource，管理Connection对象的使用
          3）JNDI：java命名和目录服务（windows注册表）
    -->
    <dataSource type="POOLED">
        <!--数据库的驱动类名-->
        <property name="driver" value="${jdbc.driver}"/>
        <!--连接数据库的url字符串-->
        <property name="url" value="${jdbc.url}"/>
        <!--访问数据库的用户名-->
        <property name="username" value="${jdbc.user}"/>
        <!--密码-->
        <property name="password" value="${jdbc.passwd}"/>
    </dataSource>
</environment>
```



#### `<properties>`

```xml
<!--指定properties文件的位置，从类路径根开始找文件-->
<properties resource="jdbc.properties" />
```

> 使用的时候直接用`${在properties里的key}`即可



#### `<mappers>`

四种方式（优先级从上到下依次递减）

1. package
2. resource
3. url
4. class

```xml
<!-- sql mapper(sql映射文件)的位置-->
<mappers>
    <!--第一种方式：指定多个mapper文件-->
    <!--<mapper resource="com/bjpowernode/dao/StudentDao.xml"/>
    <mapper resource="com/bjpowernode/dao/OrderDao.xml" />-->

    <!--第二种方式： 使用包名
        name: xml文件（mapper文件）所在的包名, 这个包中所有xml文件一次都能加载给mybatis
        使用package的要求：
         1. mapper文件名称需要和接口名称一样， 区分大小写的一样
         2. mapper文件和dao接口需要在同一目录
    -->
    <package name="com.bjpowernode.dao"/>
   <!-- <package name="com.bjpowernode.dao2"/>
    <package name="com.bjpowernode.dao3"/>-->
</mappers>
```



##### 优先级源码

优先级PRUC

~~~java
private void mapperElement(XNode parent) throws Exception {
    if (parent != null) {
        Iterator var2 = parent.getChildren().iterator();

        while(true) {
            while(var2.hasNext()) {
                XNode child = (XNode)var2.next();
                String resource;
                if ("package".equals(child.getName())) {  // 1.先进行package判断
                    resource = child.getStringAttribute("name");
                    this.configuration.addMappers(resource);
                } else {
                    resource = child.getStringAttribute("resource");
                    String url = child.getStringAttribute("url");
                    String mapperClass = child.getStringAttribute("class");
                    XMLMapperBuilder mapperParser;
                    InputStream inputStream;
                    // 2.判断resource
                    if (resource != null && url == null && mapperClass == null) {
                        ErrorContext.instance().resource(resource);
                        inputStream = Resources.getResourceAsStream(resource);
                        mapperParser = new XMLMapperBuilder(inputStream, this.configuration, resource, this.configuration.getSqlFragments());
                        mapperParser.parse();
                        // 3.判断url
                    } else if (resource == null && url != null && mapperClass == null) {
                        ErrorContext.instance().resource(url);
                        inputStream = Resources.getUrlAsStream(url);
                        mapperParser = new XMLMapperBuilder(inputStream, this.configuration, url, this.configuration.getSqlFragments());
                        mapperParser.parse();
                    } else {  // 4.判断class 
                        if (resource != null || url != null || mapperClass == null) {
                            throw new BuilderException("A mapper element may only specify a url, resource or class, but not more than one.");
                        }

                        Class<?> mapperInterface = Resources.classForName(mapperClass);
                        this.configuration.addMapper(mapperInterface);
                    }
                }
            }

            return;
        }
    }
}
~~~









### 表与表关系

> 一对一配置：`<resultMap> [+ <association>]`
>
> 一对多配置：`<resultMap> + <collection>`
>
> 多对多配置：`<resultMap> + <collection>`
>
> ***\*无论是什么关联关系，如果某方持有另一方的集合，则使用`<collection>`标签完成映射，如果某方持有另一方的对象，则使用`<association>`标签完成映射。\****

#### 一对一



[用法同多对一](# 多对一)



#### 一对多

> 一个客户对应多个订单
>
> 需要通过客户id查到客户，以及与之相关的订单

查询步骤：

1. 在pojo类的一方中加入`List<多方>`属性
2. 在左外连接查询之后用[`resultMap`](# 解决方法2：resultMap)进行映射
3. 写到`List<多方>`属性的映射时使用`<collection>`元素来处理一对多关联关系
   - `<collection>`中`property属性`表示在实体类中`List<多方>`属性的属性名
   - `<collection>`中`ofType属性`表示返回值的类型（也就是多方的全限定名 / 别名）

==注意一个坑：如果用内联查询（inner join）的话，客户没有订单就会导致查完是null。改成左外连接（left join）就可以查出客户信息，没订单就订单部分为null==

（left join是左外连接，从表没数据也会保留主表，写在left join左边的是主表，右边的是从表）

~~~mysql
- left join语法

select xx,yy,zz
from A表 left join B表
on a.id = b.id
where a.id = 1
~~~



实例：

```xml
<mapper namespace="com.小火娃.mapper.CustomerMapper">
   <!--
     //根据客户的id查询客户所有信息并同时查询该客户名下的所有订单
    Customer getById(Integer id)

    实体类:
    //customer表中的三个列
        private Integer id;
        private String name;
        private Integer age;

    //该客户名下的所有订单的集合
    private List<Orders> ordersList;
   -->

    <resultMap id="customermap" type="customer">
        <!--主键绑定-->
        <id property="id" column="cid"></id>
        <!--非主键绑定-->
        <result property="name" column="name"></result>
        <result property="age" column="age"></result>
        <!--多出来的列绑定ordersList
        Orders实体类:
            private Integer id;
            private String orderNumber;
            private Double orderPrice;
        -->
        <collection property="ordersList" ofType="orders">
            <!--主键绑定-->
            <id property="id" column="oid"></id>
            <!--非主键绑定-->
            <result property="orderNumber" column="orderNumber"></result>
            <result property="orderPrice" column="orderPrice"></result>

        </collection>
    </resultMap>

    <select id="getById" parameterType="int" resultMap="customermap">
        select c.id cid,name,age,o.id oid,orderNumber,orderPrice,customer_id
        from customer c left  join orders o on c.id = o.customer_id
        where c.id=#{id}
    </select>
</mapper>
```





#### 多对一

> 一个客户对应多个订单
>
> 需要通过订单id查到订单信息，以及与之关联的客户信息（多对一）

查询步骤：

1. 在pojo类的多方（订单）中加入`”客户方“`的属性
2. 在内联查询之后用[`resultMap`](# 解决方法2：resultMap)进行映射
3. 写到`”客户方“`属性的映射时使用`<association>`元素来处理一对一关联关系
   - `<association>`中`property属性`表示在实体类中`”客户方“`属性的属性名
   - `<association>`中`javaType属性`表示返回值的类型（也就是“客户方”的全限定名 / 别名）



#### 多对多

实际上也是把多对多拆成一对多来写了

~~~xml
<mapper namespace="com.oracle.demo.mapper.BookMapper">
    <resultMap id= " bookmap" type="book">
        <id property="bid" column="bid "></id>
        <result property= " bname " column= "bname "></result><!--关联属性-->
        <collection property="categoryList" ofType="category">
            <id property=" cid " column= " cid "></id>
            <result property= " cname " column="cname "></result>
        </collection>
    </resultMap>
    <select id="findAll" resultMap="bookmap">
        select *
        from book b inner join middle m on b.bid = m.m_bid 
        inner join category c on m.m_cid = c.cid
    </select>
</mapper>

~~~





#### 优化方案：嵌套查询

>  SQL语句分开，查订单的归类到订单mapper里，查客户的归类到客户mapper里

通过在查主表的时候association或者collection里面加上column和select完成

1. column
   - 指定刚才sql查出来的哪个字段要给下面select传进去
2. select
   - 指定一个`namespace.id`的mapper里的sql语句，将上面column的值当入参传进去







### 缓存

![image-20220905194845830](https://s2.loli.net/2023/10/17/LXe8mtwFJc1Vn9Y.png)



1. ` 一级缓存`使用的是`SqlSession的作用域`，同一个sqlSession共享一级缓存的数据
2. `二级缓存`使用的是`mapper的作用域`，不同的sqlSession只要访问的同一个mapper.xml文件,则共享二级缓存作用域

缓存为了提高查询效率

#### 缓存访问过程

1. 执行查询语句，先到缓存找有没有
2. 缓存有就直接返回，缓存没有再去数据库找
3. 去数据库查到之后先给缓存里存一份，再返回
4. 之后只要没有增删改的操作就可以一直用这个缓存，如果有**增删改（commit操作）的话会清空所有缓存**



#### 缓存的开启

##### 一级缓存

一级缓存默认开启



##### 二级缓存

1. 在Mybatis配置文件中加入配置

   - ~~~xml
     <settings>
         <!--设置日志输出底层执行的代码-->
         <setting name="logImpl" value="STDOUT_LOGGING"/>
         <!-- 开启二级缓存 -->
         <setting name="cacheEnabled" value="true"/>
     </settings>
     ~~~

2. 在需要开启缓存的XxxxMapper.xml文件里加入标签

   - ~~~xml
     <?xml version="1.0" encoding="UTF-8" ?>
     <!DOCTYPE mapper PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
             "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
     <mapper namespace="com.小火娃.mapper.XxxxMapper">
         <cache></cache>
     </mapper>
     ~~~

3. 对应实体类实现`java.io.serializable接口`，保证实体可序列化

   - ~~~java
     public class Pojo implements Serializable {}
     ~~~



这样就可以在同个mapper域中共用二级缓存







### PageHelper

用来做数据分页（可以自动在sql后面加上`limit x, y`）

#### 使用方法

一、加入依赖

```xml
<!--PageHelper依赖-->
<dependency>
    <groupId>com.github.pagehelper</groupId>
    <artifactId>pagehelper</artifactId>
    <version>5.1.10</version>
</dependency>
```



二、在主配置文件中配置插件

（在`<environments>`标签上面）

```xml
<!--配置插件-->
<plugins>
    <plugin interceptor="com.github.pagehelper.PageInterceptor" />
</plugins>
```



三、在查询操作之前加入PageHelper方法的调用

```java
@Test
public void testSelectAllPageHelper(){
    SqlSession sqlSession = MyBatisUtils.getSqlSession();
    StudentDao dao  =  sqlSession.getMapper(StudentDao.class);
    //加入PageHelper的方法，分页
    // pageNum: 第几页， 从1开始
    // pageSize: 一页中有多少行数据
    PageHelper.startPage(1,3);
    List<Student> students = dao.selectAll();
    for(Student stu:students){
        System.out.println("foreach--one ==="+stu);
    }
}
```



























































































































## 拓展

### UUID

 这是一个全球唯一随机字符串，由**36个字母数字中划线组成**

`UUID uuid = UUID.randomUUID();`

`System.out.println(uuid.toString().replace("-","").substring(20));`将里面的“-”去掉并截取12位，通过截取后再拼接其他数据（用户id或者时间戳等等）就可以实现获取一个唯一的主键了

> Mysql里也可以获取UUID
>
> `select UUID();`



### 快捷键

#### 查看接口实现类

光标放在接口名上`Ctrl + h`可以查看接口实现类



#### 查看类中所有成员，方法

`alt`



### Mybatis工具类

```java
import org.apache.ibatis.io.Resources;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.ibatis.session.SqlSessionFactoryBuilder;

import java.io.IOException;
import java.io.InputStream;

public class MyBatisUtils {

    private  static  SqlSessionFactory factory = null;
    static {
        String config="mybatis.xml"; // 需要和你的项目中的文件名一样
        try {
            InputStream in = Resources.getResourceAsStream(config);
            //创建SqlSessionFactory对象，使用SqlSessionFactoryBuild
            factory = new SqlSessionFactoryBuilder().build(in);

        } catch (IOException e) {
            e.printStackTrace();
        }
    }


    //获取SqlSession的方法
    public static SqlSession getSqlSession() {
        SqlSession sqlSession  = null;
        if( factory != null){
            sqlSession = factory.openSession();// 非自动提交事务
        }
        return sqlSession;
    }
}
```



### 数据库存DATE

数据库存的时候是DATE类型，在执行DAO插入的时候，要插入一个对应日期，就要用到日期格式刷

> 日期的格式化刷子
> `SimpleDateFormat sf = new SimpleDateFormat("yyyy-MM-dd");`
>
> 在测试对象的时候通过`sf.parse`可以返回一个Date对象
>
> `Users u = new Users(1,"name",sf.parse("2000-01-01"));`





### ORM

#### 是什么

`ORM(Object Relational Mapping)`:对象关系映射

MyBatis框架是ORM非常优秀的框架

java语言中以对象的方式操作数据，存到数据库中是以表的方式进行存储，对象中的成员变量与表中的列之间的数据互换称为映射，整个这套操作就是ORM.

#### ORM操作也可以称为是持久化操作

> 从数据库到对象，从对象到数据库。这种双向的操作都是持久化操作

持久化的操作：将对象保存到关系型数据库中，将关系型数据库中的数据读取出来以对象的形式封装

MyBatis是持久化层优秀的框架



### POM添加资源文件的指定

> 如果mapper是放在java目录下的话，默认编译的时候是不会拷贝java目录下`.xml`文件的，所以要加入以下标签，让java目录下的资源文件也会在编译的时候被拷贝进`classes`目录
>
> - 为什么下面标签不仅指定了java目录，而且还指定了resources目录？
> - 因为如果只指定了一个，另一个就不会拷贝了，所以保险起见都指定上

~~~xml
<!--添加资源文件的指定-->
<build>
    <resources>
        <resource>
            <directory>src/main/java</directory>
            <includes>
                <include>**/*.xml</include>
                <include>**/*.properties</include>
            </includes>
        </resource>

        <resource>
            <directory>src/main/resources</directory>
            <includes>
                <include>**/*.xml</include>
                <include>**/*.properties</include>
            </includes>
        </resource>
    </resources>
</build>
~~~



### mybatis动态代理的规范

1. UsersMapper.xml文件与UsersMapper.java的接口必须**同一个目录下**
2. UsersMapper.xml文件与UsersMapper.java的接口的**文件名必须一致**（后缀不管）
3. UserMapper.xml文件中标签的**id值**与与UserMapper.java的接口中**方法的名称完全一致**
4. UserMapper.xml文件中标签的parameterType属性值与与UserMapper.java的接口中方法的**参数类型完全一致**
5. UserMapper.xml文件中标签的resultType值与与UserMapper.java的接口中方法的**返回值类型完全一致**
6. UserMapper.xml文件中namespace属性必须是接口的**完全限定名称**
7. 在SqlMapConfig.xml文件中注册mapper文件时,使用`class=`接口的**完全限定名称**



































