$(function() {
  // 1.1 获取裁剪区域的 DOM 元素
  let $image = $('#image')
  
  // 1.2 配置选项
  const options = {
      // 纵横比
      aspectRatio: 1,
      // 指定预览区域
      preview: '.img-preview'
  }
  
  // 1.3 创建裁剪区域
  $image.cropper(options)
  // 更换头像
  $("#btnChooseImage").on('click',function() {
    $('#file').click()
  })

  $('#file').on('change',function() {
    let file = this.files[0];
    let newImgURL = URL.createObjectURL(file)
    $image
   .cropper('destroy')      // 销毁旧的裁剪区域
   .attr('src', newImgURL)  // 重新设置图片路径
   .cropper(options)        // 重新初始化裁剪区域 
  })

  $('#btnCreateAvatar').click(function() {
    // 剪裁得到一张图片（canvas图片）
    let base64Str = $image.cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
      width: 100,
      height: 100
    });

    // 把图片转成base64格式
    let dataURL = base64Str.toDataURL(); // 把canvas图片转成base64格式

    axios.post('/my/update/avatar',`avatar=${encodeURIComponent(dataURL)}`).then(res => {
      if(res.data.status !== 0) {
        return layer.msg('头像修改失败！');
      }
      layer.msg('头像修改成功！');
      window.parent.getUserInfo()
    })
  })
})