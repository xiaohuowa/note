import{_ as a,r as s,o as n,c as l,a as e,b as i,d as r,e as t}from"./app-55752f72.js";const o={},c=t(`<p>Redis</p><h2 id="简介" tabindex="-1"><a class="header-anchor" href="#简介" aria-hidden="true">#</a> 简介</h2><h3 id="是什么" tabindex="-1"><a class="header-anchor" href="#是什么" aria-hidden="true">#</a> 是什么</h3><p>Redis是一种数据库。能够存储数据、管理数据的一种软件。</p><p>Redis是一个<strong>用C语言编写</strong>的、开源的、基于内存运行并支持持久化的、高性能的NoSQL数据库.也是当前热门的NoSQL数据库之一。</p><p>Redis中的数据大部分时间都是存储内存中的，适合存储频繁访问、数据量比较小的数据。 可以用来做缓存数据库。</p><h2 id="安装与基本操作" tabindex="-1"><a class="header-anchor" href="#安装与基本操作" aria-hidden="true">#</a> 安装与基本操作</h2><blockquote><p>以Linux版为例</p></blockquote><h3 id="安装" tabindex="-1"><a class="header-anchor" href="#安装" aria-hidden="true">#</a> 安装</h3><ol><li><p>下载tar包</p></li><li><p>解压：<code>tar -zxvf ...</code></p></li><li><p>编译：<code>make</code></p><ul><li><p>注意如果没安装gcc会报错，需要先安装gcc</p></li><li><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>yum -y install gcc
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li><li><p>安装完gcc之后，执行<code>make distclean</code>清除掉刚才没安装完的数据</p></li><li><p>再次执行<code>make</code>操作即可</p></li></ul></li><li><p>将redis命令加入环境变量：<code>make install</code></p><ul><li>该操作则将 src下的许多可执行文件复制到 <strong>/usr/local/bin</strong> 目录下，这样做可以在任意目录执行redis的软件的命令（例如启动，停止，客户端连接服务器等）， make install <strong>可以不用执行</strong>，看个人习惯。</li></ul></li><li><p>至此安装完毕</p></li></ol><h3 id="基本使用" tabindex="-1"><a class="header-anchor" href="#基本使用" aria-hidden="true">#</a> 基本使用</h3><h4 id="关闭linux防火墙" tabindex="-1"><a class="header-anchor" href="#关闭linux防火墙" aria-hidden="true">#</a> 关闭Linux防火墙</h4><p>centos7</p><p><code>systemctl stop firewalld</code></p><h4 id="启动redis服务器" tabindex="-1"><a class="header-anchor" href="#启动redis服务器" aria-hidden="true">#</a> 启动Redis服务器</h4><ol><li>前台启动 <ul><li>在任何目录下执行 <code>redis-server</code></li></ul></li><li>后台启动（用的多） <ul><li>在任何目录下执行 <code>redis-server &amp;</code></li></ul></li><li>指定配置文件启动 <ul><li>前台： <code>redis-server redis.conf </code></li><li>后台：<code>redis-server redis.conf &amp;</code></li></ul></li></ol><blockquote><p>注意，这里<code>redis.conf</code>路径可以写相对路径也可以写绝对路径。</p><p>写相对路径的话要在redis目录下进行操作才行</p></blockquote><h4 id="关闭redis服务器" tabindex="-1"><a class="header-anchor" href="#关闭redis服务器" aria-hidden="true">#</a> 关闭Redis服务器</h4><ol><li><p>通过<code>kill</code>杀进程</p><ul><li><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 查看pid</span>
<span class="token function">ps</span> -ef<span class="token operator">|</span><span class="token function">grep</span> redis
<span class="token comment"># kill进程</span>
<span class="token function">kill</span> <span class="token parameter variable">-9</span> pid
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ul></li><li><p>通过<code>redis-cli</code>命令关闭（推荐）</p><ul><li>命令为<code>redis-cli shutdown</code></li><li>注意：如果在开启的服务的时候指定了ip / 端口，那么在关闭的时候也需要在<code>redis-cli</code>后面加上 ip / 端口，再加上<code>shutdown</code>才行。</li></ul></li></ol><h4 id="启动redis客户端" tabindex="-1"><a class="header-anchor" href="#启动redis客户端" aria-hidden="true">#</a> 启动Redis客户端</h4><p>redis的客户端：用来连接redis服务，向redis服务端发送命令，并且显示redis服务处理结果。</p><p><code>redis-cli</code>：是redis自带客户端，使用命令redis-cli就可以启动redis的客户端程序。</p><ol><li><code>redis-cli</code><ul><li>默认连接<strong>127.0.0.1(本机)的6379端口</strong>上的redis服务。</li></ul></li><li><code>redis-cli -p 端口号</code><ul><li>连接127.0.0.1(本机)的<strong>指定端口</strong>上的redis服务。</li></ul></li><li><code>redis-cli -h ip地址 -p 端口</code><ul><li>连接<strong>指定ip主机上的指定端口</strong>的redis服务。</li></ul></li></ol><h4 id="退出redis客户端" tabindex="-1"><a class="header-anchor" href="#退出redis客户端" aria-hidden="true">#</a> 退出Redis客户端</h4><p>在客户端执行命令：<code>exit</code>或者<code>quit</code></p><h3 id="基本知识-操作" tabindex="-1"><a class="header-anchor" href="#基本知识-操作" aria-hidden="true">#</a> 基本知识（操作）</h3><h4 id="测试redis服务的性能" tabindex="-1"><a class="header-anchor" href="#测试redis服务的性能" aria-hidden="true">#</a> 测试redis服务的性能</h4><p><code>redis-benchmark</code></p><h4 id="查看redis服务是否正常运行" tabindex="-1"><a class="header-anchor" href="#查看redis服务是否正常运行" aria-hidden="true">#</a> 查看redis服务是否正常运行</h4><blockquote><p>连上redis服务器后，直接输入<code>ping</code>命令，如果正常就会收到<code>PONG</code></p></blockquote><h4 id="查看redis服务器的统计信息" tabindex="-1"><a class="header-anchor" href="#查看redis服务器的统计信息" aria-hidden="true">#</a> 查看redis服务器的统计信息</h4><ol><li><code>info</code><ul><li>查看redis服务的所有统计信息</li></ul></li><li><code>info [信息段] </code><ul><li>查看redis服务器的指定的统计信息，如：info Replication</li></ul></li></ol><h4 id="redis的数据库实例" tabindex="-1"><a class="header-anchor" href="#redis的数据库实例" aria-hidden="true">#</a> Redis的数据库实例</h4><p>redis的数据库实例：作用类似于mysql的数据库实例。但是，redis中的数据库实例只能由redis服务来创建和维护，**<u>开发人员不能修改和自行创建</u>**数据库实例；</p><p>默认情况下，redis会自动创建<strong>16个</strong>数据库实例，并且给这些数据库实例进行编号，从0开始，一直到15，使用时通过编号来使用数据库；可以通过配置文件，指定redis自动创建的数据库个数；redis的每一个数据库实例本身占用的存储空间是很少的，所以也不造成存储空间的太多浪费。</p><p>默认情况下，redis客户端直接连接Redis服务器的是编号是0的数据库实例；可以使用<code>select index</code>命令切换数据库实例。</p><h4 id="清空当前数据库实例中的数据" tabindex="-1"><a class="header-anchor" href="#清空当前数据库实例中的数据" aria-hidden="true">#</a> 清空当前数据库实例中的数据</h4><p><code>flushdb</code></p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token number">127.0</span>.0.1:6380<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token operator">&gt;</span> keys *
<span class="token number">1</span><span class="token punctuation">)</span> <span class="token string">&quot;k1&quot;</span>
<span class="token number">127.0</span>.0.1:6380<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token operator">&gt;</span> flushdb
OK
<span class="token number">127.0</span>.0.1:6380<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token operator">&gt;</span> keys *
<span class="token punctuation">(</span>empty list or <span class="token builtin class-name">set</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="清空所有数据库实例中的数据" tabindex="-1"><a class="header-anchor" href="#清空所有数据库实例中的数据" aria-hidden="true">#</a> 清空所有数据库实例中的数据</h4><p><code>flushall</code></p><h4 id="查看redis中所有的配置信息" tabindex="-1"><a class="header-anchor" href="#查看redis中所有的配置信息" aria-hidden="true">#</a> 查看redis中所有的配置信息</h4><p><code>config get *</code></p><h4 id="查看redis中的指定的配置信息" tabindex="-1"><a class="header-anchor" href="#查看redis中的指定的配置信息" aria-hidden="true">#</a> 查看redis中的指定的配置信息</h4><p><code>config get parameter</code></p><h3 id="关于key的操作命令" tabindex="-1"><a class="header-anchor" href="#关于key的操作命令" aria-hidden="true">#</a> 关于key的操作命令</h3><h4 id="查看当前数据库实例中所有key的数量" tabindex="-1"><a class="header-anchor" href="#查看当前数据库实例中所有key的数量" aria-hidden="true">#</a> 查看当前数据库实例中所有key的数量</h4><p><code>dbsize</code></p><h4 id="查看当前数据库实例中key" tabindex="-1"><a class="header-anchor" href="#查看当前数据库实例中key" aria-hidden="true">#</a> 查看当前数据库实例中key：</h4><blockquote><p><code>keys pattern</code></p></blockquote><p><code>pattern</code>的三种表示方法：</p><ol><li><code>*</code><ul><li>匹配0个或者多个字符</li></ul></li><li><code>?</code><ul><li>匹配1个字符</li></ul></li><li><code>[]</code><ul><li>匹配[]里边的1个字符</li></ul></li></ol><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>示例：
keys *：查看数据库中所有的key
keys k*:查看数据库中所有以k开头的key
keys h*o：查看数据库中所有以h开头、以o结尾的key
keys h?o: 查看数据库中所有以h开头、以o结尾的、并且中间只有一个字符的key
keys h[abc]llo：查看数据库中所有以h开头以llo结尾，并且h后边只能取abc中的一个字符的key
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="判断key在数据库中是否存在" tabindex="-1"><a class="header-anchor" href="#判断key在数据库中是否存在" aria-hidden="true">#</a> 判断key在数据库中是否存在</h4><blockquote><p><code>exists key</code></p></blockquote><ul><li><p>返回值</p><ul><li><p>如果存在，则返回<code>1</code></p></li><li><p>如果不存在，则返回<code>0</code></p></li><li><p>多key同时判断时，返回存在的key的数量</p></li></ul></li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>示例：
exists key [key key ....]： 返回值是存在的key的数量
exists k1：如果有k1这个key就返回1，否则返回0
exists k1 k2 k3 hello：返回存在的key的数量
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>​</p><h4 id="移动指定key到指定的数据库实例" tabindex="-1"><a class="header-anchor" href="#移动指定key到指定的数据库实例" aria-hidden="true">#</a> 移动指定key到指定的数据库实例</h4><blockquote><p><code>move key index</code></p></blockquote><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>示例：
move k1 1：移动key为k1的键值对到1号库中
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="查看指定key的剩余生存时间" tabindex="-1"><a class="header-anchor" href="#查看指定key的剩余生存时间" aria-hidden="true">#</a> 查看指定key的剩余生存时间</h4><blockquote><p><code>ttl key</code></p></blockquote><ul><li>返回值 <ul><li>如果key没有设置生存时间，返回-1</li><li>如果key不存在，返回-2</li><li>如果存在且有生存时间，返回剩余生存时间（秒数）</li></ul></li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>示例：
ttl k1
ttl k2
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>​</p><h4 id="设置key的最大生存时间" tabindex="-1"><a class="header-anchor" href="#设置key的最大生存时间" aria-hidden="true">#</a> 设置key的最大生存时间</h4><blockquote><p><code>expire key seconds</code></p></blockquote><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>示例：
expire k2 20：给key为k2的设置20秒的生存时间
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>​</p><h4 id="查看指定key的数据类型" tabindex="-1"><a class="header-anchor" href="#查看指定key的数据类型" aria-hidden="true">#</a> 查看指定key的数据类型</h4><blockquote><p><code>type key</code></p></blockquote><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>示例：
type k1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>​</p><h4 id="重命名key" tabindex="-1"><a class="header-anchor" href="#重命名key" aria-hidden="true">#</a> 重命名key</h4><blockquote><p><code>rename key newkey</code></p></blockquote><div class="language-示例： line-numbers-mode" data-ext="示例："><pre class="language-示例："><code>示例：
rename hello k2
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="删除指定的key" tabindex="-1"><a class="header-anchor" href="#删除指定的key" aria-hidden="true">#</a> 删除指定的key</h4><blockquote><p><code>del key [key key .....] </code></p></blockquote><ul><li>返回值 <ul><li>实际删除的key的数量</li></ul></li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>示例：
del k1 k2 k3 k4：删除几个key就返回几
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="redis中的五种数据结构" tabindex="-1"><a class="header-anchor" href="#redis中的五种数据结构" aria-hidden="true">#</a> Redis中的五种数据结构</h3><p>11、Redis的五种数据结构： 程序是用来处理数据的，Redis是用来存储数据的；程序处理完的数据要存储到redis中，不同特点的数据要存储在Redis中不同类型的数据结构中。 字符串： zhangsan 20 true string 单key:单value: username:zhangsan age:20 list列表： 13900009999 zs@163.com 321321 list 单key:多有序value: contacts:13900009999,xxx,xxxx set集合： beijing shanghai chongqing tianjin set 单key:多无序value:city:bj sh cq tj pojo： id:1001,name:zhangsan,age:20 hash 单key: 对象(属性:值): student:id :1001,name:zhangsan,age:20 zset 单key:多有序vlaue: city: 1000 tj,1200 cq,1500 sh,2000 bj</p><h4 id="有关string类型数据的操作命令" tabindex="-1"><a class="header-anchor" href="#有关string类型数据的操作命令" aria-hidden="true">#</a> 有关string类型数据的操作命令</h4><h5 id="将string类型的数据设置到redis中" tabindex="-1"><a class="header-anchor" href="#将string类型的数据设置到redis中" aria-hidden="true">#</a> 将string类型的数据设置到redis中</h5><blockquote><p><code>set 键 值</code></p><p>注意：如果key已经存在，则后来的value会把以前的value覆盖掉</p></blockquote><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>示例：
set zsname zhangsan
set zsage 20
set totalRows 100
set zsage 30 如果key已经存在，则后来的value会把以前的value覆盖掉
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="从redis中获取string类型的数据" tabindex="-1"><a class="header-anchor" href="#从redis中获取string类型的数据" aria-hidden="true">#</a> 从redis中获取string类型的数据</h5><blockquote><p><code>get 键</code></p></blockquote><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>示例：
get zsname
get zsage
get totalRows
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>​</p><h5 id="追加字符串" tabindex="-1"><a class="header-anchor" href="#追加字符串" aria-hidden="true">#</a> 追加字符串</h5><blockquote><p><code>append key value</code></p><p>注意：如果key不存在，则新创建一个key，并且把value值设置为value</p></blockquote><ul><li>返回值 <ul><li>返回追加之后的字符串长度</li></ul></li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>示例：
set phone 1389999
append phone 8888
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>​</p><h5 id="获取字符串数据的长度" tabindex="-1"><a class="header-anchor" href="#获取字符串数据的长度" aria-hidden="true">#</a> 获取字符串数据的长度</h5><blockquote><p><code>strlen key</code></p></blockquote><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>示例：
strlen phone
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>​</p><h5 id="将字符串数值进行加1运算" tabindex="-1"><a class="header-anchor" href="#将字符串数值进行加1运算" aria-hidden="true">#</a> 将字符串数值进行加1运算</h5><blockquote><p><code>incr key</code></p></blockquote><ul><li>返回值 <ul><li>返回加1运算之后的数据</li><li><u>如果key不存在</u>，首先设置一个key，值<strong>初始化为0</strong>，然后进行incr运算。</li><li>要求key所表示value必须是数值，否则，报错</li></ul></li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>示例：
incr zsage
incr age
incr zsname：报错：(error) ERR value is not an integer or out of range
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>​</p><h5 id="将字符串数值进行减1运算" tabindex="-1"><a class="header-anchor" href="#将字符串数值进行减1运算" aria-hidden="true">#</a> 将字符串数值进行减1运算</h5><blockquote><p><code>decr key</code></p></blockquote><ul><li>返回值 <ul><li>返回减1运算之后的数据</li><li>如果key不存在，首先设置一个key，值初始化为0，然后进行decr运算。</li><li>要求key所表示value必须是数值，否则，报错</li></ul></li></ul><h5 id="将字符串数值进行加offset运算" tabindex="-1"><a class="header-anchor" href="#将字符串数值进行加offset运算" aria-hidden="true">#</a> 将字符串数值进行加offset运算</h5><blockquote><p><code>incrby key offset</code></p></blockquote><ul><li>返回值 <ul><li>返回加offset运算之后的数据</li><li>如果key不存在，首先设置一个key，值初始化为0，然后进行incrby运算。</li><li>要求key所表示value必须是数值，否则，报错</li></ul></li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>示例：
incrby zsage 10
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>​</p><h5 id="将字符串数值进行减offset运算" tabindex="-1"><a class="header-anchor" href="#将字符串数值进行减offset运算" aria-hidden="true">#</a> 将字符串数值进行减offset运算</h5><blockquote><p><code>decrby key offset</code></p></blockquote><ul><li>返回值 <ul><li>返回减offset运算之后的数据</li><li>如果key不存在，首先设置一个key，值初始化为0，然后进行decrby运算。</li><li>要求key所表示value必须是数值，否则，报错</li></ul></li></ul><h5 id="获取字符串的子串" tabindex="-1"><a class="header-anchor" href="#获取字符串的子串" aria-hidden="true">#</a> 获取字符串的子串</h5><blockquote><p><strong>闭区间</strong>获取字符串key中从<strong>startIndex到endIndex</strong>的字符组成的子字符串：</p><p><code>getrange key startIndex endIndex</code></p><p>正数下标：自左至右，从0开始，依次往后，最后一个字符的下标是字符串长度-1；</p><p>负数下标：字符串中每一个下标也可以是负数，负下标表示自右至左，从-1开始，依次往前，最右边一个字符的下标是-1</p></blockquote><pre><code>示例：
字符串为：zhangsan
getrange zsname 2 5：返回angs
getrange zsname 2 -3：返回angs
getrange zsname 0 -1：返回zhangsan
</code></pre><h5 id="覆盖字符串的子串" tabindex="-1"><a class="header-anchor" href="#覆盖字符串的子串" aria-hidden="true">#</a> 覆盖字符串的子串</h5><blockquote><p>用<strong>value</strong>覆盖从下标为<strong>startIndex</strong>开始的字符串，能覆盖几个字符就覆盖几个字符：</p><p><code>setrange key startIndex value</code></p></blockquote><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>示例：
字符串为：zhangsan
setrange zsname 5 xiaosan   //zhangxiaosan
setrange zsname 5 lao       //zhanglaoosan
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>​</p><h5 id="设置字符串同时设置生命周期" tabindex="-1"><a class="header-anchor" href="#设置字符串同时设置生命周期" aria-hidden="true">#</a> 设置字符串同时设置生命周期</h5><blockquote><p>设置字符串数据的同时，设置它最大生命周期：<code>setex key seconds value</code></p></blockquote><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>示例：
setex k1 20 v1：设置key为k1，value为v1，最大声明周期为20秒的键值对
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="设置string数据时如果key重复就放弃" tabindex="-1"><a class="header-anchor" href="#设置string数据时如果key重复就放弃" aria-hidden="true">#</a> 设置string数据时如果key重复就放弃</h5><blockquote><p>设置string类型的数据value到redis数据库中，当key不存在时设置成功，否则，则放弃设置：setnx key value</p></blockquote><ul><li>返回值 <ul><li>插入成功返回1</li><li>放弃插入返回0</li></ul></li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>示例：
现在已经有一个key为name的数据了，如果用setnx插入同名key的话就放弃
setnx name zhangsan
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="批量设置string数据" tabindex="-1"><a class="header-anchor" href="#批量设置string数据" aria-hidden="true">#</a> 批量设置string数据</h5><blockquote><p>批量将string类型的数据设置到redis中：<code>mset 键1 值1 键2 值2 .....</code></p></blockquote><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>示例：
mset k1 v1 k2 v2 k3 v3 k4 v4 k5 v5
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>​</p><h5 id="批量获取string数据" tabindex="-1"><a class="header-anchor" href="#批量获取string数据" aria-hidden="true">#</a> 批量获取string数据</h5><blockquote><p>批量从redis中获取string类型的数据：<code>mget 键1 键2 键3.....</code></p></blockquote><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>示例：
mget k1 k2 k3 k4 k5 k6 zsname zs age totalRows
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>​</p><h5 id="批量设置string数据-重复则放弃" tabindex="-1"><a class="header-anchor" href="#批量设置string数据-重复则放弃" aria-hidden="true">#</a> 批量设置string数据（重复则放弃）</h5><blockquote><p>批量设置string类型的数据value到redis数据库中，当所有key都不存在时设置成功，否<strong>则(只要有一个已经存在)，则全部放弃设置</strong>：<code>msetnx 键1 值1 键2 值2 .....</code></p></blockquote><ul><li>返回值 <ul><li>成功返回1</li><li>失败返回0</li></ul></li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>示例：
msetnx kk1 vv1 kk2 vv2 kk3 vv3 k1 v1
如果设置成功返回1，设置失败（只要有一个key重复)返回0
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="有关list类型数据的操作命令" tabindex="-1"><a class="header-anchor" href="#有关list类型数据的操作命令" aria-hidden="true">#</a> 有关list类型数据的操作命令</h4><blockquote><p>在Redis中的list数据类型特点：</p><p>单key-多有序value</p><ol><li>一个key对应多个value；</li><li>多个value之间有顺序，最左侧是表头，最右侧是表尾；</li><li>每一个元素都有下标，表头元素的下标是0，依次往后排序，最后一个元素下标是列表长度-1；</li><li>每一个元素的下标又可以用负数表示，负下标表示从表尾计算，最后一个元素下标用-1表示；</li><li>元素在列表中的顺序或者下标由==放入的顺==序来决定。</li><li>通过key和下标来操作数据。</li></ol></blockquote><h5 id="a-将一个或者多个值依次插入到列表的表头-左侧" tabindex="-1"><a class="header-anchor" href="#a-将一个或者多个值依次插入到列表的表头-左侧" aria-hidden="true">#</a> a)将一个或者多个值依次插入到列表的表头(左侧)</h5><blockquote><p><code>lpush key value [value value .....]</code></p></blockquote><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>示例：
lpush list01 1 2 3   结果：3 2 1
lpush list01 4 5     结果：5 4 3 2 1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>​</p><h5 id="b-获取指定列表中指定下标区间的元素" tabindex="-1"><a class="header-anchor" href="#b-获取指定列表中指定下标区间的元素" aria-hidden="true">#</a> b)获取指定列表中指定下标区间的元素</h5><blockquote><p><code>lrange key startIndex endIndex</code></p></blockquote><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>示例：
lrange list01 1 3  结果：4 3 2
lrange list01 1 -2 结果: 4 3 2
lrange list01 0 -1 结果：5 4 3 2 1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="c-将一个或者多个值依次插入到列表的表尾-右侧" tabindex="-1"><a class="header-anchor" href="#c-将一个或者多个值依次插入到列表的表尾-右侧" aria-hidden="true">#</a> c)将一个或者多个值依次插入到列表的表尾(右侧)</h5><blockquote><p><code>rpush key value [value value .....]</code></p></blockquote><pre><code>示例：
rpush list02 a b c 结果：a b c
rpush list02 d e   结果：a b c d e
lpush list02 m n   结果: n m a b c d e
</code></pre><h5 id="d-从指定列表中移除并且返回表头元素" tabindex="-1"><a class="header-anchor" href="#d-从指定列表中移除并且返回表头元素" aria-hidden="true">#</a> d)从指定列表中移除并且返回表头元素</h5><blockquote><p><code>lpop key</code></p></blockquote><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>示例：
lpop list02
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="e-从指定列表中移除并且返回表尾元素" tabindex="-1"><a class="header-anchor" href="#e-从指定列表中移除并且返回表尾元素" aria-hidden="true">#</a> e)从指定列表中移除并且返回表尾元素</h5><blockquote><p><code>rpop key</code></p></blockquote><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>示例：
rpop list02
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="f-获取指定列表中指定下标的元素" tabindex="-1"><a class="header-anchor" href="#f-获取指定列表中指定下标的元素" aria-hidden="true">#</a> f)获取指定列表中指定下标的元素</h5><blockquote><p><code>lindex key index</code></p></blockquote><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>示例：
127.0.0.1:6379&gt; lrange ltest 0 -1
1) &quot;l1&quot;
2) &quot;l1&quot;
3) &quot;l2&quot;
4) &quot;l2&quot;
5) &quot;l3&quot;
6) &quot;l3&quot;
7) &quot;l4&quot;
8) &quot;l4&quot;
127.0.0.1:6379&gt; lindex ltest 2
&quot;l2&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="g-获取指定列表的长度" tabindex="-1"><a class="header-anchor" href="#g-获取指定列表的长度" aria-hidden="true">#</a> g)获取指定列表的长度</h5><blockquote><p><code>llen key</code></p></blockquote><pre><code>示例：
127.0.0.1:6379&gt; lrange ltest 0 -1
1) &quot;l1&quot;
2) &quot;l1&quot;
3) &quot;l2&quot;
4) &quot;l2&quot;
5) &quot;l3&quot;
6) &quot;l3&quot;
7) &quot;l4&quot;
8) &quot;l4&quot;
127.0.0.1:6379&gt; llen ltest
(integer) 8
</code></pre><h5 id="h-根据count值移除指定列表中跟value相等的数据" tabindex="-1"><a class="header-anchor" href="#h-根据count值移除指定列表中跟value相等的数据" aria-hidden="true">#</a> h)根据count值移除指定列表中跟value相等的数据</h5><blockquote><p><code>lrem key count value</code></p></blockquote><ul><li>返回值 <ul><li><p><code>count&gt;0</code>：</p><ul><li>从列表的<strong>左侧移除count个</strong>跟value相等的数据；</li></ul></li><li><p><code>count&lt;0</code>：</p><ul><li>从列表的<strong>右侧移除count个</strong>跟vlaue相等的数据；</li></ul></li><li><p><code>count=0</code>：</p><ul><li>从列表中移除<strong>所有</strong>跟value相等的数据</li></ul><p>lpush list03 a a b c a d e a b b ：结果：b b a e d a c b a a lrem list03 2 a ：结果：b b e d c b a a lrem list03 -1 a ：结果：b b e d c b a lrem list03 0 a ：结果：b b e d c b</p></li></ul></li></ul><h5 id="i-截取指定列表中指定下标区间的元素组成新的列表-并且赋值给key" tabindex="-1"><a class="header-anchor" href="#i-截取指定列表中指定下标区间的元素组成新的列表-并且赋值给key" aria-hidden="true">#</a> i)截取指定列表中指定下标区间的元素组成新的列表，并且赋值给key</h5><blockquote><p><code>ltrim key startIndex endIndex</code></p></blockquote><pre><code>示例：
127.0.0.1:6379&gt; lrange ltest 0 -1
1) &quot;l1&quot;
2) &quot;l1&quot;   --&gt;1
3) &quot;l2&quot;   --&gt;2
4) &quot;l2&quot;   --&gt;3
5) &quot;l3&quot;   --&gt;4
6) &quot;l3&quot;
7) &quot;l4&quot;
8) &quot;l4&quot;
127.0.0.1:6379&gt; ltrim ltest 1 4
OK
127.0.0.1:6379&gt; lrange ltest 0 -1
1) &quot;l1&quot;
2) &quot;l2&quot;
3) &quot;l2&quot;
4) &quot;l3&quot;
</code></pre><h5 id="j-将指定列表中指定下标的元素设置为指定值" tabindex="-1"><a class="header-anchor" href="#j-将指定列表中指定下标的元素设置为指定值" aria-hidden="true">#</a> j)将指定列表中指定下标的元素设置为指定值</h5><blockquote><p><code>lset key index value</code></p></blockquote><pre><code>示例：
127.0.0.1:6379&gt; lrange ltest 0 -1
1) &quot;l1&quot;
2) &quot;l2&quot;
3) &quot;l2&quot;
4) &quot;l3&quot;
127.0.0.1:6379&gt; lset ltest 2 l4
OK
127.0.0.1:6379&gt; lrange ltest 0 -1
1) &quot;l1&quot;
2) &quot;l2&quot;
3) &quot;l4&quot;
4) &quot;l3&quot;
</code></pre><h5 id="l-将value插入到指定列表中位于pivot元素之前-之后的位置" tabindex="-1"><a class="header-anchor" href="#l-将value插入到指定列表中位于pivot元素之前-之后的位置" aria-hidden="true">#</a> l)将value插入到指定列表中位于pivot元素之前/之后的位置</h5><blockquote><p><code>linsert key before/after pivot vlaue</code></p></blockquote><ul><li>返回值 <ul><li><p>插入后的列表长度</p><p>示例： 127.0.0.1:6379&gt; lrange ltest 0 -1</p><ol><li>&quot;l1&quot;</li><li>&quot;l2.5&quot;</li><li>&quot;l2.5&quot;</li><li>&quot;l2&quot;</li><li>&quot;l4&quot;</li><li>&quot;l3&quot; 127.0.0.1:6379&gt; linsert ltest before l2.5 l2.555 (integer) 7 127.0.0.1:6379&gt; lrange ltest 0 -1</li><li>&quot;l1&quot;</li><li>&quot;l2.555&quot;</li><li>&quot;l2.5&quot;</li><li>&quot;l2.5&quot;</li><li>&quot;l2&quot;</li><li>&quot;l4&quot;</li><li>&quot;l3&quot;</li></ol></li></ul></li></ul><h4 id="有关set类型数据的操作命令" tabindex="-1"><a class="header-anchor" href="#有关set类型数据的操作命令" aria-hidden="true">#</a> 有关set类型数据的操作命令</h4><p>4)、redis中有关set类型数据的操作命令：单key-多无序value 一个key对应多个vlaue； value之间没有顺序，并且不能重复； 通过业务数据直接操作集合。 a)将一个或者多个元素添加到指定的集合中：sadd key value [value value ....] *如果元素已经存在，则会忽略。 *返回成功加入的元素的个数 sadd set01 a b c a 结果：a b c sadd set01 b d e b)获取指定集合中所有的元素：smembers key smembers set01 c)判断指定元素在指定集合中是否存在:sismember key member *存在，返回1 *不存在，返回0 sismember set01 f sismember set01 a d)获取指定集合的长度：scard key scard set01 e)移除指定集合中一个或者多个元素：srem key member [member .....] *不存在的元素会被忽略 *返回成功成功移除的个数 srem set01 b d m f)随机获取指定集合中的一个或者多个元素：srandmember key [count] |-&gt;count&gt;0：随机获取的多个元素之间不能重复 |-&gt;count&lt;0: 随机获取的多个元素之间可能重复 sadd set02 1 2 3 4 5 6 7 8 srandmember set02 srandmember set02 3 srandmember set02 -3 g)从指定集合中随机移除一个或者多个元素：spop key [count] spop set02 h)将指定集合中的指定元素移动到另一个元素:smove source dest member smove set01 set02 a i)获取第一个集合中有、但是其它集合中都没有的元素组成的新集合：sdiff key key [key key ....] sdiff set01 set02 set03 j)获取所有指定集合中都有的元素组成的新集合：sinter key key [key key ....] sinter set01 set02 set03 k)获取所有指定集合中所有元素组成的大集合：sunion key key [key key .....] sunion set01 set02 set03</p><h4 id="有关hash类型数据的操作命令" tabindex="-1"><a class="header-anchor" href="#有关hash类型数据的操作命令" aria-hidden="true">#</a> 有关hash类型数据的操作命令</h4><p>5)、redis中有关hash类型数据的操作命令：单key:field-value field-value ..... studentzs:id-1001 name-zhangsan age-20 a)将一个或者多个field-vlaue对设置到哈希表中：hset key filed1 value1 [field2 value2 ....] *如果key field已经存在，把value会把以前的值覆盖掉 hset stu1001 id 1001 hset stu1001 name zhangsan age 20 b)获取指定哈希表中指定field的值：hget key field hget stu1001 id hget stu1001 name c)批量将多个field-value对设置到哈希表中： hmset key filed1 value1 [field2 value2 ....] hmset stu1002 id 1002 name lisi age 20 d)批量获取指定哈希表中的field的值：hmget key field1 [field2 field3 ....] hmget stu1001 id name age e)获取指定哈希表中所有的field和value：hgetall key hgetall stu1002 f)从指定哈希表中删除一个或者多个field：hdel key field1 [field2 field3 ....] hdel stu1002 name age g)获取指定哈希表中所有的filed个数：hlen key hlen stu1001 hlen stu1002 h)判断指定哈希表中是否存在某一个field：hexists key field hexists stu1001 name hexists stu1002 name i)获取指定哈希表中所有的field列表：hkeys key hkeys stu1001 hkeys stu1002 j)获取指定哈希表中所有的value列表：hvals key hvals stu1001 hvals stu1002 k)对指定哈希表中指定field值进行整数加法运算：hincrby key field int hincrby stu1001 age 5 l)对指定哈希表中指定field值进行浮点数加法运算：hincrbyfloat key field float hset stu1001 score 80.5 hincrbyfloat stu1001 score 5.5 m)将一个field-vlaue对设置到哈希表中，当key-field已经存在时，则放弃设置；否则，设置file-value：hsetnx key field value hsetnx stu1001 age 30</p><h4 id="有关zset类型数据的操作命令" tabindex="-1"><a class="header-anchor" href="#有关zset类型数据的操作命令" aria-hidden="true">#</a> 有关zset类型数据的操作命令</h4><p>6)、redis中有关zset类型数据的操作命令：有序集合 本质上是集合，所有元素不能重复； 每一个元素都关联一个分数，redis会根据分数对元素进行自动排序； 分数可以重复； 既然有序集合中每一个元素都有顺序，那么也都有下标； 有序集合中元素的排序规则又列表中元素的排序规则不一样。 a)将一个或者多个member及其score值加入有序集合：zadd key score member [score member ....] *如果元素已经存在，则把分数覆盖 zadd zset01 20 z1 30 z2 50 z3 40 z4 zadd zset01 60 z2 b)获取指定有序集合中指定下标区间的元素：zrange key startIndex endIndex [withscores] zrange zset01 0 -1 zrange zset01 0 -1 withscores c)获取指定有序集合中指定分数区间(闭区间)的元素：zrangebyscore key min max [withscores] zrangebyscore zset01 30 50 withscores d)删除指定有序集合中一个或者多个元素：zrem key member [member......] zrem zset01 z3 z4 e)获取指定有序集合中所有元素的个数：zcard key zcard zset01 f)获取指定有序集合中分数在指定区间内的元素的个数：zcount key min max zcount zset01 20 50 g)获取指定有序集合中指定元素的排名(排名从0开始)： zrank key member zrank zset01 z4 ==&gt;2 h)获取指定有序集合中指定元素的分数：zscore key member zscore zset01 z4 i)获取指定有序集合中指定元素的排名(按照分数从大到小的排名):zrevrank key member zrevrank zset01 z4 ===&gt;1</p><h3 id="redis配置文件" tabindex="-1"><a class="header-anchor" href="#redis配置文件" aria-hidden="true">#</a> Redis配置文件</h3><p>13、redis的配置文件： 1)、redis安装完成之后，在redis的根沐会提供一个配置文件(redis.conf)；redis服务可以参考配置文件中的参数进行运行；只有启动redis服务器指定使用的配置文件，参数才会生效；否则，redis会采用默认的参数运行。 2)、redis配置信息： port：配置redis服务运行的端口号；如果不配置port，则redis服务默认使用6379端口。 bind: redis服务被客户端连接时，客户端所能使用的ip地址。 默认情况下，不配置bind，客户端连接redis服务时，通过服务器上任何一个ip都能连接到redis服务；一旦配置了bind，客户端就只能通过bind指定的ip地址连接redis服务。 一般情况下，bind都是配置服务器上某一个真实ip。</p><pre><code>      redis-cli ：默认连接127.0.0.1本机上的6379端口服务
      redis-cli -h 127.0.0.1 -p 6379：同上
      redis-cli -h 192.168.11.128 -p 6379：

      *强调：一旦redis服务配置了port和bind(如果port不是6379、bind也不是127.0.0.1)，客户端连接redis服务时，就要指定端口和ip：
         redis-cli：默认连接127.0.0.1上的6379服务
	 redis-cli -h bind绑定的ip地址 -p port设置的端口：连接bind绑定的ip地址主机上的port设置的端口redis服务；


	 关闭redis服务时：redis-cli -h bind绑定的ip地址 -p port设置的端口 shutdown
</code></pre><p>​</p><p>13、redis的配置文件：在redis根目录下提供redis.conf配置文件； 可以配置一些redis服务端运行时的一些参数； 如果不使用配置文件，那么redis会按照默认的参数运行； 如果使用配置文件，在启动redis服务时必须指定所使用的配置文件。 1)、redis配置文件中关于网络的配置： port：指定redis服务所使用的端口，默认使用6379。 bind: 配置客户端连接redis服务时，所能使用的ip地址，默认可以使用redis服务所在主机上任何一个ip都可以;一般情况下，都会配置一个ip，而且通常是一个真实。</p><pre><code>      如果配置了port和bind，则客户端连接redis服务时，必须指定端口和ip：
         redis-cli -h 192.168.11.128 -p 6380
	 redis-cli -h 192.168.11.128 -p 6380 shutdown
tcp-keepalive:连接保活策略。
2)、常规配置：
    loglevel:配置日志级别,开发阶段配置debug,上线阶段配置notice或者warning.
logfile：指定日志文件。redis在运行过程中，会输出一些日志信息；默认情况下，这些日志信息会输出到控制台；我们可以使用logfile配置日志文件，使redis把日志信息输出到指定文件中。
    databases：配置redis服务默认创建的数据库实例个数，默认值是16。
3)、安全配置：
    requirepass：设置访问redis服务时所使用的密码；默认不使用。
             此参数必须在protected-mode=yes时才起作用。
                 一旦设置了密码验证，客户端连接redis服务时，必须使用密码连接：redis-cli -h ip -p port -a pwd
</code></pre><h3 id="redis持久化" tabindex="-1"><a class="header-anchor" href="#redis持久化" aria-hidden="true">#</a> Redis持久化</h3><p>14、redis的持久化：redis提供持久化策略，在适当的时机采用适当手段把内存中的数据持久化到磁盘中，每次redis服务启动时，都可以把磁盘上的数据再次加载内存中使用。 1、RDB策略：在指定时间间隔内，redis服务执行指定次数的写操作，会自动触发一次持久化操作。 RDB策略是redis默认的持久化策略，redis服务开启时这种持久化策略就已经默认开启了。</p><pre><code>       save &lt;seconds&gt; &lt;changes&gt;：配置持久化策略
       dbfilename：配置redis RDB持久化数据存储的文件
       dir:    配置redis RDB持久化文件所在目录
</code></pre><p>2、AOF策略：采用操作日志来记录进行每一次写操作，每次redis服务启动时，都会重新执行一遍操作日志中的指令。 效率低下，redis默认不开启AOF功能。</p><pre><code>       appendonly:配置是否开启AOF策略
       appendfilename：配置操作日志文件
小结：根据数据的特点决定开启哪种持久化策略；
      一般情况，开启RDB足够了。
</code></pre><h3 id="redis事务" tabindex="-1"><a class="header-anchor" href="#redis事务" aria-hidden="true">#</a> Redis事务</h3><p>15、Redis的事务： 事务：把一组数据库命令放在一起执行，保证操作原子性，要么同时成功，要么同时失败。 Redis的事务：允许把一组redis命令放在一起，把命令进行序列化，然后一起执行，保证部分原子性。 1)multi：用来标记一个事务的开始。</p><pre><code>  multi
  set k1 v1
  set k2 v2

2)exec：用来执行事务队列中所有的命令。
  exec

3)redis的事务只能保证部分原子性：
  a)如果一组命令中，有在压入事务队列过程中发生错误的命令，则本事务中所有的命令都不执行，能够保证事务的原子性。
    multi
set k3 v3
seta kk vv
set k4 v4
exec
  b)如果一组命令中，在压入队列过程中正常，但是在执行事务队列命令时发生了错误，则只会影响发生错误的命令，不会影响其它命令的执行，不能够保证事务的原子性。
    multi
set k3 v3
incr k1
set k4 v4
exec
4)discard：清除所有已经压入队列中的命令，并且结束整个事务。
   multi
   set k5 v5 
   set k6 v6
   discard
5)watch：监控某一个键，当事务在执行过程中，此键代码的值发生变化，则本事务放弃执行；否则，正常执行。

  id balance version

  update table set balance=balance-dept,version=version+1
  where id=xxxx and version=100
</code></pre><p>​<br> ​ set balance 100 ​ set balance2 1000 ​ set version 1 ​<br> ​ watch version ​ multi ​ decrby balance 50 ​ incrby balance2 50 ​ exec ​ 6)unwatch：放弃监控所有的键。 ​ watch version ​ unwach ​ multi ​ decrby balance 50 ​ incrby balance2 50 ​ exec</p><h3 id="redis消息的发布与订阅" tabindex="-1"><a class="header-anchor" href="#redis消息的发布与订阅" aria-hidden="true">#</a> Redis消息的发布与订阅</h3><p>16、redis消息的发布与订阅： redis客户端订阅频道，消息的发布者往频道上发布消息，所有订阅此频道的客户端都能够接受到消息。 1)subscribe：订阅一个或者多个频道的消息。 subscribe ch1 ch2 ch3 2)publish：将消息发布到指定频道 publish ch1 hello 3)psubcribe：订阅一个或者多个频道的消息，频道名支持通配符。 subscribe news.*</p><h3 id="redis的主从复制" tabindex="-1"><a class="header-anchor" href="#redis的主从复制" aria-hidden="true">#</a> Redis的主从复制</h3><p>redis的主从复制：主少从多、主写从读、读写分离、主写同步复制到从。 搭建一主二从redis集群：</p><p>1)、搭建三台redis服务：使用一个redis模拟三台redis服务 提供三分redis配置文件：redis6379.conf、redis6380.conf、redis6381.conf 修改三份配置文件:以redis6379.conf为例 bind 127.0.0.1 port 6379 pidfile /var/run/redis_6379.pid logfile &quot;6379.log&quot; dbfilename dump6379.rdb 分别使用三个redis配置文件，启动三个redis服务： redis-server redis6379.conf &amp; redis-server redis6380.conf &amp; redis-server redis6381.conf &amp;</p><p>2)通过redis客户端分别连接三台redis服务： redis-cli -h 127.0.0.1 -p 6379 redis-cli -h 127.0.0.1 -p 6380 redis-cli -h 127.0.0.1 -p 6381</p><p>3)查看三台redis服务在集群中的主从角色： info replication 默认情况下，所有的redis服务都是主机，即都能写和读，但是都还没有从机。</p><p>4)先在6379进行写操作： set k1 v1 三台rdis服务互相独立，互不影响。</p><p>5)设置主从关系：设从不设主 在6380上执行：slaveof 127.0.0.1 6379 在6381上执行：slaveof 127.0.0.1 6379</p><p>6)全量复制：一旦主从关系确定，会自动把主库上已有的数据同步复制到从库。 在6380和6381上执行：keys *</p><p>7)增量复制：主库写数据会自动同步到从库。 在6379上执行：set k2 v2 在6380和6381上执行：keys *</p><p>8)主写从读，读写分离： 在6380和6381上执行：set k3 v3 ===&gt;报错</p><p>9)<code>主机宕机、从机原地待命</code>: 关闭6379服务：redis-cli -h 127.0.0.1 -p 6379 shutdown</p><pre><code> 查看6380和6381服务的主从角色：info replication
</code></pre><p>10)、主机恢复、一切恢复正常： 重启6379服务：redis-server redis6379.conf &amp; 客户端连接6379：redis-cli -h 127.0.0.1 -p 6379</p><p>11)、从机宕机、主机少一个从机、其它从机不变： 关闭6380服务： redis-cli -h 127.0.0.1 -p 6380 shutdown</p><pre><code> 查看6379服务的主从角色：info replication
 查看6381服务的主从角色：info replication
</code></pre><p>12)、从机恢复、需要重新设置主从关系： 重启6380服务：redis-server redis6380.conf &amp; 客户端连接6380：redis-cli -h 127.0.0.1 -p 6380</p><pre><code> 在6380上执行： slaveof 127.0.0.1 6379
</code></pre><p>13)、从机上位： a)主机宕机、从机原地待命： 关闭6379服务：redis-cli -h 127.0.0.1 -p 6379 shutdown 查看6380和6381服务的主从角色：info replication b)从机断开原来主从关系： 在6380上执行：slaveof no one 查看6380服务的主从角色：info replication c)重新设置主从关系： 在6381上执行：slaveof 127.0.0.1 6380 d)之前主机恢复、变成孤家寡人： 重启6379服务：redis-server redis6379.conf &amp; 客户端连接6379：redis-cli -h 127.0.0.1 -p 6379 e)天堂变地狱： 在6379上执行：slaveof 127.0.0.1 6381 在6381上执行：info replication 既是主机又是从机</p><p>小结：一台主机配置多台从机，一台从机又可以配置多台从机，从而形成一个庞大的集群架构。 减轻一台主机的压力，但是增加了服务间的延迟时间。</p><h3 id="redis哨兵模式" tabindex="-1"><a class="header-anchor" href="#redis哨兵模式" aria-hidden="true">#</a> Redis哨兵模式</h3><p>18、redis哨兵模式：主机宕机、从机上位的自动版。 1)搭建一主二从集群架构：(17节前五步) 2)提供哨兵配置文件： 在redis安装目下创建配置文件：redis_sentinel.conf sentinel monitor dc-redis 127.0.0.1 6379 1 3)启动哨兵服务： redis-sentinel redis_sentinel.conf 4)<code>主机宕机</code>： 关闭6379服务：redis-cli -h 127.0.0.1 -p 6379 shutdown 哨兵程序<code>自动选择从机上位</code>。 5)之前主机恢复：自动从属于新的主机。 重启6379服务：redis-server redis6379.conf &amp; 客户端连接6379：redis-cli -h 127.0.0.1 -p 6379</p><p>停止哨兵</p><p>1.查看哨兵端口</p>`,224),u={href:"https://so.csdn.net/so/search?q=grep&spm=1001.2101.3001.7020",target:"_blank",rel:"noopener noreferrer"},h=e("p",null,"2.客户端连接哨兵端口",-1),p=e("p",null,"redis-cli -p 26379",-1),v=e("p",null,"3.shutdown",-1),b=e("h3",{id:"jedis",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#jedis","aria-hidden":"true"},"#"),i(" Jedis")],-1),k=e("p",null,"19、java操作redis数据库：jedis是redis官方提供的操作redis数据的技术。 把所有的redis指令都定义成java工具类的方法，方法名和redis的指令名完全一样； 开发通过程序访问redis，只需要使用工具类及其方法即可。",-1),m=e("pre",null,[e("code",null,`在java程序中访问redis：
   1)创建maven版的java工程
   2)添加jedis依赖
      <dependency>
        <groupId>redis.clients</groupId>
        <artifactId>jedis</artifactId>
        <version>3.1.0</version>
    </dependency>
   3)创建Jedis连接
 *关闭linux的防火墙systemctl stop firewalld


redis-cli -h ip -p port

keys *
`)],-1);function g(x,y){const d=s("ExternalLinkIcon");return n(),l("div",null,[c,e("p",null,[i("ps -ef|"),e("a",u,[i("grep"),r(d)]),i(" redis")]),h,p,v,b,k,m])}const q=a(o,[["render",g],["__file","myNote_Redis.html.vue"]]);export{q as default};
