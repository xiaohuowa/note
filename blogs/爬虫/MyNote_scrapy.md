## request爬虫三部曲

1. `import requests`
2. 确定`url`
3. 确定`header`
   - 需不需要模拟UA
   - 需不需要cookie
   - 等等。。。
4. 确定是否需要参数
   - GET是`params`
   - POST等是`data`
5. 发请求
   - `requests.get/post...(xxx, xxx, xxx)`会返回一个响应结果
6. 获取响应结果中的数据
   1. JSON数据获取
      - `response.json()`
   2. 文本获取
      - `response.text`
   3. 二进制获取
      - `response.content`





## 正则解析

~~~html
<div class="thumb">

    <a href="/article/121721100" target="_blank">
        <img src="//pic.qiushibaike.com/system/pictures/12172/121721100/medium/DNXDX9TZ8SDU6OK2.jpg" alt="指引我有前进的方向">
    </a>

</div>
~~~

以上想要匹配出图片src，可以用以下正则

第一个参数是正则，第二个参数是供正则去匹配的字符串（也就是这里的页面源码）

第三个参数`re.S`对应的是`re.M`

- `re.S`代表单行匹配
- `re.M`代表多行匹配

~~~python
import re

#使用通用爬虫对url对应的一整张页面进行爬取
page_text = requests.get(url=url,headers=headers).text

#使用聚焦爬虫将页面中所有的糗图进行解析/提取
ex = '<div class="thumb">.*?<img src="(.*?)" alt.*?</div>'
img_src_list = re.findall(ex,page_text,re.S)
~~~





## bs4解析

### 数据解析过程

1. 标签定位
2. 提取标签、标签属性中的数据值



### 解析原理

1. 实例化一个BeautifulSoup对象，并且将页面源码数据加载到该对象中
2. 通过调用BeautifulSoup对象中相关的属性或者方法进行标签定位和数据提取



### 环境安装

1. `pip install bs4`
2. `pip install lxml`（xpath也要用到这个）



### 如何实例化BeautifulSoup对象:

1. `from bs4 import BeautifulSoup`

2. 对象的实例化（实例化的时候就传入页面源码数据）:

   - 将`本地`的html文档中的数据加载到该对象中

     - ~~~python
       fp = open( './test.html' , 'r',encoding='utf-8')soup = BeautifulSoup(fp, ' lxml')
       ~~~

   - 将`互联网`上获取的页面源码加载到该对象中

     - ~~~python
       page_text = response.text
       soup = BeatifulSoup(page text, 'lxml')
       ~~~



### 定位数据标签的方法和属性

#### soup.tagName

返回的是文档中第一次出现的tagName对应的标签

#### soup.find():

1. - `find('tagName')`:等同于soup.div
2. - 属性定位（注意：定位类名的时候要用`class_`）：
     - `soup.find('div' ,class_/id/attr=' song ')`
3. ``soup.find_all('tagName ')`：返回符合要求的所有标签（列表)

#### soup.select('某种选择器（id,class，标签...选择器)')

> 返回的是一个`列表`

层级选择器:

- `soup.select('.tang > ul > li >a')`∶`>`表示的是一个层级
- `soup.select('.tang > ul a')`：空格表示的多个层级



### 获取标签之间的文本内容

通过`两个属性一个方法`实现获取

- `soup.targetName.text/get_text`
  - 可以获取某一个标签中`所有的`文本内容
- `soup.targetName.string`
  - 只可以获取该标签下面**直系的**文本内容



### 获取标签的属性值

`soup.a['href']`



## xpath

xpath解析：最常用且最便捷高效的一种解析方式，具有通用性。

- xpath解析原理：
    1. 实例化一个etree的对象，且需要将被解析的页面源码数据加载到该对象中。
    2. 调用etree对象中的xpath方法结合着xpath表达式实现标签的定位和内容的捕获。
- 环境的安装：
    - `pip install lxml`
- 如何实例化一个etree对象：`from lxml import etree`
    1. 将本地的html文档中的源码数据加载到etree对象中：
        etree.parse(filePath)
    2. 可以将从互联网上获取的源码数据加载到该对象中
        etree.HTML('page_text')
    3. xpath('xpath表达式')





### xpath表达式:

1. `/`:表示的是从根节点开始定位。表示的是一个层级。
2. `//`:表示的是多个层级。可以表示从任意位置开始定位。
3. `属性定位`：//div[@class='song'] tag[@attrName="attrValue"]
4. `索引定位`：//div[@class="song"]/p[3] 索引是从1开始的。
5. 取`文本`：
    - /text() 获取的是标签中直系的文本内容
    - //text() 标签中非直系的文本内容（所有的文本内容）
6. 取`属性`：
    /@attrName     ==>img/src



