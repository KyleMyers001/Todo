const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');
const cors = require('cors');
const app = express();
const dataFile = path.join(__dirname, '../data/data.json');

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
  readFile((data) => {
    res.send(data.items);
  });
});

app.post('/webapi/addTodoItem', (req, res) => {
  if (!req.body || !req.body.name) return res.sendStatus(400);
  updateData((data) => {
    const item = {
      id: data.items[data.items.length - 1].id + 1,
      name: req.body.name
    }
    data.items.push(item);
    res.send(201, item);
    return data;
  });
});

// const addTodoItem = (item, callback) => {
//   updateData((data) => {
//     data.items.push(item);
//     callback(item);
//     return data;
//   });
// }

app.post('/webapi/updateTodoItem', (req, res) => {
  if (!req.body || !req.body.name || !req.body.id) return res.sendStatus(400);
  updateData((data) => {
    const item = {
      id: Number(req.body.id),
      name: req.body.name
    }

    const currentItemIndex = data.items.findIndex((currentItem) => {
      return currentItem.id === item.id;
    });

    if(currentItemIndex >= 0) {
      data.items[currentItemIndex] = item;
    }

    res.send(201, item);
    return data;
  });
});

app.post('/webapi/deleteTodoItem', (req, res) => {
  if (!req.body || !req.body.id) return res.sendStatus(400);
  const id = Number(req.body.id);
  deleteTodoItem(id);
  res.send(201, id);
});

const deleteTodoItem = (id) => {
  updateData((data) => {
    const itemIndex = data.items.findIndex((item) => {
      return item.id === id;
    });

    if (itemIndex >= 0) {
      data.items.splice(itemIndex, 1);
    }

    return data;
  });
}

const readFile = (callback) => {
  fs.readFile(dataFile, 'utf8', (err, data) => {
    if (err) {
      console.log(err);
      return;
    }
    let obj = JSON.parse(data);
    callback(obj);
  });
}

// TODO: Make this easier to read.
// Read and write to the data file.
const updateData = (readCallback) => {
  const writeCallback = (data) => {
    const modifiedData = readCallback(data);
    fs.writeFile(dataFile, JSON.stringify(modifiedData), 'utf8', function() {});
  }
  readFile(writeCallback);
}

