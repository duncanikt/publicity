
window.onload = function() {
  window.parent.loadPage('Grid/GridBranch01.html');

  function deleteRecord(button) {
      return new Promise((resolve, reject) => {
        var row = button.parentNode.parentNode;
        var input = row.querySelector('input');
        var ABC = input.value;

        // 發送刪除請求
        var url = 'https://i75birth.ddns.net/logout';

        fetch(url, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ ABC: ABC })
        })
          .then(function(response) {
            if (response.ok) {
              row.remove();
              resolve(); // 完成 Promise
            } else {
              console.log('Delete failed:', response.statusText);
              reject(); // 拒絕 Promise
            }
          })
          .catch(function(error) {
            console.log('Error:', error);
            // 連線失敗的處理邏輯
            var errorElement = document.createElement('div');
            errorElement.innerText = '後端伺服器連線失敗';
            document.body.appendChild(errorElement);
            reject(); // 拒絕 Promise
          });
      });
    }

};

// 登出功能
function handleLogout() {
  // 清除本地儲存的JWT令牌
  localStorage.removeItem('jwt');
  
  // 發送登出請求到後端
  fetch('https://i75birth.ddns.net/logout', {
    method: 'POST',
    // credentials: 'include', // 需要包含認證憑證（cookie）
  })
  .then(response => {
    if (response.ok) {
      // 登出成功，可以根據需要執行其他操作，例如重新導向至登入頁面
      window.location.href = 'index.html'; // 將登入頁面的URL改成'index.html'
    } else {
      console.error('登出失敗:', response.status, response.statusText);
      alert('登出失敗，請稍後再試。');
    }
  })
  .catch(error => {
    console.error('登出失敗:', error);
    alert('登出失敗，請稍後再試。');
  });
}