![xpath基本语法](https://s2.loli.net/2023/10/17/Wd7tcN9PSaLb3eM.png)

### 局部解析案例

> 局部解析的时候，xpath中可以用`./`开头，代表从当前位置开始

~~~python
#需求：爬取58二手房中的房源信息
if __name__ == "__main__":
    headers = {
        'User-Agent':'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.103 Safari/537.36'
    }
    #爬取到页面源码数据
    url = 'https://bj.58.com/ershoufang/'
    page_text = requests.get(url=url,headers=headers).text

    #数据解析（整个页面）
    tree = etree.HTML(page_text)
    #存储的就是li标签对象
    li_list = tree.xpath('//ul[@class="house-list-wrap"]/li')
    fp = open('58.txt','w',encoding='utf-8')
    for li in li_list:
        #局部解析（每一条房屋数据分开局部解析）
        title = li.xpath('./div[2]/h2/a/text()')[0]
        print(title)
        fp.write(title+'\n')
~~~





## 解决中文乱码问题

### 一、直接给响应数据设置编码格式

```python
response = requests.get(url=url,headers=headers)
#手动设定响应数据的编码格式
# response.encoding = 'utf-8'
page_text = response.text
```



### 二、直接设置不行可以针对乱码位置进行单独处理

~~~python
img_src = 'http://pic.netbian.com'+li.xpath('./a/img/@src')[0]
img_name = li.xpath('./a/img/@alt')[0]+'.jpg'
#通用处理中文乱码的解决方案
img_name = img_name.encode('iso-8859-1').decode('gbk')
~~~









## 处理Cookie

### 手动（不推荐）

手动给请求头加上cookie，不灵活



### 自动（推荐）

> http/https协议特性：无状态。所以需要通过cookie等方式记录登录状态



#### cookie值的来源是哪里？

- 模拟登录post请求后，由服务器端创建。

#### session会话对象：

##### 作用：

1. 可以进行请求的发送。
2. 如果请求过程中产生了cookie，则该cookie会被`自动存储/携带`在该session对象中。



##### 步骤：

1. 创建一个session对象：`session = requests.Session()`
2. 使用session对象进行模拟登录post请求的发送（cookie就会被自动存储在session中）
    - 发送方法就是将`requests.get(xxx,xxx)`改为`session.get(xxx,xxx)`
3. session对象对个人主页对应的get请求进行发送（自动携带了cookie）





## 代理

> 代理：破解`封IP`这种反爬机制。

### 什么是代理：

    - 代理服务器。

### 代理的作用：

   1. 突破自身IP访问的限制。
   2. 隐藏自身真实IP

### 代理相关的网站：

   - 快代理
   - 西祠代理
   - www.goubanjia.com

### 代理ip的类型：

- `http`：应用到http协议对应的url中
- `https`：应用到https协议对应的url中

### 代理ip的匿名度：

- `透明`：服务器知道该次请求使用了代理，也知道请求对应的真实ip
- `匿名`：知道使用了代理，不知道真实ip
- `高匿`：不知道使用了代理，更不知道真实的ip







## 异步

### 多线程，多进程（不建议）：

- 好处：可以为相关阻塞的操作单独开启线程或者进程，阻塞操作就可以异步执行。
- 弊端：无法无限制的开启多线程或者多进程。



### 线程池、进程池（适当的使用）：

好处：我们可以降低系统对进程或者线程创建和销毁的一个频率，从而很好的降低系统的开销。

~~~python
from multiprocessing.dummy import Pool

# 使用线程池对视频数据进行请求（较为耗时的阻塞操作）
pool = Pool(4)
# 通过线程池获取到视频的数据
pool.map(download_video_data方法, detail_detail_list列表)

# 关闭线程
pool.close()
# 让主线程等待子线程完成后再结束
pool.join()
~~~



#### 通过线程池爬取梨视频

~~~python
import requests
import os
from lxml import etree
from multiprocessing.dummy import Pool


if not os.path.exists('./videos'):
    os.mkdir('./videos')
url = 'https://www.pearvideo.com/category_59'
# url = 'https://www.pearvideo.com/panorama'
headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36'
}
page_text = requests.get(url=url, headers=headers).text
page_text.encode('utf8')
tree = etree.HTML(page_text)
# 拿到热门视频的4个li
lis_list = tree.xpath('/html/body/div[2]/div[1]/div/ul/li')
# 用来存储视频的标题和url
detail_detail_list = []
for li in lis_list:
    video_name = li.xpath('.//div[@class="vervideo-title"]/text()')[0]
    detail_url = li.xpath('.//div[@class="vervideo-bd"]/a/@href')[0]
    # https://www.pearvideo.com/videoStatus.jsp?contId=1778254&mrd=0.6860732280069499
    video_id = detail_url.split('_')[-1]
    url = 'https://www.pearvideo.com/videoStatus.jsp'
    params = {
        'contId': video_id,
        'mrd': 0.6860732280069499
    }
    ajax_headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36',
         "Referer": "https://pearvideos.com/video_" + video_id
    }

    ajax_data = requests.get(url=url, params=params, headers=ajax_headers).json()
    # 拿到视频的链接
    video_url = ajax_data['videoInfo']['videos']['srcUrl']
    # 但解析出来的视频地址是一个加密后的伪地址，需要将中间的一串13位数字改成cont-cont_id，方可得到真地址
    # 伪地址：https://video.pearvideo.com/mp4/third/20230212/1676548173884-11852754-153642-hd.mp4
    # 真地址：https://video.pearvideo.com/mp4/third/20230212/cont-1778254-11852754-153642-hd.mp4

    first = video_url[0: video_url.rfind('/')+1]
    dummy_uri = video_url[video_url.rfind('/')+1:]
    true_url = first + 'cont-' + video_id + dummy_uri[dummy_uri.find('-'):]


    dic = {
        'video_name': video_name + '.mp4',
        'video_url': true_url
    }
    detail_detail_list.append(dic)


def download_video_data(dic):
    video_name = dic['video_name']
    print(video_name + '开始保存...')
    video_data = requests.get(url=dic['video_url'], params=params, headers=headers).content
    with open('videos/' + video_name, 'wb') as fp:
        fp.write(video_data)
        print(video_name + '保存完成！')


# 使用线程池对视频数据进行请求（较为耗时的阻塞操作）
pool = Pool(4)
# 通过线程池获取到视频的数据
pool.map(download_video_data, detail_detail_list)

pool.close()
pool.join()

~~~

























































