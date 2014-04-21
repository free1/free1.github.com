---
layout: post
title: Rails中报错页面
category: ruby
description: Rails
disqus: false
---

[Rails定制报错页面](http://blog.linjunhalida.com/blog/rails-customize-error-page/)

```
  def render_404
    render_optional_error_file(404)
  end

  def render_403
    render_optional_error_file(403)
  end

  def render_optional_error_file(status_code)
    status = status_code.to_s
    if ["404","403", "422", "500"].include?(status)
      render :template => "/errors/#{status}", :format => [:html], :handler => [:erb], :status => status, :layout => "application"
    else
      render :template => "/errors/unknown", :format => [:html], :handler => [:erb], :status => status, :layout => "application"
    end
  end
```
在views/errors/**