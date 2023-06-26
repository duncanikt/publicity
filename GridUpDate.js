
function showUpdateForm() {
    var searchInput = document.getElementById('searchInput').value;

    // 根据输入的单号发送请求，获取数据
    var url = 'http://localhost:8081/data?search=' + searchInput;

    fetch(url)
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        // 打开修改窗口并传递数据
        openUpdateWindow(data.recordset[0]);
      })
      .catch(function(error) {
        console.log('Error:', error);
      });
  }

  function openUpdateWindow(data) {
    var field01Value = data.field01;
    // 获取其他字段的值

    // 构建要传递给GridUpDate.html的URL
    var url = 'GridUpDate.html';
    url += '?field01=' + encodeURIComponent(field01Value);
    // 添加其他字段的参数

    // 在新窗口中打开GridUpDate.html
    window.open(url, 'Update', 'width=400,height=300');
  }


  