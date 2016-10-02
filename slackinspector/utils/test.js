var slackdb = require('./slackdb');
var slackdb_instance = null
slackdb.getSlackDb(function(instance){
   slackdb_instance = instance;
   slackdb_instance.setupSlackDb(function(){
   	  console.log("setup Done");
   	  slackdb_instance.hasBadWord("that abortion guy", function(boool){
   	  	if(boool == true){
   	  		console.log("Has Bad Word");
   	  	}else{
   	  		console.log("Its fine")
   	  	}
   	  });
   	  slackdb_instance.isBadWord("abortion",function(boool){
          if(boool){
          	console.log("Its abortion");
          }
   	  });
   	  slackdb_instance.isBadWord("nikhil",function(boool){
          if(!boool){
          	console.log("nikhil is not bad");
          }
   	  });
   	 // var reportId_ = null;
   	  slackdb_instance.getMessageId("gouse want no curd bill I want no milk bill","201434242342","bharadwaz", function(messageId){
   	  	  console.log("messageId is "+messageId);
		  slackdb_instance.getReportId("bharadwaz",messageId,function(reportId){
   	  	  reportId_ = reportId;
   	  	  console.log("reportId is "+reportId);
		  slackdb_instance.updateReport(reportId_,true,function(boool){
   	  	  if(boool){
   	  	  	console.log("Succesfully updated the record");
   	  	  }else{
			  console.log("Record update failed..");
		  }
		  slackdb_instance.markAsResolved(messageId,function(res){
			  if(res){
				  console.log("marked as resolved..");
			  }else{
				  console.log("failed to mark as resolved");
			  }
		  })
   	    });
   	  });
   	  });
	  slackdb_instance.incReportWordCount("xxx",function(boool){
		  if(boool){
			  console.log("its updated..");
		  }else{
			  console.log("its failed..");
		  }
	  });
	  slackdb_instance.updateReportWords("fuck your self, asshole anal",function(boool){
		  if(boool){
			  console.log("its all words updated..");
		  }else{
			  console.log("some words failed..");
		  }
	  });
   });
});
var emotion = new Emotion();
emotion.getEmotionParameter("Hey Nik",function(err,response){
	console.log(response);
})