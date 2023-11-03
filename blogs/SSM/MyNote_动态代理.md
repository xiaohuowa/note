## 动态代理

### JDK动态代理

1. 目标对象必须实现业务接口
2. JDK代理对象不需要实现业务接口
3. JDK动态代理的对象在程序运行前不存在.在程序运行时动态的在内存中构建
4. JDK动态代理灵活的进行业务功能的切换
5. **本类中的方法(非接口中的方法)不能被代理**

### 分类

1. JDK动态代理
   - 必须有接口，目标类必须实现接口

2. CGLib动态代理
   - 没有接口时，需要使用cglib动态代理




### 什么是动态代理

 基于反射机制，使用jdk的反射机制，创建对象的能力， 创建的是代理类的对象。 而不用你创建类文件。不用写java文件。
**动态**：在程序执行时，调用jdk提供的方法才能创建代理类的对象。



### 动态代理能做什么 

> 静态代理实现了目标对象的灵活切换
>
> 动态代理实现了目标对象实现的业务功能的灵活增加
>
> - 在静态代理中如果改变了业务功能，那么目标对象要改变、代理也要改变
> - 而用了动态代理就不用改变代理类了，只需要变目标对象即可（如果接口方法用的是default的话，那就可以需要哪个目标对象变就让哪个目标）

可以在不改变原来目标方法功能的前提下， 可以在代理中增强自己的功能代码。





### 代理

#### 现实中的代理

  代购， 中介，换ip，商家等等

#### 举个例子：

比如有一家美国的大学， 可以对全世界招生。

- 留学中介（代理）： 帮助这家美国的学校招生，  中介是学校的代理， 中介是代替学校完成招生功能。

- 中介和代理他们要做的事情是一致的：  招生。 
  （中介是学校代理， 学校是目标。）

- 家长 ---> 中介（学校介绍，办入学手续）----> 美国学校。
  中介是代理，不能白干活，需要收取费用（增强）。

- 代理不让你访问到目标。

#####  为什么要找中介 ？ 

   1. 中介是专业的， 方便
   2. 家长现在不能自己去找学校。 家长没有能力访问学校。 或者美国学校不接收个人来访。

买东西都是商家卖， 商家是某个商品的代理， 你个人买东西， 肯定不会让你接触到厂家的。

##### 开发中的情况

在开发中也会有这样的情况， 现在有个A类，想调用C类的方法，但C不让A调用，但是可以给B调用，所以A需要找B来间接调用C的方法



### 使用代理模式的作用

1. **功能增强：** 在你原有的功能上，增加了额外的功能。 新增加的功能，叫做功能增强。
2. **控制访问：** 代理类不让你访问目标，例如商家不让用户访问厂家。 

### 实现代理的方式

#### 静态代理

##### 是什么

1. 代理类是自己手工实现的，自己创建一个java类，表示代理类。
2. 同时你所要代理的目标类是确定的。

##### 特点

1. 实现简单
2. 容易理解。

##### 缺点

1. 当目标类增加了， 代理类可能也需要成倍的增加。 代理类数量过多。
2. 当你的接口中功能增加了， 或者修改了，会影响众多的实现类，厂家类，代理都需要修改。影响比较多。



##### 静态代理代码		  

###### 需求：

模拟租客租房，租客只能通过中介租房，中介收取500元手续费

###### 步骤：

1. 创建接口定义出租房屋方法，代表中介和房东都要做的事（出租房屋）
2. 创建房东类实现接口，重写出租房屋方法
3. 创建中介类（代理）实现接口，重写出租房屋方法
   - 在方法中实例化房东，调用房东的出租房屋方法，获取租金后加价五百返回
4. 创建租客类，实例化中介，调用中介的出租房屋方法，获得的就是中介已经加价过的价格



###### 代码：

一、共用接口

```java
/**
 * @author 小火娃
 * @project_name: dynamic
 * @package_name: com.xiaohuowa.static_proxy.service
 */
public interface DoSth {

    /**
     * 出租房子
     * @param months 租几个月
     * @return 返回租金
     */
    Integer rent(Integer months);

}
```

二、房东类

