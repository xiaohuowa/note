# IO

> 输入输出都是对`内存`而言的

![image-20220810233842361](https://s2.loli.net/2023/10/12/w8aJ9ZGBbRo4uYr.png)



## 流的分类

> 输入流、输出流、字节流、字符流
>
> ==Stream结尾的都是字节流，Writer结尾的都是字符流==

### 输入流：

以内存作为参照物，往内存中去，叫做输入(Input)。或者叫做读(Read)。

### 输出流：

以内存作为参照物，从内存中出来，叫做输出(Output)。或者叫做写(Write)。

### 字节流

按照字节的方式读取数据，一次读取1个字节byte，等同于==一次读取8个二进制位==。
这种流是万能的，什么类型的文件都可以读取。包括：文本文件，图片，声音文件，视频文件等....

~~~
假设文件file1.txt，采用字节流的话是这样读的：
    a中国bc张三fe
    第一次读：一个字节，正好读到'a'（这里的a因为是在win的文件中的，所以就一个字节。Java的char是两个字节）
    第二次读：一个字节，正好读到'中'字符的一半。
    第三次读：一个字节，正好读到'中'字符的另外一半。
~~~

​				

### 字符流
有的流是按照字符的方式读取数据的，==一次读取一个字符==，这种流是为了方便读取普通文本文件而存在的，这种流不能读取：图片、声音、视频等文件。只能读取纯文本文件（连word文件都无法读取）。


	假设文件file1.txt，采用字符流的话是这样读的：
	    a中国bc张三fe
	    第一次读：'a'字符（'a'字符在windows系统中占用1个字节。）
	    第二次读：'中'字符（'中'字符在windows系统中占用2个字节。）





## java.io.*

> Java 中所有的流都是在：`java.io.*;`下。

**java IO流四大家族的首领：**

1. java.io.InputStream  字节输入流
2. java.io.OutputStream 字节输出流
3. java.io.Reader		字符输入流
4. java.io.Writer		字符输出流

**特点：**

1. 都是抽象类。(abstract class)
2. **所有的流**都实现了：`java.io.Closeable`接口，都是可关闭的，都有`close()`方法。
3. 所有的==输出流==都实现了：	`java.io.Flushable`接口，都是可刷新的，都有`flush()`方法。

> 流毕竟是一个管道，这个是内存和硬盘之间的通道，用完之后==一定要关闭==，
> 不然会耗费(占用)很多资源。养成好习惯，用完流一定要关闭。

> 养成一个好习惯，输出流在最终输出之后，==一定要记得flush()==刷新一下。这个刷新表示将通道/管道当中剩余未输出的数据强行输出完（清空管道！）刷新的作用就是清空管道。
> **注意：如果没有flush()可能会导致丢失数据。**





## 需要掌握的16个流

> java.io 包下需要掌握的流有16个：

	文件专属：
		java.io.FileInputStream（掌握）
		java.io.FileOutputStream（掌握）
		java.io.FileReader
		java.io.FileWriter
	
	转换流：（将字节流转换成字符流）
		java.io.InputStreamReader
		java.io.OutputStreamWriter
	
	缓冲流专属：
		java.io.BufferedReader
		java.io.BufferedWriter
		java.io.BufferedInputStream
		java.io.BufferedOutputStream
	
	数据流专属：
		java.io.DataInputStream
		java.io.DataOutputStream
	
	标准输出流：
		java.io.PrintWriter
		java.io.PrintStream（掌握）
	
	对象专属流：
		java.io.ObjectInputStream（掌握）
		java.io.ObjectOutputStream（掌握）



### 🔴 java.io.FileInputStream

> 给`FileInputStream`传进去一个byte数组，那么每次用这个byte数组去 read 的时候，都会往这数组里装对应数量的byte
>
> ==但是==，读到最后如果一次读到的数量没到数组长度的话，会把剩余的byte依次从数组0位开始放进去（原有的覆盖），而剩下没覆盖的，还保留在那。
>
> 所以要转成字符串的时候，要用Sting的构造方法，传入byte数组、起始位置、多少个字符。
>
> 1. 起始位置都从0开始
> 2. 用`.read(bytes)`可以返回读了多少个字符

~~~java
public static void main(String[] args) {
    FileInputStream fis = null;
    try {
        
        // 用相对路径（相对路径知识点介绍在拓展里），开一个FileInputStream
        fis = new FileInputStream("chapter23/src/tempfile3");
        // 准备一个byte数组，给数组定几个长度，一次就能读几个字节byte
        byte[] bytes = new byte[4];
        // 方法一，写得不优雅
        /*while(true){
                int readCount = fis.read(bytes);
                if(readCount == -1){
                    break;
                }
                // 把byte数组转换成字符串，读到多少个转换多少个。
                System.out.print(new String(bytes, 0, readCount));
            }*/
        // 方法二，优雅
        int readCount = 0;
        // fis.read(bytes)是把刚才定的长度的byte数组传进去，可以拿到对应数量的byte回来，返回的是读到byte的数量
        while((readCount = fis.read(bytes)) != -1) {
            // 通过String里的构造方法，把byte数组、起始位置、多少个字符放进去
            System.out.print(new String(bytes, 0, readCount));
        }

    } catch (FileNotFoundException e) {
        e.printStackTrace();
    } catch (IOException e) {
        e.printStackTrace();
    } finally {
        if (fis != null) {
            try {
                fis.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }
}
~~~



#### int available()：返回流当中剩余的没有读到的字节数量

#### long skip(long n)：跳过几个字节不读。

~~~java
public static void main(String[] args) {
    FileInputStream fis = null;
    try {
        fis = new FileInputStream("tempfile");
        System.out.println("总字节数量：" + fis.available());
        // 读1个字节
        //int readByte = fis.read();
        // 还剩下可以读的字节数量是：5
        //System.out.println("剩下多少个字节没有读：" + fis.available());
        // 这个方法有什么用？
        // 可以创出合适大小的byte数组，就能一次读进所有内容
        //byte[] bytes = new byte[fis.available()]; // 这种方式不太适合太大的文件，因为byte[]数组不能太大。
        // 不需要循环了。
        // 直接读一次就行了。
        //int readCount = fis.read(bytes); // 6
        //System.out.println(new String(bytes)); // abcdef

        // skip跳过几个字节不读取，这个方法也可能以后会用！
        fis.skip(3);
        System.out.println(fis.read()); //100 （abcdef的文件，跳过3个到d，d为100）

    } catch (FileNotFoundException e) {
        e.printStackTrace();
    } catch (IOException e) {
        e.printStackTrace();
    } finally {
        if (fis != null) {
            try {
                fis.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }
}
~~~



### 🔴 java.io.FileOutputStream

> `FileOutputStream`用于写入诸如图像数据的原始字节流。  对于写入字符流，请考虑使用`FileWriter` 。
>
> `FileWriter`用法基本同`FileOutputStream`，具体可查手册
>
> ~~~java
>     public static void main(String[] args) {
>         FileWriter fw = null;
>         try {
>             fw = new FileWriter("chapter23/src/test");
>             fw.write("好好学习啊");
> 
>             // flush() 通过将任何缓冲的输出写入底层流来刷新流。
>             fw.flush();
>         } catch (IOException e) {
>             e.printStackTrace();
>         } finally {
>             if (fw != null) {
>                 try {
>                     fw.close();
>                 } catch (IOException e) {
>                     e.printStackTrace();
>                 }
>             }
>         }
>     }
> ~~~

#### 构造方法

![image-20220811144246318](https://s2.loli.net/2023/10/12/hjdUKv7VQsZpE6S.png)

##### 参数

1. `name` -与系统相关的文件名
2. `append` - 如果是true ，那么字节将被写入文件的末尾，而不是开头（没加append的构造方法默认是：存在就==清空==完写，不存在就==新建==写；加了append为true之后会追加在末尾）





#### 拷贝文件

```java
public static void main(String[] args) {
    /**
     * 拷贝一个文件到另一个地方
     * 万能的，图片声音视频文本都行
     */
    // 声明输入输出流对象
    FileInputStream fis = null;
    FileOutputStream fos = null;

    try {
        // 给输入输出流加上对应的位置
        fis =  new FileInputStream("E:\\xxxxxxx（源路径）");
        fos = new FileOutputStream("D:\\xxxxxxx（拷贝目的地路径）");

        // 自定义一个长度的byte数组
        byte[] bytes = new byte[1024]; // 每次1024字节拷贝

        // readCount用来接收每次byte数组读到的字节个数
        int readCount = 0;
        while ((readCount = fis.read(bytes)) != -1) {
            // 边读边写
            fos.write(bytes, 0, readCount);
        }
        fos.flush();
    } catch (IOException e) {
        e.printStackTrace();
    } finally {
        if (fis != null) {
            try {
                fis.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
        };
        if (fos != null) {
            try {
                fos.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }
}
```





### java.io.BufferedReader

![image-20220811190205697](https://s2.loli.net/2023/10/12/bgyjlcYGwqPTE4O.png)


> `BufferedReader`:
> 带有缓冲区的字符输入流。
> 使用这个流的时候不需要自定义char数组，或者说不需要自定义byte数组。自带缓冲。
>
> - 当一个流的构造方法中需要一个流的时候，这个被传进来的流叫做：==节点流==。
> - 外部负责包装的这个流，叫做：==包装流==，还有一个名字叫做：==处理流==。
> - `bufferedReader.readLine()`方法读取一个文本行，但**不带换行符**。没读到返回***null***。
> - 对于包装流来说，只需要关闭最外层流就行，里面的节点流会自动关闭。（可以看源代码。）
>   - ![image-20220811190639095](https://s2.loli.net/2023/10/12/iEJ2QbCdnp4cVGf.png)
>   - ![image-20220811190625200](https://s2.loli.net/2023/10/12/g7KPC1pNokHOWcQ.png)

~~~java
public static void main(String[] args) throws Exception{

    FileReader reader = new FileReader("Copy02.java");
    // 当一个流的构造方法中需要一个流的时候，这个被传进来的流叫做：节点流。
    // 外部负责包装的这个流，叫做：包装流，还有一个名字叫做：处理流。
    // 像当前这个程序来说：FileReader就是一个节点流。BufferedReader就是包装流/处理流。
    BufferedReader br = new BufferedReader(reader);
    // 读一行
    /*String firstLine = br.readLine();
        System.out.println(firstLine);

        String secondLine = br.readLine();
        System.out.println(secondLine);

        String line3 = br.readLine();
        System.out.println(line3);*/

    // 可以把上面这段改成下面这样循环读
    // br.readLine()方法读取一个文本行，但不带换行符。
    String s = null;
    while((s = br.readLine()) != null){
        System.out.print(s);
    }

    // 关闭流
    // 对于包装流来说，只需要关闭最外层流就行，里面的节点流会自动关闭。（可以看源代码。）
    br.close();
}
~~~





### 转换流：

#### java.io.InputStreamReader

==java.io.OutputStreamReader==也类似用法。

> 将 字节流 转换成 字符流。
>
> 在各个流的套娃中，节点流和包装流都是相对的，要看情况。

```java
public static void main(String[] args) throws Exception{

    /*// 字节流
    FileInputStream in = new FileInputStream("filePath");

    // 通过转换流转换（InputStreamReader将字节流转换成字符流。）
    // in是节点流。reader是包装流。
    InputStreamReader reader = new InputStreamReader(in);

    // 这个构造方法只能传一个字符流。不能传字节流。
    // reader是节点流。br是包装流。
    BufferedReader br = new BufferedReader(reader);*/

    // 上面的合并写法
    BufferedReader br = new BufferedReader(new InputStreamReader(new FileInputStream("filePath")));

    String line = null;
    while((line = br.readLine()) != null){
        System.out.println(line);
    }

    // 关闭最外层
    br.close();
}
```





### 数据流专属

1. `java.io.DataInputStream`
2. `java.io.DataOutputStream`

> 用得少，类似于加密一样
>
> 在用`DataOutputStream`按照一定顺序写一个文件后，一定要用`DataInputStream`以相同的类型相同的顺序取出才行。

~~~java
public static void main(String[] args) throws Exception{
    // 创建数据专属的字节输出流
    DataOutputStream dos = new DataOutputStream(new FileOutputStream("data"));
    // 写数据
    byte b = 100;
    short s = 200;
    int i = 300;
    long l = 400L;
    float f = 3.0F;
    double d = 3.14;
    boolean sex = false;
    char c = 'a';
    // 写
    dos.writeByte(b); // 把数据以及数据的类型一并写入到文件当中。
    dos.writeShort(s);
    dos.writeInt(i);
    dos.writeLong(l);
    dos.writeFloat(f);
    dos.writeDouble(d);
    dos.writeBoolean(sex);
    dos.writeChar(c);

    // 刷新
    dos.flush();
    // 关闭最外层
    dos.close();
}
~~~

```java
public static void main(String[] args) throws Exception{
    DataInputStream dis = new DataInputStream(new FileInputStream("data"));
    // 开始读
    // 一定要按顺序，按类型读才行
    byte b = dis.readByte();
    short s = dis.readShort();
    int i = dis.readInt();
    long l = dis.readLong();
    float f = dis.readFloat();
    double d = dis.readDouble();
    boolean sex = dis.readBoolean();
    char c = dis.readChar();

    System.out.println(b);
    System.out.println(s);
    System.out.println(i + 1000);
    System.out.println(l);
    System.out.println(f);
    System.out.println(d);
    System.out.println(sex);
    System.out.println(c);

    dis.close();
}
```





### 🔴 标准输出流

1. `java.io.PrintWriter`
2. `java.io.PrintStream`（掌握）



#### `java.io.PrintStream`

> 标准的字节输出流。默认输出到控制台。
>
> 标准流不需要手动关闭。
>
> 可以给一个输出流`OutputStream`，来修改标准流的指向，再用`System.setOut(printStream);`来修改输出方向。
>
> ![image-20220811202958866](https://s2.loli.net/2023/10/12/MdZ78nvGKVcOCsk.png)

```java
public static void main(String[] args) throws Exception{

    // 联合起来写
    System.out.println("hello world!");

    // 分开写
    PrintStream ps = System.out;
    ps.println("hello zhangsan");
    ps.println("hello lisi");
    ps.println("hello wangwu");

    // 标准输出流不需要手动close()关闭。
    // 可以改变标准输出流的输出方向

    // 标准输出流不再指向控制台，指向“log”文件。
    PrintStream printStream = new PrintStream(new FileOutputStream("log"));
    // 修改输出方向，将输出方向修改到"log"文件。
    System.setOut(printStream);
    // 再输出
    System.out.println("hello world");
    System.out.println("hello kitty");
    System.out.println("hello zhangsan");

}
```



通过改变标准输出流来实现记录日志的工具类

```java
/*
日志工具
 */
public class Logger {
    /*
    记录日志的方法。
     */
    public static void log(String msg) {
        try {
            // 指向一个日志文件
            PrintStream out = new PrintStream(new FileOutputStream("log.txt", true));
            // 改变输出方向
            System.setOut(out);
            // 日期当前时间
            Date nowTime = new Date();
            SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss SSS");
            String strTime = sdf.format(nowTime);

            System.out.println(strTime + ": " + msg);
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        }
    }
}
```





### File

> - 文件和目录路径名的抽象表示。
> - 用的时候查文档即可

- - | 返回值类型 | 方法                                                         |
    | ---------- | ------------------------------------------------------------ |
    | `int`      | `compareTo(File pathname)`  比较两个抽象的路径名字典。       |
    | `boolean`  | `createNewFile()`  当且仅当具有该名称的文件尚不存在时，原子地创建一个由该抽象路径名命名的新的空文件。 |
    | `boolean`  | `delete()`  删除由此抽象路径名表示的文件或目录。             |
    | `boolean`  | `exists()`  测试此抽象路径名表示的文件或目录是否存在。       |
    | `File`     | `getAbsoluteFile()`  返回此抽象路径名的绝对形式。            |
    | `String`   | `getAbsolutePath()`  返回此抽象路径名的绝对路径名字符串。    |
    | `String`   | `getName()`  返回由此抽象路径名表示的文件或目录的名称。      |
    | `String`   | `getParent()`  返回此抽象路径名的父 `null`的路径名字符串，如果此路径名未命名为父目录，则返回null。 |
    | `File`     | `getParentFile()`  返回此抽象路径名的父，或抽象路径名 `null`如果此路径名没有指定父目录。 |
    | `String`   | `getPath()`  将此抽象路径名转换为路径名字符串。              |
    | `boolean`  | `isAbsolute()`  测试这个抽象路径名是否是绝对的。             |
    | `boolean`  | `isDirectory()`  测试此抽象路径名表示的文件是否为目录。      |
    | `boolean`  | `isFile()`  测试此抽象路径名表示的文件是否为普通文件。       |
    | `boolean`  | `isHidden()`  测试此抽象路径名命名的文件是否为隐藏文件。     |
    | `long`     | `lastModified()`  返回此抽象路径名表示的文件上次修改的时间。 |
    | `long`     | `length()`  返回由此抽象路径名表示的文件的长度（多少字节）。 |
    | `String[]` | `list()`  返回一个字符串数组，命名由此抽象路径名表示的目录中的文件和目录。 |
    | `String[]` | `list(FilenameFilter filter)`  返回一个字符串数组，命名由此抽象路径名表示的目录中满足指定过滤器的文件和目录。 |
    | `File[]`   | `listFiles()`  返回一个抽象路径名数组，表示由该抽象路径名表示的目录中的文件。 |
    | `File[]`   | `listFiles(FileFilter filter)`  返回一个抽象路径名数组，表示由此抽象路径名表示的满足指定过滤器的目录中的文件和目录。 |
    | `File[]`   | `listFiles(FilenameFilter filter)`  返回一个抽象路径名数组，表示由此抽象路径名表示的满足指定过滤器的目录中的文件和目录。 |
    | `boolean`  | `mkdir()`  创建由此抽象路径名命名的目录。                    |
    | `boolean`  | `mkdirs()`  创建由此抽象路径名命名的目录，包括任何必需但不存在的父目录。 |
    | `boolean`  | `renameTo(File dest)`  重命名由此抽象路径名表示的文件。      |
    | `boolean`  | `setLastModified(long time)`  设置由此抽象路径名命名的文件或目录的最后修改时间。 |









### 🔴 对象专属流：

1. `java.io.ObjectInputStream`（掌握）
2. `java.io.ObjectOutputStream`（掌握）



#### 序列化和反序列化

##### 1、java.io.NotSerializableException:

​    Student对象不支持序列化！！！！

##### 2、参与序列化和反序列化的对象，必须实现Serializable接口。

##### 3、注意：通过源代码发现，Serializable接口只是一个标志接口：

~~~java
public interface Serializable {
}
~~~

> 这个接口当中什么代码都没有。起到**标识的作用**
>
> Serializable这个标志接口是给java虚拟机参考的，java虚拟机看到这个接口之后，会为该类自动生成一个序列化版本号。



##### 4. transient

带有`transient`的属性表示不可序列化，即在序列化的时候该属性不参与，反序列化回来之后是空



##### 5、序列化版本号有什么用？

> 一个类在修改后就会改变这个序列化版本号，如果在反序列化的时候版本号不一致就会报错。

自动生成序列号**优点**：

不同的人编写了同一个类，但“这两个类确实不是同一个类”。这个时候序列化版本就起上作用了。对于java虚拟机来说，java虚拟机是可以区分开这两个类的，因为这两个类都实现了Serializable接口，都有默认的序列化版本号，他们的序列化版本号不一样。所以区分开了。

自动生成序列号**缺点：**

一旦代码确定之后，不能进行后续的修改，因为只要修改，必然会重新编译，此时会生成全新的序列化版本号，这个时候java虚拟机会认为这是一个全新的类。

##### java语言中是采用什么机制来区分类的？

​    第一：首先通过类名进行比对，如果类名不一样，肯定不是同一个类。
​    第二：如果类名一样，再怎么进行类的区别？靠序列化版本号进行区分。



##### 总结

> 凡是一个类实现了`Serializable`接口，建议手动给该类提供一个固定不变的序列化版本号。
> 这样，以后这个类即使代码修改了，但是版本号不变，java虚拟机会认为是同一个类。
>
> IDEA中的快捷键是在实现`Serializable`接口的类名上`Alt` +`Enter`可以添加随机的版本号（版本号自己随便写也行）

![image-20220812192901710](https://s2.loli.net/2023/10/12/fU8ExZ2qPuAB1kS.png)



### IO和Properties

[通过java.util下的资源绑定器可以更方便获取properties文件](# 资源绑定器)

> 在Java中，可以把一些变化的属性提取到`.properties`的属性配置文件里（可以不用这个后缀，但通常是这个），通过`Properties`+`IO`可以读出配置项。
>
> 1. 属性配置文件里写法一般是`key=value`或`key:value`，**不要随便加空格**

通过`load`可以把属性配置文件的内容装载到`Properties对象`中

```java
public static void main(String[] args) throws Exception{
    /*
        Properties是一个Map集合，key和value都是String类型。
        想将某个文件中的数据加载到Properties对象当中。
     */
    // 新建一个输入流对象
    FileReader reader = new FileReader("xxxx.properties");

    // 新建一个Map集合
    Properties pro = new Properties();

    // 调用Properties对象的load方法将文件中的数据加载到Map集合中。
    pro.load(reader); // 文件中的数据顺着管道加载到Map集合中，其中等号=左边做key，右边做value

    // 通过key来获取value
    String username = pro.getProperty("username");
    System.out.println(username);

    String password = pro.getProperty("password");
    System.out.println(password);
}
```







# 多线程

## 简介

1. Java中==至少两个线程==：一个是垃圾回收线程，一个是执行main方法的主线程
2. 在Java中，各线程的**堆内存和方法区内存共享**。但是==栈内存独立==，<u>一个线程一个栈</u>。
3. ==每个线程互不干扰==，所以可能出现main方法所在的主栈结束了之后程序还没结束



## Java实现多线程的两种方式

### 一、编写类继承`Thread`

[第三种线程写法（可以得到线程的返回值）](# 三、第三种线程写法)

> 直接继承`java.lang.Thread`，重写run方法。
>
> `run()`方法**不能**`throws`异常！！因为[子类不能抛出比父类更多的异常！！！！！！！](# 异常)

> 在这个类中，**run方法是==必须要有==的**
>
> 用线程对象`t.start();`和`t.run();`有什么区别？
>
> - `t.start();`这行代码的作用就是**开启新线程**（在实际上底层是通过Thread的start()方法里由JVM调用`start0()方法`来通过多线程机制调用run方法）（线程不会立马执行，只是变成了可运行状态，等待CPU调度），开启之后这行**立马结束**（原来的线程可以继续干下面的事情）。
> - `t.run();`并没有开启新线程，**只是调用了类中的run方法而已**（原来的线程必须等`t.run()`执行结束了之后才能继续执行下面的代码）
>
> 
>
> `start0()方法`（是个本地方法，底层是C / C++实现的）：在执行`t.start();`之后，实际上底层是通过Thread的start()方法里由JVM调用`start0()方法`来通过多线程机制调用run方法。

```java
第一种方式：编写一个类，直接继承java.lang.Thread，重写run方法。
	// 定义线程类
	public class MyThread extends Thread{
		public void run(){
		
		}
	}
	// 创建线程对象
	MyThread t = new MyThread();
	// 启动线程。
	t.start();
```





### 二、编写类实现`Runnable`接口（常用）

> 1. 编写一个类，实现`java.lang.Runnable`接口，实现run方法。
> 2. 实例化一个Thread对象，同时传入刚才的类的实例
> 3. 通过Thread对象的start()方法开启线程

==注意==：这种实现接口方式比较**常用**，因为一个类实现了接口，它**还可以去继承其它的类，更灵活**

>  Thread构造方法可以传一个Runnable对象
>
> ![image-20220813115123288](https://s2.loli.net/2023/10/12/uwEmtkryGhbv29d.png)


```java
// 定义一个可运行的类
public class MyRunnable implements Runnable {
    public void run(){

    }
}
// 创建线程对象
Thread t = new Thread(new MyRunnable());
// 启动线程
t.start();
```



#### 模拟Thread

```java
/**
 * 模拟Thread（静态代理模式）
 */
class MyThreadProxy implements Runnable {

    private Runnable target;

    @Override
    public void run() {
        if (target != null) {
            target.run();
        }
    }

    public MyThreadProxy(Runnable target) {
        this.target = target;
    }

    public void start() {
        // 由JVM调用native方法start0
        start0();
    }

    public void start0() {
        // 底层通过多线程机制来调用run方法
        run();
    }
}
```

#### 采用线程**内部类**方式

- 看起来是new了个接口对象，但是接口并不能new对象！实际上就是new一个匿名的类，这个类是实现类接口的

```java
public static void main(String[] args) {
    // 创建线程对象，采用匿名内部类方式。
    // 这是通过一个没有名字的类，new出来的对象。
    Thread t = new Thread(new Runnable(){
        @Override
        public void run() {
            for(int i = 0; i < 100; i++){
                System.out.println("t线程---> " + i);
            }
        }
    });

    // 启动线程
    t.start();

    for(int i = 0; i < 100; i++){
        System.out.println("main线程---> " + i);
    }
}

```





#### 继承和实现两种方式的区别和选择

1. 通过继承Thread或者实现Runnable接口来创建线程本质上没有区别，Thread类本身就实现了Runnable接口
2. 实现Runnable接口方式**更加适合多个线程共享一个资源的情况**（因为一个对象可以传给多个线程进行实例化），并且避免了单继承的限制。建议使用Runnable

## 线程的生命周期

![image-20221110115728920](https://s2.loli.net/2023/10/12/gf8yTM4bw5oxHFr.png)

> 生命周期五个状态：**新建、就绪、运行、阻塞、死亡**
>
> - 一个时间片运行不完的线程会回到就绪状态重新抢夺CPU时间片，线程的状态会在**就绪和运行间来回切换**，这一过程**由 JVM 调度**

|   状态变化   |                         状态改变事件                         |
| :----------: | :----------------------------------------------------------: |
|     新建     |            线程对象刚`new`出来的时候就是新建状态             |
| 新建 -> 就绪 |      在执行`start()`的时候线程就从新建变为就绪状态了。       |
| 就绪 -> 运行 | 线程不断抢占CUP，当抢到的时候，就进入了运行状态。底层执行`run()`方法，**`run()`方法的执行也代表着线程进入运行状态。** |
| 运行 -> 就绪 | 当时间片用完或者yield()操作时，运行的线程会变为就绪状态。下次再抢到时间片进入运行状态时，会从上一次末尾接着继续执行。 |
| 运行 -> 阻塞 | 运行中的线程**遇到了`IO操作`或者`sleep()`等操作**时，会进入阻塞状态。此时会放弃CPU执行权和抢占到的时间片 |
| 阻塞 -> 就绪 |           当线程的等待事件结束之后，会进入就绪状态           |
| 运行 -> 死亡 |             当`run()`方法执行结束之后，线程死亡              |





## 获取当前线程对象

### 一、如何获取当前线程对象

![image-20220813164450374](https://s2.loli.net/2023/10/12/Ybl1HLTPCVXMEwU.png)

通过`Thread`的静态方法`Thread.currentThread()`可以获取一个`Thread对象`，`Thread.currentThread()`这个方法在哪个线程里，获取到的线程对象就是哪个线程。

~~~java
// 返回值t就是当前线程。
Thread t = Thread.currentThread();
~~~



### 二、获取线程对象名字

~~~java
// 给一个线程对象设置（修改）名字
线程对象.setName("线程名字");
//获取线程对象名字
String name = 线程对象.getName();
~~~

如果没有手动给线程对象一个名字的话，线程有自己的**默认名字**，默认名字是

- Thread-0 
- Thread-1
- Thread-2
- Thread-3
- 等等
- ==注：==主线程的默认名字是`main`



## sleep

### 概述

![image-20220813165750208](https://s2.loli.net/2023/10/12/MmFXNyltfunWjeO.png)

> `sleep()`是个**静态方法**，`Thread.sleep(毫秒数);`出现在哪个线程里，在执行到这行的时候这个线程就会休眠指定毫秒数



### ==面试题==

> 问题：11行的`t.sleep(1000 * 5);`会让线程t进入睡眠状态吗？
>
> 答案：==不会==，因为静态方法即使是用对象去调用，实际执行的时候还是相当于`Thread.sleep(1000 * 5);`，因为这行代码在`main线程`里，所以**会让`main线程`睡眠**

```java
public class ThreadTest {
    public static void main(String[] args) {
        // 创建线程对象
        Thread t = new MyThread3();
        t.setName("t");
        t.start();

        // 调用sleep方法
        try {
            t.sleep(1000 * 5);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        // 5秒之后这里才会执行。
        System.out.println("hello World!");
    }
}

class MyThread3 extends Thread {
    @Override
    public void run(){
        for(int i = 0; i < 10000; i++){
            System.out.println(Thread.currentThread().getName() + "--->" + i);
        }
    }
}
```



### 叫醒一个睡眠的线程

在其他线程中使用`睡眠线程对象.interrupt();`可以触发<u>Java的异常处理机制</u>来中断睡眠线程的睡眠。在睡眠线程里可以用`try catch`包住`sleep()`语句，当被中断之后`sleep()`语句会抛异常，然后被catch了之后就继续执行了。

> ==注意：==在线程的`run()方法`里，只能用`try catch`，而不能在`run方法`上`throws`异常，因为继承了父类的子类不能比父类抛出更多或者更宽泛的[异常](# 异常)。try-catch保证该线程在sleep时还是能感知响应，能够响应中断，不会睡死





## 终止线程

### 强制终止（不推荐用，过时）

> `线程对象.stop()`
>
> 因为是直接杀掉线程，没保存数据会丢失，不安全不推荐用



### 合理终止线程

> 1. 通过给在线程内给出一个`标记`，若想终止这个线程，只需要修改这个标记即可。
> 2. 在线程进行一些操作前先判断这个标记，如果不是终止的话就正常执行。如果是终止的话可以执行一些保存等其他的操作，之后在`return;`即可

```java
public class ThreadTest {
    public static void main(String[] args) {
        MyRunable r = new MyRunable();
        Thread t = new Thread(r);
        t.setName("t");
        t.start();

        // 模拟5秒
        try {
            Thread.sleep(5000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        // 终止线程
        // 想要什么时候终止t的执行，那么把标记修改为false，就结束了。
        r.run = false;
    }
}

class MyRunable implements Runnable {

    // 打一个布尔标记
    boolean run = true;

    @Override
    public void run() {
        for (int i = 0; i < 10; i++){
            if(run){
                System.out.println(Thread.currentThread().getName() + "--->" + i);
                try {
                    Thread.sleep(1000);
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }else{
                // return就结束了，在结束之前还有什么没保存的，在这里可以保存
                //save....
                //终止当前线程
                return;
            }
        }
    }
}
```





## 线程调度

### 常见的线程调度模型

1. 抢占式调度模型（Java中是这种模型）
   - 哪个线程的优先级比较高，抢到的CPU时间片的概率就高一些/多一些。
2. 均分式调度模型（有些其他语言是这个）
   - 平均分配CPU时间片。每个线程占有的CPU时间片时间长度一样。



### Java中关于线程调度的方法

1. `void setPriority(int newPriority)` 设置线程的优先级（实例方法）

   - 优先级比较高的获取CPU时间片可能会多一些。（但也不完全是，大概率是多的。）

2. `int getPriority()` 获取线程优先级（实例方法）

   - **最低优先级1，默认优先级是5，最高优先级10**

3. `void join()` 合并线程（插队）（实例方法）

   - 在一个线程中写`另一个线程的对象.join();`的意思是：当前线程**阻塞**，让那个线程来先执行，执行结束之后当前线程才继续

   - ```java
     class MyThread1 extends Thread {
         public void doSome(){
             MyThread2 t = new MyThread2();
             t.join(); // 当前线程进入阻塞，t线程执行，直到t线程结束。当前线程才可以继续。
         }
     }
     
     class MyThread2 extends Thread{
     
     }
     ```

4. `static void yield() ` 让位方法（看起来让了，但是没完全让）（静态方法）

   - 当执行到`yield()方法`时，其所在的线程会从**“运行状态”回到“就绪状态”**
   - 注意：这并不是阻塞，只是**暂时**的让位，到就绪之后还**可能再次抢到**

5. `void interrupt()`

   - 通过`线程对象.interrupt()`可以从外部中断这个线程的休眠（[唤醒](# 叫醒一个睡眠的线程)）






## :star::star: 多线程重点：线程安全

### 一、什么情况下多线程并发会有安全问题？

满足以下三个条件的就会存在安全问题

1. 条件1：多线程并发。
2. 条件2：有共享数据。
3. 条件3：共享数据有修改的行为。



### 二、线程同步机制

**不让并发**（让线程排队执行），通过排队执行来解决称为：`线程同步`，这种机制称为线程同步机制



### 三、同步异步概念

1. 异步编程模型：
   线程t1和线程t2，**各自执行各自的**，t1不管t2，t2不管t1，**谁也不需要等谁**，这种编程模型叫做：异步编程模型。其实就是：多线程并发（效率较高。）***异步就是并发***。
2. 同步编程模型：
   线程t1和线程t2，在线程t1执行的时候，必须等待t2线程执行结束，或者说在t2线程执行的时候，必须等待t1线程执行结束，<u>两个线程之间发生了等待关系</u>，这就是同步编程模型。效率较低。线程排队执行。***同步就是排队***。





### 四、:star:解决线程安全

~~~java
synchronized (需要同步的线程所共享的对象) { 
	需要线程同步来保护的操作，线程同步代码块。
}
~~~

> ==在`synchronized(对象)`括号中的“对象”，是需要同步的线程所共享的==
>
> 假设写的是一个字符串，在字符串常量池里只有一个，那所有线程执行到这都会同步

> **对象锁概念**：在Java语言中，任何一个对象都有“一把锁”，其实这把锁就是标记。（只是把它叫做锁），100个对象，100把锁。1个对象1把锁。

执行流程

1. 线程遇到`synchronized`，立马**从“运行状态”进入“锁池”**（lockpool），此时线程会放弃占有的CPU时间片。（可以理解为一种**阻塞**状态）
2. 线程在锁池里找`synchronized(对象)`括号中的“对象”的对象锁
   - 如果找到了，就进入就绪状态继续抢夺CPU时间片
   - 如果没抢到，就一直在锁池中等待
3. 当一个占有对象锁的线程执行完同步代码块代码之后，会释放锁





### 五、:star:实例变量、局部变量、静态变量对线程同步的影响

#### Java中的三大变量：

1. 实例变量：在堆中。

2. 静态变量：在方法区。

3. 局部变量：在栈中




- 在这些变量中**，局部变量永远都不会存在线程安全问题**。	因为局部变量不共享。（一个线程一个栈），	局部变量在栈中。所以局部变量永远都不会共享。

- 实例变量在堆中，堆只有1个。静态变量在方法区中，方法区只有1个。堆和方法区都是多线程共享的，所以可能存在线程安全问题。

   

#### **总结**

**局部变量 / 常量：不会有线程安全问题。**
**成员变量：可能会有线程安全问题。**



#### 如果使用局部变量的话：

1. `StringBuffer`是线程安全的，效率低，`StringBuilder`是线程不安全的，效率高。**选`StringBuffer`**，因为局部变量不存在线程安全问题。选择`StringBuilder`。`StringBuffer`效率比较低。

**拓展**

1. ArrayList是非线程安全的。
2. Vector是线程安全的。
3. HashMap HashSet是非线程安全的。
4. Hashtable是线程安全的。



### 六、synchronized有三种写法

#### 第一种：同步代码块（灵活）

```java
synchronized(线程共享对象){
    同步代码块;
}
```

#### 第二种：在实例方法上使用synchronized

> `synchronized`出现在实例方法上，<font size=6>**一定锁的是`this`**</font>
>
> 如果共享的对象就是`this`，并且需要同步的代码块是整个方法体，建议使用这种方式。（源码里很多用这种方式的）

**缺点：**

1. 缺点1：因为**只能锁`this`**，且不能是其他对象，所以这种方式不灵活
2. 缺点2：`synchronized`出现在实例方法上表示整个方法体都需要同步，可能会无故扩大同步的范围，导致程序的执行**效率降低**。所以这种方式不常用。

**优点：**

1. 代码精简



#### 第三种：在静态方法上使用synchronized

> 表示找类锁。==类锁永远只有1把==。就算创建了100个对象，那类锁也只有一把。
>
> ==类锁可以用于保证静态变量的安全==
>
> 对象锁：1个对象1把锁，100个对象100把锁。
>
> 类锁：100个对象，也可能只是1把类锁。



### ==**面试题**==

#### 一、`synchronized`在其他方法上

> 因为`doOther()方法`没有`synchronized`，所以`t2`在进行**`doOther()方法`的时候没有去获取锁**，所以没有等待`t1`
>
> 如果`doOther()方法`有`synchronized`的话，那么`t2`在进行`doOther()方法`的时候就会获取锁，因为`t1`占了，所以会等待`t1`

```java
// 面试题：doOther方法执行的时候需要等待doSome方法的结束吗？
//不需要，因为doOther()方法没有synchronized
public class Exam01 {
    public static void main(String[] args) throws InterruptedException {
        MyClass mc = new MyClass();

        Thread t1 = new MyThread(mc);
        Thread t2 = new MyThread(mc);

        t1.setName("t1");
        t2.setName("t2");

        t1.start();
        Thread.sleep(1000); //这个睡眠的作用是：为了保证t1线程先执行。
        t2.start();
    }
}

class MyThread extends Thread {
    private MyClass mc;
    public MyThread(MyClass mc){
        this.mc = mc;
    }
    public void run(){
        if(Thread.currentThread().getName().equals("t1")){
            mc.doSome();
        }
        if(Thread.currentThread().getName().equals("t2")){
            mc.doOther();
        }
    }
}

class MyClass {
    public synchronized void doSome(){
        System.out.println("doSome begin");
        try {
            Thread.sleep(1000 * 10);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        System.out.println("doSome over");
    }
    public void doOther(){
        System.out.println("doOther begin");
        System.out.println("doOther over");
    }
}
```



#### 二、两个对象进两个`synchronized`锁的方法

```java
// 面试题：doOther方法执行的时候需要等待doSome方法的结束吗？
//不需要，因为MyClass对象是两个，两把锁。
public class Exam01 {
    public static void main(String[] args) throws InterruptedException {
        MyClass mc1 = new MyClass();
        MyClass mc2 = new MyClass();

        Thread t1 = new MyThread(mc1);
        Thread t2 = new MyThread(mc2);

        t1.setName("t1");
        t2.setName("t2");

        t1.start();
        Thread.sleep(1000); //这个睡眠的作用是：为了保证t1线程先执行。
        t2.start();
    }
}

class MyThread extends Thread {
    private MyClass mc;
    public MyThread(MyClass mc){
        this.mc = mc;
    }
    public void run(){
        if(Thread.currentThread().getName().equals("t1")){
            mc.doSome();
        }
        if(Thread.currentThread().getName().equals("t2")){
            mc.doOther();
        }
    }
}

class MyClass {
    public synchronized void doSome(){
        System.out.println("doSome begin");
        try {
            Thread.sleep(1000 * 10);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        System.out.println("doSome over");
    }
    public synchronized void doOther(){
        System.out.println("doOther begin");
        System.out.println("doOther over");
    }
}
```





#### 三、`synchronized`在静态方法上

> ==`synchronized`在静态方法上是类锁==，同一个类的所有对象都只有**一把`类锁`**

```java
// 面试题：doOther方法执行的时候需要等待doSome方法的结束吗？
//需要，因为静态方法是类锁，不管创建了几个对象，类锁只有1把。
public class Exam01 {
    public static void main(String[] args) throws InterruptedException {
        MyClass mc1 = new MyClass();
        MyClass mc2 = new MyClass();

        Thread t1 = new MyThread(mc1);
        Thread t2 = new MyThread(mc2);

        t1.setName("t1");
        t2.setName("t2");

        t1.start();
        Thread.sleep(1000); //这个睡眠的作用是：为了保证t1线程先执行。
        t2.start();
    }
}

class MyThread extends Thread {
    private MyClass mc;
    public MyThread(MyClass mc){
        this.mc = mc;
    }
    public void run(){
        if(Thread.currentThread().getName().equals("t1")){
            mc.doSome();
        }
        if(Thread.currentThread().getName().equals("t2")){
            mc.doOther();
        }
    }
}

class MyClass {
    // synchronized出现在静态方法上是找类锁。
    public synchronized static void doSome(){
        System.out.println("doSome begin");
        try {
            Thread.sleep(1000 * 10);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        System.out.println("doSome over");
    }
    public synchronized static void doOther(){
        System.out.println("doOther begin");
        System.out.println("doOther over");
    }
}
```





### 七、死锁

#### 写法1：实现Runnable

> 原因：嵌套的`synchronized`导致两个线程互相等待
>
> 死锁的代码要会写，

```java
package com.bjpowernode.java.deadlock;

import com.bjpowernode.java.threadsafe3.T;

/**
 * @author 小火娃
 * @project_name: javase
 * @package_name: com.xiaohuowa.java.deadlock
 */
public class MyDeadLockTest {
    public static void main(String[] args) {
        Object o1 = new Object();
        Object o2 = new Object();

        Thread t1 = new Thread(new Dead(o1, o2));
        Thread t2 = new Thread(new Dead2(o1, o2));
        t1.start();
        t2.start();
    }

}

class Dead implements Runnable {
    Object o1 = null;
    Object o2 = null;

    public Dead(Object o1, Object o2) {
        this.o1 = o1;
        this.o2 = o2;
    }

    @Override
    public void run() {
        synchronized (o1) {
            try {
                Thread.sleep(1000);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
            synchronized (o2) {

            }
        }
    }

}
class Dead2 implements Runnable {
    Object o1 = null;
    Object o2 = null;

    public Dead2(Object o1, Object o2) {
        this.o1 = o1;
        this.o2 = o2;
    }

    @Override
    public void run() {
        synchronized (o2) {
            try {
                Thread.sleep(1000);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
            synchronized (o1) {

            }
        }
    }

}
```





#### 写法2：继承Thread

```java
package com.xiaohuowa.mythread.dead;

/**
 * @author 小火娃
 * @project_name: my_projects
 * @package_name: com.xiaohuowa.mythread.dead
 */
public class ThreadDeadLock {
    public static void main(String[] args) {
        Thread thread1 = new Thread(new DeadLock(true));
        Thread thread2 = new Thread(new DeadLock(false));
        thread1.start();
        thread2.start();
    }
}

class DeadLock extends Thread{
    static Object o1 = new Object();
    static Object o2 = new Object();

    private boolean lock;

    public DeadLock(boolean lock) {
        this.lock = lock;
    }

    @Override
    public void run() {

        if (lock) {
            // 一个线程进来先拿o1对象锁
            synchronized (o1) {
                System.out.println(Thread.currentThread().getName() + "获取到o1对象锁");
                // 之后请求o2对象锁，没拿到就blocked
                synchronized (o2) {
                    System.out.println(Thread.currentThread().getName() + "获取到o2对象锁");
                }
            }
        } else {
            // 请求o2对象锁，没拿到就blocked
            synchronized (o2) {
                System.out.println(Thread.currentThread().getName() + "获取到o2对象锁");
                synchronized (o1){
                    System.out.println(Thread.currentThread().getName() + "获取到o1对象锁");
                }
            }
        }

    }
}
```







### 八、开发中应该怎么解决线程安全问题

==注意：==不是一上来就选择线程同步吗，`synchronized`会让程序的执行效率降低，用户体验不好。系统的用户吞吐量降低。用户体验差。在不得已的情况下再选择线程同步机制。

1. **（优先）**第一种方案：尽量使用`局部变量代替“实例变量和静态变量”`。
2. **（其次）**第二种方案：如果必须是实例变量，那么可以考虑**创建多个对象**，这样实例变量的内存就不共享了。（一个线程对应1个对象，100个线程对应100个对象，对象不共享，就没有数据安全问题了。）
3. **（实在不行）**第三种方案：如果不能使用局部变量，对象也不能创建多个，这个时候就只能选择`synchronized`线程同步机制。





### 九、其他知识点

#### 一、守护线程

##### **java语言中线程分为两大类：**

1. 一类是：用户线程
2. 一类是：守护线程（后台线程）
   - 其中具有代表性的就是：垃圾回收线程（守护线程）。



##### 守护线程的特点

一般守护线程是一个死循环，所有的用户线程只要结束，守护线程自动结束。

注意：`主线程main方法是一个用户线程`



##### 守护线程用在什么地方呢？

比如一个软件需要每天在固定时间跳出来一下，就需要用到定时器，将其设置为守护线程，等到点了就跳一下。如果程序退出了（用户线程结束了），那么守护线程也自动退出。



##### 设置守护线程

> `线程对象.setDaemon(true);`**启动线程之前**，将`setDaemon`给个`true`，即可设置线程为守护线程

![image-20220814174235551](https://s2.loli.net/2023/10/12/9MFHTdlgUu2WAk7.png)



#### 二、定时器-Timer

![image-20220814181246357](https://s2.loli.net/2023/10/12/otRsdAVQP95fKag.png)

##### 作用

间隔特定的时间，执行特定的程序。



##### 原始定时器

可以使用`sleep方法`，睡眠，设置睡眠时间，没到这个时间点醒来，执行任务。这种方式是最原始的定时器。



##### 不那么原始的定时器

在Java的类库中已经写好了一个定时器：`java.util.Timer`，可以直接拿来用。不过，这种方式在目前的开发中也很少用，因为现在有很多高级框架都是支持定时任务的。

比如Spring的`SpringTask框架`。但是底层实现也是靠`java.util.Timer`


​	

##### 示例

```java
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Timer;
import java.util.TimerTask;

/*
	使用定时器指定定时任务。
 */
public class TimerTest {
    public static void main(String[] args) throws Exception {

        // 创建定时器对象
        Timer timer = new Timer();
        //Timer timer = new Timer(true); //守护线程的方式

        // 指定定时任务
        //timer.schedule(定时任务, 第一次执行时间, 间隔多久执行一次);
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        Date firstTime = sdf.parse("2020-03-14 09:34:30");
        // 十秒一次
        //timer.schedule(new LogTimerTask() , firstTime, 1000 * 10); 
        // 每年执行一次。
        //timer.schedule(new LogTimerTask() , firstTime, 1000 * 60 * 60 * 24 * 365);

        //匿名内部类方式
        timer.schedule(new TimerTask(){
            @Override
            public void run() {
                // code....
            }
        } , firstTime, 1000 * 10);  // 十秒一次

    }
}

// 编写一个定时任务类
// 假设这是一个记录日志的定时任务
class LogTimerTask extends TimerTask {

    @Override
    public void run() {
        // 编写需要执行的任务就行了。
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        String strTime = sdf.format(new Date());
        System.out.println(strTime + ":成功完成了一次数据备份！");
    }
}
```





#### 三、第三种线程写法

> 通过实现`Callable接口`的类，里面的`call()`相当于原来的`run()方法`，但是它**可以有返回值且可以throws异常**。用`未来任务对象.get()`可以得到线程的返回值。`get()`的出现会导致当前线程的**阻塞**（要等get到才能继续执行）

```java
import java.util.concurrent.Callable;
import java.util.concurrent.FutureTask; // JUC包下的，属于java的并发包，老JDK中没有这个包。新特性。

/*
实现线程的第三种方式：
    实现Callable接口
    这种方式的优点：可以获取到线程的执行结果。
    这种方式的缺点：效率比较低，在获取t线程执行结果的时候，当前线程受阻塞，效率较低。
 */
public class ThreadTest15 {
    public static void main(String[] args) throws Exception {

        // 第一步：创建一个“未来任务类”对象。
        // 参数非常重要，需要给一个Callable接口实现类对象。
        FutureTask task = new FutureTask(new Callable() {
            @Override
            public Object call() throws Exception { // call()方法就相当于run方法。只不过这个有返回值
                // 线程执行一个任务，执行之后可能会有一个执行结果
                // 模拟执行
                System.out.println("call method begin");
                Thread.sleep(1000 * 10);
                System.out.println("call method end!");
                int a = 100;
                int b = 200;
                return a + b; //自动装箱(300结果变成Integer)
            }
        });

        // 创建线程对象
        Thread t = new Thread(task);

        // 启动线程
        t.start();

        // 这里是main方法，这是在主线程中。
        // 在主线程中，怎么获取t线程的返回结果？
        // get()方法的执行会导致“当前线程阻塞”
        Object obj = task.get();
        System.out.println("线程执行结果:" + obj);

        // main方法这里的程序要想执行必须等待get()方法的结束
        // 而get()方法可能需要很久。因为get()方法是为了拿另一个线程的执行结果
        // 另一个线程执行是需要时间的。
        System.out.println("hello world!");
    }
}
```





#### 四、生产者和消费者模式

> 使用`wait方法`和`notify方法`实现**“生产者和消费者模式”**

> 注意：`wait和notify方法`**不是**线程对象的方法，**是普通Java对象（在Object就有的）都有的方法**。
>
> wait方法和notify方法建立在线程同步的基础之上。因为多线程要同时操作一个仓库。有线程安全问题。
>
> 1. `wait方法`作用：`o.wait()`让正在**o对象**上活动的**线程t**进入等待状态，并且释放掉t线程之前占有的o对象的锁。
> 2. `notify方法`作用：`o.notify()`让正在**o对象**上等待的线程唤醒，只是通知，**不会释放o对象上之前占有的锁**。



代码实现一种需求：两个线程交替运行，操作同一个对象，实现一个线程输出奇数一个线程输出偶数且数字递增的效果。



```java
/**
 * @author 小火娃
 * @project_name: javase
 * @package_name: com.java.thread.producer
 */
public class ProducerAndCustomer {
    public static void main(String[] args) {
        // 让num对象的i从0开始
        Num num = new Num(0);

        // 创建线程，共享num对象
        Thread t1 = new Thread(new Even(num));
        Thread t2 = new Thread(new Odd(num));

        // 改名
        t1.setName("t1");
        t2.setName("t2");

        // 开启线程
        t1.start();
        t2.start();

    }
}

class Even implements Runnable {
    Num num;

    public Even(Num num) {
        this.num = num;
    }

    @Override
    public void run() {
        while (true) {
            // 给num对象上锁
            synchronized (num) {
                // 如果当前是偶数的话，放弃CPU执行权、放弃num对象锁
                if (num.i % 2 != 0) {
                    try {
                        num.wait();
                    } catch (InterruptedException e) {
                        e.printStackTrace();
                    }
                }
                try {
                    Thread.sleep(1000);
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
                // 如果是奇数的话就输出num里的i
                System.out.println(Thread.currentThread().getName() + "-->" + num.i);
                // 递增
                num.i++;
                // 唤醒其他等待num对象的线程
                num.notifyAll();
            }
        }
    }
}

class Odd implements Runnable {

    Num num;

    public Odd(Num num) {
        this.num = num;
    }

    @Override
    public void run() {
        while (true) {
            // 获取num对象锁
            synchronized (num) {
                // 如果是偶数就放弃CPU执行权和num对象锁
                if (num.i % 2 == 0) {
                    try {
                        num.wait();
                    } catch (InterruptedException e) {
                        e.printStackTrace();
                    }
                }
                try {
                    Thread.sleep(1000);
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
                // 如果是奇数就输出对应内容
                System.out.println(Thread.currentThread().getName() + "-->" + num.i);
                // 递增
                num.i++;
                // 唤醒其他等待num对象的线程
                num.notifyAll();
            }
        }
    }
}

class Num {
    int i;

    public Num(int i) {
        this.i = i;
    }
}
```

实现效果：

![image-20220815141010671](https://s2.loli.net/2023/10/12/5jJYzbr2WlAvMH6.png)











# 反射

## 一、作用

1. 通过java语言中的反射机制可以**操作字节码文件**（可以读和修改字节码文件）。
2. 通过反射机制可以操作代码片段。（class文件。）



## 二、反射在`java.lang.reflect.*;`包下



## 三、反射机制相关的重要的类

1. `java.lang.Class`：代表**整个字节码**，代表一个类型，**代表整个类**。
2. `java.lang.reflect.Method`：代表字节码中的**方法字节码**。代表类中的方法。
3. `java.lang.reflect.Constructor`：代表字节码中的**构造方法字节码**。代表类中的构造方法
4. `java.lang.reflect.Field`：代表字节码中的**属性字节码**。代表类中的成员变量（静态变量+实例变量）。



## 四、获取`java.lang.Class对象`的三种方式

要操作一个类的字节码，需要首先获取到这个类的字节码对象，怎么获取`java.lang.Class`实例？

1. 第一种：`Class c = Class.forName("完整类名带包名");`

   - 主要用途：多用于配置文件，读取类全路径，加载类。

   - `Class`的静态方法、方法参数是个完整类名带包名的字符串

   - ![image-20220815142538079](https://s2.loli.net/2023/10/12/e813ZzVRoUTmua2.png)

   - ```java
     c1 = Class.forName("java.lang.String"); // c1代表String.class文件，或者说c1代表String类型。
     c2 = Class.forName("java.util.Date"); // c2代表Date类型
     Class c3 = Class.forName("java.lang.Integer"); // c3代表Integer类型
     Class c4 = Class.forName("java.lang.System"); // c4代表System类型
     ```

2. 第二种：`Class c = 对象.getClass();`

3. 第三种：`Class c = 任何类型.class;`

   - 主要用途：多用于参数传递，比如通过反射得到对应构造器对象

   - ```java
     // 第三种方式，java语言中任何一种类型，包括基本数据类型，它都有.class属性。
     Class z = String.class; // z代表String类型
     Class k = Date.class; // k代表Date类型
     Class f = int.class; // f代表int类型
     Class e = double.class; // e代表double类型
     ```

4. 第四种：通过类加载器

  - ~~~java
    ClassLoader cl = 对象.getClass().getClassLoader();
    Class clazz = cl.loadClass("类的全类名");
    ~~~

  - 


**如果是同一个类，那三种方法获得的引用都指向方法区中同一个`.class` 文件，一个类只有一个`.class`**

**在类加载时通过类加载器ClassLoader的loadClass()方法，创建对应的Class类对象放在==堆内存中==，这个Class对象==只有一个==；且会生成`.class`字节码二进制数据 /  元数据（存在==方法区==内存中）**





拓展：

1. 基本数据类型获取Class类对象

   - ~~~
     Class cls = 基本数据类型.class
     ~~~

2. 基本数据类型的包装类获取Class类对象

   - ~~~
     Class cls  = 包装类.TYPE
     ~~~

底层会进行自动装箱拆箱操作，实际上同一种类型的基本数据类型和包装类型拿到的Class对象都是同一份，也只有一份















## 五、用反射机制（Class）实例化对象的优点

==灵活==

> 1. 在配置文件中给一个`完整包名.类名`
> 2. 在Java代码中`Class.forName("包名.类名").newInstance()`即可创建出对应的对象，比起new来得灵活
>    - 注意：`newInstance()方法`内部实际上**调用了无参数构造方法**，必须保证无参构造存在才可以。没有无参构造会报错
>    - `newInstance()方法`从JDK9开始已经过时了
> 3. 为什么说灵活呢？
>    - 假设`"包名.类名"`是从配置文件读出来的，那么就可以仅修改配置文件而不需要动Java代码就可以实例化不同的对象了！这样写更符合**OCP开闭原则**

```java
public static void main(String[] args) {

    // 这是不使用反射机制，创建对象
    User user = new User();
    System.out.println(user);

    // 下面这段代码是以反射机制的方式创建对象。
    try {
        // 通过反射机制，获取Class，通过Class来实例化对象
        Class c = Class.forName("com.java.bean.User"); // c代表User类型。

        // newInstance() 这个方法会调用User这个类的无参数构造方法，完成对象的创建。
        // 重点是：newInstance()调用的是无参构造，必须保证无参构造是存在的！
        Object obj = c.newInstance();

        System.out.println(obj); // com.bjpowernode.java.bean.User@10f87f48
    } catch (ClassNotFoundException e) {
        e.printStackTrace();
    } catch (IllegalAccessException e) {
        e.printStackTrace();
    } catch (InstantiationException e) {
        e.printStackTrace();
    }
}
```

## 六、Class.forName()

==Class.forName("完整类名带包名");==

- 这个方法的执行会导致**类加载**，类加载时，**静态代码块执行**。

- 如果不想让类的其他代码执行，可以只用`Class.forName("完整类名带包名");`来装载类





## 七、:star::star:获取Field（属性）

1. `class对象.getFields()`可以获取**public修饰的Field**组成的数组
2. `class对象.getDeclaredFields();`可以获取**所有Field**组成的数组
3. `field对象.getName()`可以获取**属性名**
4. `field对象.getModifiers();`可以获取属性的**修饰符列表**，但是返回的是int类型的**代号**
   - 用`Modifier.toString(代号);`可以把代号转成字符串
5. `field对象.getType()`可以获取**数据类型**
   - 数据类型还可以`.getSimpleName();`获得简写的



```java
import java.lang.reflect.Field;
import java.lang.reflect.Modifier;

/*
	反射Student类当中所有的Field（了解一下）
 */
public class ReflectTest {
    public static void main(String[] args) throws Exception{

        // 获取整个类
        Class studentClass = Class.forName("com.java.bean.Student");
        
        String className = studentClass.getName();
        System.out.println("完整类名：" + className); //com.java.bean.Student

        String simpleName = studentClass.getSimpleName();
        System.out.println("简类名：" + simpleName); //Student

        // 获取类中所有的public修饰的Field
        Field[] fields = studentClass.getFields();
        System.out.println(fields.length); // 测试数组中只有1个元素
        // 取出这个Field
        Field f = fields[0];
        // 取出这个Field它的名字
        String fieldName = f.getName();
        System.out.println(fieldName);

        // 获取所有的Field
        Field[] fs = studentClass.getDeclaredFields();
        System.out.println(fs.length); // 4

        System.out.println("==================================");
        // 遍历
        for(Field field : fs){
            // 获取属性的修饰符列表
            int i = field.getModifiers(); // 返回的修饰符是一个数字，每个数字是修饰符的代号！！！
            System.out.println(i);
            // 可以将这个“代号”数字转换成“字符串”吗？
            String modifierString = Modifier.toString(i);
            System.out.println(modifierString);
            // 获取属性的类型
            Class fieldType = field.getType();
            //String fName = fieldType.getName();
            String fName = fieldType.getSimpleName();
            System.out.println(fName);
            // 获取属性的名字
            System.out.println(field.getName());
        }
    }
}
```



### 通过获取field来拼接出类中的属性

以后不会用到的，

```java
import java.lang.reflect.Field;
import java.lang.reflect.Modifier;

/**
 * @author 小火娃
 * @project_name: javase
 * @package_name: com.java.reflect
 */
public class MyReTest {
    public static void main(String[] args) throws ClassNotFoundException {
        Class<?> studentClass = Class.forName("java.lang.Thread");

        StringBuffer buffer = new StringBuffer();

        buffer.append(Modifier.toString(studentClass.getModifiers())+ " class " + studentClass.getSimpleName() + " {\n");

        for (Field field : studentClass.getDeclaredFields()) {
            buffer.append("\t");
            // 获取修饰符
            buffer.append(Modifier.toString(field.getModifiers()));
            buffer.append(" ");
            // 获取类型
            buffer.append(field.getType().getSimpleName());
            buffer.append(" ");
            // 获取名字
            buffer.append(field.getName());
            buffer.append(";\n");
        }

        buffer.append("}");
        System.out.println(buffer);
    }
}
```



![image-20220815212007446](https://s2.loli.net/2023/10/12/8PLUVk16x4r2Dya.png)





### :star::star:利用反射获取和设置属性值

用法：

1. 通过`Class对象.newInstance();`获得一个类的`实例`
2. 通过`Class对象.getDeclaredField(属性名);`获得对应属性（Field）
   - 如果是私有的仅用这个方式是不能访问的
   - 需要`Field对象.setAccessible(true);`来让私有属性可以访问
   - 这也是**反射的缺点**：会破坏封装，可能造成危险
3. `Field对象.set(实例, 值);`给实例的field上赋值
4. `Field对象.get(实例);`获取实例的field的值

```java
import com.java.bean.Student;

import java.lang.reflect.Field;

/*
必须掌握：
    怎么通过反射机制访问一个java对象的属性？
        给属性赋值set
        获取属性的值get
 */
public class ReflectTest {
    public static void main(String[] args) throws Exception{

        // 我们不使用反射机制，怎么去访问一个对象的属性呢？
        Student s = new Student();

        // 给属性赋值
        s.no = 1111; //三要素：给s对象的no属性赋值1111
                    //要素1：对象s
                    //要素2：no属性
                    //要素3：1111

        // 读属性值
        // 两个要素：获取s对象的no属性的值。
        System.out.println(s.no);

        // 使用反射机制，怎么去访问一个对象的属性。（set get）
        Class studentClass = Class.forName("com.java.bean.Student");
        Object obj = studentClass.newInstance(); // obj就是Student对象。（底层调用无参数构造方法）

        // 获取no属性（根据属性的名称来获取Field）
        Field noFiled = studentClass.getDeclaredField("no");

        // 给obj对象(Student对象)的no属性赋值
        /*
        虽然使用了反射机制，但是三要素还是缺一不可：
            要素1：obj对象
            要素2：no属性
            要素3：2222值
        注意：反射机制让代码复杂了，但是为了一个“灵活”，这也是值得的。
         */
        noFiled.set(obj, 22222); // 给obj对象的no属性赋值2222

        // 读取属性的值
        // 两个要素：获取obj对象的no属性的值。
        System.out.println(noFiled.get(obj));

        // 可以访问私有的属性吗？
        Field nameField = studentClass.getDeclaredField("name");

        // 打破封装（反射机制的缺点：打破封装，可能会给不法分子留下机会！！！）
        // 这样设置完之后，在外部也是可以访问private的。
        nameField.setAccessible(true);

        // 给name属性赋值
        nameField.set(obj, "jackson");
        // 获取name属性的值
        System.out.println(nameField.get(obj));
    }
}
```





## 八、:star::star::star:获取Method

### 利用反射获取方法签名内容

1. 通过`Class对象.getDeclaredMethods();`获取所有`Method数组`
2. 遍历`Method数组`拿到每个`method`
3. 用`Modifier.toString(method.getModifiers())`**获取修饰符列表**
4. 用`method.getReturnType().getSimpleName()`**获取返回值类型**
5. 用`method.getName()`**获取方法名**
6. 用`method.getParameterTypes();`获取`Class数组`的**参数修饰符列表**
7. 遍历这个修饰符列表，用每个`Class对象.getSimpleName()`即可获取**参数类型**

```java
import java.lang.reflect.Method;
import java.lang.reflect.Modifier;

public class ReflectTest {
    public static void main(String[] args) throws Exception{

        // 获取类了
        Class userServiceClass = Class.forName("com.java.service.UserService");

        // 获取所有的Method（包括私有的！）
        Method[] methods = userServiceClass.getDeclaredMethods();
        //System.out.println(methods.length); // 2

        // 遍历Method
        for(Method method : methods){
            // 获取修饰符列表
            System.out.println(Modifier.toString(method.getModifiers()));
            // 获取方法的返回值类型
            System.out.println(method.getReturnType().getSimpleName());
            // 获取方法名
            System.out.println(method.getName());
            // 方法的参数修饰符列表（一个方法的参数可能会有多个。）
            Class[] parameterTypes = method.getParameterTypes();
            for(Class parameterType : parameterTypes){
                System.out.println(parameterType.getSimpleName());
            }
        }
    }
}
```



### 反编译Method

```java
import java.lang.reflect.Method;
import java.lang.reflect.Modifier;

/**
 * @author 小火娃
 * @project_name: javase
 * @package_name: com.java.reflect
 */
public class ReMethod{
    public static void main(String[] args) throws Exception{
        Class<?> userServiceClass = Class.forName("com.java.service.UserService");

        StringBuffer buffer = new StringBuffer();

        // 拼上类名
        buffer.append(Modifier.toString(userServiceClass.getModifiers())  + " class " + userServiceClass.getSimpleName() + " {\n");

        // 获取所有方法
        for (Method declaredMethod : userServiceClass.getDeclaredMethods()) {
            buffer.append("\t");
            buffer.append(Modifier.toString(declaredMethod.getModifiers()));  // 获取方法的修饰符
            buffer.append(" ");
            buffer.append(declaredMethod.getReturnType().getSimpleName());  // 获取方法的返回值类型
            buffer.append(" ");
            buffer.append(declaredMethod.getName());  // 获取方法名字
            buffer.append("(");  // 拼上参数的左括号
            Class<?>[] parameterTypes = declaredMethod.getParameterTypes();  // 获取参数数组
            for (Class<?> parameterType : parameterTypes) {
                buffer.append(parameterType.getSimpleName());  // 获取参数类型
                buffer.append(",");
            }
            // 如果是无参的话，“,”的位置就不会在参数列表里，就不会多删左括号
            // 如果是有参的话，“,”会在最后多一个，只要用length-1就就能判断并删掉了
            if (buffer.lastIndexOf(",") == buffer.length() - 1){
                buffer.deleteCharAt(buffer.length() - 1);
            }
            buffer.append(") {}\n");  // 方法结尾
        }
        buffer.append("}");  // 类结尾

        System.out.println(buffer);
    }

}
```



### :star::star::star:通过反射机制调用方法

通过`Method对象.invoke`来:sta通过反射机制调用方法

![image-20220816230559615](https://s2.loli.net/2023/10/12/cdxG6emiL1UI85V.png)

> 在Java中，方法的调用需要以下四要素：
>
> 1. 对象（静态方法就类）
> 2. 方法名
> 3. 形参
> 4. 返回值
>
> 确定一个方法的方式主要靠在一个类里的 **方法名 + 形参类型数量**（如果出现重载的话，两个方法有相同数量的形参，那这些形参就不会有相同的类型）来确定

> 通过反射机制调用方法：
>
> 1. 获取`类的Class对象`
> 2. 获取`Class对象的实例`
> 3. 通过`Class对象.getDeclaredMethod("指定方法名"[, String.class, String.class]);`来**获取对应的方法**
>    - ![image-20220816225912780](https://s2.loli.net/2023/10/12/YuT4KmQo6FN3GHP.png)
>    - `getDeclaredMethod`传入**一个方法名**加上**形参的类的字节码**
> 4. 通过`方法名.invoke(Class对象的实例, "String形参", "String形参");`来获取**返回值**

![image-20220816230435709](https://s2.loli.net/2023/10/12/TuV5oxwhbfZF1L4.png)

```java
import java.lang.reflect.Method;

/**
 * @author 小火娃
 * @project_name: javase
 * @package_name: com.java.reflect
 */
public class MyUserMethod {
    public static void main(String[] args) throws Exception {
        // 获取Class对象
        Class<?> userServiceClass = Class.forName("com.java.service.UserService");

        // 实例化
        Object userService = userServiceClass.newInstance();

        // Class对象获取指定名字的方法，给定形参的类的字节码
        Method login = userServiceClass.getDeclaredMethod("login", String.class, String.class);

        /*
            方法调用的四要素：
            叫login的方法
            叫userService的对象
            "root","pwd" 实参
            returnValue 返回值
         */
        Object returnValue = login.invoke(userService, "root", "pwd");

        System.out.println(returnValue);  // true

    }
}
```



## 九、:star:获取构造方法Constructor

### 获取构造方法

```java
import java.lang.reflect.Constructor;
import java.lang.reflect.Modifier;

/**
 * @author 小火娃
 * @project_name: javase
 * @package_name: com.java.reflect
 */
public class MyReCon {
    public static void main(String[] args) throws Exception {
        // 获取Class对象
        Class<?> vipClass = Class.forName("com.java.bean.Vip");

        StringBuffer buffer = new StringBuffer();

        buffer.append(Modifier.toString(vipClass.getModifiers()) + " class " + vipClass.getSimpleName() + " {\n");

        // 获取所有构造方法
        Constructor<?>[] constructors = vipClass.getDeclaredConstructors();
        for (Constructor<?> constructor : constructors) {
            buffer.append("\t");
            // 修饰符
            buffer.append(Modifier.toString(constructor.getModifiers()));
            buffer.append(" ");
            // 构造方法直接用类名
            buffer.append(vipClass.getSimpleName());
            buffer.append("(");
            // 拼接参数
            Class<?>[] parameterTypes = constructor.getParameterTypes();
            for (Class<?> parameterType : parameterTypes) {
                buffer.append(parameterType.getSimpleName());
                buffer.append(",");
            }
            // 删除有参构造的最后一个多余的逗号
            if (parameterTypes.length != 0) {
                buffer.deleteCharAt(buffer.length() - 1);
            }
            buffer.append(") {}\n");
        }

        buffer.append("}");
        System.out.println(buffer);
    }
}
```



### :star:通过反射机制创建对象

> 在一个类中，区分构造方法只能通过它们参数的不同（因为名字都是类名）
>
> 1. 无参构造可以通过`Class对象.newInstance();`（JDK9之后就过时的）来调用
>    - 无参构造也可以通过下面的方法来调用
> 2. 有参可以通过以下方法来调用

1. 通过`Class对象.getDeclaredConstructor(类<?>... parameterTypes)` 来获取一个构造方法
   - ![image-20220817120542742](https://s2.loli.net/2023/10/12/pmHMXa7dhbEvgG8.png)
2. 用`构造方法对象.newInstance(参数...)`可以调用有参构造
   - 具体要传入几个参数根据获取构造方法的时候给的参数来定



```java
import java.lang.reflect.Constructor;

/**
 * @author 小火娃
 * @project_name: javase
 * @package_name: com.java.reflect
 */
public class MyReConNew {
    public static void main(String[] args) throws Exception {
        Class<?> aClass = Class.forName("com.java.bean.Vip");

        // 获取无参构造，方法一
        Object obj1 = aClass.newInstance();
        System.out.println(obj1);

        // 获取无参构造，方法二
        Constructor<?> constructor = aClass.getDeclaredConstructor();
        Object obj2 = constructor.newInstance();  // 调无参就直接newInstance();就行
        System.out.println(obj2);

        // 获取有参构造
        Constructor<?> constructor1 = aClass.getDeclaredConstructor(int.class, String.class, String.class);  // 参数根据构造方法的来
        Object obj3 = constructor1.newInstance(666, "haha", "gg");
        System.out.println(obj3);

    }
}
```







## 十、:star::star:获取实现的接口和父类

- `Class对象.getSuperclass()`**获取父类**
- `Class对象.getInterfaces()`**获取接口**（因为可以实现多个接口，所以**返回的是Class数组**）

```java
public class ReflectTest {
    public static void main(String[] args) throws Exception{

        // String举例
        Class stringClass = Class.forName("java.lang.String");

        // 获取String的父类
        Class superClass = stringClass.getSuperclass();
        System.out.println(superClass.getName());

        // 获取String类实现的所有接口（一个类可以实现多个接口。）
        Class[] interfaces = stringClass.getInterfaces();
        for(Class in : interfaces){
            System.out.println(in.getName());
        }
    }
}
```





## 十一、反射优化

> 通过关闭访问检查来提高效率
>
> 在`Method`，`Field`，`Constructor`中都有`setAccessible()方法`
>
> 将其设置为**true**时，代表反射对象在使用时取消访问检查，会提高一点反射的效率。
>
> 将其设置为**false**时，代表执行访问检查



~~~
结果：
method1 耗时：11
method2 耗时：3520
method3 耗时：146

Process finished with exit code 0
~~~

```java
package com.xiaohuowa.reflect;

import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;

/**
 * @author 小火娃
 * @project_name: my_projects
 * @package_name: com.xiaohuowa.reflect
 */
public class YouHuaReflect {
    public static void main(String[] args) throws ClassNotFoundException, InvocationTargetException, InstantiationException, IllegalAccessException, NoSuchMethodException {
        method1();
        method2();
        method3();
    }

    static void method1() {
        // 计算开始时间
        long start = System.currentTimeMillis();
        A a = new A();
        // 重复调用方法，为了让结果更加明显一点
        for (int i = 0; i < 9999999; i++) {
            a.m1();
        }
        // 记录结束时间
        long end = System.currentTimeMillis();
        // 输出结果
        System.out.println("method1 耗时：" + (end - start));
    }

    static void method2() throws ClassNotFoundException, InstantiationException, IllegalAccessException, NoSuchMethodException, InvocationTargetException {
        long start = System.currentTimeMillis();
        Class<?> aClass = Class.forName("com.xiaohuowa.reflect.A");
        Object o = aClass.newInstance();
        Method m1 = aClass.getMethod("m1");
        for (int i = 0; i < 9999999; i++) {
            m1.invoke(o);
        }
        long end = System.currentTimeMillis();
        System.out.println("method2 耗时：" + (end - start));
    }

    static void method3() throws ClassNotFoundException, InstantiationException, IllegalAccessException, NoSuchMethodException, InvocationTargetException {
        long start = System.currentTimeMillis();
        Class<?> aClass = Class.forName("com.xiaohuowa.reflect.A");
        Object o = aClass.newInstance();
        Method m1 = aClass.getMethod("m1");
        m1.setAccessible(true);  // 取消访问检查，会加快一点点速度
        for (int i = 0; i < 9999999; i++) {
            m1.invoke(o);
        }
        long end = System.currentTimeMillis();
        System.out.println("method3 耗时：" + (end - start));
    }


}

class A{
    public void m1(){}
}
```













# 注解

## 概述

注解，或者叫做注释类型，英文单词是：Annotation，是一种引用数据类型。编译之后也是生成xxx.class文件。

### 定义注解：

```java
 [修饰符列表] @interface 注解类型名{

 }
```



### 使用注解：

注解使用时的语法格式是：@注解类型名

注解可以出现在类上、属性上、方法上、变量上、注解还可以出现在注解类型上等....



### 元注解概念

用来标注“注解类型”的“注解”，称为元注解。



## JDK自带注解

### java.lang包下的注释类型

	掌握：
	Deprecated 用 @Deprecated 注释的程序元素，不鼓励程序员使用这样的元素，通常是因为它很危险或存在更好的选择。 
	
	掌握：
	Override 表示一个方法声明打算重写超类中的另一个方法声明。 主要是用来给编译器看的，跟运行阶段无关，让它知道被注解的这个方法是个重写父类的方法，编译器会自动进行检查。
	
	不用掌握：
	SuppressWarnings 指示应该在注释元素（以及包含在该注释元素中的所有程序元素）中取消显示指定的编译器警告。 



### 关于Target注解

		这是一个元注解，用来标注“注解类型”的“注解”
		这个Target注解用来标注“被标注的注解”可以出现在哪些位置上。
	
		@Target(ElementType.METHOD)：表示“被标注的注解”只能出现在方法上。
		@Target(value={CONSTRUCTOR, FIELD, LOCAL_VARIABLE, METHOD, PACKAGE, MODULE, PARAMETER, TYPE})
			表示该注解可以出现在：
				构造方法上
				字段上
				局部变量上
				方法上
				....
				类上...



### 关于Retention注解

		这是一个元注解，用来标注“注解类型”的“注解”
		这个Retention注解用来标注“被标注的注解”最终保存在哪里。
	
		@Retention(RetentionPolicy.SOURCE)：表示该注解只被保留在java源文件中。
		@Retention(RetentionPolicy.CLASS)：表示该注解被保存在class文件中。
		@Retention(RetentionPolicy.RUNTIME)：表示该注解被保存在class文件中，并且可以被反射机制所读取。





## 注解的属性

以`Deprecated注解`源码为例，两个红框的就是属性（虽然看着很像方法）

注意几点：

1. 如果属性后面没加`default`的话，那在用这个注解的时候一定要**显式地给出 属性名 = 属性值**
   - 如：`@Deprecated(since = "1")`
2. 如果属性名是`value`且**只有这一个属性**的时候，使用注解**可以不写出属性名，直接给值就行**
   - 如果除了`value`还有其他属性的话，就**不能**省略属性名了（如第二行的`@Retention`注解，后面没跟属性名，实际上就是只有一个叫`value`的属性）

![image-20220817142500568](https://s2.loli.net/2023/10/12/OgjBzNc8lxfrA41.png)



### 属性类型可以是哪些

`byte short int long float double boolean char String Class 枚举类型`以及它们的数组形式

**注**：用的时候如果**数组只有一个元素**的话，可以**不写**大括号`{}`

#### 以`Deprecated注解`源码为例：

##### `@Retention`

- 红框位置省略了属性名，所以`@Retention`注解实际上就是只有一个叫`value`的属性

![image-20220817144209663](https://s2.loli.net/2023/10/12/jKRXhWBudiYStJF.png)

- 在`Retention注解`里有个`RetentionPolicy value();`进入`RetentionPolicy` 可以发现是个**枚举类型**
- 所以在`Deprecated注解`上加了`@Retention(RetentionPolicy.RUNTIME)`意味着注解可以保存在字节码文件中且可以被反射机制读取
  - 如果是`RetentionPolicy.SOURCE`，表示注解只会保留在源代码中
  - 如果是`RetentionPolicy.CLASS`，代表会保存进字节码文件中

![image-20220817144315098](https://s2.loli.net/2023/10/12/iWr7SKGgPHjwtVn.png)

![image-20220817144409856](https://s2.loli.net/2023/10/12/G7H9f3KOVUIxS2h.png)

##### @Target

![image-20220817144706078](https://s2.loli.net/2023/10/12/2bhEgqjDkp4G5TH.png)

- 为什么值加了大括号？因为这是个**数组**
- 因为`Target`里面**只有一个叫`value`的属性**，所以其实用的时候**可以省略**`value`的

![image-20220817144928740](https://s2.loli.net/2023/10/12/opdQHqjeZCx4gu8.png)

- 再进入`ElementType`可以看出这是个**枚举**





## 反射注解

> 1. 判断有没有某个注解
>    - 通过`Class对象.isAnnotationPresent(注解.class);`获取这个Class对象是否有这个注解，有的话返回true，没有返回false
> 2. 获取注解
>    - 通过`Class对象.getAnnotation(注解.class);`获取注解对象
>    - 通过`注解对象.属性名()`方式

先自定义个注解

```java
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

/**
 * @author 小火娃
 * @project_name: javase
 * @package_name: com.java.myanno
 */
// 代表只给类和普通方法用
@Target({ElementType.TYPE, ElementType.METHOD})
// 代表让反射可以获取到
@Retention(RetentionPolicy.RUNTIME)
public @interface MyAnno {
    int value() default 0;
}
```



在写个类使用注解

```java
/**
 * @author 小火娃
 * @project_name: javase
 * @package_name: com.java.myanno
 */
@MyAnno(100)
public class MyAnnoTest {

}
```



通过反射获取注解值

```java
import java.lang.annotation.Annotation;

/**
 * @author 小火娃
 * @project_name: javase
 * @package_name: com.java.myanno
 */
public class MyReAnno {
    public static void main(String[] args) throws ClassNotFoundException {
        // 获取类
        Class<?> aClass = Class.forName("com.java.myanno.MyAnnoTest");

        // 遍历所有注解
        // for (Annotation annotation : aClass.getAnnotations()) {
        //     System.out.println(annotation);
        // }

        // 如果MyAnno注解存在的话
        if (aClass.isAnnotationPresent(MyAnno.class)) {
            // 输出注解的属性值
            // 注意这里的value()的value是属性名！！！！
            System.out.println(aClass.getAnnotation(MyAnno.class).value());
        }

    }
}
```





## 注解作用

可以用来判断有这个注解怎么样，没这个注解怎么样

就好像`@Override`注解在方法上时，就要求方法必须是重写的一样，否则抛异常











# 拓展

## 文件相对路径

> IDEA 下文件默认相对位置是从`Project根`开始的，写路径直接从模块名开始，继续往后写就行

## 获取文件的绝对路径

通过`Thread.currentThread().getContextClassLoader().getResource("类的根路径下的相对路径").getPath();`可以获得文件的String类型的绝对路径

通过`Thread.currentThread().getContextClassLoader().getResourceAsStream("类的根路径下的相对路径");`可以以流的形式返回

> 当项目移动到其他地方后，最好获取文件的操作是动态的
>
> 用以下方法可以动态获取文件路径（绝对路径），但是<font>前提是：文件在根目录下（`src`）下</font>
>
> 
>
> **注：**其实**根目录不是src**，而是在编译后工程下有个`out/production/自己写的模块`，这里面就**类似**是src目录下的东西了。只不过都是编译过的，**Java文件都是.class的字节码文件**，所以用这种方式是拿不到.java的文件的（会报空指针异常）

~~~java
/*
* 解释：
* Thread.currentThread() 当前线程对象
* getContextClassLoader() 是线程对象的方法，可以获取到当前线程的类加载器对象。
* getResource() 【获取资源】这是类加载器对象的方法，当前线程的类加载器默认从类的根路径下加载资源。
*/
String path = Thread.currentThread().getContextClassLoader()
    .getResource("classinfo2.properties").getPath(); // 这种方式获取文件绝对路径是通用的。
~~~



## 资源绑定器

> 资源绑定器来自`java.util.ResourceBundle`
>
> 在用`ResourceBundle.getBundle("[包名/]db");`的时候，<font>前提是：文件在根目录下（`src`）下，文件必须是`.properties文件`</font>，写在路径里的时候要**去掉.properties后缀

```Java
import java.util.ResourceBundle;

/*
java.util包下提供了一个资源绑定器，便于获取属性配置文件中的内容。
使用以下这种方式的时候，属性配置文件xxx.properties必须放到类路径下。
 */
public class ResourceBundleTest {
    public static void main(String[] args) {

        // 资源绑定器，只能绑定xxx.properties文件。并且这个文件必须在类路径下。文件扩展名也必须是properties
        // 并且在写路径的时候，路径后面的扩展名不能写。
        //ResourceBundle bundle = ResourceBundle.getBundle("classinfo2");

        ResourceBundle bundle = ResourceBundle.getBundle("[包名/]db");

        String s = bundle.getString("key");
        System.out.println(s);

    }
}
```

## 类加载器

### 什么是类加载器

专门负责加载类的命令/工具。ClassLoader

### JDK中自带了3个类加载器

1. 启动类加载器:rt.jar
2. 扩展类加载器:ext/*.jar
3. 应用类加载器:classpath



### 类加载器加载过程

假设有这样一段代码：`String s = "abc";`

代码在开始执行之前，会将所需要类全部加载到JVM当中。通过类加载器加载，看到以上代码类加载器会找`String.class文件`，找到就加载，加载过程如下：

1. 首先通过“启动类加载器”加载。
   - 注意：启动类加载器专门加载：`C:\Program Files\Java\jdk1.8.0_101\jre\lib\rt.jar`
     - `rt.jar`中都是JDK最核心的类库
2. 如果通过“启动类加载器”加载不到的时候，会通过"扩展类加载器"加载。
   - 注意：扩展类加载器专门加载：`C:\Program Files\Java\jdk1.8.0_101\jre\lib\ext\*.jar`
3. 如果“扩展类加载器”没有加载到，那么会通过“应用类加载器”加载。
   - 注意：应用类加载器专门加载：classpath中的类。



### 双亲委派机制

> **简单说就是类加载的时候“启动类加载器”优先，"扩展类加载器"第二，最后才“应用类加载器”**
>
> 因为如果心机叵测之人写了和Java自带的类一样的类的话，在里面动了手脚，那如果先找“应用类加载器”的话就会先把他写的类加载进去，可能会造成影响。

Java中为了保证类加载的安全，使用了双亲委派机制。**优先从启动类加载器中加载**，这个称为“父”。“父”无法加载到，**再从扩展类加载器中加载**，这个称为“母”。双亲委派。如果都加载不到，才会考虑从应用类加载器中加载。直到加载到为止。



## 异常

子类重写父类的方法，子类**不能**比父类抛出<u>更宽泛的或者更多的异常</u>



## 可变长度参数

可变长度形参的写法：`数据类型... 变量名`

注意：

1. **三个点是必须的**
2. **参数要求可以是0-n个**
3. 可变长度参数在全部形参里**只能有一个**，而且必须在最后的位置上
4. 可变长度参数可以当**做一个数组来看**

```java
package com.java.reflect;

public class ArgsTest {
    public static void main(String[] args) {
        m();
        m(10);
        m(10, 20);

        m2(100);
        m2(200, "abc");
        m2(200, "abc", "def");
        m2(200, "abc", "def", "xyz");

        m3("ab", "de", "kk", "ff");

        String[] strs = {"a","b","c"};
        // 也可以传1个数组
        m3(strs);

        // 直接传1个数组
        m3(new String[]{"我","是","中","国", "人"}); //没必要

        m3("我","是","中","国", "人");
    }

    public static void m(int... args){
        System.out.println("m方法执行了！");
    }

    //public static void m2(int... args2, String... args1){}

    // 必须在最后，只能有1个。
    public static void m2(int a, String... args1){

    }

    public static void m3(String... args){
        //args有length属性，说明args是一个数组！
        // 可以将可变长度参数当做一个数组来看。
        for(int i = 0; i < args.length; i++){
            System.out.println(args[i]);
        }
    }

}
```

