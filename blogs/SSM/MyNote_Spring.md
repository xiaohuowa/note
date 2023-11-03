# Spring

## bean对象的初始化时机

容器启动时实例化bean对象

#### 获取容器中每个定义的对象的名称

~~~java
//容器中每个定义的对象的名称
String names [] = ac.getBeanDefinitionNames();
for(String name:names){
    System.out.println(name);
}
~~~



## 控制反转（IoC）/依赖注入（DI）

控制反转IoC（Inversion of Control）是一个概念，是一种思想。由Spring容器进行对象的创建和依赖注入，程序员在使用时直接取出使用

依赖注入（Dependency Inject），其实IoC和DI是从不同角度描述同一件事情，DI是IoC的具体的实现技术

- 依赖注入是站在应用程序的角度，依赖IoC容器创建并注入所需资源
- 控制反转是站在IoC容器的角度，IoC容器向应用程序注入其所需要的资源



### 依赖注入类型

> xml和注解的依赖注入的选择：
>
> - 如果经常修改的用xml
>   - 因为值和代码是分开的
> - 不经常修改的用注解

#### 一、构造方法注入

##### 1、通过构造方法参数名称注入

> 注意：`constructor-arg`里面的**name**是构造方法的参数名，不是pojo类的成员变量名

```xml
<!--创建学校的对象,使用构造方法参数名称注入值-->
<bean id="school" class="com.xiaohuowa.pojo.School">
    <constructor-arg name="address" value="厦门市"></constructor-arg>
    <constructor-arg name="name" value="厦门大学"></constructor-arg>
</bean>
```



##### 2、通过构造方法参数下标注入

> 可以颠倒上下写的顺序，只要index没问题就行

~~~xml
<!--创建学生对象,使用构造方法的参数的下标注入值-->
<bean id="student1" class="com.xiaohuowa.pojo.Student">
    <constructor-arg index="1" value="15"></constructor-arg>
    <constructor-arg index="0" value="李四"></constructor-arg>
    <constructor-arg index="2" ref="school"></constructor-arg>
</bean>
~~~



##### 3、通过构造方法的默认参数顺序注入

> 在`constructor-arg`里只指定`value`属性
>
> 每一行的顺序要按照构造方法来，不能变换上下的顺序

~~~xml
<!--创建学生对象,使用默认的构造方法的参数顺序-->
<bean id="student2" class="com.xiaohuowa.pojo.Student">
    <constructor-arg value="张三"></constructor-arg>
    <constructor-arg value="18"></constructor-arg>
    <constructor-arg ref="school"></constructor-arg>
</bean>
~~~







#### 二、setter方法注入

> 用这个方法必须要有属性的`setter方法`和`无参构造`

