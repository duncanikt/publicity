
window.addEventListener('beforeunload', () => {
  // localStorage.removeItem('jwt'); // 或其他存儲方式的清除操作
// 獲取會話存儲中的權杖
const token = sessionStorage.getItem('jwt');

// 執行其他操作（例如發送權杖過期請求等）
if (token) {
// 刪除會話存儲中的權杖
// sessionStorage.removeItem('jwt');
// localStorage.removeItem('jwt');
}

});
// 檢查是否存在權杖
console.log("檢查開始");
const token = sessionStorage.getItem('jwt');
console.log('權杖值：',token);
const expirationTime = localStorage.getItem('expirationTime');
const currentTime = Math.floor(Date.now()); // 獲取當前時間的時間戳記（單位：秒）
console.log(currentTime,expirationTime);

if (!token) {
window.location.href = 'index.html';
alert('未登入');
// 權杖不存在，導向到登入畫面
} else {
if (!expirationTime) {
// 沒有到期時間資訊，可能需要重新登錄或處理其他情況
alert('未找到到期時間資訊，請重新登錄。');
window.location.href = 'index.html';

}
if (expirationTime < currentTime) {
// 權杖已過期，需要重新登錄
window.location.href = 'index.html';
localStorage.removeItem('jwt'); // 或其他存儲方式的清除操作
alert('登入時間已過期，請重新登入。');
} else {
// 權杖存在且未過期，繼續執行其他操作
// ...
}
}

console.log("檢查結束");


