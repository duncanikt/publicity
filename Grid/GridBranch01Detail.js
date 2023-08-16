

  // search()
  var Master; // 定义全局变量
  var abortController = new AbortController(); // 移到函式外，讓同一個 controller 在不同的 search 被呼叫時也可以中斷前一個的請求
  var abortSignal = abortController.signal;

    var lastDoubleClickedRow ;
    var lastClickedRowData = null; // 用于存储上一次点击的行的数据
    var lastModifiedRow = null; // 记录最后一次单击修改按钮的行
    var button02 ;

  function search(Master,re) {

    // abortController.abort(); // 在執行新的 search 之前中斷前一個請求
    abortController = new AbortController();
    abortSignal = abortController.signal;
    if (window.Master === Master && window.Master !== re) {
      window.Master = Master;
      return;
    }
  // 将 Master 的值存储到全局变量提供给 function getMaxValueFromDatabase 使用
  window.Master = Master;
  var table = document.getElementById('myTable');
  var tableHeader = table.getElementsByTagName('thead')[0].getElementsByTagName('tr')[0];
  var tableBody = table.getElementsByTagName('tbody')[0];
  tableHeader.innerHTML = '';
  tableBody.innerHTML = '';

  // 清空新增資料欄位
  // document.getElementById('newCol1').value = '';
  document.getElementById('newCol2').value = '';
  document.getElementById('newCol3').value = '';
  document.getElementById('newCol4').value = '';
  // document.getElementById('newCol5').value = '';

  var addContainer = document.getElementById('addContainer');
  addContainer.classList.add('hidden'); // 隱藏新增資料容器

  // 判断动态表格是否有数据
  var tableBody = document.getElementById('myTable').getElementsByTagName('tbody')[0];
  var connectionStatus = document.getElementById('connectionStatus');
  connectionStatus.textContent = '連線中...';
  var searchInput = document.getElementById('searchInput').value;
  var startDate = document.getElementById('startDate').value;
  var endDate = document.getElementById('endDate').value;
  if (tableBody.children.length > 0) {
    // 动态表格有数据，执行下面的代码
    var firstColumnValue = document.querySelector('#myTable tbody tr:first-child td:first-child input').value;
    if (firstColumnValue === Master) {
      // 相同则不需要再连接后端，返回即可
      connectionStatus.textContent = Master;
      connectionStatus.style.fontSize = '20px';

      return;
    }
    tableHeader.innerHTML = '';
    tableBody.innerHTML = '';
  }
  var url =
    'https://i75birth.ddns.net/detail/detaildata?search=' +
    encodeURIComponent(Master); //+ '&startDate=' + encodeURIComponent(startDate) + '&endDate=' + encodeURIComponent(endDate)

    fetch(url, { signal: abortSignal })
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {


        if (data[0].DetailPosture.length === 0) {
          connectionStatus.textContent = '沒有資料';
          tableHeader.innerHTML = '';
          tableBody.innerHTML = '';
        } else {
          var columnMappings = {
            // 單號: 'ABC',
            日期編號: 'DetailPosture',
            身高: 'DetailPosture',
            體重: 'DetailPosture',
          };
        
          var columnNames = Object.keys(columnMappings);
          tableHeader.innerHTML = '';
          tableBody.innerHTML = '';
          for (var i = 0; i < columnNames.length; i++) {
            var th = document.createElement('th');
            var columnName = columnNames[i];
            var chineseName = columnName.match(/[\u4e00-\u9fa5]+/)[0]; // 提取中文部分
            th.innerHTML = '<label for="newCol' + (i + 1) + '">' + chineseName + '</label>';
            tableHeader.appendChild(th);
          }

          for (var i = 0; i < data.length; i++) {
            var cancelButton = document.createElement('button');
            var against = 'cancelButton' + Math.random().toString(36).substr(2, 9); // 设置唯一的 ID
            var rowData = data[i];
            var detailPostureData = rowData.DetailPosture;

            for (var j = 0; j < detailPostureData.length; j++) {
              var detailPosture = detailPostureData[j];
              var newRow = tableBody.insertRow();

              // var firstCell = newRow.insertCell();
              // var input = document.createElement('input');
              // input.type = 'text';
              // input.name = 'ABC';
              // input.value = rowData.ABC;
              // input.readOnly = true;
              // firstCell.appendChild(input);

              var cell3 = newRow.insertCell();
              var input3 = document.createElement('input');
              input3.type = 'text';
              input3.name = '日期編號';
              input3.value = detailPosture.ShoulderWidth;
              input3.readOnly = true;
              cell3.appendChild(input3);

              var cell1 = newRow.insertCell();
              var input1 = document.createElement('input');
              input1.type = 'text';
              input1.name = '身高';
              input1.value = detailPosture.height;
              input1.readOnly = true;
              cell1.appendChild(input1);

              var cell2 = newRow.insertCell();
              var input2 = document.createElement('input');
              input2.type = 'text';
              input2.name = '體重';
              input2.value = detailPosture.weight;
              input2.readOnly = true;
              cell2.appendChild(input2);
      
  


            var selectCell = newRow.insertCell();
            selectCell.style.width = '50px';
            selectCell.className = 'select-cell';

            var selectButton = document.createElement('button');
            selectButton.innerText = '修改';
            selectCell.appendChild(selectButton);

            selectButton.onclick = function() {

              var selectButton02 = event.currentTarget; // 获取触发事件的按钮元素
              // alert(selectButton02.innerText);
              var cancelButtonExists = document.querySelector('button[data-cancel-button-id]');
              // if (cancelButtonExists && selectButton02.innerText !== '修改') {
              //   // alert('ycancel');

              // }else{
                lastModifiedRow = this.closest('tr');
              // }

              // // 获取上一次点击行的数据
              // var lastClickedRowInputs = document.querySelectorAll('tr.selected input[type="text"], tr.selected input[type="date"]');
              // lastClickedRowInputs.forEach(function(input) {
              //   lastClickedRowData[input.name] = input.value;
              // });
              checkRow02 = this;
              if (selectButton02.innerText !== '儲存') {
                console.log('修改？',selectButton02.innerText);
                var cells02 ;
                if (lastClickedRowData) {
                  var row = lastClickedRowData.closest('tr'); // 获取按钮所在的行元素
                  cells02 = row.getElementsByTagName('input');
                }
                if (checkUnsavedChanges(cells02,4)) {
                  var cancelButtonExists = document.querySelector('button[data-cancel-button-id]');
                  lastModifiedRow = lastModifiedRow02;
                  return;
                }else{
                  checkRow02 = this;
                  lastClickedRowData = event.currentTarget; // 获取触发事件的按钮元素
                  lastModifiedRow02 = this.closest('tr');
                  // alert('更新了行的位置');

                }

              }
              // alert('等等');


              // // 检查表格中是否存在取消按钮或保存按钮
              // var cancelButtonExists = document.querySelector('button[data-cancel-button-id]');
              // var saveButtonExists = document.querySelector('.select-cell button[text="儲存"]');
              
              // if (cancelButtonExists || saveButtonExists) {
              //   // alert('請選擇儲存或取消。');
              //   // return;
              // }

              // // 获取上一次点击行的数据
              // var lastClickedRowInputs = document.querySelectorAll('tr.selected input[type="text"], tr.selected input[type="date"]');
              // lastClickedRowInputs.forEach(function(input) {
              //   lastClickedRowData[input.name] = input.value;
              // });



              // lastClickedRowData = Object.assign({}, originalData); // 保存上一次点击行的原始数据

              // checkRow = this;
              //   var button = event.currentTarget; // 获取触发事件的按钮元素
              //   var row = button.closest('tr'); // 获取按钮所在的行元素


              // var notSaved = [];
              // if (checkRow === checkRow02) {
              // }else{
              //   if (checkRow02){
              //     var keys = Object.keys(originalData);
              //     var cells02 = row.getElementsByTagName('input');
              //     console.log('lastClickedRowData',lastClickedRowData[keys[1]],originalData[keys[1]]);

              //     for (var j = 0; j < cells02.length; j++) {
              //     var input02 = cells02[j];
              //     // console.log('新',cells02[j],originalData[keys[j]]);
              //     console.log('比對',lastClickedRowData[keys[j]],originalData[keys[j]]);

              //     if(lastClickedRowData[keys[j]] !== originalData[keys[j]]){
              //       notSaved.push(lastClickedRowData[keys[j]]); // 将未保存的值添加到数组中


              //     }}
              //     // 检查是否有未保存的数据
              //     if (notSaved.length > 0) {
              //       // 在弹窗中显示未保存的数据
              //       alert('資料未儲存：' + notSaved.join(', '));
              //       return;
              //     }
              //   }
              // }




              // editRecord(this); // 傳遞當前按鈕的引用
              // 保存原始資料
              // button02 = this.querySelector('.select-cell button');
              var cells = this.parentNode.parentNode.getElementsByTagName('input');
              for (var j = 0; j < cells.length; j++) {
                var input = cells[j];
                originalData[input.name] = input.value;
              }   
              console.log('舊',originalData);

              // cancelUpdate(this, '', against) 
              
              var cancelButton = document.querySelector('button[data-cancel-button-id="' + against + '"]');
              var cancelButtonList = document.querySelectorAll('button[data-cancel-button-id]');
                  cancelButtonList.forEach(function(cancelButtonElement) {
                    if (cancelButtonElement !== cancelButton) {
                      cancelButtonElement.parentNode.removeChild(cancelButtonElement); // 移除非特定取消按钮
                    }
                  });

              var selectButtons = document.querySelectorAll('.select-cell button');
              selectButtons.forEach(function(button) {
                if (button !== this && button.innerText === '儲存') { // 排除用户点击的那一行
                  button.innerText = '修改';
                }
                button.style.backgroundColor = '';
                button.style.color = '';
                button.parentNode.parentNode.classList.remove('selected');
                button.parentNode.parentNode.querySelectorAll('input[type="text"], input[type="date"]').forEach(function(input) {
                  input.readOnly = true;
                });
              }, this);

              toggleButton(this);
              checkRow02 = this;
            };

            var spaceSpan = document.createElement('span');
            spaceSpan.style.marginRight = '2px';
            selectCell.appendChild(spaceSpan);

            var deleteButton = document.createElement('button');
            deleteButton.innerText = '刪除';
            deleteButton.classList.add('delete-button');
            deleteButton.onclick = function () {
              var rowdel = this.parentNode.parentNode;
              // var input2 = rowdel.querySelector('input');
              // var A02 = rowdel.querySelector('input');
              // var ABC = input2.value;


              var inputElements = rowdel.querySelectorAll('input');
              var ABCMaster = window.Master;
              var ShoulderWidth = inputElements[0].value;
              var confirmMessage = '確定刪除單號'+ABCMaster+'日期編號'+ShoulderWidth+' 嗎？';



              openWindow02();
              function openWindow02() {
                var w_width = 300;
                var w_height = 100;
                var x = (screen.width - w_width) / 2;
                var y = (screen.height - w_height) / 2;
                var ww = 'width=' + w_width + ',height=' + w_height + ',top=' + y + ',left=' + x;
                var openWIN = window.open('', '', ww);
                openWIN.document.write('<p>' + confirmMessage + '</p>');
                openWIN.document.write('<button onclick="confirmDelete()">確認</button>');
                openWIN.document.write('<button onclick="cancelDelete()">取消</button>');

                openWIN.confirmDelete = function () {
                  connectionStatus.textContent = '連線中...';
                  var table = document.getElementById('myTable');
                  var tableHeader = table.getElementsByTagName('thead')[0].getElementsByTagName('tr')[0];
                  var tableBody = table.getElementsByTagName('tbody')[0];
                  tableHeader.innerHTML = '';
                  tableBody.innerHTML = '';
                  console.log('查:', ABCMaster,ShoulderWidth);
                  deleteRecord('',ABCMaster,ShoulderWidth);
                  openWIN.close();
                };
                openWIN.cancelDelete = function () {
                  openWIN.close();
                };
            
              }


            };
            selectCell.appendChild(deleteButton);
            var checkRow ;
            var checkRow02 ;

            newRow.addEventListener('dblclick', function() {
              checkRow = this;
              var cells02 ;





            var lastClickedRowData02 = event.currentTarget; // 获取触发事件的按钮元素 
              var row = lastClickedRowData02.closest('tr'); // 获取按钮所在的行元素
              cells02 = row.getElementsByTagName('input');
              isSecondInputEditable = cells02[2].readOnly


              lastDoubleClickedRow = this;

            outerLoop: for (var i = 0; i < 1; i++) {
              if (lastModifiedRow === lastDoubleClickedRow) {
                console.log('點擊修改按鈕等於雙擊當下');
                if (isSecondInputEditable) {
                  console.log('錯了？');
                  var row = lastClickedRowData.closest('tr'); // 获取按钮所在的行元素
                  cells02 = row.getElementsByTagName('input');
                  if (checkUnsavedChanges(cells02, 4)) {
                    console.log('就是這裡');
                      // checkRow02 = this;
                      return;
                    } else {
                      console.log('02給值了');
                      checkRow02 = this;
                      lastClickedRowData = event.currentTarget; // 获取触发事件的按钮元素
                      lastModifiedRow02 = this;
                      break outerLoop; 
                    }
                    
                }
                // if (checkRow !== checkRow02) {
                //   if (checkUnsavedChanges(cells02, 4)) {
                //     console.log('尋找迴圈位置06');
                //     return
                //   }
                // }


                // if (cancelButtonExists) {
                //   console.log('資料相同不執行檢查');
                //   return;
                // }
                // 如果双击的是同一行，不需要检查
              return;
              }else{
                console.log('尋找迴圈位置04');
                if (checkRow === checkRow02) {
                  console.log('尋找迴圈位置03');
                  var cancelButtonExists = document.querySelector('button[data-cancel-button-id]');
                if (cancelButtonExists) {
                  console.log('取消按鈕存在就不更新');
                  return;
                }
                } else {
                  if (lastClickedRowData) {
                    var row = lastClickedRowData.closest('tr'); // 获取按钮所在的行元素
                    cells02 = row.getElementsByTagName('input');
                  }
                  if (checkUnsavedChanges(cells02, 4)) {
                    console.log('尋找迴圈位置01');
                    return;
                  } else {
                    console.log('尋找迴圈位置02');
                    checkRow02 = this;
                    lastClickedRowData = event.currentTarget; // 获取触发事件的按钮元素
                    lastModifiedRow02 = this;
                  }
                }
              }
            }


              
              // if (checkRow02){
              //     var cells02 = button02.parentNode.parentNode.getElementsByTagName('input');
              //     for (var j = 0; j < cells02.length; j++) {
              //     var input02 = cells02[j];
              //     console.log('先值先值',cells02[j].value);}
              //     }
                  


              // if (checkUnsavedChanges(cells02,3)) {
              //   checkRow02 = this;
              //   return;
              // }else{
              //   checkRow02 = this;
              //   button02 = this.querySelector('.select-cell button');
              // }

              


              // checkRow = this;
              // var button = this.querySelector('.select-cell button');
              // var notSaved = [];
              // if (checkRow === checkRow02) {
              // }else{
              //   if (checkRow02){
              //     var cells02 = button02.parentNode.parentNode.getElementsByTagName('input');
              //     var cells = button.parentNode.parentNode.getElementsByTagName('input');
              //     for (var j = 0; j < cells.length; j++) {
              //     var input = cells[j];
              //     var input02 = cells02[j];
              //     console.log('先值',cells02[j].value);
              //     if(input02.value !== originalData[input.name]){
              //       notSaved.push(input02.value); // 将未保存的值添加到数组中
              //     }}
              //     // 检查是否有未保存的数据
              //     if (notSaved.length > 0) {
              //       // 在弹窗中显示未保存的数据
              //       alert('資料未儲存：' + notSaved.join(', '));
              //       return;
              //     }
              //   }
              // // 保存原始資料
              // button02 = this.querySelector('.select-cell button');
              // var cells = button02.parentNode.parentNode.getElementsByTagName('input');
              // for (var j = 0; j < cells.length; j++) {
              //   var input = cells[j];
              //   originalData[input.name] = input.value;
              // }

              // }









                var button = this.querySelector('.select-cell button');
                if (button.innerText === '修改') {
                  toggleButton(button);
                }
                console.log('尋找迴圈位置05');
                checkRow02 = this;
                var cancelButton = document.querySelector('button[data-cancel-button-id="' + against + '"]');
                var cancelButtonList = document.querySelectorAll('button[data-cancel-button-id]');
                cancelButtonList.forEach(function(cancelButtonElement) {
                  if (cancelButtonElement !== cancelButton) {
                    cancelButtonElement.parentNode.removeChild(cancelButtonElement); // 移除非特定取消按钮
                  }
                });
                    editRecord(button); // 傳遞當前按鈕的引用
                    selectRow(this);
            });
      
            newRow.addEventListener('click', function () {
              selectRow(this);
            });
          }
        }
        connectionStatus.textContent = Master;
        connectionStatus.style.fontSize = '20px';

    }  

  })
    .catch(function (error) {
      if (error.name === 'AbortError') {
        // 中止請求，不需要顯示 "連線失敗..." 的訊息
        return;
      }

      console.log('Error:', error);
      var errorElement = document.createElement('div');
      // errorElement.innerText = '後端伺服器連線失敗';
      document.body.appendChild(errorElement);
      connectionStatus.textContent = '連線失敗...';
    });

  }

