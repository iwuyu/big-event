// 获取个人信息
$(function() {
  // JSON.parse
  getUserInfo()
})
function getUserInfo() {
  axios.get("/my/userinfo").then((res) => {
    let data = res.data.data
    let name = data.nickname || data.username
    // 设置名字
    $("#welcome").text(name)

    // 设置头像
    if(data.user_pic) {
      // 显示图片头像
      $('.avatar').attr('src',data.user_pic).show()

      // 隐藏文字头像
      $(".text-avatar-box").hide()
    }else {
      // 隐藏图片头像
      $('.avatar').hide()

      // 显示文字头像
      $(".text-avatar-box").show().children().text(name[0].toUpperCase())
    }
  });
}

// 退出系统
$(function() {
  let layer = layui.layer;
  $('#btnLogout').click(() => {
    layer.confirm('确定要退出?', {icon: 3, title:'提示'}, function(index){
      // 删除token
      localStorage.removeItem('token')
      // 返回登录页
      location.href = '/login.html'
      
      layer.close(index);
    });
  })
})