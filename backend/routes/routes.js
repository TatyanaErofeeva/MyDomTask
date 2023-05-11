const express = require('express');
const fs = require('fs');
const router = express.Router();

router.get('/', function (req, res) {
  const data = fs.readFileSync('data.json');
  const info = JSON.parse(data);
  let newObj={};
  res.status(200).json(info); 
  });
  
router.get('/id/:id', function (req, res) {
  const data = fs.readFileSync('data.json');
  const info = JSON.parse(data);
  const found = info.find(function (item) {
    return item.id === parseInt(req.params.id);
  });

  if (found) {
    res.status(200).json(found);
  } else {
    res.sendStatus(404);
  }
});
  
router.post('/', function (req, res) {
  const data = fs.readFileSync('data.json');
  const info = JSON.parse(data);
  const itemIds = info.map(item => item.id);
  const newId = itemIds.length > 0 ? Math.max.apply(Math, itemIds) + 1 : 1;

  const newItem = {
    id: newId,
    taskId: req.body.taskId,
    taskRecieved: req.body.taskRecieved,
    address: req.body.address,
    roomNumber: req.body.roomNumber,
    status: req.body.status,
    taskTheme: req.body.taskTheme,
    excecutor: req.body.excecutor,
  };

  info.push(newItem);

  fs.writeFileSync('data.json', JSON.stringify(info), function (err) {
    if (err) {
      console.log(err);
      res.status(404).statusMessage = 'Ошибка при записи файла';
        return ;
    }
    console.log("The file was saved!");
  });

 res.status(201).json(newItem);
});
  
router.put('/:id', function (req, res) {
  const data = fs.readFileSync('data.json');
  const info = JSON.parse(data);
  const found = info.find(function (item) {
    return item.id === parseInt(req.params.id);
  });
  if (found) {
    const updated = {
      id: found.id,
      taskId: req.body.taskId,
      taskRecieved: req.body.taskRecieved,
      address: req.body.address,
      roomNumber: req.body.roomNumber,
      status: req.body.status,
      taskTheme: req.body.taskTheme,
      excecutor: req.body.excecutor,
    };

    const targetIndex = info.indexOf(found);
    info.splice(targetIndex, 1, updated);

    fs.writeFileSync('data.json', JSON.stringify(info), function (err) {
      if (err) {
        console.log(err);
        res.status(404).statusMessage = 'Ошибка при записи файла';
          return ;
      }
      console.log("The file was saved!");
    });
    res.status(200).json(updated);
  } 
});
  
router.delete('/:id', function (req, res) {
  const data = fs.readFileSync('data.json');
  const info = JSON.parse(data);
  const found = info.find(function (item) {
    return item.id === parseInt(req.params.id);
  });
  
  if (found) {
    const targetIndex = info.indexOf(found);

    info.splice(targetIndex, 1);
  }
  
  fs.writeFileSync('data.json', JSON.stringify(info), function (err) {
    if (err) {
      console.log(err);
      res.status(404).statusMessage = 'Ошибка при записи файла';
        return ;
    }
    console.log("The file was saved!");
  });

  res.sendStatus(204);
});

module.exports = router;