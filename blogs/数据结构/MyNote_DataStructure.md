## 快速排序

### 实现过程：

1. 设计函数，参数为数组和需要排序的区间（left和right索引）
2. 设置左右指针等于左右索引，用于在排序的时候进行依次比较
3. 选择当前排序区间的第一个数作为基准数pivot
   - 之后的比较都以这个基准数为依据，小于基准数的放左边，大于基准数的放右边
4. 在左指针小于右指针的情况下，进行循环判断
   - 先判断右指针指向的数是否大于基准数，如果大于的话就不用动，让右指针左移；如果小于的话就把右指针指向的数塞给左指针指向的位置。（第一次的时候左指针指向的是基准数的位置，这个基准数已经被取出了，所以直接覆盖就可以了）
   - 判断左指针指向的数是否小于基准数，如果小于的话就不用动，让左指针右移；如果大于的话就把左指针指向的数塞给右指针指向的位置
5. 循环结束的时候
   - 左右指针会相遇，此时中间位置可以理解为是空缺的，这时候将基准数放入即可
6. 进行递归前的判断
   - 如果左指针小于right索引的话，表示当前排好序的区间的右边还有数据没排，此时可以将左指针右移一位作为递归的left索引，将数组和right索引重新传进方法进行递归
   - 如果右指针大于left索引的话，表示当前排好序的区间的左边还有数据没排，此时可以将右指针左移一位作为递归的right索引，将数组和left索引重新传进方法进行递归





~~~java
import java.util.Arrays;

/**
 * @author 小火娃
 * @project_name: my_project
 * @package_name: com.xiaohuowa.arraysort
 * 快速排序：
 *     每次选择一个基准数，剩余比基准数小的都放左边，大于等于基准数的放右边
 *     下一次将左右两块再进行分别快速排序
 */
public class ArrayQuickSort {
    public static void main(String[] args) {
        int[] arr = new int[]{5, 8, 10, 1, -2, 6, 7, -2, 6, 7, 5, 3, 7, 6, 4, 1, 0, 2, 9, 10, 8};
        toSort(0, arr, arr.length-1);
        System.out.println(Arrays.toString(arr));
    }

    public static void toSort(int left, int[] arr, int right){
        int l = left;
        int r = right;
        // 选择每次排序的部分的第一个数作为基准数
        int pivot = arr[l];
        // 如果两个指针没有相遇就一直循环
        while (l < r) {
            // 如果r指针指向的数不小于基准数的话就向左移动r指针
            while (arr[r] >= pivot && l < r){
                r--;
            }
            if (l < r){
                arr[l] = arr[r];
            }
            // 如果l指针指向的数比基准数小的话就向右移动l指针
            while (arr[l] < pivot && l < r){
                l++;
            }
            if (l < r){
                arr[r] = arr[l];
            }
        }
        // 到这里的时候两个指针相遇，给这个空位赋值pivot，这一轮排序结束
        arr[r] = pivot;

        // 递归进行其他部分的排序
        if (l < right) {
            toSort(l + 1, arr, right);
        }
        if (r > left) {
            toSort(left, arr, r - 1);
        }
    }

}
~~~





## 直接插入排序

### 递归实现过程

1. 第一次排序
   - 将数组第二个数和第一个数进行比较，如果第二个数小的话就放到第一个数前面
   - 第一次排序结束后排好的部分就有两个数了、
   - 下一次排序就从第三个数开始往前判断即可
2. 之后的while循环排序
   - 判断当前数和前面的数的大小
   - 如果当前数小的话就换位置到前面，**只要找到一个数比当前数更小就停止循环**（因为排好序的部分可以保证前面的部分都会比当前数小了）
3. while循环结束后
   - 将索引index++，指向数组下一个位置的数。如果没到数组末尾的话，就讲数组和index传入函数进行递归



### 递归实现代码

~~~java
import java.util.Arrays;

/**
 * @author 小火娃
 * @project_name: my_project
 * @package_name: com.xiaohuowa.arraysort
 */
public class InsertSort {
    public static void main(String[] args) {
        int[] arr = new int[]{2,9,4,7,3,3,6,5};
        System.out.println("排序前数组：\t\t" + Arrays.toString(arr));
        insertSort(arr, 1);
        System.out.println("排序完成后数组：\t" + Arrays.toString(arr));
    }

    public static void insertSort(int[] arr, int index) {
        // 临时变量
        int temp = 0;
        // 定义p指针用于当次排序的循环判断
        int p = index;
        // 如果p指针没有到数组的起点，就一直循环
        while (p >= 0) {
            // 如果当前数比前一个数小的话，就换位置，否则退出循环
            if (arr[p] < arr[p-1]) {
                temp = arr[p-1];
                arr[p-1] = arr[p];
                arr[p] = temp;
            } else {
                break;
            }
            p--;
        }
        index++;
        if (index == arr.length-1) {
            return;
        }
        insertSort(arr, index);
    }
}

~~~





### for循环实现过程

1. 第一次排序

   - 将数组第二个数和第一个数进行比较，如果第二个数小的话就放到第一个数前面
   - 第一次排序结束后排好的部分就有两个数了、
   - 下一次排序就从第三个数开始往前判断即可

2. for循环

   - i 用于每次循环都指向下一个未排序的数字
   - 定义一个 p 指针，指向 i 的位置，用于当次排序往前逐个比较
3. 之后的while循环排序

   - 判断当前数和前面的数的大小
   - 如果当前数小的话就换位置到前面，**只要找到一个数比当前数更小就停止循环**（因为排好序的部分可以保证前面的部分都会比当前数小了）

   



### for循环实现代码

```java
import java.util.Arrays;

/**
 * @author 小火娃
 * @project_name: my_project
 * @package_name: com.xiaohuowa.arraysort
 */
public class InsertSortFor {
    public static void main(String[] args) {
        int[] arr = new int[]{2,9,4,7,3,3,6,5};
        System.out.println("排序前数组：\t\t" + Arrays.toString(arr));

        // 第一次从第二个元素开始比较，总共需要比较 数组长度-2 次
        for (int i = 1; i < arr.length; i++) {
            // 定义p指针用于当次排序的循环判断
            int p = i;
            // 临时变量
            int temp = 0;
            while (p >= 0) {
                // 如果当前数比前一个数小的话，就换位置，否则退出循环
                if (arr[p] < arr[p-1]) {
                    temp = arr[p-1];
                    arr[p-1] = arr[p];
                    arr[p] = temp;
                } else {
                    break;
                }
                p--;
            }
        }

        System.out.println("排序完成后数组：\t" + Arrays.toString(arr));
    }
}
```





## 选择排序

### 实现过程

1. 从所有未排序的数中找到一个最小的数
2. 将这个数放到已排好序的部分的最后



### 实现代码

