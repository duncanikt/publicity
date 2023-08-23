


window.onload = function() {
  window.parent.loadPage('Grid/GridBranch01.html');

  function deleteRecord(button) {
      return new Promise((resolve, reject) => {
        var row = button.parentNode.parentNode;
        var input = row.querySelector('input');
        var ABC = input.value;

        // 發送刪除請求
        var url = '/logout';

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





var togglers = document.getElementsByClassName("caret");
var i;

// 綁定事件監聽器並指定 ExpandCollapseMenu 為處理函數
for (i = 0; i < togglers.length; i++) {
  togglers[i].addEventListener("click", ExpandCollapseMenu);
}

var countEl = document.getElementById("count");
countEl.innerText = togglers.length;

function ExpandCollapseMenu() {
  var nestedElement = this.parentElement.querySelector(".nested");
  if (nestedElement) {
    nestedElement.classList.toggle("active");
  }
  this.classList.toggle("caret-down");
}

// 獲取所有具有特定類名的連結元素
var externalLinks = document.getElementsByClassName("external-link");

// 為每個連結元素添加點擊事件監聽器
for (var i = 0; i < externalLinks.length; i++) {
  externalLinks[i].addEventListener("click", handleLinkClick);
}

