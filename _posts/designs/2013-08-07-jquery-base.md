---
layout: post
title: jquery基础
category: designs
description: Javascript
disqus: false
---

## 使用ajax与后台交互

```
$.ajax({
type:"get",
url:"ajax1.jsp",
data:"id="+id+"&"+"test=123", //要传的值
success:function(data){
alert("success");
}
}); 
```

## 单选框与输入框配合使用

```
$('#bbs-report-form').toggle();
$("#reason").val('abusive');
redio_name = "#bbs-report-form input[name='reason']";
$(redio_name).click(function (event) {
  $(redio_name + ":checked").each(function(){
    if ($(this).attr("value") == "abusive") {
      $('#reason').val('abusive');
    }
    else if ($(this).attr("value") == "porn") {
      $('#reason').val('porn');
    }
    else if ($(this).attr("value") == "spam") {
      $('#reason').val('spam');
    }
  });
});
$("#reason").click(function(){
  $("#radio-text").attr("checked",true);
  $(this).val('');
  // alert($("#custom").val());
  // $('#reason').val($("#custom").val());
});
```

## [使用bootstrap3 dialog实现交互](http://nakupanda.github.io/bootstrap3-dialog/)例子:

```
// 举报
  function bbsReport(forum_id, article_id){
    var $textAndPic = $('<h5>请选择理由</h5>');
        $textAndPic.append('<div">\
            <label>\
              <input type="radio" name="reason" value="abusive" checked="true"/> 侮辱、漫骂\
            </label>\
            <label>\
              <input type="radio" name="reason" value="porn"/> 色情\
            </label>\
            <label>\
              <input type="radio" name="reason" value="spam"/> 垃圾广告\
            </label>\
            <textarea class="form-control" name="text"></textarea>\
          </div>');

    BootstrapDialog.show({
      title: '举报详情',
      message: $textAndPic,
      data: {
        forum_id: forum_id,
        article_id: article_id
      },
      buttons: [{
        label: '关闭',
            action: function(dialogRef){
                dialogRef.close();
            }
        }, {
        icon: 'glyphicon glyphicon-send',
        label: '提交',
        cssClass: 'btn-primary',
        autospin: true,
        action: function(dialogRef){
          dialogRef.enableButtons(false);
          dialogRef.setClosable(false);
          var dbody = dialogRef.getModal();
          var redio_val = dbody.find("input:radio[name=reason]:checked").val();
          var text_val = dbody.find("textarea").val();
          var forum_id = dialogRef.getData('forum_id');
          var article_id = dialogRef.getData('article_id');
          var reason;

          if (text_val == "") {
            reason = redio_val;
          } else {
            reason = text_val;
          };

          $.ajax({
            type:'POST',
            url: '/forums/' + forum_id + '/articles/' + article_id + '/report',
            data: {
              reason: reason
            },
            dataType:"json",
            success:function(data){
              if (data) {
                alert("举报成功!");
              } else {
                alert("举报失败!");
              }
            }
          });

          dialogRef.getModalBody().html('提交中...');
          setTimeout(function(){
              dialogRef.close();
          }, 1000);
        }
      }]
    });
```
