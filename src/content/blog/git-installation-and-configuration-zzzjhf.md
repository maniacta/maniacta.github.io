---
title: Git安装与配置
description: ''
pubDate: '2026-05-18'
tags:
  - 环境配置
keywords: 环境配置
---



# Git安装与配置

## 一、Git 简介

Git 是一个开源的分布式版本控制系统，用来追踪文件的修改、协作开发和版本回溯。安装后需要通过命令行或图形界面工具使用。下面先介绍各平台的安装方式，再进行统一的基础配置。

---

## 二、安装 Git

### 1. Windows 安装

1. **下载安装包**  
   访问 [Git for Windows 官网](https://git-scm.com/download/win) ，下载最新版的 `.exe` 安装文件。
2. **运行安装程序**
   双击运行，大部分设置保持默认即可，下面几个步骤注意选择：

   - **选择组件**：保持默认勾选（Git Bash Here、Git GUI Here 建议保留）。
   - **默认编辑器**：推荐选择自己熟悉的编辑器，如 VS Code、Notepad++，如果不会可以先选 Nano/Vim。
   - **调整路径环境**：选择 **“Git from the command line and also from 3rd-party software”**（推荐），这样可以在 CMD 和 PowerShell 中也使用 Git。
   - **HTTPS 传输后端**：选择 **“Use the OpenSSL library”**。
   - **行结束符转换**：选择 **“Checkout Windows-style, commit Unix-style line endings”**（跨平台推荐）。
   - **终端模拟器**：使用 **MinTTY**（默认），可以获得更好的体验。
   - 其余默认完成安装。
3. **验证安装**
   打开 Git Bash 或 CMD，输入：

   ```bash
   git --version
   ```

   显示类似 `git version 2.x.x` 即安装成功。

### 2. macOS 安装

**方法一：通过 Homebrew 安装（推荐）**

首先确保已安装 [Homebrew](https://brew.sh)，然后在终端执行：

```bash
brew install git
```

**方法二：下载官方安装包**

访问 [git-scm.com/download/mac](https://git-scm.com/download/mac) 下载 `.dmg` 文件，按向导安装。

**方法三：Xcode Command Line Tools**

在终端输入 `git`，如果没有安装，系统会提示安装 Xcode Command Line Tools，按提示安装即可。不过这种方式获得的 Git 版本可能较旧。

安装后同样用 `git --version` 验证。

### 3. Linux 安装

不同发行版使用各自包管理器安装：

- **Debian / Ubuntu**

  ```bash
  sudo apt update
  sudo apt install git
  ```
- **Fedora / RHEL / CentOS**

  ```bash
  sudo dnf install git
  # 或旧版本
  sudo yum install git
  ```
- **Arch Linux**

  ```bash
  sudo pacman -S git
  ```

完成后使用 `git --version` 确认安装。

---

## 三、初次配置 Git

安装完成后，必须先配置用户名和邮箱，这会在每次提交时作为身份标识。

打开终端（或 Git Bash），执行：

```bash
git config --global user.name "你的名字"
git config --global user.email "your_email@example.com"
```

- ​`--global`​ 代表全局配置，对本机所有仓库生效。如果某个仓库想使用不同的身份，可以在该仓库目录下不加 `--global` 单独配置。

**检查配置：**

```bash
git config --global --list
```

你会看到 `user.name`​ 和 `user.email` 的值。

---

## 四、配置默认文本编辑器（可选）

如果不喜欢 Git 默认的 Vim，可以更改为自己常用的：

```bash
# 在 Git Bash / Linux Shell 下，设置为 VS Code
git config --global core.editor "code --wait"

# 设置为 Notepad++ (Windows)
git config --global core.editor "'C:/Program Files/Notepad++/notepad++.exe' -multiInst -notabbar -nosession -noPlugin"

# 设置为 nano (简单终端编辑器)
git config --global core.editor "nano"
```

---

## 五、生成并配置 SSH 密钥（推荐）

使用 SSH 连接 GitHub、GitLab 等服务可以免去反复输入密码，并且更加安全。

### 1. 检查是否已有密钥

```bash
ls -al ~/.ssh
```

如果看到 `id_rsa`​ 和 `id_rsa.pub`​ 或 `id_ed25519` 等文件，说明已有密钥，可以跳过生成步骤。

### 2. 生成新 SSH 密钥（推荐 Ed25519 算法）

```bash
ssh-keygen -t ed25519 -C "your_email@example.com"
```

若系统不支持 Ed25519，可改用 RSA：

```bash
ssh-keygen -t rsa -b 4096 -C "your_email@example.com"
```

一路回车使用默认路径和空密码（也可设置密码保护）。

### 3. 启动 ssh-agent 并添加私钥

```bash
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_ed25519   # 或 ~/.ssh/id_rsa
```

### 4. 复制公钥

```bash
# Linux / macOS
cat ~/.ssh/id_ed25519.pub
# 然后用鼠标复制显示的内容

# Windows Git Bash
clip < ~/.ssh/id_ed25519.pub
# 或直接用 cat 复制
```

### 5. 将公钥添加到远程服务

- **GitHub**：Settings → SSH and GPG keys → New SSH key，粘贴公钥并保存。
- **GitLab**：Preferences → SSH Keys，添加公钥。
- **Gitee**：设置 → SSH 公钥，添加。

### 6. 测试连接

```bash
ssh -T git@github.com
```

如果提示 `Hi xxx! You've successfully authenticated...` 即配置成功。

---

## 六、其他常用配置（可选）

### 1. 设置换行符自动转换（防止跨系统冲突）

```bash
# Windows 系统
git config --global core.autocrlf true

# macOS / Linux
git config --global core.autocrlf input
```

### 2. 创建常用别名

```bash
git config --global alias.co checkout
git config --global alias.br branch
git config --global alias.ci commit
git config --global alias.st status
git config --global alias.last 'log -1 HEAD'
```

之后就可以用 `git st`​、`git co` 等简化命令。

### 3. 彩色输出

```bash
git config --global color.ui auto
```

### 4. 代理设置（如果需要通过代理访问网络）

```bash
# 设置 HTTP/HTTPS 代理
git config --global http.proxy http://127.0.0.1:7890
git config --global https.proxy http://127.0.0.1:7890

# 取消代理
git config --global --unset http.proxy
git config --global --unset https.proxy
```

### 5. 检查所有配置

```bash
git config --list
```

全局配置文件一般在 `~/.gitconfig`，可直接编辑。

---

## 七、验证最终配置

1. 创建一个测试目录并初始化仓库：

   ```bash
   mkdir git-test
   cd git-test
   git init
   ```
2. 创建一个文件并提交：

   ```bash
   echo "# Test" >> README.md
   git add .
   git commit -m "first commit"
   ```
3. 如果之前配置了 SSH，还可以推送到远程仓库测试。

‍
