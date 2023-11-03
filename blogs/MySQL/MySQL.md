# MySQL



# 登录

> mysq1 -u用户名 -p密码 -h要连接的mysq1服务器的ip地址（默认127.0.0.1） -P端口号（默认3306）



# DDL

![image-20220413155632417](https://s2.loli.net/2023/10/18/cgrBaTKVbEHYkUG.png)

​	使用if not exists 来创建，若库存在也不会报错。

![image-20220413155334184](https://s2.loli.net/2023/10/18/vwqLDXeASY81HTQ.png)

使用 if exists 来删除库，若库不存在也不会报错。

![image-20220413155451214](https://s2.loli.net/2023/10/18/SNenRJPuYwkZO9a.png)

![image-20220413155839724](https://s2.loli.net/2023/10/18/VFi4k15yopBmlsT.png)

## 查询表

![image-20220413155920795](https://s2.loli.net/2023/10/18/Nyp7EG5nkYS8xMm.png)

## 创建表

![image-20220413160025827](https://s2.loli.net/2023/10/18/r8PuxlWifS6GLC5.png)





### 基于现有表复制新表

> 1. 使用 AS subquery 选项，**将创建表和插入数据结合起来**
> 2. 指定的列和子查询中的列要一一对应（可以不指定列，就直接使用查询语句返回出来的表的列名）
> 3. 默认会将查询语句查询到的**数据和结构全部复制**到新表，如果只想要结构的话，可以通过查询语句的过滤条件来控制，比如`WHERE 1 = 2`就会过滤掉数据

![image-20230128151315125](https://s2.loli.net/2023/10/18/MiSuvyxQ69h8EZT.png)

~~~sql
CREATE TABLE 新表表名
AS
# 下面这部分就相当于是正常的查询语句
SELECT 旧表各个列
FROM 旧表
WHERE 过滤条件;
~~~







## sql中数据类型

![image-20220413160559155](https://s2.loli.net/2023/10/18/x3w9iJpf4MdujEC.png)

## 删除与清空表

![image-20220413160851229](https://s2.loli.net/2023/10/18/LzJ4brEapI51OAY.png)

### 清空表

> `TRUNCATE` 清空操作是**不可以回滚**的
>
> `DELETE FROM`也可以清空表，是可以回滚的

~~~sql
TRUNCATE TABLE 表名
~~~



## 修改表

![image-20220413160906791](https://s2.loli.net/2023/10/18/24i9YuUd6ownEBv.png)



### 补充

#### modify

修改字段（长度、数据类型、默认值）

```sql
ALTER TABLE 表名
modify 列名 数据类型 默认值
```



可以将列移动位置

~~~sql
ALTER TABLE 表名
modify 列名 数据类型 默认值 [AFTER 某个其他列 | FIRST]
~~~



#### change

包含了`modify`的功能，同时还能改变列名

~~~sql 
ALTER TABLE 表名
CHANGE 列名 新列名 数据类型 默认值
~~~



#### 改表名

##### 方式一

~~~sql
RENAME TABLE 表名
TO 新表名
~~~



##### 方式二

~~~sql
ALTER TABLE 表名
RENAME TO 新表名
~~~









# DML

## 添加数据

### 单条或多条添加

![image-20220413161349192](https://s2.loli.net/2023/10/18/H7XVue2kABNTglW.png)

> ==注意：==一个同时插入多行记录的INSERT语句等同于多个单行插入的INSERT语句，但是**多行的INSERT语句**在处理过程中 **效率更高** 。因为MySQL执行单条INSERT语句插入多行数据比使用多条INSERT语句快。
>
> **所以在插入多条记录时最好选择使用单条INSERT语句的方式插入。**



### 添加查询的返回结果集

~~~sql
INSERT INTO emp1(id,`name`,salary,hire_date)
#查询语句
SELECT employee_id,last_name,salary,hire_date  # 查询的字段一定要与添加到的表的字段一一对应
FROM employees
WHERE department_id IN (70,60);
~~~



说明：

1. `emp1表`中要添加数据的字段的长度**不能低于**employees表中查询的字段的长度。
2. 如果emp1表中要添加数据的字段的长度**低于**employees表中查询的字段的长度的话，就有添加不成功的风险。

## 修改数据

![image-20220413161927038](https://s2.loli.net/2023/10/18/Sps4lABKHe6aJ1F.png)





## 删除数据

### 常规写法

~~~sql
DELETE FROM 表
WHERE 过滤条件
~~~



### 多表同时删除某一个记录

> 以下代码的意思是：
>
> 从表一和表二中同时删除id为xxx的记录

~~~sql
DELETE 表1别名, 表2别名
FROM 表1 表1别名 JOIN 表2 表2别名
ON 表1别名.共同字段 = 表2别名.共同字段
WHERE 过滤条件（比如id=xxx）
~~~



以上方法也可以改写成两条删除语句

# DQL

## 查询语法

![image-20220413162325155](https://s2.loli.net/2023/10/18/B1g8dS7AoVreUuE.png)

### 1.1 DISTINCT 去重

![image-20220413162556197](https://s2.loli.net/2023/10/18/ZIBzeCTAsGNfuo8.png)

## 基础查询

![image-20220413162742336](https://s2.loli.net/2023/10/18/lDYBTzGtXqKicW2.png)

## 条件查询

![image-20220413162848592](https://s2.loli.net/2023/10/18/yPgi3dYepOl5HkG.png)

![image-20220413163120631](https://s2.loli.net/2023/10/18/TumXhysCGeLqAjk.png)

### 3.1 排序查询

![image-20220413163322098](https://s2.loli.net/2023/10/18/KA4khRPczat2wXE.png)

![image-20220413163449778](https://s2.loli.net/2023/10/18/1ae3EJZ4iGY6LSg.png)

### 3.2 聚合函数

![image-20220413163623933](https://s2.loli.net/2023/10/18/3iIWnAYLNJcBMrs.png)

### 3.3 分组查询

#### 格式顺序

~~~sql
select
from
where
group by
order by
limit
~~~



> - `select`中出现的非组函数（聚合函数）的字段**必须声明**在`group by`中。
> - `group by`中声明的的字段**可以不出现**在`select`中

![image-20220413164225031](https://s2.loli.net/2023/10/18/7nVThkm4AdxBj1Z.png)



#### having

注意：

1. 如果过滤条件中使用了聚合函数，则必须使用`HAVING`来替换`WHERE`。否则报错
   1. 如果过滤条件中**没有聚合函数**，理论上写在`HAVING`还是`WHERE`都行，不过更建议写在`WHERE`
   2. 如果过滤条件中**有聚合函数**，过滤条件一定要在`HAVING`中
2. 用`HAVING`前提是用了`GROUP BY`
3. `HAVING`必须在`GROUP BY`后面





#### GROUP BY 中使用 WITH ROLLUP

使用 `WITH ROLLUP` 关键字之后，在所有查询出的分组记录之后增加一条记录，该记录计算查询出的所有记录的总和，即统计记录数量

> ==注意：==当使用ROLLUP时，**不能同时使用ORDER BY**子句进行结果排序，即`ROLLUP`和`ORDER BY`是**互相排斥**的。

~~~sql
SELECT department_id,AVG(salary)
FROM employees
WHERE department_id > 80
GROUP BY department_id WITH ROLLUP;
~~~







### 3.4 分页查询

![image-20220413164906290](https://s2.loli.net/2023/10/18/BsFvtWbAkQGgoqO.png)

![image-20220413165123978](https://s2.loli.net/2023/10/18/8lmvFOI6oRVMXaw.png)





## 多表查询

### 分类

多表查询从不同的角度来看，可以分成三类

1. 等值连接 ---- 非等值连接
2. 自连接 ---- 非自连接
3. 内连接 ---- 外连接





### 等值 -- 非等值连接

#### 等值连接

~~~sql
SELECT s.id, c.age
FROM s , c
WHERE s.id = c.id
~~~



#### 非等值连接

~~~sql
SELECT e.name, e.salary, c.level
FROM s, c
WHERE e.salary BETWEEN c.lowest_sal AND c.highest_sal;
~~~





### 自连接 ---- 非自连接

#### 自连接

当 table1 和 table2 本质上是**同一张表**，只是用取别名的方式**虚拟成两张表**以代表不同的意义。然后两

个表再进行内连接，外连接等查询。

~~~sql
SELECT CONCAT(worker.last_name ,' works for ', manager.last_name)
FROM employees worker, employees manager
WHERE worker.manager_id = manager.employee_id ;
~~~









### 内连接 ---- 外连接

#### 内连接

合并具有同一列的两个以上的表的行, 结果集中**不包含**一个表与另一个表**不匹配的行**



##### JOIN ... ON ... 关键字

> 1. 关键字 `JOIN`、`INNER JOIN`、`CROSS JOIN` 的含义是一样的，都表示内连接
> 2. 可以使用 ON 子句指定额外的连接条件。
> 3. 这个连接条件是与其它条件分开的。
> 4. ON子句使语句具有更高的易读性。

~~~sql
SELECT 字段列表
FROM A表 INNER JOIN B表
ON 关联条件
WHERE 等其他子句;
~~~



#### 外连接

两个表在连接过程中除了返回满足连接条件的行以外**还返回左（或右）表中不满足条件的**

**行 ，这种连接称为左（或右） 外连接**。没有匹配的行时, 结果表中相应的列为空(NULL)。

- 如果是左外连接，则连接条件中左边的表也称为 主表 ，右边的表称为 从表 。
- 如果是右外连接，则连接条件中右边的表也称为 主表 ，左边的表称为 从表 。



##### 左外连接

> `LEFT OUTER JOIN`，其中`OUTER`可以省略

~~~sql
#实现查询结果是A
SELECT 字段列表
FROM A表 LEFT JOIN B表
ON 关联条件
WHERE 等其他子句;
~~~





##### **右外连接**

> `RIGHT OUTER JOIN`，其中`OUTER`可以省略

~~~sql
FROM A表 RIGHT JOIN B表
ON 关联条件
WHERE 等其他子句;
~~~





##### 全/满外连接

> `FULL OUTER JOIN`，其中`OUTER`可以省略
>
> ==注意：==*SQL99* 是支持满外连接的。使用`FULL JOIN` 或` FULL OUTER JOIN`来实现。**MySQL不支持**FULL JOIN写法，但是可以用` LEFT JOIN UNION RIGHT join`代替。



## UNION 和 UNION ALL

### 用法

**合并查询结果** 利用UNION关键字，可以给出多条SELECT语句，并将它们的结果**组合成单个结果集**。合并

时，两个表对应的列数和数据类型必须相同，并且相互对应。各个SELECT语句之间使用UNION或UNION

ALL关键字分隔。



~~~sql
SELECT column,... FROM table1
UNION [ALL]
SELECT column,... FROM table2
~~~





### UNION

> `UNION` 操作符返回两个查询的结果集的并集，**去除重复记录**。
>
> 因为比`UNION ALL`多了一步去重，所以开发中**能用`UNION ALL` 就不用`UNION`**



![image-20230120141130531](https://s2.loli.net/2023/10/18/dlYp2NV69vLXzxO.png)





### UNION All

> `UNION ALL`操作符返回两个查询的结果集的并集。对于两个结果集的重复部分，**不去重**
>
> ==注意：==执行UNION ALL语句时所需要的资源比UNION语句少。如果明确知道合并数据后的结果数据不存在重复数据，或者不需要去除重复的数据，则**尽量使用UNION ALL语句**，以提高数据查询的效率。



![image-20230120141408419](https://s2.loli.net/2023/10/18/aywGRIPYogjON7B.png)







## 七种 join 的实现

![image-20230120141744045](https://s2.loli.net/2023/10/18/Xqcya3Arb85jpO9.png)

### 1_左上

左外连接即可

### 2_右上

右外连接即可

### 3_左中

~~~sql
#实现A - A∩B
select 字段列表
from A表 left join B表
on 关联条件
where 从表关联字段（主表中从表外键为null的情况） is null and 等其他子句;
~~~



### 4_右中

~~~sql
#实现B - A∩B
select 字段列表
from A表 right join B表
on 关联条件
where 从表关联字段（主表中从表外键为null的情况） is null and 等其他子句;
~~~



### 5_左下

可以用 左上 拼 右中

或者 左中 拼 右上

~~~sql
#实现查询结果是A∪B
#用左外的A，union 右外的B
select 字段列表
from A表 left join B表
on 关联条件
where 等其他子句
union
select 字段列表
from A表 right join B表
on 关联条件
where 等其他子句;
~~~



### 6_右下

可以用 左中 拼 右中

~~~sql
#实现A∪B - A∩B 或 (A - A∩B) ∪ （B - A∩B）
#使用左外的 (A - A∩B) union 右外的（B - A∩B）
select 字段列表
from A表 left join B表
on 关联条件
where 从表关联字段 is null and 等其他子句
union
select 字段列表
from A表 right join B表
on 关联条件
where 从表关联字段 is null and 等其他子句
~~~



### 7_中

内连接即可





### 练习

~~~sql
CREATE TABLE `t_dept` (
`id` INT(11) NOT NULL AUTO_INCREMENT,
`deptName` VARCHAR(30) DEFAULT NULL,
`address` VARCHAR(40) DEFAULT NULL,
PRIMARY KEY (`id`)
) ENGINE=INNODB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

CREATE TABLE `t_emp` (
`id` INT(11) NOT NULL AUTO_INCREMENT,
`name` VARCHAR(20) DEFAULT NULL,
`age` INT(3) DEFAULT NULL,
`deptId` INT(11) DEFAULT NULL,
empno int not null,
PRIMARY KEY (`id`),
KEY `idx_dept_id` (`deptId`)
#CONSTRAINT `fk_dept_id` FOREIGN KEY (`deptId`) REFERENCES `t_dept` (`id`)
) ENGINE=INNODB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;


INSERT INTO t_dept(deptName,address) VALUES('华山','华山');
INSERT INTO t_dept(deptName,address) VALUES('丐帮','洛阳');
INSERT INTO t_dept(deptName,address) VALUES('峨眉','峨眉山');
INSERT INTO t_dept(deptName,address) VALUES('武当','武当山');
INSERT INTO t_dept(deptName,address) VALUES('明教','光明顶');
INSERT INTO t_dept(deptName,address) VALUES('少林','少林寺');
INSERT INTO t_emp(NAME,age,deptId,empno) VALUES('风清扬',90,1,100001);
INSERT INTO t_emp(NAME,age,deptId,empno) VALUES('岳不群',50,1,100002);
INSERT INTO t_emp(NAME,age,deptId,empno) VALUES('令狐冲',24,1,100003);
INSERT INTO t_emp(NAME,age,deptId,empno) VALUES('洪七公',70,2,100004);
INSERT INTO t_emp(NAME,age,deptId,empno) VALUES('乔峰',35,2,100005);
INSERT INTO t_emp(NAME,age,deptId,empno) VALUES('灭绝师太',70,3,100006);
INSERT INTO t_emp(NAME,age,deptId,empno) VALUES('周芷若',20,3,100007);
INSERT INTO t_emp(NAME,age,deptId,empno) VALUES('张三丰',100,4,100008);
INSERT INTO t_emp(NAME,age,deptId,empno) VALUES('张无忌',25,5,100009);
INSERT INTO t_emp(NAME,age,deptId,empno) VALUES('韦小宝',18,null,100010);


~~~



#### 题目

~~~sql
【题目】
#1.所有有门派的人员信息
（ A、B两表共有）
#2.列出所有用户，并显示其机构信息
（A的全集）
#3.列出所有门派
（B的全集）
#4.所有不入门派的人员
（A的独有）
#5.所有没人入的门派
（B的独有）
#6.列出所有人员和机构的对照关系
(AB全有)
#MySQL Full Join的实现 因为MySQL不支持FULL JOIN,下面是替代方法
#left join + union(可去除重复数据)+ right join
#7.列出所有没入派的人员和没人入的门派
（A的独有+B的独有）
~~~



#### 答案

~~~sql
-- 1. 查询所有有门派的人员信息
SELECT *
FROM t_emp e INNER JOIN t_dept d
ON e.deptId = d.id

#2.列出所有用户，并显示其机构信息
-- （A的全集）
SELECT e.name, d.deptName
FROM t_emp e LEFT JOIN t_dept d
ON e.deptId = d.id


#3.列出所有门派
-- （B的全集）
SELECT d.deptName
FROM t_dept d


#4.所有不入门派的人员
-- （A的独有）
-- 我的写法
SELECT e.name, d.deptName
FROM t_emp e LEFT JOIN t_dept d
ON e.deptId = d.id
WHERE e.deptId is NULL

-- 老师写法
select a.name, b.deptName
from t_emp a left join t_dept b
on a.deptId = b.id
where b.id is null;


#5.所有没人入的门派
-- （B的独有）
-- 我的写法
SELECT d.deptName
FROM t_emp e RIGHT JOIN t_dept d
ON e.deptId = d.id
WHERE e.deptId is NULL

-- 老师写法
select *
from t_dept b left join t_emp a
on a.deptId = b.id
where a.deptId is null;

#6.列出所有人员和机构的对照关系
-- (AB全有)
SELECT e.name, d.deptName
FROM t_emp e LEFT JOIN t_dept d
ON e.deptId = d.id
UNION ALL
SELECT e.name, d.deptName
FROM t_emp e RIGHT JOIN t_dept d
ON e.deptId = d.id
WHERE e.deptId is NULL



#MySQL Full Join的实现 因为MySQL不支持FULL JOIN,下面是替代方法
#left join + union(可去除重复数据)+ right join
#7.列出所有没入派的人员和没人入的门派
-- （A的独有+B的独有）
SELECT e.name, d.deptName
FROM t_emp e LEFT JOIN t_dept d
ON e.deptId = d.id
WHERE e.deptId is NULL
UNION ALL
SELECT e.name, d.deptName
FROM t_emp e RIGHT JOIN t_dept d
ON e.deptId = d.id
WHERE e.deptId is NULL


~~~





## SQL99语法新特性

### **6.1** **自然连接**

SQL99 在 SQL92 的基础上提供了一些特殊语法，比如` NATURAL JOIN` 用来表示自然连接。我们可以把

自然连接理解为 SQL92 中的等值连接。它会帮你自动查询两张连接表中 **所有相同的字段** ，然后进行 **等值连接** 。

在SQL92标准中：

~~~sql
SELECT employee_id,last_name,department_name
FROM employees e JOIN departments d
ON e.`department_id` = d.`department_id`
AND e.`manager_id` = d.`manager_id`;
~~~



在 SQL99 中你可以写成：

~~~sql
SELECT employee_id,last_name,department_name
FROM employees e NATURAL JOIN departments d;
~~~



### 6.2 USING连接

当我们进行连接的时候，SQL99还支持使用 USING 指定数据表里的 **同名字段** 进行等值连接。但是只能配合JOIN一起使用。比如：

~~~sql
SELECT employee_id,last_name,department_name
FROM employees e JOIN departments d
USING (department_id);
~~~



你能看出与自然连接 NATURAL JOIN 不同的是，USING 指定了具体的相同的字段名称，你需要在 USING的括号 () 中填入要指定的同名字段。同时使用 `JOIN...USING` 可以简化 JOIN ON 的等值连接。它与下面的 SQL 查询结果是相同的：

~~~sql
SELECT employee_id,last_name,department_name
FROM employees e ,departments d
WHERE e.department_id = d.department_id;
~~~





## 8.多表查询小结

表连接的约束条件可以有三种方式：WHERE, ON, USING

1. `WHERE`：适用于所有关联查询
2. `ON `：只能和JOIN一起使用，只能写关联条件。虽然关联条件可以并到WHERE中和其他条件一起写，但分开写可读性更好。
3. `USING`：只能和JOIN一起使用，而且要求**两个**关联字段在关联表中名称一致，而且只能表示关联字段值相等

~~~sql

#关联条件
#把关联条件写在where后面
SELECT last_name,department_name
FROM employees,departments
WHERE employees.department_id = departments.department_id;
#把关联条件写在on后面，只能和JOIN一起使用
SELECT last_name,department_name
FROM employees INNER JOIN departments
ON employees.department_id = departments.department_id;
SELECT last_name,department_name
FROM employees CROSS JOIN departments
ON employees.department_id = departments.department_id;
SELECT last_name,department_name
FROM employees JOIN departments
ON employees.department_id = departments.department_id;
#把关联字段写在using()中，只能和JOIN一起使用
#而且两个表中的关联字段必须名称相同，而且只能表示=
#查询员工姓名与基本工资
SELECT last_name,job_title
FROM employees INNER JOIN jobs USING(job_id);
#n张表关联，需要n-1个关联条件
#查询员工姓名，基本工资，部门名称
SELECT last_name,job_title,department_name FROM employees,departments,jobs
WHERE employees.department_id = departments.department_id
AND employees.job_id = jobs.job_id;
SELECT last_name,job_title,department_name
FROM employees INNER JOIN departments INNER JOIN jobs
ON employees.department_id = departments.department_id
AND employees.job_id = jobs.job_id;
~~~



### 注意：

要 **控制连接表的数量** 。多表连接就相当于嵌套 for 循环一样，非常消耗资源，会让 SQL 查询性能下

降得很严重，因此不要连接不必要的表。在许多 DBMS 中，也都会有最大连接表的限制。

> 【强制】超过三个表禁止 join。需要 join 的字段，数据类型保持绝对一致；多表关联查询时， 保证被关联的字段需要有索引。
>
> 说明：即使双表 join 也要注意表索引、SQL 性能。





## 函数

见pdf课件

> MySQL中聚合函数不能嵌套



## 子查询

> 可以在select的`case when`用、可以在from里用、可以在where用、可以在having里用等等
>
> 总结：除了`GROUP BY`和`LIMIT`外，其他地方都可以声明子查询

### 分类

#### 角度一：从内查询（子查询）返回的结果的条目数

1. 单行子查询
   - 返回结果只有单个
2. 多行子查询
   - 返回结果有多行



#### 角度二：按内查询是否被执行多次

1. 相关子查询
   - 主查询的不同查询条件**可能导致**子查询的改变
     - 比如：查 工资大于**当前员工所在部门**平均工资的员工信息
2. 不相关子查询
   - 主查询的不同查询条件**不会导**致子查询的改变
     - 比如：查 工资大于**本公司**平均工资的员工信息





### 单行子查询

#### 单行比较操作符

~~~
=
<
< =
>
> =
<>
~~~



### 多行子查询

#### 多行比较操作符

1. `in`
   - 等于列表中的**任意一个**
2. `any`
   - 需要和单行比较操作符一起使用，和子查询返回的**某一个**值比较
3. `all`
   - 需要和单行比较操作符一起使用，和子查询返回的**所有**值比较
4. `some`
   - 实际上**是ANY的别名**，作用相同，一般常使用ANY



> 什么叫 *和单行比较操作符一起使用* ：
>
> 即可以有`< ANY`、`>= ALL`等等的写法





#### 小案例

**查询平均工资最低的部门id**

> 因为MySQL中聚合函数不能嵌套，所以不能有`MIN(AVG(salary))`的写法
>
> 不过可以先`AVG(salary)`获得一张新表，做为子查询结果放在主查询的`FROM`位置

~~~sql
#方式1：
SELECT department_id
FROM employees
GROUP BY department_id
HAVING AVG(salary) = (
    SELECT MIN(avg_sal)
    FROM (
        SELECT AVG(salary) avg_sal
        FROM employees
        GROUP BY department_id
    ) dept_avg_sal
)


#方式2：
SELECT department_id
FROM employees
GROUP BY department_id
HAVING AVG(salary) <= ALL (
    SELECT AVG(salary) avg_sal
    FROM employees
    GROUP BY department_id
)
~~~



#### 空值问题

下面案例本意是查询除了管理者id以外的其他人，即查询非管理者的姓名，不过因为子查询会查到一个`null`，导致整个查询语句没有结果

解决办法是在子查询中过滤空值（如注释位置所示），即可查到结果

~~~sql
SELECT last_name
FROM employees
WHERE employee_id NOT IN (
    SELECT manager_id
    FROM employees
    # where manager_id is not null
);
~~~









### 相关子查询

> 相关子查询中同样包含了单行和多行的子查询

#### 什么是相关子查询

如果**子查询**的执行**依赖于外部查询**，通常情况下都是因为**子查询中的表用到了外部的表**，并进行了条件关联，因此**每执行一次外部查询，子查询都要重新计算一次**，这样的子查询就称之为 `关联子查询` 。

相关子查询按照一行接一行的顺序执行，主查询的每一行都执行一次子查询。



#### 案例

查找员工工资大于其本部门的平均工资的员工信息



##### 写法一：在条件中使用相关子查询

~~~sql
select name, salary, department_id
from emplyees outer
where salary > (
				select AVG(salary)
    			from employees
    			where department_id = outer.department_id
				)
~~~



##### 写法二：在`FROM`中使用子查询

> **from型的子查询**：子查询是作为from的一部分，子查询要用`()`引起来，并且==<u>**一定要**</u>给这个子查询取`别名`==， 把它当成一张“临时的虚拟的表”来使用。
>
> 写法一效率不如写法二：因为写法二是from已经创建好条件虚拟表，而第一种每次都要去动态的创建虚拟表

~~~sql
SELECT name,salary,e1.department_id
FROM employees e1,(
    				SELECT department_id,AVG(salary) dept_avg_sal 
    				FROM employees 
    				GROUP BY department_id
					) e2	
WHERE e1.`department_id` = e2.department_id
AND e2.dept_avg_sal < e1.`salary`;
~~~





### **EXISTS** **与** NOT EXISTS 关键字

1. 关联子查询通常也会和 EXISTS操作符一起来使用，用来检查在子查询中是否存在满足条件的行。
2. **如果在子查询中不存在满足条件的行：**
   - 条件返回 FALSE
   - 继续在子查询中查找
3. **如果在子查询中存在满足条件的行：**
   - 不在子查询中继续查找
   - 条件返回 TRUE
4. `NOT EXISTS`关键字表示如果不存在某种条件，则返回TRUE，否则返回FALSE。



#### 小案例

查询公司管理者的employee_id，last_name，job_id，department_id信息

##### 通过子查询方式：

> 需要去重

~~~sql
SELECT employee_id,last_name,job_id,department_id
FROM employees
WHERE employee_id IN (
    SELECT DISTINCT manager_id
    FROM employees
);
~~~



##### 通过exist关键字：

> 主查询查出每个员工，放进子查询中，通过子查询的`manager_id`如果和主查询的工号相同，证明主查询的当前员工就是管理员，因为主查询每次迭代的`employee_id`是不会重复的，也就是说最后的结果是不需要去重的

~~~sql
SELECT employee_id, last_name, job_id, department_id
FROM employees e1
WHERE EXISTS ( SELECT *
              FROM employees e2
              WHERE e2.manager_id = e1.employee_id);
~~~





### 自连接和子查询对比

> ==自连接更好==

题目中可以使用子查询，也可以使用自连接。**一般情况建议使用自连接**，因为在许多 DBMS 的处理过程中，对于自连接的处理速度要比子查询快得多。

可以这样理解：子查询实际上是通过未知表进行查询后的条件判断，而自连接是通过已知的自身数据表进行条件判断，因此在大部分 DBMS 中都对自连接处理进行了优化（自动将子查询转为自连接（如果可以的话））。

# 索引

- 索引的类型
  1. 主键索引
     - 主键自动地为主索引（Primary Key）
  2. 唯一索引
     - 不允许重复，UNIQUE
  3. 普通索引
     - 既想是索引，有得能重复，INDEX
  4. 联合索引
  5. 全文索引
     - 比如可以从一段文本里定位出某个字符，（FULLTEXT）【适用于MyISAM】
     - 开发中一般不会用mysql自带的全文索引，而是用全文搜索Solr和ElasticSearch（ES）







## 一、实操中怎么增删改查索引

### 查询索引

#### 第一种方式

~~~mysql
-- 查看table中的索引
show index from book;
~~~

查询结果：

![image-20221110201224063](https://s2.loli.net/2023/10/18/elPrt9B35RuDsxG.png)

#### 第二种方式

~~~mysql
show indexs from 表名;
~~~

查询结果：

![image-20221110212630166](https://s2.loli.net/2023/10/18/xbCtnVMZqKsv3T5.png)

#### 第三种方式

~~~mysql
show keys from t1;
~~~

查询结果：

![image-20221110212731924](https://s2.loli.net/2023/10/18/IJ9SxFjfl2RQ6mC.png)



#### 第四种方式

主要用于看数据表结果，显示索引信息没有前几种那么全

~~~mysql
desc 表名;
~~~





### 添加索引

#### 添加普通索引

~~~mysql
-- 添加普通索引，第一种方法
-- 语法为：
--     create index 索引名字 on 表名(字段名);
create index username_index on book(username);

-- 添加普通索引，第二种方法
-- 语法为：
--     alter table 表名 add index 索引名字 (字段名);
alter table book add index bookname_index (bookname);
~~~





#### 添加主键索引

~~~mysql
-- 第一种方式，在建表的时候直接指定
create table t1(
	id int primary key,
	name varchar(32)
);

-- 第二种方式，建完表指定
-- 语法为：
--     alter table 表名 add primary key (字段名);
alter table t1 add primary key (id);
~~~





### 删除索引

#### 删除普通索引

~~~mysql
drop index 索引名字 on 表名;
~~~





#### 删除主键索引

~~~mysql
alter table 表名 drop primary key;
~~~





## 二、索引的适用性

### 哪些列上适合使用索引

1. 频繁查询的字段适合使用索引



### 哪些列不适合使用索引

1. 唯一性太差的字段不适合单独创建索引，即使是频繁作为查询条件的
   - 比如说性别，即使用了索引也只能筛掉大概50%
2. 更新非常频繁的字段不适合创建索引
   - 比如说登录次数的记录，修改的时间等等。。
3. 不会出现在`where`子句中的字段不该创建索引





## 三、🔴InnoDB 索引

> 索引是是帮助MySQ高效获取数据的**数据结构**



### 一、优缺点

#### 优点

1. 类似大学图书馆建书目索引，提高数据检索的效率，**降低 数据库的`IO成本`** ，这也是创建索引最主要的原因。 
2. 通过**创建唯一索引**，可以保证数据库表中每一行 **数据的唯一性** 。 
3. 在实现数据的参考完整性方面，可以 **加速表和表之间的连接** 。换句话说，对于有依赖关系的子表和父表联合查询时，可以提高查询速度。 
4. 在使用分组和排序子句进行数据查询时，可以显著 **减少查询中分组和排序的时间** ，降低了CPU的消耗。



#### 缺点

1. 创建索引和维护索引要 **耗费时间** ，并且随着数据量的增加，所耗费的时间也会增加。 （
2. 索引需要 **占磁盘空间**（MySQL8索引和数据都存在`.idb`文件中） ，除了数据表占数据空间之外，每一个索引还要占一定的物理空间， 存储在磁盘上 ，如果有大量的索引，索引文件就可能比数据文件更快达到最大文件尺寸。 
3. 虽然索引大大提高了查询速度，同时却会 **降低更新表的速度** 。当对表中的数据进行增加、删除和修改的时候，索引也要动态地维护，这样就降低了数据的维护速度。

> 因此，选择使用索引时，需要综合考虑索引的优点和缺点。





### 二、❗ InnoDB 的 B+ 树（聚簇索引）

#### 目录项记录和用户记录的异同

##### 不同点

1. 目录项记录 的 `record_type` 值是1，而 普通用户记录 的` record_type` 值是0。
2. 目录项记录只有 主键值和页的编号 两个列，而普通的用户记录的列是用户自己定义的，可能包含 很多列 ，另外还有InnoDB自己添加的隐藏列。
3. 了解：记录头信息里还有一个叫 `min_rec_mask` 的属性，只有在存储 目录项记录 的页中的主键值最小的 目录项记录 的 `min_rec_mask` 值为 1 ，其他别的记录的 `min_rec_mask` 值都是 0 。

##### 相同点

两者用的是一样的数据页，都会为主键值生成 `Page Directory （页目录）`，从而在按照主键值进行查找时可以使用 `二分法` 来加快查询速度。





![image-20230203000813904](https://s2.loli.net/2023/10/18/exoGJ9wBQK8huNc.png)

#### 特点：

1. 使用记录**主键值**的大小进行记录和页的**排序**，这包括三个方面的含义：
   - **页内** 的记录是**按照主键的大小**顺序排成一个 **`单向链表`** 。
   - 各个存放 **用户记录的页** 也是根据页中用户记录的主键大小顺序排成一个` 双向链表 `。
   - 存放 **目录项记录的页** 分为不同的层次，在同一层次中的页也是根据页中目录项记录的**主键大小**顺序排成一个 `双向链表` 。
2.  B+树的<u>**`叶子节点` 存储的是`完整的`用户记录**。</u>

所谓完整的用户记录，就是指这个记录中存储了所有列的值（包括隐藏列）。

#### **优点：**

- **数据访问更快** ，因为聚簇索引将索引和数据保存在同一个B+树中，因此从聚簇索引中获取数据比非聚簇索引更快
- 聚簇索引对于**主键的** `排序查找 和 范围查找` 速度**非常快**
- 按照聚簇索引排列顺序，查询显示一定范围数据的时候，由于数据都是紧密相连，数据库不用从多个数据块中提取数据，所以 **节省了大量的io操作** 。



#### **缺点：**

1. **插入速度严重依赖于插入顺序** ，按照主键的顺序插入是最快的方式，否则将会出现页分裂，严重影响性能。因此，对于InnoDB表，我们一般都会定义一个**自增的ID列为主键**
2. **更新主键的代价很高** ，因为将会导致被更新的行移动。因此，对于InnoDB表，我们一般定义**主键为`不可更新`**
3. **二级索引访问需要两次索引查找** ，第一次找到主键值，第二次根据主键值找到行数据



#### 构建过程

一个页的大小是`16k`

1. 当为一个表创建一个B+树索引（聚簇索引不是人为创建的，默认就有）时，会先创建一个`根结点`页面。最开始表中没有数据的时候，`根结点`**既没有用户记录也没有目录项记录**

2. 插入数据的时候会将用户记录存储到这个`根结点`中

   - 在聚簇索引的时候，没有主键的话 InnoDB 会挑选一个非空的唯一索引代替，如果也没有，InnoDB 会隐式定义一个主键来构建聚簇索引。

3. 当根结点`可用空间用完`时，InnoDB 会**`复制`根结点中所有记录到新页上**，然后对新页进行页分裂操作，得到另一个新页，此时新插入的数据会根据对应索引分配策略分配到其中一个页中，根结点升级为存储目录项记录的页

   

> B+树索引的根结点从诞生开始就不好移动了，但凡InnoDB要用到这个索引的时候，都会从固定的地方取出根结点页号，从而访问这个索引



### 三、InnoDB 二级索引（非聚簇索引）

聚簇索引是在搜索条件是`主键值`的时候才能发挥作用，如果想用其他列作为搜索条件，可以用其他列为排序规则，再多建二叉树

（注意：下图不完整！目录项记录页没有加入主键，可能出现目录项记录不唯一的情况）

![image-20230203000758182](https://s2.loli.net/2023/10/18/X1Bh3eqI9fFUNLJ.png)



#### 二级索引B+树与聚簇索引的不同

1. **使用索引指向的列的大小进行记录和页的排序**

   - 页内的记录是按照索引指向的列的大小顺序排成的`单向链表`

   - 各个存放用户的记录的页也是根据页中索引指向的列的大小顺序排成`双向链表`

   - 存放目录项的同一层的页也是根据页中目录记录的索引指向的列的大小顺序排成`双向链表`

2. 二级索引B+树叶子结点存储的**不是完整的用户记录**，而只有`索引指向的列 + 主键`，即存的是`数据的位置`

3. 目录项记录的是`索引指向的列 + 主键 + 页号`



#### 回表

因为二级索引B+数的叶子结点**只能确定要找记录的主键值**，所以如果想通过二级索引找到完整用户记录的话，就得**通过主键值到聚簇索引中再查一遍**，这个过程称为`回表`。



### 四、总结聚簇索引和非聚簇索引的区别

1. 聚簇索引的`叶子结点`存储的是用户记录；非聚簇索引的叶子结点存的是`数据位置`
2. 一个表`只能有一个聚簇索引`，因为**只能用一种排序存储的方式**；可以有多个非聚簇索引。
3. 使用聚簇索引的时候，数据查询效率高，但是遇到插入、删除、更新操作的时候，效率比非聚簇索引低



### 五、联合索引

![image-20230203001257455](https://s2.loli.net/2023/10/18/fSeYQgxqVoc9Z31.png)

#### 联合索引排序规则

可以同时以多个列的大小作为排序规则，也就是同时为多个列建立索引，比方说我们想让B+树按照 `c2和c3列` 的大小进行排序，这个包含两层含义：

1. 先把各个记录和页按照c2列进行排序。
2. 在记录的c2列相同的情况下，采用c3列进行排序

#### 联合索引和分开创建二级索引区别

注意一点，以c2和c3列的大小为排序规则建立的B+树称为 `联合索引` ，本质上也是一个二级索引。它的意思与分别为c2和c3列分别建立索引的表述是不同的，不同点如下：

- 建立 `联合索引` 只会建立如上图一样的1棵B+树。
- 为c2和c3列分别建立索引会分别以c2和c3列的大小为排序规则建立2棵B+树。



#### 联合索引构成

1. 联合索引每条目录项记录都由`c2、c3、页号`三部分组成，各条记录先按c2排，c2相同由c3排
2. 叶子结点处由`c2、c3、主键`组成





### 六、InnoDB 的 B+ 树索引的关键点

#### **1.** **根页面位置万年不动**

[见构建过程](# 构建过程)

#### **2.** **内节点中目录项记录的唯一性**

二级索引的目录项记录要加上主键，否则可能出现不唯一的情况

比如：给`c2`添加了索引，但是c2 可以重复，这就可能导致只记录了`c2 + 页号`的记录重复（页号不算数）

此时就应该加上主键，这样可以保证B+树每一层结点各条目录项记录除了页号以外是唯一的





#### **3.** **一个页面最少存储2条记录**

一个B+树只需要很少的层级就可以轻松存储数亿条记录，查询速度相当不错！这是因为B+树本质上就是多层级目录，每经过一个目录时都会过滤掉许多无效的子目录，直到最后访问到存储真实数据的目录。

如果一个大的目录中只存放一个子目录是个啥效果呢？那就是目录层级非常非常非常多，而且最后的那个存放真实数据的目录中只能存放一条记录，找了那么多层只找到一条，这不合理！

所以`InnoDB的一个数据页至少可以存放两条记录`



#### 4.不建议用过长字段作为主键

因为所有二级索引都引用了主键索引，过长的主键索引会让二级索引变得过大，导致每一页的存储记录数下降，可能导致B+树层数增加



#### 5.建议用自增字段作为主键

用非单调递增或递减的字段作为主键在InnoDB中不太好。因为这样在插入新记录的时候为了维护B+树的特性而出现频繁的分裂调整，影响效率

使用自增字段作为主键是很好的选择。





## 四、MyISAM 索引

> **MyISAM 不存在聚簇索引，只有非聚簇索引**
>
> 因为数据（`.MYD`）和索引（`.MYI`）是分开存储的，所以**一定要**进行`回表`操作
>
> MyISAM 索引叶子结点保存的是`数据的地址`，而InnoDB二级索引叶子结点保存的是`记录的主键`。所以同样是回表操作，**MyISAM的效率更高**

如下图所示，即使主键上的索引也是非聚簇索引

![image-20230203152926463](https://s2.loli.net/2023/10/18/gZyIRAElnmvDjSt.png)







### MyISAM 和 InnoDB 对比

**MyISAM的索引方式都是`“非聚簇”`的，与InnoDB包含1个聚簇索引是不同的**

1. 聚簇索引和非聚簇索引
   - 在**InnoDB**存储引擎中，我们只需要根据主键值对`聚簇索引` 进行**一次查找**就能找到对应的记录
   - MyISAM 中却需要进行一次 `回表` 操作，意味着MyISAM中建立的索引相当于**全部都是 二级索引** 。
2. 文件区别
   - InnoDB的**数据文件本身就是索引文件**
   - 而MyISAM索引文件和数据文件是 **分离的** ，索引文件仅保存数据记录的`地址`。
3. 叶子结点存储内容区别
   - InnoDB的非聚簇索引data域存储相应记录 `主键的值` 
   - 而MyISAM索引记录的是 `地址` 。换句话说，InnoDB的所有非聚簇索引都引用主键作为data域。
4. 回表速度
   - MyISAM的回表操作是十分 `快速` 的，因为是拿着**地址偏移量**直接到文件中取数据的
   - InnoDB是通过获取主键之后再去聚簇索引里找记录，虽然说也不慢，但还是比不上直接用地址去访问。
5. 主键要求
   - InnoDB要求表 **必须有主键**。如果没有显式指定，则MySQL系统会自动选择一个可以非空且唯一标识数据记录的列作为主键。如果不存在这种列，则MySQL自动为InnoDB表生成一个隐含字段作为主键，这个字段长度为6个字节，类型为长整型。
   - MyISAM可以没有主键







## 五、索引的代价

索引是个好东西，可不能乱建，它在**空间和时间上都会有消耗**：

### **空间上的代价**

每建立一个索引都要为它建立一棵B+树，每一棵B+树的每一个节点都是一个数据页，一个页默认会占用 `16KB` 的存储空间，一棵很大的B+树由许多数据页组成，那就是很大的一片存储空间。

### **时间上的代价**

> 增删改还需要维护B+树的排序，影响效率

每次对表中的数据进行 `增、删、改` 操作时，都需要去修改各个B+树索引。

B+树每层节点都是按照索引列的值 从小到大的顺序排序 而组成了` 双向链表` 。不论是叶子节点中的记录，还是内节点中的记录（也就是不论是用户记录还是目录项记录）都是**按照索引列的值从小到大的顺序**而形成了一个`单向链表`。

而增、删、改操作可能会对节点和记录的排序造成破坏，所以存储引擎需要额外的时间进行一些 `记录移位 、 页面分裂 、 页面回收` 等操作来维护好节点和记录的排序。如果我们建了许多索引，每个索引对应的B+树都要进行相关的维护操作，会**给性能拖后腿**。





## 六、MySQL 数据结构（B+树）选择原因

### 6.1_Hash

#### 为什么不用哈希结构作为索引结构呢？

1. 原因1

   - Hash结构在等值判断（`=，<>, in`）的操作中，效率很高（达到`O(1)`），但是在`范围查询`的情况下，哈希类型的索引时间复杂度就退到了`O(n)`，相当于是遍历一遍

   - 树的有序存储情况下，能够达到O(log2n)的效率

2. 原因2

   - 因为哈希索引存储数据是**没有顺序**的，所以遇到`ORDER BY`操作，使用哈希索引还需要进行重新排序

3. 原因3

   - 遇到`联合索引`，哈希是将联合索引**合并到一起**来计算哈希值的，这样就没办法对其中单个或多个索引键进行查询

4. 原因4

   - 等值查询的时候哈希索引效率高，但是在**索引列重复值很多**的情况下，**效率会降低**。因为更容易发生Hash冲突，而遇到Hash冲突时，需要遍历桶中的行指针来进行比较，找到查询的关键字，非常耗时





#### Hash索引使用存储引擎

|          | MyISAM | InnoDB | Memory |
| -------- | ------ | ------ | ------ |
| Hash索引 | 不支持 | 不支持 | 支持   |



#### Hash索引适用性

Hash索引存在着很多限制，相比之下在数据库中B+树索引的使用面会更广，不过也有一些场景采用Hash 索引效率更高，比如在键值型（(Key-Value）数据库中，**Redis 存储的核心就是Hash表**。

MysQL中的**Memory存储引擎支持Hash存储**，如果我们需要用到查询的临时表时，就可以选择Memory存储引擎，把某个字段设置为Hash 索引，比如字符串类型的字段，进行Hash计算之后长度可以缩短到几个字节。当字段的重复度低，而且**经常需要进行`等值查询`**的时候，采用Hash索引是个不错的选择。

另外，InnoDB本身不支持 Hash索引，但是提供`自适应 Hash索引(Adaptive Hash Index)`。什么情况下才会使用自适应Hash索引呢？

如果某个数据经常被访问，当满足一定条件的时候，就会将这个数据页的地址存放到Hash表中。这样下次查询的时候，就可以直接找到这个页面的所在位置。这样让B+树也具备了Hash索引的优点。

![image-20230203161224559](https://s2.loli.net/2023/10/18/RFGOAao3SrzEnjV.png)

采用自适应 Hash 索引目的是方便根据 SQL 的查询条件加速定位到叶子节点，特别是当 B+ 树比较深的时候，通过自适应 Hash 索引可以明显提高数据的检索效率。

可以通过 `innodb_adaptive_hash_index` 变量来查看是否开启了自适应 Hash，比如：

~~~sql
show variables like '%adaptive_hash_index';
~~~





### 6.2_二叉搜索树

> 特点：
>
> 1. 一个结点只能有两个子节点（度不能超过2）（二叉）
> 2. 左子结点 < 父结点，右子节点  >= 父结点



#### 时间复杂度

正常情况下（树基本匀称），时间复杂度为`O(log2n)`

有可能出现畸形，可能导致时间复杂度变为`O(n)`

![image-20230203162020834](https://s2.loli.net/2023/10/18/HOV9mskh4gWlTtU.png)







#### 改进“畸形”方案

> 为了提高查询效率，就需要 `减少磁盘IO数` 。为了减少磁盘IO的次数，就需要尽量 `降低树的高度` ，需要把原来**“瘦高”**的树结构变的**“矮胖”**，树的每层的**分叉越多越好**。





### 6.3_平衡二叉搜索树（AVL树）

为了解决二叉搜索树退化成链表的问题，人们提出了`平衡二叉搜索树（Balanced Binary Tree）`，又称为AVL树

#### AVL树性质

> 是一棵空树 或 它的左右两个子树的**高度差的绝对值不超过1**，并且左右两个子树都是一棵平衡二叉树



#### 时间复杂度

平衡二叉搜索树的时间复杂度为`O(log2n)`



#### 查询时间

> 将树从`瘦高`变为`矮胖`

查询数据的时间主要依赖磁盘IO次数，每访问一次结点就要进行一次IO操作，而节省IO操作的方法就是将二叉树改为多叉树，降低树的高度。

有N个结点的平衡二叉搜索树的高度为`logN`，而改为多叉树可以有效降低树的高度





### 6.4_B树

![image-20230203172618638](https://s2.loli.net/2023/10/18/swGa8MQtgdCmic6.png)

B树作为`多路平衡查找树`，它的每个结点最多可以包括`M`个子节点，`M称为B树的阶`。每个磁盘块中包括了`关键字`和`子节点`的指针。如果一个磁盘中包括了`x`个关键字，那么**指针数**就是`x+1`.

对于一个`100阶`的B树来说，如果有三层的话就能存储约`100万`的索引数据。$100*100*100$

对于大量索引数据来说，采用B树是非常适合的，因为高度远小于二叉树高度



#### 小结

1. B树在插入和删除节点的时候如果导致树不平衡，就通过`自动调整`节点的位置来保持树的**自平衡**。
2. 关键字集合分布在整棵树中，即**叶子节点和非叶子节点都存放数据**。搜索有可能在非叶子节点结束
3. 其搜索性能等价于在关键字全集内做一次**二分查找**。



### 6.5_B+树

B+树的中间结点不直接存数据，这样做有以下几个好处：

1. B+树查询效率稳定
   - 因为B+树每次**只有访问到叶子节点才能找到对应的数据**，而在B树中，非叶子节点也会存储数据，这样就会造成查询效率不稳定的情况，有时候访问到了非叶子节点就可以找到关键字，而有时需要访问到叶子节点才能找到关键字。
2. B+树查询效率高
   - 因为通常B+树比B树`更矮胖`(阶数更大，深度更低)，查询所需要的磁盘I/0也会更少。因为同样的磁盘页大小，B+树可以存储更多的节点关键字。
   - 在查询范围上，B+树效率也比B树高，因为B+树所有关键字都在叶子结点中，叶子结点又是递增的，通过链表连接。而B树妖通过中序遍历才能完成范围查找，效率低很多。



#### **B+** **树和** **B** **树的差异：**

1. B+ 树有 k 个孩子的节点就有 k 个关键字。也就是`孩子数量 = 关键字数`，而 B 树中，`孩子数量 = 关键字数+1`。
2. B+ 树非叶子节点的关键字也会**同时存在在子节点中**，并且是在子节点中所有关键字的最大（或最小）。
3. B+ 树**非叶子节点仅用于索引**，不保存数据记录，跟记录有关的信息都放在叶子节点中。而 B 树中， 非叶子节点既保存索引，也保存数据记录 。
4. B+ 树所有关键字都在叶子节点出现，叶子节点构成一个有序链表，而且叶子节点本身按照关键字的大小从小到大顺序链接。



没有完全的谁好谁坏

> B 树和 B+ 树都可以作为索引的数据结构，在 MySQL 中采用的是 B+ 树。
>
> 但B树和B+树各有自己的应用场景，不能说B+树完全比B树好，反之亦然。





#### 思考题

##### 思考题：为了减少IO，索引树会一次性加载吗？

不会。因为索引会存在磁盘上，如果数据量大，索引也会很大。不可能一次将索引都加载进内存，之后在需要的时候逐一加载每一个磁盘页，因为磁盘页对应着索引树的结点



##### 思考题：B+树的存储能力如何？为何说一般查找行记录，最多只需1~3次磁盘IO

InnoDB存储引擎中页的大小为`16KB`

一般表的主键为INT（4字节）或者BIGINT（8字节），指针类型也一般为4或8字节

也就是说，一个页（B+树中的一个结点）中大概可以存储`16KB / (8B+8B) = 1K`个键值

假定数据也也存储1k条行记录数据，那三层的B+树就可以维护`1000*1000*1000=10亿`条记录了

实际情况中每个结点可能不能填充满，所以10亿条不容易用完，因此在数据库中，`B+树的高度一般都在2-4层`。而InnoDB在设计时是**将根结点常驻内存**的，也就是说，查找某一键值的行记录最多只需要`1-3次`磁盘IO操作



##### 思考题：为什么说B+树比B-树更适合实际应用中操作系统的文件索引和数据库索引？

1. B+树的磁盘读写代价更低
   - B+树的内部结点并没有指向关键字具体信息的指针。因此其内部结点相对B树更小。如果把所有同一内部结点的关键字存放在同一盘块中，那么盘块所能容纳的关键字数量也越多。一次性读入内存中的需要查找的关键字也就越多。相对来说IO读写次数也就降低了。
2. B+树的查询效率更加稳定
   - 由于非终结点并不是最终指向文件内容的结点，而只是叶子结点中关键字的索引。所以任何关键字的查找必须走一条从根结点到叶子结点的路。所有关键字查询的路径长度相同，导致每一个数据的查询效率相当。



##### 思考题：Hash 索引与 B+ 树索引的区别

1. Hash索引`不能进行范围查询`，而B树可以。这是因为Hash索引指向的数据是**无序**的，而B+树的叶子节点是个**有序的链表**。
2. Hash索引**不支持联合索引**的`最左侧原则`(即联合索引的部分索引无法使用)，而B+树可以。对于联合索引来说，Hash索引在计算Hash值的时候是将索引键合并后再一起计算Hash值，所以不会针对每个索引单独计算Hash值。因此如果用到联合索引的一个或者几个索引时，联合索引无法被利用。
3. Hash索引`不支持ORDER BY排序`，因为Hash索引指向的数据是无序的，因此无法起到排序优化的作用，而B+树索引数据是有序的，可以起到对该字段ORDER BY排序优化的作用。同理，我们也无法用Hash索引进行模糊查询，而B+树使用LIKE进行模糊查询的时候，LIKE后面后模糊查询（比如%结尾）的话就可以起到优化作用。
4. **InnoDB不支持哈希索引**



##### 思考题：Hash 索引与 B+ 树索引是在建索引的时候手动指定的吗？

针对InnoDB和MyISAM存储引擎，都会**默认采用B+树索引**，无法使用Hash索引。

InnoDB提供的`自适应Hash`是**不需要手动指定**的。

如果是Memory/Heap和NDB存储引擎，是可以进行选择Hash索引的。





## 七、InnoDB 数据存储结构

### 7.1_数据库存储结构：页

索引结构给我们提供了高效的索引方式，不过索引信息以及数据记录都是保存在文件上的，确切说是存储在`页结构`中。另一方面，索引是在存储引擎中实现的，MySQL服务器上的`存储引擎`负责对表中数据的读取和写入工作。不同存储引擎中存放的格式一般是不同的，甚至有的存储引擎比如Memory都不用磁盘来存储数据。

由于InnoDB 是MySQL的默认存储引擎，所以主要分析InnoDB存储引擎的数据存储结构。

![image-20230203234415204](https://s2.loli.net/2023/10/18/Jyx4vRm2VrAI6G9.png)

#### 磁盘与内存交互基本单位：页

InnoDB 将数据划分为若干页，默认大小`16KB`

`页`是磁盘与内存交互的`基本单位`。

也就是说，**一次最少从磁盘读16KB到内存，一次最少把内存中16KB内容刷新到磁盘中**。不论读一行还是读多行，都会将他们所在页进行加载。

> 数据库管理存储空间的基本单位是`页(Page)`，数据库IO操作的最小单位是`页`。



##### 为什么不以记录作为单位呢？

如果以记录为单位，那么一次读取（一次IO操作）只能处理一行数据，效率低下。





#### 页结构概述

不同的页不一定在物理上相连，而是通过`双向链表`关联。

每个数据页中的记录会按照主键值从小到大的顺序组成`单项链表`，每个数据页会为存储在它里面的记录生成一个`页目录`，通过主键查找某条记录时可以在页目录中通过`二分法`快速定位对应的槽，然后遍历该槽对应分组中的记录即可找到指定的记录。



#### 页的大小

不同数据库管理系统（DBMS）页大小不同，InnoDB的默认页大小是`16KB`，可以通过以下命令来查看

~~~sql
show variables like '%innodb_page_size%'
~~~



SQL Server中页的大小为 `8KB`，而在Oracle中我们用术语`“块”`(Block)来代表“页”，Oralce支持的块大小为2KB，4KB，8KB,16KB，32KB和64KB。





#### 页的上层结构

> 在数据库中，还有区（Extent）、段（Segment）、和表空间（Tablespace）的概念，关系如下图所示

![image-20230203235024967](https://s2.loli.net/2023/10/18/W87bKJ94t2SdXGB.png)



##### 区（Extent）

区(Extent)是**比页大一级**的存储结构，在InnoDB存储引擎中，一个区会分配`64个连续的页`。因为InnoDB中的页大小默认是16KB，所以一个区的大小是`64*16KB= 1MB`。

##### 段（Segment）

段(Segment)**由一个或多个区组成**，区在文件系统是一个连续分配的空间(在InnoDB中是连续的64个页)

不过在段中不要求区与区之间是相邻的。**段是数据库中的`分配单位`，不同类型的数据库对象以不同的段形式存在**。当我们创建数据表、索引的时候，就会相应创建对应的段，比如创建一张表时会创建一个**表段**，创建一个索引时会创建一个**索引段**。


##### 表空间（Tablespace）

表空间（Tablespace)是一个逻辑容器，表空间存储的对象是段，在一个表空间中可以有一个或多个段，但是一个段只能属于一个表空间。数据库由一个或多个表空间组成。表空间从管理上可以划分为`系统表空间、用户表空间、撤销表空间、临时表空间`等。







### 7.2页的内部结构
### TODO:未完





## 八、索引失效
### 索引失效的几种情况
1. 查询时没有遵循联合索引的最左原则
2. 在索引列上做**计算**或**函数操作**等
3. where条件中**范围条件**右边的列索引失效
    - `索引为(a,b,c)`，查询语句为`select * from t1 where a=1 and b > 1 and c =1;`，索引使用遵循了最左原则，但是用到了范围查询，所以只有`a和b`能用上索引，**c不行**
4. **不等于**比较时，无法使用索引
5. `is not null`无法使用索引（`is null`可以）
6. `like`使用**通配符开头**，索引失效
7. 字符串查询操作，不加引号，索引失效
    - `slect * from stu where name = 110;`在stu表的name字段是字符串类型，查询条件`110`没加引号，虽然能正常查询，但是不走索引
1. 联合索引使用`or`，即使满足了最左原则，索引也会失效


### 排序优化
1. 避免使用`Using FileSort`方式排序
2. `order by`语句使用最左原则 或者 使用`where + order by`子句条件组合满足最左原则
3. `where`中出现联合索引范围查询会让`order by`中后续的联合索引失效

![](https://s2.loli.net/2023/10/18/nH7SkOcwJ8DbU9m.png)


### 关联查询优化

#### 内连接
内连接时，MySQL会自动把`小结果集的`选为驱动表，所以大表的字段最好加上所以

#### 外连接
左外连接时，左表会全表扫描（不可避免的），所以右表最好加上索引
右外连接同理（和左外连接相反）

#### 总结
最好保证被驱动表的字段建立了索引，外连接要用小表驱动大表（小表一定会全表扫描的）


### 分组优化
和排序优化同理，分组底层也会用到排序



## 九、慢查询日志

### 开启和设置
1. 查看是否开启：`show variables like'%slow_query_log%';`
1. 开启日志：`set globalslow_query_log=1;`
1. 设置阈值时间，超过阈值的查询会被记录：`set global long_query_time=1;`
1. 查看阈值时间：`SHOW VARIABLES LIKE'long_query_time%';`

### 查看日志
日志一般为：`C:\ProgramData\MySQL\MySQL安装目录\Data`中的`xxx-slow.log`


## 十、explain
### 作用
通过explain可以了解到sql的执行的过程细节，可以辅助进行排查sql的问题
使用EXPLAIN关键字可以模似优化器执行SQL查询语句，从而知道NSQL是如何处理SQL语句的。可以用来分析查询语句或是表的结构的性能瓶颈。其作用：
1. 表的读取顺序
1. 哪些索引可以使用
1. 数据读取操作的操作类型
1. 那些索引被实际使用
1. 表之间的引用
1. 每张表有多少行被优化器查询

EXPLAIN关键字使用起来比较简单：`explain+SQL语句`

### explain中的重要字段
#### id
select查询的序列号，表示查询中执行select子句或操作表的顺序。
> id大的先执行
* id相同时，执行顺序由上至下
* id不同，如果是子查询，id的序号会递增，id值越大优先级越高，则先被执行。
* id相同和不同都存在时，id相同的可以理解为一组，从上往下顺序执行，所有组中，id值越大，优先级越高越先执行。


#### select_type
查询的类型，常见值有：
* `SIMPLE`：简单的select查询，查询中不包含子查询或者UNION。
* `PRIMARY`：查询中若包含任何复杂的子部分，最外层查询则被标记为Primary。
* `DERIVED`：在FROM列表中包含的子查询被标记为DERIVED(衍生)，MySQL会递归执行这些子查询，把结果放在临时表里。
* `SUBQUERY`：在SELECT或WHERE列表中包含了子查询。


#### table
显示当前sql执行哪张表

#### type
访问类型排序

##### system
比较特殊，表只有一行记录
##### const
通过一次索引就找到了
const用于比较`主键索引`和`唯一索引`
因为只匹配一条记录，所以很快。
比如将主键放在where中，就是const查询
##### eq_ref
对于两个表关联查询，被驱动表的查询就是`eq_ref`（被驱动表的连接字段要是**主键**或者是**唯一**索引）（驱动表是all）

##### ref
非唯一索引扫描
返回匹配的所有行，属于是查找和扫描的混合体

##### range
使用索引进行范围查询为range
在where中用了`between、<、>、in`等范围查询索引操作
效率比all好，因为只需要从索引某一点开始扫，而不用全表扫（基本不用）
##### index
当查询操作都从索引表中查询数据时，为index

比如：一张表有一个主键和一个加了普通索引的字段，此时查询所有记录，不加where，因为两个字段都有索引，所以就是index类型查询

与all区别：index遍历索引树，all是读取全表而且还是从硬盘读

##### all
全表扫描

##### 各个访问类型的排序
从好到坏依次为：`system > const > eq_ref > ref > range > index > all`
一般要求能达到range，`最好能到ref`


#### possible_keys
显示可能应用在这张表中的索引。
查询涉及到的字段上如果存在索引，则该索引将会被列出来，但不一定会被查询实际使用上。

特殊情况：
有可能出现`possible_keys`为null但是key不为null
原因为：
possible_keys为null 说明用不上索引的树形查找，但如果二级索引包含了所有要查找的数据，二级索引往往比聚集索引小（占用空间），所以mysql可能会选择顺序遍历这个二级索引直接返回
#### key
查询中实际使用的索引，如果为NULL，则没有使用索引。

#### ref
显示索引的哪一列被使用了，如果可能的话，是一个常数。查找索引列上的值用了哪些列或常量

#### rows
MySQL认为它执行查询时必须检查的行数。（越少越好）

#### extra
一些常见的重要的额外信息：
* `Using filesort`：排序时没有使用索引，效率低
    * MySQL无法利用索引完成的排序操作称为“文件排序”。
* `Using temporary`：分组时没有使用索引，一般会和`Using filesort`一起出现，分组底层也会用到排序
    * Mys.ql在对查询结果排序时使用临时表，常见于排序order by和分组查询group by。
* `Using index`：投影的字段只有索引字段，表示索引被用来执行索引键值的查找，避免访问了表的数据行，效率不错。
* `Using where`：表示使用了where过滤。



















































# 约束

![image-20220413173703547](https://s2.loli.net/2023/10/18/3MaPqyrFDl5zmA4.png)

![image-20220413173751711](https://s2.loli.net/2023/10/18/FbZlroSiaI81uMn.png)

![image-20220413174408962](https://s2.loli.net/2023/10/18/mfrg5t8SXd934O7.png)

![image-20220413174810881](https://s2.loli.net/2023/10/18/21aYvAHjXVMwkl6.png)

![image-20220413175240886](https://s2.loli.net/2023/10/18/JPI4Sa2VrKRgq61.png)

# 数据库设计

## 查询方式

![image-20220413180823590](https://s2.loli.net/2023/10/18/FAYklaHjS9dGTs2.png)

![image-20220413181928331](https://s2.loli.net/2023/10/18/ilX5Nqtub4EKpem.png)

![image-20220413182024243](https://s2.loli.net/2023/10/18/7WtdIbN3SqjOuDg.png)

![image-20220413191218922](https://s2.loli.net/2023/10/18/O3MRrbLg4JScCNx.png)

![image-20220413191510578](https://s2.loli.net/2023/10/18/swbkBALyeUOMzIJ.png)

![image-20220413191523906](https://s2.loli.net/2023/10/18/AJIM2EDioVnYBU8.png)

![image-20220413191849000](https://s2.loli.net/2023/10/18/AyGn6s9TFEZWSr1.png)





## 时间字段

### 查询当前时区



### 修改当前时区

#### 改变会话时区

~~~sql
set @@session.time_zone = '+8:00';
~~~





### timestamp（可以存储带时区的时间信息）

#### 存入

插入timestamp的格式是`YYYY-MM-DD HH:MM:SS`或者`YYYY-MM-DD`或者`YYYY-MM-DD HH:MM:SS.FFF...`MySQL底层会将字符串时间从 当前时区 转化为 **0时区** 的时间，再存入表中

#### 读取

读取timestamp时，MySQL会将时间转换为当前时区，再返回

#### 注意

> timestamp存储的时间一律认为是0时区的时间
>
> 比如：
>
> 东八区时区存入`2020-12-12 08:00:00`，存进数据库的时间是`2020-12-12 00:00:00`，读出来的时间是`2020-12-12 08:00:00`
>
> 如果存入是东八区，读取时候改为东九区，此时时间就是`2020-12-12 09:00:00`



### DATETIME

DATETIME类型在所有的日期时间类型中占用的存储空间最大，总共需要 `8` 个字节的存储空间。在格式上为DATE类型和TIME类型的组合，可以表示为 `YYYY-MM-DD HH:MM:SS` ，其中`YYYY`表示年份，`MM`表示月份，`DD`表示日期，`HH`表示小时，`MM`表示分钟，`SS`表示秒。



#### 插入数据

在向DATETIME类型的字段插入数据时，同样需要满足一定的格式条件。

1. 以 `YYYY-MM-DD HH:MM:SS` 格式或者` YYYYMMDDHHMMSS` 格式的字符串插入DATETIME类型的字段时，**最小值为1000-01-01 00:00:00，最大值为9999-12-03 23:59:59**。
   - 以`YYYYMMDDHHMMSS`格式的数字插入DATETIME类型的字段时，会被转化为YYYY-MM-DD HH:MM:SS格式。
2. 以 `YY-MM-DD HH:MM:SS` 格式或者 `YYMMDDHHMMSS` 格式的字符串插入DATETIME类型的字段时，**两位数的年份规则符合YEAR类型的规则，00到69表示2000到2069；70到99表示1970到1999。（建议不用两位数表示年）**
3. 使用函数 `CURRENT_TIMESTAMP()` 和 `NOW() `，可以向DATETIME类型的字段插入系统的当前日期和时间。





## 字符串

> 不管是`CHAR`还是`VARCHAR`，后面加的数字都代表存储的**字符数**，具体底层占用多少字节根据字符集决定
>
> 1. GBK一个汉字2字节
> 2. utf8mb3一个汉字3字节
> 3. utf8mb4一个汉字4字节

1. CHAR
   - 占用字符数`[0, 255]`，不指定长度默认为`1`
   - 当MySQL检索CHAR类型的数据时，CHAR类型的字段**会去除尾部的空格**。
   - CHAR占用存储空间根据字符集编码计算后的字节数
2. VARCHAR
   - 占用字符数`[0, 65536]`，必须指定长度
   - 检索VARCHAR类型的字段数据时，**会保留数据尾部的空格**。
   - VARCHAR类型的字段所占用的存储空间为根据字符集编码计算后的字节数**再加1个字节**。



### CHAR 和 VARCHAR 的选择

| 类型    | 特点     | 空间上       | 时间上 | 使用场景             |
| ------- | -------- | ------------ | ------ | -------------------- |
| CHAR    | 固定长度 | 浪费空间     | 效率高 | 存储不打，速度要求高 |
| VARCHAR | 可变长度 | 节省存储空间 | 效率低 | 非CHAR的情况         |



1. **情况1**：**存储很短的信息**。比如门牌号码101，201……这样很短的信息应该用char，因为varchar还要占个byte用于存储信息长度，本来打算节约存储的，结果得不偿失。

2. **情况2**：**固定长度的**。比如使用uuid作为主键，那用char应该更合适。因为他固定长度，varchar动态根据长度的特性就消失了，而且还要占个长度信息。

3. **情况3**：**十分频繁改变的column**。因为varchar每次存储都要有额外的计算，得到长度等工作，如果一个非常频繁改变的，那就要有很多的精力用于计算，而这些对于char来说是不需要的。

4. **情况4**：具体存储引擎中的情况：

   1. `MyISAM` 数据存储引擎和数据列：MyISAM数据表，最好使用固定长度(CHAR)的数据列代替可变长度(VARCHAR)的数据列。这样使得整个表静态化，从而使 `数据检索更快 `，用空间换时间。
   2. `MEMORY` 存储引擎和数据列：MEMORY数据表目前都使用固定长度的数据行存储，因此无论使用CHAR或VARCHAR列都没有关系，两者都是作为CHAR类型处理的。
   3. **`InnoDB` 存储引擎**，建议使用VARCHAR类型。因为对于InnoDB数据表，内部的行存储格式并没有区分固定长度和可变长度列（所有数据行都使用指向数据列值的头指针），而且**主要影响性能的因素是数据行使用的存储总量**，由于char平均占用的空间多于varchar，所以除了简短并且固定长度的，其他考虑varchar。这样节省空间，对磁盘I/O和数据存储总量比较好。

   



## 小数

### FLOAT 与 DOUBLE

![image-20230130161858353](https://s2.loli.net/2023/10/18/AgNuGidKonrTxRt.png)

写法：`FLOAT(M,D)` 或 `DOUBLE(M,D)` 。（新版不推荐使用指定范围）

这里，`M`称为 **精度** ，`D`称为 **标度** 。`(M,D)`中 `M=整数位+小数位`，`D=小数位`。 **D<=M<=255，0<=D<=30**。

#### 区别

1. FLOAT 占用字节数少，取值范围小
2. DOUBLE 占用字节数多，取值范围也大。



#### 有无符号问题（新版不推荐使用无符号）

1. 整数的无符号的正数会比有符号正数表示的更广
2. 浮点数的无符号的正数会和有符号正数表示正数范围都一样

MySQL 存储浮点数的格式为： `符号(S) 、 尾数(M) 和 阶码(E) `。因此，**无论有没有符号，MySQL 的浮点数都会存储表示符号的部分**。因此， 所谓的无符号数取值范围，其实就是有符号数取值范围大于等于零的部分。



1. #### 注意新版本问题

2. **从MySQL 8.0.17开始，FLOAT(M,D) 和DOUBLE(M,D)用法在官方文档中已经明确不推荐使用**，将来可能被移除。

3. 另外，关于浮点型FLOAT和DOUBLE的UNSIGNED也不推荐使用了，将来也可能被移除。





### 定点数 DECIMAL

定义时可以写`DECIMAL(M,D),DEC,NUMERIC`

占用`M+2`字节

有效范围由M和D决定



#### DOUBLE 对比 DECIMAL 优势

**DECIMAL(M,D)的最大取值范围与DOUBLE类型一样**，但是有效的数据范围是由M和D决定的。

DECIMAL 的存储空间并不是固定的，由精度值M决定，总共占用的存储空间为M+2个字节。也就是说，在一些对**精度要求不高的场景下**，**比起占用同样字节长度的定点数，浮点数表达的数值范围可以更大一些**。



#### 定点数优势

1. 定点数在MySQL内部是以 `字符串` 的形式进行存储，这就决定了它一定**是精准的**。
2. 当DECIMAL类型不指定精度和标度时，其`默认为DECIMAL(10,0)`。当数据的精度超出了定点数类型的精度范围时，则MySQL同样会进行四舍五入处理。（标度超出则报错）



#### 定点数和浮点数选择

- 浮点数相对于定点数的优点是在**长度一定的情况下，浮点类型取值范围大**，但是不精准，适用于需要取值范围大，又可以容忍微小误差的科学计算场景（比如计算化学、分子建模、流体动力学等）
- 定点数类型取值范围相对小，但是**精准，没有误差**，适合于对精度要求极高的场景 （比如涉及金额计算的场景）



## 数据类型小结

在定义数据类型时：

1. 如果确定是 **整数** ，就用` INT` ；
2.  如果是 **小数** ，一定用定点数类型`DECIMAL(M,D)` ； 
3. 如果是**日期与时间**，就用 `DATETIME` 。

这样做的好处是，首先确保你的系统不会因为数据类型定义出错。不过，凡事都是有两面的，可靠性好，并不意味着高效。比如，TEXT 虽然使用方便，但是效率不如 CHAR(M) 和 VARCHAR(M)。

关于字符串的选择，建议参考如下阿里巴巴的《Java开发手册》规范：

**阿里巴巴《Java开发手册》之MySQL数据库：**

- 任何字段如果为**非负数**，必须是 `UNSIGNED`
- 【 **强制** 】小数类型为 `DECIMAL`，==禁止==使用 FLOAT 和 DOUBLE。
  - 说明：在存储的时候，FLOAT 和 DOUBLE 都**存在精度损失的问题**，很可能在比较值的时候，得到不正确的结果。
  - `如果存储的数据范围超过 DECIMAL 的范围，建议将数据拆成整数和小数并分开存储`。
- 【 **强制** 】如果存储的字符串长度**几乎相等**，使用` CHAR `定长字符串类型。
- 【 **强制** 】VARCHAR 是可变长字符串，不预先分配存储空间，长度不要超过 5000。如果存储长度大于此值，定义字段类型为 TEXT，独立出来一张表，用主键来对应，避免影响其它字段索引效率。



alter user 'root'@'localhost' identified by 'Hello_123';

alter user 'root'@'localhost' identified by 'admin';

~~~
ALTER USER 'root'@'%' IDENTIFIED WITH mysql_native_password BY 'admin';
~~~



# 事务

## MySQL事务操作

> MySQL的事务要在innoDB里才好使，在MyISAM里不行

1. `start transaction`
   - 开启一个事务，如果不指定保存点的话回滚直接回到这里
2. `set autocommit=off`
   - 开启事务
3. `savepoint 保存点名`
   - 设置一个保存点
4. `rollback to 保存点名`
   - 回滚事务到一个保存点位置
5. `rollback`
   - 回滚全部事务
6. `commit`
   - 提交事务，操作生效，不能再回退了









## 事务的传播行为

![事务传播行为](C:/Users/11788/Desktop/事务传播行为.png)

## 事务并发的三大问题:

1. 脏读
2. 不可重复读
3. 幻读

#### 脏读

读到其他事务未提交的数据

![image-20220504130636522](https://s2.loli.net/2023/10/18/ByWeZt3jqHQl86L.png)

#### 不可重复读

读到其他事务已提交的数据

（更新或删除算不可重复读）

![image-20220504130709530](https://s2.loli.net/2023/10/18/DCJQLbzH7TXOdhf.png)

#### 幻读

读到其他事务已提交的数据

（插入才可能算幻读）

![image-20220504130813340](https://s2.loli.net/2023/10/18/iL3QDPUZnwNSARt.png)

## 事务隔离

#### 事务特征，隔离级别

![事务特征，隔离级别](https://s2.loli.net/2023/10/18/4f8A9cxpKskTj1y.png)

### 事务的四种隔离级别

![image-20220504131214939](https://s2.loli.net/2023/10/18/KTXocLaI3kbzVCq.png)

#### Read Uncommitted (不用)

三大问题一个都没解决，属于最低级别的隔离

#### Read Committed

读已提交，解决脏读问题

#### Repeatable Read

可重复读，解决脏读和不可重复读，没解决幻读

#### Serializable (不用)

可以解决问题，但是太慢了

### MySQL InnoDB对事务隔离级别的支持程度

![image-20220504131757806](https://s2.loli.net/2023/10/18/7wqsktpzaZ6rPdn.png)

事务结束 (回滚 / 提交) 锁就会释放

![image-20220504133001595](https://s2.loli.net/2023/10/18/3yDhbNXFQsPVB6U.png)

![image-20220504133121210](https://s2.loli.net/2023/10/18/CQine4E6cvmzKsL.png)

### 行锁

#### 共享锁

![image-20220504133257927](https://s2.loli.net/2023/10/18/Xo1nEJWh2cgANHV.png)

#### 排他锁

![image-20220504133737501](https://s2.loli.net/2023/10/18/SJ7qNm6r9Vw3LUz.png)

### 

#### 意向共享锁 / 意向排它锁

这种意向锁是不能手动加的，是数据库自己在我们要上锁的时候给的一个额外的标志

![image-20220504134510740](https://s2.loli.net/2023/10/18/GDhtFguI5mL76a1.png)

- 一个事务成功地给一张表加上表锁的前提：

​	没有其他任何事务已经锁定了这张表的任何一行数据

- 怎么知道有没有其他事务锁定数据呢？

​	用全表扫描来检测，但是效率低，而且如果扫描过的数据又被加锁了，再加表锁就不成功了

- 引入意向锁目的：

​	提高加表锁的效率，类似于一个标识，可以快速判断有没有其他任何事务已经锁定了这张表的任何一行数据

​	可以理解成火车上卫生间的指示灯，可以直观看到有没有人在里面，就不用每次都跑过去看了

### 锁的原理

#### 锁的本质

<u>锁住的是索引项</u>

- 有几种情况

  - 不使用索引					会锁表

  - 主键索引 primary key  会锁主键

  - 唯一索引 unique            

#### 索引本质

加快查询速度

索引的逻辑顺序 == 数据的物理顺序

- 举例

​	字典 -- 按拼音排序

​	可以通过拼音，笔画，偏旁部首来查询，这里拼音就是聚集索引，其他两个是非聚集索引

##### 一些问题

#### ① 为什么没索引加锁会锁表？

一张表一定会有聚集索引来决定数据存放数据

- 有三种聚集索引：

  - primary key

  - unique   --   not null

  - _rowid  ( 隐藏字段 ) (表中若没其他索引，则会用这个隐藏的)
    - 还有隐藏两个： tx_id  事务，  roll_ptr 回滚指针 

为何没索引加锁会锁表？

​	因为默认走隐藏_rowid了，会锁表里每一行的rowid，就像锁表一样

##### ② 为什么给 name 加锁会锁住 id 

（表中两列：name - 唯一索引， id - 主键索引）

<font color = "red">在InnoDB 中主键索引是**聚集索引**，其他的是<font color = "red">**二级索引**</font></font>

![image-20220504143343229](https://s2.loli.net/2023/10/18/2Bemi1QxcndWND8.png)

为什么给 name 加锁会锁住 id ：

​	因为用二级索引找到主键，去主键的树里找到内容，所以会关联起来（回表）

## 区间定义

![image-20220504161642711](https://s2.loli.net/2023/10/18/2kInLB6oYWduJ9g.png)

### 记录锁

![image-20220504161837681](https://s2.loli.net/2023/10/18/bBATIKajmOCoNXD.png)

### 间隙锁

间隙锁可以锁一些值区间，可以限制插入

![image-20220504161930088](https://s2.loli.net/2023/10/18/QEUo2yGpjwiq9fM.png)

### 临键锁



![image-20220504162326699](../Second semester/Python/image-20220504162326699.png)







# 数据库存储文件

## InnoDB

### 5.x版本

#### 保存表结构

为了保存表结构， **InnoDB** 在` 数据目录` 下对应的`数据库子目录下`创建了一个专门用于 **描述表结构的文件** ，文件名是`xxx.frm`

`.frm文件`的格式在不同的平台上都是相同的。这个后缀名为`.frm`是以 **二进制格式** 存储的



#### 保存数据

##### 5.6.6以前-系统表空间

默认情况下，**InnoDB**会在数据目录下创建一个名为` ibdata1 `、大小为 12M 的文件，这个文件就是对应的 `系统表空间` 在文件系统上的表示。怎么才12M？

注意这个文件是 `自扩展文件` ，当不够用的时候它会自己增加文件大小。



##### 5.6.6以及之后的版本-独立表空间

**在MySQL5.6.6以及之后的版本中**，InnoDB并不会默认的把各个表的数据存储到系统表空间中，而是为 每一个表建立一个独立表空间 ，也就是说我们创建了多少个表，就有多少个独立表空间。使用 **独立表空间** 来存储表数据的话，会在该表所属数据库对应的子目录下创建一个表示该独立表空间的文件，文件名和表名相同，只不过添加了一个` .ibd` 的扩展名而已，所以完整的文件名称长这样：



#### 保存数据库相关配置

MySQL5.7 中会在data/a的目录下生成 `db.opt` 文件用于保存数据库的相关配置。比如：字符集、比较规则。而MySQL8.0不再提供db.opt文件。



### 8+版本

数据库配置、结构、数据全部合并在`.idb`文件中









## MyISAM

### 存表结构

在存储表结构方面， MyISAM 和 InnoDB 一样，也是在 数据目录 下对应的数据库子目录下创建了一个专门用于描述表结构的文件：`表名.frm`



### 存数据和索引

在MyISAM中的索引全部都是 `二级索引 `，该存储引擎的 **数据和索引是分开存放** 的。所以在文件系统中也是使用不同的文件来存储数据文件和索引文件，同时表数据都存放在对应的数据库子目录下。

~~~
创建一个名为 test 的表，使用 MyISAM 存储引擎
会对应创建下面三个文件

test.frm 存储表结构
test.MYD 存储数据 (MYData)
test.MYI 存储索引 (MYIndex)
~~~





## 总结

举例： `数据库a` ， `表b` 。

### InnoDB

如果表b采用 `InnoDB `，data\a中会产生1个或者2个文件：

- `b.frm` ：描述表结构文件，字段长度等
- 如果采用 `系统表空间` 模式的，数据信息和索引信息都存储在`ibdata1` 中
- 如果采用 `独立表空间` 存储模式，data\a中还会产生 `b.ibd `文件（存储数据信息和索引信息）

此外：

① **MySQL5.7** 中会在data/a的目录下生成 `db.opt` 文件用于保存数据库的相关配置。比如：字符集、比较

规则。而**MySQL8.0不再提供db.opt文件**。

② **MySQL8.0中不再单独提供b.frm**，而是**合并在`b.ibd文件`中**。



### MyISAM 

如果表b采用 `MyISAM `，data\a中会产生3个文件：

- 不同 MySQL 版本：
  - **MySQL5.7** 中： b`.frm` ：描述表结构文件，字段长度等。
  - **MySQL8.0** 中 b.xxx`.sdi `：描述表结构文件，字段长度等
- `b.MYD` (MYData)：**数据信息**文件，存储数据信息(如果采用独立表存储模式)
- `b.MYI` (MYIndex)：存放**索引**信息文件





# MySQL逻辑架构



## 一、逻辑架构

### 1.1_三层总览

![image-20230202152547086](https://s2.loli.net/2023/10/18/vtTEZNrS2OhjgCR.png)

![image-20230202152554265](https://s2.loli.net/2023/10/18/MPr7S9zjNVFAJcI.png)

### **第**1层：连接层

> 概述：第一层为连接层，大概执行过程是：
>
> 1. MySQL服务器收到客户端的 TCP 连接请求
> 2. 分配从线程池分配一个线程与这个客户端交互
> 3. 连接成功后，对账号密码进行校验
> 4. 校验无误后从权限表查出账号对应的权限与之关联

1. 系统（客户端）访问 `MySQL` 服务器前，做的第一件事就是建立 `TCP` 连接。
2. 经过三次握手建立连接成功后， MySQL 服务器对 `TCP` 传输过来的账号密码做**身份认证、权限获取**。
   1. **用户名或密码不对**，会收到一个`Access denied for user`错误，客户端程序结束执行
   2. **用户名密码认证通过**，会从权限表查出**账号拥有的权限**与连接关联，之后的权限判断逻辑，都将依赖于此时读到的权限
3. `TCP` 连接收到请求后，必须要分配给一个线程专门与这个客户端的交互。所以还会有个线程池，去走后面的流程。每一个连接从线程池中获取线程，省去了创建和销毁线程的开销。



### 第2层：SQL层（服务层）

> 概述：第二层为服务层，大概执行流程是：
>
> 1. SQL语句首先由 `SQL Interface` 接收，传给 解析器 
> 2. `解析器`对SQL的语法语义进行检查，无误后创建`语法树`并校验权限
> 3. 在查询之前会经过`查询优化器`，通过查询优化器来确定最优SQL执行路径并调用`执行器`执行SQL并返回结果

#### **SQL Interface: SQL接口**

- 接收用户的SQL命令，并且返回用户需要查询的结果。比如SELECT ... FROM就是调用SQL Interface
- MySQL支持DML（数据操作语言）、DDL（数据定义语言）、存储过程、视图、触发器、自定义函数等多种SQL语言接口

#### **Parser:** **解析器**

- 在解析器中对 SQL 语句进行语法分析、语义分析。将SQL语句分解成数据结构，并将这个结构传递到后续步骤，以后SQL语句的传递和处理就是基于这个结构的。如果在分解构成中遇到错误，那么就说明这个SQL语句是不合理的。
- 在SQL命令传递到解析器的时候会被解析器验证和解析，并为其创建 **语法树** ，并根据数据字典丰富查询语法树，会 **验证该客户端是否具有执行该查询的权限** 。创建好语法树后，MySQL还会对SQl查询进行语法上的优化，进行查询重写。

#### **Optimizer:** **查询优化器**

SQL语句在语法解析之后、查询之前会使用查询优化器确定 SQL 语句的执行路径，生成一个`执行计划` 。

这个执行计划指明：

1. 应该使用哪些**索引** 进行查询（全表检索还是使用索引检索）
2. 表之间的连接顺序如何
3. 最后会按照执行计划中的步骤调用存储引擎提供的方法来真正的执行查询，并将查询结果返回给用户。

它使用`“ 选取-投影-连接 ”`策略进行查询。例如：

~~~sql
SELECT id,name FROM student WHERE gender = '女'
~~~

这个SELECT查询先根据WHERE语句进行 **选取** ，而不是将表全部查询出来以后再进行gender过滤。 这个SELECT查询先根据id和name进行属性 **投影** ，而不是将属性全部取出以后再进行过滤，将这两个查询条件 **连接** 起来生成最终查询结果。

#### **Caches & Buffers： 查询缓存组件**

> 因为缓存是将 SQL 语句的**字符串当做key**缓存起来的，如果两次 SQL语句有一点点不一样，都会导致缓存无法命中，因为命中率很低所以8.0开始被移除了

- MySQL内部维持着一些Cache和Buffer，比如Query Cache用来缓存一条SELECT语句的执行结果，如果能够在其中找到对应的查询结果，那么就不必再进行查询解析、优化和执行的整个过程了，直接将结果反馈给客户端。
- 这个缓存机制是由一系列小缓存组成的。比如表缓存，记录缓存，key缓存，权限缓存等 。
- 这个查询缓存可以在` 不同客户端之间共享` 。
- 从MySQL 5.7.20开始，**不推荐使用查询缓存，并在 MySQL 8.0中删除** 。



### 第3层：存储引擎层

存储引擎和数据库文件打交道



### 小结

![image-20230202154422883](https://s2.loli.net/2023/10/18/xHvJQbD1CoPYlkL.png)











## 二、SQL 执行过程

### 概述



> `SQL语句→查询缓存→解析器→优化器→执行器`
>
> ![image-20230202155701454](https://s2.loli.net/2023/10/18/paeS9mj3tP6HzhQ.png)

![image-20230202154539467](https://s2.loli.net/2023/10/18/bQqphwTs4uWdjFA.png)





### 解析器

> 在解析器中对 SQL 语句进行**语法分析、语义分析**。

~~~sql
SELECT id from t
~~~



分析器先做`“ 词法分析 ”`。你输入的是由多个字符串和空格组成的一条 SQL 语句，MySQL 需要识别出里面的字符串分别是什么，代表什么。比如： MySQL 从输入的"**select**"这个关键字识别出来，这是一个查询语句。它也要把字符串“t”识别成“表名 t”，把字符串“id”识别成“列 id”。

接着，要做`“ 语法分析 ”`。根据词法分析的结果，语法分析器（比如：Bison）会根据语法规则，判断你输入的这个 SQL 语句是否 满足 MySQL 语法 。

~~~sql
select department_id,job_id,avg(salary) from employees group by department_id;
~~~

如果SQL语句正确，则会生成一个这样的语法树：

![image-20230202154918177](https://s2.loli.net/2023/10/18/cxYwHCgDkTSrqGn.png)





### 优化器

在优化器中会确定 SQL 语句的**执行路径**，比如是根据 **全表检索** ，还是根据 **索引检索** 等。

举例：如下语句是执行两个表的 join：

~~~sql
select * from test1 join test2 using(ID)
where test1.name='zhangwei' and test2.name='mysql高级课程';
~~~

- 方案1：可以先从表 test1 里面取出 `name='zhangwei'`的记录的 ID 值，再根据 ID 值关联到表 test2，再判断 test2 里面 name的值是否等于 'mysql高级课程'。
- 方案2：可以先从表 test2 里面取出` name='mysql高级课程'` 的记录的 ID 值，再根据 ID 值关联到 test1，再判断 test1 里面 name的值是否等于 zhangwei。

这两种执行方法的逻辑结果是一样的，但是执行的效率会有不同，而优化器的作用就是决定选择使用哪一方案。优化器阶段完成后，这个语句的执行方案就确定下来了，然后进入**执行器阶段**。



### 执行器

到现在，还没有真正去读写真实的表，仅仅只是产出了一个执行计划。于是就进入了 `执行器阶段 `。

![image-20230202155505144](https://s2.loli.net/2023/10/18/8vU3hWMtOXSCQs6.png)

在执行之前需要判断该用户`是否具备权限` 。如果没有，就会返回权限错误。

如果具备权限，就执行 SQL查询并返回结果。在 MySQL8.0 以下的版本，如果设置了查询缓存，这时会将查询结果进行缓存。







# 存储引擎

MySQL从3.23.34a开始就包含InnoDB存储引擎。 `大于等于5.5`之后，**默认采用**`InnoDB引擎 `。

## InnoDB

### 优点

支持事务、行锁、外键

InnoDB是为了处理巨大数据量的最大性能设计的

### 缺点

写的效率比MyISAM差

会占用更多的内存（数据和索引都存在`.idb`文件里），不仅缓存索引还缓存了数据





## MyISAM

### 优点

访问快

一般用于 **对事务要求不高** 或者 **查询、插入多** 的情况

对数据统计有额外的常数存储，所以`count(*)`效率很高

只缓存索引不缓存数据，对内存要求没有InnoDB高





### 缺点

不支持事务、行级锁、外键 ，有一个毫无疑问的缺陷就是 **崩溃后无法安全恢复** 。







## 对比

|                | MyISAM                           | InnoDB                       |
| -------------- | -------------------------------- | ---------------------------- |
| 外键           | 不支持                           | 支持                         |
| 事务           | 不支持                           | 支持                         |
| 行表锁         | 表锁，不适合高并发               | 行锁，适合高并发             |
| 缓存           | 只缓存索引，不缓存真实数据       | 缓存索引和数据，对内存要求高 |
| 自带系统表使用 | Y                                | N                            |
| 关注点         | 性能：节省资源、消耗少、简单业务 | 事务：并发写、事务、更大资源 |
| 默认安装       | Y                                | Y                            |
| 默认使用       | N                                | Y                            |









# 拓展

## SQL执行顺序

以SQL99语法为例

~~~sql
# 第二执行部分
select ...,...()

# 第一执行部分
from xxx (left / right) join xxx 
on 多表连接条件
(left / right) join xxx 
on 多表连接条件
where 不包含聚合函数的过滤条件
group by ...,...
having 包含聚合函数的过滤条件

# 第三执行部分
order by ...,...(ASC / DESC)
limit ...,...
~~~



执行顺序大致为：

1. 第一部分
   1. FROM 表
   2. ON
   3. (left / right) join
   4. where
      - 不包含聚合函数的过滤条件写这里比写having里面**效率高**
   5. group by
   6. having
2. 第二部分
   1. select
   2. distinct
3. 第三部分
   1. order by
   2. limit



SQL 的执行原理

SELECT 是先执行 **FROM** 这一步的。在这个阶段，如果是多张表联查，还会经历下面的几个步骤：

1. 首先先通过 CROSS **JOIN** 求笛卡尔积，相当于得到`虚拟表 vt（virtual table）1-1`；
2. 通过 **ON** 进行筛选，在虚拟表 vt1-1 的基础上进行筛选，得到虚拟表 `vt1-2`；
3. 添加外部行。如果我们使用的是左连接、右链接或者全连接，就会涉及到外部行，也就是在虚拟表 vt1-2 的基础上增加外部行，得到虚拟表 `vt1-3`。

当然如果我们操作的是两张以上的表，还会重复上面的步骤，直到所有表都被处理完为止。这个过程得到是我们的原始数据。

当我们拿到了查询数据表的原始数据，也就是最终的虚拟表 vt1 ，就可以在此基础上再进行 WHERE 阶段 。在这个阶段中，会根据 vt1 表的结果进行筛选过滤，得到虚拟表 `vt2` 。

然后进入第三步和第四步，也就是 **GROUP** 和 **HAVING** 阶段 。在这个阶段中，实际上是在虚拟表 vt2 的基础上进行分组和分组过滤，得到中间的虚拟表 `vt3` 和 `vt4` 。

当完成了条件筛选部分之后，就可以筛选表中提取的字段，也就是进入到 **SELECT** 和 **DISTINCT**阶段 。

- 首先在 SELECT 阶段会提取想要的字段，然后在 DISTINCT 阶段过滤掉重复的行，分别得到中间的虚拟表`vt5-1` 和` vt5-2` 。

当我们提取了想要的字段数据之后，就可以按照指定的字段进行排序，也就是 **ORDER BY** 阶段 ，得到虚拟表`vt6` 。

最后在 vt6 的基础上，取出指定行的记录，也就是 **LIMIT** 阶段 ，得到最终的结果，对应的是虚拟表`vt7` 。



当然在写 SELECT 语句的时候，不一定存在所有的关键字，相应的阶段就会省略。

同时因为 SQL 是一门类似英语的结构化查询语言，所以在写 SELECT 语句的时候，还要注意相应的关键字顺序，所谓底层运行的原理，就是SQL的执行顺序。





## DDL 和 DML 区别

- DDL的操作一旦执行，就**不可回滚**。指令`SET autocommit = FALSE`对DDL操作**失效**。(因为在执行完DDL操作之后，一定会（自动）执行一次COMMIT。而此COMMIT操作**不受SET autocommit = FALSE影响**的。)
- DML的操作**默认情况**，一旦执行，也是**不可回滚**的。但是，如果在执行DML之前，执行了 `SET autocommit = FALSE`，则执行的DML操作就**可以实现回滚**。





## MySQL8新特性：DDL原子化

在MySQL 8.0版本中，InnoDB表的**DDL支持事务完整性**，即 DDL操作要么成功要么回滚 。

DDL操作回滚日志写入到data dictionary数据字典表mysql.innodb_ddl_log（该表是隐藏的表，通过show tables无法看到）中，用于回滚操作。通过设置参数，可将DDL操作日志打印输出到MySQL错误日志中。





## MySQL8新特性：计算列

### 什么叫计算列呢

简单来说就是某一列的值是通过别的列计算得来的。例如，a列值为1、b列值为2，c列不需要手动插入，定义a+b的结果为c的值，那么c就是计算列，是通过别的列计算得来的。

在MySQL 8.0中，`CREATE TABLE` 和 `ALTER TABLE` 中都支持增加计算列。

### 以CREATE TABLE为例：

举例：定义数据表tb1，然后定义字段id、字段a、字段b和字段c，其中字段c为计算列，用于计算a+b的值。 创建测试表tb1，语句如下：

~~~sql
CREATE TABLE tb1(
    id INT,
    a INT,
    b INT,
    c INT GENERATED ALWAYS AS (a + b) VIRTUAL
);
~~~

之后只要插入或更新ab列，c就会自动计算

## 阿里巴巴开发规范

- 【 **强制** 】表名、字段名必须使用小写字母或数字，禁止出现数字开头，禁止两个下划线中间只出现数字。数据库字段名的修改代价很大，因为无法进行预发布，所以字段名称需要慎重考虑。
  - 正例：aliyun_admin，rdc_config，level3_name
  - 反例：AliyunAdmin，rdcConfig，level_3_name
- 【 **强制** 】禁用保留字，如 desc、range、match、delayed 等，请参考 MySQL 官方保留字。
- 【 **强制** 】表必备三字段：`id`,` gmt_create,` `gmt_modified`。
  - 说明：其中 id 必为主键，类型为BIGINT UNSIGNED、单表时自增、步长为 1。
  - gmt_create,gmt_modified 的类型均为 DATETIME 类型，前者现在时表示主动式创建，后者过去分词表示被动式更新
- 【 **推荐** 】表的命名最好是遵循 “业务名称_表的作用”。
  - 正例：alipay_task 、 force_project、 trade_config
- 【 **推荐** 】库名与应用名称尽量一致。
- 【**参考**】合适的字符存储长度，不但节约数据库表空间、节约索引存储，更重要的是提升检索速度。
  - 正例：无符号值可以避免误存负数，且扩大了表示范围。

![image-20230128171021504](https://s2.loli.net/2023/10/18/G6w8Murl2TVyjzb.png)









