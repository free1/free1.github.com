---
layout: post
title: Rails 从3.2升级到4.0
category: rails
description: Rails(转载)
disqus: false
---

在model中使用某个属性不要使用 `attr_accessible` 而在controller中使用 `permit` 方法，例如：`params.require(:model).permit(:attribute)` ，不经过controller的可以使用 `attr_accessor`   

[Rails 从3.2升级到4.0](https://github.com/JuanitoFatas/Guides/blob/master/guides/edge-translation/upgrading-ruby-on-rails-zh_CN.md)