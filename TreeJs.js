

console.log("Hello TreeJs.js");

var togglers = document.getElementsByClassName("caret");
var i;

// 绑定事件监听器并指定 ExpandCollapseMenu 为处理函数
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





// 获取所有具有特定类名的链接元素
var externalLinks = document.getElementsByClassName("external-link");

// 为每个链接元素添加点击事件监听器
for (var i = 0; i < externalLinks.length; i++) {
  externalLinks[i].addEventListener("click", handleLinkClick);
}

// 处理链接点击事件的函数
// function handleLinkClick(event) {
//   event.preventDefault(); // 阻止默认的链接跳转行为
  
//   var linkUrl = event.target.href; // 获取链接的URL
//   // 在右侧加载链接的内容
//   var contentElement = parent.document.getElementById('gridContentContainer');
//   var xhr = new XMLHttpRequest();
//   xhr.onreadystatechange = function() {
//     if (xhr.readyState === 4 && xhr.status === 200) {
//       contentElement.innerHTML = xhr.responseText;
//     }
//   };
  
//   xhr.open('GET', linkUrl, true);
//   xhr.send();
// }






// function loadPage(pageUrl) {
//   console.log("Hello 非自己");
//   var contentElement = parent.document.getElementById('gridContentContainer');
//   var xhr = new XMLHttpRequest();
//   xhr.onreadystatechange = function() {
//     if (xhr.readyState === 4 && xhr.status === 200) {
//       contentElement.innerHTML = xhr.responseText;
//     }
//   };
  
//   xhr.open('GET', pageUrl, true);
//   xhr.send();
// }


// function loadPage(pageUrl) {
//   console.log("Hello 非自己");
//   var contentElement = parent.document.getElementById('gridContentContainer');
//   var xhr = new XMLHttpRequest();
//   xhr.onreadystatechange = function() {
//     if (xhr.readyState === 4 && xhr.status === 200) {
//       contentElement.innerHTML = xhr.responseText;
//     }
//   };
  
//   xhr.open('GET', pageUrl, true);
//   xhr.send();
// }

// function loadPage(pageUrl) {
//   console.log("Hello 非自己是TreeJs.js");
//   // var contentElement = parent.document.getElementById('gridContentContainer');
//   var contentElement = parent.document.getElementById('gridContentContainer');
//   var xhr = new XMLHttpRequest();
//   xhr.onreadystatechange = function() {
//     if (xhr.readyState === 4 && xhr.status === 200) {
//       var parser = new DOMParser();
//       var responseDoc = parser.parseFromString(xhr.responseText, "text/html");
//       var scriptTags = responseDoc.getElementsByTagName("script");
//       for (var i = 0; i < scriptTags.length; i++) {
//         eval(scriptTags[i].innerText);
//       }
//       contentElement.innerHTML = responseDoc.body.innerHTML;
//     }
//   };
//   var absolutePageUrl = new URL(pageUrl, location.href).href; // 取得絕對路徑
//   xhr.open('GET', absolutePageUrl, true);
//   xhr.send();
// }



// function loadPage(pageUrl) {
//   var contentElement = parent.document.getElementById('gridContentContainer');
//   var xhr = new XMLHttpRequest();
//   xhr.onreadystatechange = function() {
//     if (xhr.readyState === 4 && xhr.status === 200) {
//       contentElement.innerHTML = xhr.responseText;
//     }
//   };
  
//   xhr.open('GET', pageUrl, true);
//   xhr.send();
// }