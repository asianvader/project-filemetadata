'use strict';

const express = require('express');
const cors = require('cors');
const multer = require('multer');

const app = express();

const upload = multer({
  dest: 'uploads/' // this saves your file into a directory called "uploads"
}); 

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
     res.sendFile(process.cwd() + '/views/index.html');
  });

app.post("/", upload.single('upfile'), (req, res, next) => {
  const file = req.file;
  if(!file) {
    const error = new Error('Please upload a file')
    error.httpStatusCode = 400
    return next(error)
  }
    res.json({
      name: req.file.originalname,
      type: req.file.mimetype,
      size: req.file.size
    });
})

app.get('/hello', function(req, res){
  res.json({greetings: "Hello, API"});
});

app.listen(process.env.PORT || 3000, function () {
  console.log('Node.js listening ...');
});

