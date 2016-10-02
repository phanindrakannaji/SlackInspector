var watsonClient = require('./watsonClient');
var slackdb = require('./slackdb');
module.exports = {};

function slackInspect(username, message, timestamp, recepientList, inspectCallback) {

    slackdb.getSlackDb(function(slackDb_instance) {
        slackDb_instance.hasBadWord(message, badWordCallback);

        function badWordCallback(boool) {
            var resultObj = {};
            if (boool == true) {
                watson_emotion_client = watsonClient.Emotion();
                watson_emotion_client.getEmotionParameter(message, function(err, results) {
                    if (err) {
                        console.log("error while accessing  watson");
                        inspectCallback(resultObj);
                        return;
                    }

                    if (Number(results["fear"]) + Number(results["anger"]) + Number(results["disgust"]) >= 80) {
                        slackDb_instance.getMessageId(message, timestamp, username, messageCallback);

                        function messageCallback(messageId) {
                            recursion();
                            var index = 0;

                            function recursion() {
                                if (index >= recepientList.length) {
                                    inspectCallback(resultObj);
                                    return;
                                }
                                slackDb_instance.getReport(recepientList[index], messageId, reportCallback);

                                function reportCallback(reportId) {
                                    resultObj[recepientList[index]] = "http://localhost:8081/report/" + reportId;
                                    index++;
                                    recursion();
                                }
                            }
                        }
                    } else {
                        inspectCallback(resultObj);
                    }
                });
            } else {
                inspectCallback(resultObj);
            }
        }
    });
}
module.exports["slackInspect"] = slackInspect;