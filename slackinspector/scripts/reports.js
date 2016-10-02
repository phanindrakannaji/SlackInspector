var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
function getRandomId(user,message){
	var id = mongoose.Types.ObjectId();
	id = id.toString();
}