```java
/**
 * @author 小火娃
* @project_name: dynamic
* @package_name: com.xiaohuowa.static_proxy
 * 房东类
*/
public class Landlord implements DoSth {
    @Override
    /**
     * 房东出租房子，一个月1000元
     */
    public Integer rent(Integer months) {
        int money = 1000;
        return money * months;
    }
}
```

三、中介类

```java
/**
 * @author 小火娃
 * @project_name: dynamic
 * @package_name: com.xiaohuowa.static_proxy
 * 中介类
 */
public class Intermediary implements DoSth {
    @Override
    public Integer rent(Integer months) {

        // 中介手动new个房东
        Landlord landlord = new Landlord();
        // 获取房东的租金数额
        Integer money = landlord.rent(months);

        // 中介收500中介费
        money += 500;

        return money;
    }
}
```

四、租客类

```java
/**
 * @author 小火娃
 * @project_name: dynamic
 * @package_name: com.xiaohuowa.static_proxy
 * 租户类
 */
public class Tenant {
    public static void main(String[] args) {
        // 租户找中介租房
        Intermediary intermediary = new Intermediary();
        Integer money = intermediary.rent(1);

        System.out.println("通过中介租一个月房需要 " + money + " 元"  );  // 通过中介租一个月房需要 1500 元
    }
}
```

#### 动态代理  

##### 避免静态代理的缺点

动态代理中目标类即使很多也可以做到

1. 代理类数量可以很少
2. 当修改了接口中的方法时，不会影响代理类。
       



 动态代理： 在程序执行过程中，使用jdk的反射机制，创建代理类对象， 并动态的指定要代理目标类。

换句话说： 动态代理是一种创建java对象的能力，让你不用创建代理类，就能创建代理类对象。

在java中，要想创建对象：

- 创建类文件， java文件编译为class
- 使用构造方法，创建类的对象。



##### 了解CGLib

cglib动态代理（了解）: cglib是第三方的工具库， 创建代理对象。**没接口用CGLib**

cglib的原理是继承， cglib通过继承目标类，创建它的子类，在子类中重写父类中同名的方法， 实现功能的修改。

因为cglib是继承，重写方法，所以要求目标类不能是final的， 方法也不能是final的。

cglib的要求目标类比较宽松， 只要能继承就可以了。cglib在很多的框架中使用， 比如 mybatis ，spring框架中都有使用。

CGLib效率高于JDK



##### 掌握JDK动态代理

> 使用Java反射包中的类和接口实现动态代理的功能。

反射包` java.lang.reflect `, 里面有三个类 ：` InvocationHandler` , `Method,` `Proxy`

反射中的 Method类，表示方法（类中的方法）。 通过Method可以执行某个方法。

###### jdk动态代理的实现

###### 实现动态代理的步骤：

1. 创建接口，定义目标类要完成的功能

2. 创建目标类实现接口

3. 创建`InvocationHandler接口`的实现类，在`invoke方法`中完成代理类的功能

   - 调用目标方法

   - 增强功能

4. 使用**`Proxy类`的静态方法**，创建代理对象。 并把**返回值转为接口类型**。

###### 一、InvocationHandler 接口

> `InvocationHandler 接口`（调用处理器）：**就一个方法`invoke（）`**

invoke（）:**表示代理对象要执行的功能代码**。代理类要完成的功能就写在invoke()方法中。

代理类要完成什么功能？

- 调用目标方法，执行目标方法的功能
- 功能增强，在目标方法调用时，增加功能



`invoke()方法`参数： 

1. Object proxy:jdk创建的代理对象，无需赋值。
2. Method method:目标类中的方法，jdk提供method对象的
3. Object[] args：目标类中方法的参数， jdk提供的。

~~~java
public Object invoke(Object proxy, Method method, Object[] args)
~~~



==用法：==

1. 创建类实现接口`InvocationHandler`
2. 重写`invoke（）`方法， 把原来静态代理中代理类要完成的功能，写在这。



###### 二、Method类

> Method类表示目标类中的方法。

==作用：==

通过Method可以执行某个目标类的方法

这个`invoke`和上面InvocationHandler 的不是同一个

