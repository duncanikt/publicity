
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