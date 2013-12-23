---
layout: post
title: RSpec基础
category: ruby
description: Test
disqus: false
---

[rspec文档](https://www.relishapp.com/rspec/rspec-rails/docs)   
[rspec源码](https://github.com/rspec/rspec-rails)

## 命令行运行测试
* 安装rspec：
$ rails generate rspec:install
* 生成测试需要的代码文件：
$ rails generate integration_test static_pages
* 迁移数据库：
$ bundle exec rake db:migrate    
* 测试准备：
$ bundle exec rake test:prepare
* 运行测试：
$ bundle exec rspec spec/models/user_spec.rb
* 创建“测试数据库”：
$ bundle exec rake test:prepare

## let 方法(定义局部变量)

我们可以使用 RSpec 提供的 let 方法便捷的在测试中定义局部变量。let 方法的句法看起来有点怪，不过和变量赋值语句的作用是一样的。let 方法的参数是一个 Symbol，后面可以跟着一个块，块中代码的返回值会赋给名为 Symbol 代表的局部变量。也就是说：

`let(:name) {expression}`格式   

跟before里的代码一样的，但是比before里的代码效果更好。   

`let(:found_user) { User.find_by(email: @user.email) }`

定义了一个名为 `found_user` 的变量，其值等于 `find_by` 的返回值。在这个测试用例的任何一个 before 或 it 块中都可以使用这个变量。使用 let 方法定义变量的一个好处是，它可以记住变量的值。对上面的代码而言，因为 let 的备忘功能，`found_user` 的值会被记住，因此不管调用多少次 User 模型测试，`find_by` 方法只会运行一次。

## describe和context方法
describe和context方法用来组织相关的行为example。
使用一个字符串作为他们的参数，以及使用一个block来定义其上下文的范围。
写model的spec或者其他的unit test时，可以传一个Ruby类作为describe的第一个参数。Doing so also creates an implicit subject for the examples.

```
describe Timesheet do
  ...
end
```

describe可以嵌套   
一般使用：   

```
describe Timesheet do
  describe “#test” do
    ...
  end
end
```

这样的方式（注意第一个describe的参数是一个类，第二个describe参数是以#开始)这个表示测试Timesheet类下面的test方法)


## its方法
它和 it 很像，不过测试对象是参数中指定的属性而不是整个测试的对象。   

```
its(:remember_token) { should_not be_blank }
```

等同于：

```
it { expect(@user.remember_token).not_to be_blank }
```

## before和after方法
和setup、teardown方法类似   
Before and after code can be inserted in any describe or context blocks, and by default the execute for each it block that shares their scope.

before { visit root_path } 链接，创建实例

## it方法
it方法使用一个描述和block。一个it就是一个测试，最好一个it一个期望   
As mentioned, the idea is to complete the thought that was started in the describe method, so that it foms a complete sentence.


## specify方法
specify是it方法的别名，但是他可以使用不同的结构来增加可读性。

```
describe BlogPost do
  set(:blog_post) {blog_post = BlogPost.new}
  specify {blog_post.should_not be_published}
end
```

生成的RSpecDoc如下：
BlogPost
- should not be published


## `shared_examples_for`方法与`it_should_behave_like`方法来消除重复

```
subject { page }

  shared_examples_for "all static pages" do
    it { should have_content(heading) }
    it { should have_title(full_title(page_title)) }
  end

  describe "Home page" do
    before { visit root_path }
    let(:heading)    { 'Sample App' }
    let(:page_title) { '' }

    it_should_behave_like "all static pages"
    it { should_not have_title('| Home') }
  end
```


## expect方法
expect 用来改变一个值或者抛出一个异常。后面接change来表示要达到的值，使用raise_error(异常类)来表示会抛出一个异常。   
change 方法可接受两个参数，第一个参数是对象名，第二个是 Symbol。change 方法会在 expect 块中的代码执行前后，分别计算在第一个参数上调用第二参数代表的方法返回的结果

```
expect {
BlogPost.create :title => “Hello”
}.to change {BlogPost.count}.by(1)
```

希望在expect块里做完之后，BlogPost.count的值要改为1
改变值的例子

```
describe Order do
  let(:order) {order = Order.create}
  describe "#ship!” do
    context “with paid” do
      it "should update status to shipping" do
        expect {
          order.ship!
          }.to change { order.status }.from(“new”).to(“ship”)
       end
    end
end
```

这里改变值使用的from和to，这样就会在执行expect块之前检查order.status的值是不是new，并且会在执行之后检查是不是”ship”值
抛出异常的例子

```
describe Order do
  let(:order) {order = Order.create}
  describe "#ship!” do
    context “with paid” do
      it "should raise NotPaidError" do
        expect {
          order.paid? = flase
          order.ship!
          }.to raise_error(NotPaidError)
       end
    end
end
```

这里表示执行完except块之后会抛出一个NotPaidError异常。

## pending方法
可以使用pending来列出打算要写的测试
使用it函数不传block给他也是pending的意思，也可以在block离调用pending

可以在before里写pending


## should和should_not方法
Rspec mixes them into the base Ruby Object class at runtime so that they are available on all objects.They expect to receive Matcher objects, generated using Rspec expectation syntax   

检查型别、方法:   

```
receiver.should be_true
receiver.should be_false
receiver.should be_nil
```

检查Array、Hash:   

```
receiver.should be_a_kind_of(Array)
receiver.should be_an_instance_of(Array)
receiver.should responsed_to(:foo)

receiver.should have_key(:foo)
receiver.should include(4)
receiver.should have(3).items
```

任何be_开头:

```
receiver.should be_empty
receiver.should be_blank
receiver.should be_admin
receiver.should be_valid 是否合法
```

should == 是万能的
Rspec的Matcher很多，也可以自己写


## Implicit Subject和Explicit Subject
使用subject可省略receiver


## its
its可以省略receiver的方法调用

```
describe Order do
  subject { Order.new}
  its(:status) {should == “New”}
end 
```

## controller的测试(基本三段式)
* 初始化参数
* 请求方法
* 返回render or redirect_to

## 常用方法
* visit '' 测试链接
* have_selector（）是否包含
* eq 测试对象是否相同
* subject { page } 变量,设为这些测试用例默认的测试对象
* respond_to（）如果对象可以响应指定的方法或属性就返回 true，否则返回 false
* .dup（）复制
* .upcase() 转换成全部大写字母的形式
* have_selector 会检查页面中是否出现了指定的元素

## 代码实例:   

* view页面测试例子(测试页面中是否包含了正确的内容):

```
describe "Home page" do

  it "should have the content 'Sample App'" do
    visit '/static_pages/home'
    expect(page).to have_content('Sample App')
  end

end
```
运行：$ bundle exec rspec spec/requests/static_pages_spec.rb

* model中测试例子:

```
describe User do

  before { @user = User.new(name: "Example User", email: "user@example.com") }

  subject { @user }

  it { should respond_to(:name) }
  it { should respond_to(:email) }
end
```

* 用户注册：

```
describe "signup" do

    before { visit signup_path }

    let(:submit) { "Create my account" }

    describe "with invalid information" do
      it "should not create a user" do
        expect { click_button submit }.not_to change(User, :count)
      end
    end

    describe "with valid information" do
      before do
        fill_in "Name",         with: "Example User"
        fill_in "Email",        with: "user@example.com"
        fill_in "Password",     with: "foobar"
        fill_in "Confirmation", with: "foobar"
      end

      it "should create a user" do
        expect { click_button submit }.to change(User, :count).by(1)
      end
    end
end
```