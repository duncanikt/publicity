
// function search() 
// {
//   console.log("Hello GridSearch.js");
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