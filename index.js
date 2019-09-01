var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser());
var path = require('path');
// app.use("/css", express.static(__dirname + '/css'))
//  app.use("/img", express.static(__dirname + '/img'))
 app.use("/", express.static(__dirname + '/'))
//  app.use("/favicon.ico", express.static(__dirname + '/favicon.ico'))


app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.listen(8080);