```java
package com.xiaohuowa.select;

import java.util.Arrays;

/**
 * @author 小火娃
 * @project_name: my_project
 * @package_name: com.xiaohuowa.select
 */
public class SelectSort {
    public static void main(String[] args) {
        int[] arr = new int[]{2,9,4,7,3,3,6,5};
        System.out.println("排序前数组：\t\t" + Arrays.toString(arr));

        // 最小值
        int min = arr[0];
        // 临时变量
        int temp = 0;
        // 存储在一轮排序过程中找到的最小值的下标
        int index = 0;
        // 外层for用于控制循环次数
        for (int i = 0; i < arr.length; i++) {
            // 如果 i 已经到了数组最后一个了，就不需要再交换了
            if (i == arr.length - 1) {
                break;
            }
            // 每次开始循环最小值都等于未排序的第一个元素
            min = arr[i];
            // 内层for用于当次排序的比较
            for (int j = i; j < arr.length; j++) {
                // 如果未排序数组的某个元素小于最小值，就哦修改最小值和记录这个元素的下标
                if (arr[j] < min) {
                    min = arr[j];
                    index = j;
                }
            }
            // 内层for结束之后将最小值和未排序数组的第一个交换
            temp = arr[i];
            arr[i] = arr[index];
            arr[index] = temp;
        }
        System.out.println("选择排序后数组：\t" + Arrays.toString(arr));
    }
}
```







## 希尔排序

> 虽然从宏观上看希尔排序是把一堆数分组进行排序，但是从代码实现上来说，本质上还是两个数的两两比较

### 实现过程

1. 增量gap是数组长度的一半，且每次循环过后都会将gap再缩小一半
2. 获得增量gap之后将 i 设置为gap的值
   - **每次的比较实际上都是两个数进行比大小的**
   - i 用于记录靠右边数字的索引
   - 每次循环都把 i 的值给 index 变量存着，这样如果一个数需要和前面多个数进行比较的时候可以改变index来修改右边数的索引
3. j 用于记录左边数字的索引
   - 如果`arr[j] > arr[index]`的话就将两数换位置，并修改index：`index = j;`
   - 下一轮如果`j -= gap`符合条件的话，这时候左边数的索引 j 就已经向左偏移了 gap 位了，而右边数索引index也相应偏移了 gap 位。这样可以做到一个数不停地和间隔gap位的前面的数进行插入排序比较
   - 如果找到了一个左边数比右边数小的话，因为是用来插入排序，所以可以直接`break`来退出当次循环



### 代码实现

```java
import java.util.Arrays;

/**
 * @author 小火娃
 * @project_name: my_project
 * @package_name: com.xiaohuowa.shell
 */
public class ShellSort {
    public static void main(String[] args) {
        // int[] arr = new int[]{2,9,4,7,3,3,6,5};
        int[] arr = new int[]{15,5,2,7,12,6,1,4,3,9,8,10};
        System.out.println("排序前数组：\t\t" + Arrays.toString(arr));

        // 临时变量
        int temp = 0;
        //  记录比较次数
        int time = 1;
        int index= 0;
        // 外层gap用于控制增量
        for (int gap = arr.length / 2; gap > 0; gap /= 2) {
            // i用于在一轮排序中拿到靠右边的数字
            for (int i = gap; i < arr.length; i++) {
                // index 用于记录一次比较中右边数字的索引位置
                index = i;
                // j 用于在一轮排序中拿到靠左边的数字的索引
                for (int j = i - gap; j >= 0; j -= gap) {
                    // 如果左边数字比右边大的话就换位
                    if (arr[j] > arr[index]) {
                        temp = arr[j];
                        arr[j] = arr[index];
                        arr[index] = temp;
                        // 换位之后把 j 赋值给右边数字的索引
                        // 这样当循环 j-=gap 的时候，就可以让改变后的右边索引和改变后的左边索引的两数进行比较了
                        index = j;
                    } else {
                        // 因为用的是插入排序，所以左边只要比右边小了，之后的循环就可以停了
                        break;
                    }
                }
            }
            System.out.println("第" + time++ + "趟排序结果：" + Arrays.toString(arr));
        }
        System.out.println("排序完成后数组：\t" + Arrays.toString(arr));
    }
}
```







## 哈希表

> 本案例通过链地址法来解决Hash冲突

### 实现过程

1. 建立节点实体类
   - 其中有一个`next`属性，用于在插入链表之后指向下一个元素
2. 建立一个链表类
   - 给定一个空的头节点，当有新的数据进来的时候就把这个头结点覆盖
   - 如果判断头节点为空，则当前链表都为空
3. 建立一个哈希表类
   - 这个哈希表是一个每个元素都是*链表类*的数组
   - 在实例化这个哈希表的时候，循环一遍数组，把每个位置的链表都初始化一遍
   - **插入元素：**在插入元素的时候，先把实体类`id`传进`stuHashCode`方法里，根据规则获取一个哈希编码（这里用的是模运算），然后在数组中找到这个哈希编码的位置，将元素加入链表的最后一个
   - **查找元素：**遍历一遍数组，每到一个位置都继续遍历里面的那个链表
4. 建立测试类
   - 在测试类中实例化哈希表的同时指定哈希表数组长度
   - 创建一些测试的实体类对象
   - 手动模拟哈希冲突
   - 通过查看哈希表内的元素可以看到冲突位置的数据已经通过链表进行存放了



### 代码实现

#### 实体类

```java
package com.xiaohuowa.myhsah;

/**
 * @author 小火娃
 * @project_name: my_project
 * @package_name: com.xiaohuowa.myhsah
 */
public class Student {

    public int id;
    public String name;
    // 用于指向链表的下一个元素
    public Student next;

    public Student(int id, String name) {
        this.id = id;
        this.name = name;
    }
}
```



#### 链表类

```java
package com.xiaohuowa.myhsah;

/**
 * @author 小火娃
 * @project_name: my_project
 * @package_name: com.xiaohuowa.myhsah
 */
public class HashLinked {

    public Student head = null;

    /**
     * 在链表中添加一个节点
     * @param student 新节点
     */
    public void add(Student student) {
        if (head == null) {
            head = student;
            return;
        }
        // 如果链表的第一个元素非空，说明链表里已经有元素了，
        // 那就遍历一遍，找到最后的元素，把新元素追加到它后面
        Student stuTemp = head;
        while (true) {
            if (stuTemp.next == null) {
                stuTemp.next = student;
                return;
            }
            stuTemp = stuTemp.next;
        }
    }

    /**
     * 查看一个链表中的数据
     * @param no 仅用于记录链表编号
     */
    public void list(int no){
        if (head == null) {
            System.out.println("第"+no+"个链表是空链表");
        }else{
            Student stuTemp = head;
            System.out.print("第"+no+"个链表数据 >>> ");
            while (true) {
                if (stuTemp == null) {
                    System.out.println();
                    return;
                }
                System.out.print("id: "+stuTemp.id+" name: "+stuTemp.name + "  ");
                stuTemp = stuTemp.next;
            }
        }
    }

    /**
     * 通过id找学生
     * @param id 学生id
     * @return 找到返回学生对象，找不到返回空
     */
    public Student getStuById(int id){
        Student stuTemp = head;
        while (true) {
            // 如果找到了学生就返回学生对象
            if (stuTemp.id == id) {
                return stuTemp;
            }
            // 如果没找到的话就返回空
            if (stuTemp.next == null) {
                return null;
            }
            // 往后遍历
            stuTemp = stuTemp.next;
        }
    }

}
```



#### 哈希表

