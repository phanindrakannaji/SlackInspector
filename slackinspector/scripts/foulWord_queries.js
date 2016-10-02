var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/test');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

function hasBadWord__(sentence,boolCallback){
	if( typeof sentence == 'string' ){
		words = sentence.replace(/[.,?!;()"'-]/g, " ").replace(/\s+/g, " ").toLowerCase().split(" ");
	}
	var operand = [];
	for (i in words){
		operand.push({"name":words[i]});
	}
	var badWords_model = mongoose.model('badwords',{name: String});
	console.log(operand);
	badWords_model.count({"$or":operand}, callback);
	function callback(err,results){
		console.log(results);
		if(results > 0){
			boolCallback(true);
			return;
		}
		boolCallback(false);
	}
}
function hasBadWord(sentence,callback){
	db.once('open', function() {
	hasBadWord__(sentence,callback);
}
}
function getSlackDb(){
   slack_db = function(){
   }
}

