const express = require('express');
const app = express();
const path = require('path');

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

// app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(__dirname)); // 使用当前目录作为静态文件根目录

app.get('/', (req, res) => {
  // res.sendFile(path.join(__dirname, 'public', 'index.html'));
  res.sendFile(path.join(__dirname, 'index.html')); // 发送index.html文件

});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log('Frontend server is running on port',port);
});


