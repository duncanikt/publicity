let index_js01='' ;
let index_js02='' ;
let index_js03='' ;
let index_js04='' ;
let index_js05='' ;
let index_js06='' ;
let index_js07='' ;
window.useSensitiveEnv = false;  // 使用sensitive.env還是sensitive00.env


function handleGoogleLogin() {
  window.location.href = '/auth/google/callback';
}

let verifyResult; //判斷使用者是否已經驗證了。
let buttonType; //判斷是點選登入還是註冊。
// 監聽登錄按鈕點擊事件
document.querySelector('.g-recaptcha[data-action="submit01"]').addEventListener('click', function () {
// console.log('監聽login');

// 先檢查 result.success 是否為 true，如果是才執行登錄按鈕的處理
if (verifyResult && verifyResult.success) {
  buttonType = 'login';
} else {
  alert('請先勾選“我不是機器人”。');
}
});

// 監聽google登錄按鈕點擊事件
document.querySelector('.g-recaptcha[data-action="submit03"]').addEventListener('click', function () {
// console.log('監聽google login');
  buttonType = 'login'; //方便測試以後記得刪。
// 先檢查 result.success 是否為 true，如果是才執行登錄按鈕的處理
if (verifyResult && verifyResult.success) {
  buttonType = 'login';
} else {
}

});

// 監聽註冊按鈕點擊事件
document.querySelector('.g-recaptcha[data-action="submit02"]').addEventListener('click', function () {
// console.log('監聽register');
// 先檢查 result.success 是否為 true，如果是才執行登錄按鈕的處理
if (verifyResult && verifyResult.success) {
buttonType = 'register';
} else {
alert('請先勾選“我不是機器人”。');
}
});



// 監聽表單的 keydown 事件
document.getElementById('registerForm').addEventListener('keydown', function (event) {
// 如果按下的是 Enter 鍵 (keyCode 13)
if (event.keyCode === 13) {
// 阻止預設的 Enter 鍵行為（例如換行）
event.preventDefault();
// 先檢查 result.success 是否為 true，如果是才執行登錄按鈕的處理
if (verifyResult && verifyResult.success) {
  buttonType = 'register';
} else {
  alert('請先通過驗證。');
}
// 模擬點擊登錄按鈕
document.querySelector('.g-recaptcha[data-action="submit01"]').click();
}
});


// 獲取按鈕元素
const loginButton = document.querySelector('.g-recaptcha[data-action="submit01"]');
const registerButton = document.querySelector('.g-recaptcha[data-action="submit02"]');
const GoogleButton = document.querySelector('.g-recaptcha[data-action="submit03"]');

const h6nono = document.getElementById('h6nono');

const statusMessage = document.getElementById('statusMessage');

// 把 token 送到後端做驗證
function verifyCallback(token) {
if (buttonType === 'login' || buttonType === 'register') {
  loginButton.style.visibility = 'hidden';
  registerButton.style.visibility = 'hidden';
  GoogleButton.style.visibility = 'hidden';
  h6nono.style.visibility = 'hidden';
  statusMessage.textContent = '執行中...';
}
// 發送 POST 請求到後端進行驗證
fetch(index_js01, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ token: token }),
})




  .then(response => response.json())
  .then(result => {
    if (result.success) {
    // 驗證成功，根據按鈕類型執行不同的程式碼
    if (buttonType === 'login') {
      // 登錄按鈕的程式碼
      handleLogin() 
    } else if (buttonType === 'register') {
      // console.log('執行註冊function');
      handleLoginOrRegister(token);
    }
  } else {
    // 驗證失敗，給出錯誤提示
    alert('V3 Google reCAPTCHA驗證失敗。');
    // 添加原本的按鈕樣式
    showButtonsAndRemoveStatus()
  }
  })
  .catch(error => {
    console.error('error V3 失敗:', error);
    alert('error V3 Google reCAPTCHA驗證問題 請稍後再試。');
    // 添加原本的按鈕樣式
    showButtonsAndRemoveStatus()
  });
}






function verifyCallback03(token) {
if (buttonType === 'login' || buttonType === 'register') {
  loginButton.style.visibility = 'hidden';
  registerButton.style.visibility = 'hidden';
  GoogleButton.style.visibility = 'hidden';
  h6nono.style.visibility = 'hidden';
  statusMessage.textContent = '執行中...';
}
// 發送 POST 請求到後端進行驗證
fetch(index_js02, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ token: token }),
})
  .then(response => response.json())
  .then(result => {
    if (result.success) {
    // 驗證成功，根據按鈕類型執行不同的程式碼
    if (buttonType === 'login') {
      // 登錄按鈕的程式碼
      window.location.href = index_js07;
    } else if (buttonType === 'register') {
      // console.log('執行註冊function');
      handleLoginOrRegister(token);
    }
  } else {
    // 驗證失敗，給出錯誤提示
    alert('V3 Google reCAPTCHA驗證失敗。');
    // 添加原本的按鈕樣式
    showButtonsAndRemoveStatus()
  }
  })
  
  .catch(error => {
    console.error('error V3 失敗:', error);
    alert('error V3 Google reCAPTCHA驗證問題 請稍後再試。');
    // 添加原本的按鈕樣式
    showButtonsAndRemoveStatus()
  });
}


