watson = require('watson-developer-cloud')

Emotion = ->
  @alchemy_language = watson.alchemy_language(api_key: '4ffe38d698c499252d58d75fe3580cc7decb6c22')
  return

Emotion::getEmotionParameter = (text, callback) ->

  mycallback = (err, response) ->
    if err
      console.error err
      callback err, response
    else
      modified_response = response['docEmotions']
      for i of modified_response
        modified_response[i] = modified_response[i] * 100
      callback err, modified_response
    return

  @alchemy_language.emotion { 'text': text }, mycallback
  return
  
module.exports = Emotion


emotion = new Emotion
