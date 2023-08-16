
window.addEventListener('beforeunload', () => {
  // localStorage.removeItem('jwt'); // 或其他存储方式的清除操作
// 获取会话存储中的令牌
const token = sessionStorage.getItem('jwt');
// console.log('令牌值：',sessionStorage.getItem('jwt'));

// console.log('令牌值：',token);
// 执行其他操作（例如发送令牌过期请求等）
if (token) {
// 删除会话存储中的令牌
// sessionStorage.removeItem('jwt');
// localStorage.removeItem('jwt');
}


});
// 檢查是否存在令牌
console.log("檢查開始");
const token = sessionStorage.getItem('jwt');
console.log('令牌值：',token);
const expirationTime = localStorage.getItem('expirationTime');
const currentTime = Math.floor(Date.now()); // 获取当前时间的时间戳（单位：秒）
console.log(currentTime,expirationTime);

if (!token) {
window.location.href = 'index.html';
alert('未登入');
// 令牌不存在，導向到登入畫面
} else {
if (!expirationTime) {
// 没有到期时间信息，可能需要重新登录或处理其他情况
alert('未找到到期时间信息，请重新登录。');
window.location.href = 'index.html';

}
if (expirationTime < currentTime) {
// 令牌已过期，需要重新登录
window.location.href = 'index.html';
localStorage.removeItem('jwt'); // 或其他存储方式的清除操作
alert('登入時間已過期，請重新登入。');
} else {
// 令牌存在且未过期，继续执行其他操作
// ...
}
}

console.log("檢查結束");
