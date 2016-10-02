var mongoose = require('mongoose');
var fs = require('fs');
module.exports = {};
function getSlackDb(callback) {
    debugger;
    var x = new slack_db(callback);

     function slack_db(callback) {
        debugger;
        mongoose.connect('mongodb://localhost/test');
        var scopeObj = this;
        this.db = mongoose.connection;
        this.db.on('error', console.error.bind(console, 'connection error:'));
        this.db.once('open', function(){
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
        slack_db.prototype.updateReport = function(reportId, isOffensive, updateCallback) {
            var model = mongoose.model('reportids');
            var scopeObj = this;
            model.find({
                "_id": reportId
            }, function(err, results) {
                if (results) {
                    //hoping the results will the array of json so coding this way
                    debugger;
                    results = results[0];
                    var whoreport = results["whoreport"];
                    var messageid = results["messageid"];
                    var reportModel = mongoose.model('reports');
                    debugger;
                    reportModel.find({
                        "_id": messageid
                    }, function(err, result) {
                        debugger;
                        if (err) {
                            updateCallback(false);
                            return;
                        }
                        debugger;
                        result = result[0];
                        if (result) {
                            var upvotesList = result["upvoteslist"];
                            var downvotesList = result["downvoteslist"];
                            if (isOffensive == true) {
                                if (upvotesList) {
                                    upvoteslist.push(whoreport);
                                } else {
                                    upvoteslist = [whoreport];
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
                                updateCallback(true);
                            });
                        } else {
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
                    count: String
                })
                debugger;
                scopeObj.reportedwords_schema = {
                    name: String,
                    count: Number
                };
                debugger;
                mongoose.model('reportedwords', reportedWordsSchema);
                debugger;
                var reportsSchema = mongoose.Schema({
                    message: String,
                    upvoteslist: [String],
                    downvoteslist: [String],
                    timestamp: String,
                    username: String
                });
                debugger;
                scopeObj.reports_schema = {
                    message: String,
                    upvoteslist: [String],
                    downvoteslist: [String],
                    timestamp: String,
                    username: String
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
                var badWords = str.split('\n');
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

        slack_db.prototype.incReportWordCount = function(word, callback) {
            var scopeObj = this;
            this.isBadWord(word, function(boool) {
                if (boool == true) {
                    var model = mongoose.model('reportedwords');
                    model.count({
                        name: word
                    }, function(err, result) {
                        if (err) {
                            callback(false);
                            return;
                        }
                        if (result > 0) {
                            result = result + 1;
                            model.update({
                                name: word
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
                                count: 1
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
                }
            })
        }

        slack_db.prototype.updateReportWords = function(sentence, updatecallback) {
            words = sentence.replace(/[.,?!;()"'-]/g, " ").replace(/\s+/g, " ").toLowerCase().split(" ");
            var index = 0;
            function recursive(){
                if(index >= words.length){
                    updatecallback();
                    return;
                }
                incReportWordCount(callback);
                function callback(){
                    index++;
                    recursive();
                }
            }
        }
    }
module.exports["getSlackDb"] = getSlackDb;