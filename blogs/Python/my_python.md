## os

#### 1. os.getcwd()

- 获取当前目录位置的方法

```python
import os
path = os.getcwd()
print(path)
```

#### 2. os.sep

- 返回文件分隔符

linux和Windows是不一样的

- Windows 是 \
- Linux 是 /

#### 3. os.system(command)

- 可以调用cmd

```python
import os
os.system('ping www.baidu.com')
```

#### 4. os.name

- 显示正在使用的系统

1. Windows是 nt
2. Linux是 posix

#### 5. os.getenv(name)

- 返回环境变量路径

```python
import os
print(os.getenv("PyCharm"))
# E:\Xiamen Ligong\Second semester\Python\软件\PyCharm 2021.3.2\bin;
```

#### 6. os.getcwd()

- 返回当前工作目录的绝对路径



![image-20220501133737574](https://s2.loli.net/2023/10/17/FyGkKrHQq3tDwcn.png)





### os.path

#### 1. os.path.abspath( path )

- 用于返回path的绝对路径

参数必须要有，可以联动 os.getcwd() 来获取当前工作目录的绝对路径

```python
import os
path = os.path.abspath(os.getcwd())
print(path)
```

#### 2. os.path.join(dir_path, file_name )

- 用于拼接路径

dir_path 可以有多个，用逗号隔开

#### 3. os.path.dirname(path)

- 返回当前文件的目录

通常用于向上返回目录

```python
path = os.path.dirname(os.getcwd())  #返回当前文件夹的路径
print(path)
path = os.path.dirname(path)  #返回当前文件夹的上一级文件夹的路径
print(path)
```

#### 4. os.path.basename(path)

- 返回路径中分隔符的最后一部分（不包括分隔符）



## pyinstaller

script 是脚本文件

- -D: 将所有文件打包一个目录
- -F: 将所有文件打包成一个文件
- -w: 不显示控制台窗口
- -i <FILE.ico>：将图片设置为可执行文件的封面图片

![image-20220513220937638](https://s2.loli.net/2023/10/17/qDbetQs6ARhcp3N.png)







