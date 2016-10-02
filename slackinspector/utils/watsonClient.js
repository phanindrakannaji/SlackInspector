var watson = require('watson-developer-cloud');
module.exports = {}
function Emotion(){
	this.alchemy_language = watson.alchemy_language({
        api_key: '4ffe38d698c499252d58d75fe3580cc7decb6c22'
    });
}
Emotion.prototype.getEmotionParameter = function(text,callback){
   	this.alchemy_language.emotion({"text":text},mycallback);
	function mycallback(err,response){
		if(err){
			console.error(err);
			callback(err,response);
		}else{
			//console.log(response);
			var modified_response = response["docEmotions"];
			for(var i in modified_response){
				modified_response[i] = modified_response[i]*100;
			}
			callback(err,modified_response);
		}
	}
}
module.exports["Emotion"] = Emotion;