```java
package com.xiaohuowa.myhsah;

/**
 * @author 小火娃
 * @project_name: my_project
 * @package_name: com.xiaohuowa.myhsah
 */
public class HashTable {

    public HashLinked[] hashLinked;
    public int size;

    public HashTable(int size) {
        this.size = size;
        hashLinked = new HashLinked[size];

        // 在初始化的时候，将数组中的元素初始化一遍
        for (int i = 0; i < size; i++) {
            hashLinked[i] = new HashLinked();
        }
    }

    /**
     * 插入学生数据，调用 stuHashCode 方法来获取哈希编码（存在数组的哪个位置的链表内）
     * @param student 学生对象
     */
    public void add(Student student) {
        int loc = stuHashCode(student.id);
        hashLinked[loc].add(student);
    }

    /**
     * 通过模运算来获得哈希编码
     * @param id 学生id
     * @return 哈希编码
     */
    public int stuHashCode(int id) {
        return id % size;
    }

    /**
     * 查看整个哈希表内的全部数据
     */
    public void list(){
        for (int i = 0; i < size; i++) {
            hashLinked[i].list(i);
        }
    }
}
```



#### 测试类

```java
package com.xiaohuowa.myhsah;

/**
 * @author 小火娃
 * @project_name: my_project
 * @package_name: com.xiaohuowa.myhsah
 */
public class HashTest {
    public static void main(String[] args) {
        // 实例化哈希表，指定数组长度
        HashTable hashTable = new HashTable(8);

        Student stu1 = new Student(1, "张三");
        Student stu2 = new Student(2, "李四");
        Student stu3 = new Student(3, "王五");
        Student stu4 = new Student(4, "赵六");
        Student stu5 = new Student(5, "七七");
        Student stu6 = new Student(6, "叭叭");
        // 模拟哈希冲突
        Student stu66 = new Student(14, "叭叭2号");

        hashTable.add(stu1);
        hashTable.add(stu2);
        hashTable.add(stu3);
        hashTable.add(stu4);
        hashTable.add(stu5);
        hashTable.add(stu6);
        hashTable.add(stu66);

        hashTable.list();
    }
}
```





## 二叉树

### 顺序存储二叉树

顺序存储二叉树特点：

1、 顺序二叉树通常**只考虑完全二叉树**

2、 第n个元素的左子结点为`2*n+1`

3、 第n个元素的右子结点为`2*n+2`

4、 第n个元素的父结点为`(n-1)/2`

5、 n表示二叉树中第几个元素，按编号从0开始





### 线索二叉树

#### 设计思想

##### 创建结点类

- 属性
   1. 包含了结点自身的属性（id、名字等等）

   2. 包含了指向左右子树的指针

   3. 包含两个标记（用于区分左右子树是线索出来的还是实际的结点）

- 方法
  1. 删除结点
     - 删除原理：**找到要删除结点的父结点，将指向的引用置空即可**
     - 判断左结点：
       - 如果当前结点的左结点不为空，且左结点正好是要删除的，就把当前节点的左引用置空。
     - 判断右结点：
       - 过程同上
     - 如果左右结点都不是的话，就把左右子结点传入递归即可
       - ==注意：==进行递归的时候，要进行非空判断，如果没有判断的话会出现空指针异常（当叶子结点的子结点传入递归的时候就会空指针异常）。
  2. 遍历输出结点（以前序为例）
     1. 先输出当前结点（根结点）
     2. 判断如果左结点不为空，就将左结点传入递归
     3. 判断如果右结点不为空，就将右结点传入递归
  3. 根据id查找结点（以前序为例）
     1. 先判断当前结点是否是要找的结点，是的话就结束，不是的话继续
     2. 给一个标记结点用于判断是否找到
     3. 传入左结点进行递归，找到结点就赋值给标记结点
     4. 如果标记结点非空就结束
     5. 传入右结点进行递归，找到结点就赋值给标记结点
     6. 如果标记结点非空就结束



##### 创建线索二叉树类

- 属性
  - 根结点
  - 线索之后的`前驱结点`（默认第一次时候为空）
- 方法
  1. 普通二叉树转线索二叉树（以中序为例）
     1. 传入一个结点，先判断是否为空，不为空则继续
     2. 传入当前结点的左结点，进入递归 
     3. 处理当前结点前驱
        - 如果当前结点的左结点为空，则将`前驱结点`赋值给当前结点；将当前结点的左子树标记改为指向前驱的标记（代表这个左子结点是线索出来的）
     4. 处理当前结点后继
        - 如果`前驱结点`的右结点为空，且`前驱结点`不为空，那么将右结点赋值给的`前驱结点`，并修改右子树标记
     5. 改变`前驱结点`
        - 将`前驱结点`变为当前结点（在结束一个结点的线索化后，将这个结点作为下个结点的前驱）
     6. 传入当前结点的右结点，进入递归
  2. 遍历线索二叉树（以中序为例）
     1. 给一个结点的临时变量，用于每次遍历的时候记录当前结点
     2. 因为结点一定非空，所以用`while(node != null)`来进行循环
        1. 中序要先找到最左边的结点
           - 通过当前结点的左子树标记是否有前驱标记来判断
           - 直到找到一个左子树有前驱标记的为止
        2. 输出当前结点
        3. 继续循环判断当前结点的右子树标记
           - 如果是线索出来的话就进入循环体，将当前结点右结点赋值给临时变量，并打印临时变量
        4. 将临时变量的右结点赋值给临时变量
        5. 此时一棵小树的遍历完成，进入下一轮while循环



##### 创建测试类

1. 手动给定结点
2. 将结点组合为二叉树
3. 将二叉树转为线索二叉树
4. 通过线索二叉树的遍历输出方法输出







### 赫夫曼树

#### 设计思想

##### 创建结点类

实现`Comparable接口`，用来排序

- 属性

  1. 权值
  2. 左结点
  3. 右结点

- 方法

  1. `compareTo`方法，用来排序

  2. 中序遍历方法

     1. 传入

     

##### 创建赫夫曼树类

方法

- 将数组转为赫夫曼树方法
  1. 先将数组元素都转为结点对象，放进集合里
  2. 循环集合
     1. 升序排序集合
     2. 获取集合前两个元素（最小的两个）
     3. 创建新的结点
        - 新结点的值为前两个元素的和
        - 新结点的左结点指向取出的两个元素中更小那个
        - 新结点的右结点指向取出的两个元素中更大的那个
     4. 删除取出的两个元素
     5. 将新结点加入结合
     6. 集合中的元素个数不足两个时退出循环
  3. 直接返回集合中的第一个结点（唯一的结点，也是最大的结点，即赫夫曼树的根结点）



##### 创建测试类

1. 给出一个数组
2. 创建赫夫曼树
3. 打印赫夫曼树（中序遍历）



#### 代码实现

##### 结点类

```java
package com.xiaohuowa.huffman;

/**
 * @author 小火娃
 * @project_name: my_project
 * @package_name: com.xiaohuowa.huffman
 */
public class Node implements Comparable<Node>{

    private int value;

    private Node leftNode;
    private Node rightNode;

    /**
     * 中序遍历
     */
    public void printTree(){
        if (this.leftNode != null) {
            this.leftNode.printTree();
        }
        System.out.println(this);
        if (this.rightNode != null) {
            this.rightNode.printTree();
        }
    }

    @Override
    public int compareTo(Node node) {
        return this.value - node.value;
    }

    @Override
    public String toString() {
        return "Node{" +
                "value=" + value +
                '}';
    }

    public int getValue() {
        return value;
    }

    public void setValue(int value) {
        this.value = value;
    }

    public Node getLeftNode() {
        return leftNode;
    }

    public void setLeftNode(Node leftNode) {
        this.leftNode = leftNode;
    }

    public Node getRightNode() {
        return rightNode;
    }

    public void setRightNode(Node rightNode) {
        this.rightNode = rightNode;
    }

    public Node(int value) {
        this.value = value;
    }

}
```

