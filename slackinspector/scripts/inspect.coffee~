SlackInspect = require '../utils/slackInspect'
_ = require 'underscore'
slackInspect = SlackInspect.slackInspect
module.exports = (robot) ->
	robot.hear /(.*)/i, (res) ->
		message = res.match[0]
		console.log message
		username = res.message.user.name
		console.log username
		channel = res.message.user.room
		console.log channel
		slackInspect username, message, new Date(), ['nikhil497','bvenky27','vikram','pkanna1'], (returnObj)->
			consosle.log returnObj
