---
layout: post
title: 如何安装 Rails 生产环境
category: linux
description: 操作系统
disqus: false
---

[如何安装 Rails 生产环境](https://github.com/ruby-china/ruby-china/wiki/%E5%A6%82%E4%BD%95%E5%AE%89%E8%A3%85-Rails-%E7%94%9F%E4%BA%A7%E7%8E%AF%E5%A2%83)

[如何部署Rails生产环境](https://github.com/ruby-china/ruby-china/wiki/%E5%A6%82%E4%BD%95%E9%83%A8%E7%BD%B2Rails%E7%94%9F%E4%BA%A7%E7%8E%AF%E5%A2%83)

## 常用gem
* [redis]()
* [redis-objects]()
* [dalli]()
* [omh](https://github.com/soveran/ohm)

## 添加用户

```
sudo passwd root
sudo su root
echo "UseDNS no" >> /etc/ssh/sshd_config
dpkg-reconfigure tzdata
adduser deploy
adduser deploy sudo
chown -R deploy /var
```

## 退出

```
ssh-copy-id deploy@11.11.11.11
```

## 安装依赖软件

```
apt-get update
apt-get install curl

#!/bin/bash
add-apt-repository ppa:chris-lea/node.js
apt-get -y update
apt-get -y upgrade

apt-get install -y openssh-server git-core git curl zlib1g-dev build-essential \
libssl-dev libreadline-dev libyaml-dev libsqlite3-dev sqlite3 \
libxml2-dev libxslt1-dev libcurl4-openssl-dev python-software-properties \
libxml2 libmagickcore-dev libmagickwand-dev wget vim openssl libreadline6 \
libreadline6-dev zlib1g libxslt-dev autoconf automake libtool \
libpcre3-dev libpq-dev language-pack-zh-hant language-pack-zh-hans \
libgdbm-dev libncurses5-dev bison libffi-dev libreadline5 \
libpq-dev nodejs gawk g++ gcc imagemagick

ldconfig /usr/local/lib
dpkg-reconfigure locales
mkdir -p /usr/share/fonts/winfonts
cd /usr/share/fonts/winfonts
wget https://github.com/wcc526/install_files/raw/master/Kaiti.ttc
chmod 744 *
mkfontscale
mkfontdir
fc-cache -f -v

su deploy
fc-list :lang=zh-cn
convert -list font

#!/bin/bash
curl -L https://get.rvm.io | bash -s stable
source ~/.rvm/scripts/rvm
echo "source ~/.rvm/scripts/rvm" >> ~/.bashrc
rvm pkg install readline openssl
rvm install 2.1.1
rvm use 2.1.1 --default
echo "gem: --no-ri --no-rdoc" > ~/.gemrc

source ~/.bashrc
ruby -v
```

## (国内必选)设置淘宝源

```
sed -i 's!cache.ruby-lang.org/pub/ruby!ruby.taobao.org/mirrors/ruby!' $rvm_path/config/db
gem sources --remove https://rubygems.org/
gem sources -a https://ruby.taobao.org/
gem sources -l
```

## 安装gem

```
gem install rmagick bundler nokogiri
```

## 




