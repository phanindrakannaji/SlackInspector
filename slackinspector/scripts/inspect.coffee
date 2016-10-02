SlackInspect = require '../utils/slackInspect'

module.exports = (robot) ->
	robot.hear /(.*)/i, (res) ->
		message = res.match[0]
		username = res.user.name
		channel = res.room
		users = _.reject((_.values _.pluck robot.brain.data.users, 'name'), (name) -> name == msg.message.user.name) 
		SlackInspect username, message, new Date(), users, (returnObj)->
			consosle.log returnObj