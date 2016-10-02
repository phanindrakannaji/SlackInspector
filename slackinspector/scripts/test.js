var slackdb = require('./slackdb');
var slackdb_instance = null
slackdb.getSlackDb(function(instance){
   slackdb_instance = instance;
   slackdb_instance.setupSlackDb(function(){
   	  console.log("setup Done");
   	  slackdb_instance.hasBadWord("that black guy", function(boool){
   	  	if(boool == true){
   	  		console.log("Has Bad Word");
   	  	}else{
   	  		console.log("Its fine")
   	  	}
   	  });
   	  slackdb_instance.isBadWord("black",function(boool){
          if(boool){
          	console.log("Its black");
          }
   	  });
   	  slackdb_instance.isBadWord("nikhil",function(boool){
          if(!boool){
          	console.log("nikhil is not bad");
          }
   	  });
   	  var reportId_ = null;
   	  slackdb_instance.getReportId("bharadwaz","1234",function(reportId){
   	  	  reportId_ = reportId;
   	  	  console.log("reportId is "+reportId);
   	  });
   	  slackdb_instance.getMessageId("gouse want no curd bill I want no milk bill","201434242342","bharadwaz", function(messageId){
   	  	  console.log("messageId is "+messageId);
   	  });
   	  /*slackdb_instance.updateReport(reportId_,true,function(boool){
   	  	  if(boool){
   	  	  	console.log("Succesfully updated");
   	  	  }
   	  }); */
   });
});