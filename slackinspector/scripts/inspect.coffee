module.exports = (robot) ->

   robot.hear /.*/i, (res) ->
     res.send "Hi there"

