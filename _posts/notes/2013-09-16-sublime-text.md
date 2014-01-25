---
layout: post
title:  sublime text
category: notes
description: 编辑器的使用
disqus: false
---

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