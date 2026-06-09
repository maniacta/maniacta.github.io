---
title: Docker 从入门到实践完全指南
description: ''
pubDate: '2026-05-18'
tags:
  - 环境配置
  - Docker
keywords: 环境配置,Docker
---



# Docker 从入门到实践完全指南

## 第一部分：Docker 是什么？为什么需要它？

### 1.1 核心概念

在没有 Docker 之前，部署应用常常遇到“在我电脑上能跑”的问题。Docker 解决了环境一致性的问题。

- **镜像**：类似于一个“类”或者“模版”，是只读的。例如：Ubuntu 系统镜像、安装了 Nginx 的镜像。
- **容器**：类似于“实例”，是镜像的运行态。你可以通过一个镜像创建多个互不干扰的容器。
- **仓库**：存放镜像的地方。公共仓库（Docker Hub）类似于 GitHub，你可以上传（Push）和下载（Pull）镜像。

### 1.2 架构简图

​`Client -> Server -> Registry`

- **Client**：我们敲命令的地方。
- **Server/守护进程**：后台运行的程序，负责构建、运行、分发容器。
- **Registry**：镜像仓库，默认是 Docker Hub。

---

## 第二部分：Docker 的详细安装

### 2.1 CentOS 7 安装 Docker

```bash
# 1. 卸载旧版本（如有）
sudo yum remove docker \
                  docker-client \
                  docker-client-latest \
                  docker-common \
                  docker-latest \
                  docker-latest-logrotate \
                  docker-logrotate \
                  docker-engine

# 2. 安装依赖包
sudo yum install -y yum-utils

# 3. 设置镜像仓库（更换为中科大源）
sudo yum-config-manager \
    --add-repo \
    https://mirrors.ustc.edu.cn/docker-ce/linux/centos/docker-ce.repo

# 4. 安装 Docker 引擎
sudo yum install -y docker-ce docker-ce-cli containerd.io

# 5. 启动 Docker 并设置开机自启
sudo systemctl start docker
sudo systemctl enable docker

# 6. 验证安装
docker version
sudo docker run hello-world
```

### 2.2 Ubuntu 安装 Docker

```bash
# 1. 更新包索引
sudo apt-get update

# 2. 安装依赖
sudo apt-get install -y \
    apt-transport-https \
    ca-certificates \
    curl \
    gnupg-agent \
    software-properties-common

# 3. 添加 Docker 的 GPG 密钥（更换为中科大源）
curl -fsSL https://mirrors.ustc.edu.cn/docker-ce/linux/ubuntu/gpg | sudo apt-key add -

# 4. 设置稳定版仓库（更换为中科大源）
sudo add-apt-repository \
   "deb [arch=amd64] https://mirrors.ustc.edu.cn/docker-ce/linux/ubuntu \
   $(lsb_release -cs) \
   stable"

# 5. 安装 Docker
sudo apt-get update
sudo apt-get install -y docker-ce docker-ce-cli containerd.io

# 6. 启动并设置自启
sudo systemctl start docker
sudo systemctl enable docker
```

### 2.3 macOS & Windows (图形化)