`Method.invoke();method.invoke(目标对象，方法的参数)`

相当于：`Object ret = method.invoke(方法名, 实参);`

 说明： method.invoke（）就是用来执行目标方法的，等同于静态代理中的
		         //向厂家发送订单，告诉厂家，我买了u盘，厂家发货
              float price = factory.sell(amount); //厂家的价格。

   

###### 三、Proxy类

核心的对象，创建代理对象。之前创建对象都是 new 类的构造方法()，现在是使用Proxy类的方法，**代替new**的使用。 

Proxy类里面的方法： 静态方法 `newProxyInstance() `
==作用是：==

- 创建代理对象， 等同于静态代理中的 TaoBao taoBao = new TaoBao();



==`newProxyInstance`参数：==

1. `ClassLoader loader 类加载器`，负责向内存中加载对象的。 使用反射获取对象的ClassLoader类a , a.getCalss().getClassLoader(),  目标对象的类加载器
2. `Class<?>[] interfaces`： 接口， 目标对象实现的接口，也是反射获取的。
3. `InvocationHandler h` : 自己写的，代理类要完成的功能。 



==返回值==

- 就是代理对象

~~~java
public static Object newProxyInstance(ClassLoader loader,
                                  Class<?>[] interfaces,
	                                  InvocationHandler h)
~~~



###### 动态代理代码

==需求：==

模拟租客租房，租客只能通过中介租房，中介收取500元手续费

==步骤：==

1. 创建接口定义出租房屋方法，代表中介和房东都要做的事（出租房屋）
2. 创建房东类实现接口，重写出租房屋方法
3. 创建一个`InvocationHandler接口`的实现类
   - 在这个类中给一个目标对象（这里是房东）赋值（用构造方法或者setter都行），传进来哪个对象，就给哪个对象创建代理
   - 重写`invoke`方法，在方法里调用目标对象（这里是房东）的出租方法，并进行加价500元操作
4. 创建租客类，实例化一个目标对象（这里是房东）。再实例化刚才实现了`InvocationHandler接口`的实现类
   - 通过`Proxy`的静态方法`newProxyInstance`创建代理对象，返回值强转为借口（目标对象实现的接口）
   - 通过返回的接口执行对应方法获取租金金额



==代码==

一、共用接口

```java
/**
 * @author 小火娃
 * @project_name: dynamic
 * @package_name: com.xiaohuowa.dynamic_proxy.service
 */
public interface DoSth {
    Integer rent(Integer months);
}						
```



二、房东类

```java
/**
 * @author 小火娃
* @project_name: dynamic
* @package_name: com.xiaohuowa.dynamic_proxy
*/
public class Landlord implements DoSth {
    @Override
    public Integer rent(Integer months) {
        int money = 1000;
        return money * months;
    }
}
```



三、`InvocationHandler接口`的实现类

```java
/**
 * @author 小火娃
 * @project_name: dynamic
 * @package_name: com.xiaohuowa.dynamic_proxy
 */
public class MyProxy implements InvocationHandler {

    private Object target;

    // 动态代理，传进来哪个对象，就给哪个对象创建代理
    MyProxy(Object target) {
        this.target = target;
    }


    @Override
    public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {
        Object result = null;
        // 1. 调用目标方法
        result = method.invoke(target, args);

        // 2. 中介加价
        if (result != null) {
            Integer money = (Integer) result;
            money += 500;
            result = money;
        }

        // 3. 返回中介加价后的价格
        return result;
    }
}
```



四、租客类

```java
/**
 * @author 小火娃
 * @project_name: dynamic
 * @package_name: com.xiaohuowa.dynamic_proxy
 * 租户类
 */
public class Tenant {
    public static void main(String[] args) {

        // 1. 创建目标对象（多态）
        DoSth landlord = new Landlord();

        // 2. 创建InvocationHandler对象。传入的是房东，就是为房东做动态代理
        MyProxy myProxy = new MyProxy(landlord);

        // 3. 创建代理对象（强转为借口）
        // 为什么可以强转为借口？因为目标对象 landlord 实际上实现了这个借口
        DoSth doSth = (DoSth) Proxy.newProxyInstance(landlord.getClass().getClassLoader(), landlord.getClass().getInterfaces(), myProxy);

        // 4. 通过代理执行方法
        Integer money = doSth.rent(2);

        System.out.println("通过动态代理中介租2个月房需要 " + money + " 元"  );
    }
}
```