// 把 token 送到後端做驗證
function verifyCallback02(token) {
loginButton.style.visibility = 'hidden';
registerButton.style.visibility = 'hidden';
GoogleButton.style.visibility = 'hidden';
h6nono.style.visibility = 'hidden';
statusMessage.textContent = '後端伺服器驗證中...';

// 發送 POST 請求到後端進行驗證
fetch(index_js03, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ token: token }),
})
  .then(response => response.json())
  .then(result => {
    showButtonsAndRemoveStatus()
    if (result.success) {
      verifyResult = result; // 將 result 存儲在變數 verifyResult 中
      // 驗證成功，繼續處理表單提交
      // 在一分鐘後重置驗證結果和按鈕類型
      setTimeout(() => {
        verifyResult = null;
        buttonType = null;
      }, 60000); // 60000 毫秒等於 1 分鐘
    } else {
      // 驗證失敗，給出錯誤提示
      alert('V2 Google reCAPTCHA失敗！後端驗證沒過。');
      showButtonsAndRemoveStatus()
    }
  })
  .catch(error => {
    showButtonsAndRemoveStatus()
    console.error('V2註冊失敗:', error);
    alert('error！ V2 Google reCAPTCHA失敗！請稍後再試。');
    showButtonsAndRemoveStatus()
  });
}


// 新函數，處理密碼雜湊處理和傳遞帳密到後端的登錄路由和註冊路由
function handleLoginOrRegister(token) {

  // 在這裡處理密碼雜湊處理和傳遞帳密到後端的程式碼
  // 取得使用者名稱和密碼
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  // 在這裡添加密碼雜湊處理的程式碼，例如使用 bcrypt 或其他適合的方式

  // 發送 POST 請求到後端進行驗證
  fetch(index_js04, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username: username, password: password, token: token }),
        credentials: 'include', // 重要：啟用跨域請求中的cookie發送

  })
    .then(response => {
      if (!response.ok) {
        throw response; // 拋出 response 物件以觸發 .catch() 區塊
      }
      return response.json();
    })
    .then(result => {
      // 添加原本的按鈕樣式
      showButtonsAndRemoveStatus()
      if (result.success) {
        // 驗證成功，繼續處理表單提交
        alert('註冊成功。');
      } else {
        alert('錯誤。');
        showButtonsAndRemoveStatus()
      }
    })
    .catch(error => {
      // 添加原本的按鈕樣式
      if (error.status === 409) {
        error.json().then(data => {
          alert(data.error); // 顯示伺服器回應的錯誤訊息
          showButtonsAndRemoveStatus()
        });
      } else {
        console.error('伺服器錯誤:', error);
        alert('伺服器錯誤。');
        showButtonsAndRemoveStatus()
      }
    });
}


 // 登錄成功後，保存權杖到一個變數中
 // 新函數，處理密碼雜湊處理和傳遞帳密到後端的登錄路由和註冊路由
 function handleLogin() {
    // 取得使用者名稱和密碼
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // 在這裡添加密碼雜湊處理的程式碼，例如使用 bcrypt 或其他適合的方式

    // 添加超時處理
    const timeoutPromise = new Promise((resolve, reject) => {
      setTimeout(() => {
        reject('請求超時'); // 在指定時間後觸發逾時錯誤
      }, 10000); // 設置超時時間為 10000 毫秒（10 秒）
    });

    // 發送 POST 請求到後端進行驗證
      const fetchPromise = fetch(index_js05, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',

      },
      body: JSON.stringify({ username: username, password: password }),
    })
    Promise.race([fetchPromise, timeoutPromise])

    .then(response => {
      if (response.ok) {
        openWindow();
        // showButtonsAndRemoveStatus()
        return response.json();
      }
      if (response.status === 401) {
        showButtonsAndRemoveStatus()
        alert('登錄失敗，請檢查用戶名和密碼。');
        return Promise.reject('401');
      }

    })
      .then(data => {
        // console.log('有沒有執行權杖');
        // 從回應中獲取權杖並保存在本地
        const token = data.token;
        const expirationTime = data.expirationTime; // 從後端回應中獲取到期時間
        sessionStorage.setItem('jwt', token);
        localStorage.setItem('jwt', token);
        localStorage.setItem('expirationTime', expirationTime); // 保存到期時間  

      })

      .catch(error => {
        if (error === '請求超時') {
          showButtonsAndRemoveStatus();
          alert('請求超時，請稍後再試。');
        }else
        if (error == 401) {
        } else {
          showButtonsAndRemoveStatus()
          console.error('登錄失敗:', error);
          alert('登錄失敗，請稍後再試。');
        }
      });
  }





  function fetchDataWithToken(token) {
    const url = index_js06 + encodeURIComponent(searchInput) + '&engName=' + encodeURIComponent(engName) + '&startDate=' + encodeURIComponent(startDate) + '&endDate=' + encodeURIComponent(endDate);
    console.log('url:', url);
    addBT = '';
    fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      credentials: 'include',
    })
    .then(response => response.json())
    .then(data => {
      // 在這裡處理返回的資料
    })
    .catch(error => {
      console.error('獲取資料失敗:', error);
      alert('獲取資料失敗，請稍後再試。');
    });
  }

  function openWindow() {
            var w_width = 200;
            var w_height = 100;
            var x = (screen.width - w_width) / 2;
            var y = (screen.height - w_height) / 2;
            var ww = 'width=' + w_width + ',height=' + w_height + ',top=' + y + ',left=' + x;
            var openWIN = window.open('', '', ww);
            openWIN.document.write('<h2 style="text-align: center;">登入成功</h2>');
            setTimeout(function() {
              openWIN.close();
              window.location.href = 'index02.html'; // 在彈窗關閉後跳轉到指定頁面
            }, 500); // 0.5秒後自動關閉彈窗
          }

