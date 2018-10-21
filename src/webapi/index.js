let express = require('express');
let path = require('path');
let expressHandleBars = require('express-handlebars');

console.log('Running web api');

let app = express();

app.listen(3000, () => {
  console.log('Server Started on Port 3000...');
});

app.get('/webapi/home', (req, res) => {
  console.log('test');
});
