---
layout: post
title: ruby && rails 小技巧
category: ruby
description: Ruby
disqus: false
---

* [没有主键uniq不起作用时使用distinct](http://stackoverflow.com/questions/9658881/rails-select-unique-values-from-a-column)

`.select('DISTINCT project_id')`

* 过滤掉问文本中的html标签

` ActionController::Base.helpers.sanitize(self.description, tags: %w(li br)).gsub(/(<[^>]+>|&nbsp;|\r)/,"\n")`

* gsub!

`"<<<www>>>,2, <<<fff>>>".gsub!(/<<<(.+?)>>>/) { $1 }` #=> "www,2, fff"

* where like

`where("name LIKE ?", "%#{query}%")`

* html标签转换

`raw sanitize .html_safe` sanitize(较安全)可以设置白名单

* grape 开发环境不会自动加载修改文件

在routes.rb中加入

```
if Rails.env.development?
  ActiveSupport::Dependencies.explicitly_unloadable_constants << "API"

  api_files = Dir[Rails.root.join('app', 'api', '**', '*.rb')]
  api_reloader = ActiveSupport::FileUpdateChecker.new(api_files) do
    Rails.application.reload_routes!
  end
  ActionDispatch::Callbacks.to_prepare do
    api_reloader.execute_if_updated
  end
end
```

* 去掉build出来的空对象

`.select(&:persisted?)`

* 去掉nil

`compact`