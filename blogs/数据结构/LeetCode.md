### [1. 两数之和](https://leetcode.cn/problems/two-sum/)

#### 思路

第一种：

可以直接暴力，通过两个for循环嵌套找出两数之和等于target的

第二种：

用map存数组中已经遍历过的数（**key为元素的值，value为元素在数组中的索引**），每次遍历数组的时候都用 $target-当前数$ 算出另一个数，判断另一个数是不是map的key，是的话返回就行



#### 暴力解法

~~~java
class Solution {
    public int[] twoSum(int[] nums, int target) {
        int[] result = new int[2];
        for (int slow=0; slow < nums.length; slow++){
            for (int fast=slow+1; fast < nums.length; fast++) {
                if (nums[slow] + nums[fast] == target) {
                    result[0] = slow;
                    result[1] = fast;
                    return result;
                }
            }
        }
        return result;
        
    }
}
~~~



#### map解法

~~~java
class Solution {
    public int[] twoSum(int[] nums, int target) {
        Map<Integer, Integer> resultMap = new HashMap<>();
        int temp = 0;
        int[] result = new int[2];
        for (int i = 0; i<nums.length; i++){
            temp = target - nums[i];
            if (resultMap.containsKey(temp)) {
                result[0] = resultMap.get(temp);
                result[1] = i;
                return result;
            }
            resultMap.put(nums[i], i);
        }
        return result;
    }
}
~~~







### [19. 删除链表的倒数第 N 个结点](https://leetcode.cn/problems/remove-nth-node-from-end-of-list/)

#### 思路

通过双指针解决

1. 定义一个快指针，一个慢指针（都指向虚拟出来的头结点上）
   1. 先让快指针移动出去n个位置
2. 当快指针的`next!=null`的时候
   - 快慢指针同时往后移动
3. 当快指针的`next==null`的时候
   - 此时慢指针的next指向的就是要删除的元素，直接删除即可







~~~java
/**
 * Definition for singly-linked list.
 * public class ListNode {
 *     int val;
 *     ListNode next;
 *     ListNode() {}
 *     ListNode(int val) { this.val = val; }
 *     ListNode(int val, ListNode next) { this.val = val; this.next = next; }
 * }
 */
class Solution {
    public ListNode removeNthFromEnd(ListNode head, int n) {
        // 创建虚拟头结点
        ListNode virtualNode = new ListNode();
        virtualNode.next = head;

        ListNode fast = virtualNode;
        ListNode slow = virtualNode;
        for (int i = 0; i < n; i++){
            // 只需让快指针往后移动n步
            fast = fast.next;
        }
        // 此时只要让slow和fast同时移动
        // 等fast移动到最后一个元素时
        // slow的下一个就是要删除的元素了
        while (fast.next != null) {
            fast = fast.next;
            slow = slow.next;
        }
        slow.next = slow.next.next;
        return virtualNode.next;
    }
}
~~~















### [59. 螺旋矩阵 II](https://leetcode.cn/problems/spiral-matrix-ii/)

#### 思路

螺旋矩阵，每一轮循环都为矩阵还没赋值的最外圈填充数值

要注意循环的规律：保持**左闭右开原则**，每次都留下末尾的那个点，给下一个循环来走

