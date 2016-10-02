---
layout: post
title:  sublime text的使用
category: tool
description: 编辑器
disqus: false
---

## 快捷键

* 打开命令面板: `command+shift+p`
* 格式化代码: `ctrl+alt+f`
* 文件内搜索: `command+f`
* 文件夹搜索: `command+f+shift`
* 搜索项目中的文件: `command+p`
* 选择单词: `command+d`
* 跳转到第几行: `command+g`
* 关闭当前打开文件: `command+w`
* 关闭所有打开文件: `command+w+shift`
* 选择行: `command+l`
* 删除当前行: `command+x`
* 软撤销: `command+u`
* 在当前行前插入新行: `command+shift+enter`
* 替换: `command+h`
* 前往 method: `command+r`
* 新建窗口: `command+n`
* 注释当前行: `command+/`


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