#### 动态代理写法二（写个工具类）

1. 先给出接口，定义目标类和代理类都要完成的方法
2. 给出目标类实现接口
3. 写一个代理工具类
   - 这个类通过构造方法动态接受一个对象，传进来哪个对象就为哪个对象创建动态代理
   - 给工具类写一个返回动态代理对象的方法
     - 返回`Proxy.newProxyInstance`
     - 第三个参数（InvocationHandler）用匿名内部实现来直接new一个InvocationHandler接口的实现类，重写里面的invoke方法，在invoke方法里调用目标类的方法，并进行一些增强
       - 这个匿名内部实现返回的是目标方法的返回值
4. 写测试类
   - 直接实例化代理工具类，同时传入要代理的目标对象，获取代理工具类实例
   - 执行代理工具类实例获取代理对象，并将其强转为接口（不强转则为Object，后续不能调用方法）
   - 用`代理对象.方法`直接进行调用即可



##### 代码

###### 一、房东类（目标对象）

```java
package com.xiaohuowa.dynamic_proxy;

import com.xiaohuowa.dynamic_proxy.service.DoSth;

/**
 * @author 小火娃
* @project_name: dynamic
* @package_name: com.xiaohuowa.dynamic_proxy
*/
public class Landlord implements DoSth {
    @Override
    public Integer rent(Integer months) {
        int money = 1000;
        return money * months;
    }
}
```



###### 二、房东和中介都要完成的动作（接口）

```java
package com.xiaohuowa.dynamic_proxy.service;

/**
 * @author 小火娃
 * @project_name: dynamic
 * @package_name: com.xiaohuowa.dynamic_proxy.service
 */
public interface DoSth {
    Integer rent(Integer months);
}
```



###### 三、动态代理工具类

```java
package com.xiaohuowa.dynamic_proxy.proxy;

import java.lang.reflect.InvocationHandler;
import java.lang.reflect.Method;
import java.lang.reflect.Proxy;

/**
 * @author 小火娃
 * @project_name: dynamic
 * @package_name: com.xiaohuowa.dynamic_proxy.proxy
 */
public class ProxyFactory {

    private Object target = null;

    // 传入哪个对象就为哪个对象创建动态代理对象
    public ProxyFactory(Object target) {
        this.target = target;
    }

    public Object getAgent(){
        // 返回动态代理对象
        return Proxy.newProxyInstance(target.getClass().getClassLoader(),  // 类加载器，完成目标对象的加载
                target.getClass().getInterfaces(),  // 目标对象实现的所有接口
                // InvocationHandler 实现动态代理功能的接口，在这里传入匿名内部实现
                new InvocationHandler() {
                    @Override
                    public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {
                        // 获取房东的收租金额
                        Integer money = (Integer) method.invoke(target, args);
                        // 代理（中介）加收手续费（代理功能）
                        money += 500;
                        // 后置增强（代理功能）
                        System.out.println("动态代理执行");
                        // 返回目标对象的方法返回值
                        return money;
                    }
                });
    }
}

```



###### 四、测试类（租客租房）

```java
package com.xiaohuowa.dynamic_proxy;

import com.xiaohuowa.dynamic_proxy.proxy.ProxyFactory;
import com.xiaohuowa.dynamic_proxy.service.DoSth;

/**
 * @author 小火娃
 * @project_name: dynamic
 * @package_name: com.xiaohuowa.dynamic_proxy
 */
public class Test {
    public static void main(String[] args) {
        // 实例化工具类并传入目标对象
        ProxyFactory proxy = new ProxyFactory(new Landlord());
        // 转为接口方便后续调用方法
        DoSth agent = (DoSth) proxy.getAgent();
        // 通过动态代理对象调用方法
        Integer rent = agent.rent(10);

        System.out.println("租十个月要 " + rent + "元");
        // 动态代理执行
		// 租十个月要 10500元
    }
}
```















