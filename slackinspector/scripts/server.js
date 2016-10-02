var express = require('express');
var bodyParser = require('body-parser');
var app = express();

var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   console.log("Example app listening at http://%s:%s", host, port);
});
app.use(express.static('public'));
var urlencodedParser = bodyParser.urlencoded({ extended: false })
app.get('/report/:reportid', function (req, res) {
   var reportid = req.params.reportid;
});

app.post('/report/:reportid', function (req, res) {
   var reportid = req.params.reportid;
});