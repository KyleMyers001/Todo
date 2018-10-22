const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');
const cors = require('cors');
const app = express();
console.log('Running web api');

const corsOptions = {
  origin: 'http://localhost:4200',
  optionsSuccessStatus: 200
}

app.use(cors(corsOptions))
app.use(bodyParser.urlencoded({ extended: false }));

app.listen(3000, () => {
  console.log('Server Started on Port 3000...');
});

app.get('/webapi/getTodoList', (req, res) => {
  const data = require('../data/data.json');
  res.send(data.items);
});

app.post('/webapi/addTodoItem', (req, res) => {
  if (!req.body || !req.body.name) return res.sendStatus(400);
  var item = {
    name: req.body.name
  }
  addTodoItem(item);
  res.send(201, item);
});

app.post('/webapi/updateTodoItem', (req, res) => {
  if (!req.body || !req.body.id || !req.body.name) return res.sendStatus(400);
  var item = {
    id: Number(req.body.id),
    name: req.body.name
  }
  updateTodoItem(item);
  res.send(201, req.body);
});

app.delete('/webapi/deleteTodoItem', (req, res) => {
  if (!req.body || !req.body.id) return res.sendStatus(400);
  console.log('delete');
  var id = Number(req.body.id);
  deleteTodoItem(id);
  res.send(201, req.body);
});


app.get('/testForm', (req, res) => {
  var thePath = path.join(__dirname, 'Index.html');
  res.sendFile(thePath);
});

const dataFile = path.join(__dirname, '../data/data.json');
const addTodoItem = (item) => {
  fs.readFile(dataFile, 'utf8', (err, data) => {
    if (err) {
      console.log(err);
      return;
    }
    let obj = JSON.parse(data);
    item.id = obj.items[obj.items.length - 1].id + 1;
    obj.items.push(item);
    fs.writeFile(dataFile, JSON.stringify(obj), 'utf8', function() {});
  });
}

const updateTodoItem = (item) => {
  fs.readFile(dataFile, 'utf8', (err, data) => {
    if (err) {
      console.log(err);
      return;
    }
    let obj = JSON.parse(data);
    var currentItemIndex = obj.items.findIndex((currentItem) => {
      return currentItem.id === item.id
    });

    if(currentItemIndex >= 0) {
      obj.items[currentItemIndex] = item;
    }

    fs.writeFile(dataFile, JSON.stringify(obj), 'utf8', function() {});
  });
}

const deleteTodoItem = (id) => {
  fs.readFile(dataFile, 'utf8', (err, data) => {
    if (err) {
      console.log(err);
      return;
    }
    let obj = JSON.parse(data);
    var itemIndex = obj.items.findIndex((item) => {
      return item.id === id
    });

    if(itemIndex >= 0) {
      obj.items.splice(itemIndex, 1);
    }

    fs.writeFile(dataFile, JSON.stringify(obj), 'utf8', function() {});
  });
}
