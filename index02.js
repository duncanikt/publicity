
// 在 index02.html 的 JavaScript 中
document.addEventListener('DOMContentLoaded', function() {
  // 檢查是否存在令牌
  const token = localStorage.getItem('jwt');

  if (!token) {
    // 令牌不存在，導向到登入畫面
    // openWindow03();
  }
});




function toggleTree() {
  var sidebar = document.querySelector('.sidebar');
  sidebar.classList.toggle('collapsed');
}
function loadPage(pageUrl) {
  console.log("Hello sindex.html  loadPage 02");
  var pageFrame = document.getElementById('pageFrame');

  // var absolutePageUrl = new URL(pageUrl, location.href).href; // 取得絕對路徑
  var absolutePageUrl = new URL(pageUrl, window.location.origin + '/').href;
  pageFrame.src = pageUrl;
  // fetchData();
}

function handleLogoutID(pageUrl) {
  console.log("Hello sindex.html  loadPage 02");
  handleLogout();
  // window.location.href = 'index.html';

}







// 登出功能
function handleLogout() {
// 清除本地儲存的JWT令牌
localStorage.removeItem('jwt');
sessionStorage.removeItem('jwt');

// 發送登出請求到後端
fetch('https://i75birth.ddns.net/logout', {
  method: 'POST',
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
