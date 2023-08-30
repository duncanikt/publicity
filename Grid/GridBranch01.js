let GridBranch01_js01='' ;
let GridBranch01_js02='' ;
let GridBranch01_js03='' ;
let GridBranch01_js04='' ;
let GridBranch01_js05='' ;
const useSensitiveEnv = false;  // 使用sensitive.env還是sensitive00.env


  var lastDoubleClickedRow ;     // 用於雙擊和單擊修改按鈕交互關聯
  var lastClickedRowData = null; // 用於雙擊和單擊修改按鈕交互關聯
  var lastModifiedRow = null;    // 用於雙擊和單擊修改按鈕交互關聯
  var lastModifiedRow02 = null;  // 用於雙擊和單擊修改按鈕交互關聯
  var button02 ;


  function search(addBT) {  
    // 獲取 URL 參數中的權杖
  const token = localStorage.getItem('jwt');
    var button = document.getElementById('search');
    button.innerText = '查詢中...';
    button.disabled = true;
    var connectionStatus = document.getElementById('connectionStatus');
    connectionStatus.textContent = '連線中...'; 
    var searchInput = addBT;
    if (!searchInput) {
      searchInput = document.getElementById('searchInput').value;
    }

    var engName = document.getElementById('engName').value;
    var startDate = document.getElementById('startDate').value;
    var endDate = document.getElementById('endDate').value;
    var table = document.getElementById('myTable');
    var tableHeader = table.getElementsByTagName('thead')[0].getElementsByTagName('tr')[0];
    var tableBody = table.getElementsByTagName('tbody')[0];
    tableHeader.innerHTML = '';
    tableBody.innerHTML = '';

    // 關閉模態框
    var modal = document.getElementById('myModal');
    modal.style.display = 'none';
    var url = GridBranch01_js01 + encodeURIComponent(searchInput) +  '&engName=' + encodeURIComponent(engName) + '&startDate=' + encodeURIComponent(startDate) + '&endDate=' + encodeURIComponent(endDate);
    addBT = '' ;
    fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      // credentials: 'include',
    })
      .then(function(response) {
        if (response.status === 401) {
          return;
        }
        return response.json();
      })
      .then(function(data) {
        var columnMappings = {
          "單號": "ABC",
          "原國姓名": "NameABC",
          "台灣姓名": "NameABCTW",
          "英文名": "NameABCEng",
          "日期": "Date"
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
          var against = 'cancelButton' + Math.random().toString(36).substr(2, 9); // 設置唯一的 ID
          var rowData = data[i];
          var newRow = tableBody.insertRow(i);

          for (var j = 0; j < columnNames.length; j++) {
            var cell = newRow.insertCell();
            var columnName = columnNames[j];
            var value = rowData[columnMappings[columnName]];

            if (value instanceof Date) {
              value = value.toLocaleDateString();
            }

            var input = document.createElement('input');
            input.type = 'text';
            if (columnName === '日期') {
              input.type = 'date'; // 將輸入框的類型更改為 "date"
            }
            input.name = columnName;
            input.value = value;
            input.readOnly = true;
            cell.appendChild(input);
          }

          var selectCell = newRow.insertCell();
          selectCell.style.width = '50px';
          selectCell.className = 'select-cell';

          var selectButton = document.createElement('button');
          selectButton.innerText = '修改';
          selectCell.appendChild(selectButton);
          selectButton.onclick = function() {

            var selectButton02 = event.currentTarget; // 獲取觸發事件的按鈕元素
            var cancelButtonExists = document.querySelector('button[data-cancel-button-id]');
            lastModifiedRow = this.closest('tr');
            checkRow02 = this;
            if (selectButton02.innerText !== '儲存') {
              var cells02 ;
              if (lastClickedRowData) {
                var row = lastClickedRowData.closest('tr'); // 獲取按鈕所在的行元素
                cells02 = row.getElementsByTagName('input');
              }
              if (checkUnsavedChanges(cells02,4)) {
                var cancelButtonExists = document.querySelector('button[data-cancel-button-id]');
                lastModifiedRow = lastModifiedRow02;
                return;
              }else{
                checkRow02 = this;
                lastClickedRowData = event.currentTarget; // 獲取觸發事件的按鈕元素
                lastModifiedRow02 = this.closest('tr');
              }
            }
            var cells = this.parentNode.parentNode.getElementsByTagName('input');
            for (var j = 0; j < cells.length; j++) {
              var input = cells[j];
              originalData[input.name] = input.value;
            }   
            var cancelButton = document.querySelector('button[data-cancel-button-id="' + against + '"]');
            var cancelButtonList = document.querySelectorAll('button[data-cancel-button-id]');
                cancelButtonList.forEach(function(cancelButtonElement) {
                  if (cancelButtonElement !== cancelButton) {
                    cancelButtonElement.parentNode.removeChild(cancelButtonElement); // 移除非特定取消按鈕
                  }
                });
            var selectButtons = document.querySelectorAll('.select-cell button');
            selectButtons.forEach(function(button) {
              if (button !== this && button.innerText === '儲存') { // 排除用戶點擊的那一行
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
          deleteButton.onclick = function() {
            var rowdel = this.parentNode.parentNode;
            var input = rowdel.querySelector('input');
            var ABC = input.value;
            var confirmMessage = '確定刪除單號 ' + ABC + ' 嗎？';
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
              openWIN.document.body.innerHTML = '<p>等待刪除中...</p>'; // 將彈窗中的內容改成 "等待刪除中..."

              // 隱藏或移除確認按鈕和取消按鈕
              var confirmButton = openWIN.document.querySelector('button[onclick="confirmDelete()"]');
              var cancelButton = openWIN.document.querySelector('button[onclick="cancelDelete()"]');
              if (confirmButton) {
                confirmButton.style.display = 'none'; // 隱藏確認按鈕
              }
              if (cancelButton) {
                cancelButton.parentNode.removeChild(cancelButton); // 移除取消按鈕
              }
                deleteRecord(input)
                  .then(() => {
                    openWIN.close(); // 等待 deleteRecord 完成後再關閉視窗
                  })
                  .catch((error) => {
                    console.log('Error:', error);
                  });
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
            var lastClickedRowData02 = event.currentTarget; // 獲取觸發事件的按鈕元素 
            var row = lastClickedRowData02.closest('tr'); // 獲取按鈕所在的行元素
            cells02 = row.getElementsByTagName('input');
            isSecondInputEditable = cells02[2].readOnly
            lastDoubleClickedRow = this;
          outerLoop: for (var i = 0; i < 1; i++) {
            if (lastModifiedRow === lastDoubleClickedRow) {
              if (isSecondInputEditable) {
                var row = lastClickedRowData.closest('tr'); // 獲取按鈕所在的行元素
                cells02 = row.getElementsByTagName('input');
                if (checkUnsavedChanges(cells02, 4)) {
                    return;
                  } else {
                    checkRow02 = this;
                    lastClickedRowData = event.currentTarget; // 獲取觸發事件的按鈕元素
                    lastModifiedRow02 = this;
                    break outerLoop; 
                  }
              }
            return;
            }else{
              if (checkRow === checkRow02) {
                var cancelButtonExists = document.querySelector('button[data-cancel-button-id]');
              if (cancelButtonExists) {
                return;
              }
              } else {
                if (lastClickedRowData) {
                  var row = lastClickedRowData.closest('tr'); // 獲取按鈕所在的行元素
                  cells02 = row.getElementsByTagName('input');
                }
                if (checkUnsavedChanges(cells02, 4)) {
                  return;
                } else {
                  checkRow02 = this;
                  lastClickedRowData = event.currentTarget; // 獲取觸發事件的按鈕元素
                  lastModifiedRow02 = this;
                }
              }
            }
          }
              var button = this.querySelector('.select-cell button');
              if (button.innerText === '修改') {
                toggleButton(button);
              }
              checkRow02 = this;
              var cancelButton = document.querySelector('button[data-cancel-button-id="' + against + '"]');
              var cancelButtonList = document.querySelectorAll('button[data-cancel-button-id]');
              cancelButtonList.forEach(function(cancelButtonElement) {
                if (cancelButtonElement !== cancelButton) {
                  cancelButtonElement.parentNode.removeChild(cancelButtonElement); // 移除非特定取消按鈕
                }
              });
                  editRecord(button); // 傳遞當前按鈕的引用
                  selectRow(this);
          });
         
          newRow.addEventListener('click', function() {
            selectRow(this);
          });
        }
        // 請求成功時移除或隱藏連接狀態文本
        connectionStatus.textContent = '';
        button.innerText = '查詢';
        button.disabled = false;    
      })
      .catch(function(error) {
        console.log('Error:', error);
        var errorElement = document.createElement('div');
        errorElement.innerText = '後端伺服器連線失敗';
        document.body.appendChild(errorElement);
        connectionStatus.textContent = '連線失敗...'; 
      });
  
  }
        function addData() {
          var id = document.getElementById("inputId").value;
          var name = document.getElementById("inputName").value;
          var age = document.getElementById("inputAge").value;
          // 添加資料到data陣列
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
      var cancelButtonId = 'cancelButton' + Math.random().toString(36).substr(2, 9); // 設置唯一的 ID
      cancelButton.innerText = '取消';
      cancelButton.setAttribute('data-cancel-button-id', cancelButtonId); // 設置自訂屬性保存取消按鈕的 ID
      button.parentNode.appendChild(cancelButton);
      cancelButton.onclick = function() {
        cancelUpdate(button, cancelButtonId); // 獲取取消按鈕的 ID 並作為參數傳遞給 cancelUpdate 函數
      };
    } else 
    {
      // 隱藏所有修改按鈕
      var selectButtons = document.querySelectorAll('.select-cell button');
      selectButtons.forEach(function(button) {
        button.disabled = true;
      });
        button.innerText = '儲存中...';
        button.disabled = true;
        var DBTableTeader = 
        [
          "ABC",
          "NameABC",
          "NameABCTW",
          "NameABCEng",
          "Date"
        ];
        // 獲取當前行的所有儲存格
        var cells = button.parentNode.parentNode.getElementsByTagName('input');

        // 創建包含要發送的資料的物件
        var data = {};
        var data02 = {};
        // data[cells[0].name] = cells[0].value; // 獲取第一列資料
        for (var j = 0; j < cells.length; j++) {
          var input = cells[j];
          if (!input.readOnly) { // 只獲取可編輯的儲存格資料
            data02[input.name] = input.value;
          }
        }
        for (var j = 0; j < cells.length; j++) 
        {
          var input = cells[j];
            var oldColumnName = input.name; // 原始屬性名稱
            var newColumnName = DBTableTeader[j]; // 欲更改為的新屬性名稱
            data02[newColumnName] = input.value;

            // 刪除原始的屬性名稱
            delete data02[oldColumnName];
          
        }
        data = data02;

        // 發送修改請求，保存資料
        var url = GridBranch01_js02;
        fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        })
          .then(function(response) {
            if (response.ok) {
              openWindow('','','更新成功');                
              // 將按鈕文本設置為"修改"
              button.innerText = '修改';
              button.disabled = false;
              button.style.backgroundColor = '';
              button.style.color = '';
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
              // 顯示修改按鈕
              var selectButtons = document.querySelectorAll('.select-cell button');
              selectButtons.forEach(function(button) {
                // button.style.display = 'inline-block';
                button.disabled = false;
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
      if (button.innerText === '儲存') { // 僅當按鈕文本為 "儲存" 時才進行更改
        button.innerText = '修改';
        button.style.backgroundColor = '';
        button.style.color = '';
      }
      button.parentNode.parentNode.querySelectorAll('input[type="text"], input[type="date"]').forEach(function(input) {
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
    if (against) {
      var cancelButton = document.querySelector('button[data-cancel-button-id="' + against + '"]');
      var cancelButtonList = document.querySelectorAll('button[data-cancel-button-id]');
      cancelButtonList.forEach(function(cancelButtonElement) {
        if (cancelButtonElement !== cancelButton) {
          cancelButtonElement.parentNode.removeChild(cancelButtonElement); // 移除非特定取消按鈕
        }
      });
    }
    if (cancelButtonId) {
    var cancelButtons = document.querySelectorAll('button[data-cancel-button-id]');
    cancelButtons.forEach(function(cancelButton) {
      cancelButton.parentNode.removeChild(cancelButton); // 移除所有取消按鈕
    });
  }
    var selectButtons = document.querySelectorAll('.select-cell button');
    selectButtons.forEach(function(button) {
      if (button.innerText === '儲存') { // 僅當按鈕文本為 "儲存" 時才進行更改
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
      var deleteButtons = document.querySelectorAll('button.delete-button');
      deleteButtons.forEach(function(button) {
        button.style.display = 'inline-block';
      });
    
  }

  function selectRow(row) {
    // 清除之前選中的行樣式
    var selectedRow = document.querySelector('.selected');
    if (selectedRow) {
      selectedRow.classList.remove('selected');
    }

    // 設置當前行為選中狀態
    row.classList.add('selected');
    // 獲取當前行的所有儲存格
    var cells = row.getElementsByTagName('input');

    // 獲取選中行的第一列資料
    var firstColumnValue = cells[0].value;

    // 將第一列資料傳遞給模態框中的 `GridBranch01Detail.html` 的 `search()` 函數
    var iframe = document.querySelector('#myModal iframe');
    if (iframe) {
      iframe.contentWindow.search(firstColumnValue);
    }

    // 檢查是否點擊了"選擇"按鈕
    var selectButton = row.querySelector('button');
    if (selectButton.innerText === '修改') {
      // 將所有儲存格設置為唯讀狀態
      for (var j = 0; j < cells.length; j++) {
        var input = cells[j];
        input.readOnly = true;
      }
      // 清空選中行的數據
    } else {
      // 將所有儲存格設置為可編輯狀態
      for (var j = 1; j < cells.length; j++) {
        var input = cells[j];
        input.readOnly = false;
      }

    }

    // 顯示模態框
    var modalContainer = document.querySelector('.modal-container');
    var modal = document.getElementById("myModal");
    var modalContent = modal.querySelector('.modal-content');
    var modalHeight = modalContent.offsetHeight;
    var rowRect = row.getBoundingClientRect();
    var modalLeft = rowRect.right;
    var modalTop = rowRect.top - 0;

    // 獲取模態框容器的位置資訊
    var containerRect = modalContainer.getBoundingClientRect();
    var containerTop = containerRect.top;
    var containerLeft = containerRect.left;

    // 根據容器位置調整模態框的位置
    var adjustedTop = modalTop - containerTop;
    var adjustedLeft = modalLeft - containerLeft;
    modal.style.left = adjustedLeft + 'px';
    modal.style.top = adjustedTop + 'px';
    modal.style.display = "block";
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
        event.preventDefault(); // 防止默認的Enter鍵行為（提交表單）
        var button = document.getElementById('search');
        button.innerText = '查詢中...';
        button.disabled = true;
        search(); // 調用查詢函數
      }
      });

   document.getElementById('engName').addEventListener('keydown', function(event) {
      if (event.key === 'Enter') {
        event.preventDefault();
        var button = document.getElementById('search');
        button.innerText = '查詢中...';
        button.disabled = true;
        search();
      }
    });

    document.getElementById('startDate').addEventListener('keydown', function(event) {
      if (event.key === 'Enter') {
        event.preventDefault();
        var button = document.getElementById('search');
        button.innerText = '查詢中...';
        button.disabled = true;
        search();
      }
    });

    document.getElementById('endDate').addEventListener('keydown', function(event) {

      if (event.key === 'Enter') {
        event.preventDefault();
        var button = document.getElementById('search');
        button.innerText = '查詢中...';
        button.disabled = true;
        search();
      }
    });

  /*
   * toggleAddContainer 函式用於切換新增資料容器的顯示狀態。
   * 若新增資料容器為隱藏狀態，則移除 'hidden' class 以顯示容器。
   * 若新增資料容器已顯示，則新增 'hidden' class 以隱藏容器。
   */
  function toggleAddContainer() {
    var addButton = document.getElementById('addButton');
    var addContainer = document.getElementById('addContainer');
    var today = new Date().toISOString().split('T')[0];
    document.getElementById('newCol5').value = today;

    if (addContainer.classList.contains('hidden')) {
      addContainer.classList.remove('hidden');
      getMaxValueFromDatabase();
    } else {
      addContainer.classList.add('hidden');
    }
  }
  
  /*
   * 監聽整個檔的點擊事件，當點擊的目標不是新增按鈕、新增按鈕的父節點、新增資料容器本身，以及新增資料容器內的元素時，
   * 將新增資料容器設為隱藏狀態。
   */
  document.addEventListener('click', function(event) {
    var target = event.target;
    var addButton = document.getElementById('addButton');
    var addContainer = document.getElementById('addContainer');
    var cancelAdd = document.getElementById('cancelAdd');
    if (
      target === cancelAdd                                // 目標是「取消按鈕」元素本身
    ) {
      addContainer.classList.add('hidden');               // 隱藏新增資料容器
    }

  });
  function cancelAdd() {
    document.getElementById('newCol1').value = '';
    document.getElementById('newCol2').value = '';
    document.getElementById('newCol3').value = '';
    document.getElementById('newCol4').value = '';
    document.getElementById('newCol5').value = '';
  }

  function getMaxValueFromDatabase() 
    {
        var connectionStatus = document.getElementById('newCol1');
        document.getElementById('newCol1').value = '新單號建立中...';
        var saveButton = document.getElementById('saveAdd'); // 獲取保存按鈕元素
        saveButton.setAttribute('disabled', 'true');
        var url = GridBranch01_js03;
        fetch(url)
          .then(function(response) {
            return response.json();
          })
          .then(function(data) {
            var maxVal = data.maxValue;
            var today = new Date();
            var formattedDate = formatDate(today); // 格式化今天的日期，例如 20230713
            var newCol1Input = document.getElementById('newCol1');
            var newCol1Value = generateNewValue(maxVal, formattedDate); // 生成新的單號
            newCol1Input.value = newCol1Value;
            //請求成功時移除或隱藏連接狀態文本
            saveButton.removeAttribute('disabled');
          })
          .catch(function(error) {
            console.log('Error:', error);
            // 連線失敗的處理邏輯
            var errorElement = document.createElement('div');
            errorElement.innerText = '後端伺服器連線失敗';
            document.getElementById('newCol1').value = '單號建立失敗';

            document.body.appendChild(errorElement);
          });
    }

  // 格式化日期，例如將 2023-07-13 轉換為 20230713
  function formatDate(date) {
    var year = date.getFullYear();
    var month = (date.getMonth() + 1).toString().padStart(2, '0');
    var day = date.getDate().toString().padStart(2, '0');
    return year + month + day;
  }

  // 生成新的單號
  function generateNewValue(maxValue, formattedDate) {
    var prefix = 'Aws';
    var numberPart = maxValue.substr(maxValue.length - 3); // 獲取最後三位元數字
    var number = parseInt(numberPart);
    var newNumber = number + 1;
    var newNumberPart = newNumber.toString().padStart(3, '0'); // 將新的數位部分轉換為三位元數格式
    var numberPart01 = maxValue.substr(3,8); // 比對今天日期

    if (numberPart01 === formattedDate) {
      return prefix + formattedDate + newNumberPart;
      }else{
        return prefix + formattedDate + '001';
      }

  }

  function saveRecord() 
    {
      var newCol1 = document.getElementById('newCol1').value;
      var newCol2 = document.getElementById('newCol2').value;
      var newCol3 = document.getElementById('newCol3').value;
      var newCol4 = document.getElementById('newCol4').value;
      var newCol5 = document.getElementById('newCol5').value;

      var saveButton = document.getElementById('saveAdd');
      saveButton.innerText = 'saving...';
      saveButton.disabled = true; // 禁用按鈕，防止重複點擊

      var cancelButton = document.getElementById('cancelAdd');
      cancelButton.style.display = 'none'; // 隱藏Cancel按鈕
      var saveMaster = window.Master;

      var data = {
        newCol1: newCol1,
        newCol2: newCol2,
        newCol3: newCol3,
        newCol4: newCol4,
        newCol5: newCol5
      };

      fetch(GridBranch01_js04, { // 替換為後端 MongoDB 的 URL
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        })
        .then(function(response) {
          if (response.ok) {
            // 新增成功，彈出提示窗口
            openWindow(saveButton,cancelButton,'新增成功');

            // 清空新增資料欄位
            document.getElementById('newCol1').value = '';
            document.getElementById('newCol2').value = '';
            document.getElementById('newCol3').value = '';
            document.getElementById('newCol4').value = '';
            document.getElementById('newCol5').value = '';

            // 隱藏新增資料容器
            document.getElementById('addContainer').classList.add('hidden');

            // 重新載入資料
            searchInput.value = newCol1; // 將新增的資料作為搜索輸入值 
            startDate.value = '';
            endDate.value = '';
            engName.value = '';
            search(newCol1);
          }  else if (response.status === 409) {
              // 表示發生唯一索引衝突，顯示錯誤訊息給使用者
              response.text().then(function(errorMessage) {
                alert(errorMessage);
                saveButton.innerText = 'Save';
                saveButton.disabled = false; // 解除按鈕
                cancelButton.style.display = 'inline-block'; // 顯示Cancel按鈕
                toggleAddContainer();
              });
             } else {
                console.log('Insert failed:', response.statusText);
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



  // 將 deleteRecord 函數改為返回 Promise
  function deleteRecord(button) {
    return new Promise((resolve, reject) => {
      var row = button.parentNode.parentNode;
      var input = row.querySelector('input');
      var ABC = input.value;

      // 發送刪除請求
      var url = GridBranch01_js05;

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




  function openWindow03() {
              var w_width = 200;
              var w_height = 100;
              var x = (screen.width - w_width) / 2;
              var y = (screen.height - w_height) / 2;
              var ww = 'width=' + w_width + ',height=' + w_height + ',top=' + y + ',left=' + x;
              var openWIN = window.open('', '', ww);
              openWIN.document.write('<h2 style="text-align: center;">未登入</h2>');
              setTimeout(function() {
                openWIN.close();
                window.parent.handleLogoutID('index.html');
              }, 500); // 0.5秒後自動關閉彈窗
            }

var masterTable = document.getElementById('addContainer');
var detailTable = document.getElementById('detailTable');

// 點擊主表格行時觸發事件
addContainer.addEventListener('click', function(event) {
  var selectedRow = event.target.parentNode;
  var detailData = getDetailData(selectedRow); // 根據選中的行獲取明細資料
  displayDetailTable(detailData); // 顯示明細表格
});

function displayDetailTable(detailData) {
  // 清空明細表格內容
  detailTable.innerHTML = '';

  // 創建表頭行
  var headerRow = document.createElement('tr');
  var headers = ['ID', 'Name', 'Value'];

  for (var i = 0; i < headers.length; i++) {
    var th = document.createElement('th');
    th.textContent = headers[i];
    headerRow.appendChild(th);
  }

  detailTable.appendChild(headerRow);

  // 創建資料行
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
var notSaved = [];
var keys = Object.keys(originalData);
var lastClickedRowData = {};
var lastClickedRowInputs = document.querySelectorAll('tr.selected input[type="text"], tr.selected input[type="date"]');
lastClickedRowInputs.forEach(function(input) {
  lastClickedRowData[input.name] = input.value;
});

if (bbbb===2){
  var cccc =  aaaaa ;
  aaaaa = [];
  for (var j = 0; j < keys.length; j++) {
  var key = keys[j];
  aaaaa[j] = cccc[key];
  }
}

if (bbbb===3){
  var cccc =  aaaaa ;
  aaaaa = [];
  for (var j = 0; j < keys.length; j++) {
  aaaaa[j] = cccc[j].value;
  }
}

if (bbbb===4){
  var cccc =  aaaaa ;
  aaaaa = [];
  for (var j = 0; j < keys.length; j++) {
  aaaaa[j] = cccc[j].value;
  }
}

for (var j = 0; j < keys.length; j++) {
  var key = keys[j];

// 根據 j 的值添加相應的標題首碼
if (j === 1) {
  chineseTitle = '原國姓名:';
} else if (j === 2) {
  chineseTitle = '台灣姓名:';
} else if (j === 3) {
  chineseTitle = '英文名:';
} else if (j === 4) {
  chineseTitle = '日期:';
}

if (aaaaa[j] !== originalData[key] && aaaaa!==undefined ) {
  notSaved.push(chineseTitle +  aaaaa[j]);
}
}

if (notSaved.length > 0) {
  alert('未儲存：' + notSaved.join(', '));
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

// 判斷 saveButton 和 cancelButton 是否有值
if (saveButton && cancelButton) {
  saveButton.innerText = 'Save';
  saveButton.disabled = false; // 禁用按鈕，防止重複點擊
  cancelButton.style.display = 'inline-block'; // 顯示Cancel按鈕
}
setTimeout(function() {
  openWIN.close();
}, 500); // 0.5秒後自動關閉彈窗
}


// 函數用於比較兩個物件是否相等
function objectsAreEqual(obj1, obj2) {
return JSON.stringify(obj1) === JSON.stringify(obj2);
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
  GridBranch01_js01 = data.GridBranch01_js01;
  GridBranch01_js02 = data.GridBranch01_js02;
  GridBranch01_js03 = data.GridBranch01_js03;
  GridBranch01_js04 = data.GridBranch01_js04;
  GridBranch01_js05 = data.GridBranch01_js05;
  search();
})
.catch(error => {
  console.error('發生錯誤:', error);
});
