---
layout: post
title: devise的使用方法
category: ruby
description: Gem(转载)
disqus: false
---

[devise介绍+使用](http://blog.163.com/xingchao_gan/blog/static/183374228201173174316813/)

1：Encryptable:除了内置的Bcrypt(默认)，增加支持认证机制   

2：Lockable:锁定一定数量的失败尝试登录。通过电子邮件或之后才能解锁   

3：validatable：有效性：提供的电子邮件及密码鉴定。它是可选的,可定制的,所以你可以定义自己的代码。   

4：Timeoutable：在一特定时期（expires sessions）没有活动。   

5：Trackable（跟踪）：追踪 登录的次数、时间戳记签字和IP地址   

6：Rememberable（记忆）：管理产生和清除表示来自用户保存的cookie的标记（token）   

7：Registerable（注册）：处理用户注册过程,也可以让他们编辑和摧毁他们的帐户。   

8：recoverable（重设）重置用户密码并且发送重置指令。   

9：Confirmable注册登录认证   

10：Omniauthable: adds Omniauth (github.com/intridea/omniauth) support;   

11：Database Authenticatable: encrypts and stores a password in the database to validate the authenticity of a user while signing in. The authentication can be done both through POST requests or HTTP Basic Authentication.   

12：Token Authenticatable: signs in a user based on an authentication token (also known as “single access token”). The token can be given both through query string or HTTP Basic Authentication.   


通过Divse 添加Users   

其中User.rb可用属性：12个   

```
　　　　:token_authenticatable, :encryptable, :confirmable, :lockable, :timeoutable  ， :omniauthable ，

　　　　:database_authenticatable, :registerable,  :recoverable, :rememberable, :trackable, :validatable,
```

使用：   

1：Gemfile中加入： gem 'devise'   

2：建立devise档案： rails g devise：install（自动在routes.rb中加入：devise_for:user）   

3：预设定网站网址：在config/environmentents/development.rb与production.rb中加入   

　　　　`config.action_mailer.default_url_options = { :host => 'localhost:3000' }`

4：在app/views/layouts/application.html.erb layout中加入：（提示flash信息）   
   
```
　　　　<p class="notice"><%= notice %></p>

 　　　　<p class="alert"><%= alert %></p>
```

5：设定主页,在routes.rb中   

　　　　root :to => ""     

6:产生User model以及Migration   

　　　　rails  g devise user   

7:如果需要E-mail验证登录功能，修改user.rb migration将confirmable打开   

8：产生view模板   

　　　　rails g devise：views   

9：建立资料表   

　　　　rake db：migration   

使用：   

在需要登录的control中加上：before_filter:authenticate_user!   

定制登录信息：（注意修改：）   

　　　　devise默认是email和密码登录，那么，现在用用户名登录！配置如下：   

1：添加username字段到User表单   

　　　　rails generate migration add_username_to_users username:string    

　　　　　rake db:migration   

2：修改配置文件：是devise默认用username登录/config/initializers/devise.rb   

　　　　config.authentication_keys = [ :username ]   

　　　　config.sign_out_via = :get   

3:修改注册页面，app\views\devise\registrations\new.html.erb(类似修改其他devise的视图)   

```
　　　　　　　　<h2>Sign up</h2>

　　　　<%= form_for(resource, :as => resource_name, :url => registration_path(resource_name)) do |f| %>

  　　　　<%= devise_error_messages! %>

 　　　　 <p><%= f.label :username %><br />//////

  　　　　<%= f.text_field :username %></p>//////

 　　　　 <p><%= f.label :email %><br />

 　　　　 <%= f.email_field :email %></p>

 　　　　 <p><%= f.label :password %><br />

 　　　　 <%= f.password_field :password %></p>

 　　　　 <p><%= f.label :password_confirmation %><br />

 　　　　 <%= f.password_field :password_confirmation %></p>

 　　　　 <p><%= f.submit "Sign up" %></p>

　　　　<% end %>

　　　　<%= render :partial => "devise/shared/links" %>
```

4：重启服务-效果成功   