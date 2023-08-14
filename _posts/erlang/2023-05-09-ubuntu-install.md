---
layout: post
title: ubuntu安装
category: erlang
description: erlang
disqus: false
---


## 安装asdf

```
git clone https://github.com/asdf-vm/asdf.git ~/.asdf
echo '. $HOME/.asdf/asdf.sh' >> ~/.bashrc
echo '. $HOME/.asdf/completions/asdf.bash' >> ~/.bashrc
```


## 安装elixir

```
asdf plugin-add elixir https://github.com/asdf-vm/asdf-elixir.git
asdf install elixir 1.12.3-otp-24
asdf global elixir 1.12.3-otp-24
```


## 安装erlang

```
asdf plugin-add erlang https://github.com/asdf-vm/asdf-erlang.git
asdf install erlang 24.1
asdf global erlang 24.1
```
* 如果遇到不兼容问题: `sudo apt-get install clang-format clang-tidy clang-tools clang clangd libc++-dev libc++1 libc++abi-dev libc++abi1 libclang-dev libclang1 liblldb-dev libllvm-ocaml-dev libomp-dev libomp5 lld lldb llvm-dev llvm-runtime llvm python3-clang automake autoconf libncurses5-dev `


# asdf基本命令
* 本地安装版本: `asdf list`
* 线上版本: `asdf list-all erlang`


## 安装openssl1.1.1
* https://www.openssl.org/source/ 选择版本

```
# Get OpenSSL sources 
wget https://www.openssl.org/source/openssl-1.1.1t.tar.gz

# Extract files
tar -xvf openssl-1.1.1t.tar.gz

# build openssl 1.1.1
cd /tmp/openssl-1.1.1t/
./config shared enable-ec_nistp_64_gcc_128 -Wl,-rpath=/usr/local/ssl/lib --prefix=/usr/local/ssl
make -j 4
make test && sudo make install

# refresh cache
hash -r

# check version
/usr/local/ssl/bin/openssl <<< version

# symlink binary for path resolution
sudo ln -s /usr/local/ssl/bin/openssl /usr/local/bin/openssl
```

* 设置openssl和asdf安装路径: ` export KERL_CONFIGURE_OPTIONS="--without-javac --with-ssl=/usr/local/ssl" `

## 可能遇到的问题

* [ubuntu 22.04与erlang 24.1不兼容](https://github.com/asdf-vm/asdf-erlang/issues/247)

