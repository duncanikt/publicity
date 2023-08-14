console.log("Hello app.js錯誤測試");


// function handleLinkClick(event, linkUrl) {
//   event.preventDefault(); // 阻止默认的链接跳转行为

//   var contentElement = document.getElementById('gridContentContainer'); // 获取右侧分割畫面的容器元素

//   // 使用 AJAX 加载链接的内容
//   var xhr = new XMLHttpRequest();
//   xhr.onreadystatechange = function() {
//     if (xhr.readyState === 4 && xhr.status === 200) {
//       // 将新内容赋值给 contentElement 的 innerHTML
//       contentElement.innerHTML = xhr.responseText;
      
//       // 调用获取数据的函数
//       fetchData();
//     }
//   };

//   xhr.open('GET', linkUrl, true);
//   xhr.send();
// }

// // 获取数据的函数
// function fetchData() {
//   console.log("錯誤01");
//   fetch('http://localhost:3000/data')
//     .then(function(response) {
//       return response.json();
//     })
//     .then(function(data) {
//       var table = document.getElementById('');
//       var tableHeader = table.getElementsByTagName('thead')[0].getElementsByTagName('tr')[0];
//       var tableBody = table.getElementsByTagName('tbody')[0];

//       // 动态生成欄位標題
//       for (var key in data.recordset[0]) {
//         var th = document.createElement('th');
//         th.textContent = key;
//         tableHeader.appendChild(th);
//       }

//       // 动态生成資料行
//       for (var i = 0; i < data.recordset.length; i++) {
//         var rowData = data.recordset[i];
//         var newRow = tableBody.insertRow(i);

//         for (var key in rowData) {
//           var cell = newRow.insertCell();
//           cell.textContent = rowData[key];
//         }
//       }
//     })
//     .catch(function(error) {
//       console.log('Error:', error);
//     });
// }



// function search() 
// {
//   var table = document.getElementById('myTable');
//   var tableHeader = table.getElementsByTagName('thead')[0].getElementsByTagName('tr')[0];
//   var tableBody = table.getElementsByTagName('tbody')[0];
//   tableHeader.innerHTML = '';
//   tableBody.innerHTML = '';

//   var searchInput = document.getElementById('searchInput').value;
//   var startDate = document.getElementById('startDate').value;
//   var endDate = document.getElementById('endDate').value;

//   // 根据输入的条件发送请求，获取数据
//   var url = 'http://localhost:8081/data?search=' + searchInput + '&startDate=' + startDate + '&endDate=' + endDate;
//   fetch(url)
//     .then(function(response) {
//       return response.json();
//     })
//     .then(function(data) 
//     {


//       // 清空表格内容
//       // tableHeader.innerHTML = '';
//       // tableBody.innerHTML = '';

//       // 动态生成列标题
//       for (var key in data.recordset[0]) {
//         var th = document.createElement('th');
//         th.textContent = key;
//         tableHeader.appendChild(th);
//       }

// // 动态生成数据行
// for (var i = 0; i < data.recordset.length; i++) {
//   var rowData = data.recordset[i];
//   var newRow = tableBody.insertRow(i);

//   for (var key in rowData) {
//     var cell = newRow.insertCell();
//     var value = rowData[key];

//     // 转换日期字符串为 Date 对象
//     if (key === 'Date') {
//       value = new Date(value);
//     }

//     // 格式化日期
//     if (value instanceof Date) {
//       value = value.toLocaleDateString();
//     }

//     cell.textContent = value;
//   }
// }




//     })

//     .catch(function(error) {
//       console.log('Error:', error);
//     });
// }