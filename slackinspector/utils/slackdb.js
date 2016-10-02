var mongoose = require('mongoose');
var fs = require('fs');
module.exports = {};
var slackdb_isntance = null;
function getSlackDb(callback) {
	if(slackdb_isntance != null){
	   callback(slackdb_isntance);	
	}
    debugger;
    var x = new slack_db(callback);

     function slack_db(callback) {
        debugger;
        mongoose.connect('mongodb://localhost/test');
        var scopeObj = this;
        this.db = mongoose.connection;
        this.db.on('error', console.error.bind(console, 'connection error:'));
        this.db.once('open', function(){
			    slackdb_isntance = scopeObj;
                callback(scopeObj);
            });
        }
        slack_db.prototype.hasBadWord = function(sentence, boolCallback) {
            if (typeof sentence == 'string') {
                words = sentence.replace(/[.,?!;()"'-]/g, " ").replace(/\s+/g, " ").toLowerCase().split(" ");
            }
            var operand = [];
            for (i in words) {
                operand.push({
                    "name": words[i]
                });
            }
            var badWords_model = mongoose.model('badwords');
            console.log(operand);
            badWords_model.count({
                "$or": operand
            }, callback);

            function callback(err, results) {
                console.log(results);
                if (results > 0) {
                    boolCallback(true);
                    return;
                }
                boolCallback(false);
            }
        }
        slack_db.prototype.isBadWord = function(word, callback) {
            var badWords_model = mongoose.model('badwords');
            badWords_model.count({
                name: word
            }, function(err, result) {
                if (result > 0) {
                    callback(true);
                } else {
                    callback(false);
                }
            })
        }
        slack_db.prototype.getReportId = function(whoreport, messageid, reportCallback) {
            var id = mongoose.Types.ObjectId();
            id = id.toString();
            var schema = mongoose.model('reportids');
            var entry = new schema({
                "whoreport": whoreport,
                "messageid": messageid
            });
            entry.save(function(err, result) {
                if (err) {
                    console.log("Error occured while inserting the randomId: " + id);
                    reportCallback();
                    return;
                }
                reportCallback(result["_id"]);
            });
        }
        slack_db.prototype.getMessageId = function(message, timestamp, user, messagecallback) {
            var reportSchema = mongoose.model('reports');
            var entry = new reportSchema({
                "message": message,
                "timestamp": timestamp,
                "user": user
            });
            entry.save(function(err, record) {
                if (err) {
                    console.log("Error while saving the report: " + message);
                    messagecallback();
                    return;
                }
                messagecallback(record["_id"]);
                return;
            })
        }
        slack_db.prototype.updateReport = function(reportId, isOffensive, comupdateCallback) {
			var user;
			var message;
			var scopeOObj = this;
			function updateCallback(boool){
				if(boool){
				   scopeOObj.updateReportWords(message,user,comupdateCallback);	
				}else{
				   comupdateCallback(false);	
				}
			}
            var model = mongoose.model('reportids');
			debugger;
            var scopeObj = this;
			debugger;
            model.find({
                "_id": reportId
            }, function(err, results) {
                if (results) {
                    //hoping the results will the array of json so coding this way
                    debugger;
                    results = results[0];
					console.log(results);
                    var whoreport = results["whoreport"];
                    var messageid = results["messageid"];
                    var reportModel = mongoose.model('reports');
                    debugger;
                    reportModel.find({
                        "_id": messageid
                    }, function(err, result) {
                        debugger;
                        if (err) {
							console.log("please tell u r the culprit"+err);
                            updateCallback(false);
                            return;
                        }
                        debugger;
                        result = result[0];
                        if (result) {
							console.log("^^^^^^^ result 0000000 "+JSON.stringify(result));
                            var upvotesList = result["upvoteslist"];
                            var downvotesList = result["downvoteslist"];
							user = result["user"];
							message = result["message"]
                            if (isOffensive == true) {
                                if (upvotesList) {
                                    upvotesList.push(whoreport);
                                } else {
                                    upvotesList = [whoreport];
                                }
                            }
                            reportModel.update({
                                "_id": messageid
                            }, {
                                "upvoteslist": upvotesList
                            }, function(err, result) {
                                if (err) {
                                    console.log("update report failed: " + messageid);
                                    updateCallback(false);
                                    return;
                                }
								console.log("Might be here");
                                updateCallback(true);
                            });
                        } else {
							console.log("failed here");
                            updateCallback(false);
                        }

                    });
                }
            })

        }
        slack_db.prototype.setupSlackDb = function(setupCallback) {
            var scopeObj = this;
            debugger;
            this.db.db.dropCollection('badwords', function(err, result) {
                //console.log(err);
                if (!err || err.errmsg == 'ns not found') {
                    create_schema(callback);
                }
            });

            function callback() {
                console.log("Foul words set up done.....");
                //process.exit(0);
                setupCallback();
                return;
            }

            function create_schema(callback) {
                debugger;
                var foullWordsDict = mongoose.Schema({
                    name: String
                });
                debugger;
                scopeObj.badwords_schema = {
                    name: String
                };
                debugger;
                var badWords_model = mongoose.model('badwords', foullWordsDict);

                var randomIdSchema = mongoose.Schema({
                    messageid: String,
                    whoreport: String
                });
                debugger;
                scopeObj.randomids_schema = {
                    messageid: String,
                    whoreport: String
                };
                debugger;
                mongoose.model('reportids',
                    randomIdSchema);
                debugger;
                var reportedWordsSchema = mongoose.Schema({
                    name: String,
                    count: Number,
					user: String
                })
                debugger;
                scopeObj.reportedwords_schema = {
                    name: String,
                    count: Number,
					user: String
                };
                debugger;
                mongoose.model('reportedwords', reportedWordsSchema);
                debugger;
                var reportsSchema = mongoose.Schema({
                    message: String,
                    upvoteslist: [String],
                    downvoteslist: [String],
                    timestamp: String,
                    user: String,
					resolved: String,
					tags:[String]
                });
                debugger;
                scopeObj.reports_schema = {
                    message: String,
                    upvoteslist: [String],
                    downvoteslist: [String],
                    timestamp: String,
                    user: String,
					resolved: String,
					tags:[String]
                };
                debugger;
                mongoose.model('reports', reportsSchema);
                console.log('about to insert words');
                debugger;
                insert_badwords(callback);
            }

            function insert_badwords(finalcallback) {
                debugger;
                var buffer = fs.readFileSync('../foul_words.txt');
                var str = buffer.toString('utf8');
                var badWords = str.split('\r\n');
                var badWords_model = mongoose.model('badwords');
                var index = 0;
                console.log("bad words length: " + badWords.length)
                recursive();

                function recursive() {
                    if (index >= badWords.length) {
                        debugger;
                        finalcallback();
                        return;
                    }
                    var word = new badWords_model({
                        name: badWords[index].toLowerCase()
                    });
                    word.save(callback);

                    function callback(err, word) {
                        if (err) {
                            console.log("Error occured while inserting the record-->" + index);
                        }
                        index++;
                        //console.log('inserting..'+index);
                        recursive();
                    }
                }
            }
        }

        slack_db.prototype.incReportWordCount = function(word,user,callback) {
            var scopeObj = this;
            this.isBadWord(word, function(boool) {
				
                if (boool == true) {
					console.log("Its bad "+word);
                    var model = mongoose.model('reportedwords');
                    model.find({
                        "$and":[{"name": word},{"user":user}]
                    }, function(err, result) {
                        if (err) {
                            callback(false);
                            return;
                        }
                        if (result.length > 0) {
							result = result[0]["count"];
                            result = Number(result) + 1;
							console.log(word+"-->>"+result);
                            model.update({
                                 "$and":[{"name": word},{"user":user}]
                            }, {
                                count: result
                            }, function(err, result) {
                                if (err) {
                                    callback(false);
                                    return;
                                }
                                callback(true);
                            })
                        } else {
                            var entry = new model({
                                "name": word,
								"user":user,
                                "count": 1
                            });
                            entry.save(function(err, result) {
                                if (err) {
                                    callback(false);
                                    return;
                                }
                                callback(true);
                            })
                        }
                    })
                }else{
					callback(true);
					console.log("its not at all bad");
				}
            })
        }

        slack_db.prototype.updateReportWords = function(sentence,user,updatecallback) {
            words = sentence.replace(/[.,?!;()"'-]/g, " ").replace(/\s+/g, " ").toLowerCase().split(" ");
			console.log("words are "+words.length);
            var index = 0;
			var scopeObj = this;
			recursive();
            function recursive(){
				console.log("check.."+index);
                if(index >= words.length){
                    updatecallback(true);
                    return;
                }
                scopeObj.incReportWordCount(words[index],user,callback);
                function callback(){
					 console.log("please");
                    index++;
                    recursive();
                }
            }
        }
		slack_db.prototype.markAsResolved = function(message_id,callback){
			var reportsModel = mongoose.model('reports');
			reportsModel.update({"_id":message_id},{"resolved":"yes"},function(err,result){
				if(err){
				  callback(false);
                  return;				  
				}
				callback(true);
			});
		}
    }
module.exports["getSlackDb"] = getSlackDb;