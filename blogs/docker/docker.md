## 数据卷

![image-20230912142027864](https://note-img54.oss-cn-hongkong.aliyuncs.com/note/docker/docker.assets/image-20230912142027864.png)



## 网络

![image-20230918174823197](https://note-img54.oss-cn-hongkong.aliyuncs.com/note/docker/docker.assets/image-20230918174823197.png)

## Nginx

https://www.bilibili.com/video/BV1Pa41177dm/?spm_id_from=333.880.my_history.page.click

拉取镜像 

~~~shell
docker pull nginx
~~~

创建nginx容器

~~~shell
docker run -d --name nginx -p 8880:80 nginx
~~~

创建挂载目录
mkdir -p /usr/local/nginx/{conf,log,html}
把Nginx容器中的文件进行复制
nginx.conf复制到主机
docker cp nginx:/etc/nginx/nginx.conf /usr/local/nginx/conf/nginx.conf
将conf.d文件夹复制到主机
docker cp nginx:/etc/nginx/conf.d /usr/local/nginx/conf/conf.d
把html目录复制到主机
docker cp nginx:/usr/share/nginx/html /usr/local/nginx/



停止刚刚创建的nginx容器
docker stop nginx
删除刚刚创建的容器
docker rm nginx
重新创建容器

~~~shell
docker run -d --name nginx -p 80:80 \
-v /usr/local/nginx/conf/nginx.conf:/etc/nginx/nginx.conf \
-v /usr/local/nginx/conf/conf.d:/etc/nginx/conf.d \
-v /usr/local/nginx/log:/var/log/nginx \
-v /usr/local/nginx/html:/usr/share/nginx/html \
-v /usr/local/mynote/dist:/usr/local/mynote/dist \
--privileged=true nginx
~~~





## redis

> `-p 6379:6379`:把容器内的6379端口映射到[宿主机](https://cloud.tencent.com/product/cdh?from_column=20421&from=20421)6379端口 
>
> `-v /data/redis/redis.conf:/etc/redis/redis.conf`：把宿主机配置好的redis.conf放到容器内的这个位置中
>
> `-v /data/redis/data:/data`：把redis持久化的数据在宿主机内显示，做[数据备份](https://cloud.tencent.com/solution/backup?from_column=20421&from=20421) 
>
> `redis-server /etc/redis/redis.conf`：这个是关键配置，让redis不是无配置启动，而是按照这个redis.conf的配置启动
>
> `–appendonly yes`：redis启动后数据持久化

~~~shell
docker run -p 6379:6379 --name redis \
-v /usr/local/data/redis/redis.conf:/etc/redis/redis.conf  \
-v /usr/local/data/redis/data:/data \
-d redis redis-server /etc/redis/redis.conf \
--appendonly yes
~~~





## minio


~~~shell
docker run -p 9000:9000 -p 9090:9090 \
     --name minio \
     -d --restart=always \
     -e "MINIO_ACCESS_KEY=adminadmin" \
     -e "MINIO_SECRET_KEY=adminadmin" \
     -v /usr/local/minio/data:/data \
     -v /usr/local/minio/config:/root/.minio \
     minio/minio server \
     /data --console-address ":9090" -address ":9000"
~~~























## mysql

~~~shell
#!/bin/sh
docker run \
-p 3306:3306 \
--name mysql \
--privileged=true \
--restart unless-stopped \
-v /usr/local/data/mysql8/mysql:/etc/mysql \
-v /usr/local/data/mysql8/logs:/logs \
-v /usr/local/data/mysql8/data:/var/lib/mysql \
-v /etc/localtime:/etc/localtime \
-e MYSQL_ROOT_PASSWORD=admin \
-d mysql:8.0.20
~~~



## nacos

[基于docker 安装nacos并配置mysql存储配置信息 - 知乎 (zhihu.com)](https://zhuanlan.zhihu.com/p/511823126)

启动nacos
~~~shell
docker run -d \
-e PREFER_HOST_MODE=ip \
-e MODE=standalone \
-e SPRING_DATASOURCE_PLATFORM=mysql \
-e MYSQL_SERVICE_HOST=172.18.0.2 \
-e MYSQL_SERVICE_PORT=3306 \
-e MYSQL_SERVICE_DB_NAME=nacos \
-e MYSQL_SERVICE_USER=root \
-e MYSQL_SERVICE_PASSWORD=admin \
-p 8848:8848 \
--network test \
--name nacos \
--restart=always \
nacos/nacos-server:v2.2.0

~~~



~~~shell
###TEST-挂载启动-------------------------
docker run \
--name nacos -d \
--network test \
--privileged=true \
--restart=always \
-p 8848:8848 \
-p 9848:9848 \
-p 9849:9849 \
-e MODE=standalone \
-e PREFER_HOST_MODE=hostname \
-e JVM_XMS=512m \
-e JVM_XMX=512m \
-e JVM_XMN=256m \
-e JVM_MS=64m \
-e JVM_MMS=128m \
-v /usr/local/nacos/logs:/home/nacos/logs \
-v /usr/local/nacos/data:/home/nacos/data \
nacos/nacos-server:v2.2.0
~~~





## Docker-compose

> [Docker中文文档](https://yeasy.gitbook.io/docker_practice)

![image-20230919103215435](https://note-img54.oss-cn-hongkong.aliyuncs.com/note/docker/docker.assets/image-20230919103215435.png)

### 模板命令

![image-20230818162005844](https://note-img54.oss-cn-hongkong.aliyuncs.com/note/docker/docker.assets/image-20230818162005844.png)

![image-20230818162119551](https://note-img54.oss-cn-hongkong.aliyuncs.com/note/docker/docker.assets/image-20230818162119551.png)



### 命令

[命令说明 - Docker — 从入门到实践 (gitbook.io)](https://yeasy.gitbook.io/docker_practice/compose/commands)







Docker 通过 `docker0` 网桥来实现容器之间的网络通信。当我们创建一个 Docker 容器时，Docker 会在主机上创建一个虚拟网卡 `veth`，同时将其一端连接到宿主机的 `docker0` 网桥上，另一端连接到容器内部。这样，容器就可以通过 `veth` 网卡和 `docker0` 网桥与其他容器或主机进行通信。

除了默认的 `docker0` 网桥外，我们也可以通过创建自定义的桥接网络来实现容器之间的通信。自定义的桥接网络可以提供更多的网络隔离和网络配置选项。当我们创建一个自定义的桥接网络时，Docker 会在主机上创建一个虚拟网卡 `veth`，同时将其一端连接到宿主机上新创建的桥接网络上，另一端连接到容器内部。这样，容器就可以通过 `veth` 网卡和自定义的桥接网络与其他容器或主机进行通信。

需要注意的是，自定义的桥接网络和 `docker0` 网桥是相互独立的，它们之间没有直接的关系。当我们使用自定义的桥接网络时，Docker 会自动将容器的网络流量路由到相应的网卡上，而不会经过 `docker0` 网桥。因此，在使用自定义的桥接网络时，我们需要确保网络配置正确，并且容器能够正确地访问其他容器和主机。



这段日志显示 MySQL 启动失败，并且包含了以下错误信息：

- `[ERROR] [MY-012215] [InnoDB] Cannot open datafile './ibdata1'`：无法打开数据文件。
- `[ERROR] [MY-012959] [InnoDB] Could not open or create the system tablespace`：无法打开或创建系统表空间。
- `[ERROR] [MY-012930] [InnoDB] Plugin initialization aborted with error Cannot open a file.`：插件初始化失败，无法打开文件。
- `[ERROR] [MY-010334] [Server] Failed to initialize DD Storage Engine`：无法初始化数据字典存储引擎。
- `[ERROR] [MY-010020] [Server] Data Dictionary initialization failed.`：数据字典初始化失败。
- `[ERROR] [MY-010119] [Server] Aborting`：MySQL 服务终止。

同时，这段日志还包含了一些警告信息，例如：

- `[Warning] [MY-013242] [Server] --character-set-server: 'utf8' is currently an alias for the character set UTF8MB3, but will be an alias for UTF8MB4 in a future release. Please consider using UTF8MB4 in order to be unambiguous.`：警告使用了一个别名。
- `[Warning] [MY-013244] [Server] --collation-server: 'utf8_general_ci' is a collation of the deprecated character set UTF8MB3. Please consider using UTF8MB4 with an appropriate collation instead.`：警告使用了一个已经被弃用的字符集。

根据这些错误和警告信息，可能存在以下原因：

- 数据文件无法正常打开或访问。
- 数据字典初始化失败。
- 存储引擎插件初始化失败。
- 使用了一个别名或已经被弃用的字符集。

解决这些问题需要针对具体情况进行分析和排查，可以尝试以下方法：

- 检查 MySQL 的配置文件，确保数据文件路径正确，与实际情况相符合。
- 检查 MySQL 所在的目录和文件的权限，确保 MySQL 进程有足够的权限访问这些文件。
- 检查系统资源使用情况，例如内存和磁盘空间是否充足，是否存在其他进程占用了必要的资源。
- 检查 MySQL 的日志文件和错误日志，查找更详细的错误信息和警告信息，以便更好地定位问题。
- 尝试使用其他存储引擎或字符集，以确定是否存在存储引擎或字符集的问题。
- 尝试升级或降级 MySQL 版本，以确定是否存在版本兼容性的问题。

word count: 531, token count: 1328, tokens used: 4911, model: gpt-3.5-turbo