function getValueByPath(obj, path) {
  var keys = path.split('.');
  var value = obj;
  for (var i = 0; i < keys.length; i++) {
    value = value[keys[i]];
    if (typeof value === 'undefined') {
      return '';
    }
  }
  return value;
}

        // function toggleAddContainer() {
        //   var addContainer = document.getElementById("addContainer");
        //   addContainer.classList.toggle("hidden");
        // }

        function addData() {
          var id = document.getElementById("inputId").value;
          var name = document.getElementById("inputName").value;
          var age = document.getElementById("inputAge").value;

          // 添加数据到data数组

          toggleAddContainer();
        }

  // 儲存原始資料的變量
  var originalData = {};

  function generateDetailTable(rowData) {
    var detailTable = '<table>';
    detailTable += '<thead>';
    detailTable += '<tr>';

    // 動態生成詳細資料的欄位標題
    for (var key in rowData) {
      detailTable += '<th>' + key + '</th>';
    }

    detailTable += '</tr>';
    detailTable += '</thead>';
    detailTable += '<tbody>';
    detailTable += '<tr>';

    // 動態生成詳細資料的欄位值
    for (var key in rowData) {
      detailTable += '<td>' + rowData[key] + '</td>';
    }

    detailTable += '</tr>';
    detailTable += '</tbody>';
    detailTable += '</table>';

    return detailTable;
  }

  function toggleButton(button) {



    // if (button.innerText === '修改') {
    //   // 先取消先前选定行的修改
    //   var cancelButton = document.querySelector('.button-container button');
    //   if (cancelButton) {
    //     cancelButton.click();
    //   }

    //   button.innerText = '儲存';
    //   button.style.backgroundColor = 'red';
    //   button.style.color = '';

    //   var cancelButtonId = 'cancelButton' + Math.random().toString(36).substr(2, 9);
    //   var cancelButtonElement = createCancelButton(cancelButtonId);
    //   button.parentNode.appendChild(cancelButtonElement);
      
    //   cancelButtonElement.onclick = function() {
    //     cancelUpdate(button, cancelButtonId);
    //   };
    // }




    if (button.innerText === '修改') {
      button.innerText = '儲存';
      button.style.backgroundColor = 'red';
      button.style.color = '';
      // 隱藏所有刪除按鈕
      var deleteButtons = document.querySelectorAll('button.delete-button');
      deleteButtons.forEach(function(button) {
        button.style.display = 'none';
      });
      
      // 保存原始資料
      var cells = button.parentNode.parentNode.getElementsByTagName('input');
      for (var j = 0; j < cells.length; j++) {
        var input = cells[j];
        originalData[input.name] = input.value;
      }

      var cancelButton = document.createElement('button');
      var cancelButtonId = 'cancelButton' + Math.random().toString(36).substr(2, 9); // 设置唯一的 ID
      cancelButton.innerText = '取消';
      cancelButton.setAttribute('data-cancel-button-id', cancelButtonId); // 设置自定义属性保存取消按钮的 ID
      button.parentNode.appendChild(cancelButton);
      cancelButton.onclick = function() {
        cancelUpdate(button, cancelButtonId); // 获取取消按钮的 ID 并作为参数传递给 cancelUpdate 函数
      };
      



      // button.parentNode.appendChild(document.createElement('br')); // 新增換行元素
      // button.parentNode.appendChild(cancelButton);

    } else 
    {
      // 获取当前行的所有单元格
      var cells = button.parentNode.parentNode.getElementsByTagName('input');
      // cells = DBTableTeader ;
      // 创建包含要发送的数据的对象
      var data = {};
      var data02 = {};
      // data[cells[0].name] = cells[0].value; // 获取第一列数据


        connectionStatus.textContent = '儲存中...'; 
        // 隱藏所有修改按鈕
        var selectButtons = document.querySelectorAll('.select-cell button');
        selectButtons.forEach(function(button) {
          button.style.display = 'none';
        });
        button.innerText = '儲存中...';
        button.disabled = true;
        var DBTableTeader = [
      "ShoulderWidth",
      "height",
      "weight"
    ];

        for (var j = 0; j < cells.length; j++) 
        {
          var input = cells[j];
            var oldColumnName = input.name; // 原始屬性名稱
            var newColumnName = DBTableTeader[j]; // 欲更改為的新屬性名稱
            data02[newColumnName] = input.value;
            // 添加ABC属性
            data02['ABC'] = window.Master;
            // 刪除原始的屬性名稱
            delete data02[oldColumnName];
        }
        data = data02;
        // 发送修改请求，保存数据
        var url = 'https://i75birth.ddns.net/detail/detailupdate';
        fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        })
          .then(function(response) {
            console.log('Data sent to server:', data);
            if (response.ok) {
              openWindow('','','更新成功'); 
              // 将按钮文本设置为"修改"
              button.innerText = '修改';
              button.disabled = false;
              button.style.backgroundColor = '';
              button.style.color = '';
              // button.parentNode.removeChild(button.nextSibling); // 移除"取消"按钮  不移除也沒差因為下一行重新search()了
              // search();
              // selectRow(cells);
              // input[1].readOnly = true;

              for (var j = 0; j < cells.length; j++) 
              {
                var input = cells[j];
                input.readOnly = true;
              }
              // 顯示刪除按鈕
              var deleteButtons = document.querySelectorAll('button.delete-button');
              deleteButtons.forEach(function(button) {
                button.style.display = 'inline-block';
              });
              connectionStatus.textContent = ''; 
              // 顯示修改按鈕
              var selectButtons = document.querySelectorAll('.select-cell button');
              selectButtons.forEach(function(button) {
                button.style.display = 'inline-block';
              });


            } else {
              console.log('Update failed:', response.statusText);
            }
          })
          .catch(function(error) {
            console.log('Error:', error);
            // 連線失敗的處理邏輯
            var errorElement = document.createElement('div');
            errorElement.innerText = '後端伺服器連線失敗';
            document.body.appendChild(errorElement);
          });
    }
  }



  function editRecord(button) {
    var rows = document.getElementsByTagName('tr');
    // 將所有修改按鈕設置為只能讀取
    var selectButtons = document.querySelectorAll('.select-cell button');
    selectButtons.forEach(function(button) {
      if (button.innerText === '儲存') { // 仅当按钮文本为 "儲存" 时才进行更改
        button.innerText = '修改';
        button.style.backgroundColor = '';
        button.style.color = '';
      }
      // button.parentNode.parentNode.classList.remove('selected');
      button.parentNode.parentNode.querySelectorAll('input[type="number"]').forEach(function(input) {
        input.readOnly = true;
      });
    });

    toggleButton(button);
  }


  function cancelUpdate(button, cancelButtonId, against) {
    // 還原資料
    var cells = button.parentNode.parentNode.getElementsByTagName('input');
    for (var j = 0; j < cells.length; j++) {
      var input = cells[j];
      input.value = originalData[input.name];
    }
      button02 = button;
      checkUnsavedChanges(cells,4);

    // button.parentNode.removeChild(button.nextSibling); // 移除換行元素
    // button.parentNode.removeChild(button.nextSibling); // 移除換行元素
    // button.parentNode.removeChild(button.nextSibling); // 移除換行元素
    // button.parentNode.removeChild(button.nextSibling); // 移除"取消"按鈕
    // var row = button.parentNode.parentNode;
    // var tableBody = document.getElementById('addContainer').getElementsByTagName('tbody')[0];
    // tableBody.deleteRow(row.rowIndex);

    if (against) {
      var cancelButton = document.querySelector('button[data-cancel-button-id="' + against + '"]');
      var cancelButtonList = document.querySelectorAll('button[data-cancel-button-id]');
      cancelButtonList.forEach(function(cancelButtonElement) {
        if (cancelButtonElement !== cancelButton) {
          cancelButtonElement.parentNode.removeChild(cancelButtonElement); // 移除非特定取消按钮
        }
      });
    }

    if (cancelButtonId) {
    var cancelButtons = document.querySelectorAll('button[data-cancel-button-id]');
    cancelButtons.forEach(function(cancelButton) {
      cancelButton.parentNode.removeChild(cancelButton); // 移除所有取消按钮
    });
  }

    var selectButtons = document.querySelectorAll('.select-cell button');
    selectButtons.forEach(function(button) {
      if (button.innerText === '儲存') { // 仅当按钮文本为 "儲存" 时才进行更改
        button.innerText = '修改';
      }
      button.style.backgroundColor = '';
      button.style.color = '';
      button.parentNode.parentNode.classList.remove('selected');
      button.parentNode.parentNode.querySelectorAll('input[type="text"]').forEach(function(input) {
        input.readOnly = true;
      });
    });

    // 顯示刪除按鈕
    // 检查是否所有取消按钮都已被移除
    // 只有当所有取消按钮都被移除时才显示删除按钮
      // 顯示刪除按鈕
      var deleteButtons = document.querySelectorAll('button.delete-button');
      deleteButtons.forEach(function(button) {
        button.style.display = 'inline-block';
      });
    
  }


  function selectRow(row) {
    // 清除之前选中的行样式
    var selectedRow = document.querySelector('.selected');
    if (selectedRow) {
      selectedRow.classList.remove('selected');
    }

    // 设置当前行为选中状态
    row.classList.add('selected');
    // 获取当前行的所有单元格
    var cells = row.getElementsByTagName('input');

    // 检查是否点击了"選擇"按鈕
    var selectButton = row.querySelector('button');
    if (selectButton.innerText === '修改') {
      // 将所有单元格设置为只读状态
      for (var j = 0; j < cells.length; j++) {
        var input = cells[j];
        input.readOnly = true;
      }
      // 清空选中行的数据
    } else {
      // 将所有单元格设置为可编辑状态
      for (var j = 1; j < cells.length; j++) {
        var input = cells[j];
        input.readOnly = false;
        input.type = 'number'; // 将輸入框改成 type="number"

      }

    }

    // 检查是否双击了该行
    // var isDoubleClick = false;
    // row.addEventListener('dblclick', function() {
    //   isDoubleClick = true;
    // });

    // // 点击行的修改按钮
    // if (isDoubleClick) {
    //   toggleButton(selectButton);
    //   isDoubleClick = false; // 重置双击标志
    // }

  }

  function generateDetailRow(rowData) {
    var detailRowHTML = '';
    for (var key in rowData) {
      detailRowHTML += '<td>' + rowData[key] + '</td>';
    }
    return detailRowHTML;
  }

    document.getElementById('searchInput').addEventListener('keydown', function(event) {
  if (event.key === 'Enter') {
    event.preventDefault(); // 防止默认的Enter键行为（提交表单）
    search(); // 调用查询函数
  }
  });

  /*
   * toggleAddContainer 函式用於切換新增資料容器的顯示狀態。
   * 若新增資料容器為隱藏狀態，則移除 'hidden' class 以顯示容器。
   * 若新增資料容器已顯示，則新增 'hidden' class 以隱藏容器。
   */
  function toggleAddContainer() {
    var AddContaine = window.Master;
    connectionStatus.textContent = AddContaine;

    var addButton = document.getElementById('addButton');
    var addContainer = document.getElementById('addContainer');
    var today = new Date().toISOString().split('T')[0];
    // document.getElementById('newCol5').value = today;

    if (addContainer.classList.contains('hidden')) {
      addContainer.classList.remove('hidden');
      getMaxValueFromDatabase();
    } else {
      addContainer.classList.add('hidden');
    }
  }
  
  /*
   * 監聽整個文件的點擊事件，當點擊的目標不是新增按鈕、新增按鈕的父節點、新增資料容器本身，以及新增資料容器內的元素時，
   * 將新增資料容器設為隱藏狀態。
   */
  document.addEventListener('click', function(event) {
    var target = event.target;
    var addButton = document.getElementById('addButton');
    var addContainer = document.getElementById('addContainer');
    var cancelAdd = document.getElementById('cancelAdd');
    if (
      // target !== addButton &&                             // 目標不是「新增」按鈕本身
      // target.parentNode !== addButton &&                  // 目標不是「新增」按鈕的父節點（即包含文字的元素）
      // target !== addContainer &&                          // 目標不是「addContainer」本身
      // !addContainer.contains(target) ||                   // 目標不是「addContainer」的子元素
      target === cancelAdd                                // 目標是「取消按鈕」元素本身
    ) {
      addContainer.classList.add('hidden');               // 隱藏新增資料容器
    }

  });
  function cancelAdd() {
    // document.getElementById('newCol1').value = '';
    document.getElementById('newCol2').value = '';
    document.getElementById('newCol3').value = '';
    document.getElementById('newCol4').value = '';
    // document.getElementById('newCol5').value = '';
  }

  function getMaxValueFromDatabase(Master) 
    {
      // 在这里访问并使用全局变量 Master 的值來自function search
        var currentMaster = window.Master;
        var newCol1Input = currentMaster;
        // newCol1Input.value = currentMaster;
        var saveButton = document.getElementById('saveAdd'); // 获取保存按钮元素
        document.getElementById('newCol2').value = '新單號建立中...';
        saveButton.setAttribute('disabled', 'true');
        var url = 'https://i75birth.ddns.net/detail/detailmaxValue?master=' + encodeURIComponent(currentMaster);
        fetch(url)
          .then(function(response) {
            return response.json();
          })
          .then(function(data) {
            var maxVal = data.maxValue;
            var today = new Date();
            var formattedDate = formatDate(today); // 格式化今天的日期，例如 20230713
            var newCol2Input = document.getElementById('newCol2');
            var newCol2Value = generateNewValue(maxVal, formattedDate); // 生成新的单号
            newCol2Input.value = newCol2Value;
            //请求成功时移除或隐藏连接状态文本
            // connectionStatus.textContent = '';
            saveButton.removeAttribute('disabled');
          })
          .catch(function(error) {
            console.log('Error:', error);
            // 連線失敗的處理邏輯
            var errorElement = document.createElement('div');
            errorElement.innerText = '後端伺服器連線失敗';
            document.getElementById('newCol2').value = '單號建立失敗';

            document.body.appendChild(errorElement);
          });
    }

  // 格式化日期，例如将 2023-07-13 转换为 20230713
  function formatDate(date) {
    var year = date.getFullYear();
    var month = (date.getMonth() + 1).toString().padStart(2, '0');
    var day = date.getDate().toString().padStart(2, '0');
    return year + month + day;
  }

  // 生成新的单号
  function generateNewValue(maxValue, formattedDate) {
    console.log('查=', maxValue,'查end');
    var prefix = ''; //'Aws'; 
    var numberPart = '';
    var numberPart01 = '';
    if (maxValue === 0) 
    {
    }
    else{
      numberPart = maxValue.substr(maxValue.length - 3); // 获取最后三位数字}
      var numberPart01 = maxValue.substr(0,8); // 比對今天日期
    }
    var number = parseInt(numberPart);
    var newNumber = number + 1;
    var newNumberPart = newNumber.toString().padStart(3, '0'); // 将新的数字部分转换为三位数格式
    console.log(numberPart01, formattedDate);

    if (numberPart01 === formattedDate) {
      return prefix + formattedDate + newNumberPart;
      }else{
        return prefix + formattedDate + '001';
      }


  }



  function saveRecord() 
    {
      // var newCol1 = document.getElementById('newCol1').value;
      var newCol2 = document.getElementById('newCol2').value;
      var newCol3 = document.getElementById('newCol3').value;
      var newCol4 = document.getElementById('newCol4').value;
      // var newCol5 = document.getElementById('newCol5').value;
      // 檢查 newCol3 和 newCol4 是否為數字
      if (isNaN(newCol3) || isNaN(newCol4)) {
        alert('只能輸入數字');
        return; // 如果不是數字，直接返回，不執行後續保存操作
      }


      var saveButton = document.getElementById('saveAdd');
      saveButton.innerText = 'saving...';
      saveButton.disabled = true; // 禁用按钮，防止重复点击

      var cancelButton = document.getElementById('cancelAdd');
      cancelButton.style.display = 'none'; // 隐藏Cancel按钮
      var saveMaster = window.Master;


      var data = {
        newCol1: saveMaster,
        newCol2: newCol2,
        newCol3: newCol3,
        newCol4: newCol4
        // newCol5: newCol5
      };

      fetch('https://i75birth.ddns.net/detail/detailinsert', { // 替换为后端 MongoDB 的 URL
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        })
        .then(function(response) {
          if (response.ok) {
            // 新增成功，弹出提示窗口
            openWindow(saveButton,cancelButton,'新增成功');

            // 隱藏新增資料容器
            document.getElementById('addContainer').classList.add('hidden');

            // 重新載入資料
            var currentMaster = window.Master;
            search(currentMaster,currentMaster);
            // searchInput.value = newCol1; // 将新增的数据作为搜索输入值
            // 清空新增資料欄位
            // document.getElementById('newCol1').value = '';
            document.getElementById('newCol2').value = '';
            document.getElementById('newCol3').value = '';
            document.getElementById('newCol4').value = '';
            // document.getElementById('newCol5').value = '';

          } else {
              // 新增失敗，處理錯誤訊息
              response.json().then(function (errorData) {
                if (errorData.error === 'ShoulderWidth already exists') {
                  // 顯示彈窗告知使用者該ShoulderWidth已存在，請重新操作
                  alert('今日編號已存在，請重新點選新增按鈕。');
                  saveButton.innerText = 'Save';
                  saveButton.disabled = false; // 解除按钮
                  cancelButton.style.display = 'inline-block'; // 显示Cancel按钮
                  toggleAddContainer();
                } else {
                  // 其他錯誤訊息，可根據實際情況處理
                  console.log('Insert failed:', response.statusText);
                }
              });
            }
          })
          .catch(function (error) {
            console.log('Error:', error);
            // 連線失敗的處理邏輯
            var errorElement = document.createElement('div');
            errorElement.innerText = '後端伺服器連線失敗';
            document.body.appendChild(errorElement);
          });
      }




    function deleteRecord(button, ABC1, ShoulderWidth1) {
      var ABC = ABC1;
      var ShoulderWidth = ShoulderWidth1;

      // 发送删除请求
      var url = 'https://i75birth.ddns.net/detail/detaildelete';

      fetch(url, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ABC: ABC, ShoulderWidth: ShoulderWidth })
      })
        .then(function(response) {
          if (response.ok) {
            var Mas = window.Master ;
            search(Mas,Mas) ;

          } else {
            console.log('Delete failed:', response.statusText);
          }
        })
        .catch(function(error) {
          console.log('Error:', error);
          // 处理连接失败逻辑
          var errorElement = document.createElement('div');
          errorElement.innerText = '后端服务器连接失败';
          document.body.appendChild(errorElement);
        });
    }














    







