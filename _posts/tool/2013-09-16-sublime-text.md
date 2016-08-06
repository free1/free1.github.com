---
layout: post
title:  sublime text的使用
category: tool
description: 编辑器
disqus: false
---

## 快捷键

* 格式化代码: `ctrl+alt+f`

## 必要安装

[packagecontrol](https://packagecontrol.io/installation#st2)

* sublimelisten 错误提示
* emmet html快捷补全
* AdvancedNewFile 快速创建文件
* Sass 支持sass
* SublimeErb erb快捷补全
* react自动补全 reactjs-snippets, [sublime-react](https://github.com/reactjs/sublime-react)
* [插件](http://aibusy.com/blog/?p=226)

## 设置缩进参数
* 菜单栏: Preferences -> Settings - More -> Syntax Specific - User。然后添加设置代码就可以了，文件保存在$Packages/User下：

```
{
    "tab_size": 2,
    "translate_tabs_to_spaces": true
}
```

```
{
        "auto_complete_commit_on_tab": true,
        "auto_complete": true,
        "default_encoding": "UTF-8",
        "font_size": 15.0,
        "highlight_line": true,
        "ignored_packages":
        [
                "Vintage",
                "SublimeCodeIntel"
        ],
        "remember_open_files": true,
        "syntax_sensitive": true,
        "tab_size": 2,
        "translate_tabs_to_spaces": true,
        // 突出显示当前光标所在的行
        "highlight_line": true,
        // 为true时，保存文件时会删除每行结束后多余的空格
        "trim_trailing_white_space_on_save": true
}
```

## 在终端打开sublime text2

```
sudo ln -s "/Applications/Sublime Text 2.app/Contents/SharedSupport/bin/subl" /usr/bin/subl
```