---
title: Tips
date: '2024-09-05 11:49:07'
updated: '2026-02-27 16:13:33'
permalink: /post/tips-ytpgo.html
comments: true
toc: true
---



# Tips

# Pip源

## 中科大

```cmd
https://pypi.mirrors.ustc.edu.cn/simple/
```

## 清华

```cmd
https://pypi.tuna.tsinghua.edu.cn/simple
```

# git

## 初始化

```cmd
git config --global user.name "maniact"
git config --global user.email maniact@qq.com
```

## VPN

```cmd
git config --global http.proxy 'socks5://127.0.0.1:49792'
```

# Conda

## conda换源

选择下面一个镜像站的代码复制并替换下面文件中的全部内容，windows为`C:\用户\你的用户名\.condarc`​，Linux为`/home/你的用户名/.condarc`​。（若没有这个文件就新建一个，注意文件名为`.condarc`，不要有任何其他后缀）

- [清华大学开源软件镜像站](https://mirrors.tuna.tsinghua.edu.cn/)（**推荐**）

```python
channels:
  - defaults
show_channel_urls: true
channel_alias: https://mirrors.tuna.tsinghua.edu.cn/anaconda
default_channels:
  - https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/main
  - https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/free
  - https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/r
  - https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/pro
  - https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/msys2
custom_channels:
  conda-forge: https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud
  msys2: https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud
  bioconda: https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud
  menpo: https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud
  pytorch: https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud
  simpleitk: https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud
```

- [上海交通大学开源镜像站](https://mirrors.sjtug.sjtu.edu.cn/#/)

```python
default_channels:
  - https://anaconda.mirrors.sjtug.sjtu.edu.cn/pkgs/r
  - https://anaconda.mirrors.sjtug.sjtu.edu.cn/pkgs/main
custom_channels:
  conda-forge: https://anaconda.mirrors.sjtug.sjtu.edu.cn/cloud/
  pytorch: https://anaconda.mirrors.sjtug.sjtu.edu.cn/cloud/
channels:
  - defaults
```

- [中国科学技术大学 USTC Mirror](https://mirrors.ustc.edu.cn/)

```python
channels:
  - https://mirrors.ustc.edu.cn/anaconda/pkgs/main/
  - https://mirrors.ustc.edu.cn/anaconda/pkgs/free/
  - https://mirrors.ustc.edu.cn/anaconda/cloud/conda-forge/
ssl_verify: true
```

## 查看conda版本

```cmd
conda --version
```

## 查看conda环境配置

```cmd
conda config --show
```

## 更新conda

```cmd
conda update conda
```

## 创建环境

```cmd
conda create -n env_name python=x.xx
```

## 查看环境列表

```cmd
conda env list
conda info -e
conda info --envs
```

## 激活环境

```cmd
conda activate env_name
```

## 删除环境

```cmd
conda remove --name env_name --all
```

## 清理conda缓存

```cmd
conda clean -p      # 删除没有用的包 --packages
conda clean -t      # 删除tar打包 --tarballs
conda clean -y -all # 删除所有的安装包及cache(索引缓存、锁定文件、未使用过的包和tar包)
```

# UV

## 安装

[下载](https://github.com/astral-sh/uv/releases)解压到目标目录

## 环境变量

```cmd
uv cache dir          # 查看缓存路径  UV_CACHE_DIR、UV_PYTHON_CACHE_DIR
uv python dir         # 查看python安装路径  UV_PYTHON_INSTALL_DIR
uv python dir --bin   # 查看python bin安装路径  UV_PYTHON_BIN_DIR
uv tool dir           # 查看工具安装路径  UV_TOOL_DIR
uv tool dir --bin     # 查看工具安装路径  UV_TOOL_BIN_DIR
```

提前创建空目录和空文件uv.toml

```cmd
setx UV_HOME "D:\uv" # 替换为安装时选择的目录
setx UV_CACHE_DIR "%UV_HOME%\cache"
setx UV_CONFIG_FILE "%UV_HOME%\uv.toml"
setx UV_INSTALL_DIR "%UV_HOME%\bin"
setx UV_PYTHON_BIN_DIR "%UV_HOME%\bin"
setx UV_PYTHON_CACHE_DIR "%UV_HOME%\cache"
setx UV_PYTHON_INSTALL_DIR "%UV_HOME%\python"
setx UV_TOOL_BIN_DIR "%UV_HOME%\bin"
setx UV_TOOL_DIR "%UV_HOME%\tools"
```

Path变量增加uv\bin

## 换源

```toml
python-install-mirror = "https://mirror.nju.edu.cn/github-release/astral-sh/python-build-standalone/"

[[index]]
name = "ustc" # 中科大源
url = "https://pypi.mirrors.ustc.edu.cn/simple/"
default = true

[[index]]
name = "tsinghua" # 清华源
url = "https://pypi.tuna.tsinghua.edu.cn/simple"


[[index]]
name = "aliyun" # 阿里云源
url = "https://mirrors.aliyun.com/pypi/simple/"

```

## 创建环境

```cmd
# 在当前目录下创建一个名为 my-project-env 的虚拟环境，使用指定的 Python 3.11 版本
uv venv -p python3.11 my-project-env
```

## 导出依赖

```cmd
# 导出到默认的 requirements.txt 文件
uv pip freeze > requirements.txt
```

‍

[一键脚本使换源更简单 - LinuxMirrors](https://linuxmirrors.cn/#docker)

‍

# JDK

## 安装

‍

## 环境变量

‍
