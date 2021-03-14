$(function() {
  getInfo()
  let form = layui.form
  let layer = layui.layer
  function getInfo() {
    axios.get("/my/userinfo").then(res => {
      let data = res.data.data
      //给表单赋值
      form.val("form", { //formTest 即 class="layui-form" 所在元素属性 lay-filter="" 对应的值
        "username": data.username,
        "nickname": data.nickname,
        "email": data.email,
        "id": data.id
      });
    })
  }
  
  form.verify({
    username: function(value, item){ //value：表单的值、item：表单的DOM对象
      if(!new RegExp("^[a-zA-Z0-9_\u4e00-\u9fa5\\s·]+$").test(value)){
        return '用户名不能有特殊字符';
      }
    }
  })

  $("form").on('submit',function(e) {
    e.preventDefault()
    let data = $(this).serialize()
    console.log(data);
    axios.post("/my/userinfo",data).then(res => {
      console.log(res);
      if(res.data.status !== 0){
        return layer.msg('修改出错！');
      }

      window.parent.getUserInfo()
    })
  })

  $("form").on('reset',function(e) {
    e.preventDefault()
    getInfo()
  })
})