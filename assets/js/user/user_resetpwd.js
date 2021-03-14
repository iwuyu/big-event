$(function() {
  let form = layui.form
  $("form").on('submit',function(e) {
    e.preventDefault()
    let data = $(this).serialize()
    console.log(data);
    axios.post("/my/updatepwd",data).then(res => {
      console.log(res);
      if(res.data.status !== 0){
        return layer.msg('修改失败！');
      }
      layer.msg('修改密码成功！');
      $("form")[0].reset()
    })
  })

  form.verify({
    pass: [/^[\S]{6,12}$/, "密码必须6到12位，且不能出现空格"],
    
    newPwd:function(val) {
      if($("[name=oldPwd]").val() === val) return "与原密码一致";
    },

    // 两次输入的密码必须一致
    samePass: function (value, item) {
      // 两次密码进行比较判断，是否一致，如果不一致，出现提示文字
      if (value !== $("[name=newPwd]").val()) return "两次输入的新密码不一致";
    },
  });
})