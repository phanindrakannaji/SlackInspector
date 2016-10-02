var fs = require('fs');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/test');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("got the connection");
  console.log("about to create schema");
 // console.log(db.collections);
  db.db.dropCollection('badwords',function(err,result){
  	//console.log(err);
  	 if(!err || err.errmsg == 'ns not found'){
  	 	create_schema(callback);
  	 }
  });
  function callback(){
  	console.log("Foul words set up done.....");
  	process.exit(0);
  	return;
  }
});
function create_schema(callback){
	var foullWordsDict = mongoose.Schema({name: String});
	var badWords_model = mongoose.model('badwords', foullWordsDict);
	console.log('about to insert words');
	insert_badwords(callback);
}
function insert_badwords(finalcallback){
	var buffer = fs.readFileSync('../foul_words.txt');
    var str = buffer.toString('utf8');
    var badWords = str.split('\n');
    var badWords_model = mongoose.model('badwords');
    var index = 0;
    console.log("bad words length: "+badWords.length)
    recursive();
    function recursive(){
    	if(index >= badWords.length){
    		finalcallback();
    		return;
    	}
    	var word = new badWords_model({name:badWords[index].toLowerCase()});
    	word.save(callback);
    	function callback(err,word){
    		console.log(word["_id"].toString());
    		if(err){
    			console.log("Error occured while inserting the record-->"+index);
    		}
    		index++;
    		//console.log('inserting..'+index);
    		recursive();
    	}
    }
}