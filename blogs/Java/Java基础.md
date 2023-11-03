

## String

在JDK当中双引号括起来的字符串，例如："abc" "def"都是直接存储在`“方法区”`的`“字符串常量池”`当中的。

在Java中有双引号括起来的一定是String对象，一定会在字符串常量池中有一个空间

==注意：==垃圾回收器是不会回收常量的



~~~java
String s = "a";  // 在栈中有个s变量，字符串常量池有一个"a"字符串对象
String b = new String("a");  // 和上面这个区别是在堆中还new了一个String对象，存的引用指向方法区中的"a"
~~~









## StringBuffer

### 频繁拼接字符串问题

因为Java中的字符串是不可变的，每一次拼接都会产生新字符串。这样会占用大量的方法区内存。造成内存空间的浪费。



### 底层

- `String` 的底层是个被`final`修饰的byte数组，因此当指定了它的引用之后就不能再指向其他数组了
- `StringBuffer` 的底层是没有被final修饰的byte数组，在默认初始化的时候会给16的初始长度，如果长度不够了会自动调用`Arrays.copyOf`（`System.arraycopy`）进行数组拷贝



### 优化频繁拼接字符串问题

建议使用JDK自带的：

*      `java.lang.StringBuffer`
*      `java.lang.StringBuilder`



### 如何优化它们的性能？

**关键点：给一个合适的初始化容量。可以提高程序的执行效率。**

* 在创建`StringBuffer`的时候尽可能给定一个初始化容量。

* 最好减少底层数组的扩容次数。预估计一下，给一个大一些初始化容量。

  

### ==面试题==

```
1、面试题：String为什么是不可变的？
    我看过源代码，String类中有一个byte[]数组，这个byte[]数组采用了final修饰，
    因为数组一旦创建长度不可变。并且被final修饰的引用一旦指向某个对象之后，不
    可再指向其它对象，所以String是不可变的！
        "abc" 无法变成 "abcd"

2、StringBuilder/StringBuffer为什么是可变的呢？
    我看过源代码，StringBuffer/StringBuilder内部实际上是一个byte[]数组，
    这个byte[]数组没有被final修饰，StringBuffer/StringBuilder的初始化
    容量我记得应该是16，当存满之后会进行扩容，底层调用了数组拷贝的方法
    System.arraycopy()...是这样扩容的。所以StringBuilder/StringBuffer
    适合于使用字符串的频繁拼接操作。
```

==注意==

~~~java
String s = "abc";
s = "abcd";
~~~

字符串的“不可变”，说的不是s的引用不能指向其他字符串！而是因为String底层的byte数组是final修饰的，这个byte数组