##### 赫夫曼树类

```java
package com.xiaohuowa.huffman;

import java.util.ArrayList;
import java.util.Collections;

/**
 * @author 小火娃
 * @project_name: my_project
 * @package_name: com.xiaohuowa.huffman
 */
public class HuffmanTree {

    private int[] array;

    public HuffmanTree(int[] array) {
        this.array = array;
    }
    public Node getHuffmanRoot() {
        return this.array2HuffmanTree(array);
    }

    /**
     * 将数组转换为赫夫曼树
     * @param array 传入的数组
     * @return 返回赫夫曼树的根结点
     */
    public Node array2HuffmanTree(int[] array){
        ArrayList<Node> nodesList = new ArrayList<>();
        // 将数组元素都转为结点对象，放进集合里
        for (int i : array) {
            nodesList.add(new Node(i));
        }

        while (nodesList.size() > 1) {
            // 1. 每次都先排序集合
            Collections.sort(nodesList);
            // 2. 获取集合前两个元素
            Node smallNode = nodesList.get(0);
            Node bigNode = nodesList.get(1);
            // 3. 构建新结点
            Node newNode = new Node(smallNode.getValue() + bigNode.getValue());
            // 3.1 设置新结点的左右结点
            newNode.setLeftNode(smallNode);
            newNode.setRightNode(bigNode);
            // 4. 删除前两个元素
            nodesList.remove(smallNode);
            nodesList.remove(bigNode);
            // 5. 加入新结点
            nodesList.add(newNode);
        }
        // 在循环结束后，nodesList.get(0) 获得的是赫夫曼树的根结点
        return nodesList.get(0);
    }

    /**
     * 中序遍历赫夫曼树
     * @param root 传入根结点
     */
    public void printTree(Node root){
        if (root != null){
            root.printTree();
        }
    }
}
```

##### 测试类

```java
package com.xiaohuowa.huffman;

/**
 * @author 小火娃
 * @project_name: my_project
 * @package_name: com.xiaohuowa.huffman
 */
public class HuffmanTreeTest {
    public static void main(String[] args) {
        int[] arr = new int[]{13, 7, 8, 29, 6, 1};
        HuffmanTree huffmanTree = new HuffmanTree(arr);
        Node root = huffmanTree.getHuffmanRoot();
        huffmanTree.printTree(root);

    }
}
```





### 赫夫曼编码与数据压缩

> 给一个字符串，将其转化为赫夫曼编码

#### 设计思想

##### 创建结点类

结点类实现`Comparable`接口，让结点可以排序（按照权值大小排序）

- 属性
  1. `code`代表存入结点的数据（十进制形式）
  2. `weight`权重，代表结点的权值
  3. 指向左右结点的属性
- 方法
  1. `compareTo`排序方法
  2. 中序遍历方法
     - 如果当前结点的左结点非空，将左结点传入递归
     - 左结点递归后输出当前结点
     - 如果当前结点的右结点非空，将右结点传入递归

##### 创建赫夫曼编码类

- 方法
  1. 统计字符串中每个字母出现的次数
     1. 将字符串转为byte数组
     2. 获取byte数组中每个byte的出现次数，封装进map里
     3. 将map中的每一个键值对封装成`node对象`，放进list集合中
     4. 返回list集合
  2. 创建赫夫曼树
     1. 将list集合进行循环
        1. 升序排序集合
        2. 获取集合前两个元素（最小的两个）
        3. 创建新的结点
           - 新结点的值为前两个元素的权重和
           - 新结点的左结点指向取出的两个元素中更小那个
           - 新结点的右结点指向取出的两个元素中更大的那个
        4. 删除取出的两个元素
        5. 将新结点加入结合
        6. 集合中的元素个数不足两个时退出循环
     2. 循环结束后只会剩下赫夫曼树的根结点，返回根结点
  3. 获取赫夫曼编码
     1. 传入当前结点，路径标记（往左走记0，往右走记1），StringBuilder
     2. 每次递归创建新的StringBuilder用于拼接当前结点的路径标记
     3. 如果当前结点为空就退出方法
     4. 判断当前结点是否是叶子结点（赫夫曼树只有叶子结点是有数据的）
        - 如果非叶子结点就分别进行左右结点的递归
        - 是叶子结点就把当前结点的数据和当前结点的StringBuilder放进map里
  4. 压缩数据
     1. 传入原数据和map数据
     2. 将map的路径取出并拼接到StringBuilder里
     3. 创建byte数组
     4. 每次从StringBuilder中取出8位，算出转化为byte之后的结果，存进byte数组中
     5. 返回byte数组





#### 代码实现





### 二叉排序树

> 二叉排序树的构成不唯一，但是中序遍历的结果都是递增的
>
> - 二叉排序树的==删除问题==：
>   1. 如果要删除的是叶子结点：直接断开和父结点的连接即可。
>   2. 如果要删除的结点只有一个孩子：直接把孩子移上来替换掉要删除的即可。
>   3. 如果要删除的结点有左右子结点：
>      - 要从要删除的结点的左子树找到一个**最大的**替换上去
>      - 或者从右子树找到个**最小的**替换上去

#### 设计思想

##### 创建结点类

- 方法
  1. 插入新结点的方法
     - 判断新结点和当前结点的大小，如果小了就把当前结点的左子结点传入递归，如果大了就把当前结点的右子结点传入递归
  2. 中序遍历输出
     - 先判断当前结点是否有左子结点
       - 如果有左子节点就让左子节点进入当前方法递归
     - 输出当前结点
     - 判断当前结点是否有右子结点
       - 如果有右子节点就让右子节点进入当前方法递归
  3. 封装一个根据数据查询对应结点的父结点的方法
     - 遍历一遍，看看当前结点的左或者右子节点的数据是否和要查找数据相同，相同就返回当前结点
  4. 根据数据查询结点
     - 调用查询父结点方法获取要查询结点的父结点
     - 判断要查询结点是父结点的左子结点还是右子结点
     - 找到后返回即可
  5. 根据数据查询对应结点父结点
     - 直接调用查询父结点方法即可
  6. 查询当前结点的左子树中最大的结点
     - 最大结点一点是左子树中最靠右边的那个结点，所以只要去左子树往右边找即可



##### 创建二叉排序树类