直接下载 Docker Desktop：[https://www.docker.com/products/docker-desktop/](https://www.docker.com/products/docker-desktop/)

**配置镜像加速（修改 Docker Engine 的 JSON）**   
打开 Docker Desktop → Settings → Docker Engine，修改为：

```json
{
  "registry-mirrors": [
    "https://docker.mirrors.ustc.edu.cn",
    "https://registry.docker-cn.com"
  ]
}
```

 *（macOS Apple Silicon 用户记得勾选 “Use Rosetta for x86/amd64 emulation”）*

---

## 第三部分：配置镜像加速（Linux 必做）

替换为中科大 Docker Hub 镜像源：

```bash
sudo mkdir -p /etc/docker
sudo tee /etc/docker/daemon.json <<-'EOF'
{
  "registry-mirrors": [
    "https://docker.mirrors.ustc.edu.cn",
    "https://registry.docker-cn.com"
  ]
}
EOF

# 重启服务
sudo systemctl daemon-reload
sudo systemctl restart docker
```

推荐一键换源脚本：[使用方法 - LinuxMirrors](https://linuxmirrors.cn/use/)

---

## 第四部分：Docker 常用命令详解

这是核心部分，按功能分类整理。

### 4.1 镜像操作

|命令|含义|示例|
| :------------| :-----------------------------| :-------------------------------------------------|
|docker images|查看本地所有镜像|docker images|
|docker search|搜索仓库镜像|docker search nginx|
|docker pull|下载镜像（不加版本号下载最新）|docker pull nginx:1.21|
|docker rmi|删除镜像|docker rmi nginx:1.21 或 docker rmi 镜像 ID|
|docker save|导出镜像为压缩包|docker save -o nginx.tar nginx:latest|
|docker load|导入压缩包为镜像|docker load -i nginx.tar|
|docker tag|给镜像打标签（重命名）|docker tag 原镜像 ID 新名:版本|
|docker commit|将容器保存为新的镜像|docker commit -m="描述" -a="作者" 容器 ID 新镜像名|

### 4.2 容器生命周期管理

#### 创建并启动（核心命令：`docker run`）

这是最重要的命令，包含众多参数：

```bash
docker run [可选参数] 镜像名 [命令]
```

**常用参数解析：**

- ​`--name`：给容器起个名字。
- ​`-d`：后台运行（守护态）。
- ​`-it`​：交互式运行，通常跟 `/bin/bash` 组合。
- ​`-p`​：端口映射 **​`宿主机端口：容器内端口`​**​。例如 `-p 8080：80`。
- ​`-v`​：文件挂载 **​`宿主机绝对路径：容器内路径`​**​。例如 `-v /data：/var/lib/mysql`。
- ​`-e`​：设置环境变量。例如 `-e MYSQL_ROOT_PASSWORD=123456`。
- ​`--restart=always`：容器退出后总是自动重启。
- ​`--rm`：容器退出后自动删除，通常用于临时测试。

**示例：**

```bash
# 示例1：运行一个 Nginx 服务器
docker run -d --name my-nginx -p 8080：80 nginx

# 示例2：进入 CentOS 内部调试
docker run -it --name test-centos centos：7 /bin/bash

# 示例3：运行 MySQL 并自动配置密码
docker run -d \
  --name my-mysql \
  -p 3306：3306 \
  -e MYSQL_ROOT_PASSWORD=root123 \
  -v /home/mysql/data：/var/lib/mysql \
  --restart=always \
  mysql：8.0
```

#### 容器查看与启停

|命令|含义|示例|
| :---| :---------------------------------| :---|
|`docker ps`|列出**正在运行**的容器|`docker ps`|
|`docker ps -a`|列出**所有**（包括已停止）容器|`docker ps -a`|
|`docker start`|启动已停止的容器|`docker start my-nginx`|
|`docker stop`|停止容器（优雅停止）|`docker stop my-nginx`|
|`docker restart`|重启容器|`docker restart my-nginx`|
|`docker rm`|删除容器（需先停止，或加 `-f` 强制）|`docker rm 容器ID`|
|`docker logs`|查看容器日志（加 `-f` 实时跟踪）|`docker logs -f my-nginx`|
|`docker exec`|进入正在运行的容器执行命令|`docker exec -it my-nginx /bin/bash`|
|`docker cp`|宿主机与容器之间复制文件|`docker cp a.txt 容器ID：/tmp/`|

### 4.3 系统信息与清理

|命令|含义|
| :---| :---------------------------------------------------|
|`docker info`|查看 Docker 系统信息|
|`docker system df`|查看 Docker 所占磁盘空间|
|`docker stats`|实时监控所有容器资源消耗（类似 top）|
|`docker system prune`|**重要**：清理所有停止的容器、无用镜像、网络（万能清理命令）|

---

## 第五部分：Docker 数据卷详解

如果容器被删除，里面的数据会丢失。数据卷用来持久化数据。

#### 5.1 匿名卷与命名卷

```bash
# 匿名卷（不建议，不好管理）
docker run -d --name nginx -v /var/lib/mysql mysql

# 命名卷（推荐）
docker run -d --name nginx -v mysql-data：/var/lib/mysql mysql
```

**数据卷常用命令：**

```bash
docker volume ls   		    # 查看所有卷
docker volume prune		    # 清理无用卷
docker inspect 容器名  	    # 查看容器挂载详情（在 Mounts 字段）
```

---

## 第六部分：Dockerfile 编写与镜像构建

当你需要定制自己的应用环境时，就需要编写 Dockerfile。

#### 6.1 常用指令

- **FROM**：指定基础镜像。`FROM java：8`
- **MAINTAINER**：维护者信息。
- **RUN**：构建镜像时执行的 Shell 命令。
- **COPY**：将宿主机文件复制到镜像。
- **ADD**：类似 COPY，但支持自动解压 tar 包和 URL 下载（不推荐用于下载）。
- **WORKDIR**：指定工作目录。
- **EXPOSE**：声明容器运行时监听的端口。
- **CMD**：容器启动时默认执行的命令（只能有一个，会被 docker run 后的参数覆盖）。
- **ENTRYPOINT**：容器启动时的入口程序（不会被覆盖，与 CMD 结合使用）。

#### 6.2 实战：构建一个 Spring Boot 应用镜像

假设你有一个 `app.jar` 文件。

**1. 编写 Dockerfile（文件名为 Dockerfile，无后缀）**

```dockerfile
FROM openjdk：8-jre-alpine
MAINTAINER zhangsan

# 设置工作目录
WORKDIR /app

# 复制 jar 包
COPY app.jar /app/app.jar

# 暴露端口
EXPOSE 8080

# 启动命令
ENTRYPOINT ["java"， "-jar"， "app.jar"]
```

**2. 构建镜像**
在 Dockerfile 所在目录执行：

```bash
# -t 指定标签，后面的 . 代表构建上下文（当前目录）
docker build -t my-app：v1.0 .
```

**3. 运行镜像**

```bash
docker run -d -p 80：8080 my-app：v1.0
```

---

## 第七部分：Docker Compose

当项目包含多个容器（如 Web + Redis + MySQL + Nginx）时，每次都敲 `docker run` 太麻烦。Compose 用 YAML 文件来编排。

#### 7.1 安装 Docker Compose

Linux 下需要单独安装：

```bash
# 下载二进制文件（版本号建议去 GitHub 看最新）
sudo curl -L "https：//github.com/docker/compose/releases/download/v2.20.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose

# 赋予执行权限
sudo chmod +x /usr/local/bin/docker-compose
```

macOS/Windows 的 Docker Desktop 自带 Compose。

#### 7.2 编写 docker-compose.yml

**场景：部署一个 WordPress 博客（需要 MySQL + WordPress）**

```yaml
version： '3.8'
services：
  db：
    image： mysql：5.7
    volumes：
      - db_data：/var/lib/mysql
    restart： always
    environment：
      MYSQL_ROOT_PASSWORD： somewordpress
      MYSQL_DATABASE： wordpress
      MYSQL_USER： wordpress
      MYSQL_PASSWORD： wordpress

  wordpress：
    depends_on：
      - db
    image： wordpress：latest
    ports：
      - "8000：80"
    restart： always
    environment：
      WORDPRESS_DB_HOST： db：3306
      WORDPRESS_DB_USER： wordpress
      WORDPRESS_DB_PASSWORD： wordpress
      WORDPRESS_DB_NAME： wordpress

volumes：
  db_data： {}
```

#### 7.3 常用 Compose 命令

```bash
# 后台启动所有服务
docker-compose up -d

# 查看日志
docker-compose logs -f

# 停止并删除所有容器、网络
docker-compose down

# 重新构建镜像（如果 Dockerfile 变化）
docker-compose up -d --build
```

---

## 第八部分：高级技巧与排错

### 8.1 网络模式

- **bridge**（默认）：桥接模式，容器间通过 IP 互通。
- **host**：直接使用宿主机网络，性能最好但端口冲突风险大。
- **none**：无网络。
- **自定义网络**：`docker network create my-net`​，然后 `docker run --network my-net`，这样容器间可以用容器名互相 ping 通。

### 8.2 日志过大问题

生产环境容器运行久了，日志文件会撑满硬盘，需要限制：

```bash
# 在 daemon.json 全局配置，或者 docker run 时指定参数
docker run --log-opt max-size=50m --log-opt max-file=3 nginx
```

### 8.3 调试技巧

- **容器起不来怎么办？**

  1. 先看日志：`docker logs 容器ID`
  2. 用 `-it` 跑起前台进程：看报错信息。
  3. 进入一个已退出的容器查看文件结构：

     ```bash
     docker commit 容器ID debug-image
     docker run -it debug-image /bin/bash
     ```

‍

‍
