var express = require('express');
var bodyParser = require('body-parser');
var slackdb = require('./slackdb');
var app = express();

var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   console.log("Example app listening at http://%s:%s", host, port);
   slackdb.getSlackDb(function(slackDb_instance){
      slackDb_instance.setupSlackDb(setupCallback);
      function setupCallback(boool){
         console.log("dump set up also done");
      }
   })
});
app.use(express.static('public'));
var urlencodedParser = bodyParser.urlencoded({ extended: false })
app.get('/report/:reportid', function (req, res) {
   var reportid = req.params.reportid;
   slackdb.getSlackDb(function(slackDb_instance){
	   slackDb_instance.updateReport(reportid,true,updateCallback);
	   function updateCallback(boool){
		   console.log(boool);
	   }
   })
});

app.post('/report/:reportid', function (req, res) {
   var reportid = req.params.reportid;
});

app.get('/reports',function(req,res){
     slackdb.getSlackDb(function(slackDb_instance){
      slackDb_instance.getReports(succcallback);
      function succcallback(results){
         console.log(results);
             // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
         res.send(results);
      }
   })
})