- 方法

  1. 中序遍历方法

     - 如果根结点非空（代表非空树），用根结点调用中序遍历方法

  2. 根据数据查询结点

     - 如果根结点为空代表空树，直接返回空
     - 如果根结点就是要找的话，返回根结点
     - 否则用根结点调用查找结点的方法

  3. 根据数据查询对应结点的父结点

     - 如果根结点为空代表空树，直接返回空
     - 否则用根结点调用获取父结点的方法

  4. 插入新结点

     - 如果根结点为空代表空树，直接把新结点给根结点即可
     - 否则用根结点调用插入新结点的方法

  5. 获取左子树最大值

     - 如果当前结点没有左子树了，就返回空
     - 如果当前结点的左子结点没有右子树了（说明左子结点就是最大的了），返回左子结点
     - 否则用当前结点的左子结点调用获取最大值方法

  6. 封装一个让父结点和子节点断开连接的方法

     - 传入父子结点，判断子结点是左孩子还是右孩子
     - 用父结点的左或者右置空来删除和子结点的连接

  7. ==删除结点==

     - > 删除结点分为几种情况：
       >
       > 1. 空树
       >    - 没法删
       > 2. 整棵树只有一个根结点，还是要删除的那个
       >    - 直接把根结点置空就行
       > 3. 要删除的是**叶子结点**
       >    - 直接断开和父结点的连接就行
       > 4. 要删除结点既有左子树又有右子树
       >    - 从左子树中找到最大的那个结点替换到要删除结点
       >    - （也可以从右子树中找到最小的那个来替换，同理）
       > 5. 要删除结点只有左子树或者只有右子树
       >    - 直接用要删除结点的左或者右结点替换上去即可

     - 删除操作逻辑复杂，单独抽出展示

     - ```java
       /**
        * 删除结点
        *
        * @param data 要删除结点的数据
        */
       public void delNodeByData(int data) {
           // 1. 空树判断
           if (root == null) {
               System.out.println("空树，删除失败");
               return;
           }
           // 2. 如果树只有根结点，还恰好是要删除的，就直接删完返回
           if (root.getLeft() == null && root.getRight() == null && root.getData() == data) {
               root = null;
               System.out.println("删除完毕，树为空树了");
               return;
           }
           // 获取要删除结点
           Node delNode = this.getNodeByData(data);
           // 判断要删除结点是否找到
           if (delNode == null) {
               System.out.println("没有找到要删除的结点");
               return;
           }
           // 获取要删除结点的父结点
           Node delNodeParent = this.getParentNodeByData(data);
       
           // 进入删除逻辑
           if (delNode.getLeft() == null && delNode.getRight() == null) {
               // 3. 如果要删除结点是叶子结点，直接删除即可
               splitParentAndChild(delNodeParent, delNode);
           } else if (delNode.getLeft() != null && delNode.getRight() != null) {
               // 4. 如果要删除结点有左右孩子的话
               // 先找出要删除结点的左边最大结点，以及最大结点的父结点
               Node maxNode = getLeftMax(delNode);
               Node maxNodeParent = getParentNodeByData(maxNode.getData());
               // 将最大结点的父结点和它父结点断开
               splitParentAndChild(maxNodeParent, maxNode);
               // 用最大结点替换要删除结点
               if (delNodeParent.getLeft() != null && delNodeParent.getLeft().getData() == data) {
                   // 要删除结点在它父结点的左边，把最大结点替换过来
                   delNodeParent.setLeft(maxNode);
               } else {
                   // 要删除结点在它父结点的右边，把最大结点替换过来
                   delNodeParent.setRight(maxNode);
               }
               // 将要删除结点的左右子树都交接给替换来的结点
               maxNode.setLeft(delNode.getLeft());
               maxNode.setRight(delNode.getRight());
           } else {
               // 5. 能到这里，说明要删除结点既不是叶子结点，也不是有左右子树的结点
               // 直接用它的子结点替换它就行
               if (delNodeParent == null) {
                   // 要删除结点的父结点为空，意味着要删的是root结点
                   if (root.getLeft() != null) {
                       // root有左子树
                       root = root.getLeft();
                   } else {
                       // root有右子树
                       root = root.getRight();
                   }
               }
               if (delNode.getLeft() != null) {
                   // 要删除结点是左子树不为空，判断要删除结点本身在父结点的左边还是右边
                   if (delNodeParent.getLeft().getData() == data) {
                       // 要删除结点在父结点左边
                       delNodeParent.setLeft(delNode.getLeft());
                   } else {
                       // 要删除结点在父结点右边
                       delNodeParent.setRight(delNode.getLeft());
                   }
               } else {
                   // 要删除结点是右子树不为空，判断要删除结点本身在父结点的左边还是右边
                   if (delNode.getRight().getData() == data) {
                       // 要删除结点在父结点右边
                       delNodeParent.setRight(delNode.getRight());
                   } else {
                       // 要删除结点在父结点左边
                       delNodeParent.setLeft(delNode.getRight());
                   }
               }
           }
       }
       ```





#### 代码实现

##### 结点类

```java
package com.xiaohuowa.binarySortTree;

/**
 * @author 小火娃
 * @project_name: my_project
 * @package_name: com.xiaohuowa.binarySortTree
 */
public class Node {

    private int data;

    private Node left;
    private Node right;

    public Node(int data) {
        this.data = data;
    }

    @Override
    public String toString() {
        return "Node{" +
                "data=" + data +
                '}';
    }

    /**
     * 插入新的结点进二叉排序树
     *
     * @param node 新的结点
     */
    public void insertNode(Node node) {
        if (node == null) {
            return;
        }
        if (node.data < this.data) {
            // 新结点的数据比当前结点小，要插入进左子树
            if (this.getLeft() == null) {
                // 如果当前结点的左结点为空，新结点直接放左边就行
                this.setLeft(node);
            } else {
                // 左结点非空，要进行递归判断
                this.getLeft().insertNode(node);
            }
        } else {
            // 反之则插入右子树
            if (this.getRight() == null) {
                // 如果当前结点的右结点为空，新结点直接放右边就行
                this.setRight(node);
            } else {
                // 左结点非空，要进行递归判断
                this.getRight().insertNode(node);
            }
        }
    }

    /**
     * 中序遍历输出
     */
    public void printTree() {
        if (this.getLeft() != null) {
            // 如果左边不为空，就递归左子树
            this.getLeft().printTree();
        }
        // 输出当前结点
        System.out.println(this);
        if (this.getRight() != null) {
            // 如果右边不为空，就递归右子树
            this.getRight().printTree();
        }
    }

    /**
     * 根据数据获取结点
     *
     * @param data 数据
     * @return 目标结点
     */
    public Node getNodeByData(int data) {
/*        if (this.getData() == data) {
            // 如果当前结点就是要找的话，直接返回
            return this;
        } else if (data > this.getData()) {
            // 如果要找的数大于当前数，要往右子树那边找
            if (this.getRight() != null) {
                // 如果右边不为空，就递归查询右子树
                return this.getRight().getNodeByData(data);
            } else {
                return null;
            }
        } else {
            // 如果要找的数小于当前数，要往左子树那边找
            if (this.getLeft() != null) {
                // 如果左边不为空，就递归查询左子树
                return this.getLeft().getNodeByData(data);
            } else {
                return null;
            }
        }*/
        Node parentNode = this.getParentNodeByDataTemp(data);
        if (parentNode == null){
            return null;
        }
        if (parentNode.getLeft() != null && parentNode.getLeft().getData()==data) {
            return parentNode.getLeft();
        }else{
            return parentNode.getRight();
        }
    }

    /**
     * 根据数据，获取要删除结点的父结点
     *
     * @param data 数据
     * @return 返回要删除结点的父结点
     */
    public Node getParentNodeByData(int data) {
        return this.getParentNodeByDataTemp(data);
    }

    /**
     * 封装了查询结点的方法
     * @param data 要查询的数据
     * @return 返回的是要查询结点的父结点
     */
    public Node getParentNodeByDataTemp(int data) {
        if ((this.getLeft()!=null && this.getLeft().getData()==data)
                || (this.getRight()!=null && this.getRight().getData()==data)) {
            // 如果左边结点或者右边结点的值等于了要找的data，就返回当前结点即可
            return this;
        } else {
            if (this.getLeft() != null && data < getData()) {
                // 如果左边结点非空，且要找的数据小于当前结点数据，进入左边结点的递归
                return this.getLeft().getParentNodeByDataTemp(data);
            } else if (this.getRight() != null && data >= this.getData()) {
                // 如果右边结点非空，且找的数据大于当前结点数据，进入右边结点递归
                return this.getRight().getParentNodeByDataTemp(data);
            } else {
                // 走到这里，说明都没找到了
                return null;
            }
        }
    }

    /**
     * 获取当前结点的左子树中最大的那个结点（用于删除时候替换位置）
     * @return
     */
    public Node getLeftMaxNode() {
        Node node = this;
        while (node.getRight() != null){
            // 一直找到this下的最右边的子结点
            node = node.getRight();
        }
        return node;
    }

    public int getData() {
        return data;
    }

    public void setData(int data) {
        this.data = data;
    }

    public Node getLeft() {
        return left;
    }

    public void setLeft(Node left) {
        this.left = left;
    }

    public Node getRight() {
        return right;
    }

    public void setRight(Node right) {
        this.right = right;
    }
}
```