- 简单数据类型用`value`
- 引用数据类型用`ref`
  - 如果在配置bean的时候给出`autowire="byName"`，就相当于注解的`@Autowired + @Qualifier("名称")`：==[使用名称注入值](# **注解依赖注入**)==，就可以用xml方式自动注入了
    - `autowire="byName"`： java类中引用类型的属性名和spring容器中（配置文件）<bean>的id名称一样，且数据类型是一致的，这样的容器中的bean，spring能够赋值给引用类型。
  - 如果在配置bean的时候给出`autowire="byType"`，就相当于注解的`@Autowired`：==[使用类型注入值](# **注解依赖注入**)==
    - `autowire="byType"`：java类中引用类型的数据类型和spring容器中（配置文件）<bean>的class属性是同源关系的，这样的bean能够赋值给引用类型

~~~xml
<!--创建学校对象-->
<bean id="school" class="com.xiaohuowa.pojo2.School">
    <property name="name" value="厦门大学"></property>
    <property name="address" value="厦门市"></property>
</bean>
<!--创建学生对象-->
<bean id="stu" class="com.xiaohuowa.pojo2.Student" autowire="byName">
    <!-- 简单数据类型用value -->
    <property name="name" value="张三"></property>
    <property name="age" value="18"></property>
    <!-- 引用数据类型用ref -->
    <property name="school" ref="school"></property>
</bean>
~~~





#### 三、基于注解的依赖注入

> 用注解的话首先要在Spring配置文件里添加[包扫描](# 包扫描)
>
> 如果需要引用配置文件的内容的话，可以在spring配置文件中用`<context:property-placeholder location="classpath:xxx.properties" />`来载入，然后引用的地方用`${key}`即可

**注解创建对象**

1. `@Component`:可以创建任意对象
   - 创建的对象的默认名称是类名的小驼峰命名法，也可以**指定对象的名称**`@Component("指定名称")`
2. `@Controller`:专门用来创建控制器的对象(Servlet)（控制器）
   - 这种对象可以接收用户的请求,可以返回处理结果给客户端
3. `@Service`:专门用来创建业务逻辑层的对象（业务层）
   - 负责向下访问数据访问层,处理完毕后的结果返回给界面层
4. `@Repository`:专门用来创建数据访问层的对象（持久层）
   - 负责数据库中的增删改查所有操作



###### **注解依赖注入**

**一、简单类型**（8种基本类型+String）的注入

`@Value`用来给简单类型注入值

1. 写在属性定义的上面

   - 这种方法可以不需要set了

2. 写在set方法上

   - ~~~java
     @Value("30")
     public void setAge(Integer age) {
         System.out.println("setAge:"+age);
         this.age = age;
     }
     ~~~

   - 



**二、引用类型**的注入

> `@Autowired`的属性`required`：
>
> - required ，是一个boolean类型的，默认true
>   - `required=true`：表示引用类型**赋值失败**，程序报错，并**终止执行**。实际使用用true比较好，可以尽早发现错误
>   - `required=false`：引用类型如果**赋值失败**， 程序**正常执行**，引用类型是null

1. `@Autowired`：==使用类型注入值==，从整个Bean工厂中搜索同源类型的对象进行注入

   - 同源类型就是一类是的意思：
     1. 被注入的类型(Student中的school)与注入的类型是**完全相同的类型**
     2. 被注入的类型(Student中的school父)与注入的类型(子)是**父子类**
     3. 被注入的类型(Student中的school接口)与注入的类型(实现类)是**接口和实现类**的类型
   - 注意:在有父子类的情况下，使用按类型注入，就意味着有多个可注入的对象。**（默认先byType）**
     1. 此时按照名称进行二次筛选，选中与被注入对象相同名称的对象进行注入（不行再byName）
     2. 如果二次筛选还是没有的话就抛异常

2. `@Autowired + @Qualifier("名称")`：==使用名称注入值==，从整个Bean工厂中搜索相同名称的对象进行注入

   - 如果有`@Qualifier("名称")`而没有`@Autowired`的话不会报错，但是注入不进去
   - **注意：如果有父子类的情况下，直接按名称进行注入值**

3. `@Resource`

   - 来自jdk中的注解，spring框架提供了对这个注解的功能支持，可以使用它给引用类型赋值

   - 使用的也是自动注入原理，支持byName， byType，**默认是byName**

   - 使用位置：

     -  1.在属性定义的上面，无需set方法，推荐使用。
     - 2.在set方法的上面

   - @Resource只使用byName方式，需要增加一个属性 name（name的值是bean的id（名称））

     




## 组件扫描器包扫描

> 需要用到注解，就得现在Spring配置文件加上注解包扫描标签
>
> ~~~xml
> <!--添加包扫描-->
> <context:component-scan base-package="com.xxx.xxx"></context:component-scan>
> ~~~

### 包扫描三种方式

#### 1、单个包扫描(推荐使用)

~~~xml
<context:component-scan base-package="com.xiaohuowa.controller"></context:component-scan>
<context:component-scan base-package="com.xiaohuowa.service.impl"></context:component-scan>
<context:component-scan base-package="com.xiaohuowa.dao"></context:component-scan>
~~~



#### 2、多个包扫描写一行

多个包之间以**逗号**或**空格**或**分号**分隔

~~~xml
<context:component-scan base-package="com.xiaohuowa.controller,com.xiaohuowa.service ,com.xiaohuowa.dao"></context:component-scan>
~~~



#### 3、直接扫描根包（不推荐）

可能会扫描很多无用的包，会降低容器启动的速度

~~~xml
 <context:component-scan base-package="com.xiaohuowa"></context:component-scan>
~~~





## Spring配置文件的拆分与整合

拆分方式一般是按层拆或者按功能拆

### 一、按层拆分

`applicationContext-controller.xml`里面就包含了各种xxxController的配置

~~~xml
<bean id="uController" class="com.xiaohuowa.controller.UserController">
<bean id="sController" class="com.xiaohuowa.controller.StudentController">
~~~



`applicationContext-service.xml`里面就包含了各种xxxService的配置

~~~xml
<bean id="uService" class="com.xiaohuowa.controller.UserService">
<bean id="sService" class="com.xiaohuowa.controller.StudentService">
~~~



`applicationContext-mapper.xml`里面就包含了各种xxxMapper的配置

   ~~~xml
   <bean id="uMapper" class="com.xiaohuowa.controller.UserMapper">
   <bean id="sMapper" class="com.xiaohuowa.controller.StudentMapper">
   ~~~

​     

  


### 二、按功能拆分

`applicationContext-user.xml`里面就包含了关于user的三层的配置

~~~xml
<bean id="uController" class="com.xiaohuowa.controller.UserController">
<bean id="uService" class="com.xiaohuowa.controller.UserService">
<bean id="uMapper" class="com.xiaohuowa.controller.UserMapper">
~~~





`applicationContext-student.xml`里面就包含了关于student的三层的配置

~~~xml
<bean id="sController" class="com.xiaohuowa.controller.StudentController">
<bean id="sService" class="com.xiaohuowa.controller.StudentService">
<bean id="sMapper" class="com.xiaohuowa.controller.StudentMapper">
~~~





### 整合配置文件

在一个主配置文件里把拆分之后的配置文件整合起来

两种方式：

**1、一个一个文件引入**

- ~~~xml
  <!--批量导入其它配置文件-->
  <import resource="applicationContext-controller.xml"></import>
  <import resource="applicationContext-service.xml"></import>
  <import resource="applicationContext-mapper.xml"></import>
  ~~~



**2、通配方式引入**

> 注意：主的配置文件名称不能包含在通配符的范围内，不然会导致死循环了
>
> 而且用通配符的方式，其他配置文件要放一个目录下，不能直接在resources下，会读取不到

- ~~~xml
  <!--批量导入其它配置文件-->
  <import resource="conf/applicationContext-*.xml"></import>
  ~~~







## AOP

### 动态代理

1. 实现方式：jdk动态代理，使用jdk中的Proxy，Method，InvocaitonHanderl创建代理对象。
   - jdk动态代理要求目标类必须实现接口
2. cglib动态代理：第三方的工具库，创建代理对象，原理是继承。 通过继承目标类，创建子类。子类就是代理对象。 
   - 要求目标类不能是final的， 方法也不能是final的

#### 动态代理的作用：

1. 在目标类源代码不改变的情况下，增加功能。
2. 专注业务逻辑代码
3. 减少代码的重复
4. 解耦合，让业务功能和日志，事务等非业务功能分离。

### AOP是什么

Aop:面向切面编程， 基于动态代理的，可以使用jdk，cglib两种代理方式。
**Aop就是动态代理的规范化**， 把动态代理的实现步骤，方式都定义好了， 
让开发人员用一种统一的方式，使用动态代理。



### 什么时候用AOP

1. 当一个系统中已存在的类的功能还达不到需求时，可以通过AOP技术增强功能
2. 当要给很多类都加上同一个功能的时候
3. 给业务方法增强事务或者日志输出的时候

### AOP常用的术语

1. `切面(Aspect)`:就是那些重复的，公共的，通用的功能称为切面，例如:日志，事务，权限
2. `连接点(JoinPoint)`:就是**目标方法**。因为在目标方法中要实现目标方法的功能和切面功能
3. `切入点(Pointcut)`:指定切入的位置，**多个连接点构成切入点**。切入点可以是一个目标方法，可以是一个类中的所有方法，可以是某个包下的所有类中的方法，表示切面功能执行的位置
4. `目标对象`:操作谁，谁就是目标对象
5. `通知(Advice)`:也叫增强，来指定切入的时机（是在目标方法执行前还是执行后还是出错时，还是环绕目标方法切入切面功能）

### AspectJ

#### 什么是AspectJ

AspectJ 是一个优秀面向切面的框架，它扩展了 Java 语言，提供了强大的切面实现。它因为是基于java语言开发的,所以无缝扩展  easy to learn and use（易学易用）

aspectJ框架实现aop有两种方式：

1. 使用xml的配置文件 ： 配置全局事务
2. 使用注解：在项目中要做aop功能，一般都使用注解， aspectj有5个注解。

#### AspectJ 中常用的通知有五种类型

1. 前置通知`@Before`
2. 后置通知`@AfterReturning`
3. 环绕通知`@Around`
4. 异常后通知`@AfterThrowing`
5. 最终通知`@After`





#### AspectJ 的切入点表达式(掌握)

**规范的公式:**

`execution(访问权限 方法返回值 方法声明(参数) 异常类型)`

**简化后的公式:**

`execution( 方法返回值 方法声明(参数) )`



公式 用到的符号:

`*`：代码任意个任意的字符(通配符)

`..`：如果出现在方法的参数中，则代表任意参数

​			如果出现在路径中，则代表本路径及其所有的子路径





#### AspectJ框架切换JDK动态代理和CGLib动态代理

> 如果只用`<aop:aspectj-autoproxy />`的话，会Spring会根据有没有接口来动态切换JDK动态代理或者CGLib动态代理
>
> 如果想有接口的时候还用CGLib的话才需要改动`proxy-target-class="true"`（代表告诉框架强制使用CGLib，这种方式效率会高一点）

在Spring配置文件里，下面这种方式是**JDK动态代理**，取时必须使用接口类型

~~~xml
<aop:aspectj-autoproxy ></aop:aspectj-autoproxy>
~~~

下面这种是**CGLib动态代理**，可以使用接口和实现类

~~~xml
<aop:aspectj-autoproxy proxy-target-class="true"></aop:aspectj-autoproxy>
~~~





#### AspectJ实现AOP的步骤

```
使用aspectj实现aop的基本步骤：
1.新建maven项目
2.加入依赖
  1）spring依赖
  2）aspectj依赖
  3）junit单元测试
3.创建目标类：接口和他的实现类。
  要做的是给类中的方法增加功能

4.创建切面类：普通类
  1）在类的上面加入 @Aspect
  2）在类中定义方法， 方法就是切面要执行的功能代码
    在方法的上面加入aspectj中的通知注解，例如@Before
    有需要指定切入点表达式execution()

5.创建spring的配置文件：声明对象，把对象交给容器统一管理
  声明对象你可以使用注解或者xml配置文件<bean>
  1)声明目标对象
  2）声明切面类对象
  3）声明aspectj框架中的自动代理生成器标签。
     自动代理生成器：用来完成代理对象的自动创建功能的。

6.创建测试类，从spring容器中获取目标对象（实际就是代理对象）。
  通过代理执行方法，实现aop的功能增强。
```



#### 自动代理生成器

在spring配置文件中声明`<aop:aspectj-autoproxy />`

声明自动代理生成器，使用aspectj框架内部的功能，创建目标对象的代理对象。
创建代理对象是在内存中实现的， 修改目标对象的内存中的结构，创建为代理对象。
所以目标对象就是被修改后的代理对象。
`aspectj-autoproxy`:会把spring容器中的所有的目标对象，一次性都生成代理对象。



#### @Before前置通知

> 在目标方法执行前切入切面功能
>
> 在切面方法中不可以获得目标方法的返回值，只能得到目标方法的签名.



##### 前置通知的切面方法的规范

1. 访问权限是`public`
2. 方法的返回值是`void`
3. 方法名称自定义
4. 方法没有参数，如果有也只能是`JoinPoint类型`
   - `JointPoint`可以获取目标方法的签名和参数
   - ==`JointPoint`可以出现在所有通知的参数中，但是要放第一个==
5. 必须使用`@Before注解`来声明切入的时机是前切功能和切入点
   - 参数:`value`  指定切入点表达式





##### 实现的步骤:

1. 添加依赖

   - ~~~xml
     <dependency>
         <groupId>org.springframework</groupId>
         <artifactId>spring-aspects</artifactId>
         <version>5.2.5.RELEASE</version> 
     </dependency>
     ~~~

2. 创建业务接口

3. 创建业务实现

4. 创建切面类,实现切面方法

5. 在`applicationContext.xml`文件中进行切面绑定（声明自动代理生成器）

   - ~~~xml
     <aop:aspectj-autoproxy ></aop:aspectj-autoproxy>
     ~~~



  项目案例:

~~~JAVA
@Aspect  //交给AspectJ的框架去识别切面类
@Component
public class MyAspect {
    /**
     * 所有切面的功能都是由切面方法来实现的
     * 可以将各种切面都在此类中进行开发
     *
     * 前置通知的切面方法的规范
     * 1)访问权限是public
     * 2)方法的返回值是void
     * 3)方法名称自定义
     * 4)方法没有参数,如果有也只能是JoinPoint类型
     * 5)必须使用@Before注解来声明切入的时机是前切功能和切入点
     *   参数:value  指定切入点表达式
     *
     * 业务方法
     * public String doSome(String name, int age)
     */
    
    // 以下为几种不同的切入点表达式写法
    // 指定详细的
    @Before(value = "execution(public String com.xiaohuowa.s01.SomeServiceImpl.*(String,int))")
    public void myBefore(){
        System.out.println("切面方法中的前置通知功能实现............");
    }

    // 推荐用这种，任意返回值任意参数
    @Before(value = "execution(public * com.xiaohuowa.s01.SomeServiceImpl.*(..))")
    public void myBefore(){
        System.out.println("切面方法中的前置通知功能实现............");
    }

    // 任意返回值，s01包下任意类的任意参数的任意方法
    @Before(value = "execution( * com.xiaohuowa.s01.*.*(..))")
    public void myBefore(JoinPoint jp){
        System.out.println("切面方法中的前置通知功能实现............");
        System.out.println("目标方法的签名:"+jp.getSignature());  // 获取签名
        System.out.println("目标方法的参数:"+ Arrays.toString(jp.getArgs())); // 获取参数
    }
    
    // 任意返回值，s01下任意子包的任意类的任意参数的任意方法
    @Before(value = "execution( * com.xiaohuowa.s01..*(..))")
    public void myBefore(){
        System.out.println("切面方法中的前置通知功能实现............");
    }

    // 任意返回值，任意类的任意参数的任意方法（不推荐这种写法）
    @Before(value = "execution( * *(..))")
    public void myBefore(){
        System.out.println("切面方法中的前置通知功能实现............");
    }
}
~~~





#### @AfterReturning后置通知

##### 后置通知的方法的规范

1. 访问权限是`public`
2. 方法没有返回值`void`
3. 方法名称自定义
4. 方法有参数(也可以没有参数，如果目标方法没有返回值，则可以写无参的方法，但一般会写有参,这样可以处理无参可以处理有参)，这个切面方法的参数就是目标方法的返回值
5. 使用@AfterReturning注解表明是后置通知
6. 注解属性：
   - `value`：指定切入点表达式
   - `returning`：指定目标方法的返回值的名称，这个名称必须与切面方法的参数名称一致.



##### 操作目标方法返回值

后置通知是在目标方法执行后切入切面功能,可以得到目标方法的返回值

- 如果目标方法的返回值是**简单类型(8种基本类型+String)**则==不可改变==
  - 因为后置通知是返回的是void，在其内部对简单类型进行修改的话实际上并不会影响方法正常执行的返回值的
- 如果目标方法的返回值是**引用类型**则==可以改变==
  - 如果是在后置通知里面对引用类型的返回值进行修改，那会影响原方法的执行返回值

~~~java
@Aspect
@Component
public class MyAspect {
    /**
	     * 后置通知的方法的规范
	     * 1)访问权限是public
	     * 2)方法没有返回值void
	     * 3)方法名称自定义
	     * 4)方法有参数(也可以没有参数,如果目标方法没有返回值,则可以写无参的方法,但一般会写有参,这样可以处理无参可以处理有参),这个切面方法的参数就是目标方法的返回值
	     * 5)使用@AfterReturning注解表明是后置通知
	     *   参数:
	     *      value:指定切入点表达式
	     *      returning:指定目标方法的返回值的名称,则名称必须与切面方法的参数名称一致.
	     */
    @AfterReturning(value = "execution(* com.xiaohuowa.s02.*.*(..))",returning = "obj")
    public void myAfterReturning(Object obj){
        System.out.println("后置通知功能实现..............");
        if(obj != null){
            if(obj instanceof String){
                obj = obj.toString().toUpperCase();
                System.out.println("在切面方法中目标方法的返回值:"+obj);
            }
            if(obj instanceof Student){
                Student stu = (Student) obj;
                stu.setName("李四");
                System.out.println("在切面方法中目标方法的返回值:"+stu);
            }
        }
    }
}
~~~







#### @Around环绕通知

它是通过拦截目标方法的方式，在目标方法前后增强功能的通知（经常用作事务处理：目标方法前开启事务，目标方法后提交事务）

它是功能最强大的通知，一般事务使用此通知，它可以轻易的改变目标方法的返回值（因为整个方法是作为参数给它的，在它内部执行完再返回结果出来，所以对返回值的操作是轻而易举的）



##### 环绕通知方法的规范

1. 访问权限是`public`

2. 切面方法有返回值，此`返回值就是目标方法的返回值`

3. 方法名称自定义

4. 方法有参数，此**参数就是目标方法**
   - ==参数为`ProceedingJoinPoint`==（它继承了JoinPoint）

5. 回避异常`Throwable`

6. 使用`@Around注解`声明是环绕通知

7. 注解属性:
   - `value`：指定切入点表达式

     





~~~java
@Aspect
@Component
public class MyAspect {
    /**
     * 环绕通知方法的规范
     * 1)访问权限是public
     * 2)切面方法有返回值,此返回值就是目标方法的返回值
     * 3)方法名称自定义
     * 4)方法有参数,此参数就是目标方法
     * 5)回避异常Throwable
     * 6)使用@Around注解声明是环绕通知
     *   参数:
     *      value:指定切入点表达式
     */

    @Around(value = "execution(* com.xiaohuowa.s03.*.*(..))")
    public Object myAround(ProceedingJoinPoint pjp) throws Throwable {
        //前切功能实现
        System.out.println("环绕通知中的前置功能实现............");
        //目标方法调用
        Object obj = pjp.proceed(pjp.getArgs());
        //后切功能实现
        System.out.println("环绕通知中的后置功能实现............");
        return obj.toString().toUpperCase();  //改变了目标方法的返回值
    }
}
~~~





#### @AfterThrowing异常通知

在目标方法抛出异常时执行，可以做异常的监控程序， 监控目标方法执行时是不是有异常。如果有异常，可以发送邮件，短信等进行通知



##### 异常通知方法的规范

1. 访问权限是`public`
2. 无返回值
3. 方法名称自定义
4. 方法有参数
   1. `Exception`（形参名必须和注解的throwing定义的变量名一致）
   2. （还可以有JoinPoint参数）
5. 使用`@AfterThrowing注解`声明是异常通知
6. 注解属性:
   - `value`：指定切入点表达式
   - `throwing`： 自定义的变量，表示目标方法抛出的异常对象。变量名必须和方法的参数名一样



~~~java
@AfterThrowing(value = "execution(* *..SomeServiceImpl.doSecond(..))",
               throwing = "ex")
public void myAfterThrowing(Exception ex) {
    System.out.println("异常通知：方法发生异常时，执行："+ex.getMessage());
    //发送邮件，短信，通知开发人员
}
~~~









#### @After最终通知

  无论目标方法是否正常执行，最终通知的代码都会被执行

可以理解成**try catch里的**`finally`



##### 最终通知的方法规范

1. 访问权限是``public`
2. 方法**没有返回值**
3. 方法名称**自定义**
4. 方法没有参数，如果有也只能是`JoinPoint`
   - `JoinPoint`可以出现在任何通知中，但是出现了就要在参数列表第一位
5. 使用`@After注解`表明是最终通知
6. 注解属性:
   - `value`:指定切入点表达式



```java
@Aspect
@Component
public class MyAspect {
    /**
     * 最终通知方法的规范
     * 1)访问权限是public
     * 2)方法没有返回值
     * 3)方法名称自定义
     * 4)方法没有参数,如果有也只能是JoinPoint
     * 5)使用@After注解表明是最终通知
     *   参数:
     *     value:指定切入点表达式
     */
    @After(value = "mycut()")
    public void myAfter(){
        System.out.println("最终通知的功能........");
    }
}
```



#### 以上通知注解都可以用的参数JoinPoint

`JoinPoint`：业务方法，要加入切面功能的业务方法

**作用是：**

可以在通知方法中获取方法执行时的信息， 例如方法名称，方法的实参。

**什么时候要加：**

如果切面功能中需要用到方法的信息，就加入JoinPoint（不需要也可以不加）

**参数位置要求**：

这个JoinPoint参数的值是由框架赋予， 必须是第一个位置的参数

#### 绑定多个通知

通知输出的顺序

1. **环绕的前置通知**
2. *前置通知*
3. 业务方法执行
4. **环绕的后置通知**
5. *最终通知*
6. *后置通知*





#### 给切入点表达式起别名

> 在切面类中定义一个空方法，用`@Pointcut`来指定一个切入点表达式
>
> 这个**方法名**就是切入点表达式的**别名**，在其他通知的`value`里直接用`方法名()`即可引用这个切入点表达式



```java
@Aspect
@Component
public class MyAspect {
    
    @Pointcut(value = "execution(* com.xiaohuowa.s04.*.*(..))")
    public void mycut(){}
    
    @After(value = "mycut()")
    public void myAfter(){
        System.out.println("最终通知的功能........");
    }

}
```







## Spring 整合 MyBatis

### 整合步骤

1. 建表
2. 新建项目,选择**quickstart模板**
3. 修改目录
4. 修改pom.xml文件，添加相关的依赖，直接用[这套](# SM整合的POM文件)
5. 添加MyBatis相应的模板(`SqlMapConfig.xml`和`XXXMapper.xml`文件)
   - 因为MyBatis的很多配置都可以被Spring接管，所以只需要创出MyBatis的配置文件放那，然后加入少量配置即可
6. 添加MyBatis核心配置文件，并拷贝jdbc.propertiest属性文件到resources目录下
   - 配置settings
   - 配置别名
   - 配置Dao包扫描
   
7. 添加`applicationContext_mapper.xml`Spring的配置文件（按层拆分）
   - 配置数据源
   - 配置SQLSessionFactory
8. 添加`applicationContext_service.xml`
   - 声明自定义的service

9. 添加Users实体类,Accounts实体类
10. 添加mapper包,添加UsersMapper接口和UsersMapper.xml文件并开发
11. 添加service包,添加UsersService接口和UsersServiceImpl实现类
12. 添加测试类进行功能测试







### SM整合的POM文件

[Spring整合MyBatis](# Spring 整合 MyBatis)

~~~xml
<?xml version="1.0" encoding="UTF-8"?>

<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
  <modelVersion>4.0.0</modelVersion>

  <groupId>com.xiaohuowa</groupId>
  <artifactId>unite_sm</artifactId>
  <version>1.0</version>


  <properties>
    <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
    <maven.compiler.source>1.8</maven.compiler.source>
    <maven.compiler.target>1.8</maven.compiler.target>
  </properties>

  <dependencies>
    <!--单元测试-->
    <dependency>
      <groupId>junit</groupId>
      <artifactId>junit</artifactId>
      <version>4.12</version>
      <scope>test</scope>
    </dependency>
    <!--aspectj依赖-->
    <dependency>
      <groupId>org.springframework</groupId>
      <artifactId>spring-aspects</artifactId>
      <version>5.2.5.RELEASE</version>
    </dependency>
    <!--spring核心ioc-->
    <dependency>
      <groupId>org.springframework</groupId>
      <artifactId>spring-context</artifactId>
      <version>5.2.5.RELEASE</version>
    </dependency>
    <!--做spring事务用到的-->
    <dependency>
      <groupId>org.springframework</groupId>
      <artifactId>spring-tx</artifactId>
      <version>5.2.5.RELEASE</version>
    </dependency>
    <dependency>
      <groupId>org.springframework</groupId>
      <artifactId>spring-jdbc</artifactId>
      <version>5.2.5.RELEASE</version>
    </dependency>
    <!--mybatis依赖-->
    <dependency>
      <groupId>org.mybatis</groupId>
      <artifactId>mybatis</artifactId>
      <version>3.5.6</version>
    </dependency>
    <!--mybatis和spring集成的依赖-->
    <dependency>
      <groupId>org.mybatis</groupId>
      <artifactId>mybatis-spring</artifactId>
      <version>1.3.1</version>
    </dependency>
    <!--mysql驱动-->
    <dependency>
      <groupId>mysql</groupId>
      <artifactId>mysql-connector-java</artifactId>
      <version>5.1.32</version>
    </dependency>
    <!--阿里公司的数据库连接池-->
    <dependency>
      <groupId>com.alibaba</groupId>
      <artifactId>druid</artifactId>
      <version>1.1.12</version>
    </dependency>
  </dependencies>

  <build>
    <!--目的是把src/main/java目录中的xml文件包含到输出结果中。输出到classes目录中-->
    <resources>
      <resource>
        <directory>src/main/java</directory><!--所在的目录-->
        <includes><!--包括目录下的.properties,.xml 文件都会扫描到-->
          <include>**/*.properties</include>
          <include>**/*.xml</include>
        </includes>
      </resource>
      <resource>
        <directory>src/main/resources</directory><!--所在的目录-->
        <includes><!--包括目录下的.properties,.xml 文件都会扫描到-->
          <include>**/*.properties</include>
          <include>**/*.xml</include>
        </includes>
      </resource>
    </resources>
  </build>
</project>

~~~





### SM整合的MyBatis核心配置文件

> 这里只写了setting，其它的配置都在Spring的配置文件里了

[Spring整合MyBatis](# Spring 整合 MyBatis)

~~~xml
<?xml version="1.0" encoding="UTF-8" ?> <!DOCTYPE configuration PUBLIC "-//mybatis.org//DTD Config 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-config.dtd">
<configuration>

    <!--读取属性文件中数据库的配置-->
    <!--<properties resource="db.properties"></properties>-->
    <!--设置日志输出语句,显示相应操作的sql语名-->
    <settings>
        <setting name="logImpl" value="STDOUT_LOGGING"/>
    </settings>
    
    <typeAliases>
        <package name="com.xiaohuowa.pojo"></package>
    </typeAliases>
    
    <!--<environments default="development">-->
        <!--<environment id="development">-->
            <!--<transactionManager type="JDBC"/>-->
            <!--<dataSource type="POOLED">-->
                <!--<property name="driver" value="com.mysql.jdbc.Driver"/>-->
                <!--<property name="url"-->
                          <!--value="jdbc:mysql://localhost:3308/ssm?useSSL=false&amp;serverTimezone=UTC&amp;allowPublicKeyRetrieval=true"/>-->
                <!--<property name="username" value="root"/>-->
                <!--<property name="password" value="123456"/>-->
            <!--</dataSource>-->
        <!--</environment>-->
    <!--</environments>-->
    
    <!--<mappers>-->
        <!--<package name="mapper文件所在的包名"></package>-->
    <!--</mappers>-->
</configuration>
~~~





### SM整合的applicationContext-mapper.xml配置文件

> 很多MyBatis核心配置文件的配置（持久化操作配置）都可以写到这里
>
> 用到了德鲁伊的数据源
>
> 在德鲁伊里可以不写驱动名，会自动根据url来匹配的

[Spring整合MyBatis](# Spring 整合 MyBatis)

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:context="http://www.springframework.org/schema/context"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd http://www.springframework.org/schema/context https://www.springframework.org/schema/context/spring-context.xsd">

    <!--1. 读取属性文件jdbc.properties-->
    <context:property-placeholder location="jdbc.properties"></context:property-placeholder>

    <!--2. 创建数据源-->
    <bean id="dataSource" class="com.alibaba.druid.pool.DruidDataSource">
        <property name="driverClassName" value="${jdbc.driverClassName}"></property>
        <property name="url" value="${jdbc.url}"></property>
        <property name="username" value="${jdbc.username}"></property>
        <property name="password" value="${jdbc.password}"></property>
    </bean>

    <!--3. 配置SqlSessionFactoryBean类-->
    <!--
		声明的是mybatis中提供的SqlSessionFactoryBean类，这个类内部创建SqlSessionFactory的
        相当于：SqlSessionFactory  sqlSessionFactory = new ..
    -->
    <bean id="sqlSessionFactory" class="org.mybatis.spring.SqlSessionFactoryBean">
        <!--配置数据源
        	set注入，把数据库连接池付给了dataSource属性-->
        <property name="dataSource" ref="dataSource"></property>
        <!--配置MyBatis的核心配置文件的位置
            configLocation属性是Resource类型，读取配置文件
            它的赋值，使用value，指定文件的路径，使用classpath:表示文件的位置-->
        <property name="configLocation" value="SqlMapConfig.xml"></property>
        <!--注册实体类的别名，如果在mybatis配置里配置别名了这里也可以不写-->
        <property name="typeAliasesPackage" value="com.xiaohuowa.pojo"></property>
    </bean>

    <!--4. 注册mapper.xml文件-->
    <!--创建dao对象
		相当于：使用SqlSession的getMapper（StudentDao.class）
        MapperScannerConfigurer:在内部调用getMapper()生成每个dao接口的代理对象。
    -->
    <bean class="org.mybatis.spring.mapper.MapperScannerConfigurer">
        <!--指定SqlSessionFactory对象的id-->
        <property name="sqlSessionFactoryBeanName" value="sqlSessionFactory" />
        <!--指定包名， 包名是dao接口所在的包名。
            MapperScannerConfigurer会扫描这个包中的所有接口，把每个接口都执行
            一次getMapper()方法，得到每个接口的dao对象。
            创建好的dao对象放入到spring的容器中的。 dao对象的默认名称是 接口名首字母小写
        -->
        <property name="basePackage" value="com.xiaohuowa.mapper"></property>
    </bean>

------------------------------
    <!--Service部分-->
    <!--声明service(在serviceImpl里要用到Dao的对象，直接用注解也行)-->
    <bean id="studentService" class="com.xiaohuowa.service.impl.StudentServiceImpl">
        <property name="studentDao" ref="studentDao" />
    </bean>
</beans>
```















## 事务

### Spring的两种事务处理方式

#### 1. 注解式的事务

> 如果类中既有查询操作也有增删改操作的话，用注解式的就不方便了（需要对每个方法都指定一遍，因为增删改的readOnly 是false）

使用`@Transactional`注解完成事务控制

- 此注解可添加到类上，则对类中所有方法执行事务的设定
- 此注解可添加到方法上，只是对此方法执行事务的处理
      

#### 2. 声明式事务(必须掌握，重要！)

在配置文件中添加一次，整个项目遵循事务的设定.





### 基于注解的事务添加步骤

一、在`applicationContext-service.xml文件`中添加事务管理器
    ~~~xml
    <bean id="transactionManager" class="org.springframework.jdbc.datasource.DataSourceTransactionManager">
        <!--因为事务必须关联数据库处理,所以要配置数据源-->
        <property name="dataSource" ref="dataSource"></property>
    </bean>
       
    ~~~



二、在`applicationContext-service.xml文件`中添加事务的注解驱动

~~~xml
<tx:annotation-driven transaction-manager="transactionManager"></tx:annotation-driven>
~~~



三、在业务逻辑的实现类上添加注解`@Transactional`(propagation = Propagation.REQUIRED)（可以都不写，全用默认即可）

- 其中REQUIRED表示增删改操作时必须添加的事务传播特性



### 事务管理器

spring处理事务的模型，使用的步骤都是固定的。把事务使用的信息提供给spring就可以了

事务内部提交，回滚事务，使用的事务管理器对象，代替完成commit，rollback



事务管理器是一个接口和他的众多实现类。

- 接口：

`PlatformTransactionManager` ，定义了事务重要方法 `commit ，rollback`

- 实现类：

spring把每一种数据库访问技术对应的事务处理类都创建好了。

mybatis访问数据库---spring创建好的是`DataSourceTransactionManager`

hibernate访问数据库----spring创建的是`HibernateTransactionManager`



- 怎么使用：

需要告诉spring 用的是哪种数据库的访问技术，怎么告诉spring呢？

声明数据库访问技术对于的事务管理器实现类， 在spring的配置文件中使用<bean>声明就可以了

例如，要使用mybatis访问数据库，应该在xml配置文件中

`<bean id=“xxx" class="...DataSourceTransactionManager"> `



### @Transactional注解参数详解

~~~java
@Transactional(propagation = Propagation.REQUIRED,//事务的传播特性
               noRollbackForClassName = "ArithmeticException", //指定发生什么异常不回滚,使用的是异常的名称
               noRollbackFor = ArithmeticException.class,//指定发生什么异常不回滚,使用的是异常的类型
               rollbackForClassName = "",//指定发生什么异常必须回滚
               rollbackFor = ArithmeticException.class,//指定发生什么异常必须回滚
               timeout = -1, //连接超时设置,默认值是-1,表示永不超时
               readOnly = false, //默认是false,如果是查询操作,必须设置为true.
               isolation = Isolation.DEFAULT//使用数据库自已的隔离级别        
              )
~~~





### Spring中事务的五大隔离级别

1. `未提交读(Read Uncommitted)`：允许脏读，也就是可能读取到其他会话中未提交事务修改的数据
2. `提交读(Read Committed)`：只能读取到已经提交的数据。Oracle等多数数据库默认都是该级别 (不重复读)
3. `可重复读(Repeated Read)`：可重复读。在同一个事务内的查询都是事务开始时刻一致的，InnoDB默认级别。在SQL标准中，该隔离级别消除了不可重复读，但是还存在幻象读，但是innoDB解决了幻读
4. `串行读(Serializable)`：完全串行化的读，每次读都需要获得表级共享锁，读写相互都会阻塞
   - 太影响性能了，用得很少
5. **使用数据库默认的隔离级别**`isolation = Isolation.DEFAULT`
   - `MySQL`：mysql默认的事务处理级别是`REPEATABLE-READ`，也就是可重复读
   - Oracle：oracle数据库支持READ COMMITTED 和 SERIALIZABLE这两种事务隔离级别。默认系统事务隔离级别是READ COMMITTED,也就是读已提交

### 为什么添加事务管理器

- `JDBC`:  **Connection**   
  - con.commit();   con.rollback();
- `MyBatis`:  **SqlSession**  
  -  sqlSession.commit();  sqlSession.rollback();
- `Hibernate`:  **Session**    
  - session.commit();   session.rollback();

事务管理器用来生成`相应技术的连接+执行语句的对象`
如果使用MyBatis框架,必须使用`DataSourceTransactionManager类`完成处理

```xml
<bean id="transactionManager" class="org.springframework.jdbc.datasource.DataSourceTransactionManager">
    <!--因为事务必须关联数据库处理,所以要配置数据源-->
    <property name="dataSource" ref="dataSource"></property>
</bean>
```



  ==项目中的所有事务，必须添加到业务逻辑层上==



### 事务提交事务，回滚事务的时机

- 当业务方法，执行成功
  - 没有异常抛出，当方法执行完毕，spring在方法执行后提交事务。事务管理器commit	 

- 当业务方法抛出**运行时异常**或ERROR， spring执行回滚，调用事务管理器的**rollback**
  - 运行时异常的定义： RuntimeException  和他的子类都是运行时异常， 例如NullPointException , NumberFormatException

- 当业务方法抛出非运行时异常， 主要是**受查异常**时，**提交事务**
  - 受查异常：在写代码过程中，必须处理的异常。例如IOException, SQLException









### Spring事务的传播特性

多个事务之间的合并,互斥等都可以通过设置事务的传播特性来解决.

常用

1. `PROPAGATION_REQUIRED`：必被包含事务(增删改必用)（默认）
2. `PROPAGATION_REQUIRES_NEW`：自己新开事务，不管之前是否有事务
3. `PROPAGATION_SUPPORTS`：支持事务，如果加入的方法有事务，则支持事务，如果没有，不单开事务
4. `PROPAGATION_NEVER`：不能运行中事务中，如果包在事务中，抛异常
5. `PROPAGATION_NOT_SUPPORTED`：不支持事务，运行在非事务的环境

不常用

1. `PROPAGATION_MANDATORY`：必须包在事务中，没有事务则抛异常
2. `PROPAGATION_NESTED`：嵌套事务







#### 不同事务传播行为间的影响

> 下面这个案例从UserService里面执行User插入方法后调用AccountService的插入方法方法，通过不同事务传播行为来看最后插入是否成功

![image-20220910102059789](https://s2.loli.net/2023/10/17/PDLa9MlZreVUOsw.png)






### :star:声明式事务

Spring非常有名的事务处理方式：声明式事务.

要求项目中的方法命名有规范（这样可以通过通配方法名的方式，通过AOP来将事务切入方法）

1. 完成增加操作包含    add  save  insert  set
2. 更新操作包含   update   change  modify
3. 删除操作包含   delete   drop    remove  clear
4. 查询操作包含   select   find    search  get 



配置事务切面时可以使用`通配符*`来匹配所有方法

```xml
<!--1.添加事务管理器-->
<bean id="transactionManager" class="org.springframework.jdbc.datasource.DataSourceTransactionManager">
    <property name="dataSource" ref="dataSource"></property>
</bean>

<!--2.配置事务切面-->
<tx:advice id="myadvice" transaction-manager="transactionManager">
    <tx:attributes>
        <!--查询操作有关的都设置只读事务-->
        <tx:method name="*select*" read-only="true"/>
        <tx:method name="*find*" read-only="true"/>
        <tx:method name="*search*" read-only="true"/>
        <tx:method name="*get*" read-only="true"/>
        <!--增删改操作有关的都设置 REQUIRED 事务-->
        <!--在注解的时候可以配的参数在这里也能配，比如：no-rollback-for-->
        <tx:method name="*insert*" propagation="REQUIRED" no-rollback-for="ArithmeticException"/>
        <tx:method name="*add*" propagation="REQUIRED"/>
        <tx:method name="*save*" propagation="REQUIRED"/>
        <tx:method name="*set*" propagation="REQUIRED"/>
        <tx:method name="*update*" propagation="REQUIRED"/>
        <tx:method name="*change*" propagation="REQUIRED"/>
        <tx:method name="*modify*" propagation="REQUIRED"/>
        <tx:method name="*delete*" propagation="REQUIRED"/>
        <tx:method name="*remove*" propagation="REQUIRED"/>
        <tx:method name="*drop*" propagation="REQUIRED"/>
        <tx:method name="*clear*" propagation="REQUIRED"/>
        <tx:method name="*" propagation="SUPPORTS"/>
    </tx:attributes>
</tx:advice>

<!--3.绑定切面和切入点-->
<aop:config>
    <!--配置切入点表达式：指定哪些包中类，要使用事务
            id:切入点表达式的名称，唯一值
            expression：切入点表达式，指定哪些类要使用事务，aspectj会创建代理对象
        -->
    <aop:pointcut id="mycut" expression="execution(* com.xiaohuowa.service.impl.*.*(..))"></aop:pointcut>
    
    <!--配置增强器：关联adivce和pointcut
           advice-ref:通知，上面tx:advice哪里的配置
           pointcut-ref：切入点表达式的id
        -->
    <aop:advisor  advice-ref="myadvice" pointcut-ref="mycut"></aop:advisor>
</aop:config>
```



### xml配置和注解配置并行的优先级

有可能在项目中配了xml的service全局方法事务，但是在某些方法里想有自己的事务，就可以在那个位置用[注解](# @Transactional注解参数详解)方式来指定事务

一、先在xml配置文件中开启注解事务

- 通过`order`来指定有衔接

~~~xml
<!--开启注解事务-->
<tx:annotation-driven order="666"></tx:annotation-driven>
~~~



二、在绑定切面和切入点的时候也给一个`order`，这样就指定了注解的优先级更高

```xml
<!--绑定切面和切入点-->
<aop:config>
    <aop:pointcut id="mycut" expression="execution(* com.xiaohuowa.service.impl.*.*(..))"></aop:pointcut>
    <aop:advisor order="1" advice-ref="myadvice" pointcut-ref="mycut"></aop:advisor>
</aop:config>
```







## Spring在web项目的监听器

web项目是在tomcat服务器上运行的。 tomcat一启动，项目一直运行的。在项目运行过程中容器对象只需要创建一次，  把容器对象放入到全局作用域ServletContext中即可

要做到以上效果要使用监听器 当全局作用域对象被创建时 创建容器 存入ServletContext

### 监听器作用：

1. 创建容器对象，执行 `ApplicationContext app = new ClassPathXmlApplicationContext("applicationContext.xml");`
2. 把容器对象放入到ServletContext，即 `ServletContext.setAttribute(key, app)`





### 使用现成的监听器

> 监听器可以自己写，也可以使用框架中提供好的`ContextLoaderListener`





### 使用步骤

一、在web.xml中注册监听器

```xml
<!--注册监听器ContextLoaderListener
    监听器被创建对象后，会读取/WEB-INF/spring.xml
    为什么要读取文件：因为在监听器中要创建ApplicationContext对象，需要加载配置文件。
    /WEB-INF/applicationContext.xml就是监听器默认读取的spring配置文件路径

    可以修改默认的文件位置，使用context-param重新指定文件的位置


    配置监听器：目的是创建容器对象，创建了容器对象， 就能把spring.xml配置文件中的所有对象都创建好。
    用户发起请求就可以直接使用对象了。
-->
<context-param>
    <!-- contextConfigLocation:表示配置文件的路径  -->
    <param-name>contextConfigLocation</param-name>
    <!--自定义配置文件的路径-->
    <param-value>classpath:spring.xml</param-value>
</context-param>
<listener>
    <listener-class>org.springframework.web.context.ContextLoaderListener</listener-class>
</listener>
```



二、获取容器对象（这步可以省略，因为可以直接从容器中拿对象了）

```java
WebApplicationContext app = null;
//使用框架中的方法，获取容器对象
ServletContext sc = getServletContext();
app = WebApplicationContextUtils.getRequiredWebApplicationContext(sc);
```



# 拓展

## Bean的创建生命周期

1. UserService类
2. 调用构造方法
   - 如果既有有参又有无参，默认调用无参
   - 如果没有无参，只有一个有参，就会调用有参
     - 这个参数Spring会去Spring容器里找，先byType再byName
       - 如果根据参数类型去单例池（Map<BeanName，Bean对象>）中匹配value有没有这个类型的对象，找到唯一一个的话就用那个。如果找到不止一个（单例不是说一个类只有一个对象，不是说单例模式，而是叫一个名字的类对象只会创建一个）的话就继续根据参数名来匹配，如果参数名匹配到了就用那个，如果没匹配到就报错
   - 如果有多个有参，且没有一个有参有@Autowired注解的话也会报错，有的话就用那个有参
3. 普通对象
4. 依赖注入
5. 初始化前(@PostConstruct)
   - （判断有没有方法撒上带了这个注解）
6. 初始化(InitializingBean)
   - （判断类是不是实现了InitializingBean接口，实现了的话就执行afterPropertiesSet()方法）
7. 初始化后(AOP)
8. 代理对象
9. 放入单例池Map（如果不需要AOP的话，就是普通对象进单例池；有aop就代理对象进单例池，普通对象只在JVM里）
10. Bean







## 快捷键

`接口.方法()`如果只按住ctrl然后点进方法的话是去接口里的方法

如果按住`Ctrl + Alt`再点的话会进实现类里



`alt + insert`可以新建文件



## Java继承

子类继承了父类，在子类的构造方法执行时**一定会执行父类的无参构造**

如果父类没有无参构造方法的话，必须用`super(xxx)`来显示地调用父类的有参构造

















































































































































































































