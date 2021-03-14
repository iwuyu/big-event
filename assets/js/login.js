$(function() {
  // 点击注册显示注册表单，隐藏登录表单
  $('#showReg').click(function() {
    $('.login-form').hide()
    $('.reg-form').show()
  })
  $('#showLogin').click(function() {
    $('.login-form').show()
    $('.reg-form').hide()
  })

  // 注册表单验证
  let form = layui.form;
  form.verify({
    // 数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]
    pass: [/^[\S]{6,12}$/, "密码必须6到12位，且不能出现空格"],

    // 两次输入的密码必须一致
    samePass: function (value, item) {
      let pwd = $("#regi_pass").val();
      // 两次密码进行比较判断，是否一致，如果不一致，出现提示文字
      if (value !== pwd) return "两次输入的密码不一致";
    },
  });

  // 注册功能
  let layer = layui.layer;
  $(".reg-form").on('submit',function(e) {
    // 阻止默认事件
    e.preventDefault()

    let data = $(this).serialize()
    console.log(data);
    axios.post("/api/reguser", data).then((res) => {
      console.log();
      if(res.data.status !== 0) {
        return layer.msg("注册失败" + res.data.message);
      }
      layer.msg(res.data.message);
      $('#showLogin').click()
    });
  })

  // 登录功能
  $(".login-form").on('submit',function(e) {
    // 阻止默认事件
    e.preventDefault()

    let data = $(this).serialize()
    axios.post("/api/login", data).then((res) => {
      if(res.data.status !== 0) {
        // 登录失败
        return layer.msg("登录失败");
      }
      // 登录成功
      // 存储token
      localStorage.setItem('token',res.data.token)
      // 提示成功
      layer.msg('登录成功',{time: 1000},function() {
        // 跳转到主页
        location.href = './index.html'
      });
    });
  })
})