##### 二叉排序树类

```java
package com.xiaohuowa.binarySortTree;

/**
 * @author 小火娃
 * @project_name: my_project
 * @package_name: com.xiaohuowa.binarySortTree
 */
public class BinarySortTree {
    private Node root;

    public void setRoot(Node root) {
        this.root = root;
    }

    /**
     * 中序遍历遍历输出二叉树
     */
    public void printTree() {
        if (root == null) {
            return;
        }
        root.printTree();
    }

    /**
     * 根据数据查询结点
     *
     * @param data 查询的数据
     * @return 返回查到的结点
     */
    public Node getNodeByData(int data) {
        if (root == null) {
            return null;
        }
        if (root.getData() == data) {
            // 如果根结点就是要找的话，直接返回
            return root;
        }
        return root.getNodeByData(data);
    }

    /**
     * 根据数据，返回要查询结点的父结点
     *
     * @param data 要查询结点的数据
     * @return 要查询结点的父结点
     */
    public Node getParentNodeByData(int data) {
        if (root == null) {
            return null;
        }
        return root.getParentNodeByData(data);
    }

    /**
     * 插入新结点
     *
     * @param node 新结点
     */
    public void insertNode(Node node) {
        if (root == null) {
            // 如果根结点都为空，说明是空树，直接让新结点成为根结点即可
            root = node;
            return;
        }
        root.insertNode(node);
    }

    /**
     * 获取左子树的最大值
     *
     * @param node 当前结点
     * @return 返回左子树的最大值
     */
    public Node getLeftMax(Node node) {
        if (node.getLeft() == null) {
            // 如果当前结点都没有右边子树了，直接返空
            return null;
        }
        if (node.getLeft().getRight() == null) {
            // 如果当前结点的左结点没有右子树了，说明左结点已经是最大的了，直接返回就行
            return node.getLeft();
        }
        // 到这里说明当前结点的左结点还有右子树，进入方法
        return node.getLeft().getLeftMaxNode();
    }

    /**
     * 用这个方法可以将父结点和指定子节点断开连接
     *
     * @param parent 父结点
     * @param child  子结点
     */
    public void splitParentAndChild(Node parent, Node child) {
        if (parent.getLeft() != null && (parent.getLeft().getData() == child.getData())) {
            // 如果要删除结点是这个父亲结点的左孩子的话，删除左孩子
            parent.setLeft(null);
        } else {
            // 是右孩子就删除右孩子
            parent.setRight(null);
        }
    }

    /**
     * 删除结点
     *
     * @param data 要删除结点的数据
     */
    public void delNodeByData(int data) {
        // 1. 空树判断
        if (root == null) {
            System.out.println("空树，删除失败");
            return;
        }
        // 2. 如果树只有根结点，还恰好是要删除的，就直接删完返回
        if (root.getLeft() == null && root.getRight() == null && root.getData() == data) {
            root = null;
            System.out.println("删除完毕，树为空树了");
            return;
        }
        // 获取要删除结点
        Node delNode = this.getNodeByData(data);
        // 判断要删除结点是否找到
        if (delNode == null) {
            System.out.println("没有找到要删除的结点");
            return;
        }
        // 获取要删除结点的父结点
        Node delNodeParent = this.getParentNodeByData(data);

        // 进入删除逻辑
        if (delNode.getLeft() == null && delNode.getRight() == null) {
            // 3. 如果要删除结点是叶子结点，直接删除即可
            splitParentAndChild(delNodeParent, delNode);
        } else if (delNode.getLeft() != null && delNode.getRight() != null) {
            // 4. 如果要删除结点有左右孩子的话
            // 先找出要删除结点的左边最大结点，以及最大结点的父结点
            Node maxNode = getLeftMax(delNode);
            Node maxNodeParent = getParentNodeByData(maxNode.getData());
            // 将最大结点的父结点和它父结点断开
            splitParentAndChild(maxNodeParent, maxNode);
            // 用最大结点替换要删除结点
            if (delNodeParent.getLeft() != null && delNodeParent.getLeft().getData() == data) {
                // 要删除结点在它父结点的左边，把最大结点替换过来
                delNodeParent.setLeft(maxNode);
            } else {
                // 要删除结点在它父结点的右边，把最大结点替换过来
                delNodeParent.setRight(maxNode);
            }
            // 将要删除结点的左右子树都交接给替换来的结点
            maxNode.setLeft(delNode.getLeft());
            maxNode.setRight(delNode.getRight());
        } else {
            // 5. 能到这里，说明要删除结点既不是叶子结点，也不是有左右子树的结点
            // 直接用它的子结点替换它就行
            if (delNodeParent == null) {
                // 要删除结点的父结点为空，意味着要删的是root结点
                if (root.getLeft() != null) {
                    // root有左子树
                    root = root.getLeft();
                } else {
                    // root有右子树
                    root = root.getRight();
                }
            }
            if (delNode.getLeft() != null) {
                // 要删除结点是左子树不为空，判断要删除结点本身在父结点的左边还是右边
                if (delNodeParent.getLeft().getData() == data) {
                    // 要删除结点在父结点左边
                    delNodeParent.setLeft(delNode.getLeft());
                } else {
                    // 要删除结点在父结点右边
                    delNodeParent.setRight(delNode.getLeft());
                }
            } else {
                // 要删除结点是右子树不为空，判断要删除结点本身在父结点的左边还是右边
                if (delNode.getRight().getData() == data) {
                    // 要删除结点在父结点右边
                    delNodeParent.setRight(delNode.getRight());
                } else {
                    // 要删除结点在父结点左边
                    delNodeParent.setLeft(delNode.getRight());
                }
            }
        }
    }

}
```



##### 测试类

```java
package com.xiaohuowa.binarySortTree;

/**
 * @author 小火娃
 * @project_name: my_project
 * @package_name: com.xiaohuowa.binarySortTree
 */
public class BinarySortTreeTest {
    public static void main(String[] args) {
        int[] noIds = {7, 3, 10, 12, 5, 1, 9, 2};
        // int[] noIds = {3, 2, 8, 6, 5, 7};
        // int[] noIds = {3, 2, 5, 1, 4, 7};
        BinarySortTree tree = new BinarySortTree();
        for (int noId : noIds) {
            tree.insertNode(new Node(noId));
        }
        tree.printTree();
        System.out.println("--------------------------------");
        tree.delNodeByData(3);
        tree.printTree();

        // System.out.println(tree.getNodeByData(8));
        // System.out.println(tree.getLeftMax(tree.getNodeByData(8)));
        // System.out.println(tree.getParentNodeByData(2));
    }
}
```







### B树

#### B树

![img](https://s2.loli.net/2023/10/17/6ZyVNm3Wi8E2oFg.jpg)

1. B 树的**阶**：节点的最多子节点个数。比如 2-3 树的阶是 3，2-3-4 树的阶是 4
2. B-树的搜索，从根结点开始，对结点内的关键字（有序）序列进行二分查找，如果命中则结束，否则进入查询关键字所属范围的儿子结点；重复，直到所对应的儿子指针为空，或已经是叶子结点
3. 关键字集合分布在整颗树中, 即叶子节点和非叶子节点都存放数据
4. 搜索有可能在非叶子结点结束
5. 其搜索性能等价于在关键字全集内做一次**二分查找**





#### B+树

> B+树是 B 树的变体，也是一种**多路搜索树**。

![img](https://s2.loli.net/2023/10/17/wTEPYfCvsJqHVcy.jpg)

1. B+树的搜索与 B 树也基本相同，区别是 ==B+树只有达到叶子结点才命中==（B 树可以在非叶子结点命中），其性能也等价于在关键字全集做一次二分查找
2. 所有**关键字都出现在叶子结点的链表中**（即数据只能在叶子节点【也叫稠密索引】），且链表中的关键字(数据)恰好是**有序**的。
3. **不可能**在**非**叶子结点命中
4. 非叶子结点相当于是叶子结点的索引（稀疏索引），**叶子结点**相当于是存储（关键字）数据的**数据层**
5. 更适合文件索引系统
6. B 树和 B+树各有自己的应用场景，不能说 B+树完全比 B 树好，反之亦然



#### B*树

>B*树是 B+树的变体，在 B+树的==非根和非叶子结点再增指向兄弟的指针==

![img](https://s2.loli.net/2023/10/17/lL8KhJfrQ3RHXzM.jpg)



1. B\*树定义了非叶子结点关键字个数至少为`(2/3)*M`（M为度），即块的最低使用率为 `2/3`，而 B+树的块的最低使用率为的`1/2`。
2. 从第 1 个特点可以看出，B*树分配新结点的概率比 B+树要低，**空间使用率更高**









## 二分查找

二分查找又叫折半查找。

它对要查找的序列有**两个要求**：

1. 该序列必须是有序的（即该序列中的所有元素都是按照大小关系排好序的，升序和降序都可以）
2. 该序列必须是顺序存储的。



### 实现思路

1. 第一次循环的时候
   - 让`min`指向数组的第一个元素
   - `max`指向数组的最后一个元素
   - $mid=(min+max)/2$
   - 比较要查找的数和`mid`
2. 如果要查找的数小于`mid`
   - 让$max=mid-1$
3. 如果要查找的数大于`mid`
   - 让$min=mid+1$
4. 只要 $min<=max$ 就一直循环下去





### 代码实现

```java
package com.xiaohuowa.half;

/**
 * @author 小火娃
 * @project_name: my_project
 * @package_name: com.xiaohuowa.half
 */
public class HalfSearch {

    static int time = 0;

    public static void main(String[] args) {
        int[] arr = new int[]{10, 11, 12, 13, 14, 15, 16, 17, 18};

        // 左右指针指向数组最左和最右
        int min = 0;
        int max = arr.length - 1;

        int target = 17;

        int res = findItem(arr, min, max, target);
        System.out.println("最终结果 >>> " + (res != -1 ? "找到了" + target + "，索引为：" + res : "没找到"));
    }

    public static int findItem(int[] arr, int min, int max, int target) {
        while (min <= max) {
            // 计算比较的次数
            time++;
            // 中间的索引
            int mid = (min + max) / 2;
            if (arr[mid] == target) {
                // 如果找到了
                System.out.println("比较了" + time + "次，mid == "+ mid);
                return mid;
            }
            if (arr[mid] < target) {
                // 如果mid所在的数小于目标数，就要把左索引移动到mid右边
                min = mid + 1;
                System.out.println("比较了" + time + "次，mid == "+ mid);
            }else{
                // 如果mid所在的数大于目标数，就要把右索引移动到mid左边
                max = mid - 1;
                System.out.println("比较了" + time + "次，mid == "+ mid);
            }
        }
        return -1;
    }
}
```





## 汉诺塔

汉诺塔问题的解决可以划分成两个部分，每次递归的时候都是把一个汉诺塔问题拆成以下两步（分治思想）

1. 第一部分
   1. 把`n-1`个盘移动到第二根柱子上
   1. 把第n个盘移动到第三根柱子上
1. 第二部分
   1. 把`n-1`个盘从第二根移动到第三根柱子上



```java
package com.xiaohuowa.hanoi;

/**
 * @author 小火娃
 * @project_name: my_project
 * @package_name: com.xiaohuowa.hanoi
 */
public class TowerOfHanoi {

    static int time = 0;

    public static void main(String[] args) {
        move(3, "A", "B", "C");
        System.out.println("移动了" + time + "次");
    }

    /**
     * 移动操作
     * @param layer 层数
     * @param pillar1 柱子1
     * @param pillar2 柱子2
     * @param pillar3 柱子3
     */
    public static void move(int layer, String pillar1, String pillar2, String pillar3) {
        if (layer == 1) {
            // 如果只有一个盘，直接移动就行
            time++;
            System.out.println("第 " + time + " 步：" +  pillar1 + " --> " + pillar3);
        }else{
            // 把 n-1 个盘从柱1移动到柱2
            move(layer-1, pillar1, pillar3, pillar2);
            // 把第n个盘从柱1移动进柱3
            time++;
            System.out.println("第 " + time + " 步：" +  pillar1 + " --> " + pillar3);
            // 把一个模块从柱2移动到柱3
            move(layer-1, pillar2, pillar1, pillar3);
        }
    }

}

```





## 动态规划

***\*动态规划算法\****通常用于求解具有某种最优性质的问题。在这类问题中，可能会有许多可行解。每一个解都对应于一个值，我们希望找到具有最优值的解。动态规划算法与分治法类似，其基本思想也是将待求解问题分解成若干个子问题，先求解子问题，然后从这些子问题的解得到原问题的解。

与分治法不同的是，适合于用动态规划求解的问题，经分解得到子问题往往不是互相独立的。若用分治法来解这类问题，则分解得到的子问题数目太多，有些子问题被重复计算了很多次。如果能够保存已解决的子问题的答案，而在需要时再找出已求得的答案，这样就可以避免大量的重复计算，节省时间。

可以用一个表来记录所有已解的子问题的答案。不管该子问题以后是否被用到，只要它被计算过，就将其结果填入表中。这就是动态规划法的基本思路。具体的动态规划算法多种多样，但它们具有相同的填表格式。





### 案例

给定一个矩阵，从左上角开始每次**只能向右走或者向下走**，最后达到右下角的位置，路径中所有数字累加起来就是路径和，返回所有路径的最小路径和，以下图矩阵为例，那么`路径1,3,1,0,6,1,0`就是最小路径和，返回`12`

![image-20221014194332701](https://s2.loli.net/2023/10/17/bEvq5zcy8ACBd4o.png)





#### 实现思路

1. 建立一个同样大小的空的矩阵
   - 将原来矩阵左上角赋值给新矩阵左上角
2. 将原矩阵第一行数据走一遍，每个格子步数累加放进新矩阵第一行
3. 从第二行开始
   - 每行第一个都是上一行的累加
   - 每行其他格子进行判断
     1. 如果上面格子小于左边格子（说明要从上面走下来步数少）
        - 当前格子累加上上面格子
     2. 如果左边格子小于上面格子（说明从左边走过来步数少）
        - 当前格子累加上左边格子
4. 最后获取新矩阵的右下角数据即可



#### 代码实现

```java
package com.xiaohuowa.dynamic;

/**
 * @author 小火娃
 * @project_name: my_project
 * @package_name: com.xiaohuowa.dynamic
 */
public class Dynamic {
    public static void main(String[] args) {
        int[][] arr = {{1,3,5,9},{8,1,3,4},{5,0,6,1},{8,8,4,100}};
        System.out.println(getStepCount(arr));
    }

    public static int getStepCount(int[][] oldArr) {
        if (oldArr.length == 0) {
            return 0;
        }
        // 每行有几个元素
        int rowLength = oldArr[0].length;
        // 一共有几行
        int rows = oldArr.length;
        // 创建一个相同大小的新的二维数组用来存每一格的到达步数
        int[][] newArr = new int[rows][rowLength];
        // 给第一个附上值
        newArr[0][0] = oldArr[0][0];
        // 第一行的每一格都可以先走出来（每一格都是都累加了前一格的步数）
        for (int i = 1; i < rowLength; i++) {
            newArr[0][i] = oldArr[0][i] + newArr[0][i-1];
        }
        // 接下来处理剩下的数据
        // 循环所有行
        for (int i = 1; i < rows; i++) {
            // 循环每行里面的数据
            for (int j = 0; j < rowLength; j++) {
                if (j == 0){
                    // 如果是每列的最开始的元素，就等于上一格移动下来的累加步数
                    newArr[i][j] = newArr[i-1][j] + oldArr[i][j];
                } else if (newArr[i][j-1] < newArr[i-1][j]) {
                    // 如果左边格子的步数和小于上面格子的步数和，那么就一个从左边累加过来（从左边走过来）
                    newArr[i][j] = newArr[i][j-1] + oldArr[i][j];
                } else {
                    // 如果左边格子的步数和大于于上面格子的步数和
                    // 那么就一个从上边累加过来（从上面走下来）
                    newArr[i][j] = newArr[i-1][j] + oldArr[i][j];
                }
            }
        }
        // 返回最后一个的数字
        return newArr[rows-1][rowLength-1];
    }
}
```







## KMP

> 在进行字符串匹配时，KMP算法的特点是：**省去了主串与子串不必要的回溯**，这也是KMP算法（在主串有较多重复时）更加高效的关键。
>
> **在KMP算法中，任何情况下主串都不回溯。**

### 实现思路

#### 获取next数组

> next数组是表示在子串的某一个索引位置上，*当前字符加上前面的串* 所包含的相同前后缀字符串的最大长度字符

   如：

```
     0 1 2 3 4
子串：A B A B D
在索引为3的B，前面的字符串包含的前缀有A,AB,ABA
                    	   后缀有B,AB,BAB
                    	   可以看出最大相同前后缀为"AB",长度为2
                   	       索引在B这个位置的next数组值应该为2
在索引为4的D,前面的字符串包含的前缀有A,AB,ABA,ABAB
                   	      后缀有D,BD,ABD,BABD
                     	  可以看出没有相同的前后缀
                     	  索引在D这个位置的next数组值应该为0
用上述方法算出的next数组为：[0, 0, 1, 2, 0]
```





#### KMP算法

1. 定义一个`i指针`，用于从头开始遍历一遍主串（不回溯）
2. 定义一个`j指针`，每次匹配子串（回溯）
3. 如果在一次匹配中`i `和 `j`指向的元素**相同**
   - 就让`i `和 `j`分别向后移动一位，再继续循环匹配
4. 如果`i `和 `j`指向的元素**不同**
   - 此时`i`不动，`j`回溯
     - $j=next[j-1]$（`j`回溯至`next[j-1]`的索引位置上，因为这个索引位置代表前缀等于后缀的最长部分，就不需要把`j`回溯到子串首位，去掉了不必要回溯）
5. 直到
   - 循环至主串剩余长度小于子串长度（没找到返回-1）
   - 或者`j`在某一次递增后已经达到子串的长度了（因为`j`只会在元素相同的时候后移，只要能后移到子串长度，说明已经匹配到了，返回`  i - 主串.length()` ）



### 代码实现

```java
package com.xiaohuowa.kmp;

import java.util.Arrays;

/**
 * @author 小火娃
 * @project_name: my_project
 * @package_name: com.xiaohuowa.kmp
 */
public class KMP {

    public static void main(String[] args) {
        // String str = "aabaaf";
        String str = "ababd";
        int[] next = getNextArr(str);
        System.out.println(Arrays.toString(next));

        // String mainString = "aabaabaaf";
        // String subString = "aabaaf";
        String mainString = "好好学习天天向上";
        String subString = "习天上";
        int kmp = kmp(mainString, subString);
        System.out.println(kmp);
    }


    /**
     * 通过 KMP 算法算出子串在主串中是否存在
     * @param mainString 主串
     * @param sunString 子串
     * @return 存在返回在主串中的起始索引，不存在返回-1
     */
    public static int kmp(String mainString, String sunString){
        int[] next = getNextArr(sunString);
        // i 表示从主串第一个元素开始的索引（不回溯）
        int i = 0;
        // j 表示子串中的索引（会回溯）
        int j = 0;
        // i循环递增下去
        while (i < mainString.length()) {
            // 如果比较的时候两个字符相同
            if (sunString.charAt(j) == mainString.charAt(i)){
                // 如果比较都相同，让i和j都后移
                j++;
                i++;
                // 如果j累加之后已经达到子串的长度了，说明已经找到了，返回子串在主串中的开始索引
                if (j == sunString.length()) {
                    return i - sunString.length();
                }
                // 循环至主串剩余长度小于子串长度（没找到返回-1）
                if (mainString.length()-i < sunString.length()) {
                    return -1;
                }
            }else{
                // 防止下标越界
                if (j != 0){
                    // 如果一个字符不同了，就让 j 回溯至next[j-1]的索引位置
                    j = next[j - 1];
                }else{
                    // 如果 j 已经在子串的最开头了，就让 i 后移
                    i++;
                }
            }
        }
        return -1;
    }

    /**
     * 获取前缀表
     *
     * @param str 子串
     * @return 返回next数组
     */
    public static int[] getNextArr(String str){
        int[] next = new int[str.length()];
        // 初始化j变量，j代表最长匹配前缀长度（j指向前缀末尾）
        int j = 0;
        // 初始化next数组的第一位为0
        next[0] = 0;
        // i指向后缀末尾
        for (int i = 1; i < next.length; i++) {
            // 如果前缀匹配了，就累加j，并更新next数组的值
            if (str.charAt(i) == str.charAt(j)){
                j++;
                next[i] = j;
                continue;
            }
            // 如果前缀不匹配，且 j 还没退回子串的首位，让 j 根据next数组中前一位的值，退到那个索引位置
            while (j>0 && str.charAt(i) != str.charAt(j)){
                j = next[j-1];
                // 如果前缀匹配了，就累加j，并更新next数组的值
                if (str.charAt(i) == str.charAt(j)){
                    j++;
                    next[i] = j;
                    break;
                }
            }


        }
        return next;
    }


}
```





















