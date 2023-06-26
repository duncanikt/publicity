// {
// 'use strict';

// const switcher = document.querySelector('.btn');

// switcher.addEventListener('click', function() {
//     document.body.classList.toggle('light-theme');
//     document.body.classList.toggle('dark-theme');

//     const className = document.body.className;
//     if(className == "light-theme") {
//         this.textContent = "Dark";
//     } else {
//         this.textContent = "Light";
//     }

//     console.log('current class name: ' + className);
// });
// /*
// function alertx(x){
// var x =x+x;
// alert(x);
// };
// alertx(2);
// */















// console.log("Hello script");
// // 從後端獲取資料
// fetch('http://localhost:8081/data')
//   .then(function(response) {
//     return response.json();
//   })
//   .then(function(data) {
//     var table = document.getElementById('myTable');
//     var tableHeader = table.getElementsByTagName('thead')[0].getElementsByTagName('tr')[0];
//     var tableBody = table.getElementsByTagName('tbody')[0];

//     // 動態生成欄位標題
//     for (var key in data.recordset[0]) {
//       var th = document.createElement('th');
//       th.textContent = key;
//       tableHeader.appendChild(th);
//     }

//     // 動態生成資料行
//     for (var i = 0; i < data.recordset.length; i++) {
//       var rowData = data.recordset[i];
//       var newRow = tableBody.insertRow(i);

//       for (var key in rowData) {
//         var cell = newRow.insertCell();
//         cell.textContent = rowData[key];
//       }
//     }
//   })
//   .catch(function(error) {
//     console.log('Error:', error);
//   });

// }