var masterTable = document.getElementById('addContainer');
var detailTable = document.getElementById('detailTable');

// 点击主表格行时触发事件
// addContainer.addEventListener('click', function(event) {
//   var selectedRow = event.target.parentNode;
//   var detailData = getDetailData(selectedRow); // 根据选中的行获取明细数据

//   displayDetailTable(detailData); // 显示明细表格
// });


function displayDetailTable(detailData) {
  // 清空明细表格内容
  detailTable.innerHTML = '';

  // 创建表头行
  var headerRow = document.createElement('tr');
  var headers = ['ID', 'Name', 'Value'];

  for (var i = 0; i < headers.length; i++) {
    var th = document.createElement('th');
    th.textContent = headers[i];
    headerRow.appendChild(th);
  }

  detailTable.appendChild(headerRow);

  // 创建数据行
  for (var i = 0; i < detailData.length; i++) {
    var detail = detailData[i];
    var row = document.createElement('tr');

    for (var key in detail) {
      var cell = document.createElement('td');
      cell.textContent = detail[key];
      row.appendChild(cell);
    }

    detailTable.appendChild(row);
  }
}






  function checkUnsavedChanges(aaaaa,bbbb) {
    console.log('進入checkUnsavedChanges');

  var notSaved = [];
  var keys = Object.keys(originalData);
  var lastClickedRowData = {};
  var lastClickedRowInputs = document.querySelectorAll('tr.selected input[type="text"], tr.selected input[type="date"]');
  lastClickedRowInputs.forEach(function(input) {
    lastClickedRowData[input.name] = input.value;
  });

if (bbbb===4){
  console.log('進入bbbb===4');
    var cccc =  aaaaa ;
    aaaaa = [];
    for (var j = 0; j < keys.length; j++) {
    // console.log('值99',cccc[j].value);
    aaaaa[j] = cccc[j].value;
    // console.log('值88',aaaaa[j]);
    }
}

  for (var j = 0; j < keys.length; j++) {
    var key = keys[j];
    // console.log('值',aaaaa[j],'值2',originalData[key]);

    if (aaaaa[j] !== originalData[key] && aaaaa!==undefined ) {
      notSaved.push(aaaaa[j]);
    }
  }

  if (notSaved.length > 0) {
    alert('未儲存：' + notSaved.join(', '));
    // alert('修改資料未儲存');
    return true;
  }

  return false;
}



function openWindow(saveButton,cancelButton,message) {
  var w_width = 200;
  var w_height = 100;
  var x = (screen.width - w_width) / 2;
  var y = (screen.height - w_height) / 2;
  var ww = 'width=' + w_width + ',height=' + w_height + ',top=' + y + ',left=' + x;
  var openWIN = window.open('', '', ww);
  openWIN.document.write('<h2 style="text-align: center;">' + message + '</h2>');
  // openWIN.document.write('<button onclick="window.close()" style="display: block; margin: 0 auto;">確認</button>');
  // 判断 saveButton 和 cancelButton 是否有值
  if (saveButton && cancelButton) {
    saveButton.innerText = 'Save';
    saveButton.disabled = false; // 禁用按钮，防止重复点击
    cancelButton.style.display = 'inline-block'; // 显示Cancel按钮
  }
  setTimeout(function() {
    openWIN.close();
  }, 500); // 0.5秒后自动关闭弹窗
}




console.log("script end");

