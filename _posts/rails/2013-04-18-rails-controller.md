---
layout: post
title: Rails Controller基础
category: rails
description: Rails
disqus: false
---

## 控制器接受外部参数(Strong Parameters)

```
raw = { email: "dhh@java.com", name: "DHH", admin: true }
parameters = ActionController::Parameters.new(raw_parameters)
user = User.create(parameters.permit(:name, :email))
```

嵌套 Strong Parameters ：

```
params.permit(:name, {age: []}, girlfriends: [ :name, { family: [ :name ], hobbies: [] }])
```

```
class Post
  serialize :options, JSON
end

class PostsController < ApplicationController
  ...

  #params[:post][:title] = JSON.parse params[:post][:title]  
  # 使用eval较好，创建修改格式可以不同，好像可以使用to_yaml
  params[:post][:title] = eval params[:post][:title]  

  def post_params
    all_options = params.require(:post).fetch(:options, nil).try(:permit!)
    params.require(:post).permit(:title).merge(:options => all_options)
  end
end
```

## 返回json
* rails 默认方法
  `render :text => { :id => @user.id, :name => @user.name, :count => @user.sth.count }.to_json`




