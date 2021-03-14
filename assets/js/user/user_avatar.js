$(function() {
  // 更换头像
  $("#btnChooseImage").on('click',function() {
    console.log(111);
    $('#file').click()
    console.log($('#file').files);
  })

//   $('#file').on('click',function(e) {
//     console.log($(this).files);
//   })
})