// 在頁面載入後自動填入帳號和密碼並觸發登入按鈕
window.onload = function () {
};
const testUsername = 'guest'; // 測試帳號
const testPassword = 'guest'; // 測試密碼
document.getElementById('username').value = testUsername;
document.getElementById('password').value = testPassword;

// 在後端回傳後，顯示按鈕並刪除文字
function showButtonsAndRemoveStatus() {
// 顯示按鈕
loginButton.style.visibility = 'visible';
registerButton.style.visibility = 'visible';
h6nono.style.visibility = 'visible';
GoogleButton.style.visibility = 'visible';
// 刪除文字
statusMessage.textContent = '';
}


const passwordInput = document.getElementById('password');
const togglePasswordButton = document.getElementById('togglePassword');

togglePasswordButton.addEventListener('click', function () {
if (passwordInput.type === 'password') {
  passwordInput.type = 'text';
} else {
  passwordInput.type = 'password';
}
});



// 更新 recaptcha 的 data-sitekey 屬性
const recaptchaElements = document.querySelectorAll('.g-recaptcha');
const updateRecaptchaSitekey = (sitekey) => {
  recaptchaElements.forEach(element => {
    element.setAttribute('data-sitekey', sitekey);
  });
}


// 在頁面載入時從後端取得敏感訊息
fetch('/sensitive-info', {
  method: 'POST', // 使用POST方法傳遞參數
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ useSensitiveEnv }), // 傳遞參數給後端，因前端伺服器的不同而使用不同的.env敏感訊息檔案。
})
    .then(response => response.json())
    .then(data => {
      // 更新 recaptcha 的 data-sitekey 屬性
      updateRecaptchaSitekey(data.recaptcha01);
      
      // 更新其他按鈕的 data-sitekey 屬性
      const loginButton = document.getElementById('loginRegister');
      loginButton.setAttribute('data-sitekey', data.recaptcha02);
      const loginButton02 = document.getElementById('loginRegister02');
      loginButton02.setAttribute('data-sitekey', data.recaptcha02);
      const loginButton03 = document.getElementById('google-login-button');
      loginButton03.setAttribute('data-sitekey', data.recaptcha02);
      
      // 後端敏感連結
      index_js01 = data.index_js01;
      index_js02 = data.index_js02;
      index_js03 = data.index_js03;
      index_js04 = data.index_js04;
      index_js05 = data.index_js05;
      index_js06 = data.index_js06;
      index_js07 = data.index_js07;
    // 重新加載 Google reCAPTCHA
    grecaptcha.ready(() => {
      // 初始化新的 reCAPTCHA widget
      recaptchaElements.forEach(element => {
        grecaptcha.render(element, {
          // sitekey: element.getAttribute('data-sitekey'),
          theme: element.getAttribute('data-theme'),
          size: element.getAttribute('data-size'),
          callback: element.getAttribute('data-callback'),
          'expired-callback': element.getAttribute('data-expired-callback'),
          'error-callback': element.getAttribute('data-error-callback')
        });
        // // 隱藏 "載入中..." 的文字
        // document.getElementById('recaptcha-loading').style.display = 'none';
      // 延遲 2 秒後隱藏 "載入中..." 的文字
      setTimeout(() => {
        document.getElementById('recaptcha-loading').style.display = 'none';
      }, 1500);
      });
});

  })
    .catch(error => {
      console.error('發生錯誤:', error);
    });