~~~java
class Solution {
    public int[][] generateMatrix(int n) {
        int[][] newArr = new int[n][n];
        // beginNum用来递增之后填充数据的
        int beginNum = 1;
        // 起点索引
        int beginIndex = 0;
        // 每轮都空掉offset个元素不处理（留给下一轮处理）
        int offset = 1;
        // i代表行，j代表列
        int i;
        int j;
        // 记录循环的次数
        int loopTime = 1;
        // 总共循环n/2 次，如果n为奇数的话会剩下中间那格空着，后面另外处理，如果n为偶数就刚好循环完了
        while (loopTime <= (n / 2)){
            // 处理上面的行，留下最右边一格不处理
            for(j=beginIndex; j<n-offset; j++){
                newArr[beginIndex][j] = beginNum;
                beginNum++;
            }
            // 处理右边的列，留下最底下一格不处理
            for(i = beginIndex; i<n-offset; i++){
                // 循环到这里的时候，j已经处于最右边这列了，可以直接用
                newArr[i][j] = beginNum;
                beginNum++;
            }
            // 处理下面的行，留下左下角的格子不处理
            for( ; j>beginIndex; j--){
                newArr[i][j] = beginNum;
                beginNum++;
            }
            // 处理左边的列，留下左上角的格子不处理
            for( ; i>beginIndex; i--){
                newArr[i][j] = beginNum;
                beginNum++;
            }
            // offset要增加，下一轮的移动就会空格开更大的距离
            offset++;
            // 改变下一轮的起点
            beginIndex++;
            // 循环次数增加
            loopTime++;
        }
        if (n%2 == 1){
            // 奇数的话额外处理中心点
            newArr[n/2][n/2] = beginNum;
        }
        return newArr;
    }
} 
~~~





### [142. 环形链表 II](https://leetcode.cn/problems/linked-list-cycle-ii/)

#### 思路

1. 通过快慢指针不同速度的移动，如果相遇说明有环

   - 为什么一定会相遇？因为快指针每次移动`2`格，慢指针每次移动`1`格，所以快指针相对于慢指针来说就是以`每次一格的速度慢慢逼近`，所以肯定会相遇。

2. 一个指针从相遇点开始，一个指针从head开始，同时同速移动，两个指针相遇时即为入环处

   - 为什么从相遇点和从起点同速移动一定相遇？

   - ~~~
     &1、设从头开始到入环处为x
     &2、从入环处到环内相遇点为y
     &3、从相遇点到入环处为z
     
     slow = x+y
     fast = x+y+n(y+z)
     
     &4、因为快指针移动速度为2，慢指针为1,由此可得:
     
     2(x+y) = x+y+n(y+z)
     x+y = n(y+z)
     x=n(y+z)-y
     
     为了获得x和哪个正数有关，考虑将y进行处理，得出以下：
     x=(n-1)(y+z)+z
     
     因为y+z是环的一圈长度，可以忽略不计（如果n为1的话），由此可得：
     x=z
     所以当快慢指针相遇后，一个指针从相遇点开始，一个指针从head开始，单格移动就一定能在入环处相遇
     ~~~
     
     
     
     

[具体思路见代码随想录](https://www.programmercarl.com/0142.环形链表II.html#思路)

~~~java
/**
 * Definition for singly-linked list.
 * class ListNode {
 *     int val;
 *     ListNode next;
 *     ListNode(int x) {
 *         val = x;
 *         next = null;
 *     }
 * }
 */
public class Solution {
    public ListNode detectCycle(ListNode head) {
        ListNode fast = head;
        ListNode slow = head;
        ListNode beginIndex = head;
        ListNode circleIndex = null;
        while (fast != null && fast.next != null) {
            // 快指针一次跑两步
            fast = fast.next.next;
            // 慢指针一次跑一步
            slow = slow.next;
            if (fast == slow){
                // 说明已经在环内某点相遇了
                // 将这一点设为circleIndex
                circleIndex = fast;
                while (circleIndex != beginIndex) {
                    // 两个指针以同样速度往后移动
                    circleIndex = circleIndex.next;
                    beginIndex = beginIndex.next;
                }
                // 当两个指针相遇的时候，即为环入口
                return circleIndex;
            }
        }
        // 到这里说明没有环
        return null;
    }
}
~~~































### [203. 移除链表元素](https://leetcode.cn/problems/remove-linked-list-elements/)

#### 思路

1. 定义一个虚拟的头结点，指向`head`
2. 再定义一个在遍历的时候可以移动的结点标志`cur结点`
3. 每次遍历都判断`cur.next.val == val `，如果是的话就删除元素，不是的话就后移`cur结点`

~~~java
/**
 * Definition for singly-linked list.
 * public class ListNode {
 *     int val;
 *     ListNode next;
 *     ListNode() {}
 *     ListNode(int val) { this.val = val; }
 *     ListNode(int val, ListNode next) { this.val = val; this.next = next; }
 * }
 */
class Solution {
    public ListNode removeElements(ListNode head, int val) {
        // 如果头结点已经是空了，就直接返回即可
        if (head == null){
            return head;
        }
        // 定义一个临时结点（不移动）
        ListNode temp = new ListNode(-1, head);
        // 定义一个指向当前位置的结点指针（遍历的时候移动）
        ListNode cur = temp;
        while (cur.next != null){
            if (cur.next.val == val){
                // 如果找到了对应的元素就执行删除操作
                cur.next = cur.next.next;
            }else{
                // 没找到就更新cur
                cur = cur.next;
            }
            
        }
		// 返回临时结点的下一个（如果head还在的话就相当于是head了）
        return temp.next;
    }
}
~~~





### [206. 反转链表](https://leetcode.cn/problems/reverse-linked-list/)

#### 思路

##### 双指针解法

1. 定义一个`pre结点`，第一次指向null，每次遍历之后都指向新的结点，最后pre会成为新的头结点
2. 定义一个`cur结点`，第一次指向`head`，每次遍历之后都和pre一起后移，当cur走到null位置的时候，原链表遍历完了，pre也走到了最后一个元素位置了

~~~java
/**
 * Definition for singly-linked list.
 * public class ListNode {
 *     int val;
 *     ListNode next;
 *     ListNode() {}
 *     ListNode(int val) { this.val = val; }
 *     ListNode(int val, ListNode next) { this.val = val; this.next = next; }
 * }
 */
class Solution {
    public ListNode reverseList(ListNode head) {
        // 如果头结点为空或者只有一个结点的话，直接返回就行
        if (head == null || head.next == null){
            return head;
        }
        ListNode cur = head;
        ListNode pre = null;
        ListNode temp = null;
        while(cur != null){
            // 保存cur下一个位置
            temp = cur.next;
            // 建立cur到pre的反向指针
            cur.next = pre;
            // 更新pre位置
            pre = cur;
            // 更新cur位置
            cur = temp;
        }
        return pre;
        
    }
}
~~~



##### 递归解法

整体思路和双指针基本类似

~~~java
/**
 * Definition for singly-linked list.
 * public class ListNode {
 *     int val;
 *     ListNode next;
 *     ListNode() {}
 *     ListNode(int val) { this.val = val; }
 *     ListNode(int val, ListNode next) { this.val = val; this.next = next; }
 * }
 */
class Solution {
    public ListNode reverseList(ListNode head) {
        // 如果头结点为空或者只有一个结点的话，直接返回就行
        if (head == null || head.next == null){
            return head;
        }

        return reverse(head, null);
        
    }

    public ListNode reverse(ListNode cur, ListNode pre){
        if (cur == null) {
            return pre;
        }
        // 拿到cur下一个结点位置，保存起来
        ListNode temp = cur.next;
        // 改变cur指向
        cur.next = pre;
        // 修改位置并递归
        return reverse(temp, cur);
    }
}
~~~















### [209. 长度最小的子数组](https://leetcode.cn/problems/minimum-size-subarray-sum/)

#### 思路

通过双指针解法来动态获取子数组长度

1. 定义一个fast指针用来往后跑，拿到路径和大于目标值的子数组末尾位置
2. 定义一个slow慢指针，当fast停下来之后，slow开始往后移动
   - slow每次移动都让路径和减去slow，当路径和小于目标值的时候，记录刚才的子数组长度，和最小子数组长度进行比较，将小的那个存进最小子数组长度中
3. 最后返回最小子数组长度即可

~~~java
class Solution {
    public int minSubArrayLen(int target, int[] nums) {
        // 双指针解法，让一个快指针先跑，跑到路线上的和已经大于target的时候停下来
        // 接着让满指针开始后移，移动到路线上的和刚好等于target或刚大于target的时候停下来
        int slow = 0;
        int fast = 0;
        int sum = 0;
        // len用于记录slow移动结束之后的的区间长度
        int len = 0;
        // 用于记录最小的连续子数组长度
        int minLen = nums.length + 1;
        // 
        boolean flg = false;
        for (; fast<nums.length; fast++){
            sum += nums[fast];
            if (sum >= target){
                // 说明当前slow和fast夹的区间和已经达到目标了，开始移动slow
                while (sum >= target){
                    sum -= nums[slow];
                    len = fast - slow + 1;
                    slow++;
                    if (len<minLen){
                        minLen = len;
                        flg = true;
                    }
                }
            }
        }
        return flg ? minLen : 0;
    }
}
~~~





### [242. 有效的字母异位词](https://leetcode.cn/problems/valid-anagram/)

#### 思路

因为字符串只会出现小写字母，所以可以定义一个`int[26]`的数组

遍历第一个字符串，用$每个字符的ASCII码 - a的ASCII码（也可以模25）$，得到的数就是对应数组下标，将对应位置数值加一（默认为0）。

遍历第二个字符串，用同样的方式计算每个字符在数组中的下标，将对应位置数值减一

最后判断数组是不是全部为0即可（全为0说明是相同的）



##### 模25方式

> 这种方法用时少

~~~java
public boolean isAnagram(String s, String t) {
        int[] hashTable = new int[26];
        for (char i: s.toCharArray()){
            int site = Integer.valueOf(i);
            hashTable[site%25]++;
        }
        for (char i: t.toCharArray()){
            int site = Integer.valueOf(i);
            hashTable[site%25]--;
        }
        for (int i=0; i < hashTable.length; i++){
            if (hashTable[i] != 0){
                return false;
            }
        }
        return true;
    }
~~~



##### 直接减去\'a'

~~~java
class Solution {
    public boolean isAnagram(String s, String t) {
        if(s.length() != t.length()) {
            return false;
        }
        int[] hashTable = new int[26];
        for (int i=0; i<s.length(); i++){
            hashTable[s.charAt(i) - 'a']++;
        } 
        for (int i=0; i<t.length(); i++){
            hashTable[t.charAt(i) - 'a']--;
        } 
        for (int i=0; i < hashTable.length; i++){
            if (hashTable[i] != 0){
                return false;
            }
        }
        return true;
    }
}
~~~







### TODO：344









### [349. 两个数组的交集](https://leetcode.cn/problems/intersection-of-two-arrays/)

#### 思路

因为这题给出的两个数组长度都不会超过1000，所以可以用数组解决，也可以用set解决。



#### 数组解法

~~~java
class Solution {
    public int[] intersection(int[] nums1, int[] nums2) {
        // 存结果的list
        ArrayList<Integer> res = new ArrayList();
        // 记录元素出现的数组
        int[] record = new int[1001];
        for (int i: nums1){
            // 遍历nums1数组，出现的数字都在记录数组对应位置做标记
            record[i] = 1;
        }
        for (int i: nums2){
            // 遍历nums2
            if (record[i] == 1){
                // 如果元素出现过，就先修改标记（去重）
                record[i] = 2;
                // 添加进list里
                res.add(i);
            }
        }
        // 最终返回的结果数组
        int[] result = new int[res.size()];
        // 遍历list，转为结果数组
        for (int i=0; i<res.size(); i++){
            result[i] = res.get(i);
        }
        // 返回结果数组
        return result;
    }
}
~~~



#### Set方法

~~~java
class Solution {
    public int[] intersection(int[] nums1, int[] nums2) {
        // 用来存nums1的数字
        Set<Integer> numsSet = new HashSet<>();
        // 用来存nums2和nums1交集的数字
        Set<Integer> resSet = new HashSet<>();
        for (int i: nums1) {
            // 将nums1数字存入set中
            numsSet.add(i);
        }
        for (int i: nums2) {
            if (numsSet.contains(i)) {
                // 如果有交集，存入resSet中
                resSet.add(i);
            }
        }
        // 最终的结果数组
        int[] result = new int[resSet.size()];
        int index = 0;
        // 将set转为结果数组
        for (int i: resSet) {
            result[index++] = i;
        }
        return result;
    }
}
~~~





### [454. 四数相加 II](https://leetcode.cn/problems/4sum-ii/)

#### 思路

通过map集合来把每个组合的和和出现次数统计起来。

四个数组分成两次来遍历

第一次：

遍历前两个数组，嵌套两个for循环把每个组合的和算出来，和作为map的key，出现的次数作为map的value

第二次：

遍历后面两个数组，嵌套两个for循环把每个组合的和算出来，因为题目是要求最后四个数的和为0，那么就把后面两个数组的和乘上-1，之后用这个数去map中找对应的key，这个key的value就是次数，累加起来最后返回就行



~~~java
class Solution {
    public int fourSumCount(int[] nums1, int[] nums2, int[] nums3, int[] nums4) {
        int count = 0;
        int temp = 0;
        Map<Integer, Integer> map = new HashMap<>();
        for (int i=0; i<nums1.length; i++) {
            for (int j=0; j<nums2.length; j++) {
                temp = nums1[i] + nums2[j];
                if (map.containsKey(temp)) {
                    map.put(temp, map.get(temp)+1);
                }else{
                    map.put(temp, 1);
                }
            }
        }
        for (int i=0; i<nums3.length; i++) {
            for (int j=0; j<nums4.length; j++) {
                temp = -1 * (nums3[i] + nums4[j]);
                if (map.containsKey(temp)) {
                    count += map.get(temp);
                }
            }
        }
        return count;
    }
}
~~~







### TODO：541





### [707. 设计链表](https://leetcode.cn/problems/design-linked-list/)

#### 思路

1. 创建节点类
2. 在`MyLinkedList`中设置变量来记录总共有几个结点
3. 设置虚拟头结点（可以统一操作）
4. 封装插入的方法



~~~java
class Node{
    int val;
    Node next;
    public Node(){}
    public Node(int val){
        this.val = val;
    }
}

class MyLinkedList {

    // 记录结点个数
    int size;
    // 虚拟头结点
    Node virtualNode;

   
    public MyLinkedList() {
        size = 0;
        virtualNode = new Node();
    }
    
    public int get(int index) {
       if (index < 0 || index>size-1){
           return -1;
       }
       Node cur = virtualNode;
       for (int i = 0; i<index; i++){
           cur = cur.next;
       }
       return cur.next.val;
    }
    
    public void addAtHead(int val) {
        insertNode(0, val);
    }
    
    public void addAtTail(int val) {
        insertNode(size, val);
    }
    
    public void addAtIndex(int index, int val) {
        insertNode(index, val);
    }
    
    public void deleteAtIndex(int index) {
        if (index < 0 || index>size-1){
           return;
       }
       Node cur = virtualNode;
       for (int i = 0; i<index; i++){
           cur = cur.next;
       }
        // 循环结束后，cur.next指向的就是index位置
       if (cur.next != null){
           cur.next = cur.next.next;
       } else {
           cur.next = null;
       }
       size--;
    }

    public void insertNode(int index, int val){
        if (index > size) {
            // 超出长度了
            return;
        }
        // 处理小于0的情况
        if (index < 0) {
            index = 0;
        }
        // 其他情况统一处理
        Node newNode = new Node(val);
        Node cur = virtualNode;
        for (int i = 0; i<index; i++){
           cur = cur.next;
        }
        // 循环结束后，cur.next指向的就是index位置
        newNode.next = cur.next;
        cur.next = newNode;
        size++;
    }
}

/**
 * Your MyLinkedList object will be instantiated and called as such:
 * MyLinkedList obj = new MyLinkedList();
 * int param_1 = obj.get(index);
 * obj.addAtHead(val);
 * obj.addAtTail(val);
 * obj.addAtIndex(index,val);
 * obj.deleteAtIndex(index);
 */
~~~









### 常用方法

##### 数组

###### 长度

~~~
数组.length;
~~~





##### 字符串

###### 长度

~~~
字符串.length()
~~~

###### 转化成char数组

~~~
s.toCharArray()
~~~

###### 求索引位置的字符char

~~~
s.charAt(index)
~~~





##### ArrayList

###### 长度

~~~
集合.size();
~~~

###### 加入元素

~~~
集合.add(元素);
~~~





##### HashMap

###### 判断是否存在Key

~~~
map.containsKey(key);
~~~











