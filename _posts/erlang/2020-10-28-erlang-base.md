---
layout: post
title: erlang基础
category: erlang
description: erlang
disqus: false
---


## 安装
* brew install asdf
* asdf plugin-add erlang
* asdf plugin-add elixir
* asdf install erlang 20.0
* asdf install elixir 1.5.1
* asdf global erlang 20.0
* asdf global elixir 1.5.1


## mix包管理工具
* 安装包: `HEX_HTTP_CONCURRENCY=1 HEX_HTTP_TIMEOUT=120  mix do deps.get, local.rebar --force, deps.compile, compile`


## 安装erlang出现报错(error: neither static nor dynamic crypto library found in /usr/local/opt/openssl@1.1)

* 问题: https://github.com/erlang/otp/issues/4821
* `DED_LDFLAGS_CONFTEST="-bundle" asdf install erlang 25